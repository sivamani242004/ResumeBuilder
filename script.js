// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Section Navigation
  const sectionButtons = document.querySelectorAll(".section-button");
  const sections = document.querySelectorAll(".section-card");

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

  // // Add Education Entry
  // document.getElementById("addEducationBtn").addEventListener("click", () => {
  //   const container = document.getElementById("educationList");
  //   const div = document.createElement("div");
  //   div.className =
  //     "grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 rounded-lg p-3";
  //   div.innerHTML = `
  //     <input type="text" placeholder="Degree / Certification" class="rounded-lg border px-3 py-2">
  //     <input type="text" placeholder="Institute / University" class="rounded-lg border px-3 py-2">
  //   `;
  //   container.appendChild(div);
      
  // }); 


    const educationList = document.getElementById("educationList");
    const addBtn = document.getElementById("addEducationBtn");

    function createEducationCard() {
      const card = document.createElement("div");
      card.className = "p-4 border rounded-lg shadow-sm bg-gray-50 space-y-3 relative";

      // Qualification wrapper
      const qualificationWrapper = document.createElement("div");

      const qualificationLabel = document.createElement("label");
      qualificationLabel.textContent = "Qualification";
      qualificationLabel.className = "block text-sm font-medium text-gray-700";

      const qualificationSelect = document.createElement("select");
      qualificationSelect.className = "mt-1 block w-full px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400";

      const options = [
        "", "10th Class", "Intermediate", "Diploma", "Degree", "B-tech",
        "Under-graduate", "Graduate", "PG", "Others"
      ];
      options.forEach(opt => {
        const optionEl = document.createElement("option");
        optionEl.value = opt;
        optionEl.textContent = opt === "" ? "Select qualification" : opt;
        qualificationSelect.appendChild(optionEl);
      });

      // Custom qualification input
      const customQualification = document.createElement("input");
      customQualification.type = "text";
      customQualification.placeholder = "Enter qualification";
      customQualification.className = "mt-2 hidden w-full px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400";

      qualificationSelect.addEventListener("change", () => {
        if (qualificationSelect.value === "Others") {
          customQualification.classList.remove("hidden");
        } else {
          customQualification.classList.add("hidden");
          customQualification.value = "";
        }
      });

      qualificationWrapper.appendChild(qualificationLabel);
      qualificationWrapper.appendChild(qualificationSelect);
      qualificationWrapper.appendChild(customQualification);

      // College input
      const collegeInput = document.createElement("input");
      collegeInput.type = "text";
      collegeInput.placeholder = "College/University/School";
      collegeInput.className = "w-full px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400";

      // Location input
      const locationInput = document.createElement("input");
      locationInput.type = "text";
      locationInput.placeholder = "Location";
      locationInput.className = "w-full px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400";

      // Dates
      const dateWrapper = document.createElement("div");
      dateWrapper.className = "flex items-center space-x-2";

      const startDate = document.createElement("input");
      startDate.type = "date";
      startDate.className = "w-1/2 px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400";

      const endDate = document.createElement("input");
      endDate.type = "date";
      endDate.className = "w-1/2 px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400";

      dateWrapper.appendChild(startDate);
      dateWrapper.appendChild(endDate);

      // Grade input
      const gradeInput = document.createElement("input");
      gradeInput.type = "number";
      gradeInput.placeholder = "Grade/Score";
      gradeInput.className = "w-full px-3 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400";

      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = "Remove";
      removeBtn.className = "absolute top-2 right-2 text-sm px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200";

      removeBtn.addEventListener("click", () => {
        educationList.removeChild(card);
      });

      // Append all
      card.appendChild(qualificationWrapper);
      card.appendChild(collegeInput);
      card.appendChild(locationInput);
      card.appendChild(dateWrapper);
      card.appendChild(gradeInput);
      card.appendChild(removeBtn);

      return card;
    }

    // Add card on button click
    addBtn.addEventListener("click", () => {
      const newCard = createEducationCard();
      educationList.appendChild(newCard);
    });

  // Add Projects Entry
  document.getElementById("addProjectBtn").addEventListener("click", () => {
    const container = document.getElementById("projectsList");
    const div = document.createElement("div");
    div.className = "grid grid-cols-1 gap-3 bg-gray-50 rounded-lg p-3";
    div.innerHTML = `
      <input type="text" placeholder="Project Title" class="rounded-lg border px-3 py-2">
      <textarea placeholder="Description" class="rounded-lg border px-3 py-2 resize-none" rows="3"></textarea>
    `;
    container.appendChild(div);
  });

  // Add Work Entry
  document.getElementById("addWorkBtn").addEventListener("click", () => {
    const container = document.getElementById("workList");
    const div = document.createElement("div");
    div.className = "grid grid-cols-1 gap-3 bg-gray-50 rounded-lg p-3";
    div.innerHTML = `
      <input type="text" placeholder="Job Title" class="rounded-lg border px-3 py-2">
      <input type="text" placeholder="Company" class="rounded-lg border px-3 py-2">
      <textarea placeholder="Description" class="rounded-lg border px-3 py-2 resize-none" rows="3"></textarea>
    `;
    container.appendChild(div);
  });

  // Add Certification Entry
  document.getElementById("addCertBtn").addEventListener("click", () => {
    const container = document.getElementById("certList");
    const div = document.createElement("div");
    div.className = "grid grid-cols-1 gap-3 bg-gray-50 rounded-lg p-3";
    div.innerHTML = `
      <input type="text" placeholder="Certification Name" class="rounded-lg border px-3 py-2">
      <input type="text" placeholder="Issuer" class="rounded-lg border px-3 py-2">
    `;
    container.appendChild(div);
  });

  // Add Custom Section
  document.getElementById("addCustomBtn").addEventListener("click", () => {
    const title = document.getElementById("customTitle").value.trim();
    const details = document.getElementById("customDetails").value.trim();
    if (!title || !details) return;

    const container = document.getElementById("sections-container");
    const div = document.createElement("div");
    div.className = "bg-white rounded-2xl shadow p-6 section-card mb-6";
    div.innerHTML = `
      <h2 class="text-lg font-semibold">${title}</h2>
      <div class="mt-4 text-sm text-gray-600">${details}</div>
    `;
    container.appendChild(div);
    document.getElementById("customTitle").value = "";
    document.getElementById("customDetails").value = "";
  });

  // Skills
  document.getElementById("addSkillBtn").addEventListener("click", () => {
    const input = document.getElementById("skillInput");
    const value = input.value.trim();
    if (!value) return;

    const tag = document.createElement("span");
    tag.className =
      "bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs cursor-pointer";
    tag.textContent = value;
    tag.addEventListener("click", () => tag.remove());
    document.getElementById("skillTags").appendChild(tag);
    input.value = "";
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
