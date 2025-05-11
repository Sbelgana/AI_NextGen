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


    // Define the info button styles globally
    const infoButtonStyles = `
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

    `;

    function addInfoButtonStyles() {
      const styleEl = document.createElement('style');
      styleEl.textContent = infoButtonStyles;
      document.head.appendChild(styleEl);
    }

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

    // URL du webhook Make - Remplacez par votre URL réelle
    const WEBHOOK_URL = "https://hook.us2.make.com/va34lvxwhhcbp3iojevheqivo2ybbxua";

    /*************************************************************
     * 3) ChatbotFormExtension - MAIN EXTENSION OBJECT
     *************************************************************/
    const EXT_CHATBOT_FORM = "ext_chatbot_form";

    const ChatbotFormExtension = {
      name: "ChatbotForm",
      type: "response",
      match: ({ trace }) => trace.type === EXT_CHATBOT_FORM || trace.payload?.name === EXT_CHATBOT_FORM,
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
        
        // Load saved data if available
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
  document.getElementById('form-options').style.display = formValues.useForm === 'yes' ? 'block' : 'none';
  document.getElementById('crm-selection').style.display = formValues.useCRM === 'yes' ? 'block' : 'none';
  document.getElementById('social-platforms-group').style.display = formValues.needSocialBot === 'yes' ? 'block' : 'none';
  document.getElementById('need-booking-options').style.display = formValues.hasBookingSystem === 'no' ? 'block' : 'none';
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
          if (processedData.currentLanguages && Array.isArray(processedData.currentLanguages) && processedData.currentLanguages.length > 0) {
            const currentLanguageNames = processedData.currentLanguages.map(langId => {
              const lang = localFormData.currentLanguages.find(l => l.id === langId);
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
        
        // Fonction pour obtenir les traductions
        function getText(key) {
          return translations[currentLanguage][key] || key;
        }
        
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
    
    /* ========== Form Layout & Containers ========== */
    form.chatbot-form {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 800px;
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
    
    // Function to set up real-time validation for input fields
function setupRealTimeValidation() {
  // Text inputs validation
  document.getElementById('first-name').addEventListener('input', function() {
    formValues.firstName = this.value.trim();
    if (this.value.trim()) {
      hideError('error-firstname');
    }
    saveFormData();
  });
  
  document.getElementById('last-name').addEventListener('input', function() {
    formValues.lastName = this.value.trim();
    if (this.value.trim()) {
      hideError('error-lastname');
    }
    saveFormData();
  });
  
  document.getElementById('email').addEventListener('input', function() {
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
  
  document.getElementById('phone').addEventListener('input', function() {
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
  
  document.getElementById('description').addEventListener('input', function() {
    formValues.description = this.value.trim();
    if (this.value.trim()) {
      hideError('error-description');
    }
    document.getElementById('description-counter').textContent = this.value.length;
    saveFormData();
  });
  
  document.getElementById('other-niche').addEventListener('input', function() {
    formValues.otherNiche = this.value.trim();
    if (this.value.trim()) {
      hideError('error-other-niche');
    }
    saveFormData();
  });
  
  document.getElementById('custom-budget').addEventListener('input', function() {
    formValues.customBudget = this.value.trim();
    if (this.value.trim()) {
      hideError('error-custom-budget');
    }
    saveFormData();
  });
  
  document.getElementById('services').addEventListener('input', function() {
    formValues.services = this.value.trim();
    if (this.value.trim()) {
      hideError('error-services');
    }
    document.getElementById('services-counter').textContent = this.value.length;
    saveFormData();
  });
  
  document.getElementById('website-url').addEventListener('input', function() {
    formValues.websiteUrl = this.value.trim();
    saveFormData();
  });
  
  document.getElementById('other-platform').addEventListener('input', function() {
    formValues.otherPlatform = this.value.trim();
    if (this.value.trim()) {
      hideError('error-other-platform');
    }
    saveFormData();
  });
}

function setupRadioButtonValidation() {
  // Lead capture radio buttons
  document.querySelectorAll('input[name="leadCapture"]').forEach(radio => {
    radio.addEventListener('change', function() {
      hideError('error-lead-capture');
      formValues.leadCapture = this.value;
      saveFormData();
    });
  });
  
  // Lead qualification radio buttons
  document.querySelectorAll('input[name="leadQualification"]').forEach(radio => {
    radio.addEventListener('change', function() {
      hideError('error-lead-qualification');
      formValues.leadQualification = this.value;
      saveFormData();
    });
  });
  
  // Conversation summary radio buttons
  document.querySelectorAll('input[name="conversationSummary"]').forEach(radio => {
    radio.addEventListener('change', function() {
      hideError('error-conversation-summary');
      formValues.conversationSummary = this.value;
      saveFormData();
    });
  });
  
  // Use form radio buttons
  // In the radio button change handler for useForm
document.querySelectorAll('input[name="useForm"]').forEach(radio => {
  radio.addEventListener('change', function() {
    const formOptions = document.getElementById('form-options');
    const formTypesDropdown = document.getElementById('formTypesDropdown');
    const formPurpose = document.getElementById('form-purpose-group'); // Add this wrapper div
    
    if (this.value === 'yes') {
      formOptions.style.display = 'block';
      formTypesDropdown.style.display = 'block';
      formPurpose.style.display = 'block';
    } else {
      formOptions.style.display = 'none';
      formTypesDropdown.style.display = 'none';
      formPurpose.style.display = 'none';
    }
  });
});
  
  // Has website radio buttons
  document.querySelectorAll('input[name="hasWebsite"]').forEach(radio => {
    radio.addEventListener('change', function() {
      hideError('error-has-website');
      const websiteOptions = document.getElementById('website-options');
      websiteOptions.style.display = this.value === 'yes' ? 'block' : 'none';
      formValues.hasWebsite = this.value;
      saveFormData();
    });
  });
  
  // Use CRM radio buttons
  // In the radio button change handler for useCRM
document.querySelectorAll('input[name="useCRM"]').forEach(radio => {
  radio.addEventListener('change', function() {
    const crmSelection = document.getElementById('crm-selection');
    if (this.value === 'yes') {
      crmSelection.style.display = 'block';
    } else {
      crmSelection.style.display = 'none';
    }
  });
});
  
  // Has booking system radio buttons
  // Modify the booking system radio button handler
// Booking System Recommendation Toggle
document.querySelectorAll('input[name="hasBookingSystem"]').forEach(radio =>
  radio.addEventListener('change', e =>
    document
      .getElementById('need-booking-options')
      .classList.toggle('visible', e.target.value === 'no')
  )
);
  
  // Use database radio buttons
  document.querySelectorAll('input[name="useDatabase"]').forEach(radio => {
    radio.addEventListener('change', function() {
      hideError('error-use-database');
      const databaseSelection = document.getElementById('database-selection');
      databaseSelection.style.display = this.value === 'yes' ? 'block' : 'none';
      formValues.useDatabase = this.value;
      saveFormData();
    });
  });
  
  // Need social bot radio buttons
  // In the radio button change handler for needSocialBot
// Social Media Integration Toggle
document.querySelectorAll('input[name="needSocialBot"]').forEach(radio =>
  radio.addEventListener('change', e =>
    document
      .getElementById('social-platforms-group')
      .classList.toggle('visible', e.target.value === 'yes')
  )
);
  
  // Language type radio buttons
  document.querySelectorAll('input[name="languageType"]').forEach(radio => {
    radio.addEventListener('change', function() {
      hideError('error-language-type');
      // Existing language type change handler code remains the same
    });
  });
}
    
    /*************************************************************
     * Translation Functions
     *************************************************************/
    function updateAllTexts() {
      // Get the updated form data based on current language
      formData = createFormData(currentLanguage);
      
      // Step progress indicators
      document.getElementById('progress-step1').textContent = getText('step1Title');
      document.getElementById('progress-step2').textContent = getText('step2Title');
      document.getElementById('progress-step3').textContent = getText('step3Title');
      document.getElementById('progress-step4').textContent = getText('step4Title');
      document.getElementById('progress-step5').textContent = getText('step5Title');
      document.getElementById('progress-step6').textContent = getText('step6Title');
      document.getElementById('progress-step7').textContent = getText('step7Title');
      document.getElementById('progress-step8').textContent = getText('step8Title');
      document.getElementById('progress-step9').textContent = getText('step9Title');
      
      // Step headings
      document.getElementById('step1-heading').textContent = getText('step1Title');
      document.getElementById('step2-heading').textContent = getText('step2Title');
      document.getElementById('step3-heading').textContent = getText('step3Title');
      document.getElementById('step4-heading').textContent = getText('step4Title');
      document.getElementById('step5-heading').textContent = getText('step5Title');
      document.getElementById('step6-heading').textContent = getText('step6Title');
      document.getElementById('step7-heading').textContent = getText('step7Title');
      document.getElementById('step8-heading').textContent = getText('step8Title');
      document.getElementById('step9-heading').textContent = getText('step9Title');
      
      // Confirmation screen
      document.getElementById('confirmation-title').textContent = getText('confirmationTitle');
      document.getElementById('confirmation-message').textContent = getText('confirmationMessage');
      document.getElementById('back-to-form').textContent = getText('backToForm');
      
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
      if (document.getElementById('multilingual-label')) {
        document.getElementById('multilingual-label').textContent = getText('multilingual');
      }
      if (document.getElementById('unilingual-label')) {
        document.getElementById('unilingual-label').textContent = getText('unilingual');
      }
    }
    
    function updateStep1Labels() {
      document.getElementById('firstname-label').textContent = getText('firstName');
      document.getElementById('lastname-label').textContent = getText('lastName');
      document.getElementById('email-label').textContent = getText('email');
      document.getElementById('phone-label').textContent = getText('phone');
      document.getElementById('company-label').textContent = getText('companyOptional');
      
      // Placeholders
      document.getElementById('first-name').placeholder = `${getText('firstName')}...`;
      document.getElementById('last-name').placeholder = `${getText('lastName')}...`;
      document.getElementById('email').placeholder = `${getText('email')}...`;
      document.getElementById('phone').placeholder = `${getText('phone')}...`;
      document.getElementById('company').placeholder = `${getText('company')}...`;
      
      // Error messages
      document.getElementById('error-firstname').textContent = getText('fieldRequired');
      document.getElementById('error-lastname').textContent = getText('fieldRequired');
      document.getElementById('error-email').textContent = getText('enterValidEmail');
      document.getElementById('error-phone').textContent = getText('enterValidPhone');
    }
    
    function updateStep2Labels() {
      document.getElementById('niche-label').textContent = getText('selectNiche');
      document.getElementById('other-niche-label').textContent = getText('otherNicheSpecify');
      document.getElementById('budget-label').textContent = getText('budgetQuestion');
      document.getElementById('custom-budget-label').textContent = getText('customBudgetQuestion');
      document.getElementById('description-label').textContent = getText('projectDescription');
      
      // Placeholders
      document.getElementById('other-niche').placeholder = `${getText('otherNicheSpecify')}...`;
      document.getElementById('description').placeholder = getText('projectDescriptionPlaceholder');
      document.getElementById('custom-budget').placeholder = `${getText('customBudgetQuestion')}...`;
      
      // Error messages
      document.getElementById('error-niche').textContent = getText('fieldRequired');
      document.getElementById('error-other-niche').textContent = getText('fieldRequired');
      document.getElementById('error-budget').textContent = getText('fieldRequired');
      document.getElementById('error-custom-budget').textContent = getText('fieldRequired');
      document.getElementById('error-description').textContent = getText('fieldRequired');
    }
    
    function updateStep3Labels() {
      document.getElementById('team-size-question').textContent = getText('teamSizeQuestion');
      document.getElementById('services-label').textContent = getText('servicesQuestion');
      
      // Placeholders
      document.getElementById('services').placeholder = getText('servicesPlaceholder');
      
      // Error messages
      document.getElementById('error-team-size').textContent = getText('fieldRequired');
      document.getElementById('error-services').textContent = getText('fieldRequired');
    }
    
    function updateStep4Labels() {
      document.getElementById('lead-capture-question').textContent = getText('leadCaptureQuestion');
      document.getElementById('lead-qualification-question').textContent = getText('leadQualificationQuestion');
      document.getElementById('conversation-summary-question').textContent = getText('conversationSummaryQuestion');
      
      // Error messages
      document.getElementById('error-lead-capture').textContent = getText('fieldRequired');
      document.getElementById('error-lead-qualification').textContent = getText('fieldRequired');
      document.getElementById('error-conversation-summary').textContent = getText('fieldRequired');
    }
    
    function updateStep5Labels() {
      document.getElementById('use-form-question').textContent = getText('useFormQuestion');
      document.getElementById('form-types-label').textContent = getText('selectFormTypes');
      document.getElementById('form-purpose-label').textContent = getText('formPurposeQuestion');
      
      // Placeholders
      document.getElementById('form-purpose').placeholder = getText('formPurposePlaceholder');
      
      // Error messages
      document.getElementById('error-use-form').textContent = getText('fieldRequired');
      document.getElementById('error-form-types').textContent = getText('selectAtLeastOne');
    }
    
    function updateStep6Labels() {
      document.getElementById('website-question').textContent = getText('websiteQuestion');
      document.getElementById('platform-label').textContent = getText('selectPlatform');
      document.getElementById('other-platform-label').textContent = getText('other');
      document.getElementById('website-url-label').textContent = getText('websiteUrlLabel');
      document.getElementById('website-traffic-label').textContent = getText('websiteTrafficLabel');
      
      // Placeholders
      document.getElementById('other-platform').placeholder = `${getText('other')}...`;
      document.getElementById('website-url').placeholder = "https://www.example.com";
      
      // Error messages
      document.getElementById('error-has-website').textContent = getText('fieldRequired');
      document.getElementById('error-platform').textContent = getText('fieldRequired');
      document.getElementById('error-other-platform').textContent = getText('fieldRequired');
      document.getElementById('error-website-url').textContent = getText('fieldRequired');
      document.getElementById('error-website-traffic').textContent = getText('fieldRequired');
    }
    
    function updateStep7Labels() {
      document.getElementById('use-crm-question').textContent = getText('useCRMQuestion');
      document.getElementById('yes-label').textContent = getText('yes');
      document.getElementById('no-label').textContent = getText('no');
      document.getElementById('crm-select-label').textContent = getText('selectCRMs');
      
      document.getElementById('has-booking-question').textContent = getText('hasBookingQuestion');
      document.getElementById('booking-select-label').textContent = getText('selectBookingSystems');
      document.getElementById('handle-cancellation-question').textContent = getText('handleCancellationQuestion');
      document.getElementById('want-booking-recommendation').textContent = getText('wantBookingRecommendation');
      
      document.getElementById('use-database-question').textContent = getText('useDatabaseQuestion');
      document.getElementById('database-select-label').textContent = getText('selectDatabases');
      
      // Error messages
      document.getElementById('error-use-crm').textContent = getText('fieldRequired');
      document.getElementById('error-crms').textContent = getText('selectAtLeastOne');
      document.getElementById('error-has-booking').textContent = getText('fieldRequired');
      document.getElementById('error-booking-systems').textContent = getText('selectAtLeastOne');
      document.getElementById('error-use-database').textContent = getText('fieldRequired');
      document.getElementById('error-databases').textContent = getText('selectAtLeastOne');
    }
    
    function updateStep8Labels() {
      document.getElementById('social-bot-question').textContent = getText('needSocialBotQuestion');
      document.getElementById('social-platforms-label').textContent = getText('selectSocialPlatforms');
      
      document.getElementById('language-type-question').textContent = getText('languageTypeQuestion');
      document.getElementById('multilingual-label').textContent = getText('multilingual');
      document.getElementById('unilingual-label').textContent = getText('unilingual');
      
      const languageSelectLabel = document.getElementById('language-select-label');
      if (languageSelectLabel) {
        const isMultilingual = formValues.languageType === 'multilingual';
        languageSelectLabel.textContent = isMultilingual ? getText('selectLanguages') : getText('selectLanguage');
      }
      
      // Error messages
      document.getElementById('error-need-social').textContent = getText('fieldRequired');
      document.getElementById('error-social-platforms').textContent = getText('selectAtLeastOne');
      document.getElementById('error-language-type').textContent = getText('fieldRequired');
      document.getElementById('error-languages').textContent = getText('selectAtLeastOne');
    }
    
    function updateStep9Labels() {
      document.getElementById('step9-heading').textContent = getText('recapTitle');
      
      // Recap sections
      document.getElementById('recap-contact-heading').textContent = getText('recapContact');
      document.getElementById('recap-project-heading').textContent = getText('recapProject');
      document.getElementById('recap-business-heading').textContent = getText('recapBusiness');
      document.getElementById('recap-features-heading').textContent = getText('recapFeatures');
      document.getElementById('recap-forms-heading').textContent = getText('recapForms');
      document.getElementById('recap-website-heading').textContent = getText('recapWebsite');
      document.getElementById('recap-integrations-heading').textContent = getText('recapIntegrations');
      document.getElementById('recap-channels-heading').textContent = getText('recapChannels');
      
      // Edit buttons
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.textContent = getText('edit');
      });
      
      // Labels
      document.getElementById('recap-name-label').textContent = getText('firstName') + ' / ' + getText('lastName');
      document.getElementById('recap-email-label').textContent = getText('email');
      document.getElementById('recap-phone-label').textContent = getText('phone');
      document.getElementById('recap-company-label').textContent = getText('company');
      
      document.getElementById('recap-niche-label').textContent = getText('selectNiche');
      document.getElementById('recap-budget-label').textContent = getText('budgetQuestion');
      document.getElementById('recap-description-label').textContent = getText('projectDescription');
      
      document.getElementById('recap-team-size-label').textContent = getText('teamSizeQuestion');
      document.getElementById('recap-services-label').textContent = getText('servicesQuestion');
      
      document.getElementById('recap-leads-label').textContent = getText('leadCaptureQuestion');
      
      document.getElementById('recap-forms-label').textContent = getText('useFormQuestion');
      
      document.getElementById('recap-has-website-label').textContent = getText('websiteQuestion');
      document.getElementById('recap-platform-label').textContent = getText('selectPlatform');
      document.getElementById('recap-website-url-label').textContent = getText('websiteUrlLabel');
      document.getElementById('recap-website-traffic-label').textContent = getText('websiteTrafficLabel');

      
      document.getElementById('recap-crm-label').textContent = getText('useCRMQuestion');
      document.getElementById('recap-booking-label').textContent = getText('hasBookingQuestion');
      document.getElementById('recap-database-label').textContent = getText('useDatabaseQuestion');
      
      document.getElementById('recap-social-label').textContent = getText('needSocialBotQuestion');
      document.getElementById('recap-language-type-label').textContent = getText('languageTypeQuestion');
      document.getElementById('recap-languages-label').textContent = getText('selectLanguages');
      
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
      const select = document.getElementById(selectId);
      const customOptions = document.getElementById(customOptionsId);
      const display = document.getElementById(displayId);
      const icon = document.getElementById(iconId);
      
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
            document.getElementById('other-platform-group').style.display = 'block';
          } else if (selectId === 'website-platform') {
            document.getElementById('other-platform-group').style.display = 'none';
          }
          
          if (selectId === 'niche' && option.id === 'other') {
            document.getElementById('other-niche-group').style.display = 'block';
          } else if (selectId === 'niche') {
            document.getElementById('other-niche-group').style.display = 'none';
          }
          
          if (selectId === 'budget' && option.id === 'custom') {
            document.getElementById('custom-budget-group').style.display = 'block';
          } else if (selectId === 'budget') {
            document.getElementById('custom-budget-group').style.display = 'none';
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
        document.querySelectorAll('.custom-options').forEach(opt => {
          if (opt !== customOptions) opt.classList.remove('show-options');
        });
        
        document.querySelectorAll('.dropdown-icon').forEach(icn => {
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
          document.getElementById('other-platform-group').style.display = 'block';
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
          document.getElementById('other-niche-group').style.display = 'block';
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
          document.getElementById('custom-budget-group').style.display = 'block';
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
      const select = document.getElementById(selectId);
      const customOptions = document.getElementById(customOptionsId);
      const display = document.getElementById(displayId);
      const icon = document.getElementById(iconId);
      
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
        document.querySelectorAll('.custom-options').forEach(opt => {
          if (opt !== customOptions) opt.classList.remove('show-options');
        });
        
        document.querySelectorAll('.dropdown-icon').forEach(icn => {
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
        document.querySelectorAll('.custom-options').forEach(opt => {
          opt.classList.remove('show-options');
        });
        
        document.querySelectorAll('.dropdown-icon').forEach(icon => {
          icon.classList.remove('rotate');
        });
      }
    });
    
    /*************************************************************
     * Form Validation Functions
     *************************************************************/
    function validateStep1() {
      let isValid = true;
      
      // Validate first name
      const firstName = document.getElementById('first-name').value.trim();
      if (!firstName) {
        showError('error-firstname', 'firstNameRequired');
        isValid = false;
      } else {
        hideError('error-firstname');
        formValues.firstName = firstName;
      }
      
      // Validate last name
      const lastName = document.getElementById('last-name').value.trim();
      if (!lastName) {
        showError('error-lastname', 'lastNameRequired');
        isValid = false;
      } else {
        hideError('error-lastname');
        formValues.lastName = lastName;
      }
      
      // Validate email
      const email = document.getElementById('email').value.trim();
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
      
      // Validate phone
      const phone = document.getElementById('phone').value.trim();
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
      
      // Get company (optional)
      const company = document.getElementById('company').value.trim();
      formValues.company = company;
      
      return isValid;
    }
    
    function validateStep2() {
      let isValid = true;
      
      // Validate niche
      const niche = document.getElementById('niche').value;
      if (!niche) {
        showError('error-niche', 'nicheRequired');
        isValid = false;
      } else {
        hideError('error-niche');
        formValues.niche = niche;
        
        // Validate other niche if selected
        if (niche === 'other') {
          const otherNiche = document.getElementById('other-niche').value.trim();
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
      const budget = document.getElementById('budget').value;
      if (!budget) {
        showError('error-budget', 'budgetRequired');
        isValid = false;
      } else {
        hideError('error-budget');
        formValues.budget = budget;
        
        // Validate custom budget if selected
        if (budget === 'custom') {
          const customBudget = document.getElementById('custom-budget').value.trim();
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
      const description = document.getElementById('description').value.trim();
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
      const teamSize = document.getElementById('team-size').value;
      if (!teamSize) {
        showError('error-team-size', 'teamSizeRequired');
        isValid = false;
      } else {
        hideError('error-team-size');
        formValues.teamSize = teamSize;
      }
      
      // Validate services
      const services = document.getElementById('services').value.trim();
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
          const websitePlatform = document.getElementById('website-platform').value;
          if (!websitePlatform) {
            showError('error-platform', 'platformRequired');
            isValid = false;
          } else {
            hideError('error-platform');
            formValues.websitePlatform = websitePlatform;
            
            // Validate other platform if selected
            if (websitePlatform === 'other') {
              const otherPlatform = document.getElementById('other-platform').value.trim();
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
          const websiteUrl = document.getElementById('website-url').value.trim();
          if (!websiteUrl) {
            showError('error-website-url', 'websiteUrlRequired');
            isValid = false;
          } else {
            hideError('error-website-url');
            formValues.websiteUrl = websiteUrl;
          }
          
          // Validate website traffic
          const websiteTraffic = document.getElementById('website-traffic').value;
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
          const bookingSystem = document.getElementById('bookingSystemsSelect').value;
          
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
          const crmsSelect = document.getElementById('crmsSelect');
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
          const databasesSelect = document.getElementById('databasesSelect');
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
          const socialPlatformsSelect = document.getElementById('socialPlatformsSelect');
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
          const languagesSelect = document.getElementById('languagesSelect');
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
          const selectedLanguage = document.getElementById('languagesSelect').value;
          
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
      document.getElementById('recap-name').textContent = `${formValues.firstName} ${formValues.lastName}`;
      document.getElementById('recap-email').textContent = formValues.email;
      document.getElementById('recap-phone').textContent = formValues.phone;
      
      if (formValues.company) {
        document.getElementById('recap-company').textContent = formValues.company;
        document.getElementById('recap-company-row').style.display = 'flex';
      } else {
        document.getElementById('recap-company-row').style.display = 'none';
      }
      
      // Project Details
      let nicheText = '';
      if (formValues.niche === 'other' && formValues.otherNiche) {
        nicheText = formValues.otherNiche;
      } else {
        const niche = localFormData.niches.find(n => n.id === formValues.niche);
        nicheText = niche ? niche.name : formValues.niche;
      }
      document.getElementById('recap-niche').textContent = nicheText;
      
      let budgetText = '';
      if (formValues.budget === 'custom' && formValues.customBudget) {
        budgetText = formValues.customBudget;
      } else {
        const budget = localFormData.budgetRanges.find(b => b.id === formValues.budget);
        budgetText = budget ? budget.name : formValues.budget;
      }
      document.getElementById('recap-budget').textContent = budgetText;
      
      document.getElementById('recap-description').textContent = formValues.description;
      
      // Business Profile
      let teamSizeText = '';
      switch (formValues.teamSize) {
        case 'solo': teamSizeText = getText('solo'); break;
        case 'small': teamSizeText = getText('smallTeam'); break;
        case 'medium': teamSizeText = getText('mediumTeam'); break;
        case 'large': teamSizeText = getText('largeTeam'); break;
      }
      document.getElementById('recap-team-size').textContent = teamSizeText;
      
      document.getElementById('recap-services').textContent = formValues.services;
      
      // Features
      let leadsText = '';
      leadsText += `${getText('leadCaptureQuestion')}: ${formValues.leadCapture === 'yes' ? getText('yes') : getText('no')}\n`;
      leadsText += `${getText('leadQualificationQuestion')}: ${formValues.leadQualification === 'yes' ? getText('yes') : getText('no')}\n`;
      leadsText += `${getText('conversationSummaryQuestion')}: ${formValues.conversationSummary === 'yes' ? getText('yes') : getText('no')}`;
      document.getElementById('recap-leads').innerHTML = leadsText.replace(/\n/g, '<br>');
      
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
      document.getElementById('recap-forms').textContent = formsText;
      
      // Website
      document.getElementById('recap-has-website').textContent = formValues.hasWebsite === 'yes' ? getText('yes') : getText('no');

      if (formValues.hasWebsite === 'yes' && formValues.websitePlatform) {
        document.getElementById('recap-platform-row').style.display = 'flex';
        
        let platformText = '';
        if (formValues.websitePlatform === 'other' && formValues.otherPlatform) {
          platformText = formValues.otherPlatform;
        } else {
          const platform = localFormData.websitePlatforms.find(p => p.id === formValues.websitePlatform);
          platformText = platform ? platform.name : formValues.websitePlatform;
        }
        document.getElementById('recap-platform').textContent = platformText;
        
        // Add website URL to summary
        document.getElementById('recap-website-url-row').style.display = 'flex';
        document.getElementById('recap-website-url').textContent = formValues.websiteUrl || '(non spécifié)';
        
        // Add this block for website traffic
        document.getElementById('recap-website-traffic-row').style.display = 'flex';
        const traffic = localFormData.websiteTraffic.find(t => t.id === formValues.websiteTraffic);
        document.getElementById('recap-website-traffic').textContent = traffic ? traffic.name : '(non spécifié)';
      } else {
        document.getElementById('recap-platform-row').style.display = 'none';
        document.getElementById('recap-website-url-row').style.display = 'none';
        document.getElementById('recap-website-traffic-row').style.display = 'none';
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
      document.getElementById('recap-crm').textContent = crmText;
      
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
      
      document.getElementById('recap-booking').textContent = bookingText;
      
      let databaseText = formValues.useDatabase === 'yes' ? getText('yes') : getText('no');
      if (formValues.useDatabase === 'yes' && formValues.databases.length > 0) {
        const dbNames = formValues.databases.map(dbId => {
          const db = localFormData.databases.find(d => d.id === dbId);
          return db ? db.name : dbId;
        });
        databaseText += `: ${dbNames.join(', ')}`;
      }
      document.getElementById('recap-database').textContent = databaseText;
      
      // Communication Channels
      let socialText = formValues.needSocialBot === 'yes' ? getText('yes') : getText('no');
      if (formValues.needSocialBot === 'yes' && formValues.socialPlatforms.length > 0) {
        const platformNames = formValues.socialPlatforms.map(platformId => {
          const platform = localFormData.socialPlatforms.find(p => p.id === platformId);
          return platform ? platform.name : platformId;
        });
        socialText += `: ${platformNames.join(', ')}`;
      }
      document.getElementById('recap-social').textContent = socialText;
      
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
      document.getElementById('recap-language-type').textContent = languageTypeText;
      
      // Handle languages display in summary
      if (formValues.languages && formValues.languages.length > 0) {
        document.getElementById('recap-languages-row').style.display = 'flex';
        
        // Get the names of selected languages
        const languageNames = formValues.languages.map(langId => {
          const lang = localFormData.languages.find(l => l.id === langId);
          return lang ? lang.name : langId;
        });
        
        // Update based on language type
        if (formValues.languageType === 'unilingual') {
          // Display single language label and value
          document.getElementById('recap-languages-label').textContent = getText('selectLanguage');
          document.getElementById('recap-languages').textContent = languageNames[0] || '';
        } else {
          // Display multiple languages label and comma-separated values
          document.getElementById('recap-languages-label').textContent = getText('selectLanguages');
          document.getElementById('recap-languages').textContent = languageNames.join(', ');
        }
      } else {
        // Hide language row if no languages selected
        document.getElementById('recap-languages-row').style.display = 'none';
      }
    }
    
    /*************************************************************
     * Event Listeners and Form Initialization
     *************************************************************/
    
    // Language type selection
    formContainer.querySelectorAll('input[name="languageType"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const languageSelection = document.getElementById('language-selection');
        languageSelection.style.display = 'block';
        
        // Reset language values when switching modes
        formValues.languages = [];
        
        // Get references to all the elements we need to modify
        const languageSelectLabel = document.getElementById('language-select-label');
        const languagesDropdown = document.getElementById('languagesDropdown');
        const customOptionsContainer = document.getElementById('customOptionsLanguages');
        const selectElement = document.getElementById('languagesSelect');
        const displayElement = document.getElementById('selectDisplayLanguages');
        const iconElement = document.getElementById('dropdownIconLanguages');
        
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
          const select = document.getElementById('languagesSelect');
          const customOptions = document.getElementById('customOptionsLanguages');
          const display = document.getElementById('selectDisplayLanguages');
          const icon = document.getElementById('dropdownIconLanguages');
          
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
        const updatedDisplay = document.getElementById('selectDisplayLanguages');
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
        const crmSelection = document.getElementById('crm-selection');
        crmSelection.style.display = this.value === 'yes' ? 'block' : 'none';
        formValues.useCRM = this.value;
        saveFormData();
      });
    });
    
    // Has booking system
    formContainer.querySelectorAll('input[name="hasBookingSystem"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const existingBookingOptions = document.getElementById('existing-booking-options');
        const needBookingOptions = document.getElementById('need-booking-options');
        
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
        const databaseSelection = document.getElementById('database-selection');
        
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
        const formOptions = document.getElementById('form-options');
        formOptions.style.display = this.value === 'yes' ? 'block' : 'none';
        formValues.useForm = this.value;
        saveFormData();
      });
    });
    
    // Website
    formContainer.querySelectorAll('input[name="hasWebsite"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const websiteOptions = document.getElementById('website-options');
        websiteOptions.style.display = this.value === 'yes' ? 'block' : 'none';
        formValues.hasWebsite = this.value;
        saveFormData();
      });
    });
    
    // Social bot
    formContainer.querySelectorAll('input[name="needSocialBot"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const socialPlatformsGroup = document.getElementById('social-platforms-group');
        socialPlatformsGroup.style.display = this.value === 'yes' ? 'block' : 'none';
        formValues.needSocialBot = this.value;
        saveFormData();
      });
    });
    
    // Text input changes with character counting
    document.getElementById('services').addEventListener('input', function() {
      formValues.services = this.value;
      document.getElementById('services-counter').textContent = this.value.length;
      saveFormData();
    });
    
    document.getElementById('form-purpose').addEventListener('input', function() {
      formValues.formPurpose = this.value;
      document.getElementById('form-purpose-counter').textContent = this.value.length;
      saveFormData();
    });
    
    document.getElementById('description').addEventListener('input', function() {
      formValues.description = this.value;
      document.getElementById('description-counter').textContent = this.value.length;
      saveFormData();
    });
    
    // Contact form fields
    document.getElementById('first-name').addEventListener('input', function() {
      formValues.firstName = this.value;
      saveFormData();
    });
    
    document.getElementById('last-name').addEventListener('input', function() {
      formValues.lastName = this.value;
      saveFormData();
    });
    
    document.getElementById('email').addEventListener('input', function() {
      formValues.email = this.value;
      saveFormData();
    });
    
    document.getElementById('phone').addEventListener('input', function() {
      formValues.phone = this.value;
      saveFormData();
    });
    
    document.getElementById('company').addEventListener('input', function() {
      formValues.company = this.value;
      saveFormData();
    });
    
    // Other text fields
    document.getElementById('other-platform').addEventListener('input', function() {
      formValues.otherPlatform = this.value;
      saveFormData();
    });
    
    document.getElementById('other-niche').addEventListener('input', function() {
      formValues.otherNiche = this.value;
      saveFormData();
    });
    
    document.getElementById('custom-budget').addEventListener('input', function() {
      formValues.customBudget = this.value;
      saveFormData();
    });
    
    document.getElementById('website-url').addEventListener('input', function() {
      formValues.websiteUrl = this.value;
      saveFormData();
    });
    
    /*************************************************************
     * Navigation Setup
     *************************************************************/
    
    // Step 1 navigation
    document.getElementById('step1-next').addEventListener('click', function() {
      if (validateStep1()) {
        showStep(2);
      }
    });
    
    // Step 2 navigation
    document.getElementById('step2-prev').addEventListener('click', () => showStep(1));
    document.getElementById('step2-next').addEventListener('click', function() {
      if (validateStep2()) {
        showStep(3);
      }
    });
    
    // Step 3 navigation
    document.getElementById('step3-prev').addEventListener('click', () => showStep(2));
    document.getElementById('step3-next').addEventListener('click', function() {
      if (validateStep3()) {
        showStep(4);
      }
    });
    
    // Step 4 navigation
    document.getElementById('step4-prev').addEventListener('click', () => showStep(3));
    document.getElementById('step4-next').addEventListener('click', function() {
      if (validateStep4()) {
        showStep(5);
      }
    });
    
    // Step 5 navigation
    document.getElementById('step5-prev').addEventListener('click', () => showStep(4));
    document.getElementById('step5-next').addEventListener('click', function() {
      if (validateStep5()) {
        showStep(6);
      }
    });
    
    // Step 6 navigation
    document.getElementById('step6-prev').addEventListener('click', () => showStep(5));
    document.getElementById('step6-next').addEventListener('click', function() {
      if (validateStep6()) {
        showStep(7);
      }
    });
    
    // Step 7 navigation
    document.getElementById('step7-prev').addEventListener('click', () => showStep(6));
    document.getElementById('step7-next').addEventListener('click', function() {
      if (validateStep7()) {
        showStep(8);
      }
    });
    
    // Step 8 navigation
    document.getElementById('step8-prev').addEventListener('click', () => showStep(7));
    document.getElementById('step8-next').addEventListener('click', function() {
      if (validateStep8()) {
        updateSummary();
        showStep(9);
      }
    });
    
    // Step 9 navigation
    document.getElementById('step9-prev').addEventListener('click', () => showStep(8));
    
    // Edit buttons in summary
    document.getElementById('edit-contact').addEventListener('click', () => showStep(1));
    document.getElementById('edit-project').addEventListener('click', () => showStep(2));
    document.getElementById('edit-business').addEventListener('click', () => showStep(3));
    document.getElementById('edit-features').addEventListener('click', () => showStep(4));
    document.getElementById('edit-forms').addEventListener('click', () => showStep(5));
    document.getElementById('edit-website').addEventListener('click', () => showStep(6));
    document.getElementById('edit-integrations').addEventListener('click', () => showStep(7));
    document.getElementById('edit-channels').addEventListener('click', () => showStep(8));
    
    /*************************************************************
     * Form Submission
     *************************************************************/
    document.getElementById('submit-button').addEventListener('click', function() {
      // Update button state
      const submitButton = this;
      submitButton.disabled = true;
      submitButton.textContent = getText('processing');
      
      // Mark form as submitted
      isFormSubmitted = true;
      
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
        return response.text(); // Changed from json() to text()
      })
      .then(data => {
        console.log('Success:', data);
        
        // Hide all steps and show confirmation
        formContainer.querySelectorAll('.step-container').forEach(step => {
          step.classList.remove('active');
        });
        document.getElementById('confirmation-screen').classList.add('active');
        
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
    document.getElementById('back-to-form').addEventListener('click', function() {
      document.getElementById('confirmation-screen').classList.remove('active');
      showStep(1);
    });
    
    /*************************************************************
     * Initialize Form
     *************************************************************/
    function initializeForm() {
      // Initialize character counters
      document.getElementById('services-counter').textContent = formValues.services.length || 0;
      document.getElementById('form-purpose-counter').textContent = formValues.formPurpose.length || 0;
      document.getElementById('description-counter').textContent = formValues.description.length || 0;
      
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
        document.getElementById('form-options').style.display = 'block';
      }
      
      if (formValues.hasWebsite === 'yes') {
        document.getElementById('website-options').style.display = 'block';
      }
      
      if (formValues.needSocialBot === 'yes') {
        document.getElementById('social-platforms-group').style.display = 'block';
      }
      
      if (formValues.useCRM === 'yes') {
        document.getElementById('crm-selection').style.display = 'block';
      }
      
      if (formValues.hasBookingSystem === 'yes') {
        document.getElementById('existing-booking-options').style.display = 'block';
      } else if (formValues.hasBookingSystem === 'no') {
        document.getElementById('need-booking-options').style.display = 'block';
      }
      
      if (formValues.useDatabase === 'yes') {
        document.getElementById('database-selection').style.display = 'block';
      }
      
      if (formValues.languageType) {
        document.getElementById('language-selection').style.display = 'block';
      }
    }

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

// Add the info button styles to the document
function addInfoButtonStyles() {
  const styleEl = document.createElement('style');
  styleEl.textContent = infoButtonStyles;
  document.head.appendChild(styleEl);
}

// Initialisation pour tester le formulaire
const dummyTrace = { 
  type: "ext_chatbot_form", 
  payload: { 
    currentLanguage: "en"
  } 
};

document.addEventListener("DOMContentLoaded", () => {
  addInfoButtonStyles();
  const container = document.getElementById("extension-container");
  if (container) {
    ChatbotFormExtension.render({ trace: dummyTrace, element: container });
  } else {
    console.error("Extension container not found");
  }
});
