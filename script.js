    /*************************************************************
     * 1) Helper Functions and Constants
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

    function isValidUrl(url) {
      try {
        new URL(url);
        const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
        return urlPattern.test(url);
      } catch (e) {
        return false;
      }
    }
    
    // SVG constants
    const SVG_CHECK = 
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12px" height="12px">
        <path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
      </svg>`;
      
    const SVG_CHEVRON = 
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
        <g transform="translate(75, 75)">
          <path fill="#9C27B0" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </g>
      </svg>`;
      
    const SVG_LANGUAGE = 
      `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"/>
        <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"/>
      </svg>`;
      
    const SVG_Plus = 
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 400" width="15px" height="15px"> 
        <path fill="#9C27B0" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
      </svg>`;
      
    const SVG_Minus = 
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 400" width="15px" height="15px"> 
        <path fill="#9C27B0" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
      </svg>`;

    // New SVG icons for info tooltips


    const SVG_CLOSE = 
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="8px" height="8px">
        <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
      </svg>`;
      
    const SVG_INFO =
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
   <!-- background circle -->
   <path class="info-bg" fill="#f8e8f8"
     d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
   <!-- the “i” -->
   <path class="info-icon" fill="#9C27B0"
     d="M216 336l24 0 0-64-24 0
        c-13.3 0-24-10.7-24-24s10.7-24 24-24
        l48 0c13.3 0 24 10.7 24 24l0 88
        8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24
        l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208
        a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
 </svg>`;
 const SVG_USER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
      <path fill="#9C27B0" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
    </svg>`;
    const SVG_AGENT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
      <path fill="#9C27B0" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
    </svg>`;
    const SVG_MESSAGE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px"><path fill="#9C27B0" d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/></svg>`;

   


 

    /*************************************************************
     * 2) Data Creation Functions
     *************************************************************/
	 
	 const ServiceOptions = [
      {
        value: "IA agent",
        label: { en: "IA agent", fr: "Agent IA" },
      },
      {
        value: "Automation",
        label: { en: "Automation", fr: "Automatisation" },
      },
      {
        value: "Web site",
        label: { en: "Web site", fr: "Site web" },
      },
    ];
	
    
    
    function createFormData(language) {
      return formDataTranslations[language];
    }
    
    function addInfoButton(labelId, infoTitle, infoContent, language) {
      const label = document.getElementById(labelId);
      if (!label) return;
      
      // Create info button
      const infoButton = document.createElement('button');
      infoButton.className = 'info-button';
      infoButton.type = 'button';
      infoButton.setAttribute('aria-label', language === 'fr' ? 'Plus d\'informations' : 'More information');
      infoButton.innerHTML = SVG_INFO;
      
      // Create info panel
      const infoPanel = document.createElement('div');
      infoPanel.className = 'info-panel';
      infoPanel.id = `${labelId}-info`;
      
      // Add title if provided
      if (infoTitle) {
        const titleEl = document.createElement('div');
        titleEl.className = 'info-title';
        titleEl.textContent = infoTitle;
        infoPanel.appendChild(titleEl);
      }
      
      // Add content
      const contentEl = document.createElement('div');
      contentEl.innerHTML = infoContent;
      infoPanel.appendChild(contentEl);
      
      // Add close button
      const closeButton = document.createElement('button');
      closeButton.className = 'close-info';
      closeButton.type = 'button';
      closeButton.setAttribute('aria-label', language === 'fr' ? 'Fermer' : 'Close');
      closeButton.innerHTML = SVG_CLOSE;
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        infoPanel.classList.remove('show');
      });
      infoPanel.appendChild(closeButton);
      
      // Add click handler to button
      infoButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close any other open info panels
        document.querySelectorAll('.info-panel').forEach(panel => {
          if (panel.id !== infoPanel.id) {
            panel.classList.remove('show');
          }
        });
        
        // Toggle this panel
        infoPanel.classList.toggle('show');
      });
      
      // Append button to label
      label.appendChild(infoButton);
      
      // Find the parent form-group or question-group
      const parentGroup = label.closest('.form-group') || label.closest('.question-group');
      if (parentGroup) {
        // Insert panel after the label but before the next element
        parentGroup.insertBefore(infoPanel, label.nextSibling);
      }
    }

    function initializeInfoButtons(currentLanguage) {
      // Define info content in both languages
      const infoContent = {
        "fr": {
          crm: {
            title: "Systèmes de Gestion de la Relation Client (CRM)",
            content: `Un CRM vous permet de suivre les interactions avec vos clients et prospects. L'intégration de votre chatbot avec un CRM permet d'enregistrer automatiquement les conversations et les données des utilisateurs dans votre système existant.<br><br>Choisissez les CRMs que vous utilisez déjà ou que vous souhaitez intégrer.`
          },
          database: {
            title: "Bases de données",
            content: `Une base de données stocke les informations recueillies par votre chatbot. Cela peut inclure les profils utilisateurs, les préférences, l'historique des conversations, et d'autres données importantes.<br><br>Si vous avez des systèmes existants, sélectionnez-les pour que nous puissions configurer les intégrations appropriées.`
          },
          booking: {
            title: "Systèmes de réservation",
            content: `Les systèmes de réservation permettent à vos clients de prendre rendez-vous ou de réserver vos services directement via le chatbot. L'intégration avec votre système actuel permet de synchroniser les disponibilités et d'éviter les doubles réservations.<br><br>Si vous n'avez pas encore de système, nous pouvons vous recommander la solution la plus adaptée à vos besoins.`
          },
          formTypes: {
            title: "Types de formulaires",
            content: `Les formulaires interactifs peuvent être intégrés à votre chatbot pour collecter des informations spécifiques. Chaque type de formulaire est conçu pour un objectif particulier:<br><br>
              • <strong>Formulaire de contact</strong>: Recueille les coordonnées des visiteurs<br>
              • <strong>Génération de leads</strong>: Qualifie les prospects potentiels<br>
              • <strong>Questionnaire</strong>: Collecte des informations détaillées<br>
              • <strong>Réservation</strong>: Permet de réserver un créneau horaire<br>
              • <strong>Support client</strong>: Pour les demandes d'assistance<br>
              • Et plus encore selon vos besoins spécifiques`
          },
          websitePlatform: {
            title: "Plateformes Web",
            content: `La connaissance de votre plateforme web nous permet de créer une intégration optimale pour votre chatbot. Chaque plateforme a ses propres spécificités techniques et requiert une approche d'intégration différente.<br><br>Si votre site est personnalisé, précisez les technologies utilisées (PHP, Node.js, React, etc.).`
          },
          socialPlatforms: {
            title: "Plateformes sociales",
            content: `Votre chatbot peut être déployé sur différentes plateformes de messagerie sociale pour atteindre vos clients là où ils se trouvent. Chaque plateforme offre des fonctionnalités spécifiques et nécessite une configuration particulière.<br><br>Sélectionnez les plateformes où vous souhaitez déployer votre chatbot.`
          },
          languageType: {
            title: "Configuration linguistique",
            content: `Un chatbot multilingue peut communiquer avec vos utilisateurs dans plusieurs langues, élargissant ainsi votre audience potentielle. Un chatbot unilingue ne fonctionnera que dans une seule langue.<br><br>Le support multilingue est plus complexe à mettre en place mais offre une meilleure expérience utilisateur pour une audience internationale.`
          },
          leadCapture: {
            title: "Capture de prospects",
            content: `Cette fonctionnalité permet à votre chatbot de collecter automatiquement les informations de contact des visiteurs intéressés par vos produits ou services. Ces informations peuvent ensuite être transmises à votre équipe commerciale ou intégrées à votre CRM.`
          },
          leadQualification: {
            title: "Qualification de prospects",
            content: `Votre chatbot peut poser une série de questions pour déterminer si un visiteur correspond à votre client idéal. Cela permet de filtrer les prospects selon vos critères et de concentrer vos efforts sur les plus prometteurs.`
          },
          conversationSummary: {
            title: "Synthèse automatique des conversations",
            content: `Cette fonctionnalité permet à votre chatbot de générer automatiquement des résumés des conversations avec les utilisateurs. Ces synthèses extraient les points clés, les demandes et les engagements pris pendant l'échange.<br><br>Avantages:<br>
              • Suivi efficace des interactions clients<br>
              • Identification rapide des besoins récurrents<br>
              • Facilitation du transfert vers une personne réelle si nécessaire<br>
              • Documentation automatique des échanges pour analyse ultérieure`
          },
          websiteTraffic: {
            title: "Volume de trafic mensuel",
            content: `Cette information nous permet de dimensionner correctement votre solution de chatbot. Le volume de trafic influence:<br><br>
              • La capacité de traitement nécessaire<br>
              • Les ressources serveur à allouer<br>
              • La structure optimale des dialogues<br>
              • Les stratégies de mise en cache et d'optimisation<br><br>
              Un chatbot pour un site à fort trafic nécessite une architecture plus robuste et évolutive qu'un site avec moins de visiteurs.`
          },
          handleCancellation: {
            title: "Gestion des annulations et reports",
            content: `Cette fonctionnalité permet à vos clients de modifier ou d'annuler leurs réservations directement via le chatbot, sans intervention humaine.<br><br>Le chatbot peut:<br>
              • Accéder au calendrier des réservations existantes<br>
              • Proposer des créneaux alternatifs disponibles<br>
              • Confirmer les modifications par email/SMS<br>
              • Appliquer vos règles d'entreprise concernant les délais d'annulation ou les frais<br><br>
              Cette automatisation améliore l'expérience client tout en réduisant la charge de travail administrative.`
          }
        },
        "en": {
          crm: {
            title: "Customer Relationship Management (CRM) Systems",
            content: `A CRM helps you track interactions with your customers and leads. Integrating your chatbot with a CRM allows conversations and user data to be automatically recorded in your existing system.<br><br>Select the CRMs you already use or want to integrate with.`
          },
          database: {
            title: "Databases",
            content: `A database stores information collected by your chatbot. This can include user profiles, preferences, conversation history, and other important data.<br><br>If you have existing systems, select them so we can set up the appropriate integrations.`
          },
          booking: {
            title: "Booking Systems",
            content: `Booking systems allow your customers to make appointments or reserve your services directly through the chatbot. Integration with your current system ensures availability synchronization and prevents double bookings.<br><br>If you don't have a system yet, we can recommend the solution that best fits your needs.`
          },
          formTypes: {
            title: "Form Types",
            content: `Interactive forms can be integrated into your chatbot to collect specific information. Each form type is designed for a particular purpose:<br><br>
              • <strong>Contact Form</strong>: Collects visitor contact details<br>
              • <strong>Lead Generation</strong>: Qualifies potential prospects<br>
              • <strong>Survey</strong>: Gathers detailed information<br>
              • <strong>Booking</strong>: Allows scheduling a time slot<br>
              • <strong>Customer Support</strong>: For assistance requests<br>
              • And more based on your specific needs`
          },
          websitePlatform: {
            title: "Web Platforms",
            content: `Understanding your web platform allows us to create optimal integration for your chatbot. Each platform has its own technical specifications and requires a different integration approach.<br><br>If your site is custom-built, please specify the technologies used (PHP, Node.js, React, etc.).`
          },
          socialPlatforms: {
            title: "Social Platforms",
            content: `Your chatbot can be deployed on various social messaging platforms to reach your customers where they are. Each platform offers specific features and requires particular configuration.<br><br>Select the platforms where you want to deploy your chatbot.`
          },
          languageType: {
            title: "Language Configuration",
            content: `A multilingual chatbot can communicate with your users in multiple languages, expanding your potential audience. A unilingual chatbot will only work in one language.<br><br>Multilingual support is more complex to set up but provides a better user experience for an international audience.`
          },
          leadCapture: {
            title: "Lead Capture",
            content: `This feature allows your chatbot to automatically collect contact information from visitors interested in your products or services. This information can then be passed to your sales team or integrated into your CRM.`
          },
          leadQualification: {
            title: "Lead Qualification",
            content: `Your chatbot can ask a series of questions to determine if a visitor matches your ideal customer profile. This helps filter prospects according to your criteria and focus your efforts on the most promising ones.`
          },
          conversationSummary: {
            title: "Automated Conversation Synthesis",
            content: `This feature enables your chatbot to automatically generate summaries of user conversations. These summaries extract key points, requests, and commitments made during the interaction.<br><br>Benefits:<br>
              • Efficient tracking of customer interactions<br>
              • Quick identification of recurring needs<br>
              • Seamless handover to human agents when necessary<br>
              • Automatic documentation of exchanges for later analysis`
          },
          websiteTraffic: {
            title: "Monthly Traffic Volume",
            content: `This information helps us properly size your chatbot solution. Traffic volume influences:<br><br>
              • Required processing capacity<br>
              • Server resources allocation<br>
              • Optimal dialog structure<br>
              • Caching and optimization strategies<br><br>
              A chatbot for a high-traffic site requires a more robust and scalable architecture than a site with fewer visitors.`
          },
          handleCancellation: {
            title: "Cancellation and Rescheduling Management",
            content: `This functionality allows your customers to modify or cancel their bookings directly through the chatbot without human intervention.<br><br>The chatbot can:<br>
              • Access the calendar of existing reservations<br>
              • Offer available alternative time slots<br>
              • Confirm changes via email/SMS<br>
              • Apply your business rules regarding cancellation deadlines or fees<br><br>
              This automation improves customer experience while reducing administrative workload.`
          }
        }
      };
      
      // Add info buttons to specific fields - modified as requested
  addInfoButton('use-form-question', infoContent[currentLanguage].formTypes.title, infoContent[currentLanguage].formTypes.content, currentLanguage);
  addInfoButton('use-crm-question', infoContent[currentLanguage].crm.title, infoContent[currentLanguage].crm.content, currentLanguage);
  addInfoButton('has-booking-question', infoContent[currentLanguage].booking.title, infoContent[currentLanguage].booking.content, currentLanguage);
  addInfoButton('use-database-question', infoContent[currentLanguage].database.title, infoContent[currentLanguage].database.content, currentLanguage);
  addInfoButton('social-bot-question', infoContent[currentLanguage].socialPlatforms.title, infoContent[currentLanguage].socialPlatforms.content, currentLanguage);
  
  // Also add to "want booking recommendation" for users without booking systems
  addInfoButton('want-booking-recommendation', infoContent[currentLanguage].booking.title, infoContent[currentLanguage].booking.content, currentLanguage);
  
  // Keep other existing info buttons
  addInfoButton('platform-label', infoContent[currentLanguage].websitePlatform.title, infoContent[currentLanguage].websitePlatform.content, currentLanguage);
  addInfoButton('language-type-question', infoContent[currentLanguage].languageType.title, infoContent[currentLanguage].languageType.content, currentLanguage);
  addInfoButton('lead-capture-question', infoContent[currentLanguage].leadCapture.title, infoContent[currentLanguage].leadCapture.content, currentLanguage);
  addInfoButton('lead-qualification-question', infoContent[currentLanguage].leadQualification.title, infoContent[currentLanguage].leadQualification.content, currentLanguage);
  addInfoButton('conversation-summary-question', infoContent[currentLanguage].conversationSummary.title, infoContent[currentLanguage].conversationSummary.content, currentLanguage);
  addInfoButton('website-traffic-label', infoContent[currentLanguage].websiteTraffic.title, infoContent[currentLanguage].websiteTraffic.content, currentLanguage);
  addInfoButton('handle-cancellation-question', infoContent[currentLanguage].handleCancellation.title, infoContent[currentLanguage].handleCancellation.content, currentLanguage);
    }


    /*************************************************************
     * 3) SubmissionFormExtension - MAIN EXTENSION OBJECT
     *************************************************************/


    /*************************************************************
     * 1) Helper Functions and Constants
     *************************************************************/
    

    /*************************************************************
     * 2) Data Creation Functions
     *************************************************************/
    // Multilingual form data
    const formDataTranslations = {
      "fr": {
        languages: [
          { id: "fr", name: "Français" },
          { id: "en", name: "Anglais" },
          { id: "es", name: "Espagnol" },
          { id: "de", name: "Allemand" },
          { id: "it", name: "Italien" },
          { id: "ar", name: "Arabe" },
          { id: "zh", name: "Chinois" },
          // Langues supplémentaires
          { id: "pt", name: "Portugais" },
          { id: "ru", name: "Russe" },
          { id: "ja", name: "Japonais" },
          { id: "ko", name: "Coréen" },
          { id: "hi", name: "Hindi" },
          { id: "nl", name: "Néerlandais" },
          { id: "sv", name: "Suédois" }
        ],
        websiteTraffic: [
          { id: "less_than_1000", name: "Moins de 1 000 visiteurs/mois" },
          { id: "1000_5000", name: "1 000 - 5 000 visiteurs/mois" },
          { id: "5000_10000", name: "5 000 - 10 000 visiteurs/mois" },
          { id: "10000_50000", name: "10 000 - 50 000 visiteurs/mois" },
          { id: "50000_100000", name: "50 000 - 100 000 visiteurs/mois" },
          { id: "100000_500000", name: "100 000 - 500 000 visiteurs/mois" },
          { id: "500000_1000000", name: "500 000 - 1 000 000 visiteurs/mois" },
          { id: "more_than_1000000", name: "Plus de 1 000 000 visiteurs/mois" },
          { id: "unknown", name: "Je ne sais pas" },
          { id: "new_site", name: "Nouveau site (pas encore de trafic)" }
        ],
        crms: [
          { id: "salesforce", name: "Salesforce" },
          { id: "hubspot", name: "HubSpot" },
          { id: "zoho", name: "Zoho CRM" },
          { id: "pipedrive", name: "Pipedrive" },
          { id: "monday", name: "monday.com" },
          { id: "freshsales", name: "Freshsales" },
          // CRMs supplémentaires
          { id: "dynamics", name: "Microsoft Dynamics 365" },
          { id: "sugarcrm", name: "SugarCRM" },
          { id: "insightly", name: "Insightly" },
          { id: "bitrix24", name: "Bitrix24" },
          { id: "agilecrm", name: "Agile CRM" },
          { id: "keap", name: "Keap (Infusionsoft)" },
          { id: "efficy", name: "Efficy CRM" },
          { id: "netsuite", name: "NetSuite CRM" },
          { id: "other", name: "Autre" }
        ],
        bookingSystems: [
          { id: "cal", name: "Cal.com" },
          { id: "calendly", name: "Calendly" },
          { id: "acuity", name: "Acuity Scheduling" },
          { id: "booksy", name: "Booksy" },
          { id: "simplybook", name: "SimplyBook.me" },
          { id: "square", name: "Square Appointments" },
          { id: "google_calendar", name: "Google Calendar" },
          { id: "setmore", name: "Setmore" },
          { id: "appointy", name: "Appointy" },
          { id: "timetap", name: "TimeTap" },
          { id: "bookafy", name: "Bookafy" },
          { id: "schedulicity", name: "Schedulicity" },
          { id: "youcanbook", name: "YouCanBookMe" },
          { id: "planyo", name: "Planyo" },
          { id: "reservio", name: "Reservio" },
          { id: "other", name: "Autre" }
        ],
        databases: [
          { id: "mysql", name: "MySQL" },
          { id: "postgresql", name: "PostgreSQL" },
          { id: "mongodb", name: "MongoDB" },
          { id: "firebase", name: "Firebase" },
          { id: "airtable", name: "Airtable" },
          { id: "google_sheets", name: "Google Sheets" },
          { id: "oracle", name: "Oracle Database" },
          { id: "sqlserver", name: "Microsoft SQL Server" },
          { id: "mariadb", name: "MariaDB" },
          { id: "dynamodb", name: "Amazon DynamoDB" },
          { id: "cassandra", name: "Apache Cassandra" },
          { id: "redis", name: "Redis" },
          { id: "supabase", name: "Supabase" },
          { id: "notion", name: "Notion Database" },
          { id: "other", name: "Autre" }
        ],
        websitePlatforms: [
          { id: "wordpress", name: "WordPress" },
          { id: "shopify", name: "Shopify" },
          { id: "wix", name: "Wix" },
          { id: "squarespace", name: "Squarespace" },
          { id: "webflow", name: "Webflow" },
          { id: "custom", name: "Sur mesure" },
          { id: "drupal", name: "Drupal" },
          { id: "joomla", name: "Joomla" },
          { id: "magento", name: "Magento" },
          { id: "bigcommerce", name: "BigCommerce" },
          { id: "godaddy", name: "GoDaddy Website Builder" },
          { id: "strikingly", name: "Strikingly" },
          { id: "ghost", name: "Ghost" },
          { id: "prestashop", name: "PrestaShop" },
          { id: "bubble", name: "Bubble.io" },
          { id: "other", name: "Autre" }
        ],
        socialPlatforms: [
          { id: "facebook", name: "Facebook Messenger" },
          { id: "instagram", name: "Instagram" },
          { id: "whatsapp", name: "WhatsApp" },
          { id: "telegram", name: "Telegram" },
          { id: "discord", name: "Discord" },
          { id: "slack", name: "Slack" },
          { id: "viber", name: "Teams" }
        ],
        niches: [
          { id: "ecommerce", name: "E-commerce" },
          { id: "services", name: "Services professionnels" },
          { id: "healthcare", name: "Santé" },
          { id: "education", name: "Éducation" },
          { id: "realestate", name: "Immobilier" },
          { id: "restaurant", name: "Restauration" },
          { id: "fitness", name: "Fitness & Bien-être" },
          { id: "travel", name: "Voyage & Tourisme" },
          { id: "finance", name: "Finance & Assurance" },
          { id: "manufacturing", name: "Industrie manufacturière" },
          { id: "automotive", name: "Automobile" },
          { id: "legal", name: "Services juridiques" },
          { id: "technology", name: "IT & Technologie" },
          { id: "media", name: "Médias & Divertissement" },
          { id: "construction", name: "Construction & BTP" },
          { id: "agriculture", name: "Agriculture & Agroalimentaire" },
          { id: "nonprofit", name: "Associations & ONG" },
          { id: "beauty", name: "Beauté & Cosmétiques" },
          { id: "consulting", name: "Conseil & Consulting" },
          { id: "retail", name: "Commerce de détail" },
          { id: "other", name: "Autre" }
        ],
        formTypes: [
          { id: "contact", name: "Formulaire de contact" },
          { id: "lead", name: "Génération de leads" },
          { id: "survey", name: "Questionnaire" },
          { id: "booking", name: "Réservation" },
          { id: "support", name: "Support client" },
          { id: "feedback", name: "Feedback client" },
          { id: "quote", name: "Demande de devis" },
          { id: "registration", name: "Inscription/Enregistrement" },
          { id: "newsletter", name: "Abonnement newsletter" },
          { id: "contest", name: "Participation concours" },
          { id: "job", name: "Candidature emploi" },
          { id: "event", name: "Inscription événement" },
          { id: "payment", name: "Formulaire de paiement" },
          { id: "appointment", name: "Prise de rendez-vous" },
          { id: "order", name: "Bon de commande" },
          { id: "membership", name: "Adhésion" },
          { id: "other", name: "Autre" }
        ],
        budgetRanges: [
          { id: "less_than_1000", name: "Moins de 1 000 $" },
          { id: "1000_2500", name: "1 000 $ - 2 500 $" },
          { id: "2500_5000", name: "2 500 $ - 5 000 $" },
          { id: "5000_7500", name: "5 000 $ - 7 500 $" },
          { id: "7500_10000", name: "7 500 $ - 10 000 $" },
          { id: "more_than_10000", name: "Plus de 10 000 $" },
          { id: "monthly_subscription", name: "Abonnement mensuel" },
          { id: "annual_subscription", name: "Abonnement annuel" },
          { id: "not_specified", name: "Budget non défini" }
        ]
      },
      "en": {
        languages: [
          { id: "fr", name: "French" },
          { id: "en", name: "English" },
          { id: "es", name: "Spanish" },
          { id: "de", name: "German" },
          { id: "it", name: "Italian" },
          { id: "ar", name: "Arabic" },
          { id: "zh", name: "Chinese" },
          { id: "pt", name: "Portuguese" },
          { id: "ru", name: "Russian" },
          { id: "ja", name: "Japanese" },
          { id: "ko", name: "Korean" },
          { id: "hi", name: "Hindi" },
          { id: "nl", name: "Dutch" },
          { id: "sv", name: "Swedish" }
        ],
        websiteTraffic: [
          { id: "less_than_1000", name: "Less than 1,000 visitors/month" },
          { id: "1000_5000", name: "1,000 - 5,000 visitors/month" },
          { id: "5000_10000", name: "5,000 - 10,000 visitors/month" },
          { id: "10000_50000", name: "10,000 - 50,000 visitors/month" },
          { id: "50000_100000", name: "50,000 - 100,000 visitors/month" },
          { id: "100000_500000", name: "100,000 - 500,000 visitors/month" },
          { id: "500000_1000000", name: "500,000 - 1,000,000 visitors/month" },
          { id: "more_than_1000000", name: "More than 1,000,000 visitors/month" },
          { id: "unknown", name: "I don't know" },
          { id: "new_site", name: "New site (no traffic yet)" }
        ],
        crms: [
          { id: "salesforce", name: "Salesforce" },
          { id: "hubspot", name: "HubSpot" },
          { id: "zoho", name: "Zoho CRM" },
          { id: "pipedrive", name: "Pipedrive" },
          { id: "monday", name: "monday.com" },
          { id: "freshsales", name: "Freshsales" },
          // Additional CRMs
          { id: "dynamics", name: "Microsoft Dynamics 365" },
          { id: "sugarcrm", name: "SugarCRM" },
          { id: "insightly", name: "Insightly" },
          { id: "bitrix24", name: "Bitrix24" },
          { id: "agilecrm", name: "Agile CRM" },
          { id: "keap", name: "Keap (Infusionsoft)" },
          { id: "efficy", name: "Efficy CRM" },
          { id: "netsuite", name: "NetSuite CRM" },
          { id: "other", name: "Other" }
        ],
        bookingSystems: [
          { id: "cal", name: "Cal.com" },
          { id: "calendly", name: "Calendly" },
          { id: "acuity", name: "Acuity Scheduling" },
          { id: "booksy", name: "Booksy" },
          { id: "simplybook", name: "SimplyBook.me" },
          { id: "square", name: "Square Appointments" },
          { id: "google_calendar", name: "Google Calendar" },
          // Additional booking systems
          { id: "setmore", name: "Setmore" },
          { id: "appointy", name: "Appointy" },
          { id: "timetap", name: "TimeTap" },
          { id: "bookafy", name: "Bookafy" },
          { id: "schedulicity", name: "Schedulicity" },
          { id: "youcanbook", name: "YouCanBookMe" },
          { id: "planyo", name: "Planyo" },
          { id: "reservio", name: "Reservio" },
          { id: "other", name: "Other" }
        ],
        databases: [
          { id: "mysql", name: "MySQL" },
          { id: "postgresql", name: "PostgreSQL" },
          { id: "mongodb", name: "MongoDB" },
          { id: "firebase", name: "Firebase" },
          { id: "airtable", name: "Airtable" },
          { id: "google_sheets", name: "Google Sheets" },
          // Additional databases
          { id: "oracle", name: "Oracle Database" },
          { id: "sqlserver", name: "Microsoft SQL Server" },
          { id: "mariadb", name: "MariaDB" },
          { id: "dynamodb", name: "Amazon DynamoDB" },
          { id: "cassandra", name: "Apache Cassandra" },
          { id: "redis", name: "Redis" },
          { id: "supabase", name: "Supabase" },
          { id: "notion", name: "Notion Database" },
          { id: "other", name: "Other" }
        ],
        websitePlatforms: [
          { id: "wordpress", name: "WordPress" },
          { id: "shopify", name: "Shopify" },
          { id: "wix", name: "Wix" },
          { id: "squarespace", name: "Squarespace" },
          { id: "webflow", name: "Webflow" },
          { id: "custom", name: "Custom" },
          // Additional platforms
          { id: "drupal", name: "Drupal" },
          { id: "joomla", name: "Joomla" },
          { id: "magento", name: "Magento" },
          { id: "bigcommerce", name: "BigCommerce" },
          { id: "godaddy", name: "GoDaddy Website Builder" },
          { id: "strikingly", name: "Strikingly" },
          { id: "ghost", name: "Ghost" },
          { id: "prestashop", name: "PrestaShop" },
          { id: "bubble", name: "Bubble.io" },
          { id: "other", name: "Other" }
        ],
        socialPlatforms: [
          { id: "facebook", name: "Facebook Messenger" },
          { id: "instagram", name: "Instagram" },
          { id: "whatsapp", name: "WhatsApp" },
          { id: "telegram", name: "Telegram" },
          { id: "discord", name: "Discord" },
          { id: "slack", name: "Slack" },
          { id: "viber", name: "Teams" }
        ],
        niches: [
          { id: "ecommerce", name: "E-commerce" },
          { id: "services", name: "Professional Services" },
          { id: "healthcare", name: "Healthcare" },
          { id: "education", name: "Education" },
          { id: "realestate", name: "Real Estate" },
          { id: "restaurant", name: "Restaurant & Food" },
          { id: "fitness", name: "Fitness & Wellness" },
          { id: "travel", name: "Travel & Tourism" },
          { id: "finance", name: "Finance & Insurance" },
          // Additional niches
          { id: "manufacturing", name: "Manufacturing" },
          { id: "automotive", name: "Automotive" },
          { id: "legal", name: "Legal Services" },
          { id: "technology", name: "IT & Technology" },
          { id: "media", name: "Media & Entertainment" },
          { id: "construction", name: "Construction" },
          { id: "agriculture", name: "Agriculture & Farming" },
          { id: "nonprofit", name: "Non-profit & NGO" },
          { id: "beauty", name: "Beauty & Cosmetics" },
          { id: "consulting", name: "Consulting" },
          { id: "retail", name: "Retail" },
          { id: "other", name: "Other" }
        ],
        formTypes: [
          { id: "contact", name: "Contact Form" },
          { id: "lead", name: "Lead Generation" },
          { id: "survey", name: "Survey" },
          { id: "booking", name: "Booking" },
          { id: "support", name: "Customer Support" },
          { id: "feedback", name: "Customer Feedback" },
          { id: "quote", name: "Quote Request" },
          // Additional form types
          { id: "registration", name: "Registration" },
          { id: "newsletter", name: "Newsletter Signup" },
          { id: "contest", name: "Contest/Giveaway Entry" },
          { id: "job", name: "Job Application" },
          { id: "event", name: "Event Registration" },
          { id: "payment", name: "Payment Form" },
          { id: "appointment", name: "Appointment Scheduling" },
          { id: "order", name: "Order Form" },
          { id: "membership", name: "Membership Application" },
          { id: "other", name: "Other" }
        ],
        budgetRanges: [
          { id: "less_than_1000", name: "Less than 1,000 $" },
          { id: "1000_2500", name: "1,000 $ - 2,500 $" },
          { id: "2500_5000", name: "2,500 $ - 5,000 $" },
          { id: "5000_7500", name: "5,000 $ - 7,500 $" },
          { id: "7500_10000", name: "7,500 $ - 10,000 $" },
          { id: "monthly_subscription", name: "Monthly Subscription" },
          { id: "annual_subscription", name: "Annual Subscription" },
          { id: "not_specified", name: "Budget not defined" }
        ]
      }
    };
    
    function createFormData(language) {
      return formDataTranslations[language];
    }
    
    
	
    /*************************************************************
     * 3) SubmissionFormExtension - MAIN EXTENSION OBJECT
     *************************************************************/

       const SubmissionFormExtension = {
      name: "ChatbotForm",
      type: "response",
      match: ({ trace }) => trace.type === "ext_submission_form" || trace.payload?.name === "ext_submission_form",
      render: ({ trace, element }) => {
        // Get language from payload with French as default
        //let { currentLanguage = "fr" } = trace.payload || {};
        let currentLanguage = trace.payload?.currentLanguage || "fr";
        // Initialize form data with the current language
        let formData = createFormData(currentLanguage);
        
        // Step management
        let currentStep = 1;
        const totalSteps = 9; // Updated for 9 steps
        let isFormSubmitted = false;
        const TIMEOUT_DURATION = 300000; // 900 seconds (15 minutes) in milliseconds
        let formTimeoutId = null;

        // Form data store
        const formValues = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          teamSize: null,
          services: "",
          useForm: null,
          formPurpose: "",
          leadCapture: null,
          leadQualification: null,
          conversationSummary: null,
          hasWebsite: null,
          websitePlatform: null,
          otherPlatform: "",
          websiteUrl: "",
          websiteTraffic: null,
          needSocialBot: null,
          useCRM: null,
          formTypes: [],
          crms: [],
          socialPlatforms: [],
          databases: [],
          languages: [],
          hasBookingSystem: null,
          bookingSystems: null,
          wantBookingRecommendation: null,
          handleCancellation: null,
          useDatabase: null,
          languageType: null,
          niche: null,
          otherNiche: "",
          description: "",
          budget: null,
          customBudget: "",
          formLanguage: currentLanguage // Store the form language
        };
        
		
    // URL du webhook Make - Remplacez par votre URL réelle
    const WEBHOOK_URL = "https://hook.us2.make.com/va34lvxwhhcbp3iojevheqivo2ybbxua";
	        const translations = {
          "fr": {
            // Steps
            step1Title: "Coordonnées professionnelles",
            step2Title: "Spécifications du projet",
            step3Title: "Profil d'entreprise",
            step4Title: "Fonctionnalités essentielles",
            step5Title: "Intégration de formulaires",
            step6Title: "Intégration Web",
            step7Title: "Intégrations & API",
            step8Title: "Canaux d'interaction",
            step9Title: "Synthèse de votre projet",
            
            // Navigation
            next: "Suivant",
            previous: "Précédent",
            submit: "Soumettre votre projet",
            processing: "Traitement en cours...",
            submitted: "Soumis avec succès !",
            
            // Step 1 - Contact
            firstName: "Prénom",
            lastName: "Nom de famille",
            email: "Adresse électronique",
            phone: "Numéro de téléphone",
            company: "Société/Organisation",
            companyOptional: "Société/Organisation (facultatif)",
            
            // Step 2 - Project Details
            selectNiche: "Quel est votre secteur d'activité ?",
            otherNicheSpecify: "Veuillez préciser votre secteur",
            projectDescription: "Description exhaustive de votre projet",
            projectDescriptionPlaceholder: "Veuillez détailler vos objectifs, exigences et attentes spécifiques...",
            budgetQuestion: "Budget alloué au projet",
            customBudgetQuestion: "Veuillez détailler votre budget",
            
            // Step 3 - Business Profile
            teamSizeQuestion: "Effectif de votre organisation",
            solo: "Entrepreneur individuel",
            smallTeam: "TPE (2-10 employés)",
            mediumTeam: "PME (11-50 employés)",
            largeTeam: "Grande entreprise (50+ employés)",
            servicesQuestion: "Services et produits proposés",
            servicesPlaceholder: "Détaillez vos offres de services et produits phares...",
            
            // Step 4 - Core Features
            leadCaptureQuestion: "Souhaitez-vous implémenter la capture de prospects ?",
            leadQualificationQuestion: "Nécessitez-vous un système de qualification des prospects ?",
            conversationSummaryQuestion: "Souhaitez-vous des synthèses automatiques de conversations ?",
            
            // Step 5 - Forms
            useFormQuestion: "Souhaitez-vous intégrer des formulaires interactifs ?",
            selectFormTypes: "Types de formulaires à intégrer",
            formPurposeQuestion: "Objectif et fonction des formulaires",
            formPurposePlaceholder: "Précisez les objectifs et résultats attendus des formulaires...",
            
            // Step 6 - Website
            websiteQuestion: "Disposez-vous d'un site web existant ?",
            selectPlatform: "Plateforme de développement de votre site",
            websiteUrlLabel: "Adresse URL complète de votre site",
            websiteTrafficLabel: "Volume de trafic mensuel estimé",
            websiteTrafficQuestion: "Volume de trafic mensuel estimé",
            
            // Step 7 - Integrations
            useCRMQuestion: "Prévoyez-vous d'intégrer votre chatbot à un CRM ?",
            yes: "Oui",
            no: "Non",
            selectCRMs: "CRM à connecter avec votre chatbot",
            hasBookingQuestion: "Disposez-vous d'un système de réservation à intégrer ?",
            selectBookingSystems: "Système de réservation à connecter",
            handleCancellationQuestion: "Souhaitez-vous que le chatbot gère les annulations et reports ?",
            useDatabaseQuestion: "Prévoyez-vous d'intégrer une base de données externe ?",
            selectDatabases: "Bases de données à connecter",
            databaseSuggestion: "Nous vous proposerons des solutions de bases de données adaptées",
            wantBookingRecommendation: "Désirez-vous une recommandation pour un système de réservation adapté ?",
            
            // Step 8 - Communication Channels
            needSocialBotQuestion: "Souhaitez-vous déployer le chatbot sur les réseaux sociaux ?",
            selectSocialPlatforms: "Plateformes sociales à intégrer",
            languageTypeQuestion: "Configuration linguistique du chatbot",
            multilingual: "Support multilingue",
            unilingual: "Langue unique",
            selectLanguages: "Langues à prendre en charge",
            selectLanguage: "Langue principale",
            
            // Step 9 - Recap
            recapTitle: "Synthèse de votre projet",
            recapContact: "Coordonnées professionnelles",
            recapProject: "Spécifications du projet",
            recapBusiness: "Profil d'entreprise",
            recapFeatures: "Fonctionnalités essentielles",
            recapForms: "Intégration de formulaires",
            recapWebsite: "Intégration Web",
            recapIntegrations: "Intégrations & API",
            recapChannels: "Canaux d'interaction",
            edit: "Modifier",
            
            // Validation
            required: "requis",
            selectAtLeastOne: "Veuillez sélectionner au moins une option",
            enterValidEmail: "Veuillez saisir une adresse électronique valide",
            enterValidPhone: "Veuillez saisir un numéro de téléphone valide",
            fieldRequired: "Ce champ est requis",
            
            // Placeholders
            selectPlaceholder: "-- Veuillez sélectionner --",
            selectMultiplePlaceholder: "-- Sélection multiple --",
            enterText: "Saisissez votre texte ici...",
            other: "Autre",
            
            // Confirmation
            confirmationTitle: "Demande soumise avec succès !",
            confirmationMessage: "Merci pour votre soumission. Notre équipe d'experts analysera votre projet et vous contactera prochainement.",
            backToForm: "Retour au formulaire",
            
            // Erreurs
            errorSubmission: "Erreur lors de la soumission. Veuillez réessayer.",
            firstNameRequired: "Le prénom est requis",
            lastNameRequired: "Le nom de famille est requis",
            emailRequired: "L'adresse électronique est requise",
            emailInvalid: "Format d'adresse électronique invalide",
            phoneRequired: "Le numéro de téléphone est requis",
            phoneInvalid: "Format de numéro de téléphone invalide",
            nicheRequired: "Veuillez sélectionner un secteur d'activité",
            otherNicheRequired: "Veuillez préciser votre secteur",
            budgetRequired: "Veuillez sélectionner un budget",
            customBudgetRequired: "Veuillez détailler votre budget",
            descriptionRequired: "La description du projet est requise",
            teamSizeRequired: "Veuillez sélectionner l'effectif de votre organisation",
            servicesRequired: "Veuillez décrire vos services et produits",
            leadCaptureRequired: "Veuillez sélectionner une option",
            leadQualificationRequired: "Veuillez sélectionner une option",
            conversationSummaryRequired: "Veuillez sélectionner une option",
            useFormRequired: "Veuillez sélectionner une option",
            formTypesRequired: "Veuillez sélectionner au moins un type de formulaire",
            hasWebsiteRequired: "Veuillez indiquer si vous disposez d'un site web",
            platformRequired: "Veuillez sélectionner une plateforme",
            otherPlatformRequired: "Veuillez préciser la plateforme utilisée",
            websiteUrlRequired: "L'URL du site web est requise",
            websiteUrlInvalid: "Format d'URL invalide",
            websiteTrafficRequired: "Veuillez indiquer le volume de trafic de votre site",
            useCrmRequired: "Veuillez indiquer si vous souhaitez intégrer un CRM",
            crmsRequired: "Veuillez sélectionner au moins un CRM",
            hasBookingRequired: "Veuillez indiquer si vous disposez d'un système de réservation",
            bookingSystemsRequired: "Veuillez sélectionner un système de réservation",
            useDatabaseRequired: "Veuillez indiquer si vous souhaitez intégrer une base de données",
            databasesRequired: "Veuillez sélectionner au moins une base de données",
            needSocialRequired: "Veuillez indiquer si vous souhaitez déployer le chatbot sur les réseaux sociaux",
            socialPlatformsRequired: "Veuillez sélectionner au moins une plateforme sociale",
            languageTypeRequired: "Veuillez sélectionner une configuration linguistique",
            languagesRequired: "Veuillez sélectionner au moins une langue"
          },
          
          "en": {
            // Steps
            step1Title: "Professional Contact Details",
            step2Title: "Project Specifications",
            step3Title: "Company Profile",
            step4Title: "Essential Capabilities",
            step5Title: "Form Integration",
            step6Title: "Web Integration",
            step7Title: "Integrations & APIs",
            step8Title: "Interaction Channels",
            step9Title: "Project Summary",
            
            // Navigation
            next: "Next",
            previous: "Previous",
            submit: "Submit Your Project",
            processing: "Processing...",
            submitted: "Successfully Submitted!",
            
            // Step 1 - Contact
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email Address",
            phone: "Phone Number",
            company: "Company/Organization",
            companyOptional: "Company/Organization (optional)",
            
            // Step 2 - Project Details
            selectNiche: "What is your industry sector?",
            otherNicheSpecify: "Please specify your sector",
            projectDescription: "Comprehensive Project Description",
            projectDescriptionPlaceholder: "Please outline your specific goals, requirements and expectations...",
            budgetQuestion: "Project Budget Allocation",
            customBudgetQuestion: "Please provide budget details",
            
            // Step 3 - Business Profile
            teamSizeQuestion: "Organization Headcount",
            solo: "Individual Entrepreneur",
            smallTeam: "Small Business (2-10 employees)",
            mediumTeam: "Medium Business (11-50 employees)",
            largeTeam: "Large Enterprise (50+ employees)",
            servicesQuestion: "Services and Products Offered",
            servicesPlaceholder: "Detail your key service and product offerings...",
            
            // Step 4 - Core Features
            leadCaptureQuestion: "Do you require prospect acquisition functionality?",
            leadQualificationQuestion: "Do you need a prospect qualification system?",
            conversationSummaryQuestion: "Would you like automated conversation synthesis?",
            
            // Step 5 - Forms
            useFormQuestion: "Would you like to integrate interactive forms?",
            selectFormTypes: "Form Types to Integrate",
            formPurposeQuestion: "Form Purpose and Function",
            formPurposePlaceholder: "Specify the goals and expected outcomes for these forms...",
            
            // Step 6 - Website
            websiteQuestion: "Do you have an existing website?",
            selectPlatform: "Website Development Platform",
            websiteUrlLabel: "Complete URL of your website",
            websiteTrafficLabel: "Estimated Monthly Traffic Volume",
            websiteTrafficQuestion: "Estimated Monthly Traffic Volume",
            
            // Step 7 - Integrations
            useCRMQuestion: "Do you plan to integrate your chatbot with a CRM?",
            yes: "Yes",
            no: "No",
            selectCRMs: "CRMs to Connect with Your Chatbot",
            hasBookingQuestion: "Do you have a booking system to integrate?",
            selectBookingSystems: "Booking System to Connect",
            handleCancellationQuestion: "Should the chatbot manage cancellations and rescheduling?",
            useDatabaseQuestion: "Do you plan to integrate an external database?",
            selectDatabases: "Databases to Connect",
            databaseSuggestion: "We will suggest suitable database solutions",
            wantBookingRecommendation: "Would you like a recommendation for a suitable booking system?",
            
            // Step 8 - Communication Channels
            needSocialBotQuestion: "Would you like to deploy the chatbot on social media platforms?",
            selectSocialPlatforms: "Social Platforms to Integrate",
            languageTypeQuestion: "Chatbot Language Configuration",
            multilingual: "Multilingual Support",
            unilingual: "Single Language",
            selectLanguages: "Languages to Support",
            selectLanguage: "Primary Language",
            
            // Step 9 - Recap
            recapTitle: "Project Summary",
            recapContact: "Professional Contact Details",
            recapProject: "Project Specifications",
            recapBusiness: "Company Profile",
            recapFeatures: "Essential Capabilities",
            recapForms: "Form Integration",
            recapWebsite: "Web Integration",
            recapIntegrations: "Integrations & APIs",
            recapChannels: "Interaction Channels",
            edit: "Edit",
            
            // Validation
            required: "required",
            selectAtLeastOne: "Please select at least one option",
            enterValidEmail: "Please enter a valid email address",
            enterValidPhone: "Please enter a valid phone number",
            fieldRequired: "This field is required",
            
            // Placeholders
            selectPlaceholder: "-- Please select --",
            selectMultiplePlaceholder: "-- Multiple selection --",
            enterText: "Enter your text here...",
            other: "Other",
            
            // Confirmation
            confirmationTitle: "Project Submitted Successfully!",
            confirmationMessage: "Thank you for your submission. Our expert team will review your project and contact you shortly.",
            backToForm: "Return to Form",
            
            // Errors
            errorSubmission: "Submission Error. Please try again.",
            firstNameRequired: "First name is required",
            lastNameRequired: "Last name is required",
            emailRequired: "Email address is required",
            emailInvalid: "Invalid email address format",
            phoneRequired: "Phone number is required",
            phoneInvalid: "Invalid phone number format",
            nicheRequired: "Please select an industry sector",
            otherNicheRequired: "Please specify your sector",
            budgetRequired: "Please select a budget",
            customBudgetRequired: "Please provide budget details",
            descriptionRequired: "Project description is required",
            teamSizeRequired: "Please select your organization headcount",
            servicesRequired: "Please describe your services and products",
            leadCaptureRequired: "Please select an option",
            leadQualificationRequired: "Please select an option",
            conversationSummaryRequired: "Please select an option",
            useFormRequired: "Please select an option",
            formTypesRequired: "Please select at least one form type",
            hasWebsiteRequired: "Please indicate if you have a website",
            platformRequired: "Please select a platform",
            otherPlatformRequired: "Please specify the platform used",
            websiteUrlRequired: "Website URL is required",
            websiteUrlInvalid: "Invalid URL format",
            websiteTrafficRequired: "Please indicate your website traffic volume",
            useCrmRequired: "Please indicate if you want to integrate a CRM",
            crmsRequired: "Please select at least one CRM",
            hasBookingRequired: "Please indicate if you have a booking system",
            bookingSystemsRequired: "Please select a booking system",
            useDatabaseRequired: "Please indicate if you want to integrate a database",
            databasesRequired: "Please select at least one database",
            needSocialRequired: "Please indicate if you want to deploy the chatbot on social media",
            socialPlatformsRequired: "Please select at least one social platform",
            languageTypeRequired: "Please select a language configuration",
            languagesRequired: "Please select at least one language"
          }
        };
        
       
        // Load saved data if available
           // Load saved data if available
    /*************************************************************
         * HTML Generation & Initial Setup
         *************************************************************/
        const formContainer = document.createElement("form");
        formContainer.setAttribute("novalidate", "true");
        formContainer.classList.add("chatbot-form");
        formContainer.innerHTML = `
  <style>
    /* ========== Reset & Base Styles ========== */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
	
	/* Info Button and Panel Styles */
    .info-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #e0e0e0;
      color: #757575;
      font-size: 12px;
      font-weight: bold;
      margin-left: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      padding: 0;
    }

    .info-button:hover {
      background: #9C27B0;
      color: white;
    }

    .info-panel {
      display: none;
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-left: 3px solid #9C27B0;
      border-radius: 4px;
      padding: 12px;
      margin-top: 8px;
      margin-bottom: 10px;
      position: relative;
      font-size: 13px;
      line-height: 1.5;
      color: #555;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      animation: fadeIn 0.3s;
    }

    .info-panel.show {
      display: block;
    }

    .close-info {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: #f0f0f0;
      font-size: 10px;
      font-weight: bold;
      cursor: pointer;
      border: none;
      padding: 0;
      color: #757575;
    }

    .close-info:hover {
      background: #e0e0e0;
      color: #333;
    }

    .info-title {
      font-weight: 600;
      color: #9C27B0;
      margin-bottom: 6px;
      font-size: 14px;
    }
    /* default state */
.info-button svg .info-bg   { fill: #f8e8f8; }
.info-button svg .info-icon { fill: #9C27B0; }

/* hover, focus, or active */
.info-button:hover svg .info-bg,
.info-button:focus svg .info-bg,
.info-button:active svg .info-bg {
  fill: #9C27B0;
}

.info-button:hover svg .info-icon,
.info-button:focus svg .info-icon,
.info-button:active svg .info-icon {
  fill: #ffffff;
}
    
    /* ========== Form Layout & Containers ========== */
    form.chatbot-form {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 800px;
      min-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 12px;
      background: #fff;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      position: relative;
      overflow: hidden;
    }
    
    /* ========== Step Progress Indicator ========== */
    .progress-container {
      padding: 0;
    }
    .step-title {
  display: none;
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
      height: 3px;
      background: #e0e0e0;
      z-index: 1;
      transform: translateY(-50%);
    }

    .progress-bar {
      position: absolute;
      top: 50%;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #9C27B0, #7B1FA2);
      z-index: 2;
      transform: translateY(-50%);
      transition: width 0.4s ease;
      box-shadow: 0 2px 4px rgba(156, 39, 176, 0.3);
    }

    .step-item {
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      text-align: center;
      width: calc(100% / 9);
    }

    .step-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #e0e0e0;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      color: #757575;
      position: relative;
      transition: all 0.3s ease;
      border: 2px solid #f5f5f5;
    }

    .step-title {
      font-size: 11px;
      color: #757575;
      position: absolute;
      width: 110px;
      text-align: center;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .step-item.active .step-icon {
      background: #9C27B0;
      color: white;
      border-color: #9C27B0;
      box-shadow: 0 4px 8px rgba(156, 39, 176, 0.2);
    }

    .step-item.active .step-title {
      color: #9C27B0;
      font-weight: 600;
    }

    .step-item.completed .step-icon {
      background: #9C27B0;
      color: white;
      border-color: #9C27B0;
    }

    .step-item.completed .step-title {
      color: #9C27B0;
    }
    
    /* ========== Step Container ========== */
    .step-container {
      display: none;
      animation: fadeIn 0.5s;
      padding: 10px;
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
      color: #9C27B0;
      margin-bottom: 24px;
      font-weight: 600;
      position: relative;
      padding-bottom: 10px;
    }
    
    .step-heading::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #9C27B0, #E1BEE7);
      border-radius: 3px;
    }
    
    /* ========== Questions & Form Groups ========== */
    .question-group {
      margin-bottom: 24px;
    }
    
    .question-label {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      margin-bottom: 12px;
      display: block;
    }
    
    .form-group {
      margin-bottom: 20px;
      position: relative;
    }
    
    .form-label {
      font-weight: 500;
      color: #333;
      font-size: 14px;
      margin-bottom: 8px;
      display: block;
    }
    
    .required::after {
      content: " *";
      color: #9C27B0;
      font-weight: bold;
    }
    
    /* ========== Dropdown Components ========== */
    .select-wrapper {
      border: 1px solid #ddd;
      border-radius: 6px;
      background-color: #fff;
      position: relative;
      width: 100%;
      min-height: 48px;
    }

    .select-display {
      padding: 0 15px;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      color: #444;
    }

    .dropdown-icon {
      width: 24px;
      height: 24px;
      transition: transform 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f0e5f4;
      border-radius: 50%;
    }

    .dropdown-icon.rotate {
      transform: rotate(180deg);
    }

    .custom-options {
      display: none;
      font-size: 14px;
      border-top: 1px solid #ddd;
      max-height: 250px;
      overflow-y: auto;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      z-index: 100;
      border-radius: 0 0 6px 6px;
      -ms-overflow-style: none;
      scrollbar-width: none;
      width: 100%;
    }

    .custom-options::-webkit-scrollbar {
      display: none;
    }

    .show-options {
      display: block;
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
      background-color: #f0e5f4;
      color: #9C27B0;
    }

    .custom-option.selected {
      background-color: #f0e5f4;
      color: #9C27B0;
      font-weight: bold;
    }

    .option-checkbox {
      width: 18px;
      height: 18px;
      border: 2px solid #ccc;
      border-radius: 50%;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      transition: all 0.2s;
    }

    .multi-select .option-checkbox {
      border-radius: 4px !important;
    }

    .custom-option.selected .option-checkbox {
      border-color: #9C27B0;
      background-color: #9C27B0;
    }

    .custom-option:not(.selected):hover .option-checkbox {
      border-color: #9C27B0;
    }

    .custom-option.selected .option-checkbox svg path {
      fill: #fff !important;
    }

    .custom-option:not(.selected):hover .option-checkbox svg path {
      fill: #9C27B0;
    }

    .custom-option.selected .main-arrow,
    .custom-option:hover .main-arrow {
      background-color: #fff;
    }

    .main-arrow {
      margin-left: auto;
      display: flex;
      align-items: center;
      background-color: #f0e5f4;
      border-radius: 50%;
      transition: background-color 0.3s;
      width: 24px;
      height: 24px;
      justify-content: center;
    }

    .arrow-icon {
      transition: transform 0.3s ease;
      display: flex;
    }

    .arrow-icon.rotate {
      transform: rotate(180deg);
    }

    .sub-options {
      margin-left: 25px;
      border-left: 2px solid #9C27B0;
      width: calc(100% - 25px);
    }

    select {
      display: none;
    }
    
    /* Select Display Placeholder */
    .select-display.placeholder span {
      color: #808080;
    }

    .select-display:not(.placeholder) span {
      color: #000;
    }
    
    /* ========== Input Fields ========== */
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="number"],
    textarea,
    select {
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 12px;
      font-size: 14px;
      transition: all 0.2s;
      background-color: #fafafa;
    }
    
    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="tel"]:focus,
    input[type="number"]:focus,
    textarea:focus,
    select:focus {
      border-color: #9C27B0;
      box-shadow: 0 0 0 3px rgba(156,39,176,0.1);
      outline: none;
      background-color: #fff;
    }
    
    textarea {
      min-height: 120px;
      resize: vertical;
    }
    
    /* Character counter */
    .char-counter {
      position: absolute;
      right: 10px;
      bottom: 10px;
      font-size: 12px;
      color: #757575;
      background: rgba(255, 255, 255, 0.9);
      padding: 2px 6px;
      border-radius: 10px;
    }
    
    /* ========== Radio & Checkbox Options ========== */
    .options-group {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }
    
    .radio-option,
    .checkbox-option {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      user-select: none;
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      transition: all 0.2s;
      flex: 1;
      min-width: 150px;
      background: #fafafa;
    }
    
    .radio-option:hover,
    .checkbox-option:hover {
      border-color: #9C27B0;
      background-color: #f5f0f7;
    }
    
    .radio-option input[type="radio"],
    .checkbox-option input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    
    .radio-icon,
    .checkbox-icon {
      width: 20px;
      height: 20px;
      border: 2px solid #ddd;
      border-radius: 50%;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      background: white;
    }
    
    .checkbox-icon {
      border-radius: 4px;
    }
    
    .radio-option input[type="radio"]:checked ~ .radio-icon,
    .checkbox-option input[type="checkbox"]:checked ~ .checkbox-icon {
      background-color: #9C27B0;
      border-color: #9C27B0;
    }
    
    .radio-option input[type="radio"]:checked ~ .radio-icon::after {
      content: '';
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
    }
    
    .checkbox-option input[type="checkbox"]:checked ~ .checkbox-icon::after {
      content: '✓';
      color: white;
      font-size: 14px;
      font-weight: bold;
    }
    .radio-option input[type="radio"]:checked ~ .radio-label,
    .checkbox-option input[type="checkbox"]:checked ~ .checkbox-label {
      font-weight: 500;
      color: #9C27B0;
    }
    
    /* ========== Error Messages ========== */
    .error-message {
      display: none;
      color: #d32f2f;
      font-size: 14px;
      margin-top: 5px;
      padding: 8px 12px;
      background-color: #ffebee;
      border-radius: 4px;
      border: 1px solid #ffcdd2;
      animation: fadeIn 0.3s;
    }
    
    .error-message.show {
      display: block;
    }
    
    /* ========== Number Input Group ========== */
    .input-group {
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex-direction: row;
      border-radius: 6px;
      width: 100%;
      border: 1px solid #ddd;
      height: 48px;
      overflow: hidden;
    }

    .input-group:focus-within {
      border: 2px solid #9C27B0;
      outline: none;
    }

    .input-group input[type="number"]:focus {
      border: none !important;
      outline: none !important;
    }

    .input-group button,
    .input-group input {
      outline: none;
      border: none;
    }

    .input-group input {
      width: 100%;
      text-align: center;
      padding: 8px;
      flex: 1;
    }

    .input-group button {
      cursor: pointer;
      background-color: #f0e5f4;
      border: none;
      padding: 0;
      min-width: 40px;
      width: 40px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .input-group button:hover {
      background-color: #9C27B0;
    }

    .input-group button:hover svg path {
      fill: #fff !important;
    }
    
    /* ========== Navigation Buttons ========== */
    .form-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      gap: 15px;
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
      background: #f0e5f4;
      color: #9C27B0;
    }

    .btn-prev:hover {
      background: #e0c5e4;
    }

    .btn-next, .btn-submit {
      background: #9C27B0;
      color: white;
      box-shadow: 0 2px 8px rgba(156,39,176,0.3);
    }

    .btn-next:hover, .btn-submit:hover {
      background: #7B1FA2;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(156,39,176,0.3);
    }

    .btn:disabled {
      background: #e0e0e0;
      color: #9e9e9e;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
      opacity: 0.7;
    }
    

    
    /* ========== Flex Layout ========== */
    .flex-row {
      display: flex;
      gap: 0 15px;
      flex-wrap: wrap;
    }

    .flex-row > div {
      flex: 1;
      min-width: 300px;
    }
    
    /* ========== Summary Styles ========== */
    .summary-container {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    
    .summary-section {
      margin-bottom: 20px;
    }
    
    .summary-heading {
      font-size: 16px;
      font-weight: 600;
      color: #9C27B0;
      margin-bottom: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .edit-btn {
      background: none;
      border: none;
      color: #9C27B0;
      cursor: pointer;
      padding: 5px 10px;
      font-size: 13px;
      text-decoration: underline;
    }
    
    .edit-btn:hover {
      color: #7B1FA2;
    }
    
    .summary-row {
      display: flex;
      padding: 8px 0;
    }
    
    .summary-label {
      font-weight: 500;
      width: 40%;
      color: #555;
      font-size: 14px;
    }
    
    .summary-value {
      flex: 1;
      font-size: 14px;
    }
    
    /* ========== Confirmation Screen ========== */
    .confirmation-screen {
      display: none;
      text-align: center;
      padding: 40px 20px;
      animation: fadeIn 0.5s;
    }
    
    .confirmation-screen.active {
      display: block;
    }
    
    .confirmation-icon {
      width: 80px;
      height: 80px;
      background: #9C27B0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }
    
    .confirmation-title {
      font-size: 24px;
      color: #9C27B0;
      margin-bottom: 15px;
      font-weight: 600;
    }
    
    .confirmation-message {
      font-size: 16px;
      color: #555;
      margin-bottom: 30px;
      line-height: 1.5;
    }
    
    /* ========== Responsive Design ========== */
    @media (max-width: 768px) {
      .options-group {
        flex-direction: column;
      }
      
      .radio-option,
      .checkbox-option {
        min-width: 100%;
      }
      
      .step-title {
        font-size: 9px;
        width: 80px;
      }
      
      .form-buttons {
        flex-direction: column;
      }
      
      .btn {
        width: 100%;
      }
      
      .step-heading {
        font-size: 20px;
      }
      
      .question-label {
        font-size: 15px;
      }
      
      .step-item {
        width: 40px;
      }
    }
    
    @media (max-width: 480px) {
      form.chatbot-form {
        padding: 15px 10px;
      min-width: 200px;
      }
      
      .step-heading {
        font-size: 18px;
      }
      
      .step-icon {
        width: 24px;
        height: 24px;
        font-size: 12px;
      }
      
      .step-title {
        font-size: 8px;
        width: 60px;
        top: 35px;
      }
    }
    
    /* ========== Focus Styles for Accessibility ========== */
    input:focus-visible, 
    textarea:focus-visible, 
    select:focus-visible,
    button:focus-visible {
      outline: 2px solid #9C27B0;
      outline-offset: 2px;
    }
    /* Conditional Section Styling */
.conditional-section {
  display: none !important;
}

.conditional-section.visible {
  display: block !important;
}
#social-platforms-group {
  margin-bottom: 24px;
}
/* default state */
.info-button svg .info-bg   { fill: #f8e8f8; }
.info-button svg .info-icon { fill: #9C27B0; }

/* hover, focus, or active */
.info-button:hover svg .info-bg,
.info-button:focus svg .info-bg,
.info-button:active svg .info-bg {
  fill: #9C27B0;
}

.info-button:hover svg .info-icon,
.info-button:focus svg .info-icon,
.info-button:active svg .info-icon {
  fill: #ffffff;
}

  </style>
  
  <!-- Confirmation Screen -->
  <div class="confirmation-screen" id="confirmation-screen">
    <div class="confirmation-icon">
      ${SVG_CHECK}
    </div>
    <h2 class="confirmation-title" id="confirmation-title">Demande envoyée avec succès!</h2>
    <p class="confirmation-message" id="confirmation-message">Merci pour votre demande. Notre équipe vous contactera sous peu.</p>
    <button type="button" class="btn btn-next" id="back-to-form">Retour au formulaire</button>
  </div>
  
  <!-- Step Progress Indicator -->
  <div class="progress-container">
    <div class="step-progress">
      <div class="progress-bar" id="progress-bar"></div>
      <div class="step-item active" data-step="1">
        <div class="step-icon">1</div>
        <div class="step-title" id="progress-step1">Informations de contact</div>
      </div>
      <div class="step-item" data-step="2">
        <div class="step-icon">2</div>
        <div class="step-title" id="progress-step2">Détails du projet</div>
      </div>
      <div class="step-item" data-step="3">
        <div class="step-icon">3</div>
        <div class="step-title" id="progress-step3">Profil professionnel</div>
      </div>
      <div class="step-item" data-step="4">
        <div class="step-icon">4</div>
        <div class="step-title" id="progress-step4">Fonctionnalités de base</div>
      </div>
      <div class="step-item" data-step="5">
        <div class="step-icon">5</div>
        <div class="step-title" id="progress-step5">Formulaires</div>
      </div>
      <div class="step-item" data-step="6">
        <div class="step-icon">6</div>
        <div class="step-title" id="progress-step6">Site Web</div>
      </div>
      <div class="step-item" data-step="7">
        <div class="step-icon">7</div>
        <div class="step-title" id="progress-step7">Intégrations</div>
      </div>
      <div class="step-item" data-step="8">
        <div class="step-icon">8</div>
        <div class="step-title" id="progress-step8">Canaux de communication</div>
      </div>
      <div class="step-item" data-step="9">
        <div class="step-icon">9</div>
        <div class="step-title" id="progress-step9">Récapitulatif</div>
      </div>
    </div>
  </div>
  
  <!-- Step 1: Contact Information -->
  <div class="step-container active" id="step-1">
    <h2 class="step-heading" id="step1-heading">Informations de contact</h2>
    
    <div class="flex-row">
      <div class="form-group">
        <label class="form-label required" id="firstname-label">Prénom</label>
        <input type="text" id="first-name" name="firstName" placeholder="Votre prénom" />
        <div class="error-message" id="error-firstname">Ce champ est obligatoire</div>
      </div>
      
      <div class="form-group">
        <label class="form-label required" id="lastname-label">Nom</label>
        <input type="text" id="last-name" name="lastName" placeholder="Votre nom" />
        <div class="error-message" id="error-lastname">Ce champ est obligatoire</div>
      </div>
    </div>
    
    <div class="flex-row">
      <div class="form-group">
        <label class="form-label required" id="email-label">Email</label>
        <input type="email" id="email" name="email" placeholder="Votre email" />
        <div class="error-message" id="error-email">Entrez une adresse email valide</div>
      </div>
      
      <div class="form-group">
        <label class="form-label required" id="phone-label">Téléphone</label>
        <input type="tel" id="phone" name="phone" placeholder="Votre numéro de téléphone" />
        <div class="error-message" id="error-phone">Entrez un numéro de téléphone valide</div>
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label" id="company-label">Entreprise (optionnel)</label>
      <input type="text" id="company" name="company" placeholder="Nom de votre entreprise" />
    </div>
    
    <div class="form-buttons">
      <div></div>
      <button type="button" class="btn btn-next" id="step1-next">Suivant</button>
    </div>
  </div>
  
  <!-- Step 2: Project Details (Moved from original Step 6) -->
  <div class="step-container" id="step-2">
    <h2 class="step-heading" id="step2-heading">Détails du projet</h2>
    
    <div class="form-group">
      <label class="form-label required" id="niche-label">Quelle est votre niche ?</label>
      <div class="select-container" id="nicheDropdown">
        <select id="niche"></select>
        <div class="select-wrapper">
          <div class="select-display placeholder" id="selectDisplayNiche" data-placeholder="-- Sélectionnez --">
            <span id="selectedTextNiche">-- Sélectionnez --</span>
            <div class="dropdown-icon" id="dropdownIconNiche">${SVG_CHEVRON}</div>
          </div>
          <div class="custom-options" id="customOptionsNiche"></div>
        </div>
      </div>
      <div class="error-message" id="error-niche">Veuillez sélectionner une niche</div>
    </div>
    
    <div class="form-group" id="other-niche-group" style="display: none;">
      <label class="form-label required" id="other-niche-label">Précisez votre niche</label>
      <input type="text" id="other-niche" name="otherNiche" placeholder="Votre niche..." />
      <div class="error-message" id="error-other-niche">Ce champ est obligatoire</div>
    </div>
    
    <div class="form-group">
      <label class="form-label required" id="budget-label">Quel est votre budget ?</label>
      <div class="select-container" id="budgetDropdown">
        <select id="budget"></select>
        <div class="select-wrapper">
          <div class="select-display placeholder" id="selectDisplayBudget" data-placeholder="-- Sélectionnez --">
            <span id="selectedTextBudget">-- Sélectionnez --</span>
            <div class="dropdown-icon" id="dropdownIconBudget">${SVG_CHEVRON}</div>
          </div>
          <div class="custom-options" id="customOptionsBudget"></div>
        </div>
      </div>
      <div class="error-message" id="error-budget">Veuillez sélectionner un budget</div>
    </div>
    
    <div class="form-group" id="custom-budget-group" style="display: none;">
      <label class="form-label required" id="custom-budget-label">Précisez votre budget</label>
      <input type="text" id="custom-budget" name="customBudget" placeholder="Détails de votre budget..." />
      <div class="error-message" id="error-custom-budget">Ce champ est obligatoire</div>
    </div>
    
    <div class="form-group">
      <label class="form-label required" id="description-label">Description détaillée de votre projet</label>
      <textarea id="description" name="description" placeholder="Décrivez vos besoins en détail, vos objectifs, et toute autre information pertinente..." rows="6"></textarea>
      <div class="char-counter"><span id="description-counter">0</span>/1000</div>
      <div class="error-message" id="error-description">Ce champ est obligatoire</div>
    </div>
    
    <div class="form-buttons">
      <button type="button" class="btn btn-prev" id="step2-prev">Précédent</button>
      <button type="button" class="btn btn-next" id="step2-next">Suivant</button>
    </div>
  </div>
  
  <!-- Step 3: Business Profile -->
  <div class="step-container" id="step-3">
    <h2 class="step-heading" id="step3-heading">Profil professionnel</h2>
    
    <div class="question-group">
      <label class="question-label" id="team-size-question">Quelle est la taille de votre équipe ?</label>
      <div class="select-container" id="teamSizeDropdown">
        <select id="team-size"></select>
        <div class="select-wrapper">
          <div class="select-display placeholder" id="selectDisplayTeamSize" data-placeholder="-- Sélectionnez --">
            <span id="selectedTextTeamSize">-- Sélectionnez --</span>
            <div class="dropdown-icon" id="dropdownIconTeamSize">${SVG_CHEVRON}</div>
          </div>
          <div class="custom-options" id="customOptionsTeamSize"></div>
        </div>
      </div>
      <div class="error-message" id="error-team-size">Veuillez sélectionner une option</div>
    </div>
    
    <div class="form-group">
      <label class="form-label required" id="services-label">Quels sont vos services ?</label>
      <textarea id="services" name="services" placeholder="Décrivez vos services principaux..." rows="4"></textarea>
      <div class="char-counter"><span id="services-counter">0</span>/500</div>
      <div class="error-message" id="error-services">Ce champ est obligatoire</div>
    </div>
    
    <div class="form-buttons">
      <button type="button" class="btn btn-prev" id="step3-prev">Précédent</button>
      <button type="button" class="btn btn-next" id="step3-next">Suivant</button>
    </div>
  </div>
  
  <!-- Step 4: Core Features -->
  <div class="step-container" id="step-4">
    <h2 class="step-heading" id="step4-heading">Fonctionnalités de base</h2>
    
    <div class="question-group">
      <label class="question-label" id="lead-capture-question">Avez-vous besoin de capture de leads ?</label>
      <div class="options-group">
        <label class="radio-option">
          <input type="radio" name="leadCapture" value="yes" />
          <span class="radio-icon"></span>
          <span class="radio-label">Oui</span>
        </label>
        <label class="radio-option">
          <input type="radio" name="leadCapture" value="no" />
          <span class="radio-icon"></span>
          <span class="radio-label">Non</span>
        </label>
      </div>
      <div class="error-message" id="error-lead-capture">Veuillez sélectionner une option</div>
    </div>
    
    <div class="question-group">
      <label class="question-label" id="lead-qualification-question">Nécessitez-vous un système de qualification des prospects ?</label>
      <div class="options-group">
        <label class="radio-option">
          <input type="radio" name="leadQualification" value="yes" />
          <span class="radio-icon"></span>
          <span class="radio-label">Oui</span>
        </label>
        <label class="radio-option">
          <input type="radio" name="leadQualification" value="no" />
          <span class="radio-icon"></span>
          <span class="radio-label">Non</span>
        </label>
      </div>
      <div class="error-message" id="error-lead-qualification">Veuillez sélectionner une option</div>
    </div>
    
    <div class="question-group">
      <label class="question-label" id="conversation-summary-question">Avez-vous besoin de résumés de conversation ?</label>
      <div class="options-group">
        <label class="radio-option">
          <input type="radio" name="conversationSummary" value="yes" />
          <span class="radio-icon"></span>
          <span class="radio-label">Oui</span>
        </label>
        <label class="radio-option">
          <input type="radio" name="conversationSummary" value="no" />
          <span class="radio-icon"></span>
          <span class="radio-label">Non</span>
        </label>
      </div>
      <div class="error-message" id="error-conversation-summary">Veuillez sélectionner une option</div>
    </div>
    
    <div class="form-buttons">
      <button type="button" class="btn btn-prev" id="step4-prev">Précédent</button>
      <button type="button" class="btn btn-next" id="step4-next">Suivant</button>
    </div>
  </div>
  
  <!-- Step 5: Form Requirements -->
  <div class="step-container" id="step-5">
    <h2 class="step-heading" id="step5-heading">Formulaires</h2>
    
    <div class="question-group">
      <label class="question-label" id="use-form-question">Avez-vous besoin de formulaires ?</label>
      <div class="options-group">
        <label class="radio-option">
          <input type="radio" name="useForm" value="yes" />
          <span class="radio-icon"></span>
          <span class="radio-label">Oui</span>
        </label>
        <label class="radio-option">
          <input type="radio" name="useForm" value="no" />
          <span class="radio-icon"></span>
          <span class="radio-label">Non</span>
        </label>
      </div>
      <div class="error-message" id="error-use-form">Veuillez sélectionner une option</div>
    </div>
    
    <div id="form-options" style="display: none;">
      <div class="question-group">
        <label class="form-label" id="form-types-label">Sélectionnez les types de formulaires</label>
        <div class="select-container multi-select" id="formTypesDropdown">
          <select id="formTypesSelect" multiple></select>
          <div class="select-wrapper">
            <div class="select-display placeholder" id="selectDisplayFormTypes" data-placeholder="-- Sélectionnez (multiple) --">
              <span id="selectedTextFormTypes">-- Sélectionnez (multiple) --</span>
              <div class="dropdown-icon" id="dropdownIconFormTypes">${SVG_CHEVRON}</div>
            </div>
            <div class="custom-options" id="customOptionsFormTypes"></div>
          </div>
        </div>
        <div class="error-message" id="error-form-types">Veuillez sélectionner au moins un type</div>
      </div>
      
      <div class="form-group">
        <label class="form-label" id="form-purpose-label">À quoi serviront ces formulaires ?</label>
        <textarea id="form-purpose" name="formPurpose" placeholder="Décrivez l'utilisation prévue des formulaires..." rows="3"></textarea>
        <div class="char-counter"><span id="form-purpose-counter">0</span>/300</div>
      </div>
    </div>
    
    <div class="form-buttons">
      <button type="button" class="btn btn-prev" id="step5-prev">Précédent</button>
      <button type="button" class="btn btn-next" id="step5-next">Suivant</button>
    </div>
  </div>
  
  <!-- Step 6: Website Integration with Traffic Field -->
<div class="step-container" id="step-6">
  <h2 class="step-heading" id="step6-heading">Site Web</h2>
  
  <div class="question-group">
    <label class="question-label" id="website-question">Avez-vous un site web ?</label>
    <div class="options-group">
      <label class="radio-option">
        <input type="radio" name="hasWebsite" value="yes" />
        <span class="radio-icon"></span>
        <span class="radio-label">Oui</span>
      </label>
      <label class="radio-option">
        <input type="radio" name="hasWebsite" value="no" />
        <span class="radio-icon"></span>
        <span class="radio-label">Non</span>
      </label>
    </div>
    <div class="error-message" id="error-has-website">Veuillez sélectionner une option</div>
  </div>
  
  <div id="website-options" style="display: none;">
    <div class="form-group">
      <label class="form-label" id="platform-label">Sur quelle plateforme est développé votre site ?</label>
      <div class="select-container" id="websitePlatformDropdown">
        <select id="website-platform"></select>
        <div class="select-wrapper">
          <div class="select-display placeholder" id="selectDisplayWebsitePlatform" data-placeholder="-- Sélectionnez --">
            <span id="selectedTextWebsitePlatform">-- Sélectionnez --</span>
            <div class="dropdown-icon" id="dropdownIconWebsitePlatform">${SVG_CHEVRON}</div>
          </div>
          <div class="custom-options" id="customOptionsWebsitePlatform"></div>
        </div>
      </div>
      <div class="error-message" id="error-platform">Veuillez sélectionner une plateforme</div>
    </div>
    
    <div class="form-group" id="other-platform-group" style="display: none;">
      <label class="form-label" id="other-platform-label">Précisez la plateforme</label>
      <input type="text" id="other-platform" name="otherPlatform" placeholder="Nom de la plateforme..." />
      <div class="error-message" id="error-other-platform">Ce champ est obligatoire</div>
    </div>
    
    <div class="form-group">
      <label class="form-label required" id="website-url-label">URL de votre site web</label>
      <input type="text" id="website-url" name="websiteUrl" placeholder="https://www.votresite.com" />
      <div class="error-message" id="error-website-url">Veuillez entrer une URL valide</div>
    </div>
    
    <div class="form-group">
      <label class="form-label required" id="website-traffic-label">Trafic mensuel moyen de votre site</label>
      <div class="select-container" id="websiteTrafficDropdown">
        <select id="website-traffic"></select>
        <div class="select-wrapper">
          <div class="select-display placeholder" id="selectDisplayWebsiteTraffic" data-placeholder="-- Sélectionnez --">
            <span id="selectedTextWebsiteTraffic">-- Sélectionnez --</span>
            <div class="dropdown-icon" id="dropdownIconWebsiteTraffic">${SVG_CHEVRON}</div>
          </div>
          <div class="custom-options" id="customOptionsWebsiteTraffic"></div>
        </div>
      </div>
      <div class="error-message" id="error-website-traffic">Veuillez indiquer le trafic de votre site</div>
    </div>
  </div>
  
  <div class="form-buttons">
    <button type="button" class="btn btn-prev" id="step6-prev">Précédent</button>
    <button type="button" class="btn btn-next" id="step6-next">Suivant</button>
  </div>
</div>
  
  <!-- Step 7: Integrations -->
  <div class="step-container" id="step-7">
    <h2 class="step-heading" id="step7-heading">Intégrations</h2>
    
    <!-- CRM Section -->
    <div class="question-group">
      <label class="question-label" id="use-crm-question">Utiliserez-vous un CRM avec votre chatbot ?</label>
      <div class="options-group">
        <label class="radio-option">
          <input type="radio" name="useCRM" value="yes" />
          <span class="radio-icon"></span>
          <span class="radio-label" id="yes-label">Oui</span>
        </label>
        <label class="radio-option">
          <input type="radio" name="useCRM" value="no" />
          <span class="radio-icon"></span>
          <span class="radio-label" id="no-label">Non</span>
        </label>
      </div>
      <div class="error-message" id="error-use-crm">Veuillez sélectionner une option</div>
    </div>
    
    <div class="question-group" id="crm-selection" style="display: none;">
      <label class="form-label" id="crm-select-label">Sélectionnez les CRM à intégrer</label>
      <div class="select-container multi-select" id="crmsDropdown">
        <select id="crmsSelect" multiple></select>
        <div class="select-wrapper">
          <div class="select-display placeholder" id="selectDisplayCrms" data-placeholder="-- Sélectionnez (multiple) --">
            <span id="selectedTextCrms">-- Sélectionnez (multiple) --</span>
            <div class="dropdown-icon" id="dropdownIconCrms">${SVG_CHEVRON}</div>
          </div>
          <div class="custom-options" id="customOptionsCrms"></div>
        </div>
      </div>
      <div class="error-message" id="error-crms">Veuillez sélectionner au moins un CRM</div>
    </div>
    
    <!-- Booking System Section -->
    <div class="question-group">
      <label class="question-label" id="has-booking-question">Utilisez-vous déjà un système de réservation ?</label>
      <div class="options-group">
        <label class="radio-option">
          <input type="radio" name="hasBookingSystem" value="yes" />
          <span class="radio-icon"></span>
          <span class="radio-label">Oui</span>
        </label>
        <label class="radio-option">
          <input type="radio" name="hasBookingSystem" value="no" />
          <span class="radio-icon"></span>
          <span class="radio-label">Non</span>
        </label>
      </div>
      <div class="error-message" id="error-has-booking">Veuillez sélectionner une option</div>
    </div>

    <!-- Show if they have a booking system -->
    <div id="existing-booking-options" style="display: none;">
      <div class="question-group">
        <label class="form-label" id="booking-select-label">Sélectionnez votre système de réservation</label>
        <div class="select-container" id="bookingSystemsDropdown">
          <select id="bookingSystemsSelect"></select>
          <div class="select-wrapper">
            <div class="select-display placeholder" id="selectDisplayBookingSystems" data-placeholder="-- Sélectionnez --">
              <span id="selectedTextBookingSystems">-- Sélectionnez --</span>
              <div class="dropdown-icon" id="dropdownIconBookingSystems">${SVG_CHEVRON}</div>
            </div>
            <div class="custom-options" id="customOptionsBookingSystems"></div>
          </div>
        </div>
        <div class="error-message" id="error-booking-systems">Veuillez sélectionner un système</div>
      </div>
    </div>

    <!-- Show if they don't have a booking system -->
<div id="need-booking-options" class="conditional-section">
      <div class="question-group">
        <label class="question-label" id="want-booking-recommendation">Souhaitez-vous que nous vous recommandions un système de réservation ?</label>
        <div class="options-group">
          <label class="radio-option">
            <input type="radio" name="wantBookingRecommendation" value="yes" />
            <span class="radio-icon"></span>
            <span class="radio-label">Oui</span>
          </label>
          <label class="radio-option">
            <input type="radio" name="wantBookingRecommendation" value="no" />
            <span class="radio-icon"></span>
            <span class="radio-label">Non</span>
          </label>
        </div>
      </div>
    </div>
      
    <div class="question-group">
      <label class="question-label" id="handle-cancellation-question">Le chatbot doit-il gérer les annulations et replanifications ?</label>
      <div class="options-group">
        <label class="radio-option">
          <input type="radio" name="handleCancellation" value="yes" />
          <span class="radio-icon"></span>
          <span class="radio-label">Oui</span>
        </label>
        <label class="radio-option">
          <input type="radio" name="handleCancellation" value="no" />
          <span class="radio-icon"></span>
          <span class="radio-label">Non</span>
        </label>
      </div>
    </div>
    
    <!-- Database Section -->
    <div class="question-group">
      <label class="question-label" id="use-database-question">Utiliserez-vous une base de données ?</label>
      <div class="options-group">
        <label class="radio-option">
          <input type="radio" name="useDatabase" value="yes" />
          <span class="radio-icon"></span>
          <span class="radio-label">Oui</span>
        </label>
        <label class="radio-option">
          <input type="radio" name="useDatabase" value="no" />
          <span class="radio-icon"></span>
          <span class="radio-label">Non</span>
        </label>
      </div>
      <div class="error-message" id="error-use-database">Veuillez sélectionner une option</div>
    </div>
    
    <div class="question-group" id="database-selection" style="display: none;">
      <label class="form-label" id="database-select-label">Sélectionnez les bases de données</label>
      <div class="select-container multi-select" id="databasesDropdown">
        <select id="databasesSelect" multiple></select>
        <div class="select-wrapper">
          <div class="select-display placeholder" id="selectDisplayDatabases" data-placeholder="-- Sélectionnez (multiple) --">
            <span id="selectedTextDatabases">-- Sélectionnez (multiple) --</span>
            <div class="dropdown-icon" id="dropdownIconDatabases">${SVG_CHEVRON}</div>
          </div>
          <div class="custom-options" id="customOptionsDatabases"></div>
        </div>
      </div>
      <div class="error-message" id="error-databases">Veuillez sélectionner au moins une base de données</div>
    </div>
    
    <div class="form-buttons">
      <button type="button" class="btn btn-prev" id="step7-prev">Précédent</button>
      <button type="button" class="btn btn-next" id="step7-next">Suivant</button>
    </div>
  </div>
  
  <!-- Step 8: Communication Channels -->
  <div class="step-container" id="step-8">
    <h2 class="step-heading" id="step8-heading">Canaux de communication</h2>
    
    <!-- Social Media Section -->
    <div class="question-group">
      <label class="question-label" id="social-bot-question">Avez-vous besoin d'un chatbot pour les réseaux sociaux ?</label>
      <div class="options-group">
        <label class="radio-option"><input type="radio" name="needSocialBot" value="yes" />
          <span class="radio-icon"></span>
          <span class="radio-label">Oui</span>
        </label>
        <label class="radio-option">
          <input type="radio" name="needSocialBot" value="no" />
          <span class="radio-icon"></span>
          <span class="radio-label">Non</span>
        </label>
      </div>
      <div class="error-message" id="error-need-social">Veuillez sélectionner une option</div>
    </div>
    
    <div id="social-platforms-group" class="conditional-section">
      <label class="form-label" id="social-platforms-label">Sélectionnez les plateformes sociales</label>
      <div class="select-container multi-select" id="socialPlatformsDropdown">
        <select id="socialPlatformsSelect" multiple></select>
        <div class="select-wrapper">
          <div class="select-display placeholder" id="selectDisplaySocialPlatforms" data-placeholder="-- Sélectionnez (multiple) --">
            <span id="selectedTextSocialPlatforms">-- Sélectionnez (multiple) --</span>
            <div class="dropdown-icon" id="dropdownIconSocialPlatforms">${SVG_CHEVRON}</div>
          </div>
          <div class="custom-options" id="customOptionsSocialPlatforms"></div>
        </div>
      </div>
      <div class="error-message" id="error-social-platforms">Veuillez sélectionner au moins une plateforme</div>
    </div>
    
    <!-- Language Section -->
    <div class="question-group">
      <label class="question-label" id="language-type-question">Votre chatbot sera-t-il multilingue ou unilingue ?</label>
      <div class="options-group">
        <label class="radio-option">
          <input type="radio" name="languageType" value="multilingual" />
          <span class="radio-icon"></span>
          <span class="radio-label" id="multilingual-label">Multilingue</span>
        </label>
        <label class="radio-option">
          <input type="radio" name="languageType" value="unilingual" />
          <span class="radio-icon"></span>
          <span class="radio-label" id="unilingual-label">Unilingue</span>
        </label>
      </div>
      <div class="error-message" id="error-language-type">Veuillez sélectionner une option</div>
    </div>
    
    <div class="question-group" id="language-selection" style="display: none;">
      <label class="form-label" id="language-select-label">Sélectionnez les langues</label>
      <div class="select-container multi-select" id="languagesDropdown">
        <select id="languagesSelect" multiple></select>
        <div class="select-wrapper">
          <div class="select-display placeholder" id="selectDisplayLanguages" data-placeholder="-- Sélectionnez (multiple) --">
            <span id="selectedTextLanguages">-- Sélectionnez (multiple) --</span>
            <div class="dropdown-icon" id="dropdownIconLanguages">${SVG_CHEVRON}</div>
          </div>
          <div class="custom-options" id="customOptionsLanguages"></div>
        </div>
      </div>
      <div class="error-message" id="error-languages">Veuillez sélectionner au moins une langue</div>
    </div>
    
    <div class="form-buttons">
      <button type="button" class="btn btn-prev" id="step8-prev">Précédent</button>
      <button type="button" class="btn btn-next" id="step8-next">Suivant</button>
    </div>
  </div>
  
  <!-- Step 9: Summary -->
  <div class="step-container" id="step-9">
    <h2 class="step-heading" id="step9-heading">Récapitulatif de votre demande</h2>
    
    <div class="summary-container">
      <!-- Contact Information -->
      <div class="summary-section">
        <div class="summary-heading">
          <span id="recap-contact-heading">Informations de contact</span>
          <button type="button" class="edit-btn" data-step="1" id="edit-contact">Modifier</button>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-name-label">Nom</div>
          <div class="summary-value" id="recap-name"></div>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-email-label">Email</div>
          <div class="summary-value" id="recap-email"></div>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-phone-label">Téléphone</div>
          <div class="summary-value" id="recap-phone"></div>
        </div>
        
        <div class="summary-row" id="recap-company-row">
          <div class="summary-label" id="recap-company-label">Entreprise</div>
          <div class="summary-value" id="recap-company"></div>
        </div>
      </div>
      
      <!-- Project Details -->
      <div class="summary-section">
        <div class="summary-heading">
          <span id="recap-project-heading">Détails du projet</span>
          <button type="button" class="edit-btn" data-step="2" id="edit-project">Modifier</button>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-niche-label">Niche</div>
          <div class="summary-value" id="recap-niche"></div>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-budget-label">Budget</div>
          <div class="summary-value" id="recap-budget"></div>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-description-label">Description</div>
          <div class="summary-value" id="recap-description"></div>
        </div>
      </div>
      
      <!-- Business Profile -->
      <div class="summary-section">
        <div class="summary-heading">
          <span id="recap-business-heading">Profil professionnel</span>
          <button type="button" class="edit-btn" data-step="3" id="edit-business">Modifier</button>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-team-size-label">Taille de l'équipe</div>
          <div class="summary-value" id="recap-team-size"></div>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-services-label">Services</div>
          <div class="summary-value" id="recap-services"></div>
        </div>
      </div>
      
      <!-- Core Features -->
      <div class="summary-section">
        <div class="summary-heading">
          <span id="recap-features-heading">Fonctionnalités de base</span>
          <button type="button" class="edit-btn" data-step="4" id="edit-features">Modifier</button>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-leads-label">Gestion des leads</div>
          <div class="summary-value" id="recap-leads"></div>
        </div>
      </div>
      
      <!-- Forms -->
      <div class="summary-section">
        <div class="summary-heading">
          <span id="recap-forms-heading">Formulaires</span>
          <button type="button" class="edit-btn" data-step="5" id="edit-forms">Modifier</button>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-forms-label">Formulaires</div>
          <div class="summary-value" id="recap-forms"></div>
        </div>
      </div>
      
      <!-- Website -->
      <div class="summary-section">
        <div class="summary-heading">
          <span id="recap-website-heading">Site web</span>
          <button type="button" class="edit-btn" data-step="6" id="edit-website">Modifier</button>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-has-website-label">Site web</div>
          <div class="summary-value" id="recap-has-website"></div>
        </div>
        
        <div class="summary-row" id="recap-platform-row" style="display: none;">
          <div class="summary-label" id="recap-platform-label">Plateforme</div>
          <div class="summary-value" id="recap-platform"></div>
        </div>
        
        <div class="summary-row" id="recap-website-url-row" style="display: none;">
          <div class="summary-label" id="recap-website-url-label">URL du site</div>
          <div class="summary-value" id="recap-website-url"></div>
        </div>
        <div class="summary-row" id="recap-website-traffic-row" style="display: none;">
  <div class="summary-label" id="recap-website-traffic-label">Trafic du site</div>
  <div class="summary-value" id="recap-website-traffic"></div>
</div>
      </div>
      
      <!-- Integrations -->
      <div class="summary-section">
        <div class="summary-heading">
          <span id="recap-integrations-heading">Intégrations</span>
          <button type="button" class="edit-btn" data-step="7" id="edit-integrations">Modifier</button>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-crm-label">CRM</div>
          <div class="summary-value" id="recap-crm"></div>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-booking-label">Système de réservation</div>
          <div class="summary-value" id="recap-booking"></div>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-database-label">Base de données</div>
          <div class="summary-value" id="recap-database"></div>
        </div>
      </div>
      
      <!-- Communication Channels -->
      <div class="summary-section">
        <div class="summary-heading">
          <span id="recap-channels-heading">Canaux de communication</span>
          <button type="button" class="edit-btn" data-step="8" id="edit-channels">Modifier</button>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-social-label">Chatbot social</div>
          <div class="summary-value" id="recap-social"></div>
        </div>
        
        <div class="summary-row">
          <div class="summary-label" id="recap-language-type-label">Type</div>
          <div class="summary-value" id="recap-language-type"></div>
        </div>
        
        <div class="summary-row" id="recap-languages-row" style="display: none;">
          <div class="summary-label" id="recap-languages-label">Langues</div>
          <div class="summary-value" id="recap-languages"></div>
        </div>
      </div>
    </div>
    
    <div class="form-buttons">
      <button type="button" class="btn btn-prev" id="step9-prev">Précédent</button>
      <button type="button" class="btn btn-submit" id="submit-button">Envoyer la demande</button>
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
      if (!progressBar) return;
      
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
    
	
	function loadSavedData() {
      const savedData = localStorage.getItem('chatbotFormData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          Object.assign(formValues, parsedData);
          restoreFormValues();
        } catch (e) {
          console.error("Error loading saved form data:", e);
        }
      }
      // Set initial visibility
      const formOptions = formContainer.querySelector('#form-options');
      const crmSelection = formContainer.querySelector('#crm-selection');
      const socialPlatformsGroup = formContainer.querySelector('#social-platforms-group');
      const needBookingOptions = formContainer.querySelector('#need-booking-options');
      
      if (formOptions) formOptions.style.display = formValues.useForm === 'yes' ? 'block' : 'none';
      if (crmSelection) crmSelection.style.display = formValues.useCRM === 'yes' ? 'block' : 'none';
      if (socialPlatformsGroup) socialPlatformsGroup.style.display = formValues.needSocialBot === 'yes' ? 'block' : 'none';
      if (needBookingOptions) needBookingOptions.style.display = formValues.hasBookingSystem === 'no' ? 'block' : 'none';
    }
        
    // Save form data to localStorage
    function saveFormData() {
      localStorage.setItem('chatbotFormData', JSON.stringify(formValues));
    }
    
    // Restore form values from saved data
    function restoreFormValues() {
      // Will implement restoration logic for each step when creating form elements
    }
    
    // Transform form values for submission (using readable values in current language)
    function prepareDataForSubmission(formValues) {
      // Create a copy of the form values
      const processedData = JSON.parse(JSON.stringify(formValues));
      
      // Use the actual form data based on the currentLanguage
      const localFormData = createFormData(currentLanguage);
      
      // Function to get text from translations
      function getLocalizedText(key) {
        return translations[currentLanguage][key] || key;
      }
      
      // Niche
      if (processedData.niche) {
        if (processedData.niche === 'other' && processedData.otherNiche) {
          processedData.niche = processedData.otherNiche;
        } else {
          const niche = localFormData.niches.find(n => n.id === processedData.niche);
          if (niche) processedData.niche = niche.name;
        }
      } else {
        processedData.niche = currentLanguage === 'fr' ? "Non spécifié" : "Not specified";
      }
      
      // Budget
      if (processedData.budget) {
        if (processedData.budget === 'custom' && processedData.customBudget) {
          processedData.budget = processedData.customBudget;
        } else {
          const budget = localFormData.budgetRanges.find(b => b.id === processedData.budget);
          if (budget) processedData.budget = budget.name;
        }
      } else {
        processedData.budget = currentLanguage === 'fr' ? "Non spécifié" : "Not specified";
      }
      
      // Team Size
      if (processedData.teamSize) {
        const teamSizeMap = {
          'solo': getLocalizedText('solo'),
          'small': getLocalizedText('smallTeam'),
          'medium': getLocalizedText('mediumTeam'),
          'large': getLocalizedText('largeTeam')
        };
        processedData.teamSize = teamSizeMap[processedData.teamSize] || processedData.teamSize;
      } else {
        processedData.teamSize = currentLanguage === 'fr' ? "Non spécifié" : "Not specified";
      }
      
      // Website Platform
      if (processedData.websitePlatform) {
        if (processedData.websitePlatform === 'other' && processedData.otherPlatform) {
          processedData.websitePlatform = processedData.otherPlatform;
        } else {
          const platform = localFormData.websitePlatforms.find(p => p.id === processedData.websitePlatform);
          if (platform) processedData.websitePlatform = platform.name;
        }
      } else {
        processedData.websitePlatform = currentLanguage === 'fr' ? "Non spécifié" : "Not specified";
      }
      
      // Website Traffic
      if (processedData.websiteTraffic) {
        const traffic = localFormData.websiteTraffic.find(t => t.id === processedData.websiteTraffic);
        if (traffic) processedData.websiteTraffic = traffic.name;
      } else {
        processedData.websiteTraffic = currentLanguage === 'fr' ? "Non spécifié" : "Not specified";
      }
      
      // Form Types - Convert both array and string to use names
      if (processedData.formTypes && Array.isArray(processedData.formTypes) && processedData.formTypes.length > 0) {
        const formTypeNames = processedData.formTypes.map(typeId => {
          const type = localFormData.formTypes.find(t => t.id === typeId);
          return type ? type.name : typeId;
        });
        // Replace the original array with names
        processedData.formTypesArray = formTypeNames;
        // Create string version
        processedData.formTypesString = formTypeNames.join(', ');
        // Replace the original formTypes with names
        processedData.formTypes = formTypeNames;
      } else {
        processedData.formTypesArray = [];
        processedData.formTypesString = "";
        processedData.formTypes = [];
      }
      
      // CRMs - Convert both array and string to use names
      if (processedData.crms && Array.isArray(processedData.crms) && processedData.crms.length > 0) {
        const crmNames = processedData.crms.map(crmId => {
          const crm = localFormData.crms.find(c => c.id === crmId);
          return crm ? crm.name : crmId;
        });
        // Replace the original array with names
        processedData.crmsArray = crmNames;
        // Create string version
        processedData.crmsString = crmNames.join(', ');
        // Replace the original crms with names
        processedData.crms = crmNames;
      } else {
        processedData.crmsArray = [];
        processedData.crmsString = "";
        processedData.crms = [];
      }
      
      // Booking Systems
      if (processedData.bookingSystems) {
        // Handle both array and single value formats
        if (Array.isArray(processedData.bookingSystems) && processedData.bookingSystems.length > 0) {
          const systemNames = processedData.bookingSystems.map(systemId => {
            const system = localFormData.bookingSystems.find(s => s.id === systemId);
            return system ? system.name : systemId;
          });
          processedData.bookingSystems = systemNames;
          processedData.bookingSystemsString = systemNames.join(', ');
        } else if (typeof processedData.bookingSystems === 'string') {
          const system = localFormData.bookingSystems.find(s => s.id === processedData.bookingSystems);
          if (system) {
            processedData.bookingSystems = system.name;
            processedData.bookingSystemsString = system.name;
          }
        }
      } else {
        processedData.bookingSystems = "";
        processedData.bookingSystemsString = "";
      }
      
      // Databases - Convert both array and string to use names
      if (processedData.databases && Array.isArray(processedData.databases) && processedData.databases.length > 0) {
        const dbNames = processedData.databases.map(dbId => {
          const db = localFormData.databases.find(d => d.id === dbId);
          return db ? db.name : dbId;
        });
        // Replace the original array with names
        processedData.databasesArray = dbNames;
        // Create string version
        processedData.databasesString = dbNames.join(', ');
        // Replace the original databases with names
        processedData.databases = dbNames;
      } else {
        processedData.databasesArray = [];
        processedData.databasesString = "";
        processedData.databases = [];
      }
      
      // Social Platforms - Convert both array and string to use names
      if (processedData.socialPlatforms && Array.isArray(processedData.socialPlatforms) && processedData.socialPlatforms.length > 0) {
        const platformNames = processedData.socialPlatforms.map(platformId => {
          const platform = localFormData.socialPlatforms.find(p => p.id === platformId);
          return platform ? platform.name : platformId;
        });
        // Replace the original array with names
        processedData.socialPlatformsArray = platformNames;
        // Create string version
        processedData.socialPlatformsString = platformNames.join(', ');
        // Replace the original socialPlatforms with names
        processedData.socialPlatforms = platformNames;
      } else {
        processedData.socialPlatformsArray = [];
        processedData.socialPlatformsString = "";
        processedData.socialPlatforms = [];
      }
      
      // currentLanguages - Convert both array and string to use names
      if (processedData.languages  && Array.isArray(processedData.languages )) {
        const currentLanguageNames = processedData.languages.map(langId => {
          const lang = localFormData.languages.find(l => l.id === langId);
          return lang ? lang.name : langId;
        });
        // Replace the original array with names
        processedData.currentLanguagesArray = currentLanguageNames;
        // Create string version
        processedData.currentLanguagesString = currentLanguageNames.join(', ');
        // Replace the original currentLanguages with names
        processedData.currentLanguages = currentLanguageNames;
      } else {
        processedData.currentLanguagesArray = [];
        processedData.currentLanguagesString = "";
        processedData.currentLanguages = [];
      }
      
      // currentLanguage Type
      if (processedData.currentLanguageType) {
        if (processedData.currentLanguageType === 'multilingual') {
          processedData.currentLanguageType = getLocalizedText('multilingual');
        } else if (processedData.currentLanguageType === 'unilingual') {
          processedData.currentLanguageType = getLocalizedText('unilingual');
        }
      } else {
        processedData.currentLanguageType = currentLanguage === 'fr' ? "Non spécifié" : "Not specified";
      }
      
      // Yes/No answers - Convert to true/false for Airtable checkboxes
      const yesNoFields = [
        'leadCapture', 'leadQualification', 'conversationSummary', 
        'useForm', 'hasWebsite', 'useCRM', 'hasBookingSystem', 
        'wantBookingRecommendation', 'handleCancellation', 
        'useDatabase', 'needSocialBot'
      ];

      yesNoFields.forEach(field => {
        // Check the current value of the field
        if (processedData[field] === 'yes') {
          processedData[field] = true;
        } else if (processedData[field] === 'no') {
          processedData[field] = false;
        } else {
          // If the field is not defined or has another value
          processedData[field] = false; // Default value
        }
      });
      
      // Validate optional text fields
      const optionalTextFields = ['company', 'otherNiche', 'otherPlatform', 'customBudget', 'formPurpose', 'websiteUrl'];
      optionalTextFields.forEach(field => {
        if (!processedData[field] || processedData[field].trim() === '') {
          processedData[field] = "";
        }
      });
      
      return processedData;
    }

    // Traductions
        // Enhanced translations object that can replace the current translations object in your code
      // Fonction pour obtenir les traductions
        function getText(key) {
          return translations[currentLanguage][key] || key;
        }
        
        
		
	 function addInfoButton(labelId, infoTitle, infoContent, language) {
      const label = formContainer.querySelector(`#${labelId}`);
      if (!label) return;
      
      // Create info button
      const infoButton = document.createElement('button');
      infoButton.className = 'info-button';
      infoButton.type = 'button';
      infoButton.setAttribute('aria-label', language === 'fr' ? 'Plus d\'informations' : 'More information');
      infoButton.innerHTML = SVG_INFO;
      
      // Create info panel
      const infoPanel = document.createElement('div');
      infoPanel.className = 'info-panel';
      infoPanel.id = `${labelId}-info`;
      
      // Add title if provided
      if (infoTitle) {
        const titleEl = document.createElement('div');
        titleEl.className = 'info-title';
        titleEl.textContent = infoTitle;
        infoPanel.appendChild(titleEl);
      }
      
      // Add content
      const contentEl = document.createElement('div');
      contentEl.innerHTML = infoContent;
      infoPanel.appendChild(contentEl);
      
      // Add close button
      const closeButton = document.createElement('button');
      closeButton.className = 'close-info';
      closeButton.type = 'button';
      closeButton.setAttribute('aria-label', language === 'fr' ? 'Fermer' : 'Close');
      closeButton.innerHTML = SVG_CLOSE;
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        infoPanel.classList.remove('show');
      });
      infoPanel.appendChild(closeButton);
      
      // Add click handler to button
      infoButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close any other open info panels
        formContainer.querySelectorAll('.info-panel').forEach(panel => {
          if (panel.id !== infoPanel.id) {
            panel.classList.remove('show');
          }
        });
        
        // Toggle this panel
        infoPanel.classList.toggle('show');
      });
      
      // Append button to label
      label.appendChild(infoButton);
      
      // Find the parent form-group or question-group
      const parentGroup = label.closest('.form-group') || label.closest('.question-group');
      if (parentGroup) {
        // Insert panel after the label but before the next element
        parentGroup.insertBefore(infoPanel, label.nextSibling);
      }
    }

   function initializeInfoButtons(currentLanguage) {
      // Define info content in both languages
      const infoContent = {
        "fr": {
          crm: {
            title: "Systèmes de Gestion de la Relation Client (CRM)",
            content: `Un CRM vous permet de suivre les interactions avec vos clients et prospects. L'intégration de votre chatbot avec un CRM permet d'enregistrer automatiquement les conversations et les données des utilisateurs dans votre système existant.<br><br>Choisissez les CRMs que vous utilisez déjà ou que vous souhaitez intégrer.`
          },
          database: {
            title: "Bases de données",
            content: `Une base de données stocke les informations recueillies par votre chatbot. Cela peut inclure les profils utilisateurs, les préférences, l'historique des conversations, et d'autres données importantes.<br><br>Si vous avez des systèmes existants, sélectionnez-les pour que nous puissions configurer les intégrations appropriées.`
          },
          booking: {
            title: "Systèmes de réservation",
            content: `Les systèmes de réservation permettent à vos clients de prendre rendez-vous ou de réserver vos services directement via le chatbot. L'intégration avec votre système actuel permet de synchroniser les disponibilités et d'éviter les doubles réservations.<br><br>Si vous n'avez pas encore de système, nous pouvons vous recommander la solution la plus adaptée à vos besoins.`
          },
          formTypes: {
            title: "Types de formulaires",
            content: `Les formulaires interactifs peuvent être intégrés à votre chatbot pour collecter des informations spécifiques. Chaque type de formulaire est conçu pour un objectif particulier:<br><br>
              • <strong>Formulaire de contact</strong>: Recueille les coordonnées des visiteurs<br>
              • <strong>Génération de leads</strong>: Qualifie les prospects potentiels<br>
              • <strong>Questionnaire</strong>: Collecte des informations détaillées<br>
              • <strong>Réservation</strong>: Permet de réserver un créneau horaire<br>
              • <strong>Support client</strong>: Pour les demandes d'assistance<br>
              • Et plus encore selon vos besoins spécifiques`
          },
          websitePlatform: {
            title: "Plateformes Web",
            content: `La connaissance de votre plateforme web nous permet de créer une intégration optimale pour votre chatbot. Chaque plateforme a ses propres spécificités techniques et requiert une approche d'intégration différente.<br><br>Si votre site est personnalisé, précisez les technologies utilisées (PHP, Node.js, React, etc.).`
          },
          socialPlatforms: {
            title: "Plateformes sociales",
            content: `Votre chatbot peut être déployé sur différentes plateformes de messagerie sociale pour atteindre vos clients là où ils se trouvent. Chaque plateforme offre des fonctionnalités spécifiques et nécessite une configuration particulière.<br><br>Sélectionnez les plateformes où vous souhaitez déployer votre chatbot.`
          },
          languageType: {
            title: "Configuration linguistique",
            content: `Un chatbot multilingue peut communiquer avec vos utilisateurs dans plusieurs langues, élargissant ainsi votre audience potentielle. Un chatbot unilingue ne fonctionnera que dans une seule langue.<br><br>Le support multilingue est plus complexe à mettre en place mais offre une meilleure expérience utilisateur pour une audience internationale.`
          },
          leadCapture: {
            title: "Capture de prospects",
            content: `Cette fonctionnalité permet à votre chatbot de collecter automatiquement les informations de contact des visiteurs intéressés par vos produits ou services. Ces informations peuvent ensuite être transmises à votre équipe commerciale ou intégrées à votre CRM.`
          },
          leadQualification: {
            title: "Qualification de prospects",
            content: `Votre chatbot peut poser une série de questions pour déterminer si un visiteur correspond à votre client idéal. Cela permet de filtrer les prospects selon vos critères et de concentrer vos efforts sur les plus prometteurs.`
          },
          conversationSummary: {
            title: "Synthèse automatique des conversations",
            content: `Cette fonctionnalité permet à votre chatbot de générer automatiquement des résumés des conversations avec les utilisateurs. Ces synthèses extraient les points clés, les demandes et les engagements pris pendant l'échange.<br><br>Avantages:<br>
              • Suivi efficace des interactions clients<br>
              • Identification rapide des besoins récurrents<br>
              • Facilitation du transfert vers une personne réelle si nécessaire<br>
              • Documentation automatique des échanges pour analyse ultérieure`
          },
          websiteTraffic: {
            title: "Volume de trafic mensuel",
            content: `Cette information nous permet de dimensionner correctement votre solution de chatbot. Le volume de trafic influence:<br><br>
              • La capacité de traitement nécessaire<br>
              • Les ressources serveur à allouer<br>
              • La structure optimale des dialogues<br>
              • Les stratégies de mise en cache et d'optimisation<br><br>
              Un chatbot pour un site à fort trafic nécessite une architecture plus robuste et évolutive qu'un site avec moins de visiteurs.`
          },
          handleCancellation: {
            title: "Gestion des annulations et reports",
            content: `Cette fonctionnalité permet à vos clients de modifier ou d'annuler leurs réservations directement via le chatbot, sans intervention humaine.<br><br>Le chatbot peut:<br>
              • Accéder au calendrier des réservations existantes<br>
              • Proposer des créneaux alternatifs disponibles<br>
              • Confirmer les modifications par email/SMS<br>
              • Appliquer vos règles d'entreprise concernant les délais d'annulation ou les frais<br><br>
              Cette automatisation améliore l'expérience client tout en réduisant la charge de travail administrative.`
          }
        },
        "en": {
          crm: {
            title: "Customer Relationship Management (CRM) Systems",
            content: `A CRM helps you track interactions with your customers and leads. Integrating your chatbot with a CRM allows conversations and user data to be automatically recorded in your existing system.<br><br>Select the CRMs you already use or want to integrate with.`
          },
          database: {
            title: "Databases",
            content: `A database stores information collected by your chatbot. This can include user profiles, preferences, conversation history, and other important data.<br><br>If you have existing systems, select them so we can set up the appropriate integrations.`
          },
          booking: {
            title: "Booking Systems",
            content: `Booking systems allow your customers to make appointments or reserve your services directly through the chatbot. Integration with your current system ensures availability synchronization and prevents double bookings.<br><br>If you don't have a system yet, we can recommend the solution that best fits your needs.`
          },
          formTypes: {
            title: "Form Types",
            content: `Interactive forms can be integrated into your chatbot to collect specific information. Each form type is designed for a particular purpose:<br><br>
              • <strong>Contact Form</strong>: Collects visitor contact details<br>
              • <strong>Lead Generation</strong>: Qualifies potential prospects<br>
              • <strong>Survey</strong>: Gathers detailed information<br>
              • <strong>Booking</strong>: Allows scheduling a time slot<br>
              • <strong>Customer Support</strong>: For assistance requests<br>
              • And more based on your specific needs`
          },
          websitePlatform: {
            title: "Web Platforms",
            content: `Understanding your web platform allows us to create optimal integration for your chatbot. Each platform has its own technical specifications and requires a different integration approach.<br><br>If your site is custom-built, please specify the technologies used (PHP, Node.js, React, etc.).`
          },
          socialPlatforms: {
            title: "Social Platforms",
            content: `Your chatbot can be deployed on various social messaging platforms to reach your customers where they are. Each platform offers specific features and requires particular configuration.<br><br>Select the platforms where you want to deploy your chatbot.`
          },
          languageType: {
            title: "Language Configuration",
            content: `A multilingual chatbot can communicate with your users in multiple languages, expanding your potential audience. A unilingual chatbot will only work in one language.<br><br>Multilingual support is more complex to set up but provides a better user experience for an international audience.`
          },
          leadCapture: {
            title: "Lead Capture",
            content: `This feature allows your chatbot to automatically collect contact information from visitors interested in your products or services. This information can then be passed to your sales team or integrated into your CRM.`
          },
          leadQualification: {
            title: "Lead Qualification",
            content: `Your chatbot can ask a series of questions to determine if a visitor matches your ideal customer profile. This helps filter prospects according to your criteria and focus your efforts on the most promising ones.`
          },
          conversationSummary: {
            title: "Automated Conversation Synthesis",
            content: `This feature enables your chatbot to automatically generate summaries of user conversations. These summaries extract key points, requests, and commitments made during the interaction.<br><br>Benefits:<br>
              • Efficient tracking of customer interactions<br>
              • Quick identification of recurring needs<br>
              • Seamless handover to human agents when necessary<br>
              • Automatic documentation of exchanges for later analysis`
          },
          websiteTraffic: {
            title: "Monthly Traffic Volume",
            content: `This information helps us properly size your chatbot solution. Traffic volume influences:<br><br>
              • Required processing capacity<br>
              • Server resources allocation<br>
              • Optimal dialog structure<br>
              • Caching and optimization strategies<br><br>
              A chatbot for a high-traffic site requires a more robust and scalable architecture than a site with fewer visitors.`
          },
          handleCancellation: {
            title: "Cancellation and Rescheduling Management",
            content: `This functionality allows your customers to modify or cancel their bookings directly through the chatbot without human intervention.<br><br>The chatbot can:<br>
              • Access the calendar of existing reservations<br>
              • Offer available alternative time slots<br>
              • Confirm changes via email/SMS<br>
              • Apply your business rules regarding cancellation deadlines or fees<br><br>
              This automation improves customer experience while reducing administrative workload.`
          }
        }
      };
      
      // Add info buttons to specific fields - modified as requested
  addInfoButton('use-form-question', infoContent[currentLanguage].formTypes.title, infoContent[currentLanguage].formTypes.content, currentLanguage);
  addInfoButton('use-crm-question', infoContent[currentLanguage].crm.title, infoContent[currentLanguage].crm.content, currentLanguage);
  addInfoButton('has-booking-question', infoContent[currentLanguage].booking.title, infoContent[currentLanguage].booking.content, currentLanguage);
  addInfoButton('use-database-question', infoContent[currentLanguage].database.title, infoContent[currentLanguage].database.content, currentLanguage);
  addInfoButton('social-bot-question', infoContent[currentLanguage].socialPlatforms.title, infoContent[currentLanguage].socialPlatforms.content, currentLanguage);
  
  // Also add to "want booking recommendation" for users without booking systems
  addInfoButton('want-booking-recommendation', infoContent[currentLanguage].booking.title, infoContent[currentLanguage].booking.content, currentLanguage);
  
  // Keep other existing info buttons
  addInfoButton('platform-label', infoContent[currentLanguage].websitePlatform.title, infoContent[currentLanguage].websitePlatform.content, currentLanguage);
  addInfoButton('language-type-question', infoContent[currentLanguage].languageType.title, infoContent[currentLanguage].languageType.content, currentLanguage);
  addInfoButton('lead-capture-question', infoContent[currentLanguage].leadCapture.title, infoContent[currentLanguage].leadCapture.content, currentLanguage);
  addInfoButton('lead-qualification-question', infoContent[currentLanguage].leadQualification.title, infoContent[currentLanguage].leadQualification.content, currentLanguage);
  addInfoButton('conversation-summary-question', infoContent[currentLanguage].conversationSummary.title, infoContent[currentLanguage].conversationSummary.content, currentLanguage);
  addInfoButton('website-traffic-label', infoContent[currentLanguage].websiteTraffic.title, infoContent[currentLanguage].websiteTraffic.content, currentLanguage);
  addInfoButton('handle-cancellation-question', infoContent[currentLanguage].handleCancellation.title, infoContent[currentLanguage].handleCancellation.content, currentLanguage);
    }

function updateAllTexts() {
      // Get the updated form data based on current language
      formData = createFormData(currentLanguage);
      
      // Step progress indicators
      formContainer.querySelector('#progress-step1').textContent = getText('step1Title');
      formContainer.querySelector('#progress-step2').textContent = getText('step2Title');
      formContainer.querySelector('#progress-step3').textContent = getText('step3Title');
      formContainer.querySelector('#progress-step4').textContent = getText('step4Title');
      formContainer.querySelector('#progress-step5').textContent = getText('step5Title');
      formContainer.querySelector('#progress-step6').textContent = getText('step6Title');
      formContainer.querySelector('#progress-step7').textContent = getText('step7Title');
      formContainer.querySelector('#progress-step8').textContent = getText('step8Title');
      formContainer.querySelector('#progress-step9').textContent = getText('step9Title');
      
      // Step headings
      formContainer.querySelector('#step1-heading').textContent = getText('step1Title');
      formContainer.querySelector('#step2-heading').textContent = getText('step2Title');
      formContainer.querySelector('#step3-heading').textContent = getText('step3Title');
      formContainer.querySelector('#step4-heading').textContent = getText('step4Title');
      formContainer.querySelector('#step5-heading').textContent = getText('step5Title');
      formContainer.querySelector('#step6-heading').textContent = getText('step6Title');
      formContainer.querySelector('#step7-heading').textContent = getText('step7Title');
      formContainer.querySelector('#step8-heading').textContent = getText('step8Title');
      formContainer.querySelector('#step9-heading').textContent = getText('step9Title');
      
      // Confirmation screen
      formContainer.querySelector('#confirmation-title').textContent = getText('confirmationTitle');
      formContainer.querySelector('#confirmation-message').textContent = getText('confirmationMessage');
      formContainer.querySelector('#back-to-form').textContent = getText('backToForm');
      
      // Update all labels and questions
      updateStep1Labels();
      updateStep2Labels();
      updateStep3Labels();
      updateStep4Labels();
      updateStep5Labels();
      updateStep6Labels();
      updateStep7Labels();
      updateStep8Labels();
      updateStep9Labels();
      
      // Update navigation buttons
      updateNavigationButtons();
      
      // Update dropdowns
      updateDropdownTexts();
      
      // Update radio button labels
      updateRadioButtonLabels();
      
      // Update info buttons
      initializeInfoButtons(currentLanguage);
    }
    
   function initializeForm() {
      // Initialize character counters
      formContainer.querySelector('#services-counter').textContent = formValues.services.length || 0;
      formContainer.querySelector('#form-purpose-counter').textContent = formValues.formPurpose.length || 0;
      formContainer.querySelector('#description-counter').textContent = formValues.description.length || 0;
      
      // Initialize dropdowns
      initializeDropdowns();
      
      // Load saved data
      loadSavedData();
      
      // Set the formLanguage
      formValues.formLanguage = currentLanguage;
      
      // Get the form data for current language
      formData = createFormData(currentLanguage);
      
      // Update all text elements
      updateAllTexts();
      
      // Initialize progress bar
      updateProgressBar();
      
      // Setup real-time validation
      setupRealTimeValidation();
      
      // Setup radio button validation
      setupRadioButtonValidation();
      
      // Show/hide conditional sections based on saved values
      if (formValues.useForm === 'yes') {
        formContainer.querySelector('#form-options').style.display = 'block';
      }
      
      if (formValues.hasWebsite === 'yes') {
        formContainer.querySelector('#website-options').style.display = 'block';
      }
      
      if (formValues.needSocialBot === 'yes') {
        formContainer.querySelector('#social-platforms-group').style.display = 'block';
      }
      
      if (formValues.useCRM === 'yes') {
        formContainer.querySelector('#crm-selection').style.display = 'block';
      }
      
      if (formValues.hasBookingSystem === 'yes') {
        formContainer.querySelector('#existing-booking-options').style.display = 'block';
      } else if (formValues.hasBookingSystem === 'no') {
        formContainer.querySelector('#need-booking-options').style.display = 'block';
      }
      
      if (formValues.useDatabase === 'yes') {
        formContainer.querySelector('#database-selection').style.display = 'block';
      }
      
      if (formValues.languageType) {
        formContainer.querySelector('#language-selection').style.display = 'block';
      }
      startFormTimer();
    }

    
	
    /*************************************************************
 * Timer Functionality
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
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = currentLanguage === 'fr' ? "Temps expiré" : "Time Expired";
        submitButton.style.backgroundColor = "#f44336";
        submitButton.style.color = "white";
      }
      
      // also disable & style any Next buttons
      formContainer
        .querySelectorAll(".btn-next")
        .forEach(btn => {
          btn.disabled = true;
          btn.textContent = currentLanguage === "fr" ? "Temps expiré" : "Time Expired";
          btn.style.backgroundColor = "#f44336";
          btn.style.color = "white";
        });
        
      if(vf){
        window.voiceflow.chat.interact({
          type: "timeEnd",
          payload: {
            message: "Time expired"
          }
        });
      }
    }

    /*************************************************************
     * Form Disable Function
     *************************************************************/
    function disableAllFormElements() {
      // Set cursor style to not-allowed for all interactive elements
      formContainer.querySelectorAll('button, input, select, textarea, .custom-options, .select-wrapper, .dropdown-icon').forEach(el => {
        el.disabled = true;
        el.style.cursor = "not-allowed";
      });
      
      // Disable dropdown functionality
      formContainer.querySelectorAll('.custom-options.show-options').forEach(opt => {
        opt.classList.remove('show-options');
      });
      
      formContainer.querySelectorAll('.dropdown-icon.rotate').forEach(icon => {
        icon.classList.remove('rotate');
      });
      
      formContainer.classList.add('disabled');
    }

    // Function to set up real-time validation for input fields
    function setupRealTimeValidation() {
      // Text inputs validation
      const firstName = formContainer.querySelector('#first-name');
      if (firstName) {
        firstName.addEventListener('input', function() {
          formValues.firstName = this.value.trim();
          if (this.value.trim()) {
            hideError('error-firstname');
          }
          saveFormData();
        });
      }
      
      const lastName = formContainer.querySelector('#last-name');
      if (lastName) {
        lastName.addEventListener('input', function() {
          formValues.lastName = this.value.trim();
          if (this.value.trim()) {
            hideError('error-lastname');
          }
          saveFormData();
        });
      }
      
      const email = formContainer.querySelector('#email');
      if (email) {
        email.addEventListener('input', function() {
          formValues.email = this.value.trim();
          if (this.value.trim()) {
            if (isValidEmail(this.value.trim())) {
              hideError('error-email');
            } else {
              showError('error-email', 'emailInvalid');
            }
          }
          saveFormData();
        });
      }
      
      const phone = formContainer.querySelector('#phone');
      if (phone) {
        phone.addEventListener('input', function() {
          formValues.phone = this.value.trim();
          if (this.value.trim()) {
            if (isValidPhoneNumber(this.value.trim())) {
              hideError('error-phone');
            } else {
              showError('error-phone', 'phoneInvalid');
            }
          }
          saveFormData();
        });
      }
      
      const description = formContainer.querySelector('#description');
      if (description) {
        description.addEventListener('input', function() {
          formValues.description = this.value.trim();
          if (this.value.trim()) {
            hideError('error-description');
          }
          const counter = formContainer.querySelector('#description-counter');
          if (counter) counter.textContent = this.value.length;
          saveFormData();
        });
      }
      
      const otherNiche = formContainer.querySelector('#other-niche');
      if (otherNiche) {
        otherNiche.addEventListener('input', function() {
          formValues.otherNiche = this.value.trim();
          if (this.value.trim()) {
            hideError('error-other-niche');
          }
          saveFormData();
        });
      }
      
      const customBudget = formContainer.querySelector('#custom-budget');
      if (customBudget) {
        customBudget.addEventListener('input', function() {
          formValues.customBudget = this.value.trim();
          if (this.value.trim()) {
            hideError('error-custom-budget');
          }
          saveFormData();
        });
      }
      
      const services = formContainer.querySelector('#services');
      if (services) {
        services.addEventListener('input', function() {
          formValues.services = this.value.trim();
          if (this.value.trim()) {
            hideError('error-services');
          }
          const counter = formContainer.querySelector('#services-counter');
          if (counter) counter.textContent = this.value.length;
          saveFormData();
        });
      }
      
      const websiteUrl = formContainer.querySelector('#website-url');
      if (websiteUrl) {
        websiteUrl.addEventListener('input', function() {
          formValues.websiteUrl = this.value.trim();
          saveFormData();
        });
      }
      
      const otherPlatform = formContainer.querySelector('#other-platform');
      if (otherPlatform) {
        otherPlatform.addEventListener('input', function() {
          formValues.otherPlatform = this.value.trim();
          if (this.value.trim()) {
            hideError('error-other-platform');
          }
          saveFormData();
        });
      }
    }

    function setupRadioButtonValidation() {
      // Lead capture radio buttons
      formContainer.querySelectorAll('input[name="leadCapture"]').forEach(radio => {
        radio.addEventListener('change', function() {
          hideError('error-lead-capture');
          formValues.leadCapture = this.value;
          saveFormData();
        });
      });
      
      // Lead qualification radio buttons
      formContainer.querySelectorAll('input[name="leadQualification"]').forEach(radio => {
        radio.addEventListener('change', function() {
          hideError('error-lead-qualification');
          formValues.leadQualification = this.value;
          saveFormData();
        });
      });
      
      // Conversation summary radio buttons
      formContainer.querySelectorAll('input[name="conversationSummary"]').forEach(radio => {
        radio.addEventListener('change', function() {
          hideError('error-conversation-summary');
          formValues.conversationSummary = this.value;
          saveFormData();
        });
      });
      
      // Use form radio buttons
      formContainer.querySelectorAll('input[name="useForm"]').forEach(radio => {
        radio.addEventListener('change', function() {
          const formOptions = formContainer.querySelector('#form-options');
          const formTypesDropdown = formContainer.querySelector('#formTypesDropdown');
          const formPurpose = formContainer.querySelector('#form-purpose-group');
          
          if (formOptions && this.value === 'yes') {
            formOptions.style.display = 'block';
            if (formTypesDropdown) formTypesDropdown.style.display = 'block';
            if (formPurpose) formPurpose.style.display = 'block';
          } else if (formOptions) {
            formOptions.style.display = 'none';
            if (formTypesDropdown) formTypesDropdown.style.display = 'none';
            if (formPurpose) formPurpose.style.display = 'none';
          }
          
          formValues.useForm = this.value;
          saveFormData();
        });
      });
      
      // Has website radio buttons
      formContainer.querySelectorAll('input[name="hasWebsite"]').forEach(radio => {
        radio.addEventListener('change', function() {
          hideError('error-has-website');
          const websiteOptions = formContainer.querySelector('#website-options');
          if (websiteOptions) {
            websiteOptions.style.display = this.value === 'yes' ? 'block' : 'none';
          }
          formValues.hasWebsite = this.value;
          saveFormData();
        });
      });
      
      // Use CRM radio buttons
      formContainer.querySelectorAll('input[name="useCRM"]').forEach(radio => {
        radio.addEventListener('change', function() {
          const crmSelection = formContainer.querySelector('#crm-selection');
          if (crmSelection) {
            crmSelection.style.display = this.value === 'yes' ? 'block' : 'none';
          }
          formValues.useCRM = this.value;
          saveFormData();
        });
      });
      
      // Booking System Recommendation Toggle
      formContainer.querySelectorAll('input[name="hasBookingSystem"]').forEach(radio =>
        radio.addEventListener('change', e => {
          const needBookingOptions = formContainer.querySelector('#need-booking-options');
          if (needBookingOptions) {
            needBookingOptions.classList.toggle('visible', e.target.value === 'no');
          }
          formValues.hasBookingSystem = e.target.value;
          saveFormData();
        })
      );
      
      // Use database radio buttons
      formContainer.querySelectorAll('input[name="useDatabase"]').forEach(radio => {
        radio.addEventListener('change', function() {
          hideError('error-use-database');
          const databaseSelection = formContainer.querySelector('#database-selection');
          if (databaseSelection) {
            databaseSelection.style.display = this.value === 'yes' ? 'block' : 'none';
          }
          formValues.useDatabase = this.value;
          saveFormData();
        });
      });
      
      // Social Media Integration Toggle
      formContainer.querySelectorAll('input[name="needSocialBot"]').forEach(radio =>
        radio.addEventListener('change', e => {
          const socialPlatformsGroup = formContainer.querySelector('#social-platforms-group');
          if (socialPlatformsGroup) {
            socialPlatformsGroup.classList.toggle('visible', e.target.value === 'yes');
          }
          formValues.needSocialBot = e.target.value;
          saveFormData();
        })
      );
      
      // Language type radio buttons
      formContainer.querySelectorAll('input[name="languageType"]').forEach(radio => {
        radio.addEventListener('change', function() {
          hideError('error-language-type');
          // Existing language type change handler code remains the same
          formValues.languageType = this.value;
          saveFormData();
        });
      });
    }
    
    
	/*************************************************************
     * Translation Functions
     *************************************************************/
     function updateRadioButtonLabels() {
      // Update Yes/No labels
      document.querySelectorAll('.radio-option').forEach(option => {
        const radioInput = option.querySelector('input[type="radio"]');
        if (radioInput) {
          const label = option.querySelector('.radio-label');
          if (label && (radioInput.value === 'yes' || radioInput.value === 'no')) {
            label.textContent = radioInput.value === 'yes' ? getText('yes') : getText('no');
          }
        }
      });
      
      // Update specific labels
      if (formContainer.querySelector('#multilingual-label')) {
        formContainer.querySelector('#multilingual-label').textContent = getText('multilingual');
      }
      if (formContainer.querySelector('#unilingual-label')) {
        formContainer.querySelector('#unilingual-label').textContent = getText('unilingual');
      }
    }
    
    function updateStep1Labels() {
      formContainer.querySelector('#firstname-label').textContent = getText('firstName');
      formContainer.querySelector('#lastname-label').textContent = getText('lastName');
      formContainer.querySelector('#email-label').textContent = getText('email');
      formContainer.querySelector('#phone-label').textContent = getText('phone');
      formContainer.querySelector('#company-label').textContent = getText('companyOptional');
      
      // Placeholders
      formContainer.querySelector('#first-name').placeholder = `${getText('firstName')}...`;
      formContainer.querySelector('#last-name').placeholder = `${getText('lastName')}...`;
      formContainer.querySelector('#email').placeholder = `${getText('email')}...`;
      formContainer.querySelector('#phone').placeholder = `${getText('phone')}...`;
      formContainer.querySelector('#company').placeholder = `${getText('company')}...`;
      
      // Error messages
      formContainer.querySelector('#error-firstname').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-lastname').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-email').textContent = getText('enterValidEmail');
      formContainer.querySelector('#error-phone').textContent = getText('enterValidPhone');
    }
    
    function updateStep2Labels() {
      formContainer.querySelector('#niche-label').textContent = getText('selectNiche');
      formContainer.querySelector('#other-niche-label').textContent = getText('otherNicheSpecify');
      formContainer.querySelector('#budget-label').textContent = getText('budgetQuestion');
      formContainer.querySelector('#custom-budget-label').textContent = getText('customBudgetQuestion');
      formContainer.querySelector('#description-label').textContent = getText('projectDescription');
      
      // Placeholders
      formContainer.querySelector('#other-niche').placeholder = `${getText('otherNicheSpecify')}...`;
      formContainer.querySelector('#description').placeholder = getText('projectDescriptionPlaceholder');
      formContainer.querySelector('#custom-budget').placeholder = `${getText('customBudgetQuestion')}...`;
      
      // Error messages
      formContainer.querySelector('#error-niche').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-other-niche').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-budget').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-custom-budget').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-description').textContent = getText('fieldRequired');
    }
    
    function updateStep3Labels() {
      formContainer.querySelector('#team-size-question').textContent = getText('teamSizeQuestion');
      formContainer.querySelector('#services-label').textContent = getText('servicesQuestion');
      
      // Placeholders
      formContainer.querySelector('#services').placeholder = getText('servicesPlaceholder');
      
      // Error messages
      formContainer.querySelector('#error-team-size').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-services').textContent = getText('fieldRequired');
    }
    
    function updateStep4Labels() {
      formContainer.querySelector('#lead-capture-question').textContent = getText('leadCaptureQuestion');
      formContainer.querySelector('#lead-qualification-question').textContent = getText('leadQualificationQuestion');
      formContainer.querySelector('#conversation-summary-question').textContent = getText('conversationSummaryQuestion');
      
      // Error messages
      formContainer.querySelector('#error-lead-capture').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-lead-qualification').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-conversation-summary').textContent = getText('fieldRequired');
    }
    
    function updateStep5Labels() {
      formContainer.querySelector('#use-form-question').textContent = getText('useFormQuestion');
      formContainer.querySelector('#form-types-label').textContent = getText('selectFormTypes');
      formContainer.querySelector('#form-purpose-label').textContent = getText('formPurposeQuestion');
      
      // Placeholders
      formContainer.querySelector('#form-purpose').placeholder = getText('formPurposePlaceholder');
      
      // Error messages
      formContainer.querySelector('#error-use-form').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-form-types').textContent = getText('selectAtLeastOne');
    }
    
    function updateStep6Labels() {
      formContainer.querySelector('#website-question').textContent = getText('websiteQuestion');
      formContainer.querySelector('#platform-label').textContent = getText('selectPlatform');
      formContainer.querySelector('#other-platform-label').textContent = getText('other');
      formContainer.querySelector('#website-url-label').textContent = getText('websiteUrlLabel');
      formContainer.querySelector('#website-traffic-label').textContent = getText('websiteTrafficLabel');
      
      // Placeholders
      formContainer.querySelector('#other-platform').placeholder = `${getText('other')}...`;
      formContainer.querySelector('#website-url').placeholder = "https://www.example.com";
      
      // Error messages
      formContainer.querySelector('#error-has-website').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-platform').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-other-platform').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-website-url').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-website-traffic').textContent = getText('fieldRequired');
    }
    
    function updateStep7Labels() {
      formContainer.querySelector('#use-crm-question').textContent = getText('useCRMQuestion');
      formContainer.querySelector('#yes-label').textContent = getText('yes');
      formContainer.querySelector('#no-label').textContent = getText('no');
      formContainer.querySelector('#crm-select-label').textContent = getText('selectCRMs');
      
      formContainer.querySelector('#has-booking-question').textContent = getText('hasBookingQuestion');
      formContainer.querySelector('#booking-select-label').textContent = getText('selectBookingSystems');
      formContainer.querySelector('#handle-cancellation-question').textContent = getText('handleCancellationQuestion');
      formContainer.querySelector('#want-booking-recommendation').textContent = getText('wantBookingRecommendation');
      
      formContainer.querySelector('#use-database-question').textContent = getText('useDatabaseQuestion');
      formContainer.querySelector('#database-select-label').textContent = getText('selectDatabases');
      
      // Error messages
      formContainer.querySelector('#error-use-crm').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-crms').textContent = getText('selectAtLeastOne');
      formContainer.querySelector('#error-has-booking').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-booking-systems').textContent = getText('selectAtLeastOne');
      formContainer.querySelector('#error-use-database').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-databases').textContent = getText('selectAtLeastOne');
    }
    
    function updateStep8Labels() {
      formContainer.querySelector('#social-bot-question').textContent = getText('needSocialBotQuestion');
      formContainer.querySelector('#social-platforms-label').textContent = getText('selectSocialPlatforms');
      
      formContainer.querySelector('#language-type-question').textContent = getText('languageTypeQuestion');
      formContainer.querySelector('#multilingual-label').textContent = getText('multilingual');
      formContainer.querySelector('#unilingual-label').textContent = getText('unilingual');
      
      const languageSelectLabel = formContainer.querySelector('#language-select-label');
      if (languageSelectLabel) {
        const isMultilingual = formValues.languageType === 'multilingual';
        languageSelectLabel.textContent = isMultilingual ? getText('selectLanguages') : getText('selectLanguage');
      }
      
      // Error messages
      formContainer.querySelector('#error-need-social').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-social-platforms').textContent = getText('selectAtLeastOne');
      formContainer.querySelector('#error-language-type').textContent = getText('fieldRequired');
      formContainer.querySelector('#error-languages').textContent = getText('selectAtLeastOne');
    }
    
    function updateStep9Labels() {
      formContainer.querySelector('#step9-heading').textContent = getText('recapTitle');
      
      // Recap sections
      formContainer.querySelector('#recap-contact-heading').textContent = getText('recapContact');
      formContainer.querySelector('#recap-project-heading').textContent = getText('recapProject');
      formContainer.querySelector('#recap-business-heading').textContent = getText('recapBusiness');
      formContainer.querySelector('#recap-features-heading').textContent = getText('recapFeatures');
      formContainer.querySelector('#recap-forms-heading').textContent = getText('recapForms');
      formContainer.querySelector('#recap-website-heading').textContent = getText('recapWebsite');
      formContainer.querySelector('#recap-integrations-heading').textContent = getText('recapIntegrations');
      formContainer.querySelector('#recap-channels-heading').textContent = getText('recapChannels');
      
      // Edit buttons
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.textContent = getText('edit');
      });
      
      // Labels
      formContainer.querySelector('#recap-name-label').textContent = getText('firstName') + ' / ' + getText('lastName');
      formContainer.querySelector('#recap-email-label').textContent = getText('email');
      formContainer.querySelector('#recap-phone-label').textContent = getText('phone');
      formContainer.querySelector('#recap-company-label').textContent = getText('company');
      
      formContainer.querySelector('#recap-niche-label').textContent = getText('selectNiche');
      formContainer.querySelector('#recap-budget-label').textContent = getText('budgetQuestion');
      formContainer.querySelector('#recap-description-label').textContent = getText('projectDescription');
      
      formContainer.querySelector('#recap-team-size-label').textContent = getText('teamSizeQuestion');
      formContainer.querySelector('#recap-services-label').textContent = getText('servicesQuestion');
      
      formContainer.querySelector('#recap-leads-label').textContent = getText('leadCaptureQuestion');
      
      formContainer.querySelector('#recap-forms-label').textContent = getText('useFormQuestion');
      
      formContainer.querySelector('#recap-has-website-label').textContent = getText('websiteQuestion');
      formContainer.querySelector('#recap-platform-label').textContent = getText('selectPlatform');
      formContainer.querySelector('#recap-website-url-label').textContent = getText('websiteUrlLabel');
      formContainer.querySelector('#recap-website-traffic-label').textContent = getText('websiteTrafficLabel');

      
      formContainer.querySelector('#recap-crm-label').textContent = getText('useCRMQuestion');
      formContainer.querySelector('#recap-booking-label').textContent = getText('hasBookingQuestion');
      formContainer.querySelector('#recap-database-label').textContent = getText('useDatabaseQuestion');
      
      formContainer.querySelector('#recap-social-label').textContent = getText('needSocialBotQuestion');
      formContainer.querySelector('#recap-language-type-label').textContent = getText('languageTypeQuestion');
      formContainer.querySelector('#recap-languages-label').textContent = getText('selectLanguages');
      
    }
    
    function updateNavigationButtons() {
      const nextButtons = formContainer.querySelectorAll('.btn-next');
      const prevButtons = formContainer.querySelectorAll('.btn-prev');
      const submitButton = formContainer.querySelector('.btn-submit');
      
      nextButtons.forEach(btn => btn.textContent = getText('next'));
      prevButtons.forEach(btn => btn.textContent = getText('previous'));
      if (submitButton) submitButton.textContent = isFormSubmitted ? getText('submitted') : getText('submit');
    }
    
    function updateDropdownTexts() {
      // Update placeholders for all dropdowns
      document.querySelectorAll('.select-display').forEach(display => {
        if (display.classList.contains('placeholder')) {
          const placeholder = display.getAttribute('data-placeholder');
          if (placeholder === '-- Sélectionnez --' || placeholder === '-- Select --') {
            display.setAttribute('data-placeholder', getText('selectPlaceholder'));
            const spanElement = display.querySelector('span');
            if (spanElement) spanElement.textContent = getText('selectPlaceholder');
          } else if (placeholder === '-- Sélectionnez (multiple) --' || placeholder === '-- Select (multiple) --') {
            display.setAttribute('data-placeholder', getText('selectMultiplePlaceholder'));
            const spanElement = display.querySelector('span');
            if (spanElement) spanElement.textContent = getText('selectMultiplePlaceholder');
          }
        }
      });
    }
    
    /*************************************************************
     * Helper: Build Dropdown Options
     *************************************************************/
     
    // Single-select dropdown builder
    function buildSingleSelectDropdown(selectId, customOptionsId, displayId, iconId, options) {
      const select = formContainer.querySelector(`#${selectId}`);
      const customOptions = formContainer.querySelector(`#${customOptionsId}`);
      const display = formContainer.querySelector(`#${displayId}`);
      const icon = formContainer.querySelector(`#${iconId}`);
      
      if (!select || !customOptions || !display || !icon) return;
      
      // Clear previous options
      select.innerHTML = '';
      customOptions.innerHTML = '';
      
      // Add blank option
      select.appendChild(new Option(getText('selectPlaceholder'), ''));
      
      // Add options
      options.forEach(option => {
        select.appendChild(new Option(option.name, option.id));
        
        const optElement = document.createElement('div');
        optElement.className = 'custom-option';
        optElement.dataset.value = option.id;
        
        const checkbox = document.createElement('div');
        checkbox.className = 'option-checkbox';
        checkbox.innerHTML = SVG_CHECK;
        
        const text = document.createElement('span');
        text.textContent = option.name;
        
        optElement.appendChild(checkbox);
        optElement.appendChild(text);
        
        optElement.addEventListener('click', () => {
          const options = customOptions.querySelectorAll('.custom-option');
          options.forEach(o => o.classList.remove('selected'));
          optElement.classList.add('selected');
          
          select.value = option.id;
          display.querySelector('span').textContent = option.name;
          display.classList.remove('placeholder');
          
          // Hide dropdown
          customOptions.classList.remove('show-options');
          icon.classList.remove('rotate');
          
          // Handle specific cases
          if (selectId === 'website-platform' && option.id === 'other') {
            const otherPlatformGroup = formContainer.querySelector('#other-platform-group');
            if (otherPlatformGroup) otherPlatformGroup.style.display = 'block';
          } else if (selectId === 'website-platform') {
            const otherPlatformGroup = formContainer.querySelector('#other-platform-group');
            if (otherPlatformGroup) otherPlatformGroup.style.display = 'none';
          }
          
          if (selectId === 'niche' && option.id === 'other') {
            const otherNicheGroup = formContainer.querySelector('#other-niche-group');
            if (otherNicheGroup) otherNicheGroup.style.display = 'block';
          } else if (selectId === 'niche') {
            const otherNicheGroup = formContainer.querySelector('#other-niche-group');
            if (otherNicheGroup) otherNicheGroup.style.display = 'none';
          }
          
          if (selectId === 'budget' && option.id === 'custom') {
            const customBudgetGroup = formContainer.querySelector('#custom-budget-group');
            if (customBudgetGroup) customBudgetGroup.style.display = 'block';
          } else if (selectId === 'budget') {
            const customBudgetGroup = formContainer.querySelector('#custom-budget-group');
            if (customBudgetGroup) customBudgetGroup.style.display = 'none';
          }
          
          // Save form value
          if (selectId === 'website-platform') formValues.websitePlatform = option.id;
          if (selectId === 'niche') formValues.niche = option.id;
          if (selectId === 'budget') formValues.budget = option.id;
          if (selectId === 'team-size') formValues.teamSize = option.id;
          if (selectId === 'bookingSystemsSelect') formValues.bookingSystems = option.id;
          if (selectId === 'website-traffic') formValues.websiteTraffic = option.id;
          
          if (selectId === 'website-platform') hideError('error-platform');
          if (selectId === 'niche') hideError('error-niche');
          if (selectId === 'budget') hideError('error-budget');
          if (selectId === 'team-size') hideError('error-team-size');
          if (selectId === 'bookingSystemsSelect') hideError('error-booking-systems');
          if (selectId === 'website-traffic') hideError('error-website-traffic');
          
          saveFormData();
        });
        
        customOptions.appendChild(optElement);
      });
      
      // Toggle dropdown
      display.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close all other dropdowns
        formContainer.querySelectorAll('.custom-options').forEach(opt => {
          if (opt !== customOptions) opt.classList.remove('show-options');
        });
        
        formContainer.querySelectorAll('.dropdown-icon').forEach(icn => {
          if (icn !== icon) icn.classList.remove('rotate');
        });
        
        customOptions.classList.toggle('show-options');
        icon.classList.toggle('rotate');
      });
      
      // Set selected option if value exists
      if (select.id === 'website-platform' && formValues.websitePlatform) {
        select.value = formValues.websitePlatform;
        const option = customOptions.querySelector(`.custom-option[data-value="${formValues.websitePlatform}"]`);
        if (option) {
          option.classList.add('selected');
          display.querySelector('span').textContent = option.querySelector('span').textContent;
          display.classList.remove('placeholder');
        }
        
        if (formValues.websitePlatform === 'other') {
          const otherPlatformGroup = formContainer.querySelector('#other-platform-group');
          if (otherPlatformGroup) otherPlatformGroup.style.display = 'block';
        }
      }
      
      if (select.id === 'niche' && formValues.niche) {
        select.value = formValues.niche;
        const option = customOptions.querySelector(`.custom-option[data-value="${formValues.niche}"]`);
        if (option) {
          option.classList.add('selected');
          display.querySelector('span').textContent = option.querySelector('span').textContent;
          display.classList.remove('placeholder');
        }
        
        if (formValues.niche === 'other') {
		  const otherNicheformGroup = formContainer.querySelector('#other-niche-group');
          if (otherNicheformGroup) otherNicheformGroup.style.display = 'block';
        }
      }
      
      if (select.id === 'budget' && formValues.budget) {
        select.value = formValues.budget;
        const option = customOptions.querySelector(`.custom-option[data-value="${formValues.budget}"]`);
        if (option) {
          option.classList.add('selected');
          display.querySelector('span').textContent = option.querySelector('span').textContent;
          display.classList.remove('placeholder');
        }
        
        if (formValues.budget === 'custom') {
		  const customBudgetGroup = formContainer.querySelector('#custom-budget-group');
          if (customBudgetGroup) customBudgetGroup.style.display = 'block';
        }
      }
      
      if (select.id === 'team-size' && formValues.teamSize) {
        select.value = formValues.teamSize;
        const option = customOptions.querySelector(`.custom-option[data-value="${formValues.teamSize}"]`);
        if (option) {
          option.classList.add('selected');
          display.querySelector('span').textContent = option.querySelector('span').textContent;
          display.classList.remove('placeholder');
        }
      }
      
      if (select.id === 'bookingSystemsSelect' && formValues.bookingSystems) {
        // Handle both array and single value formats
        const systemId = Array.isArray(formValues.bookingSystems) ? 
          formValues.bookingSystems[0] : formValues.bookingSystems;
        
        select.value = systemId;
        const option = customOptions.querySelector(`.custom-option[data-value="${systemId}"]`);
        if (option) {
          option.classList.add('selected');
          display.querySelector('span').textContent = option.querySelector('span').textContent;
          display.classList.remove('placeholder');
        }
      }
      
      if (select.id === 'website-traffic' && formValues.websiteTraffic) {
        select.value = formValues.websiteTraffic;
        const option = customOptions.querySelector(`.custom-option[data-value="${formValues.websiteTraffic}"]`);
        if (option) {
          option.classList.add('selected');
          display.querySelector('span').textContent = option.querySelector('span').textContent;
          display.classList.remove('placeholder');
        }
      }
    }
    
    // Multi-select dropdown builder
    function buildMultiSelectDropdown(selectId, customOptionsId, displayId, iconId, options) {
      const select = formContainer.querySelector(`#${selectId}`);
      const customOptions = formContainer.querySelector(`#${customOptionsId}`);
      const display = formContainer.querySelector(`#${displayId}`);
      const icon = formContainer.querySelector(`#${iconId}`);
      
      if (!select || !customOptions || !display || !icon) return;
      
      // Clear previous options
      select.innerHTML = '';
      customOptions.innerHTML = '';
      
      // Add "Select All" option
      const selectAllDiv = document.createElement('div');
      selectAllDiv.className = 'custom-option select-all-option';
      selectAllDiv.dataset.value = 'select_all';
      
      const allCheckbox = document.createElement('div');
      allCheckbox.className = 'option-checkbox';
      allCheckbox.innerHTML = SVG_CHECK;
      
      const allText = document.createElement('span');
      allText.textContent = currentLanguage === 'fr' ? 'Tout sélectionner' : 'Select All';
      
      selectAllDiv.appendChild(allCheckbox);
      selectAllDiv.appendChild(allText);
      
      selectAllDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const allOptions = customOptions.querySelectorAll('.custom-option:not(.select-all-option)');
        const allSelected = Array.from(allOptions).every(opt => opt.classList.contains('selected'));
        
        allOptions.forEach(opt => {
          const optValue = opt.dataset.value;
          const optOption = select.querySelector(`option[value="${optValue}"]`);
          
          if (allSelected) {
            opt.classList.remove('selected');
            if (optOption) optOption.selected = false;
          } else {
            opt.classList.add('selected');
            if (optOption) optOption.selected = true;
          }
        });
        
        if (allSelected) {
          selectAllDiv.classList.remove('selected');
        } else {
          selectAllDiv.classList.add('selected');
        }
        
        updateMultiSelectText(select, display);
        
        // Save form values
        if (selectId === 'formTypesSelect') {
          formValues.formTypes = Array.from(select.options)
            .filter(opt => opt.selected)
            .map(opt => opt.value);
        } else if (selectId === 'socialPlatformsSelect') {
          formValues.socialPlatforms = Array.from(select.options)
            .filter(opt => opt.selected)
            .map(opt => opt.value);
        } else if (selectId === 'crmsSelect') {
          formValues.crms = Array.from(select.options)
            .filter(opt => opt.selected)
            .map(opt => opt.value);
        } else if (selectId === 'databasesSelect') {
          formValues.databases = Array.from(select.options)
            .filter(opt => opt.selected)
            .map(opt => opt.value);
        } else if (selectId === 'languagesSelect') {
          formValues.languages = Array.from(select.options)
            .filter(opt => opt.selected)
            .map(opt => opt.value);
        }
        
        saveFormData();
      });
      
      customOptions.appendChild(selectAllDiv);
      
      // Add regular options
      options.forEach(option => {
        select.appendChild(new Option(option.name, option.id));
        
        const optElement = document.createElement('div');
        optElement.className = 'custom-option';
        optElement.dataset.value = option.id;
        
        const checkbox = document.createElement('div');
        checkbox.className = 'option-checkbox';
        checkbox.innerHTML = SVG_CHECK;
        
        const text = document.createElement('span');
        text.textContent = option.name;
        
        optElement.appendChild(checkbox);
        optElement.appendChild(text);
        
        optElement.addEventListener('click', (e) => {
          e.stopPropagation();
          
          const isSelected = optElement.classList.contains('selected');
          const optValue = optElement.dataset.value;
          const optOption = select.querySelector(`option[value="${optValue}"]`);
          
          if (isSelected) {
            optElement.classList.remove('selected');
            if (optOption) optOption.selected = false;
          } else {
            optElement.classList.add('selected');
            if (optOption) optOption.selected = true;
          }
          
          // Check if all options are selected
          const allOptions = customOptions.querySelectorAll('.custom-option:not(.select-all-option)');
          const allSelected = Array.from(allOptions).every(opt => opt.classList.contains('selected'));
          
          if (allSelected) {
            selectAllDiv.classList.add('selected');
          } else {
            selectAllDiv.classList.remove('selected');
          }
          
          updateMultiSelectText(select, display);
          
          // Save form values
          if (selectId === 'formTypesSelect') {
            formValues.formTypes = Array.from(select.options)
              .filter(opt => opt.selected)
              .map(opt => opt.value);
          } else if (selectId === 'socialPlatformsSelect') {
            formValues.socialPlatforms = Array.from(select.options)
              .filter(opt => opt.selected)
              .map(opt => opt.value);
          } else if (selectId === 'crmsSelect') {
            formValues.crms = Array.from(select.options)
              .filter(opt => opt.selected)
              .map(opt => opt.value);
          } else if (selectId === 'databasesSelect') {
            formValues.databases = Array.from(select.options)
              .filter(opt => opt.selected)
              .map(opt => opt.value);
          } else if (selectId === 'languagesSelect') {
            formValues.languages = Array.from(select.options)
              .filter(opt => opt.selected)
              .map(opt => opt.value);
          }
          
          if (selectId === 'formTypesSelect') hideError('error-form-types');
          if (selectId === 'socialPlatformsSelect') hideError('error-social-platforms');
          if (selectId === 'crmsSelect') hideError('error-crms');
          if (selectId === 'databasesSelect') hideError('error-databases');
          if (selectId === 'languagesSelect') hideError('error-languages');
          
          saveFormData();
        });
        
        customOptions.appendChild(optElement);
      });
      
      // Toggle dropdown
      display.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close all other dropdowns
        formContainer.querySelectorAll('.custom-options').forEach(opt => {
          if (opt !== customOptions) opt.classList.remove('show-options');
        });
        
        formContainer.querySelectorAll('.dropdown-icon').forEach(icn => {
          if (icn !== icon) icn.classList.remove('rotate');
        });
        
        customOptions.classList.toggle('show-options');
        icon.classList.toggle('rotate');
      });
      
      // Set selected options if values exist
      if (select.id === 'formTypesSelect' && formValues.formTypes && formValues.formTypes.length > 0) {
        formValues.formTypes.forEach(value => {
          const option = select.querySelector(`option[value="${value}"]`);
          if (option) option.selected = true;
          
          const customOption = customOptions.querySelector(`.custom-option[data-value="${value}"]`);
          if (customOption) customOption.classList.add('selected');
        });
        
        // Check if all are selected
        const allOptionsSelected = Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all-option)'))
          .every(opt => opt.classList.contains('selected'));
          
        if (allOptionsSelected) {
          selectAllDiv.classList.add('selected');
        }
        
        updateMultiSelectText(select, display);
      }
      
      if (select.id === 'socialPlatformsSelect' && formValues.socialPlatforms && formValues.socialPlatforms.length > 0) {
        formValues.socialPlatforms.forEach(value => {
          const option = select.querySelector(`option[value="${value}"]`);
          if (option) option.selected = true;
          
          const customOption = customOptions.querySelector(`.custom-option[data-value="${value}"]`);
          if (customOption) customOption.classList.add('selected');
        });
        
        // Check if all are selected
        const allOptionsSelected = Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all-option)'))
          .every(opt => opt.classList.contains('selected'));
          
        if (allOptionsSelected) {
          selectAllDiv.classList.add('selected');
        }
        
        updateMultiSelectText(select, display);
      }
      
      if (select.id === 'crmsSelect' && formValues.crms && formValues.crms.length > 0) {
        formValues.crms.forEach(value => {
          const option = select.querySelector(`option[value="${value}"]`);
          if (option) option.selected = true;
          
          const customOption = customOptions.querySelector(`.custom-option[data-value="${value}"]`);
          if (customOption) customOption.classList.add('selected');
        });
        
        // Check if all are selected
        const allOptionsSelected = Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all-option)'))
          .every(opt => opt.classList.contains('selected'));
          
        if (allOptionsSelected) {
          selectAllDiv.classList.add('selected');
        }
        
        updateMultiSelectText(select, display);
      }
      
      if (select.id === 'databasesSelect' && formValues.databases && formValues.databases.length > 0) {
        formValues.databases.forEach(value => {
          const option = select.querySelector(`option[value="${value}"]`);
          if (option) option.selected = true;
          
          const customOption = customOptions.querySelector(`.custom-option[data-value="${value}"]`);
          if (customOption) customOption.classList.add('selected');
        });
        
        // Check if all are selected
        const allOptionsSelected = Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all-option)'))
          .every(opt => opt.classList.contains('selected'));
          
        if (allOptionsSelected) {
          selectAllDiv.classList.add('selected');
        }
        
        updateMultiSelectText(select, display);
      }
      
      if (select.id === 'languagesSelect' && formValues.languages && formValues.languages.length > 0) {
        formValues.languages.forEach(value => {
          const option = select.querySelector(`option[value="${value}"]`);
          if (option) option.selected = true;
          
          const customOption = customOptions.querySelector(`.custom-option[data-value="${value}"]`);
          if (customOption) customOption.classList.add('selected');
        });
        
        // Check if all are selected
        const allOptionsSelected = Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all-option)'))
          .every(opt => opt.classList.contains('selected'));
          
        if (allOptionsSelected) {
          selectAllDiv.classList.add('selected');
        }
        
        updateMultiSelectText(select, display);
      }
    
    }
    
    function updateMultiSelectText(select, display) {
      const selectedOptions = Array.from(select.options).filter(opt => opt.selected);
      
      if (selectedOptions.length === 0) {
        display.querySelector('span').textContent = display.getAttribute('data-placeholder');
        display.classList.add('placeholder');
      } else if (selectedOptions.length === 1) {
        display.querySelector('span').textContent = selectedOptions[0].text;
        display.classList.remove('placeholder');
      } else {
        display.querySelector('span').textContent = `${selectedOptions.length} ${currentLanguage === 'fr' ? 'sélectionnés' : 'selected'}`;
        display.classList.remove('placeholder');
      }
    }
    
    // Global click handler to close dropdowns
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.select-wrapper')) {
        formContainer.querySelectorAll('.custom-options').forEach(opt => {
          opt.classList.remove('show-options');
        });
        
        formContainer.querySelectorAll('.dropdown-icon').forEach(icon => {
          icon.classList.remove('rotate');
        });
      }
    });
    
    /*************************************************************
     * Form Validation Functions
     *************************************************************/
    function validateStep1() {
  let isValid = true;
  
  // Validate first name - FIXED SELECTOR
  const firstName = formContainer.querySelector('#first-name').value.trim();
  if (!firstName) {
    showError('error-firstname', 'firstNameRequired');
    isValid = false;
  } else {
    hideError('error-firstname');
    formValues.firstName = firstName;
  }
  
  // Validate last name - FIXED SELECTOR
  const lastName = formContainer.querySelector('#last-name').value.trim();
  if (!lastName) {
    showError('error-lastname', 'lastNameRequired');
    isValid = false;
  } else {
    hideError('error-lastname');
    formValues.lastName = lastName;
  }
  
  // Validate email - FIXED SELECTOR
  const email = formContainer.querySelector('#email').value.trim();
  if (!email) {
    showError('error-email', 'emailRequired');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('error-email', 'emailInvalid');
    isValid = false;
  } else {
    hideError('error-email');
    formValues.email = email;
  }
  
  // Validate phone - FIXED SELECTOR
  const phone = formContainer.querySelector('#phone').value.trim();
  if (!phone) {
    showError('error-phone', 'phoneRequired');
    isValid = false;
  } else if (!isValidPhoneNumber(phone)) {
    showError('error-phone', 'phoneInvalid');
    isValid = false;
  } else {
    hideError('error-phone');
    formValues.phone = formatPhoneNumber(phone);
  }
  
  // Get company (optional) - FIXED SELECTOR
  const company = formContainer.querySelector('#company').value.trim();
  formValues.company = company;
  
  return isValid;
}
function validateStep2() {
      let isValid = true;
      
      // Validate niche
      const niche = formContainer.querySelector('#niche').value;
      if (!niche) {
        showError('error-niche', 'nicheRequired');
        isValid = false;
      } else {
        hideError('error-niche');
        formValues.niche = niche;
        
        // Validate other niche if selected
        if (niche === 'other') {
          const otherNiche = formContainer.querySelector('#other-niche').value.trim();
          if (!otherNiche) {
            showError('error-other-niche', 'otherNicheRequired');
            isValid = false;
          } else {
            hideError('error-other-niche');
            formValues.otherNiche = otherNiche;
          }
        }
      }
      
      // Validate budget
      const budget = formContainer.querySelector('#budget').value;
      if (!budget) {
        showError('error-budget', 'budgetRequired');
        isValid = false;
      } else {
        hideError('error-budget');
        formValues.budget = budget;
        
        // Validate custom budget if selected
        if (budget === 'custom') {
          const customBudget = formContainer.querySelector('#custom-budget').value.trim();
          if (!customBudget) {
            showError('error-custom-budget', 'customBudgetRequired');
            isValid = false;
          } else {
            hideError('error-custom-budget');
            formValues.customBudget = customBudget;
          }
        }
      }
      
      // Validate description
      const description = formContainer.querySelector('#description').value.trim();
      if (!description) {
        showError('error-description', 'descriptionRequired');
        isValid = false;
      } else {
        hideError('error-description');
        formValues.description = description;
      }
      
      return isValid;
    }
    
    function validateStep3() {
      let isValid = true;
      
      // Validate team size
      const teamSize = formContainer.querySelector('#team-size').value;
      if (!teamSize) {
        showError('error-team-size', 'teamSizeRequired');
        isValid = false;
      } else {
        hideError('error-team-size');
        formValues.teamSize = teamSize;
      }
      
      // Validate services
      const services = formContainer.querySelector('#services').value.trim();
      if (!services) {
        showError('error-services', 'servicesRequired');
        isValid = false;
      } else {
        hideError('error-services');
        formValues.services = services;
      }
      
      return isValid;
    }
    
    function validateStep4() {
      let isValid = true;
      
      // Validate lead capture
      const leadCapture = formContainer.querySelector('input[name="leadCapture"]:checked');
      if (!leadCapture) {
        showError('error-lead-capture', 'leadCaptureRequired');
        isValid = false;
      } else {
        hideError('error-lead-capture');
        formValues.leadCapture = leadCapture.value;
      }
      
      // Validate lead qualification
      const leadQualification = formContainer.querySelector('input[name="leadQualification"]:checked');
      if (!leadQualification) {
        showError('error-lead-qualification', 'leadQualificationRequired');
        isValid = false;
      } else {
        hideError('error-lead-qualification');
        formValues.leadQualification = leadQualification.value;
      }
      
      // Validate conversation summary
      const conversationSummary = formContainer.querySelector('input[name="conversationSummary"]:checked');
      if (!conversationSummary) {
        showError('error-conversation-summary', 'conversationSummaryRequired');
        isValid = false;
      } else {
        hideError('error-conversation-summary');
        formValues.conversationSummary = conversationSummary.value;
      }
      
      return isValid;
    }
    
    function validateStep5() {
  let isValid = true;
  
  if (formValues.useForm === 'yes') {
    if (formValues.formTypes.length === 0) {
      showError('error-form-types', 'formTypesRequired');
      isValid = false;
    }
    
    if (!formValues.formPurpose) {
      showError('error-form-purpose', 'fieldRequired');
      isValid = false;
    }
  }
  
  return isValid;
}
    
    function validateStep6() {
      let isValid = true;
      
      // Validate website
      const hasWebsite = formContainer.querySelector('input[name="hasWebsite"]:checked');
      if (!hasWebsite) {
        showError('error-has-website', 'hasWebsiteRequired');
        isValid = false;
      } else {
        hideError('error-has-website');
        formValues.hasWebsite = hasWebsite.value;
        
        // Validate platform if "yes"
        if (hasWebsite.value === 'yes') {
          const websitePlatform = formContainer.querySelector('#website-platform').value;
          if (!websitePlatform) {
            showError('error-platform', 'platformRequired');
            isValid = false;
          } else {
            hideError('error-platform');
            formValues.websitePlatform = websitePlatform;
            
            // Validate other platform if selected
            if (websitePlatform === 'other') {
              const otherPlatform = formContainer.querySelector('#other-platform').value.trim();
              if (!otherPlatform) {
                showError('error-other-platform', 'otherPlatformRequired');
                isValid = false;
              } else {
                hideError('error-other-platform');
                formValues.otherPlatform = otherPlatform;
              }
            }
          }
          
          // Validate website URL
          const websiteUrl = formContainer.querySelector('#website-url').value.trim();
          if (!websiteUrl) {
            showError('error-website-url', 'websiteUrlRequired');
            isValid = false;
          } else {
            hideError('error-website-url');
            formValues.websiteUrl = websiteUrl;
          }
          
          // Validate website traffic
          const websiteTraffic = formContainer.querySelector('#website-traffic').value;
          if (!websiteTraffic) {
            showError('error-website-traffic', 'websiteTrafficRequired');
            isValid = false;
          } else {
            hideError('error-website-traffic');
            formValues.websiteTraffic = websiteTraffic;
          }
        }
      }
      
      return isValid;
    }
    
    function validateStep7() {
      let isValid = true;
      
      // Validate booking system
      const hasBookingSystem = formContainer.querySelector('input[name="hasBookingSystem"]:checked');
      if (!hasBookingSystem) {
        showError('error-has-booking', 'hasBookingRequired');
        isValid = false;
      } else {
        hideError('error-has-booking');
        formValues.hasBookingSystem = hasBookingSystem.value;
        
        if (hasBookingSystem.value === 'yes') {
          // Validate booking system selection
          const bookingSystem = formContainer.querySelector('#bookingSystemsSelect').value;
          
          if (!bookingSystem) {
            showError('error-booking-systems', 'bookingSystemsRequired');
            isValid = false;
          } else {
            hideError('error-booking-systems');
            formValues.bookingSystems = bookingSystem; // Store as single value, not array
          }
        } else {
          // Validate if they want a recommendation
          const wantRecommendation = formContainer.querySelector('input[name="wantBookingRecommendation"]:checked');
          if (wantRecommendation) {
            formValues.wantBookingRecommendation = wantRecommendation.value;
          }
        }
      }
      
      // Validate CRM usage
      const useCRM = formContainer.querySelector('input[name="useCRM"]:checked');
      if (!useCRM) {
        showError('error-use-crm', 'useCrmRequired');
        isValid = false;
      } else {
        hideError('error-use-crm');
        formValues.useCRM = useCRM.value;
        
        // Validate CRM selection if "yes"
        if (useCRM.value === 'yes') {
          const crmsSelect = formContainer.querySelector('#crmsSelect');
          const selectedCRMs = Array.from(crmsSelect.options).filter(opt => opt.selected);
          
          if (selectedCRMs.length === 0) {
            showError('error-crms', 'crmsRequired');
            isValid = false;
          } else {
            hideError('error-crms');
            formValues.crms = selectedCRMs.map(opt => opt.value);
          }
        }
      }
      
      // Get cancellation handling (optional)
      const handleCancellation = formContainer.querySelector('input[name="handleCancellation"]:checked');
      if (handleCancellation) {
        formValues.handleCancellation = handleCancellation.value;
      }
      
      // Validate database usage
      const useDatabase = formContainer.querySelector('input[name="useDatabase"]:checked');
      if (!useDatabase) {
        showError('error-use-database', 'useDatabaseRequired');
        isValid = false;
      } else {
        hideError('error-use-database');
        formValues.useDatabase = useDatabase.value;
        
        // Validate database selection if "yes"
        if (useDatabase.value === 'yes') {
          const databasesSelect = formContainer.querySelector('#databasesSelect');
          const selectedDatabases = Array.from(databasesSelect.options).filter(opt => opt.selected);
          
          if (selectedDatabases.length === 0) {
            showError('error-databases', 'databasesRequired');
            isValid = false;
          } else {
            hideError('error-databases');
            formValues.databases = selectedDatabases.map(opt => opt.value);
          }
        }
      }
      
      return isValid;
    }
    
    function validateStep8() {
      let isValid = true;
      
      // Validate social bot
      const needSocialBot = formContainer.querySelector('input[name="needSocialBot"]:checked');
      if (!needSocialBot) {
        showError('error-need-social', 'needSocialRequired');
        isValid = false;
      } else {
        hideError('error-need-social');
        formValues.needSocialBot = needSocialBot.value;
        
        // Validate social platforms if "yes"
        if (needSocialBot.value === 'yes') {
          const socialPlatformsSelect = formContainer.querySelector('#socialPlatformsSelect');
          const selectedPlatforms = Array.from(socialPlatformsSelect.options).filter(opt => opt.selected);
          
          if (selectedPlatforms.length === 0) {
            showError('error-social-platforms', 'socialPlatformsRequired');
            isValid = false;
          } else {
            hideError('error-social-platforms');
            formValues.socialPlatforms = selectedPlatforms.map(opt => opt.value);
          }
        }
      }
      
      // Validate language type
      const languageType = formContainer.querySelector('input[name="languageType"]:checked');
      if (!languageType) {
        showError('error-language-type', 'languageTypeRequired');
        isValid = false;
      } else {
        hideError('error-language-type');
        formValues.languageType = languageType.value;
        
        // Different validation logic based on language type
        if (languageType.value === 'multilingual') {
          // For multilingual: validate multiple selections in the multi-select
          const languagesSelect = formContainer.querySelector('#languagesSelect');
          const selectedLanguages = Array.from(languagesSelect.options).filter(opt => opt.selected);
          
          if (selectedLanguages.length === 0) {
            showError('error-languages', 'languagesRequired');
            isValid = false;
          } else {
            hideError('error-languages');
            formValues.languages = selectedLanguages.map(opt => opt.value);
          }
        } else {
          // For unilingual: validate single selection
          const selectedLanguage = formContainer.querySelector('#languagesSelect').value;
          
          if (!selectedLanguage) {
            showError('error-languages', 'languagesRequired');
            isValid = false;
          } else {
            hideError('error-languages');
            formValues.languages = [selectedLanguage]; // Store as array for consistency
          }
        }
      }
      
      return isValid;
    }
    
    function showError(errorId, messageKey) {
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        // If messageKey is provided, update the error message text
        if (messageKey) {
          errorElement.textContent = getText(messageKey);
        }
        errorElement.classList.add('show');
      }
    }
    
    function hideError(errorId) {
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.classList.remove('show');
      }
    }
    
    /*************************************************************
     * Update the summary page
     *************************************************************/
    function updateSummary() {
      const localFormData = createFormData(currentLanguage);
      
      // Contact information
      formContainer.querySelector('#recap-name').textContent = `${formValues.firstName} ${formValues.lastName}`;
      formContainer.querySelector('#recap-email').textContent = formValues.email;
      formContainer.querySelector('#recap-phone').textContent = formValues.phone;
      
      if (formValues.company) {
        formContainer.querySelector('#recap-company').textContent = formValues.company;
        formContainer.querySelector('#recap-company-row').style.display = 'flex';
      } else {
        formContainer.querySelector('#recap-company-row').style.display = 'none';
      }
      
      // Project Details
      let nicheText = '';
      if (formValues.niche === 'other' && formValues.otherNiche) {
        nicheText = formValues.otherNiche;
      } else {
        const niche = localFormData.niches.find(n => n.id === formValues.niche);
        nicheText = niche ? niche.name : formValues.niche;
      }
      formContainer.querySelector('#recap-niche').textContent = nicheText;
      
      let budgetText = '';
      if (formValues.budget === 'custom' && formValues.customBudget) {
        budgetText = formValues.customBudget;
      } else {
        const budget = localFormData.budgetRanges.find(b => b.id === formValues.budget);
        budgetText = budget ? budget.name : formValues.budget;
      }
      formContainer.querySelector('#recap-budget').textContent = budgetText;
      
      formContainer.querySelector('#recap-description').textContent = formValues.description;
      
      // Business Profile
      let teamSizeText = '';
      switch (formValues.teamSize) {
        case 'solo': teamSizeText = getText('solo'); break;
        case 'small': teamSizeText = getText('smallTeam'); break;
        case 'medium': teamSizeText = getText('mediumTeam'); break;
        case 'large': teamSizeText = getText('largeTeam'); break;
      }
      formContainer.querySelector('#recap-team-size').textContent = teamSizeText;
      
      formContainer.querySelector('#recap-services').textContent = formValues.services;
      
      // Features
      let leadsText = '';
      leadsText += `${getText('leadCaptureQuestion')}: ${formValues.leadCapture === 'yes' ? getText('yes') : getText('no')}\n`;
      leadsText += `${getText('leadQualificationQuestion')}: ${formValues.leadQualification === 'yes' ? getText('yes') : getText('no')}\n`;
      leadsText += `${getText('conversationSummaryQuestion')}: ${formValues.conversationSummary === 'yes' ? getText('yes') : getText('no')}`;
      formContainer.querySelector('#recap-leads').innerHTML = leadsText.replace(/\n/g, '<br>');
      
      // Forms
      let formsText = formValues.useForm === 'yes' ? getText('yes') : getText('no');
      if (formValues.useForm === 'yes' && formValues.formTypes.length > 0) {
        const formTypeNames = formValues.formTypes.map(typeId => {
          const option = localFormData.formTypes.find(t => t.id === typeId);
          return option ? option.name : typeId;
        });
        formsText += `: ${formTypeNames.join(', ')}`;
        
        if (formValues.formPurpose) {
          formsText += ` (${formValues.formPurpose})`;
        }
      }
      formContainer.querySelector('#recap-forms').textContent = formsText;
      
      // Website
      formContainer.querySelector('#recap-has-website').textContent = formValues.hasWebsite === 'yes' ? getText('yes') : getText('no');

      if (formValues.hasWebsite === 'yes' && formValues.websitePlatform) {
        formContainer.querySelector('#recap-platform-row').style.display = 'flex';
        
        let platformText = '';
        if (formValues.websitePlatform === 'other' && formValues.otherPlatform) {
          platformText = formValues.otherPlatform;
        } else {
          const platform = localFormData.websitePlatforms.find(p => p.id === formValues.websitePlatform);
          platformText = platform ? platform.name : formValues.websitePlatform;
        }
        formContainer.querySelector('#recap-platform').textContent = platformText;
        
        // Add website URL to summary
        formContainer.querySelector('#recap-website-url-row').style.display = 'flex';
        formContainer.querySelector('#recap-website-url').textContent = formValues.websiteUrl || '(non spécifié)';
        
        // Add this block for website traffic
        formContainer.querySelector('#recap-website-traffic-row').style.display = 'flex';
        const traffic = localFormData.websiteTraffic.find(t => t.id === formValues.websiteTraffic);
        formContainer.querySelector('#recap-website-traffic').textContent = traffic ? traffic.name : '(non spécifié)';
      } else {
        formContainer.querySelector('#recap-platform-row').style.display = 'none';
        formContainer.querySelector('#recap-website-url-row').style.display = 'none';
        formContainer.querySelector('#recap-website-traffic-row').style.display = 'none';
      }
      
      // Integrations
      let crmText = formValues.useCRM === 'yes' ? getText('yes') : getText('no');
      if (formValues.useCRM === 'yes' && formValues.crms.length > 0) {
        const crmNames = formValues.crms.map(crmId => {
          const crm = localFormData.crms.find(c => c.id === crmId);
          return crm ? crm.name : crmId;
        });
        crmText += `: ${crmNames.join(', ')}`;
      }
      formContainer.querySelector('#recap-crm').textContent = crmText;
      
      // Booking System - Updated for the new approach
      let bookingText = '';
      if (formValues.hasBookingSystem === 'yes') {
        bookingText = getText('yes');
        
        if (formValues.bookingSystems) {
          // Handle both array and single value formats
          const systemId = Array.isArray(formValues.bookingSystems) ? 
            formValues.bookingSystems[0] : formValues.bookingSystems;
          
          const system = localFormData.bookingSystems.find(s => s.id === systemId);
          if (system) {
            bookingText += `: ${system.name}`;
          } else {
            bookingText += `: ${systemId}`;
          }
        }
      } else if (formValues.hasBookingSystem === 'no') {
        bookingText = getText('no');
        
        if (formValues.wantBookingRecommendation === 'yes') {
          bookingText += ` (${getText('wantBookingRecommendation')}: ${getText('yes')})`;
        } else if (formValues.wantBookingRecommendation === 'no') {
          bookingText += ` (${getText('wantBookingRecommendation')}: ${getText('no')})`;
        }
      }
      
      if (formValues.handleCancellation) {
        bookingText += ` | ${getText('handleCancellationQuestion')}: ${formValues.handleCancellation === 'yes' ? getText('yes') : getText('no')}`;
      }
      
      formContainer.querySelector('#recap-booking').textContent = bookingText;
      
      let databaseText = formValues.useDatabase === 'yes' ? getText('yes') : getText('no');
      if (formValues.useDatabase === 'yes' && formValues.databases.length > 0) {
        const dbNames = formValues.databases.map(dbId => {
          const db = localFormData.databases.find(d => d.id === dbId);
          return db ? db.name : dbId;
        });
        databaseText += `: ${dbNames.join(', ')}`;
      }
      formContainer.querySelector('#recap-database').textContent = databaseText;
      
      // Communication Channels
      let socialText = formValues.needSocialBot === 'yes' ? getText('yes') : getText('no');
      if (formValues.needSocialBot === 'yes' && formValues.socialPlatforms.length > 0) {
        const platformNames = formValues.socialPlatforms.map(platformId => {
          const platform = localFormData.socialPlatforms.find(p => p.id === platformId);
          return platform ? platform.name : platformId;
        });
        socialText += `: ${platformNames.join(', ')}`;
      }
      formContainer.querySelector('#recap-social').textContent = socialText;
      
      // Language Configuration
      let languageTypeText = '';
      switch (formValues.languageType) {
        case 'multilingual': 
          languageTypeText = getText('multilingual'); 
          break;
        case 'unilingual': 
          languageTypeText = getText('unilingual'); 
          break;
      }
      formContainer.querySelector('#recap-language-type').textContent = languageTypeText;
      
      // Handle languages display in summary
      if (formValues.languages && formValues.languages.length > 0) {
        formContainer.querySelector('#recap-languages-row').style.display = 'flex';
        
        // Get the names of selected languages
        const languageNames = formValues.languages.map(langId => {
          const lang = localFormData.languages.find(l => l.id === langId);
          return lang ? lang.name : langId;
        });
        
        // Update based on language type
        if (formValues.languageType === 'unilingual') {
          // Display single language label and value
          formContainer.querySelector('#recap-languages-label').textContent = getText('selectLanguage');
          formContainer.querySelector('#recap-languages').textContent = languageNames[0] || '';
        } else {
          // Display multiple languages label and comma-separated values
          formContainer.querySelector('#recap-languages-label').textContent = getText('selectLanguages');
          formContainer.querySelector('#recap-languages').textContent = languageNames.join(', ');
        }
      } else {
        // Hide language row if no languages selected
        formContainer.querySelector('#recap-languages-row').style.display = 'none';
      }
    }
    
    /*************************************************************
     * Event Listeners and Form Initialization
     *************************************************************/
    
    // Language type selection
    formContainer.querySelectorAll('input[name="languageType"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const languageSelection = formContainer.querySelector('#language-selection');
        languageSelection.style.display = 'block';
        
        // Reset language values when switching modes
        formValues.languages = [];
        
        // Get references to all the elements we need to modify
        const languageSelectLabel = formContainer.querySelector('#language-select-label');
        const languagesDropdown = formContainer.querySelector('#languagesDropdown');
        const customOptionsContainer = formContainer.querySelector('#customOptionsLanguages');
        const selectElement = formContainer.querySelector('#languagesSelect');
        const displayElement = formContainer.querySelector('#selectDisplayLanguages');
        const iconElement = formContainer.querySelector('#dropdownIconLanguages');
        
        // Clear existing dropdown options and reset select element
        customOptionsContainer.innerHTML = '';
        selectElement.innerHTML = '';
        
        // Remove old event listeners by cloning and replacing elements
        const newDisplayElement = displayElement.cloneNode(true);
        displayElement.parentNode.replaceChild(newDisplayElement, displayElement);
        
        if (this.value === 'multilingual') {
          // Configure for multilingual
          languagesDropdown.className = 'select-container multi-select';
          languageSelectLabel.textContent = getText('selectLanguages');
          
          // Make the select element a multi-select
          selectElement.multiple = true;
          
          // Build the multi-select dropdown
          buildMultiSelectDropdown(
            'languagesSelect',
            'customOptionsLanguages',
            'selectDisplayLanguages',
            'dropdownIconLanguages',
            formData.languages
          );
        } else {
          // Configure for unilingual
          languagesDropdown.className = 'select-container single-select';
          languageSelectLabel.textContent = getText('selectLanguage');
          
          // Make the select element a single-select
          selectElement.multiple = false;
          
          // Create single-select dropdown manually to ensure it works correctly
          const select = formContainer.querySelector('#languagesSelect');
          const customOptions = formContainer.querySelector('#customOptionsLanguages');
          const display = formContainer.querySelector('#selectDisplayLanguages');
          const icon = formContainer.querySelector('#dropdownIconLanguages');
          
          // Add blank option to select
          select.appendChild(new Option(getText('selectPlaceholder'), ''));
          
          // Add options
          formData.languages.forEach(option => {
            select.appendChild(new Option(option.name, option.id));
            
            const optElement = document.createElement('div');
            optElement.className = 'custom-option';
            optElement.dataset.value = option.id;
            
            const checkbox = document.createElement('div');
            checkbox.className = 'option-checkbox';
            checkbox.innerHTML = SVG_CHECK;
            
            const text = document.createElement('span');
            text.textContent = option.name;
            
            optElement.appendChild(checkbox);
            optElement.appendChild(text);
            
            // Add click handler for this option
            optElement.addEventListener('click', (e) => {
              e.stopPropagation();
              
              // Remove selected class from all options
              customOptions.querySelectorAll('.custom-option').forEach(opt => {
                opt.classList.remove('selected');
              });
              
              // Add selected class to this option
              optElement.classList.add('selected');
              
              // Update select element value
              select.value = option.id;
              
              // Update display text
              display.querySelector('span').textContent = option.name;
              display.classList.remove('placeholder');
              
              // Hide dropdown
              customOptions.classList.remove('show-options');
              icon.classList.remove('rotate');
              
              // Store language selection as array with single item for consistency
              formValues.languages = [option.id];
              saveFormData();
            });
            
            customOptions.appendChild(optElement);
          });
          
          // Add click handler for dropdown toggle
          display.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Close all other dropdowns
            document.querySelectorAll('.custom-options').forEach(opt => {
              if (opt !== customOptions) opt.classList.remove('show-options');
            });
            
            document.querySelectorAll('.dropdown-icon').forEach(icn => {
              if (icn !== icon) icn.classList.remove('rotate');
            });
            
            // Toggle dropdown visibility
            customOptions.classList.toggle('show-options');
            icon.classList.toggle('rotate');
          });
        }
        
        // Reset the display text to placeholder
        const updatedDisplay = formContainer.querySelector('#selectDisplayLanguages');
        updatedDisplay.classList.add('placeholder');
        updatedDisplay.querySelector('span').textContent = updatedDisplay.getAttribute('data-placeholder');
        
        // Update form values and save
        formValues.languageType = this.value;
        saveFormData();
      });
    });

    // CRM usage
    formContainer.querySelectorAll('input[name="useCRM"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const crmSelection = formContainer.querySelector('#crm-selection');
        crmSelection.style.display = this.value === 'yes' ? 'block' : 'none';
        formValues.useCRM = this.value;
        saveFormData();
      });
    });
    
    // Has booking system
    formContainer.querySelectorAll('input[name="hasBookingSystem"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const existingBookingOptions = formContainer.querySelector('#existing-booking-options');
        const needBookingOptions = formContainer.querySelector('#need-booking-options');
        
        if (this.value === 'yes') {
          existingBookingOptions.style.display = 'block';
          needBookingOptions.style.display = 'none';
        } else {
          existingBookingOptions.style.display = 'none';
          needBookingOptions.style.display = 'block';
        }
        
        formValues.hasBookingSystem = this.value;
        saveFormData();
      });
    });
    
    // Want booking recommendation
    formContainer.querySelectorAll('input[name="wantBookingRecommendation"]').forEach(radio => {
      radio.addEventListener('change', function() {
        formValues.wantBookingRecommendation = this.value;
        saveFormData();
      });
    });
    
    // Database usage
    formContainer.querySelectorAll('input[name="useDatabase"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const databaseSelection = formContainer.querySelector('#database-selection');
        
        if (this.value === 'yes') {
          databaseSelection.style.display = 'block';
        } else {
          databaseSelection.style.display = 'none';
        }
        
        formValues.useDatabase = this.value;
        saveFormData();
      });
    });
    
    // Form usage
    formContainer.querySelectorAll('input[name="useForm"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const formOptions = formContainer.querySelector('#form-options');
        formOptions.style.display = this.value === 'yes' ? 'block' : 'none';
        formValues.useForm = this.value;
        saveFormData();
      });
    });
    
    // Website
    formContainer.querySelectorAll('input[name="hasWebsite"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const websiteOptions = formContainer.querySelector('#website-options');
        websiteOptions.style.display = this.value === 'yes' ? 'block' : 'none';
        formValues.hasWebsite = this.value;
        saveFormData();
      });
    });
    
    // Social bot
    formContainer.querySelectorAll('input[name="needSocialBot"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const socialPlatformsGroup = formContainer.querySelector('#social-platforms-group');
        socialPlatformsGroup.style.display = this.value === 'yes' ? 'block' : 'none';
        formValues.needSocialBot = this.value;
        saveFormData();
      });
    });
    
    // Text input changes with character counting
    formContainer.querySelector('#services').addEventListener('input', function() {
      formValues.services = this.value;
      formContainer.querySelector('#services-counter').textContent = this.value.length;
      saveFormData();
    });
    
    formContainer.querySelector('#form-purpose').addEventListener('input', function() {
      formValues.formPurpose = this.value;
      formContainer.querySelector('#form-purpose-counter').textContent = this.value.length;
      saveFormData();
    });
    
    formContainer.querySelector('#description').addEventListener('input', function() {
      formValues.description = this.value;
      formContainer.querySelector('#description-counter').textContent = this.value.length;
      saveFormData();
    });
    
    // Contact form fields
    formContainer.querySelector('#first-name').addEventListener('input', function() {
      formValues.firstName = this.value;
      saveFormData();
    });
    
    formContainer.querySelector('#last-name').addEventListener('input', function() {
      formValues.lastName = this.value;
      saveFormData();
    });
    
    formContainer.querySelector('#email').addEventListener('input', function() {
      formValues.email = this.value;
      saveFormData();
    });
    
    formContainer.querySelector('#phone').addEventListener('input', function() {
      formValues.phone = this.value;
      saveFormData();
    });
    
    formContainer.querySelector('#company').addEventListener('input', function() {
      formValues.company = this.value;
      saveFormData();
    });
    
    // Other text fields
    formContainer.querySelector('#other-platform').addEventListener('input', function() {
      formValues.otherPlatform = this.value;
      saveFormData();
    });
    
    formContainer.querySelector('#other-niche').addEventListener('input', function() {
      formValues.otherNiche = this.value;
      saveFormData();
    });
    
    formContainer.querySelector('#custom-budget').addEventListener('input', function() {
      formValues.customBudget = this.value;
      saveFormData();
    });
    
    formContainer.querySelector('#website-url').addEventListener('input', function() {
      formValues.websiteUrl = this.value;
      saveFormData();
    });
    
    /*************************************************************
     * Navigation Setup
     *************************************************************/
    
    // Step 1 navigation
    formContainer.querySelector('#step1-next').addEventListener('click', function() {
      if (validateStep1()) {
        showStep(2);
      }
    });
    
    // Step 2 navigation
    formContainer.querySelector('#step2-prev').addEventListener('click', () => showStep(1));
    formContainer.querySelector('#step2-next').addEventListener('click', function() {
      if (validateStep2()) {
        showStep(3);
      }
    });
    
    // Step 3 navigation
    formContainer.querySelector('#step3-prev').addEventListener('click', () => showStep(2));
    formContainer.querySelector('#step3-next').addEventListener('click', function() {
      if (validateStep3()) {
        showStep(4);
      }
    });
    
    // Step 4 navigation
    formContainer.querySelector('#step4-prev').addEventListener('click', () => showStep(3));
    formContainer.querySelector('#step4-next').addEventListener('click', function() {
      if (validateStep4()) {
        showStep(5);
      }
    });
    
    // Step 5 navigation
    formContainer.querySelector('#step5-prev').addEventListener('click', () => showStep(4));
    formContainer.querySelector('#step5-next').addEventListener('click', function() {
      if (validateStep5()) {
        showStep(6);
      }
    });
    
    // Step 6 navigation
    formContainer.querySelector('#step6-prev').addEventListener('click', () => showStep(5));
    formContainer.querySelector('#step6-next').addEventListener('click', function() {
      if (validateStep6()) {
        showStep(7);
      }
    });
    
    // Step 7 navigation
    formContainer.querySelector('#step7-prev').addEventListener('click', () => showStep(6));
    formContainer.querySelector('#step7-next').addEventListener('click', function() {
      if (validateStep7()) {
        showStep(8);
      }
    });
    
    // Step 8 navigation
    formContainer.querySelector('#step8-prev').addEventListener('click', () => showStep(7));
    formContainer.querySelector('#step8-next').addEventListener('click', function() {
      if (validateStep8()) {
        updateSummary();
        showStep(9);
      }
    });
    
    // Step 9 navigation
    formContainer.querySelector('#step9-prev').addEventListener('click', () => showStep(8));
    
    // Edit buttons in summary
    formContainer.querySelector('#edit-contact').addEventListener('click', () => showStep(1));
    formContainer.querySelector('#edit-project').addEventListener('click', () => showStep(2));
    formContainer.querySelector('#edit-business').addEventListener('click', () => showStep(3));
    formContainer.querySelector('#edit-features').addEventListener('click', () => showStep(4));
    formContainer.querySelector('#edit-forms').addEventListener('click', () => showStep(5));
    formContainer.querySelector('#edit-website').addEventListener('click', () => showStep(6));
    formContainer.querySelector('#edit-integrations').addEventListener('click', () => showStep(7));
    formContainer.querySelector('#edit-channels').addEventListener('click', () => showStep(8));
    
    /*************************************************************
     * Form Submission
     *************************************************************/
    formContainer.querySelector('#submit-button').addEventListener('click', function() {
  // Update button state
  const submitButton = this;
  submitButton.disabled = true;
  submitButton.textContent = getText('processing');
  
  // Mark form as submitted
  isFormSubmitted = true;
  if (formTimeoutId) {
  clearInterval(formTimeoutId);
    }
  // Transform form values into readable data in the current language
  const submissionData = prepareDataForSubmission(formValues);
  
  // Send data to Make webhook
  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submissionData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    console.log('Success:', data);
    
    // After successful webhook, send data to Voiceflow
    
      window.voiceflow.chat.interact({
        type: "success",
        payload: submissionData
      });
    
    // Hide all steps and show confirmation
    formContainer.querySelectorAll('.step-container').forEach(step => {
      step.classList.remove('active');
    });
    formContainer.querySelector('#confirmation-screen').classList.add('active');
    
    // Clear saved form data
    localStorage.removeItem('chatbotFormData');
  })
  .catch((error) => {
    console.error('Error:', error);
    // Show error message to user
    submitButton.textContent = getText('errorSubmission');
    submitButton.disabled = false;
  });
});
    
    // Back to form button
    formContainer.querySelector('#back-to-form').addEventListener('click', function() {
      formContainer.querySelector('#confirmation-screen').classList.remove('active');
      showStep(1);
    });
    
    /*************************************************************
     * Initialize Form
     *************************************************************/
    function initializeDropdowns() {
      // Initialize Team Size dropdown
      buildSingleSelectDropdown(
        'team-size',
        'customOptionsTeamSize',
        'selectDisplayTeamSize',
        'dropdownIconTeamSize',
        [
          { id: 'solo', name: getText('solo') },
          { id: 'small', name: getText('smallTeam') },
          { id: 'medium', name: getText('mediumTeam') },
          { id: 'large', name: getText('largeTeam') }
        ]
      );
      
      // Initialize Website Platform dropdown
      buildSingleSelectDropdown(
        'website-platform',
        'customOptionsWebsitePlatform',
        'selectDisplayWebsitePlatform',
        'dropdownIconWebsitePlatform',
        formData.websitePlatforms
      );
      
      // Initialize Website Traffic dropdown
      buildSingleSelectDropdown(
        'website-traffic',
        'customOptionsWebsiteTraffic',
        'selectDisplayWebsiteTraffic',
        'dropdownIconWebsiteTraffic',
        formData.websiteTraffic
      );
      
      // Initialize Niche dropdown
      buildSingleSelectDropdown(
        'niche',
        'customOptionsNiche',
        'selectDisplayNiche',
        'dropdownIconNiche',
        formData.niches
      );
      
      // Initialize Budget dropdown
      buildSingleSelectDropdown(
        'budget',
        'customOptionsBudget',
        'selectDisplayBudget',
        'dropdownIconBudget',
        formData.budgetRanges.concat([{ id: 'custom', name: currentLanguage === 'fr' ? 'Personnalisé' : 'Custom' }])
      );
      
      // Initialize Form Types multiselect
      buildMultiSelectDropdown(
        'formTypesSelect',
        'customOptionsFormTypes',
        'selectDisplayFormTypes',
        'dropdownIconFormTypes',
        formData.formTypes
      );
      
      // Initialize Social Platforms multiselect
      buildMultiSelectDropdown(
        'socialPlatformsSelect',
        'customOptionsSocialPlatforms',
        'selectDisplaySocialPlatforms',
        'dropdownIconSocialPlatforms',
        formData.socialPlatforms
      );
      
      // Initialize CRMs multiselect
      buildMultiSelectDropdown(
        'crmsSelect',
        'customOptionsCrms',
        'selectDisplayCrms',
        'dropdownIconCrms',
        formData.crms
      );
      
      // Initialize Booking Systems singleselect
      buildSingleSelectDropdown(
        'bookingSystemsSelect',
        'customOptionsBookingSystems',
        'selectDisplayBookingSystems',
        'dropdownIconBookingSystems',
        formData.bookingSystems
      );
      
      // Initialize Databases multiselect
      buildMultiSelectDropdown(
        'databasesSelect',
        'customOptionsDatabases',
        'selectDisplayDatabases',
        'dropdownIconDatabases',
        formData.databases
      );
      
      // Initialize Languages multiselect
      buildMultiSelectDropdown(
        'languagesSelect',
        'customOptionsLanguages',
        'selectDisplayLanguages',
        'dropdownIconLanguages',
        formData.languages
      );
    }
    
    // Initialize the form
    initializeForm();
  }
};








const BookingDirectExtension = {
    name: 'BookingDirect',
    type: 'response',
    match: ({ trace }) => trace.type === 'ext_booking_direct' || trace.payload?.name === 'ext_booking_direct',
    render: async ({ trace, element }) => {
        // Extract payload values with fallbacks
        const {
            apiKey = "cal_live_3e7d9e0eb2df1b25ba452160f8668502",
            language = "en",
            timezone = "America/Toronto",
	    vf
        } = trace.payload || {};

        const isEnglish = language === "en";
        
        // Initialize form variables
        let formTimeoutId = null;
        let isFormSubmitted = false;
        const TIMEOUT_DURATION = 300000; // 5 minutes in milliseconds

        // Create the UI translations
        const UI_TRANSLATIONS = {
            en: {
                bookingTitle: "Schedule Your Appointment",
                step1Title: "Service",
                step2Title: "Info",
                step3Title: "Calendar",
                nextButton: "Next",
                backButton: "Back",
                submitButton: "Submit",
                firstName: "First Name",
                firstNamePlaceholder: "Enter your first name",
                firstNameError: "First name is required",
                lastName: "Last Name",
                lastNamePlaceholder: "Enter your last name",
                lastNameError: "Last name is required",
                email: "Email Address",
                emailPlaceholder: "Enter your email address",
                emailError: "A valid email is required",
                successTitle: "Booking Confirmed!",
                successMessage: "Your appointment has been successfully scheduled. You will receive a confirmation email shortly.",
                selectDateAndTime: "Select Date & Time",
                selectDate: "Select a date to view available times",
                pleaseSelectDate: "Please select a date first",
                availableTimesFor: "Available times for",
                noAvailableSlots: "No available time slots for this date",
                confirmBooking: "Confirm Booking",
                bookingConfirmed: "Booking Confirmed!",
                bookingComplete: "Your appointment has been successfully scheduled",
                timeExpired: "Time Expired",
                errorOccurred: "An error occurred",
                tryAgain: "Please try again",
                confirming: "Confirming...",
                weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                meetingOptions: [
                    {
                        id: 1,
                        eventName: "Discovery Call",
                        title: "15-Minute Discovery Call",
                        description: "A concise introductory consultation during which we will explore your requirements, assess your objectives, and identify how our services can best address your needs.",
                        duration: "15 minutes",
                        eventTypeId: 2355643,
                        eventTypeSlug: "discovery-call-15-minutes",
                        scheduleId: 628047
                    },
                    {
                        id: 2,
                        eventName: "AI Agent Demo",
                        title: "15-Minute AI Agent Demonstration",
                        description: "An in-depth demonstration showcasing the capabilities and practical applications of our AI Agent technology within a 15-minute timeframe.",
                        duration: "15 minutes",
                        eventTypeId: 2355602,
                        eventTypeSlug: "demonstration-chatbot-15min",
                        scheduleId: 628047
                    },
                    {
                        id: 3,
                        eventName: "Detailed Presentation",
                        title: "45-Minute Presentation",
                        description: "A comprehensive 45-minute session reserved for clients who have completed an initial discovery call or met with our team in person, designed to present tailored solutions and strategic recommendations.",
                        duration: "45 minutes",
                        eventTypeId: 2355601,
                        eventTypeSlug: "reunion-45min",
                        scheduleId: 631172
                    },
                    {
                        id: 4,
                        eventName: "Work Session",
                        title: "60-Minute Work Session",
                        description: "A dedicated 60-minute collaborative session for ongoing projects, detailed follow-ups, and strategic brainstorming to advance your initiatives.",
                        duration: "60 minutes",
                        eventTypeId: 2355663,
                        eventTypeSlug: "reunion-projet",
                        scheduleId: 628644
                    }
                ]
            },
            fr: {
                bookingTitle: "Planifiez Votre Rendez-vous",
                step1Title: "Service",
                step2Title: "Infos",
                step3Title: "Calendrier",
                nextButton: "Suivant",
                backButton: "Retour",
                submitButton: "Soumettre",
                firstName: "Prénom",
                firstNamePlaceholder: "Entrez votre prénom",
                firstNameError: "Le prénom est obligatoire",
                lastName: "Nom de famille",
                lastNamePlaceholder: "Entrez votre nom de famille",
                lastNameError: "Le nom de famille est obligatoire",
                email: "Adresse Email",
                emailPlaceholder: "Entrez votre adresse email",
                emailError: "Une adresse email valide est obligatoire",
                successTitle: "Rendez-vous Confirmé!",
                successMessage: "Votre rendez-vous a été programmé avec succès. Vous recevrez sous peu un email de confirmation.",
                selectDateAndTime: "Sélectionner Date et Heure",
                selectDate: "Sélectionnez une date pour voir les horaires disponibles",
                pleaseSelectDate: "Veuillez d'abord sélectionner une date",
                availableTimesFor: "Horaires disponibles pour",
                noAvailableSlots: "Aucun horaire disponible pour cette date",
                confirmBooking: "Confirmer la Réservation",
                bookingConfirmed: "Réservation Confirmée !",
                bookingComplete: "Votre rendez-vous a été programmé avec succès",
                timeExpired: "Temps expiré",
                errorOccurred: "Une erreur s'est produite",
                tryAgain: "Veuillez réessayer",
                confirming: "Confirmation en cours...",
                weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                meetingOptions: [
                    {
                        id: 1,
                        eventName: "Entretien Exploratoire",
                        title: "Entretien exploratoire de 15 minutes",
                        description: "Entretien de 15 minutes visant à analyser vos besoins, définir vos objectifs et déterminer comment nos services peuvent y répondre efficacement.",
                        duration: "15 minutes",
                        eventTypeId: 2355643,
                        eventTypeSlug: "discovery-call-15-minutes",
                        scheduleId: 628047
                    },
                    {
                        id: 2,
                        eventName: "Démonstration de l'Agent IA",
                        title: "Démonstration de l'Agent IA de 15 minutes",
                        description: "Démonstration détaillée illustrant les capacités et les applications pratiques de notre technologie d'Agent IA en 15 minutes.",
                        duration: "15 minutes",
                        eventTypeId: 2355602,
                        eventTypeSlug: "demonstration-chatbot-15min",
                        scheduleId: 628047
                    },
                    {
                        id: 3,
                        eventName: "Présentation Détaillée",
                        title: "Présentation de 45 minutes",
                        description: "Session de 45 minutes réservée aux clients ayant déjà effectué un entretien exploratoire ou rencontré notre équipe en personne, destinée à présenter des solutions personnalisées et des recommandations stratégiques.",
                        duration: "45 minutes",
                        eventTypeId: 2355601,
                        eventTypeSlug: "reunion-45min",
                        scheduleId: 631172
                    },
                    {
                        id: 4,
                        eventName: "Session de Travail",
                        title: "Session de travail de 60 minutes",
                        description: "Session collaborative de 60 minutes dédiée aux projets en cours, aux suivis approfondis et aux séances de réflexion stratégique.",
                        duration: "60 minutes",
                        eventTypeId: 2355663,
                        eventTypeSlug: "reunion-projet",
                        scheduleId: 628644
                    }
                ]
            }
        };

        // Use the correct language for UI text
        const texts = UI_TRANSLATIONS[language];
        let currentStep = 1;
        let selectedService = null;
        let userData = {
            firstName: "",
            lastName: "",
            email: "",
            fullName: ""
        };

        // Create the container
        const container = document.createElement("form");
        container.setAttribute("novalidate", "true");
        container.className = "booking-container";
        container.innerHTML = `
  <style>
/* ========= Base Styles ========= */
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  color: #333;
}

.hidden {
  display: none !important;
}

/* ========= Container Layout ========= */
form.booking-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 800px;
  min-width: 800px;
  margin: 0 auto;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}

/* ========= Progress Indicator ========= */
.progress-container {
  padding: 0;
}

.step-progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 0;
  padding: 0 10px;    
}

.step-progress::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 3px;
  background: #e0e0e0;
  z-index: 1;
  transform: translateY(-50%);
}

.progress-bar {
  position: absolute;
  top: 50%;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #9C27B0, #7B1FA2);
  z-index: 2;
  transform: translateY(-50%);
  transition: width 0.4s ease;
  box-shadow: 0 2px 4px rgba(156, 39, 176, 0.3);
}

.step-item {
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  text-align: center;
  width: 25%;
}

.step-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e0e0e0;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid #f5f5f5;
  font-weight: bold;
  font-size: 14px;
  color: #757575;
}

.step-title {
  font-size: 13px;
  color: #757575;
  position: absolute;
  width: 100%;
  text-align: center;
  top: 35px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: none;
}

.step-item.active .step-icon {
  background: #9C27B0;
  color: white;
  border-color: #9C27B0;
  box-shadow: 0 4px 8px rgba(156, 39, 176, 0.2);
}

.step-item.active .step-title {
  color: #9C27B0;
  font-weight: 600;
}

.step-item.completed .step-icon {
  background: #9C27B0;
  color: white;
  border-color: #9C27B0;
}

.step-item.completed .step-title {
  color: #9C27B0;
}

/* ========= Step Container Styles ========= */
.step-container {
  display: none;
  animation: fadeIn 0.5s;
}

.step-container.active {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.step-heading {
  font-size: 24px;
  color: #9C27B0;
  font-weight: 600;
  position: relative;
  margin-top: 0;
  margin-bottom: 0;
}

.step-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #9C27B0, #E1BEE7);
  border-radius: 3px;
}

.step-content {
  padding: 0px 0;
}

/* ========= Form Layout ========= */
.flex-row {
  display: flex;
  gap: 10px 16px;
  flex-wrap: wrap;
  width: 100%;
}

.flex-row > div {
  flex: 1;
  min-width: 300px;
}

.bold-label {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 8px;
  display: block;
}

/* ========= Input Fields ========= */
input[type="text"],
input[type="email"],
input[type="tel"] {
  width: 100%;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 6px;
  padding: 8px;
  background: #fafafa;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  height: 50px;
  transition: all 0.2s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus {
  border-color: #9C27B0;
  box-shadow: 0 0 0 3px rgba(156,39,176,0.1);
  outline: none;
  background-color: #fff;
}

/* ========= Error Components ========= */
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

/* ========= Service Options ========= */
.service-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
  animation: fadeIn 0.5s;
}

@media (min-width: 768px) {
  .service-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 20px;
  }
}

.service-option {
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
}

@media (min-width: 768px) {
  .service-option {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }
}

.service-option:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border-color: #F8EAFA;
}

.service-option.selected {
  border: 2px solid #9C27B0;
  box-shadow: 0 5px 15px rgba(156, 39, 176, 0.15);
}

.checkmark-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #9C27B0;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  display: none;
}

.service-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #9C27B0;
}

.service-description {
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
  flex-grow: 1;
  text-align: justify;
}

.service-duration {
  display: inline-block;
  background-color: #F8EAFA;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  color: #9C27B0;
  font-weight: 500;
  align-self: flex-start;
}

/* ========= Navigation Buttons ========= */
.booking-footer {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
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
  background: #f0e5f4;
  color: #9C27B0;
}

.btn-prev:hover {
  background: #e0c5e4;
}

.btn-next, .btn-submit {
  background: #9C27B0;
  color: white;
  box-shadow: 0 2px 8px rgba(156,39,176,0.3);
}

.btn-next:hover, .btn-submit:hover {
  background: #7B1FA2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(156,39,176,0.3);
}

.btn:disabled {
  background: #e0e0e0;
  color: #9e9e9e;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.7;
}

/* ========= Success Message ========= */
.success-section {
  display: none;
  padding: 30px 20px;
  text-align: center;
  animation: fadeIn 0.5s ease-out forwards;
}

.success-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background-color: #e8f5e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2e7d32;
}

.success-title {
  color: #2e7d32;
  margin-bottom: 10px;
  font-size: 18px;
}

.success-message {
  color: #388e3c;
  font-size: 14px;
  line-height: 1.5;
}

/* ========= Calendar Styles ========= */
.calendar-section {
  display: none;
}

@keyframes fadeInCalendar {
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
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  color: #333;
  animation: fadeInCalendar 0.3s ease-out forwards;
  border: 1px solid #eaeaea;
  transition: all 0.3s ease;
  position: relative;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
  background-color: #9C27B029;
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

.provider-icon svg, .service-icon svg, .appointment-icon svg {
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: #9C27B0;
}

.nav-btn:hover {
  background-color: #F8EAFA;
  box-shadow: 0 3px 10px #9C27B026;
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
  background: linear-gradient(to bottom, #ffffff, #fefeff);
}

.days-container {
  width: 47%;
  position: relative;
  background-size: 25px 25px;
  background-position: -1px -1px;
  max-height: 350px;
}

.calendar-container::before {
  content: "";
  position: absolute;
  top: -3px;
  left: 10%;
  right: 10%;
  height: 3px;
  border-radius: 3px;
  opacity: 0.7;
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
  box-shadow: 0 0 0 1px #9C27B01a;
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
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 4px 12px #9C27B026;
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
  padding: 10px 0px;
  overflow-y: auto;
  background-color: #fefeff;
  position: relative;
  max-height: 350px;
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
  background: #9C27B00d;
  border-radius: 10px;
}

.times-container::-webkit-scrollbar-thumb {
  background: #9C27B033;
  border-radius: 10px;
}

.times-container::-webkit-scrollbar-thumb:hover {
  background: #9C27B033;
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
  padding: 14px 8px;
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
  width: 60%;
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
  box-shadow: 0 4px 15px #9C27B026;
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

.confirm-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  text-align: center;
  font-weight: 500;
  background: #9C27B0;
  color: white;
  box-shadow: 0 2px 8px rgba(156,39,176,0.3);
}

.confirm-btn:hover:not(:disabled) {
  background: #7B1FA2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(156,39,176,0.3);
}

.confirm-btn:disabled {
  background: #e0e0e0;
  color: #9e9e9e;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.7;
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

.form-disabled input, 
.form-disabled button, 
.form-disabled select, 
.form-disabled textarea, 
.form-disabled .service-option {
  pointer-events: none;
  opacity: 0.7;
  cursor: not-allowed !important;
}

/* ========= Responsive Styles ========= */
@media screen and (max-width: 768px) {
  form.booking-container {
    padding: 12px;
    min-width: 100%;
  }
  
  .flex-row {
    flex-direction: column;
    gap: 10px;
  }
  
  .flex-row > div {
    flex: 100%;
    min-width: 100%;
    width: 100%;
  }
  
  .bold-label {
    font-size: 14px;
    margin-bottom: 6px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="tel"] {
    height: 45px;
    font-size: 13px;
  }
  
  .step-title {
    font-size: 11px;
    display: none;
  }
  
  .step-icon {
    width: 26px;
    height: 26px;
    font-size: 12px;
  }
  
  .step-heading {
    font-size: 20px;
  }
  
  .btn {
    padding: 10px 15px;
    font-size: 14px;
    min-width: 100px;
    width: 100%;
  }
  
  /* Calendar responsive */
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
    max-height: 200px;
  }
  
  .day {
    height: 40px;
    width: 40px;
    font-size: 13px;
  }
  
  .time-slot {
    padding: 12px 8px;
    min-width: 70px;
    margin: 0 auto;
    width: 60%;
  }
}

@media screen and (max-width: 480px) {
  form.booking-container {
    padding: 10px;
  }
  
  .flex-row > div {
    margin-bottom: 10px;
  }
  
  .bold-label {
    font-size: 13px;
    margin-bottom: 4px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="tel"] {
    height: 42px;
    font-size: 12px;
    padding: 6px;
  }
  
  .step-icon {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
  
  .step-heading {
    font-size: 18px;
  }
  
  .btn {
    padding: 8px 12px;
    font-size: 13px;
    min-width: 80px;
  }
  
  .calendar-header {
    padding: 12px 15px;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .calendar-nav {
    width: 100%;
    justify-content: center;
  }
  
  .day {
    height: 35px;
    width: 35px;
    font-size: 12px;
  }
  
  .time-slot {
    padding: 10px 4px;
    font-size: 13px;
  }
}
</style>
  
  <div class="progress-container">
    <div class="step-progress">
      <div class="progress-bar" id="progress-bar"></div>
      <div class="step-item active" data-step="1">
        <div class="step-icon">1</div>
        <div class="step-title">${isEnglish ? 'Service' : 'Service'}</div>
      </div>
      <div class="step-item" data-step="2">
        <div class="step-icon">2</div>
        <div class="step-title">${isEnglish ? 'Info' : 'Infos'}</div>
      </div>
      <div class="step-item" data-step="3">
        <div class="step-icon">3</div>
        <div class="step-title">${isEnglish ? 'Calendar' : 'Calendrier'}</div>
      </div>
    </div>
  </div>
  
  <div class="step-content">
    <!-- Step 1: Service selection -->
    <div id="step1-content" class="step-container active">
      <h2 class="step-heading">${texts.step1Title}</h2>
      <div class="service-options">
        ${texts.meetingOptions.map((option, index) => `
          <div class="service-option" data-id="${option.id}">
            <div class="checkmark-icon">${SVG_CHECK}</div>
            <h4 class="service-title">${option.title}</h4>
            <p class="service-description">${option.description}</p>
            <span class="service-duration">${option.duration}</span>
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- Step 2: User information form -->
    <div id="step2-content" class="step-container">
      <h2 class="step-heading">${texts.step2Title}</h2>
      <div class="flex-row">
        <div>
          <label for="first-name" class="bold-label">${texts.firstName}</label>
          <input type="text" id="first-name" name="first-name" placeholder="${texts.firstNamePlaceholder}" required />
          <div class="error-container">
            <div class="error-message" id="errorFirstName">
              <div class="error-icon">!</div>
              <span>${texts.firstNameError}</span>
            </div>
          </div>
        </div>
        
        <div>
          <label for="last-name" class="bold-label">${texts.lastName}</label>
          <input type="text" id="last-name" name="last-name" placeholder="${texts.lastNamePlaceholder}" required />
          <div class="error-container">
            <div class="error-message" id="errorLastName">
              <div class="error-icon">!</div>
              <span>${texts.lastNameError}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex-row">
        <div>
          <label for="email" class="bold-label">${texts.email}</label>
          <input type="email" id="email" name="email" placeholder="${texts.emailPlaceholder}" required />
          <div class="error-container">
            <div class="error-message" id="errorEmail">
              <div class="error-icon">!</div>
              <span>${texts.emailError}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Step 3: Calendar -->
    <div id="step3-content" class="step-container">
      <h2 class="step-heading">${texts.step3Title}</h2>
      <div id="calendar-component"></div>
    </div>
    
    <!-- Success message -->
    <div id="success-content" class="success-section">
      <div class="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h3 class="success-title">${texts.successTitle}</h3>
      <p class="success-message">${texts.successMessage}</p>
    </div>
  </div>
  
  <div class="booking-footer form-buttons">
    <button id="back-button" class="btn btn-prev" style="visibility: hidden;">${texts.backButton}</button>
    <button id="next-button" class="btn btn-next" disabled>${texts.nextButton}</button>
  </div>
`;

element.appendChild(container);

// Get DOM elements
const backButton = container.querySelector("#back-button");
const nextButton = container.querySelector("#next-button");
const step1Content = container.querySelector("#step1-content");
const step2Content = container.querySelector("#step2-content");
const step3Content = container.querySelector("#step3-content");
const successContent = container.querySelector("#success-content");
const calendarComponent = container.querySelector("#calendar-component");
const serviceOptions = container.querySelectorAll(".service-option");
const firstNameInput = container.querySelector("#first-name");
const lastNameInput = container.querySelector("#last-name");
const emailInput = container.querySelector("#email");

/*************************************************************
 * Timer Functionality
 *************************************************************/
function startFormTimer() {
  let timeLeft = TIMEOUT_DURATION;
  
  // Set the timeout - no display updates needed
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
  
  // Update UI to show timeout
  const submitButton = container.querySelector("#next-button");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = isEnglish ? "Time Expired" : "Temps expiré";
    submitButton.style.backgroundColor = "#f44336";
    submitButton.style.color = "white";
  }
  
  // Notify Voiceflow if available
  if (vf) {
    window.voiceflow.chat.interact({
      type: "timeEnd",
      payload: {
        message: "Time expired"
      }
    });
  }
}

function disableAllFormElements() {
  // Add disabled class to form
  container.classList.add("form-disabled");
  
  // Disable all interactive elements
  container.querySelectorAll('button, input, select, textarea, .service-option').forEach(el => {
    if (el.tagName === 'BUTTON') {
      el.disabled = true;
    } else {
      el.setAttribute('disabled', 'disabled');
    }
    el.style.cursor = "not-allowed";
  });
  
  // Disable service option clicking
  serviceOptions.forEach(opt => {
    opt.style.pointerEvents = "none";
    opt.style.opacity = "0.7";
  });
  
  // Disable any active calendars
  const calendarContainer = container.querySelector(".calendar-container");
  if (calendarContainer) {
    calendarContainer.classList.add("confirmed");
    calendarContainer.querySelectorAll('.nav-btn, .day, .time-slot').forEach(el => {
      el.style.pointerEvents = "none";
      el.style.cursor = "not-allowed";
    });
  }
}

// Function to navigate between steps
function goToStep(step) {
  // Update bullet classes
  const items = container.querySelectorAll(".step-item");
  items.forEach((item, i) => {
    item.classList.remove("active", "completed");
    if (i + 1 < step) {
      item.classList.add("completed");
    } else if (i + 1 === step) {
      item.classList.add("active");
    }
  });

  // Show/hide content panels
  container.querySelectorAll(".step-container").forEach((stepContainer, i) => {
    if (i + 1 === step) {
      stepContainer.classList.add("active");
    } else {
      stepContainer.classList.remove("active");
    }
  });
  
  // Hide success content
  successContent.style.display = "none";

  // Footer button logic
  backButton.style.visibility = step > 1 ? "visible" : "hidden";
  
  // Default next button state
  nextButton.disabled = true;
  
  // Set next button state based on current step
  if (step === 1 && selectedService) {
    nextButton.disabled = false;
  } else if (step === 2) {
    checkFormValidity();
  }

  // Resize the purple fill-bar
  const pct = ((step - 1) / (items.length - 1)) * 100;
  container.querySelector(".progress-bar").style.width = pct + "%";

  // Remember current step
  currentStep = step;
  
  // Scroll to top of form if needed
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Validation functions
function validateStep1() {
  return selectedService !== null;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateStep2() {
  let isValid = true;
  
  // Validate first name
  if (!firstNameInput.value.trim()) {
    document.getElementById("errorFirstName").style.display = "flex";
    isValid = false;
  } else {
    document.getElementById("errorFirstName").style.display = "none";
  }
  
  // Validate last name
  if (!lastNameInput.value.trim()) {
    document.getElementById("errorLastName").style.display = "flex";
    isValid = false;
  } else {
    document.getElementById("errorLastName").style.display = "none";
  }
  
  // Validate email
  if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
    document.getElementById("errorEmail").style.display = "flex";
    isValid = false;
  } else {
    document.getElementById("errorEmail").style.display = "none";
  }
  
  return isValid;
}

function updateFormData() {
  userData.firstName = firstNameInput.value.trim();
  userData.lastName = lastNameInput.value.trim();
  userData.email = emailInput.value.trim();
  userData.fullName = `${userData.firstName} ${userData.lastName}`;
}

// Add event listeners to service options
serviceOptions.forEach(option => {
  option.addEventListener("click", function() {
    // Deselect all options
    serviceOptions.forEach(opt => {
      opt.classList.remove("selected");
      opt.querySelector(".checkmark-icon").style.display = "none";
    });
    
    // Select clicked option
    this.classList.add("selected");
    this.querySelector(".checkmark-icon").style.display = "flex";
    
    // Store selected service
    const serviceId = parseInt(this.dataset.id);
    selectedService = texts.meetingOptions.find(option => option.id === serviceId);
    
    // Enable next button
    nextButton.disabled = false;
  });
});

// Setup input field listeners
function setupInputListeners() {
  firstNameInput.addEventListener("input", function() {
    if (this.value.trim()) {
      document.getElementById("errorFirstName").style.display = "none";
    }
    checkFormValidity();
  });

  lastNameInput.addEventListener("input", function() {
    if (this.value.trim()) {
      document.getElementById("errorLastName").style.display = "none";
    }
    checkFormValidity();
  });

  emailInput.addEventListener("input", function() {
    if (this.value.trim() && isValidEmail(this.value.trim())) {
      document.getElementById("errorEmail").style.display = "none";
    }
    checkFormValidity();
  });
}

// Call the setup function
setupInputListeners();

// Check form validity
function checkFormValidity() {
  if (currentStep === 2) {
    if (firstNameInput.value.trim() && 
        lastNameInput.value.trim() && 
        emailInput.value.trim() && 
        isValidEmail(emailInput.value.trim())) {
      nextButton.disabled = false;
    } else {
      nextButton.disabled = true;
    }
  }
}

// Back button event listener
backButton.addEventListener("click", function() {
  if (currentStep > 1) {
    goToStep(currentStep - 1);
  }
});

// Next button event listener
nextButton.addEventListener("click", function() {
  // For step 1, check if a service is selected
  if (currentStep === 1) {
    if (validateStep1()) {
      goToStep(2);
      // Initially disable next button until form is valid
      nextButton.disabled = true;
      checkFormValidity(); // Check if form already has valid input
    }
  } else if (currentStep === 2) {
    if (validateStep2()) {
      updateFormData();
      goToStep(3);
      
      // Show calendar component
      renderCalendar();
    }
  }
});

// Function to show the success screen
function showSuccessScreen() {
  // Hide all content sections
  step1Content.style.display = "none";
  step2Content.style.display = "none";
  step3Content.style.display = "none";
  successContent.style.display = "block";
  
  // Hide footer buttons
  backButton.style.display = "none";
  nextButton.style.display = "none";
  
  // Mark form as submitted so timeout doesn't trigger
  isFormSubmitted = true;
  if (formTimeoutId) {
    clearInterval(formTimeoutId);
  }
}

// Calendar component implementation
const calendarBooking = {
  state: {
    currentDate: new Date(),
    selectedDate: null,
    selectedTime: null,
    availableSlots: {},
    workingDays: [1, 2, 3, 4, 5], // Default Mon-Fri
    isConfirmed: false
  },
  
  // Calendar utility functions
  formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  },
  
  isSameDay(date1, date2) {
    if (!date1 || !date2) return false;
    return this.formatDate(date1) === this.formatDate(date2);
  },
  
  isToday(date) {
    const now = new Date();
    return this.isSameDay(date, now);
  },
  
  getDefaultActiveDay() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (this.state.workingDays.includes(today.getDay())) return today;
    
    // Find the next working day
    const next = new Date(today);
    let daysChecked = 0;
    while (!this.state.workingDays.includes(next.getDay()) && daysChecked < 14) {
      next.setDate(next.getDate() + 1);
      daysChecked++;
    }
    return next;
  },
  
  // API call functions
  async fetchWorkingDays(scheduleId) {
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
      return [1, 2, 3, 4, 5]; // Default to Mon-Fri on error
    }
  },
  
  async fetchAvailableSlots(selectedDateISO, eventTypeId, eventTypeSlug) {
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
  },
  
  async createBooking(startTimeISO, fullName, email, eventTypeId) {
    try {
      // Validate the slot is still available
      const bookingDate = new Date(startTimeISO);
      const dateStr = this.formatDate(bookingDate);
      const currentAvailableSlots = await this.fetchAvailableSlots(
        dateStr, 
        eventTypeId, 
        selectedService.eventTypeSlug
      );
      
      if (!currentAvailableSlots.includes(startTimeISO)) {
        throw new Error(language === "fr" ? 
          "Ce créneau n'est plus disponible. Veuillez en sélectionner un autre." : 
          "This slot is no longer available. Please select another time."
        );
      }
      
      // Create the booking
      const url = `https://api.cal.com/v2/bookings`;
      const body = {
        start: startTimeISO,
        attendee: { 
          name: fullName, 
          email: email, 
          timeZone: timezone 
        },
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
      this.showErrorMessage(err.message || (language === "fr" ? 
        "Impossible de terminer la réservation. Veuillez réessayer." : 
        "Unable to complete booking. Please try again."
      ));
      
      return null;
    }
  },
  
  showErrorMessage(message) {
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
      <button style="margin-top: 15px; background: #9C27B0; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">${language === "fr" ? "OK" : "OK"}</button>
    `;
    
    const calendarContainer = document.querySelector(".calendar-container");
    calendarContainer.appendChild(errorOverlay);
    
    const closeButton = errorMessage.querySelector("button");
    closeButton.addEventListener("click", () => {
      calendarContainer.removeChild(errorOverlay);
      if (this.state.selectedDate) {
        const dateKey = this.formatDate(this.state.selectedDate);
        this.fetchAvailableSlots(
          dateKey, 
          selectedService.eventTypeId, 
          selectedService.eventTypeSlug
        ).then(slots => {
          this.state.availableSlots[dateKey] = slots;
          this.renderCalendar();
        });
      }
    });
    
    errorOverlay.appendChild(errorMessage);
  },
  
  // Calendar component rendering
  renderHeader() {
    const header = document.createElement("div");
    header.className = "calendar-header";
    const dateFormatter = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { month: "long", year: "numeric" });
    
    // Create calendar title with provider and service info
    const calendarTitle = document.createElement("div");
    calendarTitle.className = "calendar-title";
    
    // Calendar icon
    const calendarIcon = document.createElement("span");
    calendarIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px"><path fill="#9C27B0" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48H0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/></svg>
    `;
    
    // Provider and service information section
    const titleContent = document.createElement("div");
    titleContent.className = "calendar-title-content";
    
    const providerDiv = document.createElement("div");
    providerDiv.className = "service-provider";
    providerDiv.innerHTML = `
      <span class="provider-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18px" height="18px">
          <path fill="#9C27B0" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 256l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16L80 384c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
        </svg>
      </span>
      <span>${selectedService.eventName || 'Appointment'}</span>
    `;
    
    titleContent.appendChild(providerDiv);
    calendarTitle.appendChild(titleContent);
    
    // Calendar navigation section with chevron SVGs
    const calendarNav = document.createElement("div");
    calendarNav.className = "calendar-nav";
    
    const currentDateEl = document.createElement("div");
    currentDateEl.className = "current-date";
    currentDateEl.textContent = dateFormatter.format(this.state.currentDate);
    
    const prevBtn = document.createElement("button");
    prevBtn.className = "nav-btn prev-btn";
    prevBtn.title = language === "fr" ? "Mois précédent" : "Previous month";
    prevBtn.innerHTML = `<div style="transform: rotate(90deg) translateY(2px);">${SVG_CHEVRON}</div>`;
    prevBtn.addEventListener("click", () => {
      if (!this.state.isConfirmed) {
        this.state.currentDate = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() - 1, 1);
        this.renderCalendar();
      }
    });
    
    const nextBtn = document.createElement("button");
    nextBtn.className = "nav-btn next-btn";
    nextBtn.title = language === "fr" ? "Mois suivant" : "Next month";
    nextBtn.innerHTML = `<div style="transform: rotate(-90deg) translateY(2px);">${SVG_CHEVRON}</div>`;
    nextBtn.addEventListener("click", () => {
      if (!this.state.isConfirmed) {
        this.state.currentDate = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 1);
        this.renderCalendar();
      }
    });
    
    calendarNav.appendChild(prevBtn);
    calendarNav.appendChild(currentDateEl);
    calendarNav.appendChild(nextBtn);
    
    header.appendChild(calendarTitle);
    header.appendChild(calendarNav);
    
    return header;
  },
  
  async renderCalendarDays() {
    const daysContainer = document.createElement("div");
    daysContainer.className = "days-container";
    const weekdaysDiv = document.createElement("div");
    weekdaysDiv.className = "weekdays";
    const weekdays = texts.weekdays;
    weekdays.forEach(day => {
      const dayEl = document.createElement("div");
      dayEl.textContent = day;
      weekdaysDiv.appendChild(dayEl);
    });
    daysContainer.appendChild(weekdaysDiv);
    const daysDiv = document.createElement("div");
    daysDiv.className = "days";
    let daysToShow = [];
    const firstDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), 1);
    const daysFromPrevMonth = firstDay.getDay();
    const lastDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 0);
    const totalDays = lastDay.getDate();
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const day = new Date(firstDay);
      day.setDate(day.getDate() - i - 1);
      daysToShow.push({ date: day, inactive: true });
    }
    for (let i = 1; i <= totalDays; i++) {
      const day = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), i);
      daysToShow.push({ date: day, inactive: false });
    }
    const remainingDays = 42 - daysToShow.length;
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(lastDay);
      day.setDate(day.getDate() + i);
      daysToShow.push({ date: day, inactive: true });
    }
    const highlightDay = this.state.selectedDate || this.getDefaultActiveDay();
    
    const self = this; // For use in event handlers
    
    daysToShow.forEach(({ date, inactive }) => {
      const dayEl = document.createElement("div");
      dayEl.className = "day";
      dayEl.textContent = date.getDate();
      if (inactive) {
        dayEl.classList.add("inactive");
      } else {
        const dayOfWeek = date.getDay();
        if (!this.state.workingDays.includes(dayOfWeek)) {
          dayEl.classList.add("inactive");
        } else {
          const todayMidnight = new Date();
          todayMidnight.setHours(0, 0, 0, 0);
          if (date < todayMidnight) {
            dayEl.classList.add("inactive");
          } else {
            if (this.formatDate(date) === this.formatDate(highlightDay)) {
              dayEl.classList.add("today");
            }
            if (this.state.selectedDate && this.isSameDay(date, this.state.selectedDate)) {
              dayEl.classList.add("active");
            }
            dayEl.classList.add("available");
            dayEl.addEventListener("click", async function() {
              self.state.selectedDate = new Date(date);
              self.state.selectedTime = null;
              const dateKey = self.formatDate(date);
              const slots = await self.fetchAvailableSlots(
                dateKey, 
                selectedService.eventTypeId, 
                selectedService.eventTypeSlug
              );
              self.state.availableSlots[dateKey] = slots;
              self.renderCalendar();
            });
          }
        }
      }
      daysDiv.appendChild(dayEl);
    });
    daysContainer.appendChild(daysDiv);
    return daysContainer;
  },
  
  async renderTimeSlots() {
    const timesContainer = document.createElement("div");
    timesContainer.className = "times-container";
    const timeHeader = document.createElement("div");
    timeHeader.className = "time-header";
    if (this.state.selectedDate) {
      const dateFormatter = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { weekday: "long", month: "long", day: "numeric" });
      timeHeader.textContent = `${texts.availableTimesFor} ${dateFormatter.format(this.state.selectedDate)}`;
    } else {
      timeHeader.innerHTML = `<span style="display: inline-block; animation: pulse 2s infinite ease-in-out;">${texts.selectDate}</span>`;
    }
    timesContainer.appendChild(timeHeader);
    const timeSlotsDiv = document.createElement("div");
    timeSlotsDiv.className = "time-slots";
    
    const self = this; // For use in event handlers
    
    if (this.state.selectedDate) {
      const dateKey = this.formatDate(this.state.selectedDate);
      const timeSlots = this.state.availableSlots[dateKey] || [];
      if (timeSlots.length === 0) {
        const noSlots = document.createElement("div");
        noSlots.textContent = texts.noAvailableSlots;
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
          if (this.state.selectedTime === timeISO) {
            timeSlot.classList.add("selected");
          }
          const timeFormatter = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { hour: "numeric", minute: "2-digit", hour12: true });
          timeSlot.textContent = timeFormatter.format(dateTime);
          timeSlot.addEventListener("click", () => {
            if (!this.state.isConfirmed) {
              this.state.selectedTime = timeISO;
              this.renderCalendar();
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
      noDate.textContent = texts.pleaseSelectDate;
      noDate.style.textAlign = "center";
      noDate.style.padding = "20px 0";
      noDate.style.color = "#666";
      timeSlotsDiv.appendChild(noDate);
    }
    timesContainer.appendChild(timeSlotsDiv);
    return timesContainer;
  },
  
  renderFooter() {
    const footer = document.createElement("div");
    footer.className = "calendar-footer";
    const confirmBtn = document.createElement("button");
    confirmBtn.className = "btn btn-submit";
    
    const self = this; // For use in event handlers
    
    if (this.state.isConfirmed) {
      confirmBtn.textContent = language === "en" ? "Booked ✓" : "Réservé ✓";
      confirmBtn.style.backgroundColor = "#4CAF50";
      confirmBtn.style.color = "white";
      confirmBtn.disabled = true;
    } else {
      confirmBtn.textContent = texts.confirmBooking;
      if (!this.state.selectedDate || !this.state.selectedTime) { 
        confirmBtn.disabled = true; 
      }
      
      confirmBtn.addEventListener("click", async function() {
        if (self.state.selectedDate && self.state.selectedTime) {
          // Show loading state
          confirmBtn.disabled = true;
          confirmBtn.textContent = texts.confirming;
          
          try {
            // Complete the booking with Cal.com
            const bookingResponse = await self.createBooking(
              self.state.selectedTime, 
              userData.fullName, 
              userData.email, 
              selectedService.eventTypeId
            );
            
            if (bookingResponse) {
              // Update UI to show confirmation
              self.state.isConfirmed = true;
              self.renderCalendar();
              
              // Show success animation and message
              const successOverlay = document.createElement('div');
              successOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #9C27B00d;
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
                box-shadow: 0 10px 30px #9C27B026;
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
              successText.textContent = texts.bookingConfirmed;
              successText.style.cssText = `
                font-size: 18px;
                font-weight: 600;
                margin-top: 15px;
                color: #9C27B0;
              `;
              
              const successSubtext = document.createElement('p');
              successSubtext.textContent = texts.bookingComplete;
              successSubtext.style.cssText = `
                font-size: 14px;
                margin-top: 10px;
                color: #555;
              `;
              
              successMessage.appendChild(successText);
              successMessage.appendChild(successSubtext);
              successOverlay.appendChild(successMessage);
              
              const calendarContainer = document.querySelector(".calendar-container");
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
                    
                    // Show global success screen
                    showSuccessScreen();
                    
                    // Send data to Voiceflow
                    const dateStr = self.formatDate(self.state.selectedDate);
                    const formattedDate = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }).format(self.state.selectedDate);
                    
                    const formattedTime = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { 
                      hour: 'numeric', 
                      minute: '2-digit', 
                      hour12: true 
                    }).format(new Date(self.state.selectedTime));
                    
                    const formattedDateTime = `${formattedDate} ${language === "fr" ? "à" : "at"} ${formattedTime}`;
                    
                    if (vf) {
                      window.voiceflow.chat.interact({
                        type: "success",
                        payload: {
                          firstName: userData.firstName,
                          lastName: userData.lastName,
                          fullName: userData.fullName,
                          email: userData.email,
                          service: selectedService.eventName,
                          date: dateStr,
                          time: self.state.selectedTime,
                          formattedDateTime: formattedDateTime
                        }
                      });
                    }
                  }, 500); // End of hide animation
                }, 2000); // Show duration before hiding
              }, 100); // Start of show animation
            }
          } catch (err) {
            console.error("Booking error:", err);
            confirmBtn.disabled = false;
            confirmBtn.textContent = texts.confirmBooking;
            self.showErrorMessage(err.message || texts.errorOccurred);
          }
        }
      });
    }
    
    footer.appendChild(confirmBtn);
    return footer;
  },
  
  async renderCalendar() {
    const calendarComponent = document.querySelector("#calendar-component");
    calendarComponent.innerHTML = "";
    
    const calendarContainer = document.createElement("div");
    calendarContainer.className = "calendar-container";
    if (this.state.isConfirmed) {
      calendarContainer.classList.add("confirmed");
    }
    
    calendarContainer.appendChild(this.renderHeader());
    
    const calendarBody = document.createElement("div");
    calendarBody.className = "calendar-body";
    calendarBody.appendChild(await this.renderCalendarDays());
    calendarBody.appendChild(await this.renderTimeSlots());
    calendarContainer.appendChild(calendarBody);
    
    calendarContainer.appendChild(this.renderFooter());
    
    calendarComponent.appendChild(calendarContainer);
  },
  
  async initialize(scheduleId) {
    // Initialize working days
    this.state.workingDays = await this.fetchWorkingDays(scheduleId);
    
    // Initialize default selected date
    if (!this.state.selectedDate) {
      const defaultDay = this.getDefaultActiveDay();
      this.state.selectedDate = defaultDay;
      const dayKey = this.formatDate(defaultDay);
      if (!this.state.availableSlots[dayKey]) {
        const defaultSlots = await this.fetchAvailableSlots(
          dayKey, 
          selectedService.eventTypeId, 
          selectedService.eventTypeSlug
        );
        this.state.availableSlots[dayKey] = defaultSlots;
      }
    }
    
    // Render the calendar
    await this.renderCalendar();
  }
};

// Function to render the calendar
async function renderCalendar() {
  // Initialize and render the calendar component
  await calendarBooking.initialize(selectedService.scheduleId);
}

// Start the form timer
startFormTimer();

// Initialize with first step
goToStep(1);
        }
    };
        
 const BookingCalendarExtension = {
      name: 'Booking',
      type: 'response',
      match: ({ trace }) =>
        trace.type === 'ext_booking_calendar' || trace.payload?.name === 'ext_booking_calendar',
      render: async ({ trace, element }) => {
        // Add SVG chevron constant at the top
        const SVG_CHEVRON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
          <g transform="translate(75, 75)">
            <path fill="#9C27B0" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
          </g>
        </svg>`;
        
        // --- Extract required payload values with fallbacks ---
        const {
          fullName = "John Doe",
          email = "john@example.com",
          apiKey = "",
          scheduleId = "",
          eventTypeId = "1", 
          eventTypeSlug = "default-event",
          meetingName, // Add this line
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
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .form-row {
            display: flex;
            gap: 15px;
        }
        
        .form-group {
            flex: 1;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 6px;
            font-weight: 500;
            font-size: 14px;
            color: #444;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px;
            font-size: 14px;
            border: 1px solid #ddd;
            border-radius: 8px;
            transition: all 0.2s;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #9C27B0;
            box-shadow: 0 0 0 2px rgba(156, 39, 176, 0.1);
        }
        
        .error-text {
            color: #d32f2f;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }
        
        /* Calendar container */
        .calendar-section {
            display: none;
        }
        
        /* Success message */
        .success-section {
            display: none;
            padding: 30px 20px;
            text-align: center;
            animation: fadeIn 0.5s ease-out forwards;
        }
        
        .success-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 20px;
            background-color: #e8f5e9;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2e7d32;
        }
        
        .success-title {
            color: #2e7d32;
            margin-bottom: 10px;
            font-size: 18px;
        }
        
        .success-message {
            color: #388e3c;
            font-size: 14px;
            line-height: 1.5;
        }
        
        /* Footer with action buttons */
        .booking-footer {
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
        }
        
        .footer-button {
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .back-button {
            background-color: #f1f1f1;
            color: #666;
            border: none;
        }
        
        .progress-bar {
  position: absolute;
  top: 50%;
  left: 0;      /* or same inset as the gray rail */
  height: 3px;
  width: /* set dynamically in JS: (currentStep-1)/(totalSteps-1)*100% */;
  background: linear-gradient(90deg,#9C27B0,#7B1FA2);
  transform: translateY(-50%);
  z-index: 2;
}



.step-progress::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;                  /* or left:20px if you want to inset it */
  right: 0;                 /* or right:20px */
  height: 3px;
  background-color: #e0e0e0;
  transform: translateY(-50%);
  z-index: 1;
}

        .back-button:hover {
            background-color: #e5e5e5;
        }
        
        .next-button {
            background-color: #9C27B0;
            color: white;
            border: none;
            opacity: 0.7;
            pointer-events: none;
        }
        
        .next-button.active {
            opacity: 1;
            pointer-events: auto;
        }
        
        .next-button.active:hover {
            background-color: #7B1FA2;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(156, 39, 176, 0.2);
        }
        
        /* Calendar styles */
        /* Calendar component specific styles */
        @keyframes fadeInCalendar {
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
            border-radius: 16px;
            overflow: hidden;
            background: #ffffff;
            color: #333;
            animation: fadeInCalendar 0.3s ease-out forwards;
            border: 1px solid #eaeaea;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 24px;
            background-color: #9C27B029;
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
        
        .provider-icon svg, .service-icon svg, .appointment-icon svg{
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
            width: 30px;
            height: 30px;
            border-radius: 50%;
            transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            color: #9C27B0;
        }
        
        .nav-btn:hover {
            background-color: #F8EAFA;
            box-shadow: 0 3px 10px #9C27B026;
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
            background: linear-gradient(to bottom, #ffffff, #fefeff);
        }
        
        .days-container {
            width: 47%;
            position: relative;
            background-size: 25px 25px;
            background-position: -1px -1px;
			max-height: 350px;
        }
        
        .calendar-container::before {
            content: "";
            position: absolute;
            top: -3px;
            left: 10%;
            right: 10%;
            height: 3px;
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
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='80' height='80'%3E%3Cpath d='M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z' fill='#9C27B008'/%3E%3C/svg%3E");
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
            box-shadow: 0 0 0 1px #9C27B01a;
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
            border-radius: 10px;
            font-weight: bold;
            box-shadow: 0 4px 12px #9C27B026;
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
            padding: 10px 0px;
            overflow-y: auto;
            background-color: #fefeff;
            position: relative;
			max-height: 350px;
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
            background: #9C27B00d;
            border-radius: 10px;
        }
        
        .times-container::-webkit-scrollbar-thumb {
            background: #9C27B033;
            border-radius: 10px;
        }
        
        .times-container::-webkit-scrollbar-thumb:hover {
            background: #9C27B033;
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
            padding: 14px 8px;
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
            width: 60%;
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
            box-shadow: 0 4px 15px #9C27B026;
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
            box-shadow: 0 6px 18px #9C27B026;
        }
        
        .confirm-btn:hover:not(:disabled)::before {
            animation: shimmer 1.5s infinite;
        }
        
        .confirm-btn:active:not(:disabled) {
            box-shadow: 0 2px 10px #9C27B026;
        }
        
        .confirm-btn:disabled {
            cursor: not-allowed;
            box-shadow: none;
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
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .booking-container {
                width: 95%;
                border-radius: 8px;
            }
            
            .form-row {
                flex-direction: column;
                gap: 5px;
            }
            
            .footer-button {
                padding: 10px 16px;
                font-size: 13px;
            }
            
            .step-title {
                font-size: 11px;
                display:none;
            }
            
            /* Calendar responsive */
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
                max-height: 200px;
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
            
            .service-provider,
            .service-name {
                font-size: 14px;
            }
            
            .current-date {
                font-size: 14px;
                padding: 5px 10px;
            }
            
            .weekdays {
                font-size: 11px;
                padding: 10px 0 5px;
            }
            
            .time-slot {
                padding: 12px 8px;
                min-width: 70px;
                margin: 0 auto;
                width: 60%;
            }
            
            .time-slots-columns {
                gap: 10px;
            }
            
            .time-slots-column {
                min-width: 0;
                width: calc(50% - 5px);
            }
        }
        
        @media (max-width: 480px) {
            .calendar-container {
                border-radius: 10px;
            }
            
            .calendar-header {
                padding: 12px 15px;
                flex-direction: column;
                gap: 10px;
                align-items: flex-start;
            }
            
            .calendar-nav {
                display: flex;
                align-items: center;
                gap: 15px;
                width: 100%;
                justify-content: center;
            }
            
            .day {
                height: 35px;
                width: 35px;
                font-size: 12px;
            }
            
            .provider-icon, .service-icon, .appointment-icon {
                width: 16px;
                height: 16px;
            }
            
            .service-provider, .service-name, .appointment-date {
                font-size: 13px;
                height: 20px;
                line-height: 20px;
            }
            
            .time-slot {
                padding: 10px 4px;
                font-size: 13px;
            }
            
            .time-slots-column {
                min-width: 0;
                width: calc(50% - 5px);
            }
            
            .time-slots-columns {
                gap: 10px;
                display: flex;
                flex-direction: row;
            }
            
            .calendar-footer {
                padding: 12px 10px;
            }
            
            .confirm-btn {
                width: 100%;
                padding: 12px 16px;
                font-size: 13px;
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
    <span>${meetingName || 'Available Appointments'}</span>
  `;
  
  titleContent.appendChild(providerDiv);
  calendarTitle.appendChild(titleContent);
  
  // Calendar navigation section with chevron SVGs
  const calendarNav = document.createElement("div");
  calendarNav.className = "calendar-nav";
  
  const currentDateEl = document.createElement("div");
  currentDateEl.className = "current-date";
  currentDateEl.textContent = dateFormatter.format(state.currentDate);
  
  const prevBtn = document.createElement("button");
  prevBtn.className = "nav-btn prev-btn";
  prevBtn.innerHTML = `<div style="transform: rotate(90deg) translateY(2px);">${SVG_CHEVRON}</div>`;
  prevBtn.addEventListener("click", () => {
    if (!state.isConfirmed) {
      state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 1);
      renderCalendar();
    }
  });
  
  const nextBtn = document.createElement("button");
  nextBtn.className = "nav-btn next-btn";
  nextBtn.innerHTML = `<div style="transform: rotate(-90deg) translateY(2px);">${SVG_CHEVRON}</div>`;
  nextBtn.addEventListener("click", () => {
    if (!state.isConfirmed) {
      state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 1);
      renderCalendar();
    }
  });
  
  calendarNav.appendChild(prevBtn);
  calendarNav.appendChild(currentDateEl);
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
              background-color: #9C27B00d;
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
              box-shadow: 0 10px 30px #9C27B026;
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
                    date: dateStr,
                    time: state.selectedTime,
                    formattedDate,
                    formattedTime,
                    formattedDateTime
                  };
                  
                  window.voiceflow.chat.interact({
                    type: "success",
                    payload: formData
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
        
        // Improved resize handler with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            container.style.width = window.innerWidth <= 768 ? "100%" : "800px";
            renderCalendar();
          }, 250);
        });
        
        // Check if touch events are supported
        const isTouchDevice = ('ontouchstart' in window) || 
                             (navigator.maxTouchPoints > 0) || 
                             (navigator.msMaxTouchPoints > 0);
        
        if (isTouchDevice) {
          // Add touch-specific class to improve mobile experience
          calendarContainer.classList.add('touch-device');
        }
	 startFormTimer();     
      }
    };
    
  const BookingFormExtension = {
    name: "BookingForm",
    type: "response",
    match: ({ trace }) => trace.type === `ext_booking_form` || trace.payload?.name === `ext_booking_form`,
    render: ({ trace, element }) => {
      const { language } = trace.payload || { language: 'FR' };
      const isEnglish = language === 'en';
      // Initialize timeout variables
      let formTimeoutId = null;
      let isFormSubmitted = false;
      const TIMEOUT_DURATION = 6000; // 15 minutes in milliseconds
      
      // Create service display map for translations
      const serviceDisplayMap = {};
      ServiceOptions.forEach(service => {
        serviceDisplayMap[service.value] = {
          en: service.label.en,
          fr: service.label.fr
        };
      });

      // Create service data for dropdown based on current language
      const serviceOptionsData = ServiceOptions.map(service => ({
        id: service.value,
        name: isEnglish ? service.label.en : service.label.fr
      }));
      
      // Create the form
      const formContainer = document.createElement("form");
      formContainer.setAttribute("novalidate", "true");
      formContainer.innerHTML = `
<style>
  /* ========== Responsive Layout ========== */


  /* ========== Dropdown Components ========== */
  .main-container {
    display: block;
    transition: height 0.3s ease;
    border-radius: 6px;
    margin-bottom: 15px;
    width: 100%;
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
    font-size: 14px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    color: #444;
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
    font-size: 14px;
    border-top: 1px solid #ddd;
    max-height: 300px;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    z-index: 100;
    border-radius: 0 0 6px 6px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    width: 100%;
  }
  .custom-options::-webkit-scrollbar {
    display: none;
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
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    transition: all 0.2s;
  }

  .option-checkbox svg {
    width: 12px;
    height: 12px;
    display: none;
  }

  /* Hover state */
  .custom-option:hover:not(.selected) .option-checkbox {
    border-color: #9c27b0;
  }
  .custom-option:hover:not(.selected) .option-checkbox svg {
    display: block;
  }
  .custom-option:hover:not(.selected) .option-checkbox svg path {
    fill: #9c27b0;
  }

  /* Selected state */
  .custom-option.selected .option-checkbox {
    border-color: #9c27b0;
    background-color: #9c27b0;
  }
  .custom-option.selected .option-checkbox svg {
    display: block;
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
    margin: 0 auto;
    padding: 20px;
    border-radius: 6px;
    min-width: 350px;
    max-width: 800px;
  }
  
  .form-group {
    width: 100%;
  }
  
  .form-row {
    display: flex;
    gap: 15px;
    width: 100%;
  }
  
  .form-row .form-group {
    flex: 1;
  }
  
  .bold-label {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 8px;
    display: block;
  }
  input[type="text"],
  input[type="email"],
  input[type="tel"] {
    width: 100%;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 6px;
    padding: 8px;
    background: #fff;
    font-size: 14px;
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
  .form-disabled input,
  .form-disabled .select-wrapper,
  .form-disabled .select-display,
  .form-disabled .dropdown-icon,
  .form-disabled .custom-option {
    cursor: not-allowed;
  }
  input:disabled, 
  select:disabled, 
  button:disabled {
    cursor: not-allowed !important;
  }

  .disabled {
    cursor: not-allowed !important;
  }

  .disabled * {
    cursor: not-allowed !important;
    pointer-events: none !important;
  }

  .dropdown-disabled {
    pointer-events: none !important;
    cursor: not-allowed !important;
  }
  
  /* Responsive Media Queries */
  @media screen and (max-width: 768px) {
    form {
      padding: 15px;
      min-width: 100%;
    }
    
    .bold-label {
      font-size: 14px;
    }
    
    input[type="text"],
    input[type="email"],
    input[type="tel"] {
      height: 45px;
      font-size: 13px;
    }
    
    .select-display {
      height: 45px;
      font-size: 13px;
    }
    
    .custom-option {
      padding: 10px 12px;
    }
    
    .submit-btn {
      padding: 12px;
      font-size: 15px;
    }

    .form-row {
      flex-direction: column;
      gap: 10px;
    }
  }
  
  @media screen and (max-width: 480px) {
    form {
      padding: 10px;
    }
    
    .error-message {
      font-size: 12px;
    }
    
    .error-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
</style>

        <div class="form-row">
          <div class="form-group">
            <label for="first-name" class="bold-label">${isEnglish ? 'First Name' : 'Prénom'}</label>
            <input type="text" id="first-name" name="first-name" placeholder="${isEnglish ? 'Enter your first name' : 'Entrez votre prénom'}" required />
            <div class="error-container">
              <div class="error-message" id="errorFirstName">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'First Name is required.' : 'Le prénom est obligatoire.'}</span>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="last-name" class="bold-label">${isEnglish ? 'Last Name' : 'Nom de famille'}</label>
            <input type="text" id="last-name" name="last-name" placeholder="${isEnglish ? 'Enter your last name' : 'Entrez votre nom de famille'}" required />
            <div class="error-container">
              <div class="error-message" id="errorLastName">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'Last Name is required.' : 'Le nom de famille est obligatoire.'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="email" class="bold-label">Email</label>
            <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required />
            <div class="error-container">
              <div class="error-message" id="errorEmail">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'A valid email is required.' : "Une adresse email valide est obligatoire."}</span>
              </div>
            </div>
          </div>
          
          <div class="form-group">
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
        
        <div class="main-container" id="serviceDropdown">
          <label class="bold-label">${isEnglish ? 'Select a Service' : 'Sélectionnez un service'}</label>
          <select id="serviceSelect" name="serviceSelect" required style="display:none;"></select>
          <div class="select-wrapper">
            <div class="select-display" id="selectDisplayService">
              <span>${isEnglish ? '-- Select a Service --' : '-- Sélectionnez un service --'}</span>
              <div class="dropdown-icon" id="dropdownIconService">${SVG_CHEVRON}</div>
            </div>
            <div class="custom-options" id="customOptionsService"></div>
          </div>
          <div class="error-container">
            <div class="error-message" id="errorService">
              <div class="error-icon">!</div>
              <span>${isEnglish ? 'You must select a service.' : 'Vous devez sélectionner un service.'}</span>
            </div>
          </div>
        </div>
        
        <button type="button" class="submit-btn" id="submit-button">
          ${isEnglish ? 'Submit' : 'Soumettre'}
        </button>
      `;

      element.appendChild(formContainer);

      /*************************************************************
       * Timer Functionality
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
        formContainer.querySelector("#first-name").disabled = true;
        formContainer.querySelector("#last-name").disabled = true;
        formContainer.querySelector("#email").disabled = true;
        formContainer.querySelector("#phone").disabled = true;
        
        // Disable the dropdown
        formContainer.querySelector("#selectDisplayService").classList.add('dropdown-disabled');
        
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

      // Initialize the service dropdown
      const serviceDropdown = formContainer.querySelector("#serviceDropdown");
      const serviceSelect = formContainer.querySelector("#serviceSelect");
      const selectDisplayService = formContainer.querySelector("#selectDisplayService");
      const customOptionsService = formContainer.querySelector("#customOptionsService");
      const dropdownIconService = formContainer.querySelector("#dropdownIconService");
      const errorService = formContainer.querySelector("#errorService");
      
      serviceSelect.innerHTML = `<option value="" disabled selected>${isEnglish ? '-- Select a Service --' : '-- Sélectionnez un service --'}</option>`;
      selectDisplayService.querySelector("span").textContent = isEnglish ? '-- Select a Service --' : '-- Sélectionnez un service --';
      customOptionsService.innerHTML = "";
      
      // Use the serviceOptionsData (which is already localized based on language)
      serviceOptionsData.forEach(service => {
        const optionEl = document.createElement('div');
        optionEl.className = 'custom-option';
        optionEl.dataset.value = service.id;
        optionEl.innerHTML = `<div class="option-checkbox">${SVG_CHECK}</div><span>${service.name}</span>`;
        customOptionsService.appendChild(optionEl);
        
        const opt = document.createElement('option');
        opt.value = service.id;
        opt.textContent = service.name;
        serviceSelect.appendChild(opt);
        
        optionEl.addEventListener('click', function(e) {
          e.stopPropagation();
          customOptionsService.querySelectorAll('.custom-option').forEach(opt => {
            opt.classList.remove('selected');
          });
          this.classList.add('selected');
          selectDisplayService.querySelector('span').textContent = service.name;
          serviceSelect.value = service.id;
          customOptionsService.classList.remove('show-options');
          dropdownIconService.classList.remove('rotate');
          
          // Hide the error message when a service is selected
          errorService.style.display = "none";
        });
      });
      
      selectDisplayService.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = customOptionsService.classList.contains('show-options');
        formContainer.querySelectorAll('.custom-options').forEach(optList => optList.classList.remove('show-options'));
        formContainer.querySelectorAll('.dropdown-icon').forEach(icon => icon.classList.remove('rotate'));
        if (!isOpen) {
          customOptionsService.classList.add('show-options');
          dropdownIconService.classList.add('rotate');
        }
      });
      
      document.addEventListener('click', function(e) {
        if (!serviceDropdown.contains(e.target)) {
          customOptionsService.classList.remove('show-options');
          dropdownIconService.classList.remove('rotate');
        }
      });

      // Input validation
      formContainer.querySelector("#first-name").addEventListener("input", function() {
        if (this.value.trim()) formContainer.querySelector("#errorFirstName").style.display = "none";
      });
      
      formContainer.querySelector("#last-name").addEventListener("input", function() {
        if (this.value.trim()) formContainer.querySelector("#errorLastName").style.display = "none";
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
        const firstName = formContainer.querySelector("#first-name").value.trim();
        const lastName = formContainer.querySelector("#last-name").value.trim();
        const email = formContainer.querySelector("#email").value.trim();
        const phone = formContainer.querySelector("#phone").value.trim();
        const serviceValue = serviceSelect.value;
        let isValid = true;
        
        if (!firstName) {
          formContainer.querySelector("#errorFirstName").style.display = "flex";
          isValid = false;
        }
        
        if (!lastName) {
          formContainer.querySelector("#errorLastName").style.display = "flex";
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
        
        if (!serviceValue) {
          errorService.style.display = "flex";
          isValid = false;
        }
        
        if (!isValid) {
          return;
        }
        
        // Force close any open dropdown
        customOptionsService.classList.remove('show-options');
        dropdownIconService.classList.remove('rotate');

        isFormSubmitted = true;
        if (formTimeoutId) {
          clearInterval(formTimeoutId);
        }
        // Apply disabled styling
        formContainer.classList.add('form-disabled');
        
        // Disable all form inputs
        formContainer.querySelector("#first-name").disabled = true;
        formContainer.querySelector("#last-name").disabled = true;
        formContainer.querySelector("#email").disabled = true;
        formContainer.querySelector("#phone").disabled = true;
        
        // Disable the dropdown
        selectDisplayService.classList.add('dropdown-disabled');
        
        // Update button state
        const submitButton = formContainer.querySelector("#submit-button");
        submitButton.disabled = true;
        submitButton.textContent = isEnglish ? "Processing..." : "Traitement...";
        submitButton.style.backgroundColor = "#4CAF50";
        submitButton.style.color = "white";
        
        // Get the localized service display name
        const serviceDisplay = serviceDisplayMap[serviceValue] ? 
                           (isEnglish ? serviceDisplayMap[serviceValue].en : serviceDisplayMap[serviceValue].fr) : 
                           serviceValue;
        
        window.voiceflow.chat.interact({
          type: "success",
          payload: { 
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`, // Add the combined fullName field
            email,
            phone: formatPhoneNumber(phone),
            service: serviceValue,
            serviceDisplay 
          },
        });
      });
      
      startFormTimer();      
    }
  };

 const BookingInfoFormExtension = {
    name: "BookingInfoForm",
    type: "response",
    match: ({ trace }) => trace.type === `ext_booking_info_form` || trace.payload?.name === `ext_booking_info_form`,
    render: ({ trace, element }) => {
      const { language } = trace.payload || { language: 'FR' };
      const isEnglish = language === 'en';
      // Initialize timeout variables
      let formTimeoutId = null;
      let isFormSubmitted = false;
      const TIMEOUT_DURATION = 6000; // 15 minutes in milliseconds
      
      // Create the form
      const formContainer = document.createElement("form");
      formContainer.setAttribute("novalidate", "true");
      formContainer.innerHTML = `
<style>
  /* ========== Responsive Layout ========== */


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
    margin: 0 auto;
    padding: 20px;
    border-radius: 6px;
    min-width: 350px;
    max-width: 800px;
  }
  
  .form-group {
    width: 100%;
  }
  
  .form-row {
    display: flex;
    gap: 15px;
    width: 100%;
  }
  
  .form-row .form-group {
    flex: 1;
  }
  
  .bold-label {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 8px;
    display: block;
  }
  input[type="text"],
  input[type="email"],
  input[type="tel"] {
    width: 100%;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 6px;
    padding: 8px;
    background: #fff;
    font-size: 14px;
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
    cursor: not-allowed;
  }
  input:disabled, 
  button:disabled {
    cursor: not-allowed !important;
  }

  .disabled {
    cursor: not-allowed !important;
  }

  .disabled * {
    cursor: not-allowed !important;
    pointer-events: none !important;
  }
  
  /* Responsive Media Queries */
  @media screen and (max-width: 768px) {
    form {
      padding: 15px;
      min-width: 100%;
    }
    
    .bold-label {
      font-size: 14px;
    }
    
    input[type="text"],
    input[type="email"],
    input[type="tel"] {
      height: 45px;
      font-size: 13px;
    }
    
    .submit-btn {
      padding: 12px;
      font-size: 15px;
    }

    .form-row {
      flex-direction: column;
      gap: 10px;
    }
  }
  
  @media screen and (max-width: 480px) {
    form {
      padding: 10px;
    }
    
    .error-message {
      font-size: 12px;
    }
    
    .error-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
</style>

        <div class="form-row">
          <div class="form-group">
            <label for="first-name" class="bold-label">${isEnglish ? 'First Name' : 'Prénom'}</label>
            <input type="text" id="first-name" name="first-name" placeholder="${isEnglish ? 'Enter your first name' : 'Entrez votre prénom'}" required />
            <div class="error-container">
              <div class="error-message" id="errorFirstName">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'First Name is required.' : 'Le prénom est obligatoire.'}</span>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="last-name" class="bold-label">${isEnglish ? 'Last Name' : 'Nom de famille'}</label>
            <input type="text" id="last-name" name="last-name" placeholder="${isEnglish ? 'Enter your last name' : 'Entrez votre nom de famille'}" required />
            <div class="error-container">
              <div class="error-message" id="errorLastName">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'Last Name is required.' : 'Le nom de famille est obligatoire.'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="email" class="bold-label">Email</label>
            <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required />
            <div class="error-container">
              <div class="error-message" id="errorEmail">
                <div class="error-icon">!</div>
                <span>${isEnglish ? 'A valid email is required.' : "Une adresse email valide est obligatoire."}</span>
              </div>
            </div>
          </div>
          
          <div class="form-group">
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
        
        <button type="button" class="submit-btn" id="submit-button">
          ${isEnglish ? 'Submit' : 'Soumettre'}
        </button>
      `;

      element.appendChild(formContainer);

      /*************************************************************
       * Timer Functionality
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
        formContainer.querySelector("#first-name").disabled = true;
        formContainer.querySelector("#last-name").disabled = true;
        formContainer.querySelector("#email").disabled = true;
        formContainer.querySelector("#phone").disabled = true;
        
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
      formContainer.querySelector("#first-name").addEventListener("input", function() {
        if (this.value.trim()) formContainer.querySelector("#errorFirstName").style.display = "none";
      });
      
      formContainer.querySelector("#last-name").addEventListener("input", function() {
        if (this.value.trim()) formContainer.querySelector("#errorLastName").style.display = "none";
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
        const firstName = formContainer.querySelector("#first-name").value.trim();
        const lastName = formContainer.querySelector("#last-name").value.trim();
        const email = formContainer.querySelector("#email").value.trim();
        const phone = formContainer.querySelector("#phone").value.trim();
        let isValid = true;
        
        if (!firstName) {
          formContainer.querySelector("#errorFirstName").style.display = "flex";
          isValid = false;
        }
        
        if (!lastName) {
          formContainer.querySelector("#errorLastName").style.display = "flex";
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
        // Apply disabled styling
        formContainer.classList.add('form-disabled');
        
        // Disable all form inputs
        formContainer.querySelector("#first-name").disabled = true;
        formContainer.querySelector("#last-name").disabled = true;
        formContainer.querySelector("#email").disabled = true;
        formContainer.querySelector("#phone").disabled = true;
        
        // Update button state
        const submitButton = formContainer.querySelector("#submit-button");
        submitButton.disabled = true;
        submitButton.textContent = isEnglish ? "Processing..." : "Traitement...";
        submitButton.style.backgroundColor = "#4CAF50";
        submitButton.style.color = "white";
        
        window.voiceflow.chat.interact({
          type: "success",
          payload: { 
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`, // Send fullName as combined field
            email,
            phone: formatPhoneNumber(phone)
          },
        });
      });
      
      startFormTimer();      
    }
  };

  
  
const ContactFormExtension = {
      name: "ContactForm",
      type: "response",
      match: ({ trace }) => trace.type === 'ext_contact_form' || trace.payload?.name === 'ext_contact_form',
      render: ({ trace, element }) => {
        const { language } = trace.payload || { language: 'FR' };
        const isEnglish = language === 'en';
        
        // Initialize form variables
        let formTimeoutId = null;
        let isFormSubmitted = false;
        let currentStep = 1;
        const totalSteps = 4; // Now 4 steps
        const TIMEOUT_DURATION = 300000; // 900 seconds (15 minutes) in milliseconds
    
        /*************************************************************
         * HTML Generation & Initial Setup
         *************************************************************/
        const formContainer = document.createElement("form");
        formContainer.setAttribute("novalidate", "true");
        formContainer.innerHTML = `
          <style>
            /* ========= Base Styles ========= */
          

            .hidden {
              display: none !important;
            }

            /* ========= Form Layout ========= */
            form {
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 100%;
              max-width: 800px;
              min-width: 800px;
              margin: 0 auto;
              padding: 16px;
              border-radius: 12px;
              background: #fff;
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
              position: relative;
              overflow: hidden;
            }

            .flex-row {
              display: flex;
              gap: 10px 16px;
              flex-wrap: wrap;
              width: 100%;
            }

            .flex-row > div {
              flex: 1;
              min-width: 300px;
            }

            .bold-label {
              font-weight: 600;
              font-size: 15px;
              margin-bottom: 8px;
              display: block;
            }

            /* ========= Input Fields ========= */
            input[type="text"],
            input[type="email"],
            input[type="tel"],
            #details {
              width: 100%;
              border: 1px solid rgba(0,0,0,0.2);
              border-radius: 6px;
              padding: 8px;
              background: #fafafa;
              font-size: 14px;
              outline: none;
              box-sizing: border-box;
              height: 50px;
              transition: all 0.2s;
            }

            input[type="text"]:focus,
            input[type="email"]:focus,
            input[type="tel"]:focus,
            #details:focus {
              border-color: #9C27B0;
              box-shadow: 0 0 0 3px rgba(156,39,176,0.1);
              outline: none;
              background-color: #fff;
            }

            #details {
              resize: vertical;
              min-height: 100px;
              max-height: 200px;
            }

            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            input[type="number"] {
              -moz-appearance: textfield;
            }

            /* ========= Dropdown Components ========= */
            .main-container {
              display: block;
              transition: height 0.3s ease;
              border-radius: 6px;
              width: 100%;
              margin-bottom: 15px;
            }

            .select-wrapper {
              border: 1px solid #ddd;
              border-radius: 6px;
              background-color: #fff;
              position: relative;
              width: 100%;
              min-height: 48px;
            }

            .select-display {
              padding: 0 15px;
              font-size: 14px;
              cursor: pointer;
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 48px;
              color: #444;
            }

            .dropdown-icon {
              width: 24px;
              height: 24px;
              transition: transform 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #f0e5f4;
              border-radius: 50%;
            }

            .dropdown-icon.rotate {
              transform: rotate(180deg);
            }

            .custom-options {
              display: none;
              font-size: 14px;
              border-top: 1px solid #ddd;
              max-height: 250px;
              overflow-y: auto;
              background-color: #fff;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              z-index: 100;
              border-radius: 0 0 6px 6px;
              -ms-overflow-style: none;
              scrollbar-width: none;
              width: 100%;
            }

            .custom-options::-webkit-scrollbar {
              display: none;
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
              background-color: #f0e5f4;
              color: #9C27B0;
            }

            .custom-option.selected {
              background-color: #f0e5f4;
              color: #9C27B0;
              font-weight: bold;
            }

            .option-checkbox {
              width: 18px;
              height: 18px;
              border: 2px solid #ccc;
              border-radius: 50%;
              margin-right: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #fff;
              transition: all 0.2s;
            }

            .option-checkbox svg {
              width: 12px;
              height: 12px;
              display: none;
            }

            .custom-option:hover:not(.selected) .option-checkbox {
              border-color: #9C27B0;
            }

            .custom-option:hover:not(.selected) .option-checkbox svg {
              display: block;
            }

            .custom-option:hover:not(.selected) .option-checkbox svg path {
              fill: #9C27B0;
            }

            .custom-option.selected .option-checkbox {
              border-color: #9C27B0;
              background-color: #9C27B0;
            }

            .custom-option.selected .option-checkbox svg {
              display: block;
            }

            .custom-option.selected .option-checkbox svg path {
              fill: #fff !important;
            }

            .show-options {
              display: block;
            }

            select {
              display: none;
            }

            /* ========= Error Components ========= */
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

            /* ========= Multi-step form styles ========= */
            .step-container {
              display: none;
              animation: fadeIn 0.5s;
            }

            .step-container.active {
    display: flex
;
    flex-direction: column;
    gap: 10px;
}

            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .step-heading {
     font-size: 24px;
      color: #9C27B0;
      font-weight: 600;
      position: relative;
      margin-top: 0;
      margin-bottom: 0;
            }
            
            .step-heading::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 60px;
              height: 3px;
              background: linear-gradient(90deg, #9C27B0, #E1BEE7);
              border-radius: 3px;
            }

            /* Progress indicator */
            .progress-container {
              padding: 0;
            }

            .step-progress {
              display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 0;
  padding: 0 10px;    
            }

            .step-progress::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 0;
              width: 100%;
              height: 3px;
              background: #e0e0e0;
              z-index: 1;
              transform: translateY(-50%);
            }

            .progress-bar {
              position: absolute;
              top: 50%;
              left: 0;
              height: 3px;
              background: linear-gradient(90deg, #9C27B0, #7B1FA2);
              z-index: 2;
              transform: translateY(-50%);
              transition: width 0.4s ease;
              box-shadow: 0 2px 4px rgba(156, 39, 176, 0.3);
            }

            .step-item {
              z-index: 3;
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              text-align: center;
              width: 25%;
            }

            .step-icon {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: #e0e0e0;
              margin-bottom: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              transition: all 0.3s ease;
              border: 2px solid #f5f5f5;
              font-weight: bold;
              font-size: 14px;
              color: #757575;
            }

            .step-title {
              font-size: 13px;
              color: #757575;
              position: absolute;
              width: 100%;
              text-align: center;
              top: 35px;
              font-weight: 500;
              transition: all 0.3s ease;
              display:none;
            }

            .step-item.active .step-icon {
              background: #9C27B0;
              color: white;
              border-color: #9C27B0;
              box-shadow: 0 4px 8px rgba(156, 39, 176, 0.2);
            }

            .step-item.active .step-title {
              color: #9C27B0;
              font-weight: 600;
            }

            .step-item.completed .step-icon {
              background: #9C27B0;
              color: white;
              border-color: #9C27B0;
            }

            .step-item.completed .step-title {
              color: #9C27B0;
            }

            /* Navigation buttons */
            .form-buttons {
              display: flex;
              justify-content: space-between;
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
              background: #f0e5f4;
              color: #9C27B0;
            }

            .btn-prev:hover {
              background: #e0c5e4;
            }

            .btn-next, .btn-submit {
              background: #9C27B0;
              color: white;
              box-shadow: 0 2px 8px rgba(156,39,176,0.3);
            }

            .btn-next:hover, .btn-submit:hover {
              background: #7B1FA2;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(156,39,176,0.3);
            }

            .btn:disabled {
              background: #e0e0e0;
              color: #9e9e9e;
              cursor: not-allowed;
              transform: none;
              box-shadow: none;
              opacity: 0.7;
            }

            /* Summary styles */
            .summary-container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 20px;
              margin-top: 20px;
            }

            .summary-row {
              display: flex;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
              align-items: center;
            }

            .summary-row:last-child {
              border-bottom: none;
            }

            .summary-label {
              font-weight: 600;
              width: 30%;
              color: #555;
            }

            .summary-value {
              flex: 1;
            }

            .edit-btn {
              background: none;
              border: none;
              color: #9C27B0;
              cursor: pointer;
              padding: 5px 10px;
              font-size: 14px;
              text-decoration: underline;
            }

            .edit-btn:hover {
              color: #7B1FA2;
            }

            /* ========= Responsive Media Queries ========= */
            @media screen and (max-width: 768px) {
              form {
                padding: 12px;
                min-width: 100%;
              }
              
              .flex-row {
                flex-direction: column;
                gap: 10px;
              }
              
              .flex-row > div {
                flex: 100%;
                min-width: 100%;
                width: 100%;
              }
              
              .bold-label {
                font-size: 14px;
                margin-bottom: 6px;
              }
              
              input[type="text"],
              input[type="email"],
              input[type="tel"] {
                height: 45px;
                font-size: 13px;
              }
              
              .select-display {
                height: 45px;
                font-size: 13px;
              }
              
              .dropdown-icon {
                width: 22px;
                height: 22px;
              }
              
              .custom-option {
                padding: 10px 12px;
                font-size: 13px;
              }
              
              .option-checkbox {
                width: 16px !important;
                height: 16px !important;
              }
              
              .error-message {
                font-size: 13px;
                padding: 4px;
              }
              
              .error-icon {
                width: 20px;
                height: 20px;
                margin-right: 10px;
              }
              

              
              .step-title {
                font-size: 11px;
                top: 30px;
              }
              
              .step-icon {
                width: 26px;
                height: 26px;
                font-size: 12px;
              }
              
              .step-heading {
                font-size: 20px;
              }
              
              .btn {
                padding: 10px 15px;
                font-size: 14px;
                min-width: 100px;
              }


              
              .btn {
                width: 100%;
              }
            }

            @media screen and (max-width: 480px) {
              form {
                padding: 10px;
              }
              
              .flex-row {
                gap: 8px;
              }
              
              .bold-label {
                font-size: 13px;
                margin-bottom: 4px;
              }
              
              input[type="text"],
              input[type="email"],
              input[type="tel"] {
                height: 42px;
                font-size: 12px;
                padding: 6px;
              }
              
              .select-display {
                height: 42px;
                font-size: 12px;
                padding: 0 10px;
              }
              
              .dropdown-icon {
                width: 20px;
                height: 20px;
              }
              
              .custom-option {
                padding: 8px 10px;
                font-size: 12px;
              }
              
              .option-checkbox {
                width: 14px;
                height: 14px;
              }
              
              .error-message {
                font-size: 12px;
                padding: 3px;
              }
              
              .error-icon {
                width: 18px;
                height: 18px;
                margin-right: 8px;
              }
              
              #details {
                min-height: 80px;
                font-size: 12px;
              }
              

              
              .step-title {
                font-size: 10px;
                top: 28px;
              }
              
              .step-icon {
                width: 24px;
                height: 24px;
                font-size: 12px;
              }
              
              .step-heading {
                font-size: 18px;
              }
              
              .btn {
                padding: 8px 12px;
                font-size: 13px;
                min-width: 80px;
              }
            }
          </style>

          <!-- Step Progress Indicator -->
          <div class="progress-container">
            <div class="step-progress">
              <div class="progress-bar" id="progress-bar"></div>
              <div class="step-item active" data-step="1">
                <div class="step-icon">1</div>
                <div class="step-title">${isEnglish ? 'Contact' : 'Contact'}</div>
              </div>
              <div class="step-item" data-step="2">
                <div class="step-icon">2</div>
                <div class="step-title">${isEnglish ? 'Services' : 'Services'}</div>
              </div>
              <div class="step-item" data-step="3">
                <div class="step-icon">3</div>
                <div class="step-title">${isEnglish ? 'Message' : 'Message'}</div>
              </div>
              <div class="step-item" data-step="4">
                <div class="step-icon">4</div>
                <div class="step-title">${isEnglish ? 'Summary' : 'Résumé'}</div>
              </div>
            </div>
          </div>

          <!-- Step 1: Contact Information -->
          <div class="step-container active" id="step-1">
            <h2 class="step-heading">${isEnglish ? 'Contact Information' : 'Informations de contact'}</h2>
            
            <div class="flex-row">
              <div>
                <label for="first-name" class="bold-label">${isEnglish ? 'First Name' : 'Prénom'}</label>
                <input type="text" id="first-name" name="first-name" placeholder="${isEnglish ? 'Enter your first name' : 'Entrez votre prénom'}" required />
                <div class="error-container">
                  <div class="error-message" id="errorFirstName">
                    <div class="error-icon">!</div>
                    <span>${isEnglish ? 'First name is required.' : 'Le prénom est obligatoire.'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label for="last-name" class="bold-label">${isEnglish ? 'Last Name' : 'Nom de famille'}</label>
                <input type="text" id="last-name" name="last-name" placeholder="${isEnglish ? 'Enter your last name' : 'Entrez votre nom de famille'}" required />
                <div class="error-container">
                  <div class="error-message" id="errorLastName">
                    <div class="error-icon">!</div>
                    <span>${isEnglish ? 'Last name is required.' : 'Le nom de famille est obligatoire.'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex-row">
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
            
            <div class="form-buttons">
              <div></div>
              <button type="button" class="btn btn-next" id="step1-next">
                ${isEnglish ? 'Next' : 'Suivant'}
              </button>
            </div>
          </div>

          <!-- Step 2: Services Selection -->
          <div class="step-container" id="step-2">
            <h2 class="step-heading">${isEnglish ? 'Services Selection' : 'Sélection des services'}</h2>
            
            <div class="flex-row">
              <div class="main-container" id="serviceDropdown">
                <label class="bold-label">${isEnglish ? 'Select a Service' : 'Sélectionnez un service'}</label>
                <select id="serviceSelect" name="serviceSelect" required style="display:none;"></select>
                <div class="select-wrapper">
                  <div class="select-display" id="selectDisplayService">
                    <span>${isEnglish ? '-- Select a Service --' : '-- Sélectionnez un service --'}</span>
                    <div class="dropdown-icon" id="dropdownIconService">${SVG_CHEVRON}</div>
                  </div>
                  <div class="custom-options" id="customOptionsService"></div>
                </div>
                <div class="error-container">
                  <div class="error-message" id="errorService">
                    <div class="error-icon">!</div>
                    <span>${isEnglish ? 'You must select a service.' : 'Vous devez sélectionner un service.'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-buttons">
              <button type="button" class="btn btn-prev" id="step2-prev">
                ${isEnglish ? 'Previous' : 'Précédent'}
              </button>
              <button type="button" class="btn btn-next" id="step2-next">
                ${isEnglish ? 'Next' : 'Suivant'}
              </button>
            </div>
          </div>

          <!-- Step 3: Message Details -->
          <div class="step-container" id="step-3">
            <h2 class="step-heading">${isEnglish ? 'Message Details' : 'Détails du message'}</h2>
            
            <div class="flex-row">
              <div>
                <label for="details" class="bold-label">${isEnglish ? 'Message' : 'Message'}</label>
                <textarea id="details" name="details" placeholder="${isEnglish ? 'Write your message here...' : 'Écrivez votre message ici...'}" required></textarea>
                <div class="error-container">
                  <div class="error-message" id="errorMessage">
                    <div class="error-icon">!</div>
                    <span>${isEnglish ? 'A message is required.' : 'Un message est obligatoire.'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-buttons">
              <button type="button" class="btn btn-prev" id="step3-prev">
                ${isEnglish ? 'Previous' : 'Précédent'}
              </button>
              <button type="button" class="btn btn-next" id="step3-next">
                ${isEnglish ? 'Next' : 'Suivant'}
              </button>
            </div>
          </div>

          <!-- Step 4: Summary and Submit -->
          <div class="step-container" id="step-4">
            <h2 class="step-heading">${isEnglish ? 'Review Your Information' : 'Vérifiez vos informations'}</h2>
            
            <div class="summary-container">
              <div class="summary-row">
                <div class="summary-label">${isEnglish ? 'Full Name' : 'Nom complet'}:</div>
                <div class="summary-value" id="summary-fullname"></div>
                <button type="button" class="edit-btn" data-step="1">${isEnglish ? 'Edit' : 'Modifier'}</button>
              </div>
              <div class="summary-row">
                <div class="summary-label">Email:</div>
                <div class="summary-value" id="summary-email"></div>
                <button type="button" class="edit-btn" data-step="1">${isEnglish ? 'Edit' : 'Modifier'}</button>
              </div>
              <div class="summary-row">
                <div class="summary-label">${isEnglish ? 'Phone' : 'Téléphone'}:</div>
                <div class="summary-value" id="summary-phone"></div>
                <button type="button" class="edit-btn" data-step="1">${isEnglish ? 'Edit' : 'Modifier'}</button>
              </div>
              <div class="summary-row">
                <div class="summary-label">${isEnglish ? 'Service' : 'Service'}:</div>
                <div class="summary-value" id="summary-service"></div>
                <button type="button" class="edit-btn" data-step="2">${isEnglish ? 'Edit' : 'Modifier'}</button>
              </div>
              <div class="summary-row">
                <div class="summary-label">${isEnglish ? 'Message' : 'Message'}:</div>
                <div class="summary-value" id="summary-message"></div>
                <button type="button" class="edit-btn" data-step="3">${isEnglish ? 'Edit' : 'Modifier'}</button>
              </div>
            </div>
            
            <div class="form-buttons">
              <button type="button" class="btn btn-prev" id="step4-prev">
                ${isEnglish ? 'Previous' : 'Précédent'}
              </button>
              <button type="button" class="btn btn-submit" id="submit-button">
                ${isEnglish ? 'Submit' : 'Envoyer'}
              </button>
            </div>
          </div>
        `;
        element.appendChild(formContainer);
    
        /*************************************************************
         * Form Navigation Functions
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
         * Timer Functionality
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
          
          if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
            window.voiceflow.chat.interact({
              type: "timeEnd",
              payload: {
                message: "Time expired"
              }
            });
          }
        }
        
        /*************************************************************
         * Form Disable Function
         *************************************************************/
        function disableAllFormElements() {
          // Set cursor style to not-allowed for all interactive elements
          formContainer.querySelectorAll('button, input, select, textarea, .custom-options, .select-wrapper, .dropdown-icon').forEach(el => {
            el.disabled = true;
            el.style.cursor = "not-allowed";
          });
          
          // Disable dropdown functionality
          formContainer.querySelectorAll('.custom-options.show-options').forEach(opt => {
            opt.classList.remove('show-options');
          });
          
          formContainer.querySelectorAll('.dropdown-icon.rotate').forEach(icon => {
            icon.classList.remove('rotate');
          });
          
          formContainer.classList.add('disabled');
        }
        
        /*************************************************************
         * Custom Dropdown Initialization
         *************************************************************/
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
              customOptions.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
              this.classList.add('selected');
              selectDisplay.querySelector('span').textContent = item.name;
              nativeSelect.value = item.id;
              customOptions.classList.remove('show-options');
              dropdownIcon.classList.remove('rotate');
              
              if (onSelect) onSelect(item);
              
              const errorEl = container.querySelector(".error-message") || 
                             container.parentNode.querySelector(".error-message");
              if (errorEl) errorEl.style.display = "none";
            });
          });
          
          // Direct DOM binding for dropdown toggle
          selectDisplay.onclick = function(e) {
            e.stopPropagation();
            if (customOptions.classList.contains('show-options')) {
              customOptions.classList.remove('show-options');
              dropdownIcon.classList.remove('rotate');
            } else {
              // Close all other dropdowns first
              formContainer.querySelectorAll('.custom-options').forEach(optList => {
                if (optList !== customOptions) {
                  optList.classList.remove('show-options');
                }
              });
              
              formContainer.querySelectorAll('.dropdown-icon').forEach(icon => {
                if (icon !== dropdownIcon) {
                  icon.classList.remove('rotate');
                }
              });
              
              customOptions.classList.add('show-options');
              dropdownIcon.classList.add('rotate');
            }
          };
          
          // Close dropdown when clicking outside
          document.addEventListener('click', function(e) {
            if (!container.contains(e.target)) {
              customOptions.classList.remove('show-options');
              dropdownIcon.classList.remove('rotate');
            }
          });
        }
        
        /*************************************************************
         * Form Validation
         *************************************************************/
        function validateStep1() {
          let isValid = true;
          
          // First Name validation
          const firstName = formContainer.querySelector("#first-name").value.trim();
          if (!firstName) {
            formContainer.querySelector("#errorFirstName").style.display = "flex";
            isValid = false;
          }
          
          // Last Name validation
          const lastName = formContainer.querySelector("#last-name").value.trim();
          if (!lastName) {
            formContainer.querySelector("#errorLastName").style.display = "flex";
            isValid = false;
          }
          
          // Email validation
          const email = formContainer.querySelector("#email").value.trim();
          if (!email || !isValidEmail(email)) {
            formContainer.querySelector("#errorEmail").style.display = "flex";
            isValid = false;
          }
          
          // Phone validation
          const phone = formContainer.querySelector("#phone").value.trim();
          if (!phone || !isValidPhoneNumber(phone)) {
            formContainer.querySelector("#errorPhone").style.display = "flex";
            isValid = false;
          }
          
          return isValid;
        }
        
        function validateStep2() {
          let isValid = true;
          
          // Service validation
          const service = formContainer.querySelector("#serviceSelect").value;
          if (!service) {
            formContainer.querySelector("#errorService").style.display = "flex";
            isValid = false;
          }
          
          return isValid;
        }
        
        function validateStep3() {
          let isValid = true;
          
          // Message validation
          const message = formContainer.querySelector("#details").value.trim();
          if (!message) {
            formContainer.querySelector("#errorMessage").style.display = "flex";
            isValid = false;
          }
          
          return isValid;
        }
        
        /*************************************************************
         * Update Summary
         *************************************************************/
        function updateSummary() {
          // Contact information
          const firstName = formContainer.querySelector("#first-name").value.trim();
          const lastName = formContainer.querySelector("#last-name").value.trim();
          const email = formContainer.querySelector("#email").value.trim();
          const phone = formContainer.querySelector("#phone").value.trim();
          
          // Service
          const serviceValue = formContainer.querySelector("#serviceSelect").value;
          // Get the localized service display name
          const serviceDisplay = serviceDisplayMap[serviceValue] ? 
                               (isEnglish ? serviceDisplayMap[serviceValue].en : serviceDisplayMap[serviceValue].fr) : 
                               serviceValue;
          
          // Message
          const message = formContainer.querySelector("#details").value.trim();
          
          // Update summary values with full name instead of separate first/last name
          formContainer.querySelector("#summary-fullname").textContent = `${firstName} ${lastName}`;
          formContainer.querySelector("#summary-email").textContent = email;
          formContainer.querySelector("#summary-phone").textContent = phone;
          formContainer.querySelector("#summary-service").textContent = serviceDisplay;
          formContainer.querySelector("#summary-message").textContent = message.length > 100 ? message.substring(0, 100) + '...' : message;
        }
        
        /*************************************************************
         * Initialize Service Dropdown
         *************************************************************/
        // Service Dropdown
        const serviceOptionsData = ServiceOptions.map(service => ({ 
          id: service.value, 
          name: isEnglish ? service.label.en : service.label.fr 
        }));
        
        // Create a map to find display name from service ID
        const serviceDisplayMap = {};
        ServiceOptions.forEach(service => {
          serviceDisplayMap[service.value] = {
            en: service.label.en,
            fr: service.label.fr
          };
        });
        
        initializeCustomDropdown("serviceDropdown", 
                               isEnglish ? '-- Select a Service --' : '-- Sélectionnez un service --', 
                               serviceOptionsData, 
                               null);
        
        // Input validation event listeners
        formContainer.querySelector("#first-name").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorFirstName").style.display = "none";
        });
        
        formContainer.querySelector("#last-name").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorLastName").style.display = "none";
        });
        
        formContainer.querySelector("#email").addEventListener("input", function() {
          if (isValidEmail(this.value.trim())) formContainer.querySelector("#errorEmail").style.display = "none";
        });
        
        formContainer.querySelector("#phone").addEventListener("input", function() {
          if (isValidPhoneNumber(this.value.trim())) formContainer.querySelector("#errorPhone").style.display = "none";
        });
        
        formContainer.querySelector("#details").addEventListener("input", function() {
          if (this.value.trim()) formContainer.querySelector("#errorMessage").style.display = "none";
        });
        
        /*************************************************************
         * Navigation Setup
         *************************************************************/
        // Step 1 to Step 2
        formContainer.querySelector("#step1-next").addEventListener("click", function() {
          // Hide all error messages for this step
          formContainer.querySelectorAll("#step-1 .error-message").forEach(errorEl => {
            errorEl.style.display = "none";
          });
          
          if (validateStep1()) {
            showStep(2);
          }
        });
        
        // Step 2 navigation
        formContainer.querySelector("#step2-prev").addEventListener("click", function() {
          showStep(1);
        });
        
        formContainer.querySelector("#step2-next").addEventListener("click", function() {
          // Hide all error messages for this step
          formContainer.querySelectorAll("#step-2 .error-message").forEach(errorEl => {
            errorEl.style.display = "none";
          });
          
          if (validateStep2()) {
            showStep(3);
          }
        });
        
        // Step 3 navigation
        formContainer.querySelector("#step3-prev").addEventListener("click", function() {
          showStep(2);
        });
        
        formContainer.querySelector("#step3-next").addEventListener("click", function() {
          // Hide all error messages for this step
          formContainer.querySelectorAll("#step-3 .error-message").forEach(errorEl => {
            errorEl.style.display = "none";
          });
          
          if (validateStep3()) {
            updateSummary();
            showStep(4);
          }
        });
        
        // Step 4 navigation
        formContainer.querySelector("#step4-prev").addEventListener("click", function() {
          showStep(3);
        });
        
        // Edit buttons in summary view
        formContainer.querySelectorAll('.edit-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const stepToShow = parseInt(btn.getAttribute('data-step'));
            showStep(stepToShow);
          });
        });
        
        /*************************************************************
         * Form Submission
         *************************************************************/
        formContainer.querySelector("#submit-button").addEventListener("click", function() {
          // Collect all form data
          const firstName = formContainer.querySelector("#first-name").value.trim();
          const lastName = formContainer.querySelector("#last-name").value.trim();
          const email = formContainer.querySelector("#email").value.trim();
          const phone = formContainer.querySelector("#phone").value.trim();
          const serviceValue = formContainer.querySelector("#serviceSelect").value;
          const serviceDisplay = serviceDisplayMap[serviceValue] ? 
                               (isEnglish ? serviceDisplayMap[serviceValue].en : serviceDisplayMap[serviceValue].fr) : 
                               serviceValue;
          const message = formContainer.querySelector("#details").value.trim();
          
          // Disable form elements and update button
          const submitButton = this;
          submitButton.disabled = true;
          submitButton.textContent = isEnglish ? "Processing..." : "Traitement...";
          submitButton.style.cursor = "not-allowed";
          submitButton.style.backgroundColor = "#4CAF50";
          submitButton.style.color = "#fff";
          
          // Mark form as submitted to prevent timeout
          isFormSubmitted = true;
          if (formTimeoutId) {
            clearInterval(formTimeoutId);
          }
          
          // Prepare the submission data
          const submissionData = { 
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`, // Add fullName as a combined field
            email,
            phone: formatPhoneNumber(phone),
            service: serviceValue,
            serviceDisplay,
            message
          };
          
          // Log form data (for demonstration)
          console.log("Form Data Submitted:", submissionData);
          
          // Send data to Voiceflow if available
          if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
            window.voiceflow.chat.interact({ 
              type: "success",
              payload: submissionData,
            });
          }
          
          // Disable all form elements
          disableAllFormElements();
          submitButton.textContent = isEnglish ? "Submitted!" : "Soumis!";
        });
        
        // Start the form timer
        startFormTimer();
        
        // Initialize progress bar
        updateProgressBar();
      }
    };
    
/************** EXTENSION #12: RescheduleCalendarExtension **************/
    const RescheduleCalendarExtension = {
  name: 'RescheduleCalendar',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_reschedule_calendar' || trace.payload?.name === 'ext_reschedule_calendar',
  render: async ({ trace, element }) => {
    // Add SVG chevron constant at the top like in booking extension
    const SVG_CHEVRON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
      <g transform="translate(75, 75)">
        <path fill="#9C27B0" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
      </g>
    </svg>`;
    
    // --- Extract required payload values with fallbacks ---
    const {
      email = "john@example.com",
      ServiceName = "AI Agent",
      apiKey = "",
      startTime = "4/11/2025, 3:00:00 PM",
      scheduleId = "",
      eventTypeId = "1",
      eventTypeSlug = "default-event",
      slots = {},
      selectedDate = '', 
      selectedTime = '',
      language = 'en',
      timezone = 'America/Toronto',
      uid = ""
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
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  color: #333;
  animation: fadeIn 0.3s ease-out forwards;
  border: 1px solid #eaeaea;
  transition: all 0.3s ease;
  position: relative;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background-color: #9C27B029;
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
  box-shadow: 0 3px 10px #9C27B026;
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
  padding: 15px 0px;
  position: relative;
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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='80' height='80'%3E%3Cpath d='M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z' fill='#9C27B008'/%3E%3C/svg%3E");
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
  box-shadow: 0 0 0 1px #9C27B01a;
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
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 4px 12px #9C27B026;
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
  padding: 20px 0px;
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
  background: #9C27B00d;
  border-radius: 10px;
}
.times-container::-webkit-scrollbar-thumb {
  background: #9C27B033;
  border-radius: 10px;
}
.times-container::-webkit-scrollbar-thumb:hover {
  background: #9C27B033;
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
  padding: 14px 8px;
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
  width: 60%;
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
  box-shadow: 0 4px 15px #9C27B026;
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
  box-shadow: 0 6px 18px #9C27B026;
}
.confirm-btn:hover:not(:disabled)::before {
  animation: shimmer 1.5s infinite;
}
.confirm-btn:active:not(:disabled) {
  box-shadow: 0 2px 10px #9C27B026;
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
  border-radius: 10px 10px 0px 10px;
  border: 1px solid #ccc;
  font-family: inherit;
  min-height: 60px;
  transition: border 0.2s ease;
}
.reschedule-reason textarea:focus {
  border: 2px solid #9C27B0;
  outline: none;
}
.error-message {
  color: #9C27B0;
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

/* IMPROVED MOBILE RESPONSIVE STYLES */
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
  
  .current-date {
    font-size: 14px;
    padding: 5px 10px;
  }
  
  /* Make calendar grid more compact */
  .weekdays {
    font-size: 11px;
    padding: 10px 0 5px;
  }
  
  /* Adjust animation for mobile */
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
  
  /* Better touch targets for mobile */
  .time-slot {
    padding: 12px 8px;
    min-width: 70px;
    margin: 0 auto;
    width: 60%;
  }
  
  /* Keep AM/PM columns side by side even on small screens */
  .time-slots-columns {
    gap: 10px;
  }
  
  .time-slots-column {
    min-width: 0;
    width: calc(50% - 5px);
  }
}

/* Additional breakpoint for very small screens */
@media (max-width: 480px) {
  .calendar-container {
    border-radius: 10px;
  }
  
  .calendar-header {
    padding: 12px 15px;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .calendar-nav {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    justify-content: center;
  }
  
  .day {
    height: 35px;
    width: 35px;
    font-size: 12px;
  }
  
  .provider-icon, .service-icon, .appointment-icon {
    width: 16px;
    height: 16px;
  }
  
  .service-provider, .service-name, .appointment-date {
    font-size: 13px;
    height: 20px;
    line-height: 20px;
  }
  
  .time-slot {
    padding: 10px 4px;
    font-size: 13px;
  }
  
  /* Keep AM/PM side-by-side but adjust sizes */
  .time-slots-column {
    min-width: 0;
    width: calc(50% - 5px);
  }
  
  .time-slots-columns {
    gap: 10px;
    display: flex;
    flex-direction: row;
  }
  
  /* Fix footer on small screens */
  .calendar-footer {
    padding: 12px 10px;
  }
  
  .confirm-btn {
    width: 100%;
    padding: 12px 16px;
    font-size: 13px;
  }
  
  /* Reduce the textarea size */
  .reschedule-reason {
    padding: 15px 10px;
  }
  
  .reschedule-reason textarea {
    min-height: 50px;
  }
}

/* Tap state for mobile devices */
@media (hover: none) {
  .day:active:not(.inactive):not(.active) {
    background-color: #F8EAFA;
    color: #9C27B0;
    border: 2px solid #9C27B0;
  }
  
  .time-slot.available:active:not(.selected) {
    background-color: #F8EAFA;
    color: #9C27B0;
    border: 2px solid #9C27B0;
  }
  
  .confirm-btn:active:not(:disabled) {
    background: #9C27B0;
    color: white;
  }
}

#details {
  resize: vertical;
  min-height: 100px;
  max-height: 200px;
  border-radius: 10px 10px 0px 10px;
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
      try {
        const url = `https://api.cal.com/v2/bookings/${uid}/reschedule`;
        const body = {
          rescheduledBy: email,
          reschedulingReason: reason,
          start: startTimeISO
        };
        
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
      const date = new Date(dateTimeString);
      
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
      
      // Replace the comma or add "at"/"à" between date and time
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
        </span>
        <span>${ServiceName}</span>
      `;
      
      const appointmentDateDiv = document.createElement("div");
      appointmentDateDiv.className = "appointment-date";
      
      // Add calendar icon
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
      titleContent.appendChild(appointmentDateDiv);
      
      calendarTitle.appendChild(titleContent);
      
      // Calendar navigation section
      const calendarNav = document.createElement("div");
      calendarNav.className = "calendar-nav";
      
      const currentDateEl = document.createElement("div");
      currentDateEl.className = "current-date";
      currentDateEl.textContent = dateFormatter.format(state.currentDate);
      
      const prevBtn = document.createElement("button");
      prevBtn.className = "nav-btn prev-btn";
      prevBtn.innerHTML = `<div style="transform: rotate(90deg) translateY(2px);">${SVG_CHEVRON}</div>`;
      prevBtn.addEventListener("click", () => {
        if (!state.isConfirmed) {
          state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 1);
          renderCalendar();
        }
      });
      
      const nextBtn = document.createElement("button");
      nextBtn.className = "nav-btn next-btn";
      nextBtn.innerHTML = `<div style="transform: rotate(-90deg) translateY(2px);">${SVG_CHEVRON}</div>`;
      nextBtn.addEventListener("click", () => {
        if (!state.isConfirmed) {
          state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 1);
          renderCalendar();
        }
      });
      
      calendarNav.appendChild(prevBtn);
      calendarNav.appendChild(currentDateEl);
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
          // We won't reset the border color here when typing
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
                
                box-shadow: 0 3px 10px #9C27B026;
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
                box-shadow: 0 10px 30px #9C27B026;
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
                      type: "success",
                      payload: { 
                        email,
                        date: dateStr,
                        time: state.selectedTime,
                        formattedDate,
                        formattedTime,
                        formattedDateTime,
                        reschedulingReason: reasonText,
                        uid: uid
                      },
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
    
    // Improved resize handler with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        container.style.width = window.innerWidth <= 768 ? "100%" : "800px";
        renderCalendar();
      }, 250);
    });
    
    // Check if touch events are supported
    const isTouchDevice = ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0) || 
                          (navigator.msMaxTouchPoints > 0);
    
    if (isTouchDevice) {
      // Add touch-specific class to improve mobile experience
      calendarContainer.classList.add('touch-device');
    }
	  startFormTimer();
  }
};

/************** EXTENSION #13: CancellationCalendarExtension **************/
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
        const locale = language === "fr" ? "fr-CA" : "en-US";
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
            box-shadow: 0 10px 25px #9C27B026;
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
		  #details {
      resize: vertical;
      min-height: 100px;
      max-height: 200px;
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
            box-shadow: 0 4px 15px #9C27B026;
            position: relative;
            overflow: hidden;
            transition: all 0.3s;
          }
          .confirm-btn:hover:not(:disabled) {
            background: #9C27B0;
            color: white;
            box-shadow: 0 6px 18px #9C27B026;
          }
          .confirm-btn:active:not(:disabled) {
            box-shadow: 0 2px 10px #9C27B026;
          }
          .confirm-btn:disabled {
            cursor: not-allowed;
            box-shadow: none;
          }
          .success-overlay {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-color: #9C27B00d;
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
            box-shadow: 0 10px 30px #9C27B026;
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
          const dateFormatter = new Intl.DateTimeFormat(locale, {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'//,
              //timeZone: timezone
            });
            const timeFormatter = new Intl.DateTimeFormat(locale, {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false//,
              //timeZone: timezone
            });
            const datePart = dateFormatter.format(startDate);
            let startTime = timeFormatter.format(startDate).replace(":", "h");
            let endTime = timeFormatter.format(endDate).replace(":", "h");
            return `${datePart} de ${startTime} à ${endTime}`;
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
            background-color: #9C27B00d;
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
            box-shadow: 0 10px 30px #9C27B026;
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
                  type: "success",
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



    
// Expose the extension for Voiceflow
window.SubmissionFormExtension = SubmissionFormExtension;
window.BookingDirectExtension = BookingDirectExtension;
window.BookingCalendarExtension = BookingCalendarExtension;
window.BookingFormExtension = BookingFormExtension;
window.BookingInfoFormExtension = BookingInfoFormExtension;
window.ContactFormExtension = ContactFormExtension;
window.RescheduleCalendarExtension = RescheduleCalendarExtension;
window.CancellationCalendarExtension = CancellationCalendarExtension;
