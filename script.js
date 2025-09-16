 // Sections data
      const sections = [
        { id: 'personal', title: 'Personal', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5a8.25 8.25 0 0115 0"/></svg>' },
        { id: 'objective', title: 'Objective', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3"/><path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5a4.5 4.5 0 014.5-4.5h9A4.5 4.5 0 0121 7.5v9a4.5 4.5 0 01-4.5 4.5H7.5A4.5 4.5 0 013 16.5v-9z"/></svg>' },
        { id: 'education', title: 'Education', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422M12 14V21"/></svg>' },
        { id: 'skills', title: 'Skills', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18"/></svg>' },
        { id: 'projects', title: 'Projects', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 20l9-5-9-5-9 5 9 5z"/></svg>' },
        { id: 'work', title: 'Work', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18v13H3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V5a4 4 0 018 0v2"/></svg>' },
        { id: 'certifications', title: 'Certifications', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c1.657 0 3-1.567 3-3.5S13.657 1 12 1 9 2.567 9 4.5 10.343 8 12 8z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 21c2-2 4-3 6-3s4 1 6 3"/></svg>' },
        { id: 'activities', title: 'Activities', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12h18M3 6h18M3 18h18"/></svg>' },
        { id: 'custom', title: 'Custom', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>' },
        { id: 'template', title: 'Template', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18"/></svg>' }
      ];

      // create sidebar nav
      const navRoot = document.querySelector('aside nav');
      const tpl = document.getElementById('nav-template');
      sections.forEach((s, idx) => {
        const node = tpl.content.cloneNode(true);
        const btn = node.querySelector('button');
        btn.dataset.target = s.id;
        btn.querySelector('.icon').innerHTML = s.icon;
        btn.querySelector('.label').textContent = s.title;
        btn.classList.add('px-3','py-2');
        btn.addEventListener('click', () => showSection(s.id));
        btn.classList.add('transition','section-button');
        navRoot.appendChild(node);
      });
      
      
      // section templates
      const sectionsContainer = document.getElementById('sections-container');

      function createSectionHTML(id) {
        switch(id) {
          case 'personal': return personalSection();
          case 'objective': return objectiveSection();
          case 'education': return educationSection();
          case 'skills': return skillsSection();
          case 'projects': return projectsSection();
          case 'work': return workSection();
          case 'certifications': return certificationsSection();
          case 'activities': return activitiesSection();
          case 'custom': return customSection();
          case 'template': return templateSection();
        }
      }

      function renderAllSections(){
        sectionsContainer.innerHTML = '';
        sections.forEach(s => {
          const wrap = document.createElement('div');
          wrap.id = 'section-' + s.id;
          wrap.className = 'bg-white rounded-2xl shadow p-6 section-card mb-6 hidden';
          wrap.innerHTML = createSectionHTML(s.id);
          sectionsContainer.appendChild(wrap);
        });
      }

      // Show one section
      function showSection(id){
        sections.forEach(s => {
          const el = document.getElementById('section-' + s.id);
          if(!el) return;
          if(s.id === id) el.classList.remove('hidden'); else el.classList.add('hidden');
        });
        // focus first focusable element
        setTimeout(()=>{
          const visible = document.getElementById('section-' + id);
          const input = visible.querySelector('input, textarea, select, button');
          if(input) input.focus();
        },80);
      }

      // helper: auto-expand textarea
      function autoExpandTextarea(el){
        el.style.height = 'auto';
        el.style.height = (el.scrollHeight) + 'px';
      }

      // Validation helpers
      function isGmail(email){ return /@gmail\.com\s*$/i.test(email); }
      function isPhoneValid(val){ return /^([1-9][0-9]{6,14})$/.test(val); }
      function isUrl(val){ try{ const u=new URL(val); return true; }catch(e){return false;} }

      // Section HTML generators
      function personalSection(){
        return `
          <h2 class="text-lg font-semibold">Personal</h2>
          <form id="form-personal" class="mt-4 space-y-4" onsubmit="return false">
            <div class="flex items-center gap-4">
              <div class="avatar-wrap" id="avatarPreview"> <span class="text-xs text-gray-500">No photo</span></div>
              <div class="flex-1">
                <label class="block text-sm">Full name <span class="required-star">*</span></label>
                <input required name="fullname" class="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Your full name">

                <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm">Email <span class="required-star">*</span></label>
                    <input required name="email" id="personalEmail" type="email" class="mt-1 w-full rounded-lg border px-3 py-2" placeholder="yourname@gmail.com">
                    <p id="emailErr" class="text-xs text-red-500 mt-1 hidden">Email must end with @gmail.com</p>
                  </div>

                  <div>
                    <label class="block text-sm">Phone <span class="required-star">*</span></label>
                    <input required name="phone" id="personalPhone" type="tel" class="mt-1 w-full rounded-lg border px-3 py-2" placeholder="9312345678">
                    <p id="phoneErr" class="text-xs text-red-500 mt-1 hidden">Phone must be numeric and cannot start with 0</p>
                  </div>
                </div>

                <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm">LinkedIn URL</label>
                    <input name="linkedin" id="linkedinInput" type="url" class="mt-1 w-full rounded-lg border px-3 py-2" placeholder="https://www.linkedin.com/in/yourname">
                    <p id="liErr" class="text-xs text-red-500 mt-1 hidden">Enter a valid URL</p>
                  </div>

                  <div>
                    <label class="block text-sm">GitHub URL</label>
                    <input name="github" id="githubInput" type="url" class="mt-1 w-full rounded-lg border px-3 py-2" placeholder="https://github.com/yourname">
                    <p id="gitErr" class="text-xs text-red-500 mt-1 hidden">Enter a valid URL</p>
                  </div>
                </div>

                <div class="mt-3 flex items-center gap-3">
                  <label class="block text-sm w-28">Profile photo</label>
                  <div>
                    <input type="file" id="profileUpload" accept="image/*">
                    <p class="text-xs text-gray-500 mt-1">PNG/JPG. Shown inside a circle.</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        `;
      }

      function objectiveSection(){
        return `
          <h2 class="text-lg font-semibold">Objective</h2>
          <div class="mt-4">
            <label class="text-sm">Summary</label>
            <textarea id="objectiveText" oninput="autoExpandTextarea(this)" class="mt-2 w-full rounded-lg border px-3 py-2 resize-none" placeholder="Write a short objective..." rows="3"></textarea>
          </div>
        `;
      }

      function educationSection(){
        return `
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Education</h2>
            <button id="addEducationBtn" class="text-sm px-3 py-1 rounded bg-indigo-50 text-indigo-600">Add</button>
          </div>
          <div id="educationList" class="mt-4 space-y-3">
            <!-- default card -->
          </div>
        `;
      }

      function skillsSection(){
        return `
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Skills</h2>
            <div class="text-sm text-gray-500">Use dropdowns to categorize</div>
          </div>
          <div class="mt-4 space-y-3">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select id="skillCategory" class="rounded-lg border px-3 py-2">
                <option>Frontend</option>
                <option>Backend</option>
                <option>DevOps</option>
                <option>Soft Skills</option>
                <option>Other</option>
              </select>
              <select id="skillSub" class="rounded-lg border px-3 py-2">
                <option>React</option>
                <option>Angular</option>
                <option>Node</option>
                <option>Communication</option>
              </select>
              <select id="skillTool" class="rounded-lg border px-3 py-2">
                <option>VS Code</option>
                <option>Git</option>
                <option>Figma</option>
              </select>
            </div>
            <div>
              <label class="text-sm">Add custom skill</label>
              <div class="mt-2 flex gap-2">
                <input id="skillInput" class="flex-1 rounded-lg border px-3 py-2" placeholder="e.g. Storybook">
                <button id="addSkillBtn" class="px-3 py-2 rounded bg-indigo-600 text-white">Add</button>
              </div>
              <div id="skillTags" class="mt-3 flex flex-wrap gap-2"></div>
            </div>
          </div>
        `;
      }

      function projectsSection(){
        return `
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Projects</h2>
            <button id="addProjectBtn" class="text-sm px-3 py-1 rounded bg-indigo-50 text-indigo-600">Add Project</button>
          </div>
          <div id="projectsList" class="mt-4 space-y-3">
          </div>
        `;
      }

      function workSection(){
        return `
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Work Experience</h2>
            <button id="addWorkBtn" class="text-sm px-3 py-1 rounded bg-indigo-50 text-indigo-600">Add New</button>
          </div>
          <div id="workList" class="mt-4 space-y-3">
          </div>
        `;
      }

      function certificationsSection(){
        return `
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Certifications</h2>
            <button id="addCertBtn" class="text-sm px-3 py-1 rounded bg-indigo-50 text-indigo-600">Add New</button>
          </div>
          <div id="certList" class="mt-4 space-y-3"></div>
        `;
      }

      function activitiesSection(){
        return `
          <h2 class="text-lg font-semibold">Activities</h2>
          <div class="mt-4">
            <label class="text-sm">Extracurricular / Volunteering</label>
            <textarea id="activitiesText" oninput="autoExpandTextarea(this)" class="mt-2 w-full rounded-lg border px-3 py-2 resize-none" rows="3"></textarea>
          </div>
        `;
      }

      function customSection(){
        return `
          <h2 class="text-lg font-semibold">Custom Section</h2>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <input id="customTitle" class="col-span-2 rounded-lg border px-3 py-2" placeholder="Section title (will be added to list)">
            <button id="addCustomBtn" class="rounded bg-indigo-600 text-white px-3 py-2">Add</button>
          </div>
          <div class="mt-3">
            <textarea id="customDetails" oninput="autoExpandTextarea(this)" class="mt-2 w-full rounded-lg border px-3 py-2 resize-none" rows="3" placeholder="Details..."></textarea>
          </div>
        `;
      }

      function templateSection(){
        return `
          <h2 class="text-lg font-semibold">Template & Export</h2>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <select id="templateSelect" class="rounded-lg border px-3 py-2">
              <option>Classic</option>
              <option>Modern</option>
              <option>Elegant</option>
            </select>
            <div>
              <label class="text-sm">Margins (px)</label>
              <input id="marginInput" type="number" value="20" class="mt-1 rounded-lg border px-3 py-2">
            </div>
            <div class="flex items-end gap-2">
              <button id="exportPdfBtn" class="px-3 py-2 rounded bg-indigo-600 text-white">Export PDF</button>
              <button id="exportTxtBtn" class="px-3 py-2 rounded border">Export TXT</button>
            </div>
          </div>
        `;
      }

      // Render sections
      renderAllSections();
      // Show default
      showSection('personal');

      // Post-render wiring: event delegation
      document.addEventListener('click', (e) => {
        // avatar upload
        if(e.target && e.target.id === 'profileUpload'){
          const f = e.target.files && e.target.files[0];
          if(f){
            const reader = new FileReader();
            reader.onload = function(ev){
              const el = document.getElementById('avatarPreview');
              el.innerHTML = `<img src="${ev.target.result}" alt="avatar" style="width:100%;height:100%;object-fit:cover">`;
            };
            reader.readAsDataURL(f);
          }
        }

        // add education card
        if(e.target && e.target.id === 'addEducationBtn'){
          addEducationCard();
        }

        if(e.target && e.target.id === 'addProjectBtn'){
          addProjectCard();
        }

        if(e.target && e.target.id === 'addWorkBtn'){
          addWorkCard();
        }

        if(e.target && e.target.id === 'addCertBtn'){
          addCertCard();
        }

        if(e.target && e.target.id === 'addSkillBtn'){
          const val = document.getElementById('skillInput').value.trim();
          if(val){
            const tag = document.createElement('div');
            tag.className = 'px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-sm flex items-center gap-2';
            tag.innerHTML = `${val} <button class=\"ml-2 text-xs text-gray-500\">x</button>`;
            tag.querySelector('button').addEventListener('click', ()=>tag.remove());
            document.getElementById('skillTags').appendChild(tag);
            document.getElementById('skillInput').value = '';
          }
        }

        if(e.target && e.target.id === 'addCustomBtn'){
          const t = document.getElementById('customTitle').value.trim();
          if(t){
            // create new nav item and section
            const newId = 'custom-' + Date.now();
            sections.splice(sections.length-1,0, { id: newId, title: t, icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>' });
            renderAllSections();
            showSection(newId);
            // populate content in new section
            setTimeout(()=>{
              const sec = document.getElementById('section-' + newId);
              if(sec){
                sec.querySelector('h2').textContent = t;
                const details = document.getElementById('customDetails').value;
                const p = document.createElement('div');
                p.className = 'mt-3';
                p.textContent = details;
                sec.appendChild(p);
              }
            },120);
          }
        }

        // export PDF
        if(e.target && e.target.id === 'exportPdfBtn'){
          exportToPDF();
        }

        // export TXT
        if(e.target && e.target.id === 'exportTxtBtn'){
          exportToTxt();
        }

        // remove button for dynamic cards
        if(e.target && e.target.dataset && e.target.dataset.action === 'remove-card'){
          const id = e.target.dataset.target;
          const el = document.getElementById(id);
          if(el) el.remove();
        }

      });

      // Input validation events
      document.addEventListener('input', (e) => {
        if(e.target && e.target.id === 'personalEmail'){
          const err = document.getElementById('emailErr');
          if(isGmail(e.target.value)) err.classList.add('hidden'); else err.classList.remove('hidden');
        }
        if(e.target && e.target.id === 'personalPhone'){
          const err = document.getElementById('phoneErr');
          if(isPhoneValid(e.target.value)) err.classList.add('hidden'); else err.classList.remove('hidden');
        }
        if(e.target && (e.target.id === 'linkedinInput' || e.target.id === 'githubInput')){
          const targetId = e.target.id === 'linkedinInput' ? 'liErr' : 'gitErr';
          const err = document.getElementById(targetId);
          if(e.target.value.trim() === '' || isUrl(e.target.value)) err.classList.add('hidden'); else err.classList.remove('hidden');
        }
      });

      // helpers to add cards
      function addEducationCard(){
        const id = 'edu-' + Date.now();
        const el = document.getElementById('educationList');
        const card = document.createElement('div');
        card.id = id;
        card.className = 'border rounded-lg p-3';
        card.innerHTML = `
          <div class=\"flex justify-between items-start\"><strong>Education</strong><button data-action=\"remove-card\" data-target=\"${id}\" class=\"text-xs text-red-600\">Remove</button></div>
          <div class=\"mt-2 grid grid-cols-1 md:grid-cols-2 gap-2\"> 
            <select class=\"rounded border px-2 py-2\"> <option>10th Class</option><option>Intermediate</option><option>Diploma</option><option>Degree</option><option>B-tech</option><option>Under-graduate</option><option>Graduate</option><option>Pg</option><option>Others</option></select>
            <input class=\"rounded border px-2 py-2\" placeholder=\"College / university / school\"> 
            <input class=\"rounded border px-2 py-2\" placeholder=\"Location\"> 
            <div class=\"flex gap-2\"><input type=\"date\" class=\"rounded border px-2 py-2\"> <span class=\"self-center\">-</span> <input type=\"date\" class=\"rounded border px-2 py-2\"></div>
            <input class=\"rounded border px-2 py-2\" placeholder=\"Grade / Score (numbers only)\">
          </div>
        `;
        el.appendChild(card);
      }

      function addProjectCard(){
        const id = 'proj-' + Date.now();
        const el = document.getElementById('projectsList');
        const card = document.createElement('div');
        card.id = id;
        card.className = 'border rounded-lg p-3';
        card.innerHTML = `
          <div class=\"flex justify-between items-start\"><strong>Project</strong><button data-action=\"remove-card\" data-target=\"${id}\" class=\"text-xs text-red-600\">Remove</button></div>
          <div class=\"mt-2 grid grid-cols-1 gap-2\"> 
            <input class=\"rounded border px-2 py-2\" placeholder=\"Project Name\"> 
            <textarea oninput=\"autoExpandTextarea(this)\" class=\"rounded border px-2 py-2 resize-none\" rows=\"2\" placeholder=\"Description\"></textarea>
            <input class=\"rounded border px-2 py-2\" placeholder=\"Technologies (comma separated)\"> 
            <input class=\"rounded border px-2 py-2\" placeholder=\"Project Link (https://)\"> 
          </div>
        `;
        el.appendChild(card);
      }

      function addWorkCard(){
        const id = 'work-' + Date.now();
        const el = document.getElementById('workList');
        const card = document.createElement('div');
        card.id = id;
        card.className = 'border rounded-lg p-3';
        card.innerHTML = `
          <div class=\"flex justify-between items-start\"><strong>Work</strong><button data-action=\"remove-card\" data-target=\"${id}\" class=\"text-xs text-red-600\">Remove</button></div>
          <div class=\"mt-2 grid grid-cols-1 gap-2\"> 
            <input class=\"rounded border px-2 py-2\" placeholder=\"Role / Title\"> 
            <input class=\"rounded border px-2 py-2\" placeholder=\"Company name\"> 
            <textarea oninput=\"autoExpandTextarea(this)\" class=\"rounded border px-2 py-2 resize-none\" rows=\"2\" placeholder=\"Address / location\"></textarea>
            <div class=\"flex gap-2\"><input type=\"date\" class=\"rounded border px-2 py-2\"> <span class=\"self-center\">-</span> <input type=\"date\" class=\"rounded border px-2 py-2\"></div>
            <textarea oninput=\"autoExpandTextarea(this)\" class=\"rounded border px-2 py-2 resize-none\" rows=\"2\" placeholder=\"Key responsibilities\"></textarea>
          </div>
        `;
        el.appendChild(card);
      }

      function addCertCard(){
        const id = 'cert-' + Date.now();
        const el = document.getElementById('certList');
        const card = document.createElement('div');
        card.id = id;
        card.className = 'border rounded-lg p-3';
        card.innerHTML = `
          <div class=\"flex justify-between items-start\"><strong>Certification</strong><button data-action=\"remove-card\" data-target=\"${id}\" class=\"text-xs text-red-600\">Remove</button></div>
          <div class=\"mt-2 grid grid-cols-1 md:grid-cols-2 gap-2\"> 
            <input class=\"rounded border px-2 py-2\" placeholder=\"Certification name\"> 
            <input class=\"rounded border px-2 py-2\" placeholder=\"Issuing organization\"> 
            <input type=\"date\" class=\"rounded border px-2 py-2\"> 
            <input type=\"date\" class=\"rounded border px-2 py-2\"> 
          </div>
        `;
        el.appendChild(card);
      }  

      // exports
      function exportToTxt(){
        // Collect a few fields and generate a simple text
        const name = document.querySelector('#form-personal input[name="fullname"]')?.value || '';
        const email = document.querySelector('#personalEmail')?.value || '';
        const phone = document.querySelector('#personalPhone')?.value || '';
        const obj = document.getElementById('objectiveText')?.value || '';
        let txt = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nObjective:\n${obj}\n\n`;
        // Projects
        const projects = Array.from(document.querySelectorAll('#projectsList .border'));
        if(projects.length){ txt += 'Projects:\n'; projects.forEach((p,i)=>{ const title = p.querySelector('input')?.value || 'Project ' + (i+1); txt += `- ${title}\n`; }); }
        const blob = new Blob([txt], {type:'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'resume.txt'; a.click(); URL.revokeObjectURL(url);
      }

      async function exportToPDF(){
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        // Simple snapshot of the personal + objective for demo
        const name = document.querySelector('#form-personal input[name="fullname"]')?.value || 'Name';
        const email = document.querySelector('#personalEmail')?.value || '';
        const phone = document.querySelector('#personalPhone')?.value || '';
        const obj = document.getElementById('objectiveText')?.value || '';
        doc.setFontSize(18); doc.text(name, 40, 60);
        doc.setFontSize(11); doc.text(`Email: ${email}    Phone: ${phone}`, 40, 80);
        doc.setFontSize(12); doc.text('Objective:', 40, 110);
        // split text
        const split = doc.splitTextToSize(obj || '-', 500);
        doc.text(split, 40, 130);
        doc.save('resume.pdf');
      }

      // small initialization for default cards
      setTimeout(()=>{
        addEducationCard(); addProjectCard(); addWorkCard(); addCertCard();
      },200);