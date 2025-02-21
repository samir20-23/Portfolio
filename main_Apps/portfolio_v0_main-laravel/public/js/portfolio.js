document.addEventListener("DOMContentLoaded", function() {
    fetchPortfolioData();
  });
  
  function fetchPortfolioData() {
    fetch('/portfolio/data', {
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    })
    .then(response => response.json())
    .then(data => {
      displayPortfolioData(data);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('ajax-data').innerHTML = 'Error loading portfolio data.';
    });
  }
  
  function displayPortfolioData(data) {
    let html = '';
  
    // Contact Info
    if(data.contact) {
      html += `<section id="contact">
        <h2>${data.contact.name}</h2>
        <p>${data.contact.position}</p>
        <p>Email: ${data.contact.email}</p>
        <p>Phone: ${data.contact.phone}</p>
        <p>Location: ${data.contact.location}</p>
        <p>Languages: ${data.contact.languages}</p>
      </section>`;
    }
  
    // Experiences
    if(data.experiences && data.experiences.length) {
      html += `<section id="experience">
        <h2>Experience</h2>`;
      data.experiences.forEach(exp => {
        html += `<div class="experience-item">
          <h3>${exp.title}</h3>
          <p>Company: ${exp.company}</p>
          <p>${exp.description}</p>
          <p>From: ${exp.start_date} To: ${exp.end_date}</p>
          <p>Location: ${exp.location}</p>
        </div>`;
      });
      html += `</section>`;
    }
  
    // Education
    if(data.educations && data.educations.length) {
      html += `<section id="education">
        <h2>Education</h2>`;
      data.educations.forEach(edu => {
        html += `<div class="education-item">
          <h3>${edu.title}</h3>
          <p>${edu.institution}</p>
          <p>${edu.description}</p>
          <p>Year: ${edu.year}</p>
        </div>`;
      });
      html += `</section>`;
    }
  
    // Projects
    if(data.projects && data.projects.length) {
      html += `<section id="projects">
        <h2>Projects</h2>`;
      data.projects.forEach(proj => {
        html += `<div class="project-item">
          <h3>${proj.title}</h3>
          <p>${proj.description}</p>
          <p><strong>Backend:</strong> ${proj.backend}</p>
          <p><strong>Frontend:</strong> ${proj.frontend}</p>
          <p><strong>Tools:</strong> ${proj.tools}</p>`;
        if(proj.link) {
          html += `<p><a target="_blank" href="${proj.link}">View Project</a></p>`;
        }
        html += `</div>`;
      });
      html += `</section>`;
    }
  
    // Skills
    if(data.skills && data.skills.length) {
      html += `<section id="skills">
        <h2>Skills</h2>`;
      data.skills.forEach(skill => {
        html += `<div class="skill-item">
          <h3>${skill.category}</h3>
          <p>${skill.skills}</p>
        </div>`;
      });
      html += `</section>`;
    }
  
    // Languages
    if(data.languages && data.languages.length) {
      html += `<section id="languages">
        <h2>Languages</h2>
        <ul>`;
      data.languages.forEach(lang => {
        html += `<li>${lang.language} - ${lang.proficiency}</li>`;
      });
      html += `</ul></section>`;
    }
  
    document.getElementById('ajax-data').innerHTML = html;
  }
  