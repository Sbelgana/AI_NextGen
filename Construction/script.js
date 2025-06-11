
    /*************************************************************
     * 1) Helper Functions
     *************************************************************/
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
    
    // SVG icons as constants - only the ones actually used
    const SVG_CHECK = 
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
  <path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
</svg>`;
    const SVG_CHEVRON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
      <g transform="translate(75, 75)">
        <path fill="#00a0df" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
      </g>
    </svg>`;
    const SVG_SUN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
      <path fill="#FF9800" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM352 256c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zm32 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z"/>
    </svg>`;
    const SVG_MOON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24">
      <path fill="#5E35B1" d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>
    </svg>`;
    const SVG_DELETE = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>`;
    const SVG_UPLOAD = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
      <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
    </svg>`;
    const SVG_CAMERA = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
    </svg>`;

    /*************************************************************
     * 2) Form Data
     *************************************************************/
    // Simplified options data
    const optionsData = {
      "installationTypes": [
        { "name_fr": "Murale", "name_en": "Wall" },
        { "name_fr": "Centrale", "name_en": "Central" },
        { "name_fr": "Échangeur d'air", "name_en": "Air exchanger" },
        { "name_fr": "Unité d'apport d'air frais", "name_en": "Fresh air supply unit" },
        { "name_fr": "Unité de toit", "name_en": "Roof unit" },
        { "name_fr": "Hotte", "name_en": "Hood" }
      ],
      "ownershipStatus": [
        { "name_fr": "Propriétaire", "name_en": "Owner" },
        { "name_fr": "Locataire", "name_en": "Tenant" }
      ]
    };

    /*************************************************************
     * 3) ServiceRequestExtension - MAIN EXTENSION OBJECT
     *************************************************************/
    // Define the extension type
    const EXT_SERVICE_REQUEST = "ext_service_request";

    const ServiceRequestExtension = {
      name: "ServiceRequestForm",
      type: "response",
      match: ({ trace }) => trace.type === EXT_SERVICE_REQUEST || trace.payload?.name === EXT_SERVICE_REQUEST,
      render: ({ trace, element }) => {
        // Default language
        let currentLanguage = "en"; // "fr" or "en"
        
        // Step management
        let currentStep = 1;
        const totalSteps = 5; // Terms, Customer info, System info, Availability, Problem details & Submit
        let isFormSubmitted = false;
        
        // Translations
        const translations = {
          fr: {
            // Interface
            pageTitle: "Demande d'appel de service",
            pageSubtitle: "Un rendez-vous sera prévu selon vos disponibilités. Vous recevrez une confirmation par courriel, dans ce même courriel il y aura un bouton vous permettant de confirmer les rendez-vous.",
            // Steps
            step0Title: "Termes et conditions",
            step1Title: "Informations personnelles",
            step2Title: "Information sur le système",
            step3Title: "Disponibilités",
            step4Title: "Problématique",
            // Navigation
            next: "Suivant",
            previous: "Précédent",
            // Terms and conditions
            termsTitle: "Termes et conditions",
            termsContent: "Nous vous informons que pour toute intervention de service chez Ventilation Elixair, si votre appareil n'est plus couvert par la garantie de 1 an sur la main-d'œuvre, les frais suivants s'appliqueront :",
            travelFee: "Frais de déplacement",
            travelFeeAmount: "125 $",
            hourlyRate: "Coût horaire",
            hourlyRateDetails: "115 $ (minimum une heure de service)",
            acceptTerms: "J'accepte les termes et conditions.",
            // Personal info fields
            lastName: "Nom",
            firstName: "Prénom",
            phone: "Téléphone",
            email: "E-mail",
            address: "Adresse",
            addressLine: "Adresse postale",
            city: "Ville",
            postalCode: "Code postal",
            apartmentNumber: "Numéro d'appartement",
            // System info
            systemBrand: "Marque du système",
            modelNumber: "No de modèle du système",
            serialNumber: "No série",
            installationYear: "Année d'installation",
            installationType: "Type d'installation",
            installedBy: "Installation exécuté par Ventilation Elixair",
            ownerOrTenant: "Propriétaire ou locataire",
            tenantInfo: "Informations du propriétaire",
            yes: "Oui",
            no: "Non",
            // Availability
            contactTime: "Le meilleur moment pour vous rejoindre",
            selectDateAndTime: "Sélectionnez une date et une heure",
            chooseOption: "Choisissez une option :",
            morning: "Matin",
            afternoon: "Après-midi",
            morningHours: "8h00 - 12h00",
            afternoonHours: "13h00 - 17h00",
            weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
            months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
            selectedSlots: "Disponibilités sélectionnées",
            maxSlotsReached: "Maximum 5 disponibilités atteint",
            addThisSlot: "Ajouter cette disponibilité",
            // Problem details
            problemDescription: "Problématique",
            uploadPhoto: "Joindre une photo de l'installation problématique au besoin",
            // Submit button
            submit: "ENVOYER",
            processing: "Traitement...",
            submitted: "Soumis !",
            // Validation
            required: "obligatoire",
            lastNameRequired: "Le nom est obligatoire.",
            firstNameRequired: "Le prénom est obligatoire.",
            phoneRequired: "Un numéro de téléphone valide est obligatoire.",
            emailRequired: "Une adresse email valide est obligatoire.",
            addressRequired: "L'adresse est obligatoire.",
            cityRequired: "La ville est obligatoire.",
            postalCodeRequired: "Le code postal est obligatoire.",
            termsRequired: "Vous devez accepter les termes et conditions.",
            problemRequired: "Une description du problème est obligatoire.",
            timeSlotsRequired: "Veuillez sélectionner au moins une disponibilité.",
            // Dropdown placeholders
            selectPlaceholder: "-- Sélectionnez --",
            // File upload
            chooseFile: "Choisir un fichier",
            takePhoto: "Prendre une photo",
            dropImageText: "Glissez et déposez une image ou cliquez pour parcourir",
            tenantInfoPlaceholder: "Entrez les coordonnées du propriétaire...",
            problemDescriptionPlaceholder: "Décrivez en détail la problématique que vous rencontrez avec votre système..."
          },
          en: {
            // Interface
            pageTitle: "Service Call Request",
            pageSubtitle: "An appointment will be scheduled according to your availability. You will receive a confirmation by email, which will include a button allowing you to confirm the appointment.",
            // Steps
            step0Title: "Terms and Conditions",
            step1Title: "Personal Information",
            step2Title: "System Information",
            step3Title: "Availability",
            step4Title: "Issue Description",
            // Navigation
            next: "Next",
            previous: "Previous",
            // Terms and conditions
            termsTitle: "Terms and Conditions",
            termsContent: "We inform you that for any service intervention by Ventilation Elixair, if your device is no longer covered by the 1-year labor warranty, the following fees will apply:",
            travelFee: "Travel fees",
            travelFeeAmount: "$125",
            hourlyRate: "Hourly rate",
            hourlyRateDetails: "$115 (minimum one hour of service)",
            acceptTerms: "I accept the Terms and Conditions.",
            // Personal info fields
            lastName: "Last Name",
            firstName: "First Name",
            phone: "Phone",
            email: "Email",
            address: "Address",
            addressLine: "Postal address",
            city: "City",
            postalCode: "Postal Code",
            apartmentNumber: "Apartment number",
            // System info
            systemBrand: "System brand",
            modelNumber: "Model number",
            serialNumber: "Serial number",
            installationYear: "Installation year",
            installationType: "Installation type",
            installedBy: "Installation performed by Ventilation Elixair",
            ownerOrTenant: "Owner or tenant",
            tenantInfo: "Landlord information",
            yes: "Yes",
            no: "No",
            // Availability
            contactTime: "Best Time to Reach You",
            selectDateAndTime: "Select a Date and Time",
            chooseOption: "Choose an option:",
            morning: "Morning",
            afternoon: "Afternoon",
            morningHours: "8:00 AM - 12:00 PM",
            afternoonHours: "1:00 PM - 5:00 PM",
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            selectedSlots: "Selected Availabilities",
            maxSlotsReached: "Maximum 5 availabilities reached",
            addThisSlot: "Add this availability",
            // Problem details
            problemDescription: "Issue description",
            uploadPhoto: "Attach a photo of the problematic installation if needed",
            // Submit button
            submit: "SUBMIT",
            processing: "Processing...",
            submitted: "Submitted!",
            // Validation
            required: "required",
            lastNameRequired: "Last name is required.",
            firstNameRequired: "First name is required.",
            phoneRequired: "A valid phone number is required.",
            emailRequired: "A valid email address is required.",
            addressRequired: "Address is required.",
            cityRequired: "City is required.",
            postalCodeRequired: "Postal code is required.",
            termsRequired: "You must accept the terms and conditions.",
            problemRequired: "A problem description is required.",
            timeSlotsRequired: "Please select at least one availability slot.",
            // Dropdown placeholders
            selectPlaceholder: "-- Select --",
            // File upload
            chooseFile: "Choose file",
            takePhoto: "Take a photo",
            dropImageText: "Drag and drop an image or click to browse",
            tenantInfoPlaceholder: "Enter the landlord's contact information...",
            problemDescriptionPlaceholder: "Describe in detail the issue you are experiencing with your system..."
          }
        };
        
        // Function to get translations
        function getText(key) {
          return translations[currentLanguage][key] || key;
        }

        /*************************************************************
         * HTML Generation & Initial Setup
         *************************************************************/
        const formContainer = document.createElement("form");
        formContainer.setAttribute("novalidate", "true");
        formContainer.classList.add("multistep-form");
        formContainer.innerHTML = `
        <style>
          /* ========== Reset & Base Styles ========== */
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          /* ========== Form Layout & Containers ========== */
          form.multistep-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 10px;
            background: #fff;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: relative;
          }
          
          /* ========== Step Progress Indicator ========== */
          .progress-container {
            padding: 0;
          }

          .step-progress {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            width: 100%;
          }

          .step-progress::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 2px;
            background: #e0e0e0;
            z-index: 1;
            transform: translateY(-50%);
          }

          .progress-bar {
            position: absolute;
            top: 50%;
            left: 0;
            height: 2px;
            background: #00a0df;
            z-index: 2;
            transform: translateY(-50%);
            transition: width 0.3s ease;
          }

          .step-item {
            z-index: 3;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            text-align: center;
            width: 20%; /* For 5 steps */
          }

          .step-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #e0e0e0;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            transition: all 0.3s ease;
          }

          .step-icon::after {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
            position: absolute;
          }

          .step-title {
            font-size: 14px;
            color: #757575;
            position: absolute;
            width: 100%;
            text-align: center;
            top: 36px;
            font-weight: 500;
            transition: all 0.3s ease;
            display: none;
          }

          .step-item.active .step-icon {
            background: #00a0df;
          }

          .step-item.active .step-title {
            color: #00a0df;
            font-weight: 600;
          }

          .step-item.completed .step-icon {
            background: #00a0df;
          }

          .step-item.completed .step-title {
            color: #00a0df;
          }
          
          /* ========== Step Container ========== */
          .step-container {
            display: none;
            animation: fadeIn 0.5s;
          }

          .step-container.active {
            display: block;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .step-heading {
            font-size: 24px;
            color: #00a0df;
            margin-bottom: 24px;
            font-weight: 600;
          }
          
          /* ========== Terms and Conditions ========== */
          .terms-container {
            background-color: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
          }
          
          .terms-title {
            font-weight: 600;
            color: #333;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
          
          .terms-title .required::after {
            content: " *";
            color: #00a0df;
            font-weight: bold;
          }
          
          .terms-content {
            margin-bottom: 15px;
            font-size: 14px;
            line-height: 1.5;
          }
          
          .terms-list {
            list-style-type: none;
            margin: 10px 0;
            padding-left: 10px;
          }
          
          .terms-list li {
            margin-bottom: 8px;
            font-size: 14px;
            display: flex;
            align-items: baseline;
          }
          
          .terms-list strong {
            min-width: 150px;
            display: inline-block;
          }
          
          .checkbox-container {
            display: flex;
            align-items: center;
            margin-top: 15px;
          }
          
          .checkbox-container input[type="checkbox"] {
            margin-right: 10px;
            width: 18px;
            height: 18px;
          }
          
          /* ========== Form Fields & Inputs ========== */
          .form-group {
            margin-bottom: 15px;
            width: 100%;
          }
          
          .bold-label {
            font-weight: 600;
            color: #333;
            font-size: 14px;
            margin-bottom: 6px;
            display: block;
          }
          
          .required::after {
            content: " *";
            color: #00a0df;
            font-weight: bold;
          }
          
          input[type="text"],
          input[type="email"],
          input[type="tel"],
          .details,
          select {
            width: 100%;
            border: 1px solid rgba(0,0,0,0.2);
            border-radius: 8px;
            padding: 12px;
            background: #fff;
            font-size: 15px;
            outline: none;
            box-sizing: border-box;
            transition: all 0.2s;
          }
          
          input[type="text"],
          input[type="email"],
          input[type="tel"],
          select {
            height: 48px;
          }
          
          input[type="text"]:focus,
          input[type="email"]:focus,
          input[type="tel"]:focus,
          .details:focus,
          select:focus {
            border: 2px solid #00a0df;
            box-shadow: 0 0 0 3px rgba(0,160,223,0.1);
          }
          
          .details {
            resize: vertical;
            min-height: 100px;
            width: 100%;
          }
          
          ::placeholder {
            color: #aaa;
            opacity: 1;
          }
          
          /* ========== Dropdown Components ========== */
          .select-display {
            padding: 0 15px;
            font-size: 15px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 48px;
          }
          
          .dropdown-icon {
            width: 24px;
            height: 24px;
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #e6f5fb;
            border-radius: 50%;
          }
          
          .dropdown-icon.rotate {
            transform: rotate(180deg);
          }
          
          /* Custom Options */
          .custom-options {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            border-top: 1px solid #ddd;
            max-height: 300px;
            overflow-y: auto;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            z-index: 1000;
            border-radius: 0 0 8px 8px;
          }

          /* Ensure the select wrapper has correct position */
          .select-wrapper {
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #fff;
            position: relative;
            width: 100%;
            min-height: 48px;
          }
          
          .custom-options::-webkit-scrollbar {
            width: 6px;
          }
          
          .custom-options::-webkit-scrollbar-track {
            background: #f5f5f5;
          }
          
          .custom-options::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 3px;
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
            background-color: #e6f5fb;
            color:#00a0df;
          }
          
          .custom-option.selected {
            background-color: #e6f5fb;
            color:#00a0df;
            font-weight: bold;
          }
          
          /* Option Checkbox */
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
          
          .custom-option.selected .option-checkbox {
            border-color: #00a0df;
            background-color: #00a0df;
          }
          
          .custom-option:not(.selected):hover .option-checkbox {
            border-color: #00a0df;
          }
          
          .custom-option.selected .option-checkbox svg path {
            fill: #fff !important;
          }
          
          .show-options {
            display: block;
          }
          
          /* ========== Radio Button Components ========== */
          .radio-button-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 5px;
          }
          
          .radio-button-container {
            display: flex;
            align-items: center;
          }
          
          .radio-button-container input[type="radio"] {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .radio-label {
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 14px;
          }
          
          .radio-custom {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid #ccc;
            display: inline-block;
            margin-right: 12px;
            position: relative;
            transition: all 0.2s;
          }
          
          .radio-custom::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #00a0df;
            opacity: 0;
            transition: opacity 0.2s;
          }
          
          input[type="radio"]:checked + .radio-label .radio-custom {
            border-color: #00a0df;
          }
          
          input[type="radio"]:checked + .radio-label .radio-custom::after {
            opacity: 1;
          }
          
          input[type="radio"]:focus + .radio-label .radio-custom {
            box-shadow: 0 0 0 3px rgba(0,160,223,0.3);
          }
          
          /* ========== File Upload ========== */
          .file-upload-container {
            margin-top: 15px;
          }
          
          .file-upload {
            border: 2px dashed #ddd;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            position: relative;
            background-color: #f9f9f9;
            transition: all 0.3s;
          }
          
          .file-upload:hover {
            border-color: #00a0df;
            background-color: #e6f5fb;
          }
          
          .file-upload-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
          }
          
          .file-upload-buttons {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
          }
          
          .file-upload-btn {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 8px 15px;
            border-radius: 4px;
            background-color: #e6f5fb;
            color: #00a0df;
            font-size: 14px;
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .file-upload-btn:hover {
            background-color: #00a0df;
            color: white;
          }
          
          .file-upload-text {
            font-size: 14px;
            color: #777;
            margin-top: 10px;
          }
          
          .file-name-display {
            margin-top: 10px;
            font-size: 14px;
            color: #333;
            font-weight: 500;
            display: none;
          }
          
          /* ========== Calendar Styles ========== */
          .calendar-container {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            border-radius: 10px;
            overflow: hidden;
            background: #ffffff;
            color: #333;
            border: 1px solid #eaeaea;
            transition: all 0.3s ease;
            position: relative;
            margin-top: 10px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.05);
          }
          
          .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background-color: #f1f3f8;
            border-bottom: 1px solid #eaeaea;
            position: relative;
          }
          
          .calendar-title {
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 10px;
            text-align: center;
          }
          
          .calendar-nav {
            display: flex;
            align-items: center;
            gap: 12px;
            justify-content: center;
          }
          
          .nav-btn {
            background: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            transition: all 0.2s;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
            color: #00a0df;
          }
          
          .nav-btn:hover {
            background-color: #e6f5fb;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          
          .current-date {
            font-weight: 600;
            font-size: 15px;
            background: #e6f5fb;
            padding: 6px 12px;
            border-radius: 20px;
            color: #00a0df;
          }
          
          .days-container {
            padding: 10px;
          }
          
          .weekdays {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            text-align: center;
            font-weight: 600;
            font-size: 13px;
            padding: 10px 0;
            color: #666;
          }
          
          .days {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
            padding: 5px;
          }
          
          .day {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            width: 40px;
            cursor: pointer;
            position: relative;
            font-size: 14px;
            transition: all 0.2s;
            margin: 0 auto;
            border: 1px solid transparent;
            border-radius: 50%;
          }
          
          .day:not(.inactive):not(.weekend):hover {
            color: #00a0df;
            border: 2px solid #00a0df;
            font-weight: 500;
            background-color: rgba(0,160,223,0.05);
            transform: scale(1.1);
          }
          
          .day.available::after {
            content: "";
            position: absolute;
            bottom: 3px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #00a0df;
            opacity: 0.7;
          }
          
          .day.today {
            border: 2px solid #00a0df;
            font-weight: 500;
          }
          
          .day.active {
            background-color: #00a0df;
            color: white;
            border-radius: 50%;
            font-weight: bold;
            box-shadow: 0 3px 6px rgba(0,160,223,0.3);
          }
          
          .day.inactive, .day.weekend {
            color: #bbb;
            cursor: default;
            background-color: #f9f9f9;
          }
          
          .day.weekend {
            background-color: #f5f5f5;
            position: relative;
            border: 1px solid #eee;
          }
          
          .time-choice-container {
            padding: 20px;
            border-top: 1px solid #eee;
            background-color: #fafafa;
          }
          
          .time-choice-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 10px;
          }
          
          .time-choice {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s;
            background-color: white;
          }
          
          .time-choice:hover {
            border-color: #00a0df;
            background-color: #e6f5fb;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          
          .time-choice.selected {
            border: 2px solid #00a0df;
            background-color: #e6f5fb;
            box-shadow: 0 3px 8px rgba(0,160,223,0.15);
          }
          
          .time-choice-icon {
            width: 35px;
            height: 35px;
            margin-right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f0f0;
            border-radius: 50%;
            transition: all 0.2s;
          }
          
          .time-choice:hover .time-choice-icon,
          .time-choice.selected .time-choice-icon {
            background-color: rgba(0,160,223,0.1);
          }
          
          .time-choice-details {
            flex: 1;
          }
          
          .time-choice-title {
            font-weight: 600;
            color: #333;
            font-size: 15px;
            margin-bottom: 3px;
          }
          
          .time-choice-range {
            color: #777;
            font-size: 13px;
          }
          
          /* ========== Selected Time Slots ========== */
          .selected-slots {
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
          }
          
          .selected-slots-title {
            font-weight: 600;
            font-size: 16px;
            color: #333;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .selected-slots-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          
          .selected-slot-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            border-radius: 6px;
            background-color: white;
            border: 1px solid #e0e0e0;
            transition: all 0.2s;
          }
          
          .selected-slot-item:hover {
            background-color: #e6f5fb;
            border-color: #00a0df;
          }
          
          .selected-slot-info {
            flex: 1;
            font-size: 14px;
          }
          
          .delete-slot {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: none;
            background-color: #ffebee;
            color: #d32f2f;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .delete-slot:hover {
            background-color: #ffcdd2;
            color: #b71c1c;
            transform: scale(1.1);
          }
          
          .max-slots-message {
            margin-top: 10px;
            padding: 8px 12px;
            background-color: #fff3e0;
            border: 1px solid #ffe0b2;
            border-radius: 6px;
            font-size: 14px;
            color: #e65100;
            display: none;
          }
          
          /* ========== Selected Availability Badge ========== */
          .selected-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 24px;
            height: 24px;
            background-color: #00a0df;
            color: white;
            font-size: 12px;
            font-weight: bold;
            border-radius: 12px;
            padding: 0 8px;
          }
          
          /* ========== Add Slot Button ========== */
          .add-slot-btn {
            color: #fff;
            background-color: #4CAF50;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            margin: 15px auto 0;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          
          .add-slot-btn:hover {
            background-color: #45a049;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
          }
          
          .add-slot-btn:disabled {
            background-color: #cccccc;
            color: #888888;
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
          }
          
          .custom-options.show-options {
            display: block !important;
            position: absolute;
            width: 100%;
            z-index: 1000;
            max-height: 250px;
            overflow-y: auto;
          }
          
          /* ========== Error Components ========== */
          .error-container {
            width: 100%;
            margin: 5px 0;
          }
          
          .error-message {
            display: none;
            padding: 8px 12px;
            border-radius: 6px;
            background-color: #FFF5F5;
            border: 1px solid #FFD7D7;
            font-size: 13px;
            align-items: center;
            color: #D32F2F;
          }
          
          .error-icon {
            background-color: #D32F2F;
            color: #fff;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 10px;
            flex-shrink: 0;
            font-size: 12px;
          }
          
          /* ========== Navigation Buttons ========== */
          .form-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            gap: 10px;
          }

          .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 120px;
            text-align: center;
            font-weight: 500;
          }

          .btn-prev {
            color: #00a0df;
            background-color: #e6f5fb;
          }

          .btn-prev:hover {
            background-color: #cceaf8;
          }

          .btn-next, .btn-submit {
            color: #fff;
            background-color: #00a0df;
          }

          .btn-next:hover, .btn-submit:hover {
            background-color: #0090c9;
            box-shadow: 0 5px 15px rgba(0,160,223,0.2);
            transform: translateY(-2px);
          }

          .btn-submit {
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 1px;
          }

          .btn:disabled {
            background-color: #E0E0E0;
            color: #9E9E9E;
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
          }
          
          /* ========== Disabled State ========== */
          .disabled {
            cursor: not-allowed !important;
          }
          
          .disabled * {
            cursor: not-allowed !important;
            pointer-events: none !important;
          }
          
          /* Responsive styles */
          .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0 15px;
            width: 100%;
          }
          
          .form-grid-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0 15px;
            width: 100%;
          }
          
          .calendar-flex-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;
          }
          
          .calendar-column {
            padding: 0;
            border-radius: 10px;
            overflow: hidden;
            background: #ffffff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          }
          
          .availability-column {
            background: #f9f9f9;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          }
          
          /* Media queries */
          @media (min-width: 992px) {
            .calendar-flex-container {
              flex-direction: row;
            }
            
            .calendar-column {
              flex: 1;
              min-width: 0;
            }
            
            .availability-column {
              flex: 1;
              min-width: 0;
              display: flex;
              flex-direction: column;
            }
          }
          
          @media (max-width: 992px) {
            .form-grid {
              grid-template-columns: 1fr;
            }
            
            .form-grid-3 {
              grid-template-columns: 1fr 1fr;
            }
            
            .calendar-flex-container {
              gap: 30px;
            }
            
            .calendar-column, 
            .availability-column {
              width: 100%;
            }
          }
          
          @media (max-width: 768px) {
            .time-choice-options {
              grid-template-columns: 1fr;
            }
            
            .form-buttons {
              flex-direction: column;
            }
            
            .btn {
              width: 100%;
            }
            
            .calendar-header {
              flex-direction: column;
              padding: 10px;
            }
            
            .calendar-title {
              margin-bottom: 15px;
            }
            
            .calendar-nav {
              width: 100%;
              justify-content: center;
            }
          }
          
          @media (max-width: 576px) {
            .form-grid-3 {
              grid-template-columns: 1fr;
            }
            
            .day {
              width: 30px;
              height: 30px;
              font-size: 12px;
            }
          }
          
          @media (max-width: 400px) {
            .day {
              width: 28px;
              height: 28px;
              font-size: 12px;
            }
            
            .weekdays {
              font-size: 11px;
            }
          }
.checkbox-container {
  display: flex;
  align-items: center;
  margin: 8px 0;
  position: relative;
  flex-wrap: wrap;
}

.checkbox-container input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  width: 100%;
}

.custom-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 2px solid #00a0df;
  border-radius: 6px;
  background-color: #fff;
  margin-right: 8px;
  position: relative;
  flex-shrink: 0;
}

.check-icon {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #00a0df;
  align-items: center;
  justify-content: center;
}

.checkbox-container input[type="checkbox"]:checked 
  + .checkbox-label 
  .custom-checkbox 
  .check-icon {
  display: flex;
}

.checkbox-text {
  font-weight: 600;
  color: #000;
  font-size: 14px;
}

        </style>
        
        <!-- Step Progress Indicator -->
        <div class="progress-container">
          <div class="step-progress">
            <div class="progress-bar" id="progress-bar"></div>
            <div class="step-item active" data-step="1">
              <div class="step-icon"></div>
              <div class="step-title" id="progress-step1">Termes et conditions</div>
            </div>
            <div class="step-item" data-step="2">
              <div class="step-icon"></div>
              <div class="step-title" id="progress-step2">Informations personnelles</div>
            </div>
            <div class="step-item" data-step="3">
              <div class="step-icon"></div>
              <div class="step-title" id="progress-step3">Information sur le système</div>
            </div>
            <div class="step-item" data-step="4">
              <div class="step-icon"></div>
              <div class="step-title" id="progress-step4">Disponibilités</div>
            </div>
            <div class="step-item" data-step="5">
              <div class="step-icon"></div>
              <div class="step-title" id="progress-step5">Problématique</div>
            </div>
          </div>
        </div>
        
        <!-- Step 1: Terms and Conditions -->
        <div class="step-container active" id="step-1">
          <h2 class="step-heading" id="step1-heading">Termes et conditions</h2>
          
          <!-- Terms and Conditions -->
          <div class="terms-container">
            <h3 class="terms-title">
              <span id="terms-title" class="required">Termes et conditions</span>
            </h3>
            <div class="terms-content" id="terms-content">
              Nous vous informons que pour toute intervention de service chez Ventilation Elixair, si votre appareil n'est plus couvert par la garantie de 1 an sur la main-d'œuvre, les frais suivants s'appliqueront :
            </div>
            <ul class="terms-list">
              <li><strong id="travel-fee-label">Frais de déplacement</strong>: <span id="travel-fee-amount">125 $</span></li>
              <li><strong id="hourly-rate-label">Coût horaire</strong>: <span id="hourly-rate-details">115 $ (minimum une heure de service)</span></li>
            </ul>

<div class="checkbox-container">
  <input type="checkbox" id="accept-terms" name="accept-terms" required />
  <label for="accept-terms" class="checkbox-label">
    <span class="custom-checkbox">
      <span class="check-icon">${SVG_CHECK}</span>
    </span>
    <span class="checkbox-text" id="accept-terms-text"></span>
  </label>
</div>

        
          
            <div class="error-container">
              <div class="error-message" id="errorTerms">
                <div class="error-icon">!</div>
                <span id="error-terms-text">Vous devez accepter les termes et conditions.</span>
              </div>
            </div>
          </div>
          
          <div class="form-buttons">
            <div></div>
            <button type="button" class="btn btn-next" id="step1-next">
              <span id="btn-next-text">Suivant</span>
            </button>
          </div>
        </div>
        
        <!-- Step 2: Personal Information -->
        <div class="step-container" id="step-2">
          <h2 class="step-heading" id="step2-heading">Informations personnelles</h2>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="first-name" class="bold-label required" id="label-firstname">Prénom</label>
              <input type="text" id="first-name" name="first-name" required />
              <div class="error-container">
                <div class="error-message" id="errorFirstName">
                  <div class="error-icon">!</div>
                  <span id="error-firstname-text">Le prénom est obligatoire.</span>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="last-name" class="bold-label required" id="label-lastname">Nom</label>
              <input type="text" id="last-name" name="last-name" required />
              <div class="error-container">
                <div class="error-message" id="errorLastName">
                  <div class="error-icon">!</div>
                  <span id="error-lastname-text">Le nom est obligatoire.</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email" class="bold-label required" id="label-email">E-mail</label>
            <input type="email" id="email" name="email" required />
            <div class="error-container">
              <div class="error-message" id="errorEmail">
                <div class="error-icon">!</div>
                <span id="error-email-text">Une adresse email valide est obligatoire.</span>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="phone" class="bold-label required" id="label-phone">Téléphone</label>
            <input type="tel" id="phone" name="phone" required />
            <div class="error-container">
              <div class="error-message" id="errorPhone">
                <div class="error-icon">!</div>
                <span id="error-phone-text">Un numéro de téléphone valide est obligatoire.</span>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="address" class="bold-label required" id="label-address">Adresse</label>
            <input type="text" id="address" name="address" placeholder="Adresse postale" required />
            <div class="error-container">
              <div class="error-message" id="errorAddress">
                <div class="error-icon">!</div>
                <span id="error-address-text">L'adresse est obligatoire.</span>
              </div>
            </div>
          </div>
          
          <div class="form-grid-3">
            <div class="form-group">
              <label for="apartment" class="bold-label" id="label-apartment">Numéro d'appartement</label>
              <input type="text" id="apartment" name="apartment" />
            </div>
            
            <div class="form-group">
              <label for="city" class="bold-label required" id="label-city">Ville</label>
              <input type="text" id="city" name="city" required />
              <div class="error-container">
                <div class="error-message" id="errorCity">
                  <div class="error-icon">!</div>
                  <span id="error-city-text">La ville est obligatoire.</span>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="postal-code" class="bold-label required" id="label-postalcode">Code postal</label>
              <input type="text" id="postal-code" name="postal-code" required />
              <div class="error-container">
                <div class="error-message" id="errorPostalCode">
                  <div class="error-icon">!</div>
                  <span id="error-postalcode-text">Le code postal est obligatoire.</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-buttons">
            <button type="button" class="btn btn-prev" id="step2-prev">
              <span id="btn-prev-text">Précédent</span>
            </button>
            <button type="button" class="btn btn-next" id="step2-next">
              <span id="btn-next-text-2">Suivant</span>
            </button>
          </div>
        </div>
        
        <!-- Step 3: System Information -->
        <div class="step-container" id="step-3">
          <h2 class="step-heading" id="step3-heading">Information sur le système</h2>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="system-brand" class="bold-label" id="label-system-brand">Marque du système</label>
              <input type="text" id="system-brand" name="system-brand" />
            </div>
            
            <div class="form-group">
              <label for="model-number" class="bold-label" id="label-model-number">No de modèle du système</label>
              <input type="text" id="model-number" name="model-number" />
            </div>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="serial-number" class="bold-label" id="label-serial-number">No série</label>
              <input type="text" id="serial-number" name="serial-number" />
            </div>
            
            <div class="form-group">
              <label for="installation-year" class="bold-label" id="label-installation-year">Année d'installation</label>
              <input type="text" id="installation-year" name="installation-year" />
            </div>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="installation-type" class="bold-label" id="label-installation-type">Type d'installation</label>
              <div id="installation-type-dropdown" class="select-wrapper">
                <select id="installation-type" name="installation-type" style="display:none;"></select>
                <div class="select-display">
                  <span id="installation-type-placeholder">-- Sélectionnez --</span>
                  <div class="dropdown-icon">${SVG_CHEVRON}</div>
                </div>
                <div class="custom-options" id="installation-type-options"></div>
              </div>
              <div class="error-container">
                <div class="error-message" id="errorInstallationType">
                  <div class="error-icon">!</div>
                  <span id="error-installation-type-text">Vous devez sélectionner un type d'installation.</span>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="installed-by" class="bold-label" id="label-installed-by">Installation exécuté par Ventilation Elixair</label>
              <div id="installed-by-container">
                <div class="radio-button-group">
                  <div class="radio-button-container">
                    <input type="radio" id="installed-by-yes" name="installed-by" value="true" checked>
                    <label for="installed-by-yes" class="radio-label">
                      <span class="radio-custom"></span>
                      <span class="radio-text" id="installed-by-yes-text">Oui</span>
                    </label>
                  </div>
                  <div class="radio-button-container">
                    <input type="radio" id="installed-by-no" name="installed-by" value="false">
                    <label for="installed-by-no" class="radio-label">
                      <span class="radio-custom"></span>
                      <span class="radio-text" id="installed-by-no-text">Non</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="owner-status" class="bold-label" id="label-owner-status">Propriétaire ou locataire</label>
            <div id="owner-status-container">
              <div class="radio-button-group">
                <div class="radio-button-container">
                  <input type="radio" id="owner-status-owner" name="owner-status" value="owner" checked>
                  <label for="owner-status-owner" class="radio-label">
                    <span class="radio-custom"></span>
                    <span class="radio-text" id="owner-text">Propriétaire</span>
                  </label>
                </div>
                <div class="radio-button-container">
                  <input type="radio" id="owner-status-tenant" name="owner-status" value="tenant">
                  <label for="owner-status-tenant" class="radio-label">
                    <span class="radio-custom"></span>
                    <span class="radio-text" id="tenant-text">Locataire</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div id="tenant-info-container" style="display:none;">
            <div class="form-group">
              <label for="tenant-info" class="bold-label" id="label-tenant-info">Informations du propriétaire</label>
              <textarea id="tenant-info" name="tenant-info" class="details" rows="3" placeholder="Entrez les coordonnées du propriétaire..."></textarea>
            </div>
          </div>
          
          <div class="form-buttons">
            <button type="button" class="btn btn-prev" id="step3-prev">
              <span id="btn-prev-text-2">Précédent</span>
            </button>
            <button type="button" class="btn btn-next" id="step3-next">
              <span id="btn-next-text-3">Suivant</span>
            </button>
          </div>
        </div>
        
        <!-- Step 4: Availability Selection -->
        <div class="step-container" id="step-4">
          <h2 class="step-heading" id="step4-heading">Le meilleur moment pour vous rejoindre</h2>
          
          <input type="hidden" id="contact-time" name="contact-time" />
          
          <div class="calendar-container" id="booking-calendar">
            <div class="calendar-flex-container">
              <!-- Calendar Column -->
              <div class="calendar-column">
                <div class="calendar-header">
                  <div class="calendar-title" id="calendar-header-title">Sélectionnez une date et une heure</div>
                  <div class="calendar-nav">
                    <button type="button" class="nav-btn prev-btn" id="prev-month">
                      <div style="transform: rotate(90deg);">${SVG_CHEVRON}</div>
                    </button>
                    <div class="current-date" id="current-month-display">Juin 2025</div>
                    <button type="button" class="nav-btn next-btn" id="next-month">
                      <div style="transform: rotate(-90deg);">${SVG_CHEVRON}</div>
                    </button>
                  </div>
                </div>
                <div class="days-container">
                  <div class="weekdays" id="weekdays-container">
                    <div>Dim</div><div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div>Sam</div>
                  </div>
                  <div class="days" id="calendar-days">
                    <!-- Days will be generated dynamically -->
                  </div>
                </div>
              </div>
              
              <!-- Availability Column -->
              <div class="availability-column">
                <div class="time-choice-container" id="time-choice-container">
                  <div id="time-choice-label">Choisissez une option :</div>
                  <div class="time-choice-options">
                    <div class="time-choice" id="morning-choice" data-time="morning">
                      <div class="time-choice-icon">${SVG_SUN}</div>
                      <div class="time-choice-details">
                        <div class="time-choice-title" id="morning-title">Matin</div>
                        <div class="time-choice-range" id="morning-hours">8h00 - 12h00</div>
                      </div>
                    </div>
                    <div class="time-choice" id="afternoon-choice" data-time="afternoon">
                      <div class="time-choice-icon">${SVG_MOON}</div>
                      <div class="time-choice-details">
                        <div class="time-choice-title" id="afternoon-title">Après-midi</div>
                        <div class="time-choice-range" id="afternoon-hours">13h00 - 17h00</div>
                      </div>
                    </div>
                  </div>
                  
                  <button type="button" class="add-slot-btn" id="add-slot-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                    </svg>
                    <span id="add-slot-text">Ajouter cette disponibilité</span>
                  </button>
                  
                  <div class="max-slots-message" id="max-slots-message">
                    Maximum 5 disponibilités atteint
                  </div>
                </div>
                
                <div class="error-container" style="margin-top: 10px;">
                  <div class="error-message" id="errorTimeSlots">
                    <div class="error-icon">!</div>
                    <span id="error-timeslots-text">Veuillez sélectionner au moins une disponibilité.</span>
                  </div>
                </div>
                
                <div class="selected-slots" id="selected-slots-container" style="display: none;">
                  <div class="selected-slots-title">
                    <span id="selected-slots-title">Disponibilités sélectionnées</span>
                    <div class="selected-badge" id="selected-slots-count">0</div>
                  </div>
                  <div class="selected-slots-list" id="selected-slots-list">
                    <!-- Selected slots will be added dynamically -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-buttons">
            <button type="button" class="btn btn-prev" id="step4-prev">
              <span id="btn-prev-text-3">Précédent</span>
            </button>
            <button type="button" class="btn btn-next" id="step4-next">
              <span id="btn-next-text-4">Suivant</span>
            </button>
          </div>
        </div>
        
        <!-- Step 5: Problem Description and Submit -->
        <div class="step-container" id="step-5">
          <h2 class="step-heading" id="step5-heading">Problématique</h2>
          
          <div class="form-group">
            <label for="problem-description" class="bold-label required" id="label-problem">Problématique</label>
            <textarea id="problem-description" name="problem-description" class="details" rows="5" required placeholder="Décrivez en détail la problématique que vous rencontrez avec votre système..."></textarea>
            <div class="error-container">
              <div class="error-message" id="errorProblem">
                <div class="error-icon">!</div>
                <span id="error-problem-text">Une description du problème est obligatoire.</span>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="photo-upload" class="bold-label" id="label-photo">Joindre une photo de l'installation problématique au besoin</label>
            <div class="file-upload">
              <input type="file" id="photo-upload" name="photo-upload" class="file-upload-input" accept="image/*">
              <div class="file-upload-text" id="upload-text">Glissez et déposez une image ou cliquez pour parcourir</div>
              <div class="file-upload-buttons">
                <button type="button" class="file-upload-btn" id="upload-btn">
                  ${SVG_UPLOAD} <span id="upload-btn-text">Choisir un fichier</span>
                </button>
                <button type="button" class="file-upload-btn" id="camera-btn">
                  ${SVG_CAMERA} <span id="camera-btn-text">Prendre une photo</span>
                </button>
              </div>
              <div class="file-name-display" id="file-name"></div>
            </div>
          </div>
          
          <div class="form-buttons">
            <button type="button" class="btn btn-prev" id="step5-prev">
              <span id="btn-prev-text-4">Précédent</span>
            </button>
            <button type="button" class="btn btn-submit" id="submit-button">
              <span id="submit-button-text">ENVOYER</span>
            </button>
          </div>
        </div>
        `;
        
        element.appendChild(formContainer);
        
        /*************************************************************
         * Step Navigation Functions
         *************************************************************/
        function showStep(stepNumber) {
          formContainer.querySelectorAll('.step-container').forEach(step => {
            step.classList.remove('active');
          });
          
          formContainer.querySelector(`#step-${stepNumber}`).classList.add('active');
          currentStep = stepNumber;
          updateProgressBar();
          
          // Scroll to top of form
          formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        function updateProgressBar() {
          const progressBar = formContainer.querySelector('#progress-bar');
          const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
          progressBar.style.width = `${progressPercentage}%`;
          
          formContainer.querySelectorAll('.step-item').forEach(item => {
            const stepNumber = parseInt(item.getAttribute('data-step'));
            item.classList.remove('active', 'completed');
            
            if (stepNumber === currentStep) {
              item.classList.add('active');
            } else if (stepNumber < currentStep) {
              item.classList.add('completed');
            }
          });
        }
        
        /*************************************************************
         * Update text elements based on selected language
         *************************************************************/
        function updateAllTexts() {
          // Progress steps
          document.getElementById('progress-step1').textContent = getText('step0Title');
          document.getElementById('progress-step2').textContent = getText('step1Title');
          document.getElementById('progress-step3').textContent = getText('step2Title');
          document.getElementById('progress-step4').textContent = getText('step3Title');
          document.getElementById('progress-step5').textContent = getText('step4Title');
          
          // Step headings
          document.getElementById('step1-heading').textContent = getText('step0Title');
          document.getElementById('step2-heading').textContent = getText('step1Title');
          document.getElementById('step3-heading').textContent = getText('step2Title');
          document.getElementById('step4-heading').textContent = getText('contactTime');
          document.getElementById('step5-heading').textContent = getText('step4Title');
          
          // Terms and conditions
          document.getElementById('terms-title').textContent = getText('termsTitle');
          document.getElementById('terms-content').textContent = getText('termsContent');
          document.getElementById('travel-fee-label').textContent = getText('travelFee');
          document.getElementById('travel-fee-amount').textContent = getText('travelFeeAmount');
          document.getElementById('hourly-rate-label').textContent = getText('hourlyRate');
          document.getElementById('hourly-rate-details').textContent = getText('hourlyRateDetails');
          document
  .getElementById('accept-terms-text')
  .textContent = getText('acceptTerms');

          
          // Personal information labels
          document.getElementById('label-firstname').textContent = getText('firstName');
          document.getElementById('label-lastname').textContent = getText('lastName');
          document.getElementById('label-email').textContent = getText('email');
          document.getElementById('label-phone').textContent = getText('phone');
          document.getElementById('label-address').textContent = getText('address');
          document.getElementById('label-apartment').textContent = getText('apartmentNumber');
          document.getElementById('label-city').textContent = getText('city');
          document.getElementById('label-postalcode').textContent = getText('postalCode');
          
          // System information labels
          document.getElementById('label-system-brand').textContent = getText('systemBrand');
          document.getElementById('label-model-number').textContent = getText('modelNumber');
          document.getElementById('label-serial-number').textContent = getText('serialNumber');
          document.getElementById('label-installation-year').textContent = getText('installationYear');
          document.getElementById('label-installation-type').textContent = getText('installationType');
          document.getElementById('label-installed-by').textContent = getText('installedBy');
          document.getElementById('label-owner-status').textContent = getText('ownerOrTenant');
          document.getElementById('label-tenant-info').textContent = getText('tenantInfo');
          
          // Placeholders
          document.getElementById('tenant-info').placeholder = getText('tenantInfoPlaceholder');
          document.getElementById('problem-description').placeholder = getText('problemDescriptionPlaceholder');
          
          // Radio button texts
          document.getElementById('installed-by-yes-text').textContent = getText('yes');
          document.getElementById('installed-by-no-text').textContent = getText('no');
          document.getElementById('owner-text').textContent = currentLanguage === 'fr' ? 'Propriétaire' : 'Owner';
          document.getElementById('tenant-text').textContent = currentLanguage === 'fr' ? 'Locataire' : 'Tenant';
          
          // Calendar & Availability
          document.getElementById('calendar-header-title').textContent = getText('selectDateAndTime');
          document.getElementById('time-choice-label').textContent = getText('chooseOption');
          document.getElementById('morning-title').textContent = getText('morning');
          document.getElementById('afternoon-title').textContent = getText('afternoon');
          document.getElementById('morning-hours').textContent = getText('morningHours');
          document.getElementById('afternoon-hours').textContent = getText('afternoonHours');
          document.getElementById('add-slot-text').textContent = getText('addThisSlot');
          document.getElementById('max-slots-message').textContent = getText('maxSlotsReached');
          document.getElementById('selected-slots-title').textContent = getText('selectedSlots');
          
          // Problem description
          document.getElementById('label-problem').textContent = getText('problemDescription');
          document.getElementById('label-photo').textContent = getText('uploadPhoto');
          
          // File upload texts
          document.getElementById('upload-text').textContent = getText('dropImageText');
          document.getElementById('upload-btn-text').textContent = getText('chooseFile');
          document.getElementById('camera-btn-text').textContent = getText('takePhoto');
          
          // Navigation buttons
          document.getElementById('btn-next-text').textContent = getText('next');
          document.getElementById('btn-next-text-2').textContent = getText('next');
          document.getElementById('btn-next-text-3').textContent = getText('next');
          document.getElementById('btn-next-text-4').textContent = getText('next');
          document.getElementById('btn-prev-text').textContent = getText('previous');
          document.getElementById('btn-prev-text-2').textContent = getText('previous');
          document.getElementById('btn-prev-text-3').textContent = getText('previous');
          document.getElementById('btn-prev-text-4').textContent = getText('previous');
          document.getElementById('submit-button-text').textContent = getText('submit');
          
          // Error messages
          document.getElementById('error-firstname-text').textContent = getText('firstNameRequired');
          document.getElementById('error-lastname-text').textContent = getText('lastNameRequired');
          document.getElementById('error-phone-text').textContent = getText('phoneRequired');
          document.getElementById('error-email-text').textContent = getText('emailRequired');
          document.getElementById('error-address-text').textContent = getText('addressRequired');
          document.getElementById('error-city-text').textContent = getText('cityRequired');
          document.getElementById('error-postalcode-text').textContent = getText('postalCodeRequired');
          document.getElementById('error-terms-text').textContent = getText('termsRequired');
          document.getElementById('error-problem-text').textContent = getText('problemRequired');
          document.getElementById('error-timeslots-text').textContent = getText('timeSlotsRequired');
          document.getElementById('error-installation-type-text').textContent = currentLanguage === 'fr' ? 
            'Vous devez sélectionner un type d\'installation.' : 
            'You must select an installation type.';
          
          // Dropdown placeholders
          document.getElementById('installation-type-placeholder').textContent = getText('selectPlaceholder');
          
          // Update the dropdown
          updateInstallationTypeDropdown();
          
          // Update calendar components
          updateCurrentMonthDisplay();
          updateWeekdays();
          
          // Re-render calendar to update dates
          generateCalendar();
          
          // Re-render selected slots to update text
          renderSelectedSlots();
        }
        
        /*************************************************************
         * Installation Type Dropdown
         *************************************************************/
        function updateInstallationTypeDropdown() {
          const nameKey = currentLanguage === "fr" ? "name_fr" : "name_en";
          
          // Installation Type dropdown
          const installationTypes = optionsData.installationTypes.map(type => ({
            id: type[nameKey],
            name: type[nameKey]
          }));
          
          initializeCustomDropdown("installation-type-dropdown", getText("selectPlaceholder"), installationTypes);
        }
        
        function initializeCustomDropdown(dropdownId, placeholderText, optionsData, onSelect) {
          const container = document.getElementById(dropdownId);
          if (!container) {
            console.error(`Dropdown container #${dropdownId} not found`);
            return;
          }
          
          const selectDisplay = container.querySelector('.select-display');
          const customOptions = container.querySelector('.custom-options');
          const dropdownIcon = container.querySelector('.dropdown-icon');
          const nativeSelect = container.querySelector('select');
          
          // Clear and initialize the native select
          nativeSelect.innerHTML = `<option value="" disabled selected>${placeholderText}</option>`;
          selectDisplay.querySelector('span').textContent = placeholderText;
          customOptions.innerHTML = "";
          
          // Add options to the dropdown
          optionsData.forEach(item => {
            const optionEl = document.createElement('div');
            optionEl.className = 'custom-option';
            optionEl.dataset.value = item.id || item.name;
            optionEl.innerHTML = `<div class="option-checkbox">${SVG_CHECK}</div><span>${item.name}</span>`;
            customOptions.appendChild(optionEl);
            
            const opt = document.createElement('option');
            opt.value = item.id || item.name;
            opt.textContent = item.name;
            nativeSelect.appendChild(opt);
            
            // Option click handler
            optionEl.addEventListener('click', function(e) {
              e.stopPropagation();
              customOptions.querySelectorAll('.custom-option').forEach(opt => {
                opt.classList.remove('selected');
              });
              this.classList.add('selected');
              selectDisplay.querySelector('span').textContent = item.name;
              nativeSelect.value = item.id || item.name;
              customOptions.classList.remove('show-options');
              dropdownIcon.classList.remove('rotate');
              
              if (onSelect) onSelect(item);
              
              const errorEl = container.querySelector(".error-message") || 
                            container.parentNode.querySelector(".error-message");
              if (errorEl) errorEl.style.display = "none";
              
              // Close the dropdown immediately after selection
              customOptions.style.display = 'none';
            });
          });
          
          // Use a direct click handler for the dropdown display
          selectDisplay.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other open dropdowns
            document.querySelectorAll('.custom-options').forEach(optList => {
              if (optList !== customOptions) {
                optList.classList.remove('show-options');
                optList.style.display = 'none';
              }
            });
            
            document.querySelectorAll('.dropdown-icon').forEach(icon => {
              if (icon !== dropdownIcon) {
                icon.classList.remove('rotate');
              }
            });
            
            // Toggle dropdown visibility with explicit display style
            if (customOptions.classList.contains('show-options')) {
              customOptions.classList.remove('show-options');
              customOptions.style.display = 'none';
              dropdownIcon.classList.remove('rotate');
            } else {
              customOptions.classList.add('show-options');
              customOptions.style.display = 'block';
              dropdownIcon.classList.add('rotate');
            }
          };
          
          // Close dropdown when clicking outside
          document.addEventListener('click', function(e) {
            if (!container.contains(e.target)) {
              customOptions.classList.remove('show-options');
              customOptions.style.display = 'none';
              dropdownIcon.classList.remove('rotate');
            }
          });
        }

        /*************************************************************
         * Ownership Status Radio Buttons
         *************************************************************/
        function setupOwnershipStatus() {
          const ownerRadio = document.getElementById('owner-status-owner');
          const tenantRadio = document.getElementById('owner-status-tenant');
          const tenantInfoContainer = document.getElementById('tenant-info-container');
          
          // Handler function for owner/tenant radio change
          function handleOwnershipChange() {
            tenantInfoContainer.style.display = tenantRadio.checked ? 'block' : 'none';
          }
          
          // Add event listeners
          ownerRadio.addEventListener('change', handleOwnershipChange);
          tenantRadio.addEventListener('change', handleOwnershipChange);
          
          // Initial call to set the correct display
          handleOwnershipChange();
        }
        
        /*************************************************************
         * Live Validation for Input Fields
         *************************************************************/
        formContainer.querySelector("#first-name").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorFirstName").style.display = "none";
        });
        
        formContainer.querySelector("#last-name").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorLastName").style.display = "none";
        });
        
        formContainer.querySelector("#phone").addEventListener("input", function() {
          if (isValidPhoneNumber(this.value.trim())) formContainer.querySelector("#errorPhone").style.display = "none";
        });
        
        formContainer.querySelector("#email").addEventListener("input", function() {
          if (isValidEmail(this.value.trim())) formContainer.querySelector("#errorEmail").style.display = "none";
        });
        
        formContainer.querySelector("#address").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorAddress").style.display = "none";
        });
        
        formContainer.querySelector("#city").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorCity").style.display = "none";
        });
        
        formContainer.querySelector("#postal-code").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorPostalCode").style.display = "none";
        });
        
        formContainer.querySelector("#problem-description").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorProblem").style.display = "none";
        });
        
        formContainer.querySelector("#accept-terms").addEventListener("change", function() {
          if (this.checked) formContainer.querySelector("#errorTerms").style.display = "none";
        });

        /*************************************************************
         * Calendar Implementation 
         *************************************************************/
        // Calendar state
        const calendarState = {
          currentDate: new Date(),
          selectedDate: null,
          selectedTime: null, // "morning" or "afternoon"
          workingDays: [1, 2, 3, 4, 5], // Monday to Friday (0=Sunday, 6=Saturday)
          selectedSlots: [] // Array to store selected availabilities
        };
        
        // Date formatters based on language
        function createDateFormatter(type) {
          return {
            format: function(date) {
              if (currentLanguage === "fr") {
                const frFormatter = new Intl.DateTimeFormat('fr-FR', type);
                return frFormatter.format(date);
              } else {
                const enFormatter = new Intl.DateTimeFormat('en-US', type);
                return enFormatter.format(date);
              }
            }
          };
        }
        
        const monthYearFormatter = createDateFormatter({ month: 'long', year: 'numeric' });
        const fullDateFormatter = createDateFormatter({ 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        });
        
        // Update current month display
        function updateCurrentMonthDisplay() {
          const monthDisplay = formContainer.querySelector('#current-month-display');
          monthDisplay.textContent = monthYearFormatter.format(calendarState.currentDate);
        }
        
        // Update weekday names based on language
        function updateWeekdays() {
          const weekdaysContainer = formContainer.querySelector('#weekdays-container');
          const weekdays = getText('weekdays');
          
          weekdaysContainer.innerHTML = '';
          weekdays.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            weekdaysContainer.appendChild(dayDiv);
          });
        }
        
        // Check if a day is a working day
        function isWorkingDay(date) {
          const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
          return calendarState.workingDays.includes(day);
        }
        
        // Generate calendar
        function generateCalendar() {
          const daysContainer = formContainer.querySelector('#calendar-days');
          daysContainer.innerHTML = '';
          
          const currentYear = calendarState.currentDate.getFullYear();
          const currentMonth = calendarState.currentDate.getMonth();
          
          // First day of month
          const firstDay = new Date(currentYear, currentMonth, 1);
          const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
          
          // Last day of month
          const lastDay = new Date(currentYear, currentMonth + 1, 0);
          const totalDays = lastDay.getDate();
          
          // Today
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          // Add empty days for start of month
          for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day inactive';
            daysContainer.appendChild(emptyDay);
          }
          
          // Add days of the month
          for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = day;
            
            // Check if weekend
            if (!isWorkingDay(date)) {
              dayElement.classList.add('weekend');
            }
            
            // Check if today
            if (date.toDateString() === today.toDateString()) {
              dayElement.classList.add('today');
            }
            
            // Check if day is in the past
            if (date < today) {
              dayElement.classList.add('inactive');
            } else if (isWorkingDay(date)) {
              dayElement.classList.add('available');
              
              // Check if selected day
              if (calendarState.selectedDate && 
                  date.getDate() === calendarState.selectedDate.getDate() &&
                  date.getMonth() === calendarState.selectedDate.getMonth() &&
                  date.getFullYear() === calendarState.selectedDate.getFullYear()) {
                dayElement.classList.add('active');
              }
              
              // Add click event only for working days
              dayElement.addEventListener('click', () => {
                // Remove active class from all days
                formContainer.querySelectorAll('.day').forEach(d => d.classList.remove('active'));
                
                // Add active class to clicked day
                dayElement.classList.add('active');
                
                // Update selected date
                calendarState.selectedDate = new Date(currentYear, currentMonth, day);
                
                // Reset selected time
                calendarState.selectedTime = null;
                
                // Reset time choices
                resetTimeChoices();
                
                // Update add slot button
                updateAddSlotButton();
                
                // Show time choices
                showTimeChoices();
              });
            }
            
            daysContainer.appendChild(dayElement);
          }
          
          // Update month display
          updateCurrentMonthDisplay();
          
          // Show or hide time choices based on selected date
          if (calendarState.selectedDate) {
            showTimeChoices();
          } else {
            hideTimeChoices();
          }
        }
        
        // Reset time choices (morning/afternoon)
        function resetTimeChoices() {
          formContainer.querySelectorAll('.time-choice').forEach(choice => {
            choice.classList.remove('selected');
          });
        }
        
        // Show time choices
        function showTimeChoices() {
          const timeChoiceContainer = formContainer.querySelector('#time-choice-container');
          timeChoiceContainer.style.display = 'block';
        }
        
        // Hide time choices
        function hideTimeChoices() {
          const timeChoiceContainer = formContainer.querySelector('#time-choice-container');
          timeChoiceContainer.style.display = 'none';
        }
        
        // Build slot representation
        function buildSlotRepresentation(date, timeOfDay) {
          const formattedDate = fullDateFormatter.format(date);
          const timeLabel = timeOfDay === 'morning' 
            ? getText('morning') + ' (' + getText('morningHours') + ')' 
            : getText('afternoon') + ' (' + getText('afternoonHours') + ')';
          
          return {
            date: new Date(date),
            timeOfDay: timeOfDay,
            id: `${date.toISOString().split('T')[0]}_${timeOfDay}`,
            displayText: `${formattedDate} - ${timeLabel}`
          };
        }
        
        // Add selected slot
        function addSelectedSlot() {
          // Check if date and time are selected
          if (!calendarState.selectedDate || !calendarState.selectedTime) {
            return;
          }
          
          // Check if max slots not reached
          if (calendarState.selectedSlots.length >= 5) {
            showMaxSlotsMessage();
            return;
          }
          
          // Build slot ID
          const slotId = `${calendarState.selectedDate.toISOString().split('T')[0]}_${calendarState.selectedTime}`;
          
          // Check if slot not already selected
          if (calendarState.selectedSlots.some(slot => slot.id === slotId)) {
            return;
          }
          
          // Add slot to list
          const newSlot = buildSlotRepresentation(calendarState.selectedDate, calendarState.selectedTime);
          calendarState.selectedSlots.push(newSlot);
          
          // Display selected slots
          renderSelectedSlots();
          
          // Reset current selections
          resetTimeChoices();
          calendarState.selectedTime = null;
          
          // Disable add button
          updateAddSlotButton();
          formContainer.querySelector("#errorTimeSlots").style.display = "none";
          
          // Show message if max reached
          if (calendarState.selectedSlots.length >= 5) {
            showMaxSlotsMessage();
          }
        }
        
        // Remove selected slot
        function removeSelectedSlot(slotId) {
          // Filter out slot to remove
          calendarState.selectedSlots = calendarState.selectedSlots.filter(slot => slot.id !== slotId);
          
          // Update display
          renderSelectedSlots();
          
          // Hide max slots message
          hideMaxSlotsMessage();
          
          // Hide container if no slots
          if (calendarState.selectedSlots.length === 0) {
            document.getElementById('selected-slots-container').style.display = 'none';
          }
        }
        
        // Render selected slots
        function renderSelectedSlots() {
          const slotsContainer = document.getElementById('selected-slots-container');
          const slotsList = document.getElementById('selected-slots-list');
          const slotsCount = document.getElementById('selected-slots-count');
          
          // Update count
          slotsCount.textContent = calendarState.selectedSlots.length;
          
          // Show container if slots exist
          if (calendarState.selectedSlots.length > 0) {
            slotsContainer.style.display = 'block';
            formContainer.querySelector("#errorTimeSlots").style.display = "none";
          } else {
            slotsContainer.style.display = 'none';
          }
          
          // Clear list
          slotsList.innerHTML = '';
          
          // Add each slot to list
          calendarState.selectedSlots.forEach(slot => {
            const slotItem = document.createElement('div');
            slotItem.className = 'selected-slot-item';
            slotItem.innerHTML = `
              <div class="selected-slot-info">${slot.displayText}</div>
              <button type="button" class="delete-slot" data-slot-id="${slot.id}">
                ${SVG_DELETE}
              </button>
            `;
            slotsList.appendChild(slotItem);
            
            // Add delete event
            slotItem.querySelector('.delete-slot').addEventListener('click', () => {
              removeSelectedSlot(slot.id);
            });
          });
        }
        
        // Update add slot button
        function updateAddSlotButton() {
          const addButton = document.getElementById('add-slot-btn');
          addButton.disabled = !calendarState.selectedDate || !calendarState.selectedTime || calendarState.selectedSlots.length >= 5;
        }
        
        // Show max slots message
        function showMaxSlotsMessage() {
          document.getElementById('max-slots-message').style.display = 'block';
        }
        
        // Hide max slots message
        function hideMaxSlotsMessage() {
          if (calendarState.selectedSlots.length < 5) {
            document.getElementById('max-slots-message').style.display = 'none';
          }
        }

        /*************************************************************
         * File Upload Functionality
         *************************************************************/
        const photoUploadInput = document.getElementById('photo-upload');
        const fileNameDisplay = document.getElementById('file-name');
        const uploadBtn = document.getElementById('upload-btn');
        const cameraBtn = document.getElementById('camera-btn');
        
        // Handle file selection
        photoUploadInput.addEventListener('change', function(e) {
          if (this.files && this.files[0]) {
            const fileName = this.files[0].name;
            fileNameDisplay.textContent = fileName;
            fileNameDisplay.style.display = 'block';
          }
        });
        
        // Trigger file input click when upload button is clicked
        uploadBtn.addEventListener('click', function() {
          photoUploadInput.click();
        });
        
        // Handle camera button (for mobile devices)
        cameraBtn.addEventListener('click', function() {
          photoUploadInput.setAttribute('capture', 'environment');
          photoUploadInput.click();
        });
        
        /*************************************************************
         * Step Form Validation
         *************************************************************/
        // Step 1 validation (Terms)
        function validateStep1() {
          let isValid = true;
          
          const acceptTerms = formContainer.querySelector("#accept-terms").checked;
          
          if (!acceptTerms) {
            formContainer.querySelector("#errorTerms").style.display = "flex";
            isValid = false;
          }
          
          return isValid;
        }
        
        // Step 2 validation (Personal Info)
        function validateStep2() {
          let isValid = true;
          
          const firstName = formContainer.querySelector("#first-name").value.trim();
          const lastName = formContainer.querySelector("#last-name").value.trim();
          const phone = formContainer.querySelector("#phone").value.trim();
          const email = formContainer.querySelector("#email").value.trim();
          const address = formContainer.querySelector("#address").value.trim();
          const city = formContainer.querySelector("#city").value.trim();
          const postalCode = formContainer.querySelector("#postal-code").value.trim();
          
          if (!firstName) {
            formContainer.querySelector("#errorFirstName").style.display = "flex";
            isValid = false;
          }
          
          if (!lastName) {
            formContainer.querySelector("#errorLastName").style.display = "flex";
            isValid = false;
          }
          
          if (!phone || !isValidPhoneNumber(phone)) {
            formContainer.querySelector("#errorPhone").style.display = "flex";
            isValid = false;
          }
          
          if (!email || !isValidEmail(email)) {
            formContainer.querySelector("#errorEmail").style.display = "flex";
            isValid = false;
          }
          
          if (!address) {
            formContainer.querySelector("#errorAddress").style.display = "flex";
            isValid = false;
          }
          
          if (!city) {
            formContainer.querySelector("#errorCity").style.display = "flex";
            isValid = false;
          }
          
          if (!postalCode) {
            formContainer.querySelector("#errorPostalCode").style.display = "flex";
            isValid = false;
          }
          
          return isValid;
        }
        
        // Step 3 validation (System Info)
        function validateStep3() {
          let isValid = true;
          
          // Check installation type
          const installationType = formContainer.querySelector("#installation-type").value;
          if (!installationType) {
            formContainer.querySelector("#errorInstallationType").style.display = "flex";
            isValid = false;
          }
          
          return isValid;
        }
        
        // Step 4 validation (Availability)
        function validateStep4() {
          let isValid = true;
          
          if (calendarState.selectedSlots.length === 0) {
            formContainer.querySelector("#errorTimeSlots").style.display = "flex";
            isValid = false;
          }
          
          return isValid;
        }
        
        // Step 5 validation (Problem Description)
        function validateStep5() {
          let isValid = true;
          
          const problemDescription = formContainer.querySelector("#problem-description").value.trim();
          
          if (!problemDescription) {
            formContainer.querySelector("#errorProblem").style.display = "flex";
            isValid = false;
          }
          
          return isValid;
        }
        
        // Step navigation event listeners
        formContainer.querySelector("#step1-next").addEventListener("click", function() {
          if (validateStep1()) {
            showStep(2);
          }
        });
        
        formContainer.querySelector("#step2-prev").addEventListener("click", function() {
          showStep(1);
        });
        
        formContainer.querySelector("#step2-next").addEventListener("click", function() {
          if (validateStep2()) {
            showStep(3);
          }
        });
        
        formContainer.querySelector("#step3-prev").addEventListener("click", function() {
          showStep(2);
        });
        
        formContainer.querySelector("#step3-next").addEventListener("click", function() {
          if (validateStep3()) {
            showStep(4);
          }
        });
        
        formContainer.querySelector("#step4-prev").addEventListener("click", function() {
          showStep(3);
        });
        
        formContainer.querySelector("#step4-next").addEventListener("click", function() {
          if (validateStep4()) {
            showStep(5);
          }
        });
        
        formContainer.querySelector("#step5-prev").addEventListener("click", function() {
          showStep(4);
        });
        
        /*************************************************************
         * Calendar Event Listeners
         *************************************************************/
        // Initialize calendar
        generateCalendar();
        
        // Add events for navigation buttons
        formContainer.querySelector('#prev-month').addEventListener('click', () => {
          calendarState.currentDate = new Date(
            calendarState.currentDate.getFullYear(),
            calendarState.currentDate.getMonth() - 1,
            1
          );
          generateCalendar();
        });
        
        formContainer.querySelector('#next-month').addEventListener('click', () => {
          calendarState.currentDate = new Date(
            calendarState.currentDate.getFullYear(),
            calendarState.currentDate.getMonth() + 1,
            1
          );
          generateCalendar();
        });
        
        // Add events for time options (morning/afternoon)
        formContainer.querySelector('#morning-choice').addEventListener('click', function() {
          if (!calendarState.selectedDate) return;
          
          resetTimeChoices();
          this.classList.add('selected');
          calendarState.selectedTime = 'morning';
          
          // Update add button state
          updateAddSlotButton();
        });
        
        formContainer.querySelector('#afternoon-choice').addEventListener('click', function() {
          if (!calendarState.selectedDate) return;
          
          resetTimeChoices();
          this.classList.add('selected');
          calendarState.selectedTime = 'afternoon';
          
          // Update add button state
          updateAddSlotButton();
        });
        
        // Add event for add availability button
        formContainer.querySelector('#add-slot-btn').addEventListener('click', addSelectedSlot);
        
        // Hide time options at start
        hideTimeChoices();

        /*************************************************************
         * Disable All Form Elements After Submission
         *************************************************************/
        function disableAllFormElements() {
          formContainer.querySelectorAll('input, select, textarea, button').forEach(el => {
            el.disabled = true;
          });
          formContainer.querySelectorAll('.day, .time-choice, .delete-slot, .select-display, .file-upload-btn').forEach(el => {
            el.style.pointerEvents = 'none';
          });
          formContainer.classList.add('disabled');
        }

        /*************************************************************
         * Form Submission
         *************************************************************/
        formContainer.querySelector("#submit-button").addEventListener("click", function() {
          if (!validateStep5()) {
            return;
          }
          
          // Get form data
          const firstName = formContainer.querySelector("#first-name").value.trim();
          const lastName = formContainer.querySelector("#last-name").value.trim();
          const phone = formContainer.querySelector("#phone").value.trim();
          const email = formContainer.querySelector("#email").value.trim();
          const address = formContainer.querySelector("#address").value.trim();
          const apartment = formContainer.querySelector("#apartment").value.trim();
          const city = formContainer.querySelector("#city").value.trim();
          const postalCode = formContainer.querySelector("#postal-code").value.trim();
          
          const systemBrand = formContainer.querySelector("#system-brand").value.trim();
          const modelNumber = formContainer.querySelector("#model-number").value.trim();
          const serialNumber = formContainer.querySelector("#serial-number").value.trim();
          const installationYear = formContainer.querySelector("#installation-year").value.trim();
          const installationType = formContainer.querySelector("#installation-type").value;
          
          // Get radio button values
          const installedByElixair = formContainer.querySelector("#installed-by-yes").checked;
          const isOwner = formContainer.querySelector("#owner-status-owner").checked;
          
          const tenantInfo = formContainer.querySelector("#tenant-info").value.trim();
          
          // Format availabilities
          const formattedAvailabilities = calendarState.selectedSlots.map(slot => ({
            date: slot.date.toISOString().split('T')[0],
            timeOfDay: slot.timeOfDay,
            displayText: slot.displayText
          }));
          
          const problemDescription = formContainer.querySelector("#problem-description").value.trim();
          
          // Get file data if uploaded
          const photoInput = formContainer.querySelector("#photo-upload");
          let hasPhoto = photoInput.files && photoInput.files.length > 0;
          
          // Update button state
          const submitButton = this;
          submitButton.disabled = true;
          submitButton.querySelector('#submit-button-text').textContent = getText('processing');
          submitButton.style.cursor = "not-allowed";
          submitButton.style.backgroundColor = "#4CAF50";
          submitButton.style.color = "white";
          
          // Mark form as submitted
          isFormSubmitted = true;
          
          // Send data to Voiceflow
          if (window.voiceflow && window.voiceflow.chat) {
            window.voiceflow.chat.interact({
              type: "service_request_complete",
              payload: {
                firstName,
                lastName,
                phone: formatPhoneNumber(phone),
                email,
                address,
                apartment,
                city,
                postalCode,
                systemBrand,
                modelNumber,
                serialNumber,
                installationYear,
                installationType,
                installedByElixair,
                isOwner,
                tenantInfo,
                availabilities: formattedAvailabilities,
                problemDescription,
                hasPhoto,
                language: currentLanguage
              }
            });
            submitButton.querySelector('#submit-button-text').textContent = getText('submitted');
          } else {
            console.log("Form data:", {
              firstName,
              lastName,
              phone: formatPhoneNumber(phone),
              email,
              address,
              apartment,
              city,
              postalCode,
              systemBrand,
              modelNumber,
              serialNumber,
              installationYear,
              installationType,
              installedByElixair,
              isOwner,
              tenantInfo,
              availabilities: formattedAvailabilities,
              problemDescription,
              hasPhoto,
              language: currentLanguage
            });
            submitButton.querySelector('#submit-button-text').textContent = getText('submitted');
          }
          
          // Disable all form elements
          disableAllFormElements();
        });

        /*************************************************************
         * Form Initialization
         *************************************************************/
        // Initialize installation type dropdown
        updateInstallationTypeDropdown();
        
        // Set up owner/tenant radio buttons
        setupOwnershipStatus();
        
        // Update texts based on language
        updateAllTexts();
        
        // Initialize progress bar
        updateProgressBar();
        
        // Initialize calendar
        updateWeekdays();
        generateCalendar();
      }
    };

    
 
