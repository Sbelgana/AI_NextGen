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
    <path fill="#9c27b0" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
  </g>
</svg>`;
const SVG_USER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
  <path fill="#9c27b0" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
</svg>`;
const SVG_DENTIST = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
  <path fill="#9c27b0" d="M186.1 52.1C169.3 39.1 148.7 32 127.5 32C74.7 32 32 74.7 32 127.5l0 6.2c0 15.8 3.7 31.3 10.7 45.5l23.5 47.1c4.5 8.9 7.6 18.4 9.4 28.2l36.7 205.8c2 11.2 11.6 19.4 22.9 19.8s21.4-7.4 24-18.4l28.9-121.3C192.2 323.7 207 312 224 312s31.8 11.7 35.8 28.3l28.9 121.3c2.6 11.1 12.7 18.8 24 18.4s20.9-8.6 22.9-19.8l36.7-205.8c1.8-9.8 4.9-19.3 9.4-28.2l23.5-47.1c7.1-14.1 10.7-29.7 10.7-45.5l0-2.1c0-55-44.6-99.6-99.6-99.6c-24.1 0-47.4 8.8-65.6 24.6l-3.2 2.8 19.5 15.2c7 5.4 8.2 15.5 2.8 22.5s-15.5 8.2-22.5 2.8l-24.4-19-37-28.8z"/>
</svg>`;


const SVG_MESSAGE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px"><path fill="#9c27b0" d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/></svg>`;


// *** Added Non Allowed Cursor SVG Constant and Data URL ***
const SVG_NOT_ALLOWED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24px" height="24px">
  <path fill="%23af2828" d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
</svg>`;
const svgDataUrl = `url('data:image/svg+xml;utf8,${SVG_NOT_ALLOWED}') 12 12, not-allowed`;




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
 * 3) BookingFormExtension - MAIN EXTENSION OBJECT
 *************************************************************/
const BookingFormExtension = {
  name: "BookingForms",
  type: "response",
  match: ({ trace }) => trace.type === `ext_booking_form` || trace.payload?.name === `ext_booking_form`,
  render: ({ trace, element }) => {
    const { language } = trace.payload || { language };
    const isEnglish = language === 'en';
    const dentalData = createDentalData(language);
    const { services, servicesByCategory } = createServiceMapping(dentalData);


// Initialize timeout variables
let formTimeoutId = null;
let isFormSubmitted = false;
const TIMEOUT_DURATION = 300000; // 15 minutes in milliseconds

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
      max-width: 800px;
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
      background-color: #F8EAFA;
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
      background-color: #F8EAFA;
      color:#9c27b0;
    }
    .custom-option.selected {
      background-color: #F8EAFA;
      color:#9c27b0;
      
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
      color: #9c27b0;
      font-size: 12px;
      display: none;
    }
    .custom-option.selected .option-checkbox {
      border-color: #9c27b0;
      background-color: #9c27b0;
    }
    .custom-option.selected .option-checkbox::after {
      display: block;
      color: #fff;
    }
    .custom-option:not(.selected):hover .option-checkbox,
    .custom-option:not(.selected):hover .option-checkbox::after {
      border-color: #9c27b0;
      display: block;
      color: #9c27b0;
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
      max-width: 800px;
      width: 100%;
      margin-bottom: 10px;
    }
    .sub-options {
      margin-left: 25px;
      border-left: 2px solid #9c27b0;
    }
    select {
      display: none;
    }
    .main-arrow {
      margin-left: auto;
      display: flex;
      align-items: center;
      background-color: #F8EAFA;
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
      min-width: 400px;
      margin: 0 auto;
      padding: 16px;
      border-radius: 6px;
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
    #details {
      width: 100%;
      min-width: 200px;
      max-width: 800px;
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
      border: 2px solid #9c27b0;
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
      color: #9c27b0;
      background-color: #F8EAFA;
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
      background-color: #9c27b0;
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
      border: 2px solid #9c27b0;
      box-shadow: 0 3px 8px rgba(154,13,242,0.1);
    }
    .section:hover:not(.disabled) {
      border-color: #9c27b0;
      box-shadow: 0 3px 8px rgba(154,13,242,0.1);
    }
    .section-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .section-icon {
      background-color: #F8EAFA;
      color: #9c27b0;
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
      background: #F8EAFA;
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
      background-color: #fff;
      text-align: center;
      color: #333;
      border: none;
    }
    .tab.active {
      background-color: #9c27b0;
      color: #fff;
    }
    .tab:hover:not(.active) {
      background-color: #F8EAFA;
      color: #9c27b0;
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
    .disabled {
      cursor: not-allowed !important;
    }
    
    .disabled * {
      cursor: not-allowed !important;
      pointer-events: none !important;
    }
    
    /* Miscellaneous adjustments */
    .custom-option:not(.selected):hover .option-checkbox svg path {
      fill: #9c27b0;
    }

    .custom-option:not(.selected):hover .option-checkbox {
  position: relative;
  border-color: #9c27b0;
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

    /*************************************************************
     * Helper Functions for UI Interaction & Custom Dropdowns
     *************************************************************/
	 
	 function startFormTimer() {
  let timeLeft = TIMEOUT_DURATION;
  
  // Just set the timeout - no display updates needed
  formTimeoutId = setInterval(() => {
    timeLeft -= 1000;
    
    if (timeLeft <= 0) {
      clearInterval(formTimeoutId);
      if (!isFormSubmitted) {
        handleFormTimeout();
      }
    }
  }, 1000);
}

function handleFormTimeout() {
  // Apply disabled styling
  formContainer.classList.add('form-disabled');
  
  // Disable all form inputs
  formContainer.querySelector("#full-name").disabled = true;
  formContainer.querySelector("#email").disabled = true;
  formContainer.querySelector("#phone").disabled = true;
  
  // Disable the dropdown
  formContainer.querySelector("#selectDisplayAgent").classList.add('dropdown-disabled');
  
  // Update button state
  const submitButton = formContainer.querySelector("#submit-button");
  submitButton.disabled = true;
  submitButton.textContent = isEnglish ? "Time Expired" : "Temps expiré";
  submitButton.style.backgroundColor = "#f44336";
  submitButton.style.color = "white";
  
  window.voiceflow.chat.interact({
    type: "timeEnd",
    payload: {
      message: "Time expired"
    }
  });
}


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
    
    // Function to disable all interactive elements and apply the non allowed cursor.
    function disableAllFormElements() {
      // Collapse any open sections or dropdowns.
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

      // *** Set the custom non allowed cursor (SVG) to all interactive elements ***
      const interactiveElements = formContainer.querySelectorAll('button, input, select, .section, .custom-options, .select-wrapper, .section-card, .dropdown-icon');
      interactiveElements.forEach(el => {
        el.style.cursor = svgDataUrl;
      });
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
	  
	  isFormSubmitted = true;
  if (formTimeoutId) {
    clearInterval(formTimeoutId);
  }

      const submitButton = formContainer.querySelector("#submit-button");
      submitButton.disabled = true;
      submitButton.textContent = isEnglish ? "Processing..." : "Traitement...";
      // *** Use the custom SVG non allowed cursor for the submit button ***
      submitButton.style.cursor = svgDataUrl;
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
	startFormTimer(); 
  }
};

    const BookingCalendarExtension = {
      name: 'Booking',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'ext_booking_calendar' || trace.payload?.name === 'ext_booking_calendar',
      render: async ({ trace, element }) => {
        // --- Extract required payload values with fallbacks ---
        const {
  fullName = "John Doe",
  email = "john@example.com",
  apiKey = "",
  scheduleId = "",
  eventTypeId = "1", 
  eventTypeSlug = "default-event",
  serviceProvider = "Dr. Sophie Martin", // Add this line
  serviceName = "Nettoyage et Examen Dentaire", // Add this line
  slots = {},
  selectedDate = "", 
  selectedTime = "",
  language = "en",
  timezone = "America/Toronto"
} = trace.payload || {};

let formTimeoutId = null;
let isFormSubmitted = false;
const TIMEOUT_DURATION = 300000; // 15 minutes in milliseconds

        const locale = language === "fr" ? "fr-CA" : "en-US";

        // Create a container and attach a shadow DOM for encapsulated styling.
        const container = document.createElement("div");
        container.style.width = window.innerWidth <= 768 ? "100%" : "800px";
        container.style.maxWidth = "800px";
        container.style.margin = "0 auto";
        const shadow = container.attachShadow({ mode: "open" });

        // Build CSS with direct values (no CSS variables)
        const style = document.createElement("style");
        style.textContent = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
.calendar-container {
  font-family: "Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 10px 25px rgba(156, 39, 176, 0.15);
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  color: #333;
  animation: fadeIn 0.3s ease-out forwards;
  border: 1px solid #eaeaea;
  transition: all 0.3s ease;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background-color: #faf7fc;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  position: relative;
}
.calendar-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #9C27B0, transparent);
  opacity: 0.5;
}
.calendar-title {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-size: 16px;
  background: transparent;
  -webkit-text-fill-color: initial;
}
.calendar-title-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.service-provider, .service-name {
  display: flex;
  align-items: center; 
  height: 24px;
  font-size: 16px;
  color: #9C27B0;
  margin: 3px 0;
  line-height: 24px;
}
.service-provider, .service-name  {
  font-weight: 650;
}

.provider-icon, .service-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
.provider-icon svg, .service-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
}
.calendar-nav {
  display: flex;
  align-items: center;
  gap: 15px;
}
.nav-btn {
  background: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: #9C27B0;
}
.nav-btn:hover {
  background-color: #F8EAFA;
  box-shadow: 0 3px 10px rgba(156, 39, 176, 0.15);
}
.current-date {
  font-weight: 600;
  font-size: 17px;
  background: #F8EAFA;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 500;
  color: #9C27B0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s;
}
.calendar-body {
  display: flex;
  height: 400px;
  background: linear-gradient(to bottom, #ffffff, #fefeff);
}
.days-container {
  width: 47%;
  padding: 15px 10px;
  position: relative;
  background-image: linear-gradient(
      rgba(156, 39, 176, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(156, 39, 176, 0.03) 1px, transparent 1px);
  background-size: 25px 25px;
  background-position: -1px -1px;
}
.calendar-container::before {
  content: "";
  position: absolute;
  top: -3px;
  left: 10%;
  right: 10%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #9C27B0, transparent);
  border-radius: 3px;
  opacity: 0.7;
}
.days-container::after {
  content: "";
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 80px;
  height: 80px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='80' height='80'%3E%3Cpath d='M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z' fill='rgba(156, 39, 176, 0.03)'/%3E%3C/svg%3E");
  opacity: 0.6;
}
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
  font-size: 13px;
  padding: 15px 0 10px;
  color: #666;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 5px;
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  padding: 5px;
}
.day {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  margin: 0 auto;
  border: 1px solid transparent;
  border-radius: 50%;
  z-index: 1;
}
.day:not(.inactive)::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  z-index: -1;
}
.day:hover:not(.inactive)::before {
  background-color: #F8EAFA;
}
.day:hover:not(.inactive) {
  color: #9C27B0;
  border: 2px solid #9C27B0;
  font-weight: 500;
}
.day.available {
  position: relative;
}
.day.available::after {
  content: "";
  position: absolute;
  bottom: 3px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #9C27B0;
  opacity: 0.7;
  animation: fadeIn 0.3s ease forwards;
}
.day.today {
  border: 1.5px solid #9C27B0;
  position: relative;
  box-shadow: 0 0 0 1px rgba(156, 39, 176, 0.1);
}
.day.today::after {
  content: "";
  position: absolute;
  bottom: 4px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #9C27B0;
}
.day.active {
  background-color: #9C27B0;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(156, 39, 176, 0.15);
}
.day.active::after {
  display: none;
}
.day.inactive {
  color: #ccc;
  cursor: default;
  opacity: 0.7;
}
.times-container {
  width: 53%;
  border-left: 1px solid #eaeaea;
  padding: 20px 10px;
  overflow-y: auto;
  background-color: #fefeff;
  position: relative;
}
.times-container::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(to bottom, #9C27B0, transparent);
  opacity: 0.1;
}
.time-header {
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
  color: #9C27B0;
  padding: 0 5px;
  line-height: 1.4;
  position: relative;
}
.time-header::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background-color: #9C27B0;
  opacity: 0.5;
  border-radius: 3px;
}
.time-slots {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 5px;
}
.time-slots-columns {
  display: flex;
  gap: 20px;
}
.time-slots-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.times-container::-webkit-scrollbar {
  width: 6px;
}
.times-container::-webkit-scrollbar-track {
  background: rgba(156, 39, 176, 0.05);
  border-radius: 10px;
}
.times-container::-webkit-scrollbar-thumb {
  background: rgba(156, 39, 176, 0.2);
  border-radius: 10px;
}
.times-container::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 39, 176, 0.3);
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.time-slot {
  padding: 14px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  border: 1px solid #e0e0e0;
  font-size: 14px;
  background-color: white;
  color: #444;
  position: relative;
  overflow: hidden;
  transform-origin: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.time-slot::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, #F8EAFA, transparent);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s;
}
.time-slot.available {
  background-color: white;
}
.time-slot.unavailable {
  background-color: #f4f4f5;
  color: #999;
  cursor: not-allowed;
  opacity: 0.7;
}
.time-slot.selected {
  background-color: #9C27B0;
  color: white;
  border-color: #9C27B0;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
  z-index: 5;
}
.time-slot.selected::after {
  content: "";
  position: absolute;
  right: 16px;
  font-size: 14px;
  opacity: 0.9;
}
.time-slot.available:hover:not(.selected) {
  background-color: #F8EAFA;
  color: #9C27B0;
  border: 2px solid #9C27B0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.07);
}
.time-slot.available:hover:not(.selected)::before {
  opacity: 0.6;
  animation: shimmer 1.5s infinite;
}
.calendar-container.confirmed .day,
.calendar-container.confirmed .time-slot {
  pointer-events: none;
  cursor: default;
}
.calendar-container.confirmed .nav-btn {
  pointer-events: none;
  opacity: 0.5;
  cursor: default;
}
.calendar-footer {
  padding: 15px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #eaeaea;
}
.action-btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 14px;
}
.confirm-btn {
  background: #F8EAFA;
  color: #9C27B0;
  font-weight: 600;
  border-radius: 10px;
  padding: 12px 24px;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}
.confirm-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: translateX(-100%);
}
.confirm-btn:hover:not(:disabled) {
  background: #9C27B0;
  color: white;
  box-shadow: 0 6px 18px rgba(156, 39, 176, 0.15);
}
.confirm-btn:hover:not(:disabled)::before {
  animation: shimmer 1.5s infinite;
}
.confirm-btn:active:not(:disabled) {
  box-shadow: 0 2px 10px rgba(156, 39, 176, 0.15);
}
.confirm-btn:disabled {
  cursor: not-allowed;
  box-shadow: none;
}
.cancel-btn {
  background-color: white;
  color: #333;
  border: 1px solid #eaeaea;
  margin-right: 10px;
}
.cancel-btn:hover {
  background-color: #f5f5f5;
}
.toggle-view {
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  display: flex;
  overflow: hidden;
}
.toggle-btn {
  padding: 8px 12px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}
.toggle-btn.active {
  background-color: #9C27B0;
  color: white;
}

@media (max-width: 768px) {
  .calendar-body {
    flex-direction: column;
    height: auto;
  }
  .days-container,
  .times-container {
    width: 100%;
  }
  .times-container {
    border-left: none;
    border-top: 1px solid #eaeaea;
    max-height: 250px;
  }
  .day {
    height: 40px;
    width: 40px;
    font-size: 13px;
  }
  .nav-btn {
    width: 36px;
    height: 36px;
  }
  .time-header {
    font-size: 15px;
  }
  .action-btn {
    padding: 10px 18px;
    font-size: 14px;
  }
  .service-provider,
  .service-name {
    font-size: 14px;
  }
  @keyframes mobileShimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  .confirm-btn:hover:not(:disabled)::before {
    animation: mobileShimmer 2s infinite;
  }
}

        `;
        shadow.appendChild(style);

        // ---------------------
        // API CALL FUNCTIONS
        // ---------------------
        async function fetchWorkingDays() {
          if (!apiKey || !scheduleId) return [1, 2, 3, 4, 5];
          try {
            const res = await fetch(`https://api.cal.com/v2/schedules/${scheduleId}`, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-06-11",
                "Content-Type": "application/json"
              }
            });
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();
            console.log("Schedule data:", data);
            const availability = data.data?.availability || [];
            const dayNameToNumber = {
              "Sunday": 0,
              "Monday": 1,
              "Tuesday": 2,
              "Wednesday": 3,
              "Thursday": 4,
              "Friday": 5,
              "Saturday": 6
            };
            const workingDaysSet = new Set();
            availability.forEach(item => {
              if (Array.isArray(item.days)) {
                item.days.forEach(dayName => {
                  const dayNum = dayNameToNumber[dayName];
                  if (dayNum !== undefined) {
                    workingDaysSet.add(dayNum);
                  }
                });
              }
            });
            return Array.from(workingDaysSet);
          } catch (err) {
            console.error("Error fetching schedule:", err);
            return [1, 2, 3, 4, 5];
          }
        }

        async function fetchAvailableSlots(selectedDateISO) {
          const start = new Date(selectedDateISO);
          start.setUTCHours(0, 0, 0, 0);
          const end = new Date(selectedDateISO);
          end.setUTCHours(23, 59, 59, 999);
          const url = `https://api.cal.com/v2/slots/available?startTime=${start.toISOString()}&endTime=${end.toISOString()}&eventTypeId=${eventTypeId}&eventTypeSlug=${eventTypeSlug}`;
          try {
            const res = await fetch(url, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json"
              }
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const responseBody = await res.json();
            if (!responseBody || typeof responseBody !== "object") {
              throw new Error("Invalid or missing response body from the API");
            }
            if (responseBody.status !== "success") {
              throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            const slotsObj = responseBody.data?.slots || {};
            const slotsForDate = slotsObj[selectedDateISO] || [];
            return slotsForDate.map(slot => slot.time);
          } catch (err) {
            console.error("Error fetching available slots:", err);
            return [];
          }
        }

        // ---------------------
        // IMPROVED BOOKING FUNCTION
        // ---------------------
        async function createBooking(startTimeISO) {
          try {
            const bookingDate = new Date(startTimeISO);
            const dateStr = formatDate(bookingDate);
            const currentAvailableSlots = await fetchAvailableSlots(dateStr);
            if (!currentAvailableSlots.includes(startTimeISO)) {
              throw new Error("This slot is no longer available. Please select another time.");
            }
            const url = `https://api.cal.com/v2/bookings`;
            const body = {
              start: startTimeISO,
              attendee: { name: fullName, email: email, timeZone: timezone },
              eventTypeId: Number(eventTypeId)
            };
            const res = await fetch(url, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            });
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status} ${JSON.stringify(await res.text())}`);
            }
            const responseBody = await res.json();
            if (responseBody.status && responseBody.status !== "success") {
              throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            return responseBody;
          } catch (err) {
            console.error("Booking error:", err);
            showErrorMessage(err.message || "Unable to complete booking. Please try again.");
            return null;
          }
        }

        // ---------------------
        // ERROR DISPLAY FUNCTION
        // ---------------------
        function showErrorMessage(message) {
          const errorOverlay = document.createElement("div");
          errorOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          `;
          const errorMessage = document.createElement("div");
          errorMessage.style.cssText = `
            background-color: #fff0f0;
            border: 1px solid #ffdddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 80%;
          `;
          errorMessage.innerHTML = `
            <div style="color: #d32f2f; font-size: 24px; margin-bottom: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="currentColor"/>
              </svg>
            </div>
            <p style="margin: 0; color: #333;">${message}</p>
            <button style="margin-top: 15px; background: #9C27B0; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">OK</button>
          `;
          errorOverlay.appendChild(errorMessage);
          calendarContainer.appendChild(errorOverlay);
          const closeButton = errorMessage.querySelector("button");
          closeButton.addEventListener("click", () => {
            calendarContainer.removeChild(errorOverlay);
            if (state.selectedDate) {
              const dateKey = formatDate(state.selectedDate);
              fetchAvailableSlots(dateKey).then(slots => {
                state.availableSlots[dateKey] = slots;
                renderCalendar();
              });
            }
          });
        }

        // ---------------------
        // EXTENSION INTERNAL STATE
        // ---------------------
        const state = {
          currentDate: new Date(),
          selectedDate: selectedDate ? new Date(selectedDate) : null,
          selectedTime: selectedTime || null,
          availableSlots: {},
          workingDays: await fetchWorkingDays(),
          isConfirmed: false,
          language: language || "en"
        };

        const translations = {
          en: {
            selectDateAndTime: "Select Date & Time",
            selectDate: "Select a date to view available times",
            pleaseSelectDate: "Please select a date first",
            availableTimesFor: "Available times for",
            noAvailableSlots: "No available time slots for this date",
            confirmBooking: "Confirm Booking",
            bookingConfirmed: "Booking Confirmed",
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
          },
          fr: {
            selectDateAndTime: "Sélectionner Date & Heure",
            selectDate: "Sélectionnez une date pour voir les horaires disponibles",
            pleaseSelectDate: "Veuillez d'abord sélectionner une date",
            availableTimesFor: "Horaires disponibles pour",
            noAvailableSlots: "Aucun horaire disponible pour cette date",
            confirmBooking: "Confirmer la Réservation",
            bookingConfirmed: "Réservation Confirmée",
            weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
          }
        }; 

        function getText(key) {
          const lang = translations[state.language] ? state.language : "en";
          return translations[lang][key];
        }

        function formatDate(date) {
          const d = new Date(date);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        }

        function isSameDay(date1, date2) {
          if (!date1 || !date2) return false;
          return formatDate(date1) === formatDate(date2);
        }

        function isToday(date) {
          const now = new Date();
          return isSameDay(date, now);
        }

        function getDefaultActiveDay() {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (state.workingDays.includes(today.getDay())) return today;
          const next = new Date(today);
          while (!state.workingDays.includes(next.getDay())) {
            next.setDate(next.getDate() + 1);
          }
          return next;
        }

        // Initialize default selected date and fetch its slots if not already set.
        if (!state.selectedDate) {
          const defaultDay = getDefaultActiveDay();
          state.selectedDate = defaultDay;
          const dayKey = formatDate(defaultDay);
          const defaultSlots = await fetchAvailableSlots(dayKey);
          state.availableSlots[dayKey] = defaultSlots;
        }

        // ---------------------
        // RENDER CALENDAR COMPONENTS
        // ---------------------
function renderHeader() {
  const header = document.createElement("div");
  header.className = "calendar-header";
  const dateFormatter = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  
  // Create calendar title with provider and service info
  const calendarTitle = document.createElement("div");
  calendarTitle.className = "calendar-title";
  
  // Calendar icon
  const calendarIcon = document.createElement("span");
  calendarIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px"><path fill="#9C27B0" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/></svg>
  `;
  
  // Provider and service information section
  const titleContent = document.createElement("div");
  titleContent.className = "calendar-title-content";
  
  const providerDiv = document.createElement("div");
  providerDiv.className = "service-provider";
  providerDiv.innerHTML = `
    <span class="provider-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18px" height="18px">
      <path fill="#9C27B0" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 256l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16L80 384c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
      </svg>
    </span>
    <span>${serviceProvider}</span>
  `;
  
  const serviceDiv = document.createElement("div");
  serviceDiv.className = "service-name";
serviceDiv.innerHTML = `
  <span class="service-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
      <path fill="#9C27B0" d="M186.1 52.1C169.3 39.1 148.7 32 127.5 32C74.7 32 32 74.7 32 127.5l0 6.2c0 15.8 3.7 31.3 10.7 45.5l23.5 47.1c4.5 8.9 7.6 18.4 9.4 28.2l36.7 205.8c2 11.2 11.6 19.4 22.9 19.8s21.4-7.4 24-18.4l28.9-121.3C192.2 323.7 207 312 224 312s31.8 11.7 35.8 28.3l28.9 121.3c2.6 11.1 12.7 18.8 24 18.4s20.9-8.6 22.9-19.8l36.7-205.8c1.8-9.8 4.9-19.3 9.4-28.2l23.5-47.1c7.1-14.1 10.7-29.7 10.7-45.5l0-2.1c0-55-44.6-99.6-99.6-99.6c-24.1 0-47.4 8.8-65.6 24.6l-3.2 2.8 19.5 15.2c7 5.4 8.2 15.5 2.8 22.5s-15.5 8.2-22.5 2.8l-24.4-19-37-28.8z"/>
    </svg>
  </span>
  <span>${serviceName}</span>
`;
  titleContent.appendChild(providerDiv);
  titleContent.appendChild(serviceDiv);
  
  calendarTitle.appendChild(titleContent);
  
  // Calendar navigation section (remains unchanged)
  const calendarNav = document.createElement("div");
  calendarNav.className = "calendar-nav";
  const currentDateEl = document.createElement("div");
  currentDateEl.className = "current-date";
  currentDateEl.textContent = dateFormatter.format(state.currentDate);
  currentDateEl.style.cssText = "background: #F8EAFA; padding: 6px 14px; border-radius: 20px; font-weight: 500; color: #9C27B0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.3s;";
  
  const prevBtn = document.createElement("button");
  prevBtn.className = "nav-btn prev-btn";
  prevBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  prevBtn.addEventListener("click", () => {
    if (!state.isConfirmed) {
      state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 1);
      renderCalendar();
    }
  });
  
  const nextBtn = document.createElement("button");
  nextBtn.className = "nav-btn next-btn";
  nextBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  nextBtn.addEventListener("click", () => {
    if (!state.isConfirmed) {
      state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 1);
      renderCalendar();
    }
  });
  
  calendarNav.appendChild(currentDateEl);
  calendarNav.appendChild(prevBtn);
  calendarNav.appendChild(nextBtn);
  
  header.appendChild(calendarTitle);
  header.appendChild(calendarNav);
  
  return header;
}
       
	   async function renderCalendarDays() {
          const daysContainer = document.createElement("div");
          daysContainer.className = "days-container";
          const weekdaysDiv = document.createElement("div");
          weekdaysDiv.className = "weekdays";
          const weekdays = getText("weekdays");
          weekdays.forEach(day => {
            const dayEl = document.createElement("div");
            dayEl.textContent = day;
            weekdaysDiv.appendChild(dayEl);
          });
          daysContainer.appendChild(weekdaysDiv);
          const daysDiv = document.createElement("div");
          daysDiv.className = "days";
          let daysToShow = [];
          const firstDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 1);
          const daysFromPrevMonth = firstDay.getDay();
          const lastDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 0);
          const totalDays = lastDay.getDate();
          for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
            const day = new Date(firstDay);
            day.setDate(day.getDate() - i - 1);
            daysToShow.push({ date: day, inactive: true });
          }
          for (let i = 1; i <= totalDays; i++) {
            const day = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), i);
            daysToShow.push({ date: day, inactive: false });
          }
          const remainingDays = 42 - daysToShow.length;
          for (let i = 1; i <= remainingDays; i++) {
            const day = new Date(lastDay);
            day.setDate(day.getDate() + i);
            daysToShow.push({ date: day, inactive: true });
          }
          const highlightDay = state.selectedDate || getDefaultActiveDay();
          daysToShow.forEach(({ date, inactive }) => {
            const dayEl = document.createElement("div");
            dayEl.className = "day";
            dayEl.textContent = date.getDate();
            if (inactive) {
              dayEl.classList.add("inactive");
            } else {
              const dayOfWeek = date.getDay();
              if (!state.workingDays.includes(dayOfWeek)) {
                dayEl.classList.add("inactive");
              } else {
                const todayMidnight = new Date();
                todayMidnight.setHours(0, 0, 0, 0);
                if (date < todayMidnight) {
                  dayEl.classList.add("inactive");
                } else {
                  if (formatDate(date) === formatDate(highlightDay)) {
                    dayEl.classList.add("today");
                  }
                  if (state.selectedDate && isSameDay(date, state.selectedDate)) {
                    dayEl.classList.add("active");
                  }
                  dayEl.classList.add("available");
                  dayEl.addEventListener("click", async () => {
                    state.selectedDate = new Date(date);
                    state.selectedTime = null;
                    const slots = await fetchAvailableSlots(formatDate(date));
                    state.availableSlots[formatDate(date)] = slots;
                    renderCalendar();
                  });
                }
              }
            }
            daysDiv.appendChild(dayEl);
          });
          daysContainer.appendChild(daysDiv);
          return daysContainer;
        }

        async function renderTimeSlots() {
          const timesContainer = document.createElement("div");
          timesContainer.className = "times-container";
          const timeHeader = document.createElement("div");
          timeHeader.className = "time-header";
          if (state.selectedDate) {
            const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric" });
            timeHeader.textContent = `${getText("availableTimesFor")} ${dateFormatter.format(state.selectedDate)}`;
          } else {
            timeHeader.innerHTML = `<span style="display: inline-block; animation: pulse 2s infinite ease-in-out;">${getText("selectDate")}</span>`;
          }
          timesContainer.appendChild(timeHeader);
          const timeSlotsDiv = document.createElement("div");
          timeSlotsDiv.className = "time-slots";
          if (state.selectedDate) {
            const dateKey = formatDate(state.selectedDate);
            const timeSlots = state.availableSlots[dateKey] || [];
            if (timeSlots.length === 0) {
              const noSlots = document.createElement("div");
              noSlots.textContent = getText("noAvailableSlots");
              noSlots.style.textAlign = "center";
              noSlots.style.padding = "20px 0";
              noSlots.style.color = "#666";
              timeSlotsDiv.appendChild(noSlots);
            } else {
              const columnsContainer = document.createElement("div");
              columnsContainer.className = "time-slots-columns";
              const amColumn = document.createElement("div");
              amColumn.className = "time-slots-column";
              const pmColumn = document.createElement("div");
              pmColumn.className = "time-slots-column";
              const amHeader = document.createElement("div");
              amHeader.textContent = "AM";
              amHeader.style.fontWeight = "bold";
              amHeader.style.marginBottom = "5px";
              amColumn.appendChild(amHeader);
              const pmHeader = document.createElement("div");
              pmHeader.textContent = "PM";
              pmHeader.style.fontWeight = "bold";
              pmHeader.style.marginBottom = "5px";
              pmColumn.appendChild(pmHeader);
              timeSlots.forEach((timeISO, index) => {
                const dateTime = new Date(timeISO);
                const hours = dateTime.getHours();
                const timeSlot = document.createElement("div");
                timeSlot.className = "time-slot available";
                timeSlot.style.animation = `slideIn ${0.2 + index * 0.1}s ease-out forwards`;
                if (state.selectedTime === timeISO) {
                  timeSlot.classList.add("selected");
                }
                const timeFormatter = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", hour12: true });
                timeSlot.textContent = timeFormatter.format(dateTime);
                timeSlot.addEventListener("click", () => {
                  if (!state.isConfirmed) {
                    state.selectedTime = timeISO;
                    renderCalendar();
                  }
                });
                if (hours < 12) {
                  amColumn.appendChild(timeSlot);
                } else {
                  pmColumn.appendChild(timeSlot);
                }
              });
              columnsContainer.appendChild(amColumn);
              columnsContainer.appendChild(pmColumn);
              timeSlotsDiv.appendChild(columnsContainer);
            }
          } else {
            const noDate = document.createElement("div");
            noDate.textContent = getText("pleaseSelectDate");
            noDate.style.textAlign = "center";
            noDate.style.padding = "20px 0";
            noDate.style.color = "#666";
            timeSlotsDiv.appendChild(noDate);
          }
          timesContainer.appendChild(timeSlotsDiv);
          return timesContainer;
        }

   function renderFooter() {
  const footer = document.createElement("div");
  footer.className = "calendar-footer";
  const confirmBtn = document.createElement("button");
  confirmBtn.className = "action-btn confirm-btn";
  
  if (state.isConfirmed) {
    const isEnglish = locale === "en-US";
    confirmBtn.textContent = isEnglish ? "Booked ✓" : "Réservée ✓";
    confirmBtn.style.backgroundImage = "none";
    confirmBtn.style.backgroundColor = "#4CAF50";
    confirmBtn.style.color = "white";
    confirmBtn.disabled = true;
  } else {
    confirmBtn.textContent = getText("confirmBooking");
    if (!state.selectedDate || !state.selectedTime) { 
      confirmBtn.disabled = true; 
    }
    
    confirmBtn.addEventListener("click", async () => {
      if (state.selectedDate && state.selectedTime) {
        // Show loading state
        confirmBtn.disabled = true;
        confirmBtn.textContent = getText('confirmBooking') + '...';
        
        try {
          // 1. First completes the booking with Cal.com
          const bookingResponse = await createBooking(state.selectedTime);
          
          if (bookingResponse) {
            // 2. Then updates the UI to show confirmation
            state.isConfirmed = true;
			 isFormSubmitted = true;
  if (formTimeoutId) {
    clearInterval(formTimeoutId);
  }
            renderCalendar();
            
            // 3. Finally shows the success animation
            const successOverlay = document.createElement('div');
            successOverlay.style.cssText = `
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(156, 39, 176, 0.05);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
              opacity: 0;
              transition: opacity 0.5s;
              pointer-events: none;
            `;
            
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
              background-color: white;
              border-radius: 15px;
              padding: 20px 30px;
              box-shadow: 0 10px 30px rgba(156, 39, 176, 0.15);
              text-align: center;
              transform: translateY(20px);
              transition: transform 0.5s, opacity 0.5s;
              opacity: 0;
            `;
            
            const checkmark = document.createElement('div');
            checkmark.innerHTML = `
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#F8EAFA"/>
                <path d="M20 30L27 37L40 23" stroke="#9C27B0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            `;
            
            successMessage.appendChild(checkmark);
            const successText = document.createElement('p');
            successText.textContent = getText('bookingConfirmed') + '!';
            successText.style.cssText = `
              font-size: 18px;
              font-weight: 600;
              margin-top: 15px;
              color: #9C27B0;
            `;
            successMessage.appendChild(successText);
            successOverlay.appendChild(successMessage);
            calendarContainer.appendChild(successOverlay);
            
            // Animation sequence
            setTimeout(() => {
              successOverlay.style.opacity = '1';
              successMessage.style.opacity = '1';
              successMessage.style.transform = 'translateY(0)';
              
              setTimeout(() => {
                // Start hiding animation
                successOverlay.style.opacity = '0';
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                  // Remove overlay after animation completes
                  calendarContainer.removeChild(successOverlay);
                  
                  // 4. FINALLY - Send data to Voiceflow (LAST STEP)
                  const dateStr = formatDate(state.selectedDate);
                  const timeFormatter = new Intl.DateTimeFormat(locale, { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                  });
                                    const formattedDate = new Intl.DateTimeFormat(locale, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(state.selectedDate);
  const formattedTime = new Intl.DateTimeFormat(locale, { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  }).format(new Date(state.selectedTime));
  const formattedDateTime = `${formattedDate} ${language === "fr" ? "à" : "at"} ${formattedTime}`;

                  

  
  window.voiceflow.chat.interact({
    type: "complete",
    payload: { 
      date: dateStr,
      time: state.selectedTime,
      formattedDate,
      formattedTime,
      formattedDateTime
    }
  });

                  
                }, 500); // End of hide animation
              }, 2500); // Show duration before hiding
            }, 100); // Start of show animation
          }
        } catch (err) {
          console.error("Booking error:", err);
          confirmBtn.disabled = false;
          confirmBtn.textContent = getText("confirmBooking");
          showErrorMessage(err.message || "Unable to complete booking. Please try again.");
        }
      }
    });
  }
  
  footer.appendChild(confirmBtn);
  return footer;
}
// Timer functions for timeout handling
function startFormTimer() {
  let timeLeft = TIMEOUT_DURATION;
  
  formTimeoutId = setInterval(() => {
    timeLeft -= 1000;
    
    if (timeLeft <= 0) {
      clearInterval(formTimeoutId);
      if (!isFormSubmitted) {
        handleFormTimeout();
      }
    }
  }, 1000);
}

function handleFormTimeout() {
  state.isLoading = false;
  state.isConfirmed = true; // To prevent further interaction
  
  // Update UI to show timeout
  const confirmBtn = shadow.querySelector(".confirm-btn");
  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.textContent = language === 'fr' ? "Temps expiré" : "Time Expired";
    confirmBtn.style.backgroundColor = "#f44336";
    confirmBtn.style.color = "white";
  }
  
  // Notify Voiceflow
  window.voiceflow.chat.interact({
    type: "timeEnd",
    payload: {
      message: "Time expired"
    }
  });
  
  // Re-render the calendar to disable all elements
  renderCalendar();
}

        async function renderCalendar() {
          calendarContainer.innerHTML = "";
          if (state.isConfirmed) {
            calendarContainer.classList.add("confirmed");
          } else {
            calendarContainer.classList.remove("confirmed");
          }
          calendarContainer.appendChild(renderHeader());
          const calendarBody = document.createElement("div");
          calendarBody.className = "calendar-body";
          calendarBody.appendChild(await renderCalendarDays());
          calendarBody.appendChild(await renderTimeSlots());
          calendarContainer.appendChild(calendarBody);
          calendarContainer.appendChild(renderFooter());
          shadow.innerHTML = "";
          shadow.appendChild(style);
          shadow.appendChild(calendarContainer);
        }

        const calendarContainer = document.createElement("div");
        calendarContainer.className = "calendar-container";
        renderCalendar();
        element.appendChild(container);
        window.addEventListener("resize", () => {
          container.style.width = window.innerWidth <= 768 ? "100%" : "800px";
        });
		startFormTimer();
      }
    };

const serviceTranslations = {
  "Dental cleanings and exams": "Nettoyages et examens dentaires",
  "Fluoride treatments": "Traitements au fluorure",
  "Sealants": "Scellants",
  "Composite fillings": "Obturations composites",
  "Tooth colored fillings": "Obturations de la couleur des dents",
  "Tooth extractions": "Extractions dentaires",
  "Wisdom teeth removal": "Extraction des dents de sagesse",
  "Root canal therapy": "Traitement de canal",
  "Dental crowns and bridges": "Couronnes et ponts dentaires",
  "Emergency dental care": "Soins dentaires d'urgence",
  "Traditional braces": "Appareils orthodontiques traditionnels",
  "Invisalign clear aligners": "Aligneurs transparents Invisalign",
  "Retainers and follow-up care": "Contentions et suivi",
  "Dental implants": "Implants dentaires",
  "Dentures": "Prothèses dentaires",
  "Full-mouth reconstruction": "Reconstruction buccale complète",
  "Dental bonding": "Collage dentaire",
  "Porcelain veneers": "Facettes en porcelaine",
  "Smile makeovers": "Transformations du sourire",
  "Teeth whitening": "Blanchiment des dents"
};

// Helper function to get localized service name
function getLocalizedServiceName(serviceName, language) {
  const isEnglish = language === "en";
  if (isEnglish) {
    return serviceName;
  } else {
    return serviceTranslations[serviceName] || serviceName;
  }
}

// Helper function to get original service name from localized name
function getOriginalServiceName(localizedName, language) {
  const isEnglish = language === "en";
  if (isEnglish) {
    return localizedName;
  } else {
    for (const [englishName, frenchName] of Object.entries(serviceTranslations)) {
      if (frenchName === localizedName) {
        return englishName;
      }
    }
    return localizedName;
  }
}

// Fixed version with both dropdown toggle fix and header update fix
const BookingCalendarSDExtension = {
  name: 'Booking',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_booking_calendar_sd' || trace.payload?.name === 'ext_booking_calendar_sd',
  render: async ({ trace, element }) => {
    // Extract required payload values with fallbacks
    const {
      fullName = "John Doe",
      email = "john@example.com",
      apiKey = "",
      scheduleId = "",
      eventTypeId = "1", 
      eventTypeSlug = "default-event",
      serviceProvider = "Dr. Sophie Martin",
      serviceName = "Nettoyage et Examen Dentaire",
      slots = {},
      selectedDate = "", 
      selectedTime = "",
      language = "en",
      timezone = "America/Toronto",
      dentistsInfo = ""
    } = trace.payload || {};

    console.log("Rendering booking calendar with language:", language);
    console.log("Dentists info type:", typeof dentistsInfo);
    console.log("Dentists info:", dentistsInfo);

    const locale = language === "fr" ? "fr-CA" : "en-US";
    const isEnglish = language === "en";

    // Create a container
    const container = document.createElement("div");
    container.style.width = window.innerWidth <= 768 ? "100%" : "800px";
    container.style.maxWidth = "800px";
    container.style.margin = "0 auto";

    // SVG constants
    const SVG_CHECK = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="14" height="14">
      <path fill="white" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
    </svg>
    `;
    
    const SVG_CHEVRON = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14">
      <path fill="#9c27b0" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
    </svg>
    `;
    
    // Build CSS 
    const style = document.createElement("style");
    style.textContent = `
      .booking-container {
        font-family: "Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        box-shadow: 0 10px 25px rgba(156, 39, 176, 0.15);
        border-radius: 16px;
        overflow: hidden;
        background: #ffffff;
        color: #333;
        border: 1px solid #eaeaea;
        transition: all 0.3s ease;
        position: relative;
      }
      
      .select-options.show {
        display: block !important;
        z-index: 1000;
      }
      
      /* Selector styles */
      .selectors-container {
        display: flex;
        flex-direction: column;
        padding: 15px 20px;
        background-color: #F8EAFA;
        border-bottom: 1px solid #eaeaea;
        gap: 15px;
      }
      
      .selectors-wrapper {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      @media (min-width: 768px) {
        .selectors-wrapper {
          flex-direction: row;
        }
      }
      
      .select-container {
        flex: 1;
        position: relative;
      }
      
      .select-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 14px;
        color: #9C27B0;
      }
      
      .select-dropdown {
        border: 1px solid #ddd;
        border-radius: 6px;
        background: white;
        position: relative;
        cursor: pointer;
      }
      
      .select-display {
        padding: 12px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 50px;
      }
      
      .dropdown-icon {
        width: 24px;
        height: 24px;
        background-color: #F8EAFA;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s;
      }
      
      .dropdown-icon.rotate {
        transform: rotate(180deg);
      }
      
      .select-options {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 10;
        width: 100%;
        max-height: 250px;
        overflow-y: auto;
        background: white;
        border: 1px solid #ddd;
        border-top: none;
        border-radius: 0 0 6px 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        display: none;
      }
      
      .select-options.show {
  display: block !important;
  z-index: 1000;
}
      
      .option-item {
        padding: 10px 15px;
        display: flex;
        align-items: center;
        transition: background 0.2s;
      }
      
      .option-item:hover {
        background-color: #F8EAFA;
        color: #9C27B0;
      }
      
      .option-item.selected {
        background-color: #F8EAFA;
        color: #9C27B0;
        font-weight: 600;
      }
      
      .option-checkbox {
        width: 20px;
        height: 20px;
        border: 2px solid #ccc;
        border-radius: 50%;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        transition: all 0.2s;
      }
      
      .option-item.selected .option-checkbox {
        border-color: #9C27B0;
        background-color: #9C27B0;
      }
      
      /* Calendar header */
      .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 24px;
        background-color: #faf7fc;
        border-bottom: 1px solid #eaeaea;
      }
      
      .calendar-info {
        display: flex;
        flex-direction: column;
      }
      
      .info-line {
        display: flex;
        align-items: center;
        color: #9C27B0;
        font-weight: 600;
        margin: 3px 0;
      }
      
      .info-icon {
        margin-right: 8px;
      }
      
      .calendar-nav {
        display: flex;
        align-items: center;
        gap: 15px;
      }
      
      .current-date {
        background: #F8EAFA;
        padding: 6px 14px;
        border-radius: 20px;
        font-weight: 500;
        color: #9C27B0;
      }
      
      .nav-btn {
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        color: #9C27B0;
      }
      
      /* Calendar body */
      .calendar-body {
        display: flex;
        height: 400px;
      }
      
      .days-container {
        width: 47%;
        background: linear-gradient(to bottom, #ffffff, #fefeff);
      }
      
      .weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        font-weight: 600;
        font-size: 13px;
        padding: 15px 0 10px;
        color: #666;
      }
      
      .days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
        padding: 5px;
      }
      
      .day {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 45px;
        width: 45px;
        cursor: pointer;
        font-size: 14px;
        margin: 0 auto;
        border: 1px solid transparent;
        border-radius: 50%;
      }
      
      .day.inactive {
        color: #ccc;
        cursor: default;
        opacity: 0.7;
      }
      
      .day.available:hover:not(.inactive):not(.active) {
        color: #9C27B0;
        border: 2px solid #9C27B0;
        font-weight: 500;
      }
      
      .day.active {
        background-color: #9C27B0;
        color: white;
        border-radius: 4px;
        font-weight: bold;
      }
      
      .times-container {
        width: 53%;
        border-left: 1px solid #eaeaea;
        overflow-y: auto;
        background-color: #fefeff;
      }
      
      .time-header {
        font-weight: 600;
        margin: 20px 0;
        font-size: 16px;
        text-align: center;
        color: #9C27B0;
      }
      
      .time-slots {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 15px;
      }
      
      .time-columns {
        display: flex;
        gap: 20px;
      }
      
      .time-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: center;
      }
      
      .column-header {
        font-weight: bold;
        margin-bottom: 10px;
        width: 100%;
        text-align: center;
      }
      
      .time-slot {
        padding: 14px;
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #e0e0e0;
        font-size: 14px;
        background-color: white;
        color: #444;
        width: 100%;
      }
      
      .time-slot:hover {
        background-color: #F8EAFA;
        color: #9C27B0;
        border: 2px solid #9C27B0;
      }
      
      .time-slot.selected {
        background-color: #9C27B0;
        color: white;
        border-color: #9C27B0;
        font-weight: bold;
      }
      
      .message-block {
        text-align: center;
        padding: 40px 20px;
        color: #666;
      }
      
      /* Footer */
      .calendar-footer {
        padding: 15px;
        display: flex;
        justify-content: center;
        border-top: 1px solid #eaeaea;
      }
      
      .confirm-btn {
        background: #F8EAFA;
        color: #9C27B0;
        font-weight: 600;
        border-radius: 10px;
        padding: 12px 24px;
        border: none;
        cursor: pointer;
      }
      
      .confirm-btn:hover:not(:disabled) {
        background: #9C27B0;
        color: white;
      }
      
      .confirm-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      /* Mobile adjustments */
      @media (max-width: 768px) {
        .calendar-body {
          flex-direction: column;
          height: auto;
        }
        
        .days-container,
        .times-container {
          width: 100%;
        }
        
        .times-container {
          border-left: none;
          border-top: 1px solid #eaeaea;
          max-height: 250px;
        }
      }
    `;
    
    // Create main container
    const bookingContainer = document.createElement("div");
    bookingContainer.className = "booking-container";
    
    // Internal state management
    const state = {
      currentDate: new Date(),
      selectedDate: selectedDate ? new Date(selectedDate) : null,
      selectedTime: selectedTime || null,
      availableSlots: {},
      workingDays: [1, 2, 3, 4, 5], // Default to weekdays
      isConfirmed: false,
      language: language || "en",
      dentistsInfo: dentistsInfo || {},
      selectedDentist: "",
      selectedService: "",
      apiKey: "",
      scheduleId: "",
      eventTypeId: "",
      eventTypeSlug: ""
    };
    
    // Helper functions
    function getText(key) {
      const translations = {
        en: {
          selectDateAndTime: "Select Date & Time",
          selectDate: "Select a date to view available times",
          pleaseSelectDate: "Please select a date first",
          availableTimesFor: "Available times for",
          noAvailableSlots: "No available time slots for this date",
          confirmBooking: "Confirm Booking",
          bookingConfirmed: "Booking Confirmed",
          weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          selectDentist: "Select a dentist",
          selectService: "Select a service",
          selectServicePlaceholder: "-- Select a service --",
          selectDentistPlaceholder: "-- Select a dentist --",
          pleaseSelectService: "Please select a service first",
          pleaseSelectServiceAndDentist: "Please select a service and dentist first"
        },
        fr: {
          selectDateAndTime: "Sélectionner Date & Heure",
          selectDate: "Sélectionnez une date pour voir les horaires disponibles",
          pleaseSelectDate: "Veuillez d'abord sélectionner une date",
          availableTimesFor: "Horaires disponibles pour",
          noAvailableSlots: "Aucun horaire disponible pour cette date",
          confirmBooking: "Confirmer la Réservation",
          bookingConfirmed: "Réservation Confirmée",
          weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
          selectDentist: "Sélectionner un dentiste",
          selectService: "Sélectionner un service",
          selectServicePlaceholder: "-- Sélectionner un service --",
          selectDentistPlaceholder: "-- Sélectionner un dentiste --",
          pleaseSelectService: "Veuillez d'abord sélectionner un service",
          pleaseSelectServiceAndDentist: "Veuillez sélectionner un service et un dentiste"
        }
      };
      
      const lang = translations[state.language] ? state.language : "en";
      return translations[lang][key];
    }
    
    function getLocalizedServiceName(serviceName, language) {
      const serviceTranslations = {
        "Dental cleanings and exams": "Nettoyages et examens dentaires",
        "Fluoride treatments": "Traitements au fluorure",
        "Sealants": "Scellants",
        "Composite fillings": "Obturations composites",
        "Tooth colored fillings": "Obturations de la couleur des dents",
        "Tooth extractions": "Extractions dentaires",
        "Wisdom teeth removal": "Extraction des dents de sagesse",
        "Root canal therapy": "Traitement de canal",
        "Dental crowns and bridges": "Couronnes et ponts dentaires",
        "Emergency dental care": "Soins dentaires d'urgence",
        "Traditional braces": "Appareils orthodontiques traditionnels",
        "Invisalign clear aligners": "Aligneurs transparents Invisalign",
        "Retainers and follow-up care": "Contentions et suivi",
        "Dental implants": "Implants dentaires",
        "Dentures": "Prothèses dentaires",
        "Full-mouth reconstruction": "Reconstruction buccale complète",
        "Dental bonding": "Collage dentaire",
        "Porcelain veneers": "Facettes en porcelaine",
        "Smile makeovers": "Transformations du sourire",
        "Teeth whitening": "Blanchiment des dents"
      };
      
      const isEnglish = language === "en";
      if (isEnglish) {
        return serviceName;
      } else {
        return serviceTranslations[serviceName] || serviceName;
      }
    }
    
    function formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    
    function isSameDay(date1, date2) {
      if (!date1 || !date2) return false;
      return formatDate(date1) === formatDate(date2);
    }

    // Function to update calendar header
    function updateCalendarHeader() {
      const serviceInfoElement = bookingContainer.querySelector(".calendar-info .info-line:first-child span:last-child");
      const dentistInfoElement = bookingContainer.querySelector(".calendar-info .info-line:last-child span:last-child");
      
      if (serviceInfoElement) {
        serviceInfoElement.textContent = state.selectedService ? 
          getLocalizedServiceName(state.selectedService, state.language) : "---";
      }
      
      if (dentistInfoElement) {
        dentistInfoElement.textContent = state.selectedDentist || "---";
      }
    }
    
    // Function to get all available services
    function getAllAvailableServices() {
      const serviceSet = new Set();
      
      // Verify dentistsInfo structure and log details
      console.log("Getting services from dentistsInfo:", state.dentistsInfo);
      try {
        Object.entries(state.dentistsInfo).forEach(([dentistName, dentistData]) => {
          console.log(`Processing dentist: ${dentistName}`, dentistData);
          if (dentistData && dentistData.services) {
            Object.keys(dentistData.services).forEach(service => {
              serviceSet.add(service);
            });
          } else {
            console.warn(`No services found for dentist: ${dentistName}`);
          }
        });
      } catch (error) {
        console.error("Error processing dentists data:", error);
      }
      
      // Create a fallback if no services found
      if (serviceSet.size === 0) {
        console.warn("No services found, using fallback services");
        return ["Dental cleanings and exams", "Root canal therapy", "Dental implants"];
      }
      
      return Array.from(serviceSet).sort();
    }
    
    // Function to get dentists that provide a specific service
    function getDentistsForService(serviceName) {
      try {
        return Object.keys(state.dentistsInfo).filter(dentistName => {
          const dentist = state.dentistsInfo[dentistName];
          return dentist && dentist.services && dentist.services[serviceName];
        });
      } catch (error) {
        console.error("Error getting dentists for service:", error);
        return Object.keys(state.dentistsInfo).slice(0, 2); // Return first 2 dentists as fallback
      }
    }
    
    // Function to update dentist information
    async function updateDentistInfo(dentistName, serviceName) {
      try {
        if (!dentistName || !state.dentistsInfo[dentistName]) return;
        
        const dentistData = state.dentistsInfo[dentistName];
        state.selectedDentist = dentistName;
        state.apiKey = dentistData.apiKey || "demo-api-key";
        state.scheduleId = dentistData.scheduleId || "demo-schedule-id";
        
        if (serviceName && dentistData.services && dentistData.services[serviceName]) {
          const serviceDetails = dentistData.services[serviceName];
          state.eventTypeId = serviceDetails.eventId || "1";
          state.eventTypeSlug = serviceDetails.eventSlug || "default";
          state.selectedService = serviceName;
        } else {
          // Default to first service
          const firstService = dentistData.services ? Object.keys(dentistData.services)[0] : null;
          if (firstService) {
            state.selectedService = firstService;
            state.eventTypeId = dentistData.services[firstService].eventId || "1";
            state.eventTypeSlug = dentistData.services[firstService].eventSlug || "default";
          }
        }
        
        // Reset selections
        state.selectedTime = null;
        state.availableSlots = {};
        
        // Update working days
        state.workingDays = await fetchWorkingDays();
        
        // Set a new default selected date
        const defaultDay = getDefaultActiveDay();
        state.selectedDate = defaultDay;
        
        // Fetch available slots
        const dayKey = formatDate(defaultDay);
        try {
          const defaultSlots = await fetchAvailableSlots(dayKey);
          state.availableSlots[dayKey] = defaultSlots;
        } catch (error) {
          console.error("Error fetching slots:", error);
          // Generate demo time slots as fallback
          state.availableSlots[dayKey] = generateDemoTimeSlots(defaultDay);
        }
      } catch (error) {
        console.error("Error in updateDentistInfo:", error);
      }
    }
    
    // Function to get default active day
    function getDefaultActiveDay() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (state.workingDays.includes(today.getDay())) return today;
      
      // Find next working day
      const next = new Date(today);
      for (let i = 1; i <= 7; i++) {
        next.setDate(next.getDate() + 1);
        if (state.workingDays.includes(next.getDay())) {
          return next;
        }
      }
      
      return today; // Fallback to today
    }
    
    // API function to fetch working days
    async function fetchWorkingDays() {
      if (!state.apiKey || !state.scheduleId) return [1, 2, 3, 4, 5];
      
      try {
        // For demo/testing, just return weekdays
        if (state.apiKey === "demo-api-key") {
          return [1, 2, 3, 4, 5];
        }
        
        const res = await fetch(`https://api.cal.com/v2/schedules/${state.scheduleId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${state.apiKey}`,
            "cal-api-version": "2024-06-11",
            "Content-Type": "application/json"
          }
        });
        
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        
        const data = await res.json();
        const availability = data.data?.availability || [];
        const dayNameToNumber = {
          "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, 
          "Thursday": 4, "Friday": 5, "Saturday": 6
        };
        
        const workingDaysSet = new Set();
        availability.forEach(item => {
          if (Array.isArray(item.days)) {
            item.days.forEach(dayName => {
              const dayNum = dayNameToNumber[dayName];
              if (dayNum !== undefined) {
                workingDaysSet.add(dayNum);
              }
            });
          }
        });
        
        return Array.from(workingDaysSet);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        return [1, 2, 3, 4, 5]; // Default to weekdays
      }
    }
    
    // API function to fetch available slots
    async function fetchAvailableSlots(selectedDateISO) {
      try {
        // For demo/testing, generate demo slots
        if (state.apiKey === "demo-api-key") {
          const demoDate = new Date(selectedDateISO);
          return generateDemoTimeSlots(demoDate);
        }
        
        const start = new Date(selectedDateISO);
        start.setUTCHours(0, 0, 0, 0);
        const end = new Date(selectedDateISO);
        end.setUTCHours(23, 59, 59, 999);
        
        const url = `https://api.cal.com/v2/slots/available?startTime=${start.toISOString()}&endTime=${end.toISOString()}&eventTypeId=${state.eventTypeId}&eventTypeSlug=${state.eventTypeSlug}`;
        
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${state.apiKey}`,
            "cal-api-version": "2024-08-13",
            "Content-Type": "application/json"
          }
        });
        
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const responseBody = await res.json();
        if (!responseBody || typeof responseBody !== "object") {
          throw new Error("Invalid response");
        }
        
        if (responseBody.status !== "success") {
          throw new Error("API error");
        }
        
        const slotsObj = responseBody.data?.slots || {};
        const slotsForDate = slotsObj[selectedDateISO] || [];
        return slotsForDate.map(slot => slot.time);
      } catch (err) {
        console.error("Error fetching slots:", err);
        const demoDate = new Date(selectedDateISO);
        return generateDemoTimeSlots(demoDate);
      }
    }
    
    // Generate demo time slots
    function generateDemoTimeSlots(date) {
      const slots = [];
      const baseDate = new Date(date);
      
      // Generate morning slots (9am to 12pm)
      for (let hour = 9; hour < 12; hour++) {
        for (let minute of [0, 30]) {
          const slotTime = new Date(baseDate);
          slotTime.setHours(hour, minute, 0, 0);
          slots.push(slotTime.toISOString());
        }
      }
      
      // Generate afternoon slots (2pm to 5pm)
      for (let hour = 14; hour < 17; hour++) {
        for (let minute of [0, 30]) {
          const slotTime = new Date(baseDate);
          slotTime.setHours(hour, minute, 0, 0);
          slots.push(slotTime.toISOString());
        }
      }
      
      return slots;
    }
    
    // Function to create booking
    async function createBooking(startTimeISO) {
      try {
        // Demo mode - just return success
        if (state.apiKey === "demo-api-key") {
          return { success: true, id: "demo-booking-123" };
        }
        
        const bookingDate = new Date(startTimeISO);
        const dateStr = formatDate(bookingDate);
        
        const currentAvailableSlots = await fetchAvailableSlots(dateStr);
        if (!currentAvailableSlots.includes(startTimeISO)) {
          throw new Error("This slot is no longer available");
        }
        
        const url = `https://api.cal.com/v2/bookings`;
        const body = {
          start: startTimeISO,
          attendee: { name: fullName, email: email, timeZone: timezone },
          eventTypeId: Number(state.eventTypeId)
        };
        
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${state.apiKey}`,
            "cal-api-version": "2024-08-13",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
        
        if (!res.ok) {
          throw new Error(`Booking failed`);
        }
        
        const responseBody = await res.json();
        if (responseBody.status && responseBody.status !== "success") {
          throw new Error(`Booking error`);
        }
        
        return responseBody;
      } catch (err) {
        console.error("Booking error:", err);
        showErrorMessage(err.message || "Unable to complete booking");
        return null;
      }
    }
    
    // Function to show error message
    function showErrorMessage(message) {
      const errorOverlay = document.createElement("div");
      errorOverlay.style.position = "absolute";
      errorOverlay.style.top = "0";
      errorOverlay.style.left = "0";
      errorOverlay.style.width = "100%";
      errorOverlay.style.height = "100%";
      errorOverlay.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
      errorOverlay.style.display = "flex";
      errorOverlay.style.justifyContent = "center";
      errorOverlay.style.alignItems = "center";
      errorOverlay.style.zIndex = "1000";
      
      const errorBox = document.createElement("div");
      errorBox.style.backgroundColor = "#fff0f0";
      errorBox.style.border = "1px solid #ffdddd";
      errorBox.style.borderRadius = "8px";
      errorBox.style.padding = "20px";
      errorBox.style.maxWidth = "80%";
      errorBox.style.textAlign = "center";
      
      errorBox.innerHTML = `
        <div style="color: #d32f2f; font-size: 24px; margin-bottom: 10px;">⚠️</div>
        <p style="margin: 0 0 15px 0; color: #333;">${message}</p>
        <button style="background: #9C27B0; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">OK</button>
      `;
      
      errorOverlay.appendChild(errorBox);
      bookingContainer.appendChild(errorOverlay);
      
      const closeButton = errorBox.querySelector("button");
      closeButton.addEventListener("click", () => {
        bookingContainer.removeChild(errorOverlay);
      });
    }
    
    // Create SELECTORS SECTION
    function createSelectors() {
      // Create container
      const selectorsContainer = document.createElement("div");
      selectorsContainer.className = "selectors-container";
      
      // Create wrapper
      const selectorsWrapper = document.createElement("div");
      selectorsWrapper.className = "selectors-wrapper";
      
      // SERVICE SELECTOR
      const serviceContainer = document.createElement("div");
      serviceContainer.className = "select-container";
      
      const serviceLabel = document.createElement("label");
      serviceLabel.className = "select-label";
      serviceLabel.textContent = getText("selectService");
      
      const serviceDropdown = document.createElement("div");
      serviceDropdown.className = "select-dropdown";
      
      const serviceDisplay = document.createElement("div");
      serviceDisplay.className = "select-display";
      serviceDisplay.innerHTML = `
        <span>${state.selectedService ? getLocalizedServiceName(state.selectedService, state.language) : getText("selectServicePlaceholder")}</span>
        <div class="dropdown-icon">${SVG_CHEVRON}</div>
      `;
      
      const serviceOptions = document.createElement("div");
      serviceOptions.className = "select-options";
      
      // Get all services
      const allServices = getAllAvailableServices();
      console.log("All services:", allServices);
      
      // Populate service options
      allServices.forEach(service => {
        const option = document.createElement("div");
        option.className = `option-item ${state.selectedService === service ? 'selected' : ''}`;
        option.setAttribute("data-value", service);
        
        const checkBox = document.createElement("div");
        checkBox.className = "option-checkbox";
        checkBox.innerHTML = SVG_CHECK;
        
        const optionText = document.createElement("span");
        optionText.textContent = getLocalizedServiceName(service, state.language);
        
        option.appendChild(checkBox);
        option.appendChild(optionText);
        
        option.addEventListener("click", async function() {
          // Update state
          state.selectedService = service;
          
          // Update display
          serviceDisplay.querySelector("span").textContent = getLocalizedServiceName(service, state.language);
          
          // Update selection classes
          serviceOptions.querySelectorAll(".option-item").forEach(el => {
            el.classList.remove("selected");
          });
          this.classList.add("selected");
          
          // Hide dropdown
          serviceOptions.classList.remove("show");
          serviceDisplay.querySelector(".dropdown-icon").classList.remove("rotate");
          
          // Get dentists for this service
          const dentists = getDentistsForService(service);
          console.log("Dentists for service:", dentists);
          
          // Show dentist selector & update options
          dentistContainer.style.display = "block";
          populateDentistOptions(dentists);

          // Update the service name in the header immediately
          updateCalendarHeader();
          
          // Auto-select if only one dentist
          if (dentists.length === 1) {
            await updateDentistInfo(dentists[0], service);
            dentistDisplay.querySelector("span").textContent = dentists[0];
            
            dentistOptions.querySelectorAll(".option-item").forEach(el => {
              el.classList.remove("selected");
              if (el.getAttribute("data-value") === dentists[0]) {
                el.classList.add("selected");
              }
            });
            
            // Render calendar after dentist selection
            renderCalendar();
          } else {
            // Reset dentist selection
            state.selectedDentist = "";
            dentistDisplay.querySelector("span").textContent = getText("selectDentistPlaceholder");
          }
        });
        
        serviceOptions.appendChild(option);
      });
      
      // DENTIST SELECTOR
      const dentistContainer = document.createElement("div");
      dentistContainer.className = "select-container";
      dentistContainer.style.display = state.selectedService ? "block" : "none";
      
      const dentistLabel = document.createElement("label");
      dentistLabel.className = "select-label";
      dentistLabel.textContent = getText("selectDentist");
      
      const dentistDropdown = document.createElement("div");
      dentistDropdown.className = "select-dropdown";
      
      const dentistDisplay = document.createElement("div");
      dentistDisplay.className = "select-display";
      dentistDisplay.innerHTML = `
        <span>${state.selectedDentist || getText("selectDentistPlaceholder")}</span>
        <div class="dropdown-icon">${SVG_CHEVRON}</div>
      `;
      
      const dentistOptions = document.createElement("div");
      dentistOptions.className = "select-options";
      
      // Function to populate dentist options
      function populateDentistOptions(dentistNames) {
        // Clear options
        dentistOptions.innerHTML = "";
        
        if (dentistNames.length === 0) {
          // Add a message in the dropdown if no dentists available
          const emptyOption = document.createElement("div");
          emptyOption.className = "option-item";
          emptyOption.textContent = isEnglish ? "No dentists available for this service" : "Aucun dentiste disponible pour ce service";
          dentistOptions.appendChild(emptyOption);
          return;
        }
        
        // Add options
        dentistNames.forEach(dentistName => {
          const option = document.createElement("div");
          option.className = `option-item ${state.selectedDentist === dentistName ? 'selected' : ''}`;
          option.setAttribute("data-value", dentistName);
          
          const checkBox = document.createElement("div");
          checkBox.className = "option-checkbox";
          checkBox.innerHTML = SVG_CHECK;
          
          const optionText = document.createElement("span");
          optionText.textContent = dentistName;
          
          option.appendChild(checkBox);
          option.appendChild(optionText);
          
          option.addEventListener("click", async function() {
            // Update dentist info
            await updateDentistInfo(dentistName, state.selectedService);
            
            // Update display
            dentistDisplay.querySelector("span").textContent = dentistName;
            
            // Update selection
            dentistOptions.querySelectorAll(".option-item").forEach(el => {
              el.classList.remove("selected");
            });
            this.classList.add("selected");
            
            // Hide dropdown
            dentistOptions.classList.remove("show");
            dentistDisplay.querySelector(".dropdown-icon").classList.remove("rotate");
            
            // Render calendar
            renderCalendar();
          });
          
          dentistOptions.appendChild(option);
        });
      }
      
     // Replace both dropdown toggle event listeners with these:

// Service dropdown toggle
serviceDisplay.addEventListener("click", function(e) {
  e.stopPropagation();
  
  // Get current dropdown state
  const isShowing = serviceOptions.classList.contains("show");
  
  // Close all dropdowns first
  document.querySelectorAll(".select-options.show").forEach(dropdown => {
    dropdown.classList.remove("show");
  });
  document.querySelectorAll(".dropdown-icon.rotate").forEach(icon => {
    icon.classList.remove("rotate");
  });
  
  // Then toggle this one if it wasn't already showing
  if (!isShowing) {
    serviceOptions.classList.add("show");
    this.querySelector(".dropdown-icon").classList.add("rotate");
  }
});

// Dentist dropdown toggle
dentistDisplay.addEventListener("click", function(e) {
  e.stopPropagation();
  
  if (!state.selectedService) {
    showErrorMessage(getText("pleaseSelectService"));
    return;
  }
  
  // Get current dropdown state
  const isShowing = dentistOptions.classList.contains("show");
  
  // Close all dropdowns first
  document.querySelectorAll(".select-options.show").forEach(dropdown => {
    dropdown.classList.remove("show");
  });
  document.querySelectorAll(".dropdown-icon.rotate").forEach(icon => {
    icon.classList.remove("rotate");
  });
  
  // Then toggle this one if it wasn't already showing
  if (!isShowing) {
    dentistOptions.classList.add("show");
    this.querySelector(".dropdown-icon").classList.add("rotate");
  }
});

      
      // Close dropdowns on outside click
      document.addEventListener("click", function() {
        serviceOptions.classList.remove("show");
        serviceDisplay.querySelector(".dropdown-icon").classList.remove("rotate");
        dentistOptions.classList.remove("show");
        dentistDisplay.querySelector(".dropdown-icon").classList.remove("rotate");
      });
      
      // Prevent closing when clicking inside dropdowns
      serviceOptions.addEventListener("click", function(e) {
        e.stopPropagation();
      });
      
      dentistOptions.addEventListener("click", function(e) {
        e.stopPropagation();
      });
      
      // Assemble service selector
      serviceDropdown.appendChild(serviceDisplay);
      serviceDropdown.appendChild(serviceOptions);
      serviceContainer.appendChild(serviceLabel);
      serviceContainer.appendChild(serviceDropdown);
      
      // Assemble dentist selector
      dentistDropdown.appendChild(dentistDisplay);
      dentistDropdown.appendChild(dentistOptions);
      dentistContainer.appendChild(dentistLabel);
      dentistContainer.appendChild(dentistDropdown);
      
      // Add to wrapper
      selectorsWrapper.appendChild(serviceContainer);
      selectorsWrapper.appendChild(dentistContainer);
      selectorsContainer.appendChild(selectorsWrapper);
      
      return selectorsContainer;
    }
    
    // Create CALENDAR HEADER
    function createCalendarHeader() {
      const header = document.createElement("div");
      header.className = "calendar-header";
      
      // Info section
      const infoSection = document.createElement("div");
      infoSection.className = "calendar-info";
      
      // Service info
      const serviceInfo = document.createElement("div");
      serviceInfo.className = "info-line";
      serviceInfo.innerHTML = `
        <div class="info-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
            <path fill="#9C27B0" d="M186.1 52.1C169.3 39.1 148.7 32 127.5 32C74.7 32 32 74.7 32 127.5l0 6.2c0 15.8 3.7 31.3 10.7 45.5l23.5 47.1c4.5 8.9 7.6 18.4 9.4 28.2l36.7 205.8c2 11.2 11.6 19.4 22.9 19.8s21.4-7.4 24-18.4l28.9-121.3C192.2 323.7 207 312 224 312s31.8 11.7 35.8 28.3l28.9 121.3c2.6 11.1 12.7 18.8 24 18.4s20.9-8.6 22.9-19.8l36.7-205.8c1.8-9.8 4.9-19.3 9.4-28.2l23.5-47.1c7.1-14.1 10.7-29.7 10.7-45.5l0-2.1c0-55-44.6-99.6-99.6-99.6c-24.1 0-47.4 8.8-65.6 24.6l-3.2 2.8 19.5 15.2c7 5.4 8.2 15.5 2.8 22.5s-15.5 8.2-22.5 2.8l-24.4-19-37-28.8z"/>
          </svg>
        </div>
        <span>${state.selectedService ? getLocalizedServiceName(state.selectedService, state.language) : "---"}</span>
      `;
      
      // Dentist info
      const dentistInfo = document.createElement("div");
      dentistInfo.className = "info-line";
      dentistInfo.innerHTML = `
        <div class="info-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18px" height="18px">
            <path fill="#9C27B0" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 256l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16L80 384c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
          </svg>
        </div>
        <span>${state.selectedDentist || "---"}</span>
      `;
      
      infoSection.appendChild(serviceInfo);
      infoSection.appendChild(dentistInfo);
      
      // Nav section
      const navSection = document.createElement("div");
      navSection.className = "calendar-nav";
      
      const dateFormatter = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
      const currentDateDisplay = document.createElement("div");
      currentDateDisplay.className = "current-date";
      currentDateDisplay.textContent = dateFormatter.format(state.currentDate);
      
      const prevButton = document.createElement("button");
      prevButton.className = "nav-btn";
      prevButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      
      const nextButton = document.createElement("button");
      nextButton.className = "nav-btn";
      nextButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      
      // Navigation events
      prevButton.addEventListener("click", () => {
        if (!state.isConfirmed) {
          state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 1);
          renderCalendar();
        }
      });
      
      nextButton.addEventListener("click", () => {
        if (!state.isConfirmed) {
          state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 1);
          renderCalendar();
        }
      });
      
      navSection.appendChild(currentDateDisplay);
      navSection.appendChild(prevButton);
      navSection.appendChild(nextButton);
      
      // Add to header
      header.appendChild(infoSection);
      header.appendChild(navSection);
      
      return header;
    }
    
    // Create DAYS GRID
    function createDaysGrid() {
      const daysContainer = document.createElement("div");
      daysContainer.className = "days-container";
      
      // Weekdays header
      const weekdaysDiv = document.createElement("div");
      weekdaysDiv.className = "weekdays";
      
      const weekdays = getText("weekdays");
      weekdays.forEach(day => {
        const dayEl = document.createElement("div");
        dayEl.textContent = day;
        weekdaysDiv.appendChild(dayEl);
      });
      
      // Days grid
      const daysGrid = document.createElement("div");
      daysGrid.className = "days";
      
      // Calculate days
      const firstDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 1);
      const startDay = firstDay.getDay();
      const daysInMonth = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 0).getDate();
      
      // Add previous month days
      for (let i = 0; i < startDay; i++) {
        const dayEl = document.createElement("div");
        dayEl.className = "day inactive";
        dayEl.textContent = new Date(firstDay.getFullYear(), firstDay.getMonth(), -startDay + i + 1).getDate();
        daysGrid.appendChild(dayEl);
      }
      
      // Add current month days
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), day);
        const dayEl = document.createElement("div");
        dayEl.textContent = day;
        
        if (currentDate < today) {
          // Past days
          dayEl.className = "day inactive";
        } else {
          // Check if working day
          const dayOfWeek = currentDate.getDay();
          if (!state.workingDays.includes(dayOfWeek)) {
            dayEl.className = "day inactive";
          } else {
            // Available day
            dayEl.className = "day available";
            
            // Check if selected
            if (state.selectedDate && isSameDay(currentDate, state.selectedDate)) {
              dayEl.classList.add("active");
            }
            
            // Click handler
            dayEl.addEventListener("click", async () => {
              if (!state.selectedService || !state.selectedDentist) {
                showErrorMessage(getText("pleaseSelectServiceAndDentist"));
                return;
              }
              
              // Update selected date
              state.selectedDate = new Date(currentDate);
              state.selectedTime = null;
              
              // Fetch slots
              const dateStr = formatDate(currentDate);
              try {
                const slots = await fetchAvailableSlots(dateStr);
                state.availableSlots[dateStr] = slots;
              } catch (error) {
                console.error("Error fetching slots:", error);
                state.availableSlots[dateStr] = generateDemoTimeSlots(currentDate);
              }
              
              // Render calendar
              renderCalendar();
            });
          }
        }
        
        daysGrid.appendChild(dayEl);
      }
      
      // Fill remaining grid
      const totalCells = daysGrid.childElementCount;
      const remaining = 42 - totalCells;
      
      for (let i = 1; i <= remaining; i++) {
        const dayEl = document.createElement("div");
        dayEl.className = "day inactive";
        dayEl.textContent = i;
        daysGrid.appendChild(dayEl);
      }
      
      daysContainer.appendChild(weekdaysDiv);
      daysContainer.appendChild(daysGrid);
      
      return daysContainer;
    }
    
    // Create TIME SLOTS
    function createTimeSlots() {
      const timesContainer = document.createElement("div");
      timesContainer.className = "times-container";
      
      // Header
      const timeHeader = document.createElement("div");
      timeHeader.className = "time-header";
      
      // Check if selections made
      if (!state.selectedDentist || !state.selectedService) {
        timeHeader.textContent = getText("selectDate");
        
        const messageBlock = document.createElement("div");
        messageBlock.className = "message-block";
        messageBlock.textContent = getText("pleaseSelectServiceAndDentist");
        
        timesContainer.appendChild(timeHeader);
        timesContainer.appendChild(messageBlock);
        return timesContainer;
      }
      
      // Display based on selection
      if (state.selectedDate) {
        const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric" });
        timeHeader.textContent = `${getText("availableTimesFor")} ${dateFormatter.format(state.selectedDate)}`;
      } else {
        timeHeader.textContent = getText("selectDate");
      }
      
      timesContainer.appendChild(timeHeader);
      
      // Time slots section
      const timeSlotsDiv = document.createElement("div");
      timeSlotsDiv.className = "time-slots";
      
      // Display slots if date selected
      if (state.selectedDate) {
        const dateKey = formatDate(state.selectedDate);
        const timeSlots = state.availableSlots[dateKey] || [];
        
        if (timeSlots.length === 0) {
          const noSlots = document.createElement("div");
          noSlots.className = "message-block";
          noSlots.textContent = getText("noAvailableSlots");
          timeSlotsDiv.appendChild(noSlots);
        } else {
          // Create columns
          const columnsContainer = document.createElement("div");
          columnsContainer.className = "time-columns";
          
          const amColumn = document.createElement("div");
          amColumn.className = "time-column";
          
          const amHeader = document.createElement("div");
          amHeader.className = "column-header";
          amHeader.textContent = "AM";
          amColumn.appendChild(amHeader);
          
          const pmColumn = document.createElement("div");
          pmColumn.className = "time-column";
          
          const pmHeader = document.createElement("div");
          pmHeader.className = "column-header";
          pmHeader.textContent = "PM";
          pmColumn.appendChild(pmHeader);
          
          // Sort slots
          timeSlots.sort((a, b) => new Date(a) - new Date(b));
          
          // Add slots to columns
          timeSlots.forEach(timeISO => {
            const dateTime = new Date(timeISO);
            const hours = dateTime.getHours();
            
            const timeSlot = document.createElement("div");
            timeSlot.className = `time-slot ${state.selectedTime === timeISO ? 'selected' : ''}`;
            
            const timeFormatter = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", hour12: true });
            timeSlot.textContent = timeFormatter.format(dateTime);
            
            timeSlot.addEventListener("click", () => {
              if (!state.isConfirmed) {
                state.selectedTime = timeISO;
                renderCalendar();
              }
            });
            
            if (hours < 12) {
              amColumn.appendChild(timeSlot);
            } else {
              pmColumn.appendChild(timeSlot);
            }
          });
          
          // Add columns
          columnsContainer.appendChild(amColumn);
          columnsContainer.appendChild(pmColumn);
          timeSlotsDiv.appendChild(columnsContainer);
        }
      } else {
        // No date selected
        const noDate = document.createElement("div");
        noDate.className = "message-block";
        noDate.textContent = getText("pleaseSelectDate");
        timeSlotsDiv.appendChild(noDate);
      }
      
      timesContainer.appendChild(timeSlotsDiv);
      return timesContainer;
    }
    
    // Create FOOTER
    function createFooter() {
      const footer = document.createElement("div");
      footer.className = "calendar-footer";
      
      const confirmBtn = document.createElement("button");
      confirmBtn.className = "confirm-btn";
      
      if (state.isConfirmed) {
        confirmBtn.textContent = isEnglish ? "Booked ✓" : "Réservée ✓";
        confirmBtn.style.backgroundColor = "#4CAF50";
        confirmBtn.style.color = "white";
        confirmBtn.disabled = true;
      } else {
        confirmBtn.textContent = getText("confirmBooking");
        
        if (!state.selectedDate || !state.selectedTime || !state.selectedDentist || !state.selectedService) {
          confirmBtn.disabled = true;
        }
        
        confirmBtn.addEventListener("click", async () => {
          if (state.selectedDate && state.selectedTime && state.selectedDentist && state.selectedService) {
            // Loading state
            confirmBtn.disabled = true;
            confirmBtn.textContent = getText('confirmBooking') + '...';
            
            try {
              // Create booking
              const bookingResponse = await createBooking(state.selectedTime);
              
              if (bookingResponse) {
                // Update state and UI
                state.isConfirmed = true;
                renderCalendar();
                
                // Show success message
                const successOverlay = document.createElement('div');
                successOverlay.style.position = "absolute";
                successOverlay.style.top = "0";
                successOverlay.style.left = "0";
                successOverlay.style.width = "100%";
                successOverlay.style.height = "100%";
                successOverlay.style.backgroundColor = "rgba(156, 39, 176, 0.05)";
                successOverlay.style.display = "flex";
                successOverlay.style.justifyContent = "center";
                successOverlay.style.alignItems = "center";
                successOverlay.style.zIndex = "1000";
                successOverlay.style.opacity = "0";
                successOverlay.style.transition = "opacity 0.5s";
                
                const successMessage = document.createElement('div');
                successMessage.style.backgroundColor = "white";
                successMessage.style.borderRadius = "15px";
                successMessage.style.padding = "20px 30px";
                successMessage.style.boxShadow = "0 10px 30px rgba(156, 39, 176, 0.15)";
                successMessage.style.textAlign = "center";
                successMessage.style.transform = "translateY(20px)";
                successMessage.style.transition = "transform 0.5s, opacity 0.5s";
                successMessage.style.opacity = "0";
                
                successMessage.innerHTML = `
                  <div>
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="30" cy="30" r="30" fill="#F8EAFA"/>
                      <path d="M20 30L27 37L40 23" stroke="#9C27B0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <p style="font-size: 18px; font-weight: 600; margin-top: 15px; color: #9C27B0;">
                    ${getText('bookingConfirmed')}!
                  </p>
                `;
                
                successOverlay.appendChild(successMessage);
                bookingContainer.appendChild(successOverlay);
                
                // Animation sequence
                setTimeout(() => {
                  successOverlay.style.opacity = '1';
                  successMessage.style.opacity = '1';
                  successMessage.style.transform = 'translateY(0)';
                  
                  setTimeout(() => {
                    successOverlay.style.opacity = '0';
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                      bookingContainer.removeChild(successOverlay);
                      
                      // Send data to Voiceflow
                      const dateStr = formatDate(state.selectedDate);
                      const timeFormatter = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', hour12: true });
                      const formattedDate = new Intl.DateTimeFormat(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(state.selectedDate);
                      const formattedTime = timeFormatter.format(new Date(state.selectedTime));
                      const formattedDateTime = `${formattedDate} ${language === "fr" ? "à" : "at"} ${formattedTime}`;
                      
                      const formData = { 
                        fullName,
                        email,
                        dentist: state.selectedDentist,
                        service: state.selectedService,
                        date: dateStr,
                        time: state.selectedTime,
                        formattedDate,
                        formattedTime,
                        formattedDateTime
                      };
                      
                      if (window.voiceflow && window.voiceflow.chat) {
                        window.voiceflow.chat.interact({
                          type: "complete",
                          payload: formData
                        });
                      } else {
                        console.log("Form submitted:", formData);
                      }
                    }, 500);
                  }, 2500);
                }, 100);
              }
            } catch (err) {
              console.error("Booking error:", err);
              confirmBtn.disabled = false;
              confirmBtn.textContent = getText("confirmBooking");
              showErrorMessage(err.message || "Unable to complete booking");
            }
          }
        });
      }
      
      footer.appendChild(confirmBtn);
      return footer;
    }
    
    // Main render function
    function renderCalendar() {
      // Clear container
      bookingContainer.innerHTML = '';
      
      // Create components
      const selectors = createSelectors();
      const header = createCalendarHeader();
      
      const calendarBody = document.createElement("div");
      calendarBody.className = "calendar-body";
      
      const daysGrid = createDaysGrid();
      const timeSlots = createTimeSlots();
      
      calendarBody.appendChild(daysGrid);
      calendarBody.appendChild(timeSlots);
      
      const footer = createFooter();
      
      // Add components
      bookingContainer.appendChild(selectors);
      bookingContainer.appendChild(header);
      bookingContainer.appendChild(calendarBody);
      bookingContainer.appendChild(footer);
    }
    
    // Initial render
    container.appendChild(style);
    container.appendChild(bookingContainer);
    renderCalendar();
    
    // Add to parent
    element.appendChild(container);
    
    // Handle resize
    window.addEventListener("resize", () => {
      container.style.width = window.innerWidth <= 768 ? "100%" : "800px";
    });
  }
};





const BookingCalendarDExtension = {
  name: 'Booking',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_booking_calendar_d' || trace.payload?.name === 'ext_booking_calendar_d',
  render: async ({ trace, element }) => {
    // --- Extract required payload values with fallbacks ---
    const {
      fullName = "John Doe",
      email = "john@example.com",
      apiKey = "",
      scheduleId = "",
      eventTypeId = "1", 
      eventTypeSlug = "default-event",
      serviceProvider = "Dr. Sophie Martin",
      serviceName = "Dental Cleaning", 
      slots = {},
      selectedDate = "", 
      selectedTime = "",
      language = "en",
      timezone = "America/Toronto",
      dentistsInfo = {}
    } = trace.payload || {};

    const locale = language === "fr" ? "fr-CA" : "en-US";

    // Service translations mapping
  

    // Create a container and attach a shadow DOM for encapsulated styling.
    const container = document.createElement("div");
    container.style.width = window.innerWidth <= 768 ? "100%" : "800px";
    container.style.maxWidth = "800px";
    container.style.margin = "0 auto";
    const shadow = container.attachShadow({ mode: "open" });

    // Function to filter dentists by service
    function filterDentistsByService(dentistsInfo, serviceName, language) {
      if (!serviceName || !dentistsInfo || Object.keys(dentistsInfo).length === 0) return dentistsInfo;
      
      // Try to find matches with both original and localized service names
      const originalServiceName = getOriginalServiceName(serviceName, language);
      const localizedServiceName = getLocalizedServiceName(originalServiceName, language);
      
      const filteredDentists = {};
      
      // Loop through all dentists
      Object.entries(dentistsInfo).forEach(([dentistName, dentistData]) => {
        // Check if this dentist provides the service (using either name)
        if (dentistData.services && Object.keys(dentistData.services).some(service => 
          service.toLowerCase() === originalServiceName.toLowerCase() || 
          service.toLowerCase() === localizedServiceName.toLowerCase()
        )) {
          filteredDentists[dentistName] = dentistData;
        }
      });
      
      return Object.keys(filteredDentists).length > 0 ? filteredDentists : dentistsInfo;
    }

    // Build CSS with direct values (no CSS variables)
    const style = document.createElement("style");
    style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes shimmer {
      0% {
        background-position: -100% 0;
      }
      100% {
        background-position: 100% 0;
      }
    }
    .calendar-container {
      font-family: "Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      box-shadow: 0 10px 25px rgba(156, 39, 176, 0.15);
      border-radius: 16px;
      overflow: hidden;
      background: #ffffff;
      color: #333;
      animation: fadeIn 0.3s ease-out forwards;
      border: 1px solid #eaeaea;
      transition: all 0.3s ease;
    }
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 24px;
      background-color: #faf7fc;
      border-bottom: 1px solid #eaeaea;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
      position: relative;
    }
    .calendar-header::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 10%;
      width: 80%;
      height: 3px;
      background: linear-gradient(90deg, transparent, #9C27B0, transparent);
      opacity: 0.5;
    }
    .calendar-title {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      font-size: 16px;
      background: transparent;
      -webkit-text-fill-color: initial;
    }
    .calendar-title-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .service-provider, .service-name {
      display: flex;
      align-items: center; 
      height: 24px;
      font-size: 16px;
      color: #9C27B0;
      margin: 3px 0;
      line-height: 24px;
    }
    .service-provider, .service-name  {
      font-weight: 650;
    }

    .provider-icon, .service-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }
    .provider-icon svg, .service-icon svg {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      top: 0;
    }
    .calendar-nav {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .nav-btn {
      background: white;
      border: none;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      color: #9C27B0;
    }
    .nav-btn:hover {
      background-color: #F8EAFA;
      box-shadow: 0 3px 10px rgba(156, 39, 176, 0.15);
    }
    .current-date {
      font-weight: 600;
      font-size: 17px;
      background: #F8EAFA;
      padding: 6px 14px;
      border-radius: 20px;
      font-weight: 500;
      color: #9C27B0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      transition: all 0.3s;
    }
    .calendar-body {
      display: flex;
      height: 400px;
      background: linear-gradient(to bottom, #ffffff, #fefeff);
    }
    .days-container {
      width: 47%;
      position: relative;
      background-image: linear-gradient(
          rgba(156, 39, 176, 0.03) 1px,
          transparent 1px
        ),
        linear-gradient(90deg, rgba(156, 39, 176, 0.03) 1px, transparent 1px);
      background-size: 25px 25px;
      background-position: -1px -1px;
    }
    .calendar-container::before {
      content: "";
      position: absolute;
      top: -3px;
      left: 10%;
      right: 10%;
      height: 3px;
      background: linear-gradient(90deg, transparent, #9C27B0, transparent);
      border-radius: 3px;
      opacity: 0.7;
    }
    .days-container::after {
      content: "";
      position: absolute;
      right: 20px;
      bottom: 20px;
      width: 80px;
      height: 80px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='80' height='80'%3E%3Cpath d='M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z' fill='rgba(156, 39, 176, 0.03)'/%3E%3C/svg%3E");
      opacity: 0.6;
    }
    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-weight: 600;
      font-size: 13px;
      padding: 15px 0 10px;
      color: #666;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
      padding: 5px;
    }
    .day {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 45px;
      width: 45px;
      cursor: pointer;
      position: relative;
      font-size: 14px;
      transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      margin: 0 auto;
      border: 1px solid transparent;
      border-radius: 50%;
      z-index: 1;
    }
    .day:not(.inactive)::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      background-color: transparent;
      transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      z-index: -1;
    }
    .day:hover:not(.inactive)::before {
      background-color: #F8EAFA;
    }
    .day:hover:not(.inactive) {
      color: #9C27B0;
      border: 2px solid #9C27B0;
      font-weight: 500;
    }
    .day.available {
      position: relative;
    }
    .day.available::after {
      content: "";
      position: absolute;
      bottom: 3px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #9C27B0;
      opacity: 0.7;
      animation: fadeIn 0.3s ease forwards;
    }
    .day.today {
      border: 1.5px solid #9C27B0;
      position: relative;
      box-shadow: 0 0 0 1px rgba(156, 39, 176, 0.1);
    }
    .day.today::after {
      content: "";
      position: absolute;
      bottom: 4px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #9C27B0;
    }
    .day.active {
      background-color: #9C27B0;
      color: white;
      border-radius: 4px;
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(156, 39, 176, 0.15);
    }
    .day.active::after {
      display: none;
    }
    .day.inactive {
      color: #ccc;
      cursor: default;
      opacity: 0.7;
    }
    .times-container {
      width: 53%;
      border-left: 1px solid #eaeaea;
      overflow-y: auto;
      background-color: #fefeff;
      position: relative;
    }
    .times-container::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: linear-gradient(to bottom, #9C27B0, transparent);
      opacity: 0.1;
    }
    .time-header {
      font-weight: 600;
      margin-bottom: 20px;
      font-size: 16px;
      text-align: center;
      color: #9C27B0;
      padding: 0 5px;
      line-height: 1.4;
      position: relative;
    }
    .time-header::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 3px;
      background-color: #9C27B0;
      opacity: 0.5;
      border-radius: 3px;
    }
    .time-slots {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 5px;
    }
    .time-slots-columns {
      display: flex;
      gap: 20px;
    }
    .time-slots-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
    }
    .times-container::-webkit-scrollbar {
      width: 6px;
    }
    .times-container::-webkit-scrollbar-track {
      border-radius: 10px;
    }
    .times-container::-webkit-scrollbar-thumb {
      background: rgba(156, 39, 176, 0.2);
      border-radius: 10px;
    }
    .times-container::-webkit-scrollbar-thumb:hover {
      background: rgba(156, 39, 176, 0.3);
    }
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    .time-slot {
      padding: 14px;
      border-radius: 10px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      border: 1px solid #e0e0e0;
      font-size: 14px;
      background-color: white;
      color: #444;
      position: relative;
      overflow: hidden;
      transform-origin: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    .time-slot::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, #F8EAFA, transparent);
      background-size: 200% 100%;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .time-slot.available {
      background-color: white;
    }
    .time-slot.unavailable {
      background-color: #f4f4f5;
      color: #999;
      cursor: not-allowed;
      opacity: 0.7;
    }
    .time-slot.selected {
      background-color: #9C27B0;
      color: white;
      border-color: #9C27B0;
      border-radius: 10px;
      font-weight: bold;
      box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
      z-index: 5;
    }
    .time-slot.selected::after {
      content: "";
      position: absolute;
      right: 16px;
      font-size: 14px;
      opacity: 0.9;
    }
    .time-slot.available:hover:not(.selected) {
      background-color: #F8EAFA;
      color: #9C27B0;
      border: 2px solid #9C27B0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.07);
    }
    .time-slot.available:hover:not(.selected)::before {
      opacity: 0.6;
      animation: shimmer 1.5s infinite;
    }
    .calendar-container.confirmed .day,
    .calendar-container.confirmed .time-slot {
      pointer-events: none;
      cursor: default;
    }
    .calendar-container.confirmed .nav-btn {
      pointer-events: none;
      opacity: 0.5;
      cursor: default;
    }
    .calendar-footer {
      padding: 15px;
      display: flex;
      justify-content: center;
      border-top: 1px solid #eaeaea;
    }
    .action-btn {
      padding: 10px 20px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
      font-size: 14px;
    }
    .confirm-btn {
      background: #F8EAFA;
      color: #9C27B0;
      font-weight: 600;
      border-radius: 10px;
      padding: 12px 24px;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
    }
    .confirm-btn::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transform: translateX(-100%);
    }
    .confirm-btn:hover:not(:disabled) {
      background: #9C27B0;
      color: white;
      box-shadow: 0 6px 18px rgba(156, 39, 176, 0.15);
    }
    .confirm-btn:hover:not(:disabled)::before {
      animation: shimmer 1.5s infinite;
    }
    .confirm-btn:active:not(:disabled) {
      box-shadow: 0 2px 10px rgba(156, 39, 176, 0.15);
    }
    .confirm-btn:disabled {
      cursor: not-allowed;
      box-shadow: none;
    }
    .cancel-btn {
      background-color: white;
      color: #333;
      border: 1px solid #eaeaea;
      margin-right: 10px;
    }
    .cancel-btn:hover {
      background-color: #f5f5f5;
    }
    .toggle-view {
      background-color: white;
      border: 1px solid #eaeaea;
      border-radius: 6px;
      display: flex;
      overflow: hidden;
    }
    .toggle-btn {
      padding: 8px 12px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease;
    }
    .toggle-btn.active {
      background-color: #9C27B0;
      color: white;
    }

    /* Dentist Selector styling */
    .dentist-selector-container {
      display: flex;
      flex-direction: column;
      padding: 15px 20px;
      background-color: #F8EAFA;
      border-bottom: 1px solid #eaeaea;
    }
    
    .dentist-selector-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 14px;
      color: #9C27B0;
    }
    
    .select-wrapper {
      border: 1px solid #ddd;
      border-radius: 6px;
      background-color: #fff;
      position: relative;
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
      background-color: #F8EAFA;
      border-radius: 50%;
    }
    
    .dropdown-icon.rotate {
      transform: rotate(180deg);
    }
    
    .custom-options {
      display: none;
      border-top: 1px solid #ddd;
      max-height: 300px;
      overflow-y: auto;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      z-index: 100;
      border-radius: 0 0 6px 6px;
      width: 100%;
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
      background-color: #F8EAFA;
      color: #9c27b0;
    }
    
    .custom-option.selected {
      background-color: #F8EAFA;
      color: #9c27b0;
      font-weight: bold;
    }
    
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
      position: relative;
    }
    
    .custom-option.selected .option-checkbox {
      border-color: #9c27b0;
      background-color: #9c27b0;
    }
    
    .custom-option.selected .option-checkbox svg path {
      fill: #fff !important;
    }
    
    .custom-option:not(.selected):hover .option-checkbox {
      border-color: #9c27b0;
    }
    
    .custom-option:not(.selected):hover .option-checkbox svg path {
      fill: #9c27b0;
    }
    
    /* Fix for SVG display in non-selected state */
    .custom-option:not(.selected) .option-checkbox svg {
      display: none;
    }
    
    .custom-option:not(.selected):hover .option-checkbox svg {
      display: block;
    }
    
    .show-options {
      display: block;
    }

    @media (max-width: 768px) {
      .calendar-body {
        flex-direction: column;
        height: auto;
      }
      
      .days-container,
      .times-container {
        width: 100%;
      }
      
      .times-container {
        border-left: none;
        border-top: 1px solid #eaeaea;
        max-height: 250px;
      }
      
      .day {
        height: 40px;
        width: 40px;
        font-size: 13px;
      }
      
      .nav-btn {
        width: 36px;
        height: 36px;
      }
      
      .time-header {
        font-size: 15px;
      }
      
      .action-btn {
        padding: 10px 18px;
        font-size: 14px;
      }
      
      .service-provider,
      .service-name {
        font-size: 14px;
      }
      
      @keyframes mobileShimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      
      .confirm-btn:hover:not(:disabled)::before {
        animation: mobileShimmer 2s infinite;
      }
    }
    `;
    shadow.appendChild(style);

    // ---------------------
    // API CALL FUNCTIONS
    // ---------------------
    async function fetchWorkingDays() {
      if (!state.apiKey || !state.scheduleId) return [1, 2, 3, 4, 5];
      try {
        const res = await fetch(`https://api.cal.com/v2/schedules/${state.scheduleId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${state.apiKey}`,
            "cal-api-version": "2024-06-11",
            "Content-Type": "application/json"
          }
        });
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        console.log("Schedule data:", data);
        const availability = data.data?.availability || [];
        const dayNameToNumber = {
          "Sunday": 0,
          "Monday": 1,
          "Tuesday": 2,
          "Wednesday": 3,
          "Thursday": 4,
          "Friday": 5,
          "Saturday": 6
        };
        const workingDaysSet = new Set();
        availability.forEach(item => {
          if (Array.isArray(item.days)) {
            item.days.forEach(dayName => {
              const dayNum = dayNameToNumber[dayName];
              if (dayNum !== undefined) {
                workingDaysSet.add(dayNum);
              }
            });
          }
        });
        return Array.from(workingDaysSet);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        return [1, 2, 3, 4, 5];
      }
    }

    async function fetchAvailableSlots(selectedDateISO) {
      const start = new Date(selectedDateISO);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(selectedDateISO);
      end.setUTCHours(23, 59, 59, 999);
      
      // Get eventTypeSlug for the current selected dentist and service
      let eventSlug = state.eventTypeSlug;
      if (!eventSlug && state.selectedDentist && state.originalServiceName) {
        const dentistData = state.dentistsInfo[state.selectedDentist];
        if (dentistData && dentistData.services) {
          // Try to find the service by original name
          const serviceEntry = Object.entries(dentistData.services).find(([service]) => 
            service.toLowerCase() === state.originalServiceName.toLowerCase()
          );
          
          if (serviceEntry) {
            const [_, serviceData] = serviceEntry;
            eventSlug = serviceData.eventSlug;
          }
        }
      }
      
      // If still no eventSlug, create a default one
      if (!eventSlug) {
        eventSlug = `appointment-${state.eventTypeId}`;
      }
      
      const url = `https://api.cal.com/v2/slots/available?startTime=${start.toISOString()}&endTime=${end.toISOString()}&eventTypeId=${state.eventTypeId}&eventTypeSlug=${eventSlug}`;
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${state.apiKey}`,
            "cal-api-version": "2024-06-11", 
            "Content-Type": "application/json"
          }
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const responseBody = await res.json();
        if (!responseBody || typeof responseBody !== "object") {
          throw new Error("Invalid or missing response body from the API");
        }
        if (responseBody.status !== "success") {
          throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
        }
        const slotsObj = responseBody.data?.slots || {};
        const slotsForDate = slotsObj[selectedDateISO] || [];
        return slotsForDate.map(slot => slot.time);
      } catch (err) {
        console.error("Error fetching available slots:", err);
        return [];
      }
    }

    // ---------------------
    // IMPROVED BOOKING FUNCTION
    // ---------------------
    async function createBooking(startTimeISO) {
      try {
        const bookingDate = new Date(startTimeISO);
        const dateStr = formatDate(bookingDate);
        const currentAvailableSlots = await fetchAvailableSlots(dateStr);
        if (!currentAvailableSlots.includes(startTimeISO)) {
          throw new Error("This slot is no longer available. Please select another time.");
        }
        const url = `https://api.cal.com/v2/bookings`;
        
        // Get the proper eventTypeSlug from selected dentist and service if available
        let eventSlug = state.eventTypeSlug;
        
        if (!eventSlug && state.selectedDentist && state.originalServiceName) {
          const dentistData = state.dentistsInfo[state.selectedDentist];
          if (dentistData && dentistData.services) {
            const serviceEntry = Object.entries(dentistData.services).find(([service]) => 
              service.toLowerCase() === state.originalServiceName.toLowerCase()
            );
            
            if (serviceEntry) {
              const [_, serviceData] = serviceEntry;
              eventSlug = serviceData.eventSlug;
            }
          }
        }
        
        // Fallback to default format if needed
        if (!eventSlug) {
          eventSlug = `appointment-${state.eventTypeId}`;
        }
        
        const body = {
          start: startTimeISO,
          end: new Date(new Date(startTimeISO).getTime() + 60 * 60 * 1000).toISOString(), // Add 1 hour by default
          eventTypeId: Number(state.eventTypeId),
          eventTypeSlug: eventSlug,
          attendee: { 
            name: fullName, 
            email: email, 
            timeZone: timezone 
          }
        };
        
        console.log("Booking request:", JSON.stringify(body));
        
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${state.apiKey}`,
            "cal-api-version": "2024-06-11", 
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} ${JSON.stringify(await res.text())}`);
        }
        const responseBody = await res.json();
        if (responseBody.status && responseBody.status !== "success") {
          throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
        }
        return responseBody;
      } catch (err) {
        console.error("Booking error:", err);
        showErrorMessage(err.message || "Unable to complete booking. Please try again.");
        return null;
      }
    }

    // ---------------------
    // ERROR DISPLAY FUNCTION
    // ---------------------
    function showErrorMessage(message) {
      // Log error to console for debugging
      console.error("Calendar extension error:", message);
      
      const errorOverlay = document.createElement("div");
      errorOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      `;
      const errorMessage = document.createElement("div");
      errorMessage.style.cssText = `
        background-color: #fff0f0;
        border: 1px solid #ffdddd;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        text-align: center;
        max-width: 80%;
      `;
      errorMessage.innerHTML = `
        <div style="color: #d32f2f; font-size: 24px; margin-bottom: 10px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="currentColor"/>
          </svg>
        </div>
        <p style="margin: 0; color: #333;">${message}</p>
        <button style="margin-top: 15px; background: #9C27B0; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">OK</button>
      `;
      errorOverlay.appendChild(errorMessage);
      calendarContainer.appendChild(errorOverlay);
      const closeButton = errorMessage.querySelector("button");
      closeButton.addEventListener("click", () => {
        calendarContainer.removeChild(errorOverlay);
        if (state.selectedDate) {
          try {
            const dateKey = formatDate(state.selectedDate);
            fetchAvailableSlots(dateKey).then(slots => {
              state.availableSlots[dateKey] = slots;
              renderCalendar();
            }).catch(err => {
              console.error("Error after closing error message:", err);
              // Don't show another error to avoid potential loop
              renderCalendar();
            });
          } catch (err) {
            console.error("Error in error handler:", err);
            renderCalendar();
          }
        }
      });
    }

    // ---------------------
    // EXTENSION INTERNAL STATE
    // ---------------------
    // Process the service name to handle both English and French versions
    const originalServiceName = getOriginalServiceName(serviceName, language);
    const localizedServiceName = getLocalizedServiceName(originalServiceName, language);
    
    // Filter dentists by service
    const filteredDentistsInfo = filterDentistsByService(dentistsInfo, originalServiceName, language);

    const state = {
      currentDate: new Date(),
      selectedDate: selectedDate ? new Date(selectedDate) : null,
      selectedTime: selectedTime || null,
      availableSlots: {},
      workingDays: [1, 2, 3, 4, 5], // Default to weekdays, will be updated
      isConfirmed: false,
      language: language || "en",
      dentistsInfo: filteredDentistsInfo,
      // Make sure we select a dentist who offers the service
      selectedDentist: (serviceProvider && filteredDentistsInfo[serviceProvider]) 
        ? serviceProvider 
        : Object.keys(filteredDentistsInfo)[0] || "",
      apiKey: apiKey,
      scheduleId: scheduleId,
      eventTypeId: eventTypeId,
      eventTypeSlug: eventTypeSlug,
      // Store both original and localized service names for reference
      originalServiceName: originalServiceName,
      localizedServiceName: localizedServiceName
    };

    // Initialize API parameters based on selected dentist
    if (Object.keys(state.dentistsInfo).length > 0 && state.selectedDentist) {
      const dentistData = state.dentistsInfo[state.selectedDentist];
      if (dentistData) {
        state.apiKey = dentistData.apiKey || state.apiKey;
        state.scheduleId = dentistData.scheduleId || state.scheduleId;
        
        // If we have services info and a specific service name
        if (dentistData.services && state.originalServiceName) {
          // Find the matching service (case insensitive)
          const serviceEntry = Object.entries(dentistData.services).find(([service]) => 
            service.toLowerCase() === state.originalServiceName.toLowerCase()
          );
          
          if (serviceEntry) {
            const [_, serviceData] = serviceEntry;
            state.eventTypeId = serviceData.eventId || state.eventTypeId;
            // Use the actual slug from the service if available
            if (serviceData.eventSlug) {
              state.eventTypeSlug = serviceData.eventSlug;
            }
          }
        } else {
          state.eventTypeId = dentistData.eventId || state.eventTypeId;
        }
      }
    }

    const translations = {
      en: {
        selectDateAndTime: "Select Date & Time",
        selectDate: "Select a date to view available times",
        pleaseSelectDate: "Please select a date first",
        availableTimesFor: "Available times for",
        noAvailableSlots: "No available time slots for this date",
        confirmBooking: "Confirm Booking",
        bookingConfirmed: "Booking Confirmed",
        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        selectDentist: "Select a dentist",
        selectDentistPlaceholder: "-- Select a dentist --",
        noDentistsAvailable: "No dentists available for this service"
      },
      fr: {
        selectDateAndTime: "Sélectionner Date & Heure",
        selectDate: "Sélectionnez une date pour voir les horaires disponibles",
        pleaseSelectDate: "Veuillez d'abord sélectionner une date",
        availableTimesFor: "Horaires disponibles pour",
        noAvailableSlots: "Aucun horaire disponible pour cette date",
        confirmBooking: "Confirmer la Réservation",
        bookingConfirmed: "Réservation Confirmée",
        weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
        selectDentist: "Sélectionner un dentiste",
        selectDentistPlaceholder: "-- Sélectionner un dentiste --",
        noDentistsAvailable: "Aucun dentiste disponible pour ce service"
      }
    }; 

    function getText(key) {
      const lang = translations[state.language] ? state.language : "en";
      return translations[lang][key];
    }

    function formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    function isSameDay(date1, date2) {
      if (!date1 || !date2) return false;
      return formatDate(date1) === formatDate(date2);
    }

    function isToday(date) {
      const now = new Date();
      return isSameDay(date, now);
    }

    function getDefaultActiveDay() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (state.workingDays.includes(today.getDay())) return today;
      const next = new Date(today);
      while (!state.workingDays.includes(next.getDay())) {
        next.setDate(next.getDate() + 1);
      }
      return next;
    }

    // Update information when dentist changes
    async function updateDentistInfo(dentistName) {
      if (!dentistName || !state.dentistsInfo[dentistName]) return;
      
      const dentistData = state.dentistsInfo[dentistName];
      state.selectedDentist = dentistName;
      state.apiKey = dentistData.apiKey;
      state.scheduleId = dentistData.scheduleId;
      
      // If we have services info and a specific service name
      if (dentistData.services && state.originalServiceName) {
        // Find the matching service (case insensitive)
        const serviceEntry = Object.entries(dentistData.services).find(([service]) => 
          service.toLowerCase() === state.originalServiceName.toLowerCase()
        );
        
        if (serviceEntry) {
          const [_, serviceData] = serviceEntry;
          state.eventTypeId = serviceData.eventId;
          // Use the actual slug from the service if available
          if (serviceData.eventSlug) {
            state.eventTypeSlug = serviceData.eventSlug;
          }
        } else {
          // Fallback to default eventTypeId if service not found
          state.eventTypeId = dentistData.eventId;
        }
      } else {
        // Fallback to default eventTypeId
        state.eventTypeId = dentistData.eventId;
      }
      
      // Make sure eventTypeId is a number, not a string
      if (typeof state.eventTypeId === 'string') {
        state.eventTypeId = parseInt(state.eventTypeId, 10);
      }
      
      // Reset selected date and time
      state.selectedTime = null;
      state.availableSlots = {};
      
      try {
        // Update working days for this dentist
        state.workingDays = await fetchWorkingDays();
        
        // Set a new default selected date based on working days
        const defaultDay = getDefaultActiveDay();
        state.selectedDate = defaultDay;
        const dayKey = formatDate(defaultDay);
        const defaultSlots = await fetchAvailableSlots(dayKey);
        state.availableSlots[dayKey] = defaultSlots;
      } catch (error) {
        console.error("Error updating dentist info:", error);
        // Default to standard weekdays if there's an error
        state.workingDays = [1, 2, 3, 4, 5];
        showErrorMessage("Could not fetch dentist's schedule. Please try again or contact support.");
      }
    }

    // Initialize default selected date and fetch its slots if not already set.
    if (!state.selectedDate) {
      const defaultDay = getDefaultActiveDay();
      state.selectedDate = defaultDay;
      const dayKey = formatDate(defaultDay);
      const defaultSlots = await fetchAvailableSlots(dayKey);
      state.availableSlots[dayKey] = defaultSlots;
    }

    // ---------------------
    // RENDER CALENDAR COMPONENTS
    // ---------------------
    function renderDentistSelector() {
      // Only render selector if we have dentist data
      if (Object.keys(state.dentistsInfo).length === 0) {
        const container = document.createElement("div");
        container.className = "dentist-selector-container";
        
        const noDentistsMessage = document.createElement("div");
        noDentistsMessage.style.textAlign = "center";
        noDentistsMessage.style.padding = "10px";
        noDentistsMessage.style.color = "#666";
        noDentistsMessage.textContent = getText("noDentistsAvailable");
        
        container.appendChild(noDentistsMessage);
        return container;
      }
      
      const container = document.createElement("div");
      container.className = "dentist-selector-container";
      
      const label = document.createElement("label");
      label.className = "dentist-selector-label";
      label.textContent = getText("selectDentist");
      
      // Create the custom dropdown UI
      const dropdownWrapper = document.createElement("div");
      dropdownWrapper.className = "select-wrapper";
      
      const selectDisplay = document.createElement("div");
      selectDisplay.className = "select-display";
      selectDisplay.innerHTML = `
        <span>${state.selectedDentist || getText("selectDentistPlaceholder")}</span>
        <div class="dropdown-icon">${SVG_CHEVRON}</div>
      `;
      
      const customOptions = document.createElement("div");
      customOptions.className = "custom-options";
      
      // Add options for each dentist
      Object.keys(state.dentistsInfo).forEach(dentistName => {
        const option = document.createElement("div");
        option.className = "custom-option";
        if (state.selectedDentist === dentistName) {
          option.classList.add("selected");
        }
        
        option.innerHTML = `
          <div class="option-checkbox">${SVG_CHECK}</div>
          <span>${dentistName}</span>
        `;
        
        option.addEventListener("click", async () => {
          if (state.isConfirmed) return;
          
          // Update dentist info and UI
          await updateDentistInfo(dentistName);
          
          // Update display
          const displayText = selectDisplay.querySelector("span");
          if (displayText) {
            displayText.textContent = dentistName;
          }
          
          // Update option classes
          customOptions.querySelectorAll(".custom-option").forEach(el => {
            el.classList.remove("selected");
          });
          option.classList.add("selected");
          
          // Hide dropdown
          customOptions.classList.remove("show-options");
          const icon = selectDisplay.querySelector(".dropdown-icon");
          if (icon) {
            icon.classList.remove("rotate");
          }
          
          renderCalendar();
        });
        
        customOptions.appendChild(option);
      });
      
      // Toggle dropdown on click
      selectDisplay.addEventListener("click", (e) => {
        e.stopPropagation();
        customOptions.classList.toggle("show-options");
        const icon = selectDisplay.querySelector(".dropdown-icon");
        if (icon) {
          icon.classList.toggle("rotate");
        }
      });
      
      // Close dropdown when clicking outside
      document.addEventListener("click", () => {
        customOptions.classList.remove("show-options");
        const icon = selectDisplay.querySelector(".dropdown-icon");
        if (icon) {
          icon.classList.remove("rotate");
        }
      });
      
      dropdownWrapper.appendChild(selectDisplay);
      dropdownWrapper.appendChild(customOptions);
      
      container.appendChild(label);
      container.appendChild(dropdownWrapper);
      
      return container;
    }

    function renderHeader() {
      const header = document.createElement("div");
      header.className = "calendar-header";
      const dateFormatter = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
      
      // Create calendar title with provider and service info
      const calendarTitle = document.createElement("div");
      calendarTitle.className = "calendar-title";
      
      // Calendar icon
      const calendarIcon = document.createElement("span");
      calendarIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px"><path fill="#9C27B0" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/></svg>
      `;
      
      // Provider and service information section
      const titleContent = document.createElement("div");
      titleContent.className = "calendar-title-content";
      
      const providerDiv = document.createElement("div");
      providerDiv.className = "service-provider";
      providerDiv.innerHTML = `
        <span class="provider-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18px" height="18px">
          <path fill="#9C27B0" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 256l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16L80 384c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
          </svg>
        </span>
        <span>${state.selectedDentist}</span>
      `;
      
      const serviceDiv = document.createElement("div");
      serviceDiv.className = "service-name";
      serviceDiv.innerHTML = `
        <span class="service-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
            <path fill="#9C27B0" d="M186.1 52.1C169.3 39.1 148.7 32 127.5 32C74.7 32 32 74.7 32 127.5l0 6.2c0 15.8 3.7 31.3 10.7 45.5l23.5 47.1c4.5 8.9 7.6 18.4 9.4 28.2l36.7 205.8c2 11.2 11.6 19.4 22.9 19.8s21.4-7.4 24-18.4l28.9-121.3C192.2 323.7 207 312 224 312s31.8 11.7 35.8 28.3l28.9 121.3c2.6 11.1 12.7 18.8 24 18.4s20.9-8.6 22.9-19.8l36.7-205.8c1.8-9.8 4.9-19.3 9.4-28.2l23.5-47.1c7.1-14.1 10.7-29.7 10.7-45.5l0-2.1c0-55-44.6-99.6-99.6-99.6c-24.1 0-47.4 8.8-65.6 24.6l-3.2 2.8 19.5 15.2c7 5.4 8.2 15.5 2.8 22.5s-15.5 8.2-22.5 2.8l-24.4-19-37-28.8z"/>
          </svg>
        </span>
        <span>${state.localizedServiceName}</span>
      `;
      titleContent.appendChild(serviceDiv);
      titleContent.appendChild(providerDiv);
      
      calendarTitle.appendChild(titleContent);
      
      // Calendar navigation section (remains unchanged)
      const calendarNav = document.createElement("div");
      calendarNav.className = "calendar-nav";
      const currentDateEl = document.createElement("div");
      currentDateEl.className = "current-date";
      currentDateEl.textContent = dateFormatter.format(state.currentDate);
      currentDateEl.style.cssText = "background: #F8EAFA; padding: 6px 14px; border-radius: 20px; font-weight: 500; color: #9C27B0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.3s;";
      
      const prevBtn = document.createElement("button");
      prevBtn.className = "nav-btn prev-btn";
      prevBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      prevBtn.addEventListener("click", () => {
        if (!state.isConfirmed) {
          state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 1);
          renderCalendar();
        }
      });
      
      const nextBtn = document.createElement("button");
      nextBtn.className = "nav-btn next-btn";
      nextBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      nextBtn.addEventListener("click", () => {
        if (!state.isConfirmed) {
          state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 1);
          renderCalendar();
        }
      });
      
      calendarNav.appendChild(currentDateEl);
      calendarNav.appendChild(prevBtn);
      calendarNav.appendChild(nextBtn);
      
      header.appendChild(calendarTitle);
      header.appendChild(calendarNav);
      
      return header;
    }
       
    async function renderCalendarDays() {
      const daysContainer = document.createElement("div");
      daysContainer.className = "days-container";
      const weekdaysDiv = document.createElement("div");
      weekdaysDiv.className = "weekdays";
      const weekdays = getText("weekdays");
      weekdays.forEach(day => {
        const dayEl = document.createElement("div");
        dayEl.textContent = day;
        weekdaysDiv.appendChild(dayEl);
      });
      daysContainer.appendChild(weekdaysDiv);
      const daysDiv = document.createElement("div");
      daysDiv.className = "days";
      let daysToShow = [];
      const firstDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 1);
      const daysFromPrevMonth = firstDay.getDay();
      const lastDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 0);
      const totalDays = lastDay.getDate();
      for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
        const day = new Date(firstDay);
        day.setDate(day.getDate() - i - 1);
        daysToShow.push({ date: day, inactive: true });
      }
      for (let i = 1; i <= totalDays; i++) {
        const day = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), i);
        daysToShow.push({ date: day, inactive: false });
      }
      const remainingDays = 42 - daysToShow.length;
      for (let i = 1; i <= remainingDays; i++) {
        const day = new Date(lastDay);
        day.setDate(day.getDate() + i);
        daysToShow.push({ date: day, inactive: true });
      }
      const highlightDay = state.selectedDate || getDefaultActiveDay();
      daysToShow.forEach(({ date, inactive }) => {
        const dayEl = document.createElement("div");
        dayEl.className = "day";
        dayEl.textContent = date.getDate();
        if (inactive) {
          dayEl.classList.add("inactive");
        } else {
          const dayOfWeek = date.getDay();
          if (!state.workingDays.includes(dayOfWeek)) {
            dayEl.classList.add("inactive");
          } else {
            const todayMidnight = new Date();
            todayMidnight.setHours(0, 0, 0, 0);
            if (date < todayMidnight) {
              dayEl.classList.add("inactive");
            } else {
              if (formatDate(date) === formatDate(highlightDay)) {
                dayEl.classList.add("today");
              }
              if (state.selectedDate && isSameDay(date, state.selectedDate)) {
                dayEl.classList.add("active");
              }
              dayEl.classList.add("available");
              dayEl.addEventListener("click", async () => {
                state.selectedDate = new Date(date);
                state.selectedTime = null;
                const slots = await fetchAvailableSlots(formatDate(date));
                state.availableSlots[formatDate(date)] = slots;
                renderCalendar();
              });
            }
          }
        }
        daysDiv.appendChild(dayEl);
      });
      daysContainer.appendChild(daysDiv);
      return daysContainer;
    }

    async function renderTimeSlots() {
      const timesContainer = document.createElement("div");
      timesContainer.className = "times-container";
      const timeHeader = document.createElement("div");
      timeHeader.className = "time-header";
      if (state.selectedDate) {
        const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric" });
        timeHeader.textContent = `${getText("availableTimesFor")} ${dateFormatter.format(state.selectedDate)}`;
      } else {
        timeHeader.innerHTML = `<span style="display: inline-block; animation: pulse 2s infinite ease-in-out;">${getText("selectDate")}</span>`;
      }
      timesContainer.appendChild(timeHeader);
      const timeSlotsDiv = document.createElement("div");
      timeSlotsDiv.className = "time-slots";
      if (state.selectedDate) {
        const dateKey = formatDate(state.selectedDate);
        const timeSlots = state.availableSlots[dateKey] || [];
        if (timeSlots.length === 0) {
          const noSlots = document.createElement("div");
          noSlots.textContent = getText("noAvailableSlots");
          noSlots.style.textAlign = "center";
          noSlots.style.padding = "20px 0";
          noSlots.style.color = "#666";
          timeSlotsDiv.appendChild(noSlots);
        } else {
          const columnsContainer = document.createElement("div");
          columnsContainer.className = "time-slots-columns";
          const amColumn = document.createElement("div");
          amColumn.className = "time-slots-column";
          const pmColumn = document.createElement("div");
          pmColumn.className = "time-slots-column";
          const amHeader = document.createElement("div");
          amHeader.textContent = "AM";
          amHeader.style.fontWeight = "bold";
          amHeader.style.marginBottom = "5px";
          amColumn.appendChild(amHeader);
          const pmHeader = document.createElement("div");
          pmHeader.textContent = "PM";
          pmHeader.style.fontWeight = "bold";
          pmHeader.style.marginBottom = "5px";
          pmColumn.appendChild(pmHeader);
          timeSlots.forEach((timeISO, index) => {
            const dateTime = new Date(timeISO);
            const hours = dateTime.getHours();
            const timeSlot = document.createElement("div");
            timeSlot.className = "time-slot available";
            timeSlot.style.animation = `slideIn ${0.2 + index * 0.1}s ease-out forwards`;
            if (state.selectedTime === timeISO) {
              timeSlot.classList.add("selected");
            }
            const timeFormatter = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", hour12: true });
            timeSlot.textContent = timeFormatter.format(dateTime);
            timeSlot.addEventListener("click", () => {
              if (!state.isConfirmed) {
                state.selectedTime = timeISO;
                renderCalendar();
              }
            });
            if (hours < 12) {
              amColumn.appendChild(timeSlot);
            } else {
              pmColumn.appendChild(timeSlot);
            }
          });
          columnsContainer.appendChild(amColumn);
          columnsContainer.appendChild(pmColumn);
          timeSlotsDiv.appendChild(columnsContainer);
        }
      } else {
        const noDate = document.createElement("div");
        noDate.textContent = getText("pleaseSelectDate");
        noDate.style.textAlign = "center";
        noDate.style.padding = "20px 0";
        noDate.style.color = "#666";
        timeSlotsDiv.appendChild(noDate);
      }
      timesContainer.appendChild(timeSlotsDiv);
      return timesContainer;
    }

    function renderFooter() {
      const footer = document.createElement("div");
      footer.className = "calendar-footer";
      const confirmBtn = document.createElement("button");
      confirmBtn.className = "action-btn confirm-btn";
      
      if (state.isConfirmed) {
        const isEnglish = locale === "en-US";
        confirmBtn.textContent = isEnglish ? "Booked ✓" : "Réservée ✓";
        confirmBtn.style.backgroundImage = "none";
        confirmBtn.style.backgroundColor = "#4CAF50";
        confirmBtn.style.color = "white";
        confirmBtn.disabled = true;
      } else {
        confirmBtn.textContent = getText("confirmBooking");
        if (!state.selectedDate || !state.selectedTime) { 
          confirmBtn.disabled = true; 
        }
        
        confirmBtn.addEventListener("click", async () => {
          if (state.selectedDate && state.selectedTime) {
            // Show loading state
            confirmBtn.disabled = true;
            confirmBtn.textContent = getText('confirmBooking') + '...';
            
            try {
              // 1. First completes the booking with Cal.com
              const bookingResponse = await createBooking(state.selectedTime);
              
              if (bookingResponse) {
                // 2. Then updates the UI to show confirmation
                state.isConfirmed = true;
                renderCalendar();
                
                // 3. Finally shows the success animation
                const successOverlay = document.createElement('div');
                successOverlay.style.cssText = `
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(156, 39, 176, 0.05);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  z-index: 1000;
                  opacity: 0;
                  transition: opacity 0.5s;
                  pointer-events: none;
                `;
                
                const successMessage = document.createElement('div');
                successMessage.style.cssText = `
                  background-color: white;
                  border-radius: 15px;
                  padding: 20px 30px;
                  box-shadow: 0 10px 30px rgba(156, 39, 176, 0.15);
                  text-align: center;
                  transform: translateY(20px);
                  transition: transform 0.5s, opacity 0.5s;
                  opacity: 0;
                `;
                
                const checkmark = document.createElement('div');
                checkmark.innerHTML = `
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="30" fill="#F8EAFA"/>
                    <path d="M20 30L27 37L40 23" stroke="#9C27B0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                `;
                
                successMessage.appendChild(checkmark);
                const successText = document.createElement('p');
                successText.textContent = getText('bookingConfirmed') + '!';
                successText.style.cssText = `
                  font-size: 18px;
                  font-weight: 600;
                  margin-top: 15px;
                  color: #9C27B0;
                `;
                successMessage.appendChild(successText);
                successOverlay.appendChild(successMessage);
                calendarContainer.appendChild(successOverlay);
                
                // Animation sequence
                setTimeout(() => {
                  successOverlay.style.opacity = '1';
                  successMessage.style.opacity = '1';
                  successMessage.style.transform = 'translateY(0)';
                  
                  setTimeout(() => {
                    // Start hiding animation
                    successOverlay.style.opacity = '0';
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                      // Remove overlay after animation completes
                      calendarContainer.removeChild(successOverlay);
                      
                      // 4. FINALLY - Send data to Voiceflow (LAST STEP)
                      const dateStr = formatDate(state.selectedDate);
                      const timeFormatter = new Intl.DateTimeFormat(locale, { 
                        hour: 'numeric', 
                        minute: '2-digit', 
                        hour12: true 
                      });
                      const formattedDate = new Intl.DateTimeFormat(locale, { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }).format(state.selectedDate);
                      const formattedTime = new Intl.DateTimeFormat(locale, { 
                        hour: 'numeric', 
                        minute: '2-digit', 
                        hour12: true 
                      }).format(new Date(state.selectedTime));
                      const formattedDateTime = `${formattedDate} ${language === "fr" ? "à" : "at"} ${formattedTime}`;

                      const formData = { 
                        fullName,
                        email,
                        dentist: state.selectedDentist,
                        date: dateStr,
                        time: state.selectedTime,
                        formattedDate,
                        formattedTime,
                        formattedDateTime,
                        service: state.localizedServiceName
                      };
                      
                      if (window.voiceflow && window.voiceflow.chat) {
                        window.voiceflow.chat.interact({
                          type: "complete",
                          payload: formData
                        });
                      } else {
                        console.log("Form submitted:", formData);
                      }
                    }, 500); // End of hide animation
                  }, 2500); // Show duration before hiding
                }, 100); // Start of show animation
              }
            } catch (err) {
              console.error("Booking error:", err);
              confirmBtn.disabled = false;
              confirmBtn.textContent = getText("confirmBooking");
              showErrorMessage(err.message || "Unable to complete booking. Please try again.");
            }
          }
        });
      }
      
      footer.appendChild(confirmBtn);
      return footer;
    }

    async function renderCalendar() {
      calendarContainer.innerHTML = "";
      if (state.isConfirmed) {
        calendarContainer.classList.add("confirmed");
      } else {
        calendarContainer.classList.remove("confirmed");
      }
      
      // Add the dentist selector if we have dentist data
      const dentistSelector = renderDentistSelector();
      if (dentistSelector) {
        calendarContainer.appendChild(dentistSelector);
      }
      
      calendarContainer.appendChild(renderHeader());
      const calendarBody = document.createElement("div");
      calendarBody.className = "calendar-body";
      calendarBody.appendChild(await renderCalendarDays());
      calendarBody.appendChild(await renderTimeSlots());
      calendarContainer.appendChild(calendarBody);
      calendarContainer.appendChild(renderFooter());
      shadow.innerHTML = "";
      shadow.appendChild(style);
      shadow.appendChild(calendarContainer);
    }

    // Initialize the working days for the current selected dentist
    state.workingDays = await fetchWorkingDays();

    const calendarContainer = document.createElement("div");
    calendarContainer.className = "calendar-container";
    renderCalendar();
    element.appendChild(container);
    window.addEventListener("resize", () => {
      container.style.width = window.innerWidth <= 768 ? "100%" : "800px";
    });
  }
};

    
const BookingInformationExtension = {
      name: "BookingInformation",
      type: "response",
      match: ({ trace }) => trace.type === `ext_booking_inf` || trace.payload?.name === `ext_booking_inf`,
      render: ({ trace, element }) => {
        const { language } = trace.payload || { language: 'FR' };
        const isEnglish = language === 'en';
        
		 let formTimeoutId = null;
let isFormSubmitted = false;
const TIMEOUT_DURATION = 300000; // 15 minutes in milliseconds
        
        // Create the form
        const formContainer = document.createElement("form");
        formContainer.setAttribute("novalidate", "true");
        formContainer.innerHTML = `
		<style>
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
      gap: 15px;
      width: 100%;
      max-width: 800px;      
      min-width: 400px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 6px;
    }
    .bold-label {
      font-weight: 600;
      color: #000;
      font-size: 14px;
      margin-bottom: 8px;
      display: block;
    }
    input[type="text"],
    input[type="email"],
    input[type="tel"] {
      width: 100%;
      min-width: 200px;
      max-width: 800px;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 6px;
      padding: 12px 15px;
      background: #fff;
      font-size: 16px;
      outline: none;
      box-sizing: border-box;
      height: 50px;
    }
    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="tel"]:focus {
      border: 2px solid #9c27b0;
    }
    
    /* ========== Buttons ========== */
    .submit-btn {
      color: #9c27b0;
      background-color: #F8EAFA;
      border: none;
      padding: 15px;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
      transition: background-color 0.2s, color 0.2s;
      width: 100%;
      font-weight: 600;
    }
    .submit-btn:hover {
      color: #fff;
      background-color: #9c27b0;
    }
    .submit-btn:disabled {
      background-color: #4CAF50;
      color: white;
      cursor: not-allowed;
    }
    
    /* Disabled state - preserve pointer-events to allow cursor display */
    .form-disabled input {
      background-color: #f8f8f8;
      opacity: 0.8;
      cursor: not-allowed;
    }
    
    /* Add not-allowed cursor to all disabled elements */
    input:disabled, 
    button:disabled {
      cursor: not-allowed;
    }
  </style>
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
          
          <button type="button" class="submit-btn" id="submit-button">
            ${isEnglish ? 'Submit' : 'Soumettre'}
          </button>
        `;

        element.appendChild(formContainer);
		
		function startFormTimer() {
  let timeLeft = TIMEOUT_DURATION;
  
  // Just set the timeout - no display updates needed
  formTimeoutId = setInterval(() => {
    timeLeft -= 1000;
    
    if (timeLeft <= 0) {
      clearInterval(formTimeoutId);
      if (!isFormSubmitted) {
        handleFormTimeout();
      }
    }
  }, 1000);
}

function handleFormTimeout() {
  // Apply disabled styling
  formContainer.classList.add('form-disabled');
  
  // Disable all form inputs
  formContainer.querySelector("#full-name").disabled = true;
  formContainer.querySelector("#email").disabled = true;
  formContainer.querySelector("#phone").disabled = true;
  
  // Disable the dropdown
  formContainer.querySelector("#selectDisplayAgent").classList.add('dropdown-disabled');
  
  // Update button state
  const submitButton = formContainer.querySelector("#submit-button");
  submitButton.disabled = true;
  submitButton.textContent = isEnglish ? "Time Expired" : "Temps expiré";
  submitButton.style.backgroundColor = "#f44336";
  submitButton.style.color = "white";
  
  window.voiceflow.chat.interact({
    type: "timeEnd",
    payload: {
      message: "Time expired"
    }
  });
}


        // Input validation
        formContainer.querySelector("#full-name").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorFullName").style.display = "none";
        });
        
        formContainer.querySelector("#email").addEventListener("input", function() {
          if (isValidEmail(this.value.trim())) formContainer.querySelector("#errorEmail").style.display = "none";
        });
        
        formContainer.querySelector("#phone").addEventListener("input", function() {
          if (isValidPhoneNumber(this.value.trim())) formContainer.querySelector("#errorPhone").style.display = "none";
        });
        
        // Form submission
        formContainer.querySelector("#submit-button").addEventListener("click", () => {
          // Hide all error messages first
          formContainer.querySelectorAll(".error-message").forEach(errorEl => {
            errorEl.style.display = "none";
          });
          
          // Validate inputs
          const fullName = formContainer.querySelector("#full-name").value.trim();
          const email = formContainer.querySelector("#email").value.trim();
          const phone = formContainer.querySelector("#phone").value.trim();
          let isValid = true;
          
          if (!fullName) {
            formContainer.querySelector("#errorFullName").style.display = "flex";
            isValid = false;
          }
          
          if (!email || !isValidEmail(email)) {
            formContainer.querySelector("#errorEmail").style.display = "flex";
            isValid = false;
          }
          
          if (!phone || !isValidPhoneNumber(phone)) {
            formContainer.querySelector("#errorPhone").style.display = "flex";
            isValid = false;
          }
          
          if (!isValid) {
            return;
          }
		  
		   isFormSubmitted = true;
  if (formTimeoutId) {
    clearInterval(formTimeoutId);
  }
          
          // Apply disabled styling but don't prevent pointer events
          formContainer.classList.add('form-disabled');
          
          // Explicitly disable all input elements and buttons
          // This sets the disabled attribute but still allows cursor effects
          const inputs = formContainer.querySelectorAll('input');
          inputs.forEach(input => {
            input.disabled = true;
            input.style.cursor = svgDataUrl;
          });
          
          const submitButton = formContainer.querySelector("#submit-button");
          submitButton.disabled = true;
          submitButton.style.cursor = svgDataUrl;
          submitButton.textContent = isEnglish ? "Processing..." : "Traitement...";
          
          // Prepare form data
          const formData = {
            fullName,
            email,
            phone: formatPhoneNumber(phone)
          };
          
          // If Voiceflow integration is needed
          if (window.voiceflow && window.voiceflow.chat) {
            window.voiceflow.chat.interact({
              type: "complete",
              payload: {
            fullName,
            email,
            phone: formatPhoneNumber(phone)
          }
            });
          } else {
            console.log("Form submitted:", formData);
          }
        });
		startFormTimer();      
      }
    };


       const RescheduleCalendarExtension = {
      name: 'RescheduleCalendar',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'ext_reschedule_calendar' || trace.payload?.name === 'ext_reschedule_calendar',
      render: async ({ trace, element }) => {
        // --- Extract required payload values with fallbacks ---
        const {
          email = "john@example.com",
  serviceProvider = "Dr. Sophie Martin", // Add this line
  serviceName = "Nettoyage et Examen Dentaire", // Add this line
          apiKey = "",
            startTime = "4/11/2025, 3:00:00 PM", // Add this line for the current appointment

          scheduleId = "",
          eventTypeId = "1",
          eventTypeSlug = "default-event",
          slots = {},
          selectedDate = '', 
          selectedTime = '',
          language = 'en',
          timezone = 'America/Toronto',
          uid = ""                // UID for rescheduling
        } = trace.payload || {};
		
		let formTimeoutId = null;
let isFormSubmitted = false;
const TIMEOUT_DURATION = 300000; // 15 minutes in milliseconds

        const locale = language === 'fr' ? 'fr-CA' : 'en-US';
        const highlightColor = '#9C27B0';

        // Create a container and attach a shadow DOM for encapsulated styling.
        const container = document.createElement("div");
        container.style.width = window.innerWidth <= 768 ? "100%" : "800px";
        container.style.maxWidth = "800px";
        container.style.margin = "0 auto";
        const shadow = container.attachShadow({ mode: 'open' });

        // Build CSS with direct values (no CSS variables)
        const style = document.createElement("style");
        style.textContent = `
       @keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
.calendar-container {
  font-family: "Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 10px 25px rgba(156, 39, 176, 0.15);
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  color: #333;
  animation: fadeIn 0.3s ease-out forwards;
  border: 1px solid #eaeaea;
  transition: all 0.3s ease;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background-color: #faf7fc;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  position: relative;
}
.calendar-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #9C27B0, transparent);
  opacity: 0.5;
}
.calendar-title {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-size: 16px;
  background: transparent;
  -webkit-text-fill-color: initial;
}
.calendar-title-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.service-provider, .service-name {
  display: flex;
  align-items: center; 
  height: 24px;
  font-size: 16px;
  color: #9C27B0;
  margin: 3px 0;
  line-height: 24px;
  font-weight: 650;
}


.provider-icon, .service-icon, .appointment-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
.provider-icon svg, .service-icon svg,  .appointment-icon svg{
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
}
.calendar-nav {
  display: flex;
  align-items: center;
  gap: 15px;
}
.nav-btn {
  background: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: #9C27B0;
}
.nav-btn:hover {
  background-color: #F8EAFA;
  box-shadow: 0 3px 10px rgba(156, 39, 176, 0.15);
}
.current-date {
  font-weight: 600;
  font-size: 17px;
  background: #F8EAFA;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 500;
  color: #9C27B0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s;
}
.calendar-body {
  display: flex;
  height: 400px;
  background: linear-gradient(to bottom, #ffffff, #fefeff);
}
.days-container {
  width: 47%;
  padding: 15px 10px;
  position: relative;
  background-image: linear-gradient(
      rgba(156, 39, 176, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(156, 39, 176, 0.03) 1px, transparent 1px);
  background-size: 25px 25px;
  background-position: -1px -1px;
}
.calendar-container::before {
  content: "";
  position: absolute;
  top: -3px;
  left: 10%;
  right: 10%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #9C27B0, transparent);
  border-radius: 3px;
  opacity: 0.7;
}
.days-container::after {
  content: "";
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 80px;
  height: 80px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='80' height='80'%3E%3Cpath d='M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z' fill='rgba(156, 39, 176, 0.03)'/%3E%3C/svg%3E");
  opacity: 0.6;
}
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
  font-size: 13px;
  padding: 15px 0 10px;
  color: #666;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 5px;
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  padding: 5px;
}
.day {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  margin: 0 auto;
  border: 1px solid transparent;
  border-radius: 50%;
  z-index: 1;
}
.day:not(.inactive)::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  z-index: -1;
}
.day:hover:not(.inactive)::before {
  background-color: #F8EAFA;
}
.day:hover:not(.inactive) {
  color: #9C27B0;
  border: 2px solid #9C27B0;
  font-weight: 500;
}
.day.available {
  position: relative;
}
.day.available::after {
  content: "";
  position: absolute;
  bottom: 3px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #9C27B0;
  opacity: 0.7;
  animation: fadeIn 0.3s ease forwards;
}
.day.today {
  border: 1.5px solid #9C27B0;
  position: relative;
  box-shadow: 0 0 0 1px rgba(156, 39, 176, 0.1);
}
.day.today::after {
  content: "";
  position: absolute;
  bottom: 4px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #9C27B0;
}
.day.active {
  background-color: #9C27B0;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(156, 39, 176, 0.15);
}
.day.active::after {
  display: none;
}
.day.inactive {
  color: #ccc;
  cursor: default;
  opacity: 0.7;
}
.times-container {
  width: 53%;
  border-left: 1px solid #eaeaea;
  padding: 20px 10px;
  overflow-y: auto;
  background-color: #fefeff;
  position: relative;
}
.times-container::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(to bottom, #9C27B0, transparent);
  opacity: 0.1;
}
.time-header {
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
  color: #9C27B0;
  padding: 0 5px;
  line-height: 1.4;
  position: relative;
}
.time-header::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background-color: #9C27B0;
  opacity: 0.5;
  border-radius: 3px;
}
.time-slots {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 5px;
}
.time-slots-columns {
  display: flex;
  gap: 20px;
}
.time-slots-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.times-container::-webkit-scrollbar {
  width: 6px;
}
.times-container::-webkit-scrollbar-track {
  background: rgba(156, 39, 176, 0.05);
  border-radius: 10px;
}
.times-container::-webkit-scrollbar-thumb {
  background: rgba(156, 39, 176, 0.2);
  border-radius: 10px;
}
.times-container::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 39, 176, 0.3);
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.time-slot {
  padding: 14px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  border: 1px solid #e0e0e0;
  font-size: 14px;
  background-color: white;
  color: #444;
  position: relative;
  overflow: hidden;
  transform-origin: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.time-slot::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, #F8EAFA, transparent);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s;
}
.time-slot.available {
  background-color: white;
}
.time-slot.unavailable {
  background-color: #f4f4f5;
  color: #999;
  cursor: not-allowed;
  opacity: 0.7;
}
.time-slot.selected {
  background-color: #9C27B0;
  color: white;
  border-color: #9C27B0;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
  z-index: 5;
}
.time-slot.selected::after {
  content: "";
  position: absolute;
  right: 16px;
  font-size: 14px;
  opacity: 0.9;
}
.time-slot.available:hover:not(.selected) {
  background-color: #F8EAFA;
  color: #9C27B0;
  border: 2px solid #9C27B0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.07);
}
.time-slot.available:hover:not(.selected)::before {
  opacity: 0.6;
  animation: shimmer 1.5s infinite;
}
.calendar-container.confirmed .day,
.calendar-container.confirmed .time-slot {
  pointer-events: none;
  cursor: default;
}
.calendar-container.confirmed .nav-btn {
  pointer-events: none;
  opacity: 0.5;
  cursor: default;
}
.calendar-footer {
  padding: 15px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #eaeaea;
}
.action-btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 14px;
}
.confirm-btn {
  background: #F8EAFA;
  color: #9C27B0;
  font-weight: 600;
  border-radius: 10px;
  padding: 12px 24px;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}
.confirm-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: translateX(-100%);
}
.confirm-btn:hover:not(:disabled) {
  background: #9C27B0;
  color: white;
  box-shadow: 0 6px 18px rgba(156, 39, 176, 0.15);
}
.confirm-btn:hover:not(:disabled)::before {
  animation: shimmer 1.5s infinite;
}
.confirm-btn:active:not(:disabled) {
  box-shadow: 0 2px 10px rgba(156, 39, 176, 0.15);
}
.confirm-btn:disabled {
  cursor: not-allowed;
  box-shadow: none;
}
.cancel-btn {
  background-color: white;
  color: #333;
  border: 1px solid #eaeaea;
  margin-right: 10px;
}
.cancel-btn:hover {
  background-color: #f5f5f5;
}
.toggle-view {
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  display: flex;
  overflow: hidden;
}
.toggle-btn {
  padding: 8px 12px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}
.toggle-btn.active {
  background-color: #9C27B0;
  color: white;
}

@media (max-width: 768px) {
  .calendar-body {
    flex-direction: column;
    height: auto;
  }
  .days-container,
  .times-container {
    width: 100%;
  }
  .times-container {
    border-left: none;
    border-top: 1px solid #eaeaea;
    max-height: 250px;
  }
  .day {
    height: 40px;
    width: 40px;
    font-size: 13px;
  }
  .nav-btn {
    width: 36px;
    height: 36px;
  }
  .time-header {
    font-size: 15px;
  }
  .action-btn {
    padding: 10px 18px;
    font-size: 14px;
  }
  .service-provider,
  .service-name {
    font-size: 14px;
  }
  @keyframes mobileShimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  .confirm-btn:hover:not(:disabled)::before {
    animation: mobileShimmer 2s infinite;
  }
}
          
          
          .reschedule-reason {
            display: flex;
            flex-direction: column;
            padding: 20px;
            border-top: 1px solid #eaeaea;
            background-color: #fafafa;
          }
          .reschedule-reason label {
            font-size: 14px;
            margin-bottom: 6px;
            font-weight: 600;
            color: #555;
          }
          .reschedule-reason textarea {
            resize: vertical;
            padding: 10px;
            font-size: 14px;
            border-radius: 6px;
            border: 1px solid #ccc;
            font-family: inherit;
            min-height: 60px;
          }
          .reschedule-reason textarea:focus {
            border: 2px solid ${highlightColor};
            outline: none;
          }
          .error-message {
            color: ${highlightColor};
            font-size: 13px;
            margin-top: 4px;
            display: none;
          }
          


.appointment-date {
  display: flex;
  align-items: center; 
  height: 24px;
  font-size: 16px;
  color: #7b7b7b;
  margin: 3px 0;
  line-height: 24px;
  font-weight: 500;
}



        `;
        shadow.appendChild(style);

        // ---------------------
        // API CALL FUNCTIONS
        // ---------------------
        async function fetchWorkingDays() {
          if (!apiKey || !scheduleId) return [1, 2, 3, 4, 5];
          try {
            const res = await fetch(`https://api.cal.com/v2/schedules/${scheduleId}`, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-06-11",
                "Content-Type": "application/json"
              }
            });
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();
            console.log("Schedule data:", data);
            const availability = data.data?.availability || [];
            const dayNameToNumber = {
              "Sunday": 0,
              "Monday": 1,
              "Tuesday": 2,
              "Wednesday": 3,
              "Thursday": 4,
              "Friday": 5,
              "Saturday": 6
            };
            const workingDaysSet = new Set();
            availability.forEach(item => {
              if (Array.isArray(item.days)) {
                item.days.forEach(dayName => {
                  const dayNum = dayNameToNumber[dayName];
                  if (dayNum !== undefined) {
                    workingDaysSet.add(dayNum);
                  }
                });
              }
            });
            return Array.from(workingDaysSet);
          } catch (err) {
            console.error("Error fetching schedule:", err);
            return [1, 2, 3, 4, 5];
          }
        }

        async function fetchAvailableSlots(selectedDateISO) {
          const start = new Date(selectedDateISO);
          start.setUTCHours(0, 0, 0, 0);
          const end = new Date(selectedDateISO);
          end.setUTCHours(23, 59, 59, 999);
          const url = `https://api.cal.com/v2/slots/available?startTime=${start.toISOString()}&endTime=${end.toISOString()}&eventTypeId=${eventTypeId}&eventTypeSlug=${eventTypeSlug}`;
          try {
            const res = await fetch(url, {
              method: 'GET',
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json"
              }
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const responseBody = await res.json();
            console.log("Available slots API response:", responseBody);
            if (!responseBody || typeof responseBody !== 'object') {
              throw new Error("Invalid or missing response body from the API");
            }
            if (responseBody.status !== "success") {
              throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            const slotsObj = responseBody.data?.slots || {};
            const slotsForDate = slotsObj[selectedDateISO] || [];
            return slotsForDate.map(slot => slot.time);
          } catch (err) {
            console.error("Error fetching available slots:", err);
            return [];
          }
        }

        // New function for rescheduling a booking using the UID.
        async function rescheduleBooking(startTimeISO, reason) {
          const url = `https://api.cal.com/v2/bookings/${uid}/reschedule`;
          const body = {
            rescheduledBy: email,
            reschedulingReason: reason,
            start: startTimeISO
          };
          try {
            const res = await fetch(url, {
              method: 'POST',
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            });
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status} ${JSON.stringify(await res.text())}`);
            }
            const responseBody = await res.json();
            if (responseBody.status && responseBody.status !== "success") {
              throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            return responseBody;
          } catch (err) {
            console.error("Error rescheduling booking:", err);
            throw err;
          }
        }
        

// Then add this function to format the date and time
function formatAppointmentDate(dateTimeString, language) {
  let date;
  
  // Parse the date string based on locale
  if (language === 'fr') {
    // For French format (DD/MM/YYYY)
    const parts = dateTimeString.split(/[/, :]/);
    if (parts.length >= 6) {
      // parts[0] = day, parts[1] = month (0-based), parts[2] = year
      date = new Date(parts[2], parts[1]-1, parts[0], parts[3], parts[4], parts[5]);
    } else {
      date = new Date(dateTimeString); // fallback
    }
  } else {
    // For English format
    date = new Date(dateTimeString);
  }
  
  // Format date with weekday, day, month, year
  const formatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  };
  
  let locale = language === 'fr' ? 'fr-FR' : 'en-US';
  const formatter = new Intl.DateTimeFormat(locale, formatOptions);
  let formattedDate = formatter.format(date);
  
  // Ensure proper connection string between date and time
  if (language === 'fr') {
    formattedDate = formattedDate.replace(' à ', ' à ');
  } else {
    formattedDate = formattedDate.replace(' at ', ' at ');
  }
  
  return formattedDate;
}

        // Function to show error messages to the user.
        function showErrorMessage(message) {
          const errorOverlay = document.createElement('div');
          errorOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          `;
          
          const errorMessage = document.createElement('div');
          errorMessage.style.cssText = `
            background-color: #fff0f0;
            border: 1px solid #ffdddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 80%;
          `;
          
          errorMessage.innerHTML = `
            <div style="color: #d32f2f; font-size: 24px; margin-bottom: 10px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="currentColor"/>
              </svg>
            </div>
            <p style="margin: 0; color: #333;">${message}</p>
            <button style="margin-top: 15px; background: #9C27B0; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">OK</button>
          `;
          
          errorOverlay.appendChild(errorMessage);
          calendarContainer.appendChild(errorOverlay);
          
          const closeButton = errorMessage.querySelector('button');
          closeButton.addEventListener('click', () => {
            calendarContainer.removeChild(errorOverlay);
            if (state.selectedDate) {
              const dateKey = formatDate(state.selectedDate);
              fetchAvailableSlots(dateKey).then(slots => {
                state.availableSlots[dateKey] = slots;
                renderCalendar();
              });
            }
          });
        }

        // ---------------------
        // EXTENSION INTERNAL STATE
        // ---------------------
        const state = {
          currentDate: new Date(),
          selectedDate: selectedDate ? new Date(selectedDate) : null,
          selectedTime: selectedTime || null,
          availableSlots: {},
          workingDays: await fetchWorkingDays(),
          isConfirmed: false,
          language: language || 'en',
          reason: "",
          isLoading: false
        };

        const translations = {
          en: {
            selectDateAndTime: "Select Date & Time",
            selectDate: "Select a date to view available times",
            pleaseSelectDate: "Please select a date first",
            availableTimesFor: "Available times for",
            noAvailableSlots: "No available time slots for this date",
            confirmReschedule: "Confirm Reschedule",
            rescheduleConfirmed: "Reschedule Confirmed",
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            reasonLabel: "Reason for rescheduling",
            pleaseProvideReason: "Please provide a reason for rescheduling",
            loading: "Processing..."
          },
          fr: {
            selectDateAndTime: "Sélectionner Date & Heure",
            selectDate: "Sélectionnez une date pour voir les horaires disponibles",
            pleaseSelectDate: "Veuillez d'abord sélectionner une date",
            availableTimesFor: "Horaires disponibles pour",
            noAvailableSlots: "Aucun horaire disponible pour cette date",
            confirmReschedule: "Replanifier le rendez-vous",
            rescheduleConfirmed: "Rendez-vous replanifié",
            weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
            reasonLabel: "Raison de la replanification",
            pleaseProvideReason: "Veuillez fournir une raison pour la replanification",
            loading: "Traitement en cours..."
          }
        };

        function getDefaultActiveDay() {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (state.workingDays.includes(today.getDay())) {
            return today;
          }
          const next = new Date(today);
          while (!state.workingDays.includes(next.getDay())) {
            next.setDate(next.getDate() + 1);
          }
          return next;
        }

        function getText(key) {
          const lang = translations[state.language] ? state.language : 'en';
          return translations[lang][key] || key;
        }

        function formatDate(date) {
          const d = new Date(date);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }

        function isSameDay(date1, date2) {
          if (!date1 || !date2) return false;
          return formatDate(date1) === formatDate(date2);
        }

        function isToday(date) {
          const now = new Date();
          return isSameDay(date, now);
        }

        if (!state.selectedDate) {
          const defaultDay = getDefaultActiveDay();
          state.selectedDate = defaultDay;
          const dayKey = formatDate(defaultDay);
          const defaultSlots = await fetchAvailableSlots(dayKey);
          state.availableSlots[dayKey] = defaultSlots;
        }

function renderHeader() {
  const header = document.createElement("div");
  header.className = "calendar-header";
  const dateFormatter = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  
  // Create calendar title with provider and service info
  const calendarTitle = document.createElement("div");
  calendarTitle.className = "calendar-title";
  
  // Provider and service information section
  const titleContent = document.createElement("div");
  titleContent.className = "calendar-title-content";
  
  const providerDiv = document.createElement("div");
  providerDiv.className = "service-provider";
  providerDiv.innerHTML = `
    <span class="provider-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18px" height="18px">
      <path fill="#9C27B0" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 256l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16L80 384c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
      </svg>
    </span>
    <span>${serviceProvider}</span>
  `;
  
  const serviceDiv = document.createElement("div");
  serviceDiv.className = "service-name";
  serviceDiv.innerHTML = `
    <span class="service-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
        <path fill="#9C27B0" d="M186.1 52.1C169.3 39.1 148.7 32 127.5 32C74.7 32 32 74.7 32 127.5l0 6.2c0 15.8 3.7 31.3 10.7 45.5l23.5 47.1c4.5 8.9 7.6 18.4 9.4 28.2l36.7 205.8c2 11.2 11.6 19.4 22.9 19.8s21.4-7.4 24-18.4l28.9-121.3C192.2 323.7 207 312 224 312s31.8 11.7 35.8 28.3l28.9 121.3c2.6 11.1 12.7 18.8 24 18.4s20.9-8.6 22.9-19.8l36.7-205.8c1.8-9.8 4.9-19.3 9.4-28.2l23.5-47.1c7.1-14.1 10.7-29.7 10.7-45.5l0-2.1c0-55-44.6-99.6-99.6-99.6c-24.1 0-47.4 8.8-65.6 24.6l-3.2 2.8 19.5 15.2c7 5.4 8.2 15.5 2.8 22.5s-15.5 8.2-22.5 2.8l-24.4-19-37-28.8z"/>
      </svg>
    </span>
    <span>${serviceName}</span>
  `;

  const appointmentDateDiv = document.createElement("div");
  appointmentDateDiv.className = "appointment-date";
  
  // Add calendar icon - using a different name here to avoid conflict
  const dateIcon = document.createElement("span");
  dateIcon.className = "appointment-icon";
  dateIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
      <path fill="#7b7b7b" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
    </svg>
  `;
  
  // Add the formatted date text
  const dateTextSpan = document.createElement("span");
  dateTextSpan.textContent = formatAppointmentDate(startTime, language);
  
  // Append both to the appointment div
  appointmentDateDiv.appendChild(dateIcon);
  appointmentDateDiv.appendChild(dateTextSpan);
  
  // Add to title content
  titleContent.appendChild(providerDiv);
  titleContent.appendChild(serviceDiv);
  titleContent.appendChild(appointmentDateDiv);
  
  calendarTitle.appendChild(titleContent);
  
  // Calendar navigation section (remains unchanged)
  const calendarNav = document.createElement("div");
  calendarNav.className = "calendar-nav";
  const currentDateEl = document.createElement("div");
  currentDateEl.className = "current-date";
  currentDateEl.textContent = dateFormatter.format(state.currentDate);
  currentDateEl.style.cssText = "background: #F8EAFA; padding: 6px 14px; border-radius: 20px; font-weight: 500; color: #9C27B0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.3s;";
  
  const prevBtn = document.createElement("button");
  prevBtn.className = "nav-btn prev-btn";
  prevBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  prevBtn.addEventListener("click", () => {
    if (!state.isConfirmed) {
      state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 1);
      renderCalendar();
    }
  });
  
  const nextBtn = document.createElement("button");
  nextBtn.className = "nav-btn next-btn";
  nextBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  nextBtn.addEventListener("click", () => {
    if (!state.isConfirmed) {
      state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 1);
      renderCalendar();
    }
  });
  
  calendarNav.appendChild(currentDateEl);
  calendarNav.appendChild(prevBtn);
  calendarNav.appendChild(nextBtn);
  
  header.appendChild(calendarTitle);
  header.appendChild(calendarNav);
  
  return header;
}
   
        async function renderCalendarDays() {
          const daysContainer = document.createElement("div");
          daysContainer.className = "days-container";
          const weekdaysDiv = document.createElement("div");
          weekdaysDiv.className = "weekdays";
          const weekdays = getText('weekdays');
          weekdays.forEach(day => {
            const dayEl = document.createElement("div");
            dayEl.textContent = day;
            weekdaysDiv.appendChild(dayEl);
          });
          daysContainer.appendChild(weekdaysDiv);
          const daysDiv = document.createElement("div");
          daysDiv.className = "days";
          let daysToShow = [];
          const firstDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 1);
          const daysFromPrevMonth = firstDay.getDay();
          const lastDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 0);
          const totalDays = lastDay.getDate();
          for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
            const day = new Date(firstDay);
            day.setDate(day.getDate() - i - 1);
            daysToShow.push({ date: day, inactive: true });
          }
          for (let i = 1; i <= totalDays; i++) {
            const day = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), i);
            daysToShow.push({ date: day, inactive: false });
          }
          const remainingDays = 42 - daysToShow.length;
          for (let i = 1; i <= remainingDays; i++) {
            const day = new Date(lastDay);
            day.setDate(day.getDate() + i);
            daysToShow.push({ date: day, inactive: true });
          }
          const highlightDay = state.selectedDate || getDefaultActiveDay();
          daysToShow.forEach(({ date, inactive }) => {
            const dayEl = document.createElement("div");
            dayEl.className = "day";
            dayEl.textContent = date.getDate();
            if (inactive) {
              dayEl.classList.add("inactive");
            } else {
              const dayOfWeek = date.getDay();
              if (!state.workingDays.includes(dayOfWeek)) {
                dayEl.classList.add("inactive");
              } else {
                const todayMidnight = new Date();
                todayMidnight.setHours(0, 0, 0, 0);
                if (date < todayMidnight) {
                  dayEl.classList.add("inactive");
                } else {
                  if (formatDate(date) === formatDate(highlightDay)) {
                    dayEl.classList.add("today");
                  }
                  if (state.selectedDate && isSameDay(date, state.selectedDate)) {
                    dayEl.classList.add("active");
                  }
                  dayEl.classList.add("available");
                  dayEl.addEventListener("click", async () => {
                    state.selectedDate = new Date(date);
                    state.selectedTime = null;
                    const slots = await fetchAvailableSlots(formatDate(date));
                    state.availableSlots[formatDate(date)] = slots;
                    renderCalendar();
                  });
                }
              }
            }
            daysDiv.appendChild(dayEl);
          });
          daysContainer.appendChild(daysDiv);
          return daysContainer;
        }

        async function renderTimeSlots() {
          const timesContainer = document.createElement("div");
          timesContainer.className = "times-container";
          const timeHeader = document.createElement("div");
          timeHeader.className = "time-header";
          if (state.selectedDate) {
            const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' });
            timeHeader.textContent = `${getText('availableTimesFor')} ${dateFormatter.format(state.selectedDate)}`;
          } else {
            timeHeader.innerHTML = `<span style="display: inline-block; animation: pulse 2s infinite ease-in-out;">${getText('selectDate')}</span>`;
          }
          timesContainer.appendChild(timeHeader);
          const timeSlotsDiv = document.createElement("div");
          timeSlotsDiv.className = "time-slots";
          if (state.selectedDate) {
            const dateKey = formatDate(state.selectedDate);
            const timeSlots = state.availableSlots[dateKey] || [];
            if (timeSlots.length === 0) {
              const noSlots = document.createElement("div");
              noSlots.textContent = getText('noAvailableSlots');
              noSlots.style.textAlign = "center";
              noSlots.style.padding = "20px 0";
              noSlots.style.color = "#666";
              timeSlotsDiv.appendChild(noSlots);
            } else {
              const columnsContainer = document.createElement("div");
              columnsContainer.className = "time-slots-columns";
              const amColumn = document.createElement("div");
              amColumn.className = "time-slots-column";
              const pmColumn = document.createElement("div");
              pmColumn.className = "time-slots-column";
              const amHeader = document.createElement("div");
              amHeader.textContent = "AM";
              amHeader.style.fontWeight = "bold";
              amHeader.style.marginBottom = "5px";
              amColumn.appendChild(amHeader);
              const pmHeader = document.createElement("div");
              pmHeader.textContent = "PM";
              pmHeader.style.fontWeight = "bold";
              pmHeader.style.marginBottom = "5px";
              pmColumn.appendChild(pmHeader);
              timeSlots.forEach((timeISO, index) => {
                const dateTime = new Date(timeISO);
                const hours = dateTime.getHours();
                const timeSlot = document.createElement("div");
                timeSlot.className = "time-slot available";
                timeSlot.style.animation = `slideIn ${0.2 + index * 0.1}s ease-out forwards`;
                if (state.selectedTime === timeISO) {
                  timeSlot.classList.add("selected");
                }
                const timeFormatter = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', hour12: true });
                timeSlot.textContent = timeFormatter.format(dateTime);
                timeSlot.addEventListener("click", () => {
                  if (!state.isConfirmed) {
                    state.selectedTime = timeISO;
                    renderCalendar();
                  }
                });
                if (hours < 12) {
                  amColumn.appendChild(timeSlot);
                } else {
                  pmColumn.appendChild(timeSlot);
                }
              });
              columnsContainer.appendChild(amColumn);
              columnsContainer.appendChild(pmColumn);
              timeSlotsDiv.appendChild(columnsContainer);
            }
          } else {
            const noDate = document.createElement("div");
            noDate.textContent = getText('pleaseSelectDate');
            noDate.style.textAlign = "center";
            noDate.style.padding = "20px 0";
            noDate.style.color = "#666";
            timeSlotsDiv.appendChild(noDate);
          }
          timesContainer.appendChild(timeSlotsDiv);
          return timesContainer;
        }

        function renderReasonSection() {
          const reasonDiv = document.createElement("div");
          reasonDiv.className = "reschedule-reason";
          
          const reasonLabel = document.createElement("label");
          reasonLabel.textContent = getText('reasonLabel');
          reasonDiv.appendChild(reasonLabel);
          
          const textarea = document.createElement("textarea");
		  textarea.id = "details";
          textarea.placeholder = (language === 'fr')
            ? "Pourquoi souhaitez-vous replanifier ce rendez-vous?"
            : "Why do you want to reschedule this appointment?";
          if (state.isConfirmed) {
            textarea.disabled = true;
          }
          textarea.addEventListener("input", (e) => { 
            state.reason = e.target.value; 
            const errorMessage = shadow.querySelector(".error-message");
            if (errorMessage) {
              errorMessage.style.display = "none";
              textarea.style.borderColor = "#ccc";
            }
          });
          reasonDiv.appendChild(textarea);
          
          const errorMessage = document.createElement("div");
          errorMessage.className = "error-message";
          errorMessage.textContent = getText('pleaseProvideReason');
          errorMessage.style.display = "none";
          reasonDiv.appendChild(errorMessage);
          
          return reasonDiv;
        }

        function renderFooter() {
          const footer = document.createElement("div");
          footer.className = "calendar-footer";
          const confirmBtn = document.createElement("button");
          confirmBtn.className = "action-btn confirm-btn";
          
          if (state.isConfirmed) {
            const isEnglish = locale === "en-US";
            confirmBtn.textContent = isEnglish ? "Rescheduled ✓" : "Replanifiée ✓";
            confirmBtn.style.backgroundImage = "none";
            confirmBtn.style.backgroundColor = "#4CAF50";
            confirmBtn.style.color = "white";
            confirmBtn.disabled = true;
          } else {
            confirmBtn.textContent = getText('confirmReschedule');
            confirmBtn.disabled = !state.selectedDate || !state.selectedTime || state.isLoading;
            
            confirmBtn.addEventListener("click", async () => {
              if (state.isConfirmed) return;
              
              const reasonText = state.reason.trim();
              if (!reasonText) {
                const textarea = shadow.querySelector(".reschedule-reason textarea");
                const errorMessage = shadow.querySelector(".error-message");
                errorMessage.style.display = "block";
                textarea.style.borderColor = highlightColor;
                return;
              }
              
              // Show loading state
              confirmBtn.disabled = true;
              confirmBtn.textContent = getText('loading');
              state.isLoading = true;
              
              try {
                // 1. First completes the rescheduling with Cal.com
                const rescheduleResponse = await rescheduleBooking(state.selectedTime, reasonText);
                
                if (rescheduleResponse) {
                  // 2. Then updates the UI to show confirmation
                  state.isConfirmed = true;
				   isFormSubmitted = true;
  if (formTimeoutId) {
    clearInterval(formTimeoutId);
  }
  
                  renderCalendar();
                  
                  // 3. Finally shows the success animation
                  const successOverlay = document.createElement('div');
                  successOverlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(156, 39, 176, 0.05);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.5s;
                    pointer-events: none;
                  `;
                  
                  const successMessage = document.createElement('div');
                  successMessage.style.cssText = `
                    background-color: white;
                    border-radius: 15px;
                    padding: 20px 30px;
                    box-shadow: 0 10px 30px rgba(156, 39, 176, 0.15);
                    text-align: center;
                    transform: translateY(20px);
                    transition: transform 0.5s, opacity 0.5s;
                    opacity: 0;
                  `;
                  
                  const checkmark = document.createElement('div');
                  checkmark.innerHTML = `
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="30" cy="30" r="30" fill="#F8EAFA"/>
                      <path d="M20 30L27 37L40 23" stroke="#9C27B0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  `;
                  
                  successMessage.appendChild(checkmark);
                  const successText = document.createElement('p');
                  successText.textContent = getText('rescheduleConfirmed') + '!';
                  successText.style.cssText = `
                    font-size: 18px;
                    font-weight: 600;
                    margin-top: 15px;
                    color: #9C27B0;
                  `;
                  successMessage.appendChild(successText);
                  successOverlay.appendChild(successMessage);
                  calendarContainer.appendChild(successOverlay);
                  
                  // Animation sequence
                  setTimeout(() => {
                    successOverlay.style.opacity = '1';
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                    
                    setTimeout(() => {
                      // Start hiding animation
                      successOverlay.style.opacity = '0';
                      successMessage.style.opacity = '0';
                      successMessage.style.transform = 'translateY(-20px)';
                      
                      setTimeout(() => {
                        // Remove overlay after animation completes
                        calendarContainer.removeChild(successOverlay);
                        
                        // 4. FINALLY - Send data to Voiceflow (LAST STEP)
                        const dateStr = formatDate(state.selectedDate);
                        const timeFormatter = new Intl.DateTimeFormat(locale, { 
                          hour: 'numeric', 
                          minute: '2-digit', 
                          hour12: true 
                        });

  const formattedDate = new Intl.DateTimeFormat(locale, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(state.selectedDate);
  const formattedTime = new Intl.DateTimeFormat(locale, { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  }).format(new Date(state.selectedTime));
  const formattedDateTime = `${formattedDate} ${language === "fr" ? "à" : "at"} ${formattedTime}`;

  window.voiceflow.chat.interact({
    type: "complete",
    payload: { 
      fullName,
      email,
      date: dateStr,
      time: state.selectedTime,
      formattedDate,
      formattedTime,
      formattedDateTime
    }
  });


                        
                      }, 500); // End of hide animation
                    }, 2500); // Show duration before hiding
                  }, 100); // Start of show animation
                }
              } catch (err) {
                console.error("Rescheduling error:", err);
                confirmBtn.disabled = false;
                confirmBtn.textContent = getText("confirmReschedule");
                state.isLoading = false;
                showErrorMessage(err.message || "Unable to complete rescheduling. Please try again.");
              }
            });
          }
          
          footer.appendChild(confirmBtn);
          return footer;
        }

// Timer functions for timeout handling
function startFormTimer() {
  let timeLeft = TIMEOUT_DURATION;
  
  formTimeoutId = setInterval(() => {
    timeLeft -= 1000;
    
    if (timeLeft <= 0) {
      clearInterval(formTimeoutId);
      if (!isFormSubmitted) {
        handleFormTimeout();
      }
    }
  }, 1000);
}

function handleFormTimeout() {
  state.isLoading = false;
  state.isConfirmed = true; // To prevent further interaction
  
  // Update UI to show timeout
  const confirmBtn = shadow.querySelector(".confirm-btn");
  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.textContent = language === 'fr' ? "Temps expiré" : "Time Expired";
    confirmBtn.style.backgroundColor = "#f44336";
    confirmBtn.style.color = "white";
  }
  
  // Notify Voiceflow
  window.voiceflow.chat.interact({
    type: "timeEnd",
    payload: {
      message: "Time expired"
    }
  });
  
  // Re-render the calendar to disable all elements
  renderCalendar();
}

        async function renderCalendar() {
          calendarContainer.innerHTML = '';
          if (state.isConfirmed) {
            calendarContainer.classList.add('confirmed');
          } else {
            calendarContainer.classList.remove('confirmed');
          }
          calendarContainer.appendChild(renderHeader());
          const calendarBody = document.createElement("div");
          calendarBody.className = "calendar-body";
          calendarBody.appendChild(await renderCalendarDays());
          calendarBody.appendChild(await renderTimeSlots());
          calendarContainer.appendChild(calendarBody);
          calendarContainer.appendChild(renderReasonSection());
          calendarContainer.appendChild(renderFooter());
          shadow.innerHTML = "";
          shadow.appendChild(style);
          shadow.appendChild(calendarContainer);
        }

        const calendarContainer = document.createElement("div");
        calendarContainer.className = "calendar-container";

        renderCalendar();
        element.appendChild(container);
        window.addEventListener('resize', () => {
          const newWidth = window.innerWidth <= 768 ? "100%" : "800px";
          container.style.width = newWidth;
        });
		startFormTimer();
      }
    };



    const CancellationCalendarExtension = {
      name: 'CancellationCalendar',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'ext_cancellation_calendar' || trace.payload?.name === 'ext_cancellation_calendar',
      render: async ({ trace, element }) => {
        // --- Extract payload values ---
        const {
          apiKey = "",
          language = 'en',           // 'en' or 'fr'
          timezone = 'America/Toronto',
          uid = ""                   // Booking UID
        } = trace.payload || {};
		
		// Initialize timeout variables
let formTimeoutId = null;
let isFormSubmitted = false;
const TIMEOUT_DURATION = 300000; // 15 minutes in milliseconds

        // For checking the language and reusing in conditionals
        const locale = language === 'fr' ? 'fr-CA' : 'en-US';
        const highlightColor = '#9C27B0';

        // Create container with shadow DOM
        const container = document.createElement("div");
        container.style.width = window.innerWidth <= 768 ? "100%" : "650px";
        container.style.maxWidth = "650px";
        container.style.margin = "0 auto";
        const shadow = container.attachShadow({ mode: 'open' });

        // Unified CSS (adapted for both extensions)
        const style = document.createElement("style");
        style.textContent = `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .extension-container {
            box-shadow: 0 10px 25px rgba(156, 39, 176, 0.15);
            border-radius: 16px;
            overflow: hidden;
            background: #fff;
            color: #333;
            animation: fadeIn 0.3s ease-out forwards;
            border: 1px solid #eaeaea;
            transition: all 0.3s ease;
            position: relative;
          }
          .extension-header {
            padding: 18px 24px;
            background-color: #faf7fc;
            border-bottom: 1px solid #eaeaea;
            position: relative;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .extension-header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 10%;
            width: 80%;
            height: 3px;
            background: #9C27B0;
            opacity: 0.5;
          }
          .extension-title {
            font-size: 24px;
            font-weight: 700;
            background: #9C27B0;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
          }
          .extension-body {
            padding: 20px;
          }
          .booking-card {
            background: #fafafa;
            border: 1px solid #eaeaea;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .booking-card h3 {
            margin: 0 0 10px;
            font-size: 16px;
            font-weight: 600;
            color: ${highlightColor};
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 6px;
          }
          .info-line {
            display: flex;
            margin: 8px 0;
            font-size: 14px;
            line-height: 1.4;
          }
          .info-label {
            font-weight: 600;
            width: 180px;
            min-width: 180px;
            color: #000;
          }
          .info-value {
            flex: 1;
            color: #444;
          }
          .extension-reason {
            display: flex;
            flex-direction: column;
          }
          .extension-reason label {
            font-size: 14px;
            margin-bottom: 6px;
            font-weight: 600;
            color: #555;
          }
          .extension-reason #details {
            resize: vertical;
            padding: 10px;
            font-size: 14px;
            border-radius: 6px;
            border: 1px solid #ccc;
            font-family: inherit;
            min-height: 60px;
          }
          .extension-reason #details:focus {
            border: 2px solid ${highlightColor};
            outline: none;
          }
		  #details {
      resize: vertical;
      min-height: 100px;
      max-height: 200px;
    }
          .error-message {
            color: ${highlightColor};
            font-size: 13px;
            margin-top: 4px;
            display: none;
          }
          .extension-footer {
            display: flex;
            justify-content: center;
            padding-bottom: 20px;
          }
          .action-btn {
            padding: 10px 20px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
            font-size: 14px;
          }
          /* Button CSS matching the Rescheduling Extension (3-phase behavior) */
          .confirm-btn {
            background: #F8EAFA;
            color: #9C27B0;
            font-weight: 600;
            border-radius: 10px;
            padding: 12px 24px;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
            position: relative;
            overflow: hidden;
            transition: all 0.3s;
          }
          .confirm-btn:hover:not(:disabled) {
            background: #9C27B0;
            color: white;
            box-shadow: 0 6px 18px rgba(156, 39, 176, 0.15);
          }
          .confirm-btn:active:not(:disabled) {
            box-shadow: 0 2px 10px rgba(156, 39, 176, 0.15);
          }
          .confirm-btn:disabled {
            cursor: not-allowed;
            box-shadow: none;
          }
          .success-overlay {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-color: rgba(156, 39, 176, 0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.5s;
            pointer-events: none;
          }
          .success-message {
            background-color: #fff;
            border-radius: 15px;
            padding: 20px 30px;
            box-shadow: 0 10px 30px rgba(156, 39, 176, 0.15);
            text-align: center;
            transform: translateY(20px);
            transition: transform 0.5s, opacity 0.5s;
            opacity: 0;
          }
          .success-message svg {
            margin-bottom: 10px;
          }
        `;
        shadow.appendChild(style);

        // Internal state
        const state = {
          booking: null,
          reason: "",
          isConfirmed: false,
          isLoading: false
        };

        // API functions
        async function fetchBooking(uid) {
          if (!uid || !apiKey) return null;
          const url = `https://api.cal.com/v2/bookings/${uid}`;
          const options = {
            method: 'GET',
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json"
              }
          };
          try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const json = await res.json();
            console.log("Fetched booking details:", json);
            return json.data || null;
          } catch (err) {
            console.error("Error fetching booking details:", err);
            return null;
          }
        }

        async function cancelBooking(uid, reason) {
          const url = `https://api.cal.com/v2/bookings/${uid}/cancel`;
          const body = { cancellationReason: reason };
          const options = {
            method: 'POST',
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "cal-api-version": "2024-08-13",
                "Content-Type": "application/json"
              },
            body: JSON.stringify(body)
          };
          try {
            const res = await fetch(url, options);
            if (!res.ok)
              throw new Error(`HTTP error! status: ${res.status} ${JSON.stringify(await res.text())}`);
            const responseBody = await res.json();
            if (responseBody.status && responseBody.status !== "success") {
              throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            return responseBody;
          } catch (err) {
            console.error("Error cancelling booking:", err);
            throw err;
          }
        }

        // Utility functions
        function formatDateRange(startDate, endDate) {
          if (language === 'fr') {
            const dateFormatter = new Intl.DateTimeFormat('fr-CA', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: timezone
            });
            const timeFormatter = new Intl.DateTimeFormat('fr-CA', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              timeZone: timezone
            });
            const datePart = dateFormatter.format(startDate);
            let startTime = timeFormatter.format(startDate).replace(":", "h");
            let endTime = timeFormatter.format(endDate).replace(":", "h");
            return `${datePart} de ${startTime} à ${endTime}`;
          } else {
            const dateFormatter = new Intl.DateTimeFormat('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: timezone
            });
            const timeFormatter = new Intl.DateTimeFormat('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
              timeZone: timezone
            });
            const datePart = dateFormatter.format(startDate);
            const startTime = timeFormatter.format(startDate);
            const endTime = timeFormatter.format(endDate);
            return `${datePart} from ${startTime} to ${endTime}`;
          }
        }

// Timer functions for timeout handling
function startFormTimer() {
  let timeLeft = TIMEOUT_DURATION;
  
  formTimeoutId = setInterval(() => {
    timeLeft -= 1000;
    
    if (timeLeft <= 0) {
      clearInterval(formTimeoutId);
      if (!isFormSubmitted) {
        handleFormTimeout();
      }
    }
  }, 1000);
}

function handleFormTimeout() {
  state.isLoading = false;
  state.isConfirmed = true; // To prevent further interaction
  
  // Update UI to show timeout
  const confirmBtn = shadow.querySelector(".confirm-btn");
  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.textContent = language === 'fr' ? "Temps expiré" : "Time Expired";
    confirmBtn.style.backgroundColor = "#f44336";
    confirmBtn.style.color = "white";
  }
  
  // Notify Voiceflow
  window.voiceflow.chat.interact({
    type: "timeEnd",
    payload: {
      message: "Time expired"
    }
  });
  
  // Re-render to disable all elements
  renderCancellation();
}

        // Translation helper with added "cancelled" key
        function t(key) {
          const translations = {
            en: {
              cancelBooking: "Booking Cancellation",
              bookingInfo: "Booking Information",
              bookingNumber: "Booking Number",
              status: "Status",
              title: "Title",
              when: "When",
              host: "Host",
              attendee: "Participant Name",
              email: "Participant Email",
              reasonLabel: "Reason for cancellation",
              confirmCancel: "Confirm Cancellation",
              cancelled: "Cancelled ✓",
              successMessage: "Your booking has been cancelled successfully!",
              loading: "Cancelling..."
            },
            fr: {
              cancelBooking: "Annulation de Réservation",
              bookingInfo: "Informations de Réservation",
              bookingNumber: "Numéro de Réservation",
              status: "Statut",
              title: "Titre",
              when: "Quand",
              host: "Hôte",
              attendee: "Nom Complet Participant",
              email: "Courriel Participant",
              reasonLabel: "Raison de l'annulation",
              confirmCancel: "Confirmer l'Annulation",
              cancelled: "Annulée ✓",
              successMessage: "Votre réservation a été annulée avec succès !",
              loading: "Annulation en cours..."
            }
          };
          const lang = language === 'fr' ? 'fr' : 'en';
          return translations[lang][key] || key;
        }

        // UI Component functions
        function createInfoLine(labelText, valueText) {
          const line = document.createElement("div");
          line.className = "info-line";
          const label = document.createElement("div");
          label.className = "info-label";
          label.textContent = labelText + ":";
          const value = document.createElement("div");
          value.className = "info-value";
          value.textContent = valueText;
          line.appendChild(label);
          line.appendChild(value);
          return line;
        }

        // Updated renderHeader to add the SVG icon before the title
        function renderHeader() {
          const header = document.createElement("div");
          header.className = "extension-header";
          
          // Create icon element from provided SVG
          const icon = document.createElement("span");
          icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
              <path fill="#9C27B0" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
            </svg>
          `;
          
          const title = document.createElement("h1");
          title.className = "extension-title";
          title.textContent = state.isConfirmed ? t('cancelled') : t('cancelBooking');
          
          header.appendChild(icon);
          header.appendChild(title);
          return header;
        }

        function renderBody() {
          const body = document.createElement("div");
          body.className = "extension-body";

          // Booking Info Card
          const card = document.createElement("div");
          card.className = "booking-card";
          const infoTitle = document.createElement("h3");
          infoTitle.textContent = t('bookingInfo');
          card.appendChild(infoTitle);

          if (state.booking) {
            if (state.booking.id) {
              card.appendChild(createInfoLine(t('bookingNumber'), state.booking.id));
            }
            let displayStatus = state.booking.status || "";
            if (displayStatus === "cancelled") {
              displayStatus = (language === 'fr') ? "Confirmé" : "Confirmed";
            } else if (language === 'fr' && displayStatus === "accepted") {
              displayStatus = "Actif";
            }
            card.appendChild(createInfoLine(t('status'), displayStatus));
            if (state.booking.title) {
              const cleanedTitle = state.booking.title.replace(/(\s+between\s+.*)/i, "");
              card.appendChild(createInfoLine(t('title'), cleanedTitle));
            }
            if (state.booking.start && state.booking.end) {
              const startDate = new Date(state.booking.start);
              const endDate = new Date(state.booking.end);
              const formatted = formatDateRange(startDate, endDate);
              card.appendChild(createInfoLine(t('when'), formatted));
            }
            if (state.booking.hosts && state.booking.hosts.length > 0) {
              card.appendChild(createInfoLine(t('host'), state.booking.hosts[0].name));
            }
            if (state.booking.attendees && state.booking.attendees.length > 0) {
              card.appendChild(createInfoLine(t('attendee'), state.booking.attendees[0].name));
              card.appendChild(createInfoLine(t('email'), state.booking.attendees[0].email));
            }
          } else {
            const noBooking = document.createElement("p");
            noBooking.style.color = "#999";
            noBooking.textContent = (language === 'fr')
              ? "Impossible de charger les détails de la réservation."
              : "Unable to load booking details.";
            card.appendChild(noBooking);
          }
          body.appendChild(card);

          // Cancellation Reason
          const reasonDiv = document.createElement("div");
          reasonDiv.className = "extension-reason";
          const reasonLabel = document.createElement("label");
          reasonLabel.textContent = t('reasonLabel');
          reasonDiv.appendChild(reasonLabel);
          
          const textarea = document.createElement("textarea");
		  textarea.id = "details";
          textarea.placeholder = (language === 'fr')
            ? "Raison de l'annulation"
            : "Why are you cancelling?";
          if (state.isConfirmed) {
            textarea.disabled = true;
          }
          textarea.addEventListener("input", (e) => { 
            state.reason = e.target.value; 
            errorMessage.style.display = "none";
            textarea.style.borderColor = "#ccc";
          });
          reasonDiv.appendChild(textarea);
          
          const errorMessage = document.createElement("div");
          errorMessage.className = "error-message";
          errorMessage.textContent = (language === 'fr')
            ? "Veuillez fournir une raison pour l'annulation."
            : "Please provide a reason for cancellation.";
          reasonDiv.appendChild(errorMessage);
          
          body.appendChild(reasonDiv);
          return body;
        }

        function renderFooter() {
  const footer = document.createElement("div");
  footer.className = "extension-footer";
  
  const confirmBtn = document.createElement("button");
  confirmBtn.className = "action-btn confirm-btn";

  if (state.isConfirmed) {
    confirmBtn.textContent = t('cancelled');
    confirmBtn.style.backgroundImage = 'none';
    confirmBtn.style.backgroundColor = '#4CAF50';
    confirmBtn.style.color = 'white';
    confirmBtn.disabled = true;
  } else {
    confirmBtn.textContent = t('confirmCancel');
    confirmBtn.disabled = state.isLoading || !uid;
    
    confirmBtn.addEventListener("click", async () => {
      if (state.isConfirmed) return;
      
      const reasonText = state.reason.trim();
      if (!reasonText) {
        const textarea = shadow.querySelector(".extension-reason textarea");
        const errorMessage = shadow.querySelector(".error-message");
        errorMessage.style.display = "block";
        textarea.style.borderColor = highlightColor;
        return;
      }
      
      // Show loading state
      confirmBtn.disabled = true;
      confirmBtn.textContent = t('loading');
      state.isLoading = true;
      
      try {
        // 1. First complete the cancellation with Cal.com
        const cancellationResponse = await cancelBooking(uid, reasonText);
        
        if (cancellationResponse) {
          // 2. Update UI to show confirmation
          state.isConfirmed = true;
		  
		  isFormSubmitted = true;
  if (formTimeoutId) {
    clearInterval(formTimeoutId);
  }
  
          renderCancellation();
          
          // 3. Show success animation
          const successOverlay = document.createElement('div');
          successOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(156, 39, 176, 0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.5s;
            pointer-events: none;
          `;
          
          const successMessage = document.createElement('div');
          successMessage.style.cssText = `
            background-color: white;
            border-radius: 15px;
            padding: 20px 30px;
            box-shadow: 0 10px 30px rgba(156, 39, 176, 0.15);
            text-align: center;
            transform: translateY(20px);
            transition: transform 0.5s, opacity 0.5s;
            opacity: 0;
          `;
          
          const checkmark = document.createElement('div');
          checkmark.innerHTML = `
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="30" fill="#F8EAFA"/>
              <path d="M20 30L27 37L40 23" stroke="#9C27B0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
          successMessage.appendChild(checkmark);
          
          const successText = document.createElement('p');
          successText.textContent = t('successMessage');
          successText.style.cssText = `
            font-size: 18px;
            font-weight: 600;
            margin-top: 15px;
            color: #9C27B0;
          `;
          successMessage.appendChild(successText);
          successOverlay.appendChild(successMessage);
          cancellationContainer.appendChild(successOverlay);
          
          // Animation sequence
          setTimeout(() => {
            successOverlay.style.opacity = '1';
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
            
            setTimeout(() => {
              // Start hiding animation
              successOverlay.style.opacity = '0';
              successMessage.style.opacity = '0';
              successMessage.style.transform = 'translateY(-20px)';
              
              setTimeout(() => {
                // Remove overlay after animation completes
                cancellationContainer.removeChild(successOverlay);
                
                // 4. FINALLY - Send data to Voiceflow (LAST STEP)
                window.voiceflow.chat.interact({
                  type: "complete",
                  payload: { 
                    uid: uid,
                    reason: reasonText,
                    bookingDetails: {
                      id: state.booking?.id,
                      title: state.booking?.title,
                      originalDate: state.booking?.start,
                      formattedDate: state.booking?.start ? 
                        new Intl.DateTimeFormat(locale, { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }).format(new Date(state.booking.start)) : ''
                    }
                  },
                });
                
              }, 500); // End of hide animation
            }, 2500); // Show duration before hiding
          }, 100); // Start of show animation
        }
      } catch (err) {
        console.error("Cancellation error:", err);
        confirmBtn.disabled = false;
        confirmBtn.textContent = t('confirmCancel');
        state.isLoading = false;
        
        // Show error message
        const errorOverlay = document.createElement("div");
        errorOverlay.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        `;
        const errorMessage = document.createElement("div");
        errorMessage.style.cssText = `
          background-color: #fff0f0;
          border: 1px solid #ffdddd;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 80%;
        `;
        errorMessage.innerHTML = `
          <div style="color: #d32f2f; font-size: 24px; margin-bottom: 10px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="currentColor"/>
            </svg>
          </div>
          <p style="margin: 0; color: #333;">${
            err.message || 
            (language === 'fr' 
              ? "Impossible d'annuler la réservation. Veuillez réessayer." 
              : "Unable to cancel booking. Please try again.")
          }</p>
          <button style="margin-top: 15px; background: #9C27B0; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
            ${language === 'fr' ? "OK" : "OK"}
          </button>
        `;
        errorOverlay.appendChild(errorMessage);
        cancellationContainer.appendChild(errorOverlay);
        
        const closeButton = errorMessage.querySelector("button");
        closeButton.addEventListener("click", () => {
          cancellationContainer.removeChild(errorOverlay);
        });
      }
    });
  }
  
  footer.appendChild(confirmBtn);
  return footer;
}

        function renderSuccessOverlay() {
          const overlay = document.createElement("div");
          overlay.className = "success-overlay";
          
          const msg = document.createElement("div");
          msg.className = "success-message";
          
          const icon = document.createElement("div");
          icon.innerHTML = `
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="30" fill='#F8EAFA'/>
              <path d="M20 30L27 37L40 23" stroke='${highlightColor}' stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
          msg.appendChild(icon);
          
          const textEl = document.createElement("p");
          textEl.style.fontSize = "16px";
          textEl.style.fontWeight = "600";
          textEl.style.color = highlightColor;
          textEl.textContent = t('successMessage');
          msg.appendChild(textEl);
          
          overlay.appendChild(msg);
          return overlay;
        }

        function showSuccessOverlay() {
          const overlay = shadow.querySelector(".success-overlay");
          const msg = shadow.querySelector(".success-message");
          if (overlay && msg) {
            overlay.style.opacity = '1';
            msg.style.opacity = '1';
            msg.style.transform = 'translateY(0)';
            setTimeout(() => {
              overlay.style.opacity = '0';
              msg.style.opacity = '0';
              msg.style.transform = 'translateY(-20px)';
              setTimeout(() => { overlay.remove(); }, 500);
            }, 2500);
          }
        }

        async function renderCancellation() {
          cancellationContainer.innerHTML = "";
          cancellationContainer.appendChild(renderHeader());
          cancellationContainer.appendChild(renderBody());
          cancellationContainer.appendChild(renderFooter());
          if (state.isConfirmed) {
            cancellationContainer.classList.add("confirmed");
          } else {
            cancellationContainer.classList.remove("confirmed");
          }
          const overlay = renderSuccessOverlay();
          cancellationContainer.appendChild(overlay);
        }

        const cancellationContainer = document.createElement("div");
        cancellationContainer.className = "extension-container";

        let bookingData = null;
        if (uid && apiKey) {
          bookingData = await fetchBooking(uid);
        }
        state.booking = bookingData;

        await renderCancellation();

        shadow.appendChild(cancellationContainer);
        element.appendChild(container);

        window.addEventListener('resize', () => {
          container.style.width = window.innerWidth <= 768 ? "100%" : "650px";
        });
		startFormTimer();
      }
    };


  /*************************************************************
     * 3) ContactFormExtension - MAIN EXTENSION OBJECT (Mode 1 Only)
     *************************************************************/
    const ContactFormExtension = {
      name: "ContactForm",
      type: "response",
      match: ({ trace }) => trace.type === `ext_contact_form` || trace.payload?.name === `ext_contact_form`,
      render: ({ trace, element }) => {
        const { language } = trace.payload || { language: 'FR' };
        const isEnglish = language === 'en';
        const dentalData = createDentalData(language);
    
	 let formTimeoutId = null;
        let isFormSubmitted = false;
        const TIMEOUT_DURATION = 300000; // 900 seconds (15 minutes) in milliseconds
		
        /*************************************************************
         * HTML Generation & Initial Setup
         *************************************************************/
        // Removed tabs since only one mode remains.
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
      max-width: 800px;
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
      background-color: #F8EAFA;
      border-radius: 50%;
    }
    .dropdown-icon.rotate {
      transform: rotate(180deg);
    }
    
    /* Custom Options */
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
      background-color: #F8EAFA;
      color:#9c27b0;
    }
    .custom-option.selected {
      background-color: #F8EAFA;
      color:#9c27b0;
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
      color: #9c27b0;
      font-size: 12px;
      display: none;
    }
    .custom-option.selected .option-checkbox {
      border-color: #9c27b0;
      background-color: #9c27b0;
    }
    .custom-option.selected .option-checkbox::after {
      display: block;
      color: #fff;
    }
    .custom-option:not(.selected):hover .option-checkbox,
    .custom-option:not(.selected):hover .option-checkbox::after {
      border-color: #9c27b0;
      display: block;
      color: #9c27b0;
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
      min-width: 400px;
      margin: 0 auto;
      padding: 16px;
      border-radius: 6px;
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
    #details {
      width: 100%;
      min-width: 200px;
      max-width: 800px;
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
      width: 100%;
      min-width: 200px;
      max-width: 100%;
    }
    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="tel"]:focus,
    #details:focus {
      border: 2px solid #9c27b0;
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
      color: #9c27b0;
      background-color: #F8EAFA;
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
      background-color: #9c27b0;
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
      border: 2px solid #9c27b0;
      box-shadow: 0 3px 8px rgba(154,13,242,0.1);
    }
    .section:hover:not(.disabled) {
      border-color: #9c27b0;
      box-shadow: 0 3px 8px rgba(154,13,242,0.1);
    }
    .section-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .section-icon {
      background-color: #F8EAFA;
      color: #9c27b0;
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
      background: #F8EAFA;
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
    .select-label {
      margin-bottom: 8px;
      font-weight: bold;
      color: #444;
    }
    
    /* ========== Disabled State ========== */
     .disabled {
      cursor: not-allowed !important;
    }
    
    .disabled * {
      cursor: not-allowed !important;
      pointer-events: none !important;
    }
    
    /* Miscellaneous adjustments */
    .custom-option:not(.selected):hover .option-checkbox svg path {
      fill: #9c27b0;
    }

    .custom-option:not(.selected):hover .option-checkbox {
  position: relative;
  border-color: #9c27b0;
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

    .main-arrow {
      margin-left: auto;
      display: flex;
      align-items: center;
      background-color: #F8EAFA;
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
    
  </style>
          <!-- Section 1: Contact Information -->
          <div class="flex-row">
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
          <!-- Section 2: Dentist and Service (Mode 1) -->
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
                <!-- Custom Service Dropdown (dependent on selected Dentist) -->
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
            </div>
          </div>
          </div>
                    <!-- Message Section -->
           <div class="section">
        <div class="section-card" data-target="section-message">
          <div class="section-info">
            <div class="section-icon">
              ${SVG_MESSAGE}
            </div>
            <div class="section-title">
              ${isEnglish ? "Message" : "Message"}
            </div>
          </div>
          <div class="collapse-icon">
            ${SVG_CHEVRON}
          </div>
        </div>
        <div class="collapsible-section" id="section-message">
          <div class="section-content">
            <label for="details" class="bold-label">
              ${isEnglish ? 'Message' : 'Message'}
            </label>
            <textarea id="details" name="details" placeholder="${isEnglish ? 'Write your message here...' : 'Écrivez votre message ici...'}" required></textarea>
            
            <div class="error-container">
  <div class="error-message" id="errorMessage">
    <div class="error-icon">!</div>
    <span>${isEnglish ? 'A message is required.' : 'Un message est obligatoire.'}</span>
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
    
        /*************************************************************
         * UI Helper Functions for Custom Dropdown (Mode 1)
         *************************************************************/
		 
		 
		 function startFormTimer() {
          let timeLeft = TIMEOUT_DURATION;
          
          // Just set the timeout - no display updates needed
          formTimeoutId = setInterval(() => {
            timeLeft -= 1000;
            
            if (timeLeft <= 0) {
              clearInterval(formTimeoutId);
              if (!isFormSubmitted) {
                handleFormTimeout();
              }
            }
          }, 1000);
        }
        
        function handleFormTimeout() {
          disableAllFormElements();
          
          const submitButton = formContainer.querySelector("#submit-button");
          submitButton.disabled = true;
          submitButton.textContent = isEnglish ? "Time Expired" : "Temps expiré";
          submitButton.style.backgroundColor = "#f44336";
          submitButton.style.color = "white";
          
          window.voiceflow.chat.interact({
            type: "timeEnd",
            payload: {
              message: "Time expired"
            }
          });
        }
    
	
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
    
        /*************************************************************
         * Section and Tab Functionality
         *************************************************************/
        function toggleSection(sectionId, forceOpen = false) {
  const section = formContainer.querySelector(`#${sectionId}`);
  if (!section) return;
  const parentSection = section.previousElementSibling;
  const icon = parentSection.querySelector(".collapse-icon");
  const wasExpanded = section.classList.contains("expanded");
  
  // Close all other sections.
  formContainer.querySelectorAll(".collapsible-section").forEach(sec => {
    if (sec.id !== sectionId) {
      sec.classList.remove("expanded");
      const card = sec.previousElementSibling;
      if (card) card.classList.remove("active");
      const icon = card ? card.querySelector(".collapse-icon") : null;
      if (icon) icon.classList.remove("active");
    }
  });
  
  // If forceOpen is true, always open the section
  // Otherwise, toggle the section based on its current state
  if (forceOpen || !wasExpanded) {
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
    
        /*************************************************************
         * Initialize the Custom Dropdown for Practitioner Mode (Mode 1)
         *************************************************************/
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
// Clear the native select and custom options without replacing the whole node.
const nativeSelect = serviceDropdownEl.querySelector("select");
const customOptions = serviceDropdownEl.querySelector(".custom-options");
nativeSelect.innerHTML = `<option value="" disabled selected>${isEnglish ? '-- Select a Service --' : '-- Sélectionnez un service --'}</option>`;
customOptions.innerHTML = "";
initializeCustomDropdown("serviceDropdownPractitioner", isEnglish ? '-- Select a Service --' : '-- Sélectionnez un service --', serviceData);

            formContainer.querySelector("#practitionerServiceContainer").style.display = "block";
            // Optionally: automatically open the service dropdown.
            const disp = formContainer.querySelector("#selectDisplayPractitionerService");
            const opts = formContainer.querySelector("#customOptionsPractitionerService");
            const icon = formContainer.querySelector("#dropdownIconPractitionerService");
            if(disp && opts && icon){
              opts.classList.add("show-options");
              icon.classList.add("rotate");
            }
          }
        });
    
        /*************************************************************
         * Live Validation for Input Fields
         *************************************************************/
        formContainer.querySelector("#full-name").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorFullName").style.display = "none";
        });
        formContainer.querySelector("#email").addEventListener("input", function() {
          if (isValidEmail(this.value.trim())) formContainer.querySelector("#errorEmail").style.display = "none";
        });
        formContainer.querySelector("#phone").addEventListener("input", function() {
          if (isValidPhoneNumber(this.value.trim())) formContainer.querySelector("#errorPhone").style.display = "none";
        });
    
        /*************************************************************
         * Disable All Form Elements After Submission
         *************************************************************/
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
    
        /*************************************************************
         * Form Submission Process with Sequential Validation
         *************************************************************/
        formContainer.querySelector("#submit-button").addEventListener("click", () => {
          formContainer.querySelectorAll(".error-message").forEach(errorEl => {
            errorEl.style.display = "none";
          });
    
          const fullName = formContainer.querySelector("#full-name").value.trim();
          const email = formContainer.querySelector("#email").value.trim();
          const phone = formContainer.querySelector("#phone").value.trim();
          // For Mode 1 only:
          const selectedDentist = formContainer.querySelector("#dentistSelect").value;
          const selectedService = formContainer.querySelector("#dentistServiceSelect").value;
        const details = formContainer.querySelector("#details").value.trim();

    
          if (!fullName) {
            toggleSection("section-contactInfo", true);
            formContainer.querySelector("#errorFullName").style.display = "flex";
            return;
          }
          if (!email || !isValidEmail(email)) {
            toggleSection("section-contactInfo", true);
            formContainer.querySelector("#errorEmail").style.display = "flex";
            return;
          }
          if (!phone || !isValidPhoneNumber(phone)) {
            toggleSection("section-contactInfo", true);
            formContainer.querySelector("#errorPhone").style.display = "flex";
            return;
          }
    
          if (!selectedDentist) {
            toggleSection("section-dentist-service", true);
            formContainer.querySelector("#errorDentist").style.display = "flex";
            return;
          }
          if (!selectedService) {
            toggleSection("section-dentist-service", true);
            formContainer.querySelector("#errorDentistService").style.display = "flex";
            return;
          }
  if (!details) {
    toggleSection("section-message", true);  // Force open with true
    // Note: I see a potential issue here - there's no #errorMessage element defined in your HTML
    // You might need to add this error element in your HTML
    const errorMessage = formContainer.querySelector("#errorMessage");
    if (errorMessage) {
      errorMessage.style.display = "flex";
    } else {
      // Create an error message if it doesn't exist
      console.error("Error message element for details field not found");
    }
    return;
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
		  
		   // Mark form as submitted and clear the timeout
          isFormSubmitted = true;
          if (formTimeoutId) {
            clearInterval(formTimeoutId);
          }
    
         
                      window.voiceflow.chat.interact({
            type: "complete",
            payload: {
              fullName,
              email,
              phone: formatPhoneNumber(phone),
              practitioner: dentistInfo.nom,
              service: selectedService,
              message: details  // New field added here
            },
          });

            submitButton.textContent = isEnglish ? "Submitted!" : "Soumis!";
          
          disableAllFormElements();
        });
		startFormTimer();
      }
    };
    
    

window.BookingFormExtension = BookingFormExtension;
window.BookingCalendarExtension = BookingCalendarExtension;
window.BookingCalendarSDExtension = BookingCalendarSDExtension;
window.BookingCalendarDExtension = BookingCalendarDExtension;
    window.BookingInformationExtension = BookingInformationExtension;
    window.RescheduleCalendarExtension = RescheduleCalendarExtension;
    window.CancellationCalendarExtension = CancellationCalendarExtension;
window.ContactFormExtension = ContactFormExtension;
