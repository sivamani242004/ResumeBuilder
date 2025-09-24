document.addEventListener("DOMContentLoaded", () => {
  /** ---------------------- Section Navigation ---------------------- **/
  const sectionButtons = document.querySelectorAll(".section-button");
  const sections = document.querySelectorAll(".section-card");

  function clearNavStyles() {
    sectionButtons.forEach((b) => {
      b.style.background = "";
      b.style.color = "";
      b.style.boxShadow = "";
      b.setAttribute("aria-current", "false");
    });
  }
  function setActiveBtn(btn) {
    btn.style.background = "linear-gradient(90deg,#7b63ff,#566dff)";
    btn.style.color = "#fff";
    btn.style.boxShadow = "0 8px 20px rgba(14,25,49,0.04)";
    btn.setAttribute("aria-current", "true");
  }

  function showSection(targetId) {
    sections.forEach((s) => s.classList.add("hidden"));
    const el = document.getElementById(`section-${targetId}`);
    if (el) el.classList.remove("hidden");

    sectionButtons.forEach((btn) => {
      if (btn.getAttribute("data-target") === targetId) setActiveBtn(btn);
      else {
        btn.style.background = "";
        btn.style.color = "";
        btn.style.boxShadow = "";
        btn.setAttribute("aria-current", "false");
      }
    });
  }

  sectionButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const t = btn.getAttribute("data-target");
      if (t) showSection(t);
    })
  );

  // Show personal at start
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

  function safeText(t) {
    return t && t.trim() !== "" ? t : "---";
  }

  function updatePersonalPreview() {
    previewName.textContent = safeText(fullnameInput.value);
    previewEmail.textContent = safeText(emailInput.value);
    previewPhone.textContent = safeText(phoneInput.value);

    // LinkedIn - show link if valid, otherwise raw text or ---
    if (liInput.value.trim() && isValidLinkedIn(liInput.value.trim())) {
      previewLinkedIn.innerHTML = `<a href="${liInput.value.trim()}" target="_blank" rel="noopener">${liInput.value.trim()}</a>`;
    } else {
      previewLinkedIn.textContent = liInput.value.trim() || "---";
    }

    // GitHub
    if (gitInput.value.trim() && isValidGitHub(gitInput.value.trim())) {
      previewGitHub.innerHTML = `<a href="${gitInput.value.trim()}" target="_blank" rel="noopener">${gitInput.value.trim()}</a>`;
    } else {
      previewGitHub.textContent = gitInput.value.trim() || "---";
    }
  }

  [fullnameInput, emailInput, phoneInput, liInput, gitInput].forEach(
    (input) => input && input.addEventListener("input", updatePersonalPreview)
  );

  // initialize preview values
  updatePersonalPreview();

  /** ---------------------- Profile Photo ---------------------- **/
  const profileUpload = document.getElementById("profileUpload");
  const avatarPreview = document.getElementById("avatarPreview");
  const previewContent = document.getElementById("previewContent");

  // Reuse existing preview img element if present
  const previewHeader =
    previewContent.querySelector(".flex.items-center.gap-3") ||
    previewContent.querySelector(".flex.items-center");
  let previewImg = document.getElementById("previewPhoto");
  let previewPlaceholder = document.getElementById("previewPhotoPlaceholder");
  if (!previewPlaceholder) {
    previewPlaceholder = document.createElement("div");
    previewPlaceholder.id = "previewPhotoPlaceholder";
    previewPlaceholder.className =
      "w-24 h-24 rounded-full flex items-center justify-center text-4xl bg-[#f0f4ff]";
    previewPlaceholder.textContent = "👤";
  }
  if (previewHeader) {
    // insert placeholder before the image (if image exists)
    if (previewImg) previewHeader.insertBefore(previewPlaceholder, previewImg);
    else previewHeader.prepend(previewPlaceholder);
  }
  if (previewImg) previewImg.style.display = "none";
  previewPlaceholder.style.display = "flex";

  profileUpload.addEventListener("change", function () {
    const file = this.files && this.files[0];
    if (file && file.type.startsWith("image/")) {
      const objUrl = URL.createObjectURL(file);

      // show in form avatarPreview
      const img = document.createElement("img");
      img.src = objUrl;
      img.className = "w-28 h-28 rounded-full object-cover";
      avatarPreview.innerHTML = "";
      avatarPreview.appendChild(img);

      // show in preview panel
      if (previewImg) {
        previewImg.src = objUrl;
        previewImg.style.display = "block";
      }
      previewPlaceholder.style.display = "none";
    } else {
      avatarPreview.textContent = "No photo";
      if (previewImg) previewImg.style.display = "none";
      previewPlaceholder.style.display = "flex";
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

  /** ---------------------- Validation helpers ---------------------- **/
  const emailErr = document.getElementById("emailErr");
  const phoneErr = document.getElementById("phoneErr");
  const liErr = document.getElementById("liErr");
  const gitErr = document.getElementById("gitErr");

  function validateEmailField() {
    const v = emailInput.value.trim();
    if (!v) {
      emailErr.classList.add("hidden");
      return true;
    }
    const valid = v.toLowerCase().endsWith("@gmail.com");
    if (!valid) emailErr.classList.remove("hidden");
    else emailErr.classList.add("hidden");
    return valid;
  }

  function validatePhoneField() {
    const v = phoneInput.value.trim();
    if (!v) {
      phoneErr.classList.add("hidden");
      return true;
    }
    const numeric = /^\d{10}$/.test(v);
    const notStartZero = !/^0/.test(v);
    const ok = numeric && notStartZero;
    if (!ok) phoneErr.classList.remove("hidden");
    else phoneErr.classList.add("hidden");
    return ok;
  }

  function isValidHttpUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
  function isValidLinkedIn(url) {
    if (!isValidHttpUrl(url)) return false;
    try {
      const host = new URL(url).hostname.toLowerCase();
      return host.includes("linkedin.com");
    } catch (e) {
      return false;
    }
  }
  function isValidGitHub(url) {
    if (!isValidHttpUrl(url)) return false;
    try {
      const host = new URL(url).hostname.toLowerCase();
      return host.includes("github.com");
    } catch (e) {
      return false;
    }
  }

  function validateLinkedInField() {
    const v = liInput.value.trim();
    if (!v) {
      liErr.classList.add("hidden");
      return true;
    }
    const ok = isValidLinkedIn(v);
    if (!ok) liErr.classList.remove("hidden");
    else liErr.classList.add("hidden");
    return ok;
  }
  function validateGitHubField() {
    const v = gitInput.value.trim();
    if (!v) {
      gitErr.classList.add("hidden");
      return true;
    }
    const ok = isValidGitHub(v);
    if (!ok) gitErr.classList.remove("hidden");
    else gitErr.classList.add("hidden");
    return ok;
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      emailErr.classList.add("hidden");
      updatePersonalPreview();
    });
    emailInput.addEventListener("blur", validateEmailField);
  }
  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneErr.classList.add("hidden");
      updatePersonalPreview();
    });
    phoneInput.addEventListener("blur", validatePhoneField);
  }
  if (liInput) {
    liInput.addEventListener("input", () => {
      liErr.classList.add("hidden");
      updatePersonalPreview();
    });
    liInput.addEventListener("blur", validateLinkedInField);
  }
  if (gitInput) {
    gitInput.addEventListener("input", () => {
      gitErr.classList.add("hidden");
      updatePersonalPreview();
    });
    gitInput.addEventListener("blur", validateGitHubField);
  }

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
          .filter((v) => v && v.trim() !== "");
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
      if (section && section.updatePreview) section.updatePreview();
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
    `<input type="text" placeholder="Qualification" class="w-full p-2 rounded border">
     <input type="text" placeholder="College" class="w-full p-2 rounded border">
     <input type="text" placeholder="Location" class="w-full p-2 rounded border">
     <input type="date" class="w-full p-2 rounded border">
     <input type="date" class="w-full p-2 rounded border">
     <input type="text" placeholder="Grade" class="w-full p-2 rounded border">`
  );

  // Projects
  setupSection(
    "projectsList",
    "addProjectBtn",
    `<input type="text" placeholder="Project Title" class="w-full p-2 rounded border">
     <input type="text" placeholder="Technologies Used" class="w-full p-2 rounded border">
     <input type="date" class="w-full p-2 rounded border">
     <input type="date" class="w-full p-2 rounded border">
     <textarea placeholder="Description" class="w-full p-2 rounded border"></textarea>`
  );

  // Work
  setupSection(
    "workList",
    "addWorkBtn",
    `<input type="text" placeholder="Job Title" class="w-full p-2 rounded border">
     <input type="text" placeholder="Company" class="w-full p-2 rounded border">
     <input type="date" class="w-full p-2 rounded border">
     <input type="date" class="w-full p-2 rounded border">
     <textarea placeholder="Achievements" class="w-full p-2 rounded border"></textarea>`
  );

  // Certifications
  setupSection(
    "certList",
    "addCertBtn",
    `<input type="text" placeholder="Certification Name" class="w-full p-2 rounded border">
     <input type="text" placeholder="Issuer" class="w-full p-2 rounded border">
     <input type="month" class="w-full p-2 rounded border">`
  );

  /** ---------------------- Export (PDF / TXT) ---------------------- **/
  function collectPreviewText() {
    const lines = [];
    lines.push(`Name: ${previewName.textContent}`);
    lines.push(`Email: ${previewEmail.textContent}`);
    lines.push(`Phone: ${previewPhone.textContent}`);
    // LinkedIn & GitHub raw text
    lines.push(`LinkedIn: ${liInput.value.trim() || "---"}`);
    lines.push(`GitHub: ${gitInput.value.trim() || "---"}`);
    lines.push("");
    lines.push(
      `Objective:\n${
        objectiveInput.value.trim() || previewObjective.textContent || "---"
      }`
    );
    lines.push("");

    // sections (education/projects/work/certs)
    sectionsData.forEach((s) => {
      const p = document.getElementById(s.previewEl);
      if (p && p.innerText.trim()) {
        lines.push(p.innerText.trim());
        lines.push("");
      }
    });

    // skills
    const skills = Array.from(skillTagsContainer.querySelectorAll("span")).map(
      (s) => s.textContent
    );
    if (skills.length) {
      lines.push("Skills:\n" + skills.join(", "));
      lines.push("");
    }

    // activities
    if (activitiesInput.value.trim()) {
      lines.push("Activities:\n" + activitiesInput.value.trim());
    }

    return lines.join("\n");
  }

  const exportTxtBtn = document.getElementById("exportTxtBtn");
  const exportPdfBtn = document.getElementById("exportPdfBtn");

  exportTxtBtn.addEventListener("click", () => {
    const txt = collectPreviewText();
    const blob = new Blob([txt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  exportPdfBtn.addEventListener("click", () => {
    const previewContent = document.getElementById("livePreviewPanel");

    // Temporarily apply a fixed width for consistent rendering
    const originalWidth = previewContent.style.width;
    const originalPadding = previewContent.style.padding;
    const originalMargin = previewContent.style.margin;
    previewContent.style.width = "800px";
    previewContent.style.padding = "50px";
    previewContent.style.margin = "0 auto";

    html2canvas(previewContent, {
      scale: 2, // Use a higher scale for better resolution
      scrollY: -window.scrollY,
      useCORS: true,
      logging: true,
    })
      .then((canvas) => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210; // A4 size in mm
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Add the image to the PDF
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add new pages for content that doesn't fit
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Revert temporary styles
        previewContent.style.width = originalWidth;
        previewContent.style.padding = originalPadding;
        previewContent.style.margin = originalMargin;

        pdf.save("resume.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        alert(
          "There was an error generating the PDF. Please check the console for details."
        );
      });
  });
});
