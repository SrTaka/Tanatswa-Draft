// Load Supabase
// (Instead of <script src=...>, if using module, this should be included in HTML, not JS file.)
// The following code assumes <script src="https://unpkg.com/@supabase/supabase-js@2"></script> is loaded globally.

(function () {
    // Ensure DOM is loaded
    document.addEventListener('DOMContentLoaded', function () {
      // Initialize Supabase client
      const supabaseUrl = 'https://ausaghcmzxmsmqdxrzmc.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1c2FnaGNtenhtc21xZHhyem1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MTA4OTEsImV4cCI6MjA3OTA4Njg5MX0.ro3py_CWH3FUQv4_yuvKuhYzCTjzfZof8ELMpMTus5I';
  
      // Check if supabase is loaded
      if (typeof window.supabase === 'undefined') {
        console.error('Supabase library not loaded.');
        return;
      }
      const { createClient } = window.supabase;
      const supabaseClient = createClient(supabaseUrl, supabaseKey);
  
      // Contact form handling
      const form = document.querySelector('#contactForm');
      if (form) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
  
          const formInputs = form.querySelectorAll('input, textarea');
          let submission = {};
  
          formInputs.forEach(input => {
            const { value, name } = input;
            if (name && value) {
              submission[name] = value;
            }
          });
  
          // Add timestamp if not handled by Supabase default
          submission.created_at = new Date().toISOString();
  
          try {
            const { error } = await supabaseClient
              .from('entries')
              .insert([submission], { returning: 'minimal' });
  
            if (error) {
              console.error('Error submitting form:', error);
              alert('Error submitting form. Please try again.');
            } else {
              console.log('Form submitted successfully');
              alert('Form submitted successfully!');
              form.reset();
            }
          } catch (err) {
            console.error('Error submitting form:', err);
            alert('Error submitting form. Please try again.');
          }
        });
      }
  
      // Mobile menu toggle
      const menuToggle = document.querySelector('.menu-toggle');
      const navMenu = document.querySelector('.nav-menu');
      if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
          navMenu.classList.toggle('active');
        });
      }
    });
  })();