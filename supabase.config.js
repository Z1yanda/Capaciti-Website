window.SUPABASE_CONFIG = { 
  // Your Supabase project URL (found in Project Settings > API)
  url: 'https://amdaiviubiubsbldbsgt.supabase.co',

  // Your Supabase anon/public key (found in Project Settings > API)
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZGFpdml1Yml1YnNibGRic2d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyODM3MDMsImV4cCI6MjA2Njg1OTcwM30._nFeDd825AVm2dghpG-N-w3Ojj_UOJHNAVJNM5fXYco'
};

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.key);

// Function to submit application form to Supabase
window.submitApplicationForm = async function(formData) {
  try {
    // First, upload resume file if provided
    let resumeUrl = null;
    if (formData.resume) {
      const fileName = `resumes/${Date.now()}_${formData.resume.name}`;
      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from('applications')
        .upload(fileName, formData.resume);

      if (uploadError) {
        console.error('Resume upload error:', uploadError);
        throw new Error('Failed to upload resume');
      }

      // Get public URL for the uploaded file
      const { data: urlData } = supabaseClient.storage
        .from('applications')
        .getPublicUrl(fileName);

      resumeUrl = urlData.publicUrl;
    }

    // Prepare application data for database
    const applicationData = {
      // Personal Details
      full_name: formData.fullName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      address: formData.address,
      location_applied: formData.location,

      // Work Experience
      work_history: formData.workHistory || [],
      education_history: formData.education || [],
      experience_summary: formData.experienceSummary,

      // Biographic Data
      first_name: formData.firstName,
      surname: formData.surname,
      is_sa_citizen: formData.isSACitizen,
      id_number: formData.idNumber,
      age: parseInt(formData.age),
      primary_contact: formData.primaryContact,
      alternative_contact: formData.alternativeContact,
      home_language: formData.homeLanguage,
      province: formData.province,
      suburb: formData.suburb,
      racial_group: formData.racialGroup,
      gender: formData.gender,
      has_disability: formData.hasDisability,
      has_disability_note: formData.hasDisabilityNote,
      disability_nature: formData.disabilityNature,

      // Education
      high_school: formData.highSchool,
      highest_qualification: formData.highestQualification,
      nqf_level: formData.nqfLevel,
      qualification_year: parseInt(formData.qualificationYear),
      qualification_field: formData.qualificationField,
      qualification_name: formData.qualificationName,
      other_programmes: formData.otherProgrammes,

      // Additional Info
      work_status: formData.workStatus,
      heard_about_capaciti: formData.heardAbout,
      tech_interest: formData.techInterest,
      criminal_conviction: formData.criminalConviction,
      work_dismissal: formData.workDismissal,
      dismissal_reason: formData.dismissalReason,

      // System fields
      resume_url: resumeUrl,
      application_date: new Date().toISOString(),
      status: 'pending'
    };

    // Insert application into database
    const { data, error } = await supabaseClient
      .from('programme_applications')
      .insert([applicationData])
      .select();

    if (error) {
      console.error('Database insertion error:', error);
      throw new Error('Failed to submit application');
    }

    console.log('Application submitted successfully:', data);
    return { success: true, data: data[0] };

  } catch (error) {
    console.error('Application submission error:', error);
    return { success: false, error: error.message };
  }
};