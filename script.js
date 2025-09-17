// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Section Navigation
  const sectionButtons = document.querySelectorAll(".section-button");
  const sections = document.querySelectorAll(".section-card");

  // Show the first section by default
  document.getElementById("section-personal").classList.remove("hidden");

  sectionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      sections.forEach((section) => {
        section.classList.add("hidden");
      });
      document.getElementById(`section-${targetId}`).classList.remove("hidden");
    });
  });

  // Auto-expand textareas
  window.autoExpandTextarea = function (textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  // Education Section
  const educationList = document.getElementById("educationList");
  const addEducationBtn = document.getElementById("addEducationBtn");

  function createEducationCard() {
    const card = document.createElement("div");
    card.className =
      "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
    card.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Qualification</label>
          <select class="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400 education-qualification">
            <option value="">Select qualification</option>
            <option value="10th Class">10th Class</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Diploma">Diploma</option>
            <option value="Degree">Degree</option>
            <option value="B-tech">B-tech</option>
            <option value="Under-graduate">Under-graduate</option>
            <option value="Graduate">Graduate</option>
            <option value="PG">PG</option>
            <option value="Others">Others</option>
          </select>
          <input type="text" placeholder="Enter qualification" class="mt-2 w-full px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400 hidden education-custom-qualification">
        </div>
        <div>
          <label class="block text-sm">College/University</label>
          <input type="text" placeholder="College/University/School" class="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400 education-college">
        </div>
      </div>
      <div>
        <label class="block text-sm">Location</label>
        <input type="text" placeholder="Location" class="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400 education-location">
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Start Date</label>
          <input type="date" class="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400 education-start-date">
        </div>
        <div>
          <label class="block text-sm">End Date</label>
          <input type="date" class="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400 education-end-date">
        </div>
      </div>
      <div>
        <label class="block text-sm">Grade/Score</label>
        <input type="text" placeholder="Grade/Score" class="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400 education-grade">
      </div>
      <button type="button" class="remove-btn absolute top-2 right-2 text-sm px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
        Remove
      </button>
    `;
    return card;
  }

  addEducationBtn.addEventListener("click", () => {
    const newCard = createEducationCard();
    educationList.appendChild(newCard);
    const select = newCard.querySelector(".education-qualification");
    const customInput = newCard.querySelector(
      ".education-custom-qualification"
    );
    select.addEventListener("change", () => {
      customInput.classList.toggle("hidden", select.value !== "Others");
    });
  });

  educationList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      e.target.closest(".p-4").remove();
    }
  });

  // Skills Section
  const skillCategory = document.getElementById("skillCategory");
  const skillInput = document.getElementById("skillInput");
  const skillLevel = document.getElementById("skillLevel");
  const addSkillBtn = document.getElementById("addSkillBtn");
  const skillTags = document.getElementById("skillTags");

  function createSkillTag(category, skill, level) {
    const tag = document.createElement("div");
    tag.className =
      "flex items-center gap-2 bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full";
    tag.innerHTML = `
      <span class="font-medium">${category}:</span>
      <span>${skill} (${level})</span>
      <button class="remove-skill-btn text-indigo-500 hover:text-indigo-700">
        &times;
      </button>
    `;
    return tag;
  }

  addSkillBtn.addEventListener("click", () => {
    const category = skillCategory.value;
    const skill = skillInput.value.trim();
    const level = skillLevel.value;

    if (skill) {
      const newTag = createSkillTag(category, skill, level);
      skillTags.appendChild(newTag);
      skillInput.value = "";
    }
  });

  skillTags.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-skill-btn")) {
      e.target.closest("div").remove();
    }
  });

  // Projects Section
  const projectsList = document.getElementById("projectsList");
  const addProjectBtn = document.getElementById("addProjectBtn");

  function createProjectCard() {
    const card = document.createElement("div");
    card.className =
      "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
    card.innerHTML = `
      <div>
        <label class="block text-sm">Project Title</label>
        <input type="text" placeholder="Project Title" class="mt-1 w-full px-3 py-2 border rounded-md project-title">
      </div>
      <div>
        <label class="block text-sm">Technologies Used</label>
        <input type="text" placeholder="e.g. React, Node.js, MongoDB" class="mt-1 w-full px-3 py-2 border rounded-md project-techs">
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Start Date</label>
          <input type="date" class="mt-1 w-full px-3 py-2 border rounded-md project-start-date">
        </div>
        <div>
          <label class="block text-sm">End Date</label>
          <input type="date" class="mt-1 w-full px-3 py-2 border rounded-md project-end-date">
        </div>
      </div>
      <div>
        <label class="block text-sm">Description/Outcomes</label>
        <textarea placeholder="Describe the project, your role, and key outcomes." class="mt-1 w-full px-3 py-2 border rounded-md resize-none project-description" rows="3"></textarea>
      </div>
      <button type="button" class="remove-btn absolute top-2 right-2 text-sm px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
        Remove
      </button>
    `;
    return card;
  }

  addProjectBtn.addEventListener("click", () => {
    projectsList.appendChild(createProjectCard());
  });

  projectsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      e.target.closest(".p-4").remove();
    }
  });

  // Work Experience Section
  const workList = document.getElementById("workList");
  const addWorkBtn = document.getElementById("addWorkBtn");

  function createWorkCard() {
    const card = document.createElement("div");
    card.className =
      "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
    card.innerHTML = `
      <div>
        <label class="block text-sm">Job Title</label>
        <input type="text" placeholder="Job Title" class="mt-1 w-full px-3 py-2 border rounded-md work-title">
      </div>
      <div>
        <label class="block text-sm">Company</label>
        <input type="text" placeholder="Company Name" class="mt-1 w-full px-3 py-2 border rounded-md work-company">
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Start Date</label>
          <input type="date" class="mt-1 w-full px-3 py-2 border rounded-md work-start-date">
        </div>
        <div>
          <label class="block text-sm">End Date</label>
          <input type="date" class="mt-1 w-full px-3 py-2 border rounded-md work-end-date">
        </div>
      </div>
      <div>
        <label class="block text-sm">Achievements</label>
        <textarea placeholder="List key achievements and responsibilities (e.g., Led a team of 5, Increased efficiency by 15%)" class="mt-1 w-full px-3 py-2 border rounded-md resize-none work-achievements" rows="3"></textarea>
      </div>
      <button type="button" class="remove-btn absolute top-2 right-2 text-sm px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
        Remove
      </button>
    `;
    return card;
  }

  addWorkBtn.addEventListener("click", () => {
    workList.appendChild(createWorkCard());
  });

  workList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      e.target.closest(".p-4").remove();
    }
  });

  // Certifications Section
  const certList = document.getElementById("certList");
  const addCertBtn = document.getElementById("addCertBtn");

  function createCertCard() {
    const card = document.createElement("div");
    card.className =
      "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
    card.innerHTML = `
      <div>
        <label class="block text-sm">Certification Name</label>
        <input type="text" placeholder="Certification Name" class="mt-1 w-full px-3 py-2 border rounded-md cert-name">
      </div>
      <div>
        <label class="block text-sm">Issuer</label>
        <input type="text" placeholder="Issuer" class="mt-1 w-full px-3 py-2 border rounded-md cert-issuer">
      </div>
      <div>
        <label class="block text-sm">Date of Issue</label>
        <input type="date" class="mt-1 w-full px-3 py-2 border rounded-md cert-date">
      </div>
      <button type="button" class="remove-btn absolute top-2 right-2 text-sm px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
        Remove
      </button>
    `;
    return card;
  }

  addCertBtn.addEventListener("click", () => {
    certList.appendChild(createCertCard());
  });

  certList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      e.target.closest(".p-4").remove();
    }
  });

  // Validations for Personal Section
  const emailInput = document.getElementById("personalEmail");
  const phoneInput = document.getElementById("personalPhone");
  const liInput = document.getElementById("linkedinInput");
  const gitInput = document.getElementById("githubInput");

  emailInput.addEventListener("input", () => {
    const err = document.getElementById("emailErr");
    err.classList.toggle(
      "hidden",
      !emailInput.value || emailInput.value.endsWith("@gmail.com")
    );
  });

  phoneInput.addEventListener("input", () => {
    const err = document.getElementById("phoneErr");
    const val = phoneInput.value.trim();
    err.classList.toggle("hidden", /^[1-9][0-9]{9}$/.test(val));
  });

  liInput.addEventListener("input", () => {
    const err = document.getElementById("liErr");
    try {
      const url = new URL(liInput.value);
      err.classList.toggle("hidden", url.hostname.includes("linkedin.com"));
    } catch {
      err.classList.remove("hidden");
    }
  });

  gitInput.addEventListener("input", () => {
    const err = document.getElementById("gitErr");
    try {
      const url = new URL(gitInput.value);
      err.classList.toggle("hidden", url.hostname.includes("github.com"));
    } catch {
      err.classList.remove("hidden");
    }
  });

  // Profile Upload Preview
  document
    .getElementById("profileUpload")
    .addEventListener("change", function () {
      const preview = document.getElementById("avatarPreview");
      preview.innerHTML = "";
      const file = this.files[0];
      if (file && file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.className = "w-20 h-20 rounded-full object-cover";
        preview.appendChild(img);
      } else {
        preview.textContent = "No photo";
      }
    });

  // Export PDF using jsPDF
  document.getElementById("exportPdfBtn").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Resume Export PDF", 10, 10);
    doc.save("resume.pdf");
  });

  // Export TXT
  document.getElementById("exportTxtBtn").addEventListener("click", () => {
    let content = "Resume Export TXT\n\n";
    content += `Name: ${
      document.querySelector('input[name="fullname"]').value
    }\n`;
    content += `Email: ${emailInput.value}\n`;
    content += `Phone: ${phoneInput.value}\n`;
    content += `LinkedIn: ${liInput.value}\n`;
    content += `GitHub: ${gitInput.value}\n`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.txt";
    link.click();
  });
});
