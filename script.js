document.addEventListener("DOMContentLoaded", () => {
  
  /** ---------------------- Section Navigation ---------------------- **/
  const sectionButtons = document.querySelectorAll(".section-button");
  const sections = document.querySelectorAll(".section-card");

  function showSection(targetId) {
    sections.forEach(s => s.classList.add("hidden"));
    const el = document.getElementById(`section-${targetId}`);
    if (el) el.classList.remove("hidden");
  }

  sectionButtons.forEach(btn => {
    btn.addEventListener("click", () => showSection(btn.getAttribute("data-target")));
  });

  // Show default section
  showSection("personal");

  /** ---------------------- Auto-expand Textareas ---------------------- **/
  window.autoExpandTextarea = function(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  /** ---------------------- Personal Info ---------------------- **/
  const fullnameInput = document.querySelector('input[name="fullname"]');
  const emailInput = document.getElementById("personalEmail");
  const phoneInput = document.getElementById("personalPhone");
  const liInput = document.getElementById("linkedinInput");
  const gitInput = document.getElementById("githubInput");

  const previewName = document.getElementById("previewName");
  const previewEmail = document.getElementById("previewEmail");
  const previewPhone = document.getElementById("previewPhone");
  const previewLinkedIn = document.getElementById("previewLinkedIn");
  const previewGitHub = document.getElementById("previewGitHub");
  const previewObjective = document.getElementById("previewObjective");
  const previewActivities = document.getElementById("previewActivities");
  const previewSkills = document.getElementById("previewSkills");

  function updatePersonalPreview() {
    previewName.textContent = fullnameInput.value || "---"; 
    previewEmail.textContent = emailInput.value || "---";
    previewPhone.textContent = phoneInput.value || "---";
    previewLinkedIn.textContent = liInput.value || "---";
    previewGitHub.textContent = gitInput.value || "---";
  }

  [fullnameInput, emailInput, phoneInput, liInput, gitInput].forEach(input => {
    input.addEventListener("input", updatePersonalPreview);
  });

  emailInput.addEventListener("input", () => {
    const err = document.getElementById("emailErr");
    err.classList.toggle("hidden", !emailInput.value || emailInput.value.endsWith("@gmail.com"));
  });

  phoneInput.addEventListener("input", () => {
    const err = document.getElementById("phoneErr");
    err.classList.toggle("hidden", /^[1-9][0-9]{9}$/.test(phoneInput.value.trim()));
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

  document.getElementById("profileUpload").addEventListener("change", function () {
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

  /** ---------------------- Objective & Activities ---------------------- **/
  const objectiveInput = document.getElementById("objectiveText");
  objectiveInput.addEventListener("input", () => {
    previewObjective.textContent = objectiveInput.value || "---";
  });

  const activitiesInput = document.getElementById("activitiesText");
  activitiesInput.addEventListener("input", () => {
    previewActivities.textContent = activitiesInput.value || "---";
  });

  /** ---------------------- Education Section ---------------------- **/
  const educationList = document.getElementById("educationList");
  const addEducationBtn = document.getElementById("addEducationBtn");

  function createEducationCard() {
    const card = document.createElement("div");
    card.className = "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
    card.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Qualification</label>
          <select class="mt-1 block w-full px-3 py-2 border rounded-md education-qualification">
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
          <input type="text" placeholder="Enter qualification" class="mt-2 w-full px-3 py-2 border rounded-md hidden education-custom-qualification">
        </div>
        <div>
          <label class="block text-sm">College/University</label>
          <input type="text" placeholder="College/University/School" class="mt-1 w-full px-3 py-2 border rounded-md education-college">
        </div>
      </div>
      <div>
        <label class="block text-sm">Location</label>
        <input type="text" placeholder="Location" class="mt-1 w-full px-3 py-2 border rounded-md education-location">
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-sm">Start Date</label>
          <input type="date" class="mt-1 w-full px-3 py-2 border rounded-md education-start-date">
        </div>
        <div>
          <label class="block text-sm">End Date</label>
          <input type="date" class="mt-1 w-full px-3 py-2 border rounded-md education-end-date">
        </div>
      </div>
      <div>
        <label class="block text-sm">Grade/Score</label>
        <input type="text" placeholder="Grade/Score" class="mt-1 w-full px-3 py-2 border rounded-md education-grade">
      </div>
      <button type="button" class="remove-btn absolute top-2 right-2 text-sm px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">Remove</button>
    `;
    return card;
  }

  addEducationBtn.addEventListener("click", () => {
    const newCard = createEducationCard();
    educationList.appendChild(newCard);

    const select = newCard.querySelector(".education-qualification");
    const customInput = newCard.querySelector(".education-custom-qualification");

    select.addEventListener("change", () => {
      customInput.classList.toggle("hidden", select.value !== "Others");
      updateEducationPreview();
    });

    newCard.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", updateEducationPreview);
    });

    newCard.querySelector(".remove-btn").addEventListener("click", () => {
      newCard.remove();
      updateEducationPreview();
    });

    updateEducationPreview();
  });

  /** ---------------------- Projects Section ---------------------- **/
  const projectsList = document.getElementById("projectsList");
  const addProjectBtn = document.getElementById("addProjectBtn");

  function createProjectCard() {
    const card = document.createElement("div");
    card.className = "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
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
      <button type="button" class="remove-btn absolute top-2 right-2 text-sm px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">Remove</button>
    `;
    return card;
  }

  addProjectBtn.addEventListener("click", () => {
    const newCard = createProjectCard();
    projectsList.appendChild(newCard);

    newCard.querySelectorAll("input, textarea").forEach(input => {
      input.addEventListener("input", updateProjectsPreview);
    });

    newCard.querySelector(".remove-btn").addEventListener("click", () => {
      newCard.remove();
      updateProjectsPreview();
    });

    updateProjectsPreview();
  });

  /** ---------------------- Work Section ---------------------- **/
  const workList = document.getElementById("workList");
  const addWorkBtn = document.getElementById("addWorkBtn");

  function createWorkCard() {
    const card = document.createElement("div");
    card.className = "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
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
        <textarea placeholder="List key achievements and responsibilities" class="mt-1 w-full px-3 py-2 border rounded-md resize-none work-achievements" rows="3"></textarea>
      </div>
      <button type="button" class="remove-btn absolute top-2 right-2 text-sm px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">Remove</button>
    `;
    return card;
  }

  addWorkBtn.addEventListener("click", () => {
    const newCard = createWorkCard();
    workList.appendChild(newCard);

    newCard.querySelectorAll("input, textarea").forEach(input => {
      input.addEventListener("input", updateWorkPreview);
    });

    newCard.querySelector(".remove-btn").addEventListener("click", () => {
      newCard.remove();
      updateWorkPreview();
    });

    updateWorkPreview();
  });

  /** ---------------------- Certifications Section ---------------------- **/
  const certList = document.getElementById("certList");
  const addCertBtn = document.getElementById("addCertBtn");

  function createCertCard() {
    const card = document.createElement("div");
    card.className = "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
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
        <label class="block text-sm">Date</label>
        <input type="month" class="mt-1 w-full px-3 py-2 border rounded-md cert-date">
      </div>
      <button type="button" class="remove-btn absolute top-2 right-2 text-sm px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">Remove</button>
    `;
    return card;
  }

  addCertBtn.addEventListener("click", () => {
    const newCard = createCertCard();
    certList.appendChild(newCard);

    newCard.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", updateCertsPreview);
    });

    newCard.querySelector(".remove-btn").addEventListener("click", () => {
      newCard.remove();
      updateCertsPreview();
    });

    updateCertsPreview();
  });

  /** ---------------------- Skills ---------------------- **/
  const skillCategory = document.getElementById("skillCategory");
  const skillInput = document.getElementById("skillInput");
  const skillLevel = document.getElementById("skillLevel");
  const addSkillBtn = document.getElementById("addSkillBtn");
  const skillTags = document.getElementById("skillTags");

  function createSkillTag(category, skill, level) {
    const tag = document.createElement("div");
    tag.className = "flex items-center gap-2 bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full";
    tag.innerHTML = `<span class="font-medium">${category}:</span> <span>${skill} (${level})</span> <button class="remove-skill-btn text-indigo-500 hover:text-indigo-700">&times;</button>`;
    return tag;
  }

  function updateSkillsPreview() {
    previewSkills.innerHTML = "";
    skillTags.querySelectorAll("div").forEach(tag => {
      const clone = tag.cloneNode(true);
      clone.querySelector("button")?.remove();
      previewSkills.appendChild(clone);
    });
  }

  addSkillBtn.addEventListener("click", () => {
    const category = skillCategory.value;
    const skill = skillInput.value.trim();
    const level = skillLevel.value;
    if (!skill) return;
    skillTags.appendChild(createSkillTag(category, skill, level));
    skillInput.value = "";
    updateSkillsPreview();
  });

  skillTags.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-skill-btn")) {
      e.target.closest("div").remove();
      updateSkillsPreview();
    }
  });

  /** ---------------------- Live Preview Updates ---------------------- **/

  
  const previewContent = document.getElementById("previewContent");

  const previewEducation = document.createElement("ul");
  previewEducation.id = "preview-education";
  previewEducation.className = "text-sm list-disc ml-5 mt-1";
  previewContent.appendChild(previewEducation);

  const previewProjects = document.createElement("ul");
  previewProjects.id = "preview-projects";
  previewProjects.className = "text-sm list-disc ml-5 mt-1";
  previewContent.appendChild(previewProjects);

  const previewWork = document.createElement("ul");
  previewWork.id = "preview-work";
  previewWork.className = "text-sm list-disc ml-5 mt-1";
  previewContent.appendChild(previewWork);

  const previewCerts = document.createElement("ul");
  previewCerts.id = "preview-certs";
  previewCerts.className = "text-sm list-disc ml-5 mt-1";
  previewContent.appendChild(previewCerts);

  function updateEducationPreview() {
    previewEducation.innerHTML = "";
    educationList.querySelectorAll(".p-4").forEach(card => {
      const qual = card.querySelector(".education-qualification").value;
      const customQual = card.querySelector(".education-custom-qualification").value;
      const college = card.querySelector(".education-college").value;
      const location = card.querySelector(".education-location").value;
      const start = card.querySelector(".education-start-date").value;
      const end = card.querySelector(".education-end-date").value;
      const grade = card.querySelector(".education-grade").value;
      const li = document.createElement("li");
      li.textContent = `${qual === "Others" ? customQual : qual} | ${college} | ${location} | ${start} - ${end} | ${grade}`;
      previewEducation.appendChild(li);
    });
  }

  function updateProjectsPreview() {
    previewProjects.innerHTML = "";
    projectsList.querySelectorAll(".p-4").forEach(card => {
      const title = card.querySelector(".project-title").value;
      const techs = card.querySelector(".project-techs").value;
      const start = card.querySelector(".project-start-date").value;
      const end = card.querySelector(".project-end-date").value;
      const desc = card.querySelector(".project-description").value;
      const li = document.createElement("li");
      li.textContent = `${title} | ${techs} | ${start} - ${end} | ${desc}`;
      previewProjects.appendChild(li);
    });
  }

  function updateWorkPreview() {
    previewWork.innerHTML = "";
    workList.querySelectorAll(".p-4").forEach(card => {
      const title = card.querySelector(".work-title").value;
      const company = card.querySelector(".work-company").value;
      const start = card.querySelector(".work-start-date").value;
      const end = card.querySelector(".work-end-date").value;
      const ach = card.querySelector(".work-achievements").value;
      const li = document.createElement("li");
      li.textContent = `${title} | ${company} | ${start} - ${end} | ${ach}`;
      previewWork.appendChild(li);
    });
  }

  function updateCertsPreview() {
    previewCerts.innerHTML = "";
    certList.querySelectorAll(".p-4").forEach(card => {
      const name = card.querySelector(".cert-name").value;
      const issuer = card.querySelector(".cert-issuer").value;
      const date = card.querySelector(".cert-date").value;
      const li = document.createElement("li");
      li.textContent = `${name} | ${issuer} | ${date}`;
      previewCerts.appendChild(li);
    });
  }

  educationList.addEventListener("input", updateEducationPreview);
  projectsList.addEventListener("input", updateProjectsPreview);
  workList.addEventListener("input", updateWorkPreview);
  certList.addEventListener("input", updateCertsPreview);

  educationList.addEventListener("click", e => e.target.classList.contains("remove-btn") && updateEducationPreview());
  projectsList.addEventListener("click", e => e.target.classList.contains("remove-btn") && updateProjectsPreview());
  workList.addEventListener("click", e => e.target.classList.contains("remove-btn") && updateWorkPreview());
  certList.addEventListener("click", e => e.target.classList.contains("remove-btn") && updateCertsPreview());

});
