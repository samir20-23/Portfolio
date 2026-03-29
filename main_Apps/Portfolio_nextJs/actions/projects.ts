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
    const title = formData.get("title") as string;
    let slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const tagsStr = formData.get("tags") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const pageUrl = formData.get("pageUrl") as string;
    const imageFolder = formData.get("imageFolder") as string;
    const files = formData.getAll("images") as File[];

    if (!title) {
        return { success: false, error: "Title is required" };
    }

    // Auto-generate slug if missing
    if (!slug) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const tags = tagsStr ? JSON.parse(tagsStr) : [];
    
    let imageUrls: string[] = [];

    // Handle image uploads
    if (files.length > 0 && files[0].size > 0) {
      const folderName = imageFolder || slug || "random";
      const uploadDir = path.join(PUBLIC_DIR, folderName);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      for (const file of files) {
        if (!file || file.size === 0) {
          console.log("Skipping empty file or null file");
          continue;
        }
        
        console.log(`Processing file: ${file.name}, size: ${file.size}`);
        
        try {
          const arrayBuffer = await file.arrayBuffer();
          const fileName = file.name; // Keep original name as requested
          const filePath = path.join(uploadDir, fileName);
          
          fs.writeFileSync(filePath, new Uint8Array(arrayBuffer));
          
          console.log(`Successfully wrote ${arrayBuffer.byteLength} bytes to ${filePath}`);
          // Save FULL GitHub URL as requested
          imageUrls.push(`${GITHUB_URL_PREFIX}/${folderName}/${fileName}`);
        } catch (fileError) {
          console.error(`Error writing file ${file.name}:`, fileError);
        }
      }
    }

    const data = readData();
    const newProject: Project = {
      title,
      slug,
      description: description || undefined,
      tags: tags.length > 0 ? tags : undefined,
      githubUrl: githubUrl || undefined,
      pageUrl: pageUrl || undefined,
      dynamicImages: imageUrls.length > 0 ? imageUrls : undefined,
    };

    if (projectIndex !== null) {
      const idx = projectIndex;
      const keepImagesStr = formData.get("keepImages") as string;
      const keepImages = keepImagesStr ? JSON.parse(keepImagesStr) : [];
      newProject.dynamicImages = [...keepImages, ...imageUrls];
      if (newProject.dynamicImages.length === 0) delete newProject.dynamicImages;

      data.projectsData[idx] = newProject;
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
