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

  /** ---------------------- Profile Photo ---------------------- **/
  const profileUpload = document.getElementById("profileUpload");
  const avatarPreview = document.getElementById("avatarPreview");
  const previewContent = document.getElementById("previewContent");

  let livePhoto = document.createElement("img");
  livePhoto.id = "previewPhoto";
  livePhoto.className = "w-24 h-24 rounded-full object-cover mb-2";
  livePhoto.style.display = "none";
  previewContent.prepend(livePhoto);

  let livePhotoPlaceholder = document.createElement("div");
  livePhotoPlaceholder.id = "previewPhotoPlaceholder";
  livePhotoPlaceholder.className = "w-24 h-24 rounded-full flex items-center justify-center text-4xl bg-[#f0f4ff] mb-2";
  livePhotoPlaceholder.textContent = "👤";
  previewContent.prepend(livePhotoPlaceholder);

  profileUpload.addEventListener("change", function () {
    avatarPreview.innerHTML = "";
    const file = this.files[0];
    if (file && file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.className = "w-28 h-28 rounded-full object-cover";
      avatarPreview.appendChild(img);

      livePhoto.src = URL.createObjectURL(file);
      livePhoto.style.display = "block";
      livePhotoPlaceholder.style.display = "none";
    } else {
      avatarPreview.textContent = "No photo";
      livePhoto.style.display = "none";
      livePhotoPlaceholder.style.display = "flex";
    }
  });

  /** ---------------------- Objective & Activities ---------------------- **/
  const objectiveInput = document.getElementById("objectiveText");
  const generateBtn = document.getElementById("generateObjectiveBtn");
  const roleInput = document.getElementById("roleInput");

  objectiveInput.addEventListener("input", () => {
    previewObjective.textContent = objectiveInput.value || "---";
  });

  generateBtn.addEventListener("click", () => {
    const role = roleInput.value.trim();
    if (!role) return alert("Please enter a role to generate an objective.");
    const generatedText = `Motivated ${role} with a passion for building efficient and user-friendly solutions, seeking to contribute skills and grow in a dynamic environment.`;
    objectiveInput.value = generatedText;
    previewObjective.textContent = generatedText;
  });

  const activitiesInput = document.getElementById("activitiesText");
  activitiesInput.addEventListener("input", () => {
    previewActivities.textContent = activitiesInput.value || "---";
  });

  /** ---------------------- Sections Data ---------------------- **/
  const sectionsData = [
    { id: "education", title: "Education", listRef: "educationList", fields: [
        { className: "education-qualification", altClass: "education-custom-qualification" },
        { className: "education-college" },
        { className: "education-location" },
        { className: "education-start-date" },
        { className: "education-end-date" },
        { className: "education-grade" }
      ] 
    },
    { id: "projects", title: "Projects", listRef: "projectsList", fields: [
        { className: "project-title" },
        { className: "project-techs" },
        { className: "project-start-date" },
        { className: "project-end-date" },
        { className: "project-description" }
      ] 
    },
    { id: "work", title: "Work Experience", listRef: "workList", fields: [
        { className: "work-title" },
        { className: "work-company" },
        { className: "work-start-date" },
        { className: "work-end-date" },
        { className: "work-achievements" }
      ] 
    },
    { id: "certs", title: "Certifications", listRef: "certList", fields: [
        { className: "cert-name" },
        { className: "cert-issuer" },
        { className: "cert-date" }
      ] 
    }
  ];

  // Create live preview sections dynamically
  sectionsData.forEach(section => {
    const sectionDiv = document.createElement("div");
    sectionDiv.innerHTML = `<h3 class="font-semibold mt-3">${section.title}</h3>`;
    const listEl = document.createElement("ul");
    listEl.id = `preview-${section.id}`;
    listEl.className = "text-sm list-disc ml-5 mt-1";
    sectionDiv.appendChild(listEl);
    previewContent.appendChild(sectionDiv);
    section.previewEl = listEl;
    section.sectionDiv = sectionDiv;
  });

  /** ---------------------- Generic Update Preview ---------------------- **/
  function updatePreview(sectionId) {
    const section = sectionsData.find(s => s.id === sectionId);
    section.previewEl.innerHTML = ""; // clear previous content
    const listContainer = window[section.listRef];

    listContainer.querySelectorAll("div").forEach(card => {
      const values = section.fields.map(f => {
        const element = card.querySelector(`.${f.className}`);
        if (!element) return "";
        if (f.altClass && element.value === "Others") {
          const altElement = card.querySelector(`.${f.altClass}`);
          return altElement ? altElement.value : "";
        }
        return element.value;
      });

      if (values.some(v => v && v.trim() !== "")) {
        let liText = "";
        switch (sectionId) {
          case "education":
            liText = `${values[0] || "---"} - ${values[1] || "---"}, ${values[2] || "---"} (${values[3] || "---"} to ${values[4] || "---"}), Grade: ${values[5] || "---"}`;
            break;
          case "projects":
            liText = `${values[0] || "---"} (${values[1] || "---"}) - ${values[2] || "---"} to ${values[3] || "---"}. ${values[4] || "---"}`;
            break;
          case "work":
            liText = `${values[0] || "---"} at ${values[1] || "---"} (${values[2] || "---"} to ${values[3] || "---"}). Achievements: ${values[4] || "---"}`;
            break;
          case "certs":
            liText = `${values[0] || "---"} by ${values[1] || "---"} (${values[2] || "---"})`;
            break;
        }
        const li = document.createElement("li");
        li.textContent = liText;
        section.previewEl.appendChild(li);
      }
    });

    section.sectionDiv.style.display = section.previewEl.children.length ? "block" : "none";
  }

  // Convenience update functions
  function updateEducationPreview() { updatePreview("education"); }
  function updateProjectsPreview() { updatePreview("projects"); }
  function updateWorkPreview() { updatePreview("work"); }
  function updateCertsPreview() { updatePreview("certs"); }

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
          <input type="text" class="mt-1 w-full px-3 py-2 border rounded-md education-college" placeholder="College/University">
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input type="text" placeholder="Location" class="education-location mt-1 px-3 py-2 border rounded-md">
        <input type="date" class="education-start-date mt-1 px-3 py-2 border rounded-md">
        <input type="date" class="education-end-date mt-1 px-3 py-2 border rounded-md">
      </div>
      <input type="text" placeholder="Grade / Percentage" class="education-grade mt-1 px-3 py-2 border rounded-md w-full">
      <button class="absolute top-2 right-2 text-red-500 remove-btn">Remove</button>
    `;

    /** ---------------------- Skills Section ---------------------- **/
const skillCategory = document.getElementById("skillCategory");
const skillInput = document.getElementById("skillInput");
const skillLevel = document.getElementById("skillLevel");
const addSkillBtn = document.getElementById("addSkillBtn");
const skillTagsContainer = document.getElementById("skillTags");

const skillsData = []; // store skills

function updateSkillsPreview() {
  if (!skillsData.length) {
    previewSkills.textContent = "---";
    return;
  }
  // Group skills by category
  const grouped = {};
  skillsData.forEach(s => {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(`${s.name} (${s.level})`);
  });

  // Generate a string like: "Frontend: React (Intermediate), Angular (Basic) | Backend: Node.js (Advanced)"
  const result = Object.entries(grouped).map(([cat, arr]) => `${cat}: ${arr.join(", ")}`).join(" | ");
  previewSkills.textContent = result;

  // Update tag container for visual tags (optional)
  skillTagsContainer.innerHTML = "";
  skillsData.forEach((s, index) => {
    const tag = document.createElement("span");
    tag.className = "bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm flex items-center gap-1";
    tag.textContent = `${s.name} (${s.level})`;
    const removeBtn = document.createElement("button");
    removeBtn.className = "ml-1 text-red-500 font-bold";
    removeBtn.textContent = "x";
    removeBtn.addEventListener("click", () => {
      skillsData.splice(index, 1);
      updateSkillsPreview();
    });
    tag.appendChild(removeBtn);
    skillTagsContainer.appendChild(tag);
  });
}

addSkillBtn.addEventListener("click", () => {
  const name = skillInput.value.trim();
  if (!name) return alert("Enter a skill name");
  const category = skillCategory.value;
  const level = skillLevel.value;

  // Prevent exact duplicate entries
  if (skillsData.some(s => s.name.toLowerCase() === name.toLowerCase() && s.category === category)) {
    return alert("Skill already added in this category");
  }

  skillsData.push({ name, category, level });
  skillInput.value = "";
  updateSkillsPreview();
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

  function updateProjectsPreview() {
    const previewId = "preview-projects";
    let sectionDiv = document.getElementById(previewId);
    if (!sectionDiv) {
      sectionDiv = document.createElement("div");
      sectionDiv.innerHTML = `<h3 class="font-semibold mt-3">Projects</h3>`;
      const ul = document.createElement("ul");
      ul.id = previewId;
      ul.className = "text-sm list-disc ml-5 mt-1";
      sectionDiv.appendChild(ul);
      previewContent.appendChild(sectionDiv);
    }
    const ul = sectionDiv.querySelector("ul");
    ul.innerHTML = "";

    projectsList.querySelectorAll("div").forEach(card => {
      const title = card.querySelector(".project-title")?.value;
      const techs = card.querySelector(".project-techs")?.value;
      const start = card.querySelector(".project-start-date")?.value;
      const end = card.querySelector(".project-end-date")?.value;
      const desc = card.querySelector(".project-description")?.value;
      if (title || techs || start || end || desc) {
        const li = document.createElement("li");
        li.textContent = `${title || ""} (${techs || ""}) - ${start || ""} to ${end || ""}. ${desc || ""}`;
        ul.appendChild(li);
      }
    });

    sectionDiv.style.display = ul.children.length ? "block" : "none";
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

  function updateWorkPreview() {
    const previewId = "preview-work";
    let sectionDiv = document.getElementById(previewId);
    if (!sectionDiv) {
      sectionDiv = document.createElement("div");
      sectionDiv.innerHTML = `<h3 class="font-semibold mt-3">Work Experience</h3>`;
      const ul = document.createElement("ul");
      ul.id = previewId;
      ul.className = "text-sm list-disc ml-5 mt-1";
      sectionDiv.appendChild(ul);
      previewContent.appendChild(sectionDiv);
    }
    const ul = sectionDiv.querySelector("ul");
    ul.innerHTML = "";

    workList.querySelectorAll("div").forEach(card => {
      const title = card.querySelector(".work-title")?.value;
      const company = card.querySelector(".work-company")?.value;
      const start = card.querySelector(".work-start-date")?.value;
      const end = card.querySelector(".work-end-date")?.value;
      const achievements = card.querySelector(".work-achievements")?.value;
      if (title || company || start || end || achievements) {
        const li = document.createElement("li");
        li.textContent = `${title || ""} at ${company || ""} (${start || ""} to ${end || ""}). Achievements: ${achievements || ""}`;
        ul.appendChild(li);
      }
    });

    sectionDiv.style.display = ul.children.length ? "block" : "none";
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

  function updateCertsPreview() {
    const previewId = "preview-certs";
    let sectionDiv = document.getElementById(previewId);
    if (!sectionDiv) {
      sectionDiv = document.createElement("div");
      sectionDiv.innerHTML = `<h3 class="font-semibold mt-3">Certifications</h3>`;
      const ul = document.createElement("ul");
      ul.id = previewId;
      ul.className = "text-sm list-disc ml-5 mt-1";
      sectionDiv.appendChild(ul);
      previewContent.appendChild(sectionDiv);
    }
    const ul = sectionDiv.querySelector("ul");
    ul.innerHTML = "";

    certList.querySelectorAll("div").forEach(card => {
      const name = card.querySelector(".cert-name")?.value;
      const issuer = card.querySelector(".cert-issuer")?.value;
      const date = card.querySelector(".cert-date")?.value;
      if (name || issuer || date) {
        const li = document.createElement("li");
        li.textContent = `${name || ""} by ${issuer || ""} (${date || ""})`;
        ul.appendChild(li);
      }
    });

    sectionDiv.style.display = ul.children.length ? "block" : "none";
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


    // Handle "Others" selection
    const select = card.querySelector(".education-qualification");
    const input = card.querySelector(".education-custom-qualification");
    select.addEventListener("change", () => {
      input.classList.toggle("hidden", select.value !== "Others");
      updateEducationPreview();
    });

    card.querySelectorAll("input, select").forEach(el => {
      el.addEventListener("input", updateEducationPreview);
    });

    card.querySelector(".remove-btn").addEventListener("click", () => {
      card.remove();
      updateEducationPreview();
    });

    educationList.appendChild(card);
  }

  addEducationBtn.addEventListener("click", createEducationCard);

});
