
// Application Form Handler for CAPACITI Programmes
class ApplicationFormHandler {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 4;
    this.formData = {};
    this.workHistory = [];
    this.educationHistory = [];
    this.init();
  }

  init() {
    this.createFormHTML();
    this.bindEvents();
  }

  createFormHTML() {
    const formContainer = document.createElement('div');
    formContainer.id = 'application-form-modal';
    formContainer.className = 'modal application-modal';
    
    formContainer.innerHTML = `
      <div class="modal-content application-form-content">
        <span class="close" onclick="closeApplicationForm()">&times;</span>
        <div class="form-header">
          <h2>Programme Application</h2>
          <div class="progress-bar">
            <div class="progress-step active" data-step="1">Personal Details</div>
            <div class="progress-step" data-step="2">Experience</div>
            <div class="progress-step" data-step="3">Biographic Data</div>
            <div class="progress-step" data-step="4">Additional Info</div>
          </div>
        </div>
        
        <form id="application-form" enctype="multipart/form-data">
          <!-- Step 1: Personal Details -->
          <div class="form-step active" data-step="1">
            <h3>Personal Details</h3>
            
            <div class="form-group">
              <label for="resume">Upload Resume*</label>
              <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required>
            </div>
            
            <div class="form-group">
              <label for="fullName">Full Name*</label>
              <input type="text" id="fullName" name="fullName" required>
            </div>
            
            <div class="form-group">
              <label for="email">Email Address*</label>
              <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
              <label for="phoneNumber">Phone Number*</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" required>
            </div>
            
            <div class="form-group">
              <label for="address">Address*</label>
              <textarea id="address" name="address" required></textarea>
            </div>
            
            <div class="form-group">
              <label for="location">Which location are you applying for*</label>
              <select id="location" name="location" required>
                <option value="">Select Location</option>
                <option value="cape-town">Cape Town</option>
                <option value="johannesburg">Johannesburg</option>
                <option value="durban">Durban</option>
                <option value="remote">Remote</option>
              </select>
            </div>
          </div>

          <!-- Step 2: Experience -->
          <div class="form-step" data-step="2">
            <h3>Experience</h3>
            
            <div class="form-group">
              <label>Work History*</label>
              <div id="work-history-container">
                <button type="button" class="btn-add-position" onclick="addWorkPosition()">+ Add Position</button>
              </div>
            </div>
            
            <div class="form-group">
              <label>Education*</label>
              <div id="education-container">
                <button type="button" class="btn-add-education" onclick="addEducation()">+ Add Education</button>
              </div>
            </div>
            
            <div class="form-group">
              <label for="experienceSummary">Experience Summary*</label>
              <textarea id="experienceSummary" name="experienceSummary" rows="4" required></textarea>
            </div>
          </div>

          <!-- Step 3: Biographic Data -->
          <div class="form-step" data-step="3">
            <h3>Biographic Data</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name*</label>
                <input type="text" id="firstName" name="firstName" required>
              </div>
              <div class="form-group">
                <label for="surname">Surname*</label>
                <input type="text" id="surname" name="surname" required>
              </div>
            </div>
            
            <div class="form-group">
              <label>Are you a South African citizen?*</label>
              <div class="radio-group">
                <label><input type="radio" name="isSACitizen" value="yes" required> Yes</label>
                <label><input type="radio" name="isSACitizen" value="no" required> No</label>
              </div>
            </div>
            
            <div class="form-group">
              <label for="idNumber">Please enter your S.A Identity Number*</label>
              <input type="text" id="idNumber" name="idNumber" required>
            </div>
            
            <div class="form-group">
              <label for="age">What is your age?*</label>
              <input type="number" id="age" name="age" min="18" max="65" required>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="primaryContact">Primary Contact Number*</label>
                <input type="tel" id="primaryContact" name="primaryContact" required>
              </div>
              <div class="form-group">
                <label for="alternativeContact">Alternative Contact Number*</label>
                <input type="tel" id="alternativeContact" name="alternativeContact">
              </div>
            </div>
            
            <div class="form-group">
              <label for="homeLanguage">What is your home language?*</label>
              <select id="homeLanguage" name="homeLanguage" required>
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="afrikaans">Afrikaans</option>
                <option value="zulu">Zulu</option>
                <option value="xhosa">Xhosa</option>
                <option value="sotho">Sotho</option>
                <option value="tswana">Tswana</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="province">Which province are you currently living in?*</label>
                <select id="province" name="province" required>
                  <option value="">Select Province</option>
                  <option value="western-cape">Western Cape</option>
                  <option value="gauteng">Gauteng</option>
                  <option value="kwazulu-natal">KwaZulu-Natal</option>
                  <option value="eastern-cape">Eastern Cape</option>
                  <option value="free-state">Free State</option>
                  <option value="limpopo">Limpopo</option>
                  <option value="mpumalanga">Mpumalanga</option>
                  <option value="north-west">North West</option>
                  <option value="northern-cape">Northern Cape</option>
                </select>
              </div>
              <div class="form-group">
                <label for="suburb">Which suburb are you currently living in?*</label>
                <input type="text" id="suburb" name="suburb" required>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="racialGroup">Which racial group do you belong to?*</label>
                <select id="racialGroup" name="racialGroup" required>
                  <option value="">Select</option>
                  <option value="african">African</option>
                  <option value="coloured">Coloured</option>
                  <option value="indian">Indian</option>
                  <option value="white">White</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="gender">What gender group do you belong to?*</label>
                <select id="gender" name="gender" required>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label>Do you have a disability?*</label>
              <div class="radio-group">
                <label><input type="radio" name="hasDisability" value="yes" required> Yes</label>
                <label><input type="radio" name="hasDisability" value="no" required> No</label>
              </div>
            </div>
            
            <div class="form-group disability-related" style="display: none;">
              <label>If Yes, do you have a valid doctors note to confirm your disability?*</label>
              <div class="radio-group">
                <label><input type="radio" name="hasDisabilityNote" value="yes"> Yes</label>
                <label><input type="radio" name="hasDisabilityNote" value="no"> No</label>
              </div>
            </div>
            
            <div class="form-group disability-related" style="display: none;">
              <label for="disabilityNature">What is the nature of your disability?*</label>
              <textarea id="disabilityNature" name="disabilityNature"></textarea>
            </div>
          </div>

          <!-- Step 4: Additional Information -->
          <div class="form-step" data-step="4">
            <h3>Additional Information</h3>
            
            <div class="form-group">
              <label for="highSchool">What High School did you attend?*</label>
              <input type="text" id="highSchool" name="highSchool" required>
            </div>
            
            <div class="form-group">
              <label for="highestQualification">What is your Highest completed qualification?*</label>
              <input type="text" id="highestQualification" name="highestQualification" required>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="nqfLevel">Please select the appropriate Highest NQF Level.*</label>
                <select id="nqfLevel" name="nqfLevel" required>
                  <option value="">Select NQF Level</option>
                  <option value="1">NQF Level 1</option>
                  <option value="2">NQF Level 2</option>
                  <option value="3">NQF Level 3</option>
                  <option value="4">NQF Level 4</option>
                  <option value="5">NQF Level 5</option>
                  <option value="6">NQF Level 6</option>
                  <option value="7">NQF Level 7</option>
                  <option value="8">NQF Level 8</option>
                  <option value="9">NQF Level 9</option>
                  <option value="10">NQF Level 10</option>
                </select>
              </div>
              <div class="form-group">
                <label for="qualificationYear">What year did you complete your highest qualification?*</label>
                <input type="number" id="qualificationYear" name="qualificationYear" min="1980" max="2024" required>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="qualificationField">What was the qualification field of study?*</label>
                <input type="text" id="qualificationField" name="qualificationField" required>
              </div>
              <div class="form-group">
                <label for="qualificationName">What was the qualification name?*</label>
                <input type="text" id="qualificationName" name="qualificationName" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="otherProgrammes">What other upskilling programmes have you completed?*</label>
              <textarea id="otherProgrammes" name="otherProgrammes" rows="3" required></textarea>
            </div>
            
            <div class="form-group">
              <label for="workStatus">Which one most accurately describes your current work status?*</label>
              <select id="workStatus" name="workStatus" required>
                <option value="">Select Status</option>
                <option value="immediately-available">Immediately Available</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="heardAbout">How did you hear about CapaCiTi?</label>
              <select id="heardAbout" name="heardAbout">
                <option value="">Select Option</option>
                <option value="social-media">Social Media</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="job-portal">Job Portal</option>
                <option value="event">Event</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="techInterest">What area of technology interests you the most?*</label>
              <select id="techInterest" name="techInterest" required>
                <option value="">Select Technology Area</option>
                <option value="web-development">Web Development</option>
                <option value="data-science">Data Science</option>
                <option value="ai-ml">AI/Machine Learning</option>
                <option value="cloud-computing">Cloud Computing</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="mobile-development">Mobile Development</option>
                <option value="devops">DevOps</option>
                <option value="ui-ux">UI/UX Design</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Have you ever been convicted of a criminal offence?*</label>
              <div class="radio-group">
                <label><input type="radio" name="criminalConviction" value="yes" required> Yes</label>
                <label><input type="radio" name="criminalConviction" value="no" required> No</label>
              </div>
            </div>
            
            <div class="form-group">
              <label>Have you ever been dismissed from a place of work?*</label>
              <div class="radio-group">
                <label><input type="radio" name="workDismissal" value="yes" required> Yes</label>
                <label><input type="radio" name="workDismissal" value="no" required> No</label>
              </div>
            </div>
            
            <div class="form-group dismissal-reason" style="display: none;">
              <label for="dismissalReason">What was the reason for dismissal?</label>
              <textarea id="dismissalReason" name="dismissalReason"></textarea>
            </div>
          </div>
          
          <div class="form-navigation">
            <button type="button" id="prevBtn" onclick="changeStep(-1)" style="display: none;">Previous</button>
            <button type="button" id="nextBtn" onclick="changeStep(1)">Next</button>
            <button type="submit" id="submitBtn" style="display: none;">Submit Application</button>
          </div>
        </form>
      </div>
    `;
    
    document.body.appendChild(formContainer);
  }

  bindEvents() {
    // Handle disability-related fields
    document.addEventListener('change', (e) => {
      if (e.target.name === 'hasDisability') {
        const disabilityFields = document.querySelectorAll('.disability-related');
        if (e.target.value === 'yes') {
          disabilityFields.forEach(field => field.style.display = 'block');
        } else {
          disabilityFields.forEach(field => field.style.display = 'none');
        }
      }
      
      if (e.target.name === 'workDismissal') {
        const dismissalField = document.querySelector('.dismissal-reason');
        if (e.target.value === 'yes') {
          dismissalField.style.display = 'block';
        } else {
          dismissalField.style.display = 'none';
        }
      }
    });

    // Handle form submission
    document.getElementById('application-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.submitForm();
    });
  }

  async submitForm() {
    const form = document.getElementById('application-form');
    const formData = new FormData(form);
    
    // Convert FormData to object
    const data = {};
    for (let [key, value] of formData.entries()) {
      if (key === 'resume') {
        data[key] = value; // Keep file as-is
      } else {
        data[key] = value;
      }
    }
    
    // Add work history and education
    data.workHistory = this.workHistory;
    data.education = this.educationHistory;
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    try {
      const result = await window.submitApplicationForm(data);
      
      if (result.success) {
        alert('Application submitted successfully! We will review your application and get back to you soon.');
        closeApplicationForm();
      } else {
        alert('Error submitting application: ' + result.error);
      }
    } catch (error) {
      alert('Error submitting application. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }
}

// Global functions for form interaction
window.openApplicationForm = function() {
  if (!window.applicationFormHandler) {
    window.applicationFormHandler = new ApplicationFormHandler();
  }
  document.getElementById('application-form-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
};

window.closeApplicationForm = function() {
  document.getElementById('application-form-modal').style.display = 'none';
  document.body.style.overflow = 'auto';
};

window.changeStep = function(direction) {
  const handler = window.applicationFormHandler;
  const newStep = handler.currentStep + direction;
  
  if (newStep < 1 || newStep > handler.totalSteps) return;
  
  // Hide current step
  document.querySelector(`.form-step[data-step="${handler.currentStep}"]`).classList.remove('active');
  document.querySelector(`.progress-step[data-step="${handler.currentStep}"]`).classList.remove('active');
  
  // Show new step
  handler.currentStep = newStep;
  document.querySelector(`.form-step[data-step="${handler.currentStep}"]`).classList.add('active');
  document.querySelector(`.progress-step[data-step="${handler.currentStep}"]`).classList.add('active');
  
  // Update navigation buttons
  document.getElementById('prevBtn').style.display = handler.currentStep === 1 ? 'none' : 'inline-block';
  document.getElementById('nextBtn').style.display = handler.currentStep === handler.totalSteps ? 'none' : 'inline-block';
  document.getElementById('submitBtn').style.display = handler.currentStep === handler.totalSteps ? 'inline-block' : 'none';
};

window.addWorkPosition = function() {
  const container = document.getElementById('work-history-container');
  const index = window.applicationFormHandler.workHistory.length;
  
  const positionDiv = document.createElement('div');
  positionDiv.className = 'work-position';
  positionDiv.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label>Job Title</label>
        <input type="text" name="workTitle_${index}" required>
      </div>
      <div class="form-group">
        <label>Company</label>
        <input type="text" name="workCompany_${index}" required>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Start Date</label>
        <input type="date" name="workStartDate_${index}" required>
      </div>
      <div class="form-group">
        <label>End Date</label>
        <input type="date" name="workEndDate_${index}">
      </div>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea name="workDescription_${index}" rows="2"></textarea>
    </div>
    <button type="button" onclick="removeWorkPosition(this)">Remove</button>
  `;
  
  container.insertBefore(positionDiv, container.querySelector('.btn-add-position'));
  window.applicationFormHandler.workHistory.push({});
};

window.addEducation = function() {
  const container = document.getElementById('education-container');
  const index = window.applicationFormHandler.educationHistory.length;
  
  const educationDiv = document.createElement('div');
  educationDiv.className = 'education-item';
  educationDiv.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label>Institution</label>
        <input type="text" name="eduInstitution_${index}" required>
      </div>
      <div class="form-group">
        <label>Qualification</label>
        <input type="text" name="eduQualification_${index}" required>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Start Year</label>
        <input type="number" name="eduStartYear_${index}" min="1980" max="2024" required>
      </div>
      <div class="form-group">
        <label>End Year</label>
        <input type="number" name="eduEndYear_${index}" min="1980" max="2024">
      </div>
    </div>
    <button type="button" onclick="removeEducation(this)">Remove</button>
  `;
  
  container.insertBefore(educationDiv, container.querySelector('.btn-add-education'));
  window.applicationFormHandler.educationHistory.push({});
};

window.removeWorkPosition = function(button) {
  button.parentElement.remove();
};

window.removeEducation = function(button) {
  button.parentElement.remove();
};
