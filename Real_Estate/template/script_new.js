function isValidEmail(email) {
   const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
   return emailPattern.test(email);
}

function isValidCanadianPhoneNumber(phoneNumber) {
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

// Categories
const SharedPropertyCategories = {
   Residential: {
      en: [
         "House",
         "Co-ownership House",
         "Intergenerational",
         "Mobile House",
         "Condo",
         "Loft / Studio",
         "Cottage",
         "Farmhouse",
         "Land"
      ],
      fr: [
         "Maison",
         "Maison en copropriété",
         "Intergénération",
         "Maison mobile",
         "Condo",
         "Loft / Studio",
         "Chalet",
         "Fermette",
         "Terrain"
      ],
   },
   Plex: {
      en: ["Duplex", "Triplex", "Quadruplex", "Quintuplex", "MultiPlex"],
      fr: ["Duplex", "Triplex", "Quadruplex", "Quintuplex", "MultiPlex"],
   },
};

// ADDED: House Type lists (en/fr)
const SharedPropertyTypes = {
   en: [
      "Multi-level",
      "Multi-storey",
      "Detached",
      "Semi-detached",
      "Row House",
      "Divided",
      "Undivided",
      "Single-storey",
      "One and a half storeys",
   ],
   fr: [
      "À Paliers multiples",
      "À étages",
      "Détaché",
      "Jumelé",
      "En rangée",
      "Divise",
      "Indivise",
      "Plain-pied",
      "À un étage et demi",
   ],
};

// Sellers
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

function getSellerOptions(isEnglish, includeNoPreference = true) {
   const sellersList = includeNoPreference
       ? Sellers
       : Sellers.filter((seller) => seller !== "No Preference");
   return sellersList
       .map((seller) => {
          const displayName = isEnglish
              ? seller
              : seller === "No Preference"
                  ? "Pas de préférence"
                  : seller;
          return `<option value="${seller}">${displayName}</option>`;
       })
       .join("");
}

function toggleCollapse(element) {
   element.classList.toggle("active");
   const content = element.nextElementSibling;
   content.style.display = content.style.display === "block" ? "none" : "block";
}

// CHANGED: Added logic for {HouseType} to the Airtable formula
function generateAirtableFormula(input) {
   const {
      cityName = [],
      category = [],
      houseType = [], // ADDED
      bedrooms = 0,
      bathrooms = 0,
      priceMax = 0,
      priceMin = 0,
      parkingIndoor = "",
      car = 0,
      swimmingPool = "",
   } = input;

   const conditions = [];

   // City filter
   if (cityName.length > 0) {
      const cityConditions = cityName.map((city) => `FIND("${city}", {City})`);
      const cityFormula =
          cityConditions.length === 1
              ? cityConditions[0]
              : `OR(${cityConditions.join(", ")})`;
      conditions.push(cityFormula);
   }



   // Category filter
   if (category.length > 0) {
      const categoryConditions = category.map((cat) => `{Category} = "${cat}"`);
      const categoryFormula =
          categoryConditions.length === 1
              ? categoryConditions[0]
              : `OR(${categoryConditions.join(", ")})`;
      conditions.push(categoryFormula);
   }

   // ADDED: House Type filter (optional)
   if (houseType.length > 0) {
      // If your Airtable field is something else, rename {HouseType} below
      const houseTypeConditions = houseType.map((ht) => `FIND("${ht}", {Type})`);
      const houseTypeFormula =
          houseTypeConditions.length === 1
              ? houseTypeConditions[0]
              : `OR(${houseTypeConditions.join(", ")})`;
      conditions.push(houseTypeFormula);
   }

   // Bedrooms filter
   if (bedrooms > 0) {
      conditions.push(`{Bedrooms} >= ${bedrooms}`);
   }

   // Bathrooms filter
   if (bathrooms > 0) {
      conditions.push(`{Bathrooms} >= ${bathrooms}`);
   }

   // Price range
   if (priceMin > 0) {
      conditions.push(`{Price} >= ${priceMin}`);
   }
   if (priceMax > 0) {
      conditions.push(`{Price} <= ${priceMax}`);
   }

   // Parking
   if (parkingIndoor === "Yes") {
      conditions.push(`{IndoorParking} = "Yes"`);
   }
   if (car > 0) {
      conditions.push(`{CarIndoor} >= ${car}`);
   }

   // Swimming pool
   if (swimmingPool === "Yes") {
      conditions.push(`{SwimmingPool} = "Yes"`);
   }

   return `AND(${conditions.join(", ")})`;
}

// Service Options, Booking, Mappings
const ServiceOptions = [
   {
      value: "Ventes",
      label: {
         en: "Sell",
         fr: "Ventes",
      },
   },
   {
      value: "Achat",
      label: {
         en: "Buy",
         fr: "Achat",
      },
   },
   {
      value: "Information",
      label: {
         en: "Information",
         fr: "Information",
      },
   },
];

const BookingUrls = {
   "Emma Thompson":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
   "Liam Carter":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
   "Sophia Martinez":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
   "Ethan Brown":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
   "Olivia Davis":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
   "Noah Wilson":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
   "Ava Johnson":
       "https://calendly.com/nextg-ai-test/maplewood-realty-clone?name={Full_Name}&email={Email}",
};

const PropertyTypeMappings = {
   en: {
      Residential: "Residential",
      Plex: "Plex",
   },
   fr: {
      Résidentiel: "Residential",
      Plex: "Plex",
   },
};

const NumericOptions = ["1", "2", "3", "4", "5"];
const OptionMappings = {
   Bedroom: {
      en: "+ bedrooms",
      fr: "+ chambres",
   },
   Bathroom: {
      en: "+ bathrooms",
      fr: "+ salles de bains",
   },
   Car: {
      en: "+ car",
      fr: "+ voiture",
   },
};

const SharedCities = {
   "North Shore": [
      "Auteuil",
      "Blainville",
      "Boisbriand",
      "Bois-des-Filion",
      "Deux-Montagnes",
      "Duvernay",
      "Fabreville",
      "Laval-des-Rapides",
      "Laval-Ouest",
      "Laval-sur-le-Lac",
      "Lorraine",
      "Mirabel",
      "Oka",
      "Pointe-Calumet",
      "Pont-Viau",
      "Rosemère",
      "Sainte-Anne-des-Plaines",
      "Sainte-Dorothée",
      "Sainte-Marthe-sur-le-Lac",
      "Sainte-Rose",
      "Sainte-Thérèse",
      "Saint-Eustache",
      "Saint-François",
      "Saint-Joseph-du-Lac",
      "Saint-Vincent-de-Paul",
      "Vimont",
   ],
   Montreal: [
      "Ahuntsic",
      "Anjou",
      "Baie-d'Urfé",
      "Beaconsfield",
      "Cartierville",
      "Côte-des-Neiges",
      "Côte-Saint-Luc",
      "Dollard-Des-Ormeaux",
      "Dorval",
      "Hampstead",
      "Hochelaga-Maisonneuve",
      "Kirkland",
      "Lachine",
      "LaSalle",
      "Le Plateau-Mont-Royal",
      "Le Sud-Ouest",
      "L'Île-Bizard",
      "L'Île-Dorval",
      "Mercier",
      "Montréal-Est",
      "Montréal-Nord",
      "Montréal-Ouest",
      "Mont-Royal",
      "Notre-Dame-de-Grâce",
      "Outremont",
      "Parc-Extension",
      "Pierrefonds-Roxboro",
      "Pointe-aux-Trembles",
      "Pointe-Claire",
      "Rivière-des-Prairies",
      "Rosemont",
      "Sainte-Anne-de-Bellevue",
      "Sainte-Geneviève",
      "Saint-Laurent",
      "Saint-Léonard",
      "Saint-Michel",
      "Senneville",
      "Verdun/Île-des-Soeurs",
      "Ville-Marie",
      "Villeray",
      "Westmount",
   ],
   "South Shore": [
      "Beauharnois",
      "Beloeil",
      "Boucherville",
      "Brossard",
      "Candiac",
      "Carignan",
      "Chambly",
      "Châteauguay",
      "Delson",
      "Greenfield Park",
      "Kahnawake",
      "La Prairie",
      "Léry",
      "Longueuil",
      "McMasterville",
      "Mercier",
      "Mont-Saint-Hilaire",
      "Otterburn Park",
      "Saint-Antoine-sur-Richelieu",
      "Saint-Basile-le-Grand",
      "Saint-Bruno-de-Montarville",
      "Saint-Charles-sur-Richelieu",
      "Saint-Constant",
      "Saint-Denis-sur-Richelieu",
      "Saint-Étienne-de-Beauharnois",
      "Saint-Isidore",
      "Saint-Jean-Baptiste",
      "Saint-Lambert",
      "Saint-Louis-de-Gonzague",
      "Saint-Marc-sur-Richelieu",
      "Saint-Mathieu",
      "Saint-Mathieu-de-Beloeil",
      "Saint-Philippe",
      "Saint-Stanislas-de-Kostka",
      "Saint-Urbain-Premier",
      "Sainte-Catherine",
      "Sainte-Martine",
      "Vieux-Longueuil",
      "Saint-Hubert",
   ],
};

const CityMappings = {
   en: {
      "Montreal-North Shore": "North Shore",
      Montreal: "Montreal",
      "Montreal-South Shore": "South Shore",
   },
   fr: {
      "Rive-Nord de Montréal": "North Shore",
      Montréal: "Montreal",
      "Rive-Sud de Montréal": "South Shore",
   },
};

// Mapped numeric + label for bedrooms, bathrooms, etc.
const Options = Object.fromEntries(
    Object.entries(OptionMappings).map(([key, translations]) => [
       key,
       {
          en: NumericOptions.map((num) => ({
             value: num,
             text: num + translations.en,
          })),
          fr: NumericOptions.map((num) => ({
             value: num,
             text: num + translations.fr,
          })),
       },
    ])
);

function getServiceOptions(language) {
   return ServiceOptions.map((serviceOption) => {
      const label = serviceOption.label[language];
      return `<option value="${serviceOption.value}">${label}</option>`;
   }).join("");
}

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
      } = trace.payload;
      const isEnglish = language === 'en';
      const formContainer = document.createElement("form");
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
          ${getServiceOptions(language)}
        </select>
      </div>
      <div>
        <label for="seller-name" class="bold-label">${isEnglish ? 'Select a Seller' : 'Sélectionnez un vendeur'}</label>
        <select id="seller-name" name="seller-name" required>
          <option value="">${isEnglish ? '-- Select a Seller --' : '-- Sélectionnez un vendeur --'}</option>
          ${getSellerOptions(isEnglish)}
        </select>
      </div>
      <div>
        <label for="message" class="bold-label">Message</label>
        <textarea id="message" name="message" placeholder="${isEnglish ? 'Write your message here...' : 'Écrivez votre message ici...'}" rows="5" required></textarea>
      </div>
      <input type="submit" class="submit" value="${isEnglish ? 'Submit' : 'Envoyer'}">
    `;
      formContainer.addEventListener("submit", (event) => {
         event.preventDefault();
         const fullName = formContainer.querySelector("#full-name").value.trim();
         const email = formContainer.querySelector("#email").value.trim();
         const phone = formContainer.querySelector("#phone").value.trim();
         const formattedPhone = formatPhoneNumber(phone); // Formatage du numéro de téléphone
         const service = formContainer.querySelector("#service").value.trim(); // Valeur en français
         const sellerName = formContainer.querySelector("#seller-name").value.trim();
         const message = formContainer.querySelector("#message").value.trim();
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
         window.voiceflow.chat.interact({
            type: "complete",
            payload: {
               fullName,
               email,
               phone: formattedPhone,
               service,
               sellerName,
               message,
            },
         });
      });
      element.appendChild(formContainer);
   },
};

const BookingExtension = {
   name: "Forms",
   type: "response",
   match: ({
              trace
           }) =>
       trace.type === `ext_booking` || trace.payload.name === `ext_booking`,
   render: ({
               trace,
               element
            }) => {
      const {
         language
      } = trace.payload;
      const isEnglish = language === 'en';
      const formContainer = document.createElement("form");
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
          ${getSellerOptions(isEnglish, false)}
        </select>
      </div>
      <button type="button" class="book-now" id="book-now">${isEnglish ? 'Book Now' : 'Réserver maintenant'}</button>
    `;
      const bookNowButton = formContainer.querySelector("#book-now");
      bookNowButton.addEventListener("click", () => {
         const fullName = formContainer.querySelector("#full-name").value.trim();
         const email = formContainer.querySelector("#email").value.trim();
         const sellerName = formContainer.querySelector("#seller-name").value.trim();
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
         if (BookingUrls[sellerName]) {
            const bookingUrl = BookingUrls[sellerName]
                .replace("{Full_Name}", encodeURIComponent(fullName))
                .replace("{Email}", encodeURIComponent(email));
            window.voiceflow.chat.interact({
               type: "complete",
               payload: {
                  fullName,
                  email,
                  sellerName,
                  bookingUrl
               },
            });
            window.open(bookingUrl, "_blank");
         } else {
            alert(isEnglish ? "No booking URL available for the selected seller." : "Aucune URL de réservation disponible pour le vendeur sélectionné.");
         }
      });

      element.appendChild(formContainer);
   },
};
const SellingExtension = {
   name: "Forms",
   type: "response",
   match: ({
              trace
           }) =>
       trace.type === `ext_selling` || trace.payload.name === `ext_selling`,
   render: ({
               trace,
               element
            }) => {
      const {
         language
      } = trace.payload;
      const isEnglish = language === 'en';
      const langCode = isEnglish ? 'en' : 'fr';

      // Generate final PropertyTypes object with translations
      const PropertyTypes = Object.fromEntries(
          Object.entries(PropertyTypeMappings[langCode]).map(([label, sharedKey]) => [
             label,
             SharedPropertyTypes[sharedKey][langCode]
          ])
      );


      const createPropertyTypeRadios = (category, types) => {
         // Get the shared key from PropertyTypeMappings
         const sharedKey = PropertyTypeMappings[langCode][category];
         // Get the category types from SharedPropertyTypes using the shared key
         const categoryTypes = SharedPropertyTypes[sharedKey];

         return `
		<div>
		  <div class="collapsible property-category" onclick="toggleCollapse(this)">${category}</div>
		  <div class="collapse-content">
			${categoryTypes[langCode].map((type, index) => {
            const frenchValue = categoryTypes.fr[index];
            return `
				<div class="radio-item">
				  <input 
					type="radio" 
					class="property-radio" 
					data-category="${category}" 
					id="type-${type.replace(/\s+/g, '-')}" 
					name="property-type" 
					value="${frenchValue}"
				  >
				  <label for="type-${type.replace(/\s+/g, '-')}">${type}</label>
				</div>`;
         }).join("")}
		  </div>
		</div>
		`;
      };

      const formContainer = document.createElement("form");

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
          content: "\\25BC";
          float: right;
        }
        .collapsible.active:after {
          content: "\\25B2";
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
        <label for="seller-name" class="bold-label">${isEnglish ? 'Select a Seller' : 'Sélectionnez un Vendeur'}</label>
        <select id="seller-name" name="seller-name" required>
          <option value="">${isEnglish ? '-- Select a Seller --' : '-- Sélectionnez un Vendeur --'}</option>
          ${getSellerOptions(isEnglish)}
        </select>
      </div>

      <div>
        <label for="street-address" class="bold-label">${isEnglish ? 'Street Address' : 'Adresse de rue'}</label>
        <input type="text" id="street-address" name="street-address" placeholder="${isEnglish ? 'Enter the street address' : 'Entrez l\'adresse de la rue'}" required>
      </div>

      <div>
        <label for="city" class="bold-label">${isEnglish ? 'City' : 'Ville'}</label>
        <input type="text" id="city" name="city" placeholder="${isEnglish ? 'Enter the city' : 'Entrez la ville'}" required>
      </div>

      <div>
        <label for="postal-code" class="bold-label">${isEnglish ? 'Postal Code' : 'Code Postal'}</label>
        <input type="text" id="postal-code" name="postal-code" placeholder="${isEnglish ? 'Enter the postal code' : 'Entrez le code postal'}" required>
      </div>


      
      <!-- Property Types -->
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

      <div>
        <label for="year-build" class="bold-label">${isEnglish ? 'Year Built' : 'Année de construction'}</label>
        <input type="text" id="year-build" name="year-build" placeholder="${isEnglish ? 'Enter the year built' : 'Entrez l\'année de construction'}" required>
      </div>

      <div>
        <label for="area" class="bold-label">${isEnglish ? 'Area (in square feet)' : 'Superficie en pieds carrés'}</label>
        <input type="text" id="area" name="area" placeholder="${isEnglish ? 'Enter the area in square feet' : 'Entrez la superficie en pieds carrés'}" required>
      </div>

      <div>
        <label for="rooms-number" class="bold-label">${isEnglish ? 'Number of Rooms' : 'Nombre de pièces'}</label>
        <input type="text" id="rooms-number" name="rooms-number" placeholder="${isEnglish ? 'Enter the number of rooms' : 'Entrez le nombre de pièces'}" required>
      </div>

      <div>
        <label for="bedrooms-number" class="bold-label">${isEnglish ? 'Number of Bedrooms' : 'Nombre de chambres'}</label>
        <input type="text" id="bedrooms-number" name="bedrooms-number" placeholder="${isEnglish ? 'Enter the number of bedrooms' : 'Entrez le nombre de chambres'}" required>
      </div>

      <div>
        <label for="bathrooms-number" class="bold-label">${isEnglish ? 'Number of Bathrooms' : 'Nombre de salles de bains'}</label>
        <input type="text" id="bathrooms-number" name="bathrooms-number" placeholder="${isEnglish ? 'Enter the number of bathrooms' : 'Entrez le nombre de salles de bains'}" required>
      </div>

      <!-- Garage -->
      <div class="inline-field">
        <label for="garage" class="bold-label">${isEnglish ? 'Garage' : 'Garage'}</label>
        <input type="checkbox" id="garage" name="garage" value="Yes">
      </div>
      <input type="number" id="garage-cars" name="garage-cars" placeholder="${isEnglish ? 'Number of cars' : 'Nombre de voitures'}" style="display: none;">

      <!-- Outside Parking -->
      <div class="inline-field">
        <label for="outside-parking" class="bold-label">${isEnglish ? 'Outside Parking' : 'Stationnement extérieur'}</label>
        <input type="checkbox" id="outside-parking" name="outside-parking" value="Yes">
      </div>

      <!-- Swimming Pool -->
      <div class="inline-field">
        <label for="swimming-pool" class="bold-label">${isEnglish ? 'Swimming Pool' : 'Piscine'}</label>
        <input type="checkbox" id="swimming-pool" name="swimming-pool" value="Yes">
      </div>

      <div>
        <label for="details" class="bold-label">${isEnglish ? 'Details' : 'Détails'}</label>
        <textarea id="details" name="details" placeholder="${isEnglish ? 'Enter details here (minimum 5 lines)' : 'Écrivez les détails ici...'}" rows="5" required></textarea>
      </div>

      <input type="submit" class="submit" value="${isEnglish ? 'Submit' : 'Envoyer'}">
    `;

      formContainer.addEventListener("submit", (event) => {
         event.preventDefault();

         const fullName = formContainer.querySelector("#full-name").value.trim();
         const email = formContainer.querySelector("#email").value.trim();
         const phone = formContainer.querySelector("#phone").value.trim();
         const formattedPhone = formatPhoneNumber(phone);
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

         // Validation checks
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

      formContainer.querySelector("#garage").addEventListener("change", (event) => {
         const carsField = formContainer.querySelector("#garage-cars");
         if (event.target.checked) {
            carsField.style.display = "block";
         } else {
            carsField.style.display = "none";
            carsField.value = "";
         }
      });

      element.appendChild(formContainer);
   },
};


const PropertySearchExtension = {
   name: "Forms",
   type: "response",
   match: ({ trace }) =>
       trace.type === `ext_property_search` || trace.payload.name === `ext_property_search`,
   render: ({ trace, element }) => {
      const { language } = trace.payload; // Extracts the language from the payload
      const isEnglish = language === "en"; // Determines if the language is English
      const langCode = isEnglish ? "en" : "fr"; // Sets the language code

      // Build city object based on language
      const Cities = Object.fromEntries(
          Object.entries(CityMappings[langCode]).map(([label, sharedKey]) => [
             label,
             SharedCities[sharedKey],
          ])
      );

      // Build property categories object based on language
      const PropertyTypes = Object.fromEntries(
          Object.entries(PropertyTypeMappings[langCode]).map(([label, sharedKey]) => [
             label,
             SharedPropertyCategories[sharedKey][langCode],
          ])
      );

      // Build a translation map from EN to FR for categories
      const PropertyTypeTranslation = {};
      Object.entries(SharedPropertyCategories).forEach(([category, translations]) => {
         translations.en.forEach((enType, index) => {
            PropertyTypeTranslation[enType] = translations.fr[index];
         });
      });

      // Bedroom, bathroom, car numeric dropdown options
      const BedroomOptions = Options.Bedroom[langCode];
      const BathroomOptions = Options.Bathroom[langCode];
      const CarOptions = Options.Car[langCode];

      // ADDED: Access the house-type array
      const HouseTypeList = SharedPropertyTypes[langCode]; // [ "Multi-level", "Detached", etc. ]

      const formContainer = document.createElement("form");

      // --- CITY CHECKBOXES ---
      const createCityCheckboxes = (category, cities) => `
        <div>
          <div class="collapsible city-category" onclick="toggleCollapse(this)">${category}</div>
          <div class="collapse-content">
            <label class="checkbox-item">
              <input type="checkbox" class="select-all" data-category="${category}">
              <strong>${isEnglish ? "Select all" : "Tout sélectionner"}</strong>
            </label>
            ${cities
          .map(
              (city) => `
                <div class="checkbox-item">
                  <input 
                    type="checkbox" 
                    class="city-checkbox" 
                    data-category="${category}" 
                    id="city-${city}" 
                    name="cities" 
                    value="${city}"
                  >
                  <label for="city-${city}">${city}</label>
                </div>`
          )
          .join("")}
          </div>
        </div>
      `;

      // --- PROPERTY CATEGORY CHECKBOXES ---
      const createPropertyCategoryCheckboxes = (category, categories) => `
        <div>
            <div class="collapsible property-category" onclick="toggleCollapse(this)">${category}</div>
            <div class="collapse-content">
                <label class="checkbox-item">
                    <input type="checkbox" class="select-all-property" data-category="${category}">
                    <strong>${isEnglish ? "Select all" : "Tout sélectionner"}</strong>
                </label>
                ${categories
          .map((cat) => {
             const frenchValue = PropertyTypeTranslation[cat] || cat;
             return `
                      <div class="checkbox-item">
                        <input 
                          type="checkbox" 
                          class="property-checkbox" 
                          data-category="${category}" 
                          id="category-${cat}" 
                          name="property-categories" 
                          value="${isEnglish ? frenchValue : cat}"
                        >
                        <label for="category-${cat}">${cat}</label>
                      </div>`;
          })
          .join("")}
            </div>
        </div>
      `;

      // ADDED: HOUSE TYPE CHECKBOXES
      const createHouseTypeCheckboxes = (houseTypes) => `
        <div class="checkbox-container">
          <!-- "Select All" for House Types -->
          <label class="checkbox-item">
            <input type="checkbox" class="select-all-house-type">
            <strong>${isEnglish ? "Select all" : "Tout sélectionner"}</strong>
          </label>

          ${houseTypes
          .map(
              (ht) => `
            <div class="checkbox-item">
              <input 
                type="checkbox" 
                class="house-type-checkbox"
                id="house-type-${ht}" 
                name="house-type" 
                value="${ht}"
              >
              <label for="house-type-${ht}">${ht}</label>
            </div>
          `
          )
          .join("")}
        </div>
      `;

      // Form markup
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
          select,
          input[type="number"] {
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
          <div class="collapsible bold-label" onclick="toggleCollapse(this)">
            ${isEnglish ? "Select Cities" : "Sélectionnez des villes"}
          </div>
          <div class="collapse-content">
            <div id="cities-container" class="checkbox-container">
              ${Object.entries(Cities)
          .map(([category, cities]) => createCityCheckboxes(category, cities))
          .join("")}
            </div>
          </div>
        </div>

        <!-- Property Categories Section -->
        <div>
          <div class="collapsible bold-label" onclick="toggleCollapse(this)">
            ${isEnglish ? "Select Property Categories" : "Sélectionnez des catégories de propriété"}
          </div>
          <div class="collapse-content">
            <div id="property-categories-container" class="checkbox-container">
              ${Object.entries(PropertyTypes)
          .map(([category, categories]) =>
              createPropertyCategoryCheckboxes(category, categories)
          )
          .join("")}
            </div>
          </div>
        </div>

        <!-- ADDED: House Type Section -->
        <div>
          <div class="collapsible bold-label" onclick="toggleCollapse(this)">
            ${isEnglish ? "Select House Type" : "Sélectionnez le type de maison"}
          </div>
          <div class="collapse-content" id="house-types-container">
            ${createHouseTypeCheckboxes(HouseTypeList)}
          </div>
        </div>

        <!-- Bedrooms Selection -->
        <div>
          <label for="bedrooms-number" class="bold-label">
            ${isEnglish ? "Number of Bedrooms" : "Nombre de chambres"}
          </label>
          <select id="bedrooms-number" name="bedrooms-number" required>
            ${BedroomOptions.map(
          (option) => `<option value="${option.value}">${option.text}</option>`
      ).join("")}
          </select>
        </div>

        <!-- Bathrooms Selection -->
        <div>
          <label for="bathrooms-number" class="bold-label">
            ${isEnglish ? "Number of Bathrooms" : "Nombre de salles de bains"}
          </label>
          <select id="bathrooms-number" name="bathrooms-number" required>
            ${BathroomOptions.map(
          (option) => `<option value="${option.value}">${option.text}</option>`
      ).join("")}
          </select>
        </div>

        <!-- Price Range Minimum -->
        <div>
          <label for="price-min" class="bold-label">
            ${isEnglish ? "Price Range (Min)" : "Prix minimum"}
          </label>
          <input 
            type="number"
            id="price-min"
            name="price-min"
            placeholder="${isEnglish ? "Enter minimum price" : "Entrez le prix minimum"}"
            step="1000"
            min="0"
          >
        </div>

        <!-- Price Range Maximum -->
        <div>
          <label for="price-max" class="bold-label">
            ${isEnglish ? "Price Range (Max)" : "Prix maximum"}
          </label>
          <input 
            type="number"
            id="price-max"
            name="price-max"
            placeholder="${isEnglish ? "Enter maximum price" : "Entrez le prix maximum"}"
            step="1000"
            min="0"
          >
        </div>

        <!-- Garage Checkbox and Car Number Selection -->
        <div class="inline-field">
          <label for="garage" class="bold-label">
            ${isEnglish ? "Garage" : "Garage"}
          </label>
          <input type="checkbox" id="garage" name="garage" value="Yes">
        </div>

        <select id="garage-cars" name="garage-cars" style="display: none;">
          <option value="">
            ${isEnglish ? "Select number of cars" : "Sélectionnez le nombre de voitures"}
          </option>
          ${CarOptions.map((option) => `<option value="${option.value}">${option.text}</option>`).join("")}
        </select>

        <!-- Swimming Pool Checkbox -->
        <div class="inline-field">
          <label for="swimming-pool" class="bold-label">
            ${isEnglish ? "Swimming Pool" : "Piscine"}
          </label>
          <input type="checkbox" id="swimming-pool" name="swimming-pool" value="Yes">
        </div>

        <!-- Submit Button -->
        <input type="submit" class="submit" value="${isEnglish ? "Submit" : "Envoyer"}">
      `;

      // Handle form submission
      formContainer.addEventListener("submit", (event) => {
         event.preventDefault(); // Prevent the default form submission

         // Collect selected cities
         const selectedCities = Array.from(
             formContainer.querySelectorAll(".city-checkbox:checked")
         ).map((input) => input.value);

         // Collect selected property categories
         const selectedPropertyCategoriesRaw = Array.from(
             formContainer.querySelectorAll(".property-checkbox:checked")
         ).map((input) => input.value);

         // If English, map category to French behind the scenes
         const selectedPropertyCategories = isEnglish
             ? selectedPropertyCategoriesRaw.map(
                 (cat) => PropertyTypeTranslation[cat] || cat
             )
             : selectedPropertyCategoriesRaw;

         // ADDED: Collect the selected house types
         const selectedHouseTypes = Array.from(
             formContainer.querySelectorAll(".house-type-checkbox:checked")
         ).map((input) => input.value);

         // Numeric fields
         const bedroomsNumber = parseInt(
             formContainer.querySelector("#bedrooms-number").value || 0,
             10
         );
         const bathroomsNumber = parseInt(
             formContainer.querySelector("#bathrooms-number").value || 0,
             10
         );
         const priceMin = parseInt(
             formContainer.querySelector("#price-min").value || 0,
             10
         );
         const priceMax = parseInt(
             formContainer.querySelector("#price-max").value || 0,
             10
         );

         // Garage
         const indoorParking = formContainer.querySelector("#garage").checked
             ? "Yes"
             : "No";
         const indoorParkingCars =
             indoorParking === "Yes"
                 ? parseInt(formContainer.querySelector("#garage-cars").value || 0, 10)
                 : 0;

         // Swimming Pool
         const swimmingPool = formContainer.querySelector("#swimming-pool").checked
             ? "Yes"
             : "No";

         // Build payload with new houseType field
         const payload = {
            cityName: selectedCities,
            category: selectedPropertyCategories,
            houseType: selectedHouseTypes, // ADDED
            bedrooms: bedroomsNumber,
            bathrooms: bathroomsNumber,
            priceMin: priceMin,
            priceMax: priceMax,
            parkingIndoor: indoorParking,
            car: indoorParkingCars,
            swimmingPool: swimmingPool,
         };

         // Generate Airtable formula
         const airtableFormula = generateAirtableFormula(payload);

         // Send the data to Voiceflow or your integration
         window.voiceflow.chat.interact({
            type: "complete",
            payload: {
               formula: airtableFormula,
            },
         });
      });

      // Handle "Select All" logic, plus toggling the garage cars input
      formContainer.addEventListener("change", (event) => {
         // City select-all
         if (event.target.classList.contains("select-all")) {
            const category = event.target.dataset.category;
            const checkboxes = formContainer.querySelectorAll(
                `.city-checkbox[data-category="${category}"]`
            );
            checkboxes.forEach((checkbox) => (checkbox.checked = event.target.checked));
         } else if (event.target.classList.contains("city-checkbox")) {
            const category = event.target.dataset.category;
            const allCheckbox = formContainer.querySelector(
                `.select-all[data-category="${category}"]`
            );
            const checkboxes = formContainer.querySelectorAll(
                `.city-checkbox[data-category="${category}"]`
            );
            allCheckbox.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
         }

         // Property category select-all
         else if (event.target.classList.contains("select-all-property")) {
            const category = event.target.dataset.category;
            const checkboxes = formContainer.querySelectorAll(
                `.property-checkbox[data-category="${category}"]`
            );
            checkboxes.forEach((checkbox) => (checkbox.checked = event.target.checked));
         } else if (event.target.classList.contains("property-checkbox")) {
            const category = event.target.dataset.category;
            const allCheckbox = formContainer.querySelector(
                `.select-all-property[data-category="${category}"]`
            );
            const checkboxes = formContainer.querySelectorAll(
                `.property-checkbox[data-category="${category}"]`
            );
            allCheckbox.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
         }

         // ADDED: House type select-all
         else if (event.target.classList.contains("select-all-house-type")) {
            const checkboxes = formContainer.querySelectorAll(".house-type-checkbox");
            checkboxes.forEach(
                (checkbox) => (checkbox.checked = event.target.checked)
            );
         } else if (event.target.classList.contains("house-type-checkbox")) {
            const allHouseTypeCheckbox = formContainer.querySelector(
                ".select-all-house-type"
            );
            const houseTypeCheckboxes = formContainer.querySelectorAll(
                ".house-type-checkbox"
            );
            allHouseTypeCheckbox.checked = Array.from(houseTypeCheckboxes).every(
                (cb) => cb.checked
            );
         }
      });

      // Toggle the #garage-cars only if #garage is checked
      formContainer.querySelector("#garage").addEventListener("change", (event) => {
         const carsField = formContainer.querySelector("#garage-cars");
         if (event.target.checked) {
            carsField.style.display = "block";
         } else {
            carsField.style.display = "none";
            carsField.value = ""; // reset
         }
      });

      // Append form to DOM
      element.appendChild(formContainer);
   },
};
const MortgageCalculatorExtension = {
   name: 'MortgageCalculator',
   type: 'response',
   match: ({
              trace
           }) => trace.type === 'ext_mortgage_calculator',
   render: ({
               trace,
               element
            }) => { // Gardez 'element' mais ne l'utilisez pas
      const {
         propertyCost,
         language
      } = trace.payload;
      document.documentElement.lang = language; // Met à jour la langue du document

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
            doneMessage: 'Terminé', // Ajout du message de confirmation
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
            doneMessage: 'Done', // Ajout du message de confirmation
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

      const text = translations[language] || translations.fr;

      function createForm(propertyCost, modalContent) {
         const minDownPayment = (propertyCost * 0.05).toFixed(2);

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
                                        <img src="https://www.remax-quebec.com/assets/img/mortgage/calculator.svg" alt="Mortgage calculator">
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
         modalContent.innerHTML = formHTML;
      }

      function calculateMortgagePayment(P, annualRate, years, paymentsPerYear) {
         const r = (annualRate / 100) / paymentsPerYear;
         const n = years * paymentsPerYear;
         if (r === 0) return P / n;
         const numerator = P * r * Math.pow(1 + r, n);
         const denominator = Math.pow(1 + r, n) - 1;
         return numerator / denominator;
      }

      function initCalculator(modalContent) {
         const form = modalContent.querySelector('.Mortgage');
         const costInput = form.querySelector('#cost');
         const downPaymentInput = form.querySelector('#down-payment');
         const loanAmountInput = form.querySelector('#loan-amount');
         const downPercentSpan = form.querySelector('#downPercent');
         const calculateButton = form.querySelector('#calculate');
         const paymentOutput = form.querySelector('.Mortgage__Input--Payment');
         const errorMsg = form.querySelector('#calculator-error-msg');

         function validateAndUpdate() {
            const cost = parseFloat(costInput.value);
            const downPaymentValue = downPaymentInput.value.trim();
            let downPayment = parseFloat(downPaymentValue);

            if (isNaN(cost) || cost <= 0) {
               errorMsg.textContent = text.errorInvalidProperty;
               return false;
            }

            const minDownPayment = cost * 0.05;

            if (downPaymentValue === '') {
               downPercentSpan.textContent = '(0.00 %)';
               loanAmountInput.value = cost.toFixed(2);
               errorMsg.textContent = '';
               return true;
            }

            if (!isNaN(downPayment)) {
               const downPaymentPercentage = (downPayment / cost) * 100;
               // Met à jour l'apparence du bouton
               if (downPaymentPercentage < 5) {
                  calculateButton.style.backgroundColor = '#cccccc';
                  calculateButton.style.cursor = 'not-allowed';
                  errorMsg.textContent = text.errorMinDownPayment.replace('{amount}', minDownPayment.toFixed(2));
               } else {
                  calculateButton.style.backgroundColor = '#A10159';
                  calculateButton.style.cursor = 'pointer';
                  errorMsg.textContent = downPayment > cost ? text.errorMaxDownPayment : '';
               }

               const downPercent = ((downPayment / cost) * 100).toFixed(2);
               downPercentSpan.textContent = `(${downPercent} %)`;
               loanAmountInput.value = (cost - downPayment).toFixed(2);
            } else {
               errorMsg.textContent = text.errorInvalidDownPayment;
            }
            return true;
         }

         function handleCalculate() {
            if (!validateAndUpdate()) return;

            const cost = parseFloat(costInput.value);
            const downPayment = parseFloat(downPaymentInput.value);
            const downPaymentPercentage = (downPayment / cost) * 100;

            if (downPaymentPercentage < 5) return;

            const loanAmount = parseFloat(loanAmountInput.value);
            const interestRate = parseFloat(form.querySelector('#interest-rate').value);
            const amortization = parseInt(form.querySelector('#amortization-period').value);
            const frequency = form.querySelector('#payment-frequency').value;

            const paymentsPerYear = frequency === 'week' ? 52 : frequency === '2-weeks' ? 26 : 12;
            const payment = calculateMortgagePayment(loanAmount, interestRate, amortization, paymentsPerYear);

            const suffix = frequency === 'week' ? text.perWeek :
                frequency === '2-weeks' ? text.perBiweek : text.perMonth;

            paymentOutput.value = `${payment.toFixed(2)} ${suffix}`;
         }

         // Gestion des notes légales
         const legalButton = form.querySelector('.btnLegal');
         const legalContent = form.querySelector('.mortgage_legal');

         legalButton.addEventListener('click', () => {
            const isHidden = legalContent.style.display === 'none' || legalContent.style.display === '';
            legalContent.style.display = isHidden ? 'block' : 'none';
         });

         // Attacher les événements
         costInput.addEventListener('input', validateAndUpdate);
         downPaymentInput.addEventListener('input', validateAndUpdate);
         calculateButton.addEventListener('click', handleCalculate);
      }

      // Injecter le formulaire dans la modal et initialiser
      const modalContent = document.getElementById('mortgage-calculator-modal-content');
      if (modalContent) {
         createForm(propertyCost, modalContent);
         initCalculator(modalContent);
         openMortgageModal();

         // Envoyer la trace personnalisée à Voiceflow
         if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
            window.voiceflow.chat.interact({
               type: "mortgage_modal_opened", // Type de trace personnalisé
               payload: {
                  language: language, // Passer la langue pour que Voiceflow puisse répondre dans la bonne langue
               },
            });
            console.log(`Trace 'mortgage_modal_opened' envoyé à Voiceflow.`);
         } else {
            console.error('Voiceflow interact API non disponible.');
         }
      } else {
         console.error('Modal content container not found');
      }
   }
};
function openMortgageModal() {
   console.log('openMortgageModal called');
   const modal = document.getElementById('mortgage-modal');
   if (modal) {
      modal.style.display = 'block';
   } else {
      console.error('Modal element not found');
   }
}
function closeMortgageModal() {
   console.log('closeMortgageModal called');
   const modal = document.getElementById('mortgage-modal');
   if (modal) {
      modal.style.display = 'none';
      const content = modal.querySelector('#mortgage-calculator-modal-content');
      if (content) {
         content.innerHTML = ''; // Vider le contenu pour éviter les doublons
      }
   } else {
      console.error('Modal element not found');
   }
}
document.addEventListener('DOMContentLoaded', () => {
   const modal = document.getElementById('mortgage-modal');
   const closeButton = modal.querySelector('.close-button');

   if (closeButton) {
      console.log('Close button found, attaching event listener');
      closeButton.addEventListener('click', () => {
         console.log('Close button clicked');
         closeMortgageModal();
      });
   } else {
      console.error('Close button not found');
   }
});
const LocalisationExtension = {
   name: 'Localisation',
   type: 'response',
   match: ({
              trace
           }) => trace.type === 'ext_localisation' || trace.payload.name === 'ext_localisation',
   render: ({
               trace,
               element
            }) => {
      const {
         language,
         key,
         LAT,
         LNG
      } = trace.payload;

      function openModal() {
         const modal = document.getElementById('localisation-modal');
         if (modal) {
            modal.style.display = 'block';
            initializeLocalLogic(language, key, parseFloat(LAT), parseFloat(LNG));
         } else {
            console.error('Modal element not found');
         }
      }

      function closeModal() {
         const modal = document.getElementById('localisation-modal');
         if (modal) {
            modal.style.display = 'none';
         }
      }

      const closeButton = document.querySelector('.close-button');
      if (closeButton) {
         closeButton.addEventListener('click', closeModal);
      } else {
         console.error('Close button not found');
      }

      async function initializeLocalLogic(language, key, lat, lng) {
         try {
            console.log('Initializing LocalLogic SDK...');
            if (typeof LLSDKsJS === 'undefined') {
               console.error('LLSDKsJS is not available.');
               return;
            }

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

            const container = document.createElement("div");
            container.id = `localContentWidget-${Date.now()}`;
            container.style.cssText = `
                    display: flex;
                    border: 1px solid rgb(136, 136, 136);
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    position: absolute;
                    overflow: hidden;
                `;

            const widgetContent = document.getElementById('localisation-modal-content');
            if (widgetContent) {
               widgetContent.innerHTML = ''; // Clear previous content if any
               widgetContent.appendChild(container);
               const doneElement = document.createElement('div');
               doneElement.className = 'done-text';
               doneElement.textContent = 'Done';
               doneElement.style.cssText = `
                     text-align: center;
                     font-size: 18px;
                     color: #333;
                     margin-top: 16px;
                  `;
               widgetContent.appendChild(doneElement);

            } else {
               console.error('Modal content container not found');
               return;
            }

            console.log('Creating LocalLogic widget with LAT:', lat, 'LNG:', lng);
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
            console.error('Error loading LocalLogic content:', error);
         }
      }

      function loadSDKScript() {
         return new Promise((resolve, reject) => {
            // Check if the SDK script is already loaded
            if (document.querySelector('script[src="https://sdk.locallogic.co/sdks-js/1.13.2/index.umd.js"]')) {
               console.log('LocalLogic SDK script already loaded.');
               resolve();
               return;
            }

            const sdkScript = document.createElement('script');
            sdkScript.src = "https://sdk.locallogic.co/sdks-js/1.13.2/index.umd.js";
            sdkScript.async = true;
            sdkScript.onload = () => {
               console.log('LocalLogic SDK script loaded.');
               resolve();
            };
            sdkScript.onerror = () => {
               console.error('Failed to load the LocalLogic SDK script.');
               reject(new Error('Failed to load LocalLogic SDK script.'));
            };

            document.body.appendChild(sdkScript);
            console.log('LocalLogic SDK script appended to body');
         });
      }

      loadSDKScript().then(openModal).catch((error) => {
         console.error('Error loading SDK script:', error);
      });
   },
};

const ImageCarouselExtension = {
   name: "ImageCarousel",
   type: "response",
   match: ({ trace }) =>
       trace.type === "ext_carousel" || trace.payload.name === "ext_carousel",
   render: ({ trace, element }) => {
      const { images = "", startIndex = 0 } = trace.payload;
      const imageList = images.split(",").map((url) => url.trim());
      let currentIndex = startIndex;

      // Create the carousel
      const carouselWrapper = document.createElement("div");
      carouselWrapper.className = "carousel-wrapper";

      const carouselElement = document.createElement("div");
      carouselElement.className = "carousel";

      // Create carousel controls
      const carouselControls = document.createElement("div");
      carouselControls.className = "carousel-controls";

      imageList.forEach((url, index) => {
         const img = document.createElement("img");
         img.src = url;
         img.alt = `Image ${index + 1}`;
         img.style.cssText = `
                width: 100%;
                height: 400px;
                object-fit: cover;
                cursor: pointer;
            `;
         img.addEventListener("click", () => openModal(index)); // Open modal on click
         carouselElement.appendChild(img);
      });

      // Create modal structure
      const modal = document.createElement("div");
      modal.className = "modal";

      const modalContent = document.createElement("div");
      modalContent.className = "modal-content";

      // Create separate containers for left and right arrows
      const leftArrowContainer = document.createElement("div");
      leftArrowContainer.className = "modal-arrow-left";

      const rightArrowContainer = document.createElement("div");
      rightArrowContainer.className = "modal-arrow-right";

      // Add SVG for modal left arrow
      const modalPrev = document.createElement("div");
      modalPrev.className = "modal-arrow";
      modalPrev.innerHTML = `
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                    <path fill="currentColor" d="M14.25 7.281a.75.75 0 0 1 0 1.5H3.38l2.474 2.77a.75.75 0 1 1-1.152.96l-3.5-4a.75.75 0 0 1 0-.96l3.5-4a.75.75 0 0 1 1.152.96L3.38 7.282H14.25z"></path>
                </g>
            </svg>
        `;

      // Add SVG for modal right arrow
      const modalNext = document.createElement("div");
      modalNext.className = "modal-arrow";
      modalNext.innerHTML = `
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(180deg);">
                <g fill="none" fill-rule="evenodd">
                    <path fill="currentColor" d="M14.25 7.281a.75.75 0 0 1 0 1.5H3.38l2.474 2.77a.75.75 0 1 1-1.152.96l-3.5-4a.75.75 0 0 1 0-.96l3.5-4a.75.75 0 0 1 1.152.96L3.38 7.282H14.25z"></path>
                </g>
            </svg>
        `;

      // Add arrows to their containers
      leftArrowContainer.appendChild(modalPrev);
      rightArrowContainer.appendChild(modalNext);

      const closeButton = document.createElement("button");
      closeButton.className = "close-button";
      closeButton.textContent = "×";

      // Build modal structure
      modal.appendChild(modalContent);
      modal.appendChild(leftArrowContainer);
      modal.appendChild(rightArrowContainer);
      modal.appendChild(closeButton);

      // Functions to handle modal
      function openModal(index) {
         currentIndex = index;
         modal.style.display = "flex";
         updateModalImage();
      }

      function updateModalImage() {
         modalContent.innerHTML = "";
         const img = document.createElement("img");
         img.src = imageList[currentIndex];
         img.alt = `Image ${currentIndex + 1}`;
         img.style.cssText = `
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                border-radius: 8px;
            `;
         modalContent.appendChild(img);
      }

      function closeModal() {
         modal.style.display = "none";
      }

      function slide(direction) {
         if (direction === "next") {
            currentIndex = (currentIndex + 1) % imageList.length;
         } else if (direction === "prev") {
            currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
         }
         updateModalImage();
      }

      // Add event listeners
      modalPrev.addEventListener("click", () => slide("prev"));
      modalNext.addEventListener("click", () => slide("next"));
      closeButton.addEventListener("click", closeModal);

      // Add to the page
      carouselWrapper.appendChild(carouselElement);
      element.appendChild(carouselWrapper);
      document.body.appendChild(modal);

      // Auto-open modal if specified
      if (trace.payload.openModal) {
         openModal(startIndex);
      }
   },
};

window.ImageCarouselExtension = ImageCarouselExtension;
window.ContactExtension = ContactExtension;
window.BookingExtension = BookingExtension;
window.SellingExtension = SellingExtension;
window.PropertySearchExtension = PropertySearchExtension;
window.LocalisationExtension = LocalisationExtension;
window.MortgageCalculatorExtension = MortgageCalculatorExtension;