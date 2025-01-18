/**
 * Validates the format of an email address using a regular expression.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email format is valid, false otherwise.
 */
function isValidEmail(email) {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return emailPattern.test(email);
}

/**
 * Validates the format of a Canadian phone number using a regular expression.
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} - Returns true if the phone number format is valid, false otherwise.
 */
function isValidCanadianPhoneNumber(phoneNumber) {
    const phonePattern = /^(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
    return phonePattern.test(phoneNumber);
}

/**
 * Formats a phone number into the format (xxx) xxx-xxxx.
 * If the phone number doesn't have exactly 10 digits, it returns the original input.
 * @param {string} phoneNumber - The phone number to format.
 * @returns {string} - The formatted phone number or the original input if invalid.
 */
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, ''); // Remove all non-digit characters
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phoneNumber;
}

/**
 * Defines shared property types categorized under different categories with translations in English and French.
 * @constant
 */
const SharedPropertyTypes = {
    Residential: {
        en: ["Condominium", "Bachelor", "Bungalow", "Chalet", "Mobile Home", "Split-level House", "Two-storey House", "Detached Single-family House", "Semi-detached House", "Rowhouse"],
        fr: ["Condominium", "Studio", "Bungalow", "Chalet", "Maison Mobile", "Maison à Paliers Multiples", "Maison à Deux Étages", "Maison Unifamiliale Détachée", "Maison Jumelée", "Maison en Rangée"]
    },
    Farm: {
        en: ["Cattle farm", "Cereal farm", "Country property", "Dairy farm", "Equestrian", "Farm", "Leisure", "Maple grove"],
        fr: ["Ferme bovine", "Ferme céréalière", "Propriété de campagne", "Ferme laitière", "Équestre", "Ferme", "Loisir", "Érablière"]
    },
    Multiplex: {
        en: ["Duplex", "Quadruplex", "Triplex", "Multiplex"],
        fr: ["Duplex", "Quadruplex", "Triplex", "Multiplex"]
    },
    Commercial: {
        en: ["Co-ownership", "Commercial", "Enterprise business", "Business-building", "Industrial", "Warehouse"],
        fr: ["Co-propriété", "Commercial", "Entreprise", "Bâtiment commercial", "Industriel", "Entrepôt"]
    },
    Land: {
        en: ["Agricultural", "Commercial", "Housing estate", "Industrial", "Residential", "Woodland", "Lot"],
        fr: ["Agricole", "Commercial", "Lotissement", "Industriel", "Résidentiel", "Boisé", "Terrain"]
    }
};

/**
 * Creates a translation map from French property types to their English equivalents.
 * This is used to map user selections in French to the corresponding English terms.
 * @constant
 */
const PropertyTypeTranslation = {};
Object.values(SharedPropertyTypes).forEach(category => {
    category.fr.forEach((frType, index) => {
        const enType = category.en[index];
        PropertyTypeTranslation[frType] = enType;
    });
});

/**
 * Generates HTML option elements for the seller dropdown based on the selected language.
 * Optionally includes a "No Preference" option.
 * @param {boolean} isEnglish - Determines if the options should be in English or French.
 * @param {boolean} includeNoPreference - Whether to include the "No Preference" option.
 * @returns {string} - A string containing HTML option elements.
 */
function getSellerOptions(isEnglish, includeNoPreference = true) {
    // Filter out "No Preference" if not needed
    const sellersList = includeNoPreference ? Sellers : Sellers.filter(seller => seller !== "No Preference");

    return sellersList.map(seller => {
        // Translate "No Preference" to French if needed
        const displayName = isEnglish ? seller : (seller === "No Preference" ? "Pas de préférence" : seller);
        return `<option value="${seller}">${displayName}</option>`;
    }).join("");
}

/**
 * Toggles the visibility of a collapsible section.
 * Adds or removes the "active" class and switches the display property between "block" and "none".
 * @param {HTMLElement} element - The header element that was clicked to toggle the section.
 */
function toggleCollapse(element) {
    element.classList.toggle("active");
    const content = element.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
}

/**
 * Generates an Airtable formula based on the input criteria.
 * This formula can be used to query Airtable records that match the specified conditions.
 * @param {Object} input - An object containing the search criteria.
 * @returns {string} - A string representing the Airtable formula.
 */
function generateAirtableFormula(input) {
    const {
        cityName = [],
            typeHouse = [],
            bedrooms = 0,
            bathrooms = 0,
            priceMax = 0,
            priceMin = 0,
            parkingIndoor = "",
            car = 0,
            swimmingPool = ""
    } = input;

    const conditions = [];

    // Add city conditions
    if (cityName.length > 0) {
        const cityConditions = cityName.map(city => `{City} = "${city}"`);
        const cityFormula = cityConditions.length === 1 ? cityConditions[0] : `OR(${cityConditions.join(", ")})`;
        conditions.push(cityFormula);
    }

    // Add property type conditions
    if (typeHouse.length > 0) {
        const typeConditions = typeHouse.map(type => `{Type} = "${type}"`);
        const typeFormula = typeConditions.length === 1 ? typeConditions[0] : `OR(${typeConditions.join(", ")})`;
        conditions.push(typeFormula);
    }

    // Add bedrooms condition
    if (bedrooms > 0) {
        conditions.push(`{Bedrooms} >= ${bedrooms}`);
    }

    // Add bathrooms condition
    if (bathrooms > 0) {
        conditions.push(`{Bathrooms} >= ${bathrooms}`);
    }

    // Add price range conditions
    if (priceMin > 0) {
        conditions.push(`{Price} >= ${priceMin}`);
    }
    if (priceMax > 0) {
        conditions.push(`{Price} <= ${priceMax}`);
    }

    // Add indoor parking condition
    if (parkingIndoor === "Yes") {
        conditions.push(`{IndoorParking} = "Yes"`);
    }

    // Add number of cars condition
    if (car > 0) {
        conditions.push(`{Car} >= ${car}`);
    }

    // Add swimming pool condition
    if (swimmingPool === "Yes") {
        conditions.push(`{SwimmingPool} = "Yes"`);
    }

    // Combine all conditions with AND(). If no conditions, return "TRUE".
    return `AND(${conditions.join(", ")})`;
}

/**
 * An array of seller names. Includes a "No Preference" option.
 * @constant
 */
const Sellers = [
    "No Preference",
    "Emma Thompson",
    "Liam Carter",
    "Sophia Martinez",
    "Ethan Brown",
    "Olivia Davis",
    "Noah Wilson",
    "Ava Johnson"
];

/**
 * Defines the available service options with their values and labels in both English and French.
 * @constant
 */
const ServiceOptions = [{
        value: 'Ventes',
        label: {
            en: 'Sell',
            fr: 'Ventes'
        }
    },
    {
        value: 'Achat',
        label: {
            en: 'Buy',
            fr: 'Achat'
        }
    },
    {
        value: 'Information',
        label: {
            en: 'Information',
            fr: 'Information'
        }
    },
];

/**
 * Maps each seller to their corresponding booking URL.
 * The URLs contain placeholders for the user's full name and email, which will be dynamically replaced.
 * @constant
 */
const BookingUrls = {
    "Emma Thompson": "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
    "Liam Carter": "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
    "Sophia Martinez": "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
    "Ethan Brown": "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
    "Olivia Davis": "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
    "Noah Wilson": "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
    "Ava Johnson": "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
};

/**
 * Defines the mappings for property types in both English and French.
 * @constant
 */
const PropertyTypeMappings = {
    en: {
        "Residential": "Residential",
        "Farm / Country Property": "Farm",
        "Multiplex": "Multiplex",
        "Commercial / Industrial": "Commercial",
        "Land": "Land"
    },
    fr: {
        "Résidentiel": "Residential",
        "Fermette / Propriété à la campagne": "Farm",
        "Multiplex": "Multiplex",
        "Commercial / Industriel": "Commercial",
        "Terrain": "Land"
    }
};

/**
 * An array of numeric options used for selecting numbers of bedrooms, bathrooms, cars, etc.
 * @constant
 */
const NumericOptions = ["1", "2", "3", "4", "5"];

/**
 * Maps option types to their corresponding labels in both English and French.
 * These are used to generate select options dynamically.
 * @constant
 */
const OptionMappings = {
    Bedroom: {
        en: "+ bedrooms",
        fr: "+ chambres"
    },
    Bathroom: {
        en: "+ bathrooms",
        fr: "+ salles de bains"
    },
    Car: {
        en: "+ car",
        fr: "+ voiture"
    }
};

/**
 * Defines shared cities categorized under "North Shore", "Montreal", and "South Shore".
 * @constant
 */
const SharedCities = {
    "North Shore": [
        "Auteuil", "Blainville", "Boisbriand", "Bois-des-Filion", "Deux-Montagnes", "Duvernay", "Fabreville",
        "Laval-des-Rapides", "Laval-Ouest", "Laval-sur-le-Lac", "Lorraine", "Mirabel", "Oka", "Pointe-Calumet",
        "Pont-Viau", "Rosemère", "Sainte-Anne-des-Plaines", "Sainte-Dorothée", "Sainte-Marthe-sur-le-Lac",
        "Sainte-Rose", "Sainte-Thérèse", "Saint-Eustache", "Saint-François", "Saint-Joseph-du-Lac", "Saint-Vincent-de-Paul", "Vimont"
    ],
    "Montreal": [
        "Ahuntsic", "Anjou", "Baie-d'Urfé", "Beaconsfield", "Cartierville", "Côte-des-Neiges", "Côte-Saint-Luc",
        "Dollard-Des-Ormeaux", "Dorval", "Hampstead", "Hochelaga-Maisonneuve", "Kirkland", "Lachine", "LaSalle",
        "Le Plateau-Mont-Royal", "Le Sud-Ouest", "L'Île-Bizard", "L'Île-Dorval", "Mercier", "Montréal-Est",
        "Montréal-Nord", "Montréal-Ouest", "Mont-Royal", "Notre-Dame-de-Grâce", "Outremont", "Parc-Extension",
        "Pierrefonds-Roxboro", "Pointe-aux-Trembles", "Pointe-Claire", "Rivière-des-Prairies", "Rosemont",
        "Sainte-Catherine", "Sainte-Martine", "Saint-Laurent", "Saint-Léonard", "Saint-Michel", "Senneville",
        "Verdun/Île-des-Soeurs", "Ville-Marie", "Villeray", "Westmount"
    ],
    "South Shore": [
        "Beauharnois", "Beloeil", "Boucherville", "Brossard", "Candiac", "Carignan", "Chambly", "Châteauguay", "Delson",
        "Greenfield Park", "Kahnawake", "La Prairie", "Léry", "Longueuil", "McMasterville", "Mercier",
        "Mont-Saint-Hilaire", "Otterburn Park", "Saint-Antoine-sur-Richelieu", "Saint-Basile-le-Grand",
        "Saint-Bruno-de-Montarville", "Saint-Charles-sur-Richelieu", "Saint-Constant", "Saint-Denis-sur-Richelieu",
        "Saint-Étienne-de-Beauharnois", "Saint-Isidore", "Saint-Jean-Baptiste", "Saint-Lambert", "Saint-Louis-de-Gonzague",
        "Saint-Marc-sur-Richelieu", "Saint-Mathieu", "Saint-Mathieu-de-Beloeil", "Saint-Philippe",
        "Saint-Stanislas-de-Kostka", "Saint-Urbain-Premier", "Sainte-Catherine", "Sainte-Martine", "Vieux-Longueuil",
        "Saint-Hubert"
    ]
};

/**
 * Maps city names to their corresponding shared key categories based on language.
 * @constant
 */
const CityMappings = {
    en: {
        "Montreal-North Shore": "North Shore",
        "Montreal": "Montreal",
        "Montreal-South Shore": "South Shore"
    },
    fr: {
        "Rive-Nord de Montréal": "North Shore",
        "Montréal": "Montreal",
        "Rive-Sud de Montréal": "South Shore"
    }
};

/**
 * Builds an options object for bedrooms, bathrooms, and cars based on OptionMappings and NumericOptions.
 * This object contains arrays of option objects with 'value' and 'text' properties for both English and French.
 * @constant
 */
const Options = Object.fromEntries(
    Object.entries(OptionMappings).map(([key, translations]) => [
        key, {
            en: NumericOptions.map(num => ({
                value: num,
                text: num + translations.en
            })),
            fr: NumericOptions.map(num => ({
                value: num,
                text: num + translations.fr
            }))
        }
    ])
);

/**
 * Generates HTML option elements for the service dropdown based on the selected language.
 * @param {string} language - The language code ('en' or 'fr').
 * @returns {string} - A string containing HTML option elements.
 */
function getServiceOptions(language) {
    return ServiceOptions.map((serviceOption) => {
        const label = serviceOption.label[language];
        return `<option value="${serviceOption.value}">${label}</option>`;
    }).join("");
}

/**
 * Defines the Contact Form Extension for Voiceflow.
 * This form captures user contact information and sends it back to Voiceflow upon submission.
 * @constant
 */
const ContactExtension = {
    name: "Forms",
    type: "response",
    match: ({
        trace
    }) => trace.type === `ext_contact` || trace.payload.name === `ext_contact`,
    render: ({
        trace,
        element
    }) => {
        const {
            language
        } = trace.payload; // Extracts the language from the payload
        const isEnglish = language === 'en'; // Determines if the language is English

        // Create a form element
        const formContainer = document.createElement("form");

        // Define the inner HTML of the form with dynamic labels and placeholders based on language
        formContainer.innerHTML = `
          <style>
            form {
              display: flex;
              flex-direction: column;
              gap: 16px;
              width: 100%;
            }
            .bold-label {
              font-weight: bold;
              color: #555;
              font-size: 0.9em;
            }
            input[type="text"], input[type="email"], input[type="tel"], select, textarea {
              width: 100%;
              border: 1px solid rgba(0, 0, 0, 0.2);
              border-radius: 4px;
              padding: 8px;
              background: #fff;
              font-size: 0.9em;
              outline: none;
              box-sizing: border-box;
            }
            textarea {
              resize: vertical;
              min-height: 100px;
            }
            .submit {
              background: linear-gradient(to right, #CC960A, #CCA60A);
              border: none;
              color: white;
              padding: 12px;
              border-radius: 5px;
              width: 100%;
              font-size: 1em;
              cursor: pointer;
              margin-top: 8px;
            }
          </style>
          <div>
            <label for="full-name" class="bold-label">${isEnglish ? 'Full Name' : 'Nom complet'}</label>
            <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required>
          </div>
          <div>
            <label for="email" class="bold-label">Email</label>
            <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required>
          </div>
          <div>
            <label for="phone" class="bold-label">${isEnglish ? 'Phone Number' : 'Numéro de téléphone'}</label>
            <input type="tel" id="phone" name="phone" placeholder="${isEnglish ? 'Enter your phone number' : 'Entrez votre numéro de téléphone'}" required>
          </div>
          <div>
            <label for="service" class="bold-label">${isEnglish ? 'Select a Service' : 'Sélectionnez un Service'}</label>
            <select id="service" name="service" required>
              <option value="">${isEnglish ? '-- Select a Service --' : '-- Sélectionnez un Service --'}</option>
              ${getServiceOptions(language)} <!-- Dynamically generate service options -->
            </select>
          </div>
          <div>
            <label for="seller-name" class="bold-label">${isEnglish ? 'Select a Seller' : 'Sélectionnez un vendeur'}</label>
            <select id="seller-name" name="seller-name" required>
              <option value="">${isEnglish ? '-- Select a Seller --' : '-- Sélectionnez un vendeur --'}</option>
              ${getSellerOptions(isEnglish)} <!-- Dynamically generate seller options -->
            </select>
          </div>
          <div>
            <label for="message" class="bold-label">Message</label>
            <textarea id="message" name="message" placeholder="${isEnglish ? 'Write your message here...' : 'Écrivez votre message ici...'}" rows="5" required></textarea>
          </div>
          <input type="submit" class="submit" value="${isEnglish ? 'Submit' : 'Envoyer'}">
        `;

        /**
         * Handles the form submission event.
         * Validates the input fields and sends the data to Voiceflow upon successful validation.
         */
        formContainer.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevents the default form submission behavior

            // Retrieve and trim values from the form fields
            const fullName = formContainer.querySelector("#full-name").value.trim();
            const email = formContainer.querySelector("#email").value.trim();
            const phone = formContainer.querySelector("#phone").value.trim();
            const formattedPhone = formatPhoneNumber(phone); // Formats the phone number
            const service = formContainer.querySelector("#service").value.trim(); // Retrieves the selected service
            const sellerName = formContainer.querySelector("#seller-name").value.trim();
            const message = formContainer.querySelector("#message").value.trim();

            // Validation checks with user alerts
            if (!fullName) {
                alert(isEnglish ? "Full Name is required." : "Le nom complet est obligatoire.");
                return;
            }
            if (!email || !isValidEmail(email)) {
                alert(isEnglish ? "Please enter a valid email address." : "Veuillez entrer une adresse email valide.");
                return;
            }
            if (!phone || !isValidCanadianPhoneNumber(phone)) {
                alert(isEnglish ? "Please enter a valid Canadian phone number." : "Veuillez entrer un numéro de téléphone canadien valide.");
                return;
            }
            if (!service) {
                alert(isEnglish ? "Please select a service." : "Veuillez sélectionner un service.");
                return;
            }
            if (!sellerName) {
                alert(isEnglish ? "Please select a seller." : "Veuillez sélectionner un vendeur.");
                return;
            }
            if (!message) {
                alert(isEnglish ? "Message is required." : "Le message est obligatoire.");
                return;
            }

            // Check if Voiceflow's interact function is available before calling it
            if (window.voiceflow && window.voiceflow.chat && typeof window.voiceflow.chat.interact === 'function') {
                window.voiceflow.chat.interact({
                    type: "complete",
                    payload: {
                        fullName,
                        email,
                        phone: formattedPhone, // Sends the formatted phone number
                        service, // Sends the selected service (always in French if language is French)
                        sellerName,
                        message,
                    },
                });
            } else {
                console.error("Voiceflow chat interact function is not available.");
            }
        });

        // Append the form to the designated element in the DOM
        element.appendChild(formContainer);
    },
};

/**
 * Defines the Booking Capture Form Extension for Voiceflow.
 * This form captures booking-related information and redirects the user to a booking URL.
 * @constant
 */
const BookingExtension = {
    name: "Forms",
    type: "response",
    match: ({
        trace
    }) => trace.type === `ext_booking` || trace.payload.name === `ext_booking`,
    render: ({
        trace,
        element
    }) => {
        const {
            language
        } = trace.payload; // Extracts the language from the payload
        const isEnglish = language === 'en'; // Determines if the language is English

        // Create a form element
        const formContainer = document.createElement("form");

        // Define the inner HTML of the form with dynamic labels and placeholders based on language
        formContainer.innerHTML = `
          <style>
            form {
              display: flex;
              flex-direction: column;
              gap: 16px;
              width: 100%;
            }
            .bold-label {
              font-size: 0.9em;
              color: #555;
            }
            input[type="text"], input[type="email"], select {
              width: 100%;
              border: 1px solid rgba(0, 0, 0, 0.2);
              border-radius: 4px;
              padding: 8px;
              background: #fff;
              font-size: 0.9em;
              outline: none;
              box-sizing: border-box;
            }
            .book-now {
              background: linear-gradient(to right, #CC960A, #CCA60A);
              border: none;
              color: white;
              padding: 12px;
              border-radius: 5px;
              width: 100%;
              font-size: 1em;
              cursor: pointer;
              margin-top: 8px;
            }
          </style>
          <div>
            <label for="full-name" class="bold-label">${isEnglish ? 'Full Name' : 'Nom complet'}</label>
            <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required>
          </div>
          <div>
            <label for="email" class="bold-label">Email</label>
            <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required>
          </div>
          <div>
            <label for="seller-name" class="bold-label">${isEnglish ? 'Select a Seller' : 'Sélectionnez un vendeur'}</label>
            <select id="seller-name" name="seller-name" required>
              <option value="">${isEnglish ? '-- Select a Seller --' : '-- Sélectionnez un vendeur --'}</option>
              ${getSellerOptions(isEnglish, false)} <!-- Dynamically generate seller options, excluding "No Preference" -->
            </select>
          </div>
          <button type="button" class="book-now" id="book-now">${isEnglish ? 'Book Now' : 'Réserver maintenant'}</button>
        `;

        // Select the "Book Now" button
        const bookNowButton = formContainer.querySelector("#book-now");

        /**
         * Handles the "Book Now" button click event.
         * Validates input fields, generates a booking URL, interacts with Voiceflow, and opens the booking URL in a new tab.
         */
        bookNowButton.addEventListener("click", () => {
            // Retrieve and trim values from the form fields
            const fullName = formContainer.querySelector("#full-name").value.trim();
            const email = formContainer.querySelector("#email").value.trim();
            const sellerName = formContainer.querySelector("#seller-name").value.trim();

            // Validation checks with user alerts
            if (!fullName) {
                alert(isEnglish ? "Full Name is required." : "Le nom complet est obligatoire.");
                return;
            }
            if (!email || !isValidEmail(email)) {
                alert(isEnglish ? "Please enter a valid email address." : "Veuillez entrer une adresse email valide.");
                return;
            }
            if (!sellerName) {
                alert(isEnglish ? "Please select a seller." : "Veuillez sélectionner un vendeur.");
                return;
            }

            // Check if a booking URL is available for the selected seller
            if (BookingUrls[sellerName]) {
                // Replace placeholders with actual user input, ensuring proper URL encoding
                const bookingUrl = BookingUrls[sellerName]
                    .replace("{Full_Name}", encodeURIComponent(fullName))
                    .replace("{Email}", encodeURIComponent(email));

                // Interact with Voiceflow to send the captured data
                if (window.voiceflow && window.voiceflow.chat && typeof window.voiceflow.chat.interact === 'function') {
                    window.voiceflow.chat.interact({
                        type: "complete",
                        payload: {
                            fullName,
                            email,
                            sellerName,
                            bookingUrl
                        },
                    });
                } else {
                    console.error("Voiceflow chat interact function is not available.");
                }

                // Open the booking URL in a new browser tab
                window.open(bookingUrl, "_blank");
            } else {
                // Alert the user if no booking URL is available for the selected seller
                alert(isEnglish ? "No booking URL available for the selected seller." : "Aucune URL de réservation disponible pour le vendeur sélectionné.");
            }
        });

        // Append the form to the designated element in the DOM
        element.appendChild(formContainer);
    },
};

/**
 * Defines the Property Search Form Extension for Voiceflow.
 * This form allows users to search for properties based on various criteria.
 * @constant
 */
const PropertySearchExtension = {
    name: "Forms",
    type: "response",
    match: ({
        trace
    }) => trace.type === `ext_property_search` || trace.payload.name === `ext_property_search`,
    render: ({
        trace,
        element
    }) => {
        const {
            language
        } = trace.payload; // Extracts the language from the payload
        const isEnglish = language === 'en'; // Determines if the language is English
        const langCode = isEnglish ? 'en' : 'fr'; // Sets the language code

        /**
         * Generates the final Cities object by mapping city categories based on language.
         * @constant
         */
        const Cities = Object.fromEntries(
            Object.entries(CityMappings[langCode]).map(([label, sharedKey]) => [label, SharedCities[sharedKey]])
        );

        /**
         * Generates the final PropertyTypes object with translations based on language.
         * @constant
         */
        const PropertyTypes = Object.fromEntries(
            Object.entries(PropertyTypeMappings[langCode]).map(([label, sharedKey]) => [
                label,
                SharedPropertyTypes[sharedKey][langCode]
            ])
        );

        // Retrieves options for bedrooms, bathrooms, and cars based on language
        const BedroomOptions = Options.Bedroom[langCode];
        const BathroomOptions = Options.Bathroom[langCode];
        const CarOptions = Options.Car[langCode];

        // Create a form element
        const formContainer = document.createElement("form");

        /**
         * Creates HTML for city checkboxes within a specific category.
         * Includes a "Select All" checkbox for the category.
         * @param {string} category - The category name.
         * @param {Array} cities - An array of city names under the category.
         * @returns {string} - A string containing HTML for the checkboxes.
         */
        const createCityCheckboxes = (category, cities) => `
          <div>
            <div class="collapsible city-category" onclick="toggleCollapse(this)">${category}</div>
            <div class="collapse-content">
              <label class="checkbox-item">
                <input type="checkbox" class="select-all" data-category="${category}">
                <strong>${isEnglish ? 'Select all' : 'Tout sélectionner'}</strong>
              </label>
              ${cities.map(
                (city) =>
                  `<div class="checkbox-item">
                    <input type="checkbox" class="city-checkbox" data-category="${category}" id="city-${city}" name="cities" value="${city}">
                    <label for="city-${city}">${city}</label>
                  </div>`
              ).join("")}
            </div>
          </div>
        `;

        /**
         * Creates HTML for property type checkboxes within a specific category.
         * Includes a "Select All" checkbox for the category.
         * @param {string} category - The category name.
         * @param {Array} types - An array of property types under the category.
         * @returns {string} - A string containing HTML for the checkboxes.
         */
        const createPropertyTypeCheckboxes = (category, types) => `
          <div>
            <div class="collapsible property-category" onclick="toggleCollapse(this)">${category}</div>
            <div class="collapse-content">
              <label class="checkbox-item">
                <input type="checkbox" class="select-all-property" data-category="${category}">
                <strong>${isEnglish ? 'Select all' : 'Tout sélectionner'}</strong>
              </label>
              ${types.map(
                (type) =>
                  `<div class="checkbox-item">
                    <input type="checkbox" class="property-checkbox" data-category="${category}" id="type-${type}" name="property-types" value="${type}">
                    <label for="type-${type}">${type}</label>
                  </div>`
              ).join("")}
            </div>
          </div>
        `;

        // Define the inner HTML of the form with dynamic labels, placeholders, and options
        formContainer.innerHTML = `
          <style>
            /* Styles for the Property Search Form */
            form {
              display: flex;
              flex-direction: column;
              gap: 16px;
              width: 100%;
            }
            .collapsible {
              cursor: pointer;
              background: #f1f1f1;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 0.9em;
              margin-bottom: 5px;
              text-align: left;
            }
            .collapsible:after {
              content: "\\25BC"; /* Down arrow */
              float: right;
            }
            .collapsible.active:after {
              content: "\\25B2"; /* Up arrow when active */
            }
            .collapse-content {
              display: none;
              padding: 10px;
              background: #fafafa;
              border: 1px solid #ddd;
              border-top: none;
            }
            .checkbox-container {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            .checkbox-item {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            select, input[type="number"] {
              width: 100%;
              border: 1px solid rgba(0, 0, 0, 0.2);
              border-radius: 4px;
              padding: 8px;
              background: #fff;
              font-size: 0.9em;
              outline: none;
              box-sizing: border-box;
            }
            .submit {
              background: linear-gradient(to right, #CC960A, #CCA60A);
              border: none;
              color: white;
              padding: 12px;
              border-radius: 5px;
              width: 100%;
              font-size: 1em;
              cursor: pointer;
              margin-top: 8px;
            }
            .bold-label {
              font-weight: bold;
              color: #555;
              font-size: 0.9em;
            }
            .inline-field {
              display: flex;
              align-items: center;
              gap: 8px;
            }
          </style>

          <!-- Cities Section with Collapsible Categories -->
          <div>
            <div class="collapsible bold-label" onclick="toggleCollapse(this)">${isEnglish ? 'Select Cities' : 'Sélectionnez des villes'}</div>
            <div class="collapse-content">
              <div id="cities-container" class="checkbox-container">
                ${Object.entries(Cities)
                    .map(([category, cities]) => createCityCheckboxes(category, cities))
                    .join("")}
              </div>
            </div>
          </div>

          <!-- Property Types Section with Collapsible Categories -->
          <div>
            <div class="collapsible bold-label" onclick="toggleCollapse(this)">${isEnglish ? 'Select Property Types' : 'Sélectionnez des types de propriété'}</div>
            <div class="collapse-content">
              <div id="property-types-container" class="checkbox-container">
                ${Object.entries(PropertyTypes)
                    .map(([category, types]) => createPropertyTypeCheckboxes(category, types))
                    .join("")}
              </div>
            </div>
          </div>

          <!-- Bedrooms Selection -->
          <div>
            <label for="bedrooms-number" class="bold-label">${isEnglish ? 'Number of Bedrooms' : 'Nombre de chambres'}</label>
            <select id="bedrooms-number" name="bedrooms-number" required>
              ${BedroomOptions.map((option) => `<option value="${option.value}">${option.text}</option>`).join("")}
            </select>
          </div>

          <!-- Bathrooms Selection -->
          <div>
            <label for="bathrooms-number" class="bold-label">${isEnglish ? 'Number of Bathrooms' : 'Nombre de salles de bains'}</label>
            <select id="bathrooms-number" name="bathrooms-number" required>
              ${BathroomOptions.map((option) => `<option value="${option.value}">${option.text}</option>`).join("")}
            </select>
          </div>

          <!-- Price Range Minimum -->
          <div>
            <label for="price-min" class="bold-label">${isEnglish ? 'Price Range (Min)' : 'Prix minimum'}</label>
            <input type="number" id="price-min" name="price-min" placeholder="${isEnglish ? 'Enter minimum price' : 'Entrez le prix minimum'}" step="1000" min="0">
          </div>

          <!-- Price Range Maximum -->
          <div>
            <label for="price-max" class="bold-label">${isEnglish ? 'Price Range (Max)' : 'Prix maximum'}</label>
            <input type="number" id="price-max" name="price-max" placeholder="${isEnglish ? 'Enter maximum price' : 'Entrez le prix maximum'}" step="1000" min="0">
          </div>

          <!-- Garage Checkbox and Car Number Selection -->
          <div class="inline-field">
            <label for="garage" class="bold-label">${isEnglish ? 'Garage' : 'Garage'}</label>
            <input type="checkbox" id="garage" name="garage" value="Yes">
          </div>
          <select id="garage-cars" name="garage-cars" style="display: none;" required>
            <option value="">${isEnglish ? 'Select number of cars' : 'Sélectionnez le nombre de voitures'}</option>
            ${CarOptions.map((option) => `<option value="${option.value}">${option.text}</option>`).join("")}
          </select>

          <!-- Swimming Pool Checkbox -->
          <div class="inline-field">
            <label for="swimming-pool" class="bold-label">${isEnglish ? 'Swimming Pool' : 'Piscine'}</label>
            <input type="checkbox" id="swimming-pool" name="swimming-pool" value="Yes">
          </div>

          <!-- Submit Button -->
          <input type="submit" class="submit" value="${isEnglish ? 'Submit' : 'Envoyer'}">
        `;

        /**
         * Handles the form submission event.
         * Collects all input data, validates them, generates an Airtable formula, and sends it to Voiceflow.
         */
        formContainer.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevents the default form submission behavior

            // Collect selected cities from checkboxes
            const selectedCities = Array.from(formContainer.querySelectorAll(".city-checkbox:checked")).map((input) => input.value);

            // Collect selected property types from checkboxes
            const selectedPropertyTypesRaw = Array.from(formContainer.querySelectorAll(".property-checkbox:checked")).map((input) => input.value);

            // If the language is French, translate property types to English using the translation map
            const selectedPropertyTypes = isEnglish ?
                selectedPropertyTypesRaw :
                selectedPropertyTypesRaw.map((type) => PropertyTypeTranslation[type] || type);

            // Collect numerical and other form inputs
            let bedroomsNumber = parseInt(formContainer.querySelector("#bedrooms-number").value || 0, 10);
            let bathroomsNumber = parseInt(formContainer.querySelector("#bathrooms-number").value || 0, 10);
            let priceMin = parseInt(formContainer.querySelector("#price-min").value || 0, 10);
            let priceMax = parseInt(formContainer.querySelector("#price-max").value || 0, 10);
            let indoorParking = formContainer.querySelector("#garage").checked ? "Yes" : "No";
            let indoorParkingCars = indoorParking === "Yes" ? parseInt(formContainer.querySelector("#garage-cars").value || 0, 10) : 0;
            let swimmingPool = formContainer.querySelector("#swimming-pool").checked ? "Yes" : "No";

            // Build the payload object to be sent to Airtable via Voiceflow
            const payload = {
                cityName: selectedCities,
                typeHouse: selectedPropertyTypes,
                bedrooms: bedroomsNumber,
                bathrooms: bathroomsNumber,
                priceMin: priceMin,
                priceMax: priceMax,
                parkingIndoor: indoorParking,
                car: indoorParkingCars,
                swimmingPool: swimmingPool
            };

            // Generate the Airtable formula based on the payload
            const airtableFormula = generateAirtableFormula(payload);

            // Send the generated formula to Voiceflow
            window.voiceflow.chat.interact({
                type: "complete",
                payload: {
                    formula: airtableFormula
                }
            });
        });

        /**
         * Handles the "Select All" functionality for city and property type categories.
         * Selects or deselects all checkboxes within a specific category based on the "Select All" checkbox state.
         */
        formContainer.addEventListener("change", (event) => {
            // Handle "Select All" for cities
            if (event.target.classList.contains("select-all")) {
                const category = event.target.dataset.category;
                const checkboxes = formContainer.querySelectorAll(`.city-checkbox[data-category="${category}"]`);
                checkboxes.forEach((checkbox) => (checkbox.checked = event.target.checked));
            }
            // Update "Select All" checkbox based on individual city checkbox states
            else if (event.target.classList.contains("city-checkbox")) {
                const category = event.target.dataset.category;
                const allCheckbox = formContainer.querySelector(`.select-all[data-category="${category}"]`);
                const checkboxes = formContainer.querySelectorAll(`.city-checkbox[data-category="${category}"]`);
                allCheckbox.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
            }
            // Handle "Select All" for property types
            else if (event.target.classList.contains("select-all-property")) {
                const category = event.target.dataset.category;
                const checkboxes = formContainer.querySelectorAll(`.property-checkbox[data-category="${category}"]`);
                checkboxes.forEach((checkbox) => (checkbox.checked = event.target.checked));
            }
            // Update "Select All" checkbox based on individual property type checkbox states
            else if (event.target.classList.contains("property-checkbox")) {
                const category = event.target.dataset.category;
                const allCheckbox = formContainer.querySelector(`.select-all-property[data-category="${category}"]`);
                const checkboxes = formContainer.querySelectorAll(`.property-checkbox[data-category="${category}"]`);
                allCheckbox.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
            }
        });

        /**
         * Shows or hides the "Number of Cars" dropdown based on the garage checkbox state.
         * If the garage is checked, the dropdown is displayed; otherwise, it is hidden and reset.
         */
        formContainer.querySelector("#garage").addEventListener("change", (event) => {
            const carsField = formContainer.querySelector("#garage-cars");
            if (event.target.checked) {
                carsField.style.display = "block";
            } else {
                carsField.style.display = "none";
                carsField.value = ""; // Reset the field value
            }
        });

        // Append the form to the designated element in the DOM
        element.appendChild(formContainer);
    },
};

/**
 * Defines the Selling Capture Form Extension for Voiceflow.
 * This form captures selling-related information from the user and sends it back to Voiceflow.
 * @constant
 */
const PropertySellingExtension = {
    name: "Forms",
    type: "response",
    match: ({
        trace
    }) => trace.type === `ext_property_selling` || trace.payload.name === `ext_property_selling`,
    render: ({
        trace,
        element
    }) => {
        const {
            language
        } = trace.payload; // Extracts the language from the payload
        const isEnglish = language === 'en'; // Determines if the language is English
        const langCode = isEnglish ? 'en' : 'fr'; // Sets the language code

        /**
         * Generates the final PropertyTypes object with translations based on the selected language.
         * @constant
         */
        const PropertyTypes = Object.fromEntries(
            Object.entries(PropertyTypeMappings[langCode]).map(([label, sharedKey]) => [
                label,
                SharedPropertyTypes[sharedKey][langCode]
            ])
        );

        /**
         * Creates HTML for property type radio buttons within a specific category.
         * @param {string} category - The category name.
         * @param {Array} types - An array of property types under the category.
         * @returns {string} - A string containing HTML for the radio buttons.
         */
        const createPropertyTypeRadios = (category, types) => `
          <div>
            <div class="collapsible property-category" onclick="toggleCollapse(this)">${category}</div>
            <div class="collapse-content">
              ${types.map(
                (type) =>
                  `<div class="radio-item">
                    <input type="radio" class="property-radio" data-category="${category}" id="type-${type}" name="property-type" value="${type}">
                    <label for="type-${type}">${type}</label>
                  </div>`
              ).join("")}
            </div>
          </div>
        `;

        // Create a form element
        const formContainer = document.createElement("form");

        // Define the inner HTML of the form with dynamic labels, placeholders, and options
        formContainer.innerHTML = `
          <style>
            /* Styles for the Selling Capture Form */
            form {
              display: flex;
              flex-direction: column;
              gap: 16px;
              width: 100%;
            }
            .bold-label {
              font-weight: bold;
              color: #555;
              font-size: 0.9em;
            }
            input[type="text"], input[type="email"], input[type="tel"], select, textarea {
              width: 100%;
              border: 1px solid rgba(0, 0, 0, 0.2);
              border-radius: 4px;
              padding: 8px;
              background: #fff;
              font-size: 0.9em;
              outline: none;
              box-sizing: border-box;
            }
            textarea {
              resize: vertical;
              min-height: 100px;
            }
            .submit {
              background: linear-gradient(to right, #CC960A, #CCA60A);
              border: none;
              color: white;
              padding: 12px;
              border-radius: 5px;
              width: 100%;
              font-size: 1em;
              cursor: pointer;
              margin-top: 8px;
            }
            .inline-field {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .collapsible {
              cursor: pointer;
              background: #f1f1f1;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 0.9em;
              margin-bottom: 5px;
              text-align: left;
            }
            .collapsible:after {
              content: "\\25BC"; /* Down arrow */
              float: right;
            }
            .collapsible.active:after {
              content: "\\25B2"; /* Up arrow when active */
            }
            .collapse-content {
              display: none;
              padding: 10px;
              background: #fafafa;
              border: 1px solid #ddd;
              border-top: none;
            }
            .radio-container {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            .radio-item {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .radio-item label {
              font-weight: normal;
            }
          </style>

          <!-- Full Name Field -->
          <div>
            <label for="full-name" class="bold-label">${isEnglish ? 'Full Name' : 'Nom complet'}</label>
            <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="bold-label">Email</label>
            <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required>
          </div>

          <!-- Phone Number Field -->
          <div>
            <label for="phone" class="bold-label">${isEnglish ? 'Phone Number' : 'Numéro de téléphone'}</label>
            <input type="tel" id="phone" name="phone" placeholder="${isEnglish ? 'Enter your phone number' : 'Entrez votre numéro de téléphone'}" required>
          </div>

          <!-- Seller Selection Field -->
          <div>
            <label for="seller-name" class="bold-label">${isEnglish ? 'Select a Seller' : 'Sélectionnez un Vendeur'}</label>
            <select id="seller-name" name="seller-name" required>
              <option value="">${isEnglish ? '-- Select a Seller --' : '-- Sélectionnez un vendeur --'}</option>
              ${getSellerOptions(isEnglish)} <!-- Dynamically generate seller options -->
            </select>
          </div>

          <!-- Street Address Field -->
          <div>
            <label for="street-address" class="bold-label">${isEnglish ? 'Street Address' : 'Adresse de rue'}</label>
            <input type="text" id="street-address" name="street-address" placeholder="${isEnglish ? 'Enter the street address' : 'Entrez l\'adresse de la rue'}" required>
          </div>

          <!-- City Field -->
          <div>
            <label for="city" class="bold-label">${isEnglish ? 'City' : 'Ville'}</label>
            <input type="text" id="city" name="city" placeholder="${isEnglish ? 'Enter the city' : 'Entrez la ville'}" required>
          </div>

          <!-- Postal Code Field -->
          <div>
            <label for="postal-code" class="bold-label">${isEnglish ? 'Postal Code' : 'Code Postal'}</label>
            <input type="text" id="postal-code" name="postal-code" placeholder="${isEnglish ? 'Enter the postal code' : 'Entrez le code postal'}" required>
          </div>

          <!-- Property Types Section with Collapsible Categories -->
          <div>
            <div class="collapsible bold-label" onclick="toggleCollapse(this)">${isEnglish ? 'Select Property Type' : 'Sélectionnez le type de propriété'}</div>
            <div class="collapse-content">
              <div id="property-types-container" class="radio-container">
                ${Object.entries(PropertyTypes)
                    .map(([category, types]) => createPropertyTypeRadios(category, types))
                    .join("")}
              </div>
            </div>
          </div>

          <!-- Year Built Field -->
          <div>
            <label for="year-build" class="bold-label">${isEnglish ? 'Year Built' : 'Année de construction'}</label>
            <input type="text" id="year-build" name="year-build" placeholder="${isEnglish ? 'Enter the year built' : 'Entrez l\'année de construction'}" required>
          </div>

          <!-- Area Field -->
          <div>
            <label for="area" class="bold-label">${isEnglish ? 'Area (in square feet)' : 'Superficie en pieds carrés'}</label>
            <input type="text" id="area" name="area" placeholder="${isEnglish ? 'Enter the area in square feet' : 'Entrez la superficie en pieds carrés'}" required>
          </div>

          <!-- Number of Rooms Field -->
          <div>
            <label for="rooms-number" class="bold-label">${isEnglish ? 'Number of Rooms' : 'Nombre de pièces'}</label>
            <input type="text" id="rooms-number" name="rooms-number" placeholder="${isEnglish ? 'Enter the number of rooms' : 'Entrez le nombre de pièces'}" required>
          </div>

          <!-- Number of Bedrooms Field -->
          <div>
            <label for="bedrooms-number" class="bold-label">${isEnglish ? 'Number of Bedrooms' : 'Nombre de chambres'}</label>
            <input type="text" id="bedrooms-number" name="bedrooms-number" placeholder="${isEnglish ? 'Enter the number of bedrooms' : 'Entrez le nombre de chambres'}" required>
          </div>

          <!-- Number of Bathrooms Field -->
          <div>
            <label for="bathrooms-number" class="bold-label">${isEnglish ? 'Number of Bathrooms' : 'Nombre de salles de bains'}</label>
            <input type="text" id="bathrooms-number" name="bathrooms-number" placeholder="${isEnglish ? 'Enter the number of bathrooms' : 'Entrez le nombre de salles de bains'}" required>
          </div>

          <!-- Garage Checkbox and Car Number Selection -->
          <div class="inline-field">
            <label for="garage" class="bold-label">${isEnglish ? 'Garage' : 'Garage'}</label>
            <input type="checkbox" id="garage" name="garage" value="Yes">
          </div>
          <select id="garage-cars" name="garage-cars" style="display: none;" required>
            <option value="">${isEnglish ? 'Select number of cars' : 'Sélectionnez le nombre de voitures'}</option>
            ${CarOptions.map((option) => `<option value="${option.value}">${option.text}</option>`).join("")}
          </select>

          <!-- Swimming Pool Checkbox -->
          <div class="inline-field">
            <label for="swimming-pool" class="bold-label">${isEnglish ? 'Swimming Pool' : 'Piscine'}</label>
            <input type="checkbox" id="swimming-pool" name="swimming-pool" value="Yes">
          </div>

          <!-- Details Textarea -->
          <div>
            <label for="details" class="bold-label">${isEnglish ? 'Details' : 'Détails'}</label>
            <textarea id="details" name="details" placeholder="${isEnglish ? 'Enter details here (minimum 5 lines)' : 'Écrivez les détails ici...'}" rows="5" required></textarea>
          </div>

          <!-- Submit Button -->
          <input type="submit" class="submit" value="${isEnglish ? 'Submit' : 'Envoyer'}">
        `;

        /**
         * Handles the form submission event.
         * Collects all input data, validates them, generates an Airtable formula, and sends it to Voiceflow.
         */
        formContainer.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevents the default form submission behavior

            // Collect input data from the form fields
            const fullName = formContainer.querySelector("#full-name").value.trim();
            const email = formContainer.querySelector("#email").value.trim();
            const phone = formContainer.querySelector("#phone").value.trim();
            const formattedPhone = formatPhoneNumber(phone); // Formats the phone number
            const sellerName = formContainer.querySelector("#seller-name").value.trim();
            const streetAddress = formContainer.querySelector("#street-address").value.trim();
            const city = formContainer.querySelector("#city").value.trim();
            const postalCode = formContainer.querySelector("#postal-code").value.trim();
            const propertyTypeElement = formContainer.querySelector('input[name="property-type"]:checked');
            const propertyType = propertyTypeElement ? propertyTypeElement.value.trim() : "";
            const yearBuild = formContainer.querySelector("#year-build").value.trim();
            const area = formContainer.querySelector("#area").value.trim();
            const roomsNumber = formContainer.querySelector("#rooms-number").value.trim();
            const bedroomsNumber = formContainer.querySelector("#bedrooms-number").value.trim();
            const bathroomsNumber = formContainer.querySelector("#bathrooms-number").value.trim();
            const insideParking = formContainer.querySelector("#garage").checked ? "Yes" : "No";
            const insideParkingCars = insideParking === "Yes" ? formContainer.querySelector("#garage-cars").value.trim() : 0;
            const outsideParking = formContainer.querySelector("#outside-parking").checked ? "Yes" : "No";
            const swimmingPool = formContainer.querySelector("#swimming-pool").checked ? "Yes" : "No";
            const details = formContainer.querySelector("#details").value.trim();

            // Validation checks with user alerts
            if (!fullName) {
                alert(isEnglish ? "Full Name is required." : "Le nom complet est obligatoire.");
                return;
            }
            if (!email || !isValidEmail(email)) {
                alert(isEnglish ? "Please enter a valid email address." : "Veuillez entrer une adresse email valide.");
                return;
            }
            if (!phone || !isValidCanadianPhoneNumber(phone)) {
                alert(isEnglish ? "Please enter a valid Canadian phone number." : "Veuillez entrer un numéro de téléphone canadien valide.");
                return;
            }
            if (!sellerName) {
                alert(isEnglish ? "Please select a seller." : "Veuillez sélectionner un vendeur.");
                return;
            }
            if (!streetAddress) {
                alert(isEnglish ? "Street Address is required." : "L'adresse de rue est obligatoire.");
                return;
            }
            if (!city) {
                alert(isEnglish ? "City is required." : "La ville est obligatoire.");
                return;
            }
            if (!postalCode) {
                alert(isEnglish ? "Postal Code is required." : "Le code postal est obligatoire.");
                return;
            }
            if (!propertyType) {
                alert(isEnglish ? "Please select a property type." : "Veuillez sélectionner un type de propriété.");
                return;
            }
            if (!yearBuild) {
                alert(isEnglish ? "Year Built is required." : "L'année de construction est obligatoire.");
                return;
            }
            if (!area) {
                alert(isEnglish ? "Area is required." : "La superficie est obligatoire.");
                return;
            }
            if (!roomsNumber) {
                alert(isEnglish ? "Number of Rooms is required." : "Le nombre de pièces est obligatoire.");
                return;
            }
            if (!bedroomsNumber) {
                alert(isEnglish ? "Number of Bedrooms is required." : "Le nombre de chambres est obligatoire.");
                return;
            }
            if (!bathroomsNumber) {
                alert(isEnglish ? "Number of Bathrooms is required." : "Le nombre de salles de bains est obligatoire.");
                return;
            }

            // Send the collected data to Voiceflow
            window.voiceflow.chat.interact({
                type: "complete",
                payload: {
                    fullName,
                    email,
                    phone: formattedPhone,
                    sellerName,
                    streetAddress,
                    city,
                    postalCode,
                    propertyType,
                    yearBuild,
                    area,
                    roomsNumber,
                    bedroomsNumber,
                    bathroomsNumber,
                    insideParking,
                    insideParkingCars,
                    outsideParking,
                    swimmingPool,
                    details,
                },
            });
        });

        /**
         * Handles the "Select All" functionality for both city and property type categories.
         * Selects or deselects all checkboxes within a specific category based on the "Select All" checkbox state.
         */
        formContainer.addEventListener("change", (event) => {
            // Handle "Select All" for cities
            if (event.target.classList.contains("select-all")) {
                const category = event.target.dataset.category;
                const checkboxes = formContainer.querySelectorAll(`.city-checkbox[data-category="${category}"]`);
                checkboxes.forEach((checkbox) => (checkbox.checked = event.target.checked));
            }
            // Update "Select All" checkbox based on individual city checkbox states
            else if (event.target.classList.contains("city-checkbox")) {
                const category = event.target.dataset.category;
                const allCheckbox = formContainer.querySelector(`.select-all[data-category="${category}"]`);
                const checkboxes = formContainer.querySelectorAll(`.city-checkbox[data-category="${category}"]`);
                allCheckbox.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
            }
            // Handle "Select All" for property types
            else if (event.target.classList.contains("select-all-property")) {
                const category = event.target.dataset.category;
                const checkboxes = formContainer.querySelectorAll(`.property-checkbox[data-category="${category}"]`);
                checkboxes.forEach((checkbox) => (checkbox.checked = event.target.checked));
            }
            // Update "Select All" checkbox based on individual property type checkbox states
            else if (event.target.classList.contains("property-checkbox")) {
                const category = event.target.dataset.category;
                const allCheckbox = formContainer.querySelector(`.select-all-property[data-category="${category}"]`);
                const checkboxes = formContainer.querySelectorAll(`.property-checkbox[data-category="${category}"]`);
                allCheckbox.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
            }
        });

        /**
         * Shows or hides the "Number of Cars" dropdown based on the garage checkbox state.
         * If the garage is checked, the dropdown is displayed; otherwise, it is hidden and reset.
         */
        formContainer.querySelector("#garage").addEventListener("change", (event) => {
            const carsField = formContainer.querySelector("#garage-cars");
            if (event.target.checked) {
                carsField.style.display = "block";
            } else {
                carsField.style.display = "none";
                carsField.value = ""; // Reset the field value
            }
        });

        // Append the form to the designated element in the DOM
        element.appendChild(formContainer);
    },
};

/**
 * Defines the Selling Capture Form Extension for Voiceflow.
 * This form captures selling-related information from the user and sends it back to Voiceflow.
 * @constant
 */
const PropertySellingExtension = {
    name: "Forms",
    type: "response",
    match: ({
        trace
    }) => trace.type === `ext_property_selling` || trace.payload.name === `ext_property_selling`,
    render: ({
        trace,
        element
    }) => {
        const {
            language
        } = trace.payload; // Extracts the language from the payload
        const isEnglish = language === 'en'; // Determines if the language is English
        const langCode = isEnglish ? 'en' : 'fr'; // Sets the language code

        /**
         * Generates the final PropertyTypes object with translations based on the selected language.
         * @constant
         */
        const PropertyTypes = Object.fromEntries(
            Object.entries(PropertyTypeMappings[langCode]).map(([label, sharedKey]) => [
                label,
                SharedPropertyTypes[sharedKey][langCode]
            ])
        );

        /**
         * Creates HTML for property type radio buttons within a specific category.
         * @param {string} category - The category name.
         * @param {Array} types - An array of property types under the category.
         * @returns {string} - A string containing HTML for the radio buttons.
         */
        const createPropertyTypeRadios = (category, types) => `
          <div>
            <div class="collapsible property-category" onclick="toggleCollapse(this)">${category}</div>
            <div class="collapse-content">
              ${types.map(
                (type) =>
                  `<div class="radio-item">
                    <input type="radio" class="property-radio" data-category="${category}" id="type-${type}" name="property-type" value="${type}">
                    <label for="type-${type}">${type}</label>
                  </div>`
              ).join("")}
            </div>
          </div>
        `;

        // Create a form element
        const formContainer = document.createElement("form");

        // Define the inner HTML of the form with dynamic labels, placeholders, and options
        formContainer.innerHTML = `
          <style>
            /* Styles for the Selling Capture Form */
            form {
              display: flex;
              flex-direction: column;
              gap: 16px;
              width: 100%;
            }
            .bold-label {
              font-weight: bold;
              color: #555;
              font-size: 0.9em;
            }
            input[type="text"], input[type="email"], input[type="tel"], select, textarea {
              width: 100%;
              border: 1px solid rgba(0, 0, 0, 0.2);
              border-radius: 4px;
              padding: 8px;
              background: #fff;
              font-size: 0.9em;
              outline: none;
              box-sizing: border-box;
            }
            textarea {
              resize: vertical;
              min-height: 100px;
            }
            .submit {
              background: linear-gradient(to right, #CC960A, #CCA60A);
              border: none;
              color: white;
              padding: 12px;
              border-radius: 5px;
              width: 100%;
              font-size: 1em;
              cursor: pointer;
              margin-top: 8px;
            }
            .inline-field {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .collapsible {
              cursor: pointer;
              background: #f1f1f1;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 0.9em;
              margin-bottom: 5px;
              text-align: left;
            }
            .collapsible:after {
              content: "\\25BC"; /* Down arrow */
              float: right;
            }
            .collapsible.active:after {
              content: "\\25B2"; /* Up arrow when active */
            }
            .collapse-content {
              display: none;
              padding: 10px;
              background: #fafafa;
              border: 1px solid #ddd;
              border-top: none;
            }
            .radio-container {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            .radio-item {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .radio-item label {
              font-weight: normal;
            }
          </style>

          <!-- Full Name Field -->
          <div>
            <label for="full-name" class="bold-label">${isEnglish ? 'Full Name' : 'Nom complet'}</label>
            <input type="text" id="full-name" name="full-name" placeholder="${isEnglish ? 'Enter your full name' : 'Entrez votre nom complet'}" required>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="bold-label">Email</label>
            <input type="email" id="email" name="email" placeholder="${isEnglish ? 'Enter your email address' : 'Entrez votre adresse email'}" required>
          </div>

          <!-- Phone Number Field -->
          <div>
            <label for="phone" class="bold-label">${isEnglish ? 'Phone Number' : 'Numéro de téléphone'}</label>
            <input type="tel" id="phone" name="phone" placeholder="${isEnglish ? 'Enter your phone number' : 'Entrez votre numéro de téléphone'}" required>
          </div>

          <!-- Seller Selection Field -->
          <div>
            <label for="seller-name" class="bold-label">${isEnglish ? 'Select a Seller' : 'Sélectionnez un Vendeur'}</label>
            <select id="seller-name" name="seller-name" required>
              <option value="">${isEnglish ? '-- Select a Seller --' : '-- Sélectionnez un vendeur --'}</option>
              ${getSellerOptions(isEnglish)} <!-- Dynamically generate seller options -->
            </select>
          </div>

          <!-- Street Address Field -->
          <div>
            <label for="street-address" class="bold-label">${isEnglish ? 'Street Address' : 'Adresse de rue'}</label>
            <input type="text" id="street-address" name="street-address" placeholder="${isEnglish ? 'Enter the street address' : 'Entrez l\'adresse de la rue'}" required>
          </div>

          <!-- City Field -->
          <div>
            <label for="city" class="bold-label">${isEnglish ? 'City' : 'Ville'}</label>
            <input type="text" id="city" name="city" placeholder="${isEnglish ? 'Enter the city' : 'Entrez la ville'}" required>
          </div>

          <!-- Postal Code Field -->
          <div>
            <label for="postal-code" class="bold-label">${isEnglish ? 'Postal Code' : 'Code Postal'}</label>
            <input type="text" id="postal-code" name="postal-code" placeholder="${isEnglish ? 'Enter the postal code' : 'Entrez le code postal'}" required>
          </div>

          <!-- Property Types Section with Collapsible Categories -->
          <div>
            <div class="collapsible bold-label" onclick="toggleCollapse(this)">${isEnglish ? 'Select Property Type' : 'Sélectionnez le type de propriété'}</div>
            <div class="collapse-content">
              <div id="property-types-container" class="radio-container">
                ${Object.entries(PropertyTypes)
                    .map(([category, types]) => createPropertyTypeRadios(category, types))
                    .join("")}
              </div>
            </div>
          </div>

          <!-- Year Built Field -->
          <div>
            <label for="year-build" class="bold-label">${isEnglish ? 'Year Built' : 'Année de construction'}</label>
            <input type="text" id="year-build" name="year-build" placeholder="${isEnglish ? 'Enter the year built' : 'Entrez l\'année de construction'}" required>
          </div>

          <!-- Area Field -->
          <div>
            <label for="area" class="bold-label">${isEnglish ? 'Area (in square feet)' : 'Superficie en pieds carrés'}</label>
            <input type="text" id="area" name="area" placeholder="${isEnglish ? 'Enter the area in square feet' : 'Entrez la superficie en pieds carrés'}" required>
          </div>

          <!-- Number of Rooms Field -->
          <div>
            <label for="rooms-number" class="bold-label">${isEnglish ? 'Number of Rooms' : 'Nombre de pièces'}</label>
            <input type="text" id="rooms-number" name="rooms-number" placeholder="${isEnglish ? 'Enter the number of rooms' : 'Entrez le nombre de pièces'}" required>
          </div>

          <!-- Number of Bedrooms Field -->
          <div>
            <label for="bedrooms-number" class="bold-label">${isEnglish ? 'Number of Bedrooms' : 'Nombre de chambres'}</label>
            <input type="text" id="bedrooms-number" name="bedrooms-number" placeholder="${isEnglish ? 'Enter the number of bedrooms' : 'Entrez le nombre de chambres'}" required>
          </div>

          <!-- Number of Bathrooms Field -->
          <div>
            <label for="bathrooms-number" class="bold-label">${isEnglish ? 'Number of Bathrooms' : 'Nombre de salles de bains'}</label>
            <input type="text" id="bathrooms-number" name="bathrooms-number" placeholder="${isEnglish ? 'Enter the number of bathrooms' : 'Entrez le nombre de salles de bains'}" required>
          </div>

          <!-- Garage Checkbox and Car Number Selection -->
          <div class="inline-field">
            <label for="garage" class="bold-label">${isEnglish ? 'Garage' : 'Garage'}</label>
            <input type="checkbox" id="garage" name="garage" value="Yes">
          </div>
          <input type="number" id="garage-cars" name="garage-cars" placeholder="${isEnglish ? 'Number of cars' : 'Nombre de voitures'}" style="display: none;" min="0">

          <!-- Outside Parking Checkbox -->
          <div class="inline-field">
            <label for="outside-parking" class="bold-label">${isEnglish ? 'Outside Parking' : 'Stationnement extérieur'}</label>
            <input type="checkbox" id="outside-parking" name="outside-parking" value="Yes">
          </div>

          <!-- Swimming Pool Checkbox -->
          <div class="inline-field">
            <label for="swimming-pool" class="bold-label">${isEnglish ? 'Swimming Pool' : 'Piscine'}</label>
            <input type="checkbox" id="swimming-pool" name="swimming-pool" value="Yes">
          </div>

          <!-- Details Textarea -->
          <div>
            <label for="details" class="bold-label">${isEnglish ? 'Details' : 'Détails'}</label>
            <textarea id="details" name="details" placeholder="${isEnglish ? 'Enter details here (minimum 5 lines)' : 'Écrivez les détails ici...'}" rows="5" required></textarea>
          </div>

          <!-- Submit Button -->
          <input type="submit" class="submit" value="${isEnglish ? 'Submit' : 'Envoyer'}">
        `;

        /**
         * Handles the form submission event.
         * Collects all input data, validates them, generates an Airtable formula, and sends it to Voiceflow.
         */
        formContainer.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevents the default form submission behavior

            // Collect input data from the form fields
            const fullName = formContainer.querySelector("#full-name").value.trim();
            const email = formContainer.querySelector("#email").value.trim();
            const phone = formContainer.querySelector("#phone").value.trim();
            const formattedPhone = formatPhoneNumber(phone); // Formats the phone number
            const sellerName = formContainer.querySelector("#seller-name").value.trim();
            const streetAddress = formContainer.querySelector("#street-address").value.trim();
            const city = formContainer.querySelector("#city").value.trim();
            const postalCode = formContainer.querySelector("#postal-code").value.trim();
            const propertyTypeElement = formContainer.querySelector('input[name="property-type"]:checked');
            const propertyType = propertyTypeElement ? propertyTypeElement.value.trim() : "";
            const yearBuild = formContainer.querySelector("#year-build").value.trim();
            const area = formContainer.querySelector("#area").value.trim();
            const roomsNumber = formContainer.querySelector("#rooms-number").value.trim();
            const bedroomsNumber = formContainer.querySelector("#bedrooms-number").value.trim();
            const bathroomsNumber = formContainer.querySelector("#bathrooms-number").value.trim();
            const insideParking = formContainer.querySelector("#garage").checked ? "Yes" : "No";
            const insideParkingCars = insideParking === "Yes" ? formContainer.querySelector("#garage-cars").value.trim() : 0;
            const outsideParking = formContainer.querySelector("#outside-parking").checked ? "Yes" : "No";
            const swimmingPool = formContainer.querySelector("#swimming-pool").checked ? "Yes" : "No";
            const details = formContainer.querySelector("#details").value.trim();

            // Validation checks with user alerts
            if (!fullName) {
                alert(isEnglish ? "Full Name is required." : "Le nom complet est obligatoire.");
                return;
            }
            if (!email || !isValidEmail(email)) {
                alert(isEnglish ? "Please enter a valid email address." : "Veuillez entrer une adresse email valide.");
                return;
            }
            if (!phone || !isValidCanadianPhoneNumber(phone)) {
                alert(isEnglish ? "Please enter a valid Canadian phone number." : "Veuillez entrer un numéro de téléphone canadien valide.");
                return;
            }
            if (!sellerName) {
                alert(isEnglish ? "Please select a seller." : "Veuillez sélectionner un vendeur.");
                return;
            }
            if (!streetAddress) {
                alert(isEnglish ? "Street Address is required." : "L'adresse de rue est obligatoire.");
                return;
            }
            if (!city) {
                alert(isEnglish ? "City is required." : "La ville est obligatoire.");
                return;
            }
            if (!postalCode) {
                alert(isEnglish ? "Postal Code is required." : "Le code postal est obligatoire.");
                return;
            }
            if (!propertyType) {
                alert(isEnglish ? "Please select a property type." : "Veuillez sélectionner un type de propriété.");
                return;
            }
            if (!yearBuild) {
                alert(isEnglish ? "Year Built is required." : "L'année de construction est obligatoire.");
                return;
            }
            if (!area) {
                alert(isEnglish ? "Area is required." : "La superficie est obligatoire.");
                return;
            }
            if (!roomsNumber) {
                alert(isEnglish ? "Number of Rooms is required." : "Le nombre de pièces est obligatoire.");
                return;
            }
            if (!bedroomsNumber) {
                alert(isEnglish ? "Number of Bedrooms is required." : "Le nombre de chambres est obligatoire.");
                return;
            }
            if (!bathroomsNumber) {
                alert(isEnglish ? "Number of Bathrooms is required." : "Le nombre de salles de bains est obligatoire.");
                return;
            }

            // Send the collected data to Voiceflow
            window.voiceflow.chat.interact({
                type: "complete",
                payload: {
                    fullName,
                    email,
                    phone: formattedPhone,
                    sellerName,
                    streetAddress,
                    city,
                    postalCode,
                    propertyType,
                    yearBuild,
                    area,
                    roomsNumber,
                    bedroomsNumber,
                    bathroomsNumber,
                    insideParking,
                    insideParkingCars,
                    outsideParking,
                    swimmingPool,
                    details,
                },
            });
        });

        /**
         * Handles the "Select All" functionality for both city and property type categories.
         * Selects or deselects all checkboxes within a specific category based on the "Select All" checkbox state.
         */
        formContainer.addEventListener("change", (event) => {
            // Handle "Select All" for cities
            if (event.target.classList.contains("select-all")) {
                const category = event.target.dataset.category;
                const checkboxes = formContainer.querySelectorAll(`.city-checkbox[data-category="${category}"]`);
                checkboxes.forEach((checkbox) => (checkbox.checked = event.target.checked));
            }
            // Update "Select All" checkbox based on individual city checkbox states
            else if (event.target.classList.contains("city-checkbox")) {
                const category = event.target.dataset.category;
                const allCheckbox = formContainer.querySelector(`.select-all[data-category="${category}"]`);
                const checkboxes = formContainer.querySelectorAll(`.city-checkbox[data-category="${category}"]`);
                allCheckbox.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
            }
            // Handle "Select All" for property types
            else if (event.target.classList.contains("select-all-property")) {
                const category = event.target.dataset.category;
                const checkboxes = formContainer.querySelectorAll(`.property-checkbox[data-category="${category}"]`);
                checkboxes.forEach((checkbox) => (checkbox.checked = event.target.checked));
            }
            // Update "Select All" checkbox based on individual property type checkbox states
            else if (event.target.classList.contains("property-checkbox")) {
                const category = event.target.dataset.category;
                const allCheckbox = formContainer.querySelector(`.select-all-property[data-category="${category}"]`);
                const checkboxes = formContainer.querySelectorAll(`.property-checkbox[data-category="${category}"]`);
                allCheckbox.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
            }
        });

        /**
         * Shows or hides the "Number of Cars" dropdown based on the garage checkbox state.
         * If the garage is checked, the dropdown is displayed; otherwise, it is hidden and reset.
         */
        formContainer.querySelector("#garage").addEventListener("change", (event) => {
            const carsField = formContainer.querySelector("#garage-cars");
            if (event.target.checked) {
                carsField.style.display = "block";
            } else {
                carsField.style.display = "none";
                carsField.value = ""; // Reset the field value
            }
        });

        // Append the form to the designated element in the DOM
        element.appendChild(formContainer);
    },
};


/**
 * LocalisationExtension handles displaying a localisation modal with a map using the LocalLogic SDK.
 * It listens for specific trace types and renders the localisation modal accordingly.
 * @constant
 */
const LocalisationExtension = {
    name: 'Localisation', // Name of the extension
    type: 'response', // Type of extension
    /**
     * Determines if the current trace matches the conditions to render this extension.
     * It checks if the trace type or payload name is 'ext_localisation'.
     * @param {Object} trace - The trace object from Voiceflow.
     * @returns {boolean} - Returns true if the trace matches, false otherwise.
     */
    match: ({ trace }) => trace.type === 'ext_localisation' || trace.payload.name === 'ext_localisation',
    /**
     * Renders the localisation modal by injecting a form into the DOM element.
     * It initializes the LocalLogic SDK and handles modal interactions.
     * @param {Object} trace - The trace object containing payload data.
     * @param {HTMLElement} element - The DOM element where the modal will be injected.
     */
    render: ({ trace, element }) => {
        const { language, key, LAT, LNG } = trace.payload; // Destructure necessary payload data

        /**
         * Opens the localisation modal by setting its display to 'block' and initializing LocalLogic.
         */
        function openModal() {
            const modal = document.getElementById('localisation-modal'); // Get the modal element
            if (modal) {
                modal.style.display = 'block'; // Display the modal
                initializeLocalLogic(language, key, parseFloat(LAT), parseFloat(LNG)); // Initialize the map
            } else {
                console.error('Modal element not found'); // Log error if modal is missing
            }
        }

        /**
         * Closes the localisation modal by setting its display to 'none'.
         */
        function closeModal() {
            const modal = document.getElementById('localisation-modal'); // Get the modal element
            if (modal) {
                modal.style.display = 'none'; // Hide the modal
            }
        }

        // Attach the closeModal function to the close button's click event
        const closeButton = document.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        } else {
            console.error('Close button not found'); // Log error if close button is missing
        }

        /**
         * Initializes the LocalLogic SDK and embeds the localisation widget into the modal.
         * @param {string} language - The language code ('en' or 'fr').
         * @param {string} key - The API key for LocalLogic SDK.
         * @param {number} lat - Latitude for the map center.
         * @param {number} lng - Longitude for the map center.
         */
        async function initializeLocalLogic(language, key, lat, lng) {
            try {
                console.log('Initializing LocalLogic SDK...');
                if (typeof LLSDKsJS === 'undefined') {
                    console.error('LLSDKsJS is not available.');
                    return; // Exit if SDK is not loaded
                }

                // Initialize the LocalLogic SDK with provided configurations
                const ll = LLSDKsJS(key, {
                    locale: language,
                    appearance: {
                        theme: "day",
                        variables: {
                            "--ll-color-primary": "#A10159",
                            "--ll-color-primary-variant1": "#010159",
                            "--ll-border-radius-small": "8px",
                            "--ll-border-radius-medium": "16px",
                            "--ll-font-family": "Avenir, sans-serif"
                        }
                    }
                });

                // Create a container for the LocalLogic widget
                const container = document.createElement("div");
                container.id = `localContentWidget-${Date.now()}`; // Unique ID for the widget
                container.style.cssText = `
                    display: flex;
                    border: 1px solid rgb(136, 136, 136);
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    position: absolute;
                    overflow: hidden;
                `;

                // Get the modal content container and append the widget container
                const widgetContent = document.getElementById('localisation-modal-content');
                if (widgetContent) {
                    widgetContent.innerHTML = ''; // Clear any existing content
                    widgetContent.appendChild(container); // Append the widget container
                } else {
                    console.error('Modal content container not found');
                    return; // Exit if content container is missing
                }

                console.log('Creating LocalLogic widget with LAT:', lat, 'LNG:', lng);
                // Create the LocalLogic widget with specified parameters
                ll.create("local-content", container, {
                    lat,
                    lng,
                    cooperativeGestures: false,
                    marker: {
                        lat,
                        lng
                    },
                    zoom: 20
                });
                console.log('LocalLogic widget initialized successfully.');
            } catch (error) {
                console.error('Error loading LocalLogic content:', error); // Log any errors during initialization
            }
        }

        /**
         * Dynamically loads the LocalLogic SDK script.
         * Ensures the script is loaded only once to prevent multiple inclusions.
         * @returns {Promise} - Resolves when the script is successfully loaded, rejects on failure.
         */
        function loadSDKScript() {
            return new Promise((resolve, reject) => {
                // Check if the SDK script is already loaded
                if (document.querySelector('script[src="https://sdk.locallogic.co/sdks-js/1.13.2/index.umd.js"]')) {
                    console.log('LocalLogic SDK script already loaded.');
                    resolve(); // Resolve immediately if script is already present
                    return;
                }

                // Create and configure the script element for the SDK
                const sdkScript = document.createElement('script');
                sdkScript.src = "https://sdk.locallogic.co/sdks-js/1.13.2/index.umd.js"; // SDK URL
                sdkScript.async = true; // Load asynchronously
                sdkScript.onload = () => {
                    console.log('LocalLogic SDK script loaded.');
                    resolve(); // Resolve the promise once the script is loaded
                };
                sdkScript.onerror = () => {
                    console.error('Failed to load the LocalLogic SDK script.');
                    reject(new Error('Failed to load LocalLogic SDK script.')); // Reject on error
                };

                document.body.appendChild(sdkScript); // Append the script to the body
                console.log('LocalLogic SDK script appended to body');
            });
        }

        // Load the LocalLogic SDK script and then open the modal
        loadSDKScript().then(openModal).catch((error) => {
            console.error('Error loading SDK script:', error); // Log any errors during script loading
        });
    },
};

/**
 * MortgageCalculatorExtension handles rendering a mortgage payment calculator modal.
 * It listens for the 'ext_mortgage_calculator' trace type and displays the calculator accordingly.
 * @constant
 */
const MortgageCalculatorExtension = {
    name: 'MortgageCalculator', // Name of the extension
    type: 'response', // Type of extension
    /**
     * Determines if the current trace matches the conditions to render this extension.
     * It checks if the trace type is 'ext_mortgage_calculator'.
     * @param {Object} trace - The trace object from Voiceflow.
     * @returns {boolean} - Returns true if the trace matches, false otherwise.
     */
    match: ({ trace }) => trace.type === 'ext_mortgage_calculator',
    /**
     * Renders the mortgage calculator modal by injecting the calculator form into the DOM.
     * It also handles form interactions, calculations, and sends data back to Voiceflow.
     * @param {Object} trace - The trace object containing payload data.
     * @param {HTMLElement} element - The DOM element where the modal will be injected.
     */
    render: ({ trace, element }) => { // 'element' is kept but not used
        const { propertyCost, language } = trace.payload; // Destructure necessary payload data
        document.documentElement.lang = language; // Update the document's language attribute

        /**
         * Defines translations for English and French languages.
         * This includes labels, placeholders, error messages, and legal content.
         * @constant
         */
        const translations = {
            fr: {
                title: 'CALCULATRICE DE VERSEMENTS HYPOTHÉCAIRES',
                propertyValue: 'Coût de la propriété:',
                downPayment: 'Mise de fonds:',
                loanAmount: 'Montant du prêt:',
                interestRate: 'Taux d\'intérêt (%):',
                amortizationPeriod: 'Période d\'amortissement:',
                paymentFrequency: 'Fréquence des versements:',
                calculate: 'Calculer',
                years: 'ans',
                weekly: 'Hebdomadaire',
                biweekly: 'Aux 2 semaines',
                monthly: 'Mensuelle',
                perWeek: '$ / semaine',
                perBiweek: '$ / 2 semaines',
                perMonth: '$ / mois',
                legalNotice: 'NOTE LÉGALE',
                errorInvalidProperty: 'Veuillez entrer un coût de propriété valide.',
                errorMinDownPayment: 'La mise de fonds minimale doit être de {amount}$ (5% du coût de la propriété)',
                errorMaxDownPayment: 'La mise de fonds ne peut pas être supérieure au coût de la propriété',
                errorInvalidDownPayment: 'Veuillez entrer une mise de fonds valide',
                doneMessage: 'Terminé', // Added confirmation message
                legalContent: {
                    title: 'NOTE LÉGALE',
                    point1: 'Les outils en ligne sont mis à votre disposition pour vous aider à planifier et à réaliser vos projets, ou pour répondre à vos besoins d\'information en matière d\'habitation. Ils doivent être utilisés à des fins personnelles uniquement.',
                    point2: 'Les résultats sont basés sur les données que vous y entrez. Nous vous invitons à communiquer avec votre conseiller à la caisse pour obtenir des conseils personnalisés, une préautorisation ou un financement, s\'il y a lieu.',
                    point3: 'Les calculs s\'appuient sur les hypothèses de base suivantes :',
                    subPoint1: 'Le taux d\'intérêt hypothécaire reste le même durant toute la période d\'amortissement.',
                    subPoint2: 'Les résultats de cet outil de calcul sont des estimations basées sur les données générales que vous y entrez. Ils peuvent changer selon votre situation financière et budgétaire au moment de l\'emprunt.',
                    point4: 'Remarques : Le présent outil a pour but de vous aider à calculer et à optimiser le montant des versements de votre prêt hypothécaire ou d\'un prêt hypothécaire que vous envisagez demander. Ces taux ne tiennent pas compte du coût de l\'assurance vie et invalidité si vous souscrivez une telle assurance. Ils sont sujets à changement sans préavis. Certaines conditions s\'appliquent.'
                }
            },
            en: {
                title: 'MORTGAGE PAYMENT CALCULATOR',
                propertyValue: 'Property Value:',
                downPayment: 'Down Payment:',
                loanAmount: 'Loan Amount:',
                interestRate: 'Interest Rate (%):',
                amortizationPeriod: 'Amortization Period:',
                paymentFrequency: 'Payment Frequency:',
                calculate: 'Calculate',
                years: 'years',
                weekly: 'Weekly',
                biweekly: 'Bi-weekly',
                monthly: 'Monthly',
                perWeek: '$ / week',
                perBiweek: '$ / 2 weeks',
                perMonth: '$ / month',
                legalNotice: 'LEGAL NOTICE',
                errorInvalidProperty: 'Please enter a valid property value.',
                errorMinDownPayment: 'Minimum down payment must be {amount}$ (5% of property value)',
                errorMaxDownPayment: 'Down payment cannot be greater than property value',
                errorInvalidDownPayment: 'Please enter a valid down payment',
                doneMessage: 'Done', // Added confirmation message
                legalContent: {
                    title: 'LEGAL NOTICE',
                    point1: 'Online tools are provided to help you plan and achieve your projects, or to meet your housing information needs. They must be used for personal purposes only.',
                    point2: 'Results are based on the data you enter. We invite you to contact your advisor at the bank to obtain personalized advice, pre-approval or financing, if applicable.',
                    point3: 'Calculations are based on the following basic assumptions:',
                    subPoint1: 'The mortgage interest rate remains the same throughout the amortization period.',
                    subPoint2: 'The results of this calculation tool are estimates based on the general data you enter. They may change according to your financial and budgetary situation at the time of borrowing.',
                    point4: 'Notes: This tool is intended to help you calculate and optimize the payment amount of your mortgage loan or a mortgage loan you are considering applying for. These rates do not take into account the cost of life and disability insurance if you subscribe to such insurance. They are subject to change without notice. Some conditions apply.'
                }
            }
        };

        const text = translations[language] || translations.fr; // Select the appropriate translation based on language

        /**
         * Creates the HTML form for the mortgage calculator and injects it into the modal content.
         * @param {number} propertyCost - The cost of the property.
         * @param {HTMLElement} modalContent - The container element for the modal content.
         */
        function createForm(propertyCost, modalContent) {
            const minDownPayment = (propertyCost * 0.05).toFixed(2); // Calculate the minimum down payment (5%)

            const formHTML = `
                        <div class="Mortgage">
                            <p class="Mortgage__Title">${text.title}</p>
                            <p class="Mortgage__Title" id="calculator-error-msg" style="color: red;"></p>
                            
                            <div class="Mortgage__Row">
                                <div class="Mortgage__Column">
                                    <label class="Mortgage__Label" for="cost">${text.propertyValue}</label>
                                    <input class="Mortgage__Input" id="cost" type="number" value="${propertyCost}" min="0">
                                </div>
                                <div class="Mortgage__Column">
                                    <label class="Mortgage__Label" for="down-payment">${text.downPayment}</label>
                                    <div class="input-wrapper">
                                        <input 
                                            class="Mortgage__Input" 
                                            id="down-payment" 
                                            type="number" 
                                            value="${minDownPayment}"
                                            step="1000"
                                            onfocus="this.select()">
                                        <span id="downPercent" class="input-suffix">(5.00 %)</span>
                                    </div>
                                </div>
                            </div>

                            <div class="Mortgage__Row">
                                <div class="Mortgage__Column">
                                    <label class="Mortgage__Label" for="loan-amount">${text.loanAmount}</label>
                                    <input class="Mortgage__Input" id="loan-amount" type="number" step="0.01" value="${(propertyCost - minDownPayment).toFixed(2)}" disabled>
                                </div>
                                <div class="Mortgage__Column">
                                    <label class="Mortgage__Label" for="interest-rate">${text.interestRate}</label>
                                    <input class="Mortgage__Input" id="interest-rate" type="number" step="0.01" min="0" max="100" value="5.50">
                                </div>
                            </div>

                            <div class="Mortgage__Row">
                                <div class="Mortgage__Column">
                                    <label class="Mortgage__Label" for="amortization-period">${text.amortizationPeriod}</label>
                                    <select class="Mortgage__Select" id="amortization-period">
                                        <option value="5">5 ${text.years}</option>
                                        <option value="10">10 ${text.years}</option>
                                        <option value="15">15 ${text.years}</option>
                                        <option value="20">20 ${text.years}</option>
                                        <option value="25" selected>25 ${text.years}</option>
                                    </select>
                                </div>
                                <div class="Mortgage__Column">
                                    <label class="Mortgage__Label" for="payment-frequency">${text.paymentFrequency}</label>
                                    <select class="Mortgage__Select" id="payment-frequency">
                                        <option value="week">${text.weekly}</option>
                                        <option value="2-weeks" selected>${text.biweekly}</option>
                                        <option value="month">${text.monthly}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="Mortgage__Row">
                                <div class="Mortgage__Column">
                                    <button class="Mortgage__Button" id="calculate">
                                        <i class="fa fa-calculator"></i>
                                        ${text.calculate}
                                    </button>
                                </div>
                                <div class="Mortgage__Column">
                                    <input disabled class="Mortgage__Input Mortgage__Input--Payment" type="text" placeholder="">
                                </div>
                            </div>
                            
                            <div class="Mortgage__Row">
                                <div class="Mortgage__Column Mortgage__Column--Button legal">
                                    <button class="Mortgage__Button btnLegal">
                                        ${text.legalNotice}
                                        <i class="fa fa-plus" id="legal_more"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="Mortgage__Row mortgage_legal" style="display: none;">
                                <div class="Modal__Title">${text.legalContent.title}</div>
                                <div class="Modal__Content">
                                    <ul>
                                        <li>
                                            <span>${text.legalContent.point1}</span>
                                        </li>
                                        <li>
                                            <span>${text.legalContent.point2}</span>
                                        </li>
                                        <li>
                                            <span>${text.legalContent.point3}</span>
                                            <ul class="smaller">
                                                <li>
                                                    <span>${text.legalContent.subPoint1}</span>
                                                </li>
                                                <li>
                                                    <span>${text.legalContent.subPoint2}</span>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <span>${text.legalContent.point4}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `;
            modalContent.innerHTML = formHTML; // Inject the form HTML into the modal content
        }

        /**
         * Calculates the mortgage payment based on the loan amount, interest rate, amortization period, and payment frequency.
         * Uses the standard mortgage formula.
         * @param {number} P - Principal loan amount.
         * @param {number} annualRate - Annual interest rate in percentage.
         * @param {number} years - Amortization period in years.
         * @param {number} paymentsPerYear - Number of payments per year (e.g., 52 for weekly).
         * @returns {number} - The calculated mortgage payment.
         */
        function calculateMortgagePayment(P, annualRate, years, paymentsPerYear) {
            const r = (annualRate / 100) / paymentsPerYear; // Periodic interest rate
            const n = years * paymentsPerYear; // Total number of payments
            if (r === 0) return P / n; // Handle zero interest rate
            const numerator = P * r * Math.pow(1 + r, n);
            const denominator = Math.pow(1 + r, n) - 1;
            return numerator / denominator; // Return the mortgage payment
        }

        /**
         * Initializes the mortgage calculator by setting up event listeners and handling form interactions.
         * @param {HTMLElement} modalContent - The container element for the modal content.
         */
        function initCalculator(modalContent) {
            const form = modalContent.querySelector('.Mortgage'); // Select the mortgage form
            const costInput = form.querySelector('#cost'); // Property cost input
            const downPaymentInput = form.querySelector('#down-payment'); // Down payment input
            const loanAmountInput = form.querySelector('#loan-amount'); // Loan amount display
            const downPercentSpan = form.querySelector('#downPercent'); // Down payment percentage display
            const calculateButton = form.querySelector('#calculate'); // Calculate button
            const paymentOutput = form.querySelector('.Mortgage__Input--Payment'); // Payment output field
            const errorMsg = form.querySelector('#calculator-error-msg'); // Error message display

            /**
             * Validates the input fields and updates the loan amount and down payment percentage.
             * Displays error messages if validations fail.
             * @returns {boolean} - Returns true if validations pass, false otherwise.
             */
            function validateAndUpdate() {
                const cost = parseFloat(costInput.value); // Parse property cost
                const downPaymentValue = downPaymentInput.value.trim(); // Trim down payment input
                let downPayment = parseFloat(downPaymentValue); // Parse down payment

                // Validate property cost
                if (isNaN(cost) || cost <= 0) {
                    errorMsg.textContent = text.errorInvalidProperty; // Display error
                    return false;
                }

                const minDownPayment = cost * 0.05; // Calculate minimum down payment (5%)

                // Handle empty down payment input
                if (downPaymentValue === '') {
                    downPercentSpan.textContent = '(0.00 %)'; // Reset percentage display
                    loanAmountInput.value = cost.toFixed(2); // Set loan amount equal to property cost
                    errorMsg.textContent = ''; // Clear error message
                    return true;
                }

                if (!isNaN(downPayment)) {
                    const downPaymentPercentage = (downPayment / cost) * 100; // Calculate percentage
                    // Update the appearance of the calculate button based on down payment percentage
                    if (downPaymentPercentage < 5) {
                        calculateButton.style.backgroundColor = '#cccccc'; // Disable button appearance
                        calculateButton.style.cursor = 'not-allowed'; // Change cursor
                        errorMsg.textContent = text.errorMinDownPayment.replace('{amount}', minDownPayment.toFixed(2)); // Display error
                    } else {
                        calculateButton.style.backgroundColor = '#A10159'; // Enable button appearance
                        calculateButton.style.cursor = 'pointer'; // Change cursor
                        errorMsg.textContent = downPayment > cost ? text.errorMaxDownPayment : ''; // Display error if down payment exceeds property cost
                    }

                    const downPercent = ((downPayment / cost) * 100).toFixed(2); // Calculate percentage
                    downPercentSpan.textContent = `(${downPercent} %)`; // Update percentage display
                    loanAmountInput.value = (cost - downPayment).toFixed(2); // Update loan amount
                } else {
                    errorMsg.textContent = text.errorInvalidDownPayment; // Display error for invalid down payment
                }
                return true;
            }

            /**
             * Handles the calculation of the mortgage payment when the calculate button is clicked.
             * Validates inputs, performs the calculation, and displays the result.
             */
            function handleCalculate() {
                if (!validateAndUpdate()) return; // Exit if validations fail

                const cost = parseFloat(costInput.value); // Property cost
                const downPayment = parseFloat(downPaymentInput.value); // Down payment
                const downPaymentPercentage = (downPayment / cost) * 100; // Down payment percentage

                if (downPaymentPercentage < 5) return; // Exit if down payment is less than 5%

                const loanAmount = parseFloat(loanAmountInput.value); // Loan amount
                const interestRate = parseFloat(form.querySelector('#interest-rate').value); // Interest rate
                const amortization = parseInt(form.querySelector('#amortization-period').value); // Amortization period in years
                const frequency = form.querySelector('#payment-frequency').value; // Payment frequency

                const paymentsPerYear = frequency === 'week' ? 52 : frequency === '2-weeks' ? 26 : 12; // Determine payments per year
                const payment = calculateMortgagePayment(loanAmount, interestRate, amortization, paymentsPerYear); // Calculate payment

                const suffix = frequency === 'week' ? text.perWeek :
                    frequency === '2-weeks' ? text.perBiweek : text.perMonth; // Determine payment suffix

                paymentOutput.value = `${payment.toFixed(2)} ${suffix}`; // Display the calculated payment
            }

            // Handle legal notice toggle functionality
            const legalButton = form.querySelector('.btnLegal'); // Select the legal button
            const legalContent = form.querySelector('.mortgage_legal'); // Select the legal content section

            /**
             * Toggles the display of the legal content when the legal button is clicked.
             */
            legalButton.addEventListener('click', () => {
                const isHidden = legalContent.style.display === 'none' || legalContent.style.display === '';
                legalContent.style.display = isHidden ? 'block' : 'none'; // Toggle display
            });

            // Attach event listeners for input validation and calculation
            costInput.addEventListener('input', validateAndUpdate); // Validate property cost input
            downPaymentInput.addEventListener('input', validateAndUpdate); // Validate down payment input
            calculateButton.addEventListener('click', handleCalculate); // Handle calculation on button click
        }

        /**
         * Opens the mortgage calculator modal by setting its display to 'block'.
         */
        function openMortgageModal() {
            const modal = document.getElementById('mortgage-modal'); // Get the modal element
            if (modal) {
                modal.style.display = 'block'; // Display the modal
            } else {
                console.error('Modal element not found'); // Log error if modal is missing
            }
        }

        /**
         * Closes the mortgage calculator modal by setting its display to 'none'.
         * Also clears the modal content to prevent duplication.
         */
        function closeMortgageModal() {
            const modal = document.getElementById('mortgage-modal'); // Get the modal element
            if (modal) {
                modal.style.display = 'none'; // Hide the modal
                const content = modal.querySelector('#mortgage-calculator-modal-content'); // Get the content container
                if (content) {
                    content.innerHTML = ''; // Clear the content
                }
            } else {
                console.error('Modal element not found'); // Log error if modal is missing
            }
        }

        // Get the modal content container and inject the form
        const modalContent = document.getElementById('mortgage-calculator-modal-content');
        if (modalContent) {
            createForm(propertyCost, modalContent); // Create and inject the form
            initCalculator(modalContent); // Initialize calculator functionalities
            openMortgageModal(); // Open the modal

            /**
             * Sends a custom trace to Voiceflow indicating that the mortgage modal has been opened.
             * This allows Voiceflow to respond appropriately, possibly logging the event or triggering other actions.
             */
            if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
                window.voiceflow.chat.interact({
                    type: "mortgage_modal_opened", // Custom trace type
                    payload: {
                        language: language, // Pass the language to Voiceflow for contextual responses
                    },
                });
                console.log(`Trace 'mortgage_modal_opened' sent to Voiceflow.`);
            } else {
                console.error('Voiceflow interact API not available.'); // Log error if Voiceflow API is missing
            }
        } else {
            console.error('Modal content container not found'); // Log error if content container is missing
        }
    }
};

/**
 * Function to open the mortgage modal.
 * This function is separate to allow easy invocation if needed elsewhere.
 */
function openMortgageModal() {
    const modal = document.getElementById('mortgage-modal'); // Get the modal element
    if (modal) {
        modal.style.display = 'block'; // Display the modal
    } else {
        console.error('Modal element not found'); // Log error if modal is missing
    }
}

/**
 * Function to close the mortgage modal.
 * This function is separate to allow easy invocation if needed elsewhere.
 */
function closeMortgageModal() {
    const modal = document.getElementById('mortgage-modal'); // Get the modal element
    if (modal) {
        modal.style.display = 'none'; // Hide the modal
        const content = modal.querySelector('#mortgage-calculator-modal-content'); // Get the content container
        if (content) {
            content.innerHTML = ''; // Clear the content to prevent duplication
        }
    } else {
        console.error('Modal element not found'); // Log error if modal is missing
    }
}

// Expose all extensions to the global window object for accessibility by Voiceflow or other scripts
window.ContactExtension = ContactExtension;
window.BookingExtension = BookingExtension;
window.PropertySearchExtension = PropertySearchExtension;
window.PropertySellingExtension = PropertySellingExtension;
window.LocalisationExtension = LocalisationExtension;
window.MortgageCalculatorExtension = MortgageCalculatorExtension;
