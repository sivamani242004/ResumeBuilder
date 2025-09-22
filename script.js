document.addEventListener("DOMContentLoaded", () => {
  /** ---------------------- Section Navigation ---------------------- **/
  const sectionButtons = document.querySelectorAll(".section-button");
  const sections = document.querySelectorAll(".section-card");

  function showSection(targetId) {
    sections.forEach((s) => s.classList.add("hidden"));
    const el = document.getElementById(`section-${targetId}`);
    if (el) el.classList.remove("hidden");
  }

  sectionButtons.forEach((btn) =>
    btn.addEventListener("click", () =>
      showSection(btn.getAttribute("data-target"))
    )
  );

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
    const file = this.files[0];
    if (file && file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.className = "w-28 h-28 rounded-full object-cover";
      avatarPreview.innerHTML = "";
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
  const previewObjective = document.getElementById("previewObjective");
  const activitiesInput = document.getElementById("activitiesText");
  const previewActivities = document.getElementById("previewActivities");

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

  activitiesInput.addEventListener("input", () => {
    previewActivities.textContent = activitiesInput.value || "---";
  });

  /** ---------------------- Skills ---------------------- **/
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

  /** ---------------------- Sections: Education, Projects, Work, Certs ---------------------- **/
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
    const listContainer = document.getElementById(section.listRef);
    const previewContainer = document.getElementById(section.previewEl);

    function updateSectionPreview() {
      previewContainer.innerHTML = "";
      const cards = listContainer.querySelectorAll(".card");
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
      });

      if (ul.children.length > 0) previewContainer.appendChild(ul);
    }

    // Initialize preview on input
    listContainer.addEventListener("input", updateSectionPreview);

    // Store update function for card creators
    section.updatePreview = updateSectionPreview;
  });

  /** ---------------------- Generic Card Creator ---------------------- **/
  function createCard(listRef, fieldsHtml) {
    const card = document.createElement("div");
    card.className =
      "card p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";
    card.innerHTML =
      fieldsHtml +
      `<button class="remove-btn absolute top-2 right-2 text-red-500">Remove</button>`;

    const removeBtn = card.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      card.remove();
      const section = sectionsData.find((s) => s.listRef === listRef);
      section.updatePreview();
    });

    return card;
  }

  /** ---------------------- Setup Sections ---------------------- **/
  function setupSection(sectionId, addBtnId, fieldsHtml) {
    const listContainer = document.getElementById(sectionId);
    const addBtn = document.getElementById(addBtnId);
    const section = sectionsData.find((s) => s.listRef === sectionId);

    addBtn.addEventListener("click", () => {
      const card = createCard(sectionId, fieldsHtml);
      listContainer.appendChild(card);
      card
        .querySelectorAll("input, textarea, select")
        .forEach((el) => el.addEventListener("input", section.updatePreview));
      section.updatePreview();
    });
  }

  // Education
  setupSection(
    "educationList",
    "addEducationBtn",
    `<input type="text" placeholder="Qualification">
     <input type="text" placeholder="College">
     <input type="text" placeholder="Location">
     <input type="date">
     <input type="date">
     <input type="text" placeholder="Grade">`
  );

  // Projects
  setupSection(
    "projectsList",
    "addProjectBtn",
    `<input type="text" placeholder="Project Title">
     <input type="text" placeholder="Technologies Used">
     <input type="date">
     <input type="date">
     <textarea placeholder="Description"></textarea>`
  );

  // Work
  setupSection(
    "workList",
    "addWorkBtn",
    `<input type="text" placeholder="Job Title">
     <input type="text" placeholder="Company">
     <input type="date">
     <input type="date">
     <textarea placeholder="Achievements"></textarea>`
  );

  // Certifications
  setupSection(
    "certList",
    "addCertBtn",
    `<input type="text" placeholder="Certification Name">
     <input type="text" placeholder="Issuer">
     <input type="month">`
  );
});
