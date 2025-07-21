const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
const currentYear = new Date().getFullYear();

function getMonthOptions() {
    return months.map(m => `<option value="${m}">${m}</option>`).join('');
}

function getYearOptions() {
    let options = '';
    for (let i = currentYear; i >= currentYear - 100; i--) {
        options += `<option value="${i}">${i}</option>`;
    }
    return options;
}

function generateDateFields(prefix, idx, isRequired = false) {
    const requiredClass = isRequired ? 'required' : '';
    return `
        <label>Start Date:
            <select name="${prefix}_start_month_${idx}" class="form-control ${requiredClass}">${getMonthOptions()}</select>
            <select name="${prefix}_start_year_${idx}" class="form-control ${requiredClass}">${getYearOptions()}</select>
        </label>
        <label>End Date:
            <select name="${prefix}_end_month_${idx}" class="form-control ${requiredClass}">${getMonthOptions()}</select>
            <select name="${prefix}_end_year_${idx}" class="form-control ${requiredClass}">${getYearOptions()}</select>
             or <input type="checkbox" name="${prefix}_end_present_${idx}" value="Present" class="form-check-input ${requiredClass}"> Present
        </label>
    `;
}


function addEducation() {
    const section = document.getElementById('education-section');
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="edu-entry">
            <label>Institute <span class="text-danger">*</span> <input type="text" name="education_institute_${idx}" maxlength="60" required class="form-control"></label>
            <label>City <span class="text-danger">*</span> <input type="text" name="education_city_${idx}" maxlength="19" required class="form-control"></label>
            <label>State <span class="text-danger">*</span> <input type="text" name="education_state_${idx}" maxlength="12" required class="form-control"></label>
            <label>Degree <span class="text-danger">*</span> <input type="text" name="education_degree_${idx}" maxlength="30" required class="form-control"></label>
            <label>Branch <span class="text-danger">*</span> <input type="text" name="education_branch_${idx}" maxlength="40" required class="form-control"></label>
            ${generateDateFields('education', idx, true)}
            <button type="button" class="btn btn-outline-danger remove-btn" onclick="removeEntry(this, 'education-section')">Remove</button>
            <hr>
        </div>
    `);
}

function addExperience() {
    const section = document.getElementById('experience-section');
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="exp-entry">
            <label>Role: <input type="text" name="experience_role_${idx}" maxlength="70" required class="form-control"></label>
            <label>Role Link (optional): <input type="text" name="experience_role_link_${idx}"></label>
            <label>Organization: <input type="text" name="experience_org_${idx}" maxlength="60" required class="form-control"></label>
            <label>City: <input type="text" name="experience_city_${idx}" maxlength="19" required class="form-control"></label>
            <label>State: <input type="text" name="experience_state_${idx}" maxlength="12" required class="form-control"></label>
            ${generateDateFields('experience', idx, true)}
            <label>Bullet Points (one per line): <textarea name="experience_bullets_${idx}" rows="3" style="resize: vertical; max-width: 100%;" required class="form-control"></textarea></label>
            <button type="button" onclick="this.parentElement.remove()">Remove</button>
            <hr>
        </div>
    `);
}

function addProject() {
    const section = document.getElementById('projects-section');
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="proj-entry">
            <label>Project Name: <input type="text" name="project_name_${idx}" maxlength="40" required class="form-control"></label>
            <label>Project Link (optional): <input type="text" name="project_link_${idx}"></label>
            <label>Tech Stack: <input type="text" name="project_tech_${idx}" maxlength="35" required class="form-control"></label>
            ${generateDateFields('project', idx, true)}
            <label>Bullet Points (one per line): <textarea name="project_bullets_${idx}" rows="4" style="resize: vertical; max-width: 100%;" required class="form-control"></textarea></label>
            <button type="button" onclick="this.parentElement.remove()">Remove</button>
            <hr>
        </div>
    `);
}

function addSkillGroup() {
    const section = document.getElementById('skills-section');
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="skill-entry">
            <label>Subheading <span class="text-danger">*</span> <input type="text" name="skill_heading_${idx}" required class="form-control"></label>
            <label>Skills (comma separated) <span class="text-danger">*</span> <input type="text" name="skill_list_${idx}" required class="form-control"></label>
            <button type="button" class="btn btn-outline-danger remove-btn" onclick="removeEntry(this, 'skills-section')">Remove</button>
            <hr>
        </div>
    `);
}

function addCertification() {
    const section = document.getElementById('certifications-section');
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="cert-entry">
            <label>Certification Name: <input type="text" name="cert_name_${idx}" required class="form-control"></label>
            <label>Certification Link (optional): <input type="text" name="cert_link_${idx}"></label>
            <label>Issuing Organization: <input type="text" name="cert_org_${idx}" required class="form-control"></label>
            <button type="button" onclick="this.parentElement.remove()">Remove</button>
            <hr>
        </div>
    `);
}

function addCoCurricular() {
    const section = document.getElementById('co-curricular-section');
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="co-entry">
            <label>Activity: <input type="text" name="co_activity_${idx}" maxlength="70" required class="form-control"></label>
            <label>Activity Link (optional): <input type="text" name="co_link_${idx}"></label>
            <label>Organization: <input type="text" name="co_org_${idx}" maxlength="60" required class="form-control"></label>
            <label>City: <input type="text" name="co_city_${idx}" maxlength="19" required class="form-control"></label>
            <label>State: <input type="text" name="co_state_${idx}" maxlength="12" required class="form-control"></label>
            ${generateDateFields('co', idx, true)}
            <label>Bullet Points (one per line): <textarea name="co_bullets_${idx}" rows="3" style="resize: vertical; max-width: 100%;" required class="form-control"></textarea></label>
            <button type="button" onclick="this.parentElement.remove()">Remove</button>
            <hr>
        </div>
    `);
}

function addExtraCurricular() {
    const section = document.getElementById('extra-curricular-section');
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="extra-entry">
            <label>Activity: <input type="text" name="extra_activity_${idx}" maxlength="70" required class="form-control"></label>
            <label>Activity Link (optional): <input type="text" name="extra_link_${idx}"></label>
            <label>Organization: <input type="text" name="extra_org_${idx}" maxlength="60" required class="form-control"></label>
            <label>City: <input type="text" name="extra_city_${idx}" maxlength="19" required class="form-control"></label>
            <label>State: <input type="text" name="extra_state_${idx}" maxlength="12" required class="form-control"></label>
            ${generateDateFields('extra', idx, true)}
            <label>Bullet Points (one per line): <textarea name="extra_bullets_${idx}" rows="3" style="resize: vertical; max-width: 100%;" required class="form-control"></textarea></label>
            <button type="button" onclick="this.parentElement.remove()">Remove</button>
            <hr>
        </div>
    `);
}

function addPublication() {
    const section = document.getElementById('publications-section');
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="pub-entry">
            <label>Title: <input type="text" name="pub_title_${idx}" required class="form-control"></label>
            <label>Title Link (optional): <input type="text" name="pub_link_${idx}"></label>
            <label>Your Name: <input type="text" name="pub_author_${idx}" required class="form-control"></label>
            <label>Journal: <input type="text" name="pub_journal_${idx}" required class="form-control"></label>
            <label>Date: <input type="text" name="pub_date_${idx}" required class="form-control"></label>
            <button type="button" onclick="this.parentElement.remove()">Remove</button>
            <hr>
        </div>
    `);
}

// Ensure at least one education and one skill group are always present
window.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('education-section').children.length === 0) {
        addEducation();
    }
    if (document.getElementById('skills-section').children.length === 0) {
        addSkillGroup();
    }
});

function removeEntry(btn, sectionId) {
    const section = document.getElementById(sectionId);
    if (section.children.length > 1) {
        btn.parentElement.remove();
    } else {
        btn.disabled = true;
    }
}

// Bootstrap validation
(function () {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();

// Instant feedback for dynamic fields
function addInstantValidation() {
    document.querySelectorAll('input, textarea, select').forEach(function(input) {
        input.addEventListener('input', function() {
            input.setCustomValidity('');
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
    });
}
window.addEventListener('DOMContentLoaded', addInstantValidation);

// DOCX generation logic
window.addEventListener('DOMContentLoaded', function() {
    const docxBtn = document.getElementById('generate-docx');
    if (docxBtn) {
        docxBtn.addEventListener('click', function(e) {
            const form = document.getElementById('resumeForm');
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
            const formData = new FormData(form);
            fetch('/generate-docx', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.url) {
                    window.location.href = data.url;
                }
            });
        });
    }
});