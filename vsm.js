const SVG_CHECK = 
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="12px" height="12px">
        <path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
      </svg>`;
      
    const SVG_CHEVRON = 
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
        <g transform="translate(75, 75)">
          <path fill="#3aafc8" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </g>
      </svg>`;
      
    const SVG_CALENDAR = 
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
        <path fill="#ffffff" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48H0l0-48c0-26.5 21.5-48 48-48l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
      </svg>`;
      const OPTION_CHECKBOX_ICON = `<span class="option-checkbox-icon">${SVG_CHECK}</span>`;
// VSMFormExtension with webhook and Voiceflow integration
const VSMFormExtension = {
  name: "VSMFormExtension",
  type: "response",
  match: ({ trace }) => trace.type === 'ext_vsm_form' || trace.payload?.name === 'ext_vsm_form',
  
  // Add webhook configuration properties
  webhookUrl: "https://your-api-endpoint.com/submit", // Default URL that can be overridden
  TIMEOUT_DURATION: 900000, // 15 minutes in milliseconds
  
  // Add webhook methods similar to ContactFormExtension
  async sendToWebhook(data) {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error sending data to webhook:', error);
      throw error;
    }
  },
  
  // Method to set the webhook URL
  setWebhookUrl(url) {
    if (url && typeof url === 'string') {
      this.webhookUrl = url;
    }
  },
  
  // Form data configuration with translations
  // Enhanced translations object for VSMFormExtension
translations: {
    fr: {
      formTitle: "Évaluation des besoins marketing | VSM Marketing",
      welcome: {
        description: "Ce formulaire nous permettra d'analyser précisément vos besoins et de concevoir des solutions sur mesure pour votre entreprise. En complétant ces quelques étapes, vous recevrez une proposition personnalisée élaborée par nos experts en marketing.",
        duration: "Durée estimée : 3-4 minutes",
        startButton: "COMMENCER L'ÉVALUATION"
      },
      steps: {
        contact: "Contact",
        company: "Entreprise",
        objectives: "Objectifs",
        budget: "Budget",
        services: "Services",
        additionalInfo: "Préférences",
        confirmation: "Confirmation"
      },
      buttons: {
        next: "CONTINUER",
        previous: "RETOUR",
        submit: "ENVOYER MA DEMANDE",
        processing: "Traitement en cours...",
        submitted: "Demande envoyée !",
        error: "Erreur ! Réessayer",
        timeout: "Délai expiré"
      },
      formSections: {
        contactInfo: "Vos informations de contact",
        companyInfo: "Profil de votre entreprise",
        objectives: "Objectifs et stratégie marketing",
        resources: "Budget et ressources marketing",
        services: "Services requis et défis actuels",
        additionalInfo: "Informations additionnelles et préférences"
      },
      fields: {
        firstName: {
          label: "Prénom",
          placeholder: "Votre prénom",
          error: "Veuillez indiquer votre prénom"
        },
        lastName: {
          label: "Nom",
          placeholder: "Votre nom de famille",
          error: "Veuillez indiquer votre nom"
        },
        email: {
          label: "Adresse email professionnelle",
          placeholder: "votre.email@entreprise.com",
          error: "Veuillez entrer une adresse email valide"
        },
        phone: {
          label: "Numéro de téléphone",
          placeholder: "(XXX) XXX-XXXX",
          error: "Veuillez entrer un numéro de téléphone valide"
        },
        companyName: {
          label: "Nom de l'entreprise",
          placeholder: "Nom de votre entreprise",
          error: "Veuillez indiquer le nom de votre entreprise"
        },
        industry: {
          label: "Secteur d'activité",
          placeholder: "-- Sélectionnez votre secteur --",
          error: "Veuillez sélectionner votre secteur d'activité"
        },
        otherIndustry: {
          label: "Précisez votre secteur d'activité",
          placeholder: "Décrivez votre secteur d'activité",
          error: "Veuillez préciser votre secteur d'activité"
        },
        companySize: {
          label: "Taille de l'entreprise",
          placeholder: "-- Sélectionnez la taille --",
          error: "Veuillez indiquer la taille de votre entreprise"
        },
        hasWebsite: {
          label: "Disposez-vous d'un site web actif pour votre entreprise ?",
          options: {
            yes: "Oui",
            no: "Non"
          },
          error: "Veuillez préciser si vous avez un site web"
        },
        websiteUrl: {
          label: "Adresse de votre site web",
          placeholder: "https://www.votreentreprise.com",
          error: "Veuillez entrer une URL valide"
        },
        objectives: {
          label: "Objectifs marketing prioritaires",
          placeholder: "-- Sélectionnez vos objectifs --",
          error: "Veuillez sélectionner au moins un objectif"
        },
        projectUrgency: {
          label: "Quel est le niveau d'urgence de votre projet marketing ?",
          placeholder: "-- Sélectionnez l'urgence --",
          error: "Veuillez indiquer le niveau d'urgence"
        },
        hasStrategy: {
          label: "Avez-vous déjà défini une stratégie marketing ?",
          options: {
            yes: "Oui, nous avons une stratégie",
            no: "Non, pas encore"
          },
          error: "Veuillez indiquer si vous avez une stratégie marketing"
        },
        strategyDetails: {
          label: "Décrivez brièvement votre stratégie marketing actuelle",
          placeholder: "Points clés de votre approche actuelle, canaux utilisés, cibles prioritaires...",
        },
        budget: {
          label: "Quel est votre budget marketing mensuel approximatif ?",
          placeholder: "-- Sélectionnez votre budget --",
          error: "Veuillez indiquer votre budget approximatif"
        },
        marketingTeam: {
          label: "Disposez-vous d'une équipe marketing interne ?",
          placeholder: "-- Sélectionnez une option --",
          error: "Veuillez préciser si vous avez une équipe marketing"
        },
        marketingTools: {
          label: "Quels outils marketing votre équipe utilise-t-elle actuellement ?",
          placeholder: "-- Sélectionnez vos outils --",
          error: "Veuillez sélectionner au moins un outil"
        },
        otherTools: {
          label: "Précisez les autres outils que vous utilisez",
          placeholder: "Noms des outils et plateformes marketing...",
          error: "Veuillez préciser les autres outils"
        },
        services: {
          label: "Quels services marketing vous intéressent particulièrement ?",
          placeholder: "-- Sélectionnez les services souhaités --",
          error: "Veuillez sélectionner au moins un service"
        },
        agencyExperience: {
          label: "Avez-vous déjà collaboré avec une agence marketing auparavant ?",
          options: {
            yes: "Oui, nous avons cette expérience",
            no: "Non, ce serait notre première collaboration"
          },
          error: "Veuillez indiquer si vous avez déjà travaillé avec une agence"
        },
        agencyExperienceDetails: {
          label: "Partagez votre expérience avec les agences marketing précédentes",
          placeholder: "Points forts, axes d'amélioration, attentes non satisfaites..."
        },
        challenges: {
          label: "Identifiez vos 3 principaux défis marketing prioritaires",
          placeholder: "-- Sélectionnez vos défis--",
          error: "Veuillez sélectionner au moins un défis"
        },
        otherChallenges: {
          label: "Précisez vos autres défis marketing",
          placeholder: "Décrivez les défis spécifiques à votre secteur ou entreprise...",
          error: "Veuillez préciser vos autres défis"
        },
        jobFunction: {
          label: "Quelle est votre fonction dans l'entreprise ?",
          placeholder: "-- Sélectionnez votre fonction --",
          error: "Veuillez sélectionner votre fonction"
        },
        otherFunction: {
          label: "Précisez votre fonction",
          placeholder: "Décrivez votre rôle et responsabilités...",
          error: "Veuillez préciser votre fonction"
        },
        contactPreference: {
          label: "Comment préférez-vous être contacté(e) ?",
          placeholder: "-- Sélectionnez votre préférence --",
          error: "Veuillez sélectionner votre préférence de contact"
        },
        additionalInfo: {
          label: "Informations complémentaires à nous communiquer",
          placeholder: "Projets spécifiques, contexte particulier, attentes précises..."
        },
        gdprConsent: {
          label: "J'accepte que mes données soient traitées conformément à la politique de confidentialité de VSM Marketing afin d'être recontacté(e) concernant ma demande.",
          error: "Vous devez accepter notre politique de confidentialité pour continuer"
        }
      },
      confirmation: {
        title: "Demande envoyée avec succès",
        thankYou: "Merci",
        message: "Votre demande a été enregistrée avec succès. Notre équipe d'experts va analyser attentivement votre profil et vous contactera dans les 48 heures pour discuter en détail de votre projet marketing.",
        nextSteps: "En attendant, vous pouvez consulter nos ressources et guides marketing sur notre blog ou nous suivre sur les réseaux sociaux pour découvrir nos dernières actualités.",
        blogButton: "CONSULTER NOS RESSOURCES",
        homeButton: "RETOUR À L'ACCUEIL"
      },
      dropdowns: {
        selectAll: "Tout sélectionner",
        multipleSelected: "options sélectionnées",
        maxSelectionsAlert: "Vous pouvez sélectionner au maximum {0} options."
      },
      errors: {
        submission: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer ou nous contacter directement."
      }
    },
    en: {
      formTitle: "Marketing Needs Assessment | VSM Marketing",
      welcome: {
        description: "This assessment will help us precisely analyze your needs and design tailored marketing solutions for your business. By completing these steps, you'll receive a customized proposal developed by our marketing experts.",
        duration: "Estimated time: 3-4 minutes",
        startButton: "BEGIN ASSESSMENT"
      },
      steps: {
        contact: "Contact",
        company: "Company",
        objectives: "Objectives",
        budget: "Budget",
        services: "Services",
        additionalInfo: "Preferences",
        confirmation: "Confirmation"
      },
      buttons: {
        next: "CONTINUE",
        previous: "BACK",
        submit: "SUBMIT REQUEST",
        processing: "Processing...",
        submitted: "Request Sent!",
        error: "Error! Try Again",
        timeout: "Time Expired"
      },
      formSections: {
        contactInfo: "Your Contact Details",
        companyInfo: "Your Company Profile",
        objectives: "Marketing Objectives & Strategy",
        resources: "Marketing Budget & Resources",
        services: "Required Services & Current Challenges",
        additionalInfo: "Additional Information & Preferences"
      },
      fields: {
        firstName: {
          label: "First Name",
          placeholder: "Your first name",
          error: "Please enter your first name"
        },
        lastName: {
          label: "Last Name",
          placeholder: "Your last name",
          error: "Please enter your last name"
        },
        email: {
          label: "Business Email Address",
          placeholder: "your.email@company.com",
          error: "Please enter a valid email address"
        },
        phone: {
          label: "Phone Number",
          placeholder: "(XXX) XXX-XXXX",
          error: "Please enter a valid phone number"
        },
        companyName: {
          label: "Company Name",
          placeholder: "Your company name",
          error: "Please enter your company name"
        },
        industry: {
          label: "Industry",
          placeholder: "-- Select your industry --",
          error: "Please select your industry"
        },
        otherIndustry: {
          label: "Specify Your Industry",
          placeholder: "Describe your industry",
          error: "Please specify your industry"
        },
        companySize: {
          label: "Company Size",
          placeholder: "-- Select company size --",
          error: "Please select your company size"
        },
        hasWebsite: {
          label: "Does your company have an active website?",
          options: {
            yes: "Yes",
            no: "No"
          },
          error: "Please indicate if you have a website"
        },
        websiteUrl: {
          label: "Website URL",
          placeholder: "https://www.yourcompany.com",
          error: "Please enter a valid URL"
        },
        objectives: {
          label: "Priority Marketing Objectives",
          placeholder: "-- Select objectives--",
          error: "Please select at least one objectives"
        },
        projectUrgency: {
          label: "What is the urgency level of your marketing project?",
          placeholder: "-- Select urgency level --",
          error: "Please indicate the urgency level"
        },
        hasStrategy: {
          label: "Have you already defined a marketing strategy?",
          options: {
            yes: "Yes, we have a strategy",
            no: "No, not yet"
          },
          error: "Please indicate if you have a marketing strategy"
        },
        strategyDetails: {
          label: "Briefly describe your current marketing strategy",
          placeholder: "Key elements of your approach, channels used, priority targets...",
        },
        budget: {
          label: "What is your approximate monthly marketing budget?",
          placeholder: "-- Select your budget --",
          error: "Please indicate your approximate budget"
        },
        marketingTeam: {
          label: "Do you have an internal marketing team?",
          placeholder: "-- Select an option --",
          error: "Please specify if you have a marketing team"
        },
        marketingTools: {
          label: "Which marketing tools does your team currently utilize?",
          placeholder: "-- Select your tools --",
          error: "Please select at least one tool"
        },
        otherTools: {
          label: "Specify other marketing tools you use",
          placeholder: "Names of marketing tools and platforms...",
          error: "Please specify the other tools"
        },
        services: {
          label: "Which marketing services are you particularly interested in?",
          placeholder: "-- Select desired services --",
          error: "Please select at least one service"
        },
        agencyExperience: {
          label: "Have you previously worked with a marketing agency?",
          options: {
            yes: "Yes, we have this experience",
            no: "No, this would be our first collaboration"
          },
          error: "Please indicate if you've worked with an agency before"
        },
        agencyExperienceDetails: {
          label: "Share your experience with previous marketing agencies",
          placeholder: "Strengths, areas for improvement, unmet expectations..."
        },
        challenges: {
          label: "Identify your 3 highest-priority marketing challenges",
          placeholder: "-- Select your challenges--",
          error: "Please select at least one challenges"
        },
        otherChallenges: {
          label: "Specify your other marketing challenges",
          placeholder: "Describe challenges specific to your industry or company...",
          error: "Please specify your other challenges"
        },
        jobFunction: {
          label: "What is your role in the company?",
          placeholder: "-- Select your role --",
          error: "Please select your role"
        },
        otherFunction: {
          label: "Specify your role",
          placeholder: "Describe your responsibilities and position...",
          error: "Please specify your role"
        },
        contactPreference: {
          label: "How do you prefer to be contacted?",
          placeholder: "-- Select your preference --",
          error: "Please select your contact preference"
        },
        additionalInfo: {
          label: "Additional information you'd like to share",
          placeholder: "Specific projects, particular context, precise expectations..."
        },
        gdprConsent: {
          label: "I agree that my data will be processed in accordance with VSM Marketing's privacy policy to contact me regarding my request.",
          error: "You must accept our privacy policy to continue"
        }
      },
      confirmation: {
        title: "Request Successfully Submitted",
        thankYou: "Thank You",
        message: "Your request has been successfully submitted. Our team of experts will carefully analyze your profile and contact you within 48 hours to discuss your marketing project in detail.",
        nextSteps: "In the meantime, you can explore our marketing resources and guides on our blog or follow us on social media to discover our latest news and insights.",
        blogButton: "EXPLORE OUR RESOURCES",
        homeButton: "RETURN TO HOME"
      },
      dropdowns: {
        selectAll: "Select All",
        multipleSelected: "options selected",
        maxSelectionsAlert: "You can select a maximum of {0} options."
      },
      errors: {
        submission: "An error occurred while submitting the form. Please try again or contact us directly."
      }
    }
  },
  // Define data options with translations
  formData: {
    // Define fallback data in case structured data is not available
    fallbackIndustries: [
      { id: "commerce", name: "Commerce et distribution" },
      { id: "industrie", name: "Industrie et production" },
      { id: "b2b", name: "Services aux entreprises (B2B)" },
      { id: "tech", name: "Technologie et informatique" },
      { id: "health", name: "Santé et bien-être" },
      { id: "finance", name: "Finance et assurance" },
      { id: "education", name: "Éducation et formation" },
      { id: "tourism", name: "Tourisme et loisirs" },
      { id: "other", name: "Autre" }
    ],
    fallbackCompanySizes: [
      { id: "tpe", name: "TPE (1-9 employés)" },
      { id: "pme", name: "PME (10-249 employés)" },
      { id: "eti", name: "ETI (250-4999 employés)" },
      { id: "large", name: "Grande entreprise (5000+ employés)" }
    ],
    
    industries: {
      fr: [
        { id: "commerce", name: "Commerce et distribution" },
        { id: "industrie", name: "Industrie et production" },
        { id: "b2b", name: "Services aux entreprises (B2B)" },
        { id: "tech", name: "Technologie et informatique" },
        { id: "health", name: "Santé et bien-être" },
        { id: "finance", name: "Finance et assurance" },
        { id: "education", name: "Éducation et formation" },
        { id: "tourism", name: "Tourisme et loisirs" },
        { id: "other", name: "Autre" }
      ],
      en: [
        { id: "commerce", name: "Retail and Distribution" },
        { id: "industrie", name: "Manufacturing and Production" },
        { id: "b2b", name: "B2B Services" },
        { id: "tech", name: "Technology and IT" },
        { id: "health", name: "Health and Wellness" },
        { id: "finance", name: "Finance and Insurance" },
        { id: "education", name: "Education and Training" },
        { id: "tourism", name: "Tourism and Leisure" },
        { id: "other", name: "Other" }
      ]
    },
    companySizes: {
      fr: [
        { id: "tpe", name: "TPE (1-9 employés)" },
        { id: "pme", name: "PME (10-249 employés)" },
        { id: "eti", name: "ETI (250-4999 employés)" },
        { id: "large", name: "Grande entreprise (5000+ employés)" }
      ],
      en: [
        { id: "tpe", name: "Micro (1-9 employees)" },
        { id: "pme", name: "SME (10-249 employees)" },
        { id: "eti", name: "Mid-size (250-4999 employees)" },
        { id: "large", name: "Large enterprise (5000+ employees)" }
      ]
    },
    objectives: {
      fr: [
        { id: "brand-awareness", name: "Augmenter la notoriété de votre marque" },
        { id: "lead-generation", name: "Générer plus de leads qualifiés" },
        { id: "conversion", name: "Améliorer votre conversion sur le site web" },
        { id: "new-product", name: "Lancer un nouveau produit/service" },
        { id: "retention", name: "Fidéliser votre clientèle existante" },
        { id: "new-market", name: "Pénétrer un nouveau marché" },
        { id: "social-media", name: "Optimiser votre présence sur les réseaux sociaux" },
        { id: "seo", name: "Améliorer votre référencement (SEO)" }
      ],
      en: [
        { id: "brand-awareness", name: "Increase brand awareness" },
        { id: "lead-generation", name: "Generate more qualified leads" },
        { id: "conversion", name: "Improve website conversion rate" },
        { id: "new-product", name: "Launch a new product/service" },
        { id: "retention", name: "Increase customer retention" },
        { id: "new-market", name: "Enter a new market" },
        { id: "social-media", name: "Optimize social media presence" },
        { id: "seo", name: "Improve search engine ranking (SEO)" }
      ]
    },
    budgets: {
      fr: [
        { id: "less-2000", name: "Moins de 2 000 $ par mois" },
        { id: "2000-5000", name: "Entre 2 000 $ et 5 000 $ par mois" },
        { id: "5000-10000", name: "Entre 5 000 $ et 10 000 $ par mois" },
        { id: "more-10000", name: "Plus de 10 000 $ par mois" },
        { id: "not-specified", name: "Je préfère ne pas préciser" }
      ],
      en: [
        { id: "less-2000", name: "Less than $2,000 per month" },
        { id: "2000-5000", name: "Between $2,000 and $5,000 per month" },
        { id: "5000-10000", name: "Between $5,000 and $10,000 per month" },
        { id: "more-10000", name: "More than $10,000 per month" },
        { id: "not-specified", name: "I prefer not to specify" }
      ]
    },
    services: {
      fr: [
        { id: "strategy", name: "Conseil et stratégie marketing" },
        { id: "digital", name: "Marketing digital (SEA, SEO, SMO)" },
        { id: "website", name: "Création ou refonte de site web" },
        { id: "design", name: "Design graphique et identité visuelle" },
        { id: "content", name: "Production de contenu (vidéo, photos, textes)" },
        { id: "email", name: "Email marketing et automation" },
        { id: "mobile", name: "Développement d'applications mobiles" },
        { id: "analytics", name: "Analyse de données et reporting" },
        { id: "inbound", name: "Inbound marketing et génération de leads" }
      ],
      en: [
        { id: "strategy", name: "Marketing strategy and consulting" },
        { id: "digital", name: "Digital marketing (SEA, SEO, SMO)" },
        { id: "website", name: "Website creation or redesign" },
        { id: "design", name: "Graphic design and visual identity" },
        { id: "content", name: "Content production (video, photos, texts)" },
        { id: "email", name: "Email marketing and automation" },
        { id: "mobile", name: "Mobile app development" },
        { id: "analytics", name: "Data analysis and reporting" },
        { id: "inbound", name: "Inbound marketing and lead generation" }
      ]
    },
    projectUrgency: {
      fr: [
        { id: "immediate", name: "Immédiat (moins d'1 mois)" },
        { id: "short", name: "Court terme (1-3 mois)" },
        { id: "medium", name: "Moyen terme (3-6 mois)" },
        { id: "long", name: "Long terme (plus de 6 mois)" }
      ],
      en: [
        { id: "immediate", name: "Immediate (less than 1 month)" },
        { id: "short", name: "Short term (1-3 months)" },
        { id: "medium", name: "Medium term (3-6 months)" },
        { id: "long", name: "Long term (more than 6 months)" }
      ]
    },
    marketingTeam: {
      fr: [
        { id: "none", name: "Non, aucune équipe marketing" },
        { id: "partial", name: "Oui, mais des compétences limitées" },
        { id: "full", name: "Oui, une équipe complète" }
      ],
      en: [
        { id: "none", name: "No, no marketing team" },
        { id: "partial", name: "Yes, but with limited skills" },
        { id: "full", name: "Yes, a complete team" }
      ]
    },
    marketingTools: {
      fr: [
        { id: "analytics", name: "Google Analytics / Outils d'analyse" },
        { id: "crm", name: "CRM (Salesforce, HubSpot, etc.)" },
        { id: "automation", name: "Outils d'automation marketing" },
        { id: "social", name: "Gestionnaires de réseaux sociaux" },
        { id: "content", name: "Plateformes de gestion de contenu" },
        { id: "seo", name: "Outils SEO" },
        { id: "email", name: "Plateformes d'email marketing" },
        { id: "ads", name: "Plateformes publicitaires" },
        { id: "none", name: "Aucun outil" },
        { id: "other", name: "Autres outils" }
      ],
      en: [
        { id: "analytics", name: "Google Analytics / Analytics tools" },
        { id: "crm", name: "CRM (Salesforce, HubSpot, etc.)" },
        { id: "automation", name: "Marketing automation tools" },
        { id: "social", name: "Social media management tools" },
        { id: "content", name: "Content management platforms" },
        { id: "seo", name: "SEO tools" },
        { id: "email", name: "Email marketing platforms" },
        { id: "ads", name: "Advertising platforms" },
        { id: "none", name: "No tools" },
        { id: "other", name: "Other tools" }
      ]
    },
    challenges: {
      fr: [
        { id: "traffic", name: "Manque de trafic sur le site web" },
        { id: "leads", name: "Difficulté à générer des leads qualifiés" },
        { id: "conversion", name: "Taux de conversion insuffisant" },
        { id: "visibility", name: "Manque de visibilité en ligne" },
        { id: "competition", name: "Forte concurrence dans votre secteur" },
        { id: "content", name: "Difficulté à créer du contenu pertinent" },
        { id: "data", name: "Manque d'analyse de données marketing" },
        { id: "budget", name: "Budget marketing limité" },
        { id: "strategy", name: "Absence de stratégie marketing claire" },
        { id: "other", name: "Autre défi" }
      ],
      en: [
        { id: "traffic", name: "Lack of website traffic" },
        { id: "leads", name: "Difficulty generating qualified leads" },
        { id: "conversion", name: "Low conversion rate" },
        { id: "visibility", name: "Lack of online visibility" },
        { id: "competition", name: "Strong competition in your sector" },
        { id: "content", name: "Difficulty creating relevant content" },
        { id: "data", name: "Lack of marketing data analysis" },
        { id: "budget", name: "Limited marketing budget" },
        { id: "strategy", name: "Absence of clear marketing strategy" },
        { id: "other", name: "Other challenge" }
      ]
    },
    jobFunction: {
      fr: [
        { id: "ceo", name: "PDG / Directeur Général" },
        { id: "cmo", name: "Directeur Marketing" },
        { id: "marketing", name: "Responsable Marketing" },
        { id: "sales", name: "Responsable Commercial" },
        { id: "digital", name: "Responsable Digital" },
        { id: "communication", name: "Responsable Communication" },
        { id: "founder", name: "Fondateur / Co-fondateur" },
        { id: "other", name: "Autre fonction" }
      ],
      en: [
        { id: "ceo", name: "CEO / General Director" },
        { id: "cmo", name: "CMO / Marketing Director" },
        { id: "marketing", name: "Marketing Manager" },
        { id: "sales", name: "Sales Manager" },
        { id: "digital", name: "Digital Manager" },
        { id: "communication", name: "Communication Manager" },
        { id: "founder", name: "Founder / Co-founder" },
        { id: "other", name: "Other role" }
      ]
    },
    contactPreference: {
      fr: [
        { id: "email", name: "Par email" },
        { id: "phone", name: "Par téléphone" },
        { id: "both", name: "Email et téléphone" }
      ],
      en: [
        { id: "email", name: "By email" },
        { id: "phone", name: "By phone" },
        { id: "both", name: "Email and phone" }
      ]
    }
  },

  render({ trace, element }) {
    const { language = 'fr' } = trace.payload || {};
    const isEnglish = language === 'en';
    const translations = this.translations[isEnglish ? 'en' : 'fr'];
    
    // Get webhook URL from payload if provided
    if (trace.payload && trace.payload.webhookUrl) {
      this.setWebhookUrl(trace.payload.webhookUrl);
    }
    
    const container = document.createElement('div');
    container.className = 'vf-container';
    container.innerHTML = `
	  <style>
  /* ====================================
   VSM MARKETING FORM - MAIN STYLESHEET
   ==================================== */

/* ---------- RESET & BASE STYLES ---------- */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

html {
  scroll-behavior: smooth;
}

/* ---------- LAYOUT & CONTAINER ---------- */
.container {
  max-width: 870px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(35, 46, 95, 0.12);
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Two-column layout */
.row, .form-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  width: calc(100% + 20px);
}

.col, .form-col {
  flex: 1 0 0;
  padding: 0 10px;
  min-width: 0;
}

/* ---------- FORM HEADER ---------- */
.form-header {
  padding: 12px 30px;
  background: linear-gradient(135deg, #232e5f 0%, #3aafc8 100%);
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 4px 12px rgba(35, 46, 95, 0.15);
}

.header-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.header-icon:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.3);
}

.form-title {
  font-size: 28px;
  color: white;
  margin: 0;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* ---------- WELCOME SCREEN ---------- */
.welcome-screen {
  text-align: center;
  padding: 40px 30px;
  animation: fadeIn 0.6s;
  background: linear-gradient(to bottom, #f5f9fa, #ffffff);
}

.welcome-screen p {
  color: #4a5568;
  font-size: 17px;
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.welcome-screen .duration {
  font-weight: bold;
  color: #232e5f;
  margin-top: 35px;
  font-size: 16px;
  display: inline-block;
  padding: 10px 20px;
  background-color: rgba(58, 175, 200, 0.1);
  border-radius: 50px;
}

.start-button-container {
  margin-top: 50px;
}

/* ---------- PROGRESS BAR ---------- */
.progress-container {
  margin-bottom: 35px;
  padding: 0 25px;
}

.progress-bar {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 35px;
  z-index: 0;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 6px;
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  z-index: -1;
}

.progress {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 6px;
  background: linear-gradient(to right, #3aafc8, #e52059);
  border-radius: 10px;
  transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: -1;
}

.progress-step {
  width: 36px;
  height: 36px;
  background-color: #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #666;
  position: relative;
  transition: all 0.3s ease;
  border: 3px solid white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.progress-step.active {
  background-color: #e52059;
  color: white;
  transform: scale(1.1);
}

.progress-step.completed {
  background-color: #3aafc8;
  color: white;
}

.progress-step-label {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  white-space: nowrap;
  color: #666;
  font-weight: 500;
  display: block;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.progress-step.active .progress-step-label {
  color: #e52059;
  font-weight: 600;
  opacity: 1;
}

.progress-step:hover .progress-step-label {
  opacity: 1;
}

/* ---------- FORM STEPS & ANIMATIONS ---------- */
.form-step {
  display: none;
  animation: fadeIn 0.6s;
}

.form-step.active {
  display: block;
  padding: 5px 30px 10px;
}

.form-step:not(.active) {
  pointer-events: none;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(58, 175, 200, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(58, 175, 200, 0); }
  100% { transform: scale(1); }
}

/* ---------- FORM ELEMENTS ---------- */
.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #232e5f;
  font-size: 15px;
}

.form-group label:hover {
  color: #3aafc8;
}

.form-group label.required::after {
  content: " *";
  color: #e52059;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
textarea:focus {
  outline: none;
  border-color: #3aafc8;
  box-shadow: 0 0 0 3px rgba(58, 175, 200, 0.15);
  transform: translateY(-1px);
}

textarea {
  resize: vertical;
  min-height: 120px;
}

/* ---------- SECTION HEADINGS ---------- */
.step-heading {
  font-size: 26px;
  color: #232e5f;
  margin-bottom: 10px;
  font-weight: 600;
  position: relative;
}

.step-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 70px;
  height: 4px;
  background: linear-gradient(90deg, #e52059, #3aafc8);
  border-radius: 4px;
}

/* ---------- ERROR MESSAGES ---------- */
.error-message {
  color: white;
  font-size: 13px;
  margin-top: 8px;
  display: none;
  background-color: #e52059;
  border-radius: 6px;
  border: none;
  padding: 10px 14px;
  animation: shake 0.5s;
  box-shadow: 0 2px 5px rgba(229, 32, 89, 0.2);
}

.error-message.show {
  display: flex;
}

.error-icon {
  width: 22px;
  height: 22px;
  min-width: 22px;
  border-radius: 50%;
  background-color: white;
  color: #e52059;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 12px;
  font-size: 14px;
}

.error-text {
  flex: 1;
}

/* ---------- BUTTONS & NAVIGATION ---------- */
.form-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn {
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: -100%;
  background: linear-gradient(90deg, 
    rgba(255,255,255,0) 0%, 
    rgba(255,255,255,0.2) 50%, 
    rgba(255,255,255,0) 100%);
  transition: all 0.6s;
}

.btn:hover::after {
  left: 100%;
}

.btn-prev {
  background-color: #f0f0f0;
  color: #232e5f;
}

.btn-prev:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}

.btn-next,
.btn-submit {
  background: linear-gradient(135deg, #3aafc8 0%, #232e5f 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(58, 175, 200, 0.3);
}

.btn-next:hover,
.btn-submit:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(58, 175, 200, 0.4);
}

.btn-submit {
  background: linear-gradient(135deg, #3aafc8 0%, #e52059 100%);
  box-shadow: 0 4px 15px rgba(229, 32, 89, 0.3);
}

.btn-submit:hover {
  box-shadow: 0 6px 18px rgba(229, 32, 89, 0.4);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn:disabled::after {
  display: none;
}

.form-navigation .btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 8px rgba(58, 175, 200, 0.2);
}

/* ---------- DROPDOWN & SELECT ELEMENTS ---------- */
.select-container select {
  display: none !important;
}

.select-wrapper {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}




.select-wrapper:hover {
  border-color: #3aafc8;
}

.select-display {
  padding: 0 18px;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  color: #444;
}

.dropdown-icon {
  width: 30px;
  height: 30px;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3aafc8 0%, #232e5f 100%);
  border-radius: 50%;
}

.dropdown-icon svg path {
  fill: white !important;
}

.dropdown-icon.rotate {
  transform: rotate(180deg);
}

.custom-options {
  display: none;
  font-size: 15px;
  border-top: 1px solid #ddd;
  max-height: 250px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 100;
  border-radius: 0 0 8px 8px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 100%;
}

.show-options {
  display: block;
  animation: fadeIn 0.3s;
}

.custom-option {
  padding: 14px 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  border-left: 4px solid transparent;
}

.custom-option:hover {
  background-color: rgba(58, 175, 200, 0.08);
  color: #232e5f;
  border-left-color: #3aafc8;
}

.custom-option.selected {
  background-color: rgba(58, 175, 200, 0.12);
  color: #232e5f;
  font-weight: bold;
  border-left-color: #e52059;
}

/* ---------- CHECKBOXES & RADIO BUTTONS ---------- */
.options-group {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 12px;
}

.radio-option,
.checkbox-option {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
  padding: 12px 18px;
  border: 2px solid #ddd;
  border-radius: 10px;
  transition: all 0.2s;
  flex: 1;
  min-width: 200px;
  position: relative;
  overflow: hidden;
}

.radio-option:hover,
.checkbox-option:hover {
  border-color: #3aafc8;
  background-color: #f5f9fa;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.radio-option::before,
.checkbox-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #3aafc8;
  transform: scaleY(0);
  transition: transform 0.2s;
  transform-origin: bottom;
}

.radio-option:hover::before,
.checkbox-option:hover::before {
  transform: scaleY(1);
}

.radio-option input,
.checkbox-option input {
  margin-right: 12px;
  accent-color: #3aafc8;
  transform: scale(1.2);
}

.radio-option input:checked + span,
.checkbox-option input:checked + span {
  font-weight: 500;
  color: #232e5f;
}

.radio-option input:checked,
.checkbox-option input:checked {
  accent-color: #e52059;
}

/* Checkbox styling */
.option-checkbox {
  width: 22px;
  height: 22px;
  border: 2px solid #ccc;
  border-radius: 50%;
  margin-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  transition: all 0.2s;
  position: relative;
}

.multi-select .option-checkbox {
  border-radius: 6px !important;
}

.option-checkbox-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.option-checkbox-icon svg {
  width: 14px;
  height: 14px;
  display: block;
  margin: 0 auto;
}

.custom-option:not(.selected):hover .option-checkbox {
  border-color: #3aafc8;
  transform: scale(1.05);
}

.custom-option:not(.selected):hover .option-checkbox-icon {
  opacity: 0.6;
}

.custom-option.selected .option-checkbox-icon {
  opacity: 1;
}

.custom-option.selected .option-checkbox {
  border-color: #e52059;
  background-color: #e52059;
  transform: scale(1.1);
}

.custom-option:not(.selected):hover .option-checkbox-icon svg path {
  fill: #3aafc8 !important;
}

/* ---------- CONDITIONAL FIELDS ---------- */
.conditional-field {
  display: none;
  margin-top: 18px;
  padding: 15px 20px;
  border-left: 3px solid #3aafc8;
  background-color: rgba(58, 175, 200, 0.05);
  border-radius: 0 8px 8px 0;
  animation: slideDown 0.3s;
}

.form-col .conditional-field {
  margin-top: 15px;
}

/* ---------- CONFIRMATION PAGE ---------- */
.confirmation {
  text-align: center;
  padding: 50px 30px;
  background: linear-gradient(135deg, rgba(58, 175, 200, 0.05) 0%, rgba(35, 46, 95, 0.05) 100%);
  border-radius: 12px;
  border: 1px solid rgba(58, 175, 200, 0.1);
}

.confirmation-icon {
  font-size: 70px;
  color: #3aafc8;
  margin-bottom: 25px;
  display: inline-block;
  width: 100px;
  height: 100px;
  line-height: 100px;
  background: linear-gradient(135deg, rgba(58, 175, 200, 0.15) 0%, rgba(229, 32, 89, 0.15) 100%);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.social-links {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-link {
  color: #666;
  font-size: 16px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.social-link:hover {
  color: white;
  background: linear-gradient(135deg, #3aafc8 0%, #e52059 100%);
  transform: translateY(-3px);
}

/* ---------- RESPONSIVE STYLES ---------- */
@media (max-width: 767px) {
  /* Stack fields vertically on small screens */
  .row, .form-row {
    display: block;
    margin: 0;
    width: 100%;
  }
  
  .col, .form-col {
    width: 100%;
    padding: 0;
    margin-bottom: 15px;
  }
  
  #step-1 .row {
    margin-bottom: 0;
  }
  
  #step-1 .col {
    margin-bottom: 15px;
  }
  
  /* Add space between form groups on mobile */
  .form-group {
    margin-bottom: 22px;
  }
  
  /* Fix conditional fields spacing on mobile */
  .form-col .conditional-field {
    margin-left: 0;
    padding-left: 15px;
  }
}

@media (max-width: 768px) {
  .form-title {
    font-size: 22px;
  }
  
  .form-header {
    padding: 10px 20px;
  }
  
  .header-icon {
    width: 36px;
    height: 36px;
  }
  
  .step-heading {
    font-size: 22px;
  }
  
  .btn {
    padding: 12px 18px;
    font-size: 15px;
  }
  
  .container {
    margin: 15px;
    width: auto;
  }
  
  .progress-step {
    width: 30px;
    height: 30px;
    font-size: 13px;
  }
  
  .progress-container {
    padding: 0 15px;
  }
}

@media (min-width: 768px) {
  /* Two columns side by side on larger screens */
  .form-col, .col {
    flex-basis: calc(50% - 20px);
  }
  
  #step-1 .row .col {
    flex-basis: calc(50% - 20px);
  }
}

@media (min-width: 992px) {
  .form-row, .row {
    margin: 0 -15px;
    width: calc(100% + 30px);
  }
  
  .form-col, .col {
    padding: 0 15px;
  }
}
  </style>

  <div class="container">
    <div class="form-header">
      <div class="header-icon">
        ${SVG_CALENDAR}
      </div>
      <h1 class="form-title">${translations.formTitle}</h1>
    </div>
    
    <!-- Welcome Screen (not numbered, not included in progress) -->
    <div class="welcome-screen" id="welcome-screen">
      <p>${translations.welcome.description}</p>
      <p class="duration"><strong>${translations.welcome.duration}</strong></p>
      
      <div class="start-button-container">
        <button type="button" class="btn btn-next" id="start-form">${translations.welcome.startButton}</button>
      </div>
    </div>
    
    <div class="progress-container" style="display: none;" id="progress-container">
      <div class="progress-bar">
        <div class="progress" id="progress"></div>
        <div class="progress-step active" data-step="1">
          <span>1</span>
          <div class="progress-step-label">${translations.steps.contact}</div>
        </div>
        <div class="progress-step" data-step="2">
          <span>2</span>
          <div class="progress-step-label">${translations.steps.company}</div>
        </div>
        <div class="progress-step" data-step="3">
          <span>3</span>
          <div class="progress-step-label">${translations.steps.objectives}</div>
        </div>
        <div class="progress-step" data-step="4">
          <span>4</span>
          <div class="progress-step-label">${translations.steps.budget}</div>
        </div>
        <div class="progress-step" data-step="5">
          <span>5</span>
          <div class="progress-step-label">${translations.steps.services}</div>
        </div>
        <div class="progress-step" data-step="6">
          <span>6</span>
          <div class="progress-step-label">${translations.steps.additionalInfo}</div>
        </div>
        <div class="progress-step" data-step="7">
          <span>7</span>
          <div class="progress-step-label">${translations.steps.confirmation}</div>
        </div>
      </div>
    </div>
    
    <form id="multi-step-form" style="display: none;">
      <!-- Step 1: Contact Information -->
      <div class="form-step active" id="step-1">
        <h2 class="step-heading">${translations.formSections.contactInfo}</h2>
        
        <!-- First name and last name in the same row -->
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label for="first-name" class="required">${translations.fields.firstName.label}</label>
              <input type="text" id="first-name" name="first-name" placeholder="${translations.fields.firstName.placeholder}">
              <div class="error-message" id="first-name-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.firstName.error}</span>
              </div>
            </div>
          </div>
          
          <div class="col">
            <div class="form-group">
              <label for="last-name" class="required">${translations.fields.lastName.label}</label>
              <input type="text" id="last-name" name="last-name" placeholder="${translations.fields.lastName.placeholder}">
              <div class="error-message" id="last-name-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.lastName.error}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Email and phone in the same row -->
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label for="email" class="required">${translations.fields.email.label}</label>
              <input type="email" id="email" name="email" placeholder="${translations.fields.email.placeholder}">
              <div class="error-message" id="email-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.email.error}</span>
              </div>
            </div>
          </div>
          
          <div class="col">
            <div class="form-group">
              <label for="phone" class="required">${translations.fields.phone.label}</label>
              <input type="tel" id="phone" name="phone" placeholder="${translations.fields.phone.placeholder}">
              <div class="error-message" id="phone-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.phone.error}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="company-name" class="required">${translations.fields.companyName.label}</label>
          <input type="text" id="company-name" name="company-name" placeholder="${translations.fields.companyName.placeholder}">
          <div class="error-message" id="company-name-error">
            <div class="error-icon">!</div>
            <span class="error-text">${translations.fields.companyName.error}</span>
          </div>
        </div>
        
        <div class="form-navigation">
          <div></div>
          <button type="button" class="btn btn-next" id="step1-next">${translations.buttons.next}</button>
        </div>
      </div>
      
      <!-- Step 2: Company Identification -->
      <div class="form-step" id="step-2">
        <h2 class="step-heading">${translations.formSections.companyInfo}</h2>
        
        <!-- Industry and Company Size in the same row -->
        <div class="form-row">
          <div class="form-col">
            <div class="form-group">
              <label for="industry" class="required">${translations.fields.industry.label}</label>
              <div class="select-container" id="industryDropdown">
                <select id="industry" name="industry"></select>
                <div class="select-wrapper">
                  <div class="select-display placeholder" id="selectDisplayIndustry" data-placeholder="${translations.fields.industry.placeholder}">
                    <span id="selectedTextIndustry">${translations.fields.industry.placeholder}</span>
                    <div class="dropdown-icon" id="dropdownIconIndustry">
                      ${SVG_CHEVRON}
                    </div>
                  </div>
                  <div class="custom-options" id="customOptionsIndustry"></div>
                </div>
              </div>
              <div class="error-message" id="industry-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.industry.error}</span>
              </div>
            </div>
            
            <!-- "Other" conditional field - keep it under the industry column -->
            <div class="form-group conditional-field" id="other-industry-field">
              <label for="other-industry" class="required">${translations.fields.otherIndustry.label}</label>
              <input type="text" id="other-industry" name="other-industry" placeholder="${translations.fields.otherIndustry.placeholder}">
              <div class="error-message" id="other-industry-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.otherIndustry.error}</span>
              </div>
            </div>
          </div>
          
          <div class="form-col">
            <div class="form-group">
              <label for="company-size" class="required">${translations.fields.companySize.label}</label>
              <div class="select-container" id="companySizeDropdown">
                <select id="company-size" name="company-size"></select>
                <div class="select-wrapper">
                  <div class="select-display placeholder" id="selectDisplayCompanySize" data-placeholder="${translations.fields.companySize.placeholder}">
                    <span id="selectedTextCompanySize">${translations.fields.companySize.placeholder}</span>
                    <div class="dropdown-icon" id="dropdownIconCompanySize">
                      ${SVG_CHEVRON}
                    </div>
                  </div>
                  <div class="custom-options" id="customOptionsCompanySize"></div>
                </div>
              </div>
              <div class="error-message" id="company-size-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.companySize.error}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label class="required">${translations.fields.hasWebsite.label}</label>
          <div class="options-group">
            <label class="radio-option">
              <input type="radio" name="has-website" value="yes"> ${translations.fields.hasWebsite.options.yes}
            </label>
            <label class="radio-option">
              <input type="radio" name="has-website" value="no"> ${translations.fields.hasWebsite.options.no}
            </label>
          </div>
          <div class="error-message" id="has-website-error">
            <div class="error-icon">!</div>
            <span class="error-text">${translations.fields.hasWebsite.error}</span>
          </div>
        </div>
        
        <div class="form-group conditional-field" id="website-url-field">
          <label for="website-url" class="required">${translations.fields.websiteUrl.label}</label>
          <input type="text" id="website-url" name="website-url" placeholder="${translations.fields.websiteUrl.placeholder}">
          <div class="error-message" id="website-url-error">
            <div class="error-icon">!</div>
            <span class="error-text">${translations.fields.websiteUrl.error}</span>
          </div>
        </div>
        
        <div class="form-navigation">
          <button type="button" class="btn btn-prev" id="step2-prev">${translations.buttons.previous}</button>
          <button type="button" class="btn btn-next" id="step2-next">${translations.buttons.next}</button>
        </div>
      </div>
      
      <!-- Step 3: Marketing Objectives -->
      <div class="form-step" id="step-3">
        <h2 class="step-heading">${translations.formSections.objectives}</h2>
        
        <!-- Priority Objectives and Project Urgency in the same row -->
        <div class="form-row">
          <div class="form-col">
            <div class="form-group">
              <label class="required">${translations.fields.objectives.label}</label>
              <div class="select-container multi-select" id="objectivesDropdown">
                <select id="objectives" name="objectives" multiple></select>
                <div class="select-wrapper">
                  <div class="select-display placeholder" id="selectDisplayObjectives" data-placeholder="${translations.fields.objectives.placeholder}">
                    <span id="selectedTextObjectives">${translations.fields.objectives.placeholder}</span>
                    <div class="dropdown-icon" id="dropdownIconObjectives">
                      ${SVG_CHEVRON}
                    </div>
                  </div>
                  <div class="custom-options" id="customOptionsObjectives"></div>
                </div>
              </div>
              <div class="error-message" id="objectives-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.objectives.error}</span>
              </div>
            </div>
          </div>
          
          <div class="form-col">
            <div class="form-group">
              <label class="required">${translations.fields.projectUrgency.label}</label>
              <div class="select-container" id="projectUrgencyDropdown">
                <select id="project-urgency" name="project-urgency"></select>
                <div class="select-wrapper">
                  <div class="select-display placeholder" id="selectDisplayProjectUrgency" data-placeholder="${translations.fields.projectUrgency.placeholder}">
                    <span id="selectedTextProjectUrgency">${translations.fields.projectUrgency.placeholder}</span>
                    <div class="dropdown-icon" id="dropdownIconProjectUrgency">
                      ${SVG_CHEVRON}
                    </div>
                  </div>
                  <div class="custom-options" id="customOptionsProjectUrgency"></div>
                </div>
              </div>
              <div class="error-message" id="project-urgency-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.projectUrgency.error}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label class="required">${translations.fields.hasStrategy.label}</label>
          <div class="options-group">
            <label class="radio-option">
              <input type="radio" name="has-strategy" value="yes"> ${translations.fields.hasStrategy.options.yes}
            </label>
            <label class="radio-option">
              <input type="radio" name="has-strategy" value="no"> ${translations.fields.hasStrategy.options.no}
            </label>
          </div>
          <div class="error-message" id="has-strategy-error">
            <div class="error-icon">!</div>
            <span class="error-text">${translations.fields.hasStrategy.error}</span>
          </div>
        </div>
        
        <div class="form-group conditional-field" id="strategy-details-field">
          <label for="strategy-details">${translations.fields.strategyDetails.label}</label>
          <textarea id="strategy-details" name="strategy-details" placeholder="${translations.fields.strategyDetails.placeholder}" maxlength="500"></textarea>
        </div>
        
        <div class="form-navigation">
          <button type="button" class="btn btn-prev" id="step3-prev">${translations.buttons.previous}</button>
          <button type="button" class="btn btn-next" id="step3-next">${translations.buttons.next}</button>
        </div>
      </div>
      
      <!-- Step 4: Resources and Budget -->
      <div class="form-step" id="step-4">
        <h2 class="step-heading">${translations.formSections.resources}</h2>
        
        <!-- Budget and Marketing Team in the same row -->
        <div class="form-row">
          <div class="form-col">
            <div class="form-group">
              <label class="required">${translations.fields.budget.label}</label>
              <div class="select-container" id="budgetDropdown">
                <select id="budget" name="budget"></select>
                <div class="select-wrapper">
                  <div class="select-display placeholder" id="selectDisplayBudget" data-placeholder="${translations.fields.budget.placeholder}">
                    <span id="selectedTextBudget">${translations.fields.budget.placeholder}</span>
                    <div class="dropdown-icon" id="dropdownIconBudget">
                      ${SVG_CHEVRON}
                    </div>
                  </div>
                  <div class="custom-options" id="customOptionsBudget"></div>
                </div>
              </div>
              <div class="error-message" id="budget-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.budget.error}</span>
              </div>
            </div>
          </div>
          
          <div class="form-col">
            <div class="form-group">
              <label class="required">${translations.fields.marketingTeam.label}</label>
              <div class="select-container" id="marketingTeamDropdown">
                <select id="marketing-team" name="marketing-team"></select>
                <div class="select-wrapper">
                  <div class="select-display placeholder" id="selectDisplayMarketingTeam" data-placeholder="${translations.fields.marketingTeam.placeholder}">
                    <span id="selectedTextMarketingTeam">${translations.fields.marketingTeam.placeholder}</span>
                    <div class="dropdown-icon" id="dropdownIconMarketingTeam">
                      ${SVG_CHEVRON}
                    </div>
                  </div>
                  <div class="custom-options" id="customOptionsMarketingTeam"></div>
                </div>
              </div>
              <div class="error-message" id="marketing-team-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.marketingTeam.error}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label class="required">${translations.fields.marketingTools.label}</label>
          <div class="select-container multi-select" id="marketingToolsDropdown">
            <select id="marketing-tools" name="marketing-tools" multiple></select>
            <div class="select-wrapper">
              <div class="select-display placeholder" id="selectDisplayMarketingTools" data-placeholder="${translations.fields.marketingTools.placeholder}">
                <span id="selectedTextMarketingTools">${translations.fields.marketingTools.placeholder}</span>
                <div class="dropdown-icon" id="dropdownIconMarketingTools">
                  ${SVG_CHEVRON}
                </div>
              </div>
              <div class="custom-options" id="customOptionsMarketingTools"></div>
            </div>
          </div>
          <div class="error-message" id="marketing-tools-error">
            <div class="error-icon">!</div>
            <span class="error-text">${translations.fields.marketingTools.error}</span>
          </div>
        </div>
        
        <div class="form-group conditional-field" id="other-tools-field">
          <label for="other-tools" class="required">${translations.fields.otherTools.label}</label>
          <input type="text" id="other-tools" name="other-tools" placeholder="${translations.fields.otherTools.placeholder}">
          <div class="error-message" id="other-tools-error">
            <div class="error-icon">!</div>
            <span class="error-text">${translations.fields.otherTools.error}</span>
          </div>
        </div>
        
        <div class="form-navigation">
          <button type="button" class="btn btn-prev" id="step4-prev">${translations.buttons.previous}</button>
          <button type="button" class="btn btn-next" id="step4-next">${translations.buttons.next}</button>
        </div>
      </div>
      
      <!-- Step 5: VSM Marketing Services -->
      <div class="form-step" id="step-5">
        <h2 class="step-heading">${translations.formSections.services}</h2>
                
        <div class="form-group">
          <label class="required">${translations.fields.services.label}</label>
          <div class="select-container multi-select" id="servicesDropdown">
            <select id="services" name="services" multiple></select>
            <div class="select-wrapper">
              <div class="select-display placeholder" id="selectDisplayServices" data-placeholder="${translations.fields.services.placeholder}">
                <span id="selectedTextServices">${translations.fields.services.placeholder}</span>
                <div class="dropdown-icon" id="dropdownIconServices">
                  ${SVG_CHEVRON}
                </div>
              </div>
              <div class="custom-options" id="customOptionsServices"></div>
            </div>
          </div>
          <div class="error-message" id="services-error">
            <div class="error-icon">!</div>
            <span class="error-text">${translations.fields.services.error}</span>
          </div>
        </div>
        
        <div class="form-group">
          <label class="required">${translations.fields.agencyExperience.label}</label>
          <div class="options-group">
            <label class="radio-option">
              <input type="radio" name="agency-experience" value="yes"> ${translations.fields.agencyExperience.options.yes}
            </label>
            <label class="radio-option">
              <input type="radio" name="agency-experience" value="no"> ${translations.fields.agencyExperience.options.no}
            </label>
          </div>
          <div class="error-message" id="agency-experience-error">
            <div class="error-icon">!</div>
            <span class="error-text">${translations.fields.agencyExperience.error}</span>
          </div>
        </div>
        
        <div class="form-group conditional-field" id="agency-experience-details-field">
          <label for="agency-experience-details">${translations.fields.agencyExperienceDetails.label}</label>
          <textarea id="agency-experience-details" name="agency-experience-details" placeholder="${translations.fields.agencyExperienceDetails.placeholder}" maxlength="500"></textarea>
        </div>
        
        <div class="form-group">
          <label class="required">${translations.fields.challenges.label}</label>
          <div class="select-container multi-select" id="challengesDropdown">
            <select id="challenges" name="challenges" multiple></select>
            <div class="select-wrapper">
              <div class="select-display placeholder" id="selectDisplayChallenges" data-placeholder="${translations.fields.challenges.placeholder}">
                <span id="selectedTextChallenges">${translations.fields.challenges.placeholder}</span>
                <div class="dropdown-icon" id="dropdownIconChallenges">
                  ${SVG_CHEVRON}
                </div>
              </div>
              <div class="custom-options" id="customOptionsChallenges"></div>
            </div>
          </div>
          <div class="error-message" id="challenges-error">
            <div class="error-icon">!</div>
            <span class="error-text">${translations.fields.challenges.error}</span>
          </div>
        </div>
        
        <div class="form-group conditional-field" id="other-challenges-field">
          <label for="other-challenges" class="required">${translations.fields.otherChallenges.label}</label>
          <input type="text" id="other-challenges" name="other-challenges" placeholder="${translations.fields.otherChallenges.placeholder}">
          <div class="error-message" id="other-challenges-error">
            <div class="error-icon">!</div>
            <span class="error-text">${translations.fields.otherChallenges.error}</span>
          </div>
        </div>
        
        <div class="form-navigation">
          <button type="button" class="btn btn-prev" id="step5-prev">${translations.buttons.previous}</button>
          <button type="button" class="btn btn-next" id="step5-next">${translations.buttons.next}</button>
        </div>
      </div>
      
      <!-- Step 6: Additional Information -->
      <div class="form-step" id="step-6">
        <h2 class="step-heading">${translations.formSections.additionalInfo}</h2>
        
        <!-- Job Function and Contact Preference in the same row -->
        <div class="form-row">
          <div class="form-col">
            <div class="form-group">
              <label for="job-function" class="required">${translations.fields.jobFunction.label}</label>
              <div class="select-container" id="jobFunctionDropdown">
                <select id="job-function" name="job-function"></select>
                <div class="select-wrapper">
                  <div class="select-display placeholder" id="selectDisplayJobFunction" data-placeholder="${translations.fields.jobFunction.placeholder}">
                    <span id="selectedTextJobFunction">${translations.fields.jobFunction.placeholder}</span>
                    <div class="dropdown-icon" id="dropdownIconJobFunction">
                      ${SVG_CHEVRON}
                    </div>
                  </div>
                  <div class="custom-options" id="customOptionsJobFunction"></div>
                </div>
              </div>
              <div class="error-message" id="job-function-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.jobFunction.error}</span>
              </div>
            </div>
            
            <!-- "Other" conditional field - keep it under the job function column -->
            <div class="form-group conditional-field" id="other-function-field">
              <label for="other-function" class="required">${translations.fields.otherFunction.label}</label>
              <input type="text" id="other-function" name="other-function" placeholder="${translations.fields.otherFunction.placeholder}">
              <div class="error-message" id="other-function-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.otherFunction.error}</span>
              </div>
            </div>
          </div>
          
          <div class="form-col">
            <div class="form-group">
              <label class="required">${translations.fields.contactPreference.label}</label>
              <div class="select-container" id="contactPreferenceDropdown">
                <select id="contact-preference" name="contact-preference"></select>
                <div class="select-wrapper">
                  <div class="select-display placeholder" id="selectDisplayContactPreference" data-placeholder="${translations.fields.contactPreference.placeholder}">
                    <span id="selectedTextContactPreference">${translations.fields.contactPreference.placeholder}</span>
                    <div class="dropdown-icon" id="dropdownIconContactPreference">
                      ${SVG_CHEVRON}
                    </div>
                  </div>
                  <div class="custom-options" id="customOptionsContactPreference"></div>
                </div>
              </div>
              <div class="error-message" id="contact-preference-error">
                <div class="error-icon">!</div>
                <span class="error-text">${translations.fields.contactPreference.error}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="additional-info">${translations.fields.additionalInfo.label}</label>
          <textarea id="additional-info" name="additional-info" placeholder="${translations.fields.additionalInfo.placeholder}" maxlength="1000"></textarea>
        </div>
        
        <div class="form-group">
          <label class="checkbox-option">
            <input type="checkbox" name="gdpr-consent" id="gdpr-consent">
            ${translations.fields.gdprConsent.label}
          </label>
          <div class="error-message" id="gdpr-consent-error">
            <div class="error-icon">!</div>
            <span class="error-text">${translations.fields.gdprConsent.error}</span>
          </div>
        </div>
        
        <div class="form-navigation">
          <button type="button" class="btn btn-prev" id="step6-prev">${translations.buttons.previous}</button>
          <button type="button" class="btn btn-submit" id="submit-form">${translations.buttons.submit}</button>
        </div>
      </div>
      
      <!-- Step 7: Confirmation -->
      <div class="form-step" id="step-7">
        <div class="confirmation">
          <div class="confirmation-icon">✓</div>
          <h2>${translations.confirmation.title}</h2>
          <p>${translations.confirmation.thankYou} <span id="confirmation-name"></span> !</p>
          <p>${translations.confirmation.message}</p>
          <p>${translations.confirmation.nextSteps}</p>
          
              
          
        </div>
      </div>
    </form>
  </div>`;

    element.appendChild(container);
    this.initForm(container, isEnglish);
    return container;
  },

  // Initialize form and attach all event listeners
  initForm(container, isEnglish) {
    const form = container.querySelector('#multi-step-form');
    let currentStep = 1;
    const totalSteps = 7;
    let isFormSubmitted = false;
    let formTimeoutId = null;

    /*************************************************************
     * 1) Timer Functionality - Added from ContactFormExtension
     *************************************************************/
    function startFormTimer() {
      let timeLeft = VSMFormExtension.TIMEOUT_DURATION;
      
      // Set timeout - no display updates needed
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
      
      // Update UI to indicate timeout
      const submitButton = form.querySelector(".btn-submit");
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = isEnglish ? "Time expired" :"Temps expiré";
        submitButton.style.backgroundColor = "#f44336";
      }
      
      // Notify Voiceflow of timeout if available
      if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
        window.voiceflow.chat.interact({
          type: "timeEnd",
          payload: {
            message: isEnglish ? "Time expired" :"Temps expiré" 
          }
        });
      }
    }

    /*************************************************************
     * 2) Form Disable Function - Added from ContactFormExtension
     *************************************************************/
    function disableAllFormElements() {
      // Set cursor style to not-allowed for all interactive elements
      form.querySelectorAll('button, input, select, textarea, .custom-options, .select-wrapper, .dropdown-icon').forEach(el => {
        el.disabled = true;
        el.style.cursor = "not-allowed";
      });
      
      // Disable dropdown functionality
      form.querySelectorAll('.custom-options.show-options').forEach(opt => {
        opt.classList.remove('show-options');
      });
      
      form.querySelectorAll('.dropdown-icon.rotate').forEach(icon => {
        icon.classList.remove('rotate');
      });
    }

    /*************************************************************
     * 3) Custom Dropdown Functions
     *************************************************************/
    // SVG icons for checkboxes
   
    
    // Build a single-select dropdown
    function buildSingleSelectDropdown(selectId, customOptionsId, displayId, dropdownIconId, options) {
      const select = form.querySelector(`#${selectId}`);
      const customOptions = form.querySelector(`#${customOptionsId}`);
      const display = form.querySelector(`#${displayId}`);
      const dropdownIcon = form.querySelector(`#${dropdownIconId}`);
      
      if (!select || !customOptions || !display || !dropdownIcon) return;
      
      // Clear existing options
      select.innerHTML = '';
      customOptions.innerHTML = '';
      
      // Add empty option
      const emptyOption = document.createElement('option');
      emptyOption.value = '';
      emptyOption.textContent = '-- Sélectionnez --';
      select.appendChild(emptyOption);
      
      // Add options to the select and custom dropdown
      options.forEach(option => {
        // Add to regular select
        const optElement = document.createElement('option');
        optElement.value = option.id;
        optElement.textContent = option.name;
        select.appendChild(optElement);
        
        // Add to custom dropdown
        const customOption = document.createElement('div');
        customOption.className = 'custom-option';
        customOption.dataset.value = option.id;
        
        const checkbox = document.createElement('div');
        checkbox.className = 'option-checkbox';
        checkbox.innerHTML = OPTION_CHECKBOX_ICON;
        
        const optionText = document.createElement('span');
        optionText.textContent = option.name;
        
        customOption.appendChild(checkbox);
        customOption.appendChild(optionText);
        customOptions.appendChild(customOption);
        
        // Add click event to custom option
        customOption.addEventListener('click', () => {
          // Update select value
          select.value = option.id;
          
          // Update display
          display.querySelector('span').textContent = option.name;
          display.classList.remove('placeholder');
          
          // Mark as selected
          document.querySelectorAll(`#${customOptionsId} .custom-option`).forEach(opt => {
            opt.classList.remove('selected');
          });
          customOption.classList.add('selected');
          
          // Hide dropdown
          customOptions.classList.remove('show-options');
          dropdownIcon.classList.remove('rotate');
          
          // Special handling for "other" options
          if (option.id === 'other') {
            if (selectId === 'industry') {
              form.querySelector('#other-industry-field').style.display = 'block';
            } else if (selectId === 'job-function') {
              form.querySelector('#other-function-field').style.display = 'block';
            }
          } else {
            if (selectId === 'industry') {
              form.querySelector('#other-industry-field').style.display = 'none';
            } else if (selectId === 'job-function') {
              form.querySelector('#other-function-field').style.display = 'none';
            }
          }
          
          // Hide error if exists
          const errorId = `${selectId}-error`;
          const errorElement = form.querySelector(`#${errorId}`);
          if (errorElement) {
            errorElement.style.display = 'none';
          }
          
          // Trigger change event on select
          const event = new Event('change');
          select.dispatchEvent(event);
        });
      });
      
      // Toggle dropdown visibility
      display.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close all other dropdowns
        form.querySelectorAll('.custom-options').forEach(options => {
          if (options !== customOptions) {
            options.classList.remove('show-options');
          }
        });
        
        form.querySelectorAll('.dropdown-icon').forEach(icon => {
          if (icon !== dropdownIcon) {
            icon.classList.remove('rotate');
          }
        });
        
        // Toggle current dropdown
        customOptions.classList.toggle('show-options');
        dropdownIcon.classList.toggle('rotate');
      });
    }
    
    // Build a multi-select dropdown
    function buildMultiSelectDropdown(selectId, customOptionsId, displayId, dropdownIconId, options, maxSelections = null) {
      const select = form.querySelector(`#${selectId}`);
      const customOptions = form.querySelector(`#${customOptionsId}`);
      const display = form.querySelector(`#${displayId}`);
      const dropdownIcon = form.querySelector(`#${dropdownIconId}`);
      
      if (!select || !customOptions || !display || !dropdownIcon) return;
      
      // Clear existing options
      select.innerHTML = '';
      customOptions.innerHTML = '';
      
      // Add Select All option for multi-select dropdowns
      const selectAllOption = document.createElement('div');
      selectAllOption.className = 'custom-option select-all';
      selectAllOption.dataset.value = 'select-all';
      
      const selectAllCheckbox = document.createElement('div');
      selectAllCheckbox.className = 'option-checkbox';
      selectAllCheckbox.innerHTML = OPTION_CHECKBOX_ICON;
      
      const selectAllText = document.createElement('span');
      selectAllText.textContent = 'Tout sélectionner';
      
      selectAllOption.appendChild(selectAllCheckbox);
      selectAllOption.appendChild(selectAllText);
      customOptions.appendChild(selectAllOption);
      
      // Add click event to Select All option
      selectAllOption.addEventListener('click', () => {
        const allOptionsSelected = Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all)')).every(
          opt => opt.classList.contains('selected')
        );
        
        // If all are selected, deselect all, otherwise select all
        Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all)')).forEach(opt => {
          const optionValue = opt.dataset.value;
          const optionElement = select.querySelector(`option[value="${optionValue}"]`);
          
          if (allOptionsSelected) {
            opt.classList.remove('selected');
            if (optionElement) optionElement.selected = false;
          } else if (maxSelections === null || getSelectedCount() < maxSelections) {
            opt.classList.add('selected');
            if (optionElement) optionElement.selected = true;
          }
        });
        
        // Update Select All appearance
        if (!allOptionsSelected && (maxSelections === null || getSelectedCount() <= maxSelections)) {
          selectAllOption.classList.add('selected');
        } else {
          selectAllOption.classList.remove('selected');
        }
        
        // Update display text
        updateMultiSelectDisplayText(select, display);
        
        // Trigger change event on select
        const event = new Event('change');
        select.dispatchEvent(event);
      });
      
      // Add options to the select and custom dropdown
      options.forEach(option => {
        // Add to regular select
        const optElement = document.createElement('option');
        optElement.value = option.id;
        optElement.textContent = option.name;
        select.appendChild(optElement);
        
        // Add to custom dropdown
        const customOption = document.createElement('div');
        customOption.className = 'custom-option';
        customOption.dataset.value = option.id;
        
        const checkbox = document.createElement('div');
        checkbox.className = 'option-checkbox';
        checkbox.innerHTML = OPTION_CHECKBOX_ICON;
        
        const optionText = document.createElement('span');
        optionText.textContent = option.name;
        
        customOption.appendChild(checkbox);
        customOption.appendChild(optionText);
        customOptions.appendChild(customOption);
        
        // Add click event to custom option
        customOption.addEventListener('click', (e) => {
          e.stopPropagation();
          
          const isSelected = customOption.classList.contains('selected');
          const optionValue = customOption.dataset.value;
          const optionElement = select.querySelector(`option[value="${optionValue}"]`);
          
          // If max selections is set and we're trying to select more than allowed
          if (maxSelections !== null && !isSelected && getSelectedCount() >= maxSelections) {
            alert(`Vous pouvez sélectionner au maximum ${maxSelections} options.`);
            return;
          }
          
          // Toggle selection
          if (isSelected) {
            customOption.classList.remove('selected');
            if (optionElement) optionElement.selected = false;
          } else {
            customOption.classList.add('selected');
            if (optionElement) optionElement.selected = true;
          }
          
          // Update "Select All" option
          const allOptionsSelected = Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all)')).every(
            opt => opt.classList.contains('selected')
          );
          
          if (allOptionsSelected) {
            customOptions.querySelector('.select-all').classList.add('selected');
          } else {
            customOptions.querySelector('.select-all').classList.remove('selected');
          }
          
          // Update display text
          updateMultiSelectDisplayText(select, display);
          
          // Special handling for options with "other"
          if (optionValue === 'other') {
            if (selectId === 'marketing-tools') {
              form.querySelector('#other-tools-field').style.display = customOption.classList.contains('selected') ? 'block' : 'none';
            } else if (selectId === 'challenges') {
              form.querySelector('#other-challenges-field').style.display = customOption.classList.contains('selected') ? 'block' : 'none';
            }
          }
          
          // Hide error if exists
          const errorId = `${selectId}-error`;
          const errorElement = form.querySelector(`#${errorId}`);
          if (errorElement) {
            errorElement.style.display = 'none';
          }
          
          // Trigger change event on select
          const event = new Event('change');
          select.dispatchEvent(event);
        });
      });
      
      // Helper function to get selected options count
      function getSelectedCount() {
        return Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all)')).filter(
          opt => opt.classList.contains('selected')
        ).length;
      }
      
      // Toggle dropdown visibility
      display.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close all other dropdowns
        form.querySelectorAll('.custom-options').forEach(options => {
          if (options !== customOptions) {
            options.classList.remove('show-options');
          }
        });
        
        form.querySelectorAll('.dropdown-icon').forEach(icon => {
          if (icon !== dropdownIcon) {
            icon.classList.remove('rotate');
          }
        });
        
        // Toggle current dropdown
        customOptions.classList.toggle('show-options');
        dropdownIcon.classList.toggle('rotate');
      });
    }
    
    // Update multi-select display text
    function updateMultiSelectDisplayText(select, display) {
      const selectedOptions = Array.from(select.selectedOptions);
      
      if (selectedOptions.length === 0) {
        display.querySelector('span').textContent = display.getAttribute('data-placeholder');
        display.classList.add('placeholder');
      } else if (selectedOptions.length === 1) {
        display.querySelector('span').textContent = selectedOptions[0].textContent;
        display.classList.remove('placeholder');
      } else {
        display.querySelector('span').textContent = `${selectedOptions.length} options sélectionnées`;
        display.classList.remove('placeholder');
      }
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
      form.querySelectorAll('.custom-options').forEach(dropdown => {
        dropdown.classList.remove('show-options');
      });
      
      form.querySelectorAll('.dropdown-icon').forEach(icon => {
        icon.classList.remove('rotate');
      });
    });

    /*************************************************************
     * 4) Form Navigation and Validation
     *************************************************************/
    // Show current step
    function showStep(stepNumber) {
      // If it's the welcome step (0), hide progress and form, show welcome
      if (stepNumber === 0) {
        container.querySelector('#welcome-screen').style.display = 'block';
        container.querySelector('#progress-container').style.display = 'none';
        container.querySelector('#multi-step-form').style.display = 'none';
        return;
      } else {
        // Otherwise show progress and form, hide welcome
        container.querySelector('#welcome-screen').style.display = 'none';
        container.querySelector('#progress-container').style.display = 'block';
        container.querySelector('#multi-step-form').style.display = 'block';
      }
      
      // Hide all steps
      form.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
      });
      
      // Show the current step
      form.querySelector(`#step-${stepNumber}`).classList.add('active');
      
      // Update progress bar
      const progressBar = container.querySelector('#progress');
      if (progressBar) {
        progressBar.style.width = ((stepNumber - 1) / (totalSteps - 1)) * 100 + '%';
      }
      
      // Update progress steps
      container.querySelectorAll('.progress-step').forEach(step => {
        const stepNum = parseInt(step.getAttribute('data-step'));
        step.classList.remove('active', 'completed');
        
        if (stepNum === stepNumber) {
          step.classList.add('active');
        } else if (stepNum < stepNumber) {
          step.classList.add('completed');
        }
      });
      
      // Update current step
      currentStep = stepNumber;
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Form validation
    function validateStep(stepNumber) {
      let isValid = true;
      
      switch(stepNumber) {
        case 1:
          // Validate contact information
          const firstName = form.querySelector('#first-name').value.trim();
          if (!firstName) {
            showError('first-name-error');
            isValid = false;
          } else {
            hideError('first-name-error');
          }
          
          const lastName = form.querySelector('#last-name').value.trim();
          if (!lastName) {
            showError('last-name-error');
            isValid = false;
          } else {
            hideError('last-name-error');
          }
          
          const email = form.querySelector('#email').value.trim();
          if (!email || !isValidEmail(email)) {
            showError('email-error');
            isValid = false;
          } else {
            hideError('email-error');
          }
          
          const phone = form.querySelector('#phone').value.trim();
          if (!phone || !isValidPhone(phone)) {
            showError('phone-error');
            isValid = false;
          } else {
            hideError('phone-error');
          }
          
          const companyName = form.querySelector('#company-name').value.trim();
          if (!companyName) {
            showError('company-name-error');
            isValid = false;
          } else {
            hideError('company-name-error');
          }
          break;
          
        case 2:
          // Validate company information
          const industry = form.querySelector('#industry').value;
          if (!industry) {
            showError('industry-error');
            isValid = false;
          } else {
            hideError('industry-error');
            
            if (industry === 'other') {
              const otherIndustry = form.querySelector('#other-industry').value.trim();
              if (!otherIndustry) {
                showError('other-industry-error');
                isValid = false;
              } else {
                hideError('other-industry-error');
              }
            }
          }
          
          const companySize = form.querySelector('#company-size').value;
          if (!companySize) {
            showError('company-size-error');
            isValid = false;
          } else {
            hideError('company-size-error');
          }
          
          const hasWebsiteChecked = form.querySelector('input[name="has-website"]:checked');
          if (!hasWebsiteChecked) {
            showError('has-website-error');
            isValid = false;
          } else {
            hideError('has-website-error');
            
            if (hasWebsiteChecked.value === 'yes') {
  const websiteUrl = form.querySelector('#website-url').value.trim();
  if (!websiteUrl) {
    showError('website-url-error');
    isValid = false;
  } else if (!isValidUrl(websiteUrl)) {
    // New validation check for URL format
    showError('website-url-error');
    isValid = false;
  } else {
    hideError('website-url-error');
  }
}
          }
          break;
          
        case 3:
          // Validate marketing objectives
          const objectivesSelected = form.querySelector('#objectives').selectedOptions;
			if (objectivesSelected.length === 0) {
			  showError('objectives-error');
			  isValid = false;
			} else {
			  hideError('objectives-error');
			}
          
          const projectUrgency = form.querySelector('#project-urgency').value;
          if (!projectUrgency) {
            showError('project-urgency-error');
            isValid = false;
          } else {
            hideError('project-urgency-error');
          }
          
          const hasStrategyChecked = form.querySelector('input[name="has-strategy"]:checked');
          if (!hasStrategyChecked) {
            showError('has-strategy-error');
            isValid = false;
          } else {
            hideError('has-strategy-error');
          }
          break;
          
        case 4:
          // Validate resources and budget
          const budget = form.querySelector('#budget').value;
          if (!budget) {
            showError('budget-error');
            isValid = false;
          } else {
            hideError('budget-error');
          }
          
          const marketingTeam = form.querySelector('#marketing-team').value;
          if (!marketingTeam) {
            showError('marketing-team-error');
            isValid = false;
          } else {
            hideError('marketing-team-error');
          }
          
          const marketingToolsSelected = form.querySelector('#marketing-tools').selectedOptions;
          if (marketingToolsSelected.length === 0) {
            showError('marketing-tools-error');
            isValid = false;
          } else {
            hideError('marketing-tools-error');
            
            // Check if "other" is selected
            const otherToolSelected = Array.from(marketingToolsSelected).some(option => option.value === 'other');
            if (otherToolSelected) {
              const otherTools = form.querySelector('#other-tools').value.trim();
              if (!otherTools) {
                showError('other-tools-error');
                isValid = false;
              } else {
                hideError('other-tools-error');
              }
            }
          }
          break;
          
        case 5:
          // Validate services and challenges
          const servicesSelected = form.querySelector('#services').selectedOptions;
          if (servicesSelected.length === 0) {
            showError('services-error');
            isValid = false;
          } else {
            hideError('services-error');
          }
          
          const agencyExperienceChecked = form.querySelector('input[name="agency-experience"]:checked');
          if (!agencyExperienceChecked) {
            showError('agency-experience-error');
            isValid = false;
          } else {
            hideError('agency-experience-error');
          }
          
          const challengesSelected = form.querySelector('#challenges').selectedOptions;
			if (challengesSelected.length === 0) {
			  showError('challenges-error');
			  isValid = false;
			} else {
			  hideError('challenges-error');
			  
            // Check if "other" is selected
            const otherChallengeSelected = Array.from(challengesSelected).some(option => option.value === 'other');
            if (otherChallengeSelected) {
              const otherChallenges = form.querySelector('#other-challenges').value.trim();
              if (!otherChallenges) {
                showError('other-challenges-error');
                isValid = false;
              } else {
                hideError('other-challenges-error');
              }
            }
          }
          break;
          
        case 6:
          // Validate additional information
          const jobFunction = form.querySelector('#job-function').value;
          if (!jobFunction) {
            showError('job-function-error');
            isValid = false;
          } else {
            hideError('job-function-error');
            
            if (jobFunction === 'other') {
              const otherFunction = form.querySelector('#other-function').value.trim();
              if (!otherFunction) {
                showError('other-function-error');
                isValid = false;
              } else {
                hideError('other-function-error');
              }
            }
          }
          
          const contactPreference = form.querySelector('#contact-preference').value;
          if (!contactPreference) {
            showError('contact-preference-error');
            isValid = false;
          } else {
            hideError('contact-preference-error');
          }
          
          const gdprConsent = form.querySelector('#gdpr-consent').checked;
          if (!gdprConsent) {
            showError('gdpr-consent-error');
            isValid = false;
          } else {
            hideError('gdpr-consent-error');
          }
          break;
      }
      
      return isValid;
    }
    
    // Show error message
    function showError(errorId) {
      const errorElement = form.querySelector(`#${errorId}`);
      if (errorElement) {
        errorElement.classList.add('show');
      }
    }
    
    // Hide error message
    function hideError(errorId) {
      const errorElement = form.querySelector(`#${errorId}`);
      if (errorElement) {
        errorElement.classList.remove('show');
      }
    }
    
    // Validate email
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    // Validate phone
    function isValidPhone(phone) {
      // Simple validation for French phone numbers
      const phonePattern = /^(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
      return phonePattern.test(phone);
    }
    
    // Validate URL
function isValidUrl(url) {
  // If the URL is empty, it's not valid
  if (!url || url.trim() === '') {
    return false;
  }
  
  // First, normalize the URL
  let normalizedUrl = url.trim();
  
  // If URL doesn't start with a protocol, add https:// for validation purposes
  if (!normalizedUrl.match(/^https?:\/\//i)) {
    normalizedUrl = 'https://' + normalizedUrl;
  }
  
  try {
    // Use the built-in URL constructor for validation
    const urlObj = new URL(normalizedUrl);
    
    // Check if it's a standard URL with a domain containing dots
    // or a localhost/intranet URL which might not have dots
    const isStandardDomain = urlObj.hostname.includes('.');
    const isLocalhost = urlObj.hostname === 'localhost' || urlObj.hostname.match(/^[\w-]+$/);
    
    return isStandardDomain || isLocalhost;
  } catch (error) {
    // If URL constructor throws an error, the URL is not valid
    return false;
  }
}

    /*************************************************************
     * 5) Form Submission with Webhook and Voiceflow Integration
     *************************************************************/
    async function submitForm() {
      try {
        // Collect all form data
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData);
        
        // Update confirmation name for the thank you screen
        const firstName = form.querySelector('#first-name').value.trim();
        container.querySelector('#confirmation-name').textContent = firstName || 'client';
        
        // Disable all form elements to prevent resubmission
        disableAllFormElements();
        
        // Update submit button to show processing state
        const submitButton = form.querySelector(".btn-submit");
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = isEnglish ? "Processing..." :"Traitement..." ;
          submitButton.style.cursor = "not-allowed";
        }
        
        // Mark form as submitted to prevent timeout handler from triggering
        isFormSubmitted = true;
        if (formTimeoutId) {
          clearInterval(formTimeoutId);
        }
        
        // Send to webhook
        const response = await VSMFormExtension.sendToWebhook(formDataObj);
        console.log('Form submitted successfully to webhook!', response);
        
        // If webhook was successful, update button
        if (submitButton) {
          submitButton.style.backgroundColor = "#4CAF50";
          submitButton.textContent = isEnglish ? "Submitted!" : "Envoyé!";
        }
        
        // Notify Voiceflow of success if available
        if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
          window.voiceflow.chat.interact({
            type: "success",
            payload: formDataObj
          });
        }
        
        // Show confirmation step
        showStep(7);
      } catch (error) {
        console.error('Error submitting form:', error);
        
        // Update button to show error state
        const submitButton = form.querySelector(".btn-submit");
        if (submitButton) {
          submitButton.style.backgroundColor = "#f44336";
          submitButton.textContent = isEnglish ? "Error! Retry" : "Erreur! Réessayer";
          
          // Enable button again to allow retry
          setTimeout(() => {
            submitButton.disabled = false;
            submitButton.style.cursor = "pointer";
          }, 2000);
        }
        
        // Notify Voiceflow of error if available
        if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
          window.voiceflow.chat.interact({
            type: "error",
            payload: {
              message: "Failed to submit form",
              error: error.message
            }
          });
        }
        
        // Optionally add an error message to the form
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message show';
        errorMessage.innerHTML = `
          <div class="error-icon">!</div>
          <span class="error-text">${isEnglish ? "An error occurred while submitting the form. Please try again."
             : "Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer."
            }</span>
        `;
        
        // Append error message to the form navigation area
        const formNavigation = form.querySelector(`#step-6 .form-navigation`);
        if (formNavigation) {
          formNavigation.insertAdjacentElement('beforebegin', errorMessage);
        }
      }
    }

    /*************************************************************
     * 6) Initialize Dropdowns
     *************************************************************/
    // Initialize all custom dropdowns
    // Find the initializeDropdowns function in the code and replace it with this fixed version
function initializeDropdowns() {
  // Determine which language to use
  const lang = isEnglish ? 'en' : 'fr';
  
  // Use the correct language arrays from formData
  // Single-select dropdowns
  buildSingleSelectDropdown('industry', 'customOptionsIndustry', 'selectDisplayIndustry', 'dropdownIconIndustry', 
    VSMFormExtension.formData.industries[lang]);
  
  buildSingleSelectDropdown('company-size', 'customOptionsCompanySize', 'selectDisplayCompanySize', 'dropdownIconCompanySize', 
    VSMFormExtension.formData.companySizes[lang]);
  
  buildSingleSelectDropdown('project-urgency', 'customOptionsProjectUrgency', 'selectDisplayProjectUrgency', 'dropdownIconProjectUrgency', 
    VSMFormExtension.formData.projectUrgency[lang]);
  
  buildSingleSelectDropdown('budget', 'customOptionsBudget', 'selectDisplayBudget', 'dropdownIconBudget', 
    VSMFormExtension.formData.budgets[lang]);
  
  buildSingleSelectDropdown('marketing-team', 'customOptionsMarketingTeam', 'selectDisplayMarketingTeam', 'dropdownIconMarketingTeam', 
    VSMFormExtension.formData.marketingTeam[lang]);
  
  buildSingleSelectDropdown('job-function', 'customOptionsJobFunction', 'selectDisplayJobFunction', 'dropdownIconJobFunction', 
    VSMFormExtension.formData.jobFunction[lang]);
  
  buildSingleSelectDropdown('contact-preference', 'customOptionsContactPreference', 'selectDisplayContactPreference', 'dropdownIconContactPreference', 
    VSMFormExtension.formData.contactPreference[lang]);
  
  // Multi-select dropdowns
  buildMultiSelectDropdown('objectives', 'customOptionsObjectives', 'selectDisplayObjectives', 'dropdownIconObjectives', 
    VSMFormExtension.formData.objectives[lang]);
  
  buildMultiSelectDropdown('marketing-tools', 'customOptionsMarketingTools', 'selectDisplayMarketingTools', 'dropdownIconMarketingTools', 
    VSMFormExtension.formData.marketingTools[lang]);
  
  buildMultiSelectDropdown('services', 'customOptionsServices', 'selectDisplayServices', 'dropdownIconServices', 
    VSMFormExtension.formData.services[lang]);
  
  buildMultiSelectDropdown('challenges', 'customOptionsChallenges', 'selectDisplayChallenges', 'dropdownIconChallenges', 
    VSMFormExtension.formData.challenges[lang]);
}
    
    // Initialize conditional fields
    function initializeConditionalFields() {
      // Industry "other" field
      form.querySelector('#industry').addEventListener('change', function() {
        const otherIndustryField = form.querySelector('#other-industry-field');
        otherIndustryField.style.display = this.value === 'other' ? 'block' : 'none';
      });
      
      // Website URL field - Fix for radio buttons
      const hasWebsiteRadios = form.querySelectorAll('input[name="has-website"]');
      hasWebsiteRadios.forEach(radio => {
        radio.addEventListener('click', function() {
          const websiteUrlField = form.querySelector('#website-url-field');
          websiteUrlField.style.display = this.value === 'yes' ? 'block' : 'none';
        });
      });
      
      // Strategy details field - Fix for radio buttons
      const hasStrategyRadios = form.querySelectorAll('input[name="has-strategy"]');
      hasStrategyRadios.forEach(radio => {
        radio.addEventListener('click', function() {
          const strategyDetailsField = form.querySelector('#strategy-details-field');
          strategyDetailsField.style.display = this.value === 'yes' ? 'block' : 'none';
        });
      });
      
      // Marketing tools "other" field
      form.querySelector('#marketing-tools').addEventListener('change', function() {
        const otherToolsField = form.querySelector('#other-tools-field');
        const otherSelected = Array.from(this.selectedOptions).some(option => option.value === 'other');
        otherToolsField.style.display = otherSelected ? 'block' : 'none';
      });
      
      // Agency experience details field - Fix for radio buttons
      const agencyExperienceRadios = form.querySelectorAll('input[name="agency-experience"]');
      agencyExperienceRadios.forEach(radio => {
        radio.addEventListener('click', function() {
          const agencyExperienceDetailsField = form.querySelector('#agency-experience-details-field');
          agencyExperienceDetailsField.style.display = this.value === 'yes' ? 'block' : 'none';
        });
      });
      
      // Challenges "other" field
      form.querySelector('#challenges').addEventListener('change', function() {
        const otherChallengesField = form.querySelector('#other-challenges-field');
        const otherSelected = Array.from(this.selectedOptions).some(option => option.value === 'other');
        otherChallengesField.style.display = otherSelected ? 'block' : 'none';
      });
      
      // Job function "other" field
      form.querySelector('#job-function').addEventListener('change', function() {
        const otherFunctionField = form.querySelector('#other-function-field');
        otherFunctionField.style.display = this.value === 'other' ? 'block' : 'none';
      });
    }

    /*************************************************************
     * 7) Event Listeners
     *************************************************************/
    // Welcome screen start button
    container.querySelector('#start-form').addEventListener('click', function() {
      showStep(1);
    });
    
    // Step 1 to 2
    form.querySelector('#step1-next').addEventListener('click', function() {
      if (validateStep(1)) {
        showStep(2);
      }
    });
    
    // Step 2 navigation
    form.querySelector('#step2-prev').addEventListener('click', function() {
      showStep(1);
    });
    
    form.querySelector('#step2-next').addEventListener('click', function() {
      if (validateStep(2)) {
        showStep(3);
      }
    });
    
    // Step 3 navigation
    form.querySelector('#step3-prev').addEventListener('click', function() {
      showStep(2);
    });
    
    form.querySelector('#step3-next').addEventListener('click', function() {
      if (validateStep(3)) {
        showStep(4);
      }
    });
    
    // Step 4 navigation
    form.querySelector('#step4-prev').addEventListener('click', function() {
      showStep(3);
    });
    
    form.querySelector('#step4-next').addEventListener('click', function() {
      if (validateStep(4)) {
        showStep(5);
      }
    });
    
    // Step 5 navigation
    form.querySelector('#step5-prev').addEventListener('click', function() {
      showStep(4);
    });
    
    form.querySelector('#step5-next').addEventListener('click', function() {
      if (validateStep(5)) {
        showStep(6);
      }
    });
    
    // Step 6 navigation
    form.querySelector('#step6-prev').addEventListener('click', function() {
      showStep(5);
    });
    
    // Submit form
    form.querySelector('#submit-form').addEventListener('click', function() {
      if (validateStep(6)) {
        submitForm();
      }
    });

    /*************************************************************
     * 8) Input Event Listeners to Hide Error Messages
     *************************************************************/
    // Add input event listeners to text fields
    form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').forEach(input => {
      input.addEventListener('input', function() {
        const fieldName = this.id;
        const errorElement = form.querySelector(`#${fieldName}-error`);
        if (errorElement && this.value.trim() !== '') {
          errorElement.classList.remove('show');
        }
      });
    });
    
    // Add change event listeners for radio buttons
    form.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const fieldName = this.name;
        const errorElement = form.querySelector(`#${fieldName}-error`);
        if (errorElement) {
          errorElement.classList.remove('show');
        }
      });
    });
    
    // Add change event for checkbox
    form.querySelector('#gdpr-consent').addEventListener('change', function() {
      if (this.checked) {
        const errorElement = form.querySelector('#gdpr-consent-error');
        if (errorElement) {
          errorElement.classList.remove('show');
        }
      }
    });
    
    /*************************************************************
     * 9) Initialization
     *************************************************************/
    // Initialize dropdowns
    initializeDropdowns();
    
    // Initialize conditional fields
    initializeConditionalFields();
    
    // Start the form timer
    startFormTimer();
    
    // Show welcome screen initially
    showStep(0);
  }
};


