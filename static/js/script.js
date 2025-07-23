const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
const currentYear = new Date().getFullYear();

function getMonthOptions() {
    return months.map(m => `<option value="${m}">${m}</option>`).join('');
}

function getYearOptions() {
    let options = '';
    for (let i = currentYear + 50; i >= currentYear - 100; i--) {
        if (i === currentYear) {
            options += `<option value="${i}" selected>${i}</option>`;
        } else {
            options += `<option value="${i}">${i}</option>`;
        }
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
            <label>Institution <span class="text-danger">*</span> <input type="text" name="education_institute_${idx}" maxlength="50" required class="form-control" oninput="showLimitWarning(this, 50)" placeholder="e.g. Indian Institute of Technology, Delhi"></label>
            <label>City <span class="text-danger">*</span> <input type="text" name="education_city_${idx}" maxlength="20" required class="form-control" oninput="showLimitWarning(this, 20)" placeholder="e.g. New Delhi"></label>
            <label>State <span class="text-danger">*</span> <input type="text" name="education_state_${idx}" maxlength="20" required class="form-control" oninput="showLimitWarning(this, 20)" placeholder="e.g. Delhi"></label>
            <label>Degree <span class="text-danger">*</span> <input type="text" name="education_degree_${idx}" maxlength="20" required class="form-control" oninput="showLimitWarning(this, 20)" placeholder="e.g. B.Tech"></label>
            <label>Branch <span class="text-danger">*</span> <input type="text" name="education_branch_${idx}" maxlength="40" required class="form-control" oninput="showLimitWarning(this, 40)" placeholder="e.g. Computer Science and Engineering"></label>
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
            <label>Job Title: <input type="text" name="experience_role_${idx}" maxlength="50" required class="form-control" oninput="showLimitWarning(this, 50)" placeholder="e.g. Software Engineer"></label>
            <label>Role Link (optional): <input type="text" name="experience_role_link_${idx}" class="form-control" placeholder="e.g. https://company.com/job-description"></label>
            <label>Organization: <input type="text" name="experience_org_${idx}" maxlength="40" required class="form-control" oninput="showLimitWarning(this, 40)" placeholder="e.g. Google"></label>
            <label>City: <input type="text" name="experience_city_${idx}" maxlength="20" required class="form-control" oninput="showLimitWarning(this, 20)" placeholder="e.g. Mountain View"></label>
            <label>State: <input type="text" name="experience_state_${idx}" maxlength="20" required class="form-control" oninput="showLimitWarning(this, 20)" placeholder="e.g. California"></label>
            ${generateDateFields('experience', idx, true)}
            <label>Description: <textarea name="experience_bullets_${idx}" placeholder="Press Enter for each new point. Max 4 points, 150 characters each. e.g. Developed scalable backend services." rows="3" style="resize: vertical; max-width: 100%;" required class="form-control" oninput="validateBullets(this, 4, 150)" onblur="validateBullets(this, 4, 150)"></textarea></label>
            <div class="alert alert-warning" style="display:none"></div>
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
            <label>Project Title: <input type="text" name="project_name_${idx}" maxlength="40" required class="form-control" oninput="showLimitWarning(this, 40)" placeholder="e.g. Resume Generator App"></label>
            <label>Project Link (optional): <input type="text" name="project_link_${idx}" class="form-control" placeholder="e.g. https://github.com/yourusername/project"></label>
            <label>Tech Stack: <input type="text" name="project_tech_${idx}" maxlength="35" required class="form-control" oninput="showLimitWarning(this, 35)" placeholder="e.g. Python, Flask, React"></label>
            <label>City: <input type="text" name="project_city_${idx}" maxlength="20" required class="form-control" oninput="showLimitWarning(this, 20)" placeholder="e.g. Remote"></label>
            ${generateDateFields('project', idx, true)}
            <label>Description: <textarea name="project_bullets_${idx}" placeholder="Press Enter for each new point. Max 4 points, 150 characters each. e.g. Built a web app for resume generation." rows="4" style="resize: vertical; max-width: 100%;" required class="form-control" oninput="validateBullets(this, 4, 150)" onblur="validateBullets(this, 4, 150)"></textarea></label>
            <div class="alert alert-warning" style="display:none"></div>
            <button type="button" onclick="this.parentElement.remove()">Remove</button>
            <hr>
        </div>
    `);
}

function addCoCurricular() {
    const section = document.getElementById('co-curricular-section');
    if (section.children.length >= 10) {
        showFloatingWarning('You can add up to 10 co-curricular activities only.');
        return;
    }
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="co-entry">
            <label>Activity Title: <input type="text" name="co_activity_${idx}" maxlength="50" required class="form-control" oninput="showLimitWarning(this, 50)" placeholder="e.g. Debate Competition"></label>
            <label>Activity Link (optional): <input type="text" name="co_link_${idx}" class="form-control" placeholder="e.g. https://event.com/details"></label>
            <label>Organization: <input type="text" name="co_org_${idx}" maxlength="30" required class="form-control" oninput="showLimitWarning(this, 30)" placeholder="e.g. College Literary Club"></label>
            <label>City: <input type="text" name="co_city_${idx}" maxlength="20" required class="form-control" oninput="showLimitWarning(this, 20)" placeholder="e.g. Mumbai"></label>
            <label>State: <input type="text" name="co_state_${idx}" maxlength="20" required class="form-control" oninput="showLimitWarning(this, 20)" placeholder="e.g. Maharashtra"></label>
            ${generateDateFields('co', idx, true)}
            <label>Description: <textarea name="co_bullets_${idx}" placeholder="Press Enter for each new point. Max 4 points, 150 characters each. e.g. Won 1st prize among 100+ participants." rows="3" style="resize: vertical; max-width: 100%;" required class="form-control" oninput="validateBullets(this, 4, 150)" onblur="validateBullets(this, 4, 150)"></textarea></label>
            <div class="alert alert-warning" style="display:none"></div>
            <button type="button" onclick="this.parentElement.remove()">Remove</button>
            <hr>
        </div>
    `);
}

function addExtraCurricular() {
    const section = document.getElementById('extra-curricular-section');
    if (section.children.length >= 10) {
        showFloatingWarning('You can add up to 10 extra-curricular activities only.');
        return;
    }
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="extra-entry">
            <label>Activity Title: <input type="text" name="extra_activity_${idx}" maxlength="50" required class="form-control" oninput="showLimitWarning(this, 50)" placeholder="e.g. Football Tournament"></label>
            <label>Activity Link (optional): <input type="text" name="extra_link_${idx}" class="form-control" placeholder="e.g. https://event.com/details"></label>
            <label>Organization: <input type="text" name="extra_org_${idx}" maxlength="30" required class="form-control" oninput="showLimitWarning(this, 30)" placeholder="e.g. Sports Club"></label>
            <label>City: <input type="text" name="extra_city_${idx}" maxlength="20" required class="form-control" oninput="showLimitWarning(this, 20)" placeholder="e.g. Bangalore"></label>
            <label>State: <input type="text" name="extra_state_${idx}" maxlength="20" required class="form-control" oninput="showLimitWarning(this, 20)" placeholder="e.g. Karnataka"></label>
            ${generateDateFields('extra', idx, true)}
            <label>Description: <textarea name="extra_bullets_${idx}" placeholder="Press Enter for each new point. Max 4 points, 150 characters each. e.g. Led the team to finals." rows="3" style="resize: vertical; max-width: 100%;" required class="form-control" oninput="validateBullets(this, 4, 150)" onblur="validateBullets(this, 4, 150)"></textarea></label>
            <div class="alert alert-warning" style="display:none"></div>
            <button type="button" onclick="this.parentElement.remove()">Remove</button>
            <hr>
        </div>
    `);
}

function addPublication() {
    const section = document.getElementById('publications-section');
    if (section.children.length >= 10) {
        showFloatingWarning('You can add up to 10 publications only.');
        return;
    }
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="pub-entry">
            <label>Publication Title: <input type="text" name="pub_title_${idx}" required class="form-control" maxlength="70" oninput="showLimitWarning(this, 70)" placeholder="e.g. Deep Learning for NLP"></label>
            <label>Publication Link (optional): <input type="text" name="pub_link_${idx}" class="form-control" placeholder="e.g. https://journal.com/article"></label>
            <label>Your Name: <input type="text" name="pub_author_${idx}" required class="form-control" maxlength="30" oninput="showLimitWarning(this, 30)" placeholder="e.g. John Doe"></label>
            <label>Journal: <input type="text" name="pub_journal_${idx}" required class="form-control" maxlength="40" oninput="showLimitWarning(this, 40)" placeholder="e.g. International Journal of AI"></label>
            <label>Date:
                <select name="pub_month_${idx}" class="form-control">${getMonthOptions()}</select>
                <select name="pub_year_${idx}" class="form-control">${getYearOptions()}</select>
            </label>
            <div class="alert alert-warning" style="display:none"></div>
            <button type="button" onclick="this.parentElement.remove()">Remove</button>
            <hr>
        </div>
    `);
}

function addSkillGroup() {
    const section = document.getElementById('skills-section');
    if (section.children.length >= 10) {
        showFloatingWarning('You can add up to 10 skill subheadings only.');
        return;
    }
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="skill-entry">
            <label>Skill Category <span class="text-danger">*</span> <input type="text" name="skill_heading_${idx}" required class="form-control" maxlength="25" oninput="showLimitWarning(this, 25)" placeholder="e.g. Programming Languages"></label>
            <label>Skills (comma separated, max 7, 20 chars each) <span class="text-danger">*</span> <input type="text" name="skill_list_${idx}" required class="form-control" oninput="validateSkills(this)" placeholder="e.g. Python, Java, C++"></label>
            <div class="alert alert-warning" style="display:none"></div>
            <button type="button" class="btn btn-outline-danger remove-btn" onclick="removeEntry(this, 'skills-section')">Remove</button>
            <hr>
        </div>
    `);
}

function addCertification() {
    const section = document.getElementById('certifications-section');
    if (section.children.length >= 10) {
        showFloatingWarning('You can add up to 10 certifications only.');
        return;
    }
    const idx = section.children.length;
    section.insertAdjacentHTML('beforeend', `
        <div class="cert-entry">
            <label>Certification Name: <input type="text" name="cert_name_${idx}" required class="form-control" maxlength="60" oninput="showLimitWarning(this, 60)" placeholder="e.g. AWS Certified Solutions Architect"></label>
            <label>Certification Link (optional): <input type="text" name="cert_link_${idx}" class="form-control" placeholder="e.g. https://certification.com/verify"></label>
            <label>Issuing Organization: <input type="text" name="cert_org_${idx}" required class="form-control" maxlength="40" oninput="showLimitWarning(this, 40)" placeholder="e.g. Amazon Web Services"></label>
            <div class="alert alert-warning" style="display:none"></div>
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

// Scroll to first invalid field on submit
function scrollToFirstInvalid(form) {
  var firstInvalid = form.querySelector(':invalid');
  if (firstInvalid) {
    firstInvalid.focus();
    firstInvalid.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
}

window.addEventListener('DOMContentLoaded', function() {
  var resumeForm = document.getElementById('resumeForm');
  if (resumeForm) {
    resumeForm.addEventListener('submit', function(e) {
      if (!this.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        scrollToFirstInvalid(this);
      }
    }, true);
  }
  var docxBtn = document.getElementById('generate-docx');
  if (docxBtn && resumeForm) {
    docxBtn.addEventListener('click', function(e) {
      if (!resumeForm.checkValidity()) {
        resumeForm.classList.add('was-validated');
        scrollToFirstInvalid(resumeForm);
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });
  }
});

// Show character limit warning
function showLimitWarning(input, limit) {
    if (input.value.length >= limit) {
        showFloatingWarning(`You have reached the maximum allowed characters (${limit}) for this field.`);
    }
}

// Validate skills: max 7 skills, 20 chars each
function validateSkills(input) {
    let skills = input.value.split(',').map(s => s.trim()).filter(s => s);
    if (skills.length > 7) {
        showFloatingWarning('You can add up to 7 skills only.');
        input.value = skills.slice(0, 7).join(', ');
    }
    for (let skill of skills) {
        if (skill.length > 20) {
            showFloatingWarning('Each skill can be up to 20 characters only.');
            input.value = skills.map(s => s.slice(0, 20)).join(', ');
            break;
        }
    }
}

// Validate bullet points: max bullets and max chars per bullet
function validateBullets(textarea, maxBullets, maxChars) {
    let bullets = textarea.value.split('\n').filter(b => b.trim());
    if (bullets.length > maxBullets) {
        showFloatingWarning(`You can add up to ${maxBullets} bullet points only.`);
        textarea.value = bullets.slice(0, maxBullets).join('\n');
    }
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].length > maxChars) {
            showFloatingWarning(`Each bullet point can be up to ${maxChars} characters only.`);
            bullets[i] = bullets[i].slice(0, maxChars);
            textarea.value = bullets.join('\n');
        }
    }
}

// Custom section validation
window.addEventListener('DOMContentLoaded', function() {
    const customHeading = document.querySelector('input[name="custom_heading"]');
    if (customHeading) {
        customHeading.setAttribute('maxlength', '30');
        customHeading.setAttribute('placeholder', 'e.g. Awards & Achievements');
        customHeading.addEventListener('input', function() {
            if (customHeading.value.length >= 30) {
                showFloatingWarning('Custom section heading can be up to 30 characters only.');
            }
        });
    }
    const customPoints = document.querySelector('textarea[name="custom_points"]');
    if (customPoints) {
        customPoints.removeAttribute('maxlength');
        customPoints.setAttribute('placeholder', 'Press Enter for each new point. Max 10 points, 150 characters each. e.g. Received XYZ Scholarship for academic excellence.');
        customPoints.addEventListener('input', function() {
            validateBullets(customPoints, 10, 150);
        });
        customPoints.addEventListener('blur', function() {
            validateBullets(customPoints, 10, 150);
        });
    }
});

// On form submit, validate all bullet textareas
window.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resumeForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            // Validate all bullet textareas before submit
            document.querySelectorAll('textarea[name^="experience_bullets_"], textarea[name^="project_bullets_"], textarea[name^="co_bullets_"], textarea[name^="extra_bullets_"], textarea[name="custom_points"]').forEach(function(textarea) {
                if (textarea.name === 'custom_points') {
                    validateBullets(textarea, 10, 150);
                } else {
                    validateBullets(textarea, 4, 150);
                }
            });
        });
    }
});

// Floating warning duration: 5 seconds
function showFloatingWarning(message) {
    const warningDiv = document.getElementById('floating-warning');
    warningDiv.textContent = message;
    warningDiv.style.display = 'block';
    setTimeout(() => { warningDiv.style.display = 'none'; }, 5000);
}