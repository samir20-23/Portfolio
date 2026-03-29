"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const DATA_PATH = path.join(process.cwd(), "lib", "data.json");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const GITHUB_URL_PREFIX = "https://raw.githubusercontent.com/samir20-23/Portfolio/refs/heads/main/main_Apps/Portfolio_nextJs/public";

export type Project = {
  title: string;
  slug: string;
  description?: string;
  tags?: string[];
  dynamicImages?: string[];
  githubUrl?: string;
  pageUrl?: string;
};

function readData() {
  const fileContent = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(fileContent);
}

function writeData(data: any) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getProjects() {
  const data = readData();
  return data.projectsData as Project[];
}

export async function getTags() {
  const data = readData();
  const allTags = new Set<string>();
  data.projectsData.forEach((p: Project) => {
    p.tags?.forEach(t => allTags.add(t));
  });
  return Array.from(allTags);
}

export async function saveProject(formData: FormData) {
  try {
    const projectIdxStr = formData.get("projectIndex") as string | null;
    const projectIndex = projectIdxStr !== null ? parseInt(projectIdxStr) : null;
    const title = (formData.get("title") as string || "").replace(/\s+/g, ""); // Force no spaces in title
    let slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const tagsStr = formData.get("tags") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const pageUrl = formData.get("pageUrl") as string;
    const imageFolder = (formData.get("imageFolder") as string || "").replace(/\s+/g, "-"); // Force no spaces in folder
    const files = formData.getAll("images") as File[];

    if (!title) {
        return { success: false, error: "Title is required" };
    }

    // Auto-generate slug if missing
    if (!slug) {
      slug = title.toLowerCase();
    }

    // Clean tags: remove empty strings and duplicates
    let tags = tagsStr ? JSON.parse(tagsStr) : [];
    tags = Array.from(new Set(tags.filter((t: string) => t && t.trim() !== "")));
    
    let imageUrls: string[] = [];
    const folderName = imageFolder || slug || "random";

    // Handle image uploads
    if (files.length > 0 && files[0].name !== "undefined" && files[0].size > 0) {
      const uploadDir = path.join(PUBLIC_DIR, folderName);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      for (const file of files) {
        if (!file || file.size === 0) continue;
        
        try {
          const arrayBuffer = await file.arrayBuffer();
          const fileName = file.name;
          const filePath = path.join(uploadDir, fileName);
          
          fs.writeFileSync(filePath, new Uint8Array(arrayBuffer));
          imageUrls.push(`${GITHUB_URL_PREFIX}/${folderName}/${fileName}`);
        } catch (fileError) {
          console.error(`Error writing file ${file.name}:`, fileError);
        }
      }
    }

    const data = readData();
    const keepImagesStr = formData.get("keepImages") as string;
    let existingImages = keepImagesStr ? JSON.parse(keepImagesStr) : [];

    // If folderName changed, update existing image paths to point to the new folder
    if (imageFolder) {
      existingImages = existingImages.map((img: string) => {
        if (img.startsWith(GITHUB_URL_PREFIX)) {
          const parts = img.split("/");
          const oldFileName = parts[parts.length - 1];
          return `${GITHUB_URL_PREFIX}/${folderName}/${oldFileName}`;
        }
        return img;
      });
    }

    const finalImages = [...existingImages, ...imageUrls];

    const newProject: Project = {
      title,
      slug,
      description: description && description.trim() !== "" ? description : undefined,
      tags: tags.length > 0 ? tags : undefined,
      githubUrl: githubUrl && githubUrl.trim() !== "" ? githubUrl : undefined,
      pageUrl: pageUrl && pageUrl.trim() !== "" ? pageUrl : undefined,
      dynamicImages: finalImages.length > 0 ? finalImages : undefined,
    };

    if (projectIndex !== null) {
      data.projectsData[projectIndex] = newProject;
    } else {
      data.projectsData.push(newProject);
    }

    writeData(data);
    revalidatePath("/admin");
    revalidatePath("/projects");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    console.error("CRITICAL SAVE ERROR:", error);
    return { success: false, error: error.message || "Unknown error during save" };
  }
}

export async function deleteProject(index: number) {
  try {
    const data = readData();
    const project = data.projectsData[index];
    
    // Try to find the folder to delete
    if (project && project.dynamicImages && project.dynamicImages.length > 0) {
      // Extract folder name from the first GitHub URL
      // https://.../public/[folderName]/[fileName]
      const firstImg = project.dynamicImages[0];
      const parts = firstImg.split("/");
      const folderName = parts[parts.length - 2];
      
      if (folderName && folderName !== "public" && folderName !== "random") {
        const folderPath = path.join(PUBLIC_DIR, folderName);
        if (fs.existsSync(folderPath)) {
          fs.rmSync(folderPath, { recursive: true, force: true });
        }
      }
    }

    data.projectsData.splice(index, 1);
    writeData(data);
    revalidatePath("/admin");
    revalidatePath("/projects");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    console.error("Delete error:", error);
    return { success: false, error: error.message };
  }
}

export async function checkFolderExists(folderName: string) {
  const folderPath = path.join(PUBLIC_DIR, folderName);
  return fs.existsSync(folderPath);
}
