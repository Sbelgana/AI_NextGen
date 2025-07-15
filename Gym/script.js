const CONFIG = {
    DEFAULT_WEBHOOK: "",
    DEFAULT_API_KEY: "",
    DEFAULT_CSS: ['https://cdn.jsdelivr.net/gh/Sbelgana/AI_NextGen@8b9dc91/FormFields.css'],
    SESSION_TIMEOUT: 900000, // 15 minutes
    SESSION_WARNING: 780000, // 13 minutes
    DEBOUNCE_DELAY: 50,
    FORM_VERSION: '5.2.0'
};
const BookingSDExtension = {
    name: "DynamicDentalBookingSecure",
    type: "response",
    match: ({
        trace
    }) => trace.type === "ext_booking_sd" || trace.payload?.name === "ext_booking_sd",
    // Global storage
    _selectedServiceData: null,
    _selectedDentistData: null,
    _currentExtension: null,
    _calComUtility: null,
    render: async ({
        trace,
        element
    }) => {
        // ============================================================================
        // EXTRACT ALL PAYLOAD DATA INTO VARIABLES USING DESTRUCTURING
        // ============================================================================
        let {
            language = "fr",
                vf,
                apiKey = CONFIG.DEFAULT_API_KEY,
                timezone = "America/Toronto",
                serviceProvider = "Dental Clinic",
                voiceflowEnabled = true,
                voiceflowDataTransformer = null,
                enableDetailedLogging = true,
                logPrefix = "🦷 DynamicDentalBooking",
                enableSessionTimeout = true,
                sessionTimeout = CONFIG.SESSION_TIMEOUT,
                sessionWarning = CONFIG.SESSION_WARNING,
                cssUrls = CONFIG.DEFAULT_CSS,
                formType = "booking",
                formStructure = "multistep",
                useStructuredData = true,
                dataTransformer = BaseDataTransformer,
                // REQUIRED data from payload
                servicesData = null,
                dentistsData = null
        } = trace.payload || {};
        console.log('🦷 Dynamic Dental Booking Extension started (Secure Structure)');
        // ============================================================================
        // CHECK FOR REQUIRED DATA
        // ============================================================================
        if (!servicesData || !dentistsData) {
            console.error('🦷 CRITICAL ERROR: No services or dentists data provided');
            BookingSDExtension.renderDataRequiredError(element, language);
            return;
        }
        // ============================================================================
        // VALIDATE PROVIDED DATA
        // ============================================================================
        const dataValidation = BookingSDExtension.validateProvidedData(servicesData, dentistsData);
        if (!dataValidation.valid) {
            console.error('🦷 Data validation failed:', dataValidation.errors);
            BookingSDExtension.renderValidationError(element, dataValidation.errors, language);
            return;
        }
        console.log('🦷 Data validation successful');
        console.log('🦷 Using services data:', servicesData.length, 'services');
        console.log('🦷 Using dentists data:', dentistsData.length, 'dentists');
        // ============================================================================
        // INITIALIZE CALCOM UTILITY
        // ============================================================================
        BookingSDExtension._calComUtility = BookingSDExtension.initializeCalComUtility({
            apiKey: apiKey,
            enableDetailedLogging: enableDetailedLogging
        });
        // ============================================================================
        // CREATE DYNAMIC FORM CONFIGURATION WITH CURRENT LANGUAGE
        // ============================================================================
        const dynamicFormConfig = {
            steps: [
                // Step 1: Contact Information
                {
                    sectionId: "contact_information",
                    title: BookingSDExtension.getTranslatedText('steps.0.title', language),
                    description: BookingSDExtension.getTranslatedText('steps.0.desc', language),
                    fields: [
                        {
                            type: 'text',
                            id: 'firstName',
                            name: 'firstName',
                            label: BookingSDExtension.getTranslatedText('fields.firstName', language),
                            placeholder: BookingSDExtension.getTranslatedText('placeholders.firstName', language),
                            required: true,
                            row: 'name',
                            customErrorMessage: BookingSDExtension.getTranslatedText('errors.firstName', language)
                        },
                        {
                            type: 'text',
                            id: 'lastName',
                            name: 'lastName',
                            label: BookingSDExtension.getTranslatedText('fields.lastName', language),
                            placeholder: BookingSDExtension.getTranslatedText('placeholders.lastName', language),
                            required: true,
                            row: 'name',
                            customErrorMessage: BookingSDExtension.getTranslatedText('errors.lastName', language)
                        },
                        {
                            type: 'email',
                            id: 'email',
                            name: 'email',
                            label: BookingSDExtension.getTranslatedText('fields.email', language),
                            placeholder: BookingSDExtension.getTranslatedText('placeholders.email', language),
                            required: true,
                            row: 'emailPhone',
                            customErrorMessage: BookingSDExtension.getTranslatedText('errors.email', language)
                        },
                        {
                            type: 'text',
                            id: 'phone',
                            name: 'phone',
                            label: BookingSDExtension.getTranslatedText('fields.phone', language),
                            placeholder: BookingSDExtension.getTranslatedText('placeholders.phone', language),
                            required: true,
                            row: 'emailPhone',
                            customErrorMessage: BookingSDExtension.getTranslatedText('errors.phone', language)
                        }
                    ]
                },

                // Step 2: Service Selection
                {
                    sectionId: "service_selection",
                    title: BookingSDExtension.getTranslatedText('steps.1.title', language),
                    description: BookingSDExtension.getTranslatedText('steps.1.desc', language),
                    fields: [
                        {
                            type: 'carousel',
                            id: 'selectedService',
                            name: 'selectedService',
                            title: BookingSDExtension.getTranslatedText('fields.serviceSelection', language),
                            subtitle: BookingSDExtension.getTranslatedText('descriptions.selectService', language),
                            items: servicesData, // Use provided data directly
                            required: true,
                            layout: 'grid',
                            columns: 'auto',
                            row: 'service_selection',
                            showDetails: true,
                            itemType: 'service',
                            allowMultiple: false,
                            customErrorMessage: BookingSDExtension.getTranslatedText('errors.serviceRequired', language),
                            responsiveConfig: {
                                mobile: {
                                    itemsPerView: 1,
                                    cardWidth: 300
                                },
                                tablet: {
                                    itemsPerView: 2,
                                    cardWidth: 300
                                },
                                desktop: {
                                    itemsPerView: 2,
                                    cardWidth: 300
                                }
                            }
                        }
                    ]
                },

                // Step 3: Dentist Selection
                {
                    sectionId: "dentist_selection",
                    title: BookingSDExtension.getTranslatedText('steps.2.title', language),
                    description: BookingSDExtension.getTranslatedText('steps.2.desc', language),
                    fields: [
                        {
                            type: 'filteredCarousel',
                            id: 'selectedDentist',
                            name: 'selectedDentist',
                            title: BookingSDExtension.getTranslatedText('fields.dentistSelection', language),
                            subtitle: BookingSDExtension.getTranslatedText('descriptions.selectDentist', language),
                            items: [],
                            required: true,
                            layout: 'grid',
                            columns: 'auto',
                            row: 'selectedDentist',
                            showDetails: true,
                            itemType: 'staff',
                            allowMultiple: false,
                            emptyMessage: BookingSDExtension.getTranslatedText('messages.selectServiceFirst', language),
                            customErrorMessage: BookingSDExtension.getTranslatedText('errors.dentistRequired', language),
                            responsiveConfig: {
                                mobile: {
                                    itemsPerView: 1,
                                    cardWidth: 300
                                },
                                tablet: {
                                    itemsPerView: 2,
                                    cardWidth: 300
                                },
                                desktop: {
                                    itemsPerView: 2,
                                    cardWidth: 300
                                }
                            },
                            filterConfig: {
                                dependsOn: 'selectedService',
                                dataSource: dentistsData, // Use provided data directly
                                filterFunction: BookingSDExtension.createDentistFilterFunction(),
                                waitingMessage: BookingSDExtension.getTranslatedText('messages.selectServiceFirst', language)
                            }
                        }
                    ]
                },

                // Step 4: Calendar Booking
                {
                    sectionId: "appointment_booking",
                    title: BookingSDExtension.getTranslatedText('steps.3.title', language),
                    description: BookingSDExtension.getTranslatedText('steps.3.desc', language),
                    fields: [
                        {
                            type: 'calendar',
                            id: 'appointment',
                            name: 'appointment',
                            label: BookingSDExtension.getTranslatedText('fields.appointment', language),
                            required: true,
                            mode: 'booking',
                            selectionMode: 'none',
                            row: 'appointment',
                            timezone: timezone,
                            language: language,
                            locale: language === 'fr' ? 'fr-FR' : 'en-US',
                            customErrorMessage: BookingSDExtension.getTranslatedText('errors.dateTimeRequired', language),
                            // Start with empty/disabled state
                            apiKey: '',
                            eventTypeId: null,
                            eventTypeSlug: '',
                            scheduleId: null,
                            specialist: '',
                            selectedCategory: '',
                            eventName: '',
                            showPlaceholder: true,
                            placeholderMessage: BookingSDExtension.getTranslatedText('messages.selectServiceAndDentist', language),
                            texts: {
                                selectDate: BookingSDExtension.getTranslatedText('calendar.selectDate', language),
                                availableTimesFor: BookingSDExtension.getTranslatedText('calendar.availableTimesFor', language),
                                noAvailableSlots: BookingSDExtension.getTranslatedText('calendar.noAvailableSlots', language),
                                pleaseSelectDate: BookingSDExtension.getTranslatedText('calendar.pleaseSelectDate', language),
                                currentAppointment: BookingSDExtension.getTranslatedText('calendar.currentAppointment', language),
                                newAppointment: BookingSDExtension.getTranslatedText('calendar.newAppointment', language),
                                loadingAvailability: BookingSDExtension.getTranslatedText('calendar.loadingAvailability', language),
                                loading: BookingSDExtension.getTranslatedText('calendar.loading', language),
                                weekdays: BookingSDExtension.getTranslatedText('calendar.weekdays', language)
                            },
                            errorTexts: {
                                dateTimeRequired: BookingSDExtension.getTranslatedText('errors.dateTimeRequired', language)
                            }
                        }
                    ]
                }
            ]
        };
        // ============================================================================
        // CREATE EXTENSION WITH DYNAMIC CONFIG
        // ============================================================================
        const extension = new CreatForm({
                language: language,
                formType: formType,
                formStructure: formStructure,
                useStructuredData: useStructuredData,
                dataTransformer: dataTransformer,
                webhookEnabled: false,
                voiceflowEnabled: false,
                enableDetailedLogging: enableDetailedLogging,
                logPrefix: logPrefix,
                enableSessionTimeout: enableSessionTimeout,
                sessionTimeout: sessionTimeout,
                sessionWarning: sessionWarning,
                apiKey: apiKey,
                timezone: timezone,
                serviceProvider: serviceProvider,
                onStepChange: BookingSDExtension.handleStepChange,
                onSubmit: BookingSDExtension.handleSubmit,
                cssUrls: cssUrls
            },
            BookingSDExtension.FORM_DATA,
            dynamicFormConfig,
            CONFIG
        );
        // Store references
        window.currentDynamicDentalExtension = extension;
        BookingSDExtension._currentExtension = extension;
        // Render the extension
        const result = await extension.render(element);
        // Set up field change handling
        if (extension.factory) {
            BookingSDExtension.setupFieldChangeHandling(extension);
        } else {
            setTimeout(() => {
                if (extension.factory) {
                    BookingSDExtension.setupFieldChangeHandling(extension);
                }
            }, 100);
        }
        return result;
    },
    // ============================================================================
    // ERROR RENDERING METHODS
    // ============================================================================
    renderDataRequiredError(element, language) {
        const errorMessage = language === 'fr' ?
            `<div class="error-container" style="padding: 40px; text-align: center; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
                <h3>⚠️ Configuration Requise</h3>
                <p>Les données des services et des dentistes doivent être fournies via le payload.</p>
                <p>Veuillez contacter l'administrateur du système.</p>
               </div>` :
            `<div class="error-container" style="padding: 40px; text-align: center; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
                <h3>⚠️ Configuration Required</h3>
                <p>Services and dentists data must be provided via payload.</p>
                <p>Please contact the system administrator.</p>
               </div>`;
        element.innerHTML = errorMessage;
    },
    renderValidationError(element, errors, language) {
        const title = language === 'fr' ? 'Erreurs de Validation' : 'Validation Errors';
        const description = language === 'fr' ?
            'Les erreurs suivantes ont été trouvées dans les données fournies:' :
            'The following errors were found in the provided data:';
        const errorHtml = `
            <div class="error-container" style="padding: 40px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
                <h3>⚠️ ${title}</h3>
                <p>${description}</p>
                <ul style="text-align: left; max-width: 600px; margin: 20px auto;">
                    ${errors.map(error => `<li> ${error}</li>`).join('')}
                </ul>
            </div>
        `;
        element.innerHTML = errorHtml;
    },
    // ============================================================================
    // HELPER METHODS
    // ============================================================================
    initializeCalComUtility(config) {
        if (!this._calComUtility) {
            this._calComUtility = new CalComBaseUtility({
                apiKey: config.apiKey,
                logPrefix: "🦷 DynamicDentalBooking",
                enableLogging: config.enableDetailedLogging !== false,
                errorMessages: {
                    missingServiceSelection: "Service selection is required",
                    missingContactInfo: "Contact information is required",
                    bookingFailed: "Failed to create booking"
                }
            });
        } else {
            if (config.apiKey) {
                this._calComUtility.setApiKey(config.apiKey);
            }
        }
        return this._calComUtility;
    },
    getTranslatedText(key, lang = 'fr') {
        const keys = key.split('.');
        let value = this.FORM_DATA.translations[lang];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    },
    // ============================================================================
    // DATA VALIDATION METHODS
    // ============================================================================
    validateProvidedData(services, dentists) {
        const serviceValidation = this.validateServiceData(services);
        const dentistValidation = this.validateDentistData(dentists);
        const compatibilityValidation = this.validateServiceDentistCompatibility(services, dentists);
        const allErrors = [
            ...serviceValidation.errors,
            ...dentistValidation.errors,
            ...compatibilityValidation.errors
        ];
        return {
            valid: allErrors.length === 0,
            errors: allErrors
        };
    },
    validateServiceData(services) {
        const errors = [];
        if (!services) {
            errors.push("Services data is required");
            return {
                valid: false,
                errors
            };
        }
        if (!Array.isArray(services)) {
            errors.push("Services data must be an array");
            return {
                valid: false,
                errors
            };
        }
        if (services.length === 0) {
            errors.push("At least one service must be provided");
            return {
                valid: false,
                errors
            };
        }
        services.forEach((service, index) => {
            const requiredFields = ['id', 'title', 'category', 'description'];
            requiredFields.forEach(field => {
                if (!service[field]) {
                    errors.push(`Service ${index + 1}: Missing required field '${field}'`);
                }
            });
            if (!service.eventSlug) {
                errors.push(`Service ${index + 1} (${service.title || 'unknown'}): Missing 'eventSlug' field`);
            }
        });
        return {
            valid: errors.length === 0,
            errors
        };
    },
    validateDentistData(dentists) {
        const errors = [];
        if (!dentists) {
            errors.push("Dentists data is required");
            return {
                valid: false,
                errors
            };
        }
        if (!Array.isArray(dentists)) {
            errors.push("Dentists data must be an array");
            return {
                valid: false,
                errors
            };
        }
        if (dentists.length === 0) {
            errors.push("At least one dentist must be provided");
            return {
                valid: false,
                errors
            };
        }
        dentists.forEach((dentist, index) => {
            const requiredFields = ['id', 'name', 'position', 'description', 'services'];
            requiredFields.forEach(field => {
                if (!dentist[field]) {
                    errors.push(`Dentist ${index + 1}: Missing required field '${field}'`);
                }
            });
            if (dentist.services && !Array.isArray(dentist.services)) {
                errors.push(`Dentist ${index + 1} (${dentist.name || 'unknown'}): 'services' must be an array`);
            }
            if (!dentist.calComConfig) {
                errors.push(`Dentist ${index + 1} (${dentist.name || 'unknown'}): Missing 'calComConfig'`);
            } else {
                const config = dentist.calComConfig;
                if (!config.apiKey) {
                    errors.push(`Dentist ${index + 1} (${dentist.name || 'unknown'}): Missing 'calComConfig.apiKey'`);
                }
                if (!config.scheduleId) {
                    errors.push(`Dentist ${index + 1} (${dentist.name || 'unknown'}): Missing 'calComConfig.scheduleId'`);
                }
                if (!config.serviceConfigs || typeof config.serviceConfigs !== 'object') {
                    errors.push(`Dentist ${index + 1} (${dentist.name || 'unknown'}): Missing or invalid 'calComConfig.serviceConfigs'`);
                }
            }
        });
        return {
            valid: errors.length === 0,
            errors
        };
    },
    validateServiceDentistCompatibility(services, dentists) {
        const errors = [];
        const serviceIds = new Set(services.map(s => s.id));
        dentists.forEach((dentist, dentistIndex) => {
            if (dentist.services) {
                dentist.services.forEach(serviceId => {
                    if (!serviceIds.has(serviceId)) {
                        errors.push(`Dentist ${dentistIndex + 1} (${dentist.name || 'unknown'}): References unknown service ID '${serviceId}'`);
                    }
                });
            }
            if (dentist.calComConfig?.serviceConfigs) {
                const configuredServices = Object.keys(dentist.calComConfig.serviceConfigs);
                dentist.services?.forEach(serviceId => {
                    if (!configuredServices.includes(serviceId)) {
                        errors.push(`Dentist ${dentistIndex + 1} (${dentist.name || 'unknown'}): Missing calCom configuration for service '${serviceId}'`);
                    }
                });
            }
        });
        return {
            valid: errors.length === 0,
            errors
        };
    },
    // ============================================================================
    // FILTER AND EVENT HANDLING
    // ============================================================================
    createDentistFilterFunction() {
        return (allDentists, selectedService) => {
            if (!selectedService || !selectedService.id) {
                return [];
            }
            const serviceId = selectedService.id;
            const filtered = allDentists.filter(dentist => {
                return dentist.services && dentist.services.includes(serviceId);
            });
            console.log(`🔄 DENTIST FILTER: Found ${filtered.length} dentists for service "${selectedService.title}"`);
            return filtered;
        };
    },
    setupFieldChangeHandling(extension) {
        console.log('🦷 Setting up field change handling');
        const originalOnChange = extension.factory.onChangeCallback;
        extension.factory.onChangeCallback = function (name, value) {
            console.log(`🔄 Field ${name} changed:`, value);
            if (originalOnChange) {
                originalOnChange.call(this, name, value);
            }
            if (extension.factory && extension.factory.formValues) {
                extension.factory.formValues[name] = value;
            }
            if (extension.formValues) {
                extension.formValues[name] = value;
            }
            BookingSDExtension.handleFieldChange(extension, name, value);
        };
        const originalCreateField = extension.factory.createField;
        extension.factory.createField = function (fieldConfig) {
            if (fieldConfig.type === 'filteredCarousel') {
                console.log(`🔄 Creating filtered carousel field: ${fieldConfig.name}`);
                return new FilteredCarouselField(this, fieldConfig);
            } else if (fieldConfig.type === 'carousel') {
                console.log(`🔄 Creating carousel field: ${fieldConfig.name}`);
                return new CarouselField(this, fieldConfig);
            }
            return originalCreateField.call(this, fieldConfig);
        };
    },
    // ============================================================================
    // ENHANCED FIELD CHANGE HANDLER - SOLUTION 2
    // ============================================================================
    handleFieldChange(extension, name, value) {
        if (name === 'selectedService') {
            console.log('🦷 SERVICE SELECTED:', value);
            BookingSDExtension._selectedServiceData = value;
            if (window.notifyFieldDependents) {
                window.notifyFieldDependents('selectedService', value);
            }
            if (value) {
                BookingSDExtension._selectedDentistData = null;
                const dentistField = BookingSDExtension.findFieldByName(extension, 'selectedDentist');
                if (dentistField) {
                    dentistField.selectedItem = null;
                    dentistField.selectedItems = [];
                    dentistField.updateSelection();
                }
            }
        }
        if (name === 'selectedDentist' && value) {
            console.log('🦷 DENTIST SELECTED:', value.name);
            BookingSDExtension._selectedDentistData = value;
            // Enhance the service data with Cal.com configuration from the dentist
            if (BookingSDExtension._selectedServiceData && value.calComConfig) {
                const serviceId = BookingSDExtension._selectedServiceData.id;
                const serviceConfig = value.calComConfig.serviceConfigs?.[serviceId];
                if (serviceConfig) {
                    // Create an enhanced service object with Cal.com data
                    const enhancedServiceData = {
                        ...BookingSDExtension._selectedServiceData,
                        eventTypeId: serviceConfig.eventId,
                        eventTypeSlug: serviceConfig.eventSlug || BookingSDExtension._selectedServiceData.eventSlug,
                        eventName: serviceConfig.eventName || BookingSDExtension._selectedServiceData.title,
                        scheduleId: value.calComConfig.scheduleId,
                        // Add additional properties to ensure compatibility
                        title: BookingSDExtension._selectedServiceData.title,
                        name: BookingSDExtension._selectedServiceData.title,
                        serviceName: serviceConfig.eventName || BookingSDExtension._selectedServiceData.title
                    };
                    // Update the stored service data
                    BookingSDExtension._selectedServiceData = enhancedServiceData;
                    // Update the form values if possible
                    if (extension.factory && extension.factory.formValues) {
                        extension.factory.formValues.selectedService = enhancedServiceData;
                    }
                    if (extension.formValues) {
                        extension.formValues.selectedService = enhancedServiceData;
                    }
                    console.log('🦷 Enhanced service data with Cal.com config:', enhancedServiceData);
                }
            }
            const currentFormData = extension.multiStepForm?.getFormData() || {};
            if (currentFormData.selectedService && value) {
                console.log('🦷 Both service and dentist selected, configuring calendar');
                BookingSDExtension.configureCalendarForBooking(extension, {
                    ...currentFormData,
                    selectedDentist: value,
                    selectedService: BookingSDExtension._selectedServiceData // Use enhanced data
                });
            }
        }
    },
    handleStepChange(stepIndex, stepInstance) {
        console.log(`🦷 Step changed to: ${stepIndex + 1}`);
        const extension = BookingSDExtension._currentExtension;
        if (stepIndex === 2) {
            console.log('🦷 Reached dentist step');
            setTimeout(() => {
                const currentFormData = extension.multiStepForm?.getFormData() || {};
                if (currentFormData.selectedService) {
                    console.log('🦷 Service already selected, updating dentist options');
                    const dentistField = BookingSDExtension.findFieldByName(extension, 'selectedDentist');
                    if (dentistField && dentistField.updateFromDependency) {
                        dentistField.updateFromDependency(currentFormData.selectedService);
                    }
                }
            }, 100);
        }
        if (stepIndex === 3) {
            setTimeout(() => {
                const formData = extension.multiStepForm?.getFormData() || {};
                console.log('🦷 Reached calendar step, current form data:', formData);
                if (formData.selectedService && formData.selectedDentist) {
                    console.log('🦷 Both selections made, configuring calendar');
                    BookingSDExtension.configureCalendarForBooking(extension, formData);
                }
            }, 100);
        }
    },
    // ============================================================================
    // UPDATED SUBMIT HANDLER TO USE ENHANCED SERVICE DATA
    // ============================================================================
    async handleSubmit(formData) {
        if (!formData.selectedService || !formData.selectedDentist) {
            throw new Error('Service and dentist selection required');
        }
        // Use the enhanced service data that was stored when dentist was selected
        const selectedService = BookingSDExtension._selectedServiceData || formData.selectedService;
        const selectedDentist = formData.selectedDentist;
        const appointmentData = formData.appointment;
        console.log('🦷 Submit handler - using service data:', selectedService);
        // Validate that the enhanced service data has the required Cal.com fields
        if (!selectedService.eventTypeId) {
            console.error('🦷 Service missing eventTypeId, attempting recovery...');
            // Attempt to recover by getting config from dentist
            const dentistConfig = selectedDentist.calComConfig;
            const serviceConfig = dentistConfig?.serviceConfigs?.[selectedService.id];
            if (serviceConfig) {
                selectedService.eventTypeId = serviceConfig.eventId;
                selectedService.eventTypeSlug = serviceConfig.eventSlug;
                selectedService.eventName = serviceConfig.eventName || selectedService.title;
            } else {
                throw new Error('Invalid service configuration - missing Cal.com integration data');
            }
        }
        const bookingData = {
            ...formData,
            serviceSelection: selectedService, // This now has eventTypeId
            selectedService: selectedService,
            selectedDentist: selectedDentist,
            appointment: appointmentData,
            eventTypeId: selectedService.eventTypeId,
            eventTypeSlug: selectedService.eventTypeSlug,
            scheduleId: selectedService.scheduleId || selectedDentist.calComConfig?.scheduleId,
            apiKey: selectedDentist.calComConfig?.apiKey,
            eventName: selectedService.eventName,
            serviceProvider: selectedDentist.name
        };
        console.log('🦷 Final booking data prepared:', bookingData);
        return await BookingSDExtension._calComUtility.handleBooking(bookingData, {
            language: formData.language || 'fr',
            apiKey: selectedDentist.calComConfig?.apiKey,
            timezone: formData.timezone || 'America/Toronto',
            serviceProvider: selectedDentist.name,
            voiceflowEnabled: false,
            formVersion: CONFIG.FORM_VERSION,
            selectedService: selectedService
        });
    },
    // ============================================================================
    // CALENDAR CONFIGURATION
    // ============================================================================
    configureCalendarForBooking(extension, allFormData) {
        console.log('🦷 Configuring calendar for booking');
        const findCalendarField = () => {
            if (this._cachedCalendarField && this._cachedCalendarField.name === 'appointment') {
                return this._cachedCalendarField;
            }
            const searchInSteps = (steps) => {
                for (let step of steps) {
                    if (step.fieldInstances) {
                        for (let field of step.fieldInstances) {
                            if (field && (field.name === 'appointment' || field.id === 'appointment')) {
                                this._cachedCalendarField = field;
                                return field;
                            }
                        }
                    }
                }
                return null;
            };
            if (extension.multiStepForm?.stepInstances) {
                const found = searchInSteps(extension.multiStepForm.stepInstances);
                if (found) return found;
            }
            if (extension.factory?.currentMultiStepForm?.stepInstances) {
                const found = searchInSteps(extension.factory.currentMultiStepForm.stepInstances);
                if (found) return found;
            }
            const calendarElement = document.querySelector('.calendar-container');
            if (calendarElement && calendarElement.fieldInstance) {
                this._cachedCalendarField = calendarElement.fieldInstance;
                return calendarElement.fieldInstance;
            }
            return null;
        };
        const calendarField = findCalendarField();
        if (calendarField) {
            const selectedService = allFormData.selectedService;
            const selectedDentist = allFormData.selectedDentist;
            if (selectedService && selectedDentist) {
                const dentistConfig = selectedDentist.calComConfig;
                const serviceConfig = dentistConfig?.serviceConfigs?.[selectedService.id];
                if (dentistConfig && serviceConfig) {
                    Object.assign(calendarField, {
                        apiKey: dentistConfig.apiKey,
                        scheduleId: dentistConfig.scheduleId,
                        eventTypeId: serviceConfig.eventId,
                        eventTypeSlug: serviceConfig.eventSlug,
                        eventName: serviceConfig.eventName || selectedService.title,
                        specialist: selectedDentist.name,
                        selectedCategory: serviceConfig.eventName || selectedService.title,
                        showPlaceholder: false
                    });
                    console.log('🦷 Calendar configured successfully');
                    requestAnimationFrame(async () => {
                        try {
                            const initTasks = [];
                            if (calendarField.init) {
                                initTasks.push(calendarField.init());
                            }
                            await Promise.all(initTasks);
                            if (calendarField.updateCalendarHeader) {
                                calendarField.updateCalendarHeader();
                            }
                            if (calendarField.renderCalendarData) {
                                calendarField.renderCalendarData();
                            }
                            console.log('🦷 Calendar re-initialization completed');
                        } catch (err) {
                            console.error('🦷 Calendar re-initialization error:', err);
                        }
                    });
                }
            }
        } else {
            console.error('🦷 Calendar field not found');
        }
    },
    findFieldByName(extension, fieldName) {
        if (extension.multiStepForm?.stepInstances) {
            for (let step of extension.multiStepForm.stepInstances) {
                if (step.fieldInstances) {
                    for (let field of step.fieldInstances) {
                        if (field && field.name === fieldName) {
                            return field;
                        }
                    }
                }
            }
        }
        return null;
    },
    // ============================================================================
    // FORM DATA CONFIGURATION - Only UI translations, NO default data
    // ============================================================================
    FORM_DATA: {
        // Empty options - MUST be provided via payload
        options: {},
        // All UI translations (no service/dentist data)
        translations: {
            fr: {
                nav: {
                    next: "Suivant",
                    previous: "Précédent",
                    submit: "Confirmer la réservation",
                    processing: "Traitement en cours..."
                },
                steps: [
                    {
                        title: "Informations Personnelles",
                        desc: "Renseignez vos coordonnées"
                    },
                    {
                        title: "Sélection du Service",
                        desc: "Choisissez le service qui vous intéresse"
                    },
                    {
                        title: "Choix du Dentiste",
                        desc: "Sélectionnez votre professionnel"
                    },
                    {
                        title: "Date et Heure",
                        desc: "Choisissez votre créneau"
                    }
                ],
                fields: {
                    firstName: "Prénom",
                    lastName: "Nom de famille",
                    email: "Adresse électronique",
                    phone: "Téléphone",
                    serviceSelection: "Sélectionnez un service",
                    dentistSelection: "Choisissez votre dentiste",
                    appointment: "Date et heure du rendez-vous"
                },
                descriptions: {
                    selectService: "Cliquez sur le service dentaire dont vous avez besoin",
                    selectDentist: "Choisissez le professionnel qui vous convient le mieux"
                },
                placeholders: {
                    firstName: "Entrez votre prénom",
                    lastName: "Entrez votre nom de famille",
                    email: "votre.email@example.com",
                    phone: "(514) 123-4567"
                },
                errors: {
                    firstName: "Le prénom est requis",
                    lastName: "Le nom de famille est requis",
                    email: "Une adresse email valide est requise",
                    phone: "Un numéro de téléphone valide est requis",
                    serviceRequired: "Veuillez sélectionner un service",
                    dentistRequired: "Veuillez choisir un dentiste",
                    dateTimeRequired: "Veuillez sélectionner une date et une heure",
                    providerRequired: "Veuillez sélectionner un fournisseur de services"
                },
                success: {
                    title: "Rendez-vous confirmé !",
                    message: "Votre rendez-vous a été programmé avec succès."
                },
                messages: {
                    selectServiceFirst: "Veuillez d'abord sélectionner un service",
                    selectServiceAndDentist: "Veuillez sélectionner un service et un dentiste pour voir le calendrier",
                    noDentistsAvailable: "Aucun dentiste disponible pour ce service"
                },
                calendar: {
                    selectDate: "Sélectionnez une date pour voir les horaires disponibles",
                    availableTimesFor: "Disponibilités pour",
                    noAvailableSlots: "Aucun horaire disponible pour cette date",
                    pleaseSelectDate: "Veuillez d'abord sélectionner une date",
                    currentAppointment: "Rendez-vous Actuel",
                    newAppointment: "Nouveau Rendez-vous",
                    loadingAvailability: "Chargement des disponibilités...",
                    loading: "Chargement...",
                    weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
                }
            },
            en: {
                nav: {
                    next: "Next",
                    previous: "Previous",
                    submit: "Confirm Booking",
                    processing: "Processing..."
                },
                steps: [
                    {
                        title: "Personal Information",
                        desc: "Enter your details"
                    },
                    {
                        title: "Service Selection",
                        desc: "Choose the service you need"
                    },
                    {
                        title: "Choose Dentist",
                        desc: "Select your professional"
                    },
                    {
                        title: "Date & Time",
                        desc: "Choose your appointment"
                    }
                ],
                fields: {
                    firstName: "First Name",
                    lastName: "Last Name",
                    email: "Email Address",
                    phone: "Phone",
                    serviceSelection: "Select a Service",
                    dentistSelection: "Choose your dentist",
                    appointment: "Appointment date and time"
                },
                descriptions: {
                    selectService: "Click on the dental service you need",
                    selectDentist: "Choose the professional that suits you best"
                },
                placeholders: {
                    firstName: "Enter your first name",
                    lastName: "Enter your last name",
                    email: "your.email@example.com",
                    phone: "(514) 123-4567"
                },
                errors: {
                    firstName: "First name is required",
                    lastName: "Last name is required",
                    email: "A valid email address is required",
                    phone: "A valid phone number is required",
                    serviceRequired: "Please select a service",
                    dentistRequired: "Please choose a dentist",
                    dateTimeRequired: "Please select a date and time",
                    providerRequired: "Please select a service provider"
                },
                success: {
                    title: "Appointment Confirmed!",
                    message: "Your appointment has been successfully scheduled."
                },
                messages: {
                    selectServiceFirst: "Please select a service first",
                    selectServiceAndDentist: "Please select a service and dentist to view the calendar",
                    noDentistsAvailable: "No dentists available for this service"
                },
                calendar: {
                    selectDate: "Select a date to view available times",
                    availableTimesFor: "Available times for",
                    noAvailableSlots: "No available time slots for this date",
                    pleaseSelectDate: "Please select a date first",
                    currentAppointment: "Current Appointment",
                    newAppointment: "New Appointment",
                    loadingAvailability: "Loading availability...",
                    loading: "Loading...",
                    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                }
            }
        }
    }
};
const BookingDExtension = {
    name: "DynamicDentalBookingOptimized",
    type: "response",
    match: ({
        trace
    }) => trace.type === "ext_booking_d" || trace.payload?.name === "ext_booking_d",
    // Global storage
    _selectedServiceData: null,
    _selectedDentistData: null,
    _currentExtension: null,
    _calComUtility: null,
    render: async ({
        trace,
        element
    }) => {
        // ============================================================================
        // EXTRACT ALL PAYLOAD DATA INTO VARIABLES USING DESTRUCTURING
        // ============================================================================
        let {
            language = "fr",
                vf,
                apiKey = CONFIG.DEFAULT_API_KEY,
                timezone = "America/Toronto",
                serviceProvider = "Dental Clinic",
                voiceflowEnabled = true,
                voiceflowDataTransformer = null,
                enableDetailedLogging = true,
                logPrefix = "🦷 DynamicDentalBooking",
                enableSessionTimeout = true,
                sessionTimeout = CONFIG.SESSION_TIMEOUT,
                sessionWarning = CONFIG.SESSION_WARNING,
                cssUrls = CONFIG.DEFAULT_CSS,
                formType = "booking",
                formStructure = "multistep",
                useStructuredData = true,
                dataTransformer = BaseDataTransformer,
                // REQUIRED data from payload
                servicesData = null,
                dentistsData = null,
                SERVICES_DATA = null,
                UNIFIED_DENTISTS_DATA = null,
                selectedServiceName = null,
                serviceName = null,
                service = null
        } = trace.payload || {};
        console.log('🦷 Dynamic Dental Booking Extension started (Optimized Service from Payload)');
        // Normalize data sources
        servicesData = servicesData || SERVICES_DATA;
        dentistsData = dentistsData || UNIFIED_DENTISTS_DATA;
        selectedServiceName = selectedServiceName || serviceName || service;
        // ============================================================================
        // CHECK FOR REQUIRED DATA
        // ============================================================================
        if (!servicesData || !dentistsData) {
            console.error('🦷 CRITICAL ERROR: No services or dentists data provided');
            BookingDExtension.renderDataRequiredError(element, language);
            return;
        }
        if (!selectedServiceName) {
            console.error('🦷 CRITICAL ERROR: No service name provided in payload');
            BookingDExtension.renderServiceRequiredError(element, language);
            return;
        }
        // ============================================================================
        // VALIDATE PROVIDED DATA
        // ============================================================================
        const dataValidation = BookingDExtension.validateProvidedData(servicesData, dentistsData);
        if (!dataValidation.valid) {
            console.error('🦷 Data validation failed:', dataValidation.errors);
            BookingDExtension.renderValidationError(element, dataValidation.errors, language);
            return;
        }
        // ============================================================================
        // FIND SELECTED SERVICE BY NAME
        // ============================================================================
        const selectedService = BookingDExtension.findServiceByName(selectedServiceName, servicesData);
        if (!selectedService) {
            console.error('🦷 Service not found:', selectedServiceName);
            BookingDExtension.renderServiceNotFoundError(element, selectedServiceName, servicesData, language);
            return;
        }
        console.log('🦷 Data validation successful');
        console.log('🦷 Using services data:', servicesData.length, 'services');
        console.log('🦷 Using dentists data:', dentistsData.length, 'dentists');
        console.log('🦷 Selected service:', selectedService.title);
        // Store selected service
        BookingDExtension._selectedServiceData = selectedService;
        // ============================================================================
        // PRE-FILTER DENTISTS FOR SELECTED SERVICE
        // ============================================================================
        const filteredDentists = BookingDExtension.filterDentistsForService(dentistsData, selectedService);
        if (filteredDentists.length === 0) {
            console.error('🦷 No dentists available for service:', selectedService.title);
            BookingDExtension.renderNoDentistsError(element, selectedService, language);
            return;
        }
        console.log('🦷 Pre-filtered dentists:', filteredDentists.length, 'available for', selectedService.title);
        // ============================================================================
        // INITIALIZE CALCOM UTILITY
        // ============================================================================
        BookingDExtension._calComUtility = BookingDExtension.initializeCalComUtility({
            apiKey: apiKey,
            enableDetailedLogging: enableDetailedLogging
        });
        // ============================================================================
        // CREATE OPTIMIZED FORM CONFIGURATION (3 STEPS ONLY)
        // ============================================================================
        const dynamicFormConfig = {
            steps: [
                // Step 1: Contact Information
                {
                    sectionId: "contact_information",
                    title: BookingDExtension.getTranslatedText('steps.0.title', language),
                    description: BookingDExtension.getTranslatedText('steps.0.desc', language),
                    fields: [
                        {
                            type: 'text',
                            id: 'firstName',
                            name: 'firstName',
                            label: BookingDExtension.getTranslatedText('fields.firstName', language),
                            placeholder: BookingDExtension.getTranslatedText('placeholders.firstName', language),
                            required: true,
                            row: 'name',
                            customErrorMessage: BookingDExtension.getTranslatedText('errors.firstName', language)
                        },
                        {
                            type: 'text',
                            id: 'lastName',
                            name: 'lastName',
                            label: BookingDExtension.getTranslatedText('fields.lastName', language),
                            placeholder: BookingDExtension.getTranslatedText('placeholders.lastName', language),
                            required: true,
                            row: 'name',
                            customErrorMessage: BookingDExtension.getTranslatedText('errors.lastName', language)
                        },
                        {
                            type: 'email',
                            id: 'email',
                            name: 'email',
                            label: BookingDExtension.getTranslatedText('fields.email', language),
                            placeholder: BookingDExtension.getTranslatedText('placeholders.email', language),
                            required: true,
                            row: 'emailPhone',
                            customErrorMessage: BookingDExtension.getTranslatedText('errors.email', language)
                        },
                        {
                            type: 'text',
                            id: 'phone',
                            name: 'phone',
                            label: BookingDExtension.getTranslatedText('fields.phone', language),
                            placeholder: BookingDExtension.getTranslatedText('placeholders.phone', language),
                            required: true,
                            row: 'emailPhone',
                            customErrorMessage: BookingDExtension.getTranslatedText('errors.phone', language)
                        }
                    ]
                },

                // Step 2: Dentist Selection (Pre-filtered)
                {
                    sectionId: "dentist_selection",
                    title: BookingDExtension.getTranslatedText('steps.1.title', language),
                    description: BookingDExtension.getTranslatedText('steps.1.desc', language),
                    fields: [
                        {
                            type: 'carousel',
                            id: 'selectedDentist',
                            name: 'selectedDentist',
                            title: BookingDExtension.getTranslatedText('fields.dentistSelection', language),
                            subtitle: BookingDExtension.getTranslatedText('descriptions.selectDentist', language) + ' ' + selectedService.title,
                            items: filteredDentists,
                            required: true,
                            layout: 'grid',
                            columns: 'auto',
                            row: 'selectedDentist',
                            showDetails: true,
                            itemType: 'staff',
                            allowMultiple: false,
                            customErrorMessage: BookingDExtension.getTranslatedText('errors.dentistRequired', language),
                            responsiveConfig: {
                                mobile: {
                                    itemsPerView: 1,
                                    cardWidth: 300
                                },
                                tablet: {
                                    itemsPerView: 2,
                                    cardWidth: 300
                                },
                                desktop: {
                                    itemsPerView: 2,
                                    cardWidth: 300
                                }
                            }
                        }
                    ]
                },

                // Step 3: Calendar Booking
                {
                    sectionId: "appointment_booking",
                    title: BookingDExtension.getTranslatedText('steps.2.title', language),
                    description: BookingDExtension.getTranslatedText('steps.2.desc', language),
                    fields: [
                        {
                            type: 'calendar',
                            id: 'appointment',
                            name: 'appointment',
                            label: BookingDExtension.getTranslatedText('fields.appointment', language),
                            required: true,
                            mode: 'booking',
                            selectionMode: 'none',
                            row: 'appointment',
                            timezone: timezone,
                            language: language,
                            locale: language === 'fr' ? 'fr-FR' : 'en-US',
                            customErrorMessage: BookingDExtension.getTranslatedText('errors.dateTimeRequired', language),
                            // Start with empty/disabled state
                            apiKey: '',
                            eventTypeId: null,
                            eventTypeSlug: '',
                            scheduleId: null,
                            specialist: '',
                            selectedCategory: '',
                            eventName: '',
                            showPlaceholder: true,
                            placeholderMessage: BookingDExtension.getTranslatedText('messages.selectDentistFirst', language),
                            texts: {
                                selectDate: BookingDExtension.getTranslatedText('calendar.selectDate', language),
                                availableTimesFor: BookingDExtension.getTranslatedText('calendar.availableTimesFor', language),
                                noAvailableSlots: BookingDExtension.getTranslatedText('calendar.noAvailableSlots', language),
                                pleaseSelectDate: BookingDExtension.getTranslatedText('calendar.pleaseSelectDate', language),
                                currentAppointment: BookingDExtension.getTranslatedText('calendar.currentAppointment', language),
                                newAppointment: BookingDExtension.getTranslatedText('calendar.newAppointment', language),
                                loadingAvailability: BookingDExtension.getTranslatedText('calendar.loadingAvailability', language),
                                loading: BookingDExtension.getTranslatedText('calendar.loading', language),
                                weekdays: BookingDExtension.getTranslatedText('calendar.weekdays', language)
                            },
                            errorTexts: {
                                dateTimeRequired: BookingDExtension.getTranslatedText('errors.dateTimeRequired', language)
                            }
                        }
                    ]
                }
            ]
        };
        // ============================================================================
        // CREATE EXTENSION WITH DYNAMIC CONFIG
        // ============================================================================
        const extension = new CreatForm({
                language: language,
                formType: formType,
                formStructure: formStructure,
                useStructuredData: useStructuredData,
                dataTransformer: dataTransformer,
                webhookEnabled: false,
                voiceflowEnabled: false,
                enableDetailedLogging: enableDetailedLogging,
                logPrefix: logPrefix,
                enableSessionTimeout: enableSessionTimeout,
                sessionTimeout: sessionTimeout,
                sessionWarning: sessionWarning,
                apiKey: apiKey,
                timezone: timezone,
                serviceProvider: serviceProvider,
                onStepChange: BookingDExtension.handleStepChange,
                onSubmit: BookingDExtension.handleSubmit,
                cssUrls: cssUrls
            },
            BookingDExtension.FORM_DATA,
            dynamicFormConfig,
            CONFIG
        );
        // Store references
        window.currentDynamicDentalExtension = extension;
        BookingDExtension._currentExtension = extension;
        // Render the extension
        const result = await extension.render(element);
        // Set up field change handling
        if (extension.factory) {
            BookingDExtension.setupFieldChangeHandling(extension, selectedService);
        } else {
            setTimeout(() => {
                if (extension.factory) {
                    BookingDExtension.setupFieldChangeHandling(extension, selectedService);
                }
            }, 100);
        }
        return result;
    },
    // ============================================================================
    // ERROR RENDERING METHODS
    // ============================================================================
    renderDataRequiredError(element, language) {
        const errorMessage = language === 'fr' ?
            `<div class="error-container" style="padding: 40px; text-align: center; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
                <h3>⚠️ Configuration Requise</h3>
                <p>Les données des services et des dentistes doivent être fournies via le payload.</p>
                <p>Veuillez contacter l'administrateur du système.</p>
               </div>` :
            `<div class="error-container" style="padding: 40px; text-align: center; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
                <h3>⚠️ Configuration Required</h3>
                <p>Services and dentists data must be provided via payload.</p>
                <p>Please contact the system administrator.</p>
               </div>`;
        element.innerHTML = errorMessage;
    },
    renderServiceRequiredError(element, language) {
        const errorMessage = language === 'fr' ?
            `<div class="error-container" style="padding: 40px; text-align: center; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
                <h3>⚠️ Service Requis</h3>
                <p>Le nom du service doit être fourni via le payload (selectedServiceName).</p>
                <p>Veuillez contacter l'administrateur du système.</p>
               </div>` :
            `<div class="error-container" style="padding: 40px; text-align: center; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
                <h3>⚠️ Service Required</h3>
                <p>Service name must be provided via payload (selectedServiceName).</p>
                <p>Please contact the system administrator.</p>
               </div>`;
        element.innerHTML = errorMessage;
    },
    renderServiceNotFoundError(element, serviceName, availableServices, language) {
        const availableList = availableServices.map(s => s.title)
            .join(', ');
        const errorMessage = language === 'fr' ?
            `<div class="error-container" style="padding: 40px; text-align: center; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
                <h3>⚠️ Service Non Trouvé</h3>
                <p>Le service "${serviceName}" n'a pas été trouvé dans les données fournies.</p>
                <p><strong>Services disponibles:</strong> ${availableList}</p>
               </div>` :
            `<div class="error-container" style="padding: 40px; text-align: center; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
                <h3>⚠️ Service Not Found</h3>
                <p>Service "${serviceName}" was not found in the provided data.</p>
                <p><strong>Available services:</strong> ${availableList}</p>
               </div>`;
        element.innerHTML = errorMessage;
    },
    renderNoDentistsError(element, service, language) {
        const errorMessage = language === 'fr' ?
            `<div class="error-container" style="padding: 40px; text-align: center; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
                <h3>⚠️ Aucun Dentiste Disponible</h3>
                <p>Aucun dentiste n'est disponible pour le service "${service.title}".</p>
                <p>Veuillez choisir un autre service ou contacter l'administrateur.</p>
               </div>` :
            `<div class="error-container" style="padding: 40px; text-align: center; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
                <h3>⚠️ No Dentists Available</h3>
                <p>No dentists are available for the service "${service.title}".</p>
                <p>Please choose another service or contact the administrator.</p>
               </div>`;
        element.innerHTML = errorMessage;
    },
    renderValidationError(element, errors, language) {
        const title = language === 'fr' ? 'Erreurs de Validation' : 'Validation Errors';
        const description = language === 'fr' ?
            'Les erreurs suivantes ont été trouvées dans les données fournies:' :
            'The following errors were found in the provided data:';
        const errorHtml = `
            <div class="error-container" style="padding: 40px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
                <h3>⚠️ ${title}</h3>
                <p>${description}</p>
                <ul style="text-align: left; max-width: 600px; margin: 20px auto;">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;
        element.innerHTML = errorHtml;
    },
    // ============================================================================
    // HELPER METHODS
    // ============================================================================
    initializeCalComUtility(config) {
        if (!this._calComUtility) {
            this._calComUtility = new CalComBaseUtility({
                apiKey: config.apiKey,
                logPrefix: "🦷 DynamicDentalBooking",
                enableLogging: config.enableDetailedLogging !== false,
                errorMessages: {
                    missingServiceSelection: "Service selection is required",
                    missingContactInfo: "Contact information is required",
                    bookingFailed: "Failed to create booking"
                }
            });
        } else {
            if (config.apiKey) {
                this._calComUtility.setApiKey(config.apiKey);
            }
        }
        return this._calComUtility;
    },
    getTranslatedText(key, lang = 'fr') {
        const keys = key.split('.');
        let value = this.FORM_DATA.translations[lang];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    },
    // ============================================================================
    // SERVICE LOOKUP METHOD
    // ============================================================================
    findServiceByName(serviceName, servicesData) {
        console.log('🔍 SERVICE LOOKUP: Searching for service:', serviceName);
        console.log('🔍 SERVICE LOOKUP: Available services:', servicesData?.map(s => s.title) || []);
        if (!serviceName || !servicesData || !Array.isArray(servicesData)) {
            console.log('🔍 SERVICE LOOKUP: Invalid input data');
            return null;
        }
        const searchName = serviceName.toLowerCase()
            .trim();
        console.log('🔍 SERVICE LOOKUP: Normalized search name:', searchName);
        // Exact title match first
        let found = servicesData.find(service =>
            service.title && service.title.toLowerCase() === searchName
        );
        if (found) {
            console.log('🔍 SERVICE LOOKUP: Found exact title match:', found.title);
            return found;
        }
        // Partial title match
        found = servicesData.find(service =>
            service.title && service.title.toLowerCase()
            .includes(searchName)
        );
        if (found) {
            console.log('🔍 SERVICE LOOKUP: Found partial title match:', found.title);
            return found;
        }
        // ID match
        found = servicesData.find(service =>
            service.id && service.id.toLowerCase() === searchName
        );
        if (found) {
            console.log('🔍 SERVICE LOOKUP: Found ID match:', found.id);
            return found;
        }
        // Category match
        found = servicesData.find(service =>
            service.category && service.category.toLowerCase()
            .includes(searchName)
        );
        if (found) {
            console.log('🔍 SERVICE LOOKUP: Found category match:', found.category);
            return found;
        }
        console.log('🔍 SERVICE LOOKUP: No match found for:', serviceName);
        return null;
    },
    // ============================================================================
    // DATA VALIDATION METHODS
    // ============================================================================
    validateProvidedData(services, dentists) {
        const serviceValidation = this.validateServiceData(services);
        const dentistValidation = this.validateDentistData(dentists);
        const compatibilityValidation = this.validateServiceDentistCompatibility(services, dentists);
        const allErrors = [
            ...serviceValidation.errors,
            ...dentistValidation.errors,
            ...compatibilityValidation.errors
        ];
        return {
            valid: allErrors.length === 0,
            errors: allErrors
        };
    },
    validateServiceData(services) {
        const errors = [];
        if (!services) {
            errors.push("Services data is required");
            return {
                valid: false,
                errors
            };
        }
        if (!Array.isArray(services)) {
            errors.push("Services data must be an array");
            return {
                valid: false,
                errors
            };
        }
        if (services.length === 0) {
            errors.push("At least one service must be provided");
            return {
                valid: false,
                errors
            };
        }
        services.forEach((service, index) => {
            const requiredFields = ['id', 'title', 'category', 'description'];
            requiredFields.forEach(field => {
                if (!service[field]) {
                    errors.push(`Service ${index + 1}: Missing required field '${field}'`);
                }
            });
            if (!service.eventSlug) {
                errors.push(`Service ${index + 1} (${service.title || 'unknown'}): Missing 'eventSlug' field`);
            }
        });
        return {
            valid: errors.length === 0,
            errors
        };
    },
    validateDentistData(dentists) {
        const errors = [];
        if (!dentists) {
            errors.push("Dentists data is required");
            return {
                valid: false,
                errors
            };
        }
        if (!Array.isArray(dentists)) {
            errors.push("Dentists data must be an array");
            return {
                valid: false,
                errors
            };
        }
        if (dentists.length === 0) {
            errors.push("At least one dentist must be provided");
            return {
                valid: false,
                errors
            };
        }
        dentists.forEach((dentist, index) => {
            const requiredFields = ['id', 'name', 'position', 'description', 'services'];
            requiredFields.forEach(field => {
                if (!dentist[field]) {
                    errors.push(`Dentist ${index + 1}: Missing required field '${field}'`);
                }
            });
            if (dentist.services && !Array.isArray(dentist.services)) {
                errors.push(`Dentist ${index + 1} (${dentist.name || 'unknown'}): 'services' must be an array`);
            }
            if (!dentist.calComConfig) {
                errors.push(`Dentist ${index + 1} (${dentist.name || 'unknown'}): Missing 'calComConfig'`);
            } else {
                const config = dentist.calComConfig;
                if (!config.apiKey) {
                    errors.push(`Dentist ${index + 1} (${dentist.name || 'unknown'}): Missing 'calComConfig.apiKey'`);
                }
                if (!config.scheduleId) {
                    errors.push(`Dentist ${index + 1} (${dentist.name || 'unknown'}): Missing 'calComConfig.scheduleId'`);
                }
                if (!config.serviceConfigs || typeof config.serviceConfigs !== 'object') {
                    errors.push(`Dentist ${index + 1} (${dentist.name || 'unknown'}): Missing or invalid 'calComConfig.serviceConfigs'`);
                }
            }
        });
        return {
            valid: errors.length === 0,
            errors
        };
    },
    validateServiceDentistCompatibility(services, dentists) {
        const errors = [];
        const serviceIds = new Set(services.map(s => s.id));
        dentists.forEach((dentist, dentistIndex) => {
            if (dentist.services) {
                dentist.services.forEach(serviceId => {
                    if (!serviceIds.has(serviceId)) {
                        errors.push(`Dentist ${dentistIndex + 1} (${dentist.name || 'unknown'}): References unknown service ID '${serviceId}'`);
                    }
                });
            }
            if (dentist.calComConfig?.serviceConfigs) {
                const configuredServices = Object.keys(dentist.calComConfig.serviceConfigs);
                dentist.services?.forEach(serviceId => {
                    if (!configuredServices.includes(serviceId)) {
                        errors.push(`Dentist ${dentistIndex + 1} (${dentist.name || 'unknown'}): Missing calCom configuration for service '${serviceId}'`);
                    }
                });
            }
        });
        return {
            valid: errors.length === 0,
            errors
        };
    },
    // ============================================================================
    // FILTER AND EVENT HANDLING
    // ============================================================================
    filterDentistsForService(dentists, selectedService) {
        if (!selectedService || !selectedService.id || !dentists) {
            return [];
        }
        const serviceId = selectedService.id;
        const filtered = dentists.filter(dentist => {
            return dentist.services && dentist.services.includes(serviceId);
        });
        console.log(`🔄 PRE-FILTER: Found ${filtered.length} dentists for service "${selectedService.title}"`);
        return filtered;
    },
    setupFieldChangeHandling(extension, selectedService) {
        console.log('🦷 Setting up field change handling with pre-selected service:', selectedService?.title);
        const originalOnChange = extension.factory.onChangeCallback;
        extension.factory.onChangeCallback = function (name, value) {
            console.log(`🔄 Field ${name} changed:`, value);
            if (originalOnChange) {
                originalOnChange.call(this, name, value);
            }
            if (extension.factory && extension.factory.formValues) {
                extension.factory.formValues[name] = value;
            }
            if (extension.formValues) {
                extension.formValues[name] = value;
            }
            BookingDExtension.handleFieldChange(extension, name, value, selectedService);
        };
    },
    // ============================================================================
    // ENHANCED FIELD CHANGE HANDLER - SOLUTION 2
    // ============================================================================
    handleFieldChange(extension, name, value, preSelectedService) {
        if (name === 'selectedDentist' && value) {
            console.log('🦷 DENTIST SELECTED:', value.name);
            BookingDExtension._selectedDentistData = value;
            // Enhance the pre-selected service data with Cal.com configuration from the dentist
            if (preSelectedService && value.calComConfig) {
                const serviceId = preSelectedService.id;
                const serviceConfig = value.calComConfig.serviceConfigs?.[serviceId];
                if (serviceConfig) {
                    // Create an enhanced service object with Cal.com data
                    const enhancedServiceData = {
                        ...preSelectedService,
                        eventTypeId: serviceConfig.eventId,
                        eventTypeSlug: serviceConfig.eventSlug || preSelectedService.eventSlug,
                        eventName: serviceConfig.eventName || preSelectedService.title,
                        scheduleId: value.calComConfig.scheduleId,
                        // Add additional properties to ensure compatibility
                        title: preSelectedService.title,
                        name: preSelectedService.title,
                        serviceName: serviceConfig.eventName || preSelectedService.title
                    };
                    // Update the stored service data
                    BookingDExtension._selectedServiceData = enhancedServiceData;
                    // Update the form values if possible
                    if (extension.factory && extension.factory.formValues) {
                        extension.factory.formValues.selectedService = enhancedServiceData;
                    }
                    if (extension.formValues) {
                        extension.formValues.selectedService = enhancedServiceData;
                    }
                    console.log('🦷 Enhanced pre-selected service data with Cal.com config:', enhancedServiceData);
                }
            }
            // Configure calendar now that we have both service and dentist
            if (preSelectedService && value) {
                console.log('🦷 Service (from payload) and dentist selected, configuring calendar');
                BookingDExtension.configureCalendarForBooking(extension, {
                    selectedService: BookingDExtension._selectedServiceData, // Use enhanced data
                    selectedDentist: value
                });
            }
        }
    },
    handleStepChange(stepIndex, stepInstance) {
        console.log(`🦷 Step changed to: ${stepIndex + 1}`);
        const extension = BookingDExtension._currentExtension;
        const selectedService = BookingDExtension._selectedServiceData;
        // Step 2 is now calendar (index 2)
        if (stepIndex === 2) {
            setTimeout(() => {
                const formData = extension.multiStepForm?.getFormData() || {};
                console.log('🦷 Reached calendar step, current form data:', formData);
                if (selectedService && formData.selectedDentist) {
                    console.log('🦷 Service (from payload) and dentist selected, configuring calendar');
                    BookingDExtension.configureCalendarForBooking(extension, {
                        selectedService: selectedService,
                        selectedDentist: formData.selectedDentist
                    });
                }
            }, 100);
        }
    },
    // ============================================================================
    // UPDATED SUBMIT HANDLER TO USE ENHANCED SERVICE DATA
    // ============================================================================
    async handleSubmit(formData) {
        // Use the enhanced service data that was stored when dentist was selected
        const selectedService = BookingDExtension._selectedServiceData;
        if (!selectedService || !formData.selectedDentist) {
            throw new Error('Service and dentist selection required');
        }
        const selectedDentist = formData.selectedDentist;
        const appointmentData = formData.appointment;
        console.log('🦷 Submit handler - using enhanced service data:', selectedService);
        // Validate that the enhanced service data has the required Cal.com fields
        if (!selectedService.eventTypeId) {
            console.error('🦷 Service missing eventTypeId, attempting recovery...');
            // Attempt to recover by getting config from dentist
            const dentistConfig = selectedDentist.calComConfig;
            const serviceConfig = dentistConfig?.serviceConfigs?.[selectedService.id];
            if (serviceConfig) {
                selectedService.eventTypeId = serviceConfig.eventId;
                selectedService.eventTypeSlug = serviceConfig.eventSlug;
                selectedService.eventName = serviceConfig.eventName || selectedService.title;
            } else {
                throw new Error('Invalid service configuration - missing Cal.com integration data');
            }
        }
        const bookingData = {
            ...formData,
            serviceSelection: selectedService, // This now has eventTypeId
            selectedService: selectedService,
            selectedDentist: selectedDentist,
            appointment: appointmentData,
            eventTypeId: selectedService.eventTypeId,
            eventTypeSlug: selectedService.eventTypeSlug,
            scheduleId: selectedService.scheduleId || selectedDentist.calComConfig?.scheduleId,
            apiKey: selectedDentist.calComConfig?.apiKey,
            eventName: selectedService.eventName,
            serviceProvider: selectedDentist.name
        };
        console.log('🦷 Final booking data prepared:', bookingData);
        return await BookingDExtension._calComUtility.handleBooking(bookingData, {
            language: formData.language || 'fr',
            apiKey: selectedDentist.calComConfig?.apiKey,
            timezone: formData.timezone || 'America/Toronto',
            serviceProvider: selectedDentist.name,
            voiceflowEnabled: false,
            formVersion: CONFIG.FORM_VERSION,
            selectedService: selectedService
        });
    },
    // ============================================================================
    // CALENDAR CONFIGURATION
    // ============================================================================
    configureCalendarForBooking(extension, allFormData) {
        console.log('🦷 Configuring calendar for booking');
        const findCalendarField = () => {
            if (this._cachedCalendarField && this._cachedCalendarField.name === 'appointment') {
                return this._cachedCalendarField;
            }
            const searchInSteps = (steps) => {
                for (let step of steps) {
                    if (step.fieldInstances) {
                        for (let field of step.fieldInstances) {
                            if (field && (field.name === 'appointment' || field.id === 'appointment')) {
                                this._cachedCalendarField = field;
                                return field;
                            }
                        }
                    }
                }
                return null;
            };
            if (extension.multiStepForm?.stepInstances) {
                const found = searchInSteps(extension.multiStepForm.stepInstances);
                if (found) return found;
            }
            if (extension.factory?.currentMultiStepForm?.stepInstances) {
                const found = searchInSteps(extension.factory.currentMultiStepForm.stepInstances);
                if (found) return found;
            }
            const calendarElement = document.querySelector('.calendar-container');
            if (calendarElement && calendarElement.fieldInstance) {
                this._cachedCalendarField = calendarElement.fieldInstance;
                return calendarElement.fieldInstance;
            }
            return null;
        };
        const calendarField = findCalendarField();
        if (calendarField) {
            const selectedService = allFormData.selectedService;
            const selectedDentist = allFormData.selectedDentist;
            if (selectedService && selectedDentist) {
                const dentistConfig = selectedDentist.calComConfig;
                const serviceConfig = dentistConfig?.serviceConfigs?.[selectedService.id];
                if (dentistConfig && serviceConfig) {
                    Object.assign(calendarField, {
                        apiKey: dentistConfig.apiKey,
                        scheduleId: dentistConfig.scheduleId,
                        eventTypeId: serviceConfig.eventId,
                        eventTypeSlug: serviceConfig.eventSlug,
                        eventName: serviceConfig.eventName || selectedService.title,
                        specialist: selectedDentist.name,
                        selectedCategory: serviceConfig.eventName || selectedService.title,
                        showPlaceholder: false
                    });
                    console.log('🦷 Calendar configured successfully');
                    requestAnimationFrame(async () => {
                        try {
                            const initTasks = [];
                            if (calendarField.init) {
                                initTasks.push(calendarField.init());
                            }
                            await Promise.all(initTasks);
                            if (calendarField.updateCalendarHeader) {
                                calendarField.updateCalendarHeader();
                            }
                            if (calendarField.renderCalendarData) {
                                calendarField.renderCalendarData();
                            }
                            console.log('🦷 Calendar re-initialization completed');
                        } catch (err) {
                            console.error('🦷 Calendar re-initialization error:', err);
                        }
                    });
                }
            }
        } else {
            console.error('🦷 Calendar field not found');
        }
    },
    findFieldByName(extension, fieldName) {
        if (extension.multiStepForm?.stepInstances) {
            for (let step of extension.multiStepForm.stepInstances) {
                if (step.fieldInstances) {
                    for (let field of step.fieldInstances) {
                        if (field && field.name === fieldName) {
                            return field;
                        }
                    }
                }
            }
        }
        return null;
    },
    // ============================================================================
    // FORM DATA CONFIGURATION - Only UI translations, NO default data
    // ============================================================================
    FORM_DATA: {
        // Empty options - MUST be provided via payload
        options: {},
        // All UI translations for 3-step form
        translations: {
            fr: {
                nav: {
                    next: "Suivant",
                    previous: "Précédent",
                    submit: "Confirmer la réservation",
                    processing: "Traitement en cours..."
                },
                steps: [
                    {
                        title: "Informations Personnelles",
                        desc: "Renseignez vos coordonnées"
                    },
                    {
                        title: "Choix du Dentiste",
                        desc: "Sélectionnez votre professionnel"
                    },
                    {
                        title: "Date et Heure",
                        desc: "Choisissez votre créneau"
                    }
                ],
                fields: {
                    firstName: "Prénom",
                    lastName: "Nom de famille",
                    email: "Adresse électronique",
                    phone: "Téléphone",
                    dentistSelection: "Choisissez votre dentiste",
                    appointment: "Date et heure du rendez-vous"
                },
                descriptions: {
                    selectDentist: "Choisissez le professionnel qui vous convient le mieux pour"
                },
                placeholders: {
                    firstName: "Entrez votre prénom",
                    lastName: "Entrez votre nom de famille",
                    email: "votre.email@example.com",
                    phone: "(514) 123-4567"
                },
                errors: {
                    firstName: "Le prénom est requis",
                    lastName: "Le nom de famille est requis",
                    email: "Une adresse email valide est requise",
                    phone: "Un numéro de téléphone valide est requis",
                    dentistRequired: "Veuillez choisir un dentiste",
                    dateTimeRequired: "Veuillez sélectionner une date et une heure",
                    providerRequired: "Veuillez sélectionner un fournisseur de services"
                },
                success: {
                    title: "Rendez-vous confirmé !",
                    message: "Votre rendez-vous a été programmé avec succès."
                },
                messages: {
                    selectDentistFirst: "Veuillez sélectionner un dentiste pour voir le calendrier",
                    noDentistsForService: "Aucun dentiste disponible pour ce service",
                    noServiceSelected: "Aucun service sélectionné"
                },
                calendar: {
                    selectDate: "Sélectionnez une date pour voir les horaires disponibles",
                    availableTimesFor: "Disponibilités pour",
                    noAvailableSlots: "Aucun horaire disponible pour cette date",
                    pleaseSelectDate: "Veuillez d'abord sélectionner une date",
                    currentAppointment: "Rendez-vous Actuel",
                    newAppointment: "Nouveau Rendez-vous",
                    loadingAvailability: "Chargement des disponibilités...",
                    loading: "Chargement...",
                    weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
                }
            },
            en: {
                nav: {
                    next: "Next",
                    previous: "Previous",
                    submit: "Confirm Booking",
                    processing: "Processing..."
                },
                steps: [
                    {
                        title: "Personal Information",
                        desc: "Enter your details"
                    },
                    {
                        title: "Choose Dentist",
                        desc: "Select your professional"
                    },
                    {
                        title: "Date & Time",
                        desc: "Choose your appointment"
                    }
                ],
                fields: {
                    firstName: "First Name",
                    lastName: "Last Name",
                    email: "Email Address",
                    phone: "Phone",
                    dentistSelection: "Choose your dentist",
                    appointment: "Appointment date and time"
                },
                descriptions: {
                    selectDentist: "Choose the professional that suits you best for"
                },
                placeholders: {
                    firstName: "Enter your first name",
                    lastName: "Enter your last name",
                    email: "your.email@example.com",
                    phone: "(514) 123-4567"
                },
                errors: {
                    firstName: "First name is required",
                    lastName: "Last name is required",
                    email: "A valid email address is required",
                    phone: "A valid phone number is required",
                    dentistRequired: "Please choose a dentist",
                    dateTimeRequired: "Please select a date and time",
                    providerRequired: "Please select a service provider"
                },
                success: {
                    title: "Appointment Confirmed!",
                    message: "Your appointment has been successfully scheduled."
                },
                messages: {
                    selectDentistFirst: "Please select a dentist to view the calendar",
                    noDentistsForService: "No dentists available for this service",
                    noServiceSelected: "No service selected"
                },
                calendar: {
                    selectDate: "Select a date to view available times",
                    availableTimesFor: "Available times for",
                    noAvailableSlots: "No available time slots for this date",
                    pleaseSelectDate: "Please select a date first",
                    currentAppointment: "Current Appointment",
                    newAppointment: "New Appointment",
                    loadingAvailability: "Loading availability...",
                    loading: "Loading...",
                    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                }
            }
        }
    }
};
const BookingDirectExtension = {
    name: "OptimizedBookingDirectNoSelection",
    type: "response",
    match: ({
        trace
    }) => trace.type === "ext_booking_direct" || trace.payload?.name === "ext_booking_direct",
    // Global storage
    _currentExtension: null,
    _cachedCalendarField: null,
    _serviceData: null,
    initializeCalComUtility(config) {
        if (!this.calComUtility) {
            this.calComUtility = new CalComBaseUtility({
                apiKey: config.apiKey,
                logPrefix: "📅 BookingDirect",
                enableLogging: config.enableDetailedLogging !== false,
                errorMessages: {
                    missingContactInfo: "Contact information is required",
                    bookingFailed: "Failed to create booking"
                }
            });
        } else {
            if (config.apiKey) {
                this.calComUtility.setApiKey(config.apiKey);
            }
        }
        return this.calComUtility;
    },
    // Validate service data from payload
    validateServiceData(payload) {
        const errors = [];
        const requiredFields = ['eventTypeId', 'eventTypeSlug', 'scheduleId'];
        requiredFields.forEach(field => {
            if (!payload[field]) {
                errors.push(`Missing required field '${field}' in payload`);
            }
        });
        if (!payload.serviceTitle && !payload.eventName) {
            errors.push("Missing service title or event name");
        }
        return {
            valid: errors.length === 0,
            errors
        };
    },
    // Process payload and create service object
    processPayloadData(payload) {
        console.log('📅 Processing payload data...');
        const validation = this.validateServiceData(payload);
        if (!validation.valid) {
            console.error('📅 Service data validation errors:', validation.errors);
            return {
                valid: false,
                errors: validation.errors,
                service: null
            };
        }
        // Create service object from payload
        const service = {
            id: payload.serviceId || 1,
            eventTypeId: payload.eventTypeId,
            eventTypeSlug: payload.eventTypeSlug,
            scheduleId: payload.scheduleId,
            provider: payload.serviceProvider || "Service Provider",
            eventName: payload.eventName || payload.serviceTitle || "Service",
            title: payload.serviceTitle || payload.eventName || "Service",
            description: payload.serviceDescription || "",
            duration: payload.serviceDuration || "15 minutes",
            serviceName: payload.eventName || payload.serviceTitle || "Service",
            name: payload.serviceTitle || payload.eventName || "Service",
            displayName: payload.serviceTitle || payload.eventName || "Service"
        };
        this._serviceData = service;
        console.log('📅 Service data processed successfully:', service);
        return {
            valid: true,
            errors: [],
            service: service
        };
    },
    render: async ({
        trace,
        element
    }) => {
        // ============================================================================
        // EXTRACT CONFIGURATION FROM PAYLOAD
        // ============================================================================
        let {
            language = "fr",
                apiKey = CONFIG.DEFAULT_API_KEY,
                timezone = "America/Toronto",
                serviceProvider = "SkaLean",
                voiceflowEnabled = true,
                enableDetailedLogging = true,
                logPrefix = "📅 BookingDirect",
                enableSessionTimeout = true,
                sessionTimeout = CONFIG.SESSION_TIMEOUT,
                sessionWarning = CONFIG.SESSION_WARNING,
                cssUrls = CONFIG.DEFAULT_CSS,
                formType = "booking",
                formStructure = "multistep",
                useStructuredData = true,
                dataTransformer = BaseDataTransformer
        } = trace.payload || {};
        console.log('📅 Optimized Booking Direct Extension started');
        console.log('📅 Payload received:', Object.keys(trace.payload || {}));
        // Process service data from payload
        const dataValidation = BookingDirectExtension.processPayloadData(trace.payload || {});
        if (!dataValidation.valid) {
            const errorHtml = `
                        <div class="data-validation-warning">
                            <h4>⚠️ Service Configuration Error</h4>
                            <p>The following issues were found:</p>
                            <ul>
                                ${dataValidation.errors.map(error => `<li>${error}</li>`).join('')}
                            </ul>
                        </div>
                    `;
            element.innerHTML = errorHtml;
            return element;
        }
        const selectedService = dataValidation.service;
        // Initialize Cal.com utility
        const calComUtility = BookingDirectExtension.initializeCalComUtility({
            apiKey: apiKey,
            enableDetailedLogging: enableDetailedLogging
        });
        // Helper function for translations
        const getTranslatedText = (key, lang = language) => {
            const keys = key.split('.');
            let value = BookingDirectExtension.FORM_DATA.translations[lang];
            for (const k of keys) {
                value = value?.[k];
            }
            return value || key;
        };
        // ============================================================================
        // OPTIMIZED FORM CONFIGURATION - Direct to booking with service preselected
        // ============================================================================
        const formConfig = {
            steps: [
                        // Step 1: Contact Information
                {
                    sectionId: "contact_information",
                    title: getTranslatedText('steps.0.title'),
                    description: getTranslatedText('steps.0.desc'),
                    fields: [
                        {
                            type: 'text',
                            id: 'firstName',
                            name: 'firstName',
                            label: getTranslatedText('fields.firstName'),
                            placeholder: getTranslatedText('placeholders.firstName'),
                            required: true,
                            row: 'name',
                            customErrorMessage: getTranslatedText('errors.firstName')
                                },
                        {
                            type: 'text',
                            id: 'lastName',
                            name: 'lastName',
                            label: getTranslatedText('fields.lastName'),
                            placeholder: getTranslatedText('placeholders.lastName'),
                            required: true,
                            row: 'name',
                            customErrorMessage: getTranslatedText('errors.lastName')
                                },
                        {
                            type: 'email',
                            id: 'email',
                            name: 'email',
                            label: getTranslatedText('fields.email'),
                            placeholder: getTranslatedText('placeholders.email'),
                            required: true,
                            row: 'email',
                            customErrorMessage: getTranslatedText('errors.email'),
                            customErrorMessages: {
                                required: getTranslatedText('errors.email'),
                                invalid: getTranslatedText('errors.emailInvalid')
                            }
                                }
                            ]
                        },

                        // Step 2: Calendar - Optimized configuration
                {
                    sectionId: "appointment_scheduling",
                    title: getTranslatedText('steps.1.title'),
                    description: getTranslatedText('steps.1.desc'),
                    fields: [
                        {
                            type: 'calendar',
                            id: 'appointment',
                            name: 'appointment',
                            label: getTranslatedText('fields.appointment'),
                            required: true,
                            mode: 'booking',
                            headerIcon: 'CALENDAR',
                            selectionMode: 'none',
                            row: "calendar",
                            // Direct configuration with service data
                            apiKey: apiKey,
                            eventTypeId: selectedService.eventTypeId,
                            eventTypeSlug: selectedService.eventTypeSlug,
                            scheduleId: selectedService.scheduleId,
                            timezone: timezone,
                            language: language,
                            locale: language === 'fr' ? 'fr-FR' : 'en-US',
                            specialist: serviceProvider,
                            selectedCategory: selectedService.eventName,
                            eventName: selectedService.eventName,
                            // Translations
                            texts: BookingDirectExtension.getCalendarTexts(language),
                            errorTexts: {
                                dateTimeRequired: getTranslatedText('errors.dateTimeRequired')
                            },
                            // Error messages
                            getCustomErrorMessage: (lang) => BookingDirectExtension.FORM_DATA.translations[lang].errors.appointment,
                            getCustomErrorMessages: (lang) => ({
                                required: BookingDirectExtension.FORM_DATA.translations[lang].errors.dateTimeRequired,
                                bookingError: BookingDirectExtension.FORM_DATA.translations[lang].errors.bookingError
                            })
                                }
                            ]
                        }
                    ]
        };
        // Create form data with service info
        const formData = {
            translations: BookingDirectExtension.FORM_DATA.translations,
            selectedService: selectedService,
            serviceInfo: {
                provider: serviceProvider,
                serviceName: selectedService.eventName,
                serviceTitle: selectedService.title,
                serviceDescription: selectedService.description,
                duration: selectedService.duration
            }
        };
        console.log('📅 Creating form with optimized configuration');
        // Create the optimized form
        const extension = new CreatForm({
                language: language,
                formType: formType,
                formStructure: formStructure,
                useStructuredData: useStructuredData,
                dataTransformer: dataTransformer,
                // Disabled integrations
                webhookEnabled: false,
                voiceflowEnabled: voiceflowEnabled,
                // Configuration
                enableDetailedLogging: enableDetailedLogging,
                logPrefix: logPrefix,
                enableSessionTimeout: enableSessionTimeout,
                sessionTimeout: sessionTimeout,
                sessionWarning: sessionWarning,
                apiKey: apiKey,
                timezone: timezone,
                serviceProvider: serviceProvider,
                preSelectedService: selectedService,
                // Optimized step change handler
                onStepChange: (stepIndex, stepInstance) => {
                    console.log(`📅 Step changed to: ${stepIndex + 1}`);
                    // When reaching calendar step, ensure it's configured properly
                    if (stepIndex === 1) {
                        setTimeout(() => {
                            BookingDirectExtension.ensureCalendarConfiguration(extension, selectedService, {
                                apiKey: apiKey,
                                timezone: timezone,
                                language: language,
                                serviceProvider: serviceProvider
                            });
                        }, 100);
                    }
                },
                // Booking submission handler
                onSubmit: async (formData) => {
                    const bookingData = {
                        ...formData,
                        serviceSelection: selectedService,
                        selectedService: selectedService,
                        eventTypeId: selectedService.eventTypeId,
                        eventTypeSlug: selectedService.eventTypeSlug,
                        scheduleId: selectedService.scheduleId,
                        eventName: selectedService.eventName,
                        serviceProvider: serviceProvider
                    };
                    console.log('📅 Submitting booking with data:', bookingData);
                    return await calComUtility.handleBooking(bookingData, {
                        language: language,
                        apiKey: apiKey,
                        timezone: timezone,
                        serviceProvider: serviceProvider,
                        voiceflowEnabled: voiceflowEnabled,
                        formVersion: CONFIG.FORM_VERSION,
                        selectedService: selectedService
                    });
                },
                cssUrls: cssUrls
            },
            formData,
            formConfig
        );
        // Store references
        window.currentBookingDirectExtension = extension;
        BookingDirectExtension._currentExtension = extension;
        // Render the extension
        const extensionElement = await extension.render(element);
        // ============================================================================
        // OPTIMIZED CALENDAR INITIALIZATION
        // ============================================================================
        // Ensure calendar is properly configured on initial render
        setTimeout(() => {
            BookingDirectExtension.ensureCalendarConfiguration(extension, selectedService, {
                apiKey: apiKey,
                timezone: timezone,
                language: language,
                serviceProvider: serviceProvider
            });
        }, 200);
        return extensionElement;
    },
    // ============================================================================
    // OPTIMIZED CALENDAR CONFIGURATION
    // ============================================================================
    ensureCalendarConfiguration(extension, selectedService, config) {
        console.log('📅 Ensuring calendar configuration with optimized approach');
        // Find calendar field using optimized search
        const calendarField = BookingDirectExtension.findCalendarField(extension);
        if (calendarField) {
            console.log('📅 Calendar field found, configuring...');
            // Apply complete configuration
            const calendarConfig = {
                apiKey: config.apiKey,
                eventTypeId: selectedService.eventTypeId,
                eventTypeSlug: selectedService.eventTypeSlug,
                scheduleId: selectedService.scheduleId,
                specialist: config.serviceProvider,
                selectedCategory: selectedService.eventName,
                eventName: selectedService.eventName,
                timezone: config.timezone,
                language: config.language,
                locale: config.language === 'fr' ? 'fr-FR' : 'en-US'
            };
            // Apply configuration
            Object.assign(calendarField, calendarConfig);
            console.log('📅 Calendar configured with:', calendarConfig);
            // Re-initialize calendar with optimized approach
            requestAnimationFrame(async () => {
                try {
                    // Initialize calendar if needed
                    if (calendarField.initializeCalendar) {
                        await calendarField.initializeCalendar();
                    } else if (calendarField.init) {
                        await calendarField.init();
                    }
                    // Update calendar display
                    if (calendarField.renderCalendarData) {
                        calendarField.renderCalendarData();
                    }
                    console.log('📅 Calendar initialization completed successfully');
                } catch (err) {
                    console.error('📅 Calendar initialization error:', err);
                    // Retry with alternative approach
                    if (calendarField.calendarInstance && calendarField.calendarInstance.init) {
                        try {
                            await calendarField.calendarInstance.init();
                            console.log('📅 Calendar initialized with alternative approach');
                        } catch (altErr) {
                            console.error('📅 Alternative initialization also failed:', altErr);
                        }
                    }
                }
            });
        } else {
            console.warn('📅 Calendar field not found, scheduling retry...');
            // Retry after a delay
            setTimeout(() => {
                BookingDirectExtension.ensureCalendarConfiguration(extension, selectedService, config);
            }, 500);
        }
    },
    // Optimized calendar field finder
    findCalendarField(extension) {
        // Use cached field if available
        if (this._cachedCalendarField && this._cachedCalendarField.name === 'appointment') {
            return this._cachedCalendarField;
        }
        // Search through extension structures
        const searchInSteps = (steps) => {
            for (let step of steps) {
                if (step.fieldInstances) {
                    for (let field of step.fieldInstances) {
                        if (field && (field.name === 'appointment' || field.id === 'appointment')) {
                            this._cachedCalendarField = field;
                            return field;
                        }
                    }
                }
            }
            return null;
        };
        // Try multiple locations
        const locations = [
                    extension.multiStepForm?.stepInstances,
                    extension.factory?.currentMultiStepForm?.stepInstances,
                    extension.factory?.multiStepForm?.stepInstances
                ];
        for (let location of locations) {
            if (location) {
                const found = searchInSteps(location);
                if (found) return found;
            }
        }
        // DOM fallback
        const calendarElement = document.querySelector('.calendar-container');
        if (calendarElement && calendarElement.fieldInstance) {
            this._cachedCalendarField = calendarElement.fieldInstance;
            return calendarElement.fieldInstance;
        }
        return null;
    },
    // ============================================================================
    // HELPER METHOD FOR CALENDAR TEXTS
    // ============================================================================
    getCalendarTexts: (language) => {
        const calendarTranslations = BookingDirectExtension.FORM_DATA.translations[language].calendar;
        return {
            selectDate: calendarTranslations.selectDate,
            availableTimesFor: calendarTranslations.availableTimesFor,
            noAvailableSlots: calendarTranslations.noAvailableSlots,
            pleaseSelectDate: calendarTranslations.pleaseSelectDate,
            loadingAvailability: calendarTranslations.loadingAvailability,
            loading: calendarTranslations.loading,
            weekdays: calendarTranslations.weekdays
        };
    },
    // ============================================================================
    // FORM DATA CONFIGURATION
    // ============================================================================
    FORM_DATA: {
        translations: {
            fr: {
                nav: {
                    next: "Suivant",
                    previous: "Précédent",
                    submit: "Confirmer la réservation",
                    processing: "Traitement en cours..."
                },
                labels: {
                    serviceProvider: "Prestataire de service",
                    selectedService: "Service sélectionné",
                    appointmentDetails: "Détails du rendez-vous"
                },
                placeholders: {
                    firstName: "Entrez votre prénom",
                    lastName: "Entrez votre nom de famille",
                    email: "votre.email@example.com"
                },
                steps: [
                    {
                        title: "Informations de Contact",
                        desc: "Renseignez vos informations de contact"
                    },
                    {
                        title: "Date et Heure",
                        desc: "Choisissez votre créneau préféré"
                    }
                        ],
                fields: {
                    firstName: "Prénom",
                    lastName: "Nom de famille",
                    email: "Adresse électronique",
                    appointment: "Sélectionnez date et heure"
                },
                errors: {
                    firstName: "Le prénom est requis",
                    lastName: "Le nom de famille est requis",
                    email: "Une adresse email valide est requise",
                    emailInvalid: "Le format de l'adresse email n'est pas valide",
                    appointment: "Veuillez sélectionner une date et une heure",
                    dateTimeRequired: "Veuillez sélectionner une date et une heure",
                    bookingError: "Erreur lors de la réservation. Veuillez réessayer."
                },
                success: {
                    title: "Rendez-vous confirmé !",
                    message: "Votre rendez-vous a été programmé avec succès. Vous recevrez sous peu un email de confirmation."
                },
                calendar: {
                    selectDate: "Sélectionnez une date pour voir les horaires disponibles",
                    availableTimesFor: "Disponibilités pour",
                    noAvailableSlots: "Aucun horaire disponible pour cette date",
                    pleaseSelectDate: "Veuillez d'abord sélectionner une date",
                    loadingAvailability: "Chargement des disponibilités...",
                    loading: "Chargement...",
                    weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
                }
            },
            en: {
                nav: {
                    next: "Next",
                    previous: "Previous",
                    submit: "Confirm Booking",
                    processing: "Processing..."
                },
                labels: {
                    serviceProvider: "Service Provider",
                    selectedService: "Selected Service",
                    appointmentDetails: "Appointment Details"
                },
                placeholders: {
                    firstName: "Enter your first name",
                    lastName: "Enter your last name",
                    email: "your.email@example.com"
                },
                steps: [
                    {
                        title: "Contact Information",
                        desc: "Enter your contact information"
                    },
                    {
                        title: "Date & Time",
                        desc: "Choose your preferred time slot"
                    }
                        ],
                fields: {
                    firstName: "First Name",
                    lastName: "Last Name",
                    email: "Email Address",
                    appointment: "Select date and time"
                },
                errors: {
                    firstName: "First name is required",
                    lastName: "Last name is required",
                    email: "A valid email address is required",
                    emailInvalid: "Email format is not valid",
                    appointment: "Please select a date and time",
                    dateTimeRequired: "Please select a date and time",
                    bookingError: "Booking error. Please try again."
                },
                success: {
                    title: "Appointment Confirmed!",
                    message: "Your appointment has been successfully scheduled. You will receive a confirmation email shortly."
                },
                calendar: {
                    selectDate: "Select a date to view available times",
                    availableTimesFor: "Available times for",
                    noAvailableSlots: "No available time slots for this date",
                    pleaseSelectDate: "Please select a date first",
                    loadingAvailability: "Loading availability...",
                    loading: "Loading...",
                    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                }
            }
        }
    }
};
const BookingInformationExtension = {
    name: "ModernBookingInformation",
    type: "response",
    match: ({
        trace
    }) => trace.type === "ext_booking_inf" || trace.payload?.name === "ext_booking_inf",
    render: async ({
        trace,
        element
    }) => {
        // ============================================================================
        // EXTRACT ALL PAYLOAD DATA INTO VARIABLES USING DESTRUCTURING
        // ============================================================================
        let {
            language = "en",
                vf,
                webhookEnabled = true,
                webhookUrl = CONFIG.DEFAULT_WEBHOOK,
                voiceflowEnabled = true,
                voiceflowDataTransformer = null,
                enableDetailedLogging = true,
                logPrefix = "📋 BookingInfo",
                enableSessionTimeout = true,
                sessionTimeout = CONFIG.SESSION_TIMEOUT,
                sessionWarning = CONFIG.SESSION_WARNING,
                cssUrls = CONFIG.DEFAULT_CSS,
                formType = "Booking_info",
                formStructure = "single",
                useStructuredData = true,
                dataTransformer = BaseDataTransformer
        } = trace.payload || {};
        // Helper function to get translated text
        const getTranslatedText = (key, lang = language) => {
            const keys = key.split('.');
            let value = BookingInformationExtension.FORM_DATA.translations[lang];
            for (const k of keys) {
                value = value?.[k];
            }
            return value || key;
        };
        // ============================================================================
        // DRAMATICALLY SIMPLIFIED: Uses generic FormDataProcessor and BaseDataTransformer
        // Same structure as CancelationExtension and ContactFormExtension
        // ============================================================================
        // Create the form with the new generic architecture using extracted variables
        const extension = new CreatForm({
                language: language,
                formType: formType,
                formStructure: formStructure,
                // ============================================================================
                // NEW: Generic approach - no specific field transformers needed!
                // BaseDataTransformer + FormDataProcessor handle everything automatically
                // ============================================================================
                useStructuredData: useStructuredData,
                dataTransformer: dataTransformer, // Generic transformer works with any form!
                // ENABLED: Webhook integration using extracted variables
                webhookEnabled: webhookEnabled,
                webhookUrl: webhookUrl,
                // ENABLED: Voiceflow integration with optional custom transformer
                voiceflowEnabled: voiceflowEnabled,
                voiceflowDataTransformer: voiceflowDataTransformer,
                // Enhanced logging using extracted variables
                enableDetailedLogging: enableDetailedLogging,
                logPrefix: logPrefix,
                // Session management using extracted variables
                enableSessionTimeout: enableSessionTimeout,
                sessionTimeout: sessionTimeout,
                sessionWarning: sessionWarning,
                // CSS configuration using extracted variables
                cssUrls: cssUrls
            },
            BookingInformationExtension.FORM_DATA,
            BookingInformationExtension.FORM_CONFIG
        );
        return await extension.render(element);
    },
    // ============================================================================
    // FORM DATA CONFIGURATION - Enhanced options and translations
    // ============================================================================
    FORM_DATA: {
        translations: {
            en: {
                nav: {
                    next: "Next",
                    previous: "Previous",
                    submit: "Submit Booking Information",
                    processing: "Processing..."
                },
                common: {
                    yes: "Yes",
                    no: "No",
                    other: "Other",
                    required: "required",
                    fieldRequired: "This field is required",
                    edit: "Edit",
                    notSpecified: "Not specified",
                    none: "None",
                    pleaseSpecify: "Please specify...",
                    selectAtLeastOne: "Please select at least one option"
                },
                placeholders: {
                    firstName: "Enter your first name",
                    lastName: "Enter your last name",
                    email: "your.email@example.com",
                    phone: "(555) 123-4567"
                },
                steps: [
                    {
                        title: "Booking Information",
                        desc: "Please provide your contact details to complete the booking"
                    }
                        ],
                fields: {
                    firstName: "First Name",
                    lastName: "Last Name",
                    email: "Email Address",
                    phone: "Phone Number"
                },
                errors: {
                    firstName: "Please enter your first name",
                    lastName: "Please enter your last name",
                    email: "Please enter a valid email address",
                    emailInvalid: "Email format is not valid",
                    phone: "Please enter a valid phone number",
                    phoneInvalid: "Phone number format is not valid"
                },
                success: {
                    title: "Booking Information Submitted Successfully!",
                    message: "Thank you for providing your information. We will contact you shortly to confirm your booking."
                }
            },
            fr: {
                nav: {
                    next: "Suivant",
                    previous: "Précédent",
                    submit: "Soumettre les informations de réservation",
                    processing: "Traitement en cours..."
                },
                common: {
                    yes: "Oui",
                    no: "Non",
                    other: "Autre",
                    required: "requis",
                    fieldRequired: "Ce champ est requis",
                    edit: "Modifier",
                    notSpecified: "Non spécifié",
                    none: "Aucun",
                    pleaseSpecify: "Veuillez préciser...",
                    selectAtLeastOne: "Veuillez sélectionner au moins une option"
                },
                placeholders: {
                    firstName: "Entrez votre prénom",
                    lastName: "Entrez votre nom de famille",
                    email: "votre.email@exemple.com",
                    phone: "(555) 123-4567"
                },
                steps: [
                    {
                        title: "Informations de réservation",
                        desc: "Veuillez fournir vos coordonnées pour finaliser la réservation"
                    }
                        ],
                fields: {
                    firstName: "Prénom",
                    lastName: "Nom de famille",
                    email: "Adresse électronique",
                    phone: "Numéro de téléphone"
                },
                errors: {
                    firstName: "Veuillez saisir votre prénom",
                    lastName: "Veuillez saisir votre nom de famille",
                    email: "Veuillez saisir une adresse e-mail valide",
                    emailInvalid: "Le format de l'adresse e-mail n'est pas valide",
                    phone: "Veuillez saisir un numéro de téléphone valide",
                    phoneInvalid: "Le format du numéro de téléphone n'est pas valide"
                },
                success: {
                    title: "Informations de réservation soumises avec succès !",
                    message: "Merci d'avoir fourni vos informations. Nous vous contactons sous peu pour confirmer votre réservation."
                }
            }
        }
    },
    // ============================================================================
    // FORM CONFIGURATION - Enhanced field definitions with modern structure
    // ============================================================================
    FORM_CONFIG: {
        steps: [
                    // Single Step: Booking Information
            {
                sectionId: "booking_information", // NEW: Explicit section ID for generic processing
                fields: [
                    {
                        type: 'text',
                        id: 'firstName',
                        required: true,
                        row: 'name',
                        getCustomErrorMessage: (lang) => BookingInformationExtension.FORM_DATA.translations[lang].errors.firstName
                            },
                    {
                        type: 'text',
                        id: 'lastName',
                        required: true,
                        row: 'name',
                        getCustomErrorMessage: (lang) => BookingInformationExtension.FORM_DATA.translations[lang].errors.lastName
                            },
                    {
                        type: 'email',
                        id: 'email',
                        required: true,
                        row: 'contact',
                        getCustomErrorMessage: (lang) => BookingInformationExtension.FORM_DATA.translations[lang].errors.email,
                        getCustomErrorMessages: (lang) => ({
                            required: BookingInformationExtension.FORM_DATA.translations[lang].errors.email,
                            invalid: BookingInformationExtension.FORM_DATA.translations[lang].errors.emailInvalid
                        })
                            },
                    {
                        type: 'phone',
                        id: 'phone',
                        required: true,
                        row: 'contact',
                        getCustomErrorMessage: (lang) => BookingInformationExtension.FORM_DATA.translations[lang].errors.phone,
                        getCustomErrorMessages: (lang) => ({
                            required: BookingInformationExtension.FORM_DATA.translations[lang].errors.phone,
                            phone: BookingInformationExtension.FORM_DATA.translations[lang].errors.phoneInvalid
                        })
                            }
                        ]
                    }
                ]
    }
};
const CalendarExtension = {
    name: "CalendarBookingSingleStep",
    type: "response",
    match: ({
        trace
    }) => trace.type === "ext_calendar" || trace.payload?.name === "ext_calendar",
    // Global storage
    _currentExtension: null,
    _cachedCalendarField: null,
    _serviceData: null,
    _userData: null,
    initializeCalComUtility(config) {
        if (!this.calComUtility) {
            this.calComUtility = new CalComBaseUtility({
                apiKey: config.apiKey,
                logPrefix: "📅 BookingDirect",
                enableLogging: config.enableDetailedLogging !== false,
                errorMessages: {
                    missingContactInfo: "Contact information is required",
                    bookingFailed: "Failed to create booking"
                }
            });
        } else {
            if (config.apiKey) {
                this.calComUtility.setApiKey(config.apiKey);
            }
        }
        return this.calComUtility;
    },
    // Validate service data from payload
    validateServiceData(payload) {
        const errors = [];
        const requiredFields = ['eventTypeId', 'eventTypeSlug', 'scheduleId'];
        requiredFields.forEach(field => {
            if (!payload[field]) {
                errors.push(`Missing required field '${field}' in payload`);
            }
        });
        if (!payload.serviceTitle && !payload.eventName) {
            errors.push("Missing service title or event name");
        }
        return {
            valid: errors.length === 0,
            errors
        };
    },
    // Validate user data from payload
    validateUserData(payload) {
        const errors = [];
        const requiredFields = ['firstName', 'lastName', 'email'];
        requiredFields.forEach(field => {
            if (!payload[field]) {
                errors.push(`Missing required user field '${field}' in payload`);
            }
        });
        // Basic email validation
        if (payload.email && !payload.email.includes('@')) {
            errors.push("Invalid email format");
        }
        return {
            valid: errors.length === 0,
            errors
        };
    },
    // Process payload and create service object
    processPayloadData(payload) {
        console.log('📅 Processing payload data...');
        // Validate service data
        const serviceValidation = this.validateServiceData(payload);
        if (!serviceValidation.valid) {
            console.error('📅 Service data validation errors:', serviceValidation.errors);
            return {
                valid: false,
                errors: serviceValidation.errors,
                service: null,
                userData: null
            };
        }
        // Validate user data
        const userValidation = this.validateUserData(payload);
        if (!userValidation.valid) {
            console.error('📅 User data validation errors:', userValidation.errors);
            return {
                valid: false,
                errors: userValidation.errors,
                service: null,
                userData: null
            };
        }
        // Create service object from payload
        const service = {
            id: payload.serviceId || 1,
            eventTypeId: payload.eventTypeId,
            eventTypeSlug: payload.eventTypeSlug,
            scheduleId: payload.scheduleId,
            provider: payload.serviceProvider || "Service Provider",
            eventName: payload.eventName || payload.serviceTitle || "Service",
            title: payload.serviceTitle || payload.eventName || "Service",
            description: payload.serviceDescription || "",
            duration: payload.serviceDuration || "15 minutes",
            serviceName: payload.eventName || payload.serviceTitle || "Service",
            name: payload.serviceTitle || payload.eventName || "Service",
            displayName: payload.serviceTitle || payload.eventName || "Service"
        };
        // Extract user data from payload
        const userData = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            phone: payload.phone || "",
            notes: payload.notes || ""
        };
        this._serviceData = service;
        this._userData = userData;
        console.log('📅 Service data processed successfully:', service);
        console.log('📅 User data extracted successfully:', userData);
        return {
            valid: true,
            errors: [],
            service: service,
            userData: userData
        };
    },
    render: async ({
        trace,
        element
    }) => {
        // ============================================================================
        // EXTRACT CONFIGURATION FROM PAYLOAD
        // ============================================================================
        let {
            language = "fr",
                apiKey = CONFIG.DEFAULT_API_KEY,
                timezone = "America/Toronto",
                serviceProvider = "SkaLean",
                voiceflowEnabled = true,
                enableDetailedLogging = true,
                logPrefix = "📅 BookingDirect",
                enableSessionTimeout = true,
                sessionTimeout = CONFIG.SESSION_TIMEOUT,
                sessionWarning = CONFIG.SESSION_WARNING,
                cssUrls = CONFIG.DEFAULT_CSS,
                formType = "booking",
                formStructure = "singlestep", // Changed to single step
                useStructuredData = true,
                dataTransformer = BaseDataTransformer
        } = trace.payload || {};
        console.log('📅 Optimized Booking Direct Extension (Single Step) started');
        console.log('📅 Payload received:', Object.keys(trace.payload || {}));
        // Process service and user data from payload
        const dataValidation = CalendarExtension.processPayloadData(trace.payload || {});
        if (!dataValidation.valid) {
            const errorHtml = `
                        <div class="data-validation-warning">
                            <h4>⚠️ Configuration Error</h4>
                            <p>The following issues were found:</p>
                            <ul>
                                ${dataValidation.errors.map(error => `<li>${error}</li>`).join('')}
                            </ul>
                        </div>
                    `;
            element.innerHTML = errorHtml;
            return element;
        }
        const selectedService = dataValidation.service;
        const userData = dataValidation.userData;
        // Initialize Cal.com utility
        const calComUtility = CalendarExtension.initializeCalComUtility({
            apiKey: apiKey,
            enableDetailedLogging: enableDetailedLogging
        });
        // Helper function for translations
        const getTranslatedText = (key, lang = language) => {
            const keys = key.split('.');
            let value = CalendarExtension.FORM_DATA.translations[lang];
            for (const k of keys) {
                value = value?.[k];
            }
            return value || key;
        };
        // ============================================================================
        // SINGLE STEP FORM CONFIGURATION - Calendar only
        // ============================================================================
        const formConfig = {
            steps: [
                        // Single Step: Calendar
                {
                    sectionId: "appointment_scheduling",
                    title: getTranslatedText('steps.calendar.title'),
                    description: getTranslatedText('steps.calendar.desc'),
                    fields: [


                                // Calendar field
                        {
                            type: 'calendar',
                            id: 'appointment',
                            name: 'appointment',
                            label: getTranslatedText('fields.appointment'),
                            required: true,
                            mode: 'booking',
                            headerIcon: 'CALENDAR',
                            selectionMode: 'none',
                            row: "calendar",
                            // Direct configuration with service data
                            apiKey: apiKey,
                            eventTypeId: selectedService.eventTypeId,
                            eventTypeSlug: selectedService.eventTypeSlug,
                            scheduleId: selectedService.scheduleId,
                            timezone: timezone,
                            language: language,
                            locale: language === 'fr' ? 'fr-FR' : 'en-US',
                            specialist: serviceProvider,
                            selectedCategory: selectedService.eventName,
                            eventName: selectedService.eventName,
                            // Translations
                            texts: CalendarExtension.getCalendarTexts(language),
                            errorTexts: {
                                dateTimeRequired: getTranslatedText('errors.dateTimeRequired')
                            },
                            // Error messages
                            getCustomErrorMessage: (lang) => CalendarExtension.FORM_DATA.translations[lang].errors.appointment,
                            getCustomErrorMessages: (lang) => ({
                                required: CalendarExtension.FORM_DATA.translations[lang].errors.dateTimeRequired,
                                bookingError: CalendarExtension.FORM_DATA.translations[lang].errors.bookingError
                            })
                                }
                            ]
                        }
                    ]
        };
        // Create form data with service and user info
        const formData = {
            translations: CalendarExtension.FORM_DATA.translations,
            selectedService: selectedService,
            userData: userData,
            serviceInfo: {
                provider: serviceProvider,
                serviceName: selectedService.eventName,
                serviceTitle: selectedService.title,
                serviceDescription: selectedService.description,
                duration: selectedService.duration
            }
        };
        console.log('📅 Creating single-step form');
        // Create the optimized form
        const extension = new CreatForm({
                language: language,
                formType: formType,
                formStructure: formStructure,
                useStructuredData: useStructuredData,
                dataTransformer: dataTransformer,
                // Disabled integrations
                webhookEnabled: false,
                voiceflowEnabled: voiceflowEnabled,
                // Configuration
                enableDetailedLogging: enableDetailedLogging,
                logPrefix: logPrefix,
                enableSessionTimeout: enableSessionTimeout,
                sessionTimeout: sessionTimeout,
                sessionWarning: sessionWarning,
                apiKey: apiKey,
                timezone: timezone,
                serviceProvider: serviceProvider,
                preSelectedService: selectedService,
                // Form is ready immediately since we only have one step
                onReady: () => {
                    console.log(`📅 Form ready - initializing calendar`);
                    setTimeout(() => {
                        CalendarExtension.ensureCalendarConfiguration(extension, selectedService, {
                            apiKey: apiKey,
                            timezone: timezone,
                            language: language,
                            serviceProvider: serviceProvider
                        });
                    }, 100);
                },
                // Booking submission handler with user data
                onSubmit: async (formData) => {
                    // Merge user data from payload with form data
                    const bookingData = {
                        ...formData,
                        // User data from payload
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        phone: userData.phone,
                        notes: userData.notes,
                        // Service data
                        serviceSelection: selectedService,
                        selectedService: selectedService,
                        eventTypeId: selectedService.eventTypeId,
                        eventTypeSlug: selectedService.eventTypeSlug,
                        scheduleId: selectedService.scheduleId,
                        eventName: selectedService.eventName,
                        serviceProvider: serviceProvider
                    };
                    console.log('📅 Submitting booking with data:', bookingData);
                    return await calComUtility.handleBooking(bookingData, {
                        language: language,
                        apiKey: apiKey,
                        timezone: timezone,
                        serviceProvider: serviceProvider,
                        voiceflowEnabled: voiceflowEnabled,
                        formVersion: CONFIG.FORM_VERSION,
                        selectedService: selectedService
                    });
                },
                cssUrls: cssUrls
            },
            formData,
            formConfig
        );
        // Store references
        window.currentCalendarExtension = extension;
        CalendarExtension._currentExtension = extension;
        // Render the extension
        const extensionElement = await extension.render(element);
        // ============================================================================
        // OPTIMIZED CALENDAR INITIALIZATION
        // ============================================================================
        // Ensure calendar is properly configured on initial render
        setTimeout(() => {
            CalendarExtension.ensureCalendarConfiguration(extension, selectedService, {
                apiKey: apiKey,
                timezone: timezone,
                language: language,
                serviceProvider: serviceProvider
            });
        }, 200);
        return extensionElement;
    },
    // ============================================================================
    // OPTIMIZED CALENDAR CONFIGURATION
    // ============================================================================
    ensureCalendarConfiguration(extension, selectedService, config) {
        console.log('📅 Ensuring calendar configuration with optimized approach');
        // Find calendar field using optimized search
        const calendarField = CalendarExtension.findCalendarField(extension);
        if (calendarField) {
            console.log('📅 Calendar field found, configuring...');
            // Apply complete configuration
            const calendarConfig = {
                apiKey: config.apiKey,
                eventTypeId: selectedService.eventTypeId,
                eventTypeSlug: selectedService.eventTypeSlug,
                scheduleId: selectedService.scheduleId,
                specialist: config.serviceProvider,
                selectedCategory: selectedService.eventName,
                eventName: selectedService.eventName,
                timezone: config.timezone,
                language: config.language,
                locale: config.language === 'fr' ? 'fr-FR' : 'en-US'
            };
            // Apply configuration
            Object.assign(calendarField, calendarConfig);
            console.log('📅 Calendar configured with:', calendarConfig);
            // Re-initialize calendar with optimized approach
            requestAnimationFrame(async () => {
                try {
                    // Initialize calendar if needed
                    if (calendarField.initializeCalendar) {
                        await calendarField.initializeCalendar();
                    } else if (calendarField.init) {
                        await calendarField.init();
                    }
                    // Update calendar display
                    if (calendarField.renderCalendarData) {
                        calendarField.renderCalendarData();
                    }
                    console.log('📅 Calendar initialization completed successfully');
                } catch (err) {
                    console.error('📅 Calendar initialization error:', err);
                    // Retry with alternative approach
                    if (calendarField.calendarInstance && calendarField.calendarInstance.init) {
                        try {
                            await calendarField.calendarInstance.init();
                            console.log('📅 Calendar initialized with alternative approach');
                        } catch (altErr) {
                            console.error('📅 Alternative initialization also failed:', altErr);
                        }
                    }
                }
            });
        } else {
            console.warn('📅 Calendar field not found, scheduling retry...');
            // Retry after a delay
            setTimeout(() => {
                CalendarExtension.ensureCalendarConfiguration(extension, selectedService, config);
            }, 500);
        }
    },
    // Optimized calendar field finder
    findCalendarField(extension) {
        // Use cached field if available
        if (this._cachedCalendarField && this._cachedCalendarField.name === 'appointment') {
            return this._cachedCalendarField;
        }
        // Search through extension structures
        const searchInSteps = (steps) => {
            for (let step of steps) {
                if (step.fieldInstances) {
                    for (let field of step.fieldInstances) {
                        if (field && (field.name === 'appointment' || field.id === 'appointment')) {
                            this._cachedCalendarField = field;
                            return field;
                        }
                    }
                }
            }
            return null;
        };
        // Try multiple locations (adapted for single-step form)
        const locations = [
                    extension.singleStepForm?.fieldInstances,
                    extension.factory?.currentSingleStepForm?.fieldInstances,
                    extension.factory?.singleStepForm?.fieldInstances,
                    extension.multiStepForm?.stepInstances // fallback
                ];
        // Direct field array search
        for (let location of locations) {
            if (Array.isArray(location)) {
                const found = location.find(f =>
                    f && (f.name === 'appointment' || f.id === 'appointment')
                );
                if (found) {
                    this._cachedCalendarField = found;
                    return found;
                }
            } else if (location) {
                const found = searchInSteps([location]);
                if (found) return found;
            }
        }
        // DOM fallback
        const calendarElement = document.querySelector('.calendar-container');
        if (calendarElement && calendarElement.fieldInstance) {
            this._cachedCalendarField = calendarElement.fieldInstance;
            return calendarElement.fieldInstance;
        }
        return null;
    },
    // ============================================================================
    // HELPER METHOD FOR CALENDAR TEXTS
    // ============================================================================
    getCalendarTexts: (language) => {
        const calendarTranslations = CalendarExtension.FORM_DATA.translations[language].calendar;
        return {
            selectDate: calendarTranslations.selectDate,
            availableTimesFor: calendarTranslations.availableTimesFor,
            noAvailableSlots: calendarTranslations.noAvailableSlots,
            pleaseSelectDate: calendarTranslations.pleaseSelectDate,
            loadingAvailability: calendarTranslations.loadingAvailability,
            loading: calendarTranslations.loading,
            weekdays: calendarTranslations.weekdays
        };
    },
    // ============================================================================
    // FORM DATA CONFIGURATION
    // ============================================================================
    FORM_DATA: {
        translations: {
            fr: {
                nav: {
                    next: "Suivant",
                    previous: "Précédent",
                    submit: "Confirmer la réservation",
                    processing: "Traitement en cours..."
                },
                labels: {
                    serviceProvider: "Prestataire de service",
                    selectedService: "Service sélectionné",
                    appointmentDetails: "Détails du rendez-vous",
                    userInfo: "Informations du client"
                },
                placeholders: {
                    firstName: "Entrez votre prénom",
                    lastName: "Entrez votre nom de famille",
                    email: "votre.email@example.com"
                },
                steps: {
                    calendar: {
                        title: "Sélection de Date et Heure",
                        desc: "Choisissez votre créneau préféré pour votre rendez-vous"
                    }
                },
                fields: {
                    firstName: "Prénom",
                    lastName: "Nom de famille",
                    name: "Nom",
                    email: "Adresse électronique",
                    appointment: "Sélectionnez date et heure"
                },
                errors: {
                    firstName: "Le prénom est requis",
                    lastName: "Le nom de famille est requis",
                    email: "Une adresse email valide est requise",
                    emailInvalid: "Le format de l'adresse email n'est pas valide",
                    appointment: "Veuillez sélectionner une date et une heure",
                    dateTimeRequired: "Veuillez sélectionner une date et une heure",
                    bookingError: "Erreur lors de la réservation. Veuillez réessayer."
                },
                success: {
                    title: "Rendez-vous confirmé !",
                    message: "Votre rendez-vous a été programmé avec succès. Vous recevrez sous peu un email de confirmation."
                },
                calendar: {
                    selectDate: "Sélectionnez une date pour voir les horaires disponibles",
                    availableTimesFor: "Disponibilités pour",
                    noAvailableSlots: "Aucun horaire disponible pour cette date",
                    pleaseSelectDate: "Veuillez d'abord sélectionner une date",
                    loadingAvailability: "Chargement des disponibilités...",
                    loading: "Chargement...",
                    weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
                }
            },
            en: {
                nav: {
                    next: "Next",
                    previous: "Previous",
                    submit: "Confirm Booking",
                    processing: "Processing..."
                },
                labels: {
                    serviceProvider: "Service Provider",
                    selectedService: "Selected Service",
                    appointmentDetails: "Appointment Details",
                    userInfo: "Customer Information"
                },
                placeholders: {
                    firstName: "Enter your first name",
                    lastName: "Enter your last name",
                    email: "your.email@example.com"
                },
                steps: {
                    calendar: {
                        title: "Select Date & Time",
                        desc: "Choose your preferred time slot for your appointment"
                    }
                },
                fields: {
                    firstName: "First Name",
                    lastName: "Last Name",
                    name: "Name",
                    email: "Email Address",
                    appointment: "Select date and time"
                },
                errors: {
                    firstName: "First name is required",
                    lastName: "Last name is required",
                    email: "A valid email address is required",
                    emailInvalid: "Email format is not valid",
                    appointment: "Please select a date and time",
                    dateTimeRequired: "Please select a date and time",
                    bookingError: "Booking error. Please try again."
                },
                success: {
                    title: "Appointment Confirmed!",
                    message: "Your appointment has been successfully scheduled. You will receive a confirmation email shortly."
                },
                calendar: {
                    selectDate: "Select a date to view available times",
                    availableTimesFor: "Available times for",
                    noAvailableSlots: "No available time slots for this date",
                    pleaseSelectDate: "Please select a date first",
                    loadingAvailability: "Loading availability...",
                    loading: "Loading...",
                    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                }
            }
        }
    }
};
const RescheduleCalendarExtension = {
    name: "ModernRescheduleCalendar",
    type: "response",
    match: ({
        trace
    }) => trace.type === "ext_reschedule_calendar" || trace.payload?.name === "ext_reschedule_calendar",
    // ============================================================================
    // INITIALIZE REUSABLE CAL.COM UTILITY
    // ============================================================================
    initializeCalComUtility(config) {
        if (!this.calComUtility) {
            this.calComUtility = new CalComBaseUtility({
                apiKey: config.apiKey,
                logPrefix: "📅 RescheduleCalendar",
                enableLogging: config.enableDetailedLogging !== false,
                errorMessages: {
                    missingNewTime: "New appointment time is required",
                    reschedulingFailed: "Failed to reschedule booking"
                }
            });
        } else {
            if (config.apiKey) {
                this.calComUtility.setApiKey(config.apiKey);
            }
        }
        return this.calComUtility;
    },
    render: async ({
        trace,
        element
    }) => {
        // ============================================================================
        // EXTRACT ALL PAYLOAD DATA INTO VARIABLES USING DESTRUCTURING
        // ============================================================================
        let {
            language = "fr",
                vf,
                apiKey = CONFIG.DEFAULT_API_KEY,
                uid = "",
                email = "",
                serviceProvider = "Dr. Sophie Martin",
                startTime = "",
                scheduleId = "",
                eventTypeId = "",
                eventTypeSlug = "",
                timezone = "America/Toronto",
                voiceflowEnabled = true,
                voiceflowDataTransformer = null,
                enableDetailedLogging = true,
                logPrefix = "📅 RescheduleCalendar",
                enableSessionTimeout = true,
                sessionTimeout = CONFIG.SESSION_TIMEOUT,
                sessionWarning = CONFIG.SESSION_WARNING,
                cssUrls = CONFIG.DEFAULT_CSS,
                formType = "reschedule",
                formStructure = "multistep",
                useStructuredData = true,
                dataTransformer = BaseDataTransformer
        } = trace.payload || {};
        // Extract reschedule details from extracted variables
        const rescheduleData = {
            uid: uid,
            email: email,
            serviceProvider: serviceProvider,
            startTime: startTime,
            scheduleId: scheduleId,
            eventTypeId: eventTypeId,
            eventTypeSlug: eventTypeSlug
        };
        // Initialize Cal.com utility using extracted variables
        const calComUtility = RescheduleCalendarExtension.initializeCalComUtility({
            apiKey: apiKey,
            enableDetailedLogging: enableDetailedLogging
        });
        // Helper function to get translated text
        const getTranslatedText = (key, lang = language) => {
            const keys = key.split('.');
            let value = RescheduleCalendarExtension.FORM_DATA.translations[lang];
            for (const k of keys) {
                value = value?.[k];
            }
            return value || key;
        };
        // Get service name for display using utility
        const serviceName = calComUtility.getServiceName(
            rescheduleData.eventTypeSlug,
            rescheduleData.serviceProvider,
            RescheduleCalendarExtension.FORM_DATA.serviceMapping
        );
        // Clone the form config and populate variables dynamically
        const formConfig = JSON.parse(JSON.stringify(RescheduleCalendarExtension.FORM_CONFIG));
        // Populate currentAppointmentCard field in step 1
        const appointmentCardField = formConfig.steps[0].fields[0];
        appointmentCardField.serviceProvider = rescheduleData.serviceProvider;
        appointmentCardField.startTime = rescheduleData.startTime;
        appointmentCardField.serviceName = serviceName;
        appointmentCardField.eventTypeSlug = rescheduleData.eventTypeSlug;
        appointmentCardField.language = language;
        appointmentCardField.translations = RescheduleCalendarExtension.FORM_DATA.translations;
        appointmentCardField.serviceMapping = RescheduleCalendarExtension.FORM_DATA.serviceMapping;
        // Populate textarea field with translations
        const textareaField = formConfig.steps[0].fields[1];
        textareaField.placeholder = getTranslatedText('fields.rescheduleReasonPlaceholder');
        textareaField.customErrorMessage = getTranslatedText('errors.reasonRequired');
        textareaField.customErrorMessages = {
            required: getTranslatedText('errors.reasonRequired')
        };
        // Populate calendar field variables dynamically
        const calendarField = formConfig.steps[1].fields[0];
        // Set calendar configuration variables
        calendarField.apiKey = apiKey;
        calendarField.timezone = timezone;
        calendarField.language = language;
        calendarField.locale = language === 'fr' ? 'fr-FR' : 'en-US';
        calendarField.serviceProvider = rescheduleData.serviceProvider;
        // Set reschedule-specific variables
        calendarField.eventTypeId = parseInt(rescheduleData.eventTypeId);
        calendarField.eventTypeSlug = rescheduleData.eventTypeSlug;
        calendarField.scheduleId = rescheduleData.scheduleId;
        calendarField.serviceName = serviceName;
        calendarField.eventName = serviceName;
        calendarField.currentAppointment = rescheduleData.startTime;
        calendarField.uid = rescheduleData.uid;
        calendarField.email = rescheduleData.email;
        calendarField.mode = 'reschedule'; // IMPORTANT: Set mode to reschedule
        // Provide all translated texts to calendar field
        const calendarTranslations = RescheduleCalendarExtension.FORM_DATA.translations[language].calendar;
        calendarField.texts = {
            selectDate: calendarTranslations.selectDate,
            availableTimesFor: calendarTranslations.availableTimesFor,
            noAvailableSlots: calendarTranslations.noAvailableSlots,
            pleaseSelectDate: calendarTranslations.pleaseSelectDate,
            currentAppointment: calendarTranslations.currentAppointment,
            newAppointment: calendarTranslations.newAppointment,
            loadingAvailability: calendarTranslations.loadingAvailability,
            loading: calendarTranslations.loading,
            weekdays: calendarTranslations.weekdays
        };
        // Provide error texts to calendar field
        calendarField.errorTexts = {
            dateTimeRequired: RescheduleCalendarExtension.FORM_DATA.translations[language].errors.dateTimeRequired,
            rescheduleError: RescheduleCalendarExtension.FORM_DATA.translations[language].errors.rescheduleError
        };
        // ============================================================================
        // FIXED: Disable CreatForm's Voiceflow - CalComBaseUtility handles it
        // This prevents double-sending to Voiceflow
        // ============================================================================
        // Create the form with the new generic architecture using extracted variables
        const extension = new CreatForm({
                language: language,
                formType: formType,
                formStructure: formStructure,
                // ============================================================================
                // NEW: Generic approach - no specific field transformers needed!
                // BaseDataTransformer + FormDataProcessor handle everything automatically
                // ============================================================================
                useStructuredData: useStructuredData,
                dataTransformer: dataTransformer, // Generic transformer works with any form!
                // DISABLED: Webhook integration (reschedule goes directly to Cal.com)
                webhookEnabled: false,
                webhookUrl: null,
                // FIXED: Disable CreatForm's Voiceflow - CalComBaseUtility handles it properly
                voiceflowEnabled: false, // ← CHANGED: was voiceflowEnabled, now false
                voiceflowDataTransformer: null, // ← This is ignored when voiceflowEnabled is false
                // Enhanced logging using extracted variables
                enableDetailedLogging: enableDetailedLogging,
                logPrefix: logPrefix,
                // Session management using extracted variables
                enableSessionTimeout: enableSessionTimeout,
                sessionTimeout: sessionTimeout,
                sessionWarning: sessionWarning,
                // Reschedule-specific configuration using extracted variables
                apiKey: apiKey,
                timezone: timezone,
                serviceProvider: rescheduleData.serviceProvider,
                // Reschedule appointment data
                uid: rescheduleData.uid,
                email: rescheduleData.email,
                currentStartTime: rescheduleData.startTime,
                eventTypeId: rescheduleData.eventTypeId,
                eventTypeSlug: rescheduleData.eventTypeSlug,
                scheduleId: rescheduleData.scheduleId,
                // ============================================================================
                // SIMPLIFIED: Just use the utility's handleReschedule method!
                // ============================================================================
                onSubmit: async (formData) => {
                    return await calComUtility.handleReschedule(formData, {
                        language: language,
                        uid: rescheduleData.uid,
                        apiKey: apiKey,
                        serviceProvider: rescheduleData.serviceProvider,
                        startTime: rescheduleData.startTime,
                        eventTypeSlug: rescheduleData.eventTypeSlug,
                        email: rescheduleData.email,
                        voiceflowEnabled: voiceflowEnabled, // ← This controls CalComBaseUtility's Voiceflow
                        formVersion: CONFIG.FORM_VERSION
                    });
                },
                // CSS configuration using extracted variables
                cssUrls: cssUrls
            },
            RescheduleCalendarExtension.FORM_DATA,
            formConfig
        );
        return await extension.render(element);
    },
    // ============================================================================
    // FORM DATA CONFIGURATION - Same as before, no changes needed
    // ============================================================================
    FORM_DATA: {
        serviceMapping: {
            'nettoyages-et-examens-dentaires': 'Nettoyages et examens dentaires',
            'consultation-dentaire': 'Consultation dentaire',
            'chirurgie-dentaire': 'Chirurgie dentaire',
            'orthodontie': 'Orthodontie',
            'implants-dentaires': 'Implants dentaires',
            'blanchiment-dentaire': 'Blanchiment dentaire',
            'discovery-call-15-minutes': 'Entretien Exploratoire',
            'demonstration-chatbot-15min': 'Démonstration de l\'Agent IA',
            'reunion-45min': 'Présentation Détaillée',
            'reunion-projet': 'Session de Travail'
        },
        translations: {
            fr: {
                nav: {
                    next: "Suivant",
                    previous: "Précédent",
                    submit: "Replanifier le rendez-vous",
                    processing: "Traitement en cours..."
                },
                common: {
                    yes: "Oui",
                    no: "Non",
                    other: "Autre",
                    required: "requis",
                    fieldRequired: "Ce champ est requis",
                    edit: "Modifier",
                    notSpecified: "Non spécifié",
                    none: "Aucun",
                    pleaseSpecify: "Veuillez préciser...",
                    selectAtLeastOne: "Veuillez sélectionner au moins une option"
                },
                labels: {
                    serviceProvider: "Prestataire de service",
                    currentAppointment: "Rendez-vous actuel",
                    newAppointment: "Nouveau rendez-vous",
                    rescheduleDetails: "Détails de la replanification"
                },
                placeholders: {
                    rescheduleReason: "Pourquoi souhaitez-vous replanifier ce rendez-vous ?"
                },
                steps: [
                    {
                        title: "Informations Actuelles",
                        desc: "Consultez les informations actuelles et indiquez la raison de la replanification"
                    },
                    {
                        title: "Nouvelle Date et Heure",
                        desc: "Choisissez votre nouveau créneau préféré"
                    }
                        ],
                fields: {
                    currentAppointment: "Rendez-vous Actuel",
                    scheduledWith: "Programmé avec",
                    currentDateTime: "Date et heure actuelles",
                    serviceName: "Service",
                    reschedulingFrom: "Replanification de",
                    rescheduleReason: "Raison de la replanification",
                    rescheduleReasonPlaceholder: "Pourquoi souhaitez-vous replanifier ce rendez-vous ?",
                    selectDateTime: "Sélectionner nouvelle date et heure"
                },
                errors: {
                    reasonRequired: "Veuillez indiquer la raison de la replanification",
                    dateTimeRequired: "Veuillez sélectionner une nouvelle date et heure",
                    rescheduleError: "Erreur lors de la replanification. Veuillez réessayer."
                },
                success: {
                    title: "Rendez-vous replanifié !",
                    message: "Votre rendez-vous a été replanifié avec succès. Vous recevrez sous peu un email de confirmation."
                },
                calendar: {
                    selectDate: "Sélectionnez une date pour voir les horaires disponibles",
                    availableTimesFor: "Disponibilités pour",
                    noAvailableSlots: "Aucun horaire disponible pour cette date",
                    pleaseSelectDate: "Veuillez d'abord sélectionner une date",
                    currentAppointment: "Rendez-vous Actuel",
                    newAppointment: "Nouveau Rendez-vous",
                    loadingAvailability: "Chargement des disponibilités...",
                    loading: "Chargement...",
                    weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
                }
            },
            en: {
                nav: {
                    next: "Next",
                    previous: "Previous",
                    submit: "Reschedule Appointment",
                    processing: "Processing..."
                },
                common: {
                    yes: "Yes",
                    no: "No",
                    other: "Other",
                    required: "required",
                    fieldRequired: "This field is required",
                    edit: "Edit",
                    notSpecified: "Not specified",
                    none: "None",
                    pleaseSpecify: "Please specify...",
                    selectAtLeastOne: "Please select at least one option"
                },
                labels: {
                    serviceProvider: "Service Provider",
                    currentAppointment: "Current Appointment",
                    newAppointment: "New Appointment",
                    rescheduleDetails: "Reschedule Details"
                },
                placeholders: {
                    rescheduleReason: "Why do you want to reschedule this appointment?"
                },
                steps: [
                    {
                        title: "Current Information",
                        desc: "Review current information and provide reason for rescheduling"
                    },
                    {
                        title: "New Date & Time",
                        desc: "Choose your new preferred time slot"
                    }
                        ],
                fields: {
                    currentAppointment: "Current Appointment",
                    scheduledWith: "Scheduled with",
                    currentDateTime: "Current date and time",
                    serviceName: "Service",
                    reschedulingFrom: "Rescheduling from",
                    rescheduleReason: "Reason for rescheduling",
                    rescheduleReasonPlaceholder: "Why do you want to reschedule this appointment?",
                    selectDateTime: "Select new date and time"
                },
                errors: {
                    reasonRequired: "Please provide a reason for rescheduling",
                    dateTimeRequired: "Please select a new date and time",
                    rescheduleError: "Rescheduling error. Please try again."
                },
                success: {
                    title: "Appointment Rescheduled!",
                    message: "Your appointment has been successfully rescheduled. You will receive a confirmation email shortly."
                },
                calendar: {
                    selectDate: "Select a date to view available times",
                    availableTimesFor: "Available times for",
                    noAvailableSlots: "No available time slots for this date",
                    pleaseSelectDate: "Please select a date first",
                    currentAppointment: "Current Appointment",
                    newAppointment: "New Appointment",
                    loadingAvailability: "Loading availability...",
                    loading: "Loading...",
                    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                }
            }
        }
    },
    // ============================================================================
    // FORM CONFIGURATION - Same as before, no changes needed
    // ============================================================================
    FORM_CONFIG: {
        steps: [
                    // Step 1: Current Appointment Info + Reason
            {
                sectionId: "current_appointment_info", // NEW: Explicit section ID for generic processing
                fields: [
                    {
                        type: 'currentAppointmentCard',
                        id: 'currentAppointmentDisplay',
                        required: false,
                        serviceProvider: '{{serviceProvider}}',
                        startTime: '{{startTime}}',
                        serviceName: '{{serviceName}}',
                        eventTypeSlug: '{{eventTypeSlug}}',
                        language: '{{language}}',
                        cardStyle: 'default',
                        iconType: 'reschedule',
                        showServiceName: true,
                        showDateTime: true,
                        showProvider: true,
                        translations: '{{translations}}',
                        serviceMapping: '{{serviceMapping}}'
                            },
                    {
                        type: 'textarea',
                        id: 'rescheduleReason',
                        required: true,
                        row: 'rescheduleReason',
                        rows: 4,
                        maxLength: 500,
                        showCounter: true,
                        placeholder: '{{placeholder}}',
                        getCustomErrorMessage: (lang) => RescheduleCalendarExtension.FORM_DATA.translations[lang].errors.reasonRequired
                            }
                        ]
                    },

                    // Step 2: New Date/Time Selection
            {
                sectionId: "new_appointment_scheduling", // NEW: Explicit section ID for generic processing
                fields: [
                    {
                        type: 'calendar',
                        id: 'newAppointment',
                        row: 'newAppointment',
                        required: true,
                        mode: 'reschedule',
                        headerIcon: 'RESCHEDULE',
                        apiKey: '{{apiKey}}',
                        timezone: '{{timezone}}',
                        language: '{{language}}',
                        eventTypeId: '{{eventTypeId}}',
                        eventTypeSlug: '{{eventTypeSlug}}',
                        scheduleId: '{{scheduleId}}',
                        serviceProvider: '{{serviceProvider}}',
                        serviceName: '{{serviceName}}',
                        currentAppointment: '{{startTime}}',
                        eventName: '{{serviceName}}',
                        uid: '{{uid}}',
                        email: '{{email}}',
                        getCustomErrorMessage: (lang) => RescheduleCalendarExtension.FORM_DATA.translations[lang].errors.dateTimeRequired,
                        getCustomErrorMessages: (lang) => ({
                            required: RescheduleCalendarExtension.FORM_DATA.translations[lang].errors.dateTimeRequired,
                            rescheduleError: RescheduleCalendarExtension.FORM_DATA.translations[lang].errors.rescheduleError
                        })
                            }
                        ]
                    }
                ]
    }
};
const CancellationDirectExtension = {
    name: "ModernCancellationDirect",
    type: "response",
    match: ({
        trace
    }) => trace.type === "ext_cancellation_direct" || trace.payload?.name === "ext_cancellation_direct",
    // ============================================================================
    // INITIALIZE REUSABLE CAL.COM UTILITY
    // ============================================================================
    initializeCalComUtility(config) {
        if (!this.calComUtility) {
            this.calComUtility = new CalComBaseUtility({
                apiKey: config.apiKey,
                logPrefix: "❌ CancellationDirect",
                enableLogging: config.enableDetailedLogging !== false,
                errorMessages: {
                    // Custom error messages for cancellation
                    missingReason: "Cancellation reason is required",
                    cancellationFailed: "Failed to cancel booking"
                }
            });
        } else {
            // Update API key if provided
            if (config.apiKey) {
                this.calComUtility.setApiKey(config.apiKey);
            }
        }
        return this.calComUtility;
    },
    render: async ({
        trace,
        element
    }) => {
        // ============================================================================
        // EXTRACT ALL PAYLOAD DATA INTO VARIABLES USING DESTRUCTURING
        // ============================================================================
        let {
            language = "fr",
                vf,
                apiKey = CONFIG.DEFAULT_API_KEY,
                uid = "",
                email = "",
                serviceProvider = "Dr. Sophie Martin",
                startTime = "",
                eventTypeSlug = "",
                timezone = "America/Toronto",
                voiceflowEnabled = true,
                voiceflowDataTransformer = null,
                enableDetailedLogging = true,
                logPrefix = "❌ CancellationDirect",
                enableSessionTimeout = true,
                sessionTimeout = CONFIG.SESSION_TIMEOUT,
                sessionWarning = CONFIG.SESSION_WARNING,
                cssUrls = CONFIG.DEFAULT_CSS,
                formType = "cancellation",
                formStructure = "single",
                useStructuredData = true,
                dataTransformer = BaseDataTransformer
        } = trace.payload || {};
        // Extract cancellation details from extracted variables
        const cancellationData = {
            uid: uid,
            email: email,
            serviceProvider: serviceProvider,
            startTime: startTime,
            eventTypeSlug: eventTypeSlug
        };
        // Initialize Cal.com utility using extracted variables
        const calComUtility = CancellationDirectExtension.initializeCalComUtility({
            apiKey: apiKey,
            enableDetailedLogging: enableDetailedLogging
        });
        // Helper function to get translated text
        const getTranslatedText = (key, lang = language) => {
            const keys = key.split('.');
            let value = CancellationDirectExtension.FORM_DATA.translations[lang];
            for (const k of keys) {
                value = value?.[k];
            }
            return value || key;
        };
        // Get service name for display using utility
        const serviceName = calComUtility.getServiceName(
            cancellationData.eventTypeSlug,
            cancellationData.serviceProvider,
            CancellationDirectExtension.FORM_DATA.serviceMapping
        );
        // Clone the form config and populate variables dynamically
        const formConfig = JSON.parse(JSON.stringify(CancellationDirectExtension.FORM_CONFIG));
        // Populate booking cancellation card field
        const bookingCardField = formConfig.steps[0].fields[0];
        bookingCardField.serviceProvider = cancellationData.serviceProvider;
        bookingCardField.startTime = cancellationData.startTime;
        bookingCardField.serviceName = serviceName;
        bookingCardField.eventTypeSlug = cancellationData.eventTypeSlug;
        bookingCardField.language = language;
        bookingCardField.uid = cancellationData.uid;
        bookingCardField.email = cancellationData.email;
        bookingCardField.translations = CancellationDirectExtension.FORM_DATA.translations;
        bookingCardField.serviceMapping = CancellationDirectExtension.FORM_DATA.serviceMapping;
        // Populate textarea field with translations
        const textareaField = formConfig.steps[0].fields[1];
        textareaField.placeholder = getTranslatedText('fields.cancellationReasonPlaceholder');
        textareaField.customErrorMessage = getTranslatedText('errors.reasonRequired');
        textareaField.customErrorMessages = {
            required: getTranslatedText('errors.reasonRequired')
        };
        // ============================================================================
        // DRAMATICALLY SIMPLIFIED: Uses generic FormDataProcessor and BaseDataTransformer
        // Same structure as SubmissionFormExtension
        // ============================================================================
        // Create the form with the new generic architecture using extracted variables
        const extension = new CreatForm({
                language: language,
                formType: formType,
                formStructure: formStructure,
                // ============================================================================
                // NEW: Generic approach - no specific field transformers needed!
                // BaseDataTransformer + FormDataProcessor handle everything automatically
                // ============================================================================
                useStructuredData: useStructuredData,
                dataTransformer: dataTransformer, // Generic transformer works with any form!
                // DISABLED: Webhook integration for cancellation forms
                webhookEnabled: false,
                webhookUrl: null,
                // ENABLED: Voiceflow integration with optional custom transformer
                voiceflowEnabled: voiceflowEnabled,
                voiceflowDataTransformer: voiceflowDataTransformer,
                // Enhanced logging using extracted variables
                enableDetailedLogging: enableDetailedLogging,
                logPrefix: logPrefix,
                // Session management using extracted variables
                enableSessionTimeout: enableSessionTimeout,
                sessionTimeout: sessionTimeout,
                sessionWarning: sessionWarning,
                // Cal.com specific configuration using extracted variables
                apiKey: apiKey,
                timezone: timezone,
                serviceProvider: cancellationData.serviceProvider,
                uid: cancellationData.uid,
                email: cancellationData.email,
                startTime: cancellationData.startTime,
                eventTypeSlug: cancellationData.eventTypeSlug,
                // ============================================================================
                // SIMPLIFIED: Just use the utility's handleCancellation method!
                // ============================================================================
                onSubmit: async (formData) => {
                    return await calComUtility.handleCancellation(formData, {
                        language: language,
                        uid: cancellationData.uid,
                        apiKey: apiKey,
                        serviceProvider: cancellationData.serviceProvider,
                        startTime: cancellationData.startTime,
                        eventTypeSlug: cancellationData.eventTypeSlug,
                        email: cancellationData.email,
                        voiceflowEnabled: voiceflowEnabled,
                        formVersion: CONFIG.FORM_VERSION
                    });
                },
                // CSS configuration using extracted variables
                cssUrls: cssUrls
            },
            CancellationDirectExtension.FORM_DATA,
            formConfig
        );
        // ============================================================================
        // SIMPLIFIED: Just use the utility's loadAndPopulateBookingData method!
        // ============================================================================
        await calComUtility.loadAndPopulateBookingData(extension, {
            uid: cancellationData.uid,
            apiKey: apiKey,
            language: language,
            serviceProvider: cancellationData.serviceProvider,
            eventTypeSlug: cancellationData.eventTypeSlug,
            email: cancellationData.email,
            startTime: cancellationData.startTime
        });
        return await extension.render(element);
    },
    // ============================================================================
    // FORM DATA CONFIGURATION - Same as before, no changes needed
    // ============================================================================
    FORM_DATA: {
        serviceMapping: {
            'nettoyages-et-examens-dentaires': 'Nettoyages et examens dentaires',
            'consultation-dentaire': 'Consultation dentaire',
            'chirurgie-dentaire': 'Chirurgie dentaire',
            'orthodontie': 'Orthodontie',
            'implants-dentaires': 'Implants dentaires',
            'blanchiment-dentaire': 'Blanchiment dentaire',
            'discovery-call-15-minutes': 'Entretien Exploratoire',
            'demonstration-chatbot-15min': 'Démonstration de l\'Agent IA',
            'reunion-45min': 'Présentation Détaillée',
            'reunion-projet': 'Session de Travail'
        },
        translations: {
            fr: {
                nav: {
                    next: "Suivant",
                    previous: "Précédent",
                    submit: "Annuler le rendez-vous",
                    processing: "Annulation en cours..."
                },
                common: {
                    yes: "Oui",
                    no: "Non",
                    other: "Autre",
                    required: "requis",
                    fieldRequired: "Ce champ est requis",
                    edit: "Modifier",
                    notSpecified: "Non spécifié",
                    none: "Aucun",
                    pleaseSpecify: "Veuillez préciser...",
                    selectAtLeastOne: "Veuillez sélectionner au moins une option"
                },
                labels: {
                    serviceProvider: "Prestataire de service",
                    bookingToCancel: "Rendez-vous à annuler",
                    cancellationDetails: "Détails de l'annulation"
                },
                placeholders: {
                    cancellationReason: "Pourquoi souhaitez-vous annuler ce rendez-vous ?"
                },
                steps: [
                    {
                        title: "Annuler Votre Rendez-vous",
                        desc: "Consultez les informations de votre rendez-vous et indiquez la raison de l'annulation"
                    }
                        ],
                fields: {
                    bookingToCancel: "Rendez-vous à Annuler",
                    scheduledWith: "Programmé avec",
                    currentDateTime: "Date et heure",
                    serviceName: "Service",
                    bookingNumber: "Numéro de Réservation",
                    status: "Statut",
                    confirmed: "Confirmé",
                    attendee: "Participant",
                    email: "Courriel",
                    cancellationReason: "Raison de l'annulation",
                    cancellationReasonPlaceholder: "Pourquoi souhaitez-vous annuler ce rendez-vous ?"
                },
                errors: {
                    reasonRequired: "Veuillez indiquer la raison de l'annulation",
                    cancellationError: "Erreur lors de l'annulation. Veuillez réessayer."
                },
                success: {
                    title: "Rendez-vous annulé !",
                    message: "Votre rendez-vous a été annulé avec succès. Vous recevrez sous peu un email de confirmation."
                }
            },
            en: {
                nav: {
                    next: "Next",
                    previous: "Previous",
                    submit: "Cancel Appointment",
                    processing: "Cancelling..."
                },
                common: {
                    yes: "Yes",
                    no: "No",
                    other: "Other",
                    required: "required",
                    fieldRequired: "This field is required",
                    edit: "Edit",
                    notSpecified: "Not specified",
                    none: "None",
                    pleaseSpecify: "Please specify...",
                    selectAtLeastOne: "Please select at least one option"
                },
                labels: {
                    serviceProvider: "Service Provider",
                    bookingToCancel: "Appointment to Cancel",
                    cancellationDetails: "Cancellation Details"
                },
                placeholders: {
                    cancellationReason: "Why do you want to cancel this appointment?"
                },
                steps: [
                    {
                        title: "Cancel Your Appointment",
                        desc: "Review your appointment information and provide a reason for cancellation"
                    }
                        ],
                fields: {
                    bookingToCancel: "Appointment to Cancel",
                    scheduledWith: "Scheduled with",
                    currentDateTime: "Date and time",
                    serviceName: "Service",
                    bookingNumber: "Booking Number",
                    status: "Status",
                    confirmed: "Confirmed",
                    attendee: "Attendee",
                    email: "Email",
                    cancellationReason: "Reason for cancellation",
                    cancellationReasonPlaceholder: "Why do you want to cancel this appointment?"
                },
                errors: {
                    reasonRequired: "Please provide a reason for cancellation",
                    cancellationError: "Cancellation error. Please try again."
                },
                success: {
                    title: "Appointment Cancelled!",
                    message: "Your appointment has been successfully cancelled. You will receive a confirmation email shortly."
                }
            }
        }
    },
    // ============================================================================
    // FORM CONFIGURATION - Same as before, no changes needed
    // ============================================================================
    FORM_CONFIG: {
        steps: [
            {
                sectionId: "cancellation_details", // NEW: Explicit section ID for generic processing
                fields: [
                    {
                        type: 'booking-cancellation-card',
                        id: 'currentAppointmentDisplay',
                        required: false,
                        serviceProvider: '{{serviceProvider}}',
                        startTime: '{{startTime}}',
                        serviceName: '{{serviceName}}',
                        eventTypeSlug: '{{eventTypeSlug}}',
                        language: '{{language}}',
                        uid: '{{uid}}',
                        email: '{{email}}',
                        cardStyle: 'default',
                        iconType: 'calendar',
                        showServiceName: true,
                        showDateTime: true,
                        showProvider: true,
                        showBookingInfo: true,
                        showAttendeeInfo: true,
                        translations: '{{translations}}',
                        serviceMapping: '{{serviceMapping}}'
                            },
                    {
                        type: 'textarea',
                        id: 'cancellationReason',
                        required: true,
                        row: 'cancellationReason',
                        rows: 4,
                        maxLength: 500,
                        showCounter: true,
                        placeholder: '{{placeholder}}',
                        getCustomErrorMessage: (lang) => CancellationDirectExtension.FORM_DATA.translations[lang].errors.reasonRequired
                            }
                        ]
                    }
                ]
    }
};
const ContactFormExtension = {
    name: "DentalContactForm",
    type: "response",
    match: ({
        trace
    }) => trace.type === "ext_contact_form" || trace.payload?.name === "ext_contact_form",
    render: async ({
        trace,
        element
    }) => {
        // ============================================================================
        // EXTRACT ALL PAYLOAD DATA INTO VARIABLES USING DESTRUCTURING
        // ============================================================================
        let {
            language = "fr",
                vf,
                webhookEnabled = true,
                webhookUrl = CONFIG.DEFAULT_WEBHOOK,
                voiceflowEnabled = false,
                voiceflowDataTransformer = null,
                enableDetailedLogging = true,
                logPrefix = "🦷 DentalForm",
                enableSessionTimeout = true,
                sessionTimeout = CONFIG.SESSION_TIMEOUT,
                sessionWarning = CONFIG.SESSION_WARNING,
                cssUrls = CONFIG.DEFAULT_CSS,
                formType = "contact",
                formStructure = "multistep",
                useStructuredData = true,
                dataTransformer = BaseDataTransformer
        } = trace.payload;
        // CRITICAL: Register the custom field BEFORE creating the form
        if (window.FormFieldFactory && window.FormFieldFactory.registerField) {
            console.log('Registering category-item-filter field...');
            window.FormFieldFactory.registerField('category-item-filter', CategoryItemFilterField);
            console.log('Field registered successfully');
        } else {
            console.error('FormFieldFactory not available or registerField method missing');
        }
        // Helper function to get translated text
        const getTranslatedText = (key, lang = language) => {
            const keys = key.split('.');
            let value = ContactFormExtension.FORM_DATA.translations[lang];
            for (const k of keys) {
                value = value?.[k];
            }
            return value || key;
        };
        // ============================================================================
        // BUILD LOCALIZED CATEGORY ITEMS DATA
        // ============================================================================
        const localizedCategoryItems = {};
        // Build the localized data structure
        Object.entries(ContactFormExtension.FORM_DATA.dentists)
            .forEach(([dentistId, dentistData]) => {
                const dentistName = ContactFormExtension.FORM_DATA.translations[language].dentists[dentistId].name;
                const description = ContactFormExtension.FORM_DATA.translations[language].dentists[dentistId].description;
                const specialty = ContactFormExtension.FORM_DATA.translations[language].dentists[dentistId].specialty;
                localizedCategoryItems[dentistName] = {
                    description: description,
                    specialty: specialty,
                    categories: {}
                };
                // Add localized service names
                Object.entries(dentistData.services)
                    .forEach(([serviceId, serviceData]) => {
                        const serviceName = ContactFormExtension.FORM_DATA.translations[language].services[serviceId];
                        if (serviceName) {
                            localizedCategoryItems[dentistName].categories[serviceName] = serviceData;
                        }
                    });
            });
        // ============================================================================
        // CREATE DYNAMIC FORM CONFIGURATION WITH CURRENT LANGUAGE
        // ============================================================================
        const dynamicFormConfig = {
            steps: [
                // Step 1: Contact Information
                {
                    sectionId: "contact_information",
                    fields: [
                        {
                            type: 'text',
                            id: 'firstName',
                            required: true,
                            row: 'name',
                            placeholder: ContactFormExtension.FORM_DATA.translations[language].placeholders.firstName,
                            customErrorMessage: ContactFormExtension.FORM_DATA.translations[language].errors.firstName
                        },
                        {
                            type: 'text',
                            id: 'lastName',
                            required: true,
                            row: 'name',
                            placeholder: ContactFormExtension.FORM_DATA.translations[language].placeholders.lastName,
                            customErrorMessage: ContactFormExtension.FORM_DATA.translations[language].errors.lastName
                        },
                        {
                            type: 'email',
                            id: 'email',
                            required: true,
                            row: 'contact',
                            placeholder: ContactFormExtension.FORM_DATA.translations[language].placeholders.email,
                            customErrorMessage: ContactFormExtension.FORM_DATA.translations[language].errors.email,
                            customErrorMessages: {
                                required: ContactFormExtension.FORM_DATA.translations[language].errors.email,
                                invalid: ContactFormExtension.FORM_DATA.translations[language].errors.emailInvalid
                            }
                        },
                        {
                            type: 'phone',
                            id: 'phone',
                            required: true,
                            row: 'contact',
                            placeholder: ContactFormExtension.FORM_DATA.translations[language].placeholders.phone,
                            customErrorMessage: ContactFormExtension.FORM_DATA.translations[language].errors.phone,
                            customErrorMessages: {
                                required: ContactFormExtension.FORM_DATA.translations[language].errors.phone,
                                phone: ContactFormExtension.FORM_DATA.translations[language].errors.phoneInvalid
                            }
                        }
                    ]
                },

                // Step 2: Service and Dentist Selection - WITH DIRECT LANGUAGE VALUES
                {
                    sectionId: "service_selection",
                    fields: [
                        {
                            type: 'category-item-filter',
                            id: 'categoryItem',
                            required: true,
                            categoryItems: localizedCategoryItems, // Pass localized data directly
                            row: 'categoryItem',
                            mode: 'both',
                            // PASS LANGUAGE AND ALL TRANSLATED VALUES DIRECTLY
                            language: language,
                            categoryLabel: ContactFormExtension.FORM_DATA.translations[language].fields.category,
                            itemLabel: ContactFormExtension.FORM_DATA.translations[language].fields.item,
                            categoryPlaceholder: language === 'fr' ? '-- Choisissez un service --' : '-- Choose a service --',
                            itemPlaceholder: language === 'fr' ? '-- Choisissez votre dentiste --' : '-- Choose your dentist --',
                            customErrorMessage: ContactFormExtension.FORM_DATA.translations[language].errors.categoryItem,
                            categoryErrorMessage: ContactFormExtension.FORM_DATA.translations[language].errors.categoryItem,
                            itemErrorMessage: ContactFormExtension.FORM_DATA.translations[language].errors.categoryItem,
                            // Custom summary display function
                            getSummaryDisplay: function (value, fieldInstance) {
                                if (fieldInstance && typeof fieldInstance.getSummaryFields === 'function') {
                                    const fields = fieldInstance.getSummaryFields();
                                    return fields.map(field => `${field.label}: ${field.value}`)
                                        .join('\n');
                                }
                                if (value && typeof value === 'object') {
                                    const parts = [];
                                    if (value.category) {
                                        const categoryLabel = ContactFormExtension.FORM_DATA.translations[language].fields.category;
                                        parts.push(`${categoryLabel}: ${value.category}`);
                                    }
                                    if (value.item) {
                                        const itemLabel = ContactFormExtension.FORM_DATA.translations[language].fields.item;
                                        parts.push(`${itemLabel}: ${value.item}`);
                                    }
                                    return parts.join('\n');
                                }
                                return value ? value.toString() : '';
                            },
                            renderSeparateSummaryFields: true,
                            onSelectionComplete: function (selection) {
                                console.log('Service and dentist selected:', selection);
                            }
                        }
                    ]
                },

                // Step 3: Message
                {
                    sectionId: "message_details",
                    fields: [
                        {
                            type: 'textarea',
                            id: 'message',
                            required: true,
                            maxLength: 1000,
                            rows: 6,
                            row: 'textarea',
                            placeholder: ContactFormExtension.FORM_DATA.translations[language].placeholders.message,
                            customErrorMessage: ContactFormExtension.FORM_DATA.translations[language].errors.message
                        }
                    ]
                },

                // Step 4: Summary
                {
                    sectionId: "request_summary",
                    fields: [
                        {
                            type: 'custom',
                            id: 'summary',
                            name: 'summary',
                            autoSummary: true,
                            getSummaryData: true,
                            label: ''
                        }
                    ]
                }
            ]
        };
        // Create the form with the new generic architecture and dynamic config
        const extension = new CreatForm({
                language: language,
                formType: formType,
                formStructure: formStructure,
                // Generic approach
                useStructuredData: useStructuredData,
                dataTransformer: dataTransformer,
                // Webhook integration
                webhookEnabled: webhookEnabled,
                webhookUrl: webhookUrl,
                // Voiceflow integration
                voiceflowEnabled: voiceflowEnabled,
                voiceflowDataTransformer: voiceflowDataTransformer,
                // Enhanced logging
                enableDetailedLogging: enableDetailedLogging,
                logPrefix: logPrefix,
                // Session management
                enableSessionTimeout: enableSessionTimeout,
                sessionTimeout: sessionTimeout,
                sessionWarning: sessionWarning,
                // CSS configuration
                cssUrls: cssUrls
            },
            ContactFormExtension.FORM_DATA,
            dynamicFormConfig, // Use dynamic config instead of static FORM_CONFIG
            CONFIG
        );
        return await extension.render(element);
    },
    // ============================================================================
    // FORM DATA CONFIGURATION - Language-agnostic structure with translations
    // ============================================================================
    FORM_DATA: {
        // Language-agnostic dentist data structure
        dentists: {
            'dentist1': {
                services: {
                    'cleaning': {
                        priority: 1,
                        duration: 60
                    },
                    'extraction': {
                        priority: 1,
                        duration: 45
                    },
                    'root_canal': {
                        priority: 2,
                        duration: 90
                    },
                    'tooth_filling': {
                        priority: 1,
                        duration: 60
                    },
                    'composite_filling': {
                        priority: 1,
                        duration: 60
                    },
                    'crown_bridge': {
                        priority: 2,
                        duration: 120
                    },
                    'sealants': {
                        priority: 1,
                        duration: 30
                    },
                    'fluoride': {
                        priority: 1,
                        duration: 30
                    },
                    'emergency': {
                        priority: 1,
                        duration: 45
                    }
                }
            },
            'dentist2': {
                services: {
                    'cleaning': {
                        priority: 2,
                        duration: 60
                    },
                    'invisalign': {
                        priority: 1,
                        duration: 90
                    },
                    'braces': {
                        priority: 1,
                        duration: 90
                    },
                    'retainer': {
                        priority: 1,
                        duration: 45
                    },
                    'smile_makeover': {
                        priority: 1,
                        duration: 120
                    },
                    'emergency': {
                        priority: 2,
                        duration: 45
                    }
                }
            },
            'dentist3': {
                services: {
                    'extraction': {
                        priority: 1,
                        duration: 45
                    },
                    'wisdom_teeth': {
                        priority: 1,
                        duration: 90
                    },
                    'implants': {
                        priority: 1,
                        duration: 180
                    },
                    'full_reconstruction': {
                        priority: 1,
                        duration: 240
                    },
                    'emergency': {
                        priority: 1,
                        duration: 45
                    },
                    'cleaning': {
                        priority: 2,
                        duration: 60
                    }
                }
            },
            'dentist4': {
                services: {
                    'teeth_whitening': {
                        priority: 1,
                        duration: 90
                    },
                    'veneers': {
                        priority: 1,
                        duration: 120
                    },
                    'bonding': {
                        priority: 1,
                        duration: 90
                    },
                    'smile_makeover': {
                        priority: 1,
                        duration: 180
                    },
                    'tooth_filling': {
                        priority: 1,
                        duration: 60
                    },
                    'crown_bridge': {
                        priority: 1,
                        duration: 120
                    },
                    'cleaning': {
                        priority: 2,
                        duration: 60
                    }
                }
            },
            'dentist5': {
                services: {
                    'cleaning': {
                        priority: 1,
                        duration: 45
                    },
                    'tooth_filling': {
                        priority: 1,
                        duration: 45
                    },
                    'sealants': {
                        priority: 1,
                        duration: 30
                    },
                    'fluoride': {
                        priority: 1,
                        duration: 20
                    },
                    'extraction': {
                        priority: 2,
                        duration: 30
                    },
                    'emergency': {
                        priority: 1,
                        duration: 30
                    }
                }
            },
            'dentist6': {
                services: {
                    'dentures': {
                        priority: 1,
                        duration: 120
                    },
                    'crown_bridge': {
                        priority: 1,
                        duration: 120
                    },
                    'implants': {
                        priority: 1,
                        duration: 180
                    },
                    'full_reconstruction': {
                        priority: 1,
                        duration: 240
                    },
                    'cleaning': {
                        priority: 2,
                        duration: 60
                    },
                    'emergency': {
                        priority: 2,
                        duration: 45
                    }
                }
            },
            'dentist7': {
                services: {
                    'root_canal': {
                        priority: 1,
                        duration: 120
                    },
                    'cleaning': {
                        priority: 1,
                        duration: 60
                    },
                    'tooth_filling': {
                        priority: 1,
                        duration: 60
                    },
                    'composite_filling': {
                        priority: 1,
                        duration: 60
                    },
                    'extraction': {
                        priority: 1,
                        duration: 45
                    },
                    'emergency': {
                        priority: 1,
                        duration: 45
                    },
                    'crown_bridge': {
                        priority: 2,
                        duration: 120
                    }
                }
            }
        },
        // All translations including dentist names, descriptions, and service names
        translations: {
            fr: {
                // Service translations
                services: {
                    'cleaning': 'Nettoyages et examens dentaires',
                    'extraction': 'Extractions dentaires',
                    'root_canal': 'Traitement de canal',
                    'tooth_filling': 'Obturations de la couleur des dents',
                    'composite_filling': 'Obturations composites',
                    'crown_bridge': 'Couronnes et ponts dentaires',
                    'sealants': 'Scellants',
                    'fluoride': 'Traitements au fluorure',
                    'emergency': 'Soins dentaires d\'urgence',
                    'invisalign': 'Aligneurs transparents Invisalign',
                    'braces': 'Appareils orthodontiques traditionnels',
                    'retainer': 'Contentions et suivi',
                    'smile_makeover': 'Transformations du sourire',
                    'wisdom_teeth': 'Extraction des dents de sagesse',
                    'implants': 'Implants dentaires',
                    'full_reconstruction': 'Reconstruction buccale complète',
                    'teeth_whitening': 'Blanchiment des dents',
                    'veneers': 'Facettes en porcelaine',
                    'bonding': 'Collage dentaire',
                    'dentures': 'Prothèses dentaires'
                },
                // Dentist translations
                dentists: {
                    'dentist1': {
                        name: 'Dr. Ethan Brown',
                        description: 'Dentiste généraliste avec 15 ans d\'expérience',
                        specialty: 'Dentisterie générale'
                    },
                    'dentist2': {
                        name: 'Dr. Noah Wilson',
                        description: 'Spécialiste en orthodontie et alignement dentaire',
                        specialty: 'Orthodontie'
                    },
                    'dentist3': {
                        name: 'Dr. Sophia Martinez',
                        description: 'Chirurgienne dentaire spécialisée en extractions complexes',
                        specialty: 'Chirurgie dentaire'
                    },
                    'dentist4': {
                        name: 'Dr. Emma Thompson',
                        description: 'Dentiste esthétique spécialisée en cosmétique dentaire',
                        specialty: 'Dentisterie esthétique'
                    },
                    'dentist5': {
                        name: 'Dr. Olivia Davis',
                        description: 'Dentiste pédiatrique spécialisée en soins pour enfants',
                        specialty: 'Dentisterie pédiatrique'
                    },
                    'dentist6': {
                        name: 'Dr. Liam Carter',
                        description: 'Prosthodontiste spécialisé en prothèses et restaurations',
                        specialty: 'Prosthodontie'
                    },
                    'dentist7': {
                        name: 'Dr. Ava Johnson',
                        description: 'Dentiste généraliste avec expertise en endodontie',
                        specialty: 'Dentisterie générale et endodontie'
                    }
                },
                // Other translations (navigation, fields, errors, etc.)
                nav: {
                    next: "Suivant",
                    previous: "Précédent",
                    submit: "Soumettre",
                    processing: "Traitement en cours..."
                },
                common: {
                    yes: "Oui",
                    no: "Non",
                    other: "Autre",
                    required: "requis",
                    fieldRequired: "Ce champ est requis",
                    edit: "Modifier",
                    notSpecified: "Non spécifié",
                    none: "Aucun",
                    pleaseSpecify: "Veuillez préciser...",
                    selectAtLeastOne: "Veuillez sélectionner au moins une option"
                },
                labels: {
                    otherLabel: "Autre",
                    customLabel: "Personnalisé"
                },
                placeholders: {
                    firstName: "Entrez votre prénom",
                    lastName: "Entrez votre nom de famille",
                    email: "Entrez votre adresse email",
                    phone: "Entrez votre numéro de téléphone",
                    message: "Décrivez votre demande, vos symptômes ou vos préoccupations..."
                },
                steps: [
                    {
                        title: "Vos coordonnées",
                        desc: "Renseignez vos informations de contact"
                    },
                    {
                        title: "Service et Dentiste",
                        desc: "Sélectionnez le service souhaité et votre dentiste"
                    },
                    {
                        title: "Message",
                        desc: "Décrivez votre demande ou vos préoccupations"
                    },
                    {
                        title: "Vérifiez vos informations",
                        desc: "Récapitulatif de votre demande"
                    }
                ],
                fields: {
                    firstName: "Prénom",
                    lastName: "Nom de famille",
                    fullName: "Nom complet",
                    email: "Adresse électronique",
                    phone: "Numéro de téléphone",
                    categoryItem: "Service et Dentiste",
                    category: "Service",
                    item: "Dentiste",
                    message: "Message",
                    details: "Détails du message"
                },
                errors: {
                    firstName: "Veuillez saisir votre prénom",
                    lastName: "Veuillez saisir votre nom de famille",
                    email: "Veuillez saisir une adresse e-mail valide",
                    emailInvalid: "Le format de l'adresse e-mail n'est pas valide",
                    phone: "Veuillez saisir un numéro de téléphone valide",
                    phoneInvalid: "Le format du numéro de téléphone n'est pas valide",
                    categoryItem: "Vous devez sélectionner un service et un dentiste",
                    message: "Un message est obligatoire",
                    selectAtLeastOne: "Veuillez sélectionner au moins une option"
                },
                success: {
                    title: "Demande soumise avec succès !",
                    message: "Merci pour votre demande. Notre équipe analysera votre demande et vous contactera prochainement."
                },
                summary: {
                    title: "Récapitulatif de votre demande",
                    description: "Vérifiez les informations saisies avant de soumettre votre demande.",
                    editStep: "Modifier cette étape",
                    noDataProvided: "Aucune donnée fournie pour cette section"
                }
            },
            en: {
                // Service translations
                services: {
                    'cleaning': 'Dental Cleanings and Exams',
                    'extraction': 'Tooth Extractions',
                    'root_canal': 'Root Canal Treatment',
                    'tooth_filling': 'Tooth-Colored Fillings',
                    'composite_filling': 'Composite Fillings',
                    'crown_bridge': 'Dental Crowns and Bridges',
                    'sealants': 'Sealants',
                    'fluoride': 'Fluoride Treatments',
                    'emergency': 'Emergency Dental Care',
                    'invisalign': 'Invisalign Clear Aligners',
                    'braces': 'Traditional Braces',
                    'retainer': 'Retainers and Follow-up',
                    'smile_makeover': 'Smile Makeovers',
                    'wisdom_teeth': 'Wisdom Teeth Removal',
                    'implants': 'Dental Implants',
                    'full_reconstruction': 'Full Mouth Reconstruction',
                    'teeth_whitening': 'Teeth Whitening',
                    'veneers': 'Porcelain Veneers',
                    'bonding': 'Dental Bonding',
                    'dentures': 'Dentures'
                },
                // Dentist translations
                dentists: {
                    'dentist1': {
                        name: 'Dr. Ethan Brown',
                        description: 'General dentist with 15 years of experience',
                        specialty: 'General Dentistry'
                    },
                    'dentist2': {
                        name: 'Dr. Noah Wilson',
                        description: 'Specialist in orthodontics and teeth alignment',
                        specialty: 'Orthodontics'
                    },
                    'dentist3': {
                        name: 'Dr. Sophia Martinez',
                        description: 'Oral surgeon specialized in complex extractions',
                        specialty: 'Oral Surgery'
                    },
                    'dentist4': {
                        name: 'Dr. Emma Thompson',
                        description: 'Cosmetic dentist specialized in aesthetic dentistry',
                        specialty: 'Cosmetic Dentistry'
                    },
                    'dentist5': {
                        name: 'Dr. Olivia Davis',
                        description: 'Pediatric dentist specialized in children\'s dental care',
                        specialty: 'Pediatric Dentistry'
                    },
                    'dentist6': {
                        name: 'Dr. Liam Carter',
                        description: 'Prosthodontist specialized in prosthetics and restorations',
                        specialty: 'Prosthodontics'
                    },
                    'dentist7': {
                        name: 'Dr. Ava Johnson',
                        description: 'General dentist with expertise in endodontics',
                        specialty: 'General Dentistry and Endodontics'
                    }
                },
                // Other translations (navigation, fields, errors, etc.)
                nav: {
                    next: "Next",
                    previous: "Previous",
                    submit: "Submit",
                    processing: "Processing..."
                },
                common: {
                    yes: "Yes",
                    no: "No",
                    other: "Other",
                    required: "required",
                    fieldRequired: "This field is required",
                    edit: "Edit",
                    notSpecified: "Not specified",
                    none: "None",
                    pleaseSpecify: "Please specify...",
                    selectAtLeastOne: "Please select at least one option"
                },
                labels: {
                    otherLabel: "Other",
                    customLabel: "Custom"
                },
                placeholders: {
                    firstName: "Enter your first name",
                    lastName: "Enter your last name",
                    email: "Enter your email address",
                    phone: "Enter your phone number",
                    message: "Describe your request, symptoms or concerns..."
                },
                steps: [
                    {
                        title: "Your Contact Details",
                        desc: "Enter your contact information"
                    },
                    {
                        title: "Service & Dentist",
                        desc: "Select your desired service and dentist"
                    },
                    {
                        title: "Message",
                        desc: "Describe your request or concerns"
                    },
                    {
                        title: "Review Your Information",
                        desc: "Summary of your request"
                    }
                ],
                fields: {
                    firstName: "First Name",
                    lastName: "Last Name",
                    fullName: "Full Name",
                    email: "Email Address",
                    phone: "Phone Number",
                    categoryItem: "Service & Dentist",
                    category: "Service",
                    item: "Dentist",
                    message: "Message",
                    details: "Message Details"
                },
                errors: {
                    firstName: "Please enter your first name",
                    lastName: "Please enter your last name",
                    email: "Please enter a valid email address",
                    emailInvalid: "Email format is not valid",
                    phone: "Please enter a valid phone number",
                    phoneInvalid: "Phone number format is not valid",
                    categoryItem: "You must select a service and dentist",
                    message: "A message is required",
                    selectAtLeastOne: "Please select at least one option"
                },
                success: {
                    title: "Request Submitted Successfully!",
                    message: "Thank you for your request. Our team will review your request and contact you shortly."
                },
                summary: {
                    title: "Request Summary",
                    description: "Please review the information provided before submitting your request.",
                    editStep: "Edit this step",
                    noDataProvided: "No data provided for this section"
                }
            }
        }
    }
};
// ============================================================================
// SETUP AND INITIALIZATION
// ============================================================================
window.BookingSDExtension = BookingSDExtension;
window.BookingDExtension = BookingDExtension;
window.BookingDirectExtension = BookingDirectExtension;
window.BookingInformationExtension = BookingInformationExtension;
window.CalendarExtension = CalendarExtension;
window.RescheduleCalendarExtension = RescheduleCalendarExtension;
window.CancellationDirectExtension = CancellationDirectExtension;
window.ContactFormExtension = ContactFormExtension;
