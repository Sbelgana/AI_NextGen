function isValidEmail(email) {
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      return emailPattern.test(email);
    }
    function isValidPhoneNumber(phoneNumber) {
      const phonePattern = /^(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
      return phonePattern.test(phoneNumber);
    }
    function formatPhoneNumber(phoneNumber) {
      const cleaned = phoneNumber.replace(/\D/g, '');
      if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      }
      return phoneNumber;
    }
    // SVG constants.
    const SVG_CHECK = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
  <path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
</svg>
`;
    const SVG_CHEVRON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
      <g transform="translate(75, 75)">
        <path fill="#9a0df2" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
      </g>
    </svg>`;
    const SVG_USER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
      <path fill="#9a0df2" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
    </svg>`;
    const SVG_DENTIST = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
      <path fill="#9a0df2" d="M186.1 52.1C169.3 39.1 148.7 32 127.5 32C74.7 32 32 74.7 32 127.5l0 6.2c0 15.8 3.7 31.3 10.7 45.5l23.5 47.1c4.5 8.9 7.6 18.4 9.4 28.2l36.7 205.8c2 11.2 11.6 19.4 22.9 19.8s21.4-7.4 24-18.4l28.9-121.3C192.2 323.7 207 312 224 312s31.8 11.7 35.8 28.3l28.9 121.3c2.6 11.1 12.7 18.8 24 18.4s20.9-8.6 22.9-19.8l36.7-205.8c1.8-9.8 4.9-19.3 9.4-28.2l23.5-47.1c7.1-14.1 10.7-29.7 10.7-45.5l0-2.1c0-55-44.6-99.6-99.6-99.6c-24.1 0-47.4 8.8-65.6 24.6l-3.2 2.8 19.5 15.2c7 5.4 8.2 15.5 2.8 22.5s-15.5 8.2-22.5 2.8l-24.4-19-37-28.8z"/>
    </svg>`;
    
    /*************************************************************
     * 2) Data Creation Functions
     *************************************************************/
    function createDentalData(language) {
      const isEnglish = language === 'en';
      const practitionerServiceData = {
        "Ethan Brown": { "services": [ isEnglish ? "Dental cleanings and exams" : "Nettoyages et examens dentaires", isEnglish ? "Tooth extractions" : "Extractions dentaires", isEnglish ? "Wisdom teeth removal" : "Extraction des dents de sagesse", isEnglish ? "Root canal therapy" : "Traitement de canal", isEnglish ? "Tooth colored fillings" : "Obturations de la couleur des dents", isEnglish ? "Sealants" : "Scellants", isEnglish ? "Emergency dental care" : "Soins dentaires d'urgence" ] },
        "Noah Wilson": { "services": [ isEnglish ? "Dental cleanings and exams" : "Nettoyages et examens dentaires", isEnglish ? "Root canal therapy" : "Traitement de canal", isEnglish ? "Dental crowns and bridges" : "Couronnes et ponts dentaires", isEnglish ? "Teeth whitening" : "Blanchiment des dents", isEnglish ? "Fluoride treatments" : "Traitements au fluorure", isEnglish ? "Composite fillings" : "Obturations composites", isEnglish ? "Sealants" : "Scellants", isEnglish ? "Emergency dental care" : "Soins dentaires d'urgence" ] },
        "Sophia Martinez": { "services": [ isEnglish ? "Dental cleanings and exams" : "Nettoyages et examens dentaires", isEnglish ? "Teeth whitening" : "Blanchiment des dents", isEnglish ? "Porcelain veneers" : "Facettes en porcelaine", isEnglish ? "Dental bonding" : "Collage dentaire", isEnglish ? "Smile makeovers" : "Transformations du sourire", isEnglish ? "Full-mouth reconstruction" : "Reconstruction buccale complète", isEnglish ? "Invisalign clear aligners" : "Aligneurs transparents Invisalign" ] },
        "Emma Thompson": { "services": [ isEnglish ? "Dental cleanings and exams" : "Nettoyages et examens dentaires", isEnglish ? "Fluoride treatments" : "Traitements au fluorure", isEnglish ? "Sealants" : "Scellants" ] },
        "Olivia Davis": { "services": [ isEnglish ? "Dental cleanings and exams" : "Nettoyages et examens dentaires", isEnglish ? "Dental implants" : "Implants dentaires", isEnglish ? "Dentures" : "Prothèses dentaires", isEnglish ? "Dental crowns and bridges" : "Couronnes et ponts dentaires", isEnglish ? "Full-mouth reconstruction" : "Reconstruction buccale complète", isEnglish ? "Composite fillings" : "Obturations composites", isEnglish ? "Tooth colored fillings" : "Obturations de la couleur des dents" ] },
        "Liam Carter": { "services": [ isEnglish ? "Dental cleanings and exams" : "Nettoyages et examens dentaires", isEnglish ? "Traditional braces" : "Appareils orthodontiques traditionnels", isEnglish ? "Invisalign clear aligners" : "Aligneurs transparents Invisalign", isEnglish ? "Retainers and follow-up care" : "Contentions et suivi", isEnglish ? "Teeth whitening" : "Blanchiment des dents", isEnglish ? "Porcelain veneers" : "Facettes en porcelaine", isEnglish ? "Smile makeovers" : "Transformations du sourire", isEnglish ? "Dental bonding" : "Collage dentaire" ] },
        "Ava Johnson": { "services": [ isEnglish ? "Dental cleanings and exams" : "Nettoyages et examens dentaires", isEnglish ? "Dental implants" : "Implants dentaires", isEnglish ? "Dentures" : "Prothèses dentaires", isEnglish ? "Dental crowns and bridges" : "Couronnes et ponts dentaires", isEnglish ? "Composite fillings" : "Obturations composites", isEnglish ? "Full-mouth reconstruction" : "Reconstruction buccale complète", isEnglish ? "Porcelain veneers" : "Facettes en porcelaine", isEnglish ? "Fluoride treatments" : "Traitements au fluorure" ] }
      };
      const { familyDentistryServices, dentalSpecialtiesServices } = getServiceLists(isEnglish);
      const familyDentists = [];
      const specialtyDentists = [];
      for (const dentistName in practitionerServiceData) {
        const servArr = practitionerServiceData[dentistName].services;
        const offersFamily = servArr.some(s => familyDentistryServices.includes(s));
        const offersSpecialty = servArr.some(s => dentalSpecialtiesServices.includes(s) && !familyDentistryServices.includes(s));
        if (offersSpecialty) specialtyDentists.push(dentistName);
        else if (offersFamily) familyDentists.push(dentistName);
      }
      return {
        "dentisterie_familiale": {
          "nom": isEnglish ? "Family Dentistry" : "Dentisterie Familiale",
          "praticiens": familyDentists.map(name => ({ "nom": name, "services": practitionerServiceData[name].services }))
        },
        "specialites": {
          "nom": isEnglish ? "Dental Specialties" : "Spécialités Dentaires",
          "praticiens": specialtyDentists.map(name => ({ "nom": name, "services": practitionerServiceData[name].services }))
        },
        "allPractitioners": Object.keys(practitionerServiceData).map(name => ({ "nom": name, "services": practitionerServiceData[name].services }))
      };
    }
    function getServiceLists(isEnglish) {
      const family = [
        isEnglish ? 'Dental cleanings and exams' : 'Nettoyages et examens dentaires',
        isEnglish ? 'Fluoride treatments' : 'Traitements au fluorure',
        isEnglish ? 'Sealants' : 'Scellants',
        isEnglish ? 'Composite fillings' : 'Obturations composites',
        isEnglish ? 'Tooth colored fillings' : 'Obturations de la couleur des dents',
        isEnglish ? 'Tooth extractions' : 'Extractions dentaires',
        isEnglish ? 'Wisdom teeth removal' : 'Extraction des dents de sagesse',
        isEnglish ? 'Root canal therapy' : 'Traitement de canal',
        isEnglish ? 'Dental crowns and bridges' : 'Couronnes et ponts dentaires',
        isEnglish ? 'Emergency dental care' : "Soins dentaires d'urgence"
      ];
      const specialty = [
        isEnglish ? 'Traditional braces' : 'Appareils orthodontiques traditionnels',
        isEnglish ? 'Invisalign clear aligners' : 'Aligneurs transparents Invisalign',
        isEnglish ? 'Retainers and follow-up care' : 'Contentions et suivi',
        isEnglish ? 'Dental implants' : 'Implants dentaires',
        isEnglish ? 'Dentures' : 'Prothèses dentaires',
        isEnglish ? 'Full-mouth reconstruction' : 'Reconstruction buccale complète',
        isEnglish ? 'Dental bonding' : 'Collage dentaire',
        isEnglish ? 'Porcelain veneers' : 'Facettes en porcelaine',
        isEnglish ? 'Smile makeovers' : 'Transformations du sourire',
        isEnglish ? 'Teeth whitening' : 'Blanchiment des dents'
      ];
      return { familyDentistryServices: family, dentalSpecialtiesServices: specialty };
    }
    function createServiceMapping(dentalData) {
      const services = {};
      const servicesByCategory = {};
      for (const catKey in dentalData) {
        if (catKey === "allPractitioners") continue;
        const category = dentalData[catKey];
        const catName = category.nom;
        if (!servicesByCategory[catName]) {
          servicesByCategory[catName] = {};
        }
        category.praticiens.forEach(practitioner => {
          practitioner.services.forEach(serviceName => {
            if (!services[serviceName]) {
              services[serviceName] = [];
            }
            services[serviceName].push({ nom: practitioner.nom, category: catKey });
            if (!servicesByCategory[catName][serviceName]) {
              servicesByCategory[catName][serviceName] = [];
            }
            servicesByCategory[catName][serviceName].push({ nom: practitioner.nom, category: catKey });
          });
        });
      }
      return { services, servicesByCategory };
    }
    function buildGroupedServiceCategories(servicesByCategory) {
      return Object.keys(servicesByCategory).map(catName => {
        const subcats = Object.keys(servicesByCategory[catName]).map(subName => ({
          id: subName,
          name: subName
        }));
        return { id: catName, name: catName, subcategories: subcats };
      });
    }
    function filterDentistsByService(selectedService, dentalData) {
      const familyDentists = dentalData.dentisterie_familiale.praticiens;
      const specialtyDentists = dentalData.specialites.praticiens;
      const allDentists = [...familyDentists, ...specialtyDentists];
      return allDentists.filter(dentist => dentist.services.includes(selectedService));
    }
    
    /*************************************************************
     * 3) DentalFormExtension - MAIN EXTENSION OBJECT
     *************************************************************/
    const DentalFormExtension = {
      name: "DentalBookingForms",
      type: "response",
      match: ({ trace }) => trace.type === `ext_booking` || trace.payload?.name === `ext_booking`,
      render: ({ trace, element }) => {
        const { language } = trace.payload || { language: 'FR' };
        const isEnglish = language === 'en';
        const dentalData = createDentalData(language);
        const { services, servicesByCategory } = createServiceMapping(dentalData);
    
        /*************************************************************
         * HTML Generation & Initial Setup
         *************************************************************/
        const formContainer = document.createElement("form");
        formContainer.setAttribute("novalidate", "true");
        formContainer.innerHTML = `
		 <style>
    /* ========== Dropdown Components ========== */
    .main-container {
      display: block;
      transition: height 0.3s ease;
      border-radius: 6px;
      margin-bottom: 15px;
    }
    .select-wrapper {
      border: 1px solid #ddd;
      border-radius: 6px;
      background-color: #fff;
      position: relative;
      min-width: 300px;
      max-width: 600px;
      width: 100%;
      min-height: 50px;
    }
    .select-display {
      padding: 0 15px;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
    }
    .dropdown-icon {
      width: 24px;
      height: 24px;
      transition: transform 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5e7fe;
      border-radius: 50%;
    }
    .dropdown-icon.rotate {
      transform: rotate(180deg);
    }
    
    /* Custom Options & Subselect */
    .custom-options {
      display: none;
      border-top: 1px solid #ddd;
      max-height: 300px;
      overflow-y: auto;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      z-index: 100;
      border-radius: 0 0 6px 6px;
    }
    /* Hide scrollbar for Chrome, Safari, Opera */
.custom-options::-webkit-scrollbar {
  display: none; 
}

/* Hide scrollbar for IE, Edge, and Firefox */
.custom-options {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}

    .custom-option {
      padding: 12px 15px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: background 0.2s;
      position: relative;
    }
    .custom-option:hover {
      background-color: #f5e7fe;
      color:#9a0df2;
    }
    .custom-option.selected {
      background-color: #f5e7fe;
      color:#9a0df2;
      
      font-weight: bold;
    }
    /* Option Checkbox – consolidated duplicate rules */
    .option-checkbox {
      width: 24px;
      height: 24px;
      border: 2px solid #ccc;
      border-radius: 50%;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      transition: all 0.2s;
    }
    .option-checkbox::after {
      content: "";
      color: #9a0df2;
      font-size: 12px;
      display: none;
    }
    .custom-option.selected .option-checkbox {
      border-color: #9a0df2;
      background-color: #9a0df2;
    }
    .custom-option.selected .option-checkbox::after {
      display: block;
      color: #fff;
    }
    .custom-option:not(.selected):hover .option-checkbox,
    .custom-option:not(.selected):hover .option-checkbox::after {
      border-color: #9a0df2;
      display: block;
      color: #9a0df2;
    }
    .custom-option.selected .option-checkbox svg path {
      fill: #fff !important;
    }
    .show-options {
      display: block;
    }
    

    .custom-option.selected .main-arrow,
    .custom-option:hover .main-arrow {
      background-color: #fff;
    }

    
    /* Subselect Container & Elements */
    .select-container {
      min-width: 300px;
      max-width: 600px;
      width: 100%;
      margin-bottom: 10px;
    }
    .sub-options {
      margin-left: 25px;
      border-left: 2px solid #9a0df2;
    }
    select {
      display: none;
    }
    .main-arrow {
      margin-left: auto;
      display: flex;
      align-items: center;
      background-color: #f5e7fe;
      padding: 5px;
      border-radius: 50%;
      transition: background-color 0.3s;
    }
    .arrow-icon {
      transition: transform 0.3s ease;
    }
    .arrow-icon.rotate {
      transform: rotate(180deg);
    }
    
    /* ========== Error Components ========== */
    .error-container {
      width: 100%;
      margin: 2px 0;
      box-sizing: border-box;
    }
    .error-message {
      display: none;
      padding: 5px;
      border: 1px solid #e8e8e8;
      border-radius: 6px;
      background-color: #fff;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      font-size: 14px;
      align-items: center;
    }
    .error-icon {
      background-color: red;
      color: #fff;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 15px;
      flex-shrink: 0;
    }
    
    /* ========== Form Inputs & Layout ========== */
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 16px;
      border-radius: 6px;
      background: #fff;
    }
    .flex-row {
      display: flex;
      gap: 10px 16px;
      flex-wrap: wrap;
    } 
    .flex-row > div {
      flex: 1;
      min-width: 300px;
    }
    .bold-label {
      font-weight: 600;
      color: #000;
      font-size: 14px;
      margin-bottom: 4px;
      display: block;
    }
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    textarea {
      width: 100%;
      min-width: 200px;
      max-width: 600px;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 6px;
      padding: 8px;
      background: #fff;
      font-size: 14px;
      outline: none;
      box-sizing: border-box;
      height: 50px;
    }
    #details {
      resize: vertical;
      min-height: 100px;
      max-height: 200px;
    }
    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="tel"]:focus,
    #details:focus {
      border: 2px solid #9a0df2;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
    
    /* ========== Buttons ========== */
    .appointment-btn,
    .submit {
      color: #9a0df2;
      background-color: #f5e7fe;
      border: none;
      padding: 12px;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 8px;
      transition: background-color 0.2s, color 0.2s, font-weight 0.2s;
      width: 100%;
    }
    .appointment-btn:hover,
    .submit:hover {
      color: #fff;
      background-color: #9a0df2;
      font-weight: 600;
    }
    .appointment-btn:disabled,
    .submit:disabled {
      background-color: #ccc;
      color: #666;
      cursor: not-allowed;
      font-weight: 700;
    }
    
    /* ========== Sections & Tabs ========== */
    .section {
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 6px;
      margin-bottom: 10px;
      overflow: hidden;
      background: #fff;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .section-card {
      padding: 10px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      border-radius: 6px;
    }
    .section.active {
      border: 2px solid #9a0df2;
      box-shadow: 0 3px 8px rgba(154,13,242,0.1);
    }
    .section:hover:not(.disabled) {
      border-color: #9a0df2;
      box-shadow: 0 3px 8px rgba(154,13,242,0.1);
    }
    .section-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .section-icon {
      background-color: #f5e7fe;
      color: #9a0df2;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .section-title {
      font-weight: 700;
      font-size: 14px;
      color: #444;
    }
    .collapse-icon {
      transition: transform 0.3s;
      background: #f5e7fe;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    .collapse-icon.active {
      transform: rotate(-180deg);
    }
    .collapsible-section {
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.3s ease-out;
    }
    .collapsible-section.expanded {
      max-height: 1000px;
    }
    .section-content {
      padding: 20px;
      background: #fefefe;
      border-top: 1px solid #eee;
    }
    .tabs-container {
      margin-bottom: 15px;
      border-radius: 6px;
      overflow: hidden;
    }
    .tabs {
      display: flex;
      width: 100%;
    }
    .tab {
      flex: 1;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 17px;
      font-weight: bold;
      background-color: #f5f5f5;
      text-align: center;
      color: #333;
      border: none;
    }
    .tab.active {
      background-color: #9a0df2;
      color: #fff;
    }
    .tab:hover:not(.active) {
      background-color: #f5e7fe;
      color: #9a0df2;
    }
    .tab-content {
      display: none;
    }
    .tab-content.active {
      display: block;
    }
    .select-label {
      margin-bottom: 8px;
      font-weight: bold;
      color: #444;
    }
    
    /* ========== Disabled State ========== */
    .disabled,
    .disabled * {
      pointer-events: none !important;
      cursor: not-allowed !important;
    }
    
    /* Miscellaneous adjustments */
    .custom-option:not(.selected):hover .option-checkbox svg path {
      fill: #9a0df2;
    }

    .custom-option:not(.selected):hover .option-checkbox {
  position: relative;
  border-color: #9a0df2;
}

.custom-option:not(.selected):hover .option-checkbox svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
}

/* Make sure the SVG is properly centered in all states */
.option-checkbox svg {
  position: absolute;
  width: 18px;
  height: 18px;
}
  </style>
          <!-- Tabs -->
          <div class="tabs-container">
            <div class="tabs">
              <div class="tab active" data-tab="practitioner-mode">
                ${isEnglish ? 'Choose by Dentist' : 'Choisir par Dentiste'}
              </div>
              <div class="tab" data-tab="service-mode">
                ${isEnglish ? 'Choose by Service' : 'Choisir par Service'}
              </div>
            </div>
          </div>
          <div class="flex-row">
            <!-- Section 1: Contact Information -->
            <div class="section">
              <div class="section-card" data-target="section-contactInfo">
                <div class="section-info">
                  <div class="section-icon">${SVG_USER}</div>
                  <div class="section-title">${isEnglish ? "Your Contact Details" : "Vos coordonnées"}</div>
                </div>
                <div class="collapse-icon">${SVG_CHEVRON}</div>
              </div>
              <div class="collapsible-section" id="section-contactInfo">
                <div class="section-content">
                  <div class="flex-row">
                    <div>
                      <label for="full-name" class="bold-label">${isEnglish ? 'Full Name' : 'Nom complet'}</label>
                      <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorFullName">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'Full Name is required.' : 'Le nom complet est obligatoire.'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="email" class="bold-label">Email</label>
                      <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorEmail">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'A valid email is required.' : "Une adresse email valide est obligatoire."}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="phone" class="bold-label">${isEnglish ? 'Phone Number' : 'Numéro de téléphone'}</label>
                      <input type="tel" id="phone" name="phone" placeholder="${isEnglish ? 'Enter your phone number' : 'Entrez votre numéro de téléphone'}" required />
                      <div class="error-container">
                        <div class="error-message" id="errorPhone">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'A valid phone number is required.' : "Un numéro de téléphone valide est obligatoire."}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Section 2: Dentist and Service -->
            <div class="section">
              <div class="section-card" data-target="section-dentist-service">
                <div class="section-info">
                  <div class="section-icon">${SVG_DENTIST}</div>
                  <div class="section-title">${isEnglish ? "Dentist & Service" : "Dentiste et Service"}</div>
                </div>
                <div class="collapse-icon">${SVG_CHEVRON}</div>
              </div>
              <div class="collapsible-section" id="section-dentist-service">
                <div class="section-content">
                  <!-- Mode 1: Choose by Dentist -->
                  <div id="practitioner-mode" class="tab-content active">
                    <!-- Custom Practitioner Dropdown -->
                    <div class="main-container" id="practitionerDropdown">
                      <label class="bold-label">${isEnglish ? 'Select a Dentist' : 'Sélectionnez un dentiste'}</label>
                      <select id="dentistSelect" name="dentistSelect" required style="display:none;"></select>
                      <div class="select-wrapper">
                        <div class="select-display" id="selectDisplayPractitioner">
                          <span>${isEnglish ? '-- Select a Dentist --' : '-- Sélectionnez un dentiste --'}</span>
                          <div class="dropdown-icon" id="dropdownIconPractitioner">${SVG_CHEVRON}</div>
                        </div>
                        <div class="custom-options" id="customOptionsPractitioner"></div>
                      </div>
                      <div class="error-container">
                        <div class="error-message" id="errorDentist">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'You must select a dentist.' : 'Vous devez sélectionner un dentiste.'}</span>
                        </div>
                      </div>
                    </div>
                    <!-- Custom Service Dropdown (dependent on Dentist) -->
                    <div id="practitionerServiceContainer" style="display:none;">
                      <label class="bold-label">${isEnglish ? 'Select a Service' : 'Sélectionnez un service'}</label>
                      <div class="main-container" id="serviceDropdownPractitioner">
                        <select id="dentistServiceSelect" name="dentistServiceSelect" required style="display:none;"></select>
                        <div class="select-wrapper">
                          <div class="select-display" id="selectDisplayPractitionerService">
                            <span>${isEnglish ? '-- Select a Service --' : '-- Sélectionnez un service --'}</span>
                            <div class="dropdown-icon" id="dropdownIconPractitionerService">${SVG_CHEVRON}</div>
                          </div>
                          <div class="custom-options" id="customOptionsPractitionerService"></div>
                        </div>
                        <div class="error-container">
                          <div class="error-message" id="errorDentistService">
                            <div class="error-icon">!</div>
                            <span>${isEnglish ? 'You must select a service.' : 'Vous devez sélectionner un service.'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Mode 2: Choose by Service -->
                  <div id="service-mode" class="tab-content">
                    <!-- Dropdown with subselect for service selection -->
                    <div class="select-container" id="serviceDropdownContainer">
                      <label class="bold-label">${isEnglish ? 'Select a Service' : 'Sélectionnez un service'}</label>
                      <select id="mainSelectNative"></select>
                      <select id="subSelectNative"></select>
                      <div class="select-wrapper">
                        <div class="select-display" id="dropdownToggle">
                          <span id="selectedText">${isEnglish ? '-- Choose a service --' : '-- Choisissez un service --'}</span>
                          <div class="dropdown-icon" id="dropdownIcon"></div>
                        </div>
                        <div class="custom-options" id="customOptions"></div>
                      </div>
                      <div class="error-container">
                        <div class="error-message" id="errorService">
                          <div class="error-icon">!</div>
                          <span>${isEnglish ? 'You must select a service.' : 'Vous devez sélectionner un service.'}</span>
                        </div>
                      </div>
                    </div>
                    <!-- Custom Practitioner Dropdown (filtered by selected service) -->
                    <div id="servicePractitionerContainer" style="display:none;">
                      <label class="bold-label">${isEnglish ? 'Select a Practitioner' : 'Sélectionnez un praticien'}</label>
                      <div class="main-container" id="servicePractitionerDropdown">
                        <select id="servicePractitionerSelect" name="servicePractitionerSelect" required style="display:none;"></select>
                        <div class="select-wrapper">
                          <div class="select-display" id="selectDisplayServicePractitioner">
                            <span>${isEnglish ? '-- Select a Practitioner --' : '-- Sélectionnez un praticien --'}</span>
                            <div class="dropdown-icon" id="dropdownIconServicePractitioner">${SVG_CHEVRON}</div>
                          </div>
                          <div class="custom-options" id="customOptionsServicePractitioner"></div>
                        </div>
                        <div class="error-container">
                          <div class="error-message" id="errorServicePractitioner">
                            <div class="error-icon">!</div>
                            <span>${isEnglish ? 'You must select a practitioner.' : 'Vous devez sélectionner un praticien.'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Submit button -->
          <button type="button" class="appointment-btn" id="submit-button">
            ${isEnglish ? 'Submit' : 'Soumettre'}
          </button>
        `;
        element.appendChild(formContainer);
    
         
        function closeAllUIElements() {
          // Close all dropdown menus within the form container.
          formContainer.querySelectorAll('.custom-options').forEach(opt => opt.classList.remove('show-options'));
          formContainer.querySelectorAll('.dropdown-icon').forEach(icon => icon.classList.remove('rotate'));
          
          // Optionally collapse any expanded sections.
          formContainer.querySelectorAll('.collapsible-section.expanded').forEach(sec => sec.classList.remove('expanded'));
          formContainer.querySelectorAll('.section-card.active').forEach(card => card.classList.remove('active'));
        }
    
        function initializeCustomDropdown(dropdownId, placeholderText, optionsData, onSelect) {
          const container = formContainer.querySelector(`#${dropdownId}`);
          const selectDisplay = container.querySelector('.select-display');
          const customOptions = container.querySelector('.custom-options');
          const dropdownIcon = container.querySelector('.dropdown-icon');
          const nativeSelect = container.querySelector('select');
          nativeSelect.innerHTML = `<option value="" disabled selected>${placeholderText}</option>`;
          selectDisplay.querySelector('span').textContent = placeholderText;
          customOptions.innerHTML = "";
          optionsData.forEach(item => {
            const optionEl = document.createElement('div');
            optionEl.className = 'custom-option';
            optionEl.dataset.value = item.id;
            optionEl.innerHTML = `<div class="option-checkbox">${SVG_CHECK}</div><span>${item.name}</span>`;
            customOptions.appendChild(optionEl);
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = item.name;
            nativeSelect.appendChild(opt);
            optionEl.addEventListener('click', function(e) {
              e.stopPropagation();
              customOptions.querySelectorAll('.custom-option').forEach(opt => {
                opt.classList.remove('selected');
              });
              this.classList.add('selected');
              selectDisplay.querySelector('span').textContent = item.name;
              nativeSelect.value = item.id;
              customOptions.classList.remove('show-options');
              dropdownIcon.classList.remove('rotate');
              if (onSelect) onSelect(item);
              const errorEl = container.parentNode.querySelector(".error-message");
              if (errorEl) errorEl.style.display = "none";
            });
          });
          selectDisplay.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = customOptions.classList.contains('show-options');
            // Only close dropdowns within form container.
            formContainer.querySelectorAll('.custom-options').forEach(optList => optList.classList.remove('show-options'));
            formContainer.querySelectorAll('.dropdown-icon').forEach(icon => icon.classList.remove('rotate'));
            if (!isOpen) {
              customOptions.classList.add('show-options');
              dropdownIcon.classList.add('rotate');
            } else {
              customOptions.classList.remove('show-options');
              dropdownIcon.classList.remove('rotate');
            }
          });
          formContainer.addEventListener('click', function(e) {
            if (!container.contains(e.target)) {
              customOptions.classList.remove('show-options');
              dropdownIcon.classList.remove('rotate');
            }
          });
        }
         
        function resetPractitionerMode() {
          // Clear the native select values
          formContainer.querySelector("#dentistSelect").value = "";
          formContainer.querySelector("#dentistServiceSelect").value = "";
    
          // Reset the custom display text to its placeholder
          formContainer.querySelector("#selectDisplayPractitioner").querySelector("span").textContent = "-- Select a Dentist --";
          formContainer.querySelector("#selectDisplayPractitionerService").querySelector("span").textContent = "-- Select a Service --";
    
          // Hide the Mode 1 service container
          formContainer.querySelector("#practitionerServiceContainer").style.display = "none";
        }
    
        function resetServiceMode() {
          // Clear native select values for Mode 2
          formContainer.querySelector("#mainSelectNative").value = "";
          formContainer.querySelector("#subSelectNative").value = "";
    
          // Reset the custom display text back to its default
          formContainer.querySelector("#selectedText").textContent = "-- Choose a service --";
          currentSelectedCategory = null;
          currentSelectedService = null;
    
          buildServiceDropdown();
    
          formContainer.querySelector("#servicePractitionerContainer").style.display = "none";
        }
    
        function closeAllOtherSections(currentId) {
          const allSections = formContainer.querySelectorAll(".collapsible-section");
          allSections.forEach(sec => {
            if (sec.id !== currentId) {
              sec.classList.remove("expanded");
              const card = sec.previousElementSibling;
              if (card) card.classList.remove("active");
              const icon = card ? card.querySelector(".collapse-icon") : null;
              if (icon) icon.classList.remove("active");
            }
          });
        }
        function toggleSection(sectionId) {
          const section = formContainer.querySelector(`#${sectionId}`);
          if (!section) return;
          const parentSection = section.previousElementSibling;
          const icon = parentSection.querySelector(".collapse-icon");
          const wasExpanded = section.classList.contains("expanded");
          closeAllOtherSections(sectionId);
          if (!wasExpanded) {
            section.classList.add("expanded");
            parentSection.classList.add("active");
            if (icon) icon.classList.add("active");
          } else {
            section.classList.remove("expanded");
            parentSection.classList.remove("active");
            if (icon) icon.classList.remove("active");
          }
        }
        formContainer.querySelectorAll('.section-card').forEach(card => {
          const targetId = card.getAttribute("data-target");
          card.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleSection(targetId);
          });
        });
        formContainer.querySelectorAll('.tab').forEach(tab => {
          tab.addEventListener('click', () => {
            // Close all open dropdowns and collapse sections.
            closeAllUIElements();
            
            // Remove active classes from all tabs and content panels
            formContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            formContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Set the clicked tab as active
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            formContainer.querySelector(`#${tabId}`).classList.add('active');
    
            // Reset the selections on the inactive mode.
            if (tabId === "practitioner-mode") {
              resetServiceMode();
            } else if (tabId === "service-mode") {
              resetPractitionerMode();
            }
          });
        });
        const practitionersData = dentalData.allPractitioners.map(practitioner => ({
          id: practitioner.nom,
          name: practitioner.nom
        }));
        initializeCustomDropdown("practitionerDropdown", isEnglish ? '-- Select a Dentist --' : '-- Sélectionnez un dentiste --', practitionersData, (selectedDentist) => {
          const dentist = dentalData.allPractitioners.find(d => d.nom === selectedDentist.name);
          if (dentist) {
            formContainer.querySelector("#dentistServiceSelect").value = "";
            formContainer.querySelector("#selectDisplayPractitionerService").querySelector("span").textContent = isEnglish ? '-- Select a Service --' : '-- Sélectionnez un service --';
            const serviceData = dentist.services.map(s => ({ id: s, name: s }));
            const serviceDropdownEl = formContainer.querySelector("#serviceDropdownPractitioner");
const newServiceDropdownEl = serviceDropdownEl.cloneNode(true);
serviceDropdownEl.parentNode.replaceChild(newServiceDropdownEl, serviceDropdownEl);

            initializeCustomDropdown("serviceDropdownPractitioner", isEnglish ? '-- Select a Service --' : '-- Sélectionnez un service --', serviceData);
formContainer.querySelector("#practitionerServiceContainer").style.display = "block";
// Optionally: automatically open the dropdown
const disp = formContainer.querySelector("#selectDisplayPractitionerService");
const opts = formContainer.querySelector("#customOptionsPractitionerService");
const icon = formContainer.querySelector("#dropdownIconPractitionerService");
if(disp && opts && icon){
  opts.classList.add("show-options");
  icon.classList.add("rotate");
}

          }
        });

        let currentSelectedCategory = null;
        let currentSelectedService = null;
    
        const serviceCategories = buildGroupedServiceCategories(servicesByCategory);
    
        const mainSelectNative = formContainer.querySelector("#mainSelectNative");
        const subSelectNative = formContainer.querySelector("#subSelectNative");
        const customOptionsContainer = formContainer.querySelector("#customOptions");
        const dropdownToggle = formContainer.querySelector("#dropdownToggle");
        const dropdownIcon = formContainer.querySelector("#dropdownIcon");
        const selectedText = formContainer.querySelector("#selectedText");
    
        dropdownIcon.innerHTML = SVG_CHEVRON;
    
        function buildServiceDropdown() {
          customOptionsContainer.innerHTML = "";
          mainSelectNative.innerHTML = "";
          subSelectNative.innerHTML = "";
    
          serviceCategories.forEach(cat => {
            mainSelectNative.appendChild(new Option(cat.name, cat.id));
    
            const catDiv = document.createElement("div");
            catDiv.className = "custom-option";
            catDiv.dataset.catId = cat.id;
            catDiv.innerHTML = `<span>${cat.name}</span><span class="main-arrow arrow-icon">${SVG_CHEVRON}</span>`;
    
            catDiv.addEventListener("click", function(e) {
              e.stopPropagation();
              if (catDiv.classList.contains("expanded")) {
                catDiv.classList.remove("expanded", "selected");
                // Remove the rotate class from the category arrow:
                const arrowEl = catDiv.querySelector(".arrow-icon");
                if (arrowEl) arrowEl.classList.remove("rotate");
                removeSubOptions(cat.id);
                updateDropdownText();
                return;
              }
    
              if (currentSelectedCategory !== cat.id) {
                currentSelectedCategory = cat.id;
              }
    
              formContainer.querySelectorAll(".sub-options").forEach(el => el.remove());
              formContainer.querySelectorAll(".custom-options > .custom-option").forEach(opt => {
                if(opt.dataset.catId !== currentSelectedCategory) {
                  opt.classList.remove("selected", "expanded");
                }
              });
              catDiv.classList.add("expanded", "selected");
              catDiv.querySelector(".arrow-icon").classList.add("rotate");
              mainSelectNative.value = cat.id;
              if (!currentSelectedService) {
                selectedText.textContent = cat.name;
              }
    
              const subWrapper = document.createElement("div");
              subWrapper.className = "sub-options";
              subWrapper.dataset.parentCat = cat.id;
              cat.subcategories.forEach(sub => {
                const subDiv = document.createElement("div");
                subDiv.className = "custom-option";
                subDiv.dataset.serviceId = sub.id;
                subDiv.innerHTML = `<div class="option-checkbox">${SVG_CHECK}</div><span>${sub.name}</span>`;
                // If this service was already selected, mark it as selected.
                if(currentSelectedService === sub.id && currentSelectedCategory === cat.id){
                  subDiv.classList.add("selected");
                }
    
                subDiv.addEventListener("click", function(e) {
                  e.stopPropagation();
                  if (currentSelectedService === sub.id) {
                    updateDropdownText();
                    closeDropdown();
                    return;
                  }
                  const siblingServices = subWrapper.querySelectorAll(".custom-option");
                  siblingServices.forEach(opt => opt.classList.remove("selected"));
                  subDiv.classList.add("selected");
                  currentSelectedService = sub.id;
                  subSelectNative.value = sub.id;
                  selectedText.textContent = `${sub.name}`;
                  formContainer.querySelector("#errorService").style.display = "none";
    
                  const matchingPractitioners = filterDentistsByService(sub.name, dentalData)
                    .map(pract => ({ id: pract.nom, name: pract.nom }));
                  if (matchingPractitioners.length > 0) {
                      const practitionerDropdownEl = formContainer.querySelector("#servicePractitionerDropdown");
const newPractitionerDropdownEl = practitionerDropdownEl.cloneNode(true);
practitionerDropdownEl.parentNode.replaceChild(newPractitionerDropdownEl, practitionerDropdownEl);

                    initializeCustomDropdown("servicePractitionerDropdown", isEnglish ? '-- Select a Practitioner --' : '-- Sélectionnez un praticien --', matchingPractitioners, function() {
  formContainer.querySelector("#errorServicePractitioner").style.display = "none";
});
formContainer.querySelector("#servicePractitionerContainer").style.display = "block";
const dentistDropdown = formContainer.querySelector("#servicePractitionerDropdown");
const dentistCustomOptions = dentistDropdown.querySelector('.custom-options');
const dentistDropdownIcon = dentistDropdown.querySelector('.dropdown-icon');
dentistCustomOptions.classList.add("show-options");
dentistDropdownIcon.classList.add("rotate");

                  } else {
                    formContainer.querySelector("#servicePractitionerContainer").style.display = "none";
                    alert(isEnglish ? "No practitioner available for this service." : "Aucun praticien disponible pour ce service.");
                  }
                  closeDropdown();
                });
    
                subWrapper.appendChild(subDiv);
                subSelectNative.appendChild(new Option(sub.name, sub.id));
              });
              catDiv.insertAdjacentElement("afterend", subWrapper);
            });
    
            customOptionsContainer.appendChild(catDiv);
          });
        }
    
        function removeSubOptions(catId) {
          const subWrappers = formContainer.querySelectorAll(`.sub-options[data-parent-cat="${catId}"]`);
          subWrappers.forEach(sw => sw.remove());
        }
    
        function updateDropdownText() {
          if (currentSelectedService) {
            const cat = serviceCategories.find(c => c.id === currentSelectedCategory);
            if (cat) {
              const sub = cat.subcategories.find(s => s.id === currentSelectedService);
              if (sub) {
                selectedText.textContent = `${sub.name}`;
                return;
              }
            }
          }
          selectedText.textContent = isEnglish ? "Choose a category" : "Choisissez une catégorie";
        }
    
        function closeDropdown() {
          customOptionsContainer.classList.remove("show-options");
          dropdownIcon.classList.remove("rotate");
          formContainer.querySelectorAll(".sub-options").forEach(sw => sw.remove());
          // Remove "expanded" and reset arrow icons from all category elements:
          formContainer.querySelectorAll(".custom-options > .custom-option.expanded").forEach(opt => {
            opt.classList.remove("expanded");
            const arrowEl = opt.querySelector(".arrow-icon");
            if (arrowEl) arrowEl.classList.remove("rotate");
          });
        }
    
        dropdownToggle.addEventListener("click", (e) => {
          e.stopPropagation();
          customOptionsContainer.classList.toggle("show-options");
          dropdownIcon.classList.toggle("rotate");
          if (customOptionsContainer.classList.contains("show-options") && currentSelectedCategory) {
            const catDiv = customOptionsContainer.querySelector(`.custom-option[data-cat-id="${currentSelectedCategory}"]`);
            if (catDiv && !catDiv.classList.contains("expanded")) {
              catDiv.click();
            }
          }
        });
    
        formContainer.addEventListener("click", (e) => {
          if (!e.target.closest(".select-wrapper")) {
            customOptionsContainer.classList.remove("show-options");
            dropdownIcon.classList.remove("rotate");
            formContainer.querySelectorAll(".sub-options").forEach(sw => sw.remove());
          }
        });
    
        buildServiceDropdown();
    
        function expandSectionIfNeeded(sectionId) {
          const section = formContainer.querySelector(`#${sectionId}`);
          if (!section.classList.contains("expanded")) {
            toggleSection(sectionId);
          }
          section.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    
    
        formContainer.querySelector("#full-name").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorFullName").style.display = "none";
        });
        formContainer.querySelector("#email").addEventListener("input", function() {
          if (isValidEmail(this.value.trim())) formContainer.querySelector("#errorEmail").style.display = "none";
        });
        formContainer.querySelector("#phone").addEventListener("input", function() {
          if (isValidPhoneNumber(this.value.trim())) formContainer.querySelector("#errorPhone").style.display = "none";
        });
        
        function disableAllFormElements() {
          formContainer.querySelectorAll('.collapsible-section.expanded').forEach(sec => {
            sec.classList.remove('expanded');
            let card = sec.previousElementSibling;
            if (card) {
              card.classList.remove('active');
              let icon = card.querySelector('.collapse-icon');
              if (icon) icon.classList.remove('active');
            }
          });
          formContainer.querySelectorAll('.custom-options.show-options').forEach(opt => opt.classList.remove('show-options'));
          formContainer.querySelectorAll('.dropdown-icon.rotate').forEach(icon => icon.classList.remove('rotate'));
          formContainer.classList.add('disabled');
        }
        formContainer.querySelector("#submit-button").addEventListener("click", () => {
          formContainer.querySelectorAll(".error-message").forEach(errorEl => {
            errorEl.style.display = "none";
          });
    
          const fullName = formContainer.querySelector("#full-name").value.trim();
          const email = formContainer.querySelector("#email").value.trim();
          const phone = formContainer.querySelector("#phone").value.trim();
          const activeTab = formContainer.querySelector(".tab.active").getAttribute("data-tab");
          let selectedDentist = "";
          let selectedService = "";
    
          if (!fullName) {
            expandSectionIfNeeded("section-contactInfo");
            formContainer.querySelector("#errorFullName").style.display = "flex";
            return;
          }
          if (!email || !isValidEmail(email)) {
            expandSectionIfNeeded("section-contactInfo");
            formContainer.querySelector("#errorEmail").style.display = "flex";
            return;
          }
          if (!phone || !isValidPhoneNumber(phone)) {
            expandSectionIfNeeded("section-contactInfo");
            formContainer.querySelector("#errorPhone").style.display = "flex";
            return;
          }
    
          if (activeTab === "practitioner-mode") {
            selectedDentist = formContainer.querySelector("#dentistSelect").value;
            selectedService = formContainer.querySelector("#dentistServiceSelect").value;
            if (!selectedDentist) {
              expandSectionIfNeeded("section-dentist-service");
              formContainer.querySelector("#errorDentist").style.display = "flex";
              return;
            }
            if (!selectedService) {
              expandSectionIfNeeded("section-dentist-service");
              formContainer.querySelector("#errorDentistService").style.display = "flex";
              return;
            }
          } else if (activeTab === "service-mode") {
            selectedService = formContainer.querySelector("#subSelectNative").value;
            selectedDentist = formContainer.querySelector("#servicePractitionerSelect").value;
            if (!selectedService) {
              expandSectionIfNeeded("section-dentist-service");
              formContainer.querySelector("#errorService").style.display = "flex";
              return;
            }
            if (!selectedDentist) {
              expandSectionIfNeeded("section-dentist-service");
              formContainer.querySelector("#errorServicePractitioner").style.display = "flex";
              return;
            }
          }
    
          formContainer.querySelectorAll(".error-message").forEach(errorEl => {
            errorEl.style.display = "none";
          });
    
          const dentistInfo = dentalData.allPractitioners.find(d => d.nom === selectedDentist);
          if (!dentistInfo) {
            alert(isEnglish ? "Invalid dentist selected." : "Dentiste sélectionné invalide.");
            return;
          }
    
          const submitButton = formContainer.querySelector("#submit-button");
          submitButton.disabled = true;
          submitButton.textContent = isEnglish ? "Processing..." : "Traitement...";
          submitButton.style.cursor = "not-allowed";
          submitButton.style.backgroundColor = "#4CAF50";
          submitButton.style.color = "white";
    
          if (window.voiceflow && window.voiceflow.chat) {
            window.voiceflow.chat.interact({
              type: "complete",
              payload: {
                fullName,
                email,
                phone: formatPhoneNumber(phone),
                practitioner: dentistInfo.nom,
                service: selectedService
              },
            });
            submitButton.textContent = isEnglish ? "Submitted!" : "Soumis!";
          } else {
            console.log("Form data:", {
              fullName,
              email,
              phone: formatPhoneNumber(phone),
              practitioner: dentistInfo.nom,
              service: selectedService
            });
            submitButton.textContent = isEnglish ? "Submitted (see console)" : "Soumis (voir console)";
          }
          disableAllFormElements();
        });
      }
    };
    
    window.DentalFormExtension = DentalFormExtension;
