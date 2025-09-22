document.addEventListener("DOMContentLoaded", () => {
  /** ---------------------- Section Navigation ---------------------- **/
  const sectionButtons = document.querySelectorAll(".section-button");
  const sections = document.querySelectorAll(".section-card");

  function showSection(targetId) {
    sections.forEach((s) => s.classList.add("hidden"));
    const el = document.getElementById(`section-${targetId}`);
    if (el) el.classList.remove("hidden");
  }

  sectionButtons.forEach((btn) => {
    btn.addEventListener("click", () =>
      showSection(btn.getAttribute("data-target"))
    );
  });

  showSection("personal");

  /** ---------------------- Auto-expand Textareas ---------------------- **/
  window.autoExpandTextarea = function (textarea) {
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

  function updatePersonalPreview() {
    previewName.textContent = fullnameInput.value || "---";
    previewEmail.textContent = emailInput.value || "---";
    previewPhone.textContent = phoneInput.value || "---";
    previewLinkedIn.textContent = liInput.value || "---";
    previewGitHub.textContent = gitInput.value || "---";
  }

  [fullnameInput, emailInput, phoneInput, liInput, gitInput].forEach((input) =>
    input.addEventListener("input", updatePersonalPreview)
  );

  emailInput.addEventListener("input", () => {
    const err = document.getElementById("emailErr");
    err.classList.toggle(
      "hidden",
      !emailInput.value || emailInput.value.endsWith("@gmail.com")
    );
  });

  phoneInput.addEventListener("input", () => {
    const err = document.getElementById("phoneErr");
    err.classList.toggle(
      "hidden",
      /^[1-9][0-9]{9}$/.test(phoneInput.value.trim())
    );
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
  livePhotoPlaceholder.className =
    "w-24 h-24 rounded-full flex items-center justify-center text-4xl bg-[#f0f4ff] mb-2";
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
    { id: "education", title: "Education", listRef: "educationList" },
    { id: "projects", title: "Projects", listRef: "projectsList" },
    { id: "work", title: "Work Experience", listRef: "workList" },
    { id: "certs", title: "Certifications", listRef: "certList" },
  ];

  // Create preview sections dynamically
  sectionsData.forEach((section) => {
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

  /** ---------------------- Generic Update Function ---------------------- **/
  function updatePreview(sectionId) {
    const section = sectionsData.find((s) => s.id === sectionId);
    const listContainer = document.getElementById(section.listRef);
    if (!listContainer) return;

    section.previewEl.innerHTML = "";
    listContainer.querySelectorAll("div").forEach((card) => {
      const values = Array.from(
        card.querySelectorAll("input, select, textarea")
      ).map((el) => (el.value ? el.value : ""));
      if (values.some((v) => v.trim() !== "")) {
        const li = document.createElement("li");
        li.textContent = values.join(" | ");
        section.previewEl.appendChild(li);
      }
    });
    section.sectionDiv.style.display = section.previewEl.children.length
      ? "block"
      : "none";
  }

  /** ---------------------- Create Education Card ---------------------- **/
  const educationList = document.getElementById("educationList");
  const addEducationBtn = document.getElementById("addEducationBtn");

  function createEducationCard() {
    const card = document.createElement("div");
    card.className =
      "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
    card.innerHTML = `
      <div>
        <input type="text" placeholder="Qualification" class="education-qualification">
        <input type="text" placeholder="College" class="education-college">
        <input type="text" placeholder="Location" class="education-location">
        <input type="date" class="education-start-date">
        <input type="date" class="education-end-date">
        <input type="text" placeholder="Grade" class="education-grade">
      </div>
      <button class="remove-btn absolute top-2 right-2 text-red-500">Remove</button>
    `;
    card.querySelector(".remove-btn").addEventListener("click", () => {
      card.remove();
      updatePreview("education");
    });
    card
      .querySelectorAll("input, select")
      .forEach((el) =>
        el.addEventListener("input", () => updatePreview("education"))
      );
    educationList.appendChild(card);
  }
  addEducationBtn.addEventListener("click", createEducationCard);

  /** ---------------------- Generic Section Card Creator ---------------------- **/
  function setupSection(sectionId, addBtnId, createCardFn) {
    const listEl = document.getElementById(
      sectionsData.find((s) => s.id === sectionId).listRef
    );
    const addBtn = document.getElementById(addBtnId);
    addBtn.addEventListener("click", () => {
      const card = createCardFn();
      listEl.appendChild(card);
      card
        .querySelectorAll("input, textarea, select")
        .forEach((el) =>
          el.addEventListener("input", () => updatePreview(sectionId))
        );
      card.querySelector(".remove-btn").addEventListener("click", () => {
        card.remove();
        updatePreview(sectionId);
      });
      updatePreview(sectionId);
    });
  }

  // Project Card
  function createProjectCard() {
    const card = document.createElement("div");
    card.className =
      "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
    card.innerHTML = `
      <input type="text" placeholder="Project Title" class="project-title">
      <input type="text" placeholder="Technologies Used" class="project-techs">
      <input type="date" class="project-start-date">
      <input type="date" class="project-end-date">
      <textarea placeholder="Description" class="project-description"></textarea>
      <button class="remove-btn absolute top-2 right-2 text-red-500">Remove</button>
    `;
    return card;
  }
  setupSection("projects", "addProjectBtn", createProjectCard);

  // Work Card
  function createWorkCard() {
    const card = document.createElement("div");
    card.className =
      "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
    card.innerHTML = `
      <input type="text" placeholder="Job Title" class="work-title">
      <input type="text" placeholder="Company" class="work-company">
      <input type="date" class="work-start-date">
      <input type="date" class="work-end-date">
      <textarea placeholder="Achievements" class="work-achievements"></textarea>
      <button class="remove-btn absolute top-2 right-2 text-red-500">Remove</button>
    `;
    return card;
  }
  setupSection("work", "addWorkBtn", createWorkCard);

  // Certification Card
  function createCertCard() {
    const card = document.createElement("div");
    card.className =
      "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
    card.innerHTML = `
      <input type="text" placeholder="Certification Name" class="cert-name">
      <input type="text" placeholder="Issuer" class="cert-issuer">
      <input type="month" class="cert-date">
      <button class="remove-btn absolute top-2 right-2 text-red-500">Remove</button>
    `;
    return card;
  }
  setupSection("certs", "addCertBtn", createCertCard);
});

document.addEventListener("DOMContentLoaded", () => {
  const previewContent = document.getElementById("previewContent");

  // --- Profile Photo ---
  const livePhoto = document.getElementById("previewPhoto");
  const livePhotoPlaceholder = document.getElementById(
    "previewPhotoPlaceholder"
  );
  const profileUpload = document.getElementById("profileUpload");
  profileUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (file && file.type.startsWith("image/")) {
      livePhoto.src = URL.createObjectURL(file);
      livePhoto.style.display = "block";
      livePhotoPlaceholder.style.display = "none";
    } else {
      livePhoto.style.display = "none";
      livePhotoPlaceholder.style.display = "flex";
    }
  });

  // --- Personal Info ---
  const fullnameInput = document.querySelector('input[name="fullname"]');
  const emailInput = document.getElementById("personalEmail");
  const phoneInput = document.getElementById("personalPhone");
  const liInput = document.getElementById("linkedinInput");
  const gitInput = document.getElementById("githubInput");

  function updatePersonalPreview() {
    document.getElementById("previewName").textContent =
      fullnameInput.value || "---";
    document.getElementById("previewEmail").textContent =
      emailInput.value || "---";
    document.getElementById("previewPhone").textContent =
      phoneInput.value || "---";
    document.getElementById("previewLinkedIn").textContent =
      liInput.value || "---";
    document.getElementById("previewGitHub").textContent =
      gitInput.value || "---";
  }

  [fullnameInput, emailInput, phoneInput, liInput, gitInput].forEach((input) =>
    input.addEventListener("input", updatePersonalPreview)
  );

  // --- Objective & Activities ---
  const objectiveInput = document.getElementById("objectiveText");
  const activitiesInput = document.getElementById("activitiesText");
  objectiveInput.addEventListener("input", () => {
    document.getElementById("previewObjective").textContent =
      objectiveInput.value || "---";
  });
  activitiesInput.addEventListener("input", () => {
    document.getElementById("previewActivities").textContent =
      activitiesInput.value || "---";
  });

  // --- Skills ---
  const skillTagsContainer = document.getElementById("skillTags");
  const previewSkillsSection = document.getElementById(
    "preview-skills-section"
  );

  function updateSkillsPreview() {
    previewSkillsSection.innerHTML = "";
    const skills = skillTagsContainer.querySelectorAll("span");
    if (skills.length === 0) return;
    const header = document.createElement("h3");
    header.className = "font-semibold mt-3";
    header.textContent = "Skills";
    previewSkillsSection.appendChild(header);

    const ul = document.createElement("ul");
    ul.className = "text-sm list-disc ml-5 mt-1";

    skills.forEach((skill) => {
      const li = document.createElement("li");
      li.textContent = skill.textContent;
      ul.appendChild(li);
    });

    previewSkillsSection.appendChild(ul);
  }

  document.getElementById("addSkillBtn").addEventListener("click", () => {
    const category = document.getElementById("skillCategory").value;
    const skill = document.getElementById("skillInput").value.trim();
    const level = document.getElementById("skillLevel").value;
    if (!skill) return;

    const tag = document.createElement("span");
    tag.textContent = `${category}: ${skill} (${level})`;
    tag.className =
      "bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs cursor-pointer";
    tag.addEventListener("click", () => {
      tag.remove();
      updateSkillsPreview();
    });

    skillTagsContainer.appendChild(tag);
    updateSkillsPreview();
    document.getElementById("skillInput").value = "";
  });

  // --- Generic Section Preview (Education, Projects, Work, Certifications) ---
  const sectionsData = [
    {
      id: "education",
      listRef: "educationList",
      previewEl: "preview-education-section",
      title: "Education",
    },
    {
      id: "projects",
      listRef: "projectsList",
      previewEl: "preview-projects-section",
      title: "Projects",
    },
    {
      id: "work",
      listRef: "workList",
      previewEl: "preview-work-section",
      title: "Work Experience",
    },
    {
      id: "certs",
      listRef: "certList",
      previewEl: "preview-certifications-section",
      title: "Certifications",
    },
  ];

  sectionsData.forEach((section) => {
    const updateSectionPreview = () => {
      const listContainer = document.getElementById(section.listRef);
      const previewContainer = document.getElementById(section.previewEl);
      previewContainer.innerHTML = "";

      const cards = listContainer.querySelectorAll("div");
      if (cards.length === 0) return;

      const header = document.createElement("h3");
      header.className = "font-semibold mt-3";
      header.textContent = section.title;
      previewContainer.appendChild(header);

      const ul = document.createElement("ul");
      ul.className = "text-sm list-disc ml-5 mt-1";

      cards.forEach((card) => {
        const values = Array.from(
          card.querySelectorAll("input, select, textarea")
        )
          .map((el) => el.value)
          .filter((v) => v.trim() !== "");
        if (values.length) {
          const li = document.createElement("li");
          li.textContent = values.join(" | ");
          ul.appendChild(li);
        }

        // Attach remove event for live update
        const removeBtn = card.querySelector(".remove-btn");
        if (removeBtn) {
          removeBtn.addEventListener("click", () => {
            card.remove();
            updateSectionPreview();
          });
        }
      });

      if (ul.children.length > 0) previewContainer.appendChild(ul);
    };

    // Initial preview update
    updateSectionPreview();

    // Update preview on input dynamically
    document
      .getElementById(section.listRef)
      .addEventListener("input", updateSectionPreview);
  });
});
