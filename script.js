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

function normalizeUrl(url) {
            if (!url || url.trim() === '') return '';
            
            let normalized = url.trim();
            
            // Remove protocol if present
            normalized = normalized.replace(/^https?:\/\//, '');
            
            // Remove trailing slash and any path
            normalized = normalized.split('/')[0];
            
            // Add www. if not present
            if (!normalized.startsWith('www.')) {
                normalized = 'www.' + normalized;
            }
            
            return normalized;
        }
// SVG constants
const SVG_CHECK =`
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12px" height="12px">
		<path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
	</svg>`;
const SVG_CHEVRON =`
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
		<g transform="translate(75, 75)">
			<path fill="#9C27B0" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
		</g>
	</svg>`;
const SVG_LANGUAGE =`
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
		<path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"/>
		<path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3spana2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1spanzm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"/>
	</svg>`;
const SVG_Plus =`
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 400" width="15px" height="15px"> 
		<path fill="#9C27B0" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
	</svg>`;
const SVG_Minus =`
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 400" width="15px" height="15px"> 
		<path fill="#9C27B0" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
	</svg>`;
const SVG_CLOSE =`
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="8px" height="8px">
		<path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
	</svg>`;
const SVG_INFO =`
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
		<path class="info-bg" fill="#f8e8f8" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
		<path class="info-icon" fill="#9C27B0" d="M216 336l24 0 0-64-24 0 c-13.3 0-24-10.7-24-24s10.7-24 24-24 l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24 l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208 a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
	</svg>`;
const SVG_USER = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24px" height="24px">
		<path fill="#ffffff" d="M0 96C0 60.7 28.7 32 64 32l448 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM128 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm32-128a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm96-248c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0z"/>
	</svg>`;
const SVG_AGENT = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px">
		<path fill="#9C27B0" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
	</svg>`;
const SVG_MESSAGE = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24px" height="24px">
		<path fill="#ffffff" d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/>
	</svg>`;
const SVG_CALENDAR = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
		<path fill="#ffffff" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48H0l0-48c0-26.5 21.5-48 48-48l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
	</svg>`;

const ServiceOptions = [
    {
        value: "IA agent",
        label: {
            "en": "IA agent",
            "fr": "Agent IA"
        },
	},
    {
        value: "Automation",
        label: {
            "en": "Automation",
            "fr": "Automatisation"
        },
	},
    {
        value: "Web site",
        label: {
            "en": "Web site",
            "fr": "Site web"
        },
	},
];


/*************************************************************
 * 3) SubmissionFormExtension - MAIN EXTENSION OBJECT
 *************************************************************/

const SubmissionFormExtension = {
    name: "ChatbotForm",
    type: "response",
    match: ({
        trace
    }) => trace.type === "ext_submission_form" || trace.payload?.name === "ext_submission_form",
    render: ({
        trace,
        element
    }) => {
        // Get language from payload with French as default
        //let { currentLanguage = "fr" } = trace.payload || {};
        let {
            currentLanguage,
            vf
        } = trace.payload;
        // Initialize form data with the current language
        // Step management
        let currentStep = 1;
        const totalSteps = 9; 
        let isFormSubmitted = false;
        const TIMEOUT_DURATION = 900000; 
        let formTimeoutId = null;
        // Form data store
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
    otherFormType: "", // NEW FIELD ADDED
    crms: [],
    otherCrm: "",
    socialPlatforms: [],
    databases: [],
    otherDatabase: "",
    languages: [],
    hasBookingSystem: null,
    bookingSystems: null,
    otherBooking: "",
    wantBookingRecommendation: null,
    handleCancellation: null,
    useDatabase: null,
    languageType: null,
    niche: null,
    otherNiche: "",
    description: "",
    budget: null,
    customBudget: "",
    formLanguage: currentLanguage
};

// URL du webhook Make - Remplacez par votre URL réelle
        const WEBHOOK_URL = "https://hook.us2.make.com/va34lvxwhhcbp3iojevheqivo2ybbxua";
        const translations = {
    "fr": {
        formTitle: "Formulaire de Demande de Projet",
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
        otherFormTypeRequired: "Veuillez préciser le type de formulaire",
        otherFormTypeLabel: "Précisez le type de formulaire",
        otherFormTypePlaceholder: "Nom du type de formulaire...",
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
        otherCrmRequired: "Veuillez préciser le nom du CRM",
        otherBookingRequired: "Veuillez préciser le nom du système de réservation", 
        otherDatabaseRequired: "Veuillez préciser le nom de la base de données",
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
        formTitle: "Project Submission Form",
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
        otherFormTypeRequired: "Please specify the form type",
        otherFormTypeLabel: "Specify the form type",
        otherFormTypePlaceholder: "Form type name...",
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
        otherCrmRequired: "Please specify the CRM name",
        otherBookingRequired: "Please specify the booking system name",
        otherDatabaseRequired: "Please specify the database name",
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
        const formDataTranslations = {
            "fr": {
                languages: [
                    {
                        id: "fr",
                        name: "Français"
                    },
                    {
                        id: "en",
                        name: "Anglais"
                    },
                    {
                        id: "es",
                        name: "Espagnol"
                    },
                    {
                        id: "de",
                        name: "Allemand"
                    },
                    {
                        id: "it",
                        name: "Italien"
                    },
                    {
                        id: "ar",
                        name: "Arabe"
                    },
                    {
                        id: "zh",
                        name: "Chinois"
                    },
// Langues supplémentaires
                    {
                        id: "pt",
                        name: "Portugais"
                    },
                    {
                        id: "ru",
                        name: "Russe"
                    },
                    {
                        id: "ja",
                        name: "Japonais"
                    },
                    {
                        id: "ko",
                        name: "Coréen"
                    },
                    {
                        id: "hi",
                        name: "Hindi"
                    },
                    {
                        id: "nl",
                        name: "Néerlandais"
                    },
                    {
                        id: "sv",
                        name: "Suédois"
                    }
],
                websiteTraffic: [
                    {
                        id: "less_than_1000",
                        name: "Moins de 1 000 visiteurs/mois"
                    },
                    {
                        id: "1000_5000",
                        name: "1 000 - 5 000 visiteurs/mois"
                    },
                    {
                        id: "5000_10000",
                        name: "5 000 - 10 000 visiteurs/mois"
                    },
                    {
                        id: "10000_50000",
                        name: "10 000 - 50 000 visiteurs/mois"
                    },
                    {
                        id: "50000_100000",
                        name: "50 000 - 100 000 visiteurs/mois"
                    },
                    {
                        id: "100000_500000",
                        name: "100 000 - 500 000 visiteurs/mois"
                    },
                    {
                        id: "500000_1000000",
                        name: "500 000 - 1 000 000 visiteurs/mois"
                    },
                    {
                        id: "more_than_1000000",
                        name: "Plus de 1 000 000 visiteurs/mois"
                    },
                    {
                        id: "unknown",
                        name: "Je ne sais pas"
                    },
                    {
                        id: "new_site",
                        name: "Nouveau site (pas encore de trafic)"
                    }
],
                crms: [
                    {
                        id: "salesforce",
                        name: "Salesforce"
                    },
                    {
                        id: "hubspot",
                        name: "HubSpot"
                    },
                    {
                        id: "zoho",
                        name: "Zoho CRM"
                    },
                    {
                        id: "pipedrive",
                        name: "Pipedrive"
                    },
                    {
                        id: "monday",
                        name: "monday.com"
                    },
                    {
                        id: "freshsales",
                        name: "Freshsales"
                    },
// CRMs supplémentaires
                    {
                        id: "dynamics",
                        name: "Microsoft Dynamics 365"
                    },
                    {
                        id: "sugarcrm",
                        name: "SugarCRM"
                    },
                    {
                        id: "insightly",
                        name: "Insightly"
                    },
                    {
                        id: "bitrix24",
                        name: "Bitrix24"
                    },
                    {
                        id: "agilecrm",
                        name: "Agile CRM"
                    },
                    {
                        id: "keap",
                        name: "Keap (Infusionsoft)"
                    },
                    {
                        id: "efficy",
                        name: "Efficy CRM"
                    },
                    {
                        id: "netsuite",
                        name: "NetSuite CRM"
                    },
                    {
                        id: "other",
                        name: "Autre"
                    }
],
                bookingSystems: [
                    {
                        id: "cal",
                        name: "Cal.com"
                    },
                    {
                        id: "calendly",
                        name: "Calendly"
                    },
                    {
                        id: "acuity",
                        name: "Acuity Scheduling"
                    },
                    {
                        id: "booksy",
                        name: "Booksy"
                    },
                    {
                        id: "simplybook",
                        name: "SimplyBook.me"
                    },
                    {
                        id: "square",
                        name: "Square Appointments"
                    },
                    {
                        id: "google_calendar",
                        name: "Google Calendar"
                    },
                    {
                        id: "setmore",
                        name: "Setmore"
                    },
                    {
                        id: "appointy",
                        name: "Appointy"
                    },
                    {
                        id: "timetap",
                        name: "TimeTap"
                    },
                    {
                        id: "bookafy",
                        name: "Bookafy"
                    },
                    {
                        id: "schedulicity",
                        name: "Schedulicity"
                    },
                    {
                        id: "youcanbook",
                        name: "YouCanBookMe"
                    },
                    {
                        id: "planyo",
                        name: "Planyo"
                    },
                    {
                        id: "reservio",
                        name: "Reservio"
                    },
                    {
                        id: "other",
                        name: "Autre"
                    }
],
                databases: [
                    {
                        id: "mysql",
                        name: "MySQL"
                    },
                    {
                        id: "postgresql",
                        name: "PostgreSQL"
                    },
                    {
                        id: "mongodb",
                        name: "MongoDB"
                    },
                    {
                        id: "firebase",
                        name: "Firebase"
                    },
                    {
                        id: "airtable",
                        name: "Airtable"
                    },
                    {
                        id: "google_sheets",
                        name: "Google Sheets"
                    },
                    {
                        id: "oracle",
                        name: "Oracle Database"
                    },
                    {
                        id: "sqlserver",
                        name: "Microsoft SQL Server"
                    },
                    {
                        id: "mariadb",
                        name: "MariaDB"
                    },
                    {
                        id: "dynamodb",
                        name: "Amazon DynamoDB"
                    },
                    {
                        id: "cassandra",
                        name: "Apache Cassandra"
                    },
                    {
                        id: "redis",
                        name: "Redis"
                    },
                    {
                        id: "supabase",
                        name: "Supabase"
                    },
                    {
                        id: "notion",
                        name: "Notion Database"
                    },
                    {
                        id: "other",
                        name: "Autre"
                    }
],
                websitePlatforms: [
                    {
                        id: "wordpress",
                        name: "WordPress"
                    },
                    {
                        id: "shopify",
                        name: "Shopify"
                    },
                    {
                        id: "wix",
                        name: "Wix"
                    },
                    {
                        id: "squarespace",
                        name: "Squarespace"
                    },
                    {
                        id: "webflow",
                        name: "Webflow"
                    },
                    {
                        id: "custom",
                        name: "Sur mesure"
                    },
                    {
                        id: "drupal",
                        name: "Drupal"
                    },
                    {
                        id: "joomla",
                        name: "Joomla"
                    },
                    {
                        id: "magento",
                        name: "Magento"
                    },
                    {
                        id: "bigcommerce",
                        name: "BigCommerce"
                    },
                    {
                        id: "godaddy",
                        name: "GoDaddy Website Builder"
                    },
                    {
                        id: "strikingly",
                        name: "Strikingly"
                    },
                    {
                        id: "ghost",
                        name: "Ghost"
                    },
                    {
                        id: "prestashop",
                        name: "PrestaShop"
                    },
                    {
                        id: "bubble",
                        name: "Bubble.io"
                    },
                    {
                        id: "other",
                        name: "Autre"
                    }
],
                socialPlatforms: [
                    {
                        id: "facebook",
                        name: "Facebook Messenger"
                    },
                    {
                        id: "instagram",
                        name: "Instagram"
                    },
                    {
                        id: "whatsapp",
                        name: "WhatsApp"
                    },
                    {
                        id: "telegram",
                        name: "Telegram"
                    },
                    {
                        id: "discord",
                        name: "Discord"
                    },
                    {
                        id: "slack",
                        name: "Slack"
                    },
                    {
                        id: "viber",
                        name: "Teams"
                    }
],
                niches: [
                    {
                        id: "ecommerce",
                        name: "E-commerce"
                    },
                    {
                        id: "services",
                        name: "Services professionnels"
                    },
                    {
                        id: "healthcare",
                        name: "Santé"
                    },
                    {
                        id: "education",
                        name: "Éducation"
                    },
                    {
                        id: "realestate",
                        name: "Immobilier"
                    },
                    {
                        id: "restaurant",
                        name: "Restauration"
                    },
                    {
                        id: "fitness",
                        name: "Fitness & Bien-être"
                    },
                    {
                        id: "travel",
                        name: "Voyage & Tourisme"
                    },
                    {
                        id: "finance",
                        name: "Finance & Assurance"
                    },
                    {
                        id: "manufacturing",
                        name: "Industrie manufacturière"
                    },
                    {
                        id: "automotive",
                        name: "Automobile"
                    },
                    {
                        id: "legal",
                        name: "Services juridiques"
                    },
                    {
                        id: "technology",
                        name: "IT & Technologie"
                    },
                    {
                        id: "media",
                        name: "Médias & Divertissement"
                    },
                    {
                        id: "construction",
                        name: "Construction & BTP"
                    },
                    {
                        id: "agriculture",
                        name: "Agriculture & Agroalimentaire"
                    },
                    {
                        id: "nonprofit",
                        name: "Associations & ONG"
                    },
                    {
                        id: "beauty",
                        name: "Beauté & Cosmétiques"
                    },
                    {
                        id: "consulting",
                        name: "Conseil & Consulting"
                    },
                    {
                        id: "retail",
                        name: "Commerce de détail"
                    },
                    {
                        id: "other",
                        name: "Autre"
                    }
],
                formTypes: [
    {
        id: "contact",
        name: "Formulaire de contact"
    },
    {
        id: "lead",
        name: "Génération de leads"
    },
    {
        id: "survey",
        name: "Questionnaire"
    },
    {
        id: "booking",
        name: "Réservation"
    },
    {
        id: "support",
        name: "Support client"
    },
    {
        id: "feedback",
        name: "Feedback client"
    },
    {
        id: "quote",
        name: "Demande de devis"
    },
    {
        id: "registration",
        name: "Inscription/Enregistrement"
    },
    {
        id: "newsletter",
        name: "Abonnement newsletter"
    },
    {
        id: "contest",
        name: "Participation concours"
    },
    {
        id: "job",
        name: "Candidature emploi"
    },
    {
        id: "event",
        name: "Inscription événement"
    },
    {
        id: "payment",
        name: "Formulaire de paiement"
    },
    {
        id: "appointment",
        name: "Prise de rendez-vous"
    },
    {
        id: "order",
        name: "Bon de commande"
    },
    {
        id: "membership",
        name: "Adhésion"
    },
    {
        id: "other",
        name: "Autre"
    }
],
                budgetRanges: [
                    {
                        id: "less_than_1000",
                        name: "Moins de 1 000 $"
                    },
                    {
                        id: "1000_2500",
                        name: "1 000 $ - 2 500 $"
                    },
                    {
                        id: "2500_5000",
                        name: "2 500 $ - 5 000 $"
                    },
                    {
                        id: "5000_7500",
                        name: "5 000 $ - 7 500 $"
                    },
                    {
                        id: "7500_10000",
                        name: "7 500 $ - 10 000 $"
                    },
                    {
                        id: "more_than_10000",
                        name: "Plus de 10 000 $"
                    },
                    {
                        id: "monthly_subscription",
                        name: "Abonnement mensuel"
                    },
                    {
                        id: "annual_subscription",
                        name: "Abonnement annuel"
                    },
                    {
                        id: "not_specified",
                        name: "Budget non défini"
                    }
]
            },
            "en": {
                languages: [
                    {
                        id: "fr",
                        name: "French"
                    },
                    {
                        id: "en",
                        name: "English"
                    },
                    {
                        id: "es",
                        name: "Spanish"
                    },
                    {
                        id: "de",
                        name: "German"
                    },
                    {
                        id: "it",
                        name: "Italian"
                    },
                    {
                        id: "ar",
                        name: "Arabic"
                    },
                    {
                        id: "zh",
                        name: "Chinese"
                    },
                    {
                        id: "pt",
                        name: "Portuguese"
                    },
                    {
                        id: "ru",
                        name: "Russian"
                    },
                    {
                        id: "ja",
                        name: "Japanese"
                    },
                    {
                        id: "ko",
                        name: "Korean"
                    },
                    {
                        id: "hi",
                        name: "Hindi"
                    },
                    {
                        id: "nl",
                        name: "Dutch"
                    },
                    {
                        id: "sv",
                        name: "Swedish"
                    }
],
                websiteTraffic: [
                    {
                        id: "less_than_1000",
                        name: "Less than 1,000 visitors/month"
                    },
                    {
                        id: "1000_5000",
                        name: "1,000 - 5,000 visitors/month"
                    },
                    {
                        id: "5000_10000",
                        name: "5,000 - 10,000 visitors/month"
                    },
                    {
                        id: "10000_50000",
                        name: "10,000 - 50,000 visitors/month"
                    },
                    {
                        id: "50000_100000",
                        name: "50,000 - 100,000 visitors/month"
                    },
                    {
                        id: "100000_500000",
                        name: "100,000 - 500,000 visitors/month"
                    },
                    {
                        id: "500000_1000000",
                        name: "500,000 - 1,000,000 visitors/month"
                    },
                    {
                        id: "more_than_1000000",
                        name: "More than 1,000,000 visitors/month"
                    },
                    {
                        id: "unknown",
                        name: "I don't know"
                    },
                    {
                        id: "new_site",
                        name: "New site (no traffic yet)"
                    }
],
                crms: [
                    {
                        id: "salesforce",
                        name: "Salesforce"
                    },
                    {
                        id: "hubspot",
                        name: "HubSpot"
                    },
                    {
                        id: "zoho",
                        name: "Zoho CRM"
                    },
                    {
                        id: "pipedrive",
                        name: "Pipedrive"
                    },
                    {
                        id: "monday",
                        name: "monday.com"
                    },
                    {
                        id: "freshsales",
                        name: "Freshsales"
                    },
// Additional CRMs
                    {
                        id: "dynamics",
                        name: "Microsoft Dynamics 365"
                    },
                    {
                        id: "sugarcrm",
                        name: "SugarCRM"
                    },
                    {
                        id: "insightly",
                        name: "Insightly"
                    },
                    {
                        id: "bitrix24",
                        name: "Bitrix24"
                    },
                    {
                        id: "agilecrm",
                        name: "Agile CRM"
                    },
                    {
                        id: "keap",
                        name: "Keap (Infusionsoft)"
                    },
                    {
                        id: "efficy",
                        name: "Efficy CRM"
                    },
                    {
                        id: "netsuite",
                        name: "NetSuite CRM"
                    },
                    {
                        id: "other",
                        name: "Other"
                    }
],
                bookingSystems: [
                    {
                        id: "cal",
                        name: "Cal.com"
                    },
                    {
                        id: "calendly",
                        name: "Calendly"
                    },
                    {
                        id: "acuity",
                        name: "Acuity Scheduling"
                    },
                    {
                        id: "booksy",
                        name: "Booksy"
                    },
                    {
                        id: "simplybook",
                        name: "SimplyBook.me"
                    },
                    {
                        id: "square",
                        name: "Square Appointments"
                    },
                    {
                        id: "google_calendar",
                        name: "Google Calendar"
                    },
// Additional booking systems
                    {
                        id: "setmore",
                        name: "Setmore"
                    },
                    {
                        id: "appointy",
                        name: "Appointy"
                    },
                    {
                        id: "timetap",
                        name: "TimeTap"
                    },
                    {
                        id: "bookafy",
                        name: "Bookafy"
                    },
                    {
                        id: "schedulicity",
                        name: "Schedulicity"
                    },
                    {
                        id: "youcanbook",
                        name: "YouCanBookMe"
                    },
                    {
                        id: "planyo",
                        name: "Planyo"
                    },
                    {
                        id: "reservio",
                        name: "Reservio"
                    },
                    {
                        id: "other",
                        name: "Other"
                    }
],
                databases: [
                    {
                        id: "mysql",
                        name: "MySQL"
                    },
                    {
                        id: "postgresql",
                        name: "PostgreSQL"
                    },
                    {
                        id: "mongodb",
                        name: "MongoDB"
                    },
                    {
                        id: "firebase",
                        name: "Firebase"
                    },
                    {
                        id: "airtable",
                        name: "Airtable"
                    },
                    {
                        id: "google_sheets",
                        name: "Google Sheets"
                    },
// Additional databases
                    {
                        id: "oracle",
                        name: "Oracle Database"
                    },
                    {
                        id: "sqlserver",
                        name: "Microsoft SQL Server"
                    },
                    {
                        id: "mariadb",
                        name: "MariaDB"
                    },
                    {
                        id: "dynamodb",
                        name: "Amazon DynamoDB"
                    },
                    {
                        id: "cassandra",
                        name: "Apache Cassandra"
                    },
                    {
                        id: "redis",
                        name: "Redis"
                    },
                    {
                        id: "supabase",
                        name: "Supabase"
                    },
                    {
                        id: "notion",
                        name: "Notion Database"
                    },
                    {
                        id: "other",
                        name: "Other"
                    }
],
                websitePlatforms: [
                    {
                        id: "wordpress",
                        name: "WordPress"
                    },
                    {
                        id: "shopify",
                        name: "Shopify"
                    },
                    {
                        id: "wix",
                        name: "Wix"
                    },
                    {
                        id: "squarespace",
                        name: "Squarespace"
                    },
                    {
                        id: "webflow",
                        name: "Webflow"
                    },
                    {
                        id: "custom",
                        name: "Custom"
                    },
// Additional platforms
                    {
                        id: "drupal",
                        name: "Drupal"
                    },
                    {
                        id: "joomla",
                        name: "Joomla"
                    },
                    {
                        id: "magento",
                        name: "Magento"
                    },
                    {
                        id: "bigcommerce",
                        name: "BigCommerce"
                    },
                    {
                        id: "godaddy",
                        name: "GoDaddy Website Builder"
                    },
                    {
                        id: "strikingly",
                        name: "Strikingly"
                    },
                    {
                        id: "ghost",
                        name: "Ghost"
                    },
                    {
                        id: "prestashop",
                        name: "PrestaShop"
                    },
                    {
                        id: "bubble",
                        name: "Bubble.io"
                    },
                    {
                        id: "other",
                        name: "Other"
                    }
],
                socialPlatforms: [
                    {
                        id: "facebook",
                        name: "Facebook Messenger"
                    },
                    {
                        id: "instagram",
                        name: "Instagram"
                    },
                    {
                        id: "whatsapp",
                        name: "WhatsApp"
                    },
                    {
                        id: "telegram",
                        name: "Telegram"
                    },
                    {
                        id: "discord",
                        name: "Discord"
                    },
                    {
                        id: "slack",
                        name: "Slack"
                    },
                    {
                        id: "viber",
                        name: "Teams"
                    }
],
                niches: [
                    {
                        id: "ecommerce",
                        name: "E-commerce"
                    },
                    {
                        id: "services",
                        name: "Professional Services"
                    },
                    {
                        id: "healthcare",
                        name: "Healthcare"
                    },
                    {
                        id: "education",
                        name: "Education"
                    },
                    {
                        id: "realestate",
                        name: "Real Estate"
                    },
                    {
                        id: "restaurant",
                        name: "Restaurant & Food"
                    },
                    {
                        id: "fitness",
                        name: "Fitness & Wellness"
                    },
                    {
                        id: "travel",
                        name: "Travel & Tourism"
                    },
                    {
                        id: "finance",
                        name: "Finance & Insurance"
                    },
// Additional niches
                    {
                        id: "manufacturing",
                        name: "Manufacturing"
                    },
                    {
                        id: "automotive",
                        name: "Automotive"
                    },
                    {
                        id: "legal",
                        name: "Legal Services"
                    },
                    {
                        id: "technology",
                        name: "IT & Technology"
                    },
                    {
                        id: "media",
                        name: "Media & Entertainment"
                    },
                    {
                        id: "construction",
                        name: "Construction"
                    },
                    {
                        id: "agriculture",
                        name: "Agriculture & Farming"
                    },
                    {
                        id: "nonprofit",
                        name: "Non-profit & NGO"
                    },
                    {
                        id: "beauty",
                        name: "Beauty & Cosmetics"
                    },
                    {
                        id: "consulting",
                        name: "Consulting"
                    },
                    {
                        id: "retail",
                        name: "Retail"
                    },
                    {
                        id: "other",
                        name: "Other"
                    }
],
                formTypes: [
    {
        id: "contact",
        name: "Contact Form"
    },
    {
        id: "lead",
        name: "Lead Generation"
    },
    {
        id: "survey",
        name: "Survey"
    },
    {
        id: "booking",
        name: "Booking"
    },
    {
        id: "support",
        name: "Customer Support"
    },
    {
        id: "feedback",
        name: "Customer Feedback"
    },
    {
        id: "quote",
        name: "Quote Request"
    },
    {
        id: "registration",
        name: "Registration"
    },
    {
        id: "newsletter",
        name: "Newsletter Signup"
    },
    {
        id: "contest",
        name: "Contest/Giveaway Entry"
    },
    {
        id: "job",
        name: "Job Application"
    },
    {
        id: "event",
        name: "Event Registration"
    },
    {
        id: "payment",
        name: "Payment Form"
    },
    {
        id: "appointment",
        name: "Appointment Scheduling"
    },
    {
        id: "order",
        name: "Order Form"
    },
    {
        id: "membership",
        name: "Membership Application"
    },
    {
        id: "other",
        name: "Other"
    }
],
                budgetRanges: [
                    {
                        id: "less_than_1000",
                        name: "Less than 1,000 $"
                    },
                    {
                        id: "1000_2500",
                        name: "1,000 $ - 2,500 $"
                    },
                    {
                        id: "2500_5000",
                        name: "2,500 $ - 5,000 $"
                    },
                    {
                        id: "5000_7500",
                        name: "5,000 $ - 7,500 $"
                    },
                    {
                        id: "7500_10000",
                        name: "7,500 $ - 10,000 $"
                    },
                    {
                        id: "monthly_subscription",
                        name: "Monthly Subscription"
                    },
                    {
                        id: "annual_subscription",
                        name: "Annual Subscription"
                    },
                    {
                        id: "not_specified",
                        name: "Budget not defined"
                    }
]
            }
        };

        function createFormData(language) {
            return formDataTranslations[language];
        }
        let formData = createFormData(currentLanguage);
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

			/* ---------- ANIMATIONS ---------- */
			@keyframes fadeIn {
				from {
					opacity: 0;
					transform: translateY(15px);
				}

				to {
					opacity: 1;
					transform: translateY(0);
				}
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

			@keyframes slideDown {
				from {
					opacity: 0;
					transform: translateY(-10px);
				}

				to {
					opacity: 1;
					transform: translateY(0);
				}
			}

			@keyframes shake {

				0%,
				100% {
					transform: translateX(0);
				}

				10%,
				30%,
				50%,
				70%,
				90% {
					transform: translateX(-5px);
				}

				20%,
				40%,
				60%,
				80% {
					transform: translateX(5px);
				}
			}

			@keyframes pulse {
				0% {
					transform: scale(1);
					box-shadow: 0 0 0 0 rgba(2, 48, 71, 0.4);
				}

				70% {
					transform: scale(1.05);
					box-shadow: 0 0 0 15px rgba(2, 48, 71, 0);
				}

				100% {
					transform: scale(1);
				}
			}

			

			form.chatbot-form {
				display: flex;
				flex-direction: column;
				width: 100%;
				min-width: 870px;
				margin: 0 auto;
				padding: 0;
				border-radius: 12px;
				font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
				box-shadow: 0 8px 30px rgba(2, 48, 71, 0.12);
				position: relative;
				overflow: hidden;
				animation: fadeIn 0.6s;
				transition: all 0.3s ease;
			}

			form.chatbot-form:hover {
				box-shadow: 0 12px 40px rgba(2, 48, 71, 0.15);
			}

			/* Two-column layout */
			.row,
			.form-row,
			.flex-row {
				display: flex;
				flex-wrap: wrap;
				margin: 0 -10px;
				width: calc(100% + 20px);
			}

			.col,
			.form-col,
			.flex-row>div {
				flex: 1 0 0;
				padding: 0 10px;
				min-width: 0;
			}

			
			/* ---------- STEP PROGRESS INDICATOR ---------- */
			.progress-container {

  padding: 15px 25px 0px 25px;
}




			.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #e95d2c 0%, #b0cee2 100%);
  transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  border-radius: 4px;
}
.step-info {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;    margin-top: 5px;
    font-size: 16px;
    font-weight: bold;
  color: #666;
}







			/* ---------- FORM STEPS & ANIMATIONS ---------- */
			.step-container {
				display: none;
				animation: fadeIn 0.6s;
			}

			.step-container.active {
				display: flex;
				flex-direction: column;
				gap: 10px;
				padding: 5px 30px 10px;
			}

			.step-container:not(.active) {
				pointer-events: none;
			}

			/* ---------- FORM ELEMENTS ---------- */
			.form-label,
			.question-label,
			.bold-label {
				display: block;
				font-weight: 600;
				color: #1a2730;
				font-size: 15px;
			}

			.question-label {
				font-size: 16px;
			}

			.form-label.required::after,
			.question-label.required::after {
				content: " *";
				
				font-weight: bold;
			}

			.step-heading {
				font-size: 26px;
				color: #a63e1b;
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
				background: linear-gradient(90deg, #e95d2c, #b0cee2);
				border-radius: 4px;
			}

			/* ========== Input Fields ========== */
			input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"],
						#details, #description, #services, #form-purpose, #message, select {
							width: 100%;
							border: 2px solid #e0e0e0;
							border-radius: 8px;
							padding: 12px 16px;
							font-size: 14px;
							font-weight: 500;
							transition: all 0.3s ease;
							background-color: #fafafa;
							color: #444;
							position: relative;
							overflow: hidden;
							margin: 0px;
							height: 54px;
						}
	
						input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus,
						input[type="url"]:focus,
						input[type="number"]:focus, #details:focus, #description:focus, #services:focus,
						#form-purpose:focus, #message:focus, select:focus {
							border-color: #e95d2c;
							box-shadow: 0 0 0 3px rgba(233, 93, 44, 0.1);
							outline: none;
							background-color: #fff;
							transform: translateY(-2px);
						}
	
						input[type="text"]:hover:not(:focus),input[type="url"]:hover:not(:focus), input[type="email"]:hover:not(:focus),
						input[type="tel"]:hover:not(:focus), input[type="number"]:hover:not(:focus),
						#details:hover:not(:focus), #description:hover:not(:focus), #services:hover:not(:focus),
						#form-purpose:hover:not(:focus), #message:hover:not(:focus) {
							border-color: #e95d2c;
							background-color: rgba(247, 184, 153, 0.1);
						}
	
						#details, #description, #services, #form-purpose, #message {
							min-height: 120px;
							resize: vertical;
							font-family: inherit;
						}



			/* ---------- DROPDOWN COMPONENTS ---------- */
						.select-container select {
							display: none !important;
						}
	
						.main-container {
							display: block;
							transition: height 0.3s ease;
							border-radius: 8px;
							width: 100%;
							margin-bottom: 15px;
						}
	
						.select-wrapper {
							border: 2px solid #e0e0e0;
							border-radius: 8px;
							background-color: #fafafa;
							position: relative;
							width: 100%;
							box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
							transition: all 0.3s ease;
						}
	
						.select-wrapper:hover {
							border-color: #e95d2c;
							background-color: rgba(247, 184, 153, 0.1);
							transform: translateY(-2px);
							box-shadow: 0 4px 12px rgba(233, 93, 44, 0.2);
						}
	
						.select-display {
							padding: 12px 18px;
							font-size: 15px;
							cursor: pointer;
							display: flex;
							justify-content: space-between;
							align-items: center;
							height: 52px;
							color: #444;
							font-weight: 500;
						}
	
						.dropdown-icon {
							width: 30px;
							height: 30px;
							transition: transform 0.3s ease;
							display: flex;
							align-items: center;
							justify-content: center;
							background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
							border-radius: 50%;
							box-shadow: 0 2px 8px rgba(233, 93, 44, 0.3);
						}
	
						.dropdown-icon svg path {
							fill: white !important;
						}
	
						.dropdown-icon.rotate {
							transform: rotate(180deg);
							box-shadow: 0 4px 12px rgba(233, 93, 44, 0.4);
						}
	
						.custom-options {
							display: none;
							font-size: 15px;
							border-top: 1px solid #e0e0e0;
							max-height: 250px;
							overflow-y: auto;
							background-color: #fff;
							box-shadow: 0 8px 25px rgba(233, 93, 44, 0.15);
							z-index: 100;
							border-radius: 0 0 8px 8px;
							-ms-overflow-style: none;
							scrollbar-width: none;
							width: 100%;
						}
	
						.show-options {
							display: block;
							animation: slideDown 0.3s ease-out;
						}
	
						.custom-option {
							padding: 14px 18px;
							display: flex;
							align-items: center;
							cursor: pointer;
							transition: all 0.3s ease;
							position: relative;
							border-left: 4px solid transparent;
						}
	
						.custom-option:hover {
							background-color: rgba(233, 93, 44, 0.08);
							color: #1a2730;
							border-left-color: #e95d2c;
							transform: translateX(5px);
						}
	
						.custom-option.selected {
							background: linear-gradient(135deg, rgba(233, 93, 44, 0.12) 0%, rgba(247, 184, 153, 0.8) 100%);
							color: #1a2730;
							font-weight: bold;
							border-left-color: #e95d2c;
							box-shadow: inset 0 1px 3px rgba(233, 93, 44, 0.1);
						}
	
						.custom-option.selected .option-checkbox svg path {
							fill: #fff !important;
						}
	
						.custom-option:not(.selected):hover .option-checkbox svg path {
							fill: #e95d2c;
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
							transition: all 0.3s ease;
							position: relative;
						}
	
						.option-checkbox svg {
							width: 12px;
							height: 12px;
							display: none;
						}
	
						.custom-option:not(.selected):hover .option-checkbox {
							border-color: #e95d2c;
							transform: scale(1.05);
							box-shadow: 0 2px 8px rgba(233, 93, 44, 0.2);
						}
	
						.custom-option:not(.selected):hover .option-checkbox svg {
							display: block;
						}
	
						.custom-option.selected .option-checkbox svg {
							display: block;
						}
	
						.custom-option.selected .option-checkbox {
							border-color: #e95d2c;
							background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
							transform: scale(1.1);
							box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
						}
	
						.custom-option:not(.selected):hover .option-checkbox svg path {
							fill: #e95d2c !important;
						}

			/* ---------- CHECKBOXES & RADIO BUTTONS ---------- */
			.options-group {
				display: flex;
				flex-wrap: nowrap;
				gap: 10px;
			}

			.radio-option,
			.checkbox-option {
				display: flex;
				align-items: center;
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
				border-color: #e95d2c;
				background-color: rgba(247, 184, 153, 0.1);
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
				background: #e95d2c;
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
				accent-color: #e95d2c;
				transform: scale(1.2);
			}

			.radio-option input:checked+span,
			.checkbox-option input:checked+span {
				font-weight: 500;
				color: #a63e1b;
			}

			.radio-option input:checked,
			.checkbox-option input:checked {
				accent-color: #e95d2c;
			}

			/* Multi-select styling */
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

			.custom-option:not(.selected):hover .option-checkbox-icon {
				opacity: 0.6;
			}

			.custom-option.selected .option-checkbox-icon {
				opacity: 1;
			}

			.custom-option:not(.selected):hover .option-checkbox-icon svg path {
				fill: #e95d2c !important;
			}

			/* ---------- ERROR MESSAGES ---------- */
			.error-container {
				width: 100%;
				margin: 2px 0;
				box-sizing: border-box;
			}

			.error-message {
				color: white;
				font-size: 13px;
				margin-top: 8px;
				display: none;
				background: linear-gradient(135deg, #e52059 0%, #d32f2f 100%);
				border-radius: 8px;
				border: none;
				padding: 12px 16px;
				animation: shake 0.5s;
				box-shadow: 0 4px 15px rgba(229, 32, 89, 0.3);
			}

			.error-message.show {
				display: flex;
				animation: slideIn 0.3s ease-out;
			}

			.error-icon {
				width: 22px;
				height: 22px;
				min-width: 22px;
				border-radius: 50%;
				background-color: white;
				
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
			.form-buttons {
							display: flex;
							justify-content: space-between;
							gap: 15px;
						}
	
						.btn {
							padding: 14px 28px;
							border: none;
							border-radius: 8px;
							font-size: 16px;
							font-weight: 600;
							cursor: pointer;
							transition: all 0.3s ease;
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
									rgba(255, 255, 255, 0) 0%,
									rgba(255, 255, 255, 0.2) 50%,
									rgba(255, 255, 255, 0) 100%);
							transition: all 0.6s;
						}
	
						.btn:hover:not(:disabled)::after {
							left: 100%;
						}
	
						.btn-prev {
							background-color: #f0f0f0;
							color: #1a2730;
							border: 2px solid #e0e0e0;
						}
	
						.btn-prev:hover {
							background-color: rgba(247, 184, 153, 0.1);
							border-color: #e95d2c;
							transform: translateY(-2px);
							box-shadow: 0 4px 12px rgba(233, 93, 44, 0.2);
						}
	
						.btn-next, .btn-submit {
							background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
							color: white;
							box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
						}
	
						.btn-next:hover, .btn-submit:hover {
							transform: translateY(-3px);
							box-shadow: 0 6px 20px rgba(233, 93, 44, 0.4);
						}
	
						.btn-submit {
							background: linear-gradient(135deg, #e95d2c 0%, #ef8d6b 100%);
							box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
						}
	
						.btn-submit:hover {
							box-shadow: 0 6px 20px rgba(233, 93, 44, 0.4);
						}
	
						.btn:disabled {
							cursor: not-allowed;
							transform: none;
							box-shadow: none; 
							background: #45586c !important;
						}
	
						.btn:disabled::after {
							display: none;
						}
	
						.form-buttons .btn:active {
							transform: translateY(1px);
							box-shadow: 0 2px 8px rgba(233, 93, 44, 0.2);
						}
	

			/* ---------- CONDITIONAL FIELDS ---------- */
			.conditional-field {
				display: none;
				margin-top: 18px;
				padding: 15px 20px;
				border-left: 3px solid #e95d2c;
				background-color: rgba(2, 48, 71, 0.05);
				border-radius: 0 8px 8px 0;
				animation: slideDown 0.3s;
			}

			.form-col .conditional-field {
				margin-top: 15px;
			}

			/* ---------- SUMMARY STYLES ---------- */
			.summary-container {
				background: linear-gradient(135deg, #b0cee2 0%, #ffffff 100%);
				border: 2px solid rgba(2, 48, 71, 0.1);
				border-radius: 12px;
				padding: 10px 15px;
				box-shadow: 0 4px 15px rgba(2, 48, 71, 0.1);
			}

			.summary-section {
				margin-bottom: 20px;
			}

			.summary-heading {
				font-size: 16px;
				font-weight: 600;
				color: #e95d2c;
				margin-bottom: 10px;
				padding-bottom: 5px;
				border-bottom: 1px solid #e0e0e0;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.edit-btn {
				background: none;
				border: 1px solid #e95d2c;
				color: #e95d2c;
				cursor: pointer;
				padding: 6px 12px;
				font-size: 14px;
				border-radius: 6px;
				transition: all 0.3s ease;
				font-weight: 500;
			}

			.edit-btn:hover {
				background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
				color: white;
				transform: translateY(-2px);
				box-shadow: 0 4px 12px rgba(2, 48, 71, 0.3);
			}

			.summary-row {
				display: flex;
				padding: 6px 0;
				border-bottom: 1px solid rgba(2, 48, 71, 0.1);
				align-items: center;
				transition: all 0.3s ease;
			}

			.summary-row:last-child {
				border-bottom: none;
			}

			.summary-row:hover {
				background-color: rgba(2, 48, 71, 0.05);
				border-radius: 8px;
				padding-left: 10px;
				padding-right: 10px;
			}

			.summary-label {
				font-weight: 600;
				width: 30%;
				color: #a63e1b;
			}

			.summary-value {
				flex: 1;
				color: #e95d2c;
			}

			/* ---------- CONFIRMATION SCREEN ---------- */
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
				background: #e95d2c;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 auto 20px;
				animation: pulse 2s infinite;
			}

			.confirmation-icon svg {
				width: 36px;
				height: 36px;
			}

			.confirmation-title {
				font-size: 24px;
				color: #e95d2c;
				margin-bottom: 15px;
				font-weight: 600;
			}

			.confirmation-message {
				font-size: 16px;
				color: #555;
				margin-bottom: 30px;
				line-height: 1.5;
			}

			.textarea-wrapper {
				position: relative;
				width: 100%;
				margin-bottom: 0;
			}

			.textarea-wrapper textarea {
				margin-bottom: 0;
				display: block;
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

			/* ---------- INFO BUTTONS ---------- */
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
				background: #e95d2c;
				color: white;
			}

			.info-panel {
				display: none;
				background: #f9f9f9;
				border: 1px solid #e0e0e0;
				border-left: 3px solid #e95d2c;
				border-radius: 4px;
				padding: 12px;
				margin-top: 8px;
				margin-bottom: 10px;
				position: relative;
				font-size: 13px;
				line-height: 1.5;
				color: #555;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
				color: #e95d2c;
				margin-bottom: 6px;
				font-size: 14px;
			}

			.info-button svg .info-bg {
				fill: #b0cee2;
			}

			.info-button svg .info-icon {
				fill: #e95d2c;
			}

			.info-button:hover svg .info-bg,
			.info-button:focus svg .info-bg,
			.info-button:active svg .info-bg {
				fill: #e95d2c;
			}

			.info-button:hover svg .info-icon,
			.info-button:focus svg .info-icon,
			.info-button:active svg .info-icon {
				fill: #ffffff;
			}

			.select-display.placeholder span {
				color: #808080;
			}

			.select-display:not(.placeholder) span {
				color: #000;
			}

			/* ---------- RESPONSIVE DESIGN ---------- */
			@media (max-width: 767px) {

				.row,
				.form-row,
				.flex-row {
					display: flex;
					margin: 0;
					width: 100%;
					gap: 10px;
					flex-direction: column;
				}

				.step-container.active {
					padding: 5px 15px 10px;
				}

				.col,
				.form-col,
				.flex-row>div {
					width: 100%;
					padding: 0;
					margin-bottom: 0px;
				}

				.form-group {
					margin-bottom: 10px;
				}

				.form-col .conditional-field {
					margin-left: 0;
					padding-left: 15px;
				}
			}

			@media (max-width: 768px) {
				.form-title {
					font-size: 22px;
				}



				.step-heading {
					font-size: 22px;
				}

				.btn {
					padding: 12px 18px;
					font-size: 15px;
				}

				.container,
				form.chatbot-form {
					width: auto;
					border-radius: 8px;
				}



				.progress-container {
					padding: 10px 10px 10px;
				}


				.radio-option,
				.checkbox-option {
					max-width: 50%;
					min-width: 40%;
				}

				.form-buttons {
					flex-direction: row;
					gap: 10px;
				}
			}

			@media (max-width: 480px) {
				form.chatbot-form {
					min-width: 200px;
				}


				.step-heading {
					font-size: 18px;
				}




				.summary-container {
					padding: 15px;
				}
			}

			/* ---------- FOCUS STYLES FOR ACCESSIBILITY ---------- */
			input:focus-visible,
			#details:focus-visible,
			#description:focus-visible,
			#services:focus-visible,
			#form-purpose:focus-visible,
			select:focus-visible,
			button:focus-visible {
				outline: 2px solid #e95d2c;
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
				margin-bottom: 10px;
			}

			.confirmation-screen.active+* .progress-container,
			.confirmation-screen.active~.progress-container {
				display: none !important;
			}

			/* Ensure conditional sections are hidden by default */
/* Ensure conditional sections are hidden by default */
#form-options,
#website-options,
#crm-selection,
#database-selection,
#social-platforms-group,
#existing-booking-options,
#need-booking-options,
#language-selection,
#other-platform-group,
#other-niche-group,
#custom-budget-group,
#other-crm-group,
#other-booking-group,
#other-database-group,
#other-form-type-group {
    display: none !important;
}

			/* Override when visible class is applied */
#form-options.visible,
#website-options.visible,
#crm-selection.visible,
#database-selection.visible,
#social-platforms-group.visible,
#existing-booking-options.visible,
#need-booking-options.visible,
#language-selection.visible,
#other-platform-group.visible,
#other-niche-group.visible,
#custom-budget-group.visible,
#other-crm-group.visible,
#other-booking-group.visible,
#other-database-group.visible,
#other-form-type-group.visible { 
    display: flex !important;
    flex-direction: column;
}

			</style>

			<!-- Confirmation Screen -->
			<div class="confirmation-screen" id="confirmation-screen">
				<div class="confirmation-icon">
					${SVG_CHECK}
				</div>
				<span class="confirmation-title" id="confirmation-title">Demande envoyée avec succès!</span>
				<p class="confirmation-message" id="confirmation-message">Merci pour votre demande. Notre équipe vous contactera sous peu.</p>
				<button type="button" class="btn btn-next" id="back-to-form">Retour au formulaire</button>
			</div>

			<!-- Step Progress Indicator -->
			<!-- Progress Bar -->
<!-- Progress Bar -->
<div class="progress-container">
  <div class="progress-bar">
    <div class="progress-fill" id="progress-fill"></div>
  </div>
  <div class="step-info">
    <span>Étape <span class="current-step" id="current-step">1</span> sur ${totalSteps}</span>
    <span id="step-title">${getText('step1Title')}</span>
  </div>
</div>
 

			<!-- Step 1: Contact Information -->
			<div class="step-container active" id="step-1">
				<span class="step-heading" id="step1-heading">Informations de contact</span>

				<div class="flex-row">
					<div class="form-group">
						<label class="form-label" id="firstname-label">Prénom</label>
						<input type="text" id="first-name" name="firstName" placeholder="Votre prénom" />
						<div class="error-message" id="error-firstname">
							<div class="error-icon">!</div>
							<span class="error-text">Ce champ est obligatoire</span>
						</div>
					</div>

					<div class="form-group">
						<label class="form-label" id="lastname-label">Nom</label>
						<input type="text" id="last-name" name="lastName" placeholder="Votre nom" />
						<div class="error-message" id="error-lastname">
							<div class="error-icon">!</div>
							<span class="error-text">Ce champ est obligatoire</span>
						</div>
					</div>
				</div>

				<div class="flex-row">
					<div class="form-group">
						<label class="form-label" id="email-label">Email</label>
						<input type="email" id="email" name="email" placeholder="Votre email" />
						<div class="error-message" id="error-email">
							<div class="error-icon">!</div>
							<span class="error-text">Entrez une adresse email valide</span>
						</div>
					</div>

					<div class="form-group">
						<label class="form-label" id="phone-label">Téléphone</label>
						<input type="tel" id="phone" name="phone" placeholder="Votre numéro de téléphone" />
						<div class="error-message" id="error-phone">
							<div class="error-icon">!</div>
							<span class="error-text">Entrez un numéro de téléphone valide</span>
						</div>
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
				<span class="step-heading" id="step2-heading">Détails du projet</span>

				<div class="form-group">
					<label class="form-label" id="niche-label">Quelle est votre niche ?</label>
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
					<div class="error-message" id="error-niche">
						<div class="error-icon">!</div>
						<span class="error-text">Veuillez sélectionner une niche</span>
					</div>
				</div>

				<div class="form-group" id="other-niche-group" style="display: none;">
					<label class="form-label" id="other-niche-label">Précisez votre niche</label>
					<input type="text" id="other-niche" name="otherNiche" placeholder="Votre niche..." />
					<div class="error-message" id="error-other-niche">
						<div class="error-icon">!</div>
						<span class="error-text">Ce champ est obligatoire</span>
					</div>
				</div>

				<div class="form-group">
					<label class="form-label" id="budget-label">Quel est votre budget ?</label>
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
					<div class="error-message" id="error-budget">
						<div class="error-icon">!</div>
						<span class="error-text">Veuillez sélectionner un budget</span>
					</div>
				</div>

				<div class="form-group" id="custom-budget-group" style="display: none;">
					<label class="form-label" id="custom-budget-label">Précisez votre budget</label>
					<input type="text" id="custom-budget" name="customBudget" placeholder="Détails de votre budget..." />
					<div class="error-message" id="error-custom-budget">
						<div class="error-icon">!</div>
						<span class="error-text">Ce champ est obligatoire</span>
					</div>
				</div>

				<div class="form-group">
					<label class="form-label" id="description-label">Description détaillée de votre projet</label>
					<div class="textarea-wrapper">
						<textarea id="description" name="description" placeholder="Décrivez vos besoins en détail, vos objectifs, et toute autre information pertinente..." rows="6"></textarea>
						<div class="char-counter"><span id="description-counter">0</span>/1000</div>
					</div>
					<div class="error-message" id="error-description">
						<div class="error-icon">!</div>
						<span class="error-text">Ce champ est obligatoire</span>
					</div>
				</div>

				<div class="form-buttons">
					<button type="button" class="btn btn-prev" id="step2-prev">Précédent</button>
					<button type="button" class="btn btn-next" id="step2-next">Suivant</button>
				</div>
			</div>

			<!-- Step 3: Business Profile -->
			<div class="step-container" id="step-3">
				<span class="step-heading" id="step3-heading">Profil professionnel</span>

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
					<div class="error-message" id="error-team-size">
						<div class="error-icon">!</div>
						<span class="error-text">Veuillez sélectionner une option</span>
					</div>
				</div>

				<div class="form-group">
					<label class="form-label" id="services-label">Quels sont vos services ?</label>
					<div class="textarea-wrapper">
						<textarea id="services" name="services" placeholder="Décrivez vos services principaux..." rows="4"></textarea>
						<div class="char-counter"><span id="services-counter">0</span>/500</div>
					</div>
					<div class="error-message" id="error-services">
						<div class="error-icon">!</div>
						<span class="error-text">Ce champ est obligatoire</span>
					</div>
				</div>

				<div class="form-buttons">
					<button type="button" class="btn btn-prev" id="step3-prev">Précédent</button>
					<button type="button" class="btn btn-next" id="step3-next">Suivant</button>
				</div>
			</div>

			<!-- Step 4: Core Features -->
			<div class="step-container" id="step-4">
				<span class="step-heading" id="step4-heading">Fonctionnalités de base</span>

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
					<div class="error-message" id="error-lead-capture">
						<div class="error-icon">!</div>
						<span class="error-text">Veuillez sélectionner une option</span>
					</div>
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
					<div class="error-message" id="error-lead-qualification">
						<div class="error-icon">!</div>
						<span class="error-text">Veuillez sélectionner une option</span>
					</div>
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
					<div class="error-message" id="error-conversation-summary">
						<div class="error-icon">!</div>
						<span class="error-text">Veuillez sélectionner une option</span>
					</div>
				</div>

				<div class="form-buttons">
					<button type="button" class="btn btn-prev" id="step4-prev">Précédent</button>
					<button type="button" class="btn btn-next" id="step4-next">Suivant</button>
				</div>
			</div>

<!-- Step 5: Form Requirements -->
<div class="step-container" id="step-5">
	<span class="step-heading" id="step5-heading">Formulaires</span>

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
		<div class="error-message" id="error-use-form">
			<div class="error-icon">!</div>
			<span class="error-text">Veuillez sélectionner une option</span>
		</div>
	</div>

	<div id="form-options" style="display: none; gap: 10px; flex-direction: column;">
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
			<div class="error-message" id="error-form-types">
				<div class="error-icon">!</div>
				<span class="error-text">Veuillez sélectionner au moins un type</span>
			</div>
		</div>

		<!-- NEW CONDITIONAL FIELD FOR OTHER FORM TYPE -->
		<div class="form-group" id="other-form-type-group" style="display: none;">
			<label class="form-label" id="other-form-type-label">Précisez le type de formulaire</label>
			<input type="text" id="other-form-type" name="otherFormType" placeholder="Nom du type de formulaire..." />
			<div class="error-message" id="error-other-form-type">
				<div class="error-icon">!</div>
				<span class="error-text">Veuillez préciser le type de formulaire</span>
			</div>
		</div>

		<div class="form-group">
			<label class="form-label" id="form-purpose-label">À quoi serviront ces formulaires ?</label>
			<div class="textarea-wrapper">
				<textarea id="form-purpose" name="formPurpose" placeholder="Décrivez l'utilisation prévue des formulaires..." rows="3"></textarea>
				<div class="char-counter"><span id="form-purpose-counter">0</span>/300</div>
			</div>
		</div>
	</div>

	<div class="form-buttons">
		<button type="button" class="btn btn-prev" id="step5-prev">Précédent</button>
		<button type="button" class="btn btn-next" id="step5-next">Suivant</button>
	</div>
</div>


			<!-- Step 6: Website Integration with Traffic Field -->
			<div class="step-container" id="step-6">
				<span class="step-heading" id="step6-heading">Site Web</span>

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
					<div class="error-message" id="error-has-website">
						<div class="error-icon">!</div>
						<span class="error-text">Veuillez sélectionner une option</span>
					</div>
				</div>

				<div id="website-options" style="display: none; gap: 10px; flex-direction: column;">
					<!-- Platform and Traffic Volume Side by Side -->
					<div class="flex-row">
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
							<div class="error-message" id="error-platform">
								<div class="error-icon">!</div>
								<span class="error-text">Veuillez sélectionner une plateforme</span>
							</div>
						</div>

						<div class="form-group">
							<label class="form-label" id="website-traffic-label">Trafic mensuel moyen de votre site</label>
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
							<div class="error-message" id="error-website-traffic">
								<div class="error-icon">!</div>
								<span class="error-text">Veuillez indiquer le trafic de votre site</span>
							</div>
						</div>
					</div>

					<!-- Other Platform Field (Conditional) -->
					<div class="form-group" id="other-platform-group" style="display: none;">
						<label class="form-label" id="other-platform-label">Précisez la plateforme</label>
						<input type="text" id="other-platform" name="otherPlatform" placeholder="Nom de la plateforme..." />
						<div class="error-message" id="error-other-platform">
							<div class="error-icon">!</div>
							<span class="error-text">Ce champ est obligatoire</span>
						</div>
					</div>

					<!-- Website URL Field -->
					<div class="form-group">
						<label class="form-label" id="website-url-label">URL de votre site web</label>
						<input type="text" id="website-url" name="websiteUrl" placeholder="https://www.votresite.com" />
						<div class="error-message" id="error-website-url">
							<div class="error-icon">!</div>
							<span class="error-text">Veuillez entrer une URL valide</span>
						</div>
					</div>
				</div>

				<!-- Navigation Buttons -->
				<div class="form-buttons">
					<button type="button" class="btn btn-prev" id="step6-prev">Précédent</button>
					<button type="button" class="btn btn-next" id="step6-next">Suivant</button>
				</div>
			</div>

			<!-- Step 7: Integrations -->
<div class="step-container" id="step-7">
    <span class="step-heading" id="step7-heading">Intégrations</span>

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
        <div class="error-message" id="error-use-crm">
            <div class="error-icon">!</div>
            <span class="error-text">Veuillez sélectionner une option</span>
        </div>
    </div>

    <div id="crm-selection" style="display: none;">
        <div class="question-group">
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
            <div class="error-message" id="error-crms">
                <div class="error-icon">!</div>
                <span class="error-text">Veuillez sélectionner au moins un CRM</span>
            </div>
        </div>
    </div>
    
    <!-- Other CRM Field - MOVED OUTSIDE -->
    <div class="form-group" id="other-crm-group" style="display: none;">
        <label class="form-label" id="other-crm-label">Précisez le CRM</label>
        <input type="text" id="other-crm" name="otherCrm" placeholder="Nom du CRM..." />
        <div class="error-message" id="error-other-crm">
            <div class="error-icon">!</div>
            <span class="error-text">Veuillez préciser le nom du CRM</span>
        </div>
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
        <div class="error-message" id="error-has-booking">
            <div class="error-icon">!</div>
            <span class="error-text">Veuillez sélectionner une option</span>
        </div>
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
            <div class="error-message" id="error-booking-systems">
                <div class="error-icon">!</div>
                <span class="error-text">Veuillez sélectionner un système</span>
            </div>
        </div>
    </div>
    
    <!-- Other Booking System Field - MOVED OUTSIDE -->
    <div class="form-group" id="other-booking-group" style="display: none;">
        <label class="form-label" id="other-booking-label">Précisez le système de réservation</label>
        <input type="text" id="other-booking" name="otherBooking" placeholder="Nom du système..." />
        <div class="error-message" id="error-other-booking">
            <div class="error-icon">!</div>
            <span class="error-text">Veuillez préciser le nom du système de réservation</span>
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
        <div class="error-message" id="error-use-database">
            <div class="error-icon">!</div>
            <span class="error-text">Veuillez sélectionner une option</span>
        </div>
    </div>

    <div id="database-selection" style="display: none;">
        <div class="question-group">
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
            <div class="error-message" id="error-databases">
                <div class="error-icon">!</div>
                <span class="error-text">Veuillez sélectionner au moins une base de données</span>
            </div>
        </div>
    </div>
    
    <!-- Other Database Field - MOVED OUTSIDE -->
    <div class="form-group" id="other-database-group" style="display: none;">
        <label class="form-label" id="other-database-label">Précisez la base de données</label>
        <input type="text" id="other-database" name="otherDatabase" placeholder="Nom de la base de données..." />
        <div class="error-message" id="error-other-database">
            <div class="error-icon">!</div>
            <span class="error-text">Veuillez préciser le nom de la base de données</span>
        </div>
    </div>

    <div class="form-buttons">
        <button type="button" class="btn btn-prev" id="step7-prev">Précédent</button>
        <button type="button" class="btn btn-next" id="step7-next">Suivant</button>
    </div>
</div>

			<!-- Step 8: Communication Channels -->
			<div class="step-container" id="step-8">
				<span class="step-heading" id="step8-heading">Canaux de communication</span>

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
					<div class="error-message" id="error-need-social">
						<div class="error-icon">!</div>
						<span class="error-text">Veuillez sélectionner une option</span>
					</div>
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
					<div class="error-message" id="error-social-platforms">
						<div class="error-icon">!</div>
						<span class="error-text">Veuillez sélectionner au moins une plateforme</span>
					</div>
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
					<div class="error-message" id="error-language-type">
						<div class="error-icon">!</div>
						<span class="error-text">Veuillez sélectionner une option</span>
					</div>
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
					<div class="error-message" id="error-languages">
						<div class="error-icon">!</div>
						<span class="error-text">Veuillez sélectionner au moins une langue</span>
					</div>
				</div>

				<div class="form-buttons">
					<button type="button" class="btn btn-prev" id="step8-prev">Précédent</button>
					<button type="button" class="btn btn-next" id="step8-next">Suivant</button>
				</div>
			</div>

			<!-- Step 9: Summary -->
			<div class="step-container" id="step-9">
				<span class="step-heading" id="step9-heading">Récapitulatif de votre demande</span>

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
            formContainer.querySelectorAll('.step-container')
                .forEach(step => {
                    step.classList.remove('active');
                });
            formContainer.querySelector(`#step-${stepNumber}`)
                .classList.add('active');
            currentStep = stepNumber;
            updateProgressBar();
            // Scroll to top of form
            formContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        function updateProgressBar() {
  const progressFill = formContainer.querySelector('#progress-fill');
  const currentStepElement = formContainer.querySelector('#current-step');
  const stepTitleElement = formContainer.querySelector('#step-title');
  
  if (progressFill) {
    // Fixed calculation: step 1 = 0%, step 9 = 100%
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${progress}%`;
  }
  
  if (currentStepElement) {
    currentStepElement.textContent = currentStep;
  }
  
  if (stepTitleElement) {
    // Update step title based on current step
    const stepTitles = [
      getText('step1Title'), // Coordonnées professionnelles
      getText('step2Title'), // Spécifications du projet
      getText('step3Title'), // Profil d'entreprise
      getText('step4Title'), // Fonctionnalités essentielles
      getText('step5Title'), // Intégration de formulaires
      getText('step6Title'), // Intégration Web
      getText('step7Title'), // Intégrations & API
      getText('step8Title'), // Canaux d'interaction
      getText('step9Title')  // Synthèse de votre projet
    ];
    
    stepTitleElement.textContent = stepTitles[currentStep - 1] || '';
  }
}

        // Save form data to localStorage
        function saveFormData() {
            localStorage.setItem('chatbotFormData', JSON.stringify(formValues));
        }
       
        // Transform form values for submission (using readable values in current language)
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
            // Handle "other" form type
            if (typeId === 'other' && processedData.otherFormType) {
                return processedData.otherFormType;
            }
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
            // Handle "other" CRM
            if (crmId === 'other' && processedData.otherCrm) {
                return processedData.otherCrm;
            }
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
                // Handle "other" booking system
                if (systemId === 'other' && processedData.otherBooking) {
                    return processedData.otherBooking;
                }
                const system = localFormData.bookingSystems.find(s => s.id === systemId);
                return system ? system.name : systemId;
            });
            processedData.bookingSystems = systemNames;
            processedData.bookingSystemsString = systemNames.join(', ');
        } else if (typeof processedData.bookingSystems === 'string') {
            // Handle "other" booking system for single value
            if (processedData.bookingSystems === 'other' && processedData.otherBooking) {
                processedData.bookingSystems = processedData.otherBooking;
                processedData.bookingSystemsString = processedData.otherBooking;
            } else {
                const system = localFormData.bookingSystems.find(s => s.id === processedData.bookingSystems);
                if (system) {
                    processedData.bookingSystems = system.name;
                    processedData.bookingSystemsString = system.name;
                }
            }
        }
    } else {
        processedData.bookingSystems = "";
        processedData.bookingSystemsString = "";
    }
    
    // Databases - Convert both array and string to use names
    if (processedData.databases && Array.isArray(processedData.databases) && processedData.databases.length > 0) {
        const dbNames = processedData.databases.map(dbId => {
            // Handle "other" database
            if (dbId === 'other' && processedData.otherDatabase) {
                return processedData.otherDatabase;
            }
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
    
    // Languages - Convert both array and string to use names
    if (processedData.languages && Array.isArray(processedData.languages)) {
        const languageNames = processedData.languages.map(langId => {
            const lang = localFormData.languages.find(l => l.id === langId);
            return lang ? lang.name : langId;
        });
        // Replace the original array with names
        processedData.languagesArray = languageNames;
        // Create string version
        processedData.languagesString = languageNames.join(', ');
        // Replace the original languages with names
        processedData.languages = languageNames;
    } else {
        processedData.languagesArray = [];
        processedData.languagesString = "";
        processedData.languages = [];
    }
    
    // Language Type
    if (processedData.languageType) {
        if (processedData.languageType === 'multilingual') {
            processedData.languageType = getLocalizedText('multilingual');
        } else if (processedData.languageType === 'unilingual') {
            processedData.languageType = getLocalizedText('unilingual');
        }
    } else {
        processedData.languageType = currentLanguage === 'fr' ? "Non spécifié" : "Not specified";
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
    const optionalTextFields = [
        'company', 'otherNiche', 'otherPlatform', 'customBudget', 
        'formPurpose', 'websiteUrl', 'otherFormType', 'otherCrm', 
        'otherBooking', 'otherDatabase'
    ];
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
                formContainer.querySelectorAll('.info-panel')
                    .forEach(panel => {
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
									<div style="margin-left: 20px; padding-left: 10px;">
									<ul>
									<li><strong>Formulaire de contact</strong>: Recueille les coordonnées des visiteurs</li>
									<li><strong>Génération de leads</strong>: Qualifie les prospects potentiels</li>
									<li><strong>Questionnaire</strong>: Collecte des informations détaillées</li>
									<li><strong>Réservation</strong>: Permet de réserver un créneau horaire</li>
									<li><strong>Support client</strong>: Pour les demandes d'assistance</li>
									<li>Et plus encore selon vos besoins spécifiques</li>
									</ul>
									</div>`
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
									<div style="margin-left: 20px; padding-left: 10px;">
									<ul>
									<li>Suivi efficace des interactions clients</li>
									<li>Identification rapide des besoins récurrents</li>
									<li>Facilitation du transfert vers une personne réelle si nécessaire</li>
									<li>Documentation automatique des échanges pour analyse ultérieure</li>
									</ul>
									</div>`
                    },
                    websiteTraffic: {
                        title: "Volume de trafic mensuel",
                        content: `Cette information nous permet de dimensionner correctement votre solution de chatbot. Le volume de trafic influence:<br><br>
									<div style="margin-left: 20px; padding-left: 10px;">
									<ul>
									<li>La capacité de traitement nécessaire</li>
									<li>Les ressources serveur à allouer</li>
									<li>La structure optimale des dialogues</li>
									<li>Les stratégies de mise en cache et d'optimisation</li>
									</ul>
									</div>
									Un chatbot pour un site à fort trafic nécessite une architecture plus robuste et évolutive qu'un site avec moins de visiteurs.`
                    },
                    handleCancellation: {
                        title: "Gestion des annulations et reports",
                        content: `Cette fonctionnalité permet à vos clients de modifier ou d'annuler leurs réservations directement via le chatbot, sans intervention humaine.<br><br>Le chatbot peut:<br>
									<div style="margin-left: 20px; padding-left: 10px;">
									<ul>
									<li>Accéder au calendrier des réservations existantes</li>
									<li>Proposer des créneaux alternatifs disponibles</li>
									<li>Confirmer les modifications par email/SMS</li>
									<li>Appliquer vos règles d'entreprise concernant les délais d'annulation ou les frais</li>
									</ul>
									</div>
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
									<div style="margin-left: 20px; padding-left: 10px;">
									<ul>
									<li><strong>Contact Form</strong>: Collects visitor contact details</li>
									<li><strong>Lead Generation</strong>: Qualifies potential prospects</li>
									<li><strong>Survey</strong>: Gathers detailed information</li>
									<li><strong>Booking</strong>: Allows scheduling a time slot</li>
									<li><strong>Customer Support</strong>: For assistance requests</li>
									<li>And more based on your specific needs</li>
									</ul>
									</div>`
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
									<div style="margin-left: 20px; padding-left: 10px;">
									<ul>
									<li>Efficient tracking of customer interactions</li>
									<li>Quick identification of recurring needs</li>
									<li>Seamless handover to human agents when necessary</li>
									<li>Automatic documentation of exchanges for later analysis</li>
									</ul>
									</div>`
                    },
                    websiteTraffic: {
                        title: "Monthly Traffic Volume",
                        content: `This information helps us properly size your chatbot solution. Traffic volume influences:<br><br>
									<div style="margin-left: 20px; padding-left: 10px;">
									<ul>
									<li>Required processing capacity</li>
									<li>Server resources allocation</li>
									<li>Optimal dialog structure</li>
									<li>Caching and optimization strategies</li>
									</ul>
									</div>
									A chatbot for a high-traffic site requires a more robust and scalable architecture than a site with fewer visitors.`
                    },
                    handleCancellation: {
                        title: "Cancellation and Rescheduling Management",
                        content: `This functionality allows your customers to modify or cancel their bookings directly through the chatbot without human intervention.<br><br>The chatbot can:<br>
									<div style="margin-left: 20px; padding-left: 10px;">
									<ul>
									<li>Access the calendar of existing reservations</li>
									<li>Offer available alternative time slots</li>
									<li>Confirm changes via email/SMS</li>
									<li>Apply your business rules regarding cancellation deadlines or fees</li>
									</ul>
									</div>
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
            
            // Update form title
            const formTitle = formContainer.querySelector('.form-title');
            if (formTitle) {
                formTitle.textContent = getText('formTitle');
            }
            
            // Step headings - safely update only if elements exist
            const stepHeadings = [
                { id: '#step1-heading', text: getText('step1Title') },
                { id: '#step2-heading', text: getText('step2Title') },
                { id: '#step3-heading', text: getText('step3Title') },
                { id: '#step4-heading', text: getText('step4Title') },
                { id: '#step5-heading', text: getText('step5Title') },
                { id: '#step6-heading', text: getText('step6Title') },
                { id: '#step7-heading', text: getText('step7Title') },
                { id: '#step8-heading', text: getText('step8Title') },
                { id: '#step9-heading', text: getText('step9Title') }
            ];
            
            stepHeadings.forEach(({ id, text }) => {
                const element = formContainer.querySelector(id);
                if (element) {
                    element.textContent = text;
                }
            });
            
            // Confirmation screen
            const confirmationTitle = formContainer.querySelector('#confirmation-title');
            if (confirmationTitle) {
                confirmationTitle.textContent = getText('confirmationTitle');
            }
            
            const confirmationMessage = formContainer.querySelector('#confirmation-message');
            if (confirmationMessage) {
                confirmationMessage.textContent = getText('confirmationMessage');
            }
            
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
            // STEP 1: Clear any existing saved data to start fresh
            localStorage.removeItem('chatbotFormData');
            // STEP 2: Reset all form values to defaults
            resetFormValues();
            // STEP 3: Force hide all conditional sections
            forceHideConditionalSections();
            // STEP 4: Initialize character counters
            initializeCharacterCounters();
            // STEP 5: Initialize dropdowns
            initializeDropdowns();
            // STEP 6: Set form language and update texts
            formValues.formLanguage = currentLanguage;
            formData = createFormData(currentLanguage);
            updateAllTexts();
            // STEP 7: Initialize progress bar and validation
            updateProgressBar();
            setupRealTimeValidation();
            setupRadioButtonValidation();
            // STEP 8: Start form timer
            startFormTimer();
            // STEP 9: Initialize form field values in the DOM
            initializeDOMValues();
        }
        // Add this new function to reset all form values:
        function resetFormValues() {
            Object.keys(formValues)
                .forEach(key => {
                    if (Array.isArray(formValues[key])) {
                        formValues[key] = [];
                    } else if (typeof formValues[key] === 'boolean') {
                        formValues[key] = null;
                    } else {
                        formValues[key] = "";
                    }
                });
            // Keep the form language
            formValues.formLanguage = currentLanguage;
        }
        // Add this function to initialize character counters:
        function initializeCharacterCounters() {
            const counters = [
                {
                    fieldId: '#services',
                    counterId: '#services-counter'
                },
                {
                    fieldId: '#form-purpose',
                    counterId: '#form-purpose-counter'
                },
                {
                    fieldId: '#description',
                    counterId: '#description-counter'
                }
];
            counters.forEach(({
                fieldId,
                counterId
            }) => {
                const field = formContainer.querySelector(fieldId);
                const counter = formContainer.querySelector(counterId);
                if (field && counter) {
                    field.value = '';
                    counter.textContent = '0';
                }
            });
        }
        // Add this function to initialize DOM values:
        function initializeDOMValues() {
            // Clear all text inputs
            const textInputs = formContainer.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
            textInputs.forEach(input => {
                input.value = '';
            });
            // Clear all radio buttons
            const radioInputs = formContainer.querySelectorAll('input[type="radio"]');
            radioInputs.forEach(radio => {
                radio.checked = false;
            });
            // Reset all dropdowns to placeholder state
            const selectDisplays = formContainer.querySelectorAll('.select-display');
            selectDisplays.forEach(display => {
                display.classList.add('placeholder');
                const span = display.querySelector('span');
                if (span) {
                    span.textContent = display.getAttribute('data-placeholder') || getText('selectPlaceholder');
                }
            });
            // Clear all select elements
            const selects = formContainer.querySelectorAll('select');
            selects.forEach(select => {
                select.selectedIndex = 0;
                Array.from(select.options)
                    .forEach(option => option.selected = false);
            });
            // Clear all custom option selections
            const customOptions = formContainer.querySelectorAll('.custom-option');
            customOptions.forEach(option => {
                option.classList.remove('selected');
            });
        }
        // Enhanced forceHideConditionalSections function:
        function forceHideConditionalSections() {
    const conditionalSections = [
        '#form-options',
        '#website-options',
        '#crm-selection',
        '#database-selection',
        '#social-platforms-group',
        '#existing-booking-options',
        '#need-booking-options',
        '#language-selection',
        '#other-platform-group',
        '#other-niche-group',
        '#custom-budget-group',
        '#other-crm-group',
        '#other-booking-group',
        '#other-database-group',
        '#other-form-type-group' // NEW ADDITION
    ];
    
    conditionalSections.forEach(sectionId => {
        const element = formContainer.querySelector(sectionId);
        if (element) {
            // Remove any existing visibility classes
            element.classList.remove('visible', 'show', 'active');
            // Explicitly set display to none with !important override
            element.style.setProperty('display', 'none', 'important');
            // Add hidden attribute for accessibility
            element.setAttribute('aria-hidden', 'true');
        }
    });
}
/**
         * Safely show a conditional section
         */
        // Update the showConditionalSection function to be more robust:
        function showConditionalSection(sectionId) {
            const element = formContainer.querySelector(sectionId);
            if (element) {
                element.style.removeProperty('display');
                element.style.setProperty('display', 'flex', 'important');
                element.setAttribute('aria-hidden', 'false');
                element.classList.add('visible');
            }
        }
        // Update the hideConditionalSection function:
        function hideConditionalSection(sectionId) {
            const element = formContainer.querySelector(sectionId);
            if (element) {
                element.style.setProperty('display', 'none', 'important');
                element.setAttribute('aria-hidden', 'true');
                element.classList.remove('visible');
            }
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
            if (vf) {
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
            formContainer.querySelectorAll('button, input, select, textarea, .custom-options, .select-wrapper, .dropdown-icon')
                .forEach(el => {
                    el.disabled = true;
                    el.style.cursor = "not-allowed";
                });
            // Disable dropdown functionality
            formContainer.querySelectorAll('.custom-options.show-options')
                .forEach(opt => {
                    opt.classList.remove('show-options');
                });
            formContainer.querySelectorAll('.dropdown-icon.rotate')
                .forEach(icon => {
                    icon.classList.remove('rotate');
                });
            formContainer.classList.add('disabled');
        }
        // Function to set up real-time validation for input fields
        function setupRealTimeValidation() {
            // Text inputs validation
            const firstName = formContainer.querySelector('#first-name');
            if (firstName) {
                firstName.addEventListener('input', function () {
                    formValues.firstName = this.value.trim();
                    if (this.value.trim()) {
                        hideError('error-firstname');
                    }
                    saveFormData();
                });
            }
            const lastName = formContainer.querySelector('#last-name');
            if (lastName) {
                lastName.addEventListener('input', function () {
                    formValues.lastName = this.value.trim();
                    if (this.value.trim()) {
                        hideError('error-lastname');
                    }
                    saveFormData();
                });
            }
            const email = formContainer.querySelector('#email');
            if (email) {
                email.addEventListener('input', function () {
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
                phone.addEventListener('input', function () {
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
                description.addEventListener('input', function () {
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
                otherNiche.addEventListener('input', function () {
                    formValues.otherNiche = this.value.trim();
                    if (this.value.trim()) {
                        hideError('error-other-niche');
                    }
                    saveFormData();
                });
            }
            const customBudget = formContainer.querySelector('#custom-budget');
            if (customBudget) {
                customBudget.addEventListener('input', function () {
                    formValues.customBudget = this.value.trim();
                    if (this.value.trim()) {
                        hideError('error-custom-budget');
                    }
                    saveFormData();
                });
            }
            const services = formContainer.querySelector('#services');
            if (services) {
                services.addEventListener('input', function () {
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
				websiteUrl.addEventListener('blur', function () {
					const value = this.value.trim();
					if (value) {
						if (isValidUrl(value)) {
							const normalized = normalizeUrl(value);
							this.value = normalized;
							formValues.websiteUrl = normalized;
							hideError('error-website-url');
						} else {
							showError('error-website-url', 'websiteUrlInvalid');
						}
					}
					saveFormData();
				});
				
				websiteUrl.addEventListener('input', function () {
					formValues.websiteUrl = this.value.trim();
					if (this.value.trim() && isValidUrl(this.value.trim())) {
						hideError('error-website-url');
					}
					saveFormData();
				});
			}
            const otherPlatform = formContainer.querySelector('#other-platform');
            if (otherPlatform) {
                otherPlatform.addEventListener('input', function () {
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
            formContainer.querySelectorAll('input[name="leadCapture"]')
                .forEach(radio => {
                    radio.addEventListener('change', function () {
                        hideError('error-lead-capture');
                        formValues.leadCapture = this.value;
                        saveFormData();
                    });
                });
            // Lead qualification radio buttons
            formContainer.querySelectorAll('input[name="leadQualification"]')
                .forEach(radio => {
                    radio.addEventListener('change', function () {
                        hideError('error-lead-qualification');
                        formValues.leadQualification = this.value;
                        saveFormData();
                    });
                });
            // Conversation summary radio buttons
            formContainer.querySelectorAll('input[name="conversationSummary"]')
                .forEach(radio => {
                    radio.addEventListener('change', function () {
                        hideError('error-conversation-summary');
                        formValues.conversationSummary = this.value;
                        saveFormData();
                    });
                });
            // Use form radio buttons
            formContainer.querySelectorAll('input[name="useForm"]')
                .forEach(radio => {
                    radio.addEventListener('change', function () {
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
            formContainer.querySelectorAll('input[name="hasWebsite"]')
                .forEach(radio => {
                    radio.addEventListener('change', function () {
                        hideError('error-has-website');
                        formValues.hasWebsite = this.value;
                        if (this.value === 'yes') {
                            showConditionalSection('#website-options');
                        } else {
                            hideConditionalSection('#website-options');
                            // Hide nested sections when parent is hidden
                            hideConditionalSection('#other-platform-group');
                            // Clear website-related values
                            formValues.websitePlatform = null;
                            formValues.websiteUrl = '';
                            formValues.websiteTraffic = null;
                            formValues.otherPlatform = '';
                        }
                        saveFormData();
                    });
                });
            // Use CRM radio buttons
            formContainer.querySelectorAll('input[name="useCRM"]')
                .forEach(radio => {
                    radio.addEventListener('change', function () {
                        hideError('error-use-crm');
                        formValues.useCRM = this.value;
                        if (this.value === 'yes') {
                            showConditionalSection('#crm-selection');
                        } else {
                            hideConditionalSection('#crm-selection');
                            // Clear CRM-related values
                            formValues.crms = [];
                        }
                        saveFormData();
                    });
                });
            // Booking System Recommendation Toggle
            formContainer.querySelectorAll('input[name="hasBookingSystem"]')
                .forEach(radio =>
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
            formContainer.querySelectorAll('input[name="useDatabase"]')
                .forEach(radio => {
                    radio.addEventListener('change', function () {
                        hideError('error-use-database');
                        formValues.useDatabase = this.value;
                        if (this.value === 'yes') {
                            showConditionalSection('#database-selection');
                        } else {
                            hideConditionalSection('#database-selection');
                            // Clear database-related values
                            formValues.databases = [];
                        }
                        saveFormData();
                    });
                });
            // Social Media Integration Toggle
            formContainer.querySelectorAll('input[name="needSocialBot"]')
                .forEach(radio =>
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
            formContainer.querySelectorAll('input[name="languageType"]')
    .forEach(radio => {
        radio.addEventListener('change', function () {
            const languageSelection = formContainer.querySelector('#language-selection');
            showConditionalSection('#language-selection');
            
            // Reset language values when switching modes
            formValues.languages = [];
            
            // Get references to elements
            const languageSelectLabel = formContainer.querySelector('#language-select-label');
            const languagesDropdown = formContainer.querySelector('#languagesDropdown');
            const customOptionsContainer = formContainer.querySelector('#customOptionsLanguages');
            const selectElement = formContainer.querySelector('#languagesSelect');
            const displayElement = formContainer.querySelector('#selectDisplayLanguages');
            
            // Clear existing options
            customOptionsContainer.innerHTML = '';
            selectElement.innerHTML = '';
            
            // Remove existing event listeners by replacing elements
            const newDisplayElement = displayElement.cloneNode(true);
            displayElement.parentNode.replaceChild(newDisplayElement, displayElement);
            
            // Update the reference
            const updatedDisplay = formContainer.querySelector('#selectDisplayLanguages');
            const icon = formContainer.querySelector('#dropdownIconLanguages');
            
            if (this.value === 'multilingual') {
                // Configure for multilingual
                languagesDropdown.className = 'select-container multi-select';
                languageSelectLabel.textContent = getText('selectLanguages');
                selectElement.multiple = true;
                
                // Set placeholder for multilingual
                updatedDisplay.setAttribute('data-placeholder', getText('selectMultiplePlaceholder'));
                updatedDisplay.classList.add('placeholder');
                updatedDisplay.querySelector('span').textContent = getText('selectMultiplePlaceholder');
                
                // Build multi-select dropdown
                buildMultiSelectDropdown(
                    'languagesSelect',
                    'customOptionsLanguages',
                    'selectDisplayLanguages',
                    'dropdownIconLanguages',
                    formData.languages
                );
                
            } else {
                // Configure for unilingual (single select)
                languagesDropdown.className = 'select-container single-select';
                languageSelectLabel.textContent = getText('selectLanguage');
                selectElement.multiple = false;
                
                // Set placeholder for unilingual
                updatedDisplay.setAttribute('data-placeholder', getText('selectPlaceholder'));
                updatedDisplay.classList.add('placeholder');
                updatedDisplay.querySelector('span').textContent = getText('selectPlaceholder');
                
                // Build single-select dropdown
                buildSingleSelectDropdown(
                    'languagesSelect',
                    'customOptionsLanguages',
                    'selectDisplayLanguages',
                    'dropdownIconLanguages',
                    formData.languages
                );
            }
            
            // Update form values and save
            formValues.languageType = this.value;
            hideError('error-language-type');
            saveFormData();
        });
    });
        }
        /*************************************************************
         * Translation Functions
         *************************************************************/
        function updateRadioButtonLabels() {
            // Update Yes/No labels
            document.querySelectorAll('.radio-option')
                .forEach(option => {
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
                formContainer.querySelector('#multilingual-label')
                    .textContent = getText('multilingual');
            }
            if (formContainer.querySelector('#unilingual-label')) {
                formContainer.querySelector('#unilingual-label')
                    .textContent = getText('unilingual');
            }
        }

        function updateStep1Labels() {
            formContainer.querySelector('#firstname-label')
                .textContent = getText('firstName');
            formContainer.querySelector('#lastname-label')
                .textContent = getText('lastName');
            formContainer.querySelector('#email-label')
                .textContent = getText('email');
            formContainer.querySelector('#phone-label')
                .textContent = getText('phone');
            formContainer.querySelector('#company-label')
                .textContent = getText('companyOptional');
            // Placeholders
            formContainer.querySelector('#first-name')
                .placeholder = `${getText('firstName')}...`;
            formContainer.querySelector('#last-name')
                .placeholder = `${getText('lastName')}...`;
            formContainer.querySelector('#email')
                .placeholder = `${getText('email')}...`;
            formContainer.querySelector('#phone')
                .placeholder = `${getText('phone')}...`;
            formContainer.querySelector('#company')
                .placeholder = `${getText('company')}...`;
            // Error messages
            formContainer.querySelector('#error-firstname')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-lastname')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-email')
                .textContent = getText('enterValidEmail');
            formContainer.querySelector('#error-phone')
                .textContent = getText('enterValidPhone');
        }

        function updateStep2Labels() {
            formContainer.querySelector('#niche-label')
                .textContent = getText('selectNiche');
            formContainer.querySelector('#other-niche-label')
                .textContent = getText('otherNicheSpecify');
            formContainer.querySelector('#budget-label')
                .textContent = getText('budgetQuestion');
            formContainer.querySelector('#custom-budget-label')
                .textContent = getText('customBudgetQuestion');
            formContainer.querySelector('#description-label')
                .textContent = getText('projectDescription');
            // Placeholders
            formContainer.querySelector('#other-niche')
                .placeholder = `${getText('otherNicheSpecify')}...`;
            formContainer.querySelector('#description')
                .placeholder = getText('projectDescriptionPlaceholder');
            formContainer.querySelector('#custom-budget')
                .placeholder = `${getText('customBudgetQuestion')}...`;
            // Error messages
            formContainer.querySelector('#error-niche')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-other-niche')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-budget')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-custom-budget')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-description')
                .textContent = getText('fieldRequired');
        }

        function updateStep3Labels() {
            formContainer.querySelector('#team-size-question')
                .textContent = getText('teamSizeQuestion');
            formContainer.querySelector('#services-label')
                .textContent = getText('servicesQuestion');
            // Placeholders
            formContainer.querySelector('#services')
                .placeholder = getText('servicesPlaceholder');
            // Error messages
            formContainer.querySelector('#error-team-size')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-services')
                .textContent = getText('fieldRequired');
        }

        function updateStep4Labels() {
            formContainer.querySelector('#lead-capture-question')
                .textContent = getText('leadCaptureQuestion');
            formContainer.querySelector('#lead-qualification-question')
                .textContent = getText('leadQualificationQuestion');
            formContainer.querySelector('#conversation-summary-question')
                .textContent = getText('conversationSummaryQuestion');
            // Error messages
            formContainer.querySelector('#error-lead-capture')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-lead-qualification')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-conversation-summary')
                .textContent = getText('fieldRequired');
        }

        function updateStep5Labels() {
    formContainer.querySelector('#use-form-question')
        .textContent = getText('useFormQuestion');
    formContainer.querySelector('#form-types-label')
        .textContent = getText('selectFormTypes');
    formContainer.querySelector('#form-purpose-label')
        .textContent = getText('formPurposeQuestion');
    
    // NEW ADDITION - Update other form type label
    const otherFormTypeLabel = formContainer.querySelector('#other-form-type-label');
    if (otherFormTypeLabel) {
        otherFormTypeLabel.textContent = getText('otherFormTypeLabel');
    }
    
    // Placeholders
    formContainer.querySelector('#form-purpose')
        .placeholder = getText('formPurposePlaceholder');
        
    // NEW ADDITION - Update other form type placeholder
    const otherFormTypeInput = formContainer.querySelector('#other-form-type');
    if (otherFormTypeInput) {
        otherFormTypeInput.placeholder = getText('otherFormTypePlaceholder');
    }
    
    // Error messages
    formContainer.querySelector('#error-use-form')
        .textContent = getText('fieldRequired');
    formContainer.querySelector('#error-form-types')
        .textContent = getText('selectAtLeastOne');
        
    // NEW ADDITION - Update other form type error message
    const errorOtherFormType = formContainer.querySelector('#error-other-form-type');
    if (errorOtherFormType) {
        const errorText = errorOtherFormType.querySelector('.error-text');
        if (errorText) {
            errorText.textContent = getText('otherFormTypeRequired');
        }
    }
}
        function updateStep6Labels() {
            formContainer.querySelector('#website-question')
                .textContent = getText('websiteQuestion');
            formContainer.querySelector('#platform-label')
                .textContent = getText('selectPlatform');
            formContainer.querySelector('#other-platform-label')
                .textContent = getText('other');
            formContainer.querySelector('#website-url-label')
                .textContent = getText('websiteUrlLabel');
            formContainer.querySelector('#website-traffic-label')
                .textContent = getText('websiteTrafficLabel');
            // Placeholders
            formContainer.querySelector('#other-platform')
                .placeholder = `${getText('other')}...`;
            formContainer.querySelector('#website-url')
                .placeholder = "https://www.example.com";
            // Error messages
            formContainer.querySelector('#error-has-website')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-platform')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-other-platform')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-website-url')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-website-traffic')
                .textContent = getText('fieldRequired');
        }

        function updateStep7Labels() {
            formContainer.querySelector('#use-crm-question')
                .textContent = getText('useCRMQuestion');
            formContainer.querySelector('#yes-label')
                .textContent = getText('yes');
            formContainer.querySelector('#no-label')
                .textContent = getText('no');
            formContainer.querySelector('#crm-select-label')
                .textContent = getText('selectCRMs');
            formContainer.querySelector('#has-booking-question')
                .textContent = getText('hasBookingQuestion');
            formContainer.querySelector('#booking-select-label')
                .textContent = getText('selectBookingSystems');
            formContainer.querySelector('#handle-cancellation-question')
                .textContent = getText('handleCancellationQuestion');
            formContainer.querySelector('#want-booking-recommendation')
                .textContent = getText('wantBookingRecommendation');
            formContainer.querySelector('#use-database-question')
                .textContent = getText('useDatabaseQuestion');
            formContainer.querySelector('#database-select-label')
                .textContent = getText('selectDatabases');
            // Error messages
            formContainer.querySelector('#error-use-crm')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-crms')
                .textContent = getText('selectAtLeastOne');
            formContainer.querySelector('#error-has-booking')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-booking-systems')
                .textContent = getText('selectAtLeastOne');
            formContainer.querySelector('#error-use-database')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-databases')
                .textContent = getText('selectAtLeastOne');
        }

        function updateStep8Labels() {
            formContainer.querySelector('#social-bot-question')
                .textContent = getText('needSocialBotQuestion');
            formContainer.querySelector('#social-platforms-label')
                .textContent = getText('selectSocialPlatforms');
            formContainer.querySelector('#language-type-question')
                .textContent = getText('languageTypeQuestion');
            formContainer.querySelector('#multilingual-label')
                .textContent = getText('multilingual');
            formContainer.querySelector('#unilingual-label')
                .textContent = getText('unilingual');
            const languageSelectLabel = formContainer.querySelector('#language-select-label');
            if (languageSelectLabel) {
                const isMultilingual = formValues.languageType === 'multilingual';
                languageSelectLabel.textContent = isMultilingual ? getText('selectLanguages') : getText('selectLanguage');
            }
            // Error messages
            formContainer.querySelector('#error-need-social')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-social-platforms')
                .textContent = getText('selectAtLeastOne');
            formContainer.querySelector('#error-language-type')
                .textContent = getText('fieldRequired');
            formContainer.querySelector('#error-languages')
                .textContent = getText('selectAtLeastOne');
        }

        function updateStep9Labels() {
            formContainer.querySelector('#step9-heading')
                .textContent = getText('recapTitle');
            // Recap sections
            formContainer.querySelector('#recap-contact-heading')
                .textContent = getText('recapContact');
            formContainer.querySelector('#recap-project-heading')
                .textContent = getText('recapProject');
            formContainer.querySelector('#recap-business-heading')
                .textContent = getText('recapBusiness');
            formContainer.querySelector('#recap-features-heading')
                .textContent = getText('recapFeatures');
            formContainer.querySelector('#recap-forms-heading')
                .textContent = getText('recapForms');
            formContainer.querySelector('#recap-website-heading')
                .textContent = getText('recapWebsite');
            formContainer.querySelector('#recap-integrations-heading')
                .textContent = getText('recapIntegrations');
            formContainer.querySelector('#recap-channels-heading')
                .textContent = getText('recapChannels');
            // Edit buttons
            document.querySelectorAll('.edit-btn')
                .forEach(btn => {
                    btn.textContent = getText('edit');
                });
            // Labels
            formContainer.querySelector('#recap-name-label')
                .textContent = getText('firstName') + ' / ' + getText('lastName');
            formContainer.querySelector('#recap-email-label')
                .textContent = getText('email');
            formContainer.querySelector('#recap-phone-label')
                .textContent = getText('phone');
            formContainer.querySelector('#recap-company-label')
                .textContent = getText('company');
            formContainer.querySelector('#recap-niche-label')
                .textContent = getText('selectNiche');
            formContainer.querySelector('#recap-budget-label')
                .textContent = getText('budgetQuestion');
            formContainer.querySelector('#recap-description-label')
                .textContent = getText('projectDescription');
            formContainer.querySelector('#recap-team-size-label')
                .textContent = getText('teamSizeQuestion');
            formContainer.querySelector('#recap-services-label')
                .textContent = getText('servicesQuestion');
            formContainer.querySelector('#recap-leads-label')
                .textContent = getText('leadCaptureQuestion');
            formContainer.querySelector('#recap-forms-label')
                .textContent = getText('useFormQuestion');
            formContainer.querySelector('#recap-has-website-label')
                .textContent = getText('websiteQuestion');
            formContainer.querySelector('#recap-platform-label')
                .textContent = getText('selectPlatform');
            formContainer.querySelector('#recap-website-url-label')
                .textContent = getText('websiteUrlLabel');
            formContainer.querySelector('#recap-website-traffic-label')
                .textContent = getText('websiteTrafficLabel');
            formContainer.querySelector('#recap-crm-label')
                .textContent = getText('useCRMQuestion');
            formContainer.querySelector('#recap-booking-label')
                .textContent = getText('hasBookingQuestion');
            formContainer.querySelector('#recap-database-label')
                .textContent = getText('useDatabaseQuestion');
            formContainer.querySelector('#recap-social-label')
                .textContent = getText('needSocialBotQuestion');
            formContainer.querySelector('#recap-language-type-label')
                .textContent = getText('languageTypeQuestion');
            formContainer.querySelector('#recap-languages-label')
                .textContent = getText('selectLanguages');
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
            document.querySelectorAll('.select-display')
                .forEach(display => {
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
            
            // Handle specific cases for "other" fields
            if (selectId === 'website-platform' && option.id === 'other') {
                showConditionalSection('#other-platform-group');
            } else if (selectId === 'website-platform') {
                hideConditionalSection('#other-platform-group');
            }
            
            if (selectId === 'niche' && option.id === 'other') {
                showConditionalSection('#other-niche-group');
            } else if (selectId === 'niche') {
                hideConditionalSection('#other-niche-group');
            }
            
            if (selectId === 'budget' && option.id === 'custom') {
                showConditionalSection('#custom-budget-group');
            } else if (selectId === 'budget') {
                hideConditionalSection('#custom-budget-group');
            }
            
            if (selectId === 'bookingSystemsSelect' && option.id === 'other') {
                showConditionalSection('#other-booking-group');
            } else if (selectId === 'bookingSystemsSelect') {
                hideConditionalSection('#other-booking-group');
            }
            
            // Save form value
            if (selectId === 'website-platform') {
                formValues.websitePlatform = option.id;
                hideError('error-platform');
            }
            if (selectId === 'niche') {
                formValues.niche = option.id;
                hideError('error-niche');
            }
            if (selectId === 'budget') {
                formValues.budget = option.id;
                hideError('error-budget');
            }
            if (selectId === 'team-size') {
                formValues.teamSize = option.id;
                hideError('error-team-size');
            }
            if (selectId === 'bookingSystemsSelect') {
                formValues.bookingSystems = option.id;
                hideError('error-booking-systems');
            }
            if (selectId === 'website-traffic') {
                formValues.websiteTraffic = option.id;
                hideError('error-website-traffic');
            }
		if (selectId === 'languagesSelect') {
    formValues.languages = [option.id]; // Store as array for consistency
    hideError('error-languages');
}
            
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
            showConditionalSection('#other-platform-group');
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
            showConditionalSection('#other-niche-group');
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
            showConditionalSection('#custom-budget-group');
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
        const systemId = Array.isArray(formValues.bookingSystems) ? 
            formValues.bookingSystems[0] : formValues.bookingSystems;
        select.value = systemId;
        const option = customOptions.querySelector(`.custom-option[data-value="${systemId}"]`);
        if (option) {
            option.classList.add('selected');
            display.querySelector('span').textContent = option.querySelector('span').textContent;
            display.classList.remove('placeholder');
        }
        if (systemId === 'other') {
            showConditionalSection('#other-booking-group');
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
        handleMultiSelectOtherOptions(selectId, select);
        
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
            handleMultiSelectOtherOptions(selectId, select);
            
            // Save form values
            if (selectId === 'formTypesSelect') {
                formValues.formTypes = Array.from(select.options)
                    .filter(opt => opt.selected)
                    .map(opt => opt.value);
                hideError('error-form-types');
            } else if (selectId === 'socialPlatformsSelect') {
                formValues.socialPlatforms = Array.from(select.options)
                    .filter(opt => opt.selected)
                    .map(opt => opt.value);
                hideError('error-social-platforms');
            } else if (selectId === 'crmsSelect') {
                formValues.crms = Array.from(select.options)
                    .filter(opt => opt.selected)
                    .map(opt => opt.value);
                hideError('error-crms');
            } else if (selectId === 'databasesSelect') {
                formValues.databases = Array.from(select.options)
                    .filter(opt => opt.selected)
                    .map(opt => opt.value);
                hideError('error-databases');
            } else if (selectId === 'languagesSelect') {
    formValues.languages = Array.from(select.options)
        .filter(opt => opt.selected)
        .map(opt => opt.value);
    hideError('error-languages');
}
            
            
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
        
        const allOptionsSelected = Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all-option)'))
            .every(opt => opt.classList.contains('selected'));
        if (allOptionsSelected) {
            selectAllDiv.classList.add('selected');
        }
        
        updateMultiSelectText(select, display);
        handleMultiSelectOtherOptions(selectId, select);
    }
    
    if (select.id === 'socialPlatformsSelect' && formValues.socialPlatforms && formValues.socialPlatforms.length > 0) {
        formValues.socialPlatforms.forEach(value => {
            const option = select.querySelector(`option[value="${value}"]`);
            if (option) option.selected = true;
            const customOption = customOptions.querySelector(`.custom-option[data-value="${value}"]`);
            if (customOption) customOption.classList.add('selected');
        });
        
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
        
        const allOptionsSelected = Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all-option)'))
            .every(opt => opt.classList.contains('selected'));
        if (allOptionsSelected) {
            selectAllDiv.classList.add('selected');
        }
        
        updateMultiSelectText(select, display);
        handleMultiSelectOtherOptions(selectId, select);
    }
    
    if (select.id === 'databasesSelect' && formValues.databases && formValues.databases.length > 0) {
        formValues.databases.forEach(value => {
            const option = select.querySelector(`option[value="${value}"]`);
            if (option) option.selected = true;
            const customOption = customOptions.querySelector(`.custom-option[data-value="${value}"]`);
            if (customOption) customOption.classList.add('selected');
        });
        
        const allOptionsSelected = Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all-option)'))
            .every(opt => opt.classList.contains('selected'));
        if (allOptionsSelected) {
            selectAllDiv.classList.add('selected');
        }
        
        updateMultiSelectText(select, display);
        handleMultiSelectOtherOptions(selectId, select);
    }
    
    if (select.id === 'languagesSelect' && formValues.languages && formValues.languages.length > 0) {
        formValues.languages.forEach(value => {
            const option = select.querySelector(`option[value="${value}"]`);
            if (option) option.selected = true;
            const customOption = customOptions.querySelector(`.custom-option[data-value="${value}"]`);
            if (customOption) customOption.classList.add('selected');
        });
        
        const allOptionsSelected = Array.from(customOptions.querySelectorAll('.custom-option:not(.select-all-option)'))
            .every(opt => opt.classList.contains('selected'));
        if (allOptionsSelected) {
            selectAllDiv.classList.add('selected');
        }
        
        updateMultiSelectText(select, display);
        handleMultiSelectOtherOptions(selectId, select);
    }
}

// Helper function to handle "other" options in multi-select
function handleMultiSelectOtherOptions(selectId, select) {
    if (selectId === 'crmsSelect') {
        const hasOtherSelected = Array.from(select.options)
            .some(opt => opt.selected && opt.value === 'other');
        if (hasOtherSelected) {
            showConditionalSection('#other-crm-group');
        } else {
            hideConditionalSection('#other-crm-group');
            formValues.otherCrm = '';
            const otherCrmInput = formContainer.querySelector('#other-crm');
            if (otherCrmInput) otherCrmInput.value = '';
        }
    }
    
    if (selectId === 'databasesSelect') {
        const hasOtherSelected = Array.from(select.options)
            .some(opt => opt.selected && opt.value === 'other');
        if (hasOtherSelected) {
            showConditionalSection('#other-database-group');
        } else {
            hideConditionalSection('#other-database-group');
            formValues.otherDatabase = '';
            const otherDbInput = formContainer.querySelector('#other-database');
            if (otherDbInput) otherDbInput.value = '';
        }
    }
}
// Helper function to handle "other" options in multi-select
function handleMultiSelectOtherOptions(selectId, select) {
    // NEW ADDITION - Handle form types "other" option
    if (selectId === 'formTypesSelect') {
        const hasOtherSelected = Array.from(select.options)
            .some(opt => opt.selected && opt.value === 'other');
        if (hasOtherSelected) {
            showConditionalSection('#other-form-type-group');
        } else {
            hideConditionalSection('#other-form-type-group');
            formValues.otherFormType = '';
            const otherFormTypeInput = formContainer.querySelector('#other-form-type');
            if (otherFormTypeInput) otherFormTypeInput.value = '';
        }
    }
    
    if (selectId === 'crmsSelect') {
        const hasOtherSelected = Array.from(select.options)
            .some(opt => opt.selected && opt.value === 'other');
        if (hasOtherSelected) {
            showConditionalSection('#other-crm-group');
        } else {
            hideConditionalSection('#other-crm-group');
            formValues.otherCrm = '';
            const otherCrmInput = formContainer.querySelector('#other-crm');
            if (otherCrmInput) otherCrmInput.value = '';
        }
    }
    
    if (selectId === 'databasesSelect') {
        const hasOtherSelected = Array.from(select.options)
            .some(opt => opt.selected && opt.value === 'other');
        if (hasOtherSelected) {
            showConditionalSection('#other-database-group');
        } else {
            hideConditionalSection('#other-database-group');
            formValues.otherDatabase = '';
            const otherDbInput = formContainer.querySelector('#other-database');
            if (otherDbInput) otherDbInput.value = '';
        }
    }
}
function updateMultiSelectText(select, display) {
            const selectedOptions = Array.from(select.options)
                .filter(opt => opt.selected);
            if (selectedOptions.length === 0) {
                display.querySelector('span')
                    .textContent = display.getAttribute('data-placeholder');
                display.classList.add('placeholder');
            } else if (selectedOptions.length === 1) {
                display.querySelector('span')
                    .textContent = selectedOptions[0].text;
                display.classList.remove('placeholder');
            } else {
                display.querySelector('span')
                    .textContent = `${selectedOptions.length} ${currentLanguage === 'fr' ? 'sélectionnés' : 'selected'}`;
                display.classList.remove('placeholder');
            }
        }
        // Global click handler to close dropdowns
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.select-wrapper')) {
                formContainer.querySelectorAll('.custom-options')
                    .forEach(opt => {
                        opt.classList.remove('show-options');
                    });
                formContainer.querySelectorAll('.dropdown-icon')
                    .forEach(icon => {
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
            const firstName = formContainer.querySelector('#first-name')
                .value.trim();
            if (!firstName) {
                showError('error-firstname', 'firstNameRequired');
                isValid = false;
            } else {
                hideError('error-firstname');
                formValues.firstName = firstName;
            }
            // Validate last name - FIXED SELECTOR
            const lastName = formContainer.querySelector('#last-name')
                .value.trim();
            if (!lastName) {
                showError('error-lastname', 'lastNameRequired');
                isValid = false;
            } else {
                hideError('error-lastname');
                formValues.lastName = lastName;
            }
            // Validate email - FIXED SELECTOR
            const email = formContainer.querySelector('#email')
                .value.trim();
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
            const phone = formContainer.querySelector('#phone')
                .value.trim();
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
            const company = formContainer.querySelector('#company')
                .value.trim();
            formValues.company = company;
            return isValid;
        }

        function validateStep2() {
            let isValid = true;
            // Validate niche
            const niche = formContainer.querySelector('#niche')
                .value;
            if (!niche) {
                showError('error-niche', 'nicheRequired');
                isValid = false;
            } else {
                hideError('error-niche');
                formValues.niche = niche;
                // Validate other niche if selected
                if (niche === 'other') {
                    const otherNiche = formContainer.querySelector('#other-niche')
                        .value.trim();
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
            const budget = formContainer.querySelector('#budget')
                .value;
            if (!budget) {
                showError('error-budget', 'budgetRequired');
                isValid = false;
            } else {
                hideError('error-budget');
                formValues.budget = budget;
                // Validate custom budget if selected
                if (budget === 'custom') {
                    const customBudget = formContainer.querySelector('#custom-budget')
                        .value.trim();
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
            const description = formContainer.querySelector('#description')
                .value.trim();
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
            const teamSize = formContainer.querySelector('#team-size')
                .value;
            if (!teamSize) {
                showError('error-team-size', 'teamSizeRequired');
                isValid = false;
            } else {
                hideError('error-team-size');
                formValues.teamSize = teamSize;
            }
            // Validate services
            const services = formContainer.querySelector('#services')
                .value.trim();
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
    
    // Validate use form selection
    const useForm = formContainer.querySelector('input[name="useForm"]:checked');
    if (!useForm) {
        showError('error-use-form', 'useFormRequired');
        isValid = false;
    } else {
        hideError('error-use-form');
        formValues.useForm = useForm.value;
    }
    
    if (formValues.useForm === 'yes') {
        // Validate form types selection
        if (formValues.formTypes.length === 0) {
            showError('error-form-types', 'formTypesRequired');
            isValid = false;
        } else {
            hideError('error-form-types');
            
            // NEW ADDITION - Validate other form type if selected
            if (formValues.formTypes.includes('other')) {
                const otherFormType = formContainer.querySelector('#other-form-type').value.trim();
                if (!otherFormType) {
                    showError('error-other-form-type', 'otherFormTypeRequired');
                    isValid = false;
                } else {
                    hideError('error-other-form-type');
                    formValues.otherFormType = otherFormType;
                }
            }
        }
        
        // Validate form purpose
        const formPurpose = formContainer.querySelector('#form-purpose').value.trim();
        if (!formPurpose) {
            showError('error-form-purpose', 'fieldRequired');
            isValid = false;
        } else {
            hideError('error-form-purpose');
            formValues.formPurpose = formPurpose;
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
                    const websitePlatform = formContainer.querySelector('#website-platform')
                        .value;
                    if (!websitePlatform) {
                        showError('error-platform', 'platformRequired');
                        isValid = false;
                    } else {
                        hideError('error-platform');
                        formValues.websitePlatform = websitePlatform;
                        // Validate other platform if selected
                        if (websitePlatform === 'other') {
                            const otherPlatform = formContainer.querySelector('#other-platform')
                                .value.trim();
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
					const websiteUrl = formContainer.querySelector('#website-url')
						.value.trim();
					if (!websiteUrl) {
						showError('error-website-url', 'websiteUrlRequired');
						isValid = false;
					} else if (!isValidUrl(websiteUrl)) {
						showError('error-website-url', 'websiteUrlInvalid');
						isValid = false;
					} else {
						hideError('error-website-url');
						formValues.websiteUrl = normalizeUrl(websiteUrl);
						// Update the input field to show normalized value
						formContainer.querySelector('#website-url').value = formValues.websiteUrl;
					}
                    // Validate website traffic
                    const websiteTraffic = formContainer.querySelector('#website-traffic')
                        .value;
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
                formValues.bookingSystems = bookingSystem;
                
                // Validate other booking system if selected
                if (bookingSystem === 'other') {
                    const otherBooking = formContainer.querySelector('#other-booking').value.trim();
                    if (!otherBooking) {
                        showError('error-other-booking', 'otherBookingRequired');
                        isValid = false;
                    } else {
                        hideError('error-other-booking');
                        formValues.otherBooking = otherBooking;
                    }
                }
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
                
                // Validate other CRM if selected
                if (formValues.crms.includes('other')) {
                    const otherCrm = formContainer.querySelector('#other-crm').value.trim();
                    if (!otherCrm) {
                        showError('error-other-crm', 'otherCrmRequired');
                        isValid = false;
                    } else {
                        hideError('error-other-crm');
                        formValues.otherCrm = otherCrm;
                    }
                }
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
                
                // Validate other database if selected
                if (formValues.databases.includes('other')) {
                    const otherDatabase = formContainer.querySelector('#other-database').value.trim();
                    if (!otherDatabase) {
                        showError('error-other-database', 'otherDatabaseRequired');
                        isValid = false;
                    } else {
                        hideError('error-other-database');
                        formValues.otherDatabase = otherDatabase;
                    }
                }
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
            const selectedPlatforms = Array.from(socialPlatformsSelect.options)
                .filter(opt => opt.selected);
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
        
        // Validate language selection
        const languagesSelect = formContainer.querySelector('#languagesSelect');
        
        if (languageType.value === 'multilingual') {
            // For multilingual: check if at least one language is selected
            const selectedLanguages = Array.from(languagesSelect.options)
                .filter(opt => opt.selected);
            if (selectedLanguages.length === 0) {
                showError('error-languages', 'languagesRequired');
                isValid = false;
            } else {
                hideError('error-languages');
                formValues.languages = selectedLanguages.map(opt => opt.value);
            }
        } else {
            // For unilingual: check if one language is selected
            if (!languagesSelect.value) {
                showError('error-languages', 'languagesRequired');
                isValid = false;
            } else {
                hideError('error-languages');
                formValues.languages = [languagesSelect.value]; // Store as array for consistency
            }
        }
    }
    
    return isValid;
}

        function showError(errorId, messageKey) {
            const errorElement = formContainer.querySelector(`#${errorId}`);
            if (errorElement) {
                // Reconstruct the entire error message structure
                if (messageKey) {
                    errorElement.innerHTML = `
						<div class="error-icon">!</div>
						<span class="error-text">${getText(messageKey)}</span>
					`;
                }
                errorElement.classList.add('show');
            }
        }

        function hideError(errorId) {
            const errorElement = formContainer.querySelector(`#${errorId}`);
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
            formContainer.querySelector('#recap-name')
                .textContent = `${formValues.firstName} ${formValues.lastName}`;
            formContainer.querySelector('#recap-email')
                .textContent = formValues.email;
            formContainer.querySelector('#recap-phone')
                .textContent = formValues.phone;
            if (formValues.company) {
                formContainer.querySelector('#recap-company')
                    .textContent = formValues.company;
                formContainer.querySelector('#recap-company-row')
                    .style.display = 'flex';
            } else {
                formContainer.querySelector('#recap-company-row')
                    .style.display = 'none';
            }
            // Project Details
            let nicheText = '';
            if (formValues.niche === 'other' && formValues.otherNiche) {
                nicheText = formValues.otherNiche;
            } else {
                const niche = localFormData.niches.find(n => n.id === formValues.niche);
                nicheText = niche ? niche.name : formValues.niche;
            }
            formContainer.querySelector('#recap-niche')
                .textContent = nicheText;
            let budgetText = '';
            if (formValues.budget === 'custom' && formValues.customBudget) {
                budgetText = formValues.customBudget;
            } else {
                const budget = localFormData.budgetRanges.find(b => b.id === formValues.budget);
                budgetText = budget ? budget.name : formValues.budget;
            }
            formContainer.querySelector('#recap-budget')
                .textContent = budgetText;
            formContainer.querySelector('#recap-description')
                .textContent = formValues.description;
            // Business Profile
            let teamSizeText = '';
            switch (formValues.teamSize) {
            case 'solo':
                teamSizeText = getText('solo');
                break;
            case 'small':
                teamSizeText = getText('smallTeam');
                break;
            case 'medium':
                teamSizeText = getText('mediumTeam');
                break;
            case 'large':
                teamSizeText = getText('largeTeam');
                break;
            }
            formContainer.querySelector('#recap-team-size')
                .textContent = teamSizeText;
            formContainer.querySelector('#recap-services')
                .textContent = formValues.services;
            // Features
            let leadsText = '';
            leadsText += `${getText('leadCaptureQuestion')}: ${formValues.leadCapture === 'yes' ? getText('yes') : getText('no')}\n`;
            leadsText += `${getText('leadQualificationQuestion')}: ${formValues.leadQualification === 'yes' ? getText('yes') : getText('no')}\n`;
            leadsText += `${getText('conversationSummaryQuestion')}: ${formValues.conversationSummary === 'yes' ? getText('yes') : getText('no')}`;
            formContainer.querySelector('#recap-leads')
                .innerHTML = leadsText.replace(/\n/g, '<br>');
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
            formContainer.querySelector('#recap-forms')
                .textContent = formsText;
            // Website
            formContainer.querySelector('#recap-has-website')
                .textContent = formValues.hasWebsite === 'yes' ? getText('yes') : getText('no');
            if (formValues.hasWebsite === 'yes' && formValues.websitePlatform) {
                formContainer.querySelector('#recap-platform-row')
                    .style.display = 'flex';
                let platformText = '';
                if (formValues.websitePlatform === 'other' && formValues.otherPlatform) {
                    platformText = formValues.otherPlatform;
                } else {
                    const platform = localFormData.websitePlatforms.find(p => p.id === formValues.websitePlatform);
                    platformText = platform ? platform.name : formValues.websitePlatform;
                }
                formContainer.querySelector('#recap-platform')
                    .textContent = platformText;
                // Add website URL to summary
                formContainer.querySelector('#recap-website-url-row')
                    .style.display = 'flex';
                formContainer.querySelector('#recap-website-url')
                    .textContent = formValues.websiteUrl || '(non spécifié)';
                // Add this block for website traffic
                formContainer.querySelector('#recap-website-traffic-row')
                    .style.display = 'flex';
                const traffic = localFormData.websiteTraffic.find(t => t.id === formValues.websiteTraffic);
                formContainer.querySelector('#recap-website-traffic')
                    .textContent = traffic ? traffic.name : '(non spécifié)';
            } else {
                formContainer.querySelector('#recap-platform-row')
                    .style.display = 'none';
                formContainer.querySelector('#recap-website-url-row')
                    .style.display = 'none';
                formContainer.querySelector('#recap-website-traffic-row')
                    .style.display = 'none';
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
            formContainer.querySelector('#recap-crm')
                .textContent = crmText;
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
            formContainer.querySelector('#recap-booking')
                .textContent = bookingText;
            let databaseText = formValues.useDatabase === 'yes' ? getText('yes') : getText('no');
            if (formValues.useDatabase === 'yes' && formValues.databases.length > 0) {
                const dbNames = formValues.databases.map(dbId => {
                    const db = localFormData.databases.find(d => d.id === dbId);
                    return db ? db.name : dbId;
                });
                databaseText += `: ${dbNames.join(', ')}`;
            }
            formContainer.querySelector('#recap-database')
                .textContent = databaseText;
            // Communication Channels
            let socialText = formValues.needSocialBot === 'yes' ? getText('yes') : getText('no');
            if (formValues.needSocialBot === 'yes' && formValues.socialPlatforms.length > 0) {
                const platformNames = formValues.socialPlatforms.map(platformId => {
                    const platform = localFormData.socialPlatforms.find(p => p.id === platformId);
                    return platform ? platform.name : platformId;
                });
                socialText += `: ${platformNames.join(', ')}`;
            }
            formContainer.querySelector('#recap-social')
                .textContent = socialText;
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
            formContainer.querySelector('#recap-language-type')
                .textContent = languageTypeText;
            // Handle languages display in summary
            if (formValues.languages && formValues.languages.length > 0) {
                formContainer.querySelector('#recap-languages-row')
                    .style.display = 'flex';
                // Get the names of selected languages
                const languageNames = formValues.languages.map(langId => {
                    const lang = localFormData.languages.find(l => l.id === langId);
                    return lang ? lang.name : langId;
                });
                // Update based on language type
                if (formValues.languageType === 'unilingual') {
                    // Display single language label and value
                    formContainer.querySelector('#recap-languages-label')
                        .textContent = getText('selectLanguage');
                    formContainer.querySelector('#recap-languages')
                        .textContent = languageNames[0] || '';
                } else {
                    // Display multiple languages label and comma-separated values
                    formContainer.querySelector('#recap-languages-label')
                        .textContent = getText('selectLanguages');
                    formContainer.querySelector('#recap-languages')
                        .textContent = languageNames.join(', ');
                }
            } else {
                // Hide language row if no languages selected
                formContainer.querySelector('#recap-languages-row')
                    .style.display = 'none';
            }
        }
        /*************************************************************
         * Event Listeners and Form Initialization
         *************************************************************/
        // Language type selection
        formContainer.querySelectorAll('input[name="languageType"]')
            .forEach(radio => {
                radio.addEventListener('change', function () {
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
                                customOptions.querySelectorAll('.custom-option')
                                    .forEach(opt => {
                                        opt.classList.remove('selected');
                                    });
                                // Add selected class to this option
                                optElement.classList.add('selected');
                                // Update select element value
                                select.value = option.id;
                                // Update display text
                                display.querySelector('span')
                                    .textContent = option.name;
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
                            document.querySelectorAll('.custom-options')
                                .forEach(opt => {
                                    if (opt !== customOptions) opt.classList.remove('show-options');
                                });
                            document.querySelectorAll('.dropdown-icon')
                                .forEach(icn => {
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
                    updatedDisplay.querySelector('span')
                        .textContent = updatedDisplay.getAttribute('data-placeholder');
                    // Update form values and save
                    formValues.languageType = this.value;
                    saveFormData();
                });
            });
        // CRM usage
        formContainer.querySelectorAll('input[name="useCRM"]')
            .forEach(radio => {
                radio.addEventListener('change', function () {
                    hideError('error-use-crm');
                    formValues.useCRM = this.value;
                    if (this.value === 'yes') {
                        showConditionalSection('#crm-selection');
                    } else {
                        hideConditionalSection('#crm-selection');
                        // Clear CRM-related values
                        formValues.crms = [];
                    }
                    saveFormData();
                });
            });
        // Has booking system
        formContainer.querySelectorAll('input[name="hasBookingSystem"]')
            .forEach(radio => {
                radio.addEventListener('change', function () {
                    hideError('error-has-booking');
                    formValues.hasBookingSystem = this.value;
                    // Always hide both sections first
                    hideConditionalSection('#existing-booking-options');
                    hideConditionalSection('#need-booking-options');
                    // Only show the appropriate section based on selection
                    if (this.value === 'yes') {
                        showConditionalSection('#existing-booking-options');
                        // Clear recommendation values when showing existing options
                        formValues.wantBookingRecommendation = null;
                        // Clear any checked recommendation radio buttons
                        const recommendationRadios = formContainer.querySelectorAll('input[name="wantBookingRecommendation"]');
                        recommendationRadios.forEach(r => r.checked = false);
                    } else if (this.value === 'no') {
                        showConditionalSection('#need-booking-options');
                        // Clear existing booking system values when showing recommendation options
                        formValues.bookingSystems = null;
                        // Reset booking system dropdown
                        const bookingSelect = formContainer.querySelector('#bookingSystemsSelect');
                        if (bookingSelect) {
                            bookingSelect.selectedIndex = 0;
                            const bookingDisplay = formContainer.querySelector('#selectDisplayBookingSystems');
                            if (bookingDisplay) {
                                bookingDisplay.classList.add('placeholder');
                                const span = bookingDisplay.querySelector('span');
                                if (span) span.textContent = bookingDisplay.getAttribute('data-placeholder');
                            }
                        }
                    }
                    saveFormData();
                });
            });
        // Want booking recommendation
        formContainer.querySelectorAll('input[name="wantBookingRecommendation"]')
            .forEach(radio => {
                radio.addEventListener('change', function () {
                    formValues.wantBookingRecommendation = this.value;
                    saveFormData();
                });
            });
        // Database usage
        formContainer.querySelectorAll('input[name="useDatabase"]')
            .forEach(radio => {
                radio.addEventListener('change', function () {
                    hideError('error-use-database');
                    formValues.useDatabase = this.value;
                    if (this.value === 'yes') {
                        showConditionalSection('#database-selection');
                    } else {
                        hideConditionalSection('#database-selection');
                        // Clear database-related values
                        formValues.databases = [];
                    }
                    saveFormData();
                });
            });
        // Form usage
        formContainer.querySelectorAll('input[name="useForm"]')
            .forEach(radio => {
                radio.addEventListener('change', function () {
                    hideError('error-use-form');
                    formValues.useForm = this.value;
                    if (this.value === 'yes') {
                        showConditionalSection('#form-options');
                    } else {
                        hideConditionalSection('#form-options');
                        // Clear form-related values when hiding
                        formValues.formTypes = [];
                        formValues.formPurpose = '';
                    }
                    saveFormData();
                });
            });
        // Website
        formContainer.querySelectorAll('input[name="hasWebsite"]')
            .forEach(radio => {
                radio.addEventListener('change', function () {
                    hideError('error-has-website');
                    formValues.hasWebsite = this.value;
                    if (this.value === 'yes') {
                        showConditionalSection('#website-options');
                    } else {
                        hideConditionalSection('#website-options');
                        // Hide nested sections when parent is hidden
                        hideConditionalSection('#other-platform-group');
                        // Clear website-related values
                        formValues.websitePlatform = null;
                        formValues.websiteUrl = '';
                        formValues.websiteTraffic = null;
                        formValues.otherPlatform = '';
                    }
                    saveFormData();
                });
            });
        // Social bot
        formContainer.querySelectorAll('input[name="needSocialBot"]')
            .forEach(radio => {
                radio.addEventListener('change', function () {
                    hideError('error-need-social');
                    formValues.needSocialBot = this.value;
                    if (this.value === 'yes') {
                        showConditionalSection('#social-platforms-group');
                    } else {
                        hideConditionalSection('#social-platforms-group');
                        // Clear social platform values
                        formValues.socialPlatforms = [];
                    }
                    saveFormData();
                });
            });
        // Text input changes with character counting
        formContainer.querySelector('#services')
            .addEventListener('input', function () {
                formValues.services = this.value;
                formContainer.querySelector('#services-counter')
                    .textContent = this.value.length;
                saveFormData();
            });
        formContainer.querySelector('#form-purpose')
            .addEventListener('input', function () {
                formValues.formPurpose = this.value;
                formContainer.querySelector('#form-purpose-counter')
                    .textContent = this.value.length;
                saveFormData();
            });
        formContainer.querySelector('#description')
            .addEventListener('input', function () {
                formValues.description = this.value;
                formContainer.querySelector('#description-counter')
                    .textContent = this.value.length;
                saveFormData();
            });
        // Contact form fields
        formContainer.querySelector('#first-name')
            .addEventListener('input', function () {
                formValues.firstName = this.value;
                saveFormData();
            });
        formContainer.querySelector('#last-name')
            .addEventListener('input', function () {
                formValues.lastName = this.value;
                saveFormData();
            });
        formContainer.querySelector('#email')
            .addEventListener('input', function () {
                formValues.email = this.value;
                saveFormData();
            });
        formContainer.querySelector('#phone')
            .addEventListener('input', function () {
                formValues.phone = this.value;
                saveFormData();
            });
        formContainer.querySelector('#company')
            .addEventListener('input', function () {
                formValues.company = this.value;
                saveFormData();
            });
        // Other text fields
        formContainer.querySelector('#other-platform')
            .addEventListener('input', function () {
                formValues.otherPlatform = this.value;
                saveFormData();
            });
        formContainer.querySelector('#other-niche')
            .addEventListener('input', function () {
                formValues.otherNiche = this.value;
                saveFormData();
            });
        formContainer.querySelector('#custom-budget')
            .addEventListener('input', function () {
                formValues.customBudget = this.value;
                saveFormData();
            });
        formContainer.querySelector('#website-url')
            .addEventListener('input', function () {
                formValues.websiteUrl = this.value;
                saveFormData();
            });
			
			


formContainer.querySelector('#other-form-type')
    .addEventListener('input', function () {
        formValues.otherFormType  = this.value;
        if (this.value.trim()) {
            hideError('error-other-form-type');
        }
        saveFormData();
    });
	
		// Add these with the other input event listeners
formContainer.querySelector('#other-crm')
    .addEventListener('input', function () {
        formValues.otherCrm = this.value;
        if (this.value.trim()) {
            hideError('error-other-crm');
        }
        saveFormData();
    });

formContainer.querySelector('#other-booking')
    .addEventListener('input', function () {
        formValues.otherBooking = this.value;
        if (this.value.trim()) {
            hideError('error-other-booking');
        }
        saveFormData();
    });

formContainer.querySelector('#other-database')
    .addEventListener('input', function () {
        formValues.otherDatabase = this.value;
        if (this.value.trim()) {
            hideError('error-other-database');
        }
        saveFormData();
    });
        /*************************************************************
         * Navigation Setup
         *************************************************************/
        // Step 1 navigation
        formContainer.querySelector('#step1-next')
            .addEventListener('click', function () {
                if (validateStep1()) {
                    showStep(2);
                }
            });
        // Step 2 navigation
        formContainer.querySelector('#step2-prev')
            .addEventListener('click', () => showStep(1));
        formContainer.querySelector('#step2-next')
            .addEventListener('click', function () {
                if (validateStep2()) {
                    showStep(3);
                }
            });
        // Step 3 navigation
        formContainer.querySelector('#step3-prev')
            .addEventListener('click', () => showStep(2));
        formContainer.querySelector('#step3-next')
            .addEventListener('click', function () {
                if (validateStep3()) {
                    showStep(4);
                }
            });
        // Step 4 navigation
        formContainer.querySelector('#step4-prev')
            .addEventListener('click', () => showStep(3));
        formContainer.querySelector('#step4-next')
            .addEventListener('click', function () {
                if (validateStep4()) {
                    showStep(5);
                }
            });
        // Step 5 navigation
        formContainer.querySelector('#step5-prev')
            .addEventListener('click', () => showStep(4));
        formContainer.querySelector('#step5-next')
            .addEventListener('click', function () {
                if (validateStep5()) {
                    showStep(6);
                }
            });
        // Step 6 navigation
        formContainer.querySelector('#step6-prev')
            .addEventListener('click', () => showStep(5));
        formContainer.querySelector('#step6-next')
            .addEventListener('click', function () {
                if (validateStep6()) {
                    showStep(7);
                }
            });
        // Step 7 navigation
        formContainer.querySelector('#step7-prev')
            .addEventListener('click', () => showStep(6));
        formContainer.querySelector('#step7-next')
            .addEventListener('click', function () {
                if (validateStep7()) {
                    showStep(8);
                }
            });
        // Step 8 navigation
        formContainer.querySelector('#step8-prev')
            .addEventListener('click', () => showStep(7));
        formContainer.querySelector('#step8-next')
            .addEventListener('click', function () {
                if (validateStep8()) {
                    updateSummary();
                    showStep(9);
                }
            });
        // Step 9 navigation
        formContainer.querySelector('#step9-prev')
            .addEventListener('click', () => showStep(8));
        // Edit buttons in summary
        formContainer.querySelector('#edit-contact')
            .addEventListener('click', () => showStep(1));
        formContainer.querySelector('#edit-project')
            .addEventListener('click', () => showStep(2));
        formContainer.querySelector('#edit-business')
            .addEventListener('click', () => showStep(3));
        formContainer.querySelector('#edit-features')
            .addEventListener('click', () => showStep(4));
        formContainer.querySelector('#edit-forms')
            .addEventListener('click', () => showStep(5));
        formContainer.querySelector('#edit-website')
            .addEventListener('click', () => showStep(6));
        formContainer.querySelector('#edit-integrations')
            .addEventListener('click', () => showStep(7));
        formContainer.querySelector('#edit-channels')
            .addEventListener('click', () => showStep(8));
        /*************************************************************
         * Form Submission
         *************************************************************/
        formContainer.querySelector('#submit-button')
            .addEventListener('click', function () {
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
                        if (vf) {
                            window.voiceflow.chat.interact({
                                type: "success",
                                payload: submissionData
                            });
                        }
                        // Hide all steps and show confirmation
                        formContainer.querySelectorAll('.step-container')
                            .forEach(step => {
                                step.classList.remove('active');
                            });
                        formContainer.querySelector('.progress-container')
                            .style.display = 'none';
                        formContainer.querySelector('#confirmation-screen')
                            .classList.add('active');
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
                    {
                        id: 'solo',
                        name: getText('solo')
                    },
                    {
                        id: 'small',
                        name: getText('smallTeam')
                    },
                    {
                        id: 'medium',
                        name: getText('mediumTeam')
                    },
                    {
                        id: 'large',
                        name: getText('largeTeam')
                    }
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
                formData.budgetRanges.concat([{
                    id: 'custom',
                    name: currentLanguage === 'fr' ? 'Personnalisé' : 'Custom'
                }])
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


const ContactFormExtension = {
			name: "ContactForm",
			type: "response",
			match: ({trace}) => trace.type === "ext_contact_form" || trace.payload?.name === "ext_contact_form",
			render: ({trace,element}) => {
			
				// Get language and other trace data
				const {language, vf} = trace.payload;
				
				// Initialize variables
				const totalSteps = 4;
				let isFormSubmitted = false;
				const TIMEOUT_DURATION = 900000;
				let formTimeoutId = null;
	
				function debounce(func, wait) {
					let timeout;
					return function executedFunction(...args) {
						const later = () => {
							clearTimeout(timeout);
							func(...args);
						};
						clearTimeout(timeout);
						timeout = setTimeout(later, wait);
					};
				}
	
				function isValidEmail(email) {
					return FormManager.validation.email(email);
				}
		
				function isValidPhoneNumber(phoneNumber) {
					return FormManager.validation.phoneNumber(phoneNumber);
				}
		
				function formatPhoneNumber(phoneNumber) {
					const cleaned = phoneNumber.replace(/\D/g, '');
					if (cleaned.length === 10) {
						return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
					}
					return phoneNumber;
				}
				
				// Conditional section helpers
				function showConditionalSection(sectionId, container) {
					const element = container.querySelector(sectionId);
					if (element) {
						element.style.removeProperty('display');
						element.style.setProperty('display', 'flex', 'important');
						element.setAttribute('aria-hidden', 'false');
						element.classList.add('visible');
					}
				}
	
				function hideConditionalSection(sectionId, container) {
					const element = container.querySelector(sectionId);
					if (element) {
						element.style.setProperty('display', 'none', 'important');
						element.setAttribute('aria-hidden', 'true');
						element.classList.remove('visible');
					}
				}
				
				const FormManager = {
					currentStep: 1,
					// ================================
					// CONSTANTES SVG
					// ================================
					constants: {
						SVG: {
							CHECK:	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12px" height="12px">
										<path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
									</svg>`,
							CHEVRON:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
										<g transform="translate(75, 75)">
											<path fill="#ffffff" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
										</g>
									</svg>`,
							CLOSE:	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="8px" height="8px">
										<path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
									</svg>`
						}
					},
					// ================================
					// HELPER FUNCTIONS
					// ================================
					
					// Function to create input field
					createInputField(config) {
						const {type = 'text', id, labelKey, placeholderKey, formField, required = false, maxLength, rows = 4, errorId, validator, container, context} = config;
						const {language, formValues, translations} = context;
						const getText = (key) => translations[language][key] || key;
						const inputType = ['email', 'tel', 'text'].includes(type) ? type : 'text';
						
						let inputElement;
						if (type === 'textarea') {
							inputElement = `
								<div class="textarea-wrapper">
									<textarea id="${id}" name="${formField}" 
										placeholder="${getText(placeholderKey)}" 
										rows="${rows}"
										${maxLength ? `maxlength="${maxLength}"` : ''}></textarea>
									${maxLength ? `<div class="char-counter"><span id="${id}-counter">0</span>/${maxLength}</div>` : ''}
								</div>
							`;
						} else {
							inputElement = `
								<input type="${inputType}" id="${id}" name="${formField}" 
									placeholder="${getText(placeholderKey)}"
									${maxLength ? `maxlength="${maxLength}"` : ''} />
							`;
						}
						
						const html = `
							<div class="form-group">
								<label for="${id}" class="form-label${required ? ' required' : ''}" id="${id}-label">
									${getText(labelKey)}
								</label>
								${inputElement}
								${required && errorId ? `<div class="error-message" id="${errorId}">
									<div class="error-icon">!</div>
									<span class="error-text">${getText('fieldRequired')}</span>
								</div>` : ''}
							</div>
						`;
						
						setTimeout(() => {
							if (container) {
								const inputEl = container.querySelector(`#${id}`);
								if (inputEl) {
									inputEl.addEventListener('input', function () {
										formValues[formField] = this.value.trim();
										if (type === 'textarea' && maxLength) {
											const counter = container.querySelector(`#${id}-counter`);
											if (counter) counter.textContent = this.value.length;
										}
										if (this.value.trim() && errorId) {
											const errorEl = container.querySelector(`#${errorId}`);
											if (errorEl) errorEl.classList.remove('show');
										}
										if (validator && this.value.trim()) {
											const isValid = validator(this.value.trim());
											if (!isValid && errorId) {
												const errorEl = container.querySelector(`#${errorId}`);
												if (errorEl) errorEl.classList.add('show');
											}
										}
										if (type === 'email' && this.value.trim() && context.debouncedValidation) {
											context.debouncedValidation.email(this.value.trim());
										} else if (type === 'tel' && this.value.trim() && context.debouncedValidation) {
											context.debouncedValidation.phone(this.value.trim());
										}
										if (context.saveFormData) context.saveFormData();
									});
								}
							}
						}, 0);
						return html;
					},
					
					// Function to create single select dropdown
					createSingleSelectDropdown(config) {
						const {id, labelKey, options, errorId, formField, required = false, onSelect, container, context} = config;
						const {language, formValues, translations} = context;
						const getText = (key) => translations[language][key] || key;
						
						const html = `
							<div class="form-group">
								<label for="${id}" class="form-label${required ? ' required' : ''}" id="${id}-label">
									${getText(labelKey)}
								</label>
								<div class="select-container" id="${id}Dropdown">
									<select id="${id}"></select>
									<div class="select-wrapper">
										<div class="select-display placeholder" id="selectDisplay${id}" data-placeholder="${getText('selectPlaceholder')}">
											<span id="selectedText${id}">${getText('selectPlaceholder')}</span>
											<div class="dropdown-icon" id="dropdownIcon${id}">${this.constants.SVG.CHEVRON}</div>
										</div>
										<div class="custom-options" id="customOptions${id}"></div>
									</div>
								</div>
								${required ? `<div class="error-message" id="${errorId}">
									<div class="error-icon">!</div>
									<span class="error-text">${getText('fieldRequired')}</span>
								</div>` : ''}
							</div>
						`;
						
						setTimeout(() => {
							if (container) {
								this.buildSingleSelectDropdown({
									selectId: id,
									customOptionsId: `customOptions${id}`,
									displayId: `selectDisplay${id}`,
									iconId: `dropdownIcon${id}`,
									options: options,
									formField: formField,
									errorId: errorId,
									container: container,
									context: context,
									onSelect: onSelect
								});
							}
						}, 0);
						return html;
					},
					
					// ================================
					// DROPDOWN BUILDER METHODS
					// ================================
					buildSingleSelectDropdown(config) {
						const {selectId, customOptionsId, displayId, iconId, options, formField, container, context, onSelect, errorId} = config;
						const {formValues, language, translations} = context;
						const getText = (key) => translations[language][key] || key;
						const select = container.querySelector(`#${selectId}`);
						const customOptions = container.querySelector(`#${customOptionsId}`);
						const display = container.querySelector(`#${displayId}`);
						const icon = container.querySelector(`#${iconId}`);
						
						if (!select || !customOptions || !display || !icon) return;
						
						select.innerHTML = '';
						customOptions.innerHTML = '';
						select.appendChild(new Option(getText('selectPlaceholder'), ''));
						
						options.forEach(option => {
							select.appendChild(new Option(option.name, option.id));
							const optElement = document.createElement('div');
							optElement.className = 'custom-option';
							optElement.dataset.value = option.id;
							const checkbox = document.createElement('div');
							checkbox.className = 'option-checkbox';
							checkbox.innerHTML = FormManager.constants.SVG.CHECK;
							const text = document.createElement('span');
							text.textContent = option.name;
							optElement.appendChild(checkbox);
							optElement.appendChild(text);
							
							optElement.addEventListener('click', () => {
								customOptions.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
								optElement.classList.add('selected');
								select.value = option.id;
								display.querySelector('span').textContent = option.name;
								display.classList.remove('placeholder');
								customOptions.classList.remove('show-options');
								icon.classList.remove('rotate');
								
								// Hide error message if exists
								if (errorId) {
									const errorElement = container.querySelector(`#${errorId}`);
									if (errorElement) errorElement.classList.remove('show');
								}
								
								formValues[formField] = option.id;
								if (context.saveFormData) context.saveFormData();
								if (onSelect) onSelect(option.id, container, context);
							});
							
							customOptions.appendChild(optElement);
						});
						
						display.addEventListener('click', (e) => {
							e.stopPropagation();
							container.querySelectorAll('.custom-options')
								.forEach(opt => {
									if (opt !== customOptions) opt.classList.remove('show-options');
								});
							container.querySelectorAll('.dropdown-icon')
								.forEach(icn => {
									if (icn !== icon) icn.classList.remove('rotate');
								});
							customOptions.classList.toggle('show-options');
							icon.classList.toggle('rotate');
						});
					},
					
					// Validation helper
					validation: {
						email(email) {
							const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
							return emailPattern.test(email);
						},
						phoneNumber(phoneNumber) {
							const phonePattern = /^(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
							return phonePattern.test(phoneNumber);
						}
					},
				
					// ================================
					// FORM DATA
					// ================================
					formData: {
						"fr": {
							services: [
								{id: "IA agent", name: "Agent IA"},
								{id: "Automation", name: "Automatisation"},
								{id: "Web site", name: "Site web"}
							]
						},            
						"en": {                
							services: [
								{id: "IA agent", name: "IA agent"},
								{id: "Automation", name: "Automation"},
								{id: "Web site", name: "Web site"}
							]
						}
					},
					// ================================
					// TRANSLATIONS  
					// ================================
					translations: {
						"fr": {
							step1Title: "Informations de contact",
							step2Title: "Sélection des services",
							step3Title: "Détails du message",
							step4Title: "Vérifiez vos informations",
							// Navigation
							next: "Suivant",
							previous: "Précédent",
							submit: "Envoyer",
							processing: "Traitement...",
							submitted: "Soumis!",
							// Step 1 - Contact
							firstName: "Prénom",
							lastName: "Nom de famille",
							email: "Email",
							phone: "Numéro de téléphone",
							// Step 2 - Service
							selectService: "Sélectionnez un service",
							// Step 3 - Message
							message: "Message",
							messageDetails: "Détails du message",
							// Step 4 - Summary
							fullName: "Nom complet",
							service: "Service",
							edit: "Modifier",
							// Validation - Generic
							fieldRequired: "Ce champ est requis",
							enterValidEmail: "Veuillez saisir une adresse email valide",
							enterValidPhone: "Veuillez saisir un numéro de téléphone valide",
							// Validation - Specific Error Messages
							firstNameRequired: "Le prénom est obligatoire",
							lastNameRequired: "Le nom de famille est obligatoire",
							emailRequired: "L'adresse email est obligatoire",
							emailInvalid: "Format d'adresse email invalide",
							phoneRequired: "Le numéro de téléphone est obligatoire",
							phoneInvalid: "Format de numéro de téléphone invalide",
							serviceRequired: "Vous devez sélectionner un service",
							messageRequired: "Un message est obligatoire",
							// Placeholders
							selectPlaceholder: "-- Sélectionnez un service --",
							enterFirstName: "Entrez votre prénom",
							enterLastName: "Entrez votre nom de famille",
							enterEmail: "Entrez votre adresse email",
							enterPhone: "Entrez votre numéro de téléphone",
							writeMessage: "Écrivez votre message ici...",
							// Errors
							errorSubmission: "Erreur lors de la soumission. Veuillez réessayer."
						},
						"en": {
							step1Title: "Contact Information",
							step2Title: "Services Selection",
							step3Title: "Message Details",
							step4Title: "Review Your Information",
							// Navigation
							next: "Next",
							previous: "Previous",
							submit: "Submit",
							processing: "Processing...",
							submitted: "Submitted!",
							// Step 1 - Contact
							firstName: "First Name",
							lastName: "Last Name",
							email: "Email",
							phone: "Phone Number",
							// Step 2 - Service
							selectService: "Select a Service",
							// Step 3 - Message
							message: "Message",
							messageDetails: "Message Details",
							// Step 4 - Summary
							fullName: "Full Name",
							service: "Service",
							edit: "Edit",
							// Validation - Generic
							fieldRequired: "This field is required",
							enterValidEmail: "Please enter a valid email address",
							enterValidPhone: "Please enter a valid phone number",
							// Validation - Specific Error Messages
							firstNameRequired: "First name is required",
							lastNameRequired: "Last name is required",
							emailRequired: "Email address is required",
							emailInvalid: "Invalid email address format",
							phoneRequired: "Phone number is required",
							phoneInvalid: "Invalid phone number format",
							serviceRequired: "You must select a service",
							messageRequired: "A message is required",
							// Placeholders
							selectPlaceholder: "-- Select a Service --",
							enterFirstName: "Enter your first name",
							enterLastName: "Enter your last name",
							enterEmail: "Enter your email address",
							enterPhone: "Enter your phone number",
							writeMessage: "Write your message here...",
							// Errors
							errorSubmission: "Submission Error. Please try again."
						}
					}
				};
			
				/*************************************************************
				* STEP GENERATION FUNCTIONS USING HELPER FUNCTIONS
				*************************************************************/
				function generateStep1(formContainer, context) {
					const getText = (key) => context.translations[context.language][key] || key;
					return `
						<div class="step-container active" id="step-1">
							<span class="step-heading" id="step1-heading">${getText('step1Title')}</span>
							
							<div class="flex-row">
								${FormManager.createInputField({
									type: 'text',
									id: 'first-name',
									labelKey: 'firstName',
									placeholderKey: 'enterFirstName',
									formField: 'firstName',
									required: true,
									errorId: 'error-firstname',
									container: formContainer,
									context: context
								})}
								
								${FormManager.createInputField({
									type: 'text',
									id: 'last-name',
									labelKey: 'lastName',
									placeholderKey: 'enterLastName',
									formField: 'lastName',
									required: true,
									errorId: 'error-lastname',
									container: formContainer,
									context: context
								})}
							</div>
							
							<div class="flex-row">
								${FormManager.createInputField({
									type: 'email',
									id: 'email',
									labelKey: 'email',
									placeholderKey: 'enterEmail',
									formField: 'email',
									required: true,
									errorId: 'error-email',
									container: formContainer,
									context: context
								})}
								
								${FormManager.createInputField({
									type: 'tel',
									id: 'phone',
									labelKey: 'phone',
									placeholderKey: 'enterPhone',
									formField: 'phone',
									required: true,
									errorId: 'error-phone',
									container: formContainer,
									context: context
								})}
							</div>
							
							<div class="form-buttons">
								<div></div>
								<button type="button" class="btn btn-next" id="step1-next">${getText('next')}</button>
							</div>
						</div>
					`;
				}
	
				function generateStep2(formContainer, context) {
					const formData = FormManager.formData[context.language];
					const getText = (key) => context.translations[context.language][key] || key;
					return `
						<div class="step-container" id="step-2">
							<span class="step-heading" id="step2-heading">${getText('step2Title')}</span>
							
							${FormManager.createSingleSelectDropdown({
								id: 'service',
								labelKey: 'selectService',
								options: formData.services,
								errorId: 'error-service',
								formField: 'service',
								required: true,
								container: formContainer,
								context: context
							})}
							
							<div class="form-buttons">
								<button type="button" class="btn btn-prev" id="step2-prev">${getText('previous')}</button>
								<button type="button" class="btn btn-next" id="step2-next">${getText('next')}</button>
							</div>
						</div>
					`;
				}
	
				function generateStep3(formContainer, context) {
					const getText = (key) => context.translations[context.language][key] || key;
					return `
						<div class="step-container" id="step-3">
							<span class="step-heading" id="step3-heading">${getText('step3Title')}</span>
							
							${FormManager.createInputField({
								type: 'textarea',
								id: 'message',
								labelKey: 'message',
								placeholderKey: 'writeMessage',
								formField: 'message',
								required: true,
								maxLength: 1000,
								rows: 6,
								errorId: 'error-message',
								container: formContainer,
								context: context
							})}
							
							<div class="form-buttons">
								<button type="button" class="btn btn-prev" id="step3-prev">${getText('previous')}</button>
								<button type="button" class="btn btn-next" id="step3-next">${getText('next')}</button>
							</div>
						</div>
					`;
				}
	
				function generateStep4(formContainer, context) {
					const getText = (key) => context.translations[context.language][key] || key;
					return `
						<div class="step-container" id="step-4">
							<span class="step-heading" id="step4-heading">${getText('step4Title')}</span>
							
							
								<div class="summary-section">
									<div class="summary-heading">
										<span id="recap-contact-heading">${getText('step1Title')}</span>
										<button type="button" class="edit-btn" data-step="1" id="edit-contact">${getText('edit')}</button>
									</div>
									<div class="summary-row">
										<div class="summary-label" id="recap-name-label">${getText('fullName')}</div>
										<div class="summary-value" id="recap-name"></div>
									</div>
									<div class="summary-row">
										<div class="summary-label" id="recap-email-label">${getText('email')}</div>
										<div class="summary-value" id="recap-email"></div>
									</div>
									<div class="summary-row">
										<div class="summary-label" id="recap-phone-label">${getText('phone')}</div>
										<div class="summary-value" id="recap-phone"></div>
									</div>
								</div>
								
								<div class="summary-section">
									<div class="summary-heading">
										<span id="recap-service-heading">${getText('step2Title')}</span>
										<button type="button" class="edit-btn" data-step="2" id="edit-service">${getText('edit')}</button>
									</div>
									<div class="summary-row">
										<div class="summary-label" id="recap-service-label">${getText('service')}</div>
										<div class="summary-value" id="recap-service"></div>
									</div>
								</div>
								
								<div class="summary-section">
									<div class="summary-heading">
										<span id="recap-message-heading">${getText('step3Title')}</span>
										<button type="button" class="edit-btn" data-step="3" id="edit-message">${getText('edit')}</button>
									</div>
									<div class="summary-row">
										<div class="summary-label" id="recap-message-label">${getText('message')}</div>
										<div class="summary-value" id="recap-message"></div>
									</div>
								</div>
							
							
							<div class="form-buttons">
								<button type="button" class="btn btn-prev" id="step4-prev">${getText('previous')}</button>
								<button type="button" class="btn btn-submit" id="submit-button">${getText('submit')}</button>
							</div>
						</div>
					`;
				}
				
				/*************************************************************
				* VALIDATION FUNCTIONS
				*************************************************************/
				function showError(errorId, messageKey, container, context) {
					const {language, translations} = context;
					const getText = (key) => translations[language][key] || key;
					const errorElement = container.querySelector(`#${errorId}`);
					if (errorElement) {
						const errorTextElement = errorElement.querySelector('.error-text');
						if (errorTextElement) {
							errorTextElement.textContent = getText(messageKey);
						} else {
							errorElement.innerHTML = `
								<div class="error-icon">!</div>
								<span class="error-text">${getText(messageKey)}</span>
							`;
						}
						errorElement.classList.add('show');
					}
				}
		
				function hideError(errorId, container) {
					const errorElement = container.querySelector(`#${errorId}`);
					if (errorElement) {
						errorElement.classList.remove('show');
					}
				}
				
				function validateStep1(formValues, container, context) {
					let isValid = true;
					if (!formValues.firstName) {
						showError('error-firstname', 'firstNameRequired', container, context);
						isValid = false;
					}
					if (!formValues.lastName) {
						showError('error-lastname', 'lastNameRequired', container, context);
						isValid = false;
					}
					if (!formValues.email) {
						showError('error-email', 'emailRequired', container, context);
						isValid = false;
					} else if (!isValidEmail(formValues.email)) {
						showError('error-email', 'emailInvalid', container, context);
						isValid = false;
					}
					if (!formValues.phone) {
						showError('error-phone', 'phoneRequired', container, context);
						isValid = false;
					} else if (!isValidPhoneNumber(formValues.phone)) {
						showError('error-phone', 'phoneInvalid', container, context);
						isValid = false;
					}
					return isValid;
				}
		
				function validateStep2(formValues, container, context) {
					let isValid = true;
					if (!formValues.service) {
						showError('error-service', 'serviceRequired', container, context);
						isValid = false;
					}
					return isValid;
				}
		
				function validateStep3(formValues, container, context) {
					let isValid = true;
					if (!formValues.message) {
						showError('error-message', 'messageRequired', container, context);
						isValid = false;
					}
					return isValid;
				}
				
				/*************************************************************
				* FORM SUBMISSION LOGIC
				*************************************************************/
				function prepareDataForSubmission(formValues, language) {
					const processedData = JSON.parse(JSON.stringify(formValues));
					const formData = FormManager.formData[language];
					
					// Add metadata
					processedData.submissionDate = new Date().toISOString();
					processedData.formLanguage = language;
					processedData.formType = "contact_form";
					processedData.fullName = `${formValues.firstName} ${formValues.lastName}`;
					
					// Format phone
					if (processedData.phone) {
						processedData.phone = formatPhoneNumber(processedData.phone);
					}
					
					// Get service display name
					if (processedData.service) {
						const service = formData.services.find(s => s.id === processedData.service);
						if (service) {
							processedData.serviceDisplay = service.name;
						}
					}
					
					return processedData;
				}
				
				async function submitFormWithErrorHandling(data, WEBHOOK_URL, language) {
					try {
						const response = await fetch(WEBHOOK_URL, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(data),
							signal: AbortSignal.timeout(30000)
						});
						if (!response.ok) {
							throw new Error(`HTTP ${response.status}: ${response.statusText}`);
						}
						return await response.text();
					} catch (error) {
						console.error('Submission failed:', error);
						let userMessage;
						if (error.name === 'TypeError' || error.message.includes('fetch')) {
							userMessage = language === 'fr' ?
								'Erreur de connexion. Vérifiez votre connexion internet.' :
								'Connection error. Please check your internet connection.';
						} else if (error.name === 'AbortError') {
							userMessage = language === 'fr' ?
								'La demande a expiré. Veuillez réessayer.' :
								'Request timed out. Please try again.';
						} else if (error.message.includes('HTTP')) {
							userMessage = language === 'fr' ?
								'Erreur serveur. Veuillez réessayer plus tard.' :
								'Server error. Please try again later.';
						} else {
							userMessage = FormManager.translations[language]['errorSubmission'];
						}
						showUserError(userMessage, language);
						throw error;
					}
				}
		
				function showUserError(message, language) {
					const errorModal = document.createElement('div');
					errorModal.className = 'error-modal';
					errorModal.innerHTML = `
						<div class="error-content">
							<div class="error-icon">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="48px" height="48px">
									<path fill="#f44336" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
								</svg>
							</div>
							<span>${language === 'fr' ? 'Erreur' : 'Error'}</span>
							<p>${message}</p>
							<button class="btn btn-next" onclick="this.closest('.error-modal').remove()">
								${language === 'fr' ? 'Réessayer' : 'Try Again'}
							</button>
						</div>
					`;
					document.body.appendChild(errorModal);
				}
			
				// Form data store
				const formValues = {
					firstName: "",
					lastName: "",
					email: "",
					phone: "",
					service: "",
					message: "",
					formLanguage: language
				};
				
				// URL du webhook Make
				const WEBHOOK_URL = "https://hook.us2.make.com/qxn4yft7s12mwglaetwm378rggo1k3uq";
				
				// Create form data and translations references
				const translations = FormManager.translations;
		
				function getText(key) {
					return translations[language][key] || key;
				}
		
				function saveFormData() {
					try {
						localStorage.setItem('contactFormData', JSON.stringify(formValues));
						localStorage.setItem('contactFormStep', FormManager.currentStep);
					} catch (e) {
						console.error('Error saving form data:', e);
					}
				}
				
				// Debounced validation functions
				const debouncedValidation = {
					email: debounce((value) => {
						if (value && !isValidEmail(value)) {
							showError('error-email', 'emailInvalid', formContainer, context);
						} else {
							hideError('error-email', formContainer);
						}
					}, 300),
					phone: debounce((value) => {
						if (value && !isValidPhoneNumber(value)) {
							showError('error-phone', 'phoneInvalid', formContainer, context);
						} else {
							hideError('error-phone', formContainer);
						}
					}, 300)
				};
				
				// ================================
				// CREATE CONTEXT OBJECT
				// ================================
				const context = {
					language: language,
					formValues: formValues,
					translations: translations,
					saveFormData: saveFormData,
					debouncedValidation: debouncedValidation
				};
		
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
					disableAllFormElements();
					const submitButton = formContainer.querySelector("#submit-button");
					if (submitButton) {
						submitButton.disabled = true;
						submitButton.textContent = language === 'fr' ? "Temps expiré" : "Time Expired";
						submitButton.classList.add("timeout-button");
					}
					formContainer.querySelectorAll(".btn-next")
						.forEach(btn => {
							btn.disabled = true;
							btn.textContent = language === "fr" ? "Temps expiré" : "Time Expired";
							btn.classList.add("timeout-button");
						});
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
					formContainer.querySelectorAll('button, input, select, textarea, .custom-options, .select-wrapper, .dropdown-icon')
						.forEach(el => {
							el.disabled = true;
							el.style.cursor = "not-allowed";
						});
					formContainer.querySelectorAll('.custom-options.show-options')
						.forEach(opt => opt.classList.remove('show-options'));
					formContainer.querySelectorAll('.dropdown-icon.rotate')
						.forEach(icon => icon.classList.remove('rotate'));
				}
				
				// ================================
				// CREATE FORM CONTAINER WITH COMPLETE HTML
				// ================================
				const formContainer = document.createElement("form");
				formContainer.setAttribute("novalidate", "true");
				formContainer.classList.add("chatbot-form");
				// Generate complete form HTML using helper functions
				const formHTML = `
					<style>
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
	
						/* ---------- ANIMATIONS ---------- */
						@keyframes fadeIn {
							from {
								opacity: 0;
								transform: translateY(15px);
							}
							to {
								opacity: 1;
								transform: translateY(0);
							}
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
	
						@keyframes slideDown {
							from {
								opacity: 0;
								transform: translateY(-10px);
							}
							to {
								opacity: 1;
								transform: translateY(0);
							}
						}
	
						@keyframes shake {
							0%, 100% {
								transform: translateX(0);
							}
							10%, 30%, 50%, 70%, 90% {
								transform: translateX(-5px);
							}
							20%, 40%, 60%, 80% {
								transform: translateX(5px);
							}
						}
	
						@keyframes pulse {
							0% {
								transform: scale(1);
								box-shadow: 0 0 0 0 rgba(233, 93, 44, 0.4);
							}
							70% {
								transform: scale(1.05);
								box-shadow: 0 0 0 15px rgba(233, 93, 44, 0);
							}
							100% {
								transform: scale(1);
							}
						}
	
						form.chatbot-form {
							display: flex;
							flex-direction: column;
							width: 100%;
							min-width: 870px;
							margin: 0 auto;
							padding: 0;
							border-radius: 12px;
							font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
							box-shadow: 0 8px 30px rgba(233, 93, 44, 0.12);
							position: relative;
							overflow: hidden;
							animation: fadeIn 0.6s;
							transition: all 0.3s ease;
						}
	
						form.chatbot-form:hover {
							box-shadow: 0 12px 40px rgba(233, 93, 44, 0.15);
						}
	
						/* Two-column layout */
						.row, .form-row, .flex-row {
							display: flex;
							flex-wrap: wrap;
							margin: 0 -10px;
							width: calc(100% + 20px);
						}
	
						.col, .form-col, .flex-row>div {
							flex: 1 0 0;
							padding: 0 10px;
							min-width: 0;
						}
	
						
						/* ---------- STEP PROGRESS INDICATOR ---------- */
						.progress-container {
							padding: 15px 25px 0px 25px;
						}
						
						.progress-bar {
							width: 100%;
							height: 8px;
							background-color: #e0e0e0;
							border-radius: 4px;
							overflow: hidden;
							position: relative;
						}
	
						.progress-fill {
							height: 100%;
							background: linear-gradient(135deg, #e95d2c 0%, #b0cee2 100%);
							transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1);
							border-radius: 4px;
						}
	
						.step-info {
							display: flex;
							justify-content: space-between;
							margin-top: 5px;
							font-size: 16px;
							font-weight: bold;
							color: #666;
						}
	
						/* ---------- FORM STEPS & ANIMATIONS ---------- */
						.step-container {
							display: none;
							animation: fadeIn 0.6s;
						}
	
						.step-container.active {
							display: flex;
							flex-direction: column;
							gap: 10px;
							padding: 5px 30px 10px;
						}
	
						.step-container:not(.active) {
							pointer-events: none;
						}
	
						/* ---------- FORM ELEMENTS ---------- */
						.form-label, .question-label, .bold-label {
							font-weight: 600;
							color: #1a2730;
							font-size: 15px;
						}
	
						.question-label {
							font-size: 16px;
						}
	
						.form-label.required::after, .question-label.required::after {
							content: " *";
							
							font-weight: bold;
						}
	
						.step-heading {
							font-size: 26px;
							color: #1a2730;
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
							background: linear-gradient(90deg, #e95d2c, #b0cee2);
							border-radius: 4px;
						}
	
						/* ========== Input Fields ========== */
						input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"],
						#details, #description, #services, #form-purpose, #message, select {
							width: 100%;
							border: 2px solid #e0e0e0;
							border-radius: 8px;
							padding: 12px 16px;
							font-size: 14px;
							font-weight: 500;
							transition: all 0.3s ease;
							background-color: #fafafa;
							color: #444;
							position: relative;
							overflow: hidden;
							margin: 0px;
							height: 54px;
						}
	
						input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus,
						input[type="url"]:focus,
						input[type="number"]:focus, #details:focus, #description:focus, #services:focus,
						#form-purpose:focus, #message:focus, select:focus {
							border-color: #e95d2c;
							box-shadow: 0 0 0 3px rgba(233, 93, 44, 0.1);
							outline: none;
							background-color: #fff;
							transform: translateY(-2px);
						}
	
						input[type="text"]:hover:not(:focus),input[type="url"]:hover:not(:focus), input[type="email"]:hover:not(:focus),
						input[type="tel"]:hover:not(:focus), input[type="number"]:hover:not(:focus),
						#details:hover:not(:focus), #description:hover:not(:focus), #services:hover:not(:focus),
						#form-purpose:hover:not(:focus), #message:hover:not(:focus) {
							border-color: #e95d2c;
							background-color: rgba(247, 184, 153, 0.1);
						}
	
						#details, #description, #services, #form-purpose, #message {
							min-height: 120px;
							resize: vertical;
							font-family: inherit;
						}
	
						/* ---------- DROPDOWN COMPONENTS ---------- */
						.select-container select {
							display: none !important;
						}
	
						.main-container {
							display: block;
							transition: height 0.3s ease;
							border-radius: 8px;
							width: 100%;
							margin-bottom: 15px;
						}
	
						.select-wrapper {
							border: 2px solid #e0e0e0;
							border-radius: 8px;
							background-color: #fafafa;
							position: relative;
							width: 100%;
							box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
							transition: all 0.3s ease;
						}
	
						.select-wrapper:hover {
							border-color: #e95d2c;
							background-color: rgba(247, 184, 153, 0.1);
							transform: translateY(-2px);
							box-shadow: 0 4px 12px rgba(233, 93, 44, 0.2);
						}
	
						.select-display {
							padding: 12px 18px;
							font-size: 15px;
							cursor: pointer;
							display: flex;
							justify-content: space-between;
							align-items: center;
							height: 52px;
							color: #444;
							font-weight: 500;
						}
	
						.dropdown-icon {
							width: 30px;
							height: 30px;
							transition: transform 0.3s ease;
							display: flex;
							align-items: center;
							justify-content: center;
							background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
							border-radius: 50%;
							box-shadow: 0 2px 8px rgba(233, 93, 44, 0.3);
						}
	
						.dropdown-icon svg path {
							fill: white !important;
						}
	
						.dropdown-icon.rotate {
							transform: rotate(180deg);
							box-shadow: 0 4px 12px rgba(233, 93, 44, 0.4);
						}
	
						.custom-options {
							display: none;
							font-size: 15px;
							border-top: 1px solid #e0e0e0;
							max-height: 250px;
							overflow-y: auto;
							background-color: #fff;
							box-shadow: 0 8px 25px rgba(233, 93, 44, 0.15);
							z-index: 100;
							border-radius: 0 0 8px 8px;
							-ms-overflow-style: none;
							scrollbar-width: none;
							width: 100%;
						}
	
						.show-options {
							display: block;
							animation: slideDown 0.3s ease-out;
						}
	
						.custom-option {
							padding: 14px 18px;
							display: flex;
							align-items: center;
							cursor: pointer;
							transition: all 0.3s ease;
							position: relative;
							border-left: 4px solid transparent;
						}
	
						.custom-option:hover {
							background-color: rgba(233, 93, 44, 0.08);
							color: #1a2730;
							border-left-color: #e95d2c;
							transform: translateX(5px);
						}
	
						.custom-option.selected {
							background: linear-gradient(135deg, rgba(233, 93, 44, 0.12) 0%, rgba(247, 184, 153, 0.8) 100%);
							color: #1a2730;
							font-weight: bold;
							border-left-color: #e95d2c;
							box-shadow: inset 0 1px 3px rgba(233, 93, 44, 0.1);
						}
	
						.custom-option.selected .option-checkbox svg path {
							fill: #fff !important;
						}
	
						.custom-option:not(.selected):hover .option-checkbox svg path {
							fill: #e95d2c;
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
							transition: all 0.3s ease;
							position: relative;
						}
	
						.option-checkbox svg {
							width: 12px;
							height: 12px;
							display: none;
						}
	
						.custom-option:not(.selected):hover .option-checkbox {
							border-color: #e95d2c;
							transform: scale(1.05);
							box-shadow: 0 2px 8px rgba(233, 93, 44, 0.2);
						}
	
						.custom-option:not(.selected):hover .option-checkbox svg {
							display: block;
						}
	
						.custom-option.selected .option-checkbox svg {
							display: block;
						}
	
						.custom-option.selected .option-checkbox {
							border-color: #e95d2c;
							background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
							transform: scale(1.1);
							box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
						}
	
						.custom-option:not(.selected):hover .option-checkbox svg path {
							fill: #e95d2c !important;
						}
	
						/* ---------- ERROR MESSAGES ---------- */
						.error-container {
							width: 100%;
							margin: 2px 0;
							box-sizing: border-box;
						}
	
						.error-message {
							color: white;
							font-size: 13px;
							margin-top: 8px;
							display: none;
							background: linear-gradient(135deg, #e52059 0%, #d32f2f 100%);
							border-radius: 8px;
							border: none;
							padding: 12px 16px;
							animation: shake 0.5s;
							box-shadow: 0 4px 15px rgba(229, 32, 89, 0.3);
						}
	
						.error-message.show {
							display: flex;
							animation: slideIn 0.3s ease-out;
						}
	
						.error-icon {
							width: 22px;
							height: 22px;
							min-width: 22px;
							border-radius: 50%;
							background-color: white;
							
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
						.form-buttons {
							display: flex;
							justify-content: space-between;
							gap: 15px;
						}
	
						.btn {
							padding: 14px 28px;
							border: none;
							border-radius: 8px;
							font-size: 16px;
							font-weight: 600;
							cursor: pointer;
							transition: all 0.3s ease;
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
									rgba(255, 255, 255, 0) 0%,
									rgba(255, 255, 255, 0.2) 50%,
									rgba(255, 255, 255, 0) 100%);
							transition: all 0.6s;
						}
	
						.btn:hover:not(:disabled)::after {
							left: 100%;
						}
	
						.btn-prev {
							background-color: #f0f0f0;
							color: #1a2730;
							border: 2px solid #e0e0e0;
						}
	
						.btn-prev:hover {
							background-color: rgba(247, 184, 153, 0.1);
							border-color: #e95d2c;
							transform: translateY(-2px);
							box-shadow: 0 4px 12px rgba(233, 93, 44, 0.2);
						}
	
						.btn-next, .btn-submit {
							background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
							color: white;
							box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
						}
	
						.btn-next:hover, .btn-submit:hover {
							transform: translateY(-3px);
							box-shadow: 0 6px 20px rgba(233, 93, 44, 0.4);
						}
	
						.btn-submit {
							background: linear-gradient(135deg, #e95d2c 0%, #ef8d6b 100%);
							box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
						}
	
						.btn-submit:hover {
							box-shadow: 0 6px 20px rgba(233, 93, 44, 0.4);
						}
	
						.btn:disabled {
							cursor: not-allowed;
							transform: none;
							box-shadow: none; 
							background: #45586c !important;
						}
	
						.btn:disabled::after {
							display: none;
						}
	
						.form-buttons .btn:active {
							transform: translateY(1px);
							box-shadow: 0 2px 8px rgba(233, 93, 44, 0.2);
						}
	
						/* ---------- ENHANCED SUMMARY STYLES ---------- */
						.summary-container {
							background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
							border: 1px solid rgba(233, 93, 44, 0.1);
							border-radius: 16px;
							padding: 0;
							box-shadow: 0 8px 32px rgba(233, 93, 44, 0.1);
							overflow: hidden;
						}
						
						.summary-section {
							margin-bottom: 0;
							background: #ffffff;
							border-radius: 12px;
							margin: 0 0 10px 0;
							padding: 10px;
							box-shadow: 0 4px 20px rgba(233, 93, 44, 0.08);
							border-left: 4px solid #e95d2c;
							position: relative;
							transition: all 0.3s ease;
						}
						
						.summary-section:hover {
							transform: translateY(-2px);
							box-shadow: 0 8px 30px rgba(233, 93, 44, 0.15);
						}
						
						.summary-section:last-child {
							margin-bottom: 16px;
						}
						
						.summary-heading {
							font-size: 18px;
							font-weight: 700;
							color: #e95d2c;
							margin-bottom: 8px;
							display: flex;
							justify-content: space-between;
							align-items: center;
							position: relative;
						}
						
						.summary-heading::before {
							content: '';
							position: absolute;
							bottom: 2px;
							left: 0;
							width: 60px;
							height: 2px;
							background: linear-gradient(90deg, #e95d2c, #b0cee2);
							border-radius: 2px;
						}
						
						.edit-btn {
							background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
							border: 2px solid #e95d2c;
							color: #e95d2c;
							cursor: pointer;
							padding: 8px 16px;
							font-size: 13px;
							font-weight: 600;
							border-radius: 8px;
							transition: all 0.3s ease;
							text-transform: uppercase;
							letter-spacing: 0.5px;
							box-shadow: 0 2px 8px rgba(233, 93, 44, 0.1);
						}
						
						.edit-btn:hover {
							background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
							color: white;
							transform: translateY(-2px);
							box-shadow: 0 6px 20px rgba(233, 93, 44, 0.3);
						}
						
						.summary-row {
							display: flex;
							align-items: flex-start;
							transition: all 0.3s ease;
							border-radius: 8px;
						}
						
						.summary-row:last-child {
							border-bottom: none;
							padding-bottom: 0;
						}
						
						.summary-row:hover {
							background: linear-gradient(135deg, rgba(233, 93, 44, 0.03) 0%, rgba(247, 184, 153, 0.1) 100%);
							padding-left: 16px;
							padding-right: 16px;
							transform: translateX(4px);
						}
						
						.summary-label {
							font-weight: 600;
							width: 20%;
							color: #1a2730;
							font-size: 14px;
							line-height: 1.4;
							padding-right: 16px;
							position: relative;
						}
						
						.summary-label::after {
							content: ':';
							font-weight: bold;
						}
						
						.summary-value {
							flex: 1;
							font-size: 14px;
							font-weight: 500;
							line-height: 1.5;
							word-wrap: break-word;
							border-radius: 6px;
							border-left: 3px solid transparent;
							transition: all 0.3s ease;
							padding-left: 10px;
						}
						
						.summary-row:hover .summary-value {

							border-left-color: #e95d2c;
						}
	
						/* ---------- RESPONSIVE DESIGN ---------- */
						@media (max-width: 767px) {
							.row, .form-row, .flex-row {
								display: flex;
								margin: 0;
								width: 100%;
								gap: 10px;
								flex-direction: column;
							}
	
							.step-container.active {
								padding: 5px 15px 10px;
							}
	
							.col, .form-col, .flex-row>div {
								width: 100%;
								padding: 0;
								margin-bottom: 0px;
							}
	
							.form-group {
								margin-bottom: 10px;
							}
						}
	
						@media (max-width: 768px) {

	
							.step-heading {
								font-size: 22px;
							}
	
							.btn {
								padding: 12px 18px;
								font-size: 15px;
							}
	
							.container, form.chatbot-form {
								width: auto;
								border-radius: 8px;
							}
	
							.progress-container {
								padding: 10px 10px 10px;
							}
	
							.form-buttons {
								flex-direction: row;
								gap: 10px;
							}
						}
	
						@media (max-width: 480px) {
							form.chatbot-form {
								min-width: 200px;
							}
	

	
							.step-heading {
								font-size: 18px;
							}
	
	
							.summary-container {
								padding: 15px;
							}
						}
	
						/* ---------- FOCUS STYLES FOR ACCESSIBILITY ---------- */
						input:focus-visible, #details:focus-visible, #description:focus-visible,
						#services:focus-visible, #form-purpose:focus-visible, select:focus-visible,
						button:focus-visible {
							outline: 2px solid #e95d2c;
							outline-offset: 2px;
						}
	
						.textarea-wrapper {
							position: relative;
							width: 100%;
							margin-bottom: 0;
						}
	
						.textarea-wrapper textarea {
							margin-bottom: 0;
							display: block;
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
	
						.select-display.placeholder span {
							color: #808080;
						}
	
						.select-display:not(.placeholder) span {
							color: #000;
						}

						/* ===== STATS/NUMÉROS ===== */
						.stats7_number {
							background: linear-gradient(45deg, #e95d2c, #45586c) !important;
							-webkit-background-clip: text !important;
							-webkit-text-fill-color: transparent !important;
							background-clip: text !important;
						}

						/* ===== BOUTONS TIMEOUT ===== */
						.timeout-button {
							background: #45586c !important;
						}
					</style>
					
					<!-- Progress Bar -->
					<div class="progress-container">
						<div class="progress-bar">
							<div class="progress-fill" id="progress-fill"></div>
						</div>
						<div class="step-info">
							<span>Étape <span class="current-step" id="current-step">1</span> sur ${totalSteps}</span>
							<span id="step-title">${getText('step1Title')}</span>
						</div>
					</div>
	
					<!-- Dynamic Steps Generation -->
					${generateStep1(formContainer, context)}
					${generateStep2(formContainer, context)}
					${generateStep3(formContainer, context)}
					${generateStep4(formContainer, context)}
				`;
				// Set the generated HTML
				formContainer.innerHTML = formHTML;
				// Add to page
				element.appendChild(formContainer);
				// Add header

				

				// ================================
				// NAVIGATION & FORM LOGIC
				// ================================
				function showStep(stepNumber) {
					formContainer.querySelectorAll('.step-container')
						.forEach(step => {
							step.classList.remove('active');
						});
					formContainer.querySelector(`#step-${stepNumber}`)
						.classList.add('active');
					FormManager.currentStep = stepNumber;
					updateProgressBar();
					// Populate summary when reaching step 4
					if (stepNumber === 4) {
						populateSummary();
					}
					// Scroll to top of form
					formContainer.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
		
				function populateSummary() {
					const formData = FormManager.formData[language];
					const notSpecified = language === 'fr' ? 'Non renseigné' : 'Not specified';
					
					// Contact Information
					const nameEl = formContainer.querySelector('#recap-name');
					if (nameEl) {
						nameEl.textContent = `${formValues.firstName || ''} ${formValues.lastName || ''}`.trim() || notSpecified;
					}
					const emailEl = formContainer.querySelector('#recap-email');
					if (emailEl) {
						emailEl.textContent = formValues.email || notSpecified;
					}
					const phoneEl = formContainer.querySelector('#recap-phone');
					if (phoneEl) {
						phoneEl.textContent = formValues.phone || notSpecified;
					}
					
					// Service
					const serviceEl = formContainer.querySelector('#recap-service');
					if (serviceEl) {
						let serviceText = notSpecified;
						if (formValues.service) {
							const service = formData.services.find(s => s.id === formValues.service);
							serviceText = service ? service.name : formValues.service;
						}
						serviceEl.textContent = serviceText;
					}
					
					// Message
					const messageEl = formContainer.querySelector('#recap-message');
					if (messageEl) {
						const message = formValues.message || notSpecified;
						messageEl.textContent = message.length > 100 ? message.substring(0, 100) + '...' : message;
					}
				}
		
				function updateProgressBar() {
					const progressFill = formContainer.querySelector('#progress-fill');
					const currentStepElement = formContainer.querySelector('#current-step');
					const stepTitleElement = formContainer.querySelector('#step-title');
					if (progressFill) {
						const progress = ((FormManager.currentStep - 1) / (totalSteps - 1)) * 100;
						progressFill.style.width = `${progress}%`;
					}
					if (currentStepElement) {
						currentStepElement.textContent = FormManager.currentStep;
					}
					if (stepTitleElement) {
						const stepTitles = [
									getText('step1Title'), getText('step2Title'), getText('step3Title'),
									getText('step4Title')
								];
						const newTitle = stepTitles[FormManager.currentStep - 1] || '';
						stepTitleElement.textContent = newTitle;
					}
				}
			
				// ================================
				// NAVIGATION EVENT LISTENERS
				// ================================
				// Step 1 navigation
				formContainer.querySelector('#step1-next').addEventListener('click', function () {
					if (validateStep1(formValues, formContainer, context)) {
						showStep(2);
					}
				});
				// Step 2 navigation
				formContainer.querySelector('#step2-prev').addEventListener('click', () => showStep(1));
				formContainer.querySelector('#step2-next').addEventListener('click', function () {
					if (validateStep2(formValues, formContainer, context)) {
						showStep(3);
					}
				});
				// Step 3 navigation
				formContainer.querySelector('#step3-prev').addEventListener('click', () => showStep(2));
				formContainer.querySelector('#step3-next').addEventListener('click', function () {
					if (validateStep3(formValues, formContainer, context)) {
						showStep(4);
					}
				});
				// Step 4 navigation
				formContainer.querySelector('#step4-prev').addEventListener('click', () => showStep(3));
				// Edit buttons in summary
				formContainer.querySelector('#edit-contact').addEventListener('click', () => showStep(1));
				formContainer.querySelector('#edit-service').addEventListener('click', () => showStep(2));
				formContainer.querySelector('#edit-message').addEventListener('click', () => showStep(3));
				
				// Form submission
				formContainer.querySelector('#submit-button').addEventListener('click', function () {
					const submitButton = this;
					submitButton.disabled = true;
					submitButton.textContent = getText('processing');
					isFormSubmitted = true;
					if (formTimeoutId) {
						clearInterval(formTimeoutId);
					}
					const submissionData = prepareDataForSubmission(formValues, language);
					submitFormWithErrorHandling(submissionData, WEBHOOK_URL, language)
						.then(data => {
							if (vf) {
								window.voiceflow.chat.interact({
									type: "success",
									payload: submissionData
								});
							}
							// Success actions
							disableAllFormElements();
							submitButton.textContent = getText('submitted');
							submitButton.style.backgroundColor = "#4CAF50";
						})
						.catch((error) => {
							console.error('Error:', error);
							submitButton.disabled = false;
							submitButton.textContent = getText('errorSubmission');
						});
				});
				// Global click handler to close dropdowns
				document.addEventListener('click', (e) => {
					if (!e.target.closest('.select-wrapper')) {
						formContainer.querySelectorAll('.custom-options')
							.forEach(opt => {
								opt.classList.remove('show-options');
							});
						formContainer.querySelectorAll('.dropdown-icon')
							.forEach(icon => {
								icon.classList.remove('rotate');
							});
					}
				});
				// Initialize progress bar
				updateProgressBar();
				startFormTimer();
			}
		};
		
		
		const BookingDirectExtension = {
            name: "BookingDirect",
            type: "response",
            match: ({trace}) => trace.type === "ext_booking_direct" || trace.payload?.name === "ext_booking_direct",
            render: ({trace, element}) => {
                
                // Get payload data
                const {
                    apiKey = "cal_live_3e7d9e0eb2df1b25ba452160f8668502",
                    language = "en", 
                    timezone = "America/Toronto",
                    vf
                } = trace.payload || {};

                // Initialize variables
                const totalSteps = 3;
                let isFormSubmitted = false;
                const TIMEOUT_DURATION = 300000; // 5 minutes
                let formTimeoutId = null;

                function debounce(func, wait) {
                    let timeout;
                    return function executedFunction(...args) {
                        const later = () => {
                            clearTimeout(timeout);
                            func(...args);
                        };
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                    };
                }

                function isValidEmail(email) {
                    return FormManager.validation.email(email);
                }

                // Conditional section helpers
                function showConditionalSection(sectionId, container) {
                    const element = container.querySelector(sectionId);
                    if (element) {
                        element.style.removeProperty('display');
                        element.style.setProperty('display', 'flex', 'important');
                        element.setAttribute('aria-hidden', 'false');
                        element.classList.add('visible');
                    }
                }

                function hideConditionalSection(sectionId, container) {
                    const element = container.querySelector(sectionId);
                    if (element) {
                        element.style.setProperty('display', 'none', 'important');
                        element.setAttribute('aria-hidden', 'true');
                        element.classList.remove('visible');
                    }
                }
                
                const FormManager = {
                    currentStep: 1,
                    // ================================
                    // CONSTANTES SVG
                    // ================================
                    constants: {
                        SVG: {
                            CHECK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12px" height="12px">
                                        <path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                    </svg>`,
                            CHEVRON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
                                        <g transform="translate(75, 75)">
                                            <path fill="#1a2730" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                                        </g>
                                    </svg>`,
                            CLOSE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="8px" height="8px">
                                        <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                    </svg>`,
                            CALENDAR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
                                        <path fill="#ffffff" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48H0l0-48c0-26.5 21.5-48 48-48l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
                                    </svg>`,
							SUCCESS:`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
										<polyline points="22 4 12 14.01 9 11.01"></polyline>
									</svg>`
                        }
                    },

                    // ================================
                    // HELPER FUNCTIONS
                    // ================================
                    
                    // Function to create input fields
                    createInputField(config) {
                        const {type = 'text', id, labelKey, placeholderKey, formField, required = false, errorId, validator, container, context} = config;
                        const {language, formValues, translations} = context;
                        const getText = (key) => translations[language][key] || key;
                        const inputType = ['email', 'tel', 'text'].includes(type) ? type : 'text';
                        const requiredClass = required ? 'required' : '';
                        
                        const html = `
                            <div class="form-group">
                                <label class="form-label ${requiredClass}" for="${id}" id="${id}-label">
                                    ${getText(labelKey)}
                                </label>
                                <input type="${inputType}" id="${id}" name="${formField}" 
                                    placeholder="${getText(placeholderKey)}" />
                                ${required && errorId ? `<div class="error-message" id="${errorId}">
                                    <div class="error-icon">!</div>
                                    <span class="error-text">${getText('fieldRequired')}</span>
                                </div>` : ''}
                            </div>
                        `;
                        
                        // Add event listeners after DOM insertion
                        setTimeout(() => {
                            if (container) {
                                const inputEl = container.querySelector(`#${id}`);
                                if (inputEl) {
                                    inputEl.addEventListener('input', function () {
                                        formValues[formField] = this.value.trim();
                                        if (this.value.trim() && errorId) {
                                            const errorEl = container.querySelector(`#${errorId}`);
                                            if (errorEl) errorEl.classList.remove('show');
                                        }
                                        if (validator && this.value.trim()) {
                                            const isValid = validator(this.value.trim());
                                            if (!isValid && errorId) {
                                                const errorEl = container.querySelector(`#${errorId}`);
                                                if (errorEl) errorEl.classList.add('show');
                                            }
                                        }
                                        if (type === 'email' && this.value.trim() && context.debouncedValidation) {
                                            context.debouncedValidation.email(this.value.trim());
                                        }
                                        if (context.saveFormData) context.saveFormData();
                                    });
                                }
                            }
                        }, 0);
                        return html;
                    },

                    // Validation helper
                    validation: {
                        email(email) {
                            const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
                            return emailPattern.test(email);
                        }
                    },

                    // ================================
                    // TRANSLATIONS  
                    // ================================
                    translations: {
                        "fr": {
                            // Steps
                            step1Title: "Sélection du Service",
                            step2Title: "Informations de Contact", 
                            step3Title: "Date et Heure",
                            // Navigation
                            next: "Suivant",
                            previous: "Précédent",
                            submit: "Confirmer",
                            processing: "Traitement en cours...",
                            submitted: "Réservé avec succès !",
                            // Contact
                            firstName: "Prénom",
                            lastName: "Nom de famille",
                            email: "Adresse électronique",
                            firstNamePlaceholder: "Entrez votre prénom",
                            lastNamePlaceholder: "Entrez votre nom de famille", 
                            emailPlaceholder: "Entrez votre adresse électronique",
                            // Validation messages - PERSONNALISÉS
                            fieldRequired: "Ce champ est requis",
                            firstNameRequired: "Veuillez saisir votre prénom",
                            lastNameRequired: "Veuillez saisir votre nom de famille",
                            emailRequired: "Veuillez saisir votre adresse électronique",
                            emailInvalid: "Format d'adresse électronique invalide",
                            serviceRequired: "Veuillez sélectionner un service",
                            dateTimeRequired: "Veuillez sélectionner une date et une heure",
                            // Calendar
                            selectDateAndTime: "Sélectionner Date et Heure",
                            selectDate: "Sélectionnez une date pour voir les horaires disponibles",
                            pleaseSelectDate: "Veuillez d'abord sélectionner une date",
                            availableTimesFor: "Disponibilités pour",
                            noAvailableSlots: "Aucun horaire disponible pour cette date",
                            confirmBooking: "Confirmer la Réservation",
                            bookingConfirmed: "Réservation Confirmée !",
                            bookingComplete: "Votre rendez-vous a été programmé avec succès",
                            timeExpired: "Temps expiré",
                            errorOccurred: "Une erreur s'est produite",
                            tryAgain: "Veuillez réessayer",
                            confirming: "Confirmation en cours...",
                            weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                            // Confirmation
                            confirmationTitle: "Rendez-vous Confirmé!",
                            confirmationMessage: "Votre rendez-vous a été programmé avec succès. Vous recevrez sous peu un email de confirmation.",
                            backToForm: "Retour au formulaire",
                            // Services
                            meetingOptions: [
                                {
                                    id: 1,
                                    eventName: "Entretien Exploratoire",
                                    title: "Entretien exploratoire",
                                    description: "Entretien de 15 minutes visant à analyser vos besoins, définir vos objectifs et déterminer comment nos services peuvent y répondre efficacement.",
                                    duration: "15 minutes",
                                    eventTypeId: 2355643,
                                    eventTypeSlug: "discovery-call-15-minutes",
                                    scheduleId: 628047
                                },
                                {
                                    id: 2,
                                    eventName: "Démonstration de l'Agent IA",
                                    title: "Démonstration de l'Agent IA",
                                    description: "Démonstration détaillée illustrant les capacités et les applications pratiques de notre technologie d'Agent IA en 15 minutes.",
                                    duration: "15 minutes",
                                    eventTypeId: 2355602,
                                    eventTypeSlug: "demonstration-chatbot-15min",
                                    scheduleId: 628047
                                },
                                {
                                    id: 3,
                                    eventName: "Présentation Détaillée",
                                    title: "Présentation",
                                    description: "Session de 45 minutes réservée aux clients ayant déjà effectué un entretien exploratoire ou rencontré notre équipe en personne, destinée à présenter des solutions personnalisées et des recommandations stratégiques.",
                                    duration: "45 minutes",
                                    eventTypeId: 2355601,
                                    eventTypeSlug: "reunion-45min",
                                    scheduleId: 631172
                                },
                                {
                                    id: 4,
                                    eventName: "Session de Travail",
                                    title: "Session de travail",
                                    description: "Session collaborative de 60 minutes dédiée aux projets en cours, aux suivis approfondis et aux séances de réflexion stratégique.",
                                    duration: "60 minutes",
                                    eventTypeId: 2355663,
                                    eventTypeSlug: "reunion-projet",
                                    scheduleId: 628644
                                }
                            ]
                        },
                        "en": {
                            // Steps
                            step1Title: "Service Selection",
                            step2Title: "Contact Information",
                            step3Title: "Date & Time",
                            // Navigation
                            next: "Next",
                            previous: "Previous", 
                            submit: "Confirm",
                            processing: "Processing...",
                            submitted: "Successfully Booked!",
                            // Contact
                            firstName: "First Name",
                            lastName: "Last Name",
                            email: "Email Address",
                            firstNamePlaceholder: "Enter your first name",
                            lastNamePlaceholder: "Enter your last name",
                            emailPlaceholder: "Enter your email address",
                            // Validation messages - PERSONNALISÉS
                            fieldRequired: "This field is required",
                            firstNameRequired: "Please enter your first name",
                            lastNameRequired: "Please enter your last name",
                            emailRequired: "Please enter your email address",
                            emailInvalid: "Invalid email address format",
                            serviceRequired: "Please select a service",
                            dateTimeRequired: "Please select a date and time",
                            // Calendar
                            selectDateAndTime: "Select Date & Time",
                            selectDate: "Select a date to view available times",
                            pleaseSelectDate: "Please select a date first",
                            availableTimesFor: "availability for",
                            noAvailableSlots: "No available time slots for this date",
                            confirmBooking: "Confirm Booking",
                            bookingConfirmed: "Booking Confirmed!",
                            bookingComplete: "Your appointment has been successfully scheduled",
                            timeExpired: "Time Expired",
                            errorOccurred: "An error occurred",
                            tryAgain: "Please try again",
                            confirming: "Confirming...",
                            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                            // Confirmation
                            confirmationTitle: "Appointment Confirmed!",
                            confirmationMessage: "Your appointment has been successfully scheduled. You will receive a confirmation email shortly.",
                            backToForm: "Return to Form",
                            // Services
                            meetingOptions: [
                                {
                                    id: 1,
                                    eventName: "Discovery Call",
                                    title: "Discovery Call",
                                    description: "A concise introductory consultation during which we will explore your requirements, assess your objectives, and identify how our services can best address your needs.",
                                    duration: "15 minutes",
                                    eventTypeId: 2355643,
                                    eventTypeSlug: "discovery-call-15-minutes",
                                    scheduleId: 628047
                                },
                                {
                                    id: 2,
                                    eventName: "AI Agent Demo", 
                                    title: "AI Agent Demonstration",
                                    description: "An in-depth demonstration showcasing the capabilities and practical applications of our AI Agent technology within a 15-minute timeframe.",
                                    duration: "15 minutes",
                                    eventTypeId: 2355602,
                                    eventTypeSlug: "demonstration-chatbot-15min",
                                    scheduleId: 628047
                                },
                                {
                                    id: 3,
                                    eventName: "Detailed Presentation",
                                    title: "Presentation",
                                    description: "A comprehensive 45-minute session reserved for clients who have completed an initial discovery call or met with our team in person, designed to present tailored solutions and strategic recommendations.",
                                    duration: "45 minutes",
                                    eventTypeId: 2355601,
                                    eventTypeSlug: "reunion-45min",
                                    scheduleId: 631172
                                },
                                {
                                    id: 4,
                                    eventName: "Work Session",
                                    title: "Work Session",
                                    description: "A dedicated 60-minute collaborative session for ongoing projects, detailed follow-ups, and strategic brainstorming to advance your initiatives.",
                                    duration: "60 minutes",
                                    eventTypeId: 2355663,
                                    eventTypeSlug: "reunion-projet",
                                    scheduleId: 628644
                                }
                            ]
                        }
                    }
                };

                /*************************************************************
                * STEP GENERATION FUNCTIONS
                *************************************************************/
                function generateStep1(formContainer, context) {
                    const {language, translations} = context;
                    const getText = (key) => translations[language][key] || key;
                    const meetingOptions = translations[language].meetingOptions;
                    
                    return `
                        <div class="step-container active" id="step-1">
                            <span class="step-heading">${getText('step1Title')}</span>
                            
                            <div class="service-options">
                                ${meetingOptions.map((option, index) => `
                                    <div class="service-option" data-id="${option.id}">
                                        <div class="checkmark-icon">${FormManager.constants.SVG.CHECK}</div>
                                        <div class="service-content">
                                            <div class="service-title">${option.title}</div>
                                            <p class="service-description">${option.description}</p>
                                            <span class="service-duration">${option.duration}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <div class="error-message" id="error-service">
                                <div class="error-icon">!</div>
                                <span class="error-text">${getText('serviceRequired')}</span>
                            </div>
                            
                            <div class="form-buttons">
                                <div></div>
                                <button type="button" class="btn btn-next" id="step1-next">${getText('next')}</button>
                            </div>
                        </div>
                    `;
                }

                function generateStep2(formContainer, context) {
                    const {language, translations} = context;
                    const getText = (key) => translations[language][key] || key;
                    
                    return `
                        <div class="step-container" id="step-2">
                            <span class="step-heading">${getText('step2Title')}</span>
                            
                            <div class="flex-row">
                                ${FormManager.createInputField({
                                    type: 'text',
                                    id: 'first-name',
                                    labelKey: 'firstName',
                                    placeholderKey: 'firstNamePlaceholder',
                                    formField: 'firstName',
                                    required: true,
                                    errorId: 'error-firstname',
                                    container: formContainer,
                                    context: context
                                })}
                                
                                ${FormManager.createInputField({
                                    type: 'text',
                                    id: 'last-name',
                                    labelKey: 'lastName',
                                    placeholderKey: 'lastNamePlaceholder',
                                    formField: 'lastName',
                                    required: true,
                                    errorId: 'error-lastname',
                                    container: formContainer,
                                    context: context
                                })}
                            </div>
                            
                            ${FormManager.createInputField({
                                type: 'email',
                                id: 'email',
                                labelKey: 'email',
                                placeholderKey: 'emailPlaceholder',
                                formField: 'email',
                                required: true,
                                errorId: 'error-email',
                                container: formContainer,
                                context: context
                            })}
                            
                            <div class="form-buttons">
                                <button type="button" class="btn btn-prev" id="step2-prev">${getText('previous')}</button>
                                <button type="button" class="btn btn-next" id="step2-next">${getText('next')}</button>
                            </div>
                        </div>
                    `;
                }

                function generateStep3(formContainer, context) {
                    const {language, translations} = context;
                    const getText = (key) => translations[language][key] || key;
                    
                    return `
                        <div class="step-container" id="step-3">
                            <span class="step-heading">${getText('step3Title')}</span>
                            
                            <div id="calendar-component"></div>
                            
                            <div class="error-message" id="error-datetime">
                                <div class="error-icon">!</div>
                                <span class="error-text">${getText('dateTimeRequired')}</span>
                            </div>
                            
                            <div class="form-buttons">
                                <button type="button" class="btn btn-prev" id="step3-prev">${getText('previous')}</button>
                                <button type="button" class="btn btn-next" id="step3-next" disabled>${getText('submit')}</button>
                            </div>
                        </div>
                    `;
                }

                function generateStep4(formContainer, context) {
                    const {language, translations} = context;
                    const getText = (key) => translations[language][key] || key;
                    
                    return `
                        <div class="step-container" id="step-4">
                            <div class="success-section active">
                                <div class="success-icon">
                                    ${FormManager.constants.SVG.SUCCESS}
                                </div>
                                <span class="success-title">${getText('confirmationTitle')}</span>
                                <p class="success-message">${getText('confirmationMessage')}</p>
                            </div>
                        </div>
                    `;
                }

                /*************************************************************
                * SIMPLIFIED VALIDATION FUNCTIONS  
                *************************************************************/
                function showError(errorId, messageKey, container, context) {
                    const {language, translations} = context;
                    const getText = (key) => translations[language][key] || key;
                    const errorElement = container.querySelector(`#${errorId}`);
                    if (errorElement) {
                        const errorTextElement = errorElement.querySelector('.error-text');
                        if (errorTextElement) {
                            errorTextElement.textContent = getText(messageKey);
                        } else {
                            // Reconstruct entire error message if needed
                            errorElement.innerHTML = `
                                <div class="error-icon">!</div>
                                <span class="error-text">${getText(messageKey)}</span>
                            `;
                        }
                        errorElement.classList.add('show');
                    }
                }

                function hideError(errorId, container) {
                    const errorElement = container.querySelector(`#${errorId}`);
                    if (errorElement) {
                        errorElement.classList.remove('show');
                    }
                }

                function validateStep1(formValues, container, context) {
                    if (!formValues.selectedService) {
                        showError('error-service', 'serviceRequired', container, context);
                        return false;
                    }
                    return true;
                }

                function validateStep2(formValues, container, context) {
                    let isValid = true;
                    if (!formValues.firstName) {
                        showError('error-firstname', 'firstNameRequired', container, context);
                        isValid = false;
                    }
                    if (!formValues.lastName) {
                        showError('error-lastname', 'lastNameRequired', container, context);
                        isValid = false;
                    }
                    if (!formValues.email) {
                        showError('error-email', 'emailRequired', container, context);
                        isValid = false;
                    } else if (!isValidEmail(formValues.email)) {
                        showError('error-email', 'emailInvalid', container, context);
                        isValid = false;
                    }
                    return isValid;
                }

                function validateStep3(formValues, container, context) {
                    if (!CalendarBooking.state.selectedDate || !CalendarBooking.state.selectedTime) {
                        showError('error-datetime', 'dateTimeRequired', container, context);
                        return false;
                    }
                    return true;
                }

                /*************************************************************
                * CALENDAR COMPONENT IMPLEMENTATION
                *************************************************************/
                const CalendarBooking = {
                    state: {
                        currentDate: new Date(),
                        selectedDate: null,
                        selectedTime: null,
                        availableSlots: {},
                        workingDays: [1, 2, 3, 4, 5],
                        isConfirmed: false
                    },
                    
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
                    
                    getDefaultActiveDay() {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        if (this.state.workingDays.includes(today.getDay())) return today;
                        
                        const next = new Date(today);
                        let daysChecked = 0;
                        while (!this.state.workingDays.includes(next.getDay()) && daysChecked < 14) {
                            next.setDate(next.getDate() + 1);
                            daysChecked++;
                        }
                        return next;
                    },
                    
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
                            return [1, 2, 3, 4, 5];
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
                                throw new Error(`HTTP error! status: ${res.status}`);
                            }
                            
                            const responseBody = await res.json();
                            if (responseBody.status && responseBody.status !== "success") {
                                throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
                            }
                            
                            return responseBody;
                        } catch (err) {
                            console.error("Booking error:", err);
                            return null;
                        }
                    },

                    renderCalendar() {
                        const calendarComponent = formContainer.querySelector("#calendar-component");
                        if (!calendarComponent) return;
                        
                        const getText = (key) => translations[language][key] || key;
                        
                        calendarComponent.innerHTML = `
                            <div class="calendar-container ${this.state.isConfirmed ? 'confirmed' : ''}">
                                <div class="calendar-header">
                                    <div class="calendar-title">
                                        <div class="calendar-title-content">
                                            <div class="service-provider">
                                                <span class="provider-icon">
                                                    ${FormManager.constants.SVG.CALENDAR}
                                                </span>
                                                <span>${formValues.selectedService?.eventName || 'Rendez-vous disponibles'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="calendar-nav">
                                        <button class="nav-btn prev-btn" type="button">
                                            <div style="transform: rotate(90deg)">${FormManager.constants.SVG.CHEVRON}</div>
                                        </button>
                                        <div class="current-date"></div>
                                        <button class="nav-btn next-btn" type="button">
                                            <div style="transform: rotate(-90deg)">${FormManager.constants.SVG.CHEVRON}</div>
                                        </button>
                                    </div>
                                </div>
                                <div class="calendar-body">
                                    <div class="days-container">
                                        <div class="weekdays"></div>
                                        <div class="days"></div>
                                    </div>
                                    <div class="times-container">
                                        <div class="time-header"></div>
                                        <div class="time-slots"></div>
                                    </div>
                                </div>
                            </div>
                        `;
                        
                        this.renderCalendarData();
                        this.attachCalendarEvents();
                    },

                    renderCalendarData() {
                        const getText = (key) => translations[language][key] || key;
                        
                        // Update current date display
                        const currentDateEl = formContainer.querySelector('.current-date');
                        if (currentDateEl) {
                            const dateFormatter = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { month: "long", year: "numeric" });
                            currentDateEl.textContent = dateFormatter.format(this.state.currentDate);
                        }
                        
                        // Render weekdays
                        const weekdaysEl = formContainer.querySelector('.weekdays');
                        if (weekdaysEl) {
                            weekdaysEl.innerHTML = '';
                            const weekdays = getText('weekdays');
                            weekdays.forEach(day => {
                                const dayEl = document.createElement("div");
                                dayEl.textContent = day;
                                weekdaysEl.appendChild(dayEl);
                            });
                        }
                        
                        // Render calendar days
                        const daysEl = formContainer.querySelector('.days');
                        if (daysEl) {
                            daysEl.innerHTML = '';
                            let daysToShow = [];
                            const firstDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), 1);
                            const daysFromPrevMonth = firstDay.getDay();
                            const lastDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 0);
                            const totalDays = lastDay.getDate();
                            
                            // Previous month days
                            for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
                                const day = new Date(firstDay);
                                day.setDate(day.getDate() - i - 1);
                                daysToShow.push({ date: day, inactive: true });
                            }
                            
                            // Current month days
                            for (let i = 1; i <= totalDays; i++) {
                                const day = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), i);
                                daysToShow.push({ date: day, inactive: false });
                            }
                            
                            // Next month days
                            const remainingDays = 42 - daysToShow.length;
                            for (let i = 1; i <= remainingDays; i++) {
                                const day = new Date(lastDay);
                                day.setDate(day.getDate() + i);
                                daysToShow.push({ date: day, inactive: true });
                            }
                            
                            const highlightDay = this.state.selectedDate || this.getDefaultActiveDay();
                            
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
                                            dayEl.addEventListener("click", async () => {
                                                this.state.selectedDate = new Date(date);
                                                this.state.selectedTime = null;
                                                const dateKey = this.formatDate(date);
                                                const slots = await this.fetchAvailableSlots(
                                                    dateKey, 
                                                    formValues.selectedService.eventTypeId, 
                                                    formValues.selectedService.eventTypeSlug
                                                );
                                                this.state.availableSlots[dateKey] = slots;
                                                this.renderCalendar();
                                                this.updateNextButton();
                                            });
                                        }
                                    }
                                }
                                daysEl.appendChild(dayEl);
                            });
                        }
                        
                        // Render time header and slots
                        const timeHeaderEl = formContainer.querySelector('.time-header');
                        const timeSlotsEl = formContainer.querySelector('.time-slots');
                        
                        if (timeHeaderEl && timeSlotsEl) {
                            if (this.state.selectedDate) {
                                const dateFormatter = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { weekday: "long", month: "long", day: "numeric" });
                                timeHeaderEl.textContent = `${getText('availableTimesFor')} ${dateFormatter.format(this.state.selectedDate)}`;
                                
                                const dateKey = this.formatDate(this.state.selectedDate);
                                const timeSlots = this.state.availableSlots[dateKey] || [];
                                
                                if (timeSlots.length === 0) {
                                    timeSlotsEl.innerHTML = `<div style="text-align: center; padding: 20px 0; color: #666;">${getText('noAvailableSlots')}</div>`;
                                } else {
                                    const columnsContainer = document.createElement("div");
                                    columnsContainer.className = "time-slots-columns";
                                    
                                    const amColumn = document.createElement("div");
                                    amColumn.className = "time-slots-column";
                                    const pmColumn = document.createElement("div");
                                    pmColumn.className = "time-slots-column";
                                    
                                    const amHeader = document.createElement("div");
                                    amHeader.textContent = "AM";
                                    amColumn.appendChild(amHeader);
                                    
                                    const pmHeader = document.createElement("div");
                                    pmHeader.textContent = "PM";
                                    pmColumn.appendChild(pmHeader);
                                    
                                    timeSlots.forEach((timeISO, index) => {
                                        const dateTime = new Date(timeISO);
                                        const hours = dateTime.getHours();
                                        const timeSlot = document.createElement("div");
                                        timeSlot.className = "time-slot available";
                                        
                                        if (this.state.selectedTime === timeISO) {
                                            timeSlot.classList.add("selected");
                                        }
                                        
                                        const timeFormatter = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { hour: "numeric", minute: "2-digit", hour12: true });
                                        timeSlot.textContent = timeFormatter.format(dateTime);
                                        
                                        timeSlot.addEventListener("click", () => {
                                            if (!this.state.isConfirmed) {
                                                this.state.selectedTime = timeISO;
                                                this.renderCalendar();
                                                this.updateNextButton();
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
                                    timeSlotsEl.innerHTML = '';
                                    timeSlotsEl.appendChild(columnsContainer);
                                }
                            } else {
                                timeHeaderEl.innerHTML = `<span style="display: inline-block; animation: pulse 2s infinite ease-in-out;">${getText('selectDate')}</span>`;
                                timeSlotsEl.innerHTML = `<div style="text-align: center; padding: 20px 0; color: #666;">${getText('pleaseSelectDate')}</div>`;
                            }
                        }
                    },

                    attachCalendarEvents() {
                        const getText = (key) => translations[language][key] || key;
                        
                        // Navigation buttons
                        const prevBtn = formContainer.querySelector('.prev-btn');
                        const nextBtn = formContainer.querySelector('.next-btn');
                        
                        if (prevBtn) {
                            prevBtn.addEventListener("click", () => {
                                if (!this.state.isConfirmed) {
                                    this.state.currentDate = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() - 1, 1);
                                    this.renderCalendar();
                                }
                            });
                        }
                        
                        if (nextBtn) {
                            nextBtn.addEventListener("click", () => {
                                if (!this.state.isConfirmed) {
                                    this.state.currentDate = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 1);
                                    this.renderCalendar();
                                }
                            });
                        }
                    },

                    updateNextButton() {
                        const nextButton = formContainer.querySelector('#step3-next');
                        if (nextButton) {
                            if (this.state.selectedDate && this.state.selectedTime) {
                                nextButton.disabled = false;
                                hideError('error-datetime', formContainer);
                            } else {
                                nextButton.disabled = true;
                            }
                        }
                    },

                    async initialize(scheduleId) {
                        this.state.workingDays = await this.fetchWorkingDays(scheduleId);
                        
                        if (!this.state.selectedDate) {
                            const defaultDay = this.getDefaultActiveDay();
                            this.state.selectedDate = defaultDay;
                            const dayKey = this.formatDate(defaultDay);
                            if (!this.state.availableSlots[dayKey]) {
                                const defaultSlots = await this.fetchAvailableSlots(
                                    dayKey, 
                                    formValues.selectedService.eventTypeId, 
                                    formValues.selectedService.eventTypeSlug
                                );
                                this.state.availableSlots[dayKey] = defaultSlots;
                            }
                        }
                        
                        this.renderCalendar();
                        this.updateNextButton();
                    }
                };

                // Form data store
                const formValues = {
                    firstName: "",
                    lastName: "",
                    email: "",
                    selectedService: null
                };
                
                // Create form data and translations references
                const translations = FormManager.translations;

                function getText(key) {
                    return translations[language][key] || key;
                }

                function saveFormData() {
                    // Simple save to localStorage
                    try {
                        localStorage.setItem('bookingFormData', JSON.stringify(formValues));
                        localStorage.setItem('bookingFormStep', FormManager.currentStep);
                    } catch (e) {
                        console.error('Error saving form data:', e);
                    }
                }
                
                // Debounced validation functions
                const debouncedValidation = {
                    email: debounce((value) => {
                        if (value && !isValidEmail(value)) {
                            showError('error-email', 'emailInvalid', formContainer, context);
                        } else {
                            hideError('error-email', formContainer);
                        }
                    }, 300)
                };
                
                // ================================
                // CREATE CONTEXT OBJECT
                // ================================
                const context = {
                    language: language,
                    formValues: formValues,
                    translations: translations,
                    saveFormData: saveFormData,
                    debouncedValidation: debouncedValidation
                };

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
                    formContainer.classList.add("form-timeout");
                    disableAllFormElements();
                    const submitButton = formContainer.querySelector("#step3-next");
                    if (submitButton) {
                        submitButton.disabled = true;
                        submitButton.textContent = getText("timeExpired");
                        submitButton.classList.add("timeout-button");
                    }
                    formContainer.querySelectorAll(".btn-next")
                        .forEach(btn => {
                            btn.disabled = true;
                            btn.textContent = getText("timeExpired");
                            btn.classList.add("timeout-button");
                        });
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
                    formContainer.querySelectorAll('button, input, select, textarea, .service-option, .day, .time-slot')
                        .forEach(el => {
                            el.disabled = true;
                            el.style.cursor = "not-allowed";
                        });
                }
                
                // ================================
                // CREATE FORM CONTAINER WITH COMPLETE HTML
                // ================================
                const formContainer = document.createElement("form");
                formContainer.setAttribute("novalidate", "true");
                formContainer.classList.add("chatbot-form");
                
                // Generate complete form HTML using same CSS from submission form
                const formHTML = `
                    <style>
                        /* Using the exact same CSS from the submission form template */
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

                        /* ---------- ANIMATIONS ---------- */
                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                                transform: translateY(15px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
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

                        @keyframes slideDown {
                            from {
                                opacity: 0;
                                transform: translateY(-10px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes shake {
                            0%, 100% {
                                transform: translateX(0);
                            }
                            10%, 30%, 50%, 70%, 90% {
                                transform: translateX(-5px);
                            }
                            20%, 40%, 60%, 80% {
                                transform: translateX(5px);
                            }
                        }

                        @keyframes pulse {
                            0% {
                                transform: scale(1);
                                box-shadow: 0 0 0 0 rgba(233, 93, 44, 0.4);
                            }
                            70% {
                                transform: scale(1.05);
                                box-shadow: 0 0 0 15px rgba(233, 93, 44, 0);
                            }
                            100% {
                                transform: scale(1);
                            }
                        }

                        form.chatbot-form {
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                            min-width: 870px;
                            margin: 0 auto;
                            padding: 0;
                            border-radius: 12px;
                            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                            box-shadow: 0 8px 30px rgba(233, 93, 44, 0.12);
                            position: relative;
                            overflow: hidden;
                            animation: fadeIn 0.6s;
                            transition: all 0.3s ease;
                        }

                        form.chatbot-form:hover {
                            box-shadow: 0 12px 40px rgba(233, 93, 44, 0.15);
                        }

                        /* Two-column layout */
                        .row, .form-row, .flex-row {
                            display: flex;
                            flex-wrap: wrap;
                            margin: 0 -10px;
                            width: calc(100% + 20px);
                        }

                        .col, .form-col, .flex-row>div {
                            flex: 1 0 0;
                            padding: 0 10px;
                            min-width: 0;
                        }

 

                        /* ---------- STEP PROGRESS INDICATOR ---------- */
                        .progress-container {
                            padding: 15px 25px 0px 25px;
                        }
                        
                        .progress-bar {
                            width: 100%;
                            height: 8px;
                            background-color: #e0e0e0;
                            border-radius: 4px;
                            overflow: hidden;
                            position: relative;
                        }

                        .progress-fill {
                            height: 100%;
                            background: linear-gradient(135deg, #e95d2c 0%, #b0cee2 100%);
                            transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1);
                            border-radius: 4px;
                        }

                        .step-info {
                            display: flex;
                            justify-content: space-between;
                            margin-top: 5px;
                            font-size: 16px;
                            font-weight: bold;
                            color: #666;
                        }

                        /* ---------- FORM STEPS & ANIMATIONS ---------- */
                        .step-container {
                            display: none;
                            animation: fadeIn 0.6s;
                        }

                        .step-container.active {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                            padding: 5px 30px 10px;
                        }

                        .step-container:not(.active) {
                            pointer-events: none;
                        }

                        /* ---------- FORM ELEMENTS ---------- */
                        .form-label, .question-label, .bold-label {
                            font-weight: 600;
                            color: #1a2730;
                            font-size: 15px;
                        }

                        .form-label.required::after {
                            content: " *";
                            
                            font-weight: bold;
                        }

                        .step-heading {
                            font-size: 26px;
                            color: #1a2730;
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
                            background: linear-gradient(90deg, #e95d2c, #b0cee2);
                            border-radius: 4px;
                        }

                        /* ========== Input Fields ========== */
                        input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"],
                        #details, #description, #services, #form-purpose, select {
                            width: 100%;
                            border: 2px solid #e0e0e0;
                            border-radius: 8px;
                            padding: 12px 16px;
                            font-size: 14px;
                            font-weight: 500;
                            transition: all 0.3s ease;
                            background-color: #fafafa;
                            color: #444;
                            position: relative;
                            overflow: hidden;
                            margin: 0px;
                            height: 54px;
                        }

                        input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus,
                        input[type="url"]:focus,
                        input[type="number"]:focus, #details:focus, #description:focus, #services:focus,
                        #form-purpose:focus, select:focus {
                            border-color: #e95d2c;
                            box-shadow: 0 0 0 3px rgba(233, 93, 44, 0.1);
                            outline: none;
                            background-color: #fff;
                            transform: translateY(-2px);
                        }

                        input[type="text"]:hover:not(:focus),input[type="url"]:hover:not(:focus), input[type="email"]:hover:not(:focus),
                        input[type="tel"]:hover:not(:focus), input[type="number"]:hover:not(:focus),
                        #details:hover:not(:focus), #description:hover:not(:focus), #services:hover:not(:focus),
                        #form-purpose:hover:not(:focus) {
                            border-color: #e95d2c;
                            background-color: rgba(247, 184, 153, 0.1);
                        }

                        /* ---------- SERVICE OPTIONS ---------- */
                        .service-options {
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
                            gap: 24px;
                        }

                        .service-option {
                            border: 3px solid #e0e0e0;
                            border-radius: 20px;
                            padding: 5%;
                            cursor: pointer;
                            transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                            position: relative;
                            background: #fff;
                            overflow: hidden;
                            display: flex;
                            flex-direction: column;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                        }

                        .service-option::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 6px;
                            height: 100%;
                            background: linear-gradient(135deg, #e95d2c 0%, #b0cee2 100%);
                            transform: scaleY(0);
                            transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                            transform-origin: bottom;
                        }

                        .service-option:hover {
                            border-color: #e95d2c;
                            background: rgba(247, 184, 153, 0.1);
                            transform: translateY(-6px);
                            box-shadow: 0 8px 25px rgba(233, 93, 44, 0.15);
                        }

                        .service-option:hover::before {
                            transform: scaleY(1);
                        }

                        .service-option.selected {
                            border-color: #e95d2c;
                            background: rgba(247, 184, 153, 0.1);
                            box-shadow: 0 8px 25px rgba(233, 93, 44, 0.15);
                            transform: translateY(-4px);
                        }

                        .service-option.selected::before {
                            transform: scaleY(1);
                        }

                        .checkmark-icon {
                            position: absolute;
                            top: 24px;
                            right: 24px;
                            background: #e95d2c;
                            color: white;
                            width: 32px;
                            height: 32px;
                            border-radius: 50%;
                            display: none;
                            align-items: center;
                            justify-content: center;
                            font-size: 16px;
                            z-index: 1;
                            box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
                        }

                        .service-option.selected .checkmark-icon {
                            display: flex;
                            animation: pulse 2s ease-in-out;
                        }

                        .service-title {
                            font-size: 22px;
                            font-weight: 800;
                            color: #1a2730;
                            z-index: 1;
                        }

                        .service-description {
                            font-size: 16px;
                            color: #555;
                            margin: 0 0 10px 0;
                            line-height: 1.7;
                            text-align: justify;
                            flex: 1;
                            z-index: 1;
                        }

                        .service-duration {
                            display: inline-block;
                            background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
                            color: white;
                            padding: 10px 20px;
                            border-radius: 25px;
                            font-size: 14px;
                            font-weight: 700;
                            align-self: flex-start;
                            z-index: 1;
                            box-shadow: 0 2px 8px rgba(233, 93, 44, 0.2);
                            transition: all 0.3s ease;
                            text-transform: uppercase;
                            letter-spacing: 0.05em;
                        }

                        .service-option:hover .service-duration {
                            transform: scale(1.05);
                            box-shadow: 0 4px 12px rgba(233, 93, 44, 0.3);
                        }

                        .service-content {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                        }

                        /* ---------- ERROR MESSAGES ---------- */
                        .error-container {
                            width: 100%;
                            margin: 2px 0;
                            box-sizing: border-box;
                        }

                        .error-message {
                            color: white;
                            font-size: 13px;
                            margin-top: 8px;
                            display: none;
                            background: linear-gradient(135deg, #e52059 0%, #d32f2f 100%);
                            border-radius: 8px;
                            border: none;
                            padding: 12px 16px;
                            animation: shake 0.5s;
                            box-shadow: 0 4px 15px rgba(229, 32, 89, 0.3);
                        }

                        .error-message.show {
                            display: flex;
                            animation: slideIn 0.3s ease-out;
                        }

                        .error-icon {
                            width: 22px;
                            height: 22px;
                            min-width: 22px;
                            border-radius: 50%;
                            background-color: white;
                            
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
                        .form-buttons {
                            display: flex;
                            justify-content: space-between;
                            gap: 15px;
                        }

                        .btn {
                            padding: 14px 28px;
                            border: none;
                            border-radius: 8px;
                            font-size: 16px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
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
                                    rgba(255, 255, 255, 0) 0%,
                                    rgba(255, 255, 255, 0.2) 50%,
                                    rgba(255, 255, 255, 0) 100%);
                            transition: all 0.6s;
                        }

                        .btn:hover:not(:disabled)::after {
                            left: 100%;
                        }

                        .btn-prev {
                            background-color: #f0f0f0;
                            color: #1a2730;
                            border: 2px solid #e0e0e0;
                        }

                        .btn-prev:hover {
                            background-color: rgba(247, 184, 153, 0.1);
                            border-color: #e95d2c;
                            transform: translateY(-2px);
                            box-shadow: 0 4px 12px rgba(233, 93, 44, 0.2);
                        }

                        .btn-next, .btn-submit {
                            background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
                            color: white;
                            box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
                        }

                        .btn-next:hover, .btn-submit:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 6px 20px rgba(233, 93, 44, 0.4);
                        }

                        .btn:disabled {
                            cursor: not-allowed;
                            transform: none;
                            box-shadow: none; 
                            background: #45586c !important;
                        }

                        .btn:disabled::after {
                            display: none;
                        }

                        .form-buttons .btn:active {
                            transform: translateY(1px);
                            box-shadow: 0 2px 8px rgba(233, 93, 44, 0.2);
                        }

                        /* ---------- CALENDAR STYLES ---------- */
                        .calendar-container {
                            width: 100%;
                            max-width: 100%;
                            margin: 0 auto;
                            background: #fff;
                            border-radius: 12px;
                            box-shadow: 0 8px 30px rgba(233, 93, 44, 0.12);
                            overflow: hidden;
                            transition: all 0.4s ease;
                            position: relative;
                            animation: fadeIn 0.8s ease-out forwards;
                            border: 2px solid #e0e0e0;
                        }

                        .calendar-header {
                            padding: 20px;
                            background: linear-gradient(90deg, #e95d2c, #b0cee2);
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            color: white;
                            position: relative;
                        }

                        .calendar-title {
                            display: flex;
                            align-items: center;
                            gap: 20px;
                        }

                        .service-provider {
                            display: flex;
                            align-items: center;
                            font-size: 20px;
                            font-weight: 600;
                            color: white;
                        }

                        .provider-icon {
                            width: 32px;
                            height: 32px;
                            margin-right: 16px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .provider-icon svg {
                            filter: brightness(0) invert(1);
                        }

                        .calendar-nav {
                            display: flex;
                            align-items: center;
                            gap: 24px;
                        }

                        .nav-btn {
                            width: 48px;
                            height: 48px;
                            background: rgba(255, 255, 255, 0.15);
                            border: none;
                            border-radius: 16px;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.4s ease;
                            color: white;
                        }

                        .nav-btn:hover:not(:disabled) {
                            background: rgba(255, 255, 255, 0.25);
                            transform: scale(1.1);
                        }

                        .nav-btn:disabled {
                            opacity: 0.3;
                            cursor: not-allowed;
                            transform: none;
                        }

                        .current-date {
                            font-size: 18px;
                            font-weight: 700;
                            color: white;
                            padding: 14px 24px;
                            background: rgba(255, 255, 255, 0.15);
                            border-radius: 25px;
                        }

                        .calendar-body {
                            display: flex;
                            background: linear-gradient(to bottom, #ffffff, #fefeff);
                        }

                        .days-container {
                            width: 47%;
                            padding: 20px;
                            background: #fff;
                            border-right: 2px solid #e0e0e0;
                        }

                        .weekdays {
                            display: grid;
                            grid-template-columns: repeat(7, 1fr);
                            text-align: center;
                            font-weight: 700;
                            font-size: 13px;
                            color: #e95d2c;
                            text-transform: uppercase;
                        }

                        .days {
                            display: grid;
                            grid-template-columns: repeat(7, 1fr);
                            gap: 2px;
                        }

                        .day {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 40px;
                            width: 40px;
                            cursor: pointer;
                            position: relative;
                            font-size: 15px;
                            font-weight: 600;
                            transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                            margin: 10px auto auto auto;
                            border: 3px solid transparent;
                            border-radius: 16px;
                            color: #1a2730;
                        }

                        .day:hover:not(.inactive) {
                            background: rgba(247, 184, 153, 0.1);
                            color: #e95d2c;
                            border-color: #e95d2c;
                            transform: scale(1.1);
                        }

                        .day.available::after {
                            content: "";
                            position: absolute;
                            bottom: 0px;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: #e95d2c;
                            opacity: 0.7;
                        }

                        .day.today {
                            border-color: #b0cee2;
                            background: #b0cee2;
                            font-weight: 700;
                        }

                        .day.active {
                            background: #e95d2c;
                            color: white;
                            border-color: #e95d2c;
                            font-weight: 700;
                            box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
                        }

                        .day.active::after {
                            display: none;
                        }

                        .day.inactive {
                            color: #ccc;
                            cursor: default;
                            opacity: 0.3;
                        }

                        .day.inactive:hover {
                            transform: none;
                            background: transparent;
                            border-color: transparent;
                        }

                        .times-container {
                            width: 53%;
                            padding: 10px;
                            background: #fafafa;
                            overflow-y: auto;
                            max-height: 400px;
                        }

                        .time-header {
                            font-size: 20px;
                            font-weight: 800;
                            color: #1a2730;
                            text-align: center;
                            margin-bottom: 20px;
                            padding-bottom: 10px;
                            position: relative;
                        }

                        .time-header::after {
                            content: '';
                            position: absolute;
                            bottom: 0;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 80px;
                            height: 4px;
                            background: linear-gradient(90deg, #e95d2c, #b0cee2);
                            border-radius: 4px;
                        }

                        .time-slots-columns {
                            display: flex;
                        }

                        .time-slots-column {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                            align-items: center;
                        }

                        .time-slots-column > div:first-child {
                            font-weight: 800;
                            color: #e95d2c;
                            font-size: 16px;
                        }

                        .time-slot {
                            padding: 16px 20px;
                            border-radius: 16px;
                            text-align: center;
                            cursor: pointer;
                            transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                            border: 3px solid #e0e0e0;
                            background: #fff;
                            color: #1a2730;
                            font-size: 15px;
                            font-weight: 600;
                            position: relative;
                            overflow: hidden;
                            width: 95%;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                        }

                        .time-slot.available:hover:not(.selected) {
                            background: rgba(247, 184, 153, 0.1);
                            color: #e95d2c;
                            border-color: #e95d2c;
                            transform: translateY(-3px);
                            box-shadow: 0 4px 12px rgba(233, 93, 44, 0.2);
                        }

                        .time-slot.selected {
                            background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
                            color: white;
                            border-color: #e95d2c;
                            font-weight: 700;
                            box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
                            transform: translateY(-3px);
                        }

                        /* ---------- SUCCESS SECTION ---------- */
                        .success-section {
                            text-align: center;
                            padding: 40px;
                            animation: fadeIn 1s ease-out;
                            background: linear-gradient(to bottom, #ffffff, #fefeff);
                            position: relative;
                        }

                        .success-icon {
                            width: 120px;
                            height: 120px;
                            background: linear-gradient(135deg, #e95d2c 0%, #b0cee2 100%);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 32px;
                            animation: pulse 3s infinite;
                            color: white;
                            font-size: 56px;
                            box-shadow: 0 8px 30px rgba(233, 93, 44, 0.12);
                        }

                        .success-icon svg {
                            width: 56px;
                            height: 56px;
                        }

                        .success-title {
                            font-size: 32px;
                            color: #1a2730;
                            margin-bottom: 20px;
                            font-weight: 800;
                        }

                        .success-message {
                            font-size: 18px;
                            color: #555;
                            margin-bottom: 40px;
                            line-height: 1.7;
                            max-width: 650px;
                            margin-left: auto;
                            margin-right: auto;
                        }

                        /* ---------- FORM TIMEOUT STYLES ---------- */
                        .chatbot-form.form-timeout {
                            background-color: #e52059 !important;
                            transition: background-color 0.5s ease;
                        }
                        
                        .chatbot-form.form-timeout .step-container,
                        .chatbot-form.form-timeout .success-section,
                        .chatbot-form.form-timeout .progress-container {
                            background-color: transparent !important;
                        }

                        /* Disabled form styles */
                        .form-timeout input, 
                        .form-timeout button, 
                        .form-timeout select, 
                        .form-timeout textarea, 
                        .form-timeout .service-option {
                            pointer-events: none;
                            opacity: 0.4;
                            cursor: not-allowed !important;
                        }

                        /* ---------- RESPONSIVE DESIGN ---------- */
                        @media (max-width: 767px) {
                            .flex-row {
                                display: flex;
                                margin: 0;
                                width: 100%;
                                gap: 20px;
                                flex-direction: column;
                            }
                            
                            .step-container.active {
                                padding: 5px 15px 10px;
                            }
                            
                            .flex-row > div {
                                width: 100%;
                                padding: 0;
                                margin-bottom: 0px;
                            }
                            
                            .service-options {
                                grid-template-columns: 1fr;
                                gap: 20px;
                            }
                        }

                        @media (max-width: 768px) {
     
                            
                            .step-heading {
                                font-size: 22px;
                            }
                            
                            .btn {
                                padding: 12px 18px;
                                font-size: 15px;
                            }
                            
                            .calendar-body {
                                flex-direction: column;
                            }
                            
                            .days-container,
                            .times-container {
                                width: 100%;
                                padding: 20px;
                            }
                            
                            .times-container {
                                border-right: none;
                                border-top: 2px solid #e0e0e0;
                            }
                        }

                        @media (max-width: 480px) {
                            form.chatbot-form {
                                min-width: 200px;
                            }
                            

                            
                            .step-heading {
                                font-size: 18px;
                            }
                            

                        }

                        /* ---------- FOCUS STYLES FOR ACCESSIBILITY ---------- */
                        input:focus-visible, button:focus-visible {
                            outline: 2px solid #e95d2c;
                            outline-offset: 2px;
                        }

                        /* ===== STATS/NUMÉROS ===== */
                        .stats7_number {
                            background: linear-gradient(45deg, #e95d2c, #1a2730) !important;
                            -webkit-background-clip: text !important;
                            -webkit-text-fill-color: transparent !important;
                            background-clip: text !important;
                        }

                        /* ===== BOUTONS TIMEOUT ===== */
                        .timeout-button {
                            background: #45586c !important;
                        }
                    </style>
                    
                    <!-- Progress Bar -->
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill"></div>
                        </div>
                        <div class="step-info">
                            <span>Étape <span class="current-step" id="current-step">1</span> sur ${totalSteps}</span>
                            <span id="step-title">${getText('step1Title')}</span>
                        </div>
                    </div>

                    <!-- Dynamic Steps Generation -->
                    ${generateStep1(formContainer, context)}
                    ${generateStep2(formContainer, context)}
                    ${generateStep3(formContainer, context)}
                    ${generateStep4(formContainer, context)}
                `;
                
                // Set the generated HTML
                formContainer.innerHTML = formHTML;
                // Add to page
                element.appendChild(formContainer);
                
                // Add header

                

                
                // ================================
                // FORM NAVIGATION LOGIC
                // ================================
                function showStep(stepNumber) {
                    formContainer.querySelectorAll('.step-container')
                        .forEach(step => {
                            step.classList.remove('active');
                        });
                    formContainer.querySelector(`#step-${stepNumber}`)
                        .classList.add('active');
                    FormManager.currentStep = stepNumber;
                    updateProgressBar();
                    
                    // Scroll to top of form
                    formContainer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                function updateProgressBar() {
                    const progressFill = formContainer.querySelector('#progress-fill');
                    const currentStepElement = formContainer.querySelector('#current-step');
                    const stepTitleElement = formContainer.querySelector('#step-title');
                    if (progressFill) {
                        const progress = ((FormManager.currentStep - 1) / (totalSteps - 1)) * 100;
                        progressFill.style.width = `${progress}%`;
                    }
                    if (currentStepElement) {
                        currentStepElement.textContent = FormManager.currentStep;
                    }
                    if (stepTitleElement) {
                        const stepTitles = [
                            getText('step1Title'), getText('step2Title'), getText('step3Title')
                        ];
                        const newTitle = stepTitles[FormManager.currentStep - 1] || '';
                        stepTitleElement.textContent = newTitle;
                    }
                }

                function showSuccessScreen() {
                    // Hide all step containers
                    formContainer.querySelectorAll('.step-container')
                        .forEach(step => {
                            step.classList.remove('active');
                        });
                    
                    // Hide progress bar since we're done
                    const progressContainer = formContainer.querySelector('.progress-container');
                    if (progressContainer) {
                        progressContainer.style.display = 'none';
                    }
                    
                    // Show success screen
                    formContainer.querySelector('#step-4')
                        .classList.add('active');
                    
                    isFormSubmitted = true;
                    if (formTimeoutId) {
                        clearInterval(formTimeoutId);
                    }
                }

                // ================================
                // EVENT LISTENERS
                // ================================
                
                // Service selection in step 1
                setTimeout(() => {
                    const serviceOptions = formContainer.querySelectorAll(".service-option");
                    serviceOptions.forEach(option => {
                        option.addEventListener("click", function() {
                            serviceOptions.forEach(opt => {
                                opt.classList.remove("selected");
                            });
                            this.classList.add("selected");
                            
                            const serviceId = parseInt(this.dataset.id);
                            formValues.selectedService = translations[language].meetingOptions.find(option => option.id === serviceId);
                            
                            // Hide error if visible
                            hideError('error-service', formContainer);
                            
                            const nextButton = formContainer.querySelector("#step1-next");
                            if (nextButton) nextButton.disabled = false;
                            
                            saveFormData();
                        });
                    });
                }, 0);

                // Step navigation
                formContainer.querySelector('#step1-next').addEventListener('click', function () {
                    if (validateStep1(formValues, formContainer, context)) {
                        showStep(2);
                    }
                });

                formContainer.querySelector('#step2-prev').addEventListener('click', () => showStep(1));
                formContainer.querySelector('#step2-next').addEventListener('click', function () {
                    if (validateStep2(formValues, formContainer, context)) {
                        showStep(3);
                        // Initialize calendar when reaching step 3
                        if (formValues.selectedService) {
                            CalendarBooking.initialize(formValues.selectedService.scheduleId);
                        }
                    }
                });

                formContainer.querySelector('#step3-prev').addEventListener('click', () => showStep(2));
                
                // Step 3 Next button (Confirm booking)
                formContainer.querySelector('#step3-next').addEventListener('click', async function () {
                    if (validateStep3(formValues, formContainer, context)) {
                        this.disabled = true;
                        this.textContent = getText('confirming');
                        
                        try {
                            const bookingResponse = await CalendarBooking.createBooking(
                                CalendarBooking.state.selectedTime,
                                `${formValues.firstName} ${formValues.lastName}`,
                                formValues.email,
                                formValues.selectedService.eventTypeId
                            );
                            
                            if (bookingResponse) {
                                // Show success screen
                                showSuccessScreen();
                                
                                const dateStr = CalendarBooking.formatDate(CalendarBooking.state.selectedDate);
                                const formattedDate = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                }).format(CalendarBooking.state.selectedDate);
                                const formattedTime = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { 
                                    hour: 'numeric', 
                                    minute: '2-digit', 
                                    hour12: true 
                                }).format(new Date(CalendarBooking.state.selectedTime));
                                const formattedDateTime = `${formattedDate} ${language === "fr" ? "à" : "at"} ${formattedTime}`;

                                const submissionData = { 
                                    firstName: formValues.firstName,
                                    lastName: formValues.lastName,
                                    fullName: `${formValues.firstName} ${formValues.lastName}`,
                                    email: formValues.email,
                                    service: formValues.selectedService.eventName,
                                    date: dateStr,
                                    time: CalendarBooking.state.selectedTime,
                                    formattedDate,
                                    formattedTime,
                                    formattedDateTime
                                };
                                
                                if (vf) {
                                    window.voiceflow.chat.interact({
                                        type: "success",
                                        payload: submissionData
                                    });
                                }
                            }
                        } catch (err) {
                            console.error("Booking error:", err);
                            this.disabled = false;
                            this.textContent = getText('submit');
                        }
                    }
                });

                // Initialize progress bar and start timer
                updateProgressBar();
                startFormTimer();
            }
        };
		        
				const RescheduleExtension = {
            name: "RescheduleCalendar",
            type: "response",
            match: ({trace}) => trace.type === "ext_reschedule_calendar" || trace.payload?.name === "ext_reschedule_calendar",
            render: ({trace, element}) => {
                
                // Get payload data
                const {
                    apiKey = "cal_live_2bb06ee039ec6c015b8cf8350419d9dc",
                    language = "fr", 
                    timezone = "America/Toronto",
                    email = "belganasaad@gmail.com",
                    meetingName = "Dr. Sophie Martin",
                    startTime = "4/11/2025, 3:00:00 PM",
                    scheduleId = "552447",
                    eventTypeId = "2109616",
                    eventTypeSlug = "nettoyages-et-examens-dentaires",
                    uid = "qZd2N1P184Ys6LuuUjA1mB",
                    vf
                } = trace.payload || {};

                // Initialize variables
                const totalSteps = 2;
                let isFormSubmitted = false;
                const TIMEOUT_DURATION = 300000; // 5 minutes
                let formTimeoutId = null;

                function debounce(func, wait) {
                    let timeout;
                    return function executedFunction(...args) {
                        const later = () => {
                            clearTimeout(timeout);
                            func(...args);
                        };
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                    };
                }

                function isValidEmail(email) {
                    return FormManager.validation.email(email);
                }

                // Conditional section helpers
                function showConditionalSection(sectionId, container) {
                    const element = container.querySelector(sectionId);
                    if (element) {
                        element.style.removeProperty('display');
                        element.style.setProperty('display', 'flex', 'important');
                        element.setAttribute('aria-hidden', 'false');
                        element.classList.add('visible');
                    }
                }

                function hideConditionalSection(sectionId, container) {
                    const element = container.querySelector(sectionId);
                    if (element) {
                        element.style.setProperty('display', 'none', 'important');
                        element.setAttribute('aria-hidden', 'true');
                        element.classList.remove('visible');
                    }
                }
                
                const FormManager = {
                    currentStep: 1,
                    // ================================
                    // CONSTANTES SVG
                    // ================================
                    constants: {
                        SVG: {
                            CHECK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12px" height="12px">
                                        <path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                    </svg>`,
                            CHEVRON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
                                        <g transform="translate(75, 75)">
                                            <path fill="#1a2730" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                                        </g>
                                    </svg>`,
                            CLOSE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="8px" height="8px">
                                        <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                    </svg>`,
                            CALENDAR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
                                        <path fill="#ffffff" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48H0l0-48c0-26.5 21.5-48 48-48l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
                                    </svg>`,
                            RESCHEDULE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                                        <path fill="#ffffff" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-17.6-17.5H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-2.2 0-4.2 .5-6.1 1.3z"/>
                                    </svg>`,
							SUCCESS:`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
										<polyline points="22 4 12 14.01 9 11.01"></polyline>
									</svg>`
                        }
                    },

                    // ================================
                    // HELPER FUNCTIONS
                    // ================================
                    
                    // Function to create input fields
                    createInputField(config) {
                        const {type = 'text', id, labelKey, placeholderKey, formField, required = false, errorId, validator, container, context} = config;
                        const {language, formValues, translations} = context;
                        const getText = (key) => translations[language][key] || key;
                        const inputType = ['email', 'tel', 'text', 'textarea'].includes(type) ? type : 'text';
                        const requiredClass = required ? 'required' : '';
                        
                        const isTextarea = type === 'textarea';
                        const inputElement = isTextarea ? 
                            `<textarea id="${id}" name="${formField}" rows="4" placeholder="${getText(placeholderKey)}"></textarea>` :
                            `<input type="${inputType}" id="${id}" name="${formField}" placeholder="${getText(placeholderKey)}" />`;
                        
                        const html = `
                            <div class="form-group">
                                <label class="form-label ${requiredClass}" for="${id}" id="${id}-label">
                                    ${getText(labelKey)}
                                </label>
                                ${inputElement}
                                ${required && errorId ? `<div class="error-message" id="${errorId}">
                                    <div class="error-icon">!</div>
                                    <span class="error-text">${getText('fieldRequired')}</span>
                                </div>` : ''}
                            </div>
                        `;
                        
                        // Add event listeners after DOM insertion
                        setTimeout(() => {
                            if (container) {
                                const inputEl = container.querySelector(`#${id}`);
                                if (inputEl) {
                                    inputEl.addEventListener('input', function () {
                                        formValues[formField] = this.value.trim();
                                        if (this.value.trim() && errorId) {
                                            const errorEl = container.querySelector(`#${errorId}`);
                                            if (errorEl) errorEl.classList.remove('show');
                                        }
                                        if (validator && this.value.trim()) {
                                            const isValid = validator(this.value.trim());
                                            if (!isValid && errorId) {
                                                const errorEl = container.querySelector(`#${errorId}`);
                                                if (errorEl) errorEl.classList.add('show');
                                            }
                                        }
                                        if (type === 'email' && this.value.trim() && context.debouncedValidation) {
                                            context.debouncedValidation.email(this.value.trim());
                                        }
                                        if (context.saveFormData) context.saveFormData();
                                    });
                                }
                            }
                        }, 0);
                        return html;
                    },

                    // Validation helper
                    validation: {
                        email(email) {
                            const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
                            return emailPattern.test(email);
                        }
                    },

                    // ================================
                    // TRANSLATIONS  
                    // ================================
                    translations: {
                        "fr": {
                            formTitle: "Replanifier Votre Rendez-vous",
                            // Steps
                            step1Title: "Informations Actuelles",
                            step2Title: "Nouvelle Date et Heure", 
                            // Navigation
                            next: "Suivant",
                            previous: "Précédent",
                            submit: "Replanifier",
                            processing: "Traitement en cours...",
                            submitted: "Replanifié avec succès !",
                            // Current appointment
                            currentAppointment: "Rendez-vous Actuel",
                            scheduledWith: "Programmé avec",
                            currentDateTime: "Date et heure actuelles",
                            rescheduleReason: "Raison de la replanification",
                            rescheduleReasonPlaceholder: "Pourquoi souhaitez-vous replanifier ce rendez-vous ?",
                            // Validation messages
                            fieldRequired: "Ce champ est requis",
                            reasonRequired: "Veuillez indiquer la raison de la replanification",
                            dateTimeRequired: "Veuillez sélectionner une nouvelle date et heure",
                            // Calendar
                            selectDateAndTime: "Sélectionner Nouvelle Date et Heure",
                            selectDate: "Sélectionnez une date pour voir les horaires disponibles",
                            pleaseSelectDate: "Veuillez d'abord sélectionner une date",
                            availableTimesFor: "Disponibilités pour",
                            noAvailableSlots: "Aucun horaire disponible pour cette date",
                            confirmReschedule: "Confirmer la Replanification",
                            rescheduleConfirmed: "Rendez-vous Replanifié !",
                            rescheduleComplete: "Votre rendez-vous a été replanifié avec succès",
                            timeExpired: "Temps expiré",
                            errorOccurred: "Une erreur s'est produite",
                            tryAgain: "Veuillez réessayer",
                            confirming: "Replanification en cours...",
                            weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                            // Confirmation
                            confirmationTitle: "Rendez-vous Replanifié !",
                            confirmationMessage: "Votre rendez-vous a été replanifié avec succès. Vous recevrez sous peu un email de confirmation.",
                            backToForm: "Retour au formulaire",
                            // Summary
                            previousAppointment: "Rendez-vous précédent",
                            newAppointment: "Nouveau rendez-vous",
                            reason: "Raison"
                        },
                        "en": {
                            formTitle: "Reschedule Your Appointment",
                            // Steps
                            step1Title: "Current Information",
                            step2Title: "New Date & Time",
                            // Navigation
                            next: "Next",
                            previous: "Previous", 
                            submit: "Reschedule",
                            processing: "Processing...",
                            submitted: "Successfully Rescheduled!",
                            // Current appointment
                            currentAppointment: "Current Appointment",
                            scheduledWith: "Scheduled with",
                            currentDateTime: "Current date and time",
                            rescheduleReason: "Reason for rescheduling",
                            rescheduleReasonPlaceholder: "Why do you want to reschedule this appointment?",
                            // Validation messages
                            fieldRequired: "This field is required",
                            reasonRequired: "Please provide a reason for rescheduling",
                            dateTimeRequired: "Please select a new date and time",
                            // Calendar
                            selectDateAndTime: "Select New Date & Time",
                            selectDate: "Select a date to view available times",
                            pleaseSelectDate: "Please select a date first",
                            availableTimesFor: "Available times for",
                            noAvailableSlots: "No available time slots for this date",
                            confirmReschedule: "Confirm Reschedule",
                            rescheduleConfirmed: "Appointment Rescheduled!",
                            rescheduleComplete: "Your appointment has been successfully rescheduled",
                            timeExpired: "Time Expired",
                            errorOccurred: "An error occurred",
                            tryAgain: "Please try again",
                            confirming: "Rescheduling...",
                            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                            // Confirmation
                            confirmationTitle: "Appointment Rescheduled!",
                            confirmationMessage: "Your appointment has been successfully rescheduled. You will receive a confirmation email shortly.",
                            backToForm: "Return to Form",
                            // Summary
                            previousAppointment: "Previous appointment",
                            newAppointment: "New appointment",
                            reason: "Reason"
                        }
                    }
                };

                // API Functions
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
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        
                        const responseBody = await res.json();
                        if (responseBody.status && responseBody.status !== "success") {
                            throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
                        }
                        
                        return responseBody;
                    } catch (err) {
                        console.error("Error rescheduling booking:", err);
                        return null;
                    }
                }

                // Format date function
                function formatAppointmentDate(dateTimeString, language) {
                    const date = new Date(dateTimeString);
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
                    return formatter.format(date);
                }

                /*************************************************************
                * STEP GENERATION FUNCTIONS
                *************************************************************/
                function generateStep1(formContainer, context) {
                    const {language, translations} = context;
                    const getText = (key) => translations[language][key] || key;
                    
                    return `
                        <div class="step-container active" id="step-1">
                            <span class="step-heading">${getText('step1Title')}</span>
                            
                            <div class="current-appointment-card">
                                <div class="appointment-header">
                                    <div class="appointment-icon">
                                        ${FormManager.constants.SVG.CALENDAR}
                                    </div>
                                    <div class="appointment-info">
                                        <div class="appointment-info-title">${getText('currentAppointment')}</div>
                                        <p><strong>${getText('scheduledWith')}:</strong> ${meetingName}</p>
                                        <p><strong>${getText('currentDateTime')}:</strong> ${formatAppointmentDate(startTime, language)}</p>
                                    </div>
                                </div>
                            </div>
                            
                            ${FormManager.createInputField({
                                type: 'textarea',
                                id: 'reschedule-reason',
                                labelKey: 'rescheduleReason',
                                placeholderKey: 'rescheduleReasonPlaceholder',
                                formField: 'reason',
                                required: true,
                                errorId: 'error-reason',
                                container: formContainer,
                                context: context
                            })}
                            
                            <div class="form-buttons">
                                <div></div>
                                <button type="button" class="btn btn-next" id="step1-next">${getText('next')}</button>
                            </div>
                        </div>
                    `;
                }

                function generateStep2(formContainer, context) {
                    const {language, translations} = context;
                    const getText = (key) => translations[language][key] || key;
                    
                    return `
                        <div class="step-container" id="step-2">
                            <span class="step-heading">${getText('step2Title')}</span>
                            
                            <div id="calendar-component"></div>
                            
                            <div class="error-message" id="error-datetime">
                                <div class="error-icon">!</div>
                                <span class="error-text">${getText('dateTimeRequired')}</span>
                            </div>
                            
                            <div class="form-buttons">
                                <button type="button" class="btn btn-prev" id="step2-prev">${getText('previous')}</button>
                                <button type="button" class="btn btn-next" id="step2-next" disabled>${getText('submit')}</button>
                            </div>
                        </div>
                    `;
                }

                /*************************************************************
                * VALIDATION FUNCTIONS  
                *************************************************************/
                function showError(errorId, messageKey, container, context) {
                    const {language, translations} = context;
                    const getText = (key) => translations[language][key] || key;
                    const errorElement = container.querySelector(`#${errorId}`);
                    if (errorElement) {
                        const errorTextElement = errorElement.querySelector('.error-text');
                        if (errorTextElement) {
                            errorTextElement.textContent = getText(messageKey);
                        } else {
                            errorElement.innerHTML = `
                                <div class="error-icon">!</div>
                                <span class="error-text">${getText(messageKey)}</span>
                            `;
                        }
                        errorElement.classList.add('show');
                    }
                }

                function hideError(errorId, container) {
                    const errorElement = container.querySelector(`#${errorId}`);
                    if (errorElement) {
                        errorElement.classList.remove('show');
                    }
                }

                function validateStep1(formValues, container, context) {
                    if (!formValues.reason || formValues.reason.trim() === '') {
                        showError('error-reason', 'reasonRequired', container, context);
                        return false;
                    }
                    return true;
                }

                function validateStep2(formValues, container, context) {
                    if (!formValues.selectedDate || !formValues.selectedTime) {
                        showError('error-datetime', 'dateTimeRequired', container, context);
                        return false;
                    }
                    return true;
                }

                /*************************************************************
                * CALENDAR COMPONENT IMPLEMENTATION
                *************************************************************/
                const CalendarReschedule = {
                    state: {
                        currentDate: new Date(),
                        selectedDate: null,
                        selectedTime: null,
                        availableSlots: {},
                        workingDays: [1, 2, 3, 4, 5],
                        isConfirmed: false
                    },
                    
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
                    
                    getDefaultActiveDay() {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        if (this.state.workingDays.includes(today.getDay())) return today;
                        
                        const next = new Date(today);
                        let daysChecked = 0;
                        while (!this.state.workingDays.includes(next.getDay()) && daysChecked < 14) {
                            next.setDate(next.getDate() + 1);
                            daysChecked++;
                        }
                        return next;
                    },

                    renderCalendar() {
                        const calendarComponent = formContainer.querySelector("#calendar-component");
                        if (!calendarComponent) return;
                        
                        const getText = (key) => translations[language][key] || key;
                        
                        calendarComponent.innerHTML = `
                            <div class="calendar-container ${this.state.isConfirmed ? 'confirmed' : ''}">
                                <div class="calendar-header">
                                    <div class="calendar-title">
                                        <div class="calendar-title-content">
                                            <div class="service-provider">
                                                <span class="provider-icon">
                                                    ${FormManager.constants.SVG.RESCHEDULE}
                                                </span>
                                                <span>${getText('selectDateAndTime')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="calendar-nav">
                                        <button class="nav-btn prev-btn" type="button">
                                            <div style="transform: rotate(90deg)">${FormManager.constants.SVG.CHEVRON}</div>
                                        </button>
                                        <div class="current-date"></div>
                                        <button class="nav-btn next-btn" type="button">
                                            <div style="transform: rotate(-90deg)">${FormManager.constants.SVG.CHEVRON}</div>
                                        </button>
                                    </div>
                                </div>
                                <div class="calendar-body">
                                    <div class="days-container">
                                        <div class="weekdays"></div>
                                        <div class="days"></div>
                                    </div>
                                    <div class="times-container">
                                        <div class="time-header"></div>
                                        <div class="time-slots"></div>
                                    </div>
                                </div>
                            </div>
                        `;
                        
                        this.renderCalendarData();
                        this.attachCalendarEvents();
                    },

                    renderCalendarData() {
                        const getText = (key) => translations[language][key] || key;
                        
                        // Update current date display
                        const currentDateEl = formContainer.querySelector('.current-date');
                        if (currentDateEl) {
                            const dateFormatter = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { month: "long", year: "numeric" });
                            currentDateEl.textContent = dateFormatter.format(this.state.currentDate);
                        }
                        
                        // Render weekdays
                        const weekdaysEl = formContainer.querySelector('.weekdays');
                        if (weekdaysEl) {
                            weekdaysEl.innerHTML = '';
                            const weekdays = getText('weekdays');
                            weekdays.forEach(day => {
                                const dayEl = document.createElement("div");
                                dayEl.textContent = day;
                                weekdaysEl.appendChild(dayEl);
                            });
                        }
                        
                        // Render calendar days
                        const daysEl = formContainer.querySelector('.days');
                        if (daysEl) {
                            daysEl.innerHTML = '';
                            let daysToShow = [];
                            const firstDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), 1);
                            const daysFromPrevMonth = firstDay.getDay();
                            const lastDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 0);
                            const totalDays = lastDay.getDate();
                            
                            // Previous month days
                            for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
                                const day = new Date(firstDay);
                                day.setDate(day.getDate() - i - 1);
                                daysToShow.push({ date: day, inactive: true });
                            }
                            
                            // Current month days
                            for (let i = 1; i <= totalDays; i++) {
                                const day = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), i);
                                daysToShow.push({ date: day, inactive: false });
                            }
                            
                            // Next month days
                            const remainingDays = 42 - daysToShow.length;
                            for (let i = 1; i <= remainingDays; i++) {
                                const day = new Date(lastDay);
                                day.setDate(day.getDate() + i);
                                daysToShow.push({ date: day, inactive: true });
                            }
                            
                            const highlightDay = this.state.selectedDate || this.getDefaultActiveDay();
                            
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
                                            dayEl.addEventListener("click", async () => {
                                                this.state.selectedDate = new Date(date);
                                                this.state.selectedTime = null;
                                                formValues.selectedDate = this.state.selectedDate;
                                                formValues.selectedTime = null;
                                                const dateKey = this.formatDate(date);
                                                const slots = await fetchAvailableSlots(dateKey);
                                                this.state.availableSlots[dateKey] = slots;
                                                this.renderCalendar();
                                                updateStep2NextButton();
                                            });
                                        }
                                    }
                                }
                                daysEl.appendChild(dayEl);
                            });
                        }
                        
                        // Render time header and slots
                        const timeHeaderEl = formContainer.querySelector('.time-header');
                        const timeSlotsEl = formContainer.querySelector('.time-slots');
                        
                        if (timeHeaderEl && timeSlotsEl) {
                            if (this.state.selectedDate) {
                                const dateFormatter = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { weekday: "long", month: "long", day: "numeric" });
                                timeHeaderEl.textContent = `${getText('availableTimesFor')} ${dateFormatter.format(this.state.selectedDate)}`;
                                
                                const dateKey = this.formatDate(this.state.selectedDate);
                                const timeSlots = this.state.availableSlots[dateKey] || [];
                                
                                if (timeSlots.length === 0) {
                                    timeSlotsEl.innerHTML = `<div style="text-align: center; padding: 20px 0; color: #666;">${getText('noAvailableSlots')}</div>`;
                                } else {
                                    const columnsContainer = document.createElement("div");
                                    columnsContainer.className = "time-slots-columns";
                                    
                                    const amColumn = document.createElement("div");
                                    amColumn.className = "time-slots-column";
                                    const pmColumn = document.createElement("div");
                                    pmColumn.className = "time-slots-column";
                                    
                                    const amHeader = document.createElement("div");
                                    amHeader.textContent = "AM";
                                    amColumn.appendChild(amHeader);
                                    
                                    const pmHeader = document.createElement("div");
                                    pmHeader.textContent = "PM";
                                    pmColumn.appendChild(pmHeader);
                                    
                                    timeSlots.forEach((timeISO, index) => {
                                        const dateTime = new Date(timeISO);
                                        const hours = dateTime.getHours();
                                        const timeSlot = document.createElement("div");
                                        timeSlot.className = "time-slot available";
                                        
                                        if (this.state.selectedTime === timeISO) {
                                            timeSlot.classList.add("selected");
                                        }
                                        
                                        const timeFormatter = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { hour: "numeric", minute: "2-digit", hour12: true });
                                        timeSlot.textContent = timeFormatter.format(dateTime);
                                        
                                        timeSlot.addEventListener("click", () => {
                                            if (!this.state.isConfirmed) {
                                                this.state.selectedTime = timeISO;
                                                formValues.selectedTime = timeISO;
                                                this.renderCalendar();
                                                updateStep2NextButton();
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
                                    timeSlotsEl.innerHTML = '';
                                    timeSlotsEl.appendChild(columnsContainer);
                                }
                            } else {
                                timeHeaderEl.innerHTML = `<span style="display: inline-block; animation: pulse 2s infinite ease-in-out;">${getText('selectDate')}</span>`;
                                timeSlotsEl.innerHTML = `<div style="text-align: center; padding: 20px 0; color: #666;">${getText('pleaseSelectDate')}</div>`;
                            }
                        }
                    },

                    attachCalendarEvents() {
                        // Navigation buttons
                        const prevBtn = formContainer.querySelector('.prev-btn');
                        const nextBtn = formContainer.querySelector('.next-btn');
                        
                        if (prevBtn) {
                            prevBtn.addEventListener("click", () => {
                                if (!this.state.isConfirmed) {
                                    this.state.currentDate = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() - 1, 1);
                                    this.renderCalendar();
                                }
                            });
                        }
                        
                        if (nextBtn) {
                            nextBtn.addEventListener("click", () => {
                                if (!this.state.isConfirmed) {
                                    this.state.currentDate = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 1);
                                    this.renderCalendar();
                                }
                            });
                        }
                    },

                    async initialize() {
                        this.state.workingDays = await fetchWorkingDays();
                        
                        if (!this.state.selectedDate) {
                            const defaultDay = this.getDefaultActiveDay();
                            this.state.selectedDate = defaultDay;
                            const dayKey = this.formatDate(defaultDay);
                            if (!this.state.availableSlots[dayKey]) {
                                const defaultSlots = await fetchAvailableSlots(dayKey);
                                this.state.availableSlots[dayKey] = defaultSlots;
                            }
                        }
                        
                        this.renderCalendar();
                        updateStep2NextButton();
                    }
                };

                // Form data store
                const formValues = {
                    reason: "",
                    selectedDate: null,
                    selectedTime: null
                };
                
                // Create form data and translations references
                const translations = FormManager.translations;

                function getText(key) {
                    return translations[language][key] || key;
                }

                function saveFormData() {
                    // Simple save to localStorage
                    try {
                        localStorage.setItem('rescheduleFormData', JSON.stringify(formValues));
                        localStorage.setItem('rescheduleFormStep', FormManager.currentStep);
                    } catch (e) {
                        console.error('Error saving form data:', e);
                    }
                }
                
                // Debounced validation functions
                const debouncedValidation = {
                    reason: debounce((value) => {
                        if (value && value.trim().length < 10) {
                            // Could add minimum length validation if needed
                        }
                    }, 300)
                };
                
                // ================================
                // CREATE CONTEXT OBJECT
                // ================================
                const context = {
                    language: language,
                    formValues: formValues,
                    translations: translations,
                    saveFormData: saveFormData,
                    debouncedValidation: debouncedValidation
                };

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
                    formContainer.classList.add("form-timeout");
                    disableAllFormElements();
                    const submitButton = formContainer.querySelector("#step2-next");
                    if (submitButton) {
                        submitButton.disabled = true;
                        submitButton.textContent = getText("timeExpired");
                        submitButton.classList.add("timeout-button");
                    }
                    formContainer.querySelectorAll(".btn-next")
                        .forEach(btn => {
                            btn.disabled = true;
                            btn.textContent = getText("timeExpired");
                            btn.classList.add("timeout-button");
                        });
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
                    formContainer.querySelectorAll('button, input, select, textarea, .day, .time-slot')
                        .forEach(el => {
                            el.disabled = true;
                            el.style.cursor = "not-allowed";
                        });
                }

                function updateStep2NextButton() {
                    const nextBtn = formContainer.querySelector("#step2-next");
                    if (nextBtn) {
                        nextBtn.disabled = !formValues.selectedDate || !formValues.selectedTime;
                        if (formValues.selectedDate && formValues.selectedTime) {
                            hideError('error-datetime', formContainer);
                        }
                    }
                }
                
                // ================================
                // CREATE FORM CONTAINER WITH COMPLETE HTML
                // ================================
                const formContainer = document.createElement("form");
                formContainer.setAttribute("novalidate", "true");
                formContainer.classList.add("chatbot-form");
                
                // Generate complete form HTML using ORANGE PALETTE from source form
                const formHTML = `
                    <style>
                        /* Using the ORANGE PALETTE from the source booking form */
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

                        /* ---------- ANIMATIONS ---------- */
                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                                transform: translateY(15px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
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

                        @keyframes slideDown {
                            from {
                                opacity: 0;
                                transform: translateY(-10px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes shake {
                            0%, 100% {
                                transform: translateX(0);
                            }
                            10%, 30%, 50%, 70%, 90% {
                                transform: translateX(-5px);
                            }
                            20%, 40%, 60%, 80% {
                                transform: translateX(5px);
                            }
                        }

                        @keyframes pulse {
                            0% {
                                transform: scale(1);
                                box-shadow: 0 0 0 0 rgba(233, 93, 44, 0.4);
                            }
                            70% {
                                transform: scale(1.05);
                                box-shadow: 0 0 0 15px rgba(233, 93, 44, 0);
                            }
                            100% {
                                transform: scale(1);
                            }
                        }

                        form.chatbot-form {
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                            min-width: 870px;
                            margin: 0 auto;
                            padding: 0;
                            border-radius: 12px;
                            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                            box-shadow: 0 8px 30px rgba(233, 93, 44, 0.12);
                            position: relative;
                            overflow: hidden;
                            animation: fadeIn 0.6s;
                            transition: all 0.3s ease;
                        }

                        form.chatbot-form:hover {
                            box-shadow: 0 12px 40px rgba(233, 93, 44, 0.15);
                        }

                        /* Two-column layout */
                        .row, .form-row, .flex-row {
                            display: flex;
                            flex-wrap: wrap;
                            margin: 0 -10px;
                            width: calc(100% + 20px);
                        }

                        .col, .form-col, .flex-row>div {
                            flex: 1 0 0;
                            padding: 0 10px;
                            min-width: 0;
                        }

                       

                        /* ---------- STEP PROGRESS INDICATOR ---------- */
                        .progress-container {
                            padding: 15px 25px 0px 25px;
                        }
                        
                        .progress-bar {
                            width: 100%;
                            height: 8px;
                            background-color: #e0e0e0;
                            border-radius: 4px;
                            overflow: hidden;
                            position: relative;
                        }

                        .progress-fill {
                            height: 100%;
                            background: linear-gradient(135deg, #e95d2c 0%, #b0cee2 100%);
                            transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1);
                            border-radius: 4px;
                        }

                        .step-info {
                            display: flex;
                            justify-content: space-between;
                            margin-top: 5px;
                            font-size: 16px;
                            font-weight: bold;
                            color: #666;
                        }

                        /* ---------- FORM STEPS & ANIMATIONS ---------- */
                        .step-container {
                            display: none;
                            animation: fadeIn 0.6s;
                        }

                        .step-container.active {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                            padding: 5px 30px 10px;
                        }

                        .step-container:not(.active) {
                            pointer-events: none;
                        }

                        /* ---------- FORM ELEMENTS ---------- */
                        .form-label, .question-label, .bold-label {
                            font-weight: 600;
                            color: #1a2730;
                            font-size: 15px;
                        }

                        .form-label.required::after {
                            content: " *";
                            
                            font-weight: bold;
                        }

                        .step-heading {
                            font-size: 26px;
                            color: #1a2730;
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
                            background: linear-gradient(90deg, #e95d2c, #b0cee2);
                            border-radius: 4px;
                        }

                        /* ========== Input Fields ========== */
                        input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"],
                        textarea, select {
                            width: 100%;
                            border: 2px solid #e0e0e0;
                            border-radius: 8px;
                            padding: 12px 16px;
                            font-size: 14px;
                            font-weight: 500;
                            transition: all 0.3s ease;
                            background-color: #fafafa;
                            color: #444;
                            position: relative;
                            overflow: hidden;
                            margin: 0px;
                            height: 54px;
                            font-family: inherit;
                        }

                        textarea {
                            height: auto;
                            min-height: 100px;
                            resize: vertical;
                        }

                        input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus,
                        input[type="url"]:focus, input[type="number"]:focus, textarea:focus, select:focus {
                            border-color: #e95d2c;
                            box-shadow: 0 0 0 3px rgba(233, 93, 44, 0.1);
                            outline: none;
                            background-color: #fff;
                            transform: translateY(-2px);
                        }

                        input[type="text"]:hover:not(:focus),input[type="url"]:hover:not(:focus), input[type="email"]:hover:not(:focus),
                        input[type="tel"]:hover:not(:focus), input[type="number"]:hover:not(:focus),
                        textarea:hover:not(:focus) {
                            border-color: #e95d2c;
                            background-color: rgba(247, 184, 153, 0.1);
                        }

                        /* ---------- CURRENT APPOINTMENT CARD ---------- */
                        .current-appointment-card {
                            border: 3px solid #e0e0e0;
                            border-radius: 20px;
                            padding: 25px;
                            margin: 20px 0;
                            background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                            transition: all 0.3s ease;
                        }

                        .current-appointment-card:hover {
                            border-color: #e95d2c;
                            box-shadow: 0 8px 25px rgba(233, 93, 44, 0.15);
                        }

                        .appointment-header {
                            display: flex;
                            align-items: center;
                            gap: 20px;
                        }

                        .appointment-icon {
                            width: 60px;
                            height: 60px;
                            background: linear-gradient(135deg, #e95d2c 0%, #b0cee2 100%);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
                        }

                        .appointment-info-title {
                            font-size: 22px;
                            color: #1a2730;
                            margin-bottom: 10px;
                            font-weight: 700;
                        }

                        .appointment-info p {
                            margin: 5px 0;
                            color: #555;
                            font-size: 16px;
                            line-height: 1.6;
                        }

                        /* ---------- SUMMARY CARD ---------- */
                        .summary-card {
                            border: 3px solid #e0e0e0;
                            border-radius: 20px;
                            padding: 25px;
                            margin: 20px 0;
                            background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                        }

                        .summary-section {
                            margin-bottom: 20px;
                            padding-bottom: 15px;
                            border-bottom: 1px solid #e0e0e0;
                        }

                        .summary-section:last-child {
                            border-bottom: none;
                            margin-bottom: 0;
                            padding-bottom: 0;
                        }

                        .summary-section-title {
                            font-size: 18px;
                            color: #1a2730;
                            margin-bottom: 8px;
                            font-weight: 700;
                        }

                        .summary-section p {
                            margin: 2px 0;
                            color: #555;
                            font-size: 15px;
                            line-height: 1.6;
                        }

                        /* ---------- ERROR MESSAGES ---------- */
                        .error-container {
                            width: 100%;
                            margin: 2px 0;
                            box-sizing: border-box;
                        }

                        .error-message {
                            color: white;
                            font-size: 13px;
                            margin-top: 8px;
                            display: none;
                            background: linear-gradient(135deg, #e52059 0%, #d32f2f 100%);
                            border-radius: 8px;
                            border: none;
                            padding: 12px 16px;
                            animation: shake 0.5s;
                            box-shadow: 0 4px 15px rgba(229, 32, 89, 0.3);
                        }

                        .error-message.show {
                            display: flex;
                            animation: slideIn 0.3s ease-out;
                        }

                        .error-icon {
                            width: 22px;
                            height: 22px;
                            min-width: 22px;
                            border-radius: 50%;
                            background-color: white;
                            
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
                        .form-buttons {
                            display: flex;
                            justify-content: space-between;
                            gap: 15px;
                        }

                        .btn {
                            padding: 14px 28px;
                            border: none;
                            border-radius: 8px;
                            font-size: 16px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
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
                                    rgba(255, 255, 255, 0) 0%,
                                    rgba(255, 255, 255, 0.2) 50%,
                                    rgba(255, 255, 255, 0) 100%);
                            transition: all 0.6s;
                        }

                        .btn:hover:not(:disabled)::after {
                            left: 100%;
                        }

                        .btn-prev {
                            background-color: #f0f0f0;
                            color: #1a2730;
                            border: 2px solid #e0e0e0;
                        }

                        .btn-prev:hover {
                            background-color: rgba(247, 184, 153, 0.1);
                            border-color: #e95d2c;
                            transform: translateY(-2px);
                            box-shadow: 0 4px 12px rgba(233, 93, 44, 0.2);
                        }

                        .btn-next, .btn-submit {
                            background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
                            color: white;
                            box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
                        }

                        .btn-next:hover, .btn-submit:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 6px 20px rgba(233, 93, 44, 0.4);
                        }

                        .btn:disabled {
                            cursor: not-allowed;
                            transform: none;
                            box-shadow: none; 
                            background: #45586c !important;
                        }

                        .btn:disabled::after {
                            display: none;
                        }

                        .form-buttons .btn:active {
                            transform: translateY(1px);
                            box-shadow: 0 2px 8px rgba(233, 93, 44, 0.2);
                        }

                        /* ---------- CALENDAR STYLES ---------- */
                        .calendar-container {
                            width: 100%;
                            max-width: 100%;
                            margin: 0 auto;
                            background: #fff;
                            border-radius: 12px;
                            box-shadow: 0 8px 30px rgba(233, 93, 44, 0.12);
                            overflow: hidden;
                            transition: all 0.4s ease;
                            position: relative;
                            animation: fadeIn 0.8s ease-out forwards;
                            border: 2px solid #e0e0e0;
                        }

                        .calendar-header {
                            padding: 20px;
                            background: linear-gradient(90deg, #e95d2c, #b0cee2);
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            color: white;
                            position: relative;
                        }

                        .calendar-title {
                            display: flex;
                            align-items: center;
                            gap: 20px;
                        }

                        .service-provider {
                            display: flex;
                            align-items: center;
                            font-size: 20px;
                            font-weight: 600;
                            color: white;
                        }

                        .provider-icon {
                            width: 32px;
                            height: 32px;
                            margin-right: 16px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .provider-icon svg {
                            filter: brightness(0) invert(1);
                        }

                        .calendar-nav {
                            display: flex;
                            align-items: center;
                            gap: 24px;
                        }

                        .nav-btn {
                            width: 48px;
                            height: 48px;
                            background: rgba(255, 255, 255, 0.15);
                            border: none;
                            border-radius: 16px;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.4s ease;
                            color: white;
                        }

                        .nav-btn:hover:not(:disabled) {
                            background: rgba(255, 255, 255, 0.25);
                            transform: scale(1.1);
                        }

                        .nav-btn:disabled {
                            opacity: 0.3;
                            cursor: not-allowed;
                            transform: none;
                        }

                        .current-date {
                            font-size: 18px;
                            font-weight: 700;
                            color: white;
                            padding: 14px 24px;
                            background: rgba(255, 255, 255, 0.15);
                            border-radius: 25px;
                        }

                        .calendar-body {
                            display: flex;
                            background: linear-gradient(to bottom, #ffffff, #fefeff);
                        }

                        .days-container {
                            width: 47%;
                            padding: 20px;
                            background: #fff;
                            border-right: 2px solid #e0e0e0;
                        }

                        .weekdays {
                            display: grid;
                            grid-template-columns: repeat(7, 1fr);
                            text-align: center;
                            font-weight: 700;
                            font-size: 13px;
                            color: #e95d2c;
                            text-transform: uppercase;
                        }

                        .days {
                            display: grid;
                            grid-template-columns: repeat(7, 1fr);
                            gap: 2px;
                        }

                        .day {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 40px;
                            width: 40px;
                            cursor: pointer;
                            position: relative;
                            font-size: 15px;
                            font-weight: 600;
                            transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                            margin: 10px auto auto auto;
                            border: 3px solid transparent;
                            border-radius: 16px;
                            color: #1a2730;
                        }

                        .day:hover:not(.inactive) {
                            background: rgba(247, 184, 153, 0.1);
                            color: #e95d2c;
                            border-color: #e95d2c;
                            transform: scale(1.1);
                        }

                        .day.available::after {
                            content: "";
                            position: absolute;
                            bottom: 0px;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: #e95d2c;
                            opacity: 0.7;
                        }

                        .day.today {
                            border-color: #b0cee2;
                            background: #b0cee2;
                            font-weight: 700;
                        }

                        .day.active {
                            background: #e95d2c;
                            color: white;
                            border-color: #e95d2c;
                            font-weight: 700;
                            box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
                        }

                        .day.active::after {
                            display: none;
                        }

                        .day.inactive {
                            color: #ccc;
                            cursor: default;
                            opacity: 0.3;
                        }

                        .day.inactive:hover {
                            transform: none;
                            background: transparent;
                            border-color: transparent;
                        }

                        .times-container {
                            width: 53%;
                            padding: 10px;
                            background: #fafafa;
                            overflow-y: auto;
                            max-height: 400px;
                        }

                        .time-header {
                            font-size: 20px;
                            font-weight: 800;
                            color: #1a2730;
                            text-align: center;
                            margin-bottom: 20px;
                            padding-bottom: 10px;
                            position: relative;
                        }

                        .time-header::after {
                            content: '';
                            position: absolute;
                            bottom: 0;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 80px;
                            height: 4px;
                            background: linear-gradient(90deg, #e95d2c, #b0cee2);
                            border-radius: 4px;
                        }

                        .time-slots-columns {
                            display: flex;
                            gap: 20px;
                        }

                        .time-slots-column {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                            align-items: center;
                        }

                        .time-slots-column > div:first-child {
                            font-weight: 800;
                            color: #e95d2c;
                            font-size: 16px;
                        }

                        .time-slot {
                            padding: 16px 20px;
                            border-radius: 16px;
                            text-align: center;
                            cursor: pointer;
                            transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                            border: 3px solid #e0e0e0;
                            background: #fff;
                            color: #1a2730;
                            font-size: 15px;
                            font-weight: 600;
                            position: relative;
                            overflow: hidden;
                            width: 95%;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                        }

                        .time-slot.available:hover:not(.selected) {
                            background: rgba(247, 184, 153, 0.1);
                            color: #e95d2c;
                            border-color: #e95d2c;
                            transform: translateY(-3px);
                            box-shadow: 0 4px 12px rgba(233, 93, 44, 0.2);
                        }

                        .time-slot.selected {
                            background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
                            color: white;
                            border-color: #e95d2c;
                            font-weight: 700;
                            box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
                            transform: translateY(-3px);
                        }

                        /* ---------- SUCCESS SECTION ---------- */
                        .success-section {
                            display: none;
                            text-align: center;
                            padding: 40px;
                            animation: fadeIn 1s ease-out;
                            background: linear-gradient(to bottom, #ffffff, #fefeff);
                            position: relative;
                        }

                        .success-section.active {
                            display: block;
                        }

                        .success-icon {
                            width: 120px;
                            height: 120px;
                            background: linear-gradient(135deg, #e95d2c 0%, #b0cee2 100%);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 32px;
                            animation: pulse 3s infinite;
                            color: white;
                            font-size: 56px;
                            box-shadow: 0 8px 30px rgba(233, 93, 44, 0.12);
                        }

                        .success-icon svg {
                            width: 56px;
                            height: 56px;
                        }

                        .success-title {
                            font-size: 32px;
                            color: #1a2730;
                            margin-bottom: 20px;
                            font-weight: 800;
                        }

                        .success-message {
                            font-size: 18px;
                            color: #555;
                            margin-bottom: 40px;
                            line-height: 1.7;
                            max-width: 650px;
                            margin-left: auto;
                            margin-right: auto;
                        }

                        /* ---------- FORM TIMEOUT STYLES ---------- */
                        .chatbot-form.form-timeout {
                            background-color: #e52059 !important;
                            transition: background-color 0.5s ease;
                        }
                        
                        .chatbot-form.form-timeout .step-container,
                        .chatbot-form.form-timeout .success-section,
                        .chatbot-form.form-timeout .progress-container {
                            background-color: transparent !important;
                        }

                        /* Disabled form styles */
                        .form-timeout input, 
                        .form-timeout button, 
                        .form-timeout select, 
                        .form-timeout textarea, 
                        .form-timeout .day,
                        .form-timeout .time-slot {
                            pointer-events: none;
                            opacity: 0.4;
                            cursor: not-allowed !important;
                        }

                        /* ---------- RESPONSIVE DESIGN ---------- */
                        @media (max-width: 767px) {
                            .flex-row {
                                display: flex;
                                margin: 0;
                                width: 100%;
                                gap: 20px;
                                flex-direction: column;
                            }
                            
                            .step-container.active {
                                padding: 5px 15px 10px;
                            }
                            
                            .flex-row > div {
                                width: 100%;
                                padding: 0;
                                margin-bottom: 0px;
                            }
                        }

                        @media (max-width: 768px) {
                            .form-title {
                                font-size: 22px;
                            }
                            

                            .step-heading {
                                font-size: 22px;
                            }
                            
                            .btn {
                                padding: 12px 18px;
                                font-size: 15px;
                            }
                            
                            .calendar-body {
                                flex-direction: column;
                            }
                            
                            .days-container,
                            .times-container {
                                width: 100%;
                                padding: 20px;
                            }
                            
                            .times-container {
                                border-right: none;
                                border-top: 2px solid #e0e0e0;
                            }
                        }

                        @media (max-width: 480px) {
                            form.chatbot-form {
                                min-width: 200px;
                            }
                            

                            
                            .step-heading {
                                font-size: 18px;
                            }

                        }

                        /* ---------- FOCUS STYLES FOR ACCESSIBILITY ---------- */
                        input:focus-visible, button:focus-visible, textarea:focus-visible {
                            outline: 2px solid #e95d2c;
                            outline-offset: 2px;
                        }

                        /* ===== STATS/NUMÉROS ===== */
                        .stats7_number {
                            background: linear-gradient(45deg, #e95d2c, #1a2730) !important;
                            -webkit-background-clip: text !important;
                            -webkit-text-fill-color: transparent !important;
                            background-clip: text !important;
                        }

                        /* ===== BOUTONS TIMEOUT ===== */
                        .timeout-button {
                            background: #45586c !important;
                        }
                    </style>
                    
                    <!-- Progress Bar -->
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill"></div>
                        </div>
                        <div class="step-info">
                            <span>Étape <span class="current-step" id="current-step">1</span> sur ${totalSteps}</span>
                            <span id="step-title">${getText('step1Title')}</span>
                        </div>
                    </div>

                    <!-- Success Screen -->
                    <div class="success-section" id="success-content">
                        <div class="success-icon">
                            ${FormManager.constants.SVG.SUCCESS}
                        </div>
                        <div class="success-title">${getText('confirmationTitle')}</div>
                        <p class="success-message">${getText('confirmationMessage')}</p>
                    </div>

                    <!-- Dynamic Steps Generation -->
                    ${generateStep1(formContainer, context)}
                    ${generateStep2(formContainer, context)}
                `;
                
                // Set the generated HTML
                formContainer.innerHTML = formHTML;
                // Add to page
                element.appendChild(formContainer);
                
                

                
                // ================================
                // FORM NAVIGATION LOGIC
                // ================================
                function showStep(stepNumber) {
                    formContainer.querySelectorAll('.step-container')
                        .forEach(step => {
                            step.classList.remove('active');
                        });
                    formContainer.querySelector(`#step-${stepNumber}`)
                        .classList.add('active');
                    FormManager.currentStep = stepNumber;
                    updateProgressBar();
                    
                    // Scroll to top of form
                    formContainer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                function updateProgressBar() {
                    const progressFill = formContainer.querySelector('#progress-fill');
                    const currentStepElement = formContainer.querySelector('#current-step');
                    const stepTitleElement = formContainer.querySelector('#step-title');
                    if (progressFill) {
                        const progress = ((FormManager.currentStep - 1) / (totalSteps - 1)) * 100;
                        progressFill.style.width = `${progress}%`;
                    }
                    if (currentStepElement) {
                        currentStepElement.textContent = FormManager.currentStep;
                    }
                    if (stepTitleElement) {
                        const stepTitles = [
                            getText('step1Title'), getText('step2Title')
                        ];
                        const newTitle = stepTitles[FormManager.currentStep - 1] || '';
                        stepTitleElement.textContent = newTitle;
                    }
                }

                function showSuccessScreen() {
                    // Hide all step containers
                    formContainer.querySelectorAll('.step-container')
                        .forEach(step => {
                            step.classList.remove('active');
                        });
                    
                    // Hide progress bar since we're done
                    const progressContainer = formContainer.querySelector('.progress-container');
                    if (progressContainer) {
                        progressContainer.style.display = 'none';
                    }
                    
                    // Show success screen
                    formContainer.querySelector('#success-content')
                        .classList.add('active');
                    
                    isFormSubmitted = true;
                    if (formTimeoutId) {
                        clearInterval(formTimeoutId);
                    }
                }

                // ================================
                // EVENT LISTENERS
                // ================================
                
                // Step navigation
                formContainer.querySelector('#step1-next').addEventListener('click', function () {
                    if (validateStep1(formValues, formContainer, context)) {
                        showStep(2);
                        // Initialize calendar when reaching step 2
                        CalendarReschedule.initialize();
                    }
                });

                formContainer.querySelector('#step2-prev').addEventListener('click', () => showStep(1));
                
                // Step 2 Next button (Reschedule button)
                formContainer.querySelector('#step2-next').addEventListener('click', async function () {
                    if (validateStep2(formValues, formContainer, context)) {
                        const submitBtn = this;
                        submitBtn.disabled = true;
                        submitBtn.textContent = getText('confirming');
                        
                        try {
                            const rescheduleResponse = await rescheduleBooking(formValues.selectedTime, formValues.reason);
                            
                            if (rescheduleResponse) {
                                showSuccessScreen();
                                
                                const dateStr = CalendarReschedule.formatDate(formValues.selectedDate);
                                const formattedDate = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                }).format(formValues.selectedDate);
                                const formattedTime = new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { 
                                    hour: 'numeric', 
                                    minute: '2-digit', 
                                    hour12: true 
                                }).format(new Date(formValues.selectedTime));
                                const formattedDateTime = `${formattedDate} ${language === "fr" ? "à" : "at"} ${formattedTime}`;

                                const submissionData = { 
                                    email: email,
                                    date: dateStr,
                                    time: formValues.selectedTime,
                                    formattedDate,
                                    formattedTime,
                                    formattedDateTime,
                                    reschedulingReason: formValues.reason,
                                    uid: uid
                                };
                                
                                if (vf) {
                                    window.voiceflow.chat.interact({
                                        type: "complete",
                                        payload: submissionData
                                    });
                                }
                            }
                        } catch (err) {
                            console.error("Rescheduling error:", err);
                            submitBtn.disabled = false;
                            submitBtn.textContent = getText('submit');
                            // Show error message
                            alert(getText('errorOccurred') + ': ' + err.message);
                        }
                    }
                });

                // Initialize progress bar and start timer
                updateProgressBar();
                startFormTimer();
            }
        };
		
		const CancellationExtension = {
            name: "CancellationCalendar",
            type: "response",
            match: ({trace}) => trace.type === "ext_cancellation_calendar" || trace.payload?.name === "ext_cancellation_calendar",
            render: ({trace, element}) => {
                
                // Get payload data
                const {
                    apiKey = "cal_live_2bb06ee039ec6c015b8cf8350419d9dc",
                    language = "fr", 
                    timezone = "America/Toronto",
                    uid = "98LN4drSyLn6RFsHMDodPS",
                    vf
                } = trace.payload || {};

                // Initialize variables
                let isFormSubmitted = false;
                const TIMEOUT_DURATION = 300000; // 5 minutes
                let formTimeoutId = null;

                function debounce(func, wait) {
                    let timeout;
                    return function executedFunction(...args) {
                        const later = () => {
                            clearTimeout(timeout);
                            func(...args);
                        };
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                    };
                }

                function isValidEmail(email) {
                    return FormManager.validation.email(email);
                }

                // Conditional section helpers
                function showConditionalSection(sectionId, container) {
                    const element = container.querySelector(sectionId);
                    if (element) {
                        element.style.removeProperty('display');
                        element.style.setProperty('display', 'flex', 'important');
                        element.setAttribute('aria-hidden', 'false');
                        element.classList.add('visible');
                    }
                }

                function hideConditionalSection(sectionId, container) {
                    const element = container.querySelector(sectionId);
                    if (element) {
                        element.style.setProperty('display', 'none', 'important');
                        element.setAttribute('aria-hidden', 'true');
                        element.classList.remove('visible');
                    }
                }
                
                const FormManager = {
                    // ================================
                    // CONSTANTES SVG
                    // ================================
                    constants: {
                        SVG: {
                            CHECK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12px" height="12px">
                                        <path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                    </svg>`,
                            CHEVRON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
                                        <g transform="translate(75, 75)">
                                            <path fill="#ffffff" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                                        </g>
                                    </svg>`,
                            CLOSE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="8px" height="8px">
                                        <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                    </svg>`,
                            CANCEL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
                                        <path fill="#ffffff" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
                                    </svg>`,
							SUCCESS:`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
										<polyline points="22 4 12 14.01 9 11.01"></polyline>
									</svg>`
                        }
                    },

                    // ================================
                    // HELPER FUNCTIONS
                    // ================================
                    
                    // Function to create input fields
                    createInputField(config) {
                        const {type = 'text', id, labelKey, placeholderKey, formField, required = false, errorId, validator, container, context} = config;
                        const {language, formValues, translations} = context;
                        const getText = (key) => translations[language][key] || key;
                        const inputType = ['email', 'tel', 'text', 'textarea'].includes(type) ? type : 'text';
                        const requiredClass = required ? 'required' : '';
                        
                        const isTextarea = type === 'textarea';
                        const inputElement = isTextarea ? 
                            `<textarea id="${id}" name="${formField}" rows="4" placeholder="${getText(placeholderKey)}"></textarea>` :
                            `<input type="${inputType}" id="${id}" name="${formField}" placeholder="${getText(placeholderKey)}" />`;
                        
                        const html = `
                            <div class="form-group">
                                <label class="form-label ${requiredClass}" for="${id}" id="${id}-label">
                                    ${getText(labelKey)}
                                </label>
                                ${inputElement}
                                ${required && errorId ? `<div class="error-message" id="${errorId}">
                                    <div class="error-icon">!</div>
                                    <span class="error-text">${getText('fieldRequired')}</span>
                                </div>` : ''}
                            </div>
                        `;
                        
                        // Add event listeners after DOM insertion
                        setTimeout(() => {
                            if (container) {
                                const inputEl = container.querySelector(`#${id}`);
                                if (inputEl) {
                                    inputEl.addEventListener('input', function () {
                                        formValues[formField] = this.value.trim();
                                        if (this.value.trim() && errorId) {
                                            const errorEl = container.querySelector(`#${errorId}`);
                                            if (errorEl) errorEl.classList.remove('show');
                                        }
                                        if (validator && this.value.trim()) {
                                            const isValid = validator(this.value.trim());
                                            if (!isValid && errorId) {
                                                const errorEl = container.querySelector(`#${errorId}`);
                                                if (errorEl) errorEl.classList.add('show');
                                            }
                                        }
                                        if (type === 'email' && this.value.trim() && context.debouncedValidation) {
                                            context.debouncedValidation.email(this.value.trim());
                                        }
                                        if (context.saveFormData) context.saveFormData();
                                    });
                                }
                            }
                        }, 0);
                        return html;
                    },

                    // Validation helper
                    validation: {
                        email(email) {
                            const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
                            return emailPattern.test(email);
                        }
                    },

                    // ================================
                    // TRANSLATIONS  
                    // ================================
                    translations: {
                        "fr": {
                            formTitle: "Annuler Votre Rendez-vous",
                            // Main step
                            mainTitle: "Informations du Rendez-vous",
                            // Button
                            cancelButton: "Annuler le Rendez-vous",
                            processing: "Traitement en cours...",
                            submitted: "Annulé avec succès !",
                            // Booking information
                            bookingInfo: "Informations de Réservation",
                            bookingNumber: "Numéro de Réservation",
                            status: "Statut", 
                            title: "Titre",
                            when: "Quand",
                            host: "Hôte",
                            attendee: "Participant",
                            email: "Courriel",
                            cancellationReason: "Raison de l'annulation",
                            cancellationReasonPlaceholder: "Pourquoi souhaitez-vous annuler ce rendez-vous ?",
                            // Validation messages
                            fieldRequired: "Ce champ est requis",
                            reasonRequired: "Veuillez indiquer la raison de l'annulation",
                            noBookingData: "Impossible de charger les détails de la réservation",
                            // States
                            confirmed: "Confirmé",
                            cancelled: "Annulé ✓",
                            timeExpired: "Temps expiré",
                            errorOccurred: "Une erreur s'est produite",
                            tryAgain: "Veuillez réessayer",
                            cancelling: "Annulation en cours...",
                            // Confirmation
                            confirmationTitle: "Rendez-vous Annulé !",
                            confirmationMessage: "Votre rendez-vous a été annulé avec succès. Vous recevrez sous peu un email de confirmation.",
                            backToForm: "Retour au formulaire",
                            // Summary
                            cancelledAppointment: "Rendez-vous annulé",
                            reason: "Raison"
                        },
                        "en": {
                            formTitle: "Cancel Your Appointment",
                            // Main step
                            mainTitle: "Appointment Information",
                            // Button
                            cancelButton: "Cancel Appointment",
                            processing: "Processing...",
                            submitted: "Successfully Cancelled!",
                            // Booking information
                            bookingInfo: "Booking Information",
                            bookingNumber: "Booking Number",
                            status: "Status",
                            title: "Title", 
                            when: "When",
                            host: "Host",
                            attendee: "Participant",
                            email: "Email",
                            cancellationReason: "Reason for cancellation",
                            cancellationReasonPlaceholder: "Why do you want to cancel this appointment?",
                            // Validation messages
                            fieldRequired: "This field is required",
                            reasonRequired: "Please provide a reason for cancellation",
                            noBookingData: "Unable to load booking details",
                            // States
                            confirmed: "Confirmed",
                            cancelled: "Cancelled ✓",
                            timeExpired: "Time Expired",
                            errorOccurred: "An error occurred",
                            tryAgain: "Please try again",
                            cancelling: "Cancelling...",
                            // Confirmation
                            confirmationTitle: "Appointment Cancelled!",
                            confirmationMessage: "Your appointment has been successfully cancelled. You will receive a confirmation email shortly.",
                            backToForm: "Return to Form",
                            // Summary
                            cancelledAppointment: "Cancelled appointment",
                            reason: "Reason"
                        }
                    }
                };

                // API Functions
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
                            throw new Error(`HTTP error! status: ${res.status}`);
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

                // Format date function
                function formatDateRange(startDate, endDate, language, timezone) {
                    const locale = language === 'fr' ? 'fr-CA' : 'en-US';
                    const dateFormatter = new Intl.DateTimeFormat(locale, {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        timeZone: timezone
                    });
                    const timeFormatter = new Intl.DateTimeFormat(locale, {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        timeZone: timezone
                    });
                    const datePart = dateFormatter.format(startDate);
                    let startTime = timeFormatter.format(startDate).replace(":", "h");
                    let endTime = timeFormatter.format(endDate).replace(":", "h");
                    return `${datePart} de ${startTime} à ${endTime}`;
                }

                /*************************************************************
                * MAIN STEP GENERATION FUNCTION
                *************************************************************/
                function generateMainStep(formContainer, context) {
                    const {language, translations} = context;
                    const getText = (key) => translations[language][key] || key;
                    
                    return `
                        <div class="step-container active" id="main-step">
                            <span class="step-heading">${getText('mainTitle')}</span>
                            
                            <div class="booking-card">
                                <div class="booking-header">
                                    
                                    <div class="booking-info">
                                        <div class="booking-info-title">${getText('bookingInfo')}</div>
                                        <div id="booking-details">
                                            ${formValues.booking ? renderBookingDetails(formValues.booking, getText) : `<p class="no-booking">${getText('noBookingData')}</p>`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            ${FormManager.createInputField({
                                type: 'textarea',
                                id: 'cancellation-reason',
                                labelKey: 'cancellationReason',
                                placeholderKey: 'cancellationReasonPlaceholder',
                                formField: 'reason',
                                required: true,
                                errorId: 'error-reason',
                                container: formContainer,
                                context: context
                            })}
                            
                            <div class="form-buttons">
                                <div></div>
                                <button type="button" class="btn btn-cancel" id="cancel-button">${getText('cancelButton')}</button>
                            </div>
                        </div>
                    `;
                }

                function renderBookingDetails(booking, getText) {
                    if (!booking) {
                        return `<p class="no-booking">${getText('noBookingData')}</p>`;
                    }
                    
                    let html = '';
                    
                    if (booking.id) {
                        html += `<div class="info-line">
                            <div class="info-label">${getText('bookingNumber')}:</div>
                            <div class="info-value">${booking.id}</div>
                        </div>`;
                    }
                    
                    let displayStatus = booking.status || "";
                    if (displayStatus === "cancelled") {
                        displayStatus = (language === 'fr') ? "Confirmé" : "Confirmed";
                    } else if (language === 'fr' && displayStatus === "accepted") {
                        displayStatus = "Actif";
                    }
                    html += `<div class="info-line">
                        <div class="info-label">${getText('status')}:</div>
                        <div class="info-value">${displayStatus}</div>
                    </div>`;
                    
                    if (booking.start && booking.end) {
                        const startDate = new Date(booking.start);
                        const endDate = new Date(booking.end);
                        const formatted = formatDateRange(startDate, endDate, language, timezone);
                        html += `<div class="info-line">
                            <div class="info-label">${getText('when')}:</div>
                            <div class="info-value">${formatted}</div>
                        </div>`;
                    }
                    
                    if (booking.hosts && booking.hosts.length > 0) {
                        html += `<div class="info-line">
                            <div class="info-label">${getText('host')}:</div>
                            <div class="info-value">${booking.hosts[0].name}</div>
                        </div>`;
                    }
                    
                    if (booking.attendees && booking.attendees.length > 0) {
                        html += `<div class="info-line">
                            <div class="info-label">${getText('attendee')}:</div>
                            <div class="info-value">${booking.attendees[0].name}</div>
                        </div>`;
                        html += `<div class="info-line">
                            <div class="info-label">${getText('email')}:</div>
                            <div class="info-value">${booking.attendees[0].email}</div>
                        </div>`;
                    }
                    
                    return html;
                }

                /*************************************************************
                * VALIDATION FUNCTIONS  
                *************************************************************/
                function showError(errorId, messageKey, container, context) {
                    const {language, translations} = context;
                    const getText = (key) => translations[language][key] || key;
                    const errorElement = container.querySelector(`#${errorId}`);
                    if (errorElement) {
                        const errorTextElement = errorElement.querySelector('.error-text');
                        if (errorTextElement) {
                            errorTextElement.textContent = getText(messageKey);
                        } else {
                            errorElement.innerHTML = `
                                <div class="error-icon">!</div>
                                <span class="error-text">${getText(messageKey)}</span>
                            `;
                        }
                        errorElement.classList.add('show');
                    }
                }

                function hideError(errorId, container) {
                    const errorElement = container.querySelector(`#${errorId}`);
                    if (errorElement) {
                        errorElement.classList.remove('show');
                    }
                }

                function validateCancellation(formValues, container, context) {
                    if (!formValues.reason || formValues.reason.trim() === '') {
                        showError('error-reason', 'reasonRequired', container, context);
                        return false;
                    }
                    return true;
                }

                // Form data store
                const formValues = {
                    reason: "",
                    booking: null
                };
                
                // Create form data and translations references
                const translations = FormManager.translations;

                function getText(key) {
                    return translations[language][key] || key;
                }

                function saveFormData() {
                    // Simple save to localStorage
                    try {
                        localStorage.setItem('cancellationFormData', JSON.stringify(formValues));
                        localStorage.setItem('cancellationFormStep', FormManager.currentStep);
                    } catch (e) {
                        console.error('Error saving form data:', e);
                    }
                }
                
                // Debounced validation functions
                const debouncedValidation = {
                    reason: debounce((value) => {
                        if (value && value.trim().length < 10) {
                            // Could add minimum length validation if needed
                        }
                    }, 300)
                };
                
                // ================================
                // CREATE CONTEXT OBJECT
                // ================================
                const context = {
                    language: language,
                    formValues: formValues,
                    translations: translations,
                    saveFormData: saveFormData,
                    debouncedValidation: debouncedValidation
                };

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
                    formContainer.classList.add("form-timeout");
                    disableAllFormElements();
                    const cancelButton = formContainer.querySelector("#cancel-button");
                    if (cancelButton) {
                        cancelButton.disabled = true;
                        cancelButton.textContent = getText("timeExpired");
                        cancelButton.classList.add("timeout-button");
                    }
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
                    formContainer.querySelectorAll('button, input, select, textarea')
                        .forEach(el => {
                            el.disabled = true;
                            el.style.cursor = "not-allowed";
                        });
                }
                
                // ================================
                // CREATE FORM CONTAINER WITH COMPLETE HTML
                // ================================
                const formContainer = document.createElement("form");
                formContainer.setAttribute("novalidate", "true");
                formContainer.classList.add("chatbot-form");
                
                // Generate complete form HTML using same CSS from booking form
                const formHTML = `
                    <style>
                        /* Using the exact same CSS from the booking form template with orange palette */
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

                        /* ---------- ANIMATIONS ---------- */
                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                                transform: translateY(15px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
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

                        @keyframes slideDown {
                            from {
                                opacity: 0;
                                transform: translateY(-10px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes shake {
                            0%, 100% {
                                transform: translateX(0);
                            }
                            10%, 30%, 50%, 70%, 90% {
                                transform: translateX(-5px);
                            }
                            20%, 40%, 60%, 80% {
                                transform: translateX(5px);
                            }
                        }

                        @keyframes pulse {
                            0% {
                                transform: scale(1);
                                box-shadow: 0 0 0 0 rgba(233, 93, 44, 0.4);
                            }
                            70% {
                                transform: scale(1.05);
                                box-shadow: 0 0 0 15px rgba(233, 93, 44, 0);
                            }
                            100% {
                                transform: scale(1);
                            }
                        }

                        form.chatbot-form {
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                            min-width: 870px;
                            margin: 0 auto;
                            padding: 0;
                            border-radius: 12px;
                            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                            box-shadow: 0 8px 30px rgba(233, 93, 44, 0.12);
                            position: relative;
                            overflow: hidden;
                            animation: fadeIn 0.6s;
                            transition: all 0.3s ease;
                        }

                        form.chatbot-form:hover {
                            box-shadow: 0 12px 40px rgba(233, 93, 44, 0.15);
                        }

                        /* Two-column layout */
                        .row, .form-row, .flex-row {
                            display: flex;
                            flex-wrap: wrap;
                            margin: 0 -10px;
                            width: calc(100% + 20px);
                        }

                        .col, .form-col, .flex-row>div {
                            flex: 1 0 0;
                            padding: 0 10px;
                            min-width: 0;
                        }

                        

                        /* ---------- STEP PROGRESS INDICATOR ---------- */
                        .progress-container {
                            padding: 15px 25px 0px 25px;
                        }
                        
                        .progress-bar {
                            width: 100%;
                            height: 8px;
                            background-color: #e0e0e0;
                            border-radius: 4px;
                            overflow: hidden;
                            position: relative;
                        }

                        .progress-fill {
                            height: 100%;
                            background: linear-gradient(135deg, #e95d2c 0%, #b0cee2 100%);
                            transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1);
                            border-radius: 4px;
                        }

                        .step-info {
                            display: flex;
                            justify-content: space-between;
                            margin-top: 5px;
                            font-size: 16px;
                            font-weight: bold;
                            color: #666;
                        }

                        /* ---------- FORM STEPS & ANIMATIONS ---------- */
                        .step-container {
                            display: none;
                            animation: fadeIn 0.6s;
                        }

                        .step-container.active {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                            padding: 5px 30px 10px;
                        }

                        .step-container:not(.active) {
                            pointer-events: none;
                        }

                        /* ---------- FORM ELEMENTS ---------- */
                        .form-label, .question-label, .bold-label {
                            font-weight: 600;
                            color: #1a2730;
                            font-size: 15px;
                        }

                        .form-label.required::after {
                            content: " *";
                            
                            font-weight: bold;
                        }

                        .step-heading {
                            font-size: 26px;
                            color: #1a2730;
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
                            background: linear-gradient(90deg, #e95d2c, #b0cee2);
                            border-radius: 4px;
                        }

                        /* ========== Input Fields ========== */
                        input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"],
                        textarea, select {
                            width: 100%;
                            border: 2px solid #e0e0e0;
                            border-radius: 8px;
                            padding: 12px 16px;
                            font-size: 14px;
                            font-weight: 500;
                            transition: all 0.3s ease;
                            background-color: #fafafa;
                            color: #444;
                            position: relative;
                            overflow: hidden;
                            margin: 0px;
                            height: 54px;
                            font-family: inherit;
                        }

                        textarea {
                            height: auto;
                            min-height: 100px;
                            resize: vertical;
                        }

                        input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus,
                        input[type="url"]:focus, input[type="number"]:focus, textarea:focus, select:focus {
                            border-color: #e95d2c;
                            box-shadow: 0 0 0 3px rgba(233, 93, 44, 0.1);
                            outline: none;
                            background-color: #fff;
                            transform: translateY(-2px);
                        }

                        input[type="text"]:hover:not(:focus),input[type="url"]:hover:not(:focus), input[type="email"]:hover:not(:focus),
                        input[type="tel"]:hover:not(:focus), input[type="number"]:hover:not(:focus),
                        textarea:hover:not(:focus) {
                            border-color: #e95d2c;
                            background-color: rgba(247, 184, 153, 0.1);
                        }

                        /* ---------- BOOKING CARD ---------- */
                        .booking-card {
                            border: 3px solid #e0e0e0;
                            border-radius: 20px;
                            padding: 25px;
                            margin: 20px 0;
                            background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                            transition: all 0.3s ease;
                        }

                        .booking-card:hover {
                            border-color: #e95d2c;
                            box-shadow: 0 8px 25px rgba(233, 93, 44, 0.15);
                        }

                        .booking-header {
                            display: block;
                        }

                        .booking-icon {
                            width: 60px;
                            height: 60px;
                            background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
                        }

                        .booking-info-title {
                            font-size: 22px;
                            color: #1a2730;
                            margin-bottom: 10px;
                            font-weight: 700;
                        }

                        .info-line {
                            display: flex;
                            font-size: 14px;
                            line-height: 1.5;
                            padding: 8px 0;
                            border-bottom: 1px solid #f5f5f5;
                            transition: all 0.3s ease;
                        }

                        .info-line:last-child {
                            border-bottom: none;
                        }

                        .info-line:hover {
                            background-color: rgba(233, 93, 44, 0.02);
                            padding-left: 8px;
                            border-radius: 4px;
                        }

                        .info-label {
                            font-weight: 600;
                            width: 180px;
                            min-width: 180px;
                            color: #333;
                            font-size: 14px;
                        }

                        .info-value {
                            flex: 1;
                            color: #555;
                            font-size: 14px;
                        }

                        .no-booking {
                            color: #666;
                            font-style: italic;
                            text-align: center;
                            padding: 20px;
                            background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%);
                            border-radius: 8px;
                            border: 1px dashed #ddd;
                            animation: fadeIn 0.5s ease-out;
                        }

                        /* ---------- SUMMARY CARD ---------- */
                        .summary-card {
                            border: 3px solid #e0e0e0;
                            border-radius: 20px;
                            padding: 25px;
                            margin: 20px 0;
                            background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                        }

                        .summary-section {
                            margin-bottom: 20px;
                            padding-bottom: 15px;
                            border-bottom: 1px solid #e0e0e0;
                        }

                        .summary-section:last-child {
                            border-bottom: none;
                            margin-bottom: 0;
                            padding-bottom: 0;
                        }

                        .summary-section-title {
                            font-size: 18px;
                            color: #1a2730;
                            margin-bottom: 8px;
                            font-weight: 700;
                        }

                        .summary-section p {
                            margin: 2px 0;
                            color: #555;
                            font-size: 15px;
                            line-height: 1.6;
                        }

                        /* ---------- ERROR MESSAGES ---------- */
                        .error-container {
                            width: 100%;
                            margin: 2px 0;
                            box-sizing: border-box;
                        }

                        .error-message {
                            color: white;
                            font-size: 13px;
                            margin-top: 8px;
                            display: none;
                            background: linear-gradient(135deg, #e52059 0%, #d32f2f 100%);
                            border-radius: 8px;
                            border: none;
                            padding: 12px 16px;
                            animation: shake 0.5s;
                            box-shadow: 0 4px 15px rgba(229, 32, 89, 0.3);
                        }

                        .error-message.show {
                            display: flex;
                            animation: slideIn 0.3s ease-out;
                        }

                        .error-icon {
                            width: 22px;
                            height: 22px;
                            min-width: 22px;
                            border-radius: 50%;
                            background-color: white;
                            
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
                        .form-buttons {
                            display: flex;
                            justify-content: space-between;
                            gap: 15px;
                        }

                        .btn {
                            padding: 14px 28px;
                            border: none;
                            border-radius: 8px;
                            font-size: 16px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
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
                                    rgba(255, 255, 255, 0) 0%,
                                    rgba(255, 255, 255, 0.2) 50%,
                                    rgba(255, 255, 255, 0) 100%);
                            transition: all 0.6s;
                        }

                        .btn:hover:not(:disabled)::after {
                            left: 100%;
                        }

                        .btn-prev {
                            background-color: #f0f0f0;
                            color: #1a2730;
                            border: 2px solid #e0e0e0;
                        }

                        .btn-prev:hover {
                            background-color: rgba(247, 184, 153, 0.1);
                            border-color: #e95d2c;
                            transform: translateY(-2px);
                            box-shadow: 0 4px 12px rgba(233, 93, 44, 0.2);
                        }

                        .btn-next, .btn-submit, .btn-cancel {
                            background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
                            color: white;
                            box-shadow: 0 4px 15px rgba(233, 93, 44, 0.3);
                        }

                        .btn-next:hover, .btn-submit:hover, .btn-cancel:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 6px 20px rgba(233, 93, 44, 0.4);
                        }

                        .btn:disabled {
                            cursor: not-allowed;
                            transform: none;
                            box-shadow: none; 
                            background: #45586c !important;
                        }

                        .btn:disabled::after {
                            display: none;
                        }

                        .form-buttons .btn:active {
                            transform: translateY(1px);
                            box-shadow: 0 2px 8px rgba(233, 93, 44, 0.2);
                        }

                        /* ---------- SUCCESS SECTION ---------- */
                        .success-section {
                            display: none;
                            text-align: center;
                            padding: 40px;
                            animation: fadeIn 1s ease-out;
                            background: linear-gradient(to bottom, #ffffff, #fefeff);
                            position: relative;
                        }

                        .success-section.active {
                            display: block;
                        }

                        .success-icon {
                            width: 120px;
                            height: 120px;
                            background: linear-gradient(135deg, #e95d2c 0%, #a63e1b 100%);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 32px;
                            animation: pulse 3s infinite;
                            color: white;
                            font-size: 56px;
                            box-shadow: 0 8px 30px rgba(233, 93, 44, 0.12);
                        }

                        .success-icon svg {
                            width: 56px;
                            height: 56px;
                        }

                        .success-title {
                            font-size: 32px;
                            color: #1a2730;
                            margin-bottom: 20px;
                            font-weight: 800;
                        }

                        .success-message {
                            font-size: 18px;
                            color: #555;
                            margin-bottom: 40px;
                            line-height: 1.7;
                            max-width: 650px;
                            margin-left: auto;
                            margin-right: auto;
                        }

                        /* ---------- FORM TIMEOUT STYLES ---------- */
                        .chatbot-form.form-timeout {
                            background-color: #45586c !important;
                            transition: background-color 0.5s ease;
                        }
                        
                        .chatbot-form.form-timeout .step-container,
                        .chatbot-form.form-timeout .success-section,
                        .chatbot-form.form-timeout .progress-container {
                            background-color: transparent !important;
                        }

                        /* Disabled form styles */
                        .form-timeout input, 
                        .form-timeout button, 
                        .form-timeout select, 
                        .form-timeout textarea {
                            pointer-events: none;
                            opacity: 0.4;
                            cursor: not-allowed !important;
                        }

                        /* ===== BOUTONS TIMEOUT ===== */
                        .timeout-button {
                            background: #45586c !important;
                        }

                        /* ---------- RESPONSIVE DESIGN ---------- */
                        @media (max-width: 767px) {
                            .flex-row {
                                display: flex;
                                margin: 0;
                                width: 100%;
                                gap: 20px;
                                flex-direction: column;
                            }
                            
                            .step-container.active {
                                padding: 5px 15px 10px;
                            }
                            
                            .flex-row > div {
                                width: 100%;
                                padding: 0;
                                margin-bottom: 0px;
                            }
                        }

                        @media (max-width: 768px) {
                            .form-title {
                                font-size: 22px;
                            }
                            

                            
                            .step-heading {
                                font-size: 22px;
                            }
                            
                            .btn {
                                padding: 12px 18px;
                                font-size: 15px;
                            }
                            
                            .info-label {
                                width: 140px;
                                min-width: 140px;
                                font-size: 13px;
                            }
                            
                            .info-value {
                                font-size: 13px;
                            }
                        }

                        @media (max-width: 480px) {
                            form.chatbot-form {
                                min-width: 200px;
                            }
                            

                            
                            .step-heading {
                                font-size: 18px;
                            }

                            .info-label {
                                width: 120px;
                                min-width: 120px;
                                font-size: 12px;
                            }
                            
                            .info-value {
                                font-size: 12px;
                            }
                        }

                        /* ---------- FOCUS STYLES FOR ACCESSIBILITY ---------- */
                        input:focus-visible, button:focus-visible, textarea:focus-visible {
                            outline: 2px solid #e95d2c;
                            outline-offset: 2px;
                        }
                    </style>
                    
                    <!-- Success Screen -->
                    <div class="success-section" id="success-content">
                        <div class="success-icon">
                            ${FormManager.constants.SVG.SUCCESS}
                        </div>
                        <div class="success-title">${getText('confirmationTitle')}</div>
                        <p class="success-message">${getText('confirmationMessage')}</p>
                    </div>

                    <!-- Main Step -->
                    ${generateMainStep(formContainer, context)}
                `;
                
                // Set the generated HTML
                formContainer.innerHTML = formHTML;
                // Add to page
                element.appendChild(formContainer);
                

                
                // ================================
                // FORM LOGIC (SIMPLIFIED)
                // ================================
                function showSuccessScreen() {
                    formContainer.querySelector('.step-container')
                        .style.display = 'none';
                    formContainer.querySelector('#success-content')
                        .classList.add('active');
                    
                    isFormSubmitted = true;
                    if (formTimeoutId) {
                        clearInterval(formTimeoutId);
                    }
                }

                // ================================
                // FETCH BOOKING DATA AND INITIALIZE
                // ================================
                async function initializeForm() {
                    if (uid && apiKey) {
                        try {
                            formValues.booking = await fetchBooking(uid);
                            // Update step 1 with booking data
                            const bookingDetails = formContainer.querySelector('#booking-details');
                            if (bookingDetails) {
                                bookingDetails.innerHTML = formValues.booking ? 
                                    renderBookingDetails(formValues.booking, getText) : 
                                    `<p class="no-booking">${getText('noBookingData')}</p>`;
                            }
                        } catch (error) {
                            console.error('Error fetching booking:', error);
                        }
                    }
                }

                // ================================
                // EVENT LISTENERS
                // ================================
                
                // Cancel button event
                formContainer.querySelector('#cancel-button').addEventListener('click', async function () {
                    if (!validateCancellation(formValues, formContainer, context)) return;
                    
                    const cancelBtn = this;
                    cancelBtn.disabled = true;
                    cancelBtn.textContent = getText('processing');
                    
                    try {
                        const cancellationResponse = await cancelBooking(uid, formValues.reason);
                        
                        if (cancellationResponse) {
                            // Show success screen directly
                            showSuccessScreen();
                            
                            // Send data to Voiceflow
                            const submissionData = { 
                                uid: uid,
                                reason: formValues.reason,
                                bookingDetails: {
                                    id: formValues.booking?.id,
                                    title: formValues.booking?.title,
                                    originalDate: formValues.booking?.start,
                                    formattedDate: formValues.booking?.start ? 
                                        new Intl.DateTimeFormat(language === "fr" ? "fr-CA" : "en-US", { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        }).format(new Date(formValues.booking.start)) : ''
                                }
                            };
                            
                            if (vf) {
                                window.voiceflow.chat.interact({
                                    type: "complete",
                                    payload: submissionData
                                });
                            }
                        }
                    } catch (err) {
                        console.error("Cancellation error:", err);
                        cancelBtn.disabled = false;
                        cancelBtn.textContent = getText('cancelButton');
                        // Show error message
                        alert(getText('errorOccurred') + ': ' + err.message);
                    }
                });

                // Initialize form and start timer
                initializeForm();
                startFormTimer();
            }
        };

window.SubmissionFormExtension = SubmissionFormExtension;
window.ContactFormExtension = ContactFormExtension;
window.BookingDirectExtension = BookingDirectExtension;
window.RescheduleExtension = RescheduleExtension;
window.CancellationExtension = CancellationExtension;
