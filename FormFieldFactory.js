/**
 * Enhanced Core Form System with Modern Architecture
 * Integrates dependency injection, event-driven architecture, and advanced state management
 */

// ===================================================================
// ENHANCED SERVICE CONTAINER & EVENT BUS (from modern architecture)
// ===================================================================

class ServiceContainer {
    constructor() {
        this.services = new Map();
        this.factories = new Map();
        this.singletons = new Map();
        this.isBuilding = new Set();
    }

    register(name, factory, options = {}) {
        const config = {
            singleton: true,
            dependencies: [],
            ...options
        };
        this.factories.set(name, { factory, config });
        return this;
    }

    instance(name, instance) {
        this.singletons.set(name, instance);
        return this;
    }

    get(name) {
        if (this.singletons.has(name)) {
            return this.singletons.get(name);
        }

        if (!this.factories.has(name)) {
            throw new Error(`Service '${name}' not found`);
        }

        if (this.isBuilding.has(name)) {
            throw new Error(`Circular dependency detected for service '${name}'`);
        }

        const { factory, config } = this.factories.get(name);

        if (config.singleton && this.services.has(name)) {
            return this.services.get(name);
        }

        this.isBuilding.add(name);

        try {
            const dependencies = this.resolveDependencies(config.dependencies);
            const instance = factory.call(null, ...dependencies, this);
            this.isBuilding.delete(name);

            if (config.singleton) {
                this.services.set(name, instance);
            }

            return instance;
        } catch (error) {
            this.isBuilding.delete(name);
            throw new Error(`Failed to create service '${name}': ${error.message}`);
        }
    }

    resolveDependencies(dependencies) {
        return dependencies.map(dep => this.get(dep));
    }

    has(name) {
        return this.factories.has(name) || this.singletons.has(name);
    }

    clear() {
        this.services.clear();
        this.factories.clear();
        this.singletons.clear();
        this.isBuilding.clear();
    }
}

class EventBus {
    constructor() {
        this.events = new Map();
        this.globalListeners = new Set();
        this.isDebugMode = false;
    }

    on(event, handler, options = {}) {
        if (typeof handler !== 'function') {
            throw new Error('Event handler must be a function');
        }

        const config = {
            priority: 0,
            context: null,
            ...options
        };

        if (!this.events.has(event)) {
            this.events.set(event, []);
        }

        const subscription = {
            handler,
            config,
            id: this.generateId()
        };

        const handlers = this.events.get(event);
        handlers.push(subscription);
        handlers.sort((a, b) => b.config.priority - a.config.priority);

        return () => this.off(event, subscription.id);
    }

    once(event, handler) {
        const unsubscribe = this.on(event, (...args) => {
            unsubscribe();
            handler(...args);
        });
        return unsubscribe;
    }

    off(event, subscriptionId) {
        if (!this.events.has(event)) return;

        const handlers = this.events.get(event);
        const index = handlers.findIndex(sub => sub.id === subscriptionId);
        
        if (index !== -1) {
            handlers.splice(index, 1);
        }

        if (handlers.length === 0) {
            this.events.delete(event);
        }
    }

    async emit(event, data = null, options = {}) {
        const config = {
            async: false,
            stopOnError: false,
            ...options
        };

        this.globalListeners.forEach(listener => {
            try {
                listener(event, data);
            } catch (error) {
                console.error('Error in global event listener:', error);
            }
        });

        if (!this.events.has(event)) {
            return [];
        }

        const handlers = this.events.get(event);
        const results = [];

        if (config.async) {
            const promises = handlers.map(async (subscription) => {
                try {
                    return await Promise.resolve(
                        subscription.handler.call(subscription.config.context, data, event)
                    );
                } catch (error) {
                    if (config.stopOnError) throw error;
                    console.error(`Error in event handler for '${event}':`, error);
                    return null;
                }
            });
            results.push(...await Promise.all(promises));
        } else {
            for (const subscription of handlers) {
                try {
                    const result = subscription.handler.call(
                        subscription.config.context, 
                        data, 
                        event
                    );
                    results.push(result);
                } catch (error) {
                    if (config.stopOnError) throw error;
                    console.error(`Error in event handler for '${event}':`, error);
                    results.push(null);
                }
            }
        }

        return results;
    }

    addGlobalListener(listener) {
        this.globalListeners.add(listener);
        return () => this.globalListeners.delete(listener);
    }

    clear() {
        this.events.clear();
        this.globalListeners.clear();
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

// ===================================================================
// ENHANCED VALIDATION ENGINE
// ===================================================================

class ValidationEngine {
    constructor() {
        this.validators = new Map();
        this.cache = new Map();
        this.cacheTimeout = 5000;
        this.registerBuiltInValidators();
    }

    registerBuiltInValidators() {
        this.validators.set('required', new RequiredValidator());
        this.validators.set('email', new EmailValidator());
        this.validators.set('url', new UrlValidator());
        this.validators.set('minLength', new MinLengthValidator());
        this.validators.set('maxLength', new MaxLengthValidator());
        this.validators.set('pattern', new PatternValidator());
        this.validators.set('custom', new CustomValidator());
    }

    async validate(value, rules = {}, context = {}) {
        const cacheKey = this.createCacheKey(value, rules, context);
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.result;
            }
            this.cache.delete(cacheKey);
        }

        const errors = [];
        const warnings = [];
        const validationPromises = [];

        for (const [ruleName, ruleValue] of Object.entries(rules)) {
            if (ruleValue === false || ruleValue === null || ruleValue === undefined) {
                continue;
            }

            const validator = this.validators.get(ruleName);
            if (!validator) {
                console.warn(`Unknown validation rule: ${ruleName}`);
                continue;
            }

            const promise = this.runValidator(validator, value, ruleValue, context)
                .then(result => ({ ruleName, result }))
                .catch(error => ({ 
                    ruleName, 
                    result: { 
                        isValid: false, 
                        errors: [`Validation error in ${ruleName}: ${error.message}`] 
                    } 
                }));

            validationPromises.push(promise);
        }

        const results = await Promise.all(validationPromises);

        results.forEach(({ ruleName, result }) => {
            if (!result.isValid) {
                errors.push(...(result.errors || []));
            }
            if (result.warnings) {
                warnings.push(...result.warnings);
            }
        });

        const finalResult = {
            isValid: errors.length === 0,
            errors,
            warnings,
            timestamp: Date.now()
        };

        this.cache.set(cacheKey, {
            result: finalResult,
            timestamp: Date.now()
        });

        return finalResult;
    }

    async runValidator(validator, value, ruleValue, context) {
        try {
            return await validator.validate(value, ruleValue, context);
        } catch (error) {
            return {
                isValid: false,
                errors: [error.message]
            };
        }
    }

    createCacheKey(value, rules, context) {
        return JSON.stringify({ value, rules, context });
    }

    clearCache() {
        this.cache.clear();
    }
}

class BaseValidator {
    async validate(value, rule, context = {}) {
        throw new Error('validate method must be implemented');
    }

    isEmpty(value) {
        return value === null || value === undefined || value === '' ||
               (Array.isArray(value) && value.length === 0) ||
               (typeof value === 'object' && Object.keys(value).length === 0);
    }
}

class RequiredValidator extends BaseValidator {
    async validate(value, rule, context = {}) {
        if (!rule) {
            return { isValid: true, errors: [] };
        }

        const isEmpty = this.isEmpty(value);
        return {
            isValid: !isEmpty,
            errors: isEmpty ? ['This field is required'] : []
        };
    }
}

class EmailValidator extends BaseValidator {
    async validate(value, rule, context = {}) {
        if (!rule || this.isEmpty(value)) {
            return { isValid: true, errors: [] };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);

        return {
            isValid,
            errors: isValid ? [] : ['Please enter a valid email address']
        };
    }
}

class UrlValidator extends BaseValidator {
    async validate(value, rule, context = {}) {
        if (!rule || this.isEmpty(value)) {
            return { isValid: true, errors: [] };
        }

        try {
            new URL(value);
            return { isValid: true, errors: [] };
        } catch {
            return { isValid: false, errors: ['Please enter a valid URL'] };
        }
    }
}

class MinLengthValidator extends BaseValidator {
    async validate(value, rule, context = {}) {
        if (this.isEmpty(value)) {
            return { isValid: true, errors: [] };
        }

        const length = typeof value === 'string' ? value.length : 0;
        const isValid = length >= rule;

        return {
            isValid,
            errors: isValid ? [] : [`Minimum length is ${rule} characters`]
        };
    }
}

class MaxLengthValidator extends BaseValidator {
    async validate(value, rule, context = {}) {
        if (this.isEmpty(value)) {
            return { isValid: true, errors: [] };
        }

        const length = typeof value === 'string' ? value.length : 0;
        const isValid = length <= rule;

        return {
            isValid,
            errors: isValid ? [] : [`Maximum length is ${rule} characters`]
        };
    }
}

class PatternValidator extends BaseValidator {
    async validate(value, rule, context = {}) {
        if (this.isEmpty(value)) {
            return { isValid: true, errors: [] };
        }

        const regex = rule instanceof RegExp ? rule : new RegExp(rule);
        const isValid = regex.test(value);

        return {
            isValid,
            errors: isValid ? [] : ['Value does not match required pattern']
        };
    }
}

class CustomValidator extends BaseValidator {
    async validate(value, rule, context = {}) {
        if (typeof rule !== 'function') {
            throw new Error('Custom validation rule must be a function');
        }

        try {
            const result = await rule(value, context);
            
            if (typeof result === 'boolean') {
                return { isValid: result, errors: result ? [] : ['Validation failed'] };
            }
            
            if (typeof result === 'string') {
                return { isValid: false, errors: [result] };
            }
            
            if (typeof result === 'object') {
                return {
                    isValid: result.isValid !== false,
                    errors: result.errors || [],
                    warnings: result.warnings || []
                };
            }
            
            return { isValid: true, errors: [] };
        } catch (error) {
            return { isValid: false, errors: [error.message] };
        }
    }
}

// ===================================================================
// ENHANCED STATE MANAGER
// ===================================================================

class StateManager {
    constructor(container) {
        this.container = container;
        this.eventBus = container.get('eventBus');
        
        this.state = {
            fields: {},
            formData: {},
            validation: {},
            ui: {
                currentStep: 0,
                isSubmitting: false,
                isLoading: false,
                focusedField: null
            },
            meta: {
                isDirty: false,
                lastSaved: null,
                version: 1
            }
        };
        
        this.history = [];
        this.historyIndex = -1;
        this.maxHistorySize = 50;
        this.subscribers = new Set();
        
        this.setupStateManagement();
    }

    setupStateManagement() {
        this.eventBus.on('field:valueChange', (data) => {
            this.dispatch({
                type: 'FIELD_VALUE_CHANGED',
                payload: {
                    fieldId: data.fieldId,
                    value: data.value,
                    timestamp: Date.now()
                }
            });
        });

        this.eventBus.on('field:validationComplete', (data) => {
            this.dispatch({
                type: 'FIELD_VALIDATION_UPDATED',
                payload: {
                    fieldId: data.fieldId,
                    result: data.result,
                    timestamp: Date.now()
                }
            });
        });
    }

    dispatch(action) {
        const newState = this.reducer(this.state, action);
        
        if (newState !== this.state) {
            this.updateState(newState, action);
        }
    }

    reducer(state, action) {
        switch (action.type) {
            case 'FIELD_VALUE_CHANGED':
                return {
                    ...state,
                    formData: {
                        ...state.formData,
                        [action.payload.fieldId]: action.payload.value
                    },
                    fields: {
                        ...state.fields,
                        [action.payload.fieldId]: {
                            ...state.fields[action.payload.fieldId],
                            value: action.payload.value,
                            isDirty: true,
                            lastChanged: action.payload.timestamp
                        }
                    },
                    meta: {
                        ...state.meta,
                        isDirty: true,
                        version: state.meta.version + 1
                    }
                };

            case 'FIELD_VALIDATION_UPDATED':
                return {
                    ...state,
                    validation: {
                        ...state.validation,
                        [action.payload.fieldId]: action.payload.result
                    },
                    fields: {
                        ...state.fields,
                        [action.payload.fieldId]: {
                            ...state.fields[action.payload.fieldId],
                            isValid: action.payload.result.isValid,
                            errors: action.payload.result.errors
                        }
                    }
                };

            case 'FORM_RESET':
                return {
                    fields: {},
                    formData: {},
                    validation: {},
                    ui: {
                        currentStep: 0,
                        isSubmitting: false,
                        isLoading: false,
                        focusedField: null
                    },
                    meta: {
                        isDirty: false,
                        lastSaved: null,
                        version: 1
                    }
                };

            default:
                return state;
        }
    }

    updateState(newState, action) {
        const previousState = this.state;
        this.state = newState;

        this.addToHistory(previousState, action);
        this.notifySubscribers(newState, previousState, action);

        this.eventBus.emit('state:changed', {
            state: newState,
            previousState,
            action
        });
    }

    addToHistory(state, action) {
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }

        this.history.push({
            state: JSON.parse(JSON.stringify(state)),
            action,
            timestamp: Date.now()
        });

        if (this.history.length > this.maxHistorySize) {
            this.history.shift();
        } else {
            this.historyIndex++;
        }
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    notifySubscribers(newState, previousState, action) {
        this.subscribers.forEach(callback => {
            try {
                callback(newState, previousState, action);
            } catch (error) {
                console.error('Error in state subscriber:', error);
            }
        });
    }

    getState() {
        return this.state;
    }

    getFieldValue(fieldId) {
        return this.state.formData[fieldId];
    }

    isFormValid() {
        return Object.values(this.state.validation).every(
            result => result?.isValid !== false
        );
    }
}

// ===================================================================
// ENHANCED RENDERER SERVICE
// ===================================================================

class RendererService {
    constructor(container) {
        this.container = container;
        this.eventBus = container.get('eventBus');
        this.templates = new Map();
        this.themes = new Map();
        this.cache = new Map();
        this.currentTheme = 'default';
        
        this.setupTemplates();
        this.setupThemes();
    }

    setupTemplates() {
        this.templates.set('text', {
            template: `
                <div class="form-group {{containerClasses}}">
                    {{#if label}}<div class="label-container">
                        <label class="form-label {{labelClasses}}" for="{{id}}">
                            {{label}}{{#if required}}<span class="required-indicator"></span>{{/if}}
                        </label>
                    </div>{{/if}}
                    <input type="{{inputType}}" 
                           id="{{id}}" 
                           name="{{name}}"
                           class="form-input {{inputClasses}}"
                           placeholder="{{placeholder}}"
                           {{#if required}}required{{/if}}
                           value="{{value}}" />
                    <div class="error-message" id="error-{{id}}">
                        <div class="error-icon">!</div>
                        <span class="error-text"></span>
                    </div>
                </div>
            `,
            inputType: 'text'
        });
    }

    setupThemes() {
        this.themes.set('default', {
            colors: {
                primary: '#007bff',
                secondary: '#6c757d',
                success: '#28a745',
                error: '#dc3545',
                background: '#ffffff',
                border: '#dee2e6'
            }
        });
    }

    render(state, config, field) {
        const template = this.getTemplate(config.type);
        if (!template) {
            throw new Error(`No template found for field type: ${config.type}`);
        }

        const context = this.createRenderContext(state, config, field);
        const html = this.processTemplate(template.template, context);
        const element = this.createElement(html);
        
        this.applyTheme(element, context);
        
        return element;
    }

    getTemplate(type) {
        if (this.templates.has(type)) {
            return this.templates.get(type);
        }
        return this.templates.get('text');
    }

    createRenderContext(state, config, field) {
        return {
            id: config.id,
            name: config.name,
            type: config.type,
            value: state.value || '',
            label: config.label,
            placeholder: config.placeholder,
            required: config.required,
            containerClasses: this.getContainerClasses(state, config),
            labelClasses: this.getLabelClasses(state, config),
            inputClasses: this.getInputClasses(state, config)
        };
    }

    getContainerClasses(state, config) {
        const classes = ['field'];
        if (config.required) classes.push('field-required');
        if (state.isDirty) classes.push('field-dirty');
        if (!state.isValid) classes.push('field-invalid');
        return classes.join(' ');
    }

    getLabelClasses(state, config) {
        const classes = ['label'];
        if (config.required) classes.push('label-required');
        return classes.join(' ');
    }

    getInputClasses(state, config) {
        const classes = ['input'];
        if (!state.isValid) classes.push('input-error');
        return classes.join(' ');
    }

    processTemplate(template, context) {
        return template.replace(/\{\{([^}]+)\}\}/g, (match, expression) => {
            return this.evaluateExpression(expression.trim(), context);
        });
    }

    evaluateExpression(expression, context) {
        if (expression.startsWith('#if ')) {
            return this.handleIfHelper(expression, context);
        }
        
        const value = this.getValue(expression, context);
        return this.escapeHtml(value);
    }

    handleIfHelper(expression, context) {
        const condition = expression.slice(4);
        const value = this.getValue(condition, context);
        return value ? '' : '<!-- conditional block -->';
    }

    getValue(path, context) {
        return path.split('.').reduce((obj, key) => obj && obj[key], context);
    }

    escapeHtml(value) {
        if (value == null) return '';
        
        const string = String(value);
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        };
        
        return string.replace(/[&<>"']/g, char => map[char]);
    }

    createElement(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstChild;
    }

    applyTheme(element, context) {
        element.classList.add(`theme-${this.currentTheme}`);
    }

    setTheme(themeName) {
        this.currentTheme = themeName;
        this.cache.clear();
    }
}

// ===================================================================
// ENHANCED FORMATTER SERVICE
// ===================================================================

class FormatterService {
    constructor(container) {
        this.container = container;
        this.formatters = new Map();
        this.cache = new Map();
        
        this.registerBuiltInFormatters();
    }

    registerBuiltInFormatters() {
        this.formatters.set('text', new TextFormatter());
        this.formatters.set('number', new NumberFormatter());
        this.formatters.set('email', new EmailFormatter());
        this.formatters.set('phone', new PhoneFormatter());
    }

    format(value, config = {}) {
        if (value == null) {
            return config.nullValue || '';
        }

        const type = config.type || this.inferType(value);
        const formatter = this.formatters.get(type);
        
        if (!formatter) {
            return String(value);
        }

        const cacheKey = this.createCacheKey(value, config, type);
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const result = formatter.format(value, config);
            this.cache.set(cacheKey, result);
            return result;
        } catch (error) {
            console.error('Formatting error:', error);
            return String(value);
        }
    }

    inferType(value) {
        if (typeof value === 'number') return 'number';
        if (typeof value === 'string' && this.isEmail(value)) return 'email';
        if (typeof value === 'string' && this.isPhone(value)) return 'phone';
        return 'text';
    }

    isEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    isPhone(value) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''));
    }

    createCacheKey(value, config, type) {
        return JSON.stringify({ value, config, type });
    }
}

class BaseFormatter {
    format(value, config = {}) {
        throw new Error('format method must be implemented');
    }
}

class TextFormatter extends BaseFormatter {
    format(value, config = {}) {
        let result = String(value);
        
        if (config.uppercase) result = result.toUpperCase();
        if (config.lowercase) result = result.toLowerCase();
        if (config.truncate) result = this.truncate(result, config.truncate);
        
        return result;
    }

    truncate(text, length) {
        return text.length > length ? text.substring(0, length) + '...' : text;
    }
}

class NumberFormatter extends BaseFormatter {
    format(value, config = {}) {
        const num = Number(value);
        if (isNaN(num)) return String(value);

        return new Intl.NumberFormat(config.locale, {
            minimumFractionDigits: config.minimumFractionDigits,
            maximumFractionDigits: config.maximumFractionDigits,
            useGrouping: config.useGrouping !== false
        }).format(num);
    }
}

class EmailFormatter extends BaseFormatter {
    format(value, config = {}) {
        return String(value).toLowerCase();
    }
}

class PhoneFormatter extends BaseFormatter {
    format(value, config = {}) {
        const phone = String(value).replace(/\D/g, '');
        
        if (phone.length === 10) {
            return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
        }
        
        return value;
    }
}

// ===================================================================
// SVG ICONS REGISTRY (Centralized)
// ===================================================================

class SVGIcons {
    static icons = {
        CHECK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="12px" height="12px">
            <path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
        </svg>`,
        
        CHEVRON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
            <g transform="translate(75, 75)">
                <path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
            </g>
        </svg>`,
        
        INFO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
            <path class="info-bg" fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
            <path class="info-icon" fill="currentColor" d="M216 336l24 0 0-64-24 0 c-13.3 0-24-10.7-24-24s10.7-24 24-24 l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24 l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208 a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
        </svg>`,
        
        CLOSE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="8px" height="8px">
            <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>`,
        
        PLUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 400" width="15px" height="15px"> 
            <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
        </svg>`,
        
        MINUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 400" width="15px" height="15px"> 
            <path fill="currentColor" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
        </svg>`,
        
        CALCULATOR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24px" height="24px">
            <path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L64 0zM96 64l192 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32L96 160c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32zm32 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM64 416c0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32zM192 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM288 448a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/>
        </svg>`,
        
        CALENDAR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24px" height="24px">
            <path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48H0l0-48c0-26.5 21.5-48 48-48l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
        </svg>`,
        
        RESCHEDULE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24px" height="24px">
            <path fill="currentColor" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-17.6-17.5H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-2.2 0-4.2 .5-6.1 1.3z"/>
        </svg>`,
        
        APPOINTMENT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24px" height="24px">
            <path fill="currentColor" d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6 263.6 506.2c-9 7.7-22.3 7.7-31.2 0L192 471.6 151.6 506.2c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 208c0-8.8 7.2-16 16-16H288c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16zM96 304c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z"/>
        </svg>`,
        
        SERVICE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24px" height="24px">
            <path fill="currentColor" d="M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1V192c0 53 43 96 96 96s96-43 96-96V71.1l-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2L309.5 18c7.9 2.6 13.3 9.7 13.9 18.3s-4.6 16.6-12.1 20.2L288 71.1V192c0 70.7-57.3 128-128 128s-128-57.3-128-128V71.1L8.7 56.5C-2.9 53-9.2 40.8-5.7 29.1S18.4.7 30.1 4.2L57.4 12.8C65.3 15.4 70.7 22.5 71.3 31.1s-4.6 16.6-12.1 20.2L32 71.1V192c0 70.7 57.3 128 128 128v64c0 17.7-14.3 32-32 32H96c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192c-17.7 0-32-14.3-32-32V320c70.7 0 128-57.3 128-128V71.1l-26.1 8.7c-7.5 2.5-11.7 10.5-11.1 18.9.6 8.4 6 15.9 13.9 18.5l27.3 9.1c11.7 3.9 18 16.7 14.1 28.4s-16.7 18-28.4 14.1L250.5 160c-7.9-2.6-13.3-9.7-13.9-18.3s4.6-16.6 12.1-20.2L288 96V71.1l-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2L309.5 18c7.9 2.6 13.3 9.7 13.9 18.3s-4.6 16.6-12.1 20.2L288 71.1"/>
        </svg>`
    };

    static get(iconName) {
        return this.icons[iconName] || '';
    }

    static getAll() {
        return { ...this.icons };
    }
}

// ===================================================================
// ENHANCED CREAT FORM CLASS
// ===================================================================

class CreatForm {
    constructor(config = {}, formData = {}, formConfig = {}, defaultConfig = {}) {
        this.config = {
            language: config.language || "fr",
            webhookUrl: config.webhookUrl || defaultConfig.DEFAULT_WEBHOOK,
            webhookEnabled: config.webhookEnabled !== false,
            voiceflowEnabled: config.voiceflowEnabled !== false,
            cssUrls: config.cssUrls || defaultConfig.DEFAULT_CSS,
            enableSessionTimeout: config.enableSessionTimeout !== false,
            sessionTimeout: config.sessionTimeout || defaultConfig.SESSION_TIMEOUT,
            sessionWarning: config.sessionWarning || defaultConfig.SESSION_WARNING,
            debounceDelay: config.debounceDelay || defaultConfig.DEBOUNCE_DELAY,
            formType: config.formType || "submission",
            formStructure: config.formStructure || "auto",
            submitButtonText: config.submitButtonText || null,
            showSubmitButton: config.showSubmitButton !== false,
            apiKey: config.apiKey || "",
            timezone: config.timezone || "America/Toronto",
            useStructuredData: config.useStructuredData !== false,
            dataTransformer: config.dataTransformer || null,
            voiceflowDataTransformer: config.voiceflowDataTransformer || null,
            enableDetailedLogging: config.enableDetailedLogging !== false,
            logPrefix: config.logPrefix || "📋 CreatForm",
            onSubmit: config.onSubmit || null,
            theme: config.theme || 'default',
            ...config
        };

        this.formData = formData;
        this.formConfig = formConfig;
        this.defaultConfig = defaultConfig;
        
        this.state = {
            cssLoaded: false,
            initialized: false,
            formSubmitted: false,
            sessionExpired: false,
            currentStep: 0,
            isSingleStep: false
        };

        this.elements = new Map();
        this.formValues = {};
        this.sessionTimer = null;
        this.warningTimer = null;
        this.cssCache = new Map();
        this.combinedCSS = null;
        this.isBookingForm = this.config.formType === "booking";

        // Initialize services with dependency injection
        this.initializeServices();
        this.determineFormStructure();
    }

    initializeServices() {
        this.serviceContainer = new ServiceContainer();
        
        // Register core services
        this.serviceContainer
            .register('eventBus', () => new EventBus())
            .register('config', () => this.config)
            .register('formData', () => this.formData)
            .register('formConfig', () => this.formConfig)
            .register('validator', (eventBus) => new ValidationEngine())
            .register('formatter', (eventBus) => new FormatterService(this.serviceContainer))
            .register('renderer', (eventBus, formatter) => new RendererService(this.serviceContainer))
            .register('stateManager', (eventBus) => new StateManager(this.serviceContainer));

        // Get core services
        this.eventBus = this.serviceContainer.get('eventBus');
        this.stateManager = this.serviceContainer.get('stateManager');
        this.validator = this.serviceContainer.get('validator');
        this.formatter = this.serviceContainer.get('formatter');
        this.renderer = this.serviceContainer.get('renderer');

        this.initializeLogging();
        this.initializeDataProcessor();
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.eventBus.on('form:submit', this.handleSubmission.bind(this));
        this.eventBus.on('form:reset', this.handleReset.bind(this));
        this.eventBus.on('field:valueChange', this.handleFieldChange.bind(this));
        this.eventBus.on('session:timeout', this.handleSessionTimeout.bind(this));
        this.eventBus.on('session:warning', this.handleSessionWarning.bind(this));
    }

    initializeDataProcessor() {
        this.logger.info('🔧 Initializing data processor...');
        
        this.dataProcessor = new FormDataProcessor(this);
        this.fieldFormatter = new FieldValueFormatter(this);
        
        if (this.config.dataTransformer) {
            if (typeof this.config.dataTransformer === 'function') {
                this.dataTransformerInstance = new this.config.dataTransformer(this);
                this.logger.info('✅ Custom data transformer class instantiated:', this.config.dataTransformer.name);
            } else if (typeof this.config.dataTransformer === 'object') {
                this.dataTransformerInstance = this.config.dataTransformer;
                this.dataTransformerInstance.creatFormInstance = this;
                this.logger.info('✅ Custom data transformer instance configured');
            }
        } else {
            this.dataTransformerInstance = new BaseDataTransformer(this);
            this.logger.info('✅ Default BaseDataTransformer initialized');
        }
    }

    initializeLogging() {
        this.logger = {
            info: (message, data = null) => {
                if (this.config.enableDetailedLogging) {
                    console.log(`${this.config.logPrefix} ℹ️`, message, data || '');
                }
            },
            success: (message, data = null) => {
                if (this.config.enableDetailedLogging) {
                    console.log(`${this.config.logPrefix} ✅`, message, data || '');
                }
            },
            warning: (message, data = null) => {
                if (this.config.enableDetailedLogging) {
                    console.warn(`${this.config.logPrefix} ⚠️`, message, data || '');
                }
            },
            error: (message, data = null) => {
                console.error(`${this.config.logPrefix} ❌`, message, data || '');
            },
            webhook: (message, data = null) => {
                if (this.config.enableDetailedLogging) {
                    console.group(`${this.config.logPrefix} 🔗 WEBHOOK`);
                    console.log(message);
                    if (data) console.log('📤 Webhook Data:', JSON.stringify(data, null, 2));
                    console.groupEnd();
                }
            },
            voiceflow: (message, data = null) => {
                if (this.config.enableDetailedLogging) {
                    console.group(`${this.config.logPrefix} 🤖 VOICEFLOW`);
                    console.log(message);
                    if (data) console.log('📤 Voiceflow Data:', JSON.stringify(data, null, 2));
                    console.groupEnd();
                }
            },
            transformation: (originalData, transformedData) => {
                if (this.config.enableDetailedLogging) {
                    console.group(`${this.config.logPrefix} 🔄 DATA TRANSFORMATION`);
                    console.log('📥 Original Form Data:', JSON.stringify(originalData, null, 2));
                    console.log('📤 Transformed Data:', JSON.stringify(transformedData, null, 2));
                    console.groupEnd();
                }
            }
        };

        this.logger.info('CreatForm initialized', {
            formType: this.config.formType,
            structure: this.state.isSingleStep ? 'single-step' : 'multi-step',
            webhookEnabled: this.config.webhookEnabled,
            voiceflowEnabled: this.config.voiceflowEnabled,
            useStructuredData: this.config.useStructuredData
        });
    }

    getText(path) {
        return this.getNestedValue(this.formData.translations[this.config.language], path) || path;
    }

    getData(path) {
        const data = this.getNestedValue(this.formData.options, path) || [];
        return Array.isArray(data) ? data.map(item => ({
            ...item,
            name: typeof item.name === 'object' ? item.name[this.config.language] || item.name.en : item.name
        })) : data;
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((curr, key) => curr?.[key], obj);
    }

    getErrorMessage(fieldId, errorType = 'required') {
        return this.getText(`errors.${fieldId}${errorType !== 'required' ? '_' + errorType : ''}`) ||
            this.getText(`errors.${errorType}`) ||
            this.getText('common.fieldRequired');
    }

    formatValue(fieldConfig, value) {
        return this.fieldFormatter.formatValue(fieldConfig || {}, value);
    }

    formatValueForDisplay(fieldId, value, fieldConfig = null) {
        const formattedValue = this.fieldFormatter.formatValue(fieldConfig || {}, value);
        if (!formattedValue || formattedValue === '') {
            return this.getText('common.notSpecified') || 'Non spécifié';
        }
        return formattedValue;
    }

    prepareDataForSubmission(originalFormValues) {
        this.logger.info('🔧 Preparing data for submission using FormDataProcessor...', originalFormValues);
        try {
            const transformedData = this.dataTransformerInstance.transform(originalFormValues);
            
            const submissionData = {
                ...transformedData,
                userAgent: navigator.userAgent,
                submissionUrl: window.location.href,
                submissionTimestamp: new Date().toISOString()
            };

            this.logger.transformation(originalFormValues, submissionData);
            return submissionData;
        } catch (error) {
            this.logger.error('❌ Data transformation failed:', error);
            return {
                submissionType: this.config.formType === "booking" ? "booking_form" : "submission_form",
                formVersion: this.defaultConfig.FORM_VERSION || '1.0.0',
                submissionTimestamp: new Date().toISOString(),
                language: this.config.language,
                userAgent: navigator.userAgent,
                rawFormData: originalFormValues,
                transformationError: error.message
            };
        }
    }

    createFields(fieldsConfig) {
        return fieldsConfig.map(fieldConfig => {
            const field = {
                ...fieldConfig,
                name: fieldConfig.id,
                label: this.getText(`fields.${fieldConfig.id}`),
                placeholder: fieldConfig.placeholder || this.getText(`fields.${fieldConfig.id}`) + '...',
                customErrorMessage: this.getErrorMessage(fieldConfig.id)
            };

            if (fieldConfig.options) {
                if (typeof fieldConfig.options === 'string') {
                    field.options = this.getData(fieldConfig.options);
                    if (fieldConfig.type === 'serviceCard') {
                        field.services = this.getData(fieldConfig.options);
                    }
                } else {
                    field.options = fieldConfig.options.map(opt => ({
                        ...opt,
                        name: typeof opt.name === 'object' ? opt.name[this.config.language] : opt.name
                    }));
                }
            }

            if (fieldConfig.customOptions) {
                field.customOptions = fieldConfig.customOptions.map(opt => ({
                    ...opt,
                    label: typeof opt.label === 'object' ? opt.label[this.config.language] || opt.label.en : opt.label
                }));
            }

            if (fieldConfig.yesFields) field.yesFields = this.createFields(fieldConfig.yesFields);
            if (fieldConfig.yesField) field.yesField = this.createFields([fieldConfig.yesField])[0];
            if (fieldConfig.noField) field.noField = this.createFields([fieldConfig.noField])[0];

            if (fieldConfig.type === 'calendar' && this.isBookingForm) {
                field.apiKey = this.config.apiKey;
                field.timezone = this.config.timezone;
                field.language = this.config.language;
                field.eventTypeId = null;
                field.eventTypeSlug = null;
                field.scheduleId = null;
                field.eventName = "Appointment";
                field.serviceProvider = "";
            }

            return field;
        });
    }

    handleSubmission = async (formData) => {
        this.logger.info('🚀 Starting enhanced submission process...');
        
        // Emit submission start event
        this.eventBus.emit('form:submitStart', { formData });

        const submitButton = this.getSubmitButton();
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = this.getText('nav.processing');
        }

        try {
            let submissionData;
            let shouldSendToWebhook = false;

            if (typeof this.config.onSubmit === 'function') {
                this.logger.info('🔧 Calling custom onSubmit handler...');
                try {
                    submissionData = await this.config.onSubmit(formData);
                    this.logger.success('✅ Custom onSubmit handler completed successfully');
                    shouldSendToWebhook = false;
                } catch (customError) {
                    this.logger.error('❌ Custom onSubmit handler failed:', customError);
                    throw customError;
                }
            } else if (this.isBookingForm) {
                this.logger.info('Processing booking form submission...');
                const calendarField = this.getCalendarFieldInstance();
                if (!calendarField) {
                    throw new Error('Calendar field not found');
                }

                const bookingResponse = await calendarField.createBooking(
                    formData.appointment.selectedTime,
                    `${formData.firstName} ${formData.lastName}`,
                    formData.email
                );

                if (!bookingResponse) {
                    throw new Error('Booking creation failed');
                }

                submissionData = this.prepareBookingDataForSubmission(formData, bookingResponse);
                shouldSendToWebhook = this.config.webhookEnabled && this.config.webhookUrl;
            } else {
                this.logger.info('Processing regular form submission...');
                submissionData = this.prepareDataForSubmission(formData);
                shouldSendToWebhook = this.config.webhookEnabled && this.config.webhookUrl;
            }

            if (shouldSendToWebhook) {
                await this.sendToWebhook(submissionData);
            }

            this.clearSessionTimers();
            this.state.formSubmitted = true;
            
            // Emit submission success event
            this.eventBus.emit('form:submitSuccess', { submissionData, originalData: formData });
            
            this.showSuccessScreen();

            if (this.config.voiceflowEnabled) {
                await this.sendToVoiceflow(submissionData, formData);
            }

            this.logger.success('🎉 Enhanced submission completed successfully!');
            return submissionData;

        } catch (error) {
            this.logger.error('Enhanced submission failed:', error);
            
            // Emit submission error event
            this.eventBus.emit('form:submitError', { error, formData });
            
            if (submitButton) {
                const errorMessage = this.isBookingForm ?
                    (this.getText('errors.bookingError') || 'Booking error. Please try again.') :
                    (this.getText('errors.cancellationError') || 'Submission error. Please try again.');
                submitButton.textContent = errorMessage;
                submitButton.disabled = false;
            }
            throw error;
        }
    };

    async sendToWebhook(submissionData) {
        this.logger.webhook('Sending data to webhook...', {
            url: this.config.webhookUrl,
            dataType: 'structured (no flatData)'
        });

        try {
            const webhookStartTime = Date.now();
            const response = await fetch(this.config.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submissionData)
            });

            const webhookDuration = Date.now() - webhookStartTime;

            if (response.ok) {
                this.logger.webhook(`✅ Webhook submission successful (${webhookDuration}ms)`);
            } else {
                this.logger.webhook(`⚠️ Webhook submission failed (${webhookDuration}ms)`, {
                    status: response.status,
                    statusText: response.statusText
                });
            }
        } catch (webhookError) {
            this.logger.webhook('❌ Webhook submission error', webhookError);
        }
    }

    async sendToVoiceflow(submissionData, originalFormData) {
        this.logger.voiceflow('Voiceflow integration enabled - preparing data...');
        let voiceflowPayload = submissionData;

        if (this.config.voiceflowDataTransformer && typeof this.config.voiceflowDataTransformer === 'function') {
            this.logger.voiceflow('Using custom Voiceflow data transformer');
            try {
                const transformStartTime = Date.now();
                voiceflowPayload = this.config.voiceflowDataTransformer(submissionData, originalFormData, this);
                const transformDuration = Date.now() - transformStartTime;
                this.logger.transformation(submissionData, voiceflowPayload);
                this.logger.voiceflow(`✅ Voiceflow transformation completed (${transformDuration}ms)`);
            } catch (transformError) {
                this.logger.voiceflow('❌ Error in Voiceflow transformer:', transformError);
                voiceflowPayload = submissionData;
            }
        }

        if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
            try {
                const voiceflowStartTime = Date.now();
                this.logger.voiceflow('📤 Sending data to Voiceflow...', {
                    payload: voiceflowPayload,
                    interactionType: 'success'
                });

                window.voiceflow.chat.interact({
                    type: "success",
                    payload: voiceflowPayload
                });

                const voiceflowDuration = Date.now() - voiceflowStartTime;
                this.logger.voiceflow(`✅ Voiceflow interaction completed (${voiceflowDuration}ms)`);
            } catch (voiceflowError) {
                this.logger.voiceflow('❌ Voiceflow interaction error', voiceflowError);
            }
        } else {
            this.logger.warning('Voiceflow not available in window object');
        }
    }

    determineFormStructure() {
        const steps = this.formConfig.steps || [];
        if (this.config.formStructure === "single") {
            this.state.isSingleStep = true;
        } else if (this.config.formStructure === "multistep") {
            this.state.isSingleStep = false;
        } else {
            this.state.isSingleStep = steps.length <= 1;
        }
        this.logger.info(`Form structure determined: ${this.state.isSingleStep ? 'Single Step' : 'Multi Step'}`);
    }

    async loadCSS() {
        if (this.state.cssLoaded) return;

        try {
            this.logger.info('Loading CSS files...');
            const cssPromises = this.config.cssUrls.map(url => this.fetchCSS(url));
            const cssTexts = await Promise.allSettled(cssPromises);
            
            const validCSS = cssTexts
                .filter(result => result.status === 'fulfilled' && result.value)
                .map(result => result.value)
                .join('\n');

            if (validCSS.trim()) {
                this.combinedCSS = validCSS;
            }

            this.state.cssLoaded = true;
            this.logger.success('CSS loaded successfully');
        } catch (error) {
            this.logger.error('Failed to load CSS:', error);
        }
    }

    async fetchCSS(url) {
        if (this.cssCache.has(url)) return this.cssCache.get(url);

        try {
            const response = await fetch(url);
            const css = response.ok ? await response.text() : '';
            this.cssCache.set(url, css);
            return css;
        } catch (error) {
            this.logger.warning(`Failed to fetch CSS from ${url}:`, error);
            return '';
        }
    }

    injectCSSIntoContainer(container) {
        if (!this.combinedCSS) return;

        const styleClass = this.isBookingForm ? 'booking-form-styles' : 'submission-form-styles';
        
        const existingStyle = container.querySelector(`.${styleClass}`);
        if (existingStyle) {
            existingStyle.remove();
        }

        const styleElement = document.createElement('style');
        styleElement.className = styleClass;
        styleElement.textContent = this.combinedCSS;
        container.appendChild(styleElement);
        
        this.logger.success('CSS injected into container successfully');
    }

    createFormSteps() {
        return this.formConfig.steps.map((stepConfig, index) => {
            if (stepConfig.fields.length === 1 &&
                (stepConfig.fields[0].type === 'summary' || stepConfig.fields[0].autoGenerate || stepConfig.fields[0].type === 'custom')) {
                return {
                    title: this.getText(`steps.${index}.title`),
                    description: this.getText(`steps.${index}.desc`),
                    fields: [{
                        type: 'custom',
                        id: 'summary',
                        name: 'summary',
                        autoSummary: true,
                        label: ''
                    }]
                };
            }

            return {
                title: this.getText(`steps.${index}.title`),
                description: this.getText(`steps.${index}.desc`),
                fields: this.createFields(stepConfig.fields)
            };
        });
    }

    groupFieldsForSingleStep(fields) {
        const groups = [];
        let i = 0;

        while (i < fields.length) {
            const currentField = fields[i];
            if (currentField.row) {
                const rowFields = [];
                let j = i;
                while (j < fields.length && fields[j].row === currentField.row) {
                    rowFields.push(fields[j]);
                    j++;
                }
                groups.push({
                    isRow: true,
                    fields: rowFields
                });
                i = j;
                continue;
            }

            groups.push({
                isRow: false,
                fields: [currentField]
            });
            i++;
        }

        return groups;
    }

    createSingleStepForm() {
        const firstStep = this.formConfig.steps[0];
        if (!firstStep) {
            throw new Error('No steps defined for single step form');
        }

        this.logger.info('Creating single step form with row support');
        const container = document.createElement('div');
        container.className = 'multistep-form single-step-variant';

        const form = document.createElement('form');
        form.className = 'form-step active';

        const fieldsContainer = document.createElement('div');
        fieldsContainer.className = 'step-fields';

        const fields = this.createFields(firstStep.fields);
        const fieldInstances = [];

        const fieldGroups = this.groupFieldsForSingleStep(fields);

        fieldGroups.forEach(group => {
            if (group.isRow) {
                const rowContainer = document.createElement('div');
                rowContainer.className = 'field-row';
                
                group.fields.forEach(fieldConfig => {
                    const colContainer = document.createElement('div');
                    colContainer.className = 'field-col';
                    const field = this.factory.createField(fieldConfig);
                    if (field) {
                        fieldInstances.push(field);
                        colContainer.appendChild(field.render());
                    }
                    rowContainer.appendChild(colContainer);
                });
                fieldsContainer.appendChild(rowContainer);
            } else {
                const field = this.factory.createField(group.fields[0]);
                if (field) {
                    fieldInstances.push(field);
                    fieldsContainer.appendChild(field.render());
                }
            }
        });

        form.appendChild(fieldsContainer);

        if (this.config.showSubmitButton) {
            const navigationContainer = document.createElement('div');
            navigationContainer.className = 'form-navigation';

            const submitButton = document.createElement('button');
            submitButton.type = 'button';
            submitButton.className = 'btn btn-submit';
            submitButton.textContent = this.config.submitButtonText || this.getText('nav.submit');

            submitButton.addEventListener('click', async () => {
                this.logger.info('Single step form submit button clicked');
                
                let isValid = true;
                fieldInstances.forEach(field => {
                    if (!field.validate()) {
                        isValid = false;
                    }
                });

                if (isValid) {
                    const formData = {};
                    fieldInstances.forEach(field => {
                        formData[field.name] = field.getValue();
                    });

                    this.logger.info('Single step form validation passed, submitting...', formData);
                    await this.handleSubmission(formData);
                } else {
                    this.logger.warning('Single step form validation failed');
                }
            });

            navigationContainer.appendChild(submitButton);
            form.appendChild(navigationContainer);

            this.singleStepForm = {
                container,
                fieldInstances,
                submitButton
            };
        } else {
            this.singleStepForm = {
                container,
                fieldInstances,
                submitButton: null
            };
        }

        container.appendChild(form);
        this.logger.success('Single step form created successfully');
        return container;
    }

    updateCalendarConfiguration(selectedService) {
        if (!this.isBookingForm || !selectedService) return;

        this.logger.info('Updating calendar configuration with service:', selectedService);
        const calendarField = this.getCalendarFieldInstance();
        
        if (calendarField) {
            this.logger.info('Found calendar field, updating configuration...');
            calendarField.apiKey = this.config.apiKey;
            calendarField.timezone = this.config.timezone;
            calendarField.eventTypeId = selectedService.eventTypeId;
            calendarField.eventTypeSlug = selectedService.eventTypeSlug;
            calendarField.scheduleId = selectedService.scheduleId;
            calendarField.eventName = selectedService.eventName || selectedService.title;
            calendarField.serviceProvider = selectedService.provider || "SkaLean";
            calendarField.serviceName = selectedService.title;
            calendarField.mode = 'booking';
            calendarField.state.selectedDate = null;
            calendarField.state.selectedTime = null;
            calendarField.state.availableSlots = {};

            if (calendarField.updateCalendarHeader) {
                calendarField.updateCalendarHeader();
            }

            calendarField.init()
                .then(() => {
                    if (calendarField.element) {
                        calendarField.renderCalendarData();
                    }
                    this.logger.success('Calendar reinitialized with new service configuration');
                })
                .catch(error => {
                    this.logger.error('Error reinitializing calendar:', error);
                });
        } else {
            this.logger.info('Calendar field not found, will be configured when calendar step is reached');
        }
    }

    getCalendarFieldInstance() {
        if (!this.isBookingForm) return null;

        if (this.state.isSingleStep && this.singleStepForm) {
            const calendarField = this.singleStepForm.fieldInstances.find(field =>
                field.constructor.name === 'CalendarField'
            );
            if (calendarField) return calendarField;
        }

        if (this.multiStepForm) {
            for (let stepIndex = 0; stepIndex < this.multiStepForm.stepInstances.length; stepIndex++) {
                const stepInstance = this.multiStepForm.stepInstances[stepIndex];
                if (stepInstance && stepInstance.fieldInstances) {
                    const calendarField = stepInstance.fieldInstances.find(field =>
                        field.constructor.name === 'CalendarField'
                    );
                    if (calendarField) return calendarField;
                }
            }
        }

        return null;
    }

    prepareBookingDataForSubmission(formValues, bookingResponse) {
        const appointment = formValues.appointment || {};
        const formattedDate = appointment.selectedDate ?
            new Intl.DateTimeFormat(this.config.language === "fr" ? "fr-CA" : "en-US", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(new Date(appointment.selectedDate)) : '';

        const formattedTime = appointment.selectedTime ?
            new Intl.DateTimeFormat(this.config.language === "fr" ? "fr-CA" : "en-US", {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }).format(new Date(appointment.selectedTime)) : '';

        return {
            firstName: formValues.firstName || '',
            lastName: formValues.lastName || '',
            fullName: `${formValues.firstName || ''} ${formValues.lastName || ''}`.trim(),
            email: formValues.email || '',
            service: formValues.serviceSelection?.eventName || '',
            serviceTitle: formValues.serviceSelection?.title || '',
            serviceDuration: formValues.serviceSelection?.duration || '',
            appointmentDate: appointment.formattedDate || '',
            appointmentTime: appointment.formattedTime || '',
            appointmentDateTime: appointment.selectedTime || '',
            formattedDate,
            formattedTime,
            formattedDateTime: `${formattedDate} ${this.config.language === "fr" ? "à" : "at"} ${formattedTime}`,
            bookingId: bookingResponse?.data?.id || null,
            bookingUid: bookingResponse?.data?.uid || null,
            formLanguage: this.config.language,
            submissionTimestamp: new Date().toISOString(),
            formVersion: this.defaultConfig.FORM_VERSION,
            userAgent: navigator.userAgent,
            formType: "booking_form",
            timezone: this.config.timezone
        };
    }

    handleFieldChange = (name, value) => {
        this.formValues[name] = value;
        
        // Emit field change event
        this.eventBus.emit('field:valueChange', {
            fieldId: name,
            value: value,
            timestamp: Date.now()
        });

        this.logger.info(`Field ${name} changed:`, {
            value,
            formatted: this.formatValue({}, value)
        });

        if (this.isBookingForm && name === 'serviceSelection' && value) {
            this.logger.info('Service selected:', value);
            this.updateCalendarConfiguration(value);
        }
    };

    setupSessionManagement() {
        if (!this.config.enableSessionTimeout) {
            this.logger.info('Session timeout disabled');
            return;
        }

        this.logger.info('Setting up session management:', {
            warningTime: this.config.sessionWarning,
            timeoutTime: this.config.sessionTimeout
        });

        this.warningTimer = setTimeout(() => this.showSessionWarning(), this.config.sessionWarning);
        this.sessionTimer = setTimeout(() => this.disableFormOnTimeout(), this.config.sessionTimeout);
    }

    showSessionWarning() {
        if (this.state.formSubmitted || this.state.sessionExpired) return;

        this.logger.warning('Session warning displayed');
        
        // Emit session warning event
        this.eventBus.emit('session:warning');

        const existingWarning = this.container?.querySelector('.session-warning');
        if (existingWarning) {
            existingWarning.remove();
        }

        const warningDiv = document.createElement('div');
        warningDiv.className = 'session-warning';
        warningDiv.innerHTML = `
            <div class="warning-content">
                <span class="warning-icon">⚠️</span>
                <strong>Session Warning</strong>
                <p>Your session will expire in 2 minutes. Please complete the form soon.</p>
            </div>
        `;

        if (this.container) {
            this.container.style.position = 'relative';
            this.container.appendChild(warningDiv);
        } else {
            document.body.appendChild(warningDiv);
        }

        setTimeout(() => {
            if (warningDiv.parentNode) {
                warningDiv.remove();
            }
        }, 30000);
    }

    disableFormOnTimeout() {
        if (this.state.formSubmitted || this.state.sessionExpired) return;

        this.state.sessionExpired = true;
        this.logger.warning('Session expired - disabling form');
        
        // Emit session timeout event
        this.eventBus.emit('session:timeout');

        const formContainer = this.state.isSingleStep ?
            this.singleStepForm?.container :
            this.multiStepForm?.container;

        if (formContainer) {
            formContainer.querySelectorAll('input, select, button, textarea, [contenteditable]')
                .forEach(el => {
                    el.disabled = true;
                });
        }

        this.showTimeoutOverlay();
    }

    showTimeoutOverlay() {
        const existingOverlay = this.container?.querySelector('.timeout-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        const overlay = document.createElement('div');
        overlay.className = 'timeout-overlay';
        overlay.innerHTML = `
            <div class="timeout-content">
                <div class="timeout-icon">⏰</div>
                <span>Session Expired</span>
                <p>Your session has expired after ${this.config.sessionTimeout / 60000} minutes of inactivity. 
                The form is no longer available.</p>
            </div>
        `;

        if (this.container) {
            this.container.style.position = 'relative';
            this.container.appendChild(overlay);
        }

        this.sendTimeoutToVoiceflow();
    }

    sendTimeoutToVoiceflow() {
        this.logger.voiceflow('Sending session timeout notification to Voiceflow...');
        
        if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.interact) {
            try {
                const timeoutPayload = {
                    type: "timeEnd",
                    payload: {
                        message: "Time expired",
                        sessionDuration: this.config.sessionTimeout / 60000,
                        formType: this.config.formType,
                        currentStep: this.state.currentStep,
                        formData: this.getFormDataForTimeout(),
                        timestamp: new Date().toISOString()
                    }
                };

                window.voiceflow.chat.interact(timeoutPayload);
                this.logger.voiceflow('✅ Session timeout sent to Voiceflow successfully', timeoutPayload);
            } catch (voiceflowError) {
                this.logger.voiceflow('❌ Error sending timeout to Voiceflow:', voiceflowError);
            }
        } else {
            this.logger.warning('Voiceflow not available - cannot send timeout notification');
        }
    }

    getFormDataForTimeout() {
        try {
            if (this.state.isSingleStep && this.singleStepForm) {
                const data = {};
                this.singleStepForm.fieldInstances.forEach(field => {
                    try {
                        const value = field.getValue();
                        if (value !== null && value !== undefined && value !== '') {
                            data[field.name] = value;
                        }
                    } catch (err) {
                        // Skip fields that can't be read
                    }
                });
                return data;
            } else if (this.multiStepForm) {
                return this.multiStepForm.getFormData() || {};
            }
            return {};
        } catch (error) {
            this.logger.warning('Could not retrieve form data for timeout:', error);
            return {};
        }
    }

    clearSessionTimers() {
        this.logger.info('Clearing session timers');
        
        if (this.sessionTimer) {
            clearTimeout(this.sessionTimer);
            this.sessionTimer = null;
        }
        if (this.warningTimer) {
            clearTimeout(this.warningTimer);
            this.warningTimer = null;
        }

        const sessionWarning = this.container?.querySelector('.session-warning');
        if (sessionWarning) {
            sessionWarning.remove();
        }

        document.querySelector('.session-warning')?.remove();
    }

    showSuccessScreen() {
        const formContainer = this.state.isSingleStep ?
            this.singleStepForm?.container :
            this.multiStepForm?.container;

        if (formContainer) formContainer.style.display = 'none';

        const successScreen = document.createElement('div');
        successScreen.className = 'success-state';

        const checkMarkSvg = SVGIcons.get('CHECK');

        successScreen.innerHTML = `
            <div class="success-background"></div>
            <div class="success-icon-container">
                <div class="success-icon">
                    ${checkMarkSvg.replace('width="12px" height="12px"', 'width="60px" height="60px"')}
                </div>
            </div>
            <div class="success-content">
                <span class="success-title">${this.getText('success.title')}</span>
                <p class="success-message">${this.getText('success.message')}</p>
            </div>
            <div class="success-decorations">
                <div class="decoration decoration-1"></div>
                <div class="decoration decoration-2"></div>
                <div class="decoration decoration-3"></div>
            </div>
        `;

        this.container.appendChild(successScreen);
        this.logger.success('Enhanced success screen displayed with beautiful UI/UX');
    }

    getSubmitButton() {
        if (this.state.isSingleStep && this.singleStepForm) {
            return this.singleStepForm.submitButton;
        }
        return document.querySelector('.btn-submit');
    }

    async submitForm() {
        if (this.state.isSingleStep && this.singleStepForm) {
            let isValid = true;
            this.singleStepForm.fieldInstances.forEach(field => {
                if (!field.validate()) {
                    isValid = false;
                }
            });

            if (isValid) {
                const formData = {};
                this.singleStepForm.fieldInstances.forEach(field => {
                    formData[field.name] = field.getValue();
                });
                return await this.handleSubmission(formData);
            } else {
                throw new Error('Form validation failed');
            }
        } else if (this.multiStepForm) {
            return await this.multiStepForm.submitForm();
        }
        throw new Error('Form not initialized');
    }

    validateForm() {
        if (this.state.isSingleStep && this.singleStepForm) {
            return this.singleStepForm.fieldInstances.every(field => field.validate());
        } else if (this.multiStepForm) {
            return this.multiStepForm.validateAllSteps();
        }
        return false;
    }

    async render(element) {
        try {
            this.logger.info('🎬 Starting form render process...');
            
            await this.loadCSS();
            
            this.container = document.createElement('div');
            this.container.className = this.isBookingForm ? 'booking-form-extension' : 'submission-form-extension';
            this.container.id = this.isBookingForm ? 'booking-form-root' : 'submission-form-root';

            this.injectCSSIntoContainer(this.container);

            this.factory = new FormFieldFactory({
                container: this.container,
                formValues: this.formValues,
                onChange: this.handleFieldChange,
                serviceContainer: this.serviceContainer,
                texts: {
                    next: this.getText('nav.next'),
                    previous: this.getText('nav.previous'),
                    submit: this.getText('nav.submit'),
                    required: this.getText('common.required'),
                    fieldRequired: this.getText('common.fieldRequired'),
                    yes: this.getText('common.yes'),
                    no: this.getText('common.no'),
                    other: this.getText('common.other'),
                    selectAtLeastOne: this.getText('errors.selectAtLeastOne'),
                    edit: this.getText('summary.editStep') || this.getText('common.edit'),
                    language: this.config.language
                }
            });

            this.factory.setCreatFormInstance(this);

            if (this.state.isSingleStep) {
                this.logger.info('Creating single step form');
                const singleStepContainer = this.createSingleStepForm();
                this.container.appendChild(singleStepContainer);
            } else {
                this.logger.info('Creating multi-step form');
                const formConfig = {
                    showProgress: true,
                    saveProgress: false,
                    validateOnNext: true,
                    steps: this.createFormSteps(),
                    onSubmit: this.handleSubmission,
                    onStepChange: (stepIndex, stepInstance) => {
                        this.state.currentStep = stepIndex;
                        this.logger.info(`Step changed to ${stepIndex + 1}`);
                        
                        // Emit step change event
                        this.eventBus.emit('step:changed', { stepIndex, stepInstance });

                        if (this.isBookingForm && this.formValues.serviceSelection) {
                            const calendarStepIndex = this.formConfig.steps.findIndex(step =>
                                step.fields.some(field => field.type === 'calendar')
                            );
                            if (stepIndex === calendarStepIndex) {
                                this.logger.info('Reached calendar step, applying service configuration...');
                                setTimeout(() => {
                                    this.updateCalendarConfiguration(this.formValues.serviceSelection);
                                }, 100);
                            }
                        }

                        if (stepInstance && stepInstance.fieldInstances) {
                            stepInstance.fieldInstances.forEach(fieldInstance => {
                                if (fieldInstance.autoSummary && fieldInstance.updateContent) {
                                    setTimeout(() => {
                                        fieldInstance.updateContent();
                                    }, 100);
                                }
                            });
                        }
                    }
                };

                this.multiStepForm = this.factory.createMultiStepForm(formConfig);
            }

            element.appendChild(this.container);
            this.setupSessionManagement();
            this.state.initialized = true;
            
            this.logger.success('🎊 Form rendered successfully with container-scoped CSS and session management!');
            return this.createPublicAPI();

        } catch (error) {
            this.logger.error('Failed to render form:', error);
            const errorMessage = this.isBookingForm ? 'Failed to load booking form' : 'Failed to load submission form';
            element.innerHTML = `<div class="error-state">${errorMessage}</div>`;
            return { destroy: () => {} };
        }
    }

    createPublicAPI() {
        return {
            destroy: () => this.destroy(),
            getCurrentStep: () => this.state.currentStep,
            getFormData: () => {
                if (this.state.isSingleStep && this.singleStepForm) {
                    const data = {};
                    this.singleStepForm.fieldInstances.forEach(field => {
                        data[field.name] = field.getValue();
                    });
                    return data;
                }
                return this.multiStepForm?.getFormData() || {};
            },
            getDataProcessor: () => this.dataProcessor,
            getTransformerInstance: () => this.dataTransformerInstance,
            getFormatter: () => this.fieldFormatter,
            getServiceContainer: () => this.serviceContainer,
            getEventBus: () => this.eventBus,
            getStateManager: () => this.stateManager,
            testDataTransformation: (testData) => {
                if (this.dataTransformerInstance) {
                    try {
                        return this.dataTransformerInstance.transform(testData);
                    } catch (error) {
                        this.logger.error('Error testing data transformation:', error);
                        return null;
                    }
                }
                return null;
            },
            processDataLikeCustomField: (testData) => {
                try {
                    return this.dataProcessor.processFormData(testData);
                } catch (error) {
                    this.logger.error('Error processing data like CustomField:', error);
                    return null;
                }
            },
            getConfig: () => ({
                webhookEnabled: this.config.webhookEnabled,
                voiceflowEnabled: this.config.voiceflowEnabled,
                useStructuredData: this.config.useStructuredData,
                formType: this.config.formType,
                formStructure: this.state.isSingleStep ? 'single' : 'multistep',
                showSubmitButton: this.config.showSubmitButton,
                hasDataTransformer: !!this.dataTransformerInstance,
                hasVoiceflowTransformer: typeof this.config.voiceflowDataTransformer === 'function',
                dataTransformerType: this.dataTransformerInstance?.constructor.name || 'none',
                usesFormDataProcessor: true
            }),
            submitForm: () => this.submitForm(),
            validateForm: () => this.validateForm(),
            reset: () => this.reset(),
            enableLogging: () => {
                this.config.enableDetailedLogging = true;
                this.logger.info('Detailed logging enabled');
            },
            disableLogging: () => {
                this.config.enableDetailedLogging = false;
                console.log('📋 CreatForm: Detailed logging disabled');
            }
        };
    }

    handleReset() {
        this.eventBus.emit('form:reset');
        this.reset();
    }

    handleSessionTimeout() {
        this.logger.warning('Session timeout occurred');
        this.disableFormOnTimeout();
    }

    handleSessionWarning() {
        this.logger.warning('Session warning triggered');
        this.showSessionWarning();
    }

    reset() {
        this.logger.info('Resetting form...');
        
        this.clearSessionTimers();
        this.state = {
            ...this.state,
            initialized: false,
            formSubmitted: false,
            sessionExpired: false,
            currentStep: 0
        };

        if (this.state.isSingleStep && this.singleStepForm) {
            this.singleStepForm.fieldInstances.forEach(field => {
                field.setValue('');
                field.hideError();
            });
        } else if (this.multiStepForm) {
            this.multiStepForm.reset();
        }

        // Reset state manager
        this.stateManager.dispatch({ type: 'FORM_RESET' });

        this.setupSessionManagement();
        this.logger.success('Form reset completed');
    }

    destroy() {
        this.logger.info('Destroying form...');
        
        this.clearSessionTimers();
        this.factory?.destroy();
        
        if (this.multiStepForm) {
            this.multiStepForm.clearSavedProgress();
        }

        this.elements.clear();

        if (this.container) {
            const styleClass = this.isBookingForm ? 'booking-form-styles' : 'submission-form-styles';
            const containerStyle = this.container.querySelector(`.${styleClass}`);
            if (containerStyle) {
                containerStyle.remove();
            }

            const sessionWarning = this.container.querySelector('.session-warning');
            const timeoutOverlay = this.container.querySelector('.timeout-overlay');
            if (sessionWarning) sessionWarning.remove();
            if (timeoutOverlay) timeoutOverlay.remove();
            
            this.container.remove();
        }

        // Clean up services
        this.serviceContainer.clear();

        this.logger.success('Form destroyed successfully');
    }
}

// ===================================================================
// ENHANCED FORM FIELD FACTORY
// ===================================================================

class FormFieldFactory {
    constructor(options = {}) {
        this.container = options.container || document.body;
        this.formValues = options.formValues || {};
        this.onChangeCallback = options.onChange || null;
        this.serviceContainer = options.serviceContainer || null;
        this.currentMultiStepForm = null;
        this.fieldRegistry = {};
        
        this.openDropdowns = new Set();
        this.openInfoPanels = new Set();
        this.globalClickHandlerAttached = false;

        this.texts = {
            required: options.texts?.required || "required",
            selectPlaceholder: options.texts?.selectPlaceholder || "-- Select --",
            selectMultiplePlaceholder: options.texts?.selectMultiplePlaceholder || "-- Multiple selection --",
            selectSubsectionPlaceholder: options.texts?.selectSubsectionPlaceholder || "-- Select from categories --",
            yes: options.texts?.yes || "Yes",
            no: options.texts?.no || "No",
            other: options.texts?.other || "Other",
            fieldRequired: options.texts?.fieldRequired || "This field is required",
            emailInvalid: options.texts?.emailInvalid || "Invalid email format",
            phoneInvalid: options.texts?.phoneInvalid || "Invalid phone format",
            urlInvalid: options.texts?.urlInvalid || "Invalid URL format",
            selectAtLeastOne: options.texts?.selectAtLeastOne || "Please select at least one option",
            selectAll: options.texts?.selectAll || "Select All",
            selected: options.texts?.selected || "selected",
            next: options.texts?.next || "Next",
            previous: options.texts?.previous || "Previous",
            submit: options.texts?.submit || "Submit",
            step: options.texts?.step || "Step",
            of: options.texts?.of || "of",
            edit: options.texts?.edit || "Edit",
            noDataEntered: options.texts?.noDataEntered || "No data entered",
            categoryRequired: options.texts?.categoryRequired || "Please select a category",
            dateTimeRequired: options.texts?.dateTimeRequired || "Please select a date and time"
        };

        this.dataProcessor = null;
        this.formatter = null;

        this.initGlobalClickHandler();
    }

    setCreatFormInstance(creatFormInstance) {
        this.creatFormInstance = creatFormInstance;
        this.dataProcessor = new FormDataProcessor(creatFormInstance);
        this.formatter = new FieldValueFormatter(creatFormInstance);
    }

    initGlobalClickHandler() {
        if (!this.globalClickHandlerAttached) {
            this.globalClickHandler = this.handleGlobalClick.bind(this);
            document.addEventListener('click', this.globalClickHandler, true);
            this.globalClickHandlerAttached = true;
        }
    }

    handleGlobalClick(event) {
        this.openDropdowns.forEach(dropdown => {
            if (!dropdown.element.contains(event.target)) {
                dropdown.close();
            }
        });

        this.openInfoPanels.forEach(infoPanel => {
            if (!infoPanel.element.contains(event.target) &&
                !infoPanel.button.contains(event.target)) {
                infoPanel.close();
            }
        });
    }

    registerDropdown(dropdownInstance) {
        this.openDropdowns.add(dropdownInstance);
    }

    unregisterDropdown(dropdownInstance) {
        this.openDropdowns.delete(dropdownInstance);
    }

    registerInfoPanel(infoPanelInstance) {
        this.openInfoPanels.add(infoPanelInstance);
    }

    unregisterInfoPanel(infoPanelInstance) {
        this.openInfoPanels.delete(infoPanelInstance);
    }

    closeAllDropdowns() {
        this.openDropdowns.forEach(dropdown => dropdown.close());
    }

    closeAllInfoPanels() {
        this.openInfoPanels.forEach(infoPanel => infoPanel.close());
    }

    createField(config) {
        let field;
        
        // Enhanced field creation with service injection
        const enhancedConfig = {
            ...config,
            serviceContainer: this.serviceContainer,
            eventBus: this.serviceContainer?.get('eventBus'),
            validator: this.serviceContainer?.get('validator'),
            formatter: this.serviceContainer?.get('formatter'),
            renderer: this.serviceContainer?.get('renderer')
        };

        switch (config.type) {
            case 'text':
                field = new TextField(this, enhancedConfig);
                break;
            case 'email':
                field = new EmailField(this, enhancedConfig);
                break;
            case 'phone':
                field = new PhoneField(this, enhancedConfig);
                break;
            case 'url':
                field = new UrlField(this, enhancedConfig);
                break;
            case 'textarea':
                field = new TextAreaField(this, enhancedConfig);
                break;
            case 'number':
                field = new NumberField(this, enhancedConfig);
                break;
            case 'percentage':
                field = new PercentageField(this, enhancedConfig);
                break;
            case 'options-stepper':
                field = new OptionsStepperField(this, enhancedConfig);
                break;
            case 'yesno':
                field = new YesNoField(this, enhancedConfig);
                break;
            case 'select':
                field = new SingleSelectField(this, enhancedConfig);
                break;
            case 'multiselect':
                field = new MultiSelectField(this, enhancedConfig);
                break;
            case 'select-subsections':
                field = new SingleSelectSubsectionsField(this, enhancedConfig);
                break;
            case 'multiselect-subsections':
                field = new MultiSelectSubsectionsField(this, enhancedConfig);
                break;
            case 'yesno-with-options':
                field = new YesNoWithOptionsField(this, enhancedConfig);
                break;
            case 'select-with-other':
                field = new SingleSelectWithOtherField(this, enhancedConfig);
                break;
            case 'multiselect-with-other':
                field = new MultiSelectWithOtherField(this, enhancedConfig);
                break;
            case 'sliding-window-range':
                field = new SlidingWindowRangeField(this, enhancedConfig);
                break;
            case 'sliding-window':
                field = new SlidingWindowSliderField(this, enhancedConfig);
                break;
            case 'dual-range':
                field = new DualRangeField(this, enhancedConfig);
                break;
            case 'slider':
                field = new SliderField(this, enhancedConfig);
                break;
            case 'options-slider':
                field = new OptionsSliderField(this, enhancedConfig);
                break;
            case 'serviceCard':
                field = new ServiceCardField(this, enhancedConfig);
                break;
            case 'carousel':
                field = new CarouselField(this, enhancedConfig);
                break;
            case 'filteredCarousel':
                field = new FilteredCarouselField(this, enhancedConfig);
                break;
            case 'service-provider-calendar':
                field = new ServiceProviderCalendarField(this, enhancedConfig);
                break;
            case 'calendar':
                field = new CalendarField(this, enhancedConfig);
                break;
            case 'item-calendar':
                field = new ItemCalendarField(this, enhancedConfig);
                break;
            case 'category-item-filter':
                field = new CategoryItemFilterField(this, enhancedConfig);
                break;
            case 'tab-manager':
                field = new TabManager(this, enhancedConfig);
                break;
            case 'category-item-calendar':
                field = new CategoryAndItemCalendarField(this, enhancedConfig);
                break;
            case 'image-gallery':
                field = new ImageGalleryField(this, enhancedConfig);
                break;
            case 'service-request-calendar':
            case 'serviceRequestCalendar':
                field = new ServiceRequestCalendarField(this, enhancedConfig);
                break;
            case 'terms-checkbox':
            case 'termsCheckbox':
                field = new TermsCheckboxField(this, enhancedConfig);
                break;
            case 'category-request-file-upload':
            case 'categoryRequestFileUpload':
                field = new CategoryRequestFileUploadField(this, enhancedConfig);
                break;
            case 'currentAppointmentCard':
                field = new CurrentAppointmentCardField(this, enhancedConfig);
                break;
            case 'custom':
                field = new CustomField(this, enhancedConfig);
                break;
            case 'booking-cancellation-card':
                field = new BookingCancellationCardField(this, enhancedConfig);
                break;
            default:
                console.warn(`Unknown field type: ${config.type}`);
                field = new TextField(this, enhancedConfig);
        }

        return field;
    }

    processFormData(rawFormData) {
        if (!this.dataProcessor) {
            console.warn('FormDataProcessor not available - CreatForm instance not set');
            return this.fallbackProcessing(rawFormData);
        }

        try {
            return this.dataProcessor.processFormData(rawFormData);
        } catch (error) {
            console.error('Error processing form data:', error);
            return this.fallbackProcessing(rawFormData);
        }
    }

    fallbackProcessing(rawFormData) {
        const processed = {};
        Object.keys(rawFormData).forEach(fieldName => {
            const fieldValue = rawFormData[fieldName];
            processed[fieldName] = {
                fieldId: fieldName,
                fieldType: 'unknown',
                label: fieldName,
                displayValue: this.basicValueFormat(fieldValue),
                rawValue: fieldValue
            };
        });
        return processed;
    }

    basicValueFormat(value) {
        if (value === undefined || value === null || value === '') {
            return '';
        }
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        if (typeof value === 'object') {
            if (value.main !== undefined) {
                return value.main === true || value.main === 'yes' ? 'Yes' : 'No';
            }
            if (value.main && value.other) {
                return value.main === 'other' ? value.other : value.main;
            }
            return JSON.stringify(value);
        }
        return value.toString();
    }

    getFieldConfigurations() {
        if (!this.currentMultiStepForm || !this.currentMultiStepForm.steps) {
            return [];
        }

        const configs = [];
        this.currentMultiStepForm.steps.forEach(step => {
            if (step.fields) {
                configs.push(...this.extractFieldConfigs(step.fields));
            }
        });
        return configs;
    }

    extractFieldConfigs(fields) {
        const configs = [];
        fields.forEach(fieldConfig => {
            configs.push(fieldConfig);
            if (fieldConfig.yesFields) {
                configs.push(...this.extractFieldConfigs(fieldConfig.yesFields));
            }
            if (fieldConfig.yesField) {
                configs.push(fieldConfig.yesField);
            }
            if (fieldConfig.noFields) {
                configs.push(...this.extractFieldConfigs(fieldConfig.noFields));
            }
            if (fieldConfig.noField) {
                configs.push(fieldConfig.noField);
            }
        });
        return configs;
    }

    findFieldConfiguration(fieldName, fieldConfigurations) {
        return fieldConfigurations.find(config =>
            (config.name === fieldName) || (config.id === fieldName)
        ) || null;
    }

    getText(key, customMessages = {}) {
        return customMessages[key] || this.texts[key] || key;
    }

    // Factory creation methods
    createMultiStepForm(config) {
        return new MultiStepForm(this, config);
    }

    getDataProcessor() {
        return this.dataProcessor;
    }

    getFormatter() {
        return this.formatter;
    }

    formatFieldValue(fieldConfig, value, context = {}) {
        if (this.formatter) {
            return this.formatter.formatValue(fieldConfig, value, context);
        }
        return this.basicValueFormat(value);
    }

    processDataLikeTransformers(formData) {
        if (this.dataProcessor) {
            return this.dataProcessor.processFormData(formData);
        }
        return this.fallbackProcessing(formData);
    }

    destroy() {
        if (this.globalClickHandlerAttached) {
            document.removeEventListener('click', this.globalClickHandler, true);
            this.globalClickHandlerAttached = false;
        }

        this.openDropdowns.clear();
        this.openInfoPanels.clear();
        this.dataProcessor = null;
        this.formatter = null;
        this.creatFormInstance = null;
    }

    static ValidationUtils = {
        isValidEmail(email) {
            const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
            return emailPattern.test(email);
        },
        
        isValidPhoneNumber(phoneNumber) {
            const phonePattern = /^(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
            return phonePattern.test(phoneNumber);
        },
        
        isValidUrl(url) {
            if (!url || url.trim() === '') return false;
            let testUrl = url.trim();
            if (!testUrl.match(/^https?:\/\//)) {
                testUrl = 'https://' + testUrl;
            }
            try {
                new URL(testUrl);
                const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]*)?$/;
                return urlPattern.test(url.trim());
            } catch (e) {
                return false;
            }
        },
        
        formatPhoneNumber(phoneNumber) {
            const cleaned = phoneNumber.replace(/\D/g, '');
            if (cleaned.length === 10) {
                return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
            }
            return phoneNumber;
        },
        
        normalizeUrl(url) {
            if (!url || url.trim() === '') return '';
            let normalized = url.trim();
            if (!normalized.match(/^https?:\/\//)) {
                if (normalized.startsWith('www.') || normalized.split('.').length > 2) {
                    normalized = 'https://' + normalized;
                } else {
                    normalized = 'https://www.' + normalized;
                }
            }
            return normalized;
        }
    };
}

// ===================================================================
// ENHANCED MULTI STEP FORM
// ===================================================================

class MultiStepForm {
    constructor(factory, config) {
        this.factory = factory;
        this.config = config;
        this.steps = config.steps || [];
        this.currentStep = 0;
        this.formData = config.initialData || {};
        this.onSubmit = config.onSubmit || null;
        this.onStepChange = config.onStepChange || null;
        this.validateOnNext = config.validateOnNext !== false;
        this.showProgress = config.showProgress !== false;
        this.saveProgressEnabled = config.saveProgress !== false;
        this.storageKey = config.storageKey || 'multistep_form_data';
        this.container = null;
        this.stepInstances = [];
        this.progressBar = null;
        this.navigationButtons = null;
        
        // Get event bus from service container if available
        this.eventBus = this.factory.serviceContainer?.get('eventBus');
        
        this.init();
    }

    init() {
        this.factory.currentMultiStepForm = this;
        this.createContainer();
        this.createProgressBar();
        this.createSteps();
        this.createNavigation();
        this.loadSavedProgress();
        this.showCurrentStep();
        
        // Emit initialization event
        this.eventBus?.emit('multiStepForm:initialized', { form: this });
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'multistep-form';
        this.factory.container.appendChild(this.container);
    }

    createProgressBar() {
        if (!this.showProgress) return;
        
        this.progressBar = new ProgressBar(this, {
            totalSteps: this.steps.length,
            currentStep: this.currentStep
        });
        this.container.appendChild(this.progressBar.render());
    }

    createSteps() {
        this.steps.forEach((stepConfig, index) => {
            const step = new FormStep(this, {
                ...stepConfig,
                index: index,
                isActive: index === this.currentStep
            });
            this.stepInstances.push(step);
            this.container.appendChild(step.render());
        });
    }

    createNavigation() {
        this.navigationButtons = new NavigationButtons(this);
        this.container.appendChild(this.navigationButtons.render());
    }

    showCurrentStep() {
        this.stepInstances.forEach((step, index) => {
            step.setActive(index === this.currentStep);
        });
        
        if (this.progressBar) {
            this.progressBar.updateProgress(this.currentStep);
        }
        
        this.navigationButtons.updateButtons(this.currentStep, this.steps.length);
        
        // Emit step change event
        this.eventBus?.emit('step:changed', { 
            stepIndex: this.currentStep, 
            stepInstance: this.stepInstances[this.currentStep] 
        });
        
        if (this.onStepChange) {
            this.onStepChange(this.currentStep, this.stepInstances[this.currentStep]);
        }
    }

    nextStep() {
        if (this.validateOnNext && !this.validateCurrentStep()) {
            this.eventBus?.emit('step:validationFailed', { stepIndex: this.currentStep });
            return false;
        }
        
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.showCurrentStep();
            this.saveProgress();
            this.eventBus?.emit('step:next', { stepIndex: this.currentStep });
            return true;
        }
        return false;
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showCurrentStep();
            this.saveProgress();
            this.eventBus?.emit('step:previous', { stepIndex: this.currentStep });
            return true;
        }
        return false;
    }

    goToStep(stepIndex) {
        if (stepIndex >= 0 && stepIndex < this.steps.length) {
            this.currentStep = stepIndex;
            this.showCurrentStep();
            this.saveProgress();
            this.eventBus?.emit('step:goto', { stepIndex });
            return true;
        }
        return false;
    }

    validateCurrentStep() {
        const isValid = this.stepInstances[this.currentStep].validate();
        this.eventBus?.emit('step:validated', { 
            stepIndex: this.currentStep, 
            isValid 
        });
        return isValid;
    }

    validateAllSteps() {
        const results = this.stepInstances.map((step, index) => {
            const isValid = step.validate();
            this.eventBus?.emit('step:validated', { stepIndex: index, isValid });
            return isValid;
        });
        
        const allValid = results.every(result => result);
        this.eventBus?.emit('form:validated', { isValid: allValid });
        return allValid;
    }

    getFormData() {
        const data = {};
        this.stepInstances.forEach(step => {
            Object.assign(data, step.getStepData());
        });
        return data;
    }

    setFormData(data) {
        this.formData = { ...this.formData, ...data };
        this.stepInstances.forEach(step => {
            step.setStepData(this.formData);
        });
    }

    saveProgress() {
        if (!this.saveProgressEnabled) return;
        
        const progressData = {
            currentStep: this.currentStep,
            formData: this.getFormData(),
            timestamp: Date.now()
        };
        
        localStorage.setItem(this.storageKey, JSON.stringify(progressData));
        this.eventBus?.emit('progress:saved', { progressData });
    }

    loadSavedProgress() {
        if (!this.saveProgressEnabled) return;
        
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const progressData = JSON.parse(saved);
                this.currentStep = progressData.currentStep || 0;
                this.setFormData(progressData.formData || {});
                this.eventBus?.emit('progress:loaded', { progressData });
            }
        } catch (e) {
            console.warn('Failed to load saved progress:', e);
        }
    }

    clearSavedProgress() {
        localStorage.removeItem(this.storageKey);
        this.eventBus?.emit('progress:cleared');
    }

    reset() {
        this.currentStep = 0;
        this.formData = {};
        
        this.stepInstances.forEach(step => {
            step.reset();
            step.fieldInstances.forEach(field => {
                field.hideError();
                field.setValue('');
            });
        });

        this.factory.formValues = {};
        this.factory.closeAllDropdowns();
        this.factory.closeAllInfoPanels();
        this.clearSavedProgress();
        this.showCurrentStep();

        this.stepInstances.forEach(step => {
            step.fieldInstances.forEach(field => {
                if (field.autoSummary && field.updateContent) {
                    setTimeout(() => field.updateContent(), 100);
                }
            });
        });

        this.eventBus?.emit('form:reset');
    }

    submit() {
        if (!this.validateAllSteps()) {
            this.eventBus?.emit('form:submitValidationFailed');
            return false;
        }

        const formData = this.getFormData();
        this.eventBus?.emit('form:submitStart', { formData });

        if (this.onSubmit) {
            const result = this.onSubmit(formData);
            if (result !== false) {
                this.clearSavedProgress();
                this.eventBus?.emit('form:submitSuccess', { formData, result });
            }
            return result;
        }

        this.clearSavedProgress();
        this.eventBus?.emit('form:submitSuccess', { formData });
        return formData;
    }
}

// ===================================================================
// ENHANCED FORM STEP
// ===================================================================

class FormStep {
    constructor(multiStepForm, config) {
        this.multiStepForm = multiStepForm;
        this.factory = multiStepForm.factory;
        this.config = config;
        this.index = config.index;
        this.title = config.title || `Step ${this.index + 1}`;
        this.description = config.description || '';
        this.fields = config.fields || [];
        this.validationRules = config.validation || {};
        this.conditionalLogic = config.conditionalLogic || {};
        this.container = null;
        this.fieldInstances = [];
        this.isActive = config.isActive || false;
        
        // Get event bus from service container if available
        this.eventBus = this.factory.serviceContainer?.get('eventBus');
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = `form-step ${this.isActive ? 'active' : 'hidden'}`;
        this.container.setAttribute('data-step', this.index);

        if (this.title) {
            const titleElement = document.createElement('span');
            titleElement.className = 'step-title';
            titleElement.textContent = this.title;
            this.container.appendChild(titleElement);
        }

        const fieldsContainer = document.createElement('div');
        fieldsContainer.className = 'step-fields';

        const fieldGroups = this.groupFields(this.fields);
        fieldGroups.forEach(group => {
            if (group.isRow) {
                const rowContainer = document.createElement('div');
                rowContainer.className = 'field-row';
                
                group.fields.forEach(fieldConfig => {
                    const colContainer = document.createElement('div');
                    colContainer.className = 'field-col';
                    const field = this.createField(fieldConfig);
                    if (field) {
                        this.fieldInstances.push(field);
                        colContainer.appendChild(field.render());
                    }
                    rowContainer.appendChild(colContainer);
                });
                fieldsContainer.appendChild(rowContainer);
            } else {
                const field = this.createField(group.fields[0]);
                if (field) {
                    this.fieldInstances.push(field);
                    fieldsContainer.appendChild(field.render());
                }
            }
        });

        this.container.appendChild(fieldsContainer);
        this.setupConditionalLogic();
        
        this.eventBus?.emit('step:rendered', { stepIndex: this.index, step: this });
        
        return this.container;
    }

    groupFields(fields) {
        const groups = [];
        let i = 0;

        while (i < fields.length) {
            const currentField = fields[i];
            if (currentField.row) {
                const rowFields = [];
                let j = i;
                while (j < fields.length && fields[j].row === currentField.row) {
                    rowFields.push(fields[j]);
                    j++;
                }
                groups.push({
                    isRow: true,
                    fields: rowFields
                });
                i = j;
                continue;
            }

            groups.push({
                isRow: false,
                fields: [currentField]
            });
            i++;
        }

        return groups;
    }

    createField(config) {
        const fieldConfig = {
            ...config,
            onChange: (value) => {
                this.handleFieldChange(config.name, value);
                if (config.onChange) {
                    config.onChange(value);
                }
            }
        };

        return this.factory.createField(fieldConfig);
    }

    handleFieldChange(fieldName, value) {
        this.multiStepForm.formData[fieldName] = value;
        this.executeConditionalLogic(fieldName, value);
        this.multiStepForm.saveProgress();
        
        // Emit field change event
        this.eventBus?.emit('field:valueChange', {
            fieldId: fieldName,
            value,
            stepIndex: this.index
        });
    }

    setupConditionalLogic() {
        Object.keys(this.conditionalLogic).forEach(fieldName => {
            const currentValue = this.multiStepForm.formData[fieldName];
            if (currentValue !== undefined) {
                this.executeConditionalLogic(fieldName, currentValue);
            }
        });
    }

    executeConditionalLogic(fieldName, value) {
        const logic = this.conditionalLogic[fieldName];
        if (!logic) return;

        logic.forEach(rule => {
            const { condition, target, action } = rule;
            const shouldExecute = this.evaluateCondition(condition, value);
            if (shouldExecute) {
                this.executeAction(target, action);
            }
        });
    }

    evaluateCondition(condition, value) {
        if (typeof condition === 'function') {
            return condition(value);
        }
        
        if (typeof condition === 'object') {
            const { equals, notEquals, includes, notIncludes } = condition;
            
            if (equals !== undefined) {
                return value === equals;
            }
            if (notEquals !== undefined) {
                return value !== notEquals;
            }
            if (includes !== undefined) {
                return Array.isArray(value) ? value.includes(includes) : value === includes;
            }
            if (notIncludes !== undefined) {
                return Array.isArray(value) ? !value.includes(notIncludes) : value !== notIncludes;
            }
        }
        
        return value === condition;
    }

    executeAction(target, action) {
        const field = this.fieldInstances.find(f => f.name === target);
        if (!field) return;

        switch (action.type) {
            case 'show':
                field.show();
                break;
            case 'hide':
                field.hide();
                break;
            case 'enable':
                field.enable();
                break;
            case 'disable':
                field.disable();
                break;
            case 'setValue':
                field.setValue(action.value);
                break;
            case 'setOptions':
                if (field.setOptions) {
                    field.setOptions(action.options);
                }
                break;
        }
    }

    setActive(active) {
        this.isActive = active;
        if (this.container) {
            this.container.classList.toggle('active', active);
            this.container.classList.toggle('hidden', !active);
        }
        
        this.eventBus?.emit('step:activeChanged', { 
            stepIndex: this.index, 
            isActive: active 
        });
    }

    validate() {
        let isValid = true;
        this.fieldInstances.forEach(field => {
            if (!field.validate()) {
                isValid = false;
            }
        });
        
        this.eventBus?.emit('step:validated', { 
            stepIndex: this.index, 
            isValid 
        });
        
        return isValid;
    }

    getStepData() {
        const data = {};
        this.fieldInstances.forEach(field => {
            data[field.name] = field.getValue();
        });
        return data;
    }

    setStepData(data) {
        this.fieldInstances.forEach(field => {
            if (data[field.name] !== undefined) {
                field.setValue(data[field.name]);
            }
        });
    }

    reset() {
        this.fieldInstances.forEach(field => {
            field.setValue('');
        });
        
        this.eventBus?.emit('step:reset', { stepIndex: this.index });
    }
}

// ===================================================================
// ENHANCED PROGRESS BAR
// ===================================================================

class ProgressBar {
    constructor(multiStepForm, config) {
        this.multiStepForm = multiStepForm;
        this.config = config;
        this.totalSteps = config.totalSteps;
        this.currentStep = config.currentStep || 0;
        this.showStepNumbers = config.showStepNumbers !== false;
        this.showStepTitles = config.showStepTitles !== false;
        this.container = null;
        this.progressFill = null;
        this.stepInfo = null;
        
        // Get event bus from service container if available
        this.eventBus = this.multiStepForm.factory.serviceContainer?.get('eventBus');
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'progress-container';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

        this.progressFill = document.createElement('div');
        this.progressFill.className = 'progress-fill';
        progressBar.appendChild(this.progressFill);

        this.container.appendChild(progressBar);

        if (this.showStepNumbers || this.showStepTitles) {
            this.stepInfo = document.createElement('div');
            this.stepInfo.className = 'step-info';
            this.container.appendChild(this.stepInfo);
        }

        this.updateProgress(this.currentStep);
        
        this.eventBus?.emit('progressBar:rendered', { progressBar: this });
        
        return this.container;
    }

    updateProgress(currentStep) {
        this.currentStep = currentStep;
        
        if (this.progressFill) {
            const progress = (currentStep / (this.totalSteps - 1)) * 100;
            this.progressFill.style.width = `${Math.min(progress, 100)}%`;
        }

        if (this.stepInfo) {
            let infoText = '';
            if (this.showStepNumbers) {
                infoText += `${this.multiStepForm.factory.getText('step')} ${currentStep + 1} ${this.multiStepForm.factory.getText('of')} ${this.totalSteps}`;
            }
            
            if (this.showStepTitles && this.multiStepForm.steps[currentStep]) {
                const stepTitle = this.multiStepForm.steps[currentStep].title;
                if (stepTitle) {
                    if (infoText) infoText += ' - ';
                    infoText += stepTitle;
                }
            }
            this.stepInfo.textContent = infoText;
        }
        
        this.eventBus?.emit('progressBar:updated', { 
            currentStep, 
            totalSteps: this.totalSteps 
        });
    }
}

// ===================================================================
// ENHANCED NAVIGATION BUTTONS
// ===================================================================

class NavigationButtons {
    constructor(multiStepForm) {
        this.multiStepForm = multiStepForm;
        this.factory = multiStepForm.factory;
        this.container = null;
        this.prevButton = null;
        this.nextButton = null;
        this.submitButton = null;
        
        // Get event bus from service container if available
        this.eventBus = this.factory.serviceContainer?.get('eventBus');
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'form-navigation';

        this.prevButton = document.createElement('button');
        this.prevButton.type = 'button';
        this.prevButton.className = 'btn btn-prev';
        this.prevButton.textContent = this.factory.getText('previous');
        this.prevButton.addEventListener('click', () => {
            this.eventBus?.emit('navigation:previousClicked');
            this.multiStepForm.previousStep();
        });

        this.nextButton = document.createElement('button');
        this.nextButton.type = 'button';
        this.nextButton.className = 'btn btn-next';
        this.nextButton.textContent = this.factory.getText('next');
        this.nextButton.addEventListener('click', () => {
            this.eventBus?.emit('navigation:nextClicked');
            this.multiStepForm.nextStep();
        });

        this.submitButton = document.createElement('button');
        this.submitButton.type = 'button';
        this.submitButton.className = 'btn btn-submit';
        this.submitButton.textContent = this.factory.getText('submit');
        this.submitButton.addEventListener('click', () => {
            this.eventBus?.emit('navigation:submitClicked');
            this.multiStepForm.submit();
        });

        this.container.appendChild(this.prevButton);
        this.container.appendChild(this.nextButton);
        this.container.appendChild(this.submitButton);

        this.eventBus?.emit('navigation:rendered', { navigation: this });
        
        return this.container;
    }

    updateButtons(currentStep, totalSteps) {
        this.prevButton.style.display = currentStep > 0 ? 'inline-block' : 'none';
        
        if (currentStep === totalSteps - 1) {
            this.nextButton.style.display = 'none';
            this.submitButton.style.display = 'inline-block';
        } else {
            this.nextButton.style.display = 'inline-block';
            this.submitButton.style.display = 'none';
        }
        
        this.eventBus?.emit('navigation:updated', { 
            currentStep, 
            totalSteps 
        });
    }
}

// ===================================================================
// ENHANCED BASE FIELD CLASS
// ===================================================================

class BaseField {
    constructor(factory, config) {
        this.factory = factory;
        this.id = config.id;
        this.name = config.name || config.id;
        this.label = config.label || '';
        this.required = config.required || false;
        this.placeholder = config.placeholder || '';
        this.value = config.value || config.defaultValue || '';
        this.containerClass = config.containerClass || 'form-group';
        this.onChange = config.onChange || null;
        this.customValidation = config.customValidation || null;
        
        // Enhanced error messaging
        this.customErrorMessage = config.customErrorMessage || null;
        this.customErrorMessages = config.customErrorMessages || {};
        this.infoButton = config.infoButton || null;
        
        // Service injection
        this.serviceContainer = config.serviceContainer;
        this.eventBus = config.eventBus;
        this.validator = config.validator;
        this.formatter = config.formatter;
        this.renderer = config.renderer;
        
        // State management
        this.state = {
            value: this.value,
            isValid: true,
            isDirty: false,
            isTouched: false,
            isVisible: true,
            isDisabled: false,
            errors: []
        };
        
        // DOM elements
        this.element = null;
        this.errorElement = null;
        this.container = null;
        this.infoPanel = null;
        this.infoPanelInstance = null;
        
        // Event listeners cleanup
        this.eventListeners = [];
    }

    // Enhanced state management
    setState(updates) {
        const prevState = { ...this.state };
        this.state = { ...this.state, ...updates };
        
        // Emit state change event
        this.eventBus?.emit('field:stateChange', {
            fieldId: this.id,
            prevState,
            newState: this.state,
            field: this
        });
        
        this.updateUI(updates, prevState);
    }

    updateUI(updates, prevState) {
        if (!this.element) return;

        // Update value in DOM if changed
        if ('value' in updates && updates.value !== prevState.value) {
            const input = this.element.querySelector('input, textarea, select') || this.element;
            if (input.value !== updates.value) {
                input.value = updates.value;
            }
        }

        // Update validation state
        if ('isValid' in updates || 'errors' in updates) {
            this.updateValidationUI();
        }

        // Update visibility
        if ('isVisible' in updates) {
            this.container.style.display = updates.isVisible ? '' : 'none';
        }

        // Update disabled state
        if ('isDisabled' in updates) {
            const input = this.container.querySelector('input, select, button, textarea');
            if (input) {
                input.disabled = updates.isDisabled;
            }
        }
    }

    updateValidationUI() {
        if (!this.errorElement) return;

        const errorText = this.errorElement.querySelector('.error-text');
        if (errorText) {
            if (this.state.errors.length > 0) {
                errorText.textContent = this.state.errors[0];
                this.errorElement.classList.add('show');
            } else {
                this.errorElement.classList.remove('show');
            }
        }

        // Update container validation state
        if (this.container) {
            this.container.classList.toggle('field-invalid', !this.state.isValid);
            this.container.classList.toggle('field-valid', this.state.isValid && this.state.isTouched);
        }
    }

    getFieldErrorMessage(errorType = 'required') {
        if (this.customErrorMessages[errorType]) {
            return this.customErrorMessages[errorType];
        }
        if (errorType === 'required' && this.customErrorMessage) {
            return this.customErrorMessage;
        }
        
        switch (errorType) {
            case 'required':
                return this.factory.getText('fieldRequired');
            case 'email':
                return this.factory.getText('emailInvalid');
            case 'phone':
                return this.factory.getText('phoneInvalid');
            case 'url':
                return this.factory.getText('urlInvalid');
            case 'selectAtLeastOne':
                return this.factory.getText('selectAtLeastOne');
            default:
                return this.factory.getText('fieldRequired');
        }
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = this.containerClass;
        return this.container;
    }

    createLabel() {
        const labelContainer = document.createElement('div');
        labelContainer.className = 'label-container';

        const label = document.createElement('label');
        label.className = 'form-label';
        label.setAttribute('for', this.id);
        label.textContent = this.label;

        if (this.required) {
            label.classList.add('required');
            const requiredSpan = document.createElement('span');
            requiredSpan.className = 'required-indicator';
            label.appendChild(requiredSpan);
        }

        if (this.infoButton) {
            const infoBtn = document.createElement('button');
            infoBtn.className = 'info-button';
            infoBtn.type = 'button';
            infoBtn.setAttribute('aria-label', 'Plus d\'informations');
            infoBtn.innerHTML = SVGIcons.get('INFO');
            
            const clickHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleInfoPanel();
            };
            
            infoBtn.addEventListener('click', clickHandler);
            this.eventListeners.push({ element: infoBtn, event: 'click', handler: clickHandler });
            
            label.appendChild(infoBtn);

            const infoPanel = this.createInfoPanel();
            if (infoPanel) {
                labelContainer.appendChild(label);
                labelContainer.appendChild(infoPanel);
                return labelContainer;
            }
        }

        labelContainer.appendChild(label);
        return labelContainer;
    }

    createQuestionLabel() {
        const labelContainer = document.createElement('div');
        labelContainer.className = 'label-container';

        const label = document.createElement('label');
        label.className = 'question-label';
        label.textContent = this.label;

        if (this.required) {
            label.classList.add('required');
        }

        if (this.infoButton) {
            const infoBtn = document.createElement('button');
            infoBtn.className = 'info-button';
            infoBtn.type = 'button';
            infoBtn.setAttribute('aria-label', 'Plus d\'informations');
            infoBtn.innerHTML = SVGIcons.get('INFO');
            
            const clickHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleInfoPanel();
            };
            
            infoBtn.addEventListener('click', clickHandler);
            this.eventListeners.push({ element: infoBtn, event: 'click', handler: clickHandler });
            
            label.appendChild(infoBtn);

            const infoPanel = this.createInfoPanel();
            if (infoPanel) {
                labelContainer.appendChild(label);
                labelContainer.appendChild(infoPanel);
                return labelContainer;
            }
        }

        labelContainer.appendChild(label);
        return labelContainer;
    }

    createInfoPanel() {
        if (!this.infoButton) return null;

        this.infoPanel = document.createElement('div');
        this.infoPanel.className = 'info-panel';
        this.infoPanel.id = `${this.id}-info`;

        if (this.infoButton.title) {
            const titleEl = document.createElement('div');
            titleEl.className = 'info-title';
            titleEl.textContent = this.infoButton.title;
            this.infoPanel.appendChild(titleEl);
        }

        const contentEl = document.createElement('div');
        contentEl.innerHTML = this.infoButton.content;
        this.infoPanel.appendChild(contentEl);

        const closeButton = document.createElement('button');
        closeButton.className = 'close-info';
        closeButton.type = 'button';
        closeButton.setAttribute('aria-label', 'Fermer');
        closeButton.innerHTML = SVGIcons.get('CLOSE');
        
        const closeHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.hideInfoPanel();
        };
        
        closeButton.addEventListener('click', closeHandler);
        this.eventListeners.push({ element: closeButton, event: 'click', handler: closeHandler });
        
        this.infoPanel.appendChild(closeButton);

        return this.infoPanel;
    }

    toggleInfoPanel() {
        if (!this.infoPanel) return;

        const isCurrentlyShown = this.infoPanel.classList.contains('show');
        if (isCurrentlyShown) {
            this.hideInfoPanel();
        } else {
            this.showInfoPanel();
        }
    }

    showInfoPanel() {
        if (!this.infoPanel) return;

        this.factory.closeAllInfoPanels();
        this.infoPanel.classList.add('show');
        
        this.infoPanelInstance = {
            element: this.infoPanel,
            button: this.container.querySelector('.info-button'),
            close: () => this.hideInfoPanel()
        };
        
        this.factory.registerInfoPanel(this.infoPanelInstance);
        
        this.eventBus?.emit('field:infoPanelShown', { fieldId: this.id });
    }

    hideInfoPanel() {
        if (this.infoPanel) {
            this.infoPanel.classList.remove('show');
            if (this.infoPanelInstance) {
                this.factory.unregisterInfoPanel(this.infoPanelInstance);
                this.infoPanelInstance = null;
            }
            
            this.eventBus?.emit('field:infoPanelHidden', { fieldId: this.id });
        }
    }

    createErrorElement() {
        this.errorElement = document.createElement('div');
        this.errorElement.className = 'error-message';
        this.errorElement.id = `error-${this.id}`;
        this.errorElement.innerHTML = `
            <div class="error-icon">!</div>
            <span class="error-text">${this.getFieldErrorMessage('required')}</span>
        `;
        return this.errorElement;
    }

    showError(message) {
        const errors = Array.isArray(message) ? message : [message || this.getFieldErrorMessage('required')];
        
        this.setState({
            isValid: false,
            errors: errors
        });
        
        this.eventBus?.emit('field:errorShown', { 
            fieldId: this.id, 
            errors 
        });
    }

    hideError() {
        this.setState({
            isValid: true,
            errors: []
        });
        
        this.eventBus?.emit('field:errorHidden', { fieldId: this.id });
    }

    async validate() {
        if (this.validator) {
            // Use enhanced validation engine
            const rules = {};
            if (this.required) rules.required = true;
            if (this.customValidation) rules.custom = this.customValidation;
            
            const result = await this.validator.validate(this.getValue(), rules);
            
            this.setState({
                isValid: result.isValid,
                errors: result.errors
            });
            
            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: result,
                field: this
            });
            
            return result.isValid;
        } else {
            // Fallback to original validation
            if (this.required && !this.getValue()) {
                this.showError(this.getFieldErrorMessage('required'));
                return false;
            }
            
            if (this.customValidation) {
                const result = this.customValidation(this.getValue());
                if (result !== true) {
                    this.showError(result);
                    return false;
                }
            }
            
            this.hideError();
            return true;
        }
    }

    getValue() {
        return this.state.value;
    }

    setValue(value, options = {}) {
        this.setState({
            value: value,
            isDirty: !options.silent,
            isTouched: this.state.isTouched || !options.silent
        });
        
        if (this.element) {
            const input = this.element.querySelector('input, textarea, select') || this.element;
            if (input && input.value !== value) {
                input.value = value;
            }
        }
        
        if (!options.silent) {
            this.eventBus?.emit('field:valueChange', {
                fieldId: this.id,
                value: value,
                prevValue: this.state.value,
                field: this
            });
        }
    }

    handleChange() {
        const currentValue = this.getValue();
        
        this.setState({
            value: currentValue,
            isDirty: true,
            isTouched: true
        });
        
        if (this.onChange) {
            this.onChange(currentValue);
        }
        
        if (this.factory.onChangeCallback) {
            this.factory.onChangeCallback(this.name, currentValue);
        }
        
        this.factory.formValues[this.name] = currentValue;
        
        this.eventBus?.emit('field:valueChange', {
            fieldId: this.id,
            value: currentValue,
            field: this
        });
    }

    show() {
        this.setState({ isVisible: true });
    }

    hide() {
        this.setState({ isVisible: false });
    }

    enable() {
        this.setState({ isDisabled: false });
    }

    disable() {
        this.setState({ isDisabled: true });
    }

    cleanup() {
        this.hideInfoPanel();
        
        // Clean up event listeners
        this.eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.eventListeners = [];
        
        this.eventBus?.emit('field:cleanup', { fieldId: this.id });
    }

    render() {
        throw new Error('render() method must be implemented by subclass');
    }

    resetToInitial() {
        this.setValue(this.defaultValue || '');
        this.hideError();
        
        this.setState({
            isDirty: false,
            isTouched: false
        });
        
        this.eventBus?.emit('field:reset', { fieldId: this.id });
    }

    clearVisualState() {
        this.hideError();
        this.hideInfoPanel();
    }
}

// ===================================================================
// ENHANCED TAB MANAGER
// ===================================================================

class TabManager extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        this.tabs = config.tabs || [];
        this.activeTabId = config.activeTabId || (this.tabs[0]?.id);
        this.tabStyle = config.tabStyle || 'default';
        this.orientation = config.orientation || 'horizontal';
        this.tabFieldInstances = new Map();
        this.tabContainers = new Map();
        this.onTabChange = config.onTabChange || null;
        this.allowValidation = config.allowValidation !== false;
        this.tabEventListeners = [];
    }

    validate() {
        if (!this.allowValidation) return true;

        const validateAllTabs = this.config.validateAllTabs || false;
        if (validateAllTabs) {
            let isValid = true;
            this.tabFieldInstances.forEach((fields, tabId) => {
                fields.forEach(field => {
                    if (!field.validate()) {
                        isValid = false;
                    }
                });
            });
            return isValid;
        } else {
            const activeFields = this.tabFieldInstances.get(this.activeTabId) || [];
            return activeFields.every(field => field.validate());
        }
    }

    render() {
        const container = this.createContainer();

        const tabNav = this.createTabNavigation();
        container.appendChild(tabNav);

        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content-area';

        this.tabs.forEach(tab => {
            const tabContainer = this.createTabContent(tab);
            this.tabContainers.set(tab.id, tabContainer);
            tabContent.appendChild(tabContainer);
        });

        container.appendChild(tabContent);

        const errorElement = this.createErrorElement();
        container.appendChild(errorElement);

        this.setActiveTab(this.activeTabId, false);
        this.container = container;
        
        this.eventBus?.emit('tabManager:rendered', { tabManager: this });
        
        return container;
    }

    createTabNavigation() {
        const navContainer = document.createElement('div');
        navContainer.className = `tab-navigation ${this.tabStyle} ${this.orientation}`;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'tab-buttons-container';

        this.tabs.forEach(tab => {
            const tabButton = document.createElement('button');
            tabButton.type = 'button';
            tabButton.className = 'tab-button';
            tabButton.dataset.tabId = tab.id;
            tabButton.textContent = tab.label;

            if (tab.id === this.activeTabId) {
                tabButton.classList.add('active');
            }

            const clickHandler = (e) => {
                e.preventDefault();
                this.setActiveTab(tab.id);
            };
            
            tabButton.addEventListener('click', clickHandler);
            this.tabEventListeners.push({
                element: tabButton,
                event: 'click',
                handler: clickHandler
            });

            buttonContainer.appendChild(tabButton);
        });

        navContainer.appendChild(buttonContainer);
        return navContainer;
    }

    createTabContent(tab) {
        const tabContainer = document.createElement('div');
        tabContainer.className = 'tab-content';
        tabContainer.dataset.tabId = tab.id;
        tabContainer.style.display = tab.id === this.activeTabId ? 'block' : 'none';

        if (tab.customContent && typeof tab.customContent === 'function') {
            tab.customContent(tabContainer, this);
        } else if (tab.customContent) {
            tabContainer.innerHTML = tab.customContent;
        } else if (tab.fields && Array.isArray(tab.fields)) {
            this.createTabFields(tab, tabContainer);
        }

        return tabContainer;
    }

    createTabFields(tab, container) {
        const fieldInstances = [];
        const fieldGroups = this.groupFieldsByRow(tab.fields);

        fieldGroups.forEach(group => {
            if (group.isRow) {
                const rowContainer = document.createElement('div');
                rowContainer.className = 'field-row';
                
                group.fields.forEach(fieldConfig => {
                    const colContainer = document.createElement('div');
                    colContainer.className = 'field-col';
                    const field = this.createFieldInstance(fieldConfig, tab.id);
                    if (field) {
                        fieldInstances.push(field);
                        colContainer.appendChild(field.render());
                    }
                    rowContainer.appendChild(colContainer);
                });
                container.appendChild(rowContainer);
            } else {
                const field = this.createFieldInstance(group.fields[0], tab.id);
                if (field) {
                    fieldInstances.push(field);
                    container.appendChild(field.render());
                }
            }
        });

        this.tabFieldInstances.set(tab.id, fieldInstances);
    }

    groupFieldsByRow(fields) {
        const groups = [];
        let i = 0;

        while (i < fields.length) {
            const currentField = fields[i];
            if (currentField.row) {
                const rowFields = [];
                let j = i;
                while (j < fields.length && fields[j].row === currentField.row) {
                    rowFields.push(fields[j]);
                    j++;
                }
                groups.push({
                    isRow: true,
                    fields: rowFields
                });
                i = j;
                continue;
            }

            groups.push({
                isRow: false,
                fields: [currentField]
            });
            i++;
        }

        return groups;
    }

    createFieldInstance(fieldConfig, tabId) {
        const enhancedConfig = {
            ...fieldConfig,
            id: `${tabId}-${fieldConfig.id}`,
            onChange: (value) => {
                if (fieldConfig.onChange) {
                    fieldConfig.onChange(value, tabId, this);
                }
                this.handleFieldChange(tabId, fieldConfig.name || fieldConfig.id, value);
            }
        };

        return this.factory.createField(enhancedConfig);
    }

    handleFieldChange(tabId, fieldName, value) {
        if (!this.value) this.value = {};
        if (!this.value[tabId]) this.value[tabId] = {};
        this.value[tabId][fieldName] = value;

        this.handleChange();

        const tab = this.tabs.find(t => t.id === tabId);
        if (tab && tab.onFieldChange) {
            tab.onFieldChange(fieldName, value, tabId, this);
        }
        
        this.eventBus?.emit('tabManager:fieldChange', {
            tabId,
            fieldName,
            value,
            tabManager: this
        });
    }

    setActiveTab(tabId, triggerCallbacks = true) {
        const previousTabId = this.activeTabId;
        if (previousTabId === tabId) return;

        if (triggerCallbacks && previousTabId) {
            const previousTab = this.tabs.find(t => t.id === previousTabId);
            if (previousTab && previousTab.onDeactivate) {
                previousTab.onDeactivate(previousTabId, this);
            }
        }

        this.activeTabId = tabId;

        this.container.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tabId === tabId);
        });

        this.tabContainers.forEach((container, currentTabId) => {
            container.style.display = currentTabId === tabId ? 'block' : 'none';
        });

        if (triggerCallbacks) {
            const activeTab = this.tabs.find(t => t.id === tabId);
            if (activeTab && activeTab.onActivate) {
                activeTab.onActivate(tabId, this);
            }

            if (this.onTabChange) {
                this.onTabChange(tabId, previousTabId, this);
            }
            
            this.eventBus?.emit('tabManager:tabChanged', {
                activeTabId: tabId,
                previousTabId: previousTabId,
                tabManager: this
            });
        }

        this.handleChange();
    }

    getValue() {
        const allValues = {};
        this.tabFieldInstances.forEach((fields, tabId) => {
            allValues[tabId] = {};
            fields.forEach(field => {
                const fieldName = field.name;
                allValues[tabId][fieldName] = field.getValue();
            });
        });

        return {
            activeTab: this.activeTabId,
            tabs: allValues,
            ...allValues
        };
    }

    setValue(value) {
        if (!value || typeof value !== 'object') return;

        if (value.activeTab) {
            this.setActiveTab(value.activeTab, false);
        }

        const tabValues = value.tabs || value;
        this.tabFieldInstances.forEach((fields, tabId) => {
            const tabData = tabValues[tabId];
            if (tabData && typeof tabData === 'object') {
                fields.forEach(field => {
                    const fieldName = field.name;
                    if (tabData[fieldName] !== undefined) {
                        field.setValue(tabData[fieldName]);
                    }
                });
            }
        });

        this.value = value;
    }

    getTabValues(tabId) {
        const fields = this.tabFieldInstances.get(tabId);
        if (!fields) return {};
        
        const values = {};
        fields.forEach(field => {
            values[field.name] = field.getValue();
        });
        return values;
    }

    setTabValues(tabId, values) {
        const fields = this.tabFieldInstances.get(tabId);
        if (!fields || !values) return;
        
        fields.forEach(field => {
            if (values[field.name] !== undefined) {
                field.setValue(values[field.name]);
            }
        });
    }

    getField(tabId, fieldName) {
        const fields = this.tabFieldInstances.get(tabId);
        if (!fields) return null;
        return fields.find(field => field.name === fieldName);
    }

    addTab(tabConfig) {
        this.tabs.push(tabConfig);
        if (this.container) {
            const buttonContainer = this.container.querySelector('.tab-buttons-container');
            const tabContent = this.container.querySelector('.tab-content-area');

            const tabButton = document.createElement('button');
            tabButton.type = 'button';
            tabButton.className = 'tab-button';
            tabButton.dataset.tabId = tabConfig.id;
            tabButton.textContent = tabConfig.label;

            const clickHandler = (e) => {
                e.preventDefault();
                this.setActiveTab(tabConfig.id);
            };
            
            tabButton.addEventListener('click', clickHandler);
            this.tabEventListeners.push({
                element: tabButton,
                event: 'click',
                handler: clickHandler
            });

            buttonContainer.appendChild(tabButton);

            const tabContainer = this.createTabContent(tabConfig);
            this.tabContainers.set(tabConfig.id, tabContainer);
            tabContent.appendChild(tabContainer);
        }
        
        this.eventBus?.emit('tabManager:tabAdded', { 
            tabConfig, 
            tabManager: this 
        });
    }

    removeTab(tabId) {
        this.tabs = this.tabs.filter(tab => tab.id !== tabId);
        
        if (this.container) {
            const tabButton = this.container.querySelector(`.tab-button[data-tab-id="${tabId}"]`);
            if (tabButton) {
                this.tabEventListeners = this.tabEventListeners.filter(listener => {
                    if (listener.element === tabButton) {
                        tabButton.removeEventListener(listener.event, listener.handler);
                        return false;
                    }
                    return true;
                });
                tabButton.remove();
            }

            const tabContainer = this.tabContainers.get(tabId);
            if (tabContainer) {
                tabContainer.remove();
                this.tabContainers.delete(tabId);
            }

            this.tabFieldInstances.delete(tabId);

            if (this.activeTabId === tabId && this.tabs.length > 0) {
                this.setActiveTab(this.tabs[0].id);
            }
        }
        
        this.eventBus?.emit('tabManager:tabRemoved', { 
            tabId, 
            tabManager: this 
        });
    }

    cleanup() {
        this.tabEventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.tabEventListeners = [];

        this.tabFieldInstances.forEach(fields => {
            fields.forEach(field => {
                if (field.cleanup) field.cleanup();
            });
        });

        super.cleanup();
    }

    destroy() {
        this.cleanup();
        this.tabFieldInstances.clear();
        this.tabContainers.clear();
        
        this.eventBus?.emit('tabManager:destroyed', { tabManager: this });
    }
}

// ===================================================================
// ENHANCED DATA PROCESSORS AND TRANSFORMERS
// ===================================================================

class FormDataProcessor {
    constructor(creatFormInstance) {
        this.creatFormInstance = creatFormInstance;
        this.cache = new Map();
        this.processors = new Map();
        
        this.registerBuiltInProcessors();
    }

    registerBuiltInProcessors() {
        this.processors.set('yesno-with-options', new YesNoWithOptionsProcessor());
        this.processors.set('category-item-filter', new CategoryItemFilterProcessor());
        this.processors.set('service-request-calendar', new ServiceRequestCalendarProcessor());
        this.processors.set('multiselect', new MultiSelectProcessor());
        this.processors.set('select-with-other', new SelectWithOtherProcessor());
        this.processors.set('complex-object', new ComplexObjectProcessor());
    }

    async processFormData(formData, options = {}) {
        const cacheKey = this.createCacheKey(formData, options);
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const result = {};
        const fieldConfigurations = await this.getFieldConfigurations();

        for (const [fieldId, value] of Object.entries(formData)) {
            const fieldConfig = this.findFieldConfiguration(fieldId, fieldConfigurations);
            
            if (fieldConfig && this.shouldProcessValue(value)) {
                result[fieldId] = await this.processFieldValue(fieldConfig, value, formData);
            }
        }

        this.cache.set(cacheKey, result);
        
        // Emit processing complete event
        this.creatFormInstance.eventBus?.emit('dataProcessor:complete', {
            originalData: formData,
            processedData: result,
            options
        });

        return result;
    }

    async processFieldValue(fieldConfig, value, formData) {
        const processor = this.processors.get(fieldConfig.type) || this.processors.get('default');
        
        if (!processor) {
            return this.createBasicFieldData(fieldConfig, value);
        }

        const structuredValue = await processor.process(value, fieldConfig, formData);
        
        return {
            fieldId: fieldConfig.id || fieldConfig.name,
            fieldType: fieldConfig.type,
            label: await this.getFieldLabel(fieldConfig),
            displayValue: structuredValue.displayValue,
            rawValue: structuredValue.rawValue,
            metadata: structuredValue.metadata || {},
            ...structuredValue.hasSubFields && {
                mainValue: structuredValue.mainValue,
                mainDisplayValue: structuredValue.mainDisplayValue,
                subFields: structuredValue.subFields
            },
            ...Array.isArray(structuredValue.displayValue) && {
                array: structuredValue.displayValue,
                string: structuredValue.displayValue.join(", "),
                count: structuredValue.displayValue.length
            }
        };
    }

    async getFieldConfigurations() {
        return this.creatFormInstance.formConfig?.getFieldConfigurations?.() || [];
    }

    findFieldConfiguration(fieldName, fieldConfigurations) {
        return fieldConfigurations.find(config =>
            (config.name === fieldName) || (config.id === fieldName)
        ) || null;
    }

    shouldProcessValue(value) {
        if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) {
            return false;
        }
        return true;
    }

    createBasicFieldData(fieldConfig, value) {
        return {
            fieldId: fieldConfig.id || fieldConfig.name,
            fieldType: fieldConfig.type || 'unknown',
            label: fieldConfig.label || fieldConfig.id,
            displayValue: this.creatFormInstance.fieldFormatter?.formatValue(value, fieldConfig) || String(value),
            rawValue: value,
            metadata: {}
        };
    }

    async getFieldLabel(fieldConfig) {
        return fieldConfig.label || fieldConfig.id;
    }

    createCacheKey(formData, options) {
        return JSON.stringify({ formData, options });
    }

    clearCache() {
        this.cache.clear();
    }
}

class FieldValueFormatter {
    constructor(creatFormInstance) {
        this.creatFormInstance = creatFormInstance;
        this.formatters = new Map();
        
        this.registerBuiltInFormatters();
    }

    registerBuiltInFormatters() {
        this.formatters.set('text', (value) => String(value));
        this.formatters.set('email', (value) => String(value).toLowerCase());
        this.formatters.set('phone', (value) => this.formatPhoneNumber(value));
        this.formatters.set('number', (value) => Number(value));
        this.formatters.set('percentage', (value) => `${value}%`);
        this.formatters.set('currency', (value) => `${Number(value).toFixed(2)}`);
        this.formatters.set('date', (value) => new Date(value).toLocaleDateString());
        this.formatters.set('datetime', (value) => new Date(value).toLocaleString());
    }

    formatValue(fieldConfig, value, context = {}) {
        if (value === undefined || value === null || value === '') {
            return '';
        }

        const type = fieldConfig.type || 'text';
        const formatter = this.formatters.get(type);
        
        if (formatter) {
            try {
                return formatter(value, fieldConfig, context);
            } catch (error) {
                console.warn(`Error formatting value with ${type} formatter:`, error);
            }
        }

        // Fallback formatting
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        
        if (typeof value === 'object') {
            if (value.main !== undefined) {
                return value.main === true || value.main === 'yes' ? 'Yes' : 'No';
            }
            if (value.main && value.other) {
                return value.main === 'other' ? value.other : value.main;
            }
            return JSON.stringify(value);
        }

        return String(value);
    }

    formatPhoneNumber(phoneNumber) {
        const cleaned = String(phoneNumber).replace(/\D/g, '');
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
        return phoneNumber;
    }

    registerFormatter(type, formatter) {
        this.formatters.set(type, formatter);
    }
}

class BaseDataTransformer {
    constructor(creatFormInstance) {
        this.creatFormInstance = creatFormInstance;
        this.config = creatFormInstance.config;
        this.language = this.config.language || 'en';
    }

    transform(formData) {
        try {
            const processedData = this.creatFormInstance.dataProcessor.processFormData(formData);
            
            return {
                submissionType: this.config.formType === "booking" ? "booking_form" : "submission_form",
                formVersion: this.creatFormInstance.defaultConfig?.FORM_VERSION || '2.0.0',
                submissionTimestamp: new Date().toISOString(),
                language: this.language,
                timezone: this.config.timezone || 'UTC',
                formData: processedData,
                metadata: this.generateMetadata(formData, processedData)
            };
        } catch (error) {
            console.error('Data transformation error:', error);
            throw error;
        }
    }

    generateMetadata(originalData, processedData) {
        return {
            transformationTimestamp: new Date().toISOString(),
            transformerType: this.constructor.name,
            totalFields: Object.keys(originalData).length,
            processedFields: Object.keys(processedData).length,
            language: this.language,
            version: this.getVersion()
        };
    }

    getVersion() {
        return this.config.version || '2.0.0';
    }
}

// Data processor implementations
class YesNoWithOptionsProcessor {
    async process(value, fieldConfig, formData) {
        if (typeof value === 'object' && value.main !== undefined) {
            return {
                displayValue: value.main === true || value.main === 'yes' ? 'Yes' : 'No',
                rawValue: value,
                hasSubFields: !!value.subFields,
                mainValue: value.main,
                mainDisplayValue: value.main === true || value.main === 'yes' ? 'Yes' : 'No',
                subFields: value.subFields || {}
            };
        }
        return {
            displayValue: value === true || value === 'yes' ? 'Yes' : 'No',
            rawValue: value
        };
    }
}

class MultiSelectProcessor {
    async process(value, fieldConfig, formData) {
        if (Array.isArray(value)) {
            return {
                displayValue: value,
                rawValue: value,
                count: value.length
            };
        }
        return {
            displayValue: [value],
            rawValue: value,
            count: 1
        };
    }
}

class SelectWithOtherProcessor {
    async process(value, fieldConfig, formData) {
        if (typeof value === 'object' && value.main && value.other) {
            return {
                displayValue: value.main === 'other' ? value.other : value.main,
                rawValue: value,
                isOther: value.main === 'other'
            };
        }
        return {
            displayValue: value,
            rawValue: value,
            isOther: false
        };
    }
}

class CategoryItemFilterProcessor {
    async process(value, fieldConfig, formData) {
        return {
            displayValue: value,
            rawValue: value,
            metadata: {
                fieldType: 'category-item-filter'
            }
        };
    }
}

class ServiceRequestCalendarProcessor {
    async process(value, fieldConfig, formData) {
        return {
            displayValue: value,
            rawValue: value,
            metadata: {
                fieldType: 'service-request-calendar'
            }
        };
    }
}

class ComplexObjectProcessor {
    async process(value, fieldConfig, formData) {
        return {
            displayValue: JSON.stringify(value),
            rawValue: value,
            metadata: {
                fieldType: 'complex-object',
                objectKeys: Object.keys(value || {})
            }
        };
    }
}

// Concrete field implementations (examples)
class TextField extends BaseField {
    render() {
        const container = this.createContainer();
        
        if (this.label) {
            container.appendChild(this.createLabel());
        }

        this.element = document.createElement('input');
        this.element.type = 'text';
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.className = 'form-input';
        this.element.placeholder = this.placeholder;
        this.element.value = this.state.value;

        if (this.required) {
            this.element.required = true;
        }

        const changeHandler = () => {
            this.setState({ value: this.element.value });
            this.handleChange();
        };

        this.element.addEventListener('input', changeHandler);
        this.element.addEventListener('change', changeHandler);
        this.eventListeners.push(
            { element: this.element, event: 'input', handler: changeHandler },
            { element: this.element, event: 'change', handler: changeHandler }
        );

        container.appendChild(this.element);
        container.appendChild(this.createErrorElement());

        return container;
    }

    getValue() {
        return this.element ? this.element.value : this.state.value;
    }
}

class EmailField extends TextField {
    constructor(factory, config) {
        super(factory, { ...config, type: 'email' });
    }

    render() {
        const container = super.render();
        if (this.element) {
            this.element.type = 'email';
        }
        return container;
    }

    async validate() {
        const isValid = await super.validate();
        if (!isValid) return false;

        const value = this.getValue();
        if (value && !FormFieldFactory.ValidationUtils.isValidEmail(value)) {
            this.showError(this.getFieldErrorMessage('email'));
            return false;
        }

        return true;
    }
}

class NumberField extends TextField {
    constructor(factory, config) {
        super(factory, { ...config, type: 'number' });
    }

    render() {
        const container = super.render();
        if (this.element) {
            this.element.type = 'number';
        }
        return container;
    }

    getValue() {
        const value = this.element ? this.element.value : this.state.value;
        return value === '' ? null : Number(value);
    }
}

class PhoneField extends TextField {
    constructor(factory, config) {
        super(factory, { ...config, type: 'phone' });
    }

    async validate() {
        const isValid = await super.validate();
        if (!isValid) return false;

        const value = this.getValue();
        if (value && !FormFieldFactory.ValidationUtils.isValidPhoneNumber(value)) {
            this.showError(this.getFieldErrorMessage('phone'));
            return false;
        }

        return true;
    }
}

class UrlField extends TextField {
    constructor(factory, config) {
        super(factory, { ...config, type: 'url' });
    }

    async validate() {
        const isValid = await super.validate();
        if (!isValid) return false;

        const value = this.getValue();
        if (value && !FormFieldFactory.ValidationUtils.isValidUrl(value)) {
            this.showError(this.getFieldErrorMessage('url'));
            return false;
        }

        return true;
    }
}

class TextAreaField extends BaseField {
    render() {
        const container = this.createContainer();
        
        if (this.label) {
            container.appendChild(this.createLabel());
        }

        this.element = document.createElement('textarea');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.className = 'form-textarea';
        this.element.placeholder = this.placeholder;
        this.element.value = this.state.value;

        if (this.required) {
            this.element.required = true;
        }

        const changeHandler = () => {
            this.setState({ value: this.element.value });
            this.handleChange();
        };

        this.element.addEventListener('input', changeHandler);
        this.element.addEventListener('change', changeHandler);
        this.eventListeners.push(
            { element: this.element, event: 'input', handler: changeHandler },
            { element: this.element, event: 'change', handler: changeHandler }
        );

        container.appendChild(this.element);
        container.appendChild(this.createErrorElement());

        return container;
    }

    getValue() {
        return this.element ? this.element.value : this.state.value;
    }
}

class PercentageField extends NumberField {
    constructor(factory, config) {
        super(factory, { ...config, type: 'percentage' });
    }

    render() {
        const container = super.render();
        
        if (this.element) {
            this.element.min = '0';
            this.element.max = '100';
            this.element.step = '1';
        }

        return container;
    }
}


/**
 * Enhanced Selection Field Classes with Modern Architecture
 * Integrates dependency injection, event-driven architecture, and advanced state management
 */

/**
 * YesNoField - Generalized Yes/No field with custom options support
 */
class YesNoField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Support for custom options
        this.customOptions = config.customOptions || null;
        
        // If customOptions provided, use them, otherwise default to yes/no
        if (this.customOptions && Array.isArray(this.customOptions) && this.customOptions.length === 2) {
            this.yesOption = this.customOptions[0];
            this.noOption = this.customOptions[1];
        } else {
            this.yesOption = {
                value: 'yes',
                label: factory.getText('yes')
            };
            this.noOption = {
                value: 'no',
                label: factory.getText('no')
            };
        }
        
        // Initialize state with default value
        this.setState({
            value: this.value || ''
        });
    }

    async validate() {
        if (this.validator) {
            // Use enhanced validation engine
            const rules = {};
            if (this.required) rules.required = true;
            if (this.customValidation) rules.custom = this.customValidation;
            
            const result = await this.validator.validate(this.getValue(), rules);
            
            this.setState({
                isValid: result.isValid,
                errors: result.errors
            });
            
            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: result,
                field: this
            });
            
            return result.isValid;
        } else {
            // Fallback validation
            if (this.required && !this.getValue()) {
                this.showError(this.getFieldErrorMessage('required'));
                return false;
            }
            this.hideError();
            return true;
        }
    }

    render() {
        const container = this.createContainer();
        const labelContainer = this.createQuestionLabel();
        
        const optionsGroup = document.createElement('div');
        optionsGroup.className = 'options-group';

        const yesOption = document.createElement('label');
        yesOption.className = 'radio-option';
        yesOption.innerHTML = `
            <input type="radio" name="${this.name}" value="${this.yesOption.value}" />
            <span class="radio-icon"></span>
            <span class="radio-label">${this.yesOption.label}</span>
        `;

        const noOption = document.createElement('label');
        noOption.className = 'radio-option';
        noOption.innerHTML = `
            <input type="radio" name="${this.name}" value="${this.noOption.value}" />
            <span class="radio-icon"></span>
            <span class="radio-label">${this.noOption.label}</span>
        `;

        optionsGroup.appendChild(yesOption);
        optionsGroup.appendChild(noOption);

        const errorElement = this.createErrorElement();

        container.appendChild(labelContainer);
        container.appendChild(optionsGroup);
        container.appendChild(errorElement);

        const radioInputs = container.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(radio => {
            const changeHandler = () => {
                this.setState({ 
                    value: radio.value,
                    isDirty: true,
                    isTouched: true 
                });
                this.hideError();
                this.handleChange();
            };
            
            radio.addEventListener('change', changeHandler);
            this.eventListeners.push({ element: radio, event: 'change', handler: changeHandler });
        });

        this.container = container;
        this.element = optionsGroup;
        return container;
    }

    getValue() {
        if (this.container) {
            const checkedRadio = this.container.querySelector('input[type="radio"]:checked');
            return checkedRadio ? checkedRadio.value : '';
        }
        return this.state.value;
    }

    setValue(value) {
        this.setState({ 
            value: value,
            isDirty: false 
        });
        
        if (this.container) {
            const radio = this.container.querySelector(`input[value="${value}"]`);
            if (radio) radio.checked = true;
        }
    }

    // Get display value for the current selection
    getDisplayValue() {
        const currentValue = this.getValue();
        if (currentValue === this.yesOption.value) {
            return this.yesOption.label;
        } else if (currentValue === this.noOption.value) {
            return this.noOption.label;
        }
        return currentValue;
    }
}

/**
 * YesNoWithOptionsField - Enhanced with proper state management and service integration
 */
class YesNoWithOptionsField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        this.yesFieldConfig = config.yesField || null;
        this.noFieldConfig = config.noField || null;
        this.yesFieldsConfig = config.yesFields || (config.yesField ? [config.yesField] : []);
        this.noFieldsConfig = config.noFields || (config.noField ? [config.noField] : []);
        this.layout = config.layout || 'below';
        this.customOptions = config.customOptions || null;
        
        // Set up option values and labels
        if (this.customOptions && Array.isArray(this.customOptions) && this.customOptions.length === 2) {
            this.yesOption = this.customOptions[0];
            this.noOption = this.customOptions[1];
        } else {
            this.yesOption = {
                value: 'yes',
                label: this.factory.getText('yes')
            };
            this.noOption = {
                value: 'no',
                label: this.factory.getText('no')
            };
        }
        
        this.yesFieldInstances = [];
        this.noFieldInstances = [];
        
        // Initialize complex state
        this.setState({
            value: { main: null },
            isValid: true,
            errors: []
        });
    }

    async validate() {
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            
            const result = await this.validator.validate(this.getValue().main, rules);
            
            let isValid = result.isValid;
            let errors = [...result.errors];

            // Validate conditional fields
            const currentValue = this.getValue();
            if (currentValue.main === this.yesOption.value && this.yesContainer && this.yesContainer.style.display === 'block') {
                for (const fieldInstance of this.yesFieldInstances) {
                    if (!(await fieldInstance.validate())) {
                        isValid = false;
                    }
                }
            }

            if (currentValue.main === this.noOption.value && this.noContainer && this.noContainer.style.display === 'block') {
                for (const fieldInstance of this.noFieldInstances) {
                    if (!(await fieldInstance.validate())) {
                        isValid = false;
                    }
                }
            }
            
            this.setState({
                isValid: isValid,
                errors: errors
            });

            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: { isValid, errors },
                field: this
            });

            return isValid;
        } else {
            // Fallback validation
            if (this.required && !this.getValue().main) {
                this.showError(this.getFieldErrorMessage('required'));
                return false;
            }

            let isValid = true;
            const currentValue = this.getValue();
            
            if (currentValue.main === this.yesOption.value && this.yesContainer && this.yesContainer.style.display === 'block') {
                for (const fieldInstance of this.yesFieldInstances) {
                    if (!(await fieldInstance.validate())) {
                        isValid = false;
                    }
                }
            }

            if (currentValue.main === this.noOption.value && this.noContainer && this.noContainer.style.display === 'block') {
                for (const fieldInstance of this.noFieldInstances) {
                    if (!(await fieldInstance.validate())) {
                        isValid = false;
                    }
                }
            }

            if (isValid) {
                this.hideError();
            }

            return isValid;
        }
    }

    render() {
        const container = this.createContainer();
        const label = this.createQuestionLabel();
        
        const optionsGroup = document.createElement('div');
        optionsGroup.className = 'options-group';

        const yesOption = document.createElement('label');
        yesOption.className = 'radio-option';
        yesOption.innerHTML = `
            <input type="radio" name="${this.name}" value="${this.yesOption.value}" />
            <span class="radio-icon"></span>
            <span class="radio-label">${this.yesOption.label}</span>
        `;

        const noOption = document.createElement('label');
        noOption.className = 'radio-option';
        noOption.innerHTML = `
            <input type="radio" name="${this.name}" value="${this.noOption.value}" />
            <span class="radio-icon"></span>
            <span class="radio-label">${this.noOption.label}</span>
        `;

        optionsGroup.appendChild(yesOption);
        optionsGroup.appendChild(noOption);

        let conditionalContainer;
        if (this.layout === 'side-by-side' && this.yesFieldsConfig.length > 0 && this.noFieldsConfig.length > 0) {
            conditionalContainer = document.createElement('div');
            conditionalContainer.className = 'conditional-side-by-side';
        } else {
            conditionalContainer = document.createElement('div');
        }

        let yesContainer = null;
        if (this.yesFieldsConfig.length > 0) {
            yesContainer = document.createElement('div');
            yesContainer.className = 'conditional-field-wrapper';
            yesContainer.id = `${this.id}-yes-options`;
            yesContainer.style.display = 'none';

            const yesFieldGroups = this.groupFields(this.yesFieldsConfig);
            yesFieldGroups.forEach(group => {
                if (group.isRow) {
                    const rowContainer = document.createElement('div');
                    rowContainer.className = 'field-row';
                    
                    group.fields.forEach((fieldConfig) => {
                        const colContainer = document.createElement('div');
                        colContainer.className = 'field-col';
                        const fieldInstance = this.createFieldInstance(fieldConfig, `yes-${this.yesFieldInstances.length}`);
                        if (fieldInstance) {
                            this.yesFieldInstances.push(fieldInstance);
                            colContainer.appendChild(fieldInstance.render());
                        }
                        rowContainer.appendChild(colContainer);
                    });
                    yesContainer.appendChild(rowContainer);
                } else {
                    const fieldInstance = this.createFieldInstance(group.fields[0], `yes-${this.yesFieldInstances.length}`);
                    if (fieldInstance) {
                        this.yesFieldInstances.push(fieldInstance);
                        yesContainer.appendChild(fieldInstance.render());
                    }
                }
            });
        }

        let noContainer = null;
        if (this.noFieldsConfig.length > 0) {
            noContainer = document.createElement('div');
            noContainer.className = 'conditional-field-wrapper';
            noContainer.id = `${this.id}-no-options`;
            noContainer.style.display = 'none';

            const noFieldGroups = this.groupFields(this.noFieldsConfig);
            noFieldGroups.forEach(group => {
                if (group.isRow) {
                    const rowContainer = document.createElement('div');
                    rowContainer.className = 'field-row';
                    
                    group.fields.forEach((fieldConfig) => {
                        const colContainer = document.createElement('div');
                        colContainer.className = 'field-col';
                        const fieldInstance = this.createFieldInstance(fieldConfig, `no-${this.noFieldInstances.length}`);
                        if (fieldInstance) {
                            this.noFieldInstances.push(fieldInstance);
                            colContainer.appendChild(fieldInstance.render());
                        }
                        rowContainer.appendChild(colContainer);
                    });
                    noContainer.appendChild(rowContainer);
                } else {
                    const fieldInstance = this.createFieldInstance(group.fields[0], `no-${this.noFieldInstances.length}`);
                    if (fieldInstance) {
                        this.noFieldInstances.push(fieldInstance);
                        noContainer.appendChild(fieldInstance.render());
                    }
                }
            });
        }

        if (yesContainer) conditionalContainer.appendChild(yesContainer);
        if (noContainer) conditionalContainer.appendChild(noContainer);

        const errorElement = this.createErrorElement();

        container.appendChild(label);
        container.appendChild(optionsGroup);
        if (yesContainer || noContainer) {
            container.appendChild(conditionalContainer);
        }
        container.appendChild(errorElement);

        const radioInputs = container.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(radio => {
            const changeHandler = () => {
                const newValue = { main: radio.value };
                this.setState({ 
                    value: newValue,
                    isDirty: true,
                    isTouched: true 
                });
                
                this.hideError();

                const isYesValue = radio.value === this.yesOption.value;
                const isNoValue = radio.value === this.noOption.value;

                if (isYesValue) {
                    if (yesContainer) yesContainer.style.display = 'block';
                    if (noContainer) noContainer.style.display = 'none';
                } else if (isNoValue) {
                    if (yesContainer) yesContainer.style.display = 'none';
                    if (noContainer) noContainer.style.display = 'block';
                }

                this.handleChange();
            };
            
            radio.addEventListener('change', changeHandler);
            this.eventListeners.push({ element: radio, event: 'change', handler: changeHandler });
        });

        this.container = container;
        this.element = optionsGroup;
        this.yesContainer = yesContainer;
        this.noContainer = noContainer;
        
        return container;
    }

    createFieldInstance(fieldConfig, suffix) {
        const enhancedConfig = {
            ...fieldConfig,
            id: `${this.id}-${suffix}-${fieldConfig.id}`,
            name: fieldConfig.name || fieldConfig.id,
            serviceContainer: this.serviceContainer,
            eventBus: this.eventBus,
            validator: this.validator,
            formatter: this.formatter,
            renderer: this.renderer,
            onChange: (value) => {
                if (fieldConfig.onChange) {
                    fieldConfig.onChange(value);
                }
                this.handleChange();
            }
        };

        return this.factory.createField(enhancedConfig);
    }

    getValue() {
        const mainValue = this.container ?
            this.container.querySelector('input[type="radio"]:checked')?.value :
            this.state.value?.main;

        if (!mainValue && !this.required) {
            return { main: null };
        }

        if (!mainValue && this.required) {
            return { main: '' };
        }

        const result = { main: mainValue };

        if (mainValue === this.yesOption.value && this.yesFieldInstances.length > 0) {
            result.yesValues = {};
            this.yesFieldInstances.forEach((fieldInstance, index) => {
                const fieldConfig = this.yesFieldsConfig[index];
                const fieldValue = fieldInstance.getValue();
                const displayValue = this.extractDisplayValue(fieldValue, fieldInstance, fieldConfig);
                result.yesValues[fieldConfig.name || fieldConfig.id] = displayValue;
            });
        }

        if (mainValue === this.noOption.value && this.noFieldInstances.length > 0) {
            result.noValues = {};
            this.noFieldInstances.forEach((fieldInstance, index) => {
                const fieldConfig = this.noFieldsConfig[index];
                const fieldValue = fieldInstance.getValue();
                const displayValue = this.extractDisplayValue(fieldValue, fieldInstance, fieldConfig);
                result.noValues[fieldConfig.name || fieldConfig.id] = displayValue;
            });
        }

        return result;
    }

    setValue(value) {
        let mainValue = value;
        if (typeof value === 'object' && value.main) {
            mainValue = value.main;
            
            if (value.yesValues && this.yesFieldInstances.length > 0) {
                this.yesFieldInstances.forEach((fieldInstance, index) => {
                    const fieldConfig = this.yesFieldsConfig[index];
                    const fieldName = fieldConfig.name || fieldConfig.id;
                    if (value.yesValues[fieldName] !== undefined) {
                        fieldInstance.setValue(value.yesValues[fieldName]);
                    }
                });
            }
            
            if (value.noValues && this.noFieldInstances.length > 0) {
                this.noFieldInstances.forEach((fieldInstance, index) => {
                    const fieldConfig = this.noFieldsConfig[index];
                    const fieldName = fieldConfig.name || fieldConfig.id;
                    if (value.noValues[fieldName] !== undefined) {
                        fieldInstance.setValue(value.noValues[fieldName]);
                    }
                });
            }
        }

        this.setState({ 
            value: { main: mainValue },
            isDirty: false 
        });

        if (this.container) {
            const radio = this.container.querySelector(`input[value="${mainValue}"]`);
            if (radio) {
                radio.checked = true;
                if (mainValue === this.yesOption.value) {
                    if (this.yesContainer) this.yesContainer.style.display = 'block';
                    if (this.noContainer) this.noContainer.style.display = 'none';
                } else if (mainValue === this.noOption.value) {
                    if (this.yesContainer) this.yesContainer.style.display = 'none';
                    if (this.noContainer) this.noContainer.style.display = 'block';
                }
            }
        }
    }

    extractDisplayValue(value, fieldInstance, fieldConfig) {
        // Handle yes/no fields specifically to prevent double processing
        if (fieldConfig.type === 'yesno') {
            if (typeof value === 'boolean') {
                return value ? this.factory.getText('yes') : this.factory.getText('no');
            }
            if (value === 'yes' || value === 'no') {
                return value === 'yes' ? this.factory.getText('yes') : this.factory.getText('no');
            }
            if (value === 'true' || value === 'false') {
                return value === 'true' ? this.factory.getText('yes') : this.factory.getText('no');
            }
            return value;
        }

        // For select and multi-select fields, get display names instead of IDs
        if (['select', 'multiselect', 'select-with-other', 'multiselect-with-other'].includes(fieldConfig.type)) {
            if (Array.isArray(value)) {
                return value.map(item => {
                    if (typeof item === 'object' && item.name) {
                        return typeof item.name === 'object' ?
                            (item.name[this.factory.texts?.language || 'fr'] || item.name.en || item.name.fr) :
                            item.name;
                    }
                    return this.getOptionDisplayName(item, fieldConfig);
                }).filter(Boolean).join(', ');
            } else if (typeof value === 'object' && value !== null) {
                if (value.name) {
                    return typeof value.name === 'object' ?
                        (value.name[this.factory.texts?.language || 'fr'] || value.name.en || value.name.fr) :
                        value.name;
                }
                if (value.selectedValue) {
                    return this.extractDisplayValue(value.selectedValue, fieldInstance, fieldConfig);
                }
                if (value.value) {
                    return this.getOptionDisplayName(value.value, fieldConfig);
                }
                if (value.id) {
                    return this.getOptionDisplayName(value.id, fieldConfig);
                }
            } else {
                return this.getOptionDisplayName(value, fieldConfig);
            }
        }

        return value;
    }

    getOptionDisplayName(optionId, fieldConfig) {
        if (!optionId || !fieldConfig.options) return optionId;
        
        let options = fieldConfig.options;
        if (typeof options === 'string' && this.factory.getData) {
            options = this.factory.getData(options);
        }
        
        if (Array.isArray(options)) {
            const option = options.find(opt => opt.id === optionId);
            if (option && option.name) {
                return typeof option.name === 'object' ?
                    (option.name[this.factory.texts?.language || 'fr'] || option.name.en || option.name.fr) :
                    option.name;
            }
        }
        
        return optionId;
    }

    groupFields(fields) {
        const groups = [];
        let i = 0;
        
        while (i < fields.length) {
            const currentField = fields[i];
            if (currentField.row) {
                const rowFields = [];
                let j = i;
                while (j < fields.length && fields[j].row === currentField.row) {
                    rowFields.push(fields[j]);
                    j++;
                }
                groups.push({
                    isRow: true,
                    fields: rowFields
                });
                i = j;
                continue;
            }

            groups.push({
                isRow: false,
                fields: [currentField]
            });
            i++;
        }
        
        return groups;
    }

    getMainDisplayValue() {
        const currentValue = this.getValue().main;
        if (currentValue === this.yesOption.value) {
            return this.yesOption.label;
        } else if (currentValue === this.noOption.value) {
            return this.noOption.label;
        }
        return currentValue;
    }

    cleanup() {
        // Clean up field instances
        [...this.yesFieldInstances, ...this.noFieldInstances].forEach(field => {
            if (field.cleanup) field.cleanup();
        });
        
        super.cleanup();
    }
}

/**
 * SingleSelectField - Enhanced with modern architecture
 */
class SingleSelectField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.options = config.options || [];
        this.placeholder = config.placeholder || factory.getText('selectPlaceholder');
        this.dropdownInstance = null;
        this.isOpen = false;
        
        // Initialize state
        this.setState({
            value: this.value || '',
            isOpen: false
        });
    }

    async validate() {
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            if (this.customValidation) rules.custom = this.customValidation;
            
            const result = await this.validator.validate(this.getValue(), rules);
            
            this.setState({
                isValid: result.isValid,
                errors: result.errors
            });
            
            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: result,
                field: this
            });
            
            return result.isValid;
        } else {
            // Fallback validation
            if (this.required && !this.getValue()) {
                this.showError(this.getFieldErrorMessage('required'));
                return false;
            }
            this.hideError();
            return true;
        }
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';

        this.element = document.createElement('select');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.style.display = 'none';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = this.placeholder;
        this.element.appendChild(defaultOption);

        this.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.name;
            this.element.appendChild(optionElement);
        });

        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper';

        this.selectDisplayElement = document.createElement('div');
        this.selectDisplayElement.className = 'select-display placeholder';
        this.selectDisplayElement.innerHTML = `
            <span>${this.placeholder}</span>
            <div class="dropdown-icon">
                ${SVGIcons.get('CHEVRON')}
            </div>
        `;

        this.customOptionsElement = document.createElement('div');
        this.customOptionsElement.className = 'custom-options';

        this.options.forEach(option => {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.setAttribute('data-value', option.id);
            customOption.innerHTML = `
                <div class="option-checkbox">
                    ${SVGIcons.get('CHECK')}
                </div>
                <span>${option.name}</span>
            `;
            
            const clickHandler = (e) => {
                e.stopPropagation();
                this.selectOption(option);
            };
            
            customOption.addEventListener('click', clickHandler);
            this.eventListeners.push({ element: customOption, event: 'click', handler: clickHandler });
            
            this.customOptionsElement.appendChild(customOption);
        });

        selectWrapper.appendChild(this.selectDisplayElement);
        selectWrapper.appendChild(this.customOptionsElement);

        const displayClickHandler = (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        };
        
        this.selectDisplayElement.addEventListener('click', displayClickHandler);
        this.eventListeners.push({ element: this.selectDisplayElement, event: 'click', handler: displayClickHandler });

        mainContainer.appendChild(this.element);
        mainContainer.appendChild(selectWrapper);

        const errorElement = this.createErrorElement();

        container.appendChild(label);
        container.appendChild(mainContainer);
        container.appendChild(errorElement);

        this.container = container;
        this.selectWrapper = selectWrapper;
        
        return container;
    }

    selectOption(option) {
        this.customOptionsElement.querySelectorAll('.custom-option')
            .forEach(opt => opt.classList.remove('selected'));

        const optionElement = this.customOptionsElement.querySelector(`[data-value="${option.id}"]`);
        if (optionElement) {
            optionElement.classList.add('selected');
        }

        this.selectDisplayElement.querySelector('span').textContent = option.name;
        this.selectDisplayElement.classList.remove('placeholder');

        this.element.value = option.id;
        
        this.setState({ 
            value: option.id,
            isDirty: true,
            isTouched: true 
        });

        this.closeDropdown();
        this.hideError();
        this.handleChange();
    }

    toggleDropdown() {
        if (this.state.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (this.state.isOpen) return;

        this.factory.closeAllDropdowns();
        this.customOptionsElement.classList.add('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.add('rotate');
        
        this.setState({ isOpen: true });

        this.dropdownInstance = {
            element: this.selectWrapper,
            close: () => this.closeDropdown()
        };
        this.factory.registerDropdown(this.dropdownInstance);
        
        this.eventBus?.emit('field:dropdownOpened', { fieldId: this.id });
    }

    closeDropdown() {
        if (!this.state.isOpen) return;

        this.customOptionsElement.classList.remove('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.remove('rotate');
        
        this.setState({ isOpen: false });

        if (this.dropdownInstance) {
            this.factory.unregisterDropdown(this.dropdownInstance);
            this.dropdownInstance = null;
        }
        
        this.eventBus?.emit('field:dropdownClosed', { fieldId: this.id });
    }

    getValue() {
        return this.element ? this.element.value : this.state.value;
    }

    setValue(value) {
        this.setState({ 
            value: value,
            isDirty: false 
        });
        
        if (this.element) {
            this.element.value = value;
            const option = this.options.find(opt => opt.id === value);
            if (option && this.selectDisplayElement) {
                this.selectDisplayElement.querySelector('span').textContent = option.name;
                this.selectDisplayElement.classList.remove('placeholder');
                
                if (this.customOptionsElement) {
                    this.customOptionsElement.querySelectorAll('.custom-option')
                        .forEach(opt => opt.classList.remove('selected'));
                    const optionElement = this.customOptionsElement.querySelector(`[data-value="${value}"]`);
                    if (optionElement) {
                        optionElement.classList.add('selected');
                    }
                }
            }
        }
    }

    cleanup() {
        this.closeDropdown();
        super.cleanup();
    }
}

/**
 * MultiSelectField - Enhanced with modern architecture
 */
class MultiSelectField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.options = config.options || [];
        this.placeholder = config.placeholder || factory.getText('selectMultiplePlaceholder');
        this.selectedValues = [];
        this.dropdownInstance = null;
        this.isOpen = false;
        
        // Initialize state
        this.setState({
            value: [],
            selectedValues: [],
            isOpen: false
        });
    }

    async validate() {
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            if (this.customValidation) rules.custom = this.customValidation;
            
            const result = await this.validator.validate(this.selectedValues, rules);
            
            this.setState({
                isValid: result.isValid,
                errors: result.errors
            });
            
            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: result,
                field: this
            });
            
            return result.isValid;
        } else {
            // Fallback validation
            if (this.required && this.selectedValues.length === 0) {
                this.showError(this.getFieldErrorMessage('selectAtLeastOne'));
                return false;
            }
            this.hideError();
            return true;
        }
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';

        this.element = document.createElement('select');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.multiple = true;
        this.element.style.display = 'none';

        this.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.name;
            this.element.appendChild(optionElement);
        });

        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper multi-select';

        this.selectDisplayElement = document.createElement('div');
        this.selectDisplayElement.className = 'select-display placeholder';
        this.selectDisplayElement.innerHTML = `
            <span>${this.placeholder}</span>
            <div class="dropdown-icon">
                ${SVGIcons.get('CHEVRON')}
            </div>
        `;

        this.customOptionsElement = document.createElement('div');
        this.customOptionsElement.className = 'custom-options multi-select';

        const selectAllOption = document.createElement('div');
        selectAllOption.className = 'custom-option select-all-option';
        selectAllOption.innerHTML = `
            <div class="option-checkbox">
                ${SVGIcons.get('CHECK')}
            </div>
            <span>${this.factory.getText('selectAll')}</span>
        `;
        
        const selectAllHandler = (e) => {
            e.stopPropagation();
            this.toggleSelectAll();
        };
        
        selectAllOption.addEventListener('click', selectAllHandler);
        this.eventListeners.push({ element: selectAllOption, event: 'click', handler: selectAllHandler });
        
        this.customOptionsElement.appendChild(selectAllOption);

        this.options.forEach(option => {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.setAttribute('data-value', option.id);
            customOption.innerHTML = `
                <div class="option-checkbox">
                    ${SVGIcons.get('CHECK')}
                </div>
                <span>${option.name}</span>
            `;
            
            const clickHandler = (e) => {
                e.stopPropagation();
                this.toggleOption(option, customOption);
            };
            
            customOption.addEventListener('click', clickHandler);
            this.eventListeners.push({ element: customOption, event: 'click', handler: clickHandler });
            
            this.customOptionsElement.appendChild(customOption);
        });

        selectWrapper.appendChild(this.selectDisplayElement);
        selectWrapper.appendChild(this.customOptionsElement);

        const displayClickHandler = (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        };
        
        this.selectDisplayElement.addEventListener('click', displayClickHandler);
        this.eventListeners.push({ element: this.selectDisplayElement, event: 'click', handler: displayClickHandler });

        mainContainer.appendChild(this.element);
        mainContainer.appendChild(selectWrapper);

        const errorElement = this.createErrorElement();

        container.appendChild(label);
        container.appendChild(mainContainer);
        container.appendChild(errorElement);

        this.container = container;
        this.selectWrapper = selectWrapper;
        
        return container;
    }

    toggleOption(option, customOption) {
        const isSelected = customOption.classList.contains('selected');
        const optElement = this.element.querySelector(`option[value="${option.id}"]`);

        if (isSelected) {
            customOption.classList.remove('selected');
            if (optElement) optElement.selected = false;
            this.selectedValues = this.selectedValues.filter(val => val !== option.id);
        } else {
            customOption.classList.add('selected');
            if (optElement) optElement.selected = true;
            this.selectedValues.push(option.id);
        }

        this.updateDisplayText();
        this.updateSelectAllState();
        
        this.setState({ 
            value: this.selectedValues,
            selectedValues: this.selectedValues,
            isDirty: true,
            isTouched: true 
        });
        
        this.hideError();
        this.handleChange();
    }

    toggleSelectAll() {
        const allOptions = this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option)');
        const selectAllOption = this.customOptionsElement.querySelector('.select-all-option');
        const allSelected = Array.from(allOptions).every(opt => opt.classList.contains('selected'));

        allOptions.forEach(opt => {
            const optValue = opt.dataset.value;
            const optElement = this.element.querySelector(`option[value="${optValue}"]`);
            
            if (allSelected) {
                opt.classList.remove('selected');
                if (optElement) optElement.selected = false;
            } else {
                opt.classList.add('selected');
                if (optElement) optElement.selected = true;
            }
        });

        if (allSelected) {
            selectAllOption.classList.remove('selected');
            this.selectedValues = [];
        } else {
            selectAllOption.classList.add('selected');
            this.selectedValues = this.options.map(opt => opt.id);
        }

        this.updateDisplayText();
        
        this.setState({ 
            value: this.selectedValues,
            selectedValues: this.selectedValues,
            isDirty: true,
            isTouched: true 
        });
        
        this.handleChange();
    }

    updateSelectAllState() {
        const allOptions = this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option)');
        const selectAllOption = this.customOptionsElement.querySelector('.select-all-option');
        const allSelected = Array.from(allOptions).every(opt => opt.classList.contains('selected'));

        if (allSelected && this.selectedValues.length > 0) {
            selectAllOption.classList.add('selected');
        } else {
            selectAllOption.classList.remove('selected');
        }
    }

    updateDisplayText() {
        const span = this.selectDisplayElement.querySelector('span');
        if (this.selectedValues.length === 0) {
            span.textContent = this.placeholder;
            this.selectDisplayElement.classList.add('placeholder');
        } else if (this.selectedValues.length === 1) {
            const option = this.options.find(opt => opt.id === this.selectedValues[0]);
            span.textContent = option ? option.name : this.selectedValues[0];
            this.selectDisplayElement.classList.remove('placeholder');
        } else {
            span.textContent = `${this.selectedValues.length} ${this.factory.getText('selected')}`;
            this.selectDisplayElement.classList.remove('placeholder');
        }
    }

    toggleDropdown() {
        if (this.state.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (this.state.isOpen) return;

        this.factory.closeAllDropdowns();
        this.customOptionsElement.classList.add('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.add('rotate');
        
        this.setState({ isOpen: true });

        this.dropdownInstance = {
            element: this.selectWrapper,
            close: () => this.closeDropdown()
        };
        this.factory.registerDropdown(this.dropdownInstance);
        
        this.eventBus?.emit('field:dropdownOpened', { fieldId: this.id });
    }

    closeDropdown() {
        if (!this.state.isOpen) return;

        this.customOptionsElement.classList.remove('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.remove('rotate');
        
        this.setState({ isOpen: false });

        if (this.dropdownInstance) {
            this.factory.unregisterDropdown(this.dropdownInstance);
            this.dropdownInstance = null;
        }
        
        this.eventBus?.emit('field:dropdownClosed', { fieldId: this.id });
    }

    getValue() {
        return this.selectedValues;
    }

    setValue(values) {
        this.selectedValues = Array.isArray(values) ? values : [];
        
        this.setState({ 
            value: this.selectedValues,
            selectedValues: this.selectedValues,
            isDirty: false 
        });

        if (this.element) {
            Array.from(this.element.options).forEach(option => {
                option.selected = this.selectedValues.includes(option.value);
            });

            if (this.customOptionsElement) {
                this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option)')
                    .forEach(opt => {
                        if (this.selectedValues.includes(opt.dataset.value)) {
                            opt.classList.add('selected');
                        } else {
                            opt.classList.remove('selected');
                        }
                    });
                this.updateSelectAllState();
            }

            if (this.selectDisplayElement) {
                this.updateDisplayText();
            }
        }
    }

    cleanup() {
        this.closeDropdown();
        super.cleanup();
    }
}

/**
 * SingleSelectSubsectionsField - Enhanced with modern architecture
 */
class SingleSelectSubsectionsField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Resolve subsectionOptions from string reference to actual data
        this.subsectionOptions = this.resolveSubsectionOptions(config);
        this.placeholder = config.placeholder || factory.getText('selectSubsectionPlaceholder');
        this.dropdownInstance = null;
        this.isOpen = false;
        
        // Initialize state
        this.setState({
            value: this.value || '',
            isOpen: false
        });
    }

    resolveSubsectionOptions(config) {
        if (typeof config.subsectionOptions === 'string') {
            // Try multiple ways to access the form data
            const dataSources = [
                () => this.factory.formData?.options,
                () => this.factory.data?.options,
                () => this.factory.options,
                () => window.PropertySearchFormExtension?.FORM_DATA?.options,
                () => window.PropertySellFormExtension?.FORM_DATA?.options,
                () => config.formData?.options
            ];

            for (const getDataSource of dataSources) {
                try {
                    const optionsData = getDataSource();
                    if (optionsData && optionsData[config.subsectionOptions]) {
                        return optionsData[config.subsectionOptions];
                    }
                } catch (e) {
                    // Continue to next data source
                }
            }
            
            console.warn(`Could not resolve subsectionOptions: ${config.subsectionOptions}`);
            return [];
        }
        
        return Array.isArray(config.subsectionOptions) ? config.subsectionOptions : [];
    }

    async validate() {
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            if (this.customValidation) rules.custom = this.customValidation;
            
            const result = await this.validator.validate(this.getValue(), rules);
            
            this.setState({
                isValid: result.isValid,
                errors: result.errors
            });
            
            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: result,
                field: this
            });
            
            return result.isValid;
        } else {
            // Fallback validation
            if (this.required && !this.getValue()) {
                this.showError(this.getFieldErrorMessage('required'));
                return false;
            }
            this.hideError();
            return true;
        }
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';

        this.element = document.createElement('select');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.style.display = 'none';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = this.placeholder;
        this.element.appendChild(defaultOption);

        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper';

        this.selectDisplayElement = document.createElement('div');
        this.selectDisplayElement.className = 'select-display placeholder';
        this.selectDisplayElement.innerHTML = `
            <span>${this.placeholder}</span>
            <div class="dropdown-icon">
                ${SVGIcons.get('CHEVRON')}
            </div>
        `;

        this.customOptionsElement = document.createElement('div');
        this.customOptionsElement.className = 'custom-options';

        this.buildSubsectionOptions();

        selectWrapper.appendChild(this.selectDisplayElement);
        selectWrapper.appendChild(this.customOptionsElement);

        const displayClickHandler = (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        };
        
        this.selectDisplayElement.addEventListener('click', displayClickHandler);
        this.eventListeners.push({ element: this.selectDisplayElement, event: 'click', handler: displayClickHandler });

        mainContainer.appendChild(this.element);
        mainContainer.appendChild(selectWrapper);

        const errorElement = this.createErrorElement();

        container.appendChild(label);
        container.appendChild(mainContainer);
        container.appendChild(errorElement);

        this.container = container;
        this.selectWrapper = selectWrapper;
        
        return container;
    }

    buildSubsectionOptions() {
        if (!Array.isArray(this.subsectionOptions)) {
            console.error('subsectionOptions is not an array:', this.subsectionOptions);
            return;
        }

        const language = this.factory?.config?.language || this.factory?.language || 'fr';

        this.subsectionOptions.forEach(group => {
            const mainDiv = document.createElement('div');
            mainDiv.className = 'custom-option category-option';
            mainDiv.dataset.value = group.id;

            let groupName = this.getLocalizedName(group.name, language);

            mainDiv.innerHTML = `
                <span>${groupName}</span>
                <div class="main-arrow">
                    <div class="arrow-icon">${SVGIcons.get('CHEVRON')}</div>
                </div>
            `;

            const clickHandler = (e) => {
                e.stopPropagation();
                if (mainDiv.classList.contains('expanded')) {
                    this.collapseSection(mainDiv);
                } else {
                    this.expandSection(mainDiv, group);
                }
            };
            
            mainDiv.addEventListener('click', clickHandler);
            this.eventListeners.push({ element: mainDiv, event: 'click', handler: clickHandler });

            this.customOptionsElement.appendChild(mainDiv);
        });
    }

    expandSection(mainDiv, group) {
        // Close other expanded sections
        this.customOptionsElement.querySelectorAll('.custom-option.category-option.expanded')
            .forEach(opt => this.collapseSection(opt));

        mainDiv.classList.add('expanded');
        mainDiv.querySelector('.arrow-icon').classList.add('rotate');

        const subWrapper = document.createElement('div');
        subWrapper.className = 'sub-options';

        const language = this.factory?.config?.language || this.factory?.language || 'fr';

        group.subcategories.forEach(item => {
            const itemName = this.getLocalizedName(item.name, language);

            const subDiv = document.createElement('div');
            subDiv.className = 'custom-option';
            subDiv.dataset.value = item.id;

            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'option-checkbox';
            checkboxDiv.innerHTML = SVGIcons.get('CHECK');

            const itemSpan = document.createElement('span');
            itemSpan.textContent = itemName;

            subDiv.appendChild(checkboxDiv);
            subDiv.appendChild(itemSpan);

            if (this.state.value === item.id) {
                subDiv.classList.add('selected');
            }

            const clickHandler = (e) => {
                e.stopPropagation();
                this.selectOption(item);
            };
            
            subDiv.addEventListener('click', clickHandler);
            this.eventListeners.push({ element: subDiv, event: 'click', handler: clickHandler });

            subWrapper.appendChild(subDiv);
        });

        mainDiv.insertAdjacentElement('afterend', subWrapper);
    }

    collapseSection(mainDiv) {
        mainDiv.classList.remove('expanded');
        if (mainDiv.nextElementSibling && mainDiv.nextElementSibling.classList.contains('sub-options')) {
            mainDiv.nextElementSibling.remove();
        }
        const arrow = mainDiv.querySelector('.arrow-icon');
        if (arrow) arrow.classList.remove('rotate');
    }

    selectOption(option) {
        const language = this.factory?.config?.language || this.factory?.language || 'fr';
        const optionName = this.getLocalizedName(option.name, language);

        // Clear all selections
        this.customOptionsElement.querySelectorAll('.custom-option.selected')
            .forEach(opt => opt.classList.remove('selected'));

        // Select the clicked option
        const optionElement = this.customOptionsElement.querySelector(`[data-value="${option.id}"]`);
        if (optionElement) {
            optionElement.classList.add('selected');
        }

        this.selectDisplayElement.querySelector('span').textContent = optionName;
        this.selectDisplayElement.classList.remove('placeholder');

        // Create the option element if it doesn't exist
        let optionEl = this.element.querySelector(`option[value="${option.id}"]`);
        if (!optionEl) {
            optionEl = document.createElement('option');
            optionEl.value = option.id;
            optionEl.textContent = optionName;
            this.element.appendChild(optionEl);
        }

        this.element.value = option.id;
        
        this.setState({ 
            value: option.id,
            isDirty: true,
            isTouched: true 
        });

        this.closeDropdown();
        this.hideError();
        this.handleChange();
    }

    getLocalizedName(name, language) {
        if (typeof name === 'object' && name !== null) {
            return name[language] || name.fr || name.en || Object.values(name)[0] || name;
        }
        return name;
    }

    toggleDropdown() {
        if (this.state.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (this.state.isOpen) return;

        this.factory.closeAllDropdowns();
        this.customOptionsElement.classList.add('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.add('rotate');
        
        this.setState({ isOpen: true });

        this.dropdownInstance = {
            element: this.selectWrapper,
            close: () => this.closeDropdown()
        };
        this.factory.registerDropdown(this.dropdownInstance);
        
        this.eventBus?.emit('field:dropdownOpened', { fieldId: this.id });
    }

    closeDropdown() {
        if (!this.state.isOpen) return;

        this.customOptionsElement.classList.remove('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.remove('rotate');
        
        this.setState({ isOpen: false });

        // Collapse all expanded sections
        this.customOptionsElement.querySelectorAll('.sub-options').forEach(sw => sw.remove());
        this.customOptionsElement.querySelectorAll('.custom-option.category-option.expanded')
            .forEach(opt => this.collapseSection(opt));

        if (this.dropdownInstance) {
            this.factory.unregisterDropdown(this.dropdownInstance);
            this.dropdownInstance = null;
        }
        
        this.eventBus?.emit('field:dropdownClosed', { fieldId: this.id });
    }

    getValue() {
        return this.element ? this.element.value : this.state.value;
    }

    setValue(value) {
        this.setState({ 
            value: value,
            isDirty: false 
        });

        if (this.element) {
            const language = this.factory?.config?.language || this.factory?.language || 'fr';

            // Find the option in subsections
            for (const group of this.subsectionOptions) {
                const option = group.subcategories.find(opt => opt.id === value);
                if (option) {
                    const optionName = this.getLocalizedName(option.name, language);

                    // Create the option element if it doesn't exist
                    let optionEl = this.element.querySelector(`option[value="${option.id}"]`);
                    if (!optionEl) {
                        optionEl = document.createElement('option');
                        optionEl.value = option.id;
                        optionEl.textContent = optionName;
                        this.element.appendChild(optionEl);
                    }

                    this.element.value = value;
                    
                    if (this.selectDisplayElement) {
                        this.selectDisplayElement.querySelector('span').textContent = optionName;
                        this.selectDisplayElement.classList.remove('placeholder');
                    }
                    break;
                }
            }
        }
    }

    cleanup() {
        this.closeDropdown();
        super.cleanup();
    }
}

/**
 * MultiSelectSubsectionsField - Enhanced with modern architecture
 */
class MultiSelectSubsectionsField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Resolve subsectionOptions from string reference to actual data
        this.subsectionOptions = this.resolveSubsectionOptions(config);
        this.placeholder = config.placeholder || factory.getText('selectMultiplePlaceholder');
        this.selectedValues = [];
        this.dropdownInstance = null;
        this.isOpen = false;
        
        // Initialize state
        this.setState({
            value: [],
            selectedValues: [],
            isOpen: false
        });
    }

    resolveSubsectionOptions(config) {
        if (typeof config.subsectionOptions === 'string') {
            const dataSources = [
                () => this.factory.formData?.options,
                () => this.factory.data?.options,
                () => this.factory.options,
                () => window.PropertySearchFormExtension?.FORM_DATA?.options,
                () => config.formData?.options
            ];

            for (const getDataSource of dataSources) {
                try {
                    const optionsData = getDataSource();
                    if (optionsData && optionsData[config.subsectionOptions]) {
                        return optionsData[config.subsectionOptions];
                    }
                } catch (e) {
                    // Continue to next data source
                }
            }
            
            console.warn(`Could not resolve subsectionOptions: ${config.subsectionOptions}`);
            return [];
        }
        
        return Array.isArray(config.subsectionOptions) ? config.subsectionOptions : [];
    }

    async validate() {
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            if (this.customValidation) rules.custom = this.customValidation;
            
            const result = await this.validator.validate(this.selectedValues, rules);
            
            this.setState({
                isValid: result.isValid,
                errors: result.errors
            });
            
            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: result,
                field: this
            });
            
            return result.isValid;
        } else {
            // Fallback validation
            if (this.required && this.selectedValues.length === 0) {
                this.showError(this.getFieldErrorMessage('selectAtLeastOne'));
                return false;
            }
            this.hideError();
            return true;
        }
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';

        this.element = document.createElement('select');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.multiple = true;
        this.element.style.display = 'none';

        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper multi-select';

        this.selectDisplayElement = document.createElement('div');
        this.selectDisplayElement.className = 'select-display placeholder';
        this.selectDisplayElement.innerHTML = `
            <span>${this.placeholder}</span>
            <div class="dropdown-icon">
                ${SVGIcons.get('CHEVRON')}
            </div>
        `;

        this.customOptionsElement = document.createElement('div');
        this.customOptionsElement.className = 'custom-options multi-select';

        this.buildSubsectionOptions();

        selectWrapper.appendChild(this.selectDisplayElement);
        selectWrapper.appendChild(this.customOptionsElement);

        const displayClickHandler = (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        };
        
        this.selectDisplayElement.addEventListener('click', displayClickHandler);
        this.eventListeners.push({ element: this.selectDisplayElement, event: 'click', handler: displayClickHandler });

        mainContainer.appendChild(this.element);
        mainContainer.appendChild(selectWrapper);

        const errorElement = this.createErrorElement();

        container.appendChild(label);
        container.appendChild(mainContainer);
        container.appendChild(errorElement);

        this.container = container;
        this.selectWrapper = selectWrapper;
        
        return container;
    }

    buildSubsectionOptions() {
        if (!Array.isArray(this.subsectionOptions)) {
            console.error('subsectionOptions is not an array:', this.subsectionOptions);
            return;
        }

        const language = this.factory?.config?.language || this.factory?.language || 'fr';

        // Add Select All option
        const selectAllDiv = document.createElement('div');
        selectAllDiv.className = 'custom-option select-all-option';
        selectAllDiv.dataset.value = 'select_all';

        const allCheckbox = document.createElement('div');
        allCheckbox.className = 'option-checkbox';
        allCheckbox.innerHTML = SVGIcons.get('CHECK');

        const allText = document.createElement('span');
        allText.textContent = this.factory.getText('selectAll');

        selectAllDiv.appendChild(allCheckbox);
        selectAllDiv.appendChild(allText);

        const selectAllHandler = (e) => {
            e.stopPropagation();
            this.toggleSelectAll();
        };
        
        selectAllDiv.addEventListener('click', selectAllHandler);
        this.eventListeners.push({ element: selectAllDiv, event: 'click', handler: selectAllHandler });

        this.customOptionsElement.appendChild(selectAllDiv);

        // Add subsection groups
        this.subsectionOptions.forEach(group => {
            const mainDiv = document.createElement('div');
            mainDiv.className = 'custom-option category-option';
            mainDiv.dataset.value = group.id;

            const groupName = this.getLocalizedName(group.name, language);

            mainDiv.innerHTML = `
                <span>${groupName}</span>
                <div class="main-arrow">
                    <div class="arrow-icon">${SVGIcons.get('CHEVRON')}</div>
                </div>
            `;

            const clickHandler = (e) => {
                e.stopPropagation();
                if (mainDiv.classList.contains('expanded')) {
                    this.collapseSection(mainDiv);
                } else {
                    this.expandSection(mainDiv, group);
                }
            };
            
            mainDiv.addEventListener('click', clickHandler);
            this.eventListeners.push({ element: mainDiv, event: 'click', handler: clickHandler });

            this.customOptionsElement.appendChild(mainDiv);
        });
    }

    expandSection(mainDiv, group) {
        // Close other expanded sections
        this.customOptionsElement.querySelectorAll('.custom-option.category-option.expanded')
            .forEach(opt => this.collapseSection(opt));

        mainDiv.classList.add('expanded');
        mainDiv.querySelector('.arrow-icon').classList.add('rotate');

        const subWrapper = document.createElement('div');
        subWrapper.className = 'sub-options';

        const language = this.factory?.config?.language || this.factory?.language || 'fr';

        // Add Select All for this group
        const selectAllDiv = document.createElement('div');
        selectAllDiv.className = 'custom-option select-all-option';
        selectAllDiv.dataset.value = `select_all_${group.id}`;

        const allCheckbox = document.createElement('div');
        allCheckbox.className = 'option-checkbox';
        allCheckbox.innerHTML = SVGIcons.get('CHECK');

        const allSpan = document.createElement('span');
        allSpan.textContent = this.factory.getText('selectAll');

        selectAllDiv.appendChild(allCheckbox);
        selectAllDiv.appendChild(allSpan);

        const selectAllGroupHandler = (e) => {
            e.stopPropagation();
            this.toggleSelectAllInGroup(group, subWrapper);
        };
        
        selectAllDiv.addEventListener('click', selectAllGroupHandler);
        this.eventListeners.push({ element: selectAllDiv, event: 'click', handler: selectAllGroupHandler });

        subWrapper.appendChild(selectAllDiv);

        group.subcategories.forEach(item => {
            const itemName = this.getLocalizedName(item.name, language);

            this.element.appendChild(new Option(itemName, item.id));

            const subDiv = document.createElement('div');
            subDiv.className = 'custom-option';
            subDiv.dataset.value = item.id;

            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'option-checkbox';
            checkboxDiv.innerHTML = SVGIcons.get('CHECK');

            const itemSpan = document.createElement('span');
            itemSpan.textContent = itemName;

            subDiv.appendChild(checkboxDiv);
            subDiv.appendChild(itemSpan);

            // Check if already selected
            if (this.selectedValues.includes(item.id)) {
                subDiv.classList.add('selected');
                const subOption = this.element.querySelector(`option[value="${item.id}"]`);
                if (subOption) subOption.selected = true;
            }

            const clickHandler = (e) => {
                e.stopPropagation();
                this.toggleOption(item, subDiv, subWrapper);
            };
            
            subDiv.addEventListener('click', clickHandler);
            this.eventListeners.push({ element: subDiv, event: 'click', handler: clickHandler });

            subWrapper.appendChild(subDiv);
        });

        // Update group select all state
        this.updateGroupSelectAllState(group, subWrapper);

        mainDiv.insertAdjacentElement('afterend', subWrapper);
    }

    collapseSection(mainDiv) {
        mainDiv.classList.remove('expanded');
        if (mainDiv.nextElementSibling && mainDiv.nextElementSibling.classList.contains('sub-options')) {
            mainDiv.nextElementSibling.remove();
        }
        const arrow = mainDiv.querySelector('.arrow-icon');
        if (arrow) arrow.classList.remove('rotate');
    }

    toggleOption(option, customOption, subWrapper) {
        const isSelected = customOption.classList.contains('selected');
        const optElement = this.element.querySelector(`option[value="${option.id}"]`);

        if (isSelected) {
            customOption.classList.remove('selected');
            if (optElement) optElement.selected = false;
            this.selectedValues = this.selectedValues.filter(val => val !== option.id);
        } else {
            customOption.classList.add('selected');
            if (optElement) optElement.selected = true;
            this.selectedValues.push(option.id);
        }

        this.updateDisplayText();
        this.updateSelectAllStates(subWrapper);
        
        this.setState({ 
            value: this.selectedValues,
            selectedValues: this.selectedValues,
            isDirty: true,
            isTouched: true 
        });

        this.hideError();
        this.handleChange();
    }

    toggleSelectAllInGroup(group, subWrapper) {
        const subOptions = subWrapper.querySelectorAll('.custom-option:not(.select-all-option)');
        const selectAllOption = subWrapper.querySelector('.select-all-option');
        const allSelected = Array.from(subOptions).every(opt => opt.classList.contains('selected'));

        subOptions.forEach(opt => {
            const optValue = opt.dataset.value;
            const optElement = this.element.querySelector(`option[value="${optValue}"]`);
            
            if (allSelected) {
                opt.classList.remove('selected');
                if (optElement) optElement.selected = false;
                this.selectedValues = this.selectedValues.filter(val => val !== optValue);
            } else {
                opt.classList.add('selected');
                if (optElement) optElement.selected = true;
                if (!this.selectedValues.includes(optValue)) {
                    this.selectedValues.push(optValue);
                }
            }
        });

        selectAllOption.classList.toggle('selected', !allSelected);

        this.updateDisplayText();
        this.updateGlobalSelectAllState();
        
        this.setState({ 
            value: this.selectedValues,
            selectedValues: this.selectedValues,
            isDirty: true,
            isTouched: true 
        });

        this.handleChange();
    }

    toggleSelectAll() {
        const globalSelectAll = this.customOptionsElement.querySelector('.select-all-option[data-value="select_all"]');
        const allSubOptions = [];

        // Collect all subcategory options
        this.subsectionOptions.forEach(group => {
            group.subcategories.forEach(item => {
                allSubOptions.push(item.id);
            });
        });

        const allSelected = allSubOptions.every(id => this.selectedValues.includes(id));

        if (allSelected) {
            // Deselect all
            this.selectedValues = [];
            globalSelectAll.classList.remove('selected');
            
            // Update all visible options
            this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option):not(.category-option)')
                .forEach(opt => {
                    opt.classList.remove('selected');
                    const optElement = this.element.querySelector(`option[value="${opt.dataset.value}"]`);
                    if (optElement) optElement.selected = false;
                });
        } else {
            // Select all
            this.selectedValues = [...allSubOptions];
            globalSelectAll.classList.add('selected');
            
            // Update all visible options
            this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option):not(.category-option)')
                .forEach(opt => {
                    opt.classList.add('selected');
                    const optElement = this.element.querySelector(`option[value="${opt.dataset.value}"]`);
                    if (optElement) optElement.selected = true;
                });
        }

        this.updateDisplayText();
        
        this.setState({ 
            value: this.selectedValues,
            selectedValues: this.selectedValues,
            isDirty: true,
            isTouched: true 
        });

        this.handleChange();
    }

    updateGroupSelectAllState(group, subWrapper) {
        const subOptions = subWrapper.querySelectorAll('.custom-option:not(.select-all-option)');
        const selectAllOption = subWrapper.querySelector('.select-all-option');
        const allSelected = Array.from(subOptions).every(opt => opt.classList.contains('selected'));

        if (allSelected && subOptions.length > 0) {
            selectAllOption.classList.add('selected');
        } else {
            selectAllOption.classList.remove('selected');
        }
    }

    updateSelectAllStates(subWrapper = null) {
        if (subWrapper) {
            // Update group select all
            const subOptions = subWrapper.querySelectorAll('.custom-option:not(.select-all-option)');
            const selectAllOption = subWrapper.querySelector('.select-all-option');
            const allSelected = Array.from(subOptions).every(opt => opt.classList.contains('selected'));
            selectAllOption.classList.toggle('selected', allSelected && subOptions.length > 0);
        }

        this.updateGlobalSelectAllState();
    }

    updateGlobalSelectAllState() {
        const globalSelectAll = this.customOptionsElement.querySelector('.select-all-option[data-value="select_all"]');
        const allSubOptions = [];
        
        this.subsectionOptions.forEach(group => {
            group.subcategories.forEach(item => {
                allSubOptions.push(item.id);
            });
        });

        const allSelected = allSubOptions.length > 0 && allSubOptions.every(id => this.selectedValues.includes(id));
        globalSelectAll.classList.toggle('selected', allSelected);
    }

    updateDisplayText() {
        const span = this.selectDisplayElement.querySelector('span');
        
        if (this.selectedValues.length === 0) {
            span.textContent = this.placeholder;
            this.selectDisplayElement.classList.add('placeholder');
        } else if (this.selectedValues.length === 1) {
            const language = this.factory?.config?.language || this.factory?.language || 'fr';
            
            // Find the option name
            for (const group of this.subsectionOptions) {
                const option = group.subcategories.find(opt => opt.id === this.selectedValues[0]);
                if (option) {
                    const optionName = this.getLocalizedName(option.name, language);
                    span.textContent = optionName;
                    break;
                }
            }
            this.selectDisplayElement.classList.remove('placeholder');
        } else {
            span.textContent = `${this.selectedValues.length} ${this.factory.getText('selected')}`;
            this.selectDisplayElement.classList.remove('placeholder');
        }
    }

    getLocalizedName(name, language) {
        if (typeof name === 'object' && name !== null) {
            return name[language] || name.fr || name.en || Object.values(name)[0] || name;
        }
        return name;
    }

    toggleDropdown() {
        if (this.state.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (this.state.isOpen) return;

        this.factory.closeAllDropdowns();
        this.customOptionsElement.classList.add('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.add('rotate');
        
        this.setState({ isOpen: true });

        this.dropdownInstance = {
            element: this.selectWrapper,
            close: () => this.closeDropdown()
        };
        this.factory.registerDropdown(this.dropdownInstance);
        
        this.eventBus?.emit('field:dropdownOpened', { fieldId: this.id });
    }

    closeDropdown() {
        if (!this.state.isOpen) return;

        this.customOptionsElement.classList.remove('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.remove('rotate');
        
        this.setState({ isOpen: false });

        // Collapse all expanded sections
        this.customOptionsElement.querySelectorAll('.sub-options').forEach(sw => sw.remove());
        this.customOptionsElement.querySelectorAll('.custom-option.category-option.expanded')
            .forEach(opt => this.collapseSection(opt));

        if (this.dropdownInstance) {
            this.factory.unregisterDropdown(this.dropdownInstance);
            this.dropdownInstance = null;
        }
        
        this.eventBus?.emit('field:dropdownClosed', { fieldId: this.id });
    }

    getValue() {
        return this.selectedValues;
    }

    setValue(values) {
        this.selectedValues = Array.isArray(values) ? values : [];
        
        this.setState({ 
            value: this.selectedValues,
            selectedValues: this.selectedValues,
            isDirty: false 
        });

        if (this.element) {
            Array.from(this.element.options).forEach(option => {
                option.selected = this.selectedValues.includes(option.value);
            });
            this.updateDisplayText();
        }
    }

    cleanup() {
        this.closeDropdown();
        super.cleanup();
    }
}

/**
 * SingleSelectWithOtherField - Enhanced with modern architecture
 */
class SingleSelectWithOtherField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.options = config.options || [];
        this.placeholder = config.placeholder || factory.getText('selectPlaceholder');
        this.otherLabel = config.otherLabel || factory.getText('other');
        this.otherPlaceholder = config.otherPlaceholder || `${factory.getText('other')}...`;
        this.otherValue = '';
        this.dropdownInstance = null;
        this.isOpen = false;
        
        // Initialize complex state
        this.setState({
            value: { main: '', other: '' },
            isOpen: false
        });
    }

    async validate() {
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            
            const mainValue = this.element ? this.element.value : '';
            let result = await this.validator.validate(mainValue, rules);
            
            let isValid = result.isValid;
            let errors = [...result.errors];

            if (mainValue === 'other' && !this.otherValue) {
                isValid = false;
                errors.push(this.getFieldErrorMessage('required'));
                if (this.otherError) {
                    this.otherError.classList.add('show');
                }
            } else if (this.otherError) {
                this.otherError.classList.remove('show');
            }
            
            this.setState({
                isValid: isValid,
                errors: errors
            });

            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: { isValid, errors },
                field: this
            });

            return isValid;
        } else {
            // Fallback validation
            if (this.required) {
                const mainValue = this.element ? this.element.value : '';
                if (!mainValue) {
                    this.showError(this.getFieldErrorMessage('required'));
                    return false;
                }
                if (mainValue === 'other' && !this.otherValue) {
                    if (this.otherError) {
                        this.otherError.classList.add('show');
                    }
                    return false;
                }
            }

            this.hideError();
            if (this.otherError) {
                this.otherError.classList.remove('show');
            }
            return true;
        }
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const optionsWithOther = [...this.options, { id: 'other', name: this.otherLabel }];

        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';

        this.element = document.createElement('select');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.style.display = 'none';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = this.placeholder;
        this.element.appendChild(defaultOption);

        optionsWithOther.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.name;
            this.element.appendChild(optionElement);
        });

        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper';

        this.selectDisplayElement = document.createElement('div');
        this.selectDisplayElement.className = 'select-display placeholder';
        this.selectDisplayElement.innerHTML = `
            <span>${this.placeholder}</span>
            <div class="dropdown-icon">
                ${SVGIcons.get('CHEVRON')}
            </div>
        `;

        this.customOptionsElement = document.createElement('div');
        this.customOptionsElement.className = 'custom-options';

        optionsWithOther.forEach(option => {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.setAttribute('data-value', option.id);
            customOption.innerHTML = `
                <div class="option-checkbox">
                    ${SVGIcons.get('CHECK')}
                </div>
                <span>${option.name}</span>
            `;
            
            const clickHandler = (e) => {
                e.stopPropagation();
                this.selectMainOption(option);
            };
            
            customOption.addEventListener('click', clickHandler);
            this.eventListeners.push({ element: customOption, event: 'click', handler: clickHandler });
            
            this.customOptionsElement.appendChild(customOption);
        });

        selectWrapper.appendChild(this.selectDisplayElement);
        selectWrapper.appendChild(this.customOptionsElement);

        const displayClickHandler = (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        };
        
        this.selectDisplayElement.addEventListener('click', displayClickHandler);
        this.eventListeners.push({ element: this.selectDisplayElement, event: 'click', handler: displayClickHandler });

        mainContainer.appendChild(this.element);
        mainContainer.appendChild(selectWrapper);

        this.otherContainer = document.createElement('div');
        this.otherContainer.className = 'conditional-field-wrapper';
        this.otherContainer.id = `${this.id}-other-group`;
        this.otherContainer.style.display = 'none';
        this.otherContainer.style.marginTop = '10px';

        const otherLabel = document.createElement('label');
        otherLabel.className = 'form-label';
        otherLabel.textContent = this.otherLabel;

        this.otherInput = document.createElement('input');
        this.otherInput.type = 'text';
        this.otherInput.id = `${this.id}-other`;
        this.otherInput.placeholder = this.otherPlaceholder;

        this.otherError = document.createElement('div');
        this.otherError.className = 'error-message';
        this.otherError.id = `error-${this.id}-other`;
        this.otherError.innerHTML = `
            <div class="error-icon">!</div>
            <span class="error-text">${this.getFieldErrorMessage('required')}</span>
        `;

        this.otherContainer.appendChild(otherLabel);
        this.otherContainer.appendChild(this.otherInput);
        this.otherContainer.appendChild(this.otherError);

        const otherInputHandler = () => {
            this.otherValue = this.otherInput.value.trim();
            
            this.setState({ 
                value: { main: 'other', other: this.otherValue },
                isDirty: true,
                isTouched: true 
            });
            
            if (this.otherValue) {
                this.otherError.classList.remove('show');
            }
            this.handleChange();
        };
        
        this.otherInput.addEventListener('input', otherInputHandler);
        this.eventListeners.push({ element: this.otherInput, event: 'input', handler: otherInputHandler });

        const errorElement = this.createErrorElement();

        container.appendChild(label);
        container.appendChild(mainContainer);
        container.appendChild(this.otherContainer);
        container.appendChild(errorElement);

        this.container = container;
        this.selectWrapper = selectWrapper;
        
        return container;
    }

    selectMainOption(option) {
        this.customOptionsElement.querySelectorAll('.custom-option')
            .forEach(opt => opt.classList.remove('selected'));

        const optionElement = this.customOptionsElement.querySelector(`[data-value="${option.id}"]`);
        if (optionElement) {
            optionElement.classList.add('selected');
        }

        this.selectDisplayElement.querySelector('span').textContent = option.name;
        this.selectDisplayElement.classList.remove('placeholder');

        this.element.value = option.id;

        this.closeDropdown();

        if (option.id === 'other') {
            this.otherContainer.style.display = 'block';
            this.setState({ 
                value: { main: option.id, other: this.otherValue },
                isDirty: true,
                isTouched: true 
            });
        } else {
            this.otherContainer.style.display = 'none';
            this.setState({ 
                value: { main: option.id, other: '' },
                isDirty: true,
                isTouched: true 
            });
            this.otherValue = '';
            if (this.otherInput) this.otherInput.value = '';
        }

        this.hideError();
        this.handleChange();
    }

    toggleDropdown() {
        if (this.state.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (this.state.isOpen) return;

        this.factory.closeAllDropdowns();
        this.customOptionsElement.classList.add('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.add('rotate');
        
        this.setState({ isOpen: true });

        this.dropdownInstance = {
            element: this.selectWrapper,
            close: () => this.closeDropdown()
        };
        this.factory.registerDropdown(this.dropdownInstance);
        
        this.eventBus?.emit('field:dropdownOpened', { fieldId: this.id });
    }

    closeDropdown() {
        if (!this.state.isOpen) return;

        this.customOptionsElement.classList.remove('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.remove('rotate');
        
        this.setState({ isOpen: false });

        if (this.dropdownInstance) {
            this.factory.unregisterDropdown(this.dropdownInstance);
            this.dropdownInstance = null;
        }
        
        this.eventBus?.emit('field:dropdownClosed', { fieldId: this.id });
    }

    getValue() {
        if (this.state.value && typeof this.state.value === 'object') {
            if (this.state.value.main === 'other' && this.state.value.other) {
                return this.state.value.other;
            } else if (this.state.value.main !== 'other') {
                return this.state.value.main;
            }
        }
        return this.element ? this.element.value : '';
    }

    setValue(value) {
        const existingOption = this.options.find(opt => opt.id === value);
        if (existingOption) {
            this.selectMainOption(existingOption);
        } else if (value) {
            const otherOption = { id: 'other', name: this.otherLabel };
            this.selectMainOption(otherOption);
            this.otherValue = value;
            if (this.otherInput) {
                this.otherInput.value = value;
            }
            this.setState({ 
                value: { main: 'other', other: value },
                isDirty: false 
            });
        }
    }

    setOptions(newOptions) {
        this.options = newOptions || [];
        if (this.container) {
            const currentValue = this.getValue();
            const mainContainer = this.container.querySelector('.main-container');
            if (mainContainer) {
                this.element.innerHTML = '';
                this.customOptionsElement.innerHTML = '';
                
                const optionsWithOther = [...this.options, { id: 'other', name: this.otherLabel }];

                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = this.placeholder;
                this.element.appendChild(defaultOption);

                optionsWithOther.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.id;
                    optionElement.textContent = option.name;
                    this.element.appendChild(optionElement);

                    const customOption = document.createElement('div');
                    customOption.className = 'custom-option';
                    customOption.setAttribute('data-value', option.id);
                    customOption.innerHTML = `
                        <div class="option-checkbox">
                            ${SVGIcons.get('CHECK')}
                        </div>
                        <span>${option.name}</span>
                    `;
                    
                    const clickHandler = (e) => {
                        e.stopPropagation();
                        this.selectMainOption(option);
                    };
                    
                    customOption.addEventListener('click', clickHandler);
                    this.eventListeners.push({ element: customOption, event: 'click', handler: clickHandler });
                    
                    this.customOptionsElement.appendChild(customOption);
                });

                if (currentValue) {
                    this.setValue(currentValue);
                }
            }
        }
    }

    cleanup() {
        this.closeDropdown();
        super.cleanup();
    }
}

/**
 * MultiSelectWithOtherField - Enhanced with modern architecture
 */
class MultiSelectWithOtherField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        this.options = config.options || [];
        this.placeholder = config.placeholder || factory.getText('selectMultiplePlaceholder');
        this.otherLabel = config.otherLabel || factory.getText('other');
        this.otherPlaceholder = config.otherPlaceholder || `${factory.getText('other')}...`;
        this.otherValue = '';
        this.selectedValues = [];
        this.dropdownInstance = null;
        this.isOpen = false;
        
        // Initialize complex state
        this.setState({
            value: { main: [], other: '' },
            selectedValues: [],
            isOpen: false
        });
    }

    async validate() {
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            
            const hasMainSelection = this.selectedValues.length > 0;
            let result = await this.validator.validate(hasMainSelection ? this.selectedValues : [], rules);
            
            let isValid = result.isValid;
            let errors = [...result.errors];

            if (this.selectedValues.includes('other') && !this.otherValue) {
                isValid = false;
                errors.push(this.getFieldErrorMessage('required'));
                this.otherError.classList.add('show');
            } else {
                this.otherError.classList.remove('show');
            }
            
            this.setState({
                isValid: isValid,
                errors: errors
            });

            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: { isValid, errors },
                field: this
            });

            return isValid;
        } else {
            // Fallback validation
            if (this.required) {
                const hasMainSelection = this.selectedValues.length > 0;
                if (!hasMainSelection) {
                    this.showError(this.getFieldErrorMessage('selectAtLeastOne'));
                    return false;
                }
                if (this.selectedValues.includes('other') && !this.otherValue) {
                    this.otherError.classList.add('show');
                    return false;
                }
            }

            this.hideError();
            this.otherError.classList.remove('show');
            return true;
        }
    }

    render() {
        const container = this.createContainer();
        const label = this.createLabel();
        
        const optionsWithOther = [...this.options, { id: 'other', name: this.otherLabel }];

        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';

        this.element = document.createElement('select');
        this.element.id = this.id;
        this.element.name = this.name;
        this.element.multiple = true;
        this.element.style.display = 'none';

        optionsWithOther.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.name;
            this.element.appendChild(optionElement);
        });

        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper multi-select';

        this.selectDisplayElement = document.createElement('div');
        this.selectDisplayElement.className = 'select-display placeholder';
        this.selectDisplayElement.innerHTML = `
            <span>${this.placeholder}</span>
            <div class="dropdown-icon">
                ${SVGIcons.get('CHEVRON')}
            </div>
        `;

        this.customOptionsElement = document.createElement('div');
        this.customOptionsElement.className = 'custom-options multi-select';

        const selectAllOption = document.createElement('div');
        selectAllOption.className = 'custom-option select-all-option';
        selectAllOption.innerHTML = `
            <div class="option-checkbox">
                ${SVGIcons.get('CHECK')}
            </div>
            <span>${this.factory.getText('selectAll')}</span>
        `;
        
        const selectAllHandler = (e) => {
            e.stopPropagation();
            this.toggleSelectAll();
        };
        
        selectAllOption.addEventListener('click', selectAllHandler);
        this.eventListeners.push({ element: selectAllOption, event: 'click', handler: selectAllHandler });
        
        this.customOptionsElement.appendChild(selectAllOption);

        optionsWithOther.forEach(option => {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.setAttribute('data-value', option.id);
            customOption.innerHTML = `
                <div class="option-checkbox">
                    ${SVGIcons.get('CHECK')}
                </div>
                <span>${option.name}</span>
            `;
            
            const clickHandler = (e) => {
                e.stopPropagation();
                this.toggleMainOption(option, customOption);
            };
            
            customOption.addEventListener('click', clickHandler);
            this.eventListeners.push({ element: customOption, event: 'click', handler: clickHandler });
            
            this.customOptionsElement.appendChild(customOption);
        });

        selectWrapper.appendChild(this.selectDisplayElement);
        selectWrapper.appendChild(this.customOptionsElement);

        const displayClickHandler = (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        };
        
        this.selectDisplayElement.addEventListener('click', displayClickHandler);
        this.eventListeners.push({ element: this.selectDisplayElement, event: 'click', handler: displayClickHandler });

        mainContainer.appendChild(this.element);
        mainContainer.appendChild(selectWrapper);

        this.otherContainer = document.createElement('div');
        this.otherContainer.className = 'conditional-field-wrapper';
        this.otherContainer.id = `${this.id}-other-group`;
        this.otherContainer.style.display = 'none';
        this.otherContainer.style.marginTop = '10px';

        const otherLabel = document.createElement('label');
        otherLabel.className = 'form-label';
        otherLabel.textContent = this.otherLabel;

        this.otherInput = document.createElement('input');
        this.otherInput.type = 'text';
        this.otherInput.id = `${this.id}-other`;
        this.otherInput.placeholder = this.otherPlaceholder;

        this.otherError = document.createElement('div');
        this.otherError.className = 'error-message';
        this.otherError.id = `error-${this.id}-other`;
        this.otherError.innerHTML = `
            <div class="error-icon">!</div>
            <span class="error-text">${this.getFieldErrorMessage('required')}</span>
        `;

        this.otherContainer.appendChild(otherLabel);
        this.otherContainer.appendChild(this.otherInput);
        this.otherContainer.appendChild(this.otherError);

        const otherInputHandler = () => {
            this.otherValue = this.otherInput.value.trim();
            
            this.setState({ 
                value: { main: this.selectedValues.filter(v => v !== 'other'), other: this.otherValue },
                isDirty: true,
                isTouched: true 
            });
            
            if (this.otherValue) {
                this.otherError.classList.remove('show');
            }
            this.handleChange();
        };
        
        this.otherInput.addEventListener('input', otherInputHandler);
        this.eventListeners.push({ element: this.otherInput, event: 'input', handler: otherInputHandler });

        const errorElement = this.createErrorElement();

        container.appendChild(label);
        container.appendChild(mainContainer);
        container.appendChild(this.otherContainer);
        container.appendChild(errorElement);

        this.container = container;
        this.selectWrapper = selectWrapper;
        
        return container;
    }

    toggleMainOption(option, customOption) {
        const isSelected = customOption.classList.contains('selected');
        const optElement = this.element.querySelector(`option[value="${option.id}"]`);

        if (isSelected) {
            customOption.classList.remove('selected');
            if (optElement) optElement.selected = false;
            this.selectedValues = this.selectedValues.filter(val => val !== option.id);
        } else {
            customOption.classList.add('selected');
            if (optElement) optElement.selected = true;
            this.selectedValues.push(option.id);
        }

        if (this.selectedValues.includes('other')) {
            this.otherContainer.style.display = 'block';
        } else {
            this.otherContainer.style.display = 'none';
            this.otherValue = '';
            this.otherInput.value = '';
        }

        this.updateDisplayText();
        this.updateSelectAllState();
        
        this.setState({ 
            value: { main: this.selectedValues.filter(v => v !== 'other'), other: this.selectedValues.includes('other') ? this.otherValue : '' },
            selectedValues: this.selectedValues,
            isDirty: true,
            isTouched: true 
        });

        this.hideError();
        this.handleChange();
    }

    toggleSelectAll() {
        const allOptions = this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option)');
        const selectAllOption = this.customOptionsElement.querySelector('.select-all-option');
        const allSelected = Array.from(allOptions).every(opt => opt.classList.contains('selected'));

        allOptions.forEach(opt => {
            const optValue = opt.dataset.value;
            const optElement = this.element.querySelector(`option[value="${optValue}"]`);
            
            if (allSelected) {
                opt.classList.remove('selected');
                if (optElement) optElement.selected = false;
            } else {
                opt.classList.add('selected');
                if (optElement) optElement.selected = true;
            }
        });

        if (allSelected) {
            selectAllOption.classList.remove('selected');
            this.selectedValues = [];
            this.otherContainer.style.display = 'none';
            this.otherValue = '';
            this.otherInput.value = '';
        } else {
            selectAllOption.classList.add('selected');
            this.selectedValues = [...this.options.map(opt => opt.id), 'other'];
            this.otherContainer.style.display = 'block';
        }

        this.updateDisplayText();
        
        this.setState({ 
            value: { main: this.selectedValues.filter(v => v !== 'other'), other: this.selectedValues.includes('other') ? this.otherValue : '' },
            selectedValues: this.selectedValues,
            isDirty: true,
            isTouched: true 
        });

        this.handleChange();
    }

    updateSelectAllState() {
        const allOptions = this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option)');
        const selectAllOption = this.customOptionsElement.querySelector('.select-all-option');
        const allSelected = Array.from(allOptions).every(opt => opt.classList.contains('selected'));

        if (allSelected && this.selectedValues.length > 0) {
            selectAllOption.classList.add('selected');
        } else {
            selectAllOption.classList.remove('selected');
        }
    }

    updateDisplayText() {
        const span = this.selectDisplayElement.querySelector('span');
        
        if (this.selectedValues.length === 0) {
            span.textContent = this.placeholder;
            this.selectDisplayElement.classList.add('placeholder');
        } else if (this.selectedValues.length === 1) {
            const value = this.selectedValues[0];
            if (value === 'other') {
                span.textContent = this.otherLabel;
            } else {
                const option = this.options.find(opt => opt.id === value);
                span.textContent = option ? option.name : value;
            }
            this.selectDisplayElement.classList.remove('placeholder');
        } else {
            span.textContent = `${this.selectedValues.length} ${this.factory.getText('selected')}`;
            this.selectDisplayElement.classList.remove('placeholder');
        }
    }

    toggleDropdown() {
        if (this.state.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        if (this.state.isOpen) return;

        this.factory.closeAllDropdowns();
        this.customOptionsElement.classList.add('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.add('rotate');
        
        this.setState({ isOpen: true });

        this.dropdownInstance = {
            element: this.selectWrapper,
            close: () => this.closeDropdown()
        };
        this.factory.registerDropdown(this.dropdownInstance);
        
        this.eventBus?.emit('field:dropdownOpened', { fieldId: this.id });
    }

    closeDropdown() {
        if (!this.state.isOpen) return;

        this.customOptionsElement.classList.remove('show-options');
        this.selectDisplayElement.querySelector('.dropdown-icon').classList.remove('rotate');
        
        this.setState({ isOpen: false });

        if (this.dropdownInstance) {
            this.factory.unregisterDropdown(this.dropdownInstance);
            this.dropdownInstance = null;
        }
        
        this.eventBus?.emit('field:dropdownClosed', { fieldId: this.id });
    }

    getValue() {
        const result = [];
        
        if (this.state.value && typeof this.state.value === 'object') {
            if (this.state.value.main && Array.isArray(this.state.value.main)) {
                result.push(...this.state.value.main);
            }
            if (this.state.value.other) {
                result.push(this.state.value.other);
            }
        }
        
        return result;
    }

    setValue(values) {
        if (!Array.isArray(values)) {
            values = values ? [values] : [];
        }

        const existingValues = [];
        let otherValue = '';

        values.forEach(value => {
            const existingOption = this.options.find(opt => opt.id === value);
            if (existingOption) {
                existingValues.push(value);
            } else if (value) {
                otherValue = value;
            }
        });

        this.selectedValues = [...existingValues];
        if (otherValue) {
            this.selectedValues.push('other');
        }

        if (this.element) {
            Array.from(this.element.options).forEach(option => {
                option.selected = this.selectedValues.includes(option.value);
            });
        }

        if (this.customOptionsElement) {
            this.customOptionsElement.querySelectorAll('.custom-option:not(.select-all-option)')
                .forEach(opt => {
                    if (this.selectedValues.includes(opt.dataset.value)) {
                        opt.classList.add('selected');
                    } else {
                        opt.classList.remove('selected');
                    }
                });
            this.updateSelectAllState();
        }

        if (otherValue) {
            this.otherValue = otherValue;
            this.otherInput.value = otherValue;
            this.otherContainer.style.display = 'block';
        } else {
            this.otherContainer.style.display = 'none';
        }

        this.setState({ 
            value: { main: existingValues, other: otherValue },
            selectedValues: this.selectedValues,
            isDirty: false 
        });

        if (this.selectDisplayElement) {
            this.updateDisplayText();
        }
    }

    cleanup() {
        this.closeDropdown();
        super.cleanup();
    }
}

/**
 * Enhanced Range and Slider Fields with Modern Architecture
 * Updated to use BaseField patterns with state management, event bus, and service integration
 */

/**
 * SlidingWindowRangeField - Enhanced with state management and service integration
 */
class SlidingWindowRangeField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Range configuration
        this.min = config.min || 0;
        this.max = config.max || 10000;
        this.step = config.step || 100;
        this.rangeWindow = config.rangeWindow || 1000;
        this.windowStep = config.windowStep || 1000;
        this.minGap = config.minGap || 100;
        
        // Value formatting
        this.formatValue = config.formatValue || ((val) => `${parseInt(val).toLocaleString()}`);
        
        // Initial state
        this.currentMin = config.currentMin || this.min;
        this.currentMax = config.currentMax || Math.min(this.min + this.rangeWindow, this.max);
        this.selectedMin = config.defaultMin || this.currentMin + 200;
        this.selectedMax = config.defaultMax || this.currentMax - 200;
        
        // Initialize state
        this.setState({
            value: {
                min: this.selectedMin,
                max: this.selectedMax,
                currentMin: this.currentMin,
                currentMax: this.currentMax
            }
        });
        
        // Performance optimizations
        this.debounceDelay = config.debounceDelay || 50;
        this.debouncedUpdate = this.debounce(() => this.updateUI(), this.debounceDelay);
        this.debouncedChange = this.debounce(() => this.handleChange(), this.debounceDelay);
        this.positionCache = new Map();
        this.dimensionCache = new Map();
        
        // DOM element references
        this.decreaseBtn = null;
        this.increaseBtn = null;
        this.minRange = null;
        this.maxRange = null;
        this.track = null;
        this.minLabel = null;
        this.maxLabel = null;
    }

    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    async validate() {
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            if (this.customValidation) rules.custom = this.customValidation;
            
            const result = await this.validator.validate(this.getValue(), rules);
            
            this.setState({
                isValid: result.isValid,
                errors: result.errors
            });
            
            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: result,
                field: this
            });
            
            return result.isValid;
        }
        
        // Fallback validation
        if (this.required && (!this.selectedMin && !this.selectedMax)) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        return true;
    }

    validateConstraints(newValue) {
        if (this.customValidation) {
            const result = this.customValidation(newValue, this.factory.formValues);
            if (result !== true) {
                if (typeof result === 'object' && result.adjustedValue !== undefined) {
                    this.selectedMin = result.adjustedValue;
                    this.selectedMax = Math.max(this.selectedMin + this.minGap, this.selectedMax);
                    if (this.minRange && this.maxRange) {
                        this.minRange.value = this.selectedMin;
                        this.maxRange.value = this.selectedMax;
                        this.debouncedUpdate();
                    }
                    this.showError(result.message);
                    return result.adjustedValue;
                } else if (typeof result === 'string') {
                    this.showError(result);
                    return false;
                }
            } else {
                this.hideError();
            }
        }
        return newValue;
    }

    updateConstraints(newConstraints) {
        if (newConstraints.min !== undefined) {
            this.min = newConstraints.min;
            this.currentMin = Math.max(this.currentMin, newConstraints.min);
            if (this.minRange) {
                this.minRange.min = this.currentMin;
                this.maxRange.min = this.currentMin;
                if (this.selectedMin < this.currentMin) {
                    this.selectedMin = this.currentMin;
                    this.minRange.value = this.selectedMin;
                }
                if (this.selectedMax < this.currentMin + this.minGap) {
                    this.selectedMax = this.currentMin + this.minGap;
                    this.maxRange.value = this.selectedMax;
                }
                this.clearCache();
                this.debouncedUpdate();
            }
        }
        if (newConstraints.rangeWindow !== undefined) {
            this.rangeWindow = newConstraints.rangeWindow;
        }
        if (newConstraints.windowStep !== undefined) {
            this.windowStep = newConstraints.windowStep;
        }
        
        this.eventBus?.emit('field:constraintsUpdated', {
            fieldId: this.id,
            constraints: newConstraints,
            field: this
        });
    }

    clearCache() {
        this.positionCache.clear();
        this.dimensionCache.clear();
    }

    getContainerDimensions() {
        const container = this.container?.querySelector('.range-container');
        if (!container) return { width: 0, height: 0 };
        
        const cacheKey = 'container-dimensions';
        if (this.dimensionCache.has(cacheKey)) {
            return this.dimensionCache.get(cacheKey);
        }
        
        const dimensions = {
            width: container.offsetWidth,
            height: container.offsetHeight
        };
        this.dimensionCache.set(cacheKey, dimensions);
        return dimensions;
    }

    calculateLabelPosition(percent, labelElement) {
        if (!labelElement) return percent;
        
        const cacheKey = `label-pos-${percent}-${labelElement.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const containerDimensions = this.getContainerDimensions();
        if (containerDimensions.width === 0) return percent;
        
        const labelWidth = labelElement.offsetWidth || 100;
        const leftBoundary = (labelWidth / 2) / containerDimensions.width * 100;
        const rightBoundary = 100 - leftBoundary;
        
        let result = percent;
        if (percent < leftBoundary) {
            result = leftBoundary;
        } else if (percent > rightBoundary) {
            result = rightBoundary;
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    checkLabelCollision(minPercent, maxPercent, minLabel, maxLabel) {
        if (!minLabel || !maxLabel) return { minPercent, maxPercent };
        
        const cacheKey = `collision-${minPercent}-${maxPercent}-${minLabel.offsetWidth}-${maxLabel.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const minWidth = minLabel.offsetWidth || 100;
        const maxWidth = maxLabel.offsetWidth || 100;
        const containerDimensions = this.getContainerDimensions();
        
        if (containerDimensions.width === 0) return { minPercent, maxPercent };
        
        const minDistance = ((minWidth + maxWidth) / 2 + 10) / containerDimensions.width * 100;
        const currentDistance = maxPercent - minPercent;
        
        let result = { minPercent, maxPercent };
        
        if (currentDistance < minDistance) {
            const center = (minPercent + maxPercent) / 2;
            const halfDistance = minDistance / 2;
            let adjustedMinPercent = center - halfDistance;
            let adjustedMaxPercent = center + halfDistance;
            
            if (adjustedMinPercent < 0) {
                adjustedMinPercent = 0;
                adjustedMaxPercent = minDistance;
            } else if (adjustedMaxPercent > 100) {
                adjustedMaxPercent = 100;
                adjustedMinPercent = 100 - minDistance;
            }
            
            result = {
                minPercent: adjustedMinPercent,
                maxPercent: adjustedMaxPercent
            };
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    calculateTrianglePosition(originalPercent, finalPercent, labelElement, containerElement) {
        if (!labelElement || !containerElement) return '50%';
        
        const containerWidth = containerElement.offsetWidth;
        const labelWidth = labelElement.offsetWidth;
        
        if (containerWidth === 0 || labelWidth === 0) return '50%';
        
        const originalHandlePosition = (originalPercent / 100) * containerWidth;
        const finalLabelPosition = (finalPercent / 100) * containerWidth;
        const offsetFromCenter = originalHandlePosition - finalLabelPosition;
        const triangleOffset = (offsetFromCenter / labelWidth) * 100;
        const trianglePosition = 50 + triangleOffset;
        
        const triangleHalfWidth = 5;
        const safetyMargin = 4;
        const minSafeDistance = triangleHalfWidth + safetyMargin;
        const minTrianglePos = (minSafeDistance / labelWidth) * 100;
        const maxTrianglePos = 100 - minTrianglePos;
        const absoluteMinPos = Math.max(minTrianglePos, 15);
        const absoluteMaxPos = Math.min(maxTrianglePos, 85);
        
        return `${Math.max(absoluteMinPos, Math.min(absoluteMaxPos, trianglePosition))}%`;
    }

    updateTrianglePosition(labelElement, originalPercent, finalPercent) {
        if (!labelElement) return;
        const container = this.container?.querySelector('.range-container');
        const trianglePos = this.calculateTrianglePosition(originalPercent, finalPercent, labelElement, container);
        labelElement.style.setProperty('--triangle-left', trianglePos);
    }

    render() {
        const container = this.createContainer();
        
        if (this.label) {
            container.appendChild(this.createLabel());
        }

        const slidingLayout = document.createElement('div');
        slidingLayout.className = 'sliding-window-layout';

        // Decrease button
        this.decreaseBtn = document.createElement('button');
        this.decreaseBtn.type = 'button';
        this.decreaseBtn.className = 'slider-control-btn';
        this.decreaseBtn.innerHTML = SVGIcons.get('MINUS');

        // Range container
        const rangeContainer = document.createElement('div');
        rangeContainer.className = 'range-container';

        const trackBg = document.createElement('div');
        trackBg.className = 'slider-track-bg';

        this.track = document.createElement('div');
        this.track.className = 'slider-track';
        trackBg.appendChild(this.track);

        // Min range input
        this.minRange = document.createElement('input');
        this.minRange.type = 'range';
        this.minRange.className = 'range-input';
        this.minRange.min = this.currentMin;
        this.minRange.max = this.currentMax;
        this.minRange.value = this.selectedMin;
        this.minRange.step = this.step;

        // Max range input
        this.maxRange = document.createElement('input');
        this.maxRange.type = 'range';
        this.maxRange.className = 'range-input';
        this.maxRange.min = this.currentMin;
        this.maxRange.max = this.currentMax;
        this.maxRange.value = this.selectedMax;
        this.maxRange.step = this.step;

        // Labels
        this.minLabel = document.createElement('div');
        this.minLabel.className = 'slider-value-label';

        this.maxLabel = document.createElement('div');
        this.maxLabel.className = 'slider-value-label';

        rangeContainer.appendChild(trackBg);
        rangeContainer.appendChild(this.minRange);
        rangeContainer.appendChild(this.maxRange);
        rangeContainer.appendChild(this.minLabel);
        rangeContainer.appendChild(this.maxLabel);

        // Increase button
        this.increaseBtn = document.createElement('button');
        this.increaseBtn.type = 'button';
        this.increaseBtn.className = 'slider-control-btn';
        this.increaseBtn.innerHTML = SVGIcons.get('PLUS');

        slidingLayout.appendChild(this.decreaseBtn);
        slidingLayout.appendChild(rangeContainer);
        slidingLayout.appendChild(this.increaseBtn);

        container.appendChild(slidingLayout);
        container.appendChild(this.createErrorElement());

        this.setupEventListeners();
        this.updateUI();
        this.container = container;
        
        this.eventBus?.emit('field:rendered', { fieldId: this.id, field: this });
        
        return container;
    }

    setupEventListeners() {
        const minChangeHandler = () => this.handleMinChange();
        const maxChangeHandler = () => this.handleMaxChange();
        const decreaseHandler = () => this.decreaseRange();
        const increaseHandler = () => this.increaseRange();
        const resizeHandler = () => this.clearCache();

        this.minRange.addEventListener('input', minChangeHandler);
        this.maxRange.addEventListener('input', maxChangeHandler);
        this.decreaseBtn.addEventListener('click', decreaseHandler);
        this.increaseBtn.addEventListener('click', increaseHandler);
        window.addEventListener('resize', resizeHandler);

        // Store for cleanup
        this.eventListeners.push(
            { element: this.minRange, event: 'input', handler: minChangeHandler },
            { element: this.maxRange, event: 'input', handler: maxChangeHandler },
            { element: this.decreaseBtn, event: 'click', handler: decreaseHandler },
            { element: this.increaseBtn, event: 'click', handler: increaseHandler },
            { element: window, event: 'resize', handler: resizeHandler }
        );
    }

    handleMinChange() {
        const minVal = parseInt(this.minRange.value);
        const maxVal = parseInt(this.maxRange.value);
        
        if (maxVal - minVal < this.minGap) {
            this.minRange.value = maxVal - this.minGap;
        }
        
        this.selectedMin = parseInt(this.minRange.value);
        this.selectedMax = parseInt(this.maxRange.value);
        
        const newValue = {
            min: this.selectedMin,
            max: this.selectedMax,
            currentMin: this.currentMin,
            currentMax: this.currentMax
        };
        
        const validatedValue = this.validateConstraints(newValue);
        if (validatedValue !== false) {
            this.setState({
                value: newValue,
                isDirty: true,
                isTouched: true
            });
            
            this.debouncedUpdate();
            this.debouncedChange();
        }
    }

    handleMaxChange() {
        const minVal = parseInt(this.minRange.value);
        const maxVal = parseInt(this.maxRange.value);
        
        if (maxVal - minVal < this.minGap) {
            this.maxRange.value = minVal + this.minGap;
        }
        
        this.selectedMin = parseInt(this.minRange.value);
        this.selectedMax = parseInt(this.maxRange.value);
        
        const newValue = {
            min: this.selectedMin,
            max: this.selectedMax,
            currentMin: this.currentMin,
            currentMax: this.currentMax
        };
        
        const validatedValue = this.validateConstraints(newValue);
        if (validatedValue !== false) {
            this.setState({
                value: newValue,
                isDirty: true,
                isTouched: true
            });
            
            this.debouncedUpdate();
            this.debouncedChange();
        }
    }

    increaseRange() {
        if (this.currentMax < this.max) {
            this.currentMin = Math.min(this.currentMin + this.windowStep, this.max - this.rangeWindow);
            this.currentMax = Math.min(this.currentMax + this.windowStep, this.max);
            this.updateSliderAttributes();
            this.clearCache();
            this.updateUI();
            
            this.eventBus?.emit('field:rangeIncreased', {
                fieldId: this.id,
                currentMin: this.currentMin,
                currentMax: this.currentMax,
                field: this
            });
        }
    }

    decreaseRange() {
        if (this.currentMin > this.min) {
            this.currentMin = Math.max(this.currentMin - this.windowStep, this.min);
            this.currentMax = Math.max(this.currentMax - this.windowStep, this.min + this.rangeWindow);
            this.updateSliderAttributes();
            this.clearCache();
            this.updateUI();
            
            this.eventBus?.emit('field:rangeDecreased', {
                fieldId: this.id,
                currentMin: this.currentMin,
                currentMax: this.currentMax,
                field: this
            });
        }
    }

    updateSliderAttributes() {
        this.minRange.min = this.currentMin;
        this.minRange.max = this.currentMax;
        this.maxRange.min = this.currentMin;
        this.maxRange.max = this.currentMax;
        
        if (this.selectedMin < this.currentMin) this.selectedMin = this.currentMin;
        if (this.selectedMin > this.currentMax) this.selectedMin = this.currentMax - this.minGap;
        if (this.selectedMax > this.currentMax) this.selectedMax = this.currentMax;
        if (this.selectedMax < this.currentMin + this.minGap) this.selectedMax = this.currentMin + this.minGap;
        
        this.minRange.value = this.selectedMin;
        this.maxRange.value = this.selectedMax;
        
        this.setState({
            value: {
                min: this.selectedMin,
                max: this.selectedMax,
                currentMin: this.currentMin,
                currentMax: this.currentMax
            }
        });
    }

    updateUI() {
        let minPercent = ((this.selectedMin - this.currentMin) / (this.currentMax - this.currentMin)) * 100;
        let maxPercent = ((this.selectedMax - this.currentMin) / (this.currentMax - this.currentMin)) * 100;
        
        const originalMinPercent = minPercent;
        const originalMaxPercent = maxPercent;
        
        this.track.style.left = minPercent + '%';
        this.track.style.width = (maxPercent - minPercent) + '%';
        
        requestAnimationFrame(() => {
            const boundaryCheckedMin = this.calculateLabelPosition(minPercent, this.minLabel);
            const boundaryCheckedMax = this.calculateLabelPosition(maxPercent, this.maxLabel);
            
            const { minPercent: finalMinPercent, maxPercent: finalMaxPercent } = 
                this.checkLabelCollision(boundaryCheckedMin, boundaryCheckedMax, this.minLabel, this.maxLabel);
            
            this.minLabel.style.left = finalMinPercent + '%';
            this.maxLabel.style.left = finalMaxPercent + '%';
            
            // Use formatter service if available
            const formattedMin = this.formatter ? 
                this.formatter.format(this.selectedMin, { type: 'number' }) :
                this.formatValue(this.selectedMin);
            const formattedMax = this.formatter ? 
                this.formatter.format(this.selectedMax, { type: 'number' }) :
                this.formatValue(this.selectedMax);
            
            this.minLabel.textContent = formattedMin;
            this.maxLabel.textContent = formattedMax;
            
            this.updateTrianglePosition(this.minLabel, originalMinPercent, finalMinPercent);
            this.updateTrianglePosition(this.maxLabel, originalMaxPercent, finalMaxPercent);
        });
        
        this.decreaseBtn.disabled = this.currentMin <= this.min;
        this.increaseBtn.disabled = this.currentMax >= this.max;
    }

    getValue() {
        return this.state.value;
    }

    getDisplayValue() {
        const formattedMin = this.formatter ? 
            this.formatter.format(this.selectedMin, { type: 'number' }) :
            this.formatValue(this.selectedMin);
        const formattedMax = this.formatter ? 
            this.formatter.format(this.selectedMax, { type: 'number' }) :
            this.formatValue(this.selectedMax);
        return `${formattedMin} - ${formattedMax}`;
    }

    setValue(value, options = {}) {
        if (typeof value === 'object' && value !== null) {
            this.selectedMin = value.min || this.selectedMin;
            this.selectedMax = value.max || this.selectedMax;
            this.currentMin = value.currentMin || this.currentMin;
            this.currentMax = value.currentMax || this.currentMax;
            
            if (this.minRange) {
                this.updateSliderAttributes();
                this.clearCache();
                this.updateUI();
            }
        }
        
        super.setValue(value, options);
    }
}

/**
 * DualRangeField - Enhanced with proper state management
 */
class DualRangeField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        this.min = config.min || 0;
        this.max = config.max || 10000;
        this.step = config.step || 100;
        this.minGap = config.minGap || 500;
        this.formatValue = config.formatValue || ((val) => `${parseInt(val).toLocaleString()}`);
        this.selectedMin = config.defaultMin || this.min + 1000;
        this.selectedMax = config.defaultMax || this.max - 1000;
        
        // Initialize state
        this.setState({
            value: {
                min: this.selectedMin,
                max: this.selectedMax
            }
        });
        
        // Performance optimizations
        this.debounceDelay = config.debounceDelay || 50;
        this.debouncedUpdate = this.debounce(() => this.updateUI(), this.debounceDelay);
        this.debouncedChange = this.debounce(() => this.handleChange(), this.debounceDelay);
        this.positionCache = new Map();
        this.dimensionCache = new Map();
        
        // DOM element references
        this.minRange = null;
        this.maxRange = null;
        this.progress = null;
        this.minLabel = null;
        this.maxLabel = null;
    }

    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    async validate() {
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            if (this.customValidation) rules.custom = this.customValidation;
            
            const result = await this.validator.validate(this.getValue(), rules);
            
            this.setState({
                isValid: result.isValid,
                errors: result.errors
            });
            
            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: result,
                field: this
            });
            
            return result.isValid;
        }
        
        if (this.required && (!this.selectedMin && !this.selectedMax)) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        return true;
    }

    validateConstraints(newValue) {
        if (this.customValidation) {
            const result = this.customValidation(newValue, this.factory.formValues);
            if (result !== true) {
                if (typeof result === 'object' && result.adjustedValue !== undefined) {
                    this.selectedMin = result.adjustedValue;
                    this.selectedMax = Math.max(this.selectedMin + this.minGap, this.selectedMax);
                    if (this.minRange && this.maxRange) {
                        this.minRange.value = this.selectedMin;
                        this.maxRange.value = this.selectedMax;
                        this.debouncedUpdate();
                    }
                    this.showError(result.message);
                    return result.adjustedValue;
                } else if (typeof result === 'string') {
                    this.showError(result);
                    return false;
                }
            } else {
                this.hideError();
            }
        }
        return newValue;
    }

    updateConstraints(newConstraints) {
        if (newConstraints.min !== undefined) {
            this.min = newConstraints.min;
            if (this.minRange) {
                this.minRange.min = this.min;
                this.maxRange.min = this.min;
                if (this.selectedMin < this.min) {
                    this.selectedMin = this.min;
                    this.minRange.value = this.selectedMin;
                }
                if (this.selectedMax < this.min + this.minGap) {
                    this.selectedMax = this.min + this.minGap;
                    this.maxRange.value = this.selectedMax;
                }
                this.clearCache();
                this.debouncedUpdate();
            }
        }
        
        if (newConstraints.max !== undefined) {
            this.max = newConstraints.max;
            if (this.minRange) {
                this.minRange.max = this.max;
                this.maxRange.max = this.max;
                this.clearCache();
                this.debouncedUpdate();
            }
        }
        
        this.eventBus?.emit('field:constraintsUpdated', {
            fieldId: this.id,
            constraints: newConstraints,
            field: this
        });
    }

    clearCache() {
        this.positionCache.clear();
        this.dimensionCache.clear();
    }

    getContainerDimensions() {
        const container = this.container?.querySelector('.slider-container');
        if (!container) return { width: 0, height: 0 };
        
        const cacheKey = 'container-dimensions';
        if (this.dimensionCache.has(cacheKey)) {
            return this.dimensionCache.get(cacheKey);
        }
        
        const dimensions = {
            width: container.offsetWidth,
            height: container.offsetHeight
        };
        this.dimensionCache.set(cacheKey, dimensions);
        return dimensions;
    }

    calculateLabelPosition(percent, labelElement) {
        if (!labelElement) return percent;
        
        const cacheKey = `label-pos-${percent}-${labelElement.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const containerDimensions = this.getContainerDimensions();
        if (containerDimensions.width === 0) return percent;
        
        const labelWidth = labelElement.offsetWidth || 100;
        const leftBoundary = (labelWidth / 2) / containerDimensions.width * 100;
        const rightBoundary = 100 - leftBoundary;
        
        let result = percent;
        if (percent < leftBoundary) {
            result = leftBoundary;
        } else if (percent > rightBoundary) {
            result = rightBoundary;
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    checkLabelCollision(minPercent, maxPercent, minLabel, maxLabel) {
        if (!minLabel || !maxLabel) return { minPercent, maxPercent };
        
        const cacheKey = `collision-${minPercent}-${maxPercent}-${minLabel.offsetWidth}-${maxLabel.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const minWidth = minLabel.offsetWidth || 100;
        const maxWidth = maxLabel.offsetWidth || 100;
        const containerDimensions = this.getContainerDimensions();
        
        if (containerDimensions.width === 0) return { minPercent, maxPercent };
        
        const minDistance = ((minWidth + maxWidth) / 2 + 10) / containerDimensions.width * 100;
        const currentDistance = maxPercent - minPercent;
        
        let result = { minPercent, maxPercent };
        
        if (currentDistance < minDistance) {
            const center = (minPercent + maxPercent) / 2;
            const halfDistance = minDistance / 2;
            let adjustedMinPercent = center - halfDistance;
            let adjustedMaxPercent = center + halfDistance;
            
            if (adjustedMinPercent < 0) {
                adjustedMinPercent = 0;
                adjustedMaxPercent = minDistance;
            } else if (adjustedMaxPercent > 100) {
                adjustedMaxPercent = 100;
                adjustedMinPercent = 100 - minDistance;
            }
            
            result = {
                minPercent: adjustedMinPercent,
                maxPercent: adjustedMaxPercent
            };
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    calculateTrianglePosition(originalPercent, finalPercent, labelElement, containerElement) {
        if (!labelElement || !containerElement) return '50%';
        
        const containerWidth = containerElement.offsetWidth;
        const labelWidth = labelElement.offsetWidth;
        
        if (containerWidth === 0 || labelWidth === 0) return '50%';
        
        const originalHandlePosition = (originalPercent / 100) * containerWidth;
        const finalLabelPosition = (finalPercent / 100) * containerWidth;
        const offsetFromCenter = originalHandlePosition - finalLabelPosition;
        const triangleOffset = (offsetFromCenter / labelWidth) * 100;
        const trianglePosition = 50 + triangleOffset;
        
        const triangleHalfWidth = 5;
        const safetyMargin = 4;
        const minSafeDistance = triangleHalfWidth + safetyMargin;
        const minTrianglePos = (minSafeDistance / labelWidth) * 100;
        const maxTrianglePos = 100 - minTrianglePos;
        const absoluteMinPos = Math.max(minTrianglePos, 15);
        const absoluteMaxPos = Math.min(maxTrianglePos, 85);
        
        return `${Math.max(absoluteMinPos, Math.min(absoluteMaxPos, trianglePosition))}%`;
    }

    updateTrianglePosition(labelElement, originalPercent, finalPercent) {
        if (!labelElement) return;
        const container = this.container?.querySelector('.slider-container');
        const trianglePos = this.calculateTrianglePosition(originalPercent, finalPercent, labelElement, container);
        labelElement.style.setProperty('--triangle-left', trianglePos);
    }

    render() {
        const container = this.createContainer();
        
        if (this.label) {
            container.appendChild(this.createLabel());
        }

        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';

        const trackBg = document.createElement('div');
        trackBg.className = 'slider-track-bg';

        this.progress = document.createElement('div');
        this.progress.className = 'slider-progress';
        trackBg.appendChild(this.progress);

        this.minRange = document.createElement('input');
        this.minRange.type = 'range';
        this.minRange.className = 'range-input';
        this.minRange.min = this.min;
        this.minRange.max = this.max;
        this.minRange.value = this.selectedMin;
        this.minRange.step = this.step;

        this.maxRange = document.createElement('input');
        this.maxRange.type = 'range';
        this.maxRange.className = 'range-input';
        this.maxRange.min = this.min;
        this.maxRange.max = this.max;
        this.maxRange.value = this.selectedMax;
        this.maxRange.step = this.step;

        this.minLabel = document.createElement('div');
        this.minLabel.className = 'slider-value-label';

        this.maxLabel = document.createElement('div');
        this.maxLabel.className = 'slider-value-label';

        sliderContainer.appendChild(trackBg);
        sliderContainer.appendChild(this.minRange);
        sliderContainer.appendChild(this.maxRange);
        sliderContainer.appendChild(this.minLabel);
        sliderContainer.appendChild(this.maxLabel);

        container.appendChild(sliderContainer);
        container.appendChild(this.createErrorElement());

        this.setupEventListeners();
        this.updateUI();
        this.container = container;
        
        this.eventBus?.emit('field:rendered', { fieldId: this.id, field: this });
        
        return container;
    }

    setupEventListeners() {
        const minChangeHandler = () => this.handleMinChange();
        const maxChangeHandler = () => this.handleMaxChange();
        const resizeHandler = () => this.clearCache();

        this.minRange.addEventListener('input', minChangeHandler);
        this.maxRange.addEventListener('input', maxChangeHandler);
        window.addEventListener('resize', resizeHandler);

        this.eventListeners.push(
            { element: this.minRange, event: 'input', handler: minChangeHandler },
            { element: this.maxRange, event: 'input', handler: maxChangeHandler },
            { element: window, event: 'resize', handler: resizeHandler }
        );
    }

    handleMinChange() {
        const minVal = parseInt(this.minRange.value);
        const maxVal = parseInt(this.maxRange.value);
        
        if (maxVal - minVal < this.minGap) {
            this.minRange.value = maxVal - this.minGap;
        }
        
        this.selectedMin = parseInt(this.minRange.value);
        
        const newValue = { min: this.selectedMin, max: this.selectedMax };
        const validatedValue = this.validateConstraints(newValue);
        
        if (validatedValue !== false) {
            this.setState({
                value: newValue,
                isDirty: true,
                isTouched: true
            });
            
            this.debouncedUpdate();
            this.debouncedChange();
        }
    }

    handleMaxChange() {
        const minVal = parseInt(this.minRange.value);
        const maxVal = parseInt(this.maxRange.value);
        
        if (maxVal - minVal < this.minGap) {
            this.maxRange.value = minVal + this.minGap;
        }
        
        this.selectedMax = parseInt(this.maxRange.value);
        
        const newValue = { min: this.selectedMin, max: this.selectedMax };
        const validatedValue = this.validateConstraints(newValue);
        
        if (validatedValue !== false) {
            this.setState({
                value: newValue,
                isDirty: true,
                isTouched: true
            });
            
            this.debouncedUpdate();
            this.debouncedChange();
        }
    }

    updateUI() {
        let minPercent = ((this.selectedMin - this.min) / (this.max - this.min)) * 100;
        let maxPercent = ((this.selectedMax - this.min) / (this.max - this.min)) * 100;
        
        const originalMinPercent = minPercent;
        const originalMaxPercent = maxPercent;
        
        this.progress.style.left = minPercent + '%';
        this.progress.style.width = (maxPercent - minPercent) + '%';
        
        requestAnimationFrame(() => {
            this.clearCache();
            
            const boundaryCheckedMin = this.calculateLabelPosition(minPercent, this.minLabel);
            const boundaryCheckedMax = this.calculateLabelPosition(maxPercent, this.maxLabel);
            
            const { minPercent: finalMinPercent, maxPercent: finalMaxPercent } = 
                this.checkLabelCollision(boundaryCheckedMin, boundaryCheckedMax, this.minLabel, this.maxLabel);
            
            this.minLabel.style.left = finalMinPercent + '%';
            this.maxLabel.style.left = finalMaxPercent + '%';
            
            // Use formatter service if available
            const formattedMin = this.formatter ? 
                this.formatter.format(this.selectedMin, { type: 'number' }) :
                this.formatValue(this.selectedMin);
            const formattedMax = this.formatter ? 
                this.formatter.format(this.selectedMax, { type: 'number' }) :
                this.formatValue(this.selectedMax);
            
            this.minLabel.textContent = formattedMin;
            this.maxLabel.textContent = formattedMax;
            
            this.updateTrianglePosition(this.minLabel, originalMinPercent, finalMinPercent);
            this.updateTrianglePosition(this.maxLabel, originalMaxPercent, finalMaxPercent);
        });
    }

    getValue() {
        return this.state.value;
    }

    setValue(value, options = {}) {
        if (typeof value === 'object' && value !== null) {
            this.selectedMin = value.min || this.selectedMin;
            this.selectedMax = value.max || this.selectedMax;
            
            if (this.minRange && this.maxRange) {
                this.minRange.value = this.selectedMin;
                this.maxRange.value = this.selectedMax;
                this.clearCache();
                this.updateUI();
            }
        }
        
        super.setValue(value, options);
    }
}

/**
 * OptionsSliderField - Enhanced with proper state management
 */
class OptionsSliderField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        this.options = config.options || [];
        this.showMarkers = config.showMarkers !== false;
        
        // Proper undefined checking for defaultIndex
        this.currentIndex = config.defaultIndex !== undefined ?
            config.defaultIndex :
            Math.floor(this.options.length / 2);
        
        // Initialize state with current value
        this.setState({
            value: this.getCurrentValue()
        });
        
        // Performance optimizations
        this.debounceDelay = config.debounceDelay || 50;
        this.debouncedUpdate = this.debounce(() => this.updateUI(), this.debounceDelay);
        this.debouncedChange = this.debounce(() => this.handleChange(), this.debounceDelay);
        this.positionCache = new Map();
        this.dimensionCache = new Map();
        
        // DOM element references
        this.slider = null;
        this.progress = null;
        this.valueLabel = null;
        this.markersContainer = null;
    }

    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    async validate() {
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            if (this.customValidation) rules.custom = this.customValidation;
            
            const result = await this.validator.validate(this.getValue(), rules);
            
            this.setState({
                isValid: result.isValid,
                errors: result.errors
            });
            
            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: result,
                field: this
            });
            
            return result.isValid;
        }
        
        if (this.required && (this.getValue() === undefined || this.getValue() === null || this.getValue() === '')) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        return true;
    }

    getCurrentValue() {
        if (this.currentIndex >= 0 && this.currentIndex < this.options.length) {
            const option = this.options[this.currentIndex];
            return typeof option === 'object' ? option.value : option;
        }
        return '';
    }

    getCurrentDisplay() {
        if (this.currentIndex >= 0 && this.currentIndex < this.options.length) {
            const option = this.options[this.currentIndex];
            return typeof option === 'object' ? (option.display || option.label || option.value) : option;
        }
        return '';
    }

    validateConstraints(newValue) {
        if (this.customValidation) {
            const result = this.customValidation(newValue, this.factory.formValues);
            if (result !== true) {
                if (typeof result === 'object' && result.adjustedValue !== undefined) {
                    const adjustedIndex = this.options.findIndex(opt =>
                        (typeof opt === 'object' ? opt.value : opt) === result.adjustedValue
                    );
                    if (adjustedIndex !== -1) {
                        this.currentIndex = adjustedIndex;
                        this.setState({ value: result.adjustedValue });
                        if (this.slider) {
                            this.slider.value = this.currentIndex;
                            this.debouncedUpdate();
                        }
                    }
                    this.showError(result.message);
                    return result.adjustedValue;
                } else if (typeof result === 'string') {
                    this.showError(result);
                    return false;
                }
            } else {
                this.hideError();
            }
        }
        return newValue;
    }

    updateConstraints(newConstraints) {
        if (newConstraints.options !== undefined) {
            this.options = newConstraints.options;
            if (this.currentIndex >= this.options.length) {
                this.currentIndex = this.options.length - 1;
            }
            if (this.slider) {
                this.slider.max = this.options.length - 1;
                this.slider.value = this.currentIndex;
                this.setState({ value: this.getCurrentValue() });
                if (this.showMarkers && this.markersContainer) {
                    this.createMarkers();
                }
                this.clearCache();
                this.debouncedUpdate();
            }
        }
        
        this.eventBus?.emit('field:constraintsUpdated', {
            fieldId: this.id,
            constraints: newConstraints,
            field: this
        });
    }

    clearCache() {
        this.positionCache.clear();
        this.dimensionCache.clear();
    }

    getContainerDimensions() {
        const container = this.container?.querySelector('.slider-container');
        if (!container) return { width: 0, height: 0 };
        
        const cacheKey = 'container-dimensions';
        if (this.dimensionCache.has(cacheKey)) {
            return this.dimensionCache.get(cacheKey);
        }
        
        const dimensions = {
            width: container.offsetWidth,
            height: container.offsetHeight
        };
        this.dimensionCache.set(cacheKey, dimensions);
        return dimensions;
    }

    calculateLabelPosition(percent, labelElement) {
        if (!labelElement) return percent;
        
        const cacheKey = `label-pos-${percent}-${labelElement.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const containerDimensions = this.getContainerDimensions();
        if (containerDimensions.width === 0) return percent;
        
        const labelWidth = labelElement.offsetWidth || 100;
        const leftBoundary = (labelWidth / 2) / containerDimensions.width * 100;
        const rightBoundary = 100 - leftBoundary;
        
        let result = percent;
        if (percent < leftBoundary) {
            result = leftBoundary;
        } else if (percent > rightBoundary) {
            result = rightBoundary;
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    calculateTrianglePosition(originalPercent, finalPercent, labelElement, containerElement) {
        if (!labelElement || !containerElement) return '50%';
        
        const containerWidth = containerElement.offsetWidth;
        const labelWidth = labelElement.offsetWidth;
        
        if (containerWidth === 0 || labelWidth === 0) return '50%';
        
        const originalHandlePosition = (originalPercent / 100) * containerWidth;
        const finalLabelPosition = (finalPercent / 100) * containerWidth;
        const offsetFromCenter = originalHandlePosition - finalLabelPosition;
        const triangleOffset = (offsetFromCenter / labelWidth) * 100;
        const trianglePosition = 50 + triangleOffset;
        
        const triangleHalfWidth = 5;
        const safetyMargin = 4;
        const minSafeDistance = triangleHalfWidth + safetyMargin;
        const minTrianglePos = (minSafeDistance / labelWidth) * 100;
        const maxTrianglePos = 100 - minTrianglePos;
        const absoluteMinPos = Math.max(minTrianglePos, 15);
        const absoluteMaxPos = Math.min(maxTrianglePos, 85);
        
        return `${Math.max(absoluteMinPos, Math.min(absoluteMaxPos, trianglePosition))}%`;
    }

    updateTrianglePosition(labelElement, originalPercent, finalPercent) {
        if (!labelElement) return;
        const container = this.container?.querySelector('.slider-container');
        const trianglePos = this.calculateTrianglePosition(originalPercent, finalPercent, labelElement, container);
        labelElement.style.setProperty('--triangle-left', trianglePos);
    }

    render() {
        const container = this.createContainer();
        
        if (this.label) {
            container.appendChild(this.createLabel());
        }

        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';

        if (this.showMarkers) {
            this.markersContainer = document.createElement('div');
            this.markersContainer.className = 'slider-markers';
            this.createMarkers();
            sliderContainer.appendChild(this.markersContainer);
        }

        const trackBg = document.createElement('div');
        trackBg.className = 'slider-track-bg';

        this.progress = document.createElement('div');
        this.progress.className = 'slider-progress';
        trackBg.appendChild(this.progress);

        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.className = 'range-input';
        this.slider.id = this.id;
        this.slider.min = 0;
        this.slider.max = this.options.length - 1;
        this.slider.value = this.currentIndex;
        this.slider.step = 1;

        this.valueLabel = document.createElement('div');
        this.valueLabel.className = 'slider-value-label';

        sliderContainer.appendChild(trackBg);
        sliderContainer.appendChild(this.slider);
        sliderContainer.appendChild(this.valueLabel);

        container.appendChild(sliderContainer);
        container.appendChild(this.createErrorElement());

        this.setupEventListeners();
        this.updateUI();
        this.container = container;
        
        this.eventBus?.emit('field:rendered', { fieldId: this.id, field: this });
        
        return container;
    }

    createMarkers() {
        if (!this.markersContainer) return;
        
        this.markersContainer.innerHTML = '';
        this.options.forEach((option, index) => {
            const marker = document.createElement('div');
            marker.className = 'slider-marker';
            marker.dataset.index = index;
            
            const display = typeof option === 'object' ? (option.display || option.label || option.value) : option;
            marker.textContent = display;
            
            const clickHandler = () => {
                const newValue = typeof option === 'object' ? option.value : option;
                const validatedValue = this.validateConstraints(newValue);
                if (validatedValue !== false) {
                    this.currentIndex = index;
                    this.setState({
                        value: this.getCurrentValue(),
                        isDirty: true,
                        isTouched: true
                    });
                    this.slider.value = index;
                    this.debouncedUpdate();
                    this.debouncedChange();
                }
            };
            
            marker.addEventListener('click', clickHandler);
            this.eventListeners.push({ element: marker, event: 'click', handler: clickHandler });
            
            this.markersContainer.appendChild(marker);
        });
    }

    setupEventListeners() {
        const inputHandler = () => {
            this.currentIndex = parseInt(this.slider.value);
            const newValue = this.getCurrentValue();
            const validatedValue = this.validateConstraints(newValue);
            if (validatedValue !== false) {
                this.setState({
                    value: validatedValue,
                    isDirty: true,
                    isTouched: true
                });
                this.debouncedUpdate();
                this.debouncedChange();
            }
        };
        
        const resizeHandler = () => this.clearCache();

        this.slider.addEventListener('input', inputHandler);
        window.addEventListener('resize', resizeHandler);

        this.eventListeners.push(
            { element: this.slider, event: 'input', handler: inputHandler },
            { element: window, event: 'resize', handler: resizeHandler }
        );
    }

    updateUI() {
        const percent = this.options.length > 1 ? (this.currentIndex / (this.options.length - 1)) * 100 : 0;
        const originalPercent = percent;
        
        this.progress.style.width = percent + '%';
        
        requestAnimationFrame(() => {
            this.clearCache();
            
            const finalPercent = this.calculateLabelPosition(percent, this.valueLabel);
            this.valueLabel.style.left = finalPercent + '%';
            this.valueLabel.textContent = this.getCurrentDisplay();
            
            this.updateTrianglePosition(this.valueLabel, originalPercent, finalPercent);
        });
        
        if (this.showMarkers && this.markersContainer) {
            this.markersContainer.querySelectorAll('.slider-marker')
                .forEach((marker, index) => {
                    marker.classList.toggle('active', index === this.currentIndex);
                });
        }
    }

    getValue() {
        return this.state.value;
    }

    setValue(value, options = {}) {
        const index = this.options.findIndex(opt =>
            (typeof opt === 'object' ? opt.value : opt) === value
        );
        if (index !== -1) {
            this.currentIndex = index;
            if (this.slider) {
                this.slider.value = index;
                this.clearCache();
                this.updateUI();
            }
        }
        
        super.setValue(value, options);
    }
}

/**
 * SliderField - Enhanced with proper state management
 */
class SliderField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        this.min = config.min || 0;
        this.max = config.max || 10000;
        this.step = config.step || 100;
        this.sliderType = config.sliderType || 'currency';
        this.formatValue = config.formatValue || this.getDefaultFormatter();
        
        // Proper undefined checking for value/defaultValue
        const initialValue = config.value !== undefined ?
            config.value :
            (config.defaultValue !== undefined ?
                config.defaultValue :
                (this.min + this.max) / 2);
        
        // Initialize state
        this.setState({
            value: initialValue
        });
        
        // Performance optimizations
        this.debounceDelay = config.debounceDelay || 50;
        this.debouncedUpdate = this.debounce(() => this.updateUI(), this.debounceDelay);
        this.debouncedChange = this.debounce(() => this.handleChange(), this.debounceDelay);
        this.positionCache = new Map();
        this.dimensionCache = new Map();
        
        // DOM element references
        this.slider = null;
        this.progress = null;
        this.valueLabel = null;
    }

    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    async validate() {
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            if (this.customValidation) rules.custom = this.customValidation;
            
            const result = await this.validator.validate(this.getValue(), rules);
            
            this.setState({
                isValid: result.isValid,
                errors: result.errors
            });
            
            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: result,
                field: this
            });
            
            return result.isValid;
        }
        
        if (this.required && (this.getValue() === null || this.getValue() === undefined || this.getValue() === '')) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        return true;
    }

    getDefaultFormatter() {
        switch (this.sliderType) {
            case 'currency':
                return (val) => `${parseInt(val).toLocaleString()}`;
            case 'percentage':
                return (val) => `${parseFloat(val).toFixed(1)}%`;
            case 'number':
            default:
                return (val) => val.toString();
        }
    }

    validateConstraints(newValue) {
        if (this.customValidation) {
            const result = this.customValidation(newValue, this.factory.formValues);
            if (result !== true) {
                if (typeof result === 'object' && result.adjustedValue !== undefined) {
                    this.setState({ value: result.adjustedValue });
                    if (this.slider) {
                        this.slider.value = result.adjustedValue;
                        this.debouncedUpdate();
                    }
                    this.showError(result.message);
                    return result.adjustedValue;
                } else if (typeof result === 'string') {
                    this.showError(result);
                    return false;
                }
            } else {
                this.hideError();
            }
        }
        return newValue;
    }

    updateConstraints(newConstraints) {
        if (newConstraints.min !== undefined) {
            this.min = newConstraints.min;
            if (this.slider) {
                this.slider.min = this.min;
                if (this.getValue() < this.min) {
                    this.setState({ value: this.min });
                    this.slider.value = this.min;
                }
                this.clearCache();
                this.debouncedUpdate();
            }
        }
        
        if (newConstraints.max !== undefined) {
            this.max = newConstraints.max;
            if (this.slider) {
                this.slider.max = this.max;
                if (this.getValue() > this.max) {
                    this.setState({ value: this.max });
                    this.slider.value = this.max;
                }
                this.clearCache();
                this.debouncedUpdate();
            }
        }
        
        this.eventBus?.emit('field:constraintsUpdated', {
            fieldId: this.id,
            constraints: newConstraints,
            field: this
        });
    }

    clearCache() {
        this.positionCache.clear();
        this.dimensionCache.clear();
    }

    getContainerDimensions() {
        const container = this.container?.querySelector('.slider-container');
        if (!container) return { width: 0, height: 0 };
        
        const cacheKey = 'container-dimensions';
        if (this.dimensionCache.has(cacheKey)) {
            return this.dimensionCache.get(cacheKey);
        }
        
        const dimensions = {
            width: container.offsetWidth,
            height: container.offsetHeight
        };
        this.dimensionCache.set(cacheKey, dimensions);
        return dimensions;
    }

    calculateLabelPosition(percent, labelElement) {
        if (!labelElement) return percent;
        
        const cacheKey = `label-pos-${percent}-${labelElement.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const containerDimensions = this.getContainerDimensions();
        if (containerDimensions.width === 0) return percent;
        
        const labelWidth = labelElement.offsetWidth || 100;
        const leftBoundary = (labelWidth / 2) / containerDimensions.width * 100;
        const rightBoundary = 100 - leftBoundary;
        
        let result = percent;
        if (percent < leftBoundary) {
            result = leftBoundary;
        } else if (percent > rightBoundary) {
            result = rightBoundary;
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    calculateTrianglePosition(originalPercent, finalPercent, labelElement, containerElement) {
        if (!labelElement || !containerElement) return '50%';
        
        const containerWidth = containerElement.offsetWidth;
        const labelWidth = labelElement.offsetWidth;
        
        if (containerWidth === 0 || labelWidth === 0) return '50%';
        
        const originalHandlePosition = (originalPercent / 100) * containerWidth;
        const finalLabelPosition = (finalPercent / 100) * containerWidth;
        const offsetFromCenter = originalHandlePosition - finalLabelPosition;
        const triangleOffset = (offsetFromCenter / labelWidth) * 100;
        const trianglePosition = 50 + triangleOffset;
        
        const triangleHalfWidth = 5;
        const safetyMargin = 4;
        const minSafeDistance = triangleHalfWidth + safetyMargin;
        const minTrianglePos = (minSafeDistance / labelWidth) * 100;
        const maxTrianglePos = 100 - minTrianglePos;
        const absoluteMinPos = Math.max(minTrianglePos, 15);
        const absoluteMaxPos = Math.min(maxTrianglePos, 85);
        
        return `${Math.max(absoluteMinPos, Math.min(absoluteMaxPos, trianglePosition))}%`;
    }

    updateTrianglePosition(labelElement, originalPercent, finalPercent) {
        if (!labelElement) return;
        const container = this.container?.querySelector('.slider-container');
        const trianglePos = this.calculateTrianglePosition(originalPercent, finalPercent, labelElement, container);
        labelElement.style.setProperty('--triangle-left', trianglePos);
    }

    render() {
        const container = this.createContainer();
        
        if (this.label) {
            container.appendChild(this.createLabel());
        }

        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';

        const trackBg = document.createElement('div');
        trackBg.className = 'slider-track-bg';

        this.progress = document.createElement('div');
        this.progress.className = 'slider-progress';
        trackBg.appendChild(this.progress);

        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.className = 'range-input';
        this.slider.id = this.id;
        this.slider.min = this.min;
        this.slider.max = this.max;
        this.slider.value = this.getValue();
        this.slider.step = this.step;

        this.valueLabel = document.createElement('div');
        this.valueLabel.className = 'slider-value-label';

        sliderContainer.appendChild(trackBg);
        sliderContainer.appendChild(this.slider);
        sliderContainer.appendChild(this.valueLabel);

        container.appendChild(sliderContainer);
        container.appendChild(this.createErrorElement());

        this.setupEventListeners();
        this.updateUI();
        this.container = container;
        
        this.eventBus?.emit('field:rendered', { fieldId: this.id, field: this });
        
        return container;
    }

    setupEventListeners() {
        const inputHandler = () => {
            const newValue = parseFloat(this.slider.value);
            const validatedValue = this.validateConstraints(newValue);
            if (validatedValue !== false) {
                this.setState({
                    value: validatedValue,
                    isDirty: true,
                    isTouched: true
                });
                this.debouncedUpdate();
                this.debouncedChange();
            }
        };
        
        const resizeHandler = () => this.clearCache();

        this.slider.addEventListener('input', inputHandler);
        window.addEventListener('resize', resizeHandler);

        this.eventListeners.push(
            { element: this.slider, event: 'input', handler: inputHandler },
            { element: window, event: 'resize', handler: resizeHandler }
        );
    }

    updateUI() {
        const percent = ((this.getValue() - this.min) / (this.max - this.min)) * 100;
        const originalPercent = percent;
        
        this.progress.style.width = percent + '%';
        
        requestAnimationFrame(() => {
            this.clearCache();
            
            const finalPercent = this.calculateLabelPosition(percent, this.valueLabel);
            this.valueLabel.style.left = finalPercent + '%';
            
            // Use formatter service if available
            const formattedValue = this.formatter ? 
                this.formatter.format(this.getValue(), { type: this.sliderType }) :
                this.formatValue(this.getValue());
            
            this.valueLabel.textContent = formattedValue;
            
            this.updateTrianglePosition(this.valueLabel, originalPercent, finalPercent);
        });
    }

    getValue() {
        return this.state.value;
    }

    setValue(value, options = {}) {
        const numericValue = parseFloat(value) || this.min;
        if (this.slider) {
            this.slider.value = numericValue;
            this.clearCache();
            this.updateUI();
        }
        
        super.setValue(numericValue, options);
    }
}

/**
 * SlidingWindowSliderField - Enhanced with proper state management
 */
class SlidingWindowSliderField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        this.min = config.min || 0;
        this.max = config.max || 10000;
        this.step = config.step || 100;
        this.rangeWindow = config.rangeWindow || 1000;
        this.windowStep = config.windowStep || 1000;
        this.formatValue = config.formatValue || ((val) => `${parseInt(val).toLocaleString()}`);
        
        this.currentMin = config.currentMin || this.min;
        this.currentMax = config.currentMax || Math.min(this.min + this.rangeWindow, this.max);
        
        // Proper undefined checking for defaultValue
        const initialValue = config.defaultValue !== undefined ?
            config.defaultValue :
            (config.value !== undefined ?
                config.value :
                ((this.currentMin + this.currentMax) / 2));
        
        // Constrain initial value to current window
        let constrainedValue = initialValue;
        if (constrainedValue < this.currentMin) {
            constrainedValue = this.currentMin;
        } else if (constrainedValue > this.currentMax) {
            constrainedValue = this.currentMax;
        }
        
        // Initialize state
        this.setState({
            value: constrainedValue
        });
        
        // Performance optimizations
        this.debounceDelay = config.debounceDelay || 50;
        this.debouncedUpdate = this.debounce(() => this.updateUI(), this.debounceDelay);
        this.debouncedChange = this.debounce(() => this.handleChange(), this.debounceDelay);
        this.positionCache = new Map();
        this.dimensionCache = new Map();
        
        // DOM element references
        this.decreaseBtn = null;
        this.increaseBtn = null;
        this.slider = null;
        this.progress = null;
        this.valueLabel = null;
    }

    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    async validate() {
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            if (this.customValidation) rules.custom = this.customValidation;
            
            const result = await this.validator.validate(this.getValue(), rules);
            
            this.setState({
                isValid: result.isValid,
                errors: result.errors
            });
            
            this.eventBus?.emit('field:validationComplete', {
                fieldId: this.id,
                result: result,
                field: this
            });
            
            return result.isValid;
        }
        
        if (this.required && (this.getValue() === null || this.getValue() === undefined || this.getValue() === '')) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        return true;
    }

    validateConstraints(newValue) {
        if (this.customValidation) {
            const result = this.customValidation(newValue, this.factory.formValues);
            if (result !== true) {
                if (typeof result === 'object' && result.adjustedValue !== undefined) {
                    this.setState({ value: result.adjustedValue });
                    if (this.slider) {
                        this.slider.value = result.adjustedValue;
                        this.debouncedUpdate();
                    }
                    this.showError(result.message);
                    return result.adjustedValue;
                } else if (typeof result === 'string') {
                    this.showError(result);
                    return false;
                }
            } else {
                this.hideError();
            }
        }
        return newValue;
    }

    updateConstraints(newConstraints) {
        if (newConstraints.min !== undefined) {
            this.min = newConstraints.min;
            this.currentMin = Math.max(this.currentMin, newConstraints.min);
            if (this.slider) {
                this.slider.min = this.currentMin;
                if (this.getValue() < this.currentMin) {
                    this.setState({ value: this.currentMin });
                    this.slider.value = this.currentMin;
                }
                this.clearCache();
                this.debouncedUpdate();
            }
        }
        
        if (newConstraints.rangeWindow !== undefined) {
            this.rangeWindow = newConstraints.rangeWindow;
        }
        
        if (newConstraints.windowStep !== undefined) {
            this.windowStep = newConstraints.windowStep;
        }
        
        this.eventBus?.emit('field:constraintsUpdated', {
            fieldId: this.id,
            constraints: newConstraints,
            field: this
        });
    }

    clearCache() {
        this.positionCache.clear();
        this.dimensionCache.clear();
    }

    getContainerDimensions() {
        const container = this.container?.querySelector('.slider-container');
        if (!container) return { width: 0, height: 0 };
        
        const cacheKey = 'container-dimensions';
        if (this.dimensionCache.has(cacheKey)) {
            return this.dimensionCache.get(cacheKey);
        }
        
        const dimensions = {
            width: container.offsetWidth,
            height: container.offsetHeight
        };
        this.dimensionCache.set(cacheKey, dimensions);
        return dimensions;
    }

    calculateLabelPosition(percent, labelElement) {
        if (!labelElement) return percent;
        
        const cacheKey = `label-pos-${percent}-${labelElement.offsetWidth}`;
        if (this.positionCache.has(cacheKey)) {
            return this.positionCache.get(cacheKey);
        }
        
        const containerDimensions = this.getContainerDimensions();
        if (containerDimensions.width === 0) return percent;
        
        const labelWidth = labelElement.offsetWidth || 100;
        const leftBoundary = (labelWidth / 2) / containerDimensions.width * 100;
        const rightBoundary = 100 - leftBoundary;
        
        let result = percent;
        if (percent < leftBoundary) {
            result = leftBoundary;
        } else if (percent > rightBoundary) {
            result = rightBoundary;
        }
        
        this.positionCache.set(cacheKey, result);
        return result;
    }

    calculateTrianglePosition(originalPercent, finalPercent, labelElement, containerElement) {
        if (!labelElement || !containerElement) return '50%';
        
        const containerWidth = containerElement.offsetWidth;
        const labelWidth = labelElement.offsetWidth;
        
        if (containerWidth === 0 || labelWidth === 0) return '50%';
        
        const originalHandlePosition = (originalPercent / 100) * containerWidth;
        const finalLabelPosition = (finalPercent / 100) * containerWidth;
        const offsetFromCenter = originalHandlePosition - finalLabelPosition;
        const triangleOffset = (offsetFromCenter / labelWidth) * 100;
        const trianglePosition = 50 + triangleOffset;
        
        const triangleHalfWidth = 5;
        const safetyMargin = 4;
        const minSafeDistance = triangleHalfWidth + safetyMargin;
        const minTrianglePos = (minSafeDistance / labelWidth) * 100;
        const maxTrianglePos = 100 - minTrianglePos;
        const absoluteMinPos = Math.max(minTrianglePos, 15);
        const absoluteMaxPos = Math.min(maxTrianglePos, 85);
        
        return `${Math.max(absoluteMinPos, Math.min(absoluteMaxPos, trianglePosition))}%`;
    }

    updateTrianglePosition(labelElement, originalPercent, finalPercent) {
        if (!labelElement) return;
        const container = this.container?.querySelector('.slider-container');
        const trianglePos = this.calculateTrianglePosition(originalPercent, finalPercent, labelElement, container);
        labelElement.style.setProperty('--triangle-left', trianglePos);
    }

    render() {
        const container = this.createContainer();
        
        if (this.label) {
            container.appendChild(this.createLabel());
        }

        const slidingLayout = document.createElement('div');
        slidingLayout.className = 'sliding-window-layout';

        this.decreaseBtn = document.createElement('button');
        this.decreaseBtn.type = 'button';
        this.decreaseBtn.className = 'slider-control-btn';
        this.decreaseBtn.innerHTML = SVGIcons.get('MINUS');

        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';

        const trackBg = document.createElement('div');
        trackBg.className = 'slider-track-bg';

        this.progress = document.createElement('div');
        this.progress.className = 'slider-progress';
        trackBg.appendChild(this.progress);

        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.className = 'range-input';
        this.slider.id = this.id;
        this.slider.min = this.currentMin;
        this.slider.max = this.currentMax;
        this.slider.value = this.getValue();
        this.slider.step = this.step;

        this.valueLabel = document.createElement('div');
        this.valueLabel.className = 'slider-value-label';

        sliderContainer.appendChild(trackBg);
        sliderContainer.appendChild(this.slider);
        sliderContainer.appendChild(this.valueLabel);

        this.increaseBtn = document.createElement('button');
        this.increaseBtn.type = 'button';
        this.increaseBtn.className = 'slider-control-btn';
        this.increaseBtn.innerHTML = SVGIcons.get('PLUS');

        slidingLayout.appendChild(this.decreaseBtn);
        slidingLayout.appendChild(sliderContainer);
        slidingLayout.appendChild(this.increaseBtn);

        container.appendChild(slidingLayout);
        container.appendChild(this.createErrorElement());

        this.setupEventListeners();
        this.updateUI();
        this.container = container;
        
        this.eventBus?.emit('field:rendered', { fieldId: this.id, field: this });
        
        return container;
    }

    setupEventListeners() {
        const inputHandler = () => this.handleValueChange();
        const decreaseHandler = () => this.decreaseRange();
        const increaseHandler = () => this.increaseRange();
        const resizeHandler = () => this.clearCache();

        this.slider.addEventListener('input', inputHandler);
        this.decreaseBtn.addEventListener('click', decreaseHandler);
        this.increaseBtn.addEventListener('click', increaseHandler);
        window.addEventListener('resize', resizeHandler);

        this.eventListeners.push(
            { element: this.slider, event: 'input', handler: inputHandler },
            { element: this.decreaseBtn, event: 'click', handler: decreaseHandler },
            { element: this.increaseBtn, event: 'click', handler: increaseHandler },
            { element: window, event: 'resize', handler: resizeHandler }
        );
    }

    handleValueChange() {
        const newValue = parseFloat(this.slider.value);
        const validatedValue = this.validateConstraints(newValue);
        if (validatedValue !== false) {
            this.setState({
                value: validatedValue,
                isDirty: true,
                isTouched: true
            });
            this.debouncedUpdate();
            this.debouncedChange();
        }
    }

    increaseRange() {
        if (this.currentMax < this.max) {
            this.currentMin = Math.min(this.currentMin + this.windowStep, this.max - this.rangeWindow);
            this.currentMax = Math.min(this.currentMax + this.windowStep, this.max);
            this.updateSliderAttributes();
            this.clearCache();
            this.updateUI();
            
            this.eventBus?.emit('field:rangeIncreased', {
                fieldId: this.id,
                currentMin: this.currentMin,
                currentMax: this.currentMax,
                field: this
            });
        }
    }

    decreaseRange() {
        if (this.currentMin > this.min) {
            this.currentMin = Math.max(this.currentMin - this.windowStep, this.min);
            this.currentMax = Math.max(this.currentMax - this.windowStep, this.min + this.rangeWindow);
            this.updateSliderAttributes();
            this.clearCache();
            this.updateUI();
            
            this.eventBus?.emit('field:rangeDecreased', {
                fieldId: this.id,
                currentMin: this.currentMin,
                currentMax: this.currentMax,
                field: this
            });
        }
    }

    updateSliderAttributes() {
        this.slider.min = this.currentMin;
        this.slider.max = this.currentMax;
        
        let currentValue = this.getValue();
        if (currentValue < this.currentMin) {
            currentValue = this.currentMin;
        } else if (currentValue > this.currentMax) {
            currentValue = this.currentMax;
        }
        
        this.slider.value = currentValue;
        this.setState({ value: currentValue });
    }

    updateUI() {
        const percent = ((this.getValue() - this.currentMin) / (this.currentMax - this.currentMin)) * 100;
        const originalPercent = percent;
        
        this.progress.style.width = percent + '%';
        
        requestAnimationFrame(() => {
            this.clearCache();
            
            const finalPercent = this.calculateLabelPosition(percent, this.valueLabel);
            this.valueLabel.style.left = finalPercent + '%';
            
            // Use formatter service if available
            const formattedValue = this.formatter ? 
                this.formatter.format(this.getValue(), { type: 'number' }) :
                this.formatValue(this.getValue());
            
            this.valueLabel.textContent = formattedValue;
            
            this.updateTrianglePosition(this.valueLabel, originalPercent, finalPercent);
        });
        
        this.decreaseBtn.disabled = this.currentMin <= this.min;
        this.increaseBtn.disabled = this.currentMax >= this.max;
    }

    getValue() {
        return this.state.value;
    }

    setValue(value, options = {}) {
        if (typeof value === 'object' && value !== null) {
            const newValue = value.value || value.selectedValue || value.min || this.getValue();
            this.currentMin = value.currentMin || this.currentMin;
            this.currentMax = value.currentMax || this.currentMax;
            if (this.slider) {
                this.updateSliderAttributes();
                this.clearCache();
                this.updateUI();
            }
        } else {
            const numericValue = parseFloat(value) || this.getValue();
            if (this.slider) {
                this.updateSliderAttributes();
                this.clearCache();
                this.updateUI();
            }
        }
        
        super.setValue(value, options);
    }
}

/**
 * Enhanced Calendar Fields with Modern Architecture
 * Integrates dependency injection, event-driven architecture, and advanced state management
 */

// ===================================================================
// ENHANCED CALENDAR FIELD
// ===================================================================

class CalendarField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Enhanced configuration with service injection
        this.serviceContainer = config.serviceContainer;
        this.eventBus = config.eventBus;
        this.validator = config.validator;
        this.formatter = config.formatter;
        this.renderer = config.renderer;
        
        // Core calendar configuration
        this.timezone = config.timezone || 'America/Toronto';
        this.language = config.language || 'en';
        this.locale = config.locale || 'en-US';
        this.mode = config.mode || 'booking'; // 'booking' or 'reschedule'
        
        // Enhanced state management
        this.calendarState = {
            currentDate: new Date(),
            selectedDate: null,
            selectedTime: null,
            availableSlots: {},
            workingDays: [1, 2, 3, 4, 5],
            isConfirmed: false,
            isLoading: false,
            isInitialized: false
        };
        
        // Reschedule mode configuration  
        this.currentAppointment = config.currentAppointment || null;
        
        // Selection mode determines what UI to show
        this.selectionMode = config.selectionMode || 'none';
        // Options: 'none', 'item', 'category-item'
        
        // Category and item data
        this.rawCategoryItems = config.categoryItems || config.specialistsInfo || {};
        this.availableCategories = [];
        this.filteredItems = [];
        
        // Selection state
        this.selectedCategory = config.selectedCategory || config.categoryName || '';
        this.selectedItemId = config.selectedItemId || '';
        
        // Current active configuration
        this.currentItem = null;
        this.currentCategoryConfig = null;
        this.apiKey = config.apiKey || '';
        this.eventTypeId = config.eventTypeId || null;
        this.eventTypeSlug = config.eventTypeSlug || '';
        this.scheduleId = config.scheduleId || null;
        this.eventName = config.eventName || '';
        this.specialist = config.specialist || '';
        
        // UI Configuration
        this.headerIcon = config.headerIcon || 'CALENDAR';
        this.showItemInfo = config.showItemInfo !== false;
        this.placeholderText = config.placeholderText || '';
        
        // Enhanced error messages with multi-language support
        this.texts = this.setupTexts(config.texts || {});
        this.errorTexts = this.setupErrorTexts(config.errorTexts || {});
        
        // Selection fields (created as needed)
        this.categorySelectField = null;
        this.itemSelectField = null;
        
        // DOM elements for enhanced management
        this.calendarContainer = null;
        this.loadingOverlay = null;
        
        // Performance optimization
        this.apiCache = new Map();
        this.cacheTimeout = 300000; // 5 minutes
        
        // Enhanced callbacks
        this.onItemChange = config.onItemChange || null;
        this.onDateTimeChange = config.onDateTimeChange || null;
        this.onCalendarReady = config.onCalendarReady || null;
        
        this.init();
    }
    
    setupTexts(configTexts) {
        return {
            selectCategory: configTexts.selectCategory || "Select a category",
            selectCategoryPlaceholder: configTexts.selectCategoryPlaceholder || "-- Select a category --",
            selectItem: configTexts.selectItem || "Select an item",
            selectItemPlaceholder: configTexts.selectItemPlaceholder || "-- Select an item --",
            selectDate: configTexts.selectDate || "Select a date to view available times",
            availableTimesFor: configTexts.availableTimesFor || "Available times for",
            noAvailableSlots: configTexts.noAvailableSlots || "No available time slots for this date",
            pleaseSelectDate: configTexts.pleaseSelectDate || "Please select a date first",
            pleaseSelectCategory: configTexts.pleaseSelectCategory || "Please select a category first",
            pleaseSelectItem: configTexts.pleaseSelectItem || "Please select an item first",
            currentAppointment: configTexts.currentAppointment || "Current Appointment",
            newAppointment: configTexts.newAppointment || "New Appointment",
            loadingAvailability: configTexts.loadingAvailability || "Loading availability...",
            loading: configTexts.loading || "Loading...",
            weekdays: configTexts.weekdays || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            ...configTexts
        };
    }
    
    setupErrorTexts(configErrorTexts) {
        return {
            categoryRequired: configErrorTexts.categoryRequired || 'Please select a category',
            itemRequired: configErrorTexts.itemRequired || 'Please select an item',
            dateTimeRequired: configErrorTexts.dateTimeRequired || 'Please select date and time',
            apiError: configErrorTexts.apiError || 'Error loading calendar data',
            bookingError: configErrorTexts.bookingError || 'Error creating booking',
            rescheduleError: configErrorTexts.rescheduleError || 'Error rescheduling appointment',
            ...configErrorTexts
        };
    }
    
    // Enhanced initialization with async support
    async init() {
        try {
            this.setState({ isLoading: true });
            
            this.eventBus?.emit('calendar:initStart', { 
                fieldId: this.id, 
                selectionMode: this.selectionMode 
            });
            
            if (this.selectionMode === 'none') {
                await this.initializeCalendar();
            } else if (this.selectionMode === 'item') {
                this.initializeItemSelection();
            } else if (this.selectionMode === 'category-item') {
                this.initializeCategoryAndItemSelection();
            }
            
            this.setState({ 
                isLoading: false, 
                isInitialized: true 
            });
            
            this.eventBus?.emit('calendar:initComplete', { 
                fieldId: this.id, 
                success: true 
            });
            
            if (this.onCalendarReady) {
                this.onCalendarReady(this);
            }
        } catch (error) {
            this.setState({ isLoading: false });
            this.eventBus?.emit('calendar:initError', { 
                fieldId: this.id, 
                error: error.message 
            });
            this.showError(this.errorTexts.apiError);
            console.error('Calendar initialization error:', error);
        }
    }
    
    // Enhanced state management
    setState(updates) {
        const prevState = { ...this.calendarState };
        this.calendarState = { ...this.calendarState, ...updates };
        
        // Emit state change event
        this.eventBus?.emit('calendar:stateChange', {
            fieldId: this.id,
            prevState,
            newState: this.calendarState,
            updates
        });
        
        this.updateCalendarUI(updates, prevState);
    }
    
    updateCalendarUI(updates, prevState) {
        if (!this.element) return;
        
        // Update loading state
        if ('isLoading' in updates) {
            this.toggleLoadingState(updates.isLoading);
        }
        
        // Update calendar display if date/time changed
        if ('selectedDate' in updates || 'selectedTime' in updates) {
            this.renderCalendarData();
            this.updateValue();
        }
        
        // Update available slots display
        if ('availableSlots' in updates) {
            this.renderTimeSlots();
        }
    }
    
    toggleLoadingState(isLoading) {
        if (!this.calendarContainer) return;
        
        if (isLoading) {
            this.showLoadingOverlay();
        } else {
            this.hideLoadingOverlay();
        }
    }
    
    showLoadingOverlay() {
        if (this.loadingOverlay) return;
        
        this.loadingOverlay = document.createElement('div');
        this.loadingOverlay.className = 'calendar-loading-overlay';
        this.loadingOverlay.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">${this.texts.loading}</div>
        `;
        
        this.calendarContainer.style.position = 'relative';
        this.calendarContainer.appendChild(this.loadingOverlay);
    }
    
    hideLoadingOverlay() {
        if (this.loadingOverlay) {
            this.loadingOverlay.remove();
            this.loadingOverlay = null;
        }
    }
    
    // Enhanced API methods with caching and error handling
    async fetchWorkingDays(scheduleId) {
        const cacheKey = `workingDays_${scheduleId}`;
        const cached = this.getCachedData(cacheKey);
        if (cached) return cached;
        
        if (!this.apiKey || !scheduleId) return [1, 2, 3, 4, 5];
        
        try {
            this.eventBus?.emit('calendar:apiCall', { 
                type: 'fetchWorkingDays', 
                scheduleId 
            });
            
            const res = await fetch(`https://api.cal.com/v2/schedules/${scheduleId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
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
            
            const result = Array.from(workingDaysSet);
            this.setCachedData(cacheKey, result);
            
            this.eventBus?.emit('calendar:apiSuccess', { 
                type: 'fetchWorkingDays', 
                result 
            });
            
            return result;
        } catch (err) {
            this.eventBus?.emit('calendar:apiError', { 
                type: 'fetchWorkingDays', 
                error: err.message 
            });
            
            console.error("Error fetching schedule:", err);
            return [1, 2, 3, 4, 5];
        }
    }
    
    async fetchAvailableSlots(selectedDateISO) {
        const cacheKey = `slots_${this.eventTypeId}_${selectedDateISO}`;
        const cached = this.getCachedData(cacheKey);
        if (cached) return cached;
        
        if (!this.apiKey || !this.eventTypeId || !this.eventTypeSlug) return [];
        
        try {
            this.eventBus?.emit('calendar:apiCall', { 
                type: 'fetchAvailableSlots', 
                date: selectedDateISO 
            });
            
            const start = new Date(selectedDateISO);
            start.setUTCHours(0, 0, 0, 0);
            const end = new Date(selectedDateISO);
            end.setUTCHours(23, 59, 59, 999);
            
            const url = `https://api.cal.com/v2/slots/available?startTime=${start.toISOString()}&endTime=${end.toISOString()}&eventTypeId=${this.eventTypeId}&eventTypeSlug=${this.eventTypeSlug}`;
            
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "cal-api-version": "2024-08-13",
                    "Content-Type": "application/json"
                }
            });
            
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            
            const responseBody = await res.json();
            
            if (responseBody.status !== "success") {
                throw new Error(`Cal.com returned error: ${JSON.stringify(responseBody)}`);
            }
            
            const slotsObj = responseBody.data?.slots || {};
            const slotsForDate = slotsObj[selectedDateISO] || [];
            const result = slotsForDate.map(slot => slot.time);
            
            this.setCachedData(cacheKey, result);
            
            this.eventBus?.emit('calendar:apiSuccess', { 
                type: 'fetchAvailableSlots', 
                date: selectedDateISO,
                slotsCount: result.length 
            });
            
            return result;
        } catch (err) {
            this.eventBus?.emit('calendar:apiError', { 
                type: 'fetchAvailableSlots', 
                error: err.message 
            });
            
            console.error("Error fetching available slots:", err);
            return [];
        }
    }
    
    // Enhanced booking methods with event emission
    async createBooking(startTimeISO, fullName, email) {
        if (!this.apiKey || !this.eventTypeId) {
            throw new Error('Missing API key or event type ID');
        }
        
        try {
            this.eventBus?.emit('calendar:bookingStart', { 
                startTime: startTimeISO, 
                attendee: { fullName, email } 
            });
            
            const url = `https://api.cal.com/v2/bookings`;
            const body = {
                start: startTimeISO,
                attendee: {
                    name: fullName,
                    email: email,
                    timeZone: this.timezone
                },
                eventTypeId: Number(this.eventTypeId)
            };
            
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
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
            
            this.eventBus?.emit('calendar:bookingSuccess', { 
                booking: responseBody,
                attendee: { fullName, email }
            });
            
            return responseBody;
        } catch (err) {
            this.eventBus?.emit('calendar:bookingError', { 
                error: err.message,
                attendee: { fullName, email }
            });
            
            console.error("Booking error:", err);
            throw err;
        }
    }
    
    async rescheduleBooking(uid, startTimeISO, reason, rescheduledBy) {
        if (!this.apiKey || !uid) {
            throw new Error('Missing API key or booking UID');
        }
        
        try {
            this.eventBus?.emit('calendar:rescheduleStart', { 
                uid, 
                newTime: startTimeISO 
            });
            
            const url = `https://api.cal.com/v2/bookings/${uid}/reschedule`;
            const body = {
                rescheduledBy: rescheduledBy,
                reschedulingReason: reason,
                start: startTimeISO
            };
            
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
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
            
            this.eventBus?.emit('calendar:rescheduleSuccess', { 
                uid,
                newBooking: responseBody
            });
            
            return responseBody;
        } catch (err) {
            this.eventBus?.emit('calendar:rescheduleError', { 
                uid,
                error: err.message
            });
            
            console.error("Error rescheduling booking:", err);
            throw err;
        }
    }
    
    // Enhanced caching methods
    getCachedData(key) {
        const cached = this.apiCache.get(key);
        if (!cached) return null;
        
        if (Date.now() - cached.timestamp > this.cacheTimeout) {
            this.apiCache.delete(key);
            return null;
        }
        
        return cached.data;
    }
    
    setCachedData(key, data) {
        this.apiCache.set(key, {
            data,
            timestamp: Date.now()
        });
    }
    
    clearCache() {
        this.apiCache.clear();
        this.eventBus?.emit('calendar:cacheCleared', { fieldId: this.id });
    }
    
    // Enhanced validation with async support
    async validate() {
        try {
            // Emit validation start event
            this.eventBus?.emit('calendar:validationStart', { fieldId: this.id });
            
            // Use enhanced validation engine if available
            if (this.validator) {
                const rules = {};
                
                // Category validation
                if (this.selectionMode === 'category-item') {
                    rules.categoryRequired = () => {
                        if (!this.selectedCategory) {
                            return this.errorTexts.categoryRequired;
                        }
                        return true;
                    };
                }
                
                // Item validation
                if (this.selectionMode === 'item' || this.selectionMode === 'category-item') {
                    rules.itemRequired = () => {
                        if (!this.selectedItemId) {
                            return this.errorTexts.itemRequired;
                        }
                        return true;
                    };
                }
                
                // Date/time validation
                if (this.required) {
                    rules.dateTimeRequired = () => {
                        if (!this.calendarState.selectedDate || !this.calendarState.selectedTime) {
                            return this.errorTexts.dateTimeRequired;
                        }
                        return true;
                    };
                }
                
                const result = await this.validator.validate(this.getValue(), rules);
                
                this.eventBus?.emit('calendar:validationComplete', {
                    fieldId: this.id,
                    isValid: result.isValid,
                    errors: result.errors
                });
                
                if (!result.isValid) {
                    this.showError(result.errors[0]);
                    return false;
                }
                
                this.hideError();
                return true;
            } else {
                // Fallback validation
                return this.validateFallback();
            }
        } catch (error) {
            this.eventBus?.emit('calendar:validationError', {
                fieldId: this.id,
                error: error.message
            });
            
            this.showError('Validation error occurred');
            return false;
        }
    }
    
    validateFallback() {
        // Check category selection if required
        if (this.selectionMode === 'category-item' && !this.selectedCategory) {
            this.showError(this.errorTexts.categoryRequired);
            return false;
        }
        
        // Check item selection if required
        if ((this.selectionMode === 'item' || this.selectionMode === 'category-item') && !this.selectedItemId) {
            this.showError(this.errorTexts.itemRequired);
            return false;
        }
        
        // Check date and time selection
        const isDateTimeValid = !!(this.calendarState.selectedDate && this.calendarState.selectedTime);
        if (this.required && !isDateTimeValid) {
            this.showError(this.errorTexts.dateTimeRequired);
            return false;
        }
        
        this.hideError();
        return true;
    }
    
    // Enhanced selection methods with event emission
    selectCategory(categoryId) {
        const category = this.availableCategories.find(s => s.id === categoryId);
        if (!category) {
            console.error('Category not found:', categoryId);
            return;
        }
        
        this.eventBus?.emit('calendar:categorySelected', {
            fieldId: this.id,
            category: category,
            previousCategory: this.selectedCategory
        });
        
        this.selectedCategory = category.name;
        this.filteredItems = this.filterItemsByCategory(category.name);
        
        this.updateItemOptions();
        this.showItemSelection();
        this.resetItemAndCalendar();
        
        // Auto-select if only one item
        if (this.filteredItems.length === 1) {
            this.selectItem(this.filteredItems[0].id);
            if (this.itemSelectField) {
                this.itemSelectField.setValue(this.filteredItems[0].id);
            }
        }
        
        this.updateCalendarHeader();
        this.renderCalendarData();
        this.updateValue();
    }
    
    async selectItem(itemId, shouldUpdateUI = true) {
        const item = this.filteredItems.find(p => p.id === itemId);
        if (!item) {
            console.error('Item not found:', itemId);
            return;
        }
        
        this.eventBus?.emit('calendar:itemSelected', {
            fieldId: this.id,
            item: item,
            previousItem: this.currentItem
        });
        
        // Update current configuration
        this.selectedItemId = itemId;
        this.currentItem = item;
        this.currentCategoryConfig = item.categoryConfig;
        this.apiKey = item.apiKey || '';
        this.eventTypeId = item.eventTypeId || null;
        this.eventTypeSlug = item.eventTypeSlug || '';
        this.scheduleId = item.scheduleId || null;
        this.eventName = item.eventName || this.selectedCategory || '';
        
        // Reset calendar state
        this.resetCalendarState();
        
        if (shouldUpdateUI && this.element) {
            this.setState({ isLoading: true });
        }
        
        try {
            // Initialize calendar with new item
            await this.initializeCalendar();
            
            if (shouldUpdateUI && this.element) {
                this.updateCalendarHeader();
                this.renderCalendarData();
            }
            
            this.updateValue();
            
            if (this.onItemChange) {
                this.onItemChange(item);
            }
            
            this.eventBus?.emit('calendar:itemConfigured', {
                fieldId: this.id,
                item: item,
                success: true
            });
        } catch (error) {
            this.eventBus?.emit('calendar:itemConfigureError', {
                fieldId: this.id,
                item: item,
                error: error.message
            });
            
            if (shouldUpdateUI) {
                this.showError(this.errorTexts.apiError);
            }
        } finally {
            if (shouldUpdateUI && this.element) {
                this.setState({ isLoading: false });
            }
        }
    }
    
    // Enhanced date/time selection with event emission
    async selectDate(date) {
        this.eventBus?.emit('calendar:dateSelected', {
            fieldId: this.id,
            date: date,
            previousDate: this.calendarState.selectedDate
        });
        
        this.setState({
            selectedDate: new Date(date),
            selectedTime: null,
            isLoading: true
        });
        
        try {
            const dateKey = this.formatDate(date);
            const slots = await this.fetchAvailableSlots(dateKey);
            
            this.setState({
                availableSlots: {
                    ...this.calendarState.availableSlots,
                    [dateKey]: slots
                },
                isLoading: false
            });
            
            this.renderCalendarData();
            
            if (this.onDateTimeChange) {
                this.onDateTimeChange({
                    selectedDate: date,
                    selectedTime: null,
                    availableSlots: slots
                });
            }
        } catch (error) {
            this.setState({ isLoading: false });
            this.showError(this.errorTexts.apiError);
        }
    }
    
    selectTime(timeISO) {
        this.eventBus?.emit('calendar:timeSelected', {
            fieldId: this.id,
            time: timeISO,
            previousTime: this.calendarState.selectedTime
        });
        
        this.setState({ selectedTime: timeISO });
        
        if (this.onDateTimeChange) {
            this.onDateTimeChange({
                selectedDate: this.calendarState.selectedDate,
                selectedTime: timeISO
            });
        }
        
        this.renderTimeSlots();
        this.updateValue();
    }
    
    // Enhanced utility methods
    extractAvailableCategories(rawItems) {
        const categorySet = new Set();
        try {
            const itemsArray = Array.isArray(rawItems) ? rawItems : Object.entries(rawItems);
            itemsArray.forEach(([itemName, itemData]) => {
                if (Array.isArray(rawItems) && typeof itemName === 'object') {
                    itemData = itemName;
                    itemName = itemData.name || itemData.id;
                }
                if (itemData && itemData.categories) {
                    Object.keys(itemData.categories).forEach(category => {
                        categorySet.add(category);
                    });
                }
            });
        } catch (error) {
            this.eventBus?.emit('calendar:categoryExtractionError', {
                fieldId: this.id,
                error: error.message
            });
            console.error('Error extracting categories:', error);
        }
        return Array.from(categorySet)
            .sort()
            .map(category => ({
                id: this.slugify(category),
                name: category,
                displayName: category
            }));
    }
    
    filterItemsByCategory(categoryName) {
        if (!categoryName || !this.rawCategoryItems) {
            return [];
        }
        
        const filteredItems = [];
        const itemsArray = Array.isArray(this.rawCategoryItems) ?
            this.rawCategoryItems : Object.entries(this.rawCategoryItems);
        
        itemsArray.forEach(([itemName, itemData]) => {
            if (Array.isArray(this.rawCategoryItems) && typeof itemName === 'object') {
                itemData = itemName;
                itemName = itemData.name || itemData.id;
            }
            
            if (itemData.categories && itemData.categories[categoryName]) {
                const categoryConfig = itemData.categories[categoryName];
                filteredItems.push({
                    id: this.slugify(itemName),
                    name: itemName,
                    displayName: itemName,
                    description: itemData.description || itemData.specialty || "",
                    apiKey: itemData.apiKey || "",
                    scheduleId: itemData.scheduleId || "",
                    eventTypeId: categoryConfig.eventId || "",
                    eventTypeSlug: categoryConfig.eventSlug || "",
                    eventName: categoryName,
                    link: categoryConfig.link || "",
                    categoryConfig: categoryConfig,
                    allCategories: itemData.categories
                });
            }
        });
        
        this.eventBus?.emit('calendar:itemsFiltered', {
            fieldId: this.id,
            categoryName,
            itemsCount: filteredItems.length
        });
        
        return filteredItems;
    }
    
    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    
    formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    
    isSameDay(date1, date2) {
        if (!date1 || !date2) return false;
        return this.formatDate(date1) === this.formatDate(date2);
    }
    
    getDefaultActiveDay() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (this.calendarState.workingDays.includes(today.getDay())) return today;
        
        const next = new Date(today);
        let daysChecked = 0;
        while (!this.calendarState.workingDays.includes(next.getDay()) && daysChecked < 14) {
            next.setDate(next.getDate() + 1);
            daysChecked++;
        }
        return next;
    }
    
    // Enhanced initialization methods
    async initializeCalendar() {
        if (this.scheduleId && this.apiKey) {
            this.calendarState.workingDays = await this.fetchWorkingDays(this.scheduleId);
            if (!this.calendarState.selectedDate) {
                this.calendarState.selectedDate = this.getDefaultActiveDay();
                const dayKey = this.formatDate(this.calendarState.selectedDate);
                const slots = await this.fetchAvailableSlots(dayKey);
                this.calendarState.availableSlots[dayKey] = slots;
            }
        }
    }
    
    initializeItemSelection() {
        if (!this.selectedCategory) {
            console.error('Item selection mode requires selectedCategory to be set');
            return;
        }
        this.filteredItems = this.filterItemsByCategory(this.selectedCategory);
        
        // Auto-select if only one item offers the category
        if (this.filteredItems.length === 1) {
            this.selectedItemId = this.filteredItems[0].id;
            this.selectItem(this.selectedItemId, false);
        } else if (this.selectedItemId) {
            this.selectItem(this.selectedItemId, false);
        }
    }
    
    initializeCategoryAndItemSelection() {
        this.availableCategories = this.extractAvailableCategories(this.rawCategoryItems);
        if (this.selectedCategory) {
            this.filteredItems = this.filterItemsByCategory(this.selectedCategory);
            if (this.selectedItemId) {
                this.selectItem(this.selectedItemId, false);
            }
        }
    }
    
    // Enhanced state management methods
    resetItemAndCalendar() {
        this.selectedItemId = '';
        this.currentItem = null;
        this.resetCalendarState();
    }
    
    resetCalendarState() {
        this.setState({
            selectedDate: null,
            selectedTime: null,
            availableSlots: {}
        });
    }
    
    updateCalendarHeader() {
        if (!this.element) return;
        const headerElement = this.element.querySelector('.calendar-title');
        if (headerElement) {
            headerElement.innerHTML = this.generateCalendarHeader();
        }
    }
    
    generateCalendarHeader() {
        const iconSvg = SVGIcons.get(this.headerIcon) || SVGIcons.get('CALENDAR');
        if (!this.showItemInfo) return '';
        
        // RESCHEDULE MODE - Show current appointment details
        if (this.mode === 'reschedule' && this.currentAppointment) {
            const displayItem = this.currentItem?.displayName ||
                this.currentItem?.name ||
                this.currentItem?.id ||
                this.specialist ||
                'Specialist';
            return `
                <div class="calendar-title-content">
                    <div class="service-provider">
                        <span class="provider-icon">${iconSvg}</span>
                        <div class="appointment-details">
                            <div class="provider-name">${displayItem}</div>
                            ${this.selectedCategory ? `<div class="service-name">${this.selectedCategory}</div>` : ''}
                            <div class="current-appointment">${this.formatCurrentAppointment()}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        // BOOKING MODE - Show category and item selection
        else {
            let headerHtml = `
                <div class="service-provider">
                    <span class="provider-icon">${iconSvg}</span>
                    <div class="appointment-details">
            `;
            
            // Show selected category
            if (this.selectedCategory) {
                headerHtml += `<div class="service-name">${this.selectedCategory}</div>`;
            }
            
            // Show selected item
            if (this.currentItem) {
                const displayName = this.currentItem.displayName || this.currentItem.name || this.currentItem.id;
                headerHtml += `<div class="provider-name">${displayName}</div>`;
            } else if (this.specialist) {
                // Fallback to direct specialist config
                headerHtml += `<div class="provider-name">${this.specialist}</div>`;
            }
            
            headerHtml += `
                    </div>
                </div>
            `;
            return headerHtml;
        }
    }
    
    formatCurrentAppointment() {
        if (!this.currentAppointment) return '';
        const date = new Date(this.currentAppointment);
        const formatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        };
        const formatter = new Intl.DateTimeFormat(this.locale, formatOptions);
        return formatter.format(date);
    }
    
    // Enhanced field creation methods
    createCategorySelectField() {
        if (this.selectionMode !== 'category-item') return null;
        
        this.categorySelectField = new SingleSelectField(this.factory, {
            id: `${this.id}-category`,
            name: `${this.name}_category`,
            label: this.texts.selectCategory,
            placeholder: this.texts.selectCategoryPlaceholder,
            options: this.availableCategories,
            required: true,
            serviceContainer: this.serviceContainer,
            eventBus: this.eventBus,
            validator: this.validator,
            formatter: this.formatter,
            onChange: (value) => this.selectCategory(value)
        });
        
        if (this.selectedCategory) {
            const categoryOption = this.availableCategories.find(s => s.name === this.selectedCategory);
            if (categoryOption) {
                this.categorySelectField.setValue(categoryOption.id);
            }
        }
        
        return this.categorySelectField;
    }
    
    createItemSelectField() {
        if (this.selectionMode === 'none') return null;
        
        this.itemSelectField = new SingleSelectField(this.factory, {
            id: `${this.id}-item`,
            name: `${this.name}_item`,
            label: this.texts.selectItem,
            placeholder: this.texts.selectItemPlaceholder,
            options: this.filteredItems,
            required: true,
            serviceContainer: this.serviceContainer,
            eventBus: this.eventBus,
            validator: this.validator,
            formatter: this.formatter,
            onChange: (value) => this.selectItem(value)
        });
        
        if (this.selectedItemId) {
            this.itemSelectField.setValue(this.selectedItemId);
        }
        
        return this.itemSelectField;
    }
    
    updateItemOptions() {
        if (!this.itemSelectField) return;
        
        const itemContainer = this.element.querySelector('.item-select-container');
        if (!itemContainer) return;
        
        const currentValue = this.selectedItemId;
        itemContainer.innerHTML = '';
        
        this.itemSelectField = new SingleSelectField(this.factory, {
            id: `${this.id}-item`,
            name: `${this.name}_item`,
            label: this.texts.selectItem,
            placeholder: this.texts.selectItemPlaceholder,
            options: this.filteredItems,
            required: true,
            serviceContainer: this.serviceContainer,
            eventBus: this.eventBus,
            validator: this.validator,
            formatter: this.formatter,
            onChange: (value) => this.selectItem(value)
        });
        
        const newFieldElement = this.itemSelectField.render();
        newFieldElement.className = 'item-select-container';
        itemContainer.parentNode.replaceChild(newFieldElement, itemContainer);
        
        if (currentValue && this.filteredItems.find(p => p.id === currentValue)) {
            this.itemSelectField.setValue(currentValue);
        }
    }
    
    showItemSelection() {
        const itemContainer = this.element.querySelector('.item-select-container');
        if (itemContainer) {
            itemContainer.style.display = 'block';
        }
    }
    
    // Enhanced rendering methods
    render() {
        const container = this.createContainer();
        
        // Create category selection field if needed
        if (this.selectionMode === 'category-item') {
            this.createCategorySelectField();
            const categoryFieldElement = this.categorySelectField.render();
            container.appendChild(categoryFieldElement);
        }
        
        // Create item selection field if needed
        if (this.selectionMode === 'item' || this.selectionMode === 'category-item') {
            this.createItemSelectField();
            const itemFieldElement = this.itemSelectField.render();
            itemFieldElement.classList.add('item-select-container');
            
            // Hide initially for category-item mode
            if (this.selectionMode === 'category-item' && !this.selectedCategory) {
                itemFieldElement.style.display = 'none';
            }
            container.appendChild(itemFieldElement);
        }
        
        // Create the calendar component
        this.calendarContainer = document.createElement('div');
        this.calendarContainer.className = 'calendar-container';
        this.calendarContainer.innerHTML = `
            <div class="calendar-header">
                <div class="calendar-title">
                    ${this.generateCalendarHeader()}
                </div>
                <div class="calendar-nav">
                    <button class="nav-btn prev-btn" type="button" aria-label="Previous month">
                        ${SVGIcons.get('CHEVRON')}
                    </button>
                    <div class="current-date"></div>
                    <button class="nav-btn next-btn" type="button" aria-label="Next month">
                        ${SVGIcons.get('CHEVRON')}
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
        `;
        
        container.appendChild(this.calendarContainer);
        
        const errorElement = this.createErrorElement();
        container.appendChild(errorElement);
        
        this.element = container;
        this.element.fieldInstance = this;
        
        this.renderCalendarData();
        this.attachEvents();
        
        return this.element;
    }
    
    renderCalendarData() {
        if (!this.calendarContainer) return;
        
        const currentDateEl = this.calendarContainer.querySelector('.current-date');
        if (currentDateEl) {
            const dateFormatter = new Intl.DateTimeFormat(this.locale, {
                month: "long",
                year: "numeric"
            });
            currentDateEl.textContent = dateFormatter.format(this.calendarState.currentDate);
        }
        
        const weekdaysEl = this.calendarContainer.querySelector('.weekdays');
        if (weekdaysEl) {
            weekdaysEl.innerHTML = '';
            this.texts.weekdays.forEach(day => {
                const dayEl = document.createElement("div");
                dayEl.textContent = day;
                weekdaysEl.appendChild(dayEl);
            });
        }
        
        this.renderDays();
        this.renderTimeSlots();
    }
    
    renderDays() {
        const daysEl = this.calendarContainer.querySelector('.days');
        if (!daysEl) return;
        
        daysEl.innerHTML = '';
        
        // Check selection requirements based on mode
        if (this.selectionMode === 'category-item' && !this.selectedCategory) {
            const messageEl = document.createElement('div');
            messageEl.className = 'no-category-message';
            messageEl.textContent = this.texts.pleaseSelectCategory;
            daysEl.appendChild(messageEl);
            return;
        }
        
        if ((this.selectionMode === 'item' || this.selectionMode === 'category-item') && !this.currentItem) {
            const messageEl = document.createElement('div');
            messageEl.className = 'no-item-message';
            messageEl.textContent = this.texts.pleaseSelectItem;
            daysEl.appendChild(messageEl);
            return;
        }
        
        // Render calendar days
        let daysToShow = [];
        const firstDay = new Date(this.calendarState.currentDate.getFullYear(), this.calendarState.currentDate.getMonth(), 1);
        const daysFromPrevMonth = firstDay.getDay();
        const lastDay = new Date(this.calendarState.currentDate.getFullYear(), this.calendarState.currentDate.getMonth() + 1, 0);
        const totalDays = lastDay.getDate();
        
        // Add previous month days
        for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
            const day = new Date(firstDay);
            day.setDate(day.getDate() - i - 1);
            daysToShow.push({ date: day, inactive: true });
        }
        
        // Add current month days
        for (let i = 1; i <= totalDays; i++) {
            const day = new Date(this.calendarState.currentDate.getFullYear(), this.calendarState.currentDate.getMonth(), i);
            daysToShow.push({ date: day, inactive: false });
        }
        
        // Add next month days
        const remainingDays = 42 - daysToShow.length;
        for (let i = 1; i <= remainingDays; i++) {
            const day = new Date(lastDay);
            day.setDate(day.getDate() + i);
            daysToShow.push({ date: day, inactive: true });
        }
        
        const highlightDay = this.calendarState.selectedDate || this.getDefaultActiveDay();
        
        daysToShow.forEach(({ date, inactive }) => {
            const dayEl = document.createElement("div");
            dayEl.className = "day";
            dayEl.textContent = date.getDate();
            
            if (inactive) {
                dayEl.classList.add("inactive");
            } else {
                const dayOfWeek = date.getDay();
                if (!this.calendarState.workingDays.includes(dayOfWeek)) {
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
                        if (this.calendarState.selectedDate && this.isSameDay(date, this.calendarState.selectedDate)) {
                            dayEl.classList.add("active");
                        }
                        dayEl.classList.add("available");
                        
                        const clickHandler = () => this.selectDate(date);
                        dayEl.addEventListener("click", clickHandler);
                        this.eventListeners.push({ 
                            element: dayEl, 
                            event: 'click', 
                            handler: clickHandler 
                        });
                    }
                }
            }
            daysEl.appendChild(dayEl);
        });
    }
    
    renderTimeSlots() {
        const timeHeaderEl = this.calendarContainer.querySelector('.time-header');
        const timeSlotsEl = this.calendarContainer.querySelector('.time-slots');
        if (!timeHeaderEl || !timeSlotsEl) return;
        
        // Check selection requirements
        if (this.selectionMode === 'category-item' && !this.selectedCategory) {
            timeHeaderEl.textContent = this.texts.pleaseSelectCategory;
            timeSlotsEl.innerHTML = `<div class="no-category-message">${this.texts.pleaseSelectCategory}</div>`;
            return;
        }
        
        if ((this.selectionMode === 'item' || this.selectionMode === 'category-item') && !this.currentItem) {
            timeHeaderEl.textContent = this.texts.pleaseSelectItem;
            timeSlotsEl.innerHTML = `<div class="no-item-message">${this.texts.pleaseSelectItem}</div>`;
            return;
        }
        
        if (this.calendarState.selectedDate) {
            const dateFormatter = new Intl.DateTimeFormat(this.locale, {
                weekday: "long",
                month: "long",
                day: "numeric"
            });
            timeHeaderEl.textContent = `${this.texts.availableTimesFor} ${dateFormatter.format(this.calendarState.selectedDate)}`;
            
            const dateKey = this.formatDate(this.calendarState.selectedDate);
            const timeSlots = this.calendarState.availableSlots[dateKey] || [];
            
            if (timeSlots.length === 0) {
                timeSlotsEl.innerHTML = `<div class="no-slots-message">${this.texts.noAvailableSlots}</div>`;
            } else {
                const columnsContainer = document.createElement("div");
                columnsContainer.className = "time-slots-columns";
                
                const amColumn = document.createElement("div");
                amColumn.className = "time-slots-column";
                const pmColumn = document.createElement("div");
                pmColumn.className = "time-slots-column";
                
                const amHeader = document.createElement("div");
                amHeader.className = "time-column-header";
                amHeader.textContent = "AM";
                amColumn.appendChild(amHeader);
                
                const pmHeader = document.createElement("div");
                pmHeader.className = "time-column-header";
                pmHeader.textContent = "PM";
                pmColumn.appendChild(pmHeader);
                
                timeSlots.forEach((timeISO) => {
                    const dateTime = new Date(timeISO);
                    const hours = dateTime.getHours();
                    const timeSlot = document.createElement("div");
                    timeSlot.className = "time-slot available";
                    
                    if (this.calendarState.selectedTime === timeISO) {
                        timeSlot.classList.add("selected");
                    }
                    
                    const timeFormatter = new Intl.DateTimeFormat(this.locale, {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true
                    });
                    timeSlot.textContent = timeFormatter.format(dateTime);
                    
                    const clickHandler = () => {
                        if (!this.calendarState.isConfirmed) {
                            this.selectTime(timeISO);
                        }
                    };
                    
                    timeSlot.addEventListener("click", clickHandler);
                    this.eventListeners.push({ 
                        element: timeSlot, 
                        event: 'click', 
                        handler: clickHandler 
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
            timeHeaderEl.innerHTML = `<span class="pulse-text">${this.texts.selectDate}</span>`;
            timeSlotsEl.innerHTML = `<div class="no-slots-message">${this.texts.pleaseSelectDate}</div>`;
        }
    }
    
    attachEvents() {
        if (!this.calendarContainer) return;
        
        const prevBtn = this.calendarContainer.querySelector('.prev-btn');
        const nextBtn = this.calendarContainer.querySelector('.next-btn');
        
        if (prevBtn) {
            const prevHandler = () => {
                if (!this.calendarState.isConfirmed) {
                    this.setState({
                        currentDate: new Date(
                            this.calendarState.currentDate.getFullYear(), 
                            this.calendarState.currentDate.getMonth() - 1, 
                            1
                        )
                    });
                    this.renderCalendarData();
                }
            };
            prevBtn.addEventListener("click", prevHandler);
            this.eventListeners.push({ 
                element: prevBtn, 
                event: 'click', 
                handler: prevHandler 
            });
        }
        
        if (nextBtn) {
            const nextHandler = () => {
                if (!this.calendarState.isConfirmed) {
                    this.setState({
                        currentDate: new Date(
                            this.calendarState.currentDate.getFullYear(), 
                            this.calendarState.currentDate.getMonth() + 1, 
                            1
                        )
                    });
                    this.renderCalendarData();
                }
            };
            nextBtn.addEventListener("click", nextHandler);
            this.eventListeners.push({ 
                element: nextBtn, 
                event: 'click', 
                handler: nextHandler 
            });
        }
    }
    
    // Enhanced value management
    updateValue() {
        const value = {
            selectedCategory: this.selectedCategory,
            selectedItemId: this.selectedItemId,
            selectedItem: this.currentItem,
            selectedDate: this.calendarState.selectedDate,
            selectedTime: this.calendarState.selectedTime,
            formattedDate: this.calendarState.selectedDate ? this.formatDate(this.calendarState.selectedDate) : null,
            formattedTime: this.calendarState.selectedTime ? new Intl.DateTimeFormat(this.locale, {
                hour: "numeric",
                minute: "2-digit", 
                hour12: true
            }).format(new Date(this.calendarState.selectedTime)) : null
        };
        
        this.setValue(value, { silent: true });
        this.handleChange();
        
        this.eventBus?.emit('calendar:valueUpdated', {
            fieldId: this.id,
            value: value
        });
    }
    
    getValue() {
        return {
            selectedCategory: this.selectedCategory,
            selectedItemId: this.selectedItemId,
            selectedItem: this.currentItem,
            specialist: this.specialist,
            selectedDate: this.calendarState.selectedDate,
            selectedTime: this.calendarState.selectedTime,
            formattedDate: this.calendarState.selectedDate ? this.formatDate(this.calendarState.selectedDate) : null,
            formattedTime: this.calendarState.selectedTime ? new Intl.DateTimeFormat(this.locale, {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            }).format(new Date(this.calendarState.selectedTime)) : null,
            currentAppointment: this.currentAppointment,
            mode: this.mode,
            state: this.calendarState
        };
    }
    
    setValue(value, options = {}) {
        if (value && typeof value === 'object') {
            if (value.selectedCategory && this.selectionMode === 'category-item') {
                const categoryOption = this.availableCategories.find(s => s.name === value.selectedCategory);
                if (categoryOption) {
                    this.selectCategory(categoryOption.id);
                    if (this.categorySelectField && !options.silent) {
                        this.categorySelectField.setValue(categoryOption.id);
                    }
                }
            }
            
            if (value.selectedItemId && (this.selectionMode === 'item' || this.selectionMode === 'category-item')) {
                this.selectItem(value.selectedItemId, false);
                if (this.itemSelectField && !options.silent) {
                    this.itemSelectField.setValue(value.selectedItemId);
                }
            }
            
            if (value.selectedDate) {
                this.setState({ selectedDate: new Date(value.selectedDate) });
            }
            if (value.selectedTime) {
                this.setState({ selectedTime: value.selectedTime });
            }
            if (value.currentAppointment) {
                this.currentAppointment = value.currentAppointment;
            }
            if (value.specialist) {
                this.specialist = value.specialist;
            }
            if (value.state) {
                this.setState(value.state);
            }
            
            if (this.element && !options.silent) {
                this.updateCalendarHeader();
                this.renderCalendarData();
            }
        }
        
        // Call parent setValue
        super.setValue(value, options);
    }
    
    reset() {
        this.eventBus?.emit('calendar:reset', { fieldId: this.id });
        
        this.selectedCategory = '';
        this.selectedItemId = '';
        this.currentItem = null;
        this.specialist = '';
        this.filteredItems = [];
        
        this.setState({
            currentDate: new Date(),
            selectedDate: null,
            selectedTime: null,
            availableSlots: {},
            workingDays: [1, 2, 3, 4, 5],
            isConfirmed: false,
            isLoading: false,
            isInitialized: false
        });
        
        if (this.categorySelectField) {
            this.categorySelectField.setValue('');
        }
        if (this.itemSelectField) {
            this.itemSelectField.setValue('');
            if (this.selectionMode === 'category-item') {
                const itemContainer = this.element?.querySelector('.item-select-container');
                if (itemContainer) {
                    itemContainer.style.display = 'none';
                }
            }
        }
        
        this.apiKey = '';
        this.eventTypeId = null;
        this.eventTypeSlug = '';
        this.scheduleId = null;
        this.eventName = '';
        
        this.clearCache();
        
        if (this.element) {
            this.updateCalendarHeader();
            this.renderCalendarData();
        }
        
        this.hideError();
    }
    
    // Enhanced cleanup
    cleanup() {
        this.eventBus?.emit('calendar:cleanup', { fieldId: this.id });
        
        // Clean up selection fields
        if (this.categorySelectField && typeof this.categorySelectField.cleanup === 'function') {
            this.categorySelectField.cleanup();
        }
        if (this.itemSelectField && typeof this.itemSelectField.cleanup === 'function') {
            this.itemSelectField.cleanup();
        }
        
        // Clear caches
        this.clearCache();
        
        // Hide loading overlay
        this.hideLoadingOverlay();
        
        // Call parent cleanup
        super.cleanup();
    }
    
    destroy() {
        this.cleanup();
        
        if (this.categorySelectField && typeof this.categorySelectField.destroy === 'function') {
            this.categorySelectField.destroy();
        }
        if (this.itemSelectField && typeof this.itemSelectField.destroy === 'function') {
            this.itemSelectField.destroy();
        }
        
        this.eventBus?.emit('calendar:destroyed', { fieldId: this.id });
        
        super.destroy();
    }
}

// ===================================================================
// ENHANCED SERVICE REQUEST CALENDAR FIELD
// ===================================================================

class ServiceRequestCalendarField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Enhanced configuration with service injection
        this.serviceContainer = config.serviceContainer;
        this.eventBus = config.eventBus;
        this.validator = config.validator;
        this.formatter = config.formatter;
        this.renderer = config.renderer;
        
        // Calendar configuration
        this.maxSlots = config.maxSlots || 5;
        this.workingDays = config.workingDays || [1, 2, 3, 4, 5];
        this.timeSlots = config.timeSlots || [
            {
                id: 'morning',
                label: { fr: 'Matin', en: 'Morning' },
                hours: { fr: '8h00 - 12h00', en: '8:00 AM - 12:00 PM' }
            },
            {
                id: 'afternoon', 
                label: { fr: 'Après-midi', en: 'Afternoon' },
                hours: { fr: '13h00 - 17h00', en: '1:00 PM - 5:00 PM' }
            }
        ];
        
        this.language = config.language || 'fr';
        
        // Enhanced state management
        this.calendarState = {
            currentDate: new Date(),
            selectedDate: null,
            selectedTime: null,
            selectedSlots: [],
            isLoading: false
        };
        
        // Performance tracking
        this.performanceMetrics = {
            renderTime: 0,
            interactionCount: 0,
            lastUpdate: Date.now()
        };
        
        this.setupIcons();
        this.setupTranslations();
    }
    
    setupIcons() {
        this.icons = {
            chevron: SVGIcons.get('CHEVRON') || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 662" width="18px" height="18px">
                <g transform="translate(75, 75)">
                    <path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                </g>
            </svg>`,
            sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                <path fill="#FF9800" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM352 256c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zm32 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z"/>
            </svg>`,
            moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24">
                <path fill="#5E35B1" d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>
            </svg>`,
            delete: SVGIcons.get('CLOSE') || `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>`
        };
    }
    
    setupTranslations() {
        const translations = {
            fr: {
                selectDateAndTime: "Sélectionnez une date et une heure",
                chooseOption: "Choisissez une option :",
                selectedSlots: "Disponibilités sélectionnées",
                maxSlotsReached: "Maximum 5 disponibilités atteint",
                addThisSlot: "Ajouter cette disponibilité",
                weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
            },
            en: {
                selectDateAndTime: "Select a Date and Time",
                chooseOption: "Choose an option:",
                selectedSlots: "Selected Availabilities", 
                maxSlotsReached: "Maximum 5 availabilities reached",
                addThisSlot: "Add this availability",
                weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            }
        };
        
        this.texts = translations[this.language] || translations.en;
    }
    
    // Enhanced state management
    setState(updates) {
        const prevState = { ...this.calendarState };
        this.calendarState = { ...this.calendarState, ...updates };
        
        // Emit state change event
        this.eventBus?.emit('serviceCalendar:stateChange', {
            fieldId: this.id,
            prevState,
            newState: this.calendarState,
            updates
        });
        
        this.updateUI(updates);
        this.updatePerformanceMetrics();
    }
    
    updateUI(updates) {
        if (!this.calendarContainer) return;
        
        if ('selectedSlots' in updates) {
            this.renderSelectedSlots();
        }
        
        if ('selectedDate' in updates || 'selectedTime' in updates) {
            this.updateAddSlotButton();
        }
        
        if ('isLoading' in updates) {
            this.toggleLoadingState(updates.isLoading);
        }
    }
    
    updatePerformanceMetrics() {
        this.performanceMetrics.interactionCount++;
        this.performanceMetrics.lastUpdate = Date.now();
    }
    
    toggleLoadingState(isLoading) {
        const loadingElements = this.calendarContainer.querySelectorAll('.loading-message');
        loadingElements.forEach(el => {
            el.style.display = isLoading ? 'block' : 'none';
        });
    }
    
    // Enhanced validation with async support
    async validate() {
        try {
            this.eventBus?.emit('serviceCalendar:validationStart', { fieldId: this.id });
            
            if (this.validator) {
                const rules = {};
                
                if (this.required) {
                    rules.slotsRequired = () => {
                        if (this.calendarState.selectedSlots.length === 0) {
                            return this.getFieldErrorMessage('required');
                        }
                        return true;
                    };
                }
                
                const result = await this.validator.validate(
                    this.calendarState.selectedSlots, 
                    rules
                );
                
                this.eventBus?.emit('serviceCalendar:validationComplete', {
                    fieldId: this.id,
                    isValid: result.isValid,
                    errors: result.errors
                });
                
                if (!result.isValid) {
                    this.showError(result.errors[0]);
                    return false;
                }
                
                this.hideError();
                return true;
            } else {
                // Fallback validation
                if (this.required && this.calendarState.selectedSlots.length === 0) {
                    this.showError(this.getFieldErrorMessage('required'));
                    return false;
                }
                
                this.hideError();
                return true;
            }
        } catch (error) {
            this.eventBus?.emit('serviceCalendar:validationError', {
                fieldId: this.id,
                error: error.message
            });
            
            this.showError('Validation error occurred');
            return false;
        }
    }
    
    render() {
        const startTime = performance.now();
        
        const container = this.createContainer();
        this.calendarContainer = document.createElement('div');
        this.calendarContainer.className = 'service-calendar-container';
        
        this.calendarContainer.innerHTML = `
            <div class="calendar-flex-container">
                <div class="calendar-column">
                    <div class="calendar-header">
                        <div class="calendar-title">${this.texts.selectDateAndTime}</div>
                        <div class="calendar-nav">
                            <button type="button" class="nav-btn prev-btn">
                                <div style="transform: rotate(90deg);">${this.icons.chevron}</div>
                            </button>
                            <div class="current-date"></div>
                            <button type="button" class="nav-btn next-btn">
                                <div style="transform: rotate(-90deg);">${this.icons.chevron}</div>
                            </button>
                        </div>
                    </div>
                    <div class="calendar-body">
                        <div class="days-container">
                            <div class="weekdays-container"></div>
                            <div class="calendar-days"></div>
                        </div>
                        <div class="time-choice-container">
                            <div class="time-choice-label">${this.texts.chooseOption}</div>
                            <div class="time-choice-options"></div>
                            <button type="button" class="add-slot-btn" disabled>
                                ${SVGIcons.get('PLUS')}
                                <span>${this.texts.addThisSlot}</span>
                            </button>
                            <div class="max-slots-message" style="display: none;">
                                ${this.texts.maxSlotsReached}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="availability-column">
                    <div class="selected-slots-container" style="display: none;">
                        <div class="selected-slots-title">
                            <span>${this.texts.selectedSlots}</span>
                            <div class="selected-badge">0</div>
                        </div>
                        <div class="selected-slots-list"></div>
                    </div>
                </div>
            </div>
        `;
        
        const errorElement = this.createErrorElement();
        container.appendChild(this.calendarContainer);
        container.appendChild(errorElement);
        
        this.container = container;
        this.element = container;
        this.element.fieldInstance = this;
        
        this.initializeCalendar();
        this.setupEventListeners();
        
        // Track render performance
        this.performanceMetrics.renderTime = performance.now() - startTime;
        
        this.eventBus?.emit('serviceCalendar:rendered', {
            fieldId: this.id,
            renderTime: this.performanceMetrics.renderTime
        });
        
        return container;
    }
    
    initializeCalendar() {
        this.updateCurrentMonthDisplay();
        this.updateWeekdays();
        this.generateCalendar();
        this.renderTimeChoices();
    }
    
    updateCurrentMonthDisplay() {
        const monthDisplay = this.calendarContainer.querySelector('.current-date');
        const monthName = this.texts.months[this.calendarState.currentDate.getMonth()];
        const year = this.calendarState.currentDate.getFullYear();
        monthDisplay.textContent = `${monthName} ${year}`;
    }
    
    updateWeekdays() {
        const weekdaysContainer = this.calendarContainer.querySelector('.weekdays-container');
        weekdaysContainer.innerHTML = '';
        this.texts.weekdays.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            weekdaysContainer.appendChild(dayDiv);
        });
    }
    
    generateCalendar() {
        const daysContainer = this.calendarContainer.querySelector('.calendar-days');
        daysContainer.innerHTML = '';
        
        const currentYear = this.calendarState.currentDate.getFullYear();
        const currentMonth = this.calendarState.currentDate.getMonth();
        const firstDay = new Date(currentYear, currentMonth, 1);
        const startingDayOfWeek = firstDay.getDay();
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = lastDay.getDate();
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
            
            if (!this.workingDays.includes(date.getDay())) {
                dayElement.classList.add('weekend');
            } else if (date < today) {
                dayElement.classList.add('inactive');
            } else {
                dayElement.classList.add('available');
                if (date.toDateString() === today.toDateString()) {
                    dayElement.classList.add('today');
                }
                if (this.calendarState.selectedDate && this.isSameDay(date, this.calendarState.selectedDate)) {
                    dayElement.classList.add('active');
                }
                
                const clickHandler = () => this.selectDate(date);
                dayElement.addEventListener('click', clickHandler);
                this.eventListeners.push({ 
                    element: dayElement, 
                    event: 'click', 
                    handler: clickHandler 
                });
            }
            
            daysContainer.appendChild(dayElement);
        }
    }
    
    renderTimeChoices() {
        const timeChoicesContainer = this.calendarContainer.querySelector('.time-choice-options');
        timeChoicesContainer.innerHTML = '';
        
        this.timeSlots.forEach(slot => {
            const timeChoice = document.createElement('div');
            timeChoice.className = 'time-choice';
            timeChoice.dataset.time = slot.id;
            
            const icon = slot.id === 'morning' ? this.icons.sun : this.icons.moon;
            const label = slot.label[this.language];
            const hours = slot.hours[this.language];
            
            timeChoice.innerHTML = `
                <div class="time-choice-icon">${icon}</div>
                <div class="time-choice-details">
                    <div class="time-choice-title">${label}</div>
                    <div class="time-choice-range">${hours}</div>
                </div>
            `;
            
            const clickHandler = () => this.selectTime(slot.id);
            timeChoice.addEventListener('click', clickHandler);
            this.eventListeners.push({ 
                element: timeChoice, 
                event: 'click', 
                handler: clickHandler 
            });
            
            timeChoicesContainer.appendChild(timeChoice);
        });
    }
    
    selectDate(date) {
        // Emit event
        this.eventBus?.emit('serviceCalendar:dateSelected', {
            fieldId: this.id,
            date: date,
            previousDate: this.calendarState.selectedDate
        });
        
        // Remove active class from all days
        this.calendarContainer.querySelectorAll('.day').forEach(d => d.classList.remove('active'));
        
        // Add active class to clicked day
        const dayElement = Array.from(this.calendarContainer.querySelectorAll('.day'))
            .find(el => el.textContent == date.getDate() && el.classList.contains('available'));
        if (dayElement) {
            dayElement.classList.add('active');
        }
        
        this.setState({
            selectedDate: new Date(date),
            selectedTime: null
        });
        
        this.resetTimeChoices();
        this.updateAddSlotButton();
    }
    
    selectTime(timeId) {
        if (!this.calendarState.selectedDate) return;
        
        this.eventBus?.emit('serviceCalendar:timeSelected', {
            fieldId: this.id,
            timeId: timeId,
            previousTime: this.calendarState.selectedTime
        });
        
        this.resetTimeChoices();
        const timeChoice = this.calendarContainer.querySelector(`[data-time="${timeId}"]`);
        if (timeChoice) {
            timeChoice.classList.add('selected');
        }
        
        this.setState({ selectedTime: timeId });
        this.updateAddSlotButton();
    }
    
    resetTimeChoices() {
        this.calendarContainer.querySelectorAll('.time-choice').forEach(choice => {
            choice.classList.remove('selected');
        });
    }
    
    updateAddSlotButton() {
        const addButton = this.calendarContainer.querySelector('.add-slot-btn');
        addButton.disabled = !this.calendarState.selectedDate || 
                           !this.calendarState.selectedTime || 
                           this.calendarState.selectedSlots.length >= this.maxSlots;
    }
    
    addSelectedSlot() {
        if (!this.calendarState.selectedDate || 
            !this.calendarState.selectedTime || 
            this.calendarState.selectedSlots.length >= this.maxSlots) {
            return;
        }
        
        const slotId = `${this.formatDate(this.calendarState.selectedDate)}_${this.calendarState.selectedTime}`;
        
        // Check if slot already selected
        if (this.calendarState.selectedSlots.some(slot => slot.id === slotId)) {
            return;
        }
        
        const timeSlot = this.timeSlots.find(slot => slot.id === this.calendarState.selectedTime);
        const formattedDate = this.formatDateForDisplay(this.calendarState.selectedDate);
        const timeLabel = timeSlot.label[this.language] + ' (' + timeSlot.hours[this.language] + ')';
        
        const newSlot = {
            date: new Date(this.calendarState.selectedDate),
            timeOfDay: this.calendarState.selectedTime,
            id: slotId,
            displayText: `${formattedDate} - ${timeLabel}`
        };
        
        this.eventBus?.emit('serviceCalendar:slotAdded', {
            fieldId: this.id,
            slot: newSlot,
            totalSlots: this.calendarState.selectedSlots.length + 1
        });
        
        const updatedSlots = [...this.calendarState.selectedSlots, newSlot];
        this.setState({ selectedSlots: updatedSlots });
        
        // Reset selections
        this.resetTimeChoices();
        this.setState({ selectedTime: null });
        this.updateAddSlotButton();
        this.hideError();
        this.handleChange();
        
        if (updatedSlots.length >= this.maxSlots) {
            this.showMaxSlotsMessage();
        }
    }
    
    removeSelectedSlot(slotId) {
        this.eventBus?.emit('serviceCalendar:slotRemoved', {
            fieldId: this.id,
            slotId: slotId
        });
        
        const updatedSlots = this.calendarState.selectedSlots.filter(slot => slot.id !== slotId);
        this.setState({ selectedSlots: updatedSlots });
        
        this.hideMaxSlotsMessage();
        this.handleChange();
    }
    
    renderSelectedSlots() {
        const slotsContainer = this.calendarContainer.querySelector('.selected-slots-container');
        const slotsList = this.calendarContainer.querySelector('.selected-slots-list');
        const slotsCount = this.calendarContainer.querySelector('.selected-badge');
        
        slotsCount.textContent = this.calendarState.selectedSlots.length;
        
        if (this.calendarState.selectedSlots.length > 0) {
            slotsContainer.style.display = 'block';
        } else {
            slotsContainer.style.display = 'none';
        }
        
        slotsList.innerHTML = '';
        this.calendarState.selectedSlots.forEach(slot => {
            const slotItem = document.createElement('div');
            slotItem.className = 'selected-slot-item';
            slotItem.innerHTML = `
                <div class="selected-slot-info">${slot.displayText}</div>
                <button type="button" class="delete-slot" data-slot-id="${slot.id}">
                    ${this.icons.delete}
                </button>
            `;
            
            const deleteHandler = () => this.removeSelectedSlot(slot.id);
            const deleteBtn = slotItem.querySelector('.delete-slot');
            deleteBtn.addEventListener('click', deleteHandler);
            this.eventListeners.push({ 
                element: deleteBtn, 
                event: 'click', 
                handler: deleteHandler 
            });
            
            slotsList.appendChild(slotItem);
        });
    }
    
    showMaxSlotsMessage() {
        const messageElement = this.calendarContainer.querySelector('.max-slots-message');
        messageElement.style.display = 'block';
    }
    
    hideMaxSlotsMessage() {
        if (this.calendarState.selectedSlots.length < this.maxSlots) {
            const messageElement = this.calendarContainer.querySelector('.max-slots-message');
            messageElement.style.display = 'none';
        }
    }
    
    setupEventListeners() {
        const prevBtn = this.calendarContainer.querySelector('.prev-btn');
        const nextBtn = this.calendarContainer.querySelector('.next-btn');
        const addBtn = this.calendarContainer.querySelector('.add-slot-btn');
        
        const prevHandler = () => {
            this.setState({
                currentDate: new Date(
                    this.calendarState.currentDate.getFullYear(),
                    this.calendarState.currentDate.getMonth() - 1,
                    1
                )
            });
            this.generateCalendar();
            this.updateCurrentMonthDisplay();
        };
        
        const nextHandler = () => {
            this.setState({
                currentDate: new Date(
                    this.calendarState.currentDate.getFullYear(),
                    this.calendarState.currentDate.getMonth() + 1,
                    1
                )
            });
            this.generateCalendar();
            this.updateCurrentMonthDisplay();
        };
        
        const addHandler = () => this.addSelectedSlot();
        
        prevBtn.addEventListener('click', prevHandler);
        nextBtn.addEventListener('click', nextHandler);
        addBtn.addEventListener('click', addHandler);
        
        this.eventListeners.push(
            { element: prevBtn, event: 'click', handler: prevHandler },
            { element: nextBtn, event: 'click', handler: nextHandler },
            { element: addBtn, event: 'click', handler: addHandler }
        );
    }
    
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    formatDateForDisplay(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const locale = this.language === 'fr' ? 'fr-FR' : 'en-US';
        return new Intl.DateTimeFormat(locale, options).format(date);
    }
    
    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }
    
    getValue() {
        return this.calendarState.selectedSlots.map(slot => ({
            date: this.formatDate(slot.date),
            timeOfDay: slot.timeOfDay,
            displayText: slot.displayText
        }));
    }
    
    setValue(value, options = {}) {
        if (Array.isArray(value)) {
            const selectedSlots = value.map(slot => ({
                date: new Date(slot.date),
                timeOfDay: slot.timeOfDay,
                id: `${slot.date}_${slot.timeOfDay}`,
                displayText: slot.displayText
            }));
            
            this.setState({ selectedSlots });
            
            if (!options.silent) {
                this.handleChange();
            }
        }
        
        // Call parent setValue
        super.setValue(value, options);
    }
    
    reset() {
        this.eventBus?.emit('serviceCalendar:reset', { fieldId: this.id });
        
        this.setState({
            currentDate: new Date(),
            selectedDate: null,
            selectedTime: null,
            selectedSlots: [],
            isLoading: false
        });
        
        if (this.calendarContainer) {
            this.generateCalendar();
            this.updateCurrentMonthDisplay();
            this.resetTimeChoices();
            this.hideMaxSlotsMessage();
        }
        
        this.hideError();
    }
    
    cleanup() {
        this.eventBus?.emit('serviceCalendar:cleanup', { fieldId: this.id });
        
        // Call parent cleanup
        super.cleanup();
    }
    
    destroy() {
        this.cleanup();
        this.eventBus?.emit('serviceCalendar:destroyed', { fieldId: this.id });
        super.destroy();
    }
}

// ===================================================================
// ENHANCED SERVICE PROVIDER CALENDAR FIELD
// ===================================================================

class ServiceProviderCalendarField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Enhanced configuration with service injection
        this.serviceContainer = config.serviceContainer;
        this.eventBus = config.eventBus;
        this.validator = config.validator;
        this.formatter = config.formatter;
        this.renderer = config.renderer;
        
        // Core configuration
        this.language = config.language || 'fr';
        this.locale = config.locale || 'fr-FR';
        this.timezone = config.timezone || 'America/Toronto';
        
        // Data configuration
        this.servicesData = config.servicesData || [];
        this.providersData = config.providersData || [];
        this.providersInfo = config.providersInfo || {};
        
        // Enhanced state management
        this.stepState = {
            currentStep: 0,
            totalSteps: 3,
            selectedService: null,
            selectedProvider: null,
            appointmentData: null,
            filteredProviders: [],
            isTransitioning: false,
            stepHistory: []
        };
        
        // Field instances
        this.serviceCarousel = null;
        this.providerCarousel = null;
        this.calendarField = null;
        
        // Enhanced callbacks
        this.onServiceChange = config.onServiceChange || null;
        this.onProviderChange = config.onProviderChange || null;
        this.onAppointmentChange = config.onAppointmentChange || null;
        this.onStepChange = config.onStepChange || null;
        
        // Translations
        this.texts = this.setupTexts(config.texts || {});
        
        // Performance tracking
        this.performanceMetrics = {
            stepTransitionTimes: [],
            totalInteractionTime: 0,
            startTime: Date.now()
        };
        
        this.init();
    }
    
    setupTexts(configTexts) {
        return {
            services: configTexts.services || 'Services',
            providers: configTexts.providers || 'Providers',
            appointment: configTexts.appointment || 'Appointment',
            selectService: configTexts.selectService || 'Select a Service',
            selectProvider: configTexts.selectProvider || 'Select a Provider',
            selectAppointment: configTexts.selectAppointment || 'Select Date & Time',
            serviceStep: configTexts.serviceStep || 'Choose Service',
            providerStep: configTexts.providerStep || 'Choose Provider',
            appointmentStep: configTexts.appointmentStep || 'Schedule Appointment',
            next: configTexts.next || 'Next',
            previous: configTexts.previous || 'Previous',
            noProvidersAvailable: configTexts.noProvidersAvailable || 'No providers available for this service',
            loading: configTexts.loading || 'Loading...',
            ...configTexts
        };
    }
    
    init() {
        // Filter providers for initial service if any
        if (this.stepState.selectedService) {
            this.filterProvidersByService(this.stepState.selectedService);
        } else {
            this.stepState.filteredProviders = [...this.providersData];
        }
        
        this.eventBus?.emit('serviceProviderCalendar:initialized', {
            fieldId: this.id,
            totalSteps: this.stepState.totalSteps
        });
    }
    
    // Enhanced state management
    setState(updates) {
        const prevState = { ...this.stepState };
        this.stepState = { ...this.stepState, ...updates };
        
        // Emit state change event
        this.eventBus?.emit('serviceProviderCalendar:stateChange', {
            fieldId: this.id,
            prevState,
            newState: this.stepState,
            updates
        });
        
        this.updateUI(updates);
    }
    
    updateUI(updates) {
        if ('currentStep' in updates) {
            this.updateStepVisibility();
        }
        
        if ('isTransitioning' in updates) {
            this.toggleTransitionState(updates.isTransitioning);
        }
    }
    
    toggleTransitionState(isTransitioning) {
        if (this.element) {
            this.element.classList.toggle('transitioning', isTransitioning);
        }
    }
    
    filterProvidersByService(service) {
        if (!service || !service.id) {
            this.setState({ filteredProviders: [...this.providersData] });
            return;
        }
        
        const filteredProviders = this.providersData.filter(provider => 
            provider.services && provider.services.includes(service.id)
        );
        
        this.setState({ filteredProviders });
        
        this.eventBus?.emit('serviceProviderCalendar:providersFiltered', {
            fieldId: this.id,
            serviceId: service.id,
            providersCount: filteredProviders.length
        });
        
        console.log(`Filtered ${filteredProviders.length} providers for service:`, service.id);
    }
    
    async selectService(service) {
        console.log('🎯 Service selected:', service);
        
        this.eventBus?.emit('serviceProviderCalendar:serviceSelected', {
            fieldId: this.id,
            service: service,
            previousService: this.stepState.selectedService
        });
        
        this.setState({ 
            selectedService: service,
            selectedProvider: null,
            appointmentData: null,
            isTransitioning: true
        });
        
        // Filter providers
        this.filterProvidersByService(service);
        
        // Update provider carousel
        if (this.providerCarousel) {
            this.providerCarousel.updateItems(this.stepState.filteredProviders);
        }
        
        // Reset calendar
        if (this.calendarField) {
            this.calendarField.reset();
        }
        
        // Auto-advance to provider step
        setTimeout(() => {
            this.goToStep(1);
            this.setState({ isTransitioning: false });
        }, 300);
        
        // Trigger callback
        if (this.onServiceChange) {
            this.onServiceChange(service, this.stepState.filteredProviders);
        }
        
        this.updateValue();
    }
    
    async selectProvider(provider) {
        console.log('🎯 Provider selected:', provider);
        
        this.eventBus?.emit('serviceProviderCalendar:providerSelected', {
            fieldId: this.id,
            provider: provider,
            previousProvider: this.stepState.selectedProvider
        });
        
        this.setState({ 
            selectedProvider: provider,
            appointmentData: null,
            isTransitioning: true
        });
        
        // Configure calendar with provider's API settings
        await this.configureCalendar();
        
        // Auto-advance to calendar step
        setTimeout(() => {
            this.goToStep(2);
            this.setState({ isTransitioning: false });
        }, 300);
        
        // Trigger callback
        if (this.onProviderChange) {
            this.onProviderChange(provider, this.stepState.selectedService);
        }
        
        this.updateValue();
    }
    
    async configureCalendar() {
        if (!this.calendarField || !this.stepState.selectedProvider || !this.stepState.selectedService) {
            return;
        }
        
        this.eventBus?.emit('serviceProviderCalendar:configuringCalendar', {
            fieldId: this.id,
            provider: this.stepState.selectedProvider.name,
            service: this.stepState.selectedService.title
        });
        
        const providerInfo = this.providersInfo[this.stepState.selectedProvider.name];
        const serviceConfig = providerInfo?.services?.[this.stepState.selectedService.title];
        
        if (providerInfo && serviceConfig) {
            try {
                // Update calendar configuration
                this.calendarField.apiKey = providerInfo.apiKey;
                this.calendarField.scheduleId = providerInfo.scheduleId;
                this.calendarField.eventTypeId = serviceConfig.eventId;
                this.calendarField.eventTypeSlug = serviceConfig.eventSlug;
                this.calendarField.eventName = this.stepState.selectedService.title;
                this.calendarField.specialist = this.stepState.selectedProvider.name;
                this.calendarField.selectedCategory = this.stepState.selectedService.title;
                
                console.log('📅 Calendar configured:', {
                    provider: this.stepState.selectedProvider.name,
                    service: this.stepState.selectedService.title,
                    apiKey: providerInfo.apiKey,
                    scheduleId: providerInfo.scheduleId,
                    eventTypeId: serviceConfig.eventId
                });
                
                // Reinitialize calendar
                if (this.calendarField.initializeCalendar) {
                    await this.calendarField.initializeCalendar();
                }
                
                // Update header
                if (this.calendarField.updateCalendarHeader) {
                    this.calendarField.updateCalendarHeader();
                }
                
                this.eventBus?.emit('serviceProviderCalendar:calendarConfigured', {
                    fieldId: this.id,
                    success: true
                });
            } catch (error) {
                this.eventBus?.emit('serviceProviderCalendar:calendarConfigureError', {
                    fieldId: this.id,
                    error: error.message
                });
                
                console.error('Error configuring calendar:', error);
            }
        }
    }
    
    onAppointmentSelect(appointmentData) {
        console.log('🎯 Appointment selected:', appointmentData);
        
        this.eventBus?.emit('serviceProviderCalendar:appointmentSelected', {
            fieldId: this.id,
            appointment: appointmentData,
            previousAppointment: this.stepState.appointmentData
        });
        
        this.setState({ appointmentData });
        
        // Trigger callback
        if (this.onAppointmentChange) {
            this.onAppointmentChange(
                appointmentData, 
                this.stepState.selectedService, 
                this.stepState.selectedProvider
            );
        }
        
        this.updateValue();
    }
    
    goToStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= this.stepState.totalSteps) {
            return;
        }
        
        const transitionStartTime = performance.now();
        
        // Add to step history
        this.stepState.stepHistory.push({
            from: this.stepState.currentStep,
            to: stepIndex,
            timestamp: Date.now()
        });
        
        this.setState({ 
            currentStep: stepIndex,
            isTransitioning: true
        });
        
        setTimeout(() => {
            this.setState({ isTransitioning: false });
            
            // Track performance
            const transitionTime = performance.now() - transitionStartTime;
            this.performanceMetrics.stepTransitionTimes.push(transitionTime);
        }, 300);
        
        this.eventBus?.emit('serviceProviderCalendar:stepChanged', {
            fieldId: this.id,
            stepIndex: stepIndex,
            previousStep: this.stepState.currentStep,
            context: {
                service: this.stepState.selectedService,
                provider: this.stepState.selectedProvider,
                appointment: this.stepState.appointmentData
            }
        });
        
        if (this.onStepChange) {
            this.onStepChange(stepIndex, {
                service: this.stepState.selectedService,
                provider: this.stepState.selectedProvider,
                appointment: this.stepState.appointmentData
            });
        }
    }
    
    nextStep() {
        if (this.stepState.currentStep < this.stepState.totalSteps - 1) {
            this.goToStep(this.stepState.currentStep + 1);
        }
    }
    
    previousStep() {
        if (this.stepState.currentStep > 0) {
            this.goToStep(this.stepState.currentStep - 1);
        }
    }
    
    updateStepVisibility() {
        if (!this.element) return;
        
        const steps = this.element.querySelectorAll('.spc-step');
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === this.stepState.currentStep);
            step.classList.toggle('hidden', index !== this.stepState.currentStep);
        });
        
        // Update progress indicator
        const progressSteps = this.element.querySelectorAll('.spc-progress-step');
        progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index === this.stepState.currentStep);
            step.classList.toggle('completed', index < this.stepState.currentStep);
        });
        
        // Update navigation buttons
        const prevBtn = this.element.querySelector('.spc-prev-btn');
        const nextBtn = this.element.querySelector('.spc-next-btn');
        
        if (prevBtn) {
            prevBtn.style.display = this.stepState.currentStep === 0 ? 'none' : 'block';
        }
        
        if (nextBtn) {
            nextBtn.style.display = this.stepState.currentStep === this.stepState.totalSteps - 1 ? 'none' : 'block';
        }
    }
    
    // Enhanced validation with async support
    async validate() {
        try {
            this.eventBus?.emit('serviceProviderCalendar:validationStart', { fieldId: this.id });
            
            if (this.validator) {
                const rules = {};
                
                if (this.required) {
                    rules.serviceRequired = () => {
                        if (!this.stepState.selectedService) {
                            return 'Please select a service';
                        }
                        return true;
                    };
                    
                    rules.providerRequired = () => {
                        if (!this.stepState.selectedProvider) {
                            return 'Please select a provider';
                        }
                        return true;
                    };
                    
                    rules.appointmentRequired = () => {
                        if (!this.stepState.appointmentData) {
                            return 'Please select an appointment time';
                        }
                        return true;
                    };
                }
                
                const value = this.getValue();
                const result = await this.validator.validate(value, rules);
                
                this.eventBus?.emit('serviceProviderCalendar:validationComplete', {
                    fieldId: this.id,
                    isValid: result.isValid,
                    errors: result.errors
                });
                
                if (!result.isValid) {
                    this.showError(result.errors[0]);
                    return false;
                }
                
                this.hideError();
                return true;
            } else {
                // Fallback validation
                return this.validateFallback();
            }
        } catch (error) {
            this.eventBus?.emit('serviceProviderCalendar:validationError', {
                fieldId: this.id,
                error: error.message
            });
            
            this.showError('Validation error occurred');
            return false;
        }
    }
    
    validateFallback() {
        if (!this.required) return true;
        
        if (!this.stepState.selectedService) {
            this.showError('Please select a service');
            return false;
        }
        
        if (!this.stepState.selectedProvider) {
            this.showError('Please select a provider');
            return false;
        }
        
        if (!this.stepState.appointmentData) {
            this.showError('Please select an appointment time');
            return false;
        }
        
        this.hideError();
        return true;
    }
    
    render() {
        const container = this.createContainer();
        container.className += ' service-provider-calendar-field';
        
        // Add enhanced styles
        this.injectStyles();
        
        // Create progress indicator
        const progressContainer = document.createElement('div');
        progressContainer.className = 'spc-progress';
        
        const progressSteps = [
            { key: 'service', label: this.texts.serviceStep },
            { key: 'provider', label: this.texts.providerStep },
            { key: 'appointment', label: this.texts.appointmentStep }
        ];
        
        progressSteps.forEach((step, index) => {
            const stepEl = document.createElement('div');
            stepEl.className = 'spc-progress-step';
            stepEl.innerHTML = `
                <div class="spc-step-number">${index + 1}</div>
                <div class="spc-step-label">${step.label}</div>
            `;
            progressContainer.appendChild(stepEl);
        });
        
        container.appendChild(progressContainer);
        
        // Create steps container
        const stepsContainer = document.createElement('div');
        stepsContainer.className = 'spc-steps';
        
        // Step 1: Service Selection
        const serviceStep = this.createServiceStep();
        stepsContainer.appendChild(serviceStep);
        
        // Step 2: Provider Selection  
        const providerStep = this.createProviderStep();
        stepsContainer.appendChild(providerStep);
        
        // Step 3: Calendar
        const calendarStep = this.createCalendarStep();
        stepsContainer.appendChild(calendarStep);
        
        container.appendChild(stepsContainer);
        
        // Create navigation
        const navigation = this.createNavigation();
        container.appendChild(navigation);
        
        // Create error element
        const errorElement = this.createErrorElement();
        container.appendChild(errorElement);
        
        this.element = container;
        this.element.fieldInstance = this;
        
        // Initialize step visibility
        this.updateStepVisibility();
        
        this.eventBus?.emit('serviceProviderCalendar:rendered', { fieldId: this.id });
        
        return this.element;
    }
    
    createServiceStep() {
        const step = document.createElement('div');
        step.className = 'spc-step spc-service-step';
        
        const title = document.createElement('h3');
        title.className = 'spc-step-title';
        title.textContent = this.texts.selectService;
        step.appendChild(title);
        
        // Create service carousel using CarouselField pattern
        this.serviceCarousel = new CarouselField(this.factory, {
            id: `${this.id}-service`,
            name: `${this.name}_service`,
            items: this.servicesData,
            title: '',
            itemType: 'service',
            showDetails: true,
            layout: 'grid',
            columns: 'auto',
            serviceContainer: this.serviceContainer,
            eventBus: this.eventBus,
            validator: this.validator,
            formatter: this.formatter
        });
        
        // Override selectItem to handle our logic
        const originalSelectItem = this.serviceCarousel.selectItem.bind(this.serviceCarousel);
        this.serviceCarousel.selectItem = (index) => {
            originalSelectItem(index);
            const selectedService = this.servicesData[index];
            if (selectedService) {
                this.selectService(selectedService);
            }
        };
        
        step.appendChild(this.serviceCarousel.render());
        return step;
    }
    
    createProviderStep() {
        const step = document.createElement('div');
        step.className = 'spc-step spc-provider-step';
        
        const title = document.createElement('h3');
        title.className = 'spc-step-title';
        title.textContent = this.texts.selectProvider;
        step.appendChild(title);
        
        // Create provider carousel
        this.providerCarousel = new CarouselField(this.factory, {
            id: `${this.id}-provider`,
            name: `${this.name}_provider`,
            items: this.stepState.filteredProviders,
            title: '',
            itemType: 'staff',
            showDetails: true,
            layout: 'grid',
            columns: 'auto',
            serviceContainer: this.serviceContainer,
            eventBus: this.eventBus,
            validator: this.validator,
            formatter: this.formatter
        });
        
        // Override selectItem to handle our logic
        const originalSelectItem = this.providerCarousel.selectItem.bind(this.providerCarousel);
        this.providerCarousel.selectItem = (index) => {
            originalSelectItem(index);
            const selectedProvider = this.stepState.filteredProviders[index];
            if (selectedProvider) {
                this.selectProvider(selectedProvider);
            }
        };
        
        step.appendChild(this.providerCarousel.render());
        return step;
    }
    
    createCalendarStep() {
        const step = document.createElement('div');
        step.className = 'spc-step spc-calendar-step';
        
        const title = document.createElement('h3');
        title.className = 'spc-step-title';
        title.textContent = this.texts.selectAppointment;
        step.appendChild(title);
        
        // Create calendar field
        this.calendarField = new CalendarField(this.factory, {
            id: `${this.id}-calendar`,
            name: `${this.name}_calendar`,
            required: this.required,
            mode: 'booking',
            selectionMode: 'none',
            timezone: this.timezone,
            language: this.language,
            locale: this.locale,
            serviceContainer: this.serviceContainer,
            eventBus: this.eventBus,
            validator: this.validator,
            formatter: this.formatter,
            onChange: (value) => this.onAppointmentSelect(value)
        });
        
        step.appendChild(this.calendarField.render());
        return step;
    }
    
    createNavigation() {
        const nav = document.createElement('div');
        nav.className = 'spc-navigation';
        
        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'spc-nav-btn spc-prev-btn';
        prevBtn.textContent = this.texts.previous;
        
        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'spc-nav-btn spc-next-btn';
        nextBtn.textContent = this.texts.next;
        
        const prevHandler = () => this.previousStep();
        const nextHandler = () => this.nextStep();
        
        prevBtn.addEventListener('click', prevHandler);
        nextBtn.addEventListener('click', nextHandler);
        
        this.eventListeners.push(
            { element: prevBtn, event: 'click', handler: prevHandler },
            { element: nextBtn, event: 'click', handler: nextHandler }
        );
        
        nav.appendChild(prevBtn);
        nav.appendChild(nextBtn);
        
        return nav;
    }
    
    injectStyles() {
        if (document.querySelector('#spc-enhanced-styles')) return;
        
        const styles = `
            <style id="spc-enhanced-styles">
                .service-provider-calendar-field {
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto;
                    transition: opacity 0.3s ease;
                }
                
                .service-provider-calendar-field.transitioning {
                    opacity: 0.7;
                    pointer-events: none;
                }
                
                .spc-progress {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 30px;
                    position: relative;
                }
                
                .spc-progress::before {
                    content: '';
                    position: absolute;
                    top: 20px;
                    left: 10%;
                    right: 10%;
                    height: 2px;
                    background: #e1e5e9;
                    z-index: 1;
                    transition: all 0.3s ease;
                }
                
                .spc-progress-step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                    flex: 1;
                    transition: all 0.3s ease;
                }
                
                .spc-step-number {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #e1e5e9;
                    color: #6c757d;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    margin-bottom: 8px;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .spc-progress-step.active .spc-step-number {
                    background: #007bff;
                    color: white;
                    transform: scale(1.1);
                    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
                }
                
                .spc-progress-step.completed .spc-step-number {
                    background: #28a745;
                    color: white;
                    box-shadow: 0 2px 4px rgba(40,167,69,0.3);
                }
                
                .spc-step-label {
                    font-size: 0.9rem;
                    color: #6c757d;
                    text-align: center;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }
                
                .spc-progress-step.active .spc-step-label {
                    color: #007bff;
                    font-weight: 600;
                    transform: translateY(-2px);
                }
                
                .spc-steps {
                    min-height: 400px;
                    margin-bottom: 20px;
                    position: relative;
                    overflow: hidden;
                }
                
                .spc-step {
                    display: none;
                    opacity: 0;
                    transform: translateX(20px);
                    transition: all 0.3s ease;
                }
                
                .spc-step.active {
                    display: block;
                    opacity: 1;
                    transform: translateX(0);
                    animation: stepFadeIn 0.4s ease;
                }
                
                .spc-step-title {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #2c3e50;
                    font-size: 1.5rem;
                    font-weight: 600;
                }
                
                .spc-navigation {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    gap: 15px;
                }
                
                .spc-nav-btn {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    background: #007bff;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 0.95rem;
                    min-width: 100px;
                    box-shadow: 0 2px 4px rgba(0,123,255,0.2);
                }
                
                .spc-nav-btn:hover {
                    background: #0056b3;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(0,123,255,0.3);
                }
                
                .spc-nav-btn:disabled {
                    background: #6c757d;
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }
                
                .spc-nav-btn:active {
                    transform: translateY(0);
                }
                
                @keyframes stepFadeIn {
                    from { 
                        opacity: 0; 
                        transform: translateX(30px);
                    }
                    to { 
                        opacity: 1; 
                        transform: translateX(0);
                    }
                }
                
                @media (max-width: 768px) {
                    .spc-progress {
                        flex-direction: column;
                        gap: 10px;
                    }
                    
                    .spc-progress::before {
                        display: none;
                    }
                    
                    .spc-navigation {
                        flex-direction: column;
                    }
                    
                    .spc-nav-btn {
                        width: 100%;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    getValue() {
        return {
            selectedService: this.stepState.selectedService,
            selectedProvider: this.stepState.selectedProvider,
            appointment: this.stepState.appointmentData,
            currentStep: this.stepState.currentStep,
            isComplete: !!(this.stepState.selectedService && this.stepState.selectedProvider && this.stepState.appointmentData),
            performanceMetrics: {
                ...this.performanceMetrics,
                totalInteractionTime: Date.now() - this.performanceMetrics.startTime
            }
        };
    }
    
    setValue(value, options = {}) {
        if (!value) return;
        
        if (value.selectedService) {
            this.setState({ selectedService: value.selectedService });
            this.filterProvidersByService(value.selectedService);
        }
        
        if (value.selectedProvider) {
            this.setState({ selectedProvider: value.selectedProvider });
            this.configureCalendar();
        }
        
        if (value.appointment) {
            this.setState({ appointmentData: value.appointment });
        }
        
        if (value.currentStep !== undefined) {
            this.goToStep(value.currentStep);
        }
        
        if (!options.silent) {
            this.updateValue();
        }
        
        // Call parent setValue
        super.setValue(value, options);
    }
    
    updateValue() {
        this.handleChange();
        
        this.eventBus?.emit('serviceProviderCalendar:valueUpdated', {
            fieldId: this.id,
            value: this.getValue()
        });
    }
    
    reset() {
        this.eventBus?.emit('serviceProviderCalendar:reset', { fieldId: this.id });
        
        this.setState({
            currentStep: 0,
            selectedService: null,
            selectedProvider: null,
            appointmentData: null,
            filteredProviders: [...this.providersData],
            isTransitioning: false,
            stepHistory: []
        });
        
        // Reset performance metrics
        this.performanceMetrics = {
            stepTransitionTimes: [],
            totalInteractionTime: 0,
            startTime: Date.now()
        };
        
        if (this.serviceCarousel) {
            this.serviceCarousel.selectedItem = null;
            this.serviceCarousel.selectedItems = [];
            if (this.serviceCarousel.updateSelection) {
                this.serviceCarousel.updateSelection();
            }
        }
        
        if (this.providerCarousel) {
            if (this.providerCarousel.updateItems) {
                this.providerCarousel.updateItems(this.stepState.filteredProviders);
            }
        }
        
        if (this.calendarField) {
            this.calendarField.reset();
        }
        
        this.updateStepVisibility();
        this.hideError();
        this.updateValue();
    }
    
    cleanup() {
        this.eventBus?.emit('serviceProviderCalendar:cleanup', { fieldId: this.id });
        
        if (this.serviceCarousel && typeof this.serviceCarousel.cleanup === 'function') {
            this.serviceCarousel.cleanup();
        }
        if (this.providerCarousel && typeof this.providerCarousel.cleanup === 'function') {
            this.providerCarousel.cleanup();
        }
        if (this.calendarField && typeof this.calendarField.cleanup === 'function') {
            this.calendarField.cleanup();
        }
        
        super.cleanup();
    }
    
    destroy() {
        this.cleanup();
        
        if (this.serviceCarousel && typeof this.serviceCarousel.destroy === 'function') {
            this.serviceCarousel.destroy();
        }
        if (this.providerCarousel && typeof this.providerCarousel.destroy === 'function') {
            this.providerCarousel.destroy();
        }
        if (this.calendarField && typeof this.calendarField.destroy === 'function') {
            this.calendarField.destroy();
        }
        
        this.eventBus?.emit('serviceProviderCalendar:destroyed', { fieldId: this.id });
        
        super.destroy();
    }
}

// ===================================================================
// ENHANCED LEGACY COMPATIBILITY CLASSES
// ===================================================================

class CategoryAndItemCalendarField extends CalendarField {
    constructor(factory, config) {
        // Force category-item selection mode with enhanced configuration
        const enhancedConfig = {
            ...config,
            selectionMode: 'category-item',
            serviceContainer: config.serviceContainer,
            eventBus: config.eventBus,
            validator: config.validator,
            formatter: config.formatter,
            renderer: config.renderer
        };
        
        super(factory, enhancedConfig);
        
        // Emit legacy compatibility event
        this.eventBus?.emit('calendar:legacyFieldCreated', {
            fieldId: this.id,
            type: 'CategoryAndItemCalendarField',
            mode: 'category-item'
        });
    }
}

class ItemCalendarField extends CalendarField {
    constructor(factory, config) {
        // Force item selection mode and set the category with enhanced configuration
        const enhancedConfig = {
            ...config,
            selectionMode: 'item',
            selectedCategory: config.categoryName || config.eventName || '',
            serviceContainer: config.serviceContainer,
            eventBus: config.eventBus,
            validator: config.validator,
            formatter: config.formatter,
            renderer: config.renderer
        };
        
        super(factory, enhancedConfig);
        
        // Emit legacy compatibility event
        this.eventBus?.emit('calendar:legacyFieldCreated', {
            fieldId: this.id,
            type: 'ItemCalendarField',
            mode: 'item',
            categoryName: config.categoryName || config.eventName
        });
    }
}

// ===================================================================
// ENHANCED CURRENT APPOINTMENT CARD FIELD
// ===================================================================

class CurrentAppointmentCardField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Enhanced configuration with service injection
        this.serviceContainer = config.serviceContainer;
        this.eventBus = config.eventBus;
        this.validator = config.validator;
        this.formatter = config.formatter;
        this.renderer = config.renderer;
        
        // Appointment data
        this.appointmentData = config.appointmentData || {};
        this.showRescheduleButton = config.showRescheduleButton !== false;
        this.showCancelButton = config.showCancelButton !== false;
        this.language = config.language || 'en';
        this.timezone = config.timezone || 'America/Toronto';
        
        // Enhanced callbacks
        this.onReschedule = config.onReschedule || null;
        this.onCancel = config.onCancel || null;
        this.onViewDetails = config.onViewDetails || null;
        
        // Translations
        this.texts = this.setupTexts(config.texts || {});
        
        // Card state
        this.cardState = {
            isLoading: false,
            isProcessing: false,
            showDetails: false,
            actionInProgress: null
        };
        
        this.setupFormatters();
    }
    
    setupTexts(configTexts) {
        return {
            currentAppointment: configTexts.currentAppointment || 'Current Appointment',
            appointmentWith: configTexts.appointmentWith || 'Appointment with',
            scheduledFor: configTexts.scheduledFor || 'Scheduled for',
            service: configTexts.service || 'Service',
            duration: configTexts.duration || 'Duration',
            location: configTexts.location || 'Location',
            reschedule: configTexts.reschedule || 'Reschedule',
            cancel: configTexts.cancel || 'Cancel',
            viewDetails: configTexts.viewDetails || 'View Details',
            hideDetails: configTexts.hideDetails || 'Hide Details',
            processing: configTexts.processing || 'Processing...',
            noAppointment: configTexts.noAppointment || 'No upcoming appointment',
            confirmed: configTexts.confirmed || 'Confirmed',
            pending: configTexts.pending || 'Pending',
            ...configTexts
        };
    }
    
    setupFormatters() {
        // Date formatter
        this.dateFormatter = new Intl.DateTimeFormat(this.language === 'fr' ? 'fr-CA' : 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: this.timezone
        });
        
        // Time formatter
        this.timeFormatter = new Intl.DateTimeFormat(this.language === 'fr' ? 'fr-CA' : 'en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: this.timezone
        });
        
        // Date-time formatter
        this.dateTimeFormatter = new Intl.DateTimeFormat(this.language === 'fr' ? 'fr-CA' : 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: this.timezone
        });
    }
    
    // Enhanced state management
    setState(updates) {
        const prevState = { ...this.cardState };
        this.cardState = { ...this.cardState, ...updates };
        
        // Emit state change event
        this.eventBus?.emit('appointmentCard:stateChange', {
            fieldId: this.id,
            prevState,
            newState: this.cardState,
            updates
        });
        
        this.updateCardUI(updates);
    }
    
    updateCardUI(updates) {
        if (!this.element) return;
        
        if ('isLoading' in updates || 'isProcessing' in updates) {
            this.updateLoadingState();
        }
        
        if ('showDetails' in updates) {
            this.updateDetailsVisibility();
        }
        
        if ('actionInProgress' in updates) {
            this.updateActionButtons();
        }
    }
    
    updateLoadingState() {
        const card = this.element.querySelector('.appointment-card');
        if (card) {
            card.classList.toggle('loading', this.cardState.isLoading);
            card.classList.toggle('processing', this.cardState.isProcessing);
        }
        
        const buttons = this.element.querySelectorAll('.appointment-action-btn');
        buttons.forEach(btn => {
            btn.disabled = this.cardState.isLoading || this.cardState.isProcessing;
        });
    }
    
    updateDetailsVisibility() {
        const detailsSection = this.element.querySelector('.appointment-details-section');
        const toggleBtn = this.element.querySelector('.details-toggle-btn');
        
        if (detailsSection && toggleBtn) {
            detailsSection.style.display = this.cardState.showDetails ? 'block' : 'none';
            toggleBtn.textContent = this.cardState.showDetails ? 
                this.texts.hideDetails : this.texts.viewDetails;
        }
    }
    
    updateActionButtons() {
        const buttons = this.element.querySelectorAll('.appointment-action-btn');
        buttons.forEach(btn => {
            const action = btn.dataset.action;
            const isCurrentAction = this.cardState.actionInProgress === action;
            
            btn.classList.toggle('processing', isCurrentAction);
            btn.textContent = isCurrentAction ? 
                this.texts.processing : 
                btn.dataset.originalText || btn.textContent;
        });
    }
    
    async handleAction(action) {
        this.setState({ 
            isProcessing: true, 
            actionInProgress: action 
        });
        
        this.eventBus?.emit('appointmentCard:actionStart', {
            fieldId: this.id,
            action: action,
            appointmentData: this.appointmentData
        });
        
        try {
            switch (action) {
                case 'reschedule':
                    await this.handleReschedule();
                    break;
                case 'cancel':
                    await this.handleCancel();
                    break;
                case 'viewDetails':
                    this.handleViewDetails();
                    break;
                default:
                    console.warn('Unknown action:', action);
            }
            
            this.eventBus?.emit('appointmentCard:actionSuccess', {
                fieldId: this.id,
                action: action
            });
        } catch (error) {
            this.eventBus?.emit('appointmentCard:actionError', {
                fieldId: this.id,
                action: action,
                error: error.message
            });
            
            this.showError(`Error ${action}ing appointment: ${error.message}`);
        } finally {
            this.setState({ 
                isProcessing: false, 
                actionInProgress: null 
            });
        }
    }
    
    async handleReschedule() {
        if (this.onReschedule) {
            await this.onReschedule(this.appointmentData, this);
        } else {
            // Default reschedule behavior
            console.log('Reschedule appointment:', this.appointmentData);
        }
    }
    
    async handleCancel() {
        if (this.onCancel) {
            await this.onCancel(this.appointmentData, this);
        } else {
            // Default cancel behavior
            console.log('Cancel appointment:', this.appointmentData);
        }
    }
    
    handleViewDetails() {
        this.setState({ showDetails: !this.cardState.showDetails });
        
        if (this.onViewDetails) {
            this.onViewDetails(this.appointmentData, this.cardState.showDetails, this);
        }
    }
    
    formatAppointmentDate(dateTime) {
        if (!dateTime) return '';
        
        try {
            const date = new Date(dateTime);
            return this.dateTimeFormatter.format(date);
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateTime.toString();
        }
    }
    
    getStatusBadgeClass(status) {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return 'status-confirmed';
            case 'pending':
                return 'status-pending';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return 'status-default';
        }
    }
    
    render() {
        const container = this.createContainer();
        container.className += ' current-appointment-card-field';
        
        // Add styles
        this.injectStyles();
        
        if (!this.appointmentData || Object.keys(this.appointmentData).length === 0) {
            container.innerHTML = `
                <div class="appointment-card empty">
                    <div class="empty-state">
                        <div class="empty-icon">${SVGIcons.get('CALENDAR')}</div>
                        <div class="empty-message">${this.texts.noAppointment}</div>
                    </div>
                </div>
            `;
        } else {
            const formattedDate = this.formatAppointmentDate(this.appointmentData.dateTime);
            const statusClass = this.getStatusBadgeClass(this.appointmentData.status);
            
            container.innerHTML = `
                <div class="appointment-card">
                    <div class="appointment-header">
                        <div class="appointment-title">
                            <span class="title-icon">${SVGIcons.get('APPOINTMENT')}</span>
                            <span class="title-text">${this.texts.currentAppointment}</span>
                        </div>
                        <div class="appointment-status">
                            <span class="status-badge ${statusClass}">
                                ${this.appointmentData.status || this.texts.confirmed}
                            </span>
                        </div>
                    </div>
                    
                    <div class="appointment-content">
                        <div class="appointment-main-info">
                            <div class="appointment-provider">
                                <strong>${this.texts.appointmentWith}:</strong>
                                <span>${this.appointmentData.providerName || this.appointmentData.specialist || 'Provider'}</span>
                            </div>
                            
                            <div class="appointment-datetime">
                                <strong>${this.texts.scheduledFor}:</strong>
                                <span>${formattedDate}</span>
                            </div>
                            
                            ${this.appointmentData.serviceName ? `
                                <div class="appointment-service">
                                    <strong>${this.texts.service}:</strong>
                                    <span>${this.appointmentData.serviceName}</span>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="appointment-details-section" style="display: none;">
                            ${this.appointmentData.duration ? `
                                <div class="detail-item">
                                    <strong>${this.texts.duration}:</strong>
                                    <span>${this.appointmentData.duration}</span>
                                </div>
                            ` : ''}
                            
                            ${this.appointmentData.location ? `
                                <div class="detail-item">
                                    <strong>${this.texts.location}:</strong>
                                    <span>${this.appointmentData.location}</span>
                                </div>
                            ` : ''}
                            
                            ${this.appointmentData.notes ? `
                                <div class="detail-item">
                                    <strong>Notes:</strong>
                                    <span>${this.appointmentData.notes}</span>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="appointment-actions">
                            <button type="button" class="appointment-action-btn details-toggle-btn" data-action="viewDetails">
                                ${this.texts.viewDetails}
                            </button>
                            
                            ${this.showRescheduleButton ? `
                                <button type="button" class="appointment-action-btn reschedule-btn" data-action="reschedule" data-original-text="${this.texts.reschedule}">
                                    <span class="btn-icon">${SVGIcons.get('RESCHEDULE')}</span>
                                    <span class="btn-text">${this.texts.reschedule}</span>
                                </button>
                            ` : ''}
                            
                            ${this.showCancelButton ? `
                                <button type="button" class="appointment-action-btn cancel-btn" data-action="cancel" data-original-text="${this.texts.cancel}">
                                    <span class="btn-icon">${SVGIcons.get('CLOSE')}</span>
                                    <span class="btn-text">${this.texts.cancel}</span>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }
        
        const errorElement = this.createErrorElement();
        container.appendChild(errorElement);
        
        this.element = container;
        this.element.fieldInstance = this;
        
        this.attachEventListeners();
        
        this.eventBus?.emit('appointmentCard:rendered', {
            fieldId: this.id,
            hasAppointment: !!(this.appointmentData && Object.keys(this.appointmentData).length > 0)
        });
        
        return this.element;
    }
    
    attachEventListeners() {
        const actionButtons = this.element.querySelectorAll('.appointment-action-btn');
        
        actionButtons.forEach(button => {
            const action = button.dataset.action;
            
            const clickHandler = (e) => {
                e.preventDefault();
                this.handleAction(action);
            };
            
            button.addEventListener('click', clickHandler);
            this.eventListeners.push({
                element: button,
                event: 'click',
                handler: clickHandler
            });
        });
    }
    
    injectStyles() {
        if (document.querySelector('#appointment-card-styles')) return;
        
        const styles = `
            <style id="appointment-card-styles">
                .current-appointment-card-field {
                    width: 100%;
                }
                
                .appointment-card {
                    border: 1px solid #e1e5e9;
                    border-radius: 12px;
                    background: #ffffff;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    overflow: hidden;
                }
                
                .appointment-card.loading {
                    opacity: 0.7;
                    pointer-events: none;
                }
                
                .appointment-card.processing {
                    opacity: 0.8;
                }
                
                .appointment-card.empty {
                    border-style: dashed;
                    border-color: #dee2e6;
                    background: #f8f9fa;
                }
                
                .appointment-header {
                    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
                    color: white;
                    padding: 16px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .appointment-title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 600;
                    font-size: 1.1rem;
                }
                
                .title-icon {
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .status-badge {
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .status-confirmed {
                    background: rgba(40, 167, 69, 0.2);
                    color: #28a745;
                    border: 1px solid rgba(40, 167, 69, 0.3);
                }
                
                .status-pending {
                    background: rgba(255, 193, 7, 0.2);
                    color: #ffc107;
                    border: 1px solid rgba(255, 193, 7, 0.3);
                }
                
                .status-cancelled {
                    background: rgba(220, 53, 69, 0.2);
                    color: #dc3545;
                    border: 1px solid rgba(220, 53, 69, 0.3);
                }
                
                .appointment-content {
                    padding: 20px;
                }
                
                .appointment-main-info {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 20px;
                }
                
                .appointment-main-info > div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                    border-bottom: 1px solid #f0f0f0;
                }
                
                .appointment-main-info > div:last-child {
                    border-bottom: none;
                }
                
                .appointment-main-info strong {
                    color: #495057;
                    font-weight: 600;
                }
                
                .appointment-main-info span {
                    color: #212529;
                    text-align: right;
                }
                
                .appointment-details-section {
                    background: #f8f9fa;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 20px;
                    border: 1px solid #e9ecef;
                }
                
                .detail-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 6px 0;
                }
                
                .detail-item strong {
                    color: #495057;
                    font-weight: 600;
                }
                
                .appointment-actions {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                    align-items: center;
                }
                
                .appointment-action-btn {
                    padding: 10px 16px;
                    border: 1px solid #dee2e6;
                    border-radius: 6px;
                    background: #ffffff;
                    color: #495057;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.9rem;
                }
                
                .appointment-action-btn:hover {
                    background: #f8f9fa;
                    border-color: #ced4da;
                    transform: translateY(-1px);
                }
                
                .appointment-action-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }
                
                .details-toggle-btn {
                    color: #007bff;
                    border-color: #007bff;
                }
                
                .details-toggle-btn:hover {
                    background: #007bff;
                    color: white;
                }
                
                .reschedule-btn {
                    color: #ffc107;
                    border-color: #ffc107;
                }
                
                .reschedule-btn:hover {
                    background: #ffc107;
                    color: #212529;
                }
                
                .cancel-btn {
                    color: #dc3545;
                    border-color: #dc3545;
                }
                
                .cancel-btn:hover {
                    background: #dc3545;
                    color: white;
                }
                
                .appointment-action-btn.processing {
                    opacity: 0.7;
                    pointer-events: none;
                }
                
                .btn-icon {
                    width: 16px;
                    height: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                    text-align: center;
                    color: #6c757d;
                }
                
                .empty-icon {
                    width: 48px;
                    height: 48px;
                    margin-bottom: 16px;
                    opacity: 0.5;
                }
                
                .empty-message {
                    font-size: 1.1rem;
                    font-weight: 500;
                }
                
                @media (max-width: 768px) {
                    .appointment-header {
                        flex-direction: column;
                        gap: 10px;
                        text-align: center;
                    }
                    
                    .appointment-main-info > div {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 4px;
                    }
                    
                    .appointment-main-info span {
                        text-align: left;
                    }
                    
                    .appointment-actions {
                        flex-direction: column;
                    }
                    
                    .appointment-action-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    getValue() {
        return {
            appointmentData: this.appointmentData,
            cardState: this.cardState,
            hasAppointment: !!(this.appointmentData && Object.keys(this.appointmentData).length > 0)
        };
    }
    
    setValue(value, options = {}) {
        if (value && typeof value === 'object') {
            if (value.appointmentData) {
                this.appointmentData = value.appointmentData;
                
                // Re-render if element exists
                if (this.element && !options.silent) {
                    const parent = this.element.parentNode;
                    if (parent) {
                        const newElement = this.render();
                        parent.replaceChild(newElement, this.element);
                    }
                }
            }
            
            if (value.cardState) {
                this.setState(value.cardState);
            }
        }
        
        // Call parent setValue
        super.setValue(value, options);
    }
    
    updateAppointmentData(appointmentData) {
        this.appointmentData = appointmentData;
        
        this.eventBus?.emit('appointmentCard:dataUpdated', {
            fieldId: this.id,
            appointmentData: appointmentData
        });
        
        // Re-render
        const parent = this.element?.parentNode;
        if (parent) {
            const newElement = this.render();
            parent.replaceChild(newElement, this.element);
        }
        
        this.handleChange();
    }
    
    reset() {
        this.eventBus?.emit('appointmentCard:reset', { fieldId: this.id });
        
        this.appointmentData = {};
        this.setState({
            isLoading: false,
            isProcessing: false,
            showDetails: false,
            actionInProgress: null
        });
        
        // Re-render
        const parent = this.element?.parentNode;
        if (parent) {
            const newElement = this.render();
            parent.replaceChild(newElement, this.element);
        }
        
        this.hideError();
    }
    
    cleanup() {
        this.eventBus?.emit('appointmentCard:cleanup', { fieldId: this.id });
        super.cleanup();
    }
    
    destroy() {
        this.cleanup();
        this.eventBus?.emit('appointmentCard:destroyed', { fieldId: this.id });
        super.destroy();
    }
}

// ===================================================================
// ENHANCED BOOKING CANCELLATION CARD FIELD
// ===================================================================

class BookingCancellationCardField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Enhanced configuration with service injection
        this.serviceContainer = config.serviceContainer;
        this.eventBus = config.eventBus;
        this.validator = config.validator;
        this.formatter = config.formatter;
        this.renderer = config.renderer;
        
        // Configuration
        this.bookingData = config.bookingData || {};
        this.cancellationReasons = config.cancellationReasons || [];
        this.requireReason = config.requireReason !== false;
        this.language = config.language || 'en';
        this.timezone = config.timezone || 'America/Toronto';
        
        // Enhanced callbacks
        this.onCancel = config.onCancel || null;
        this.onConfirm = config.onConfirm || null;
        
        // Translations
        this.texts = this.setupTexts(config.texts || {});
        
        // Cancellation state
        this.cancellationState = {
            selectedReason: '',
            customReason: '',
            isProcessing: false,
            isConfirmed: false,
            step: 'reason' // 'reason', 'confirm', 'processing', 'complete'
        };
        
        this.setupFormatters();
    }
    
    setupTexts(configTexts) {
        return {
            cancelBooking: configTexts.cancelBooking || 'Cancel Booking',
            appointmentDetails: configTexts.appointmentDetails || 'Appointment Details',
            cancellationReason: configTexts.cancellationReason || 'Cancellation Reason',
            selectReason: configTexts.selectReason || 'Please select a reason for cancellation',
            customReason: configTexts.customReason || 'Other (please specify)',
            customReasonPlaceholder: configTexts.customReasonPlaceholder || 'Please provide a reason...',
            confirmCancellation: configTexts.confirmCancellation || 'Confirm Cancellation',
            confirmMessage: configTexts.confirmMessage || 'Are you sure you want to cancel this appointment?',
            cancel: configTexts.cancel || 'Cancel Appointment',
            goBack: configTexts.goBack || 'Go Back',
            processing: configTexts.processing || 'Processing...',
            cancelled: configTexts.cancelled || 'Appointment Cancelled',
            cancellationComplete: configTexts.cancellationComplete || 'Your appointment has been successfully cancelled.',
            reasonRequired: configTexts.reasonRequired || 'Please select a cancellation reason',
            date: configTexts.date || 'Date',
            time: configTexts.time || 'Time',
            provider: configTexts.provider || 'Provider',
            service: configTexts.service || 'Service',
            ...configTexts
        };
    }
    
    setupFormatters() {
        this.dateTimeFormatter = new Intl.DateTimeFormat(
            this.language === 'fr' ? 'fr-CA' : 'en-US', 
            {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: this.timezone
            }
        );
    }
    
    // Enhanced state management
    setState(updates) {
        const prevState = { ...this.cancellationState };
        this.cancellationState = { ...this.cancellationState, ...updates };
        
        // Emit state change event
        this.eventBus?.emit('cancellationCard:stateChange', {
            fieldId: this.id,
            prevState,
            newState: this.cancellationState,
            updates
        });
        
        this.updateCardUI(updates);
    }
    
    updateCardUI(updates) {
        if (!this.element) return;
        
        if ('step' in updates) {
            this.updateStepVisibility();
        }
        
        if ('isProcessing' in updates) {
            this.updateProcessingState();
        }
        
        if ('selectedReason' in updates) {
            this.updateReasonSelection();
        }
    }
    
    updateStepVisibility() {
        const steps = this.element.querySelectorAll('.cancellation-step');
        steps.forEach((step, index) => {
            const stepName = step.dataset.step;
            step.style.display = stepName === this.cancellationState.step ? 'block' : 'none';
        });
    }
    
    updateProcessingState() {
        const buttons = this.element.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.disabled = this.cancellationState.isProcessing;
        });
        
        const processingElements = this.element.querySelectorAll('.processing-indicator');
        processingElements.forEach(el => {
            el.style.display = this.cancellationState.isProcessing ? 'block' : 'none';
        });
    }
    
    updateReasonSelection() {
        const reasonRadios = this.element.querySelectorAll('input[name="cancellation-reason"]');
        reasonRadios.forEach(radio => {
            radio.checked = radio.value === this.cancellationState.selectedReason;
        });
        
        const customReasonContainer = this.element.querySelector('.custom-reason-container');
        if (customReasonContainer) {
            customReasonContainer.style.display = 
                this.cancellationState.selectedReason === 'other' ? 'block' : 'none';
        }
    }
    
    selectReason(reason) {
        this.setState({ selectedReason: reason });
        
        this.eventBus?.emit('cancellationCard:reasonSelected', {
            fieldId: this.id,
            reason: reason
        });
    }
    
    updateCustomReason(reason) {
        this.setState({ customReason: reason });
    }
    
    async proceedToConfirmation() {
        // Validate reason selection
        if (this.requireReason && !this.cancellationState.selectedReason) {
            this.showError(this.texts.reasonRequired);
            return;
        }
        
        if (this.cancellationState.selectedReason === 'other' && !this.cancellationState.customReason.trim()) {
            this.showError(this.texts.reasonRequired);
            return;
        }
        
        this.hideError();
        this.setState({ step: 'confirm' });
    }
    
    goBackToReason() {
        this.setState({ step: 'reason' });
    }
    
    async confirmCancellation() {
        this.setState({ 
            isProcessing: true, 
            step: 'processing' 
        });
        
        const cancellationData = {
            bookingId: this.bookingData.id,
            reason: this.cancellationState.selectedReason === 'other' ? 
                this.cancellationState.customReason : 
                this.cancellationState.selectedReason,
            timestamp: new Date().toISOString(),
            bookingData: this.bookingData
        };
        
        this.eventBus?.emit('cancellationCard:cancellationStart', {
            fieldId: this.id,
            cancellationData: cancellationData
        });
        
        try {
            if (this.onCancel) {
                await this.onCancel(cancellationData, this);
            }
            
            this.setState({ 
                isProcessing: false,
                isConfirmed: true,
                step: 'complete'
            });
            
            this.eventBus?.emit('cancellationCard:cancellationSuccess', {
                fieldId: this.id,
                cancellationData: cancellationData
            });
            
            this.handleChange();
        } catch (error) {
            this.setState({ 
                isProcessing: false,
                step: 'confirm'
            });
            
            this.eventBus?.emit('cancellationCard:cancellationError', {
                fieldId: this.id,
                error: error.message
            });
            
            this.showError(`Cancellation failed: ${error.message}`);
        }
    }
    
    formatBookingDate(dateTime) {
        if (!dateTime) return '';
        
        try {
            const date = new Date(dateTime);
            return this.dateTimeFormatter.format(date);
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateTime.toString();
        }
    }
    
    async validate() {
        if (!this.required) return true;
        
        if (this.cancellationState.step === 'complete' && this.cancellationState.isConfirmed) {
            this.hideError();
            return true;
        }
        
        this.showError('Cancellation process not completed');
        return false;
    }
    
    render() {
        const container = this.createContainer();
        container.className += ' booking-cancellation-card-field';
        
        // Add styles
        this.injectStyles();
        
        const formattedDate = this.formatBookingDate(this.bookingData.dateTime);
        
        container.innerHTML = `
            <div class="cancellation-card">
                <div class="cancellation-header">
                    <div class="header-icon">${SVGIcons.get('CLOSE')}</div>
                    <h3 class="header-title">${this.texts.cancelBooking}</h3>
                </div>
                
                <!-- Booking Details -->
                <div class="booking-details">
                    <h4>${this.texts.appointmentDetails}</h4>
                    <div class="details-grid">
                        <div class="detail-item">
                            <strong>${this.texts.date}:</strong>
                            <span>${formattedDate}</span>
                        </div>
                        <div class="detail-item">
                            <strong>${this.texts.provider}:</strong>
                            <span>${this.bookingData.providerName || this.bookingData.specialist || 'N/A'}</span>
                        </div>
                        <div class="detail-item">
                            <strong>${this.texts.service}:</strong>
                            <span>${this.bookingData.serviceName || 'N/A'}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Step 1: Reason Selection -->
                <div class="cancellation-step" data-step="reason">
                    <div class="step-content">
                        <h4>${this.texts.cancellationReason}</h4>
                        <p class="step-description">${this.texts.selectReason}</p>
                        
                        <div class="reason-options">
                            ${this.cancellationReasons.map(reason => `
                                <label class="reason-option">
                                    <input type="radio" name="cancellation-reason" value="${reason.value}">
                                    <span class="reason-label">${reason.label}</span>
                                </label>
                            `).join('')}
                            
                            <label class="reason-option">
                                <input type="radio" name="cancellation-reason" value="other">
                                <span class="reason-label">${this.texts.customReason}</span>
                            </label>
                        </div>
                        
                        <div class="custom-reason-container" style="display: none;">
                            <textarea 
                                class="custom-reason-input" 
                                placeholder="${this.texts.customReasonPlaceholder}"
                                rows="3"></textarea>
                        </div>
                        
                        <div class="step-actions">
                            <button type="button" class="btn btn-primary proceed-btn">
                                ${this.texts.confirmCancellation}
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Step 2: Confirmation -->
                <div class="cancellation-step" data-step="confirm" style="display: none;">
                    <div class="step-content">
                        <h4>${this.texts.confirmCancellation}</h4>
                        <p class="step-description">${this.texts.confirmMessage}</p>
                        
                        <div class="confirmation-summary">
                            <div class="summary-item">
                                <strong>Reason:</strong>
                                <span class="selected-reason-display"></span>
                            </div>
                        </div>
                        
                        <div class="step-actions">
                            <button type="button" class="btn btn-secondary back-btn">
                                ${this.texts.goBack}
                            </button>
                            <button type="button" class="btn btn-danger confirm-btn">
                                ${this.texts.cancel}
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Step 3: Processing -->
                <div class="cancellation-step" data-step="processing" style="display: none;">
                    <div class="step-content">
                        <div class="processing-indicator">
                            <div class="spinner"></div>
                            <p>${this.texts.processing}</p>
                        </div>
                    </div>
                </div>
                
                <!-- Step 4: Complete -->
                <div class="cancellation-step" data-step="complete" style="display: none;">
                    <div class="step-content">
                        <div class="success-indicator">
                            <div class="success-icon">${SVGIcons.get('CHECK')}</div>
                            <h4>${this.texts.cancelled}</h4>
                            <p>${this.texts.cancellationComplete}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const errorElement = this.createErrorElement();
        container.appendChild(errorElement);
        
        this.element = container;
        this.element.fieldInstance = this;
        
        this.attachEventListeners();
        
        this.eventBus?.emit('cancellationCard:rendered', { fieldId: this.id });
        
        return this.element;
    }
    
    attachEventListeners() {
        // Reason selection
        const reasonRadios = this.element.querySelectorAll('input[name="cancellation-reason"]');
        reasonRadios.forEach(radio => {
            const changeHandler = () => this.selectReason(radio.value);
            radio.addEventListener('change', changeHandler);
            this.eventListeners.push({
                element: radio,
                event: 'change',
                handler: changeHandler
            });
        });
        
        // Custom reason input
        const customReasonInput = this.element.querySelector('.custom-reason-input');
        if (customReasonInput) {
            const inputHandler = () => this.updateCustomReason(customReasonInput.value);
            customReasonInput.addEventListener('input', inputHandler);
            this.eventListeners.push({
                element: customReasonInput,
                event: 'input',
                handler: inputHandler
            });
        }
        
        // Proceed button
        const proceedBtn = this.element.querySelector('.proceed-btn');
        if (proceedBtn) {
            const clickHandler = () => this.proceedToConfirmation();
            proceedBtn.addEventListener('click', clickHandler);
            this.eventListeners.push({
                element: proceedBtn,
                event: 'click',
                handler: clickHandler
            });
        }
        
        // Back button
        const backBtn = this.element.querySelector('.back-btn');
        if (backBtn) {
            const clickHandler = () => this.goBackToReason();
            backBtn.addEventListener('click', clickHandler);
            this.eventListeners.push({
                element: backBtn,
                event: 'click',
                handler: clickHandler
            });
        }
        
        // Confirm button
        const confirmBtn = this.element.querySelector('.confirm-btn');
        if (confirmBtn) {
            const clickHandler = () => this.confirmCancellation();
            confirmBtn.addEventListener('click', clickHandler);
            this.eventListeners.push({
                element: confirmBtn,
                event: 'click',
                handler: clickHandler
            });
        }
    }
    
    injectStyles() {
        if (document.querySelector('#cancellation-card-styles')) return;
        
        const styles = `
            <style id="cancellation-card-styles">
                .booking-cancellation-card-field {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                }
                
                .cancellation-card {
                    border: 1px solid #dc3545;
                    border-radius: 12px;
                    background: #ffffff;
                    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.1);
                    overflow: hidden;
                }
                
                .cancellation-header {
                    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
                    color: white;
                    padding: 20px;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }
                
                .header-icon {
                    width: 24px;
                    height: 24px;
                }
                
                .header-title {
                    margin: 0;
                    font-size: 1.3rem;
                    font-weight: 600;
                }
                
                .booking-details {
                    padding: 20px;
                    background: #f8f9fa;
                    border-bottom: 1px solid #dee2e6;
                }
                
                .booking-details h4 {
                    margin: 0 0 16px 0;
                    color: #495057;
                    font-size: 1.1rem;
                }
                
                .details-grid {
                    display: grid;
                    gap: 8px;
                }
                
                .detail-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 6px 0;
                }
                
                .detail-item strong {
                    color: #495057;
                    font-weight: 600;
                }
                
                .step-content {
                    padding: 24px;
                }
                
                .step-content h4 {
                    margin: 0 0 12px 0;
                    color: #495057;
                    font-size: 1.2rem;
                }
                
                .step-description {
                    color: #6c757d;
                    margin-bottom: 20px;
                    line-height: 1.5;
                }
                
                .reason-options {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 20px;
                }
                
                .reason-option {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .reason-option:hover {
                    background: #f8f9fa;
                    border-color: #ced4da;
                }
                
                .reason-option input[type="radio"] {
                    margin: 0;
                }
                
                .reason-option input[type="radio"]:checked + .reason-label {
                    font-weight: 600;
                    color: #dc3545;
                }
                
                .custom-reason-container {
                    margin-top: 16px;
                }
                
                .custom-reason-input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ced4da;
                    border-radius: 6px;
                    font-family: inherit;
                    font-size: 0.95rem;
                    resize: vertical;
                }
                
                .custom-reason-input:focus {
                    outline: none;
                    border-color: #dc3545;
                    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
                }
                
                .confirmation-summary {
                    background: #f8f9fa;
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 24px;
                }
                
                .summary-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .step-actions {
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                }
                
                .btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 0.95rem;
                }
                
                .btn-primary {
                    background: #007bff;
                    color: white;
                }
                
                .btn-primary:hover {
                    background: #0056b3;
                }
                
                .btn-secondary {
                    background: #6c757d;
                    color: white;
                }
                
                .btn-secondary:hover {
                    background: #545b62;
                }
                
                .btn-danger {
                    background: #dc3545;
                    color: white;
                }
                
                .btn-danger:hover {
                    background: #c82333;
                }
                
                .btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                
                .processing-indicator,
                .success-indicator {
                    text-align: center;
                    padding: 40px 20px;
                }
                
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #dc3545;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 16px;
                }
                
                .success-icon {
                    width: 48px;
                    height: 48px;
                    margin: 0 auto 16px;
                    color: #28a745;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @media (max-width: 768px) {
                    .step-actions {
                        flex-direction: column;
                    }
                    
                    .btn {
                        width: 100%;
                    }
                    
                    .detail-item {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 4px;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    getValue() {
        return {
            bookingData: this.bookingData,
            cancellationState: this.cancellationState,
            isCancelled: this.cancellationState.isConfirmed,
            cancellationReason: this.cancellationState.selectedReason === 'other' ? 
                this.cancellationState.customReason : 
                this.cancellationState.selectedReason
        };
    }
    
    setValue(value, options = {}) {
        if (value && typeof value === 'object') {
            if (value.bookingData) {
                this.bookingData = value.bookingData;
            }
            
            if (value.cancellationState) {
                this.setState(value.cancellationState);
            }
        }
        
        // Call parent setValue
        super.setValue(value, options);
    }
    
    reset() {
        this.eventBus?.emit('cancellationCard:reset', { fieldId: this.id });
        
        this.setState({
            selectedReason: '',
            customReason: '',
            isProcessing: false,
            isConfirmed: false,
            step: 'reason'
        });
        
        // Reset form inputs
        const reasonRadios = this.element?.querySelectorAll('input[name="cancellation-reason"]');
        reasonRadios?.forEach(radio => {
            radio.checked = false;
        });
        
        const customReasonInput = this.element?.querySelector('.custom-reason-input');
        if (customReasonInput) {
            customReasonInput.value = '';
        }
        
        this.hideError();
    }
    
    cleanup() {
        this.eventBus?.emit('cancellationCard:cleanup', { fieldId: this.id });
        super.cleanup();
    }
    
    destroy() {
        this.cleanup();
        this.eventBus?.emit('cancellationCard:destroyed', { fieldId: this.id });
        super.destroy();
    }
}

// ===================================================================
// ENHANCED CAROUSEL FIELDS WITH MODERN ARCHITECTURE
// Integrates dependency injection, event-driven architecture, and advanced state management
// ===================================================================

/**
 * Enhanced Base Carousel Field - Contains all shared functionality with modern architecture
 */
class BaseCarouselField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Enhanced configuration with validation
        this.config = this.validateConfig(config);
        this.items = this.config.items || [];
        this.title = this.config.title || '';
        this.subtitle = this.config.subtitle || '';
        this.itemType = this.config.itemType || 'generic';
        this.allowMultiple = this.config.allowMultiple || false;
        this.showDetails = this.config.showDetails !== false;
        this.showNavigation = this.config.showNavigation !== false;
        
        // Enhanced state management
        this.setState({
            ...this.state,
            selectedItem: null,
            selectedItems: [],
            currentIndex: 0,
            isInitialized: false,
            isLoading: false,
            error: null,
            itemsPerView: 1,
            shouldCenter: false
        });
        
        // Responsive configuration with validation
        this.responsiveConfig = {
            mobile: { itemsPerView: 1, cardWidth: 200 },
            tablet: { itemsPerView: 2, cardWidth: 220 },
            desktop: { itemsPerView: 3, cardWidth: 250 },
            ...this.config.responsiveConfig
        };
        
        this.gap = this.config.gap || 16;
        
        // Performance optimizations
        this.domCache = new Map();
        this.renderCache = new Map();
        this.debounceMap = new Map();
        
        // Animation and interaction state
        this.isAnimating = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.enableSwipe = this.config.enableSwipe !== false;
        
        // Auto-update configuration
        this.autoUpdate = this.config.autoUpdate || false;
        this.updateInterval = null;
        
        // Bind methods with performance optimization
        this.setupMethodBindings();
        
        // Initialize responsive behavior
        this.updateResponsiveState();
        
        this.eventBus?.emit('carouselField:created', {
            fieldId: this.id,
            itemCount: this.items.length,
            allowMultiple: this.allowMultiple
        });
    }

    validateConfig(config) {
        const validatedConfig = { ...config };
        
        // Validate required fields
        if (!validatedConfig.items || !Array.isArray(validatedConfig.items)) {
            console.warn(`CarouselField [${config.id}]: items should be an array`);
            validatedConfig.items = [];
        }
        
        // Validate responsive config
        if (validatedConfig.responsiveConfig) {
            const requiredBreakpoints = ['mobile', 'tablet', 'desktop'];
            requiredBreakpoints.forEach(bp => {
                if (!validatedConfig.responsiveConfig[bp]) {
                    console.warn(`CarouselField [${config.id}]: Missing ${bp} responsive config`);
                }
            });
        }
        
        return validatedConfig;
    }

    setupMethodBindings() {
        // Create debounced methods
        this.debouncedResize = this.createDebouncedMethod('resize', this.handleResize.bind(this), 150);
        this.debouncedUpdate = this.createDebouncedMethod('update', this.updateItems.bind(this), 100);
        
        // Bind frequently used methods
        this.selectItem = this.selectItem.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    createDebouncedMethod(key, func, wait) {
        if (this.debounceMap.has(key)) {
            return this.debounceMap.get(key);
        }
        
        let timeout;
        const debouncedFunc = (...args) => {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
        
        this.debounceMap.set(key, debouncedFunc);
        return debouncedFunc;
    }

    // Enhanced responsive system
    getBreakpoint() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }

    getItemsPerView() {
        const breakpoint = this.getBreakpoint();
        return this.responsiveConfig[breakpoint]?.itemsPerView || 1;
    }

    getCardWidth() {
        const breakpoint = this.getBreakpoint();
        return this.responsiveConfig[breakpoint]?.cardWidth || 200;
    }

    updateResponsiveState() {
        const newItemsPerView = this.getItemsPerView();
        const shouldCenter = this.items.length <= newItemsPerView;
        
        this.setState({
            itemsPerView: newItemsPerView,
            shouldCenter: shouldCenter
        });
    }

    handleResize() {
        this.updateResponsiveState();
        
        const { currentIndex, itemsPerView } = this.state;
        const maxIndex = Math.max(0, this.items.length - itemsPerView);
        
        // Adjust current index if needed
        if (currentIndex > maxIndex) {
            this.setState({ currentIndex: maxIndex });
        }
        
        // Update UI
        this.updateContainerSizing();
        this.updateTrackPosition();
        this.updateNavigationState();
        
        this.eventBus?.emit('carouselField:resize', {
            fieldId: this.id,
            itemsPerView: itemsPerView,
            shouldCenter: this.state.shouldCenter
        });
        
        console.log(`📱 CAROUSEL RESIZE [${this.id}]: ${itemsPerView} cards per view, ${this.items.length} total cards`);
    }

    render() {
        try {
            this.setState({ isLoading: true });
            
            this.container = this.createContainer();
            this.container.className += ' carousel-field enhanced-carousel';
            
            // Add error boundary
            try {
                this.createCarouselStructure();
                this.setupEventListeners();
                this.renderItems();
                this.updateNavigation();
                this.setState({ isInitialized: true });
                
                this.eventBus?.emit('carouselField:rendered', {
                    fieldId: this.id,
                    itemCount: this.items.length
                });
                
            } catch (error) {
                this.handleRenderError(error);
            }
            
            this.setState({ isLoading: false });
            this.postRender(); // Hook for subclasses
            
            return this.container;
            
        } catch (error) {
            console.error(`Error rendering carousel field [${this.id}]:`, error);
            return this.renderErrorState(error);
        }
    }

    handleRenderError(error) {
        this.setState({ 
            error: error.message,
            isLoading: false
        });
        
        this.eventBus?.emit('carouselField:renderError', {
            fieldId: this.id,
            error: error.message
        });
        
        this.renderErrorState(error);
    }

    renderErrorState(error) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'carousel-error-state';
        errorContainer.innerHTML = `
            <div class="error-content">
                <div class="error-icon">⚠️</div>
                <div class="error-message">Failed to load carousel</div>
                <div class="error-details">${error.message}</div>
            </div>
        `;
        return errorContainer;
    }

    // Hook for subclasses to override
    postRender() {}

    createCarouselStructure() {
        const fragment = document.createDocumentFragment();
        
        this.galleryContainer = document.createElement('div');
        this.galleryContainer.className = 'carousel-gallery-container';
        this.galleryContainer.setAttribute('role', 'region');
        this.galleryContainer.setAttribute('aria-label', 'Carousel Gallery');
        
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'carousel-content-wrapper';
        
        // Carousel section with enhanced accessibility
        const carouselWrapper = document.createElement('div');
        carouselWrapper.className = 'carousel-image-container';
        carouselWrapper.setAttribute('role', 'group');
        carouselWrapper.setAttribute('aria-label', 'Image carousel');
        
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'carousel-cards-container';
        
        this.track = document.createElement('div');
        this.track.className = 'carousel-track';
        this.track.setAttribute('role', 'list');
        this.track.style.transition = 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
        
        carouselContainer.appendChild(this.track);
        carouselWrapper.appendChild(carouselContainer);

        // Enhanced navigation with accessibility
        if (this.showNavigation) {
            const { prevButton, nextButton } = this.createNavigationButtons();
            this.prevButton = prevButton;
            this.nextButton = nextButton;
            carouselWrapper.appendChild(prevButton);
            carouselWrapper.appendChild(nextButton);
        }

        contentWrapper.appendChild(carouselWrapper);
        this.galleryContainer.appendChild(contentWrapper);
        fragment.appendChild(this.galleryContainer);
        this.container.appendChild(fragment);
    }

    createNavigationButtons() {
        const prevButton = document.createElement('button');
        prevButton.type = 'button';
        prevButton.className = 'carousel-nav-btn carousel-prev-btn';
        prevButton.innerHTML = SVGIcons.get('CHEVRON') || '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" fill="currentColor"/></svg>';
        prevButton.setAttribute('aria-label', 'Previous items');
        prevButton.setAttribute('tabindex', '0');

        const nextButton = document.createElement('button');
        nextButton.type = 'button';
        nextButton.className = 'carousel-nav-btn carousel-next-btn';
        nextButton.innerHTML = SVGIcons.get('CHEVRON') || '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/></svg>';
        nextButton.setAttribute('aria-label', 'Next items');
        nextButton.setAttribute('tabindex', '0');

        return { prevButton, nextButton };
    }

    setupEventListeners() {
        // Enhanced navigation events with error handling
        if (this.prevButton && this.nextButton) {
            const prevHandler = this.createNavigationHandler('prev');
            const nextHandler = this.createNavigationHandler('next');
            
            this.prevButton.addEventListener('click', prevHandler);
            this.nextButton.addEventListener('click', nextHandler);
            
            // Keyboard support
            this.prevButton.addEventListener('keydown', this.handleKeydown);
            this.nextButton.addEventListener('keydown', this.handleKeydown);
            
            this.eventListeners.push(
                { element: this.prevButton, event: 'click', handler: prevHandler },
                { element: this.nextButton, event: 'click', handler: nextHandler },
                { element: this.prevButton, event: 'keydown', handler: this.handleKeydown },
                { element: this.nextButton, event: 'keydown', handler: this.handleKeydown }
            );
        }

        // Enhanced resize event with performance optimization
        window.addEventListener('resize', this.debouncedResize);
        this.eventListeners.push({ element: window, event: 'resize', handler: this.debouncedResize });
        
        // Touch support for mobile
        if (this.enableSwipe && this.track) {
            this.track.addEventListener('touchstart', this.handleTouchStart, { passive: true });
            this.track.addEventListener('touchend', this.handleTouchEnd, { passive: true });
            
            this.eventListeners.push(
                { element: this.track, event: 'touchstart', handler: this.handleTouchStart },
                { element: this.track, event: 'touchend', handler: this.handleTouchEnd }
            );
        }
        
        // Additional listeners for subclasses
        this.setupAdditionalListeners();
        
        this.eventBus?.emit('carouselField:eventListenersSetup', { fieldId: this.id });
    }

    // Hook for subclasses
    setupAdditionalListeners() {}

    handleKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.target.click();
        }
    }

    handleTouchStart(event) {
        this.touchStartX = event.changedTouches[0].screenX;
    }

    handleTouchEnd(event) {
        this.touchEndX = event.changedTouches[0].screenX;
        this.handleSwipe();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchStartX - this.touchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }

    createNavigationHandler(direction) {
        return (event) => {
            event.preventDefault();
            event.stopPropagation();
            
            if (this.isAnimating) return;
            
            try {
                if (direction === 'prev') {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            } catch (error) {
                console.error(`Navigation error [${this.id}]:`, error);
                this.eventBus?.emit('carouselField:navigationError', {
                    fieldId: this.id,
                    direction,
                    error: error.message
                });
            }
        };
    }

    async renderItems() {
        if (!this.track) return;
        
        this.setState({ isLoading: true });
        
        try {
            // Clear existing items
            this.track.innerHTML = '';
            this.invalidateCache();
            
            if (this.items.length === 0) {
                this.renderEmptyState();
                this.updateContainerSizing();
                return;
            }
            
            // Use document fragment for better performance
            const fragment = document.createDocumentFragment();
            
            // Batch render items
            await this.batchRenderItems(fragment);
            
            this.track.appendChild(fragment);
            this.updateContainerSizing();
            this.updateTrackPosition();
            
            this.eventBus?.emit('carouselField:itemsRendered', {
                fieldId: this.id,
                itemCount: this.items.length
            });
            
        } catch (error) {
            console.error(`Error rendering items [${this.id}]:`, error);
            this.setState({ error: error.message });
        } finally {
            this.setState({ isLoading: false });
        }
    }

    async batchRenderItems(fragment) {
        const batchSize = 10;
        
        for (let i = 0; i < this.items.length; i += batchSize) {
            const batch = this.items.slice(i, i + batchSize);
            const batchFragment = document.createDocumentFragment();
            
            batch.forEach((item, batchIndex) => {
                const actualIndex = i + batchIndex;
                const itemElement = this.createItemElement(item, actualIndex);
                batchFragment.appendChild(itemElement);
            });
            
            fragment.appendChild(batchFragment);
            
            // Yield control for large lists
            if (i > 0 && i % (batchSize * 2) === 0) {
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        }
    }

    updateContainerSizing() {
        if (!this.galleryContainer) return;
        
        const carouselContainer = this.galleryContainer.querySelector('.carousel-cards-container');
        if (!carouselContainer) return;
        
        // Remove existing sizing classes
        carouselContainer.classList.remove('container-1-card', 'container-2-cards', 'container-multiple-cards');
        
        if (this.items.length === 0) return;
        
        const { shouldCenter, itemsPerView } = this.state;
        
        if (shouldCenter) {
            if (this.items.length === 1) {
                carouselContainer.classList.add('container-1-card');
            } else if (this.items.length === 2 && itemsPerView >= 2) {
                carouselContainer.classList.add('container-2-cards');
            } else {
                carouselContainer.classList.add('container-multiple-cards');
            }
            
            console.log(`📦 CONTAINER [${this.id}]: Sized for ${this.items.length} cards (centered)`);
        } else {
            carouselContainer.classList.add('container-multiple-cards');
        }
    }

    renderEmptyState() {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'carousel-empty-message';
        emptyMessage.setAttribute('role', 'status');
        emptyMessage.setAttribute('aria-live', 'polite');
        
        emptyMessage.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <div class="empty-message">${this.getEmptyMessage()}</div>
                ${this.getEmptySubMessage() ? `<div class="empty-submessage">${this.getEmptySubMessage()}</div>` : ''}
            </div>
        `;
        
        this.track.appendChild(emptyMessage);
    }

    // Hooks for subclasses to customize empty state
    getEmptyMessage() {
        return this.config.emptyMessage || 'No items available';
    }

    getEmptySubMessage() {
        return '';
    }

    createItemElement(item, index) {
        // Check render cache first
        const cacheKey = `item-${item.id || index}-${JSON.stringify(item).slice(0, 100)}`;
        if (this.renderCache.has(cacheKey)) {
            const cached = this.renderCache.get(cacheKey).cloneNode(true);
            cached.dataset.index = index;
            return cached;
        }
        
        const itemEl = document.createElement('div');
        itemEl.className = 'carousel-item';
        itemEl.dataset.index = index;
        itemEl.setAttribute('role', 'listitem');
        itemEl.setAttribute('tabindex', '0');
        itemEl.setAttribute('aria-label', item.title || item.name || `Item ${index + 1}`);

        // Enhanced item structure
        const itemContent = document.createElement('div');
        itemContent.className = 'carousel-item-inner';

        // Image with error handling
        if (item.image) {
            itemContent.appendChild(this.createItemImage(item));
        }

        // Content
        itemContent.appendChild(this.createItemContent(item));
        
        itemEl.appendChild(itemContent);
        
        // Enhanced event listeners
        const clickHandler = () => this.selectItem(index);
        const keyHandler = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.selectItem(index);
            }
        };
        
        itemEl.addEventListener('click', clickHandler);
        itemEl.addEventListener('keydown', keyHandler);
        
        // Store for cleanup
        this.eventListeners.push(
            { element: itemEl, event: 'click', handler: clickHandler },
            { element: itemEl, event: 'keydown', handler: keyHandler }
        );
        
        // Cache the element
        this.renderCache.set(cacheKey, itemEl.cloneNode(true));
        
        return itemEl;
    }

    createItemImage(item) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'carousel-item-image-container';
        
        const img = document.createElement('img');
        img.className = 'carousel-item-image';
        img.src = item.image;
        img.alt = item.title || item.name || '';
        img.loading = 'lazy';
        
        // Enhanced error handling
        img.addEventListener('error', () => {
            img.style.display = 'none';
            imgContainer.classList.add('image-error');
            
            // Add fallback icon
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.innerHTML = '🖼️';
            imgContainer.appendChild(fallback);
        });
        
        img.addEventListener('load', () => {
            imgContainer.classList.add('image-loaded');
        });
        
        imgContainer.appendChild(img);
        return imgContainer;
    }

    createItemContent(item) {
        const content = document.createElement('div');
        content.className = 'carousel-item-content';

        // Title
        if (item.title || item.name) {
            const title = document.createElement('h4');
            title.className = 'carousel-item-title';
            title.textContent = item.title || item.name;
            content.appendChild(title);
        }

        // Subtitle
        if (item.position || item.category) {
            const subtitle = document.createElement('p');
            subtitle.className = 'carousel-item-subtitle';
            subtitle.textContent = item.position || item.category;
            content.appendChild(subtitle);
        }

        // Description with truncation
        if (item.description) {
            const desc = document.createElement('p');
            desc.className = 'carousel-item-description';
            desc.textContent = this.truncateText(item.description, 100);
            if (item.description.length > 100) {
                desc.title = item.description; // Full text on hover
            }
            content.appendChild(desc);
        }

        // Details
        if (this.showDetails) {
            const details = this.createItemDetails(item);
            if (details.children.length > 0) {
                content.appendChild(details);
            }
        }

        return content;
    }

    truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    }

    createItemDetails(item) {
        const details = document.createElement('div');
        details.className = 'carousel-item-details';

        const detailItems = [
            { key: 'price', value: item.price, className: 'carousel-item-price', formatter: this.formatPrice },
            { key: 'duration', value: item.duration, className: 'carousel-item-duration' },
            { key: 'experience', value: item.experience ? `${item.experience} années d'expérience` : null, className: 'carousel-item-experience' }
        ];

        detailItems.forEach(({ value, className, formatter }) => {
            if (value) {
                const span = document.createElement('span');
                span.className = className;
                span.textContent = formatter ? formatter(value) : value;
                details.appendChild(span);
            }
        });

        return details;
    }

    formatPrice(price) {
        if (typeof price === 'number') {
            return new Intl.NumberFormat('fr-CA', {
                style: 'currency',
                currency: 'CAD'
            }).format(price);
        }
        return price;
    }

    selectItem(index) {
        if (index < 0 || index >= this.items.length) return;
        
        try {
            this.eventBus?.emit('carouselField:itemSelecting', {
                fieldId: this.id,
                index,
                item: this.items[index]
            });
            
            if (this.allowMultiple) {
                this.toggleMultipleSelection(index);
            } else {
                this.setSingleSelection(index);
            }

            this.updateSelection();
            this.handleChange();
            
            this.eventBus?.emit('carouselField:itemSelected', {
                fieldId: this.id,
                index,
                item: this.items[index],
                selectedItems: this.state.selectedItems
            });
            
        } catch (error) {
            console.error(`Error selecting item [${this.id}]:`, error);
            this.eventBus?.emit('carouselField:selectionError', {
                fieldId: this.id,
                error: error.message
            });
        }
    }

    toggleMultipleSelection(index) {
        const selectedItems = [...this.state.selectedItems];
        const existingIndex = selectedItems.indexOf(index);
        
        if (existingIndex > -1) {
            selectedItems.splice(existingIndex, 1);
        } else {
            selectedItems.push(index);
        }
        
        this.setState({ selectedItems });
    }

    setSingleSelection(index) {
        this.setState({
            selectedItem: index,
            selectedItems: [index]
        });
    }

    updateSelection() {
        if (!this.track) return;
        
        // Use cached query with fallback
        let items = this.domCache.get('carousel-items');
        if (!items || items.length !== this.items.length) {
            items = this.track.querySelectorAll('.carousel-item');
            this.domCache.set('carousel-items', items);
        }

        items.forEach((item, index) => {
            const isSelected = this.state.selectedItems.includes(index);
            item.classList.toggle('selected', isSelected);
            item.setAttribute('aria-selected', isSelected.toString());
        });
    }

    nextSlide() {
        if (this.isAnimating) return;
        
        const { currentIndex, itemsPerView } = this.state;
        const maxSlides = Math.max(0, this.items.length - itemsPerView);
        
        if (currentIndex < maxSlides) {
            this.isAnimating = true;
            this.setState({ currentIndex: currentIndex + 1 });
            this.updateTrackPosition();
            this.updateNavigationState();
            
            this.eventBus?.emit('carouselField:slideNext', {
                fieldId: this.id,
                currentIndex: currentIndex + 1
            });
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 300);
        }
    }

    previousSlide() {
        if (this.isAnimating) return;
        
        const { currentIndex } = this.state;
        
        if (currentIndex > 0) {
            this.isAnimating = true;
            this.setState({ currentIndex: currentIndex - 1 });
            this.updateTrackPosition();
            this.updateNavigationState();
            
            this.eventBus?.emit('carouselField:slidePrev', {
                fieldId: this.id,
                currentIndex: currentIndex - 1
            });
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 300);
        }
    }

    updateTrackPosition() {
        if (!this.track || this.items.length === 0) return;
        
        const { shouldCenter, currentIndex } = this.state;
        
        if (shouldCenter) {
            // Center the cards
            this.track.classList.add('centered');
            this.track.style.transform = 'none';
            console.log(`🎯 CENTERING [${this.id}]: ${this.items.length} cards (capacity: ${this.state.itemsPerView})`);
        } else {
            // Normal sliding behavior
            this.track.classList.remove('centered');
            const cardWidth = this.getCardWidth();
            const translateX = -(currentIndex * (cardWidth + this.gap));
            
            // Use transform3d for better performance
            this.track.style.transform = `translate3d(${translateX}px, 0, 0)`;
        }
    }

    updateNavigation() {
        this.updateNavigationState();
    }

    updateNavigationState() {
        if (!this.prevButton || !this.nextButton) return;
        
        const { currentIndex, itemsPerView, shouldCenter } = this.state;
        const maxSlides = Math.max(0, this.items.length - itemsPerView);
        const shouldShowNavigation = this.items.length > itemsPerView && !shouldCenter;
        
        // Update button states
        this.prevButton.disabled = currentIndex === 0;
        this.nextButton.disabled = currentIndex >= maxSlides;
        
        // Show/hide buttons
        this.prevButton.style.display = shouldShowNavigation ? 'flex' : 'none';
        this.nextButton.style.display = shouldShowNavigation ? 'flex' : 'none';
        
        // Update ARIA attributes
        this.prevButton.setAttribute('aria-disabled', this.prevButton.disabled.toString());
        this.nextButton.setAttribute('aria-disabled', this.nextButton.disabled.toString());
        
        if (shouldCenter) {
            console.log(`🎯 NAVIGATION [${this.id}]: Hidden (${this.items.length} cards centered)`);
        }
    }

    // Enhanced value management with validation
    getValue() {
        if (this.allowMultiple) {
            return this.state.selectedItems
                .map(index => this.items[index])
                .filter(Boolean);
        } else {
            return this.state.selectedItem !== null ? this.items[this.state.selectedItem] : null;
        }
    }

    setValue(value, options = {}) {
        try {
            if (this.allowMultiple && Array.isArray(value)) {
                const selectedItems = value
                    .map(item => this.items.findIndex(i => i.id === item.id))
                    .filter(index => index !== -1);
                
                this.setState({ selectedItems });
            } else if (value) {
                const selectedItem = this.items.findIndex(item => item.id === value.id);
                const selectedItems = selectedItem !== -1 ? [selectedItem] : [];
                
                this.setState({
                    selectedItem: selectedItem !== -1 ? selectedItem : null,
                    selectedItems
                });
            } else {
                this.setState({
                    selectedItem: null,
                    selectedItems: []
                });
            }
            
            this.updateSelection();
            
            if (!options.silent) {
                this.eventBus?.emit('carouselField:valueSet', {
                    fieldId: this.id,
                    value: this.getValue()
                });
            }
            
        } catch (error) {
            console.error(`Error setting value [${this.id}]:`, error);
            this.eventBus?.emit('carouselField:valueError', {
                fieldId: this.id,
                error: error.message
            });
        }
    }

    async validate() {
        try {
            // Use enhanced validation if available
            if (this.validator) {
                const rules = {};
                if (this.required) rules.required = true;
                if (this.customValidation) rules.custom = this.customValidation;
                
                const result = await this.validator.validate(this.getValue(), rules);
                
                this.setState({
                    isValid: result.isValid,
                    errors: result.errors
                });
                
                this.eventBus?.emit('carouselField:validated', {
                    fieldId: this.id,
                    result: result
                });
                
                return result.isValid;
            } else {
                // Fallback validation
                if (this.required && this.state.selectedItems.length === 0) {
                    this.showError(this.getFieldErrorMessage('required'));
                    return false;
                }
                
                if (this.customValidation) {
                    const result = this.customValidation(this.getValue());
                    if (result !== true) {
                        this.showError(result);
                        return false;
                    }
                }
                
                this.hideError();
                return true;
            }
        } catch (error) {
            console.error(`Validation error [${this.id}]:`, error);
            this.showError('Validation failed');
            return false;
        }
    }

    // Enhanced cleanup with comprehensive resource management
    cleanup() {
        console.log(`🧹 CLEANUP [${this.id}]: Starting comprehensive cleanup`);
        
        // Stop auto-update
        this.cleanupAutoUpdate();
        
        // Clear animation timeouts
        if (this.isAnimating) {
            this.isAnimating = false;
        }
        
        // Clear debounced methods
        this.debounceMap.forEach((debouncedFunc, key) => {
            if (debouncedFunc.timeout) {
                clearTimeout(debouncedFunc.timeout);
            }
        });
        this.debounceMap.clear();
        
        // Clear caches
        this.domCache.clear();
        this.renderCache.clear();
        
        // Remove global event listeners
        window.removeEventListener('resize', this.debouncedResize);
        
        // Cleanup touch events
        if (this.track && this.enableSwipe) {
            this.track.removeEventListener('touchstart', this.handleTouchStart);
            this.track.removeEventListener('touchend', this.handleTouchEnd);
        }
        
        // Clear field-specific state
        this.setState({
            selectedItem: null,
            selectedItems: [],
            currentIndex: 0,
            isInitialized: false,
            isLoading: false,
            error: null
        });
        
        this.eventBus?.emit('carouselField:cleanup', { fieldId: this.id });
        
        // Call parent cleanup
        super.cleanup();
        
        console.log(`✅ CLEANUP [${this.id}]: Completed successfully`);
    }

    // Hook for subclasses
    cleanupAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    // Enhanced cache invalidation
    invalidateCache() {
        this.domCache.clear();
        this.renderCache.clear();
        console.log(`🗑️ CACHE [${this.id}]: Invalidated all caches`);
    }

    // Utility methods for performance
    startAutoUpdate(interval = 5000) {
        this.cleanupAutoUpdate();
        this.updateInterval = setInterval(() => {
            if (typeof this.updateItems === 'function') {
                this.debouncedUpdate();
            }
        }, interval);
    }

    stopAutoUpdate() {
        this.cleanupAutoUpdate();
    }
}

/**
 * Enhanced Regular Carousel Field - Thin wrapper with additional features
 */
class CarouselField extends BaseCarouselField {
    constructor(factory, config) {
        super(factory, config);
        this.container?.classList.add('standard-carousel');
        
        this.eventBus?.emit('carouselField:standardCreated', {
            fieldId: this.id
        });
    }

    postRender() {
        super.postRender();
        
        // Add any standard carousel specific functionality
        if (this.config.autoplay) {
            this.startAutoplay();
        }
    }

    startAutoplay(interval = 3000) {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            if (!this.state.shouldCenter && this.items.length > this.state.itemsPerView) {
                this.nextSlide();
                
                // Reset to beginning if at end
                if (this.state.currentIndex >= this.items.length - this.state.itemsPerView) {
                    setTimeout(() => {
                        this.setState({ currentIndex: 0 });
                        this.updateTrackPosition();
                    }, 300);
                }
            }
        }, interval);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    cleanupAutoUpdate() {
        super.cleanupAutoUpdate();
        this.stopAutoplay();
    }
}

/**
 * Enhanced Dynamic Filtered Carousel Field - Event-Driven with improved architecture
 */
class FilteredCarouselField extends BaseCarouselField {
    constructor(factory, config) {
        super(factory, config);
        
        // Enhanced filtering configuration
        this.filterConfig = {
            dependsOn: null,
            dataSource: [],
            filterFunction: null,
            waitingMessage: 'Please make a selection first',
            emptyMessage: 'No items match the current selection',
            loadingMessage: 'Loading items...',
            enableCaching: true,
            debounceDelay: 200,
            ...config.filterConfig
        };

        this._lastDependencyValue = null;
        this._filterCache = new Map();
        this.container?.classList.add('filtered-carousel');
        
        // Enhanced state for filtering
        this.setState({
            ...this.state,
            isFiltering: false,
            hasFilterError: false,
            filterError: null,
            isDependencyReady: false
        });
        
        // Register for dependency updates with error handling
        this.registerForDependencyUpdates();
        
        this.eventBus?.emit('carouselField:filteredCreated', {
            fieldId: this.id,
            dependsOn: this.filterConfig.dependsOn
        });
    }

    registerForDependencyUpdates() {
        if (!this.filterConfig.dependsOn) {
            console.warn(`FilteredCarousel [${this.id}]: No dependsOn field specified`);
            return;
        }
        
        try {
            // Enhanced global registry with error handling
            if (!window._fieldDependencyRegistry) {
                window._fieldDependencyRegistry = new Map();
            }
            
            const dependsOn = this.filterConfig.dependsOn;
            if (!window._fieldDependencyRegistry.has(dependsOn)) {
                window._fieldDependencyRegistry.set(dependsOn, new Set());
            }
            
            window._fieldDependencyRegistry.get(dependsOn).add(this);
            
            console.log(`🔗 FILTERED CAROUSEL [${this.id}]: Registered for ${dependsOn} updates`);
            
            this.eventBus?.emit('carouselField:dependencyRegistered', {
                fieldId: this.id,
                dependsOn: dependsOn
            });
            
        } catch (error) {
            console.error(`Error registering dependencies [${this.id}]:`, error);
            this.setState({
                hasFilterError: true,
                filterError: 'Failed to register for dependency updates'
            });
        }
    }

    postRender() {
        super.postRender();
        
        // Enhanced initialization
        this.initializeWithRetry();
    }

    async initializeWithRetry(maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const updated = await this.updateFromDependency();
                if (updated || !this.filterConfig.dependsOn) {
                    this.setState({ isDependencyReady: true });
                    break;
                }
                
                if (attempt < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 100 * attempt));
                }
            } catch (error) {
                console.error(`Initialization attempt ${attempt} failed [${this.id}]:`, error);
                if (attempt === maxRetries) {
                    this.setState({
                        hasFilterError: true,
                        filterError: 'Failed to initialize after multiple attempts'
                    });
                }
            }
        }
    }

    getEmptyMessage() {
        if (this.state.hasFilterError) {
            return this.state.filterError;
        }
        
        if (this.state.isFiltering) {
            return this.filterConfig.loadingMessage;
        }
        
        if (!this.state.isDependencyReady && this.filterConfig.dependsOn) {
            return this.filterConfig.waitingMessage;
        }
        
        return this.filterConfig.emptyMessage || this.config.emptyMessage || 'No items available';
    }

    getEmptySubMessage() {
        if (this.state.hasFilterError) {
            return 'Please check the field configuration or contact support.';
        }
        
        return '';
    }

    // Enhanced update method with comprehensive error handling
    async updateFromDependency(dependencyValue = null) {
        if (!this.filterConfig.dependsOn || !this.filterConfig.filterFunction) {
            console.warn(`🔄 FILTERED CAROUSEL [${this.id}]: Missing filterConfig.dependsOn or filterFunction`);
            return false;
        }
        
        try {
            this.setState({ isFiltering: true, hasFilterError: false });
            
            // Get current dependency value if not provided
            if (dependencyValue === null) {
                dependencyValue = this.getCurrentDependencyValue();
            }
            
            console.log(`🔄 FILTERED CAROUSEL [${this.id}]: Updating for dependency:`, dependencyValue);
            
            // Check cache first
            const cacheKey = this.createCacheKey(dependencyValue);
            if (this.filterConfig.enableCaching && this._filterCache.has(cacheKey)) {
                const cachedItems = this._filterCache.get(cacheKey);
                console.log(`📋 FILTERED CAROUSEL [${this.id}]: Using cached result (${cachedItems.length} items)`);
                
                this.setState({ isFiltering: false });
                return this.updateItems(cachedItems);
            }
            
            // Skip if same value as before (but not cached)
            if (dependencyValue && this._lastDependencyValue && 
                JSON.stringify(dependencyValue) === JSON.stringify(this._lastDependencyValue)) {
                console.log(`🔄 FILTERED CAROUSEL [${this.id}]: Same dependency value, skipping update`);
                this.setState({ isFiltering: false });
                return false;
            }
            
            this._lastDependencyValue = dependencyValue;
            
            let filteredItems = [];
            
            if (dependencyValue) {
                // Apply filter function with error handling
                try {
                    filteredItems = await Promise.resolve(
                        this.filterConfig.filterFunction(this.filterConfig.dataSource, dependencyValue)
                    );
                    
                    if (!Array.isArray(filteredItems)) {
                        throw new Error('Filter function must return an array');
                    }
                    
                    // Cache the result
                    if (this.filterConfig.enableCaching) {
                        this._filterCache.set(cacheKey, filteredItems);
                    }
                    
                    console.log(`🔄 FILTERED CAROUSEL [${this.id}]: Filtered to ${filteredItems.length} items`);
                    
                } catch (filterError) {
                    console.error(`Filter function error [${this.id}]:`, filterError);
                    this.setState({
                        hasFilterError: true,
                        filterError: 'Error filtering items: ' + filterError.message
                    });
                    filteredItems = [];
                }
            } else {
                console.log(`🔄 FILTERED CAROUSEL [${this.id}]: Clearing items - no dependency value`);
            }
            
            this.setState({ isFiltering: false });
            
            this.eventBus?.emit('carouselField:filtered', {
                fieldId: this.id,
                dependencyValue,
                resultCount: filteredItems.length
            });
            
            return this.updateItems(filteredItems);
            
        } catch (error) {
            console.error(`Error updating from dependency [${this.id}]:`, error);
            this.setState({
                isFiltering: false,
                hasFilterError: true,
                filterError: 'Failed to update: ' + error.message
            });
            return false;
        }
    }

    createCacheKey(dependencyValue) {
        return JSON.stringify(dependencyValue);
    }

    getCurrentDependencyValue() {
        try {
            // Enhanced dependency value retrieval with multiple fallbacks
            const sources = [
                () => this.factory?.getFormData?.(),
                () => this.factory?.currentMultiStepForm?.getFormData?.(),
                () => this.factory?.formValues,
                () => this.serviceContainer?.get('stateManager')?.getFieldValue(this.filterConfig.dependsOn),
                () => ({}) // Empty fallback
            ];
            
            for (const source of sources) {
                try {
                    const formData = source();
                    if (formData && typeof formData === 'object') {
                        const value = formData[this.filterConfig.dependsOn];
                        if (value !== undefined) {
                            return value;
                        }
                    }
                } catch (error) {
                    continue; // Try next source
                }
            }
            
            return null;
        } catch (error) {
            console.error(`Error getting dependency value [${this.id}]:`, error);
            return null;
        }
    }

    async updateItems(newItems) {
        try {
            const hasChanged = newItems.length !== this.items.length || 
                              JSON.stringify(newItems) !== JSON.stringify(this.items);
            
            if (!hasChanged) {
                console.log(`🔄 FILTERED CAROUSEL [${this.id}]: No changes detected`);
                return false;
            }

            // Enhanced selection preservation
            const needsSelectionReset = this.shouldResetSelection(newItems);
            
            this.items = newItems;
            this.invalidateCache();
            
            if (needsSelectionReset) {
                this.resetSelection();
            }
            
            // Reset navigation state
            this.setState({ currentIndex: 0 });
            
            if (this.galleryContainer) {
                await this.renderItems();
                this.updateNavigation();
            }
            
            this.eventBus?.emit('carouselField:itemsUpdated', {
                fieldId: this.id,
                itemCount: newItems.length,
                selectionReset: needsSelectionReset
            });
            
            return true;
            
        } catch (error) {
            console.error(`Error updating items [${this.id}]:`, error);
            this.setState({
                hasFilterError: true,
                filterError: 'Failed to update items: ' + error.message
            });
            return false;
        }
    }

    shouldResetSelection(newItems) {
        const { selectedItem } = this.state;
        
        if (selectedItem === null || !this.items[selectedItem]) {
            return false;
        }
        
        const currentSelection = this.items[selectedItem];
        return !newItems.some(item => item.id === currentSelection.id);
    }

    resetSelection() {
        this.setState({
            selectedItem: null,
            selectedItems: []
        });
        
        this.handleChange();
        
        this.eventBus?.emit('carouselField:selectionReset', {
            fieldId: this.id
        });
    }

    // Enhanced cleanup for filtered carousel
    cleanup() {
        // Clear filter cache
        this._filterCache.clear();
        
        // Unregister from dependency updates
        if (window._fieldDependencyRegistry && this.filterConfig.dependsOn) {
            const dependsOn = this.filterConfig.dependsOn;
            const registry = window._fieldDependencyRegistry.get(dependsOn);
            if (registry) {
                registry.delete(this);
                if (registry.size === 0) {
                    window._fieldDependencyRegistry.delete(dependsOn);
                }
            }
            
            console.log(`🔗 FILTERED CAROUSEL [${this.id}]: Unregistered from ${dependsOn} updates`);
        }
        
        this.eventBus?.emit('carouselField:filteredCleanup', {
            fieldId: this.id
        });
        
        super.cleanup();
    }
}

/**
 * Enhanced Global Dependency Notification System
 */
window.notifyFieldDependents = function(fieldName, newValue) {
    if (!window._fieldDependencyRegistry) {
        console.warn('Field dependency registry not initialized');
        return;
    }
    
    const dependentFields = window._fieldDependencyRegistry.get(fieldName);
    if (!dependentFields || dependentFields.size === 0) {
        console.log(`🔗 DEPENDENCY: No dependents found for field ${fieldName}`);
        return;
    }
    
    console.log(`🔗 DEPENDENCY UPDATE: Notifying ${dependentFields.size} fields that ${fieldName} changed to:`, newValue);
    
    // Enhanced notification with error handling and performance optimization
    const notifications = Array.from(dependentFields).map(async (field) => {
        if (!field || !field.updateFromDependency) {
            console.warn(`Invalid dependent field found for ${fieldName}`);
            return;
        }
        
        try {
            await field.updateFromDependency(newValue);
            console.log(`✅ Updated dependent field: ${field.id || 'unknown'}`);
        } catch (error) {
            console.error(`❌ Error updating dependent field ${field.id || 'unknown'}:`, error);
        }
    });
    
    // Execute all notifications concurrently
    Promise.allSettled(notifications).then(results => {
        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;
        
        console.log(`🔗 DEPENDENCY COMPLETE: ${successful} successful, ${failed} failed updates for ${fieldName}`);
    });
};

/**
 * Enhanced Specialized Form Fields with Modern Architecture
 * Integrates with dependency injection, event-driven architecture, and advanced state management
 */

// ============================================================================
// ENHANCED OPTIONS STEPPER FIELD
// ============================================================================

class OptionsStepperField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        this.options = config.options || [];
        this.currentIndex = config.defaultIndex || 0;
        this.displayFormatter = config.displayFormatter || null;
        this.fieldStyle = config.fieldStyle || 'default';
        
        // Enhanced state management
        this.setState({
            value: this.getCurrentValue(),
            currentIndex: this.currentIndex,
            isValid: true
        });
        
        // Validation bounds
        this.minIndex = config.minIndex || 0;
        this.maxIndex = config.maxIndex || this.options.length - 1;
        
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        // Listen to state changes
        this.eventBus?.on('field:stateChange', (data) => {
            if (data.fieldId === this.id && 'currentIndex' in data.newState) {
                this.updateDisplay();
            }
        });
    }

    getCurrentValue() {
        const option = this.options[this.currentIndex];
        return typeof option === 'object' ? option.value : option;
    }

    async validate() {
        const value = this.getValue();
        
        if (this.validator) {
            const rules = {};
            if (this.required) rules.required = true;
            
            const result = await this.validator.validate(value, rules);
            
            this.setState({
                isValid: result.isValid,
                errors: result.errors
            });
            
            return result.isValid;
        }
        
        // Fallback validation
        if (this.required && (value === undefined || value === null || value === '')) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        this.hideError();
        return true;
    }

    render() {
        const container = this.createContainer();
        container.className += ' options-stepper-field';
        
        if (this.fieldStyle === 'stepper') {
            container.classList.add('stepper-field');
        }

        if (this.label) {
            container.appendChild(this.createLabel());
        }

        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group stepper-input-group';

        // Decrement button
        this.decrementBtn = document.createElement('button');
        this.decrementBtn.type = 'button';
        this.decrementBtn.className = 'stepper-btn decrement-btn';
        this.decrementBtn.innerHTML = SVGIcons.get('MINUS');
        this.decrementBtn.setAttribute('aria-label', 'Decrease value');

        // Display input
        this.element = document.createElement('input');
        this.element.type = 'text';
        this.element.id = this.id;
        this.element.className = 'stepper-display-input';
        this.element.readOnly = true;
        this.element.value = this.getDisplayText();

        // Increment button
        this.incrementBtn = document.createElement('button');
        this.incrementBtn.type = 'button';
        this.incrementBtn.className = 'stepper-btn increment-btn';
        this.incrementBtn.innerHTML = SVGIcons.get('PLUS');
        this.incrementBtn.setAttribute('aria-label', 'Increase value');

        // Event handlers
        const decrementHandler = (e) => {
            e.preventDefault();
            this.decrement();
        };
        
        const incrementHandler = (e) => {
            e.preventDefault();
            this.increment();
        };

        this.decrementBtn.addEventListener('click', decrementHandler);
        this.incrementBtn.addEventListener('click', incrementHandler);
        
        this.eventListeners.push(
            { element: this.decrementBtn, event: 'click', handler: decrementHandler },
            { element: this.incrementBtn, event: 'click', handler: incrementHandler }
        );

        inputGroup.appendChild(this.decrementBtn);
        inputGroup.appendChild(this.element);
        inputGroup.appendChild(this.incrementBtn);
        container.appendChild(inputGroup);
        container.appendChild(this.createErrorElement());

        this.container = container;
        this.updateDisplay();

        return container;
    }

    decrement() {
        if (this.state.currentIndex > this.minIndex) {
            const newIndex = this.state.currentIndex - 1;
            this.setState({ 
                currentIndex: newIndex,
                value: this.getValueAtIndex(newIndex)
            });
            this.handleChange();
        }
    }

    increment() {
        if (this.state.currentIndex < Math.min(this.maxIndex, this.options.length - 1)) {
            const newIndex = this.state.currentIndex + 1;
            this.setState({ 
                currentIndex: newIndex,
                value: this.getValueAtIndex(newIndex)
            });
            this.handleChange();
        }
    }

    getValueAtIndex(index) {
        const option = this.options[index];
        return typeof option === 'object' ? option.value : option;
    }

    updateDisplay() {
        if (this.element) {
            this.element.value = this.getDisplayText();
        }
        
        if (this.decrementBtn) {
            this.decrementBtn.disabled = this.state.currentIndex <= this.minIndex;
        }
        
        if (this.incrementBtn) {
            this.incrementBtn.disabled = this.state.currentIndex >= Math.min(this.maxIndex, this.options.length - 1);
        }
    }

    getDisplayText() {
        const option = this.options[this.state.currentIndex];
        if (this.displayFormatter) {
            return this.displayFormatter(option);
        }
        return typeof option === 'object' ? (option.display || option.label || option.value) : option;
    }

    getValue() {
        return this.state.value;
    }

    setValue(value, options = {}) {
        const index = this.options.findIndex(opt =>
            (typeof opt === 'object' ? opt.value : opt) === value
        );
        
        if (index !== -1) {
            this.setState({ 
                currentIndex: index,
                value: value
            });
            this.updateDisplay();
        }
        
        if (!options.silent) {
            this.eventBus?.emit('field:valueChange', {
                fieldId: this.id,
                value: value,
                field: this
            });
        }
    }

    cleanup() {
        super.cleanup();
        // Additional cleanup if needed
    }
}

// ============================================================================
// ENHANCED CUSTOM FIELD WITH SUMMARY FUNCTIONALITY
// ============================================================================

class CustomField extends BaseField {
    constructor(factory, config) {
        super(factory, {
            ...config,
            required: false, // Custom fields are never required
            label: config.label || '',
        });

        this.renderFunction = config.render || null;
        this.updateFunction = config.update || null;
        this.autoSummary = config.autoSummary || false;
        
        // Enhanced processors with service injection
        this.processor = factory.getDataProcessor() || new FormDataProcessor(factory.creatFormInstance);
        this.formatter = factory.getFormatter() || new FieldValueFormatter(factory.creatFormInstance);
        
        // State setup
        this.setState({
            value: null,
            isValid: true,
            summaryData: {},
            lastUpdate: null
        });

        this.setupEventHandlers();
    }

    setupEventHandlers() {
        // Listen for form data changes to update summary
        this.eventBus?.on('field:valueChange', (data) => {
            if (this.autoSummary && data.fieldId !== this.id) {
                this.debouncedUpdateSummary();
            }
        });

        // Listen for step changes in multi-step forms
        this.eventBus?.on('step:changed', () => {
            if (this.autoSummary) {
                this.debouncedUpdateSummary();
            }
        });
    }

    debouncedUpdateSummary = this.debounce(() => {
        this.updateContent();
    }, 250);

    debounce(func, wait) {
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

    // ============================================================================
    // ENHANCED INDIFFERENT VALUE DETECTION
    // ============================================================================

    isIndifferentValue(value, fieldConfig = {}) {
        if (value === null || value === undefined || value === '') {
            return true;
        }

        // Handle options-slider fields with value 0 (indifferent)
        if (fieldConfig?.type === 'options-slider') {
            if (typeof value === 'object' && value !== null) {
                if (value.value !== undefined) {
                    return value.value === 0;
                }
                if (value.display && typeof value.display === 'string') {
                    const display = value.display.toLowerCase();
                    return display.includes('indifférent') || display.includes('indifferent') || display.includes('any');
                }
            }
            return value === 0;
        }

        // Handle string values that explicitly indicate indifference
        if (typeof value === 'string') {
            const lowerValue = value.toLowerCase().trim();
            return lowerValue === '' ||
                lowerValue === 'null' ||
                lowerValue.includes('indifférent') ||
                lowerValue.includes('indifferent') ||
                lowerValue.includes('any') ||
                lowerValue === '0';
        }

        // Handle numeric values (0 typically means indifferent)
        if (typeof value === 'number') {
            return value === 0;
        }

        return false;
    }

    isYesNoFieldAnswered(value, fieldConfig = {}) {
        if (fieldConfig?.type === 'yesno' || fieldConfig?.type === 'yesno-with-options') {
            if (value === null || value === undefined || value === '') {
                return false;
            }

            if (fieldConfig.type === 'yesno-with-options' && typeof value === 'object') {
                return value.main !== null && value.main !== undefined && value.main !== '';
            }

            if (typeof value === 'boolean') {
                return true;
            }
            
            if (typeof value === 'string') {
                const lowerValue = value.toLowerCase().trim();
                return lowerValue === 'yes' || lowerValue === 'no' ||
                    lowerValue === 'oui' || lowerValue === 'non' ||
                    lowerValue === 'true' || lowerValue === 'false';
            }
        }
        return true;
    }

    shouldDisplayFieldInSummary(fieldConfig, fieldValue) {
        if (!this.formatter.shouldDisplayValue(fieldValue)) {
            return false;
        }

        if (this.isIndifferentValue(fieldValue, fieldConfig)) {
            return false;
        }

        if (!this.isYesNoFieldAnswered(fieldValue, fieldConfig)) {
            return false;
        }

        if (fieldConfig?.type === 'yesno-with-options' && typeof fieldValue === 'object' && fieldValue !== null) {
            if (fieldValue.main !== null && fieldValue.main !== undefined && fieldValue.main !== '') {
                return true;
            }
            return false;
        }

        if (Array.isArray(fieldValue)) {
            return fieldValue.some(item => !this.isIndifferentValue(item, fieldConfig));
        }

        return true;
    }

    // ============================================================================
    // ENHANCED STRING CONVERSION
    // ============================================================================

    safeConvertToString(value) {
        if (value === null || value === undefined) {
            return '';
        }

        if (Array.isArray(value)) {
            return value.map(item => this.safeConvertToString(item)).join(', ');
        }

        if (typeof value === 'object' && value !== null) {
            if (typeof value.toString === 'function' && value.toString !== Object.prototype.toString) {
                try {
                    const result = value.toString();
                    if (result && result !== '[object Object]') {
                        return result;
                    }
                } catch (error) {
                    console.warn('Error calling toString:', error);
                }
            }

            // Handle objects with _separateFields flag
            if (value._separateFields && value._fieldLabels) {
                const parts = [];
                Object.keys(value._fieldLabels).forEach(key => {
                    if (value[key] && typeof value[key] === 'string' && value[key].trim() !== '') {
                        parts.push(`${value._fieldLabels[key]}: ${value[key]}`);
                    } else if (value[key] && typeof value[key] !== 'string') {
                        parts.push(`${value._fieldLabels[key]}: ${String(value[key])}`);
                    }
                });
                return parts.join(' | ');
            }

            try {
                if (value.displayText) return String(value.displayText);
                if (value.display) return String(value.display);
                if (value.label) return String(value.label);
                if (value.name) return String(value.name);
                if (value.value !== undefined) return String(value.value);
                
                const jsonStr = JSON.stringify(value);
                if (jsonStr && jsonStr !== '{}' && jsonStr !== 'null') {
                    return jsonStr;
                }
                return String(value);
            } catch (error) {
                console.warn('Error converting object to string:', error);
                return String(value);
            }
        }

        return String(value);
    }

    // ============================================================================
    // ENHANCED VALIDATION AND CONTAINER CREATION
    // ============================================================================

    async validate() {
        // Custom fields typically don't need validation
        this.hideError();
        return true;
    }

    createContainer() {
        const container = super.createContainer();
        container.classList.add('custom-field');
        return container;
    }

    // ============================================================================
    // ENHANCED RENDER METHOD
    // ============================================================================

    render() {
        const container = this.createContainer();

        if (this.label && this.label.trim()) {
            const labelElement = this.createLabel();
            container.appendChild(labelElement);
        }

        let contentElement;
        if (this.autoSummary) {
            contentElement = this.createAutoSummary();
        } else if (this.renderFunction) {
            contentElement = this.createCustomContent();
        } else {
            contentElement = this.createEmptyContent();
        }

        container.appendChild(contentElement);
        container.appendChild(this.createErrorElement());

        this.container = container;
        this.element = contentElement;

        return container;
    }

    // ============================================================================
    // ENHANCED CONTENT CREATION METHODS
    // ============================================================================

    createCustomContent() {
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-content';
        
        try {
            const customContent = this.renderFunction(this.factory, this.getFormData());
            if (customContent instanceof HTMLElement) {
                wrapper.appendChild(customContent);
            } else if (typeof customContent === 'string') {
                wrapper.innerHTML = customContent;
            }
        } catch (error) {
            console.error('Error rendering custom field:', error);
            wrapper.innerHTML = '<div class="custom-field-error">Error rendering custom content</div>';
            
            this.eventBus?.emit('field:renderError', {
                fieldId: this.id,
                error: error,
                field: this
            });
        }
        
        return wrapper;
    }

    createEmptyContent() {
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-content empty';
        wrapper.innerHTML = '<div class="custom-field-placeholder">Custom field content not configured</div>';
        return wrapper;
    }

    createAutoSummary() {
        const multiStepForm = this.factory.currentMultiStepForm;
        if (!multiStepForm) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'custom-content error';
            errorDiv.textContent = 'No multi-step form found for summary';
            return errorDiv;
        }

        const summaryContainer = document.createElement('div');
        summaryContainer.className = 'summary-container auto-summary';

        const currentStepIndex = multiStepForm.currentStep;
        multiStepForm.steps.forEach((step, stepIndex) => {
            if (stepIndex === currentStepIndex) return;

            const stepData = this.getStepData(multiStepForm, stepIndex);
            if (this.hasVisibleData(stepData, step)) {
                const stepSection = this.createStepSummarySection(step, stepData, stepIndex);
                summaryContainer.appendChild(stepSection);
            }
        });

        return summaryContainer;
    }

    createStepSummarySection(step, stepData, stepIndex) {
        const section = document.createElement('div');
        section.className = 'summary-section';
        
        section.innerHTML = `
            <div class="summary-heading">
                <span>${step.title}</span>
                <button type="button" class="edit-btn" data-step="${stepIndex}">
                    ${this.factory.getText('edit') || 'Modifier'}
                </button>
            </div>
            <div class="summary-content" id="step-${stepIndex}-summary"></div>
        `;

        const editBtn = section.querySelector('.edit-btn');
        const editHandler = () => {
            if (this.factory.currentMultiStepForm) {
                this.factory.currentMultiStepForm.goToStep(stepIndex);
            }
        };
        
        editBtn.addEventListener('click', editHandler);
        this.eventListeners.push({ element: editBtn, event: 'click', handler: editHandler });

        const contentDiv = section.querySelector('.summary-content');
        this.populateStepContent(contentDiv, step, stepData);

        return section;
    }

    populateStepContent(contentDiv, step, stepData) {
        let contentHtml = '';
        let hasVisibleContent = false;

        step.fields.forEach(fieldConfig => {
            const fieldName = fieldConfig.name || fieldConfig.id;
            const fieldValue = stepData[fieldName];

            if (this.shouldDisplayFieldInSummary(fieldConfig, fieldValue)) {
                hasVisibleContent = true;

                if (fieldConfig.type === 'yesno-with-options') {
                    contentHtml += this.renderYesNoWithOptionsField(fieldConfig, fieldValue, stepData);
                } else {
                    const processedField = this.processor.processFormData({
                        [fieldName]: fieldValue
                    })[fieldName];

                    if (processedField && processedField.displayValue !== undefined && processedField.displayValue !== null) {
                        let displayValue = this.safeConvertToString(processedField.displayValue);

                        if (displayValue && displayValue.trim() !== '' &&
                            !this.isIndifferentValue(displayValue, fieldConfig)) {
                            contentHtml += `
                                <div class="summary-row">
                                    <div class="summary-label">${processedField.label}:</div>
                                    <div class="summary-value">${displayValue}</div>
                                </div>
                            `;
                        }
                    }
                }
            }
        });

        if (hasVisibleContent && contentHtml.trim() !== '') {
            contentDiv.innerHTML = contentHtml;
        } else {
            contentDiv.innerHTML = '<div class="summary-empty">Aucune donnée saisie</div>';
        }
    }

    renderYesNoWithOptionsField(fieldConfig, fieldValue, stepData) {
        let html = '';
        if (!fieldValue || typeof fieldValue !== 'object' || fieldValue.main === undefined) {
            return '';
        }

        if (!this.isYesNoFieldAnswered(fieldValue, fieldConfig)) {
            return '';
        }

        const mainLabel = this.getFieldLabel(fieldConfig);
        const mainDisplayValue = this.formatter.formatYesNoValue(fieldValue.main, fieldConfig);

        if (mainDisplayValue && String(mainDisplayValue).trim() !== '' &&
            !this.isIndifferentValue(mainDisplayValue, fieldConfig)) {
            html += `
                <div class="summary-row">
                    <div class="summary-label">${mainLabel}:</div>
                    <div class="summary-value">${this.safeConvertToString(mainDisplayValue)}</div>
                </div>
            `;

            const showYesFields = this.formatter.isYesValue(fieldValue.main, fieldConfig);
            const showNoFields = this.formatter.isNoValue(fieldValue.main, fieldConfig);

            if (showYesFields && fieldValue.yesValues) {
                const subFieldConfigs = fieldConfig.yesFields || (fieldConfig.yesField ? [fieldConfig.yesField] : []);
                html += this.renderSubFields(subFieldConfigs, fieldValue.yesValues, stepData);
            } else if (showNoFields && fieldValue.noValues) {
                const subFieldConfigs = fieldConfig.noFields || (fieldConfig.noField ? [fieldConfig.noField] : []);
                html += this.renderSubFields(subFieldConfigs, fieldValue.noValues, stepData);
            }
        }

        return html;
    }

    renderSubFields(subFieldConfigs, subFieldValues, stepData) {
        let html = '';
        if (!Array.isArray(subFieldConfigs) || !subFieldValues) {
            return html;
        }

        subFieldConfigs.forEach(subFieldConfig => {
            const fieldName = subFieldConfig.name || subFieldConfig.id;
            const subFieldValue = subFieldValues[fieldName];

            if (this.shouldDisplayFieldInSummary(subFieldConfig, subFieldValue)) {
                const subFieldLabel = this.getSubFieldLabel(subFieldConfig);
                const rawDisplayValue = this.formatter.formatValueDirectly(subFieldConfig, subFieldValue);
                let displayValue = this.safeConvertToString(rawDisplayValue);

                if (displayValue && displayValue.trim() !== '' &&
                    !this.isIndifferentValue(displayValue, subFieldConfig)) {
                    html += `
                        <div class="summary-row sub-field">
                            <div class="summary-label">${subFieldLabel}:</div>
                            <div class="summary-value">${displayValue}</div>
                        </div>
                    `;
                }
            }
        });

        return html;
    }

    getSubFieldLabel(subFieldConfig) {
        if (subFieldConfig.label) {
            return subFieldConfig.label;
        }

        const fieldId = subFieldConfig.id || subFieldConfig.name;
        if (fieldId && this.factory.creatFormInstance) {
            const translatedLabel = this.factory.creatFormInstance.getText(`fields.${fieldId}`);
            if (translatedLabel && translatedLabel !== `fields.${fieldId}`) {
                return translatedLabel;
            }
        }

        return fieldId || 'Unknown Field';
    }

    getFieldLabel(fieldConfig) {
        if (fieldConfig.label) {
            return fieldConfig.label;
        }

        const fieldId = fieldConfig.id || fieldConfig.name;
        if (fieldId && this.factory.creatFormInstance) {
            const translatedLabel = this.factory.creatFormInstance.getText(`fields.${fieldId}`);
            if (translatedLabel && translatedLabel !== `fields.${fieldId}`) {
                return translatedLabel;
            }
        }

        return fieldId || 'Unknown Field';
    }

    // ============================================================================
    // ENHANCED VALUE HANDLING
    // ============================================================================

    getValue() {
        return this.state.value;
    }

    setValue(value, options = {}) {
        this.setState({ value: value });
        
        if (!options.silent) {
            this.eventBus?.emit('field:valueChange', {
                fieldId: this.id,
                value: value,
                field: this
            });
        }
    }

    // ============================================================================
    // ENHANCED UTILITY METHODS
    // ============================================================================

    updateContent() {
        if (!this.container) return;

        const existingContent = this.container.querySelector('.custom-content, .summary-container');
        if (existingContent) {
            let newContent;
            if (this.autoSummary) {
                newContent = this.createAutoSummary();
            } else if (this.renderFunction) {
                newContent = this.createCustomContent();
            } else {
                newContent = this.createEmptyContent();
            }

            existingContent.replaceWith(newContent);
            this.element = newContent;
            
            this.setState({ lastUpdate: Date.now() });
        }
    }

    getStepData(multiStepForm, stepIndex) {
        const stepInstance = multiStepForm.stepInstances[stepIndex];
        if (!stepInstance) return {};
        return stepInstance.getStepData();
    }

    hasVisibleData(stepData, step) {
        if (!step || !step.fields) {
            return Object.values(stepData).some(value =>
                this.formatter.shouldDisplayValue(value)
            );
        }

        return step.fields.some(fieldConfig => {
            const fieldName = fieldConfig.name || fieldConfig.id;
            const fieldValue = stepData[fieldName];
            return this.shouldDisplayFieldInSummary(fieldConfig, fieldValue);
        });
    }

    getFormData() {
        if (this.factory.currentMultiStepForm) {
            return this.factory.currentMultiStepForm.getFormData();
        }
        return {};
    }

    setStepData(data) {
        if (this.autoSummary) {
            this.updateContent();
        }
    }

    cleanup() {
        if (this.debouncedUpdateSummary) {
            clearTimeout(this.debouncedUpdateSummary);
        }
        super.cleanup();
    }

    resetToInitial() {
        if (this.autoSummary || this.renderFunction) {
            this.updateContent();
        }
        super.resetToInitial();
    }
}

// ============================================================================
// ENHANCED SERVICE CARD FIELD
// ============================================================================

class ServiceCardField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        this.services = config.services || [];
        this.layout = config.layout || 'grid';
        this.columns = config.columns || 'auto';
        this.showDuration = config.showDuration !== false;
        this.showDescription = config.showDescription !== false;
        this.allowDeselect = config.allowDeselect || false;
        this.selectionMode = config.selectionMode || 'single';
        
        // Enhanced state management
        this.setState({
            selectedServices: [],
            selectedService: null,
            isValid: true
        });

        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.eventBus?.on('field:stateChange', (data) => {
            if (data.fieldId === this.id && ('selectedService' in data.newState || 'selectedServices' in data.newState)) {
                this.updateCardStates();
            }
        });
    }

    async validate() {
        const hasSelection = this.selectionMode === 'single' ?
            this.state.selectedService !== null :
            this.state.selectedServices.length > 0;

        const isValid = !this.required || hasSelection;

        if (!isValid) {
            this.showError(this.getFieldErrorMessage('serviceRequired'));
        } else {
            this.hideError();
        }

        this.setState({ isValid });
        return isValid;
    }

    render() {
        const container = this.createContainer();
        container.className += ' service-card-field';
        container.classList.add(`layout-${this.layout}`);

        if (this.label) {
            container.appendChild(this.createLabel());
        }

        const cardsContainer = document.createElement('div');
        cardsContainer.className = `service-cards-container columns-${this.columns}`;
        cardsContainer.id = this.id;

        // Render each service card
        this.services.forEach((service, index) => {
            const card = this.renderServiceCard(service, index);
            cardsContainer.appendChild(card);
        });

        container.appendChild(cardsContainer);
        container.appendChild(this.createErrorElement());

        this.container = container;
        this.element = cardsContainer;

        return container;
    }

    renderServiceCard(service, index) {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.serviceId = service.id || index;
        card.dataset.serviceIndex = index;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-pressed', 'false');
        card.setAttribute('aria-describedby', `service-description-${index}`);

        const cardContent = `
            <div class="service-card-inner">
                ${this.renderCheckmark()}
                ${this.renderCardHeader(service)}
                ${this.renderCardBody(service, index)}
                ${this.renderCardFooter(service)}
            </div>
        `;

        card.innerHTML = cardContent;

        // Enhanced event handlers
        const clickHandler = () => this.handleCardClick(card, service);
        const keyHandler = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleCardClick(card, service);
            }
        };

        card.addEventListener('click', clickHandler);
        card.addEventListener('keydown', keyHandler);
        
        this.eventListeners.push(
            { element: card, event: 'click', handler: clickHandler },
            { element: card, event: 'keydown', handler: keyHandler }
        );

        return card;
    }

    renderCheckmark() {
        return `
            <div class="checkmark-icon" aria-hidden="true">
                ${SVGIcons.get('CHECK')}
            </div>
        `;
    }

    renderCardHeader(service) {
        const titleElement = service.title || service.name || service.eventName || 'Unnamed Service';
        const durationElement = this.showDuration && service.duration ?
            `<div class="service-duration">${service.duration}</div>` : '';

        return `
            <div class="service-card-header">
                <div class="service-title">${titleElement}</div>
                ${durationElement}
            </div>
        `;
    }

    renderCardBody(service, index) {
        const description = this.showDescription && service.description ?
            `<div class="service-description" id="service-description-${index}">${service.description}</div>` : '';

        const price = service.price ?
            `<div class="service-price">${service.price}</div>` : '';

        const features = service.features && Array.isArray(service.features) ?
            `<ul class="service-features">
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>` : '';

        return `
            <div class="service-card-body">
                ${description}
                ${features}
                ${price}
            </div>
        `;
    }

    renderCardFooter(service) {
        if (!service.badge && !service.popular && !service.recommended) {
            return '';
        }

        let badgeContent = '';
        if (service.popular) {
            badgeContent = '<div class="service-badge popular">Populaire</div>';
        } else if (service.recommended) {
            badgeContent = '<div class="service-badge recommended">Recommandé</div>';
        } else if (service.badge) {
            badgeContent = `<div class="service-badge custom">${service.badge}</div>`;
        }

        return badgeContent ? `<div class="service-card-footer">${badgeContent}</div>` : '';
    }

    handleCardClick(cardElement, service) {
        if (this.selectionMode === 'single') {
            this.handleSingleSelection(cardElement, service);
        } else {
            this.handleMultipleSelection(cardElement, service);
        }
        
        this.handleChange();
        this.hideError();
        
        this.eventBus?.emit('serviceCard:selectionChanged', {
            fieldId: this.id,
            service: service,
            selectionMode: this.selectionMode,
            field: this
        });
    }

    handleSingleSelection(cardElement, service) {
        if (this.allowDeselect && this.state.selectedService && this.state.selectedService.id === service.id) {
            this.setState({
                selectedService: null,
                selectedServices: []
            });
            return;
        }

        this.setState({
            selectedService: service,
            selectedServices: [service]
        });
    }

    handleMultipleSelection(cardElement, service) {
        const currentServices = [...this.state.selectedServices];
        const isSelected = currentServices.some(s => s.id === service.id);

        if (isSelected) {
            const updatedServices = currentServices.filter(s => s.id !== service.id);
            this.setState({
                selectedServices: updatedServices,
                selectedService: updatedServices.length > 0 ? updatedServices[0] : null
            });
        } else {
            const updatedServices = [...currentServices, service];
            this.setState({
                selectedServices: updatedServices,
                selectedService: service
            });
        }
    }

    updateCardStates() {
        if (!this.container) return;

        const allCards = this.container.querySelectorAll('.service-card');
        allCards.forEach(card => {
            const serviceId = card.dataset.serviceId;
            const isSelected = this.state.selectedServices.some(s => s.id == serviceId || s.id === serviceId);
            
            card.classList.toggle('selected', isSelected);
            card.setAttribute('aria-pressed', isSelected.toString());
        });
    }

    getValue() {
        return this.selectionMode === 'single' ?
            this.state.selectedService :
            this.state.selectedServices;
    }

    setValue(value, options = {}) {
        if (!value) {
            this.setState({
                selectedService: null,
                selectedServices: []
            });
            return;
        }

        if (this.selectionMode === 'single') {
            if (typeof value === 'object' && value.id) {
                this.setState({
                    selectedService: value,
                    selectedServices: [value]
                });
            }
        } else {
            if (Array.isArray(value)) {
                this.setState({
                    selectedServices: [...value],
                    selectedService: value.length > 0 ? value[0] : null
                });
            }
        }

        if (!options.silent) {
            this.eventBus?.emit('field:valueChange', {
                fieldId: this.id,
                value: value,
                field: this
            });
        }
    }

    cleanup() {
        super.cleanup();
        // Additional cleanup if needed
    }
}

// ============================================================================
// ENHANCED CATEGORY ITEM FILTER FIELD
// ============================================================================

class CategoryItemFilterField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        // Core configuration
        this.language = config.language || 'fr';
        this.mode = config.mode || 'both';
        
        // Enhanced data handling
        this.rawCategoryItems = this.resolveDataReference(config);
        this.availableCategories = [];
        this.filteredItems = [];
        this.allItems = [];
        
        // Enhanced state management
        this.setState({
            selectedCategory: config.selectedCategory || config.categoryName || '',
            selectedItemId: config.selectedItemId || '',
            selectedItem: null,
            isValid: true,
            isLoading: false
        });
        
        // UI Configuration
        this.categoryLabel = config.categoryLabel || this.getText('selectCategory');
        this.categoryPlaceholder = config.categoryPlaceholder || this.getText('selectCategoryPlaceholder');
        this.itemLabel = config.itemLabel || this.getText('selectItem');
        this.itemPlaceholder = config.itemPlaceholder || this.getText('selectItemPlaceholder');
        
        // Show/hide options
        this.showCategoryField = config.showCategoryField !== false && (this.mode === 'both' || this.mode === 'category-only');
        this.showItemField = config.showItemField !== false && (this.mode === 'both' || this.mode === 'item-only');
        
        // Auto-selection behavior
        this.autoSelectSingleCategory = config.autoSelectSingleCategory !== false;
        this.autoSelectSingleItem = config.autoSelectSingleItem !== false;
        
        // Callback functions
        this.onCategoryChange = config.onCategoryChange || null;
        this.onItemChange = config.onItemChange || null;
        this.onSelectionComplete = config.onSelectionComplete || null;
        
        // Field instances
        this.categorySelectField = null;
        this.itemSelectField = null;
        
        this.init();
        this.setupEventHandlers();
    }

    resolveDataReference(config) {
        if (typeof config.categoryItems === 'string') {
            return this.factory.getFormData?.(config.categoryItems) ||
                this.factory.formData?.[config.categoryItems] ||
                this.factory.data?.[config.categoryItems] || {};
        }
        return config.categoryItems || config.specialistsInfo || {};
    }

    setupEventHandlers() {
        this.eventBus?.on('field:stateChange', (data) => {
            if (data.fieldId === this.id) {
                if ('selectedCategory' in data.newState) {
                    this.updateItemOptions();
                }
            }
        });
    }

    init() {
        if (!this.rawCategoryItems || Object.keys(this.rawCategoryItems).length === 0) {
            this.rawCategoryItems = this.getDataFromForm();
        }
        
        this.availableCategories = this.extractAvailableCategories(this.rawCategoryItems);
        this.allItems = this.extractAllItems(this.rawCategoryItems);
        
        if (this.autoSelectSingleCategory && this.availableCategories.length === 1 && !this.state.selectedCategory) {
            this.setState({ selectedCategory: this.availableCategories[0].name });
        }
        
        if (this.state.selectedCategory) {
            this.filteredItems = this.filterItemsByCategory(this.state.selectedCategory);
            if (this.autoSelectSingleItem && this.filteredItems.length === 1 && !this.state.selectedItemId) {
                this.setState({ 
                    selectedItemId: this.filteredItems[0].id,
                    selectedItem: this.filteredItems[0]
                });
            }
        } else {
            this.filteredItems = this.allItems;
        }
        
        if (this.state.selectedItemId && !this.state.selectedItem) {
            const selectedItem = this.filteredItems.find(p => p.id === this.state.selectedItemId);
            this.setState({ selectedItem: selectedItem });
        }
    }

    getDataFromForm() {
        if (this.factory && this.factory.form && this.factory.form.data) {
            return this.factory.form.data.categoryItems || {};
        }
        if (window.ContactFormExtension && window.ContactFormExtension.FORM_DATA) {
            return window.ContactFormExtension.FORM_DATA.categoryItems || {};
        }
        return this.rawCategoryItems;
    }

    extractAvailableCategories(rawItems) {
        const categorySet = new Set();
        try {
            Object.entries(rawItems).forEach(([itemName, itemData]) => {
                if (itemData && itemData.categories) {
                    Object.keys(itemData.categories).forEach(category => {
                        categorySet.add(category);
                    });
                }
            });
        } catch (error) {
            console.error('Error extracting categories:', error);
            this.eventBus?.emit('categoryItemFilter:extractionError', {
                fieldId: this.id,
                error: error,
                data: rawItems
            });
        }
        
        const categories = Array.from(categorySet)
            .sort()
            .map(category => ({
                id: this.slugify(category),
                name: category,
                displayName: category
            }));
        
        return categories;
    }

    extractAllItems(rawItems) {
        const allItems = [];
        try {
            Object.entries(rawItems).forEach(([itemName, itemData]) => {
                if (itemData) {
                    allItems.push({
                        id: this.slugify(itemName),
                        name: itemName,
                        displayName: itemName,
                        description: itemData.description || itemData.specialty || "",
                        categories: itemData.categories || {},
                        rawData: itemData
                    });
                }
            });
        } catch (error) {
            console.error('Error extracting items:', error);
            this.eventBus?.emit('categoryItemFilter:extractionError', {
                fieldId: this.id,
                error: error,
                data: rawItems
            });
        }
        
        return allItems;
    }

    filterItemsByCategory(categoryName) {
        if (!categoryName || !this.rawCategoryItems) {
            return this.allItems;
        }
        
        const filteredItems = [];
        Object.entries(this.rawCategoryItems).forEach(([itemName, itemData]) => {
            if (itemData.categories && itemData.categories[categoryName]) {
                const categoryConfig = itemData.categories[categoryName];
                filteredItems.push({
                    id: this.slugify(itemName),
                    name: itemName,
                    displayName: itemName,
                    description: itemData.description || itemData.specialty || "",
                    categoryConfig: categoryConfig,
                    allCategories: itemData.categories,
                    rawData: itemData
                });
            }
        });
        
        return filteredItems;
    }

    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    selectCategory(categoryId) {
        const category = this.availableCategories.find(s => s.id === categoryId);
        if (!category) {
            console.error('Category not found:', categoryId);
            return;
        }

        this.setState({ selectedCategory: category.name });
        this.filteredItems = this.filterItemsByCategory(category.name);

        // Check if current item selection is still valid
        if (this.state.selectedItemId) {
            const stillValid = this.filteredItems.find(p => p.id === this.state.selectedItemId);
            if (!stillValid) {
                this.setState({
                    selectedItemId: '',
                    selectedItem: null
                });
            }
        }

        // Auto-select single item if enabled
        if (this.autoSelectSingleItem && this.filteredItems.length === 1) {
            this.setState({
                selectedItemId: this.filteredItems[0].id,
                selectedItem: this.filteredItems[0]
            });
            
            if (this.itemSelectField) {
                this.itemSelectField.setValue(this.filteredItems[0].id);
            }
        }

        this.showItemSelection();
        this.updateItemOptions();

        if (this.onCategoryChange) {
            this.onCategoryChange(category, this.filteredItems);
        }

        this.checkSelectionComplete();
        this.handleChange();
        
        this.eventBus?.emit('categoryItemFilter:categoryChanged', {
            fieldId: this.id,
            category: category,
            filteredItems: this.filteredItems,
            field: this
        });
    }

    selectItem(itemId) {
        const item = this.filteredItems.find(p => p.id === itemId) ||
            this.allItems.find(p => p.id === itemId);
        
        if (!item) {
            console.error('Item not found:', itemId);
            return;
        }

        this.setState({
            selectedItemId: itemId,
            selectedItem: item
        });

        if (this.onItemChange) {
            this.onItemChange(item);
        }

        this.checkSelectionComplete();
        this.handleChange();
        
        this.eventBus?.emit('categoryItemFilter:itemChanged', {
            fieldId: this.id,
            item: item,
            field: this
        });
    }

    checkSelectionComplete() {
        const isComplete = this.isSelectionComplete();
        if (isComplete && this.onSelectionComplete) {
            this.onSelectionComplete({
                category: this.state.selectedCategory,
                item: this.state.selectedItem,
                categoryConfig: this.state.selectedItem?.categoryConfig
            });
        }
        
        this.eventBus?.emit('categoryItemFilter:selectionComplete', {
            fieldId: this.id,
            isComplete: isComplete,
            selection: {
                category: this.state.selectedCategory,
                item: this.state.selectedItem,
                categoryConfig: this.state.selectedItem?.categoryConfig
            },
            field: this
        });
    }

    isSelectionComplete() {
        let complete = true;
        if (this.showCategoryField && this.required && !this.state.selectedCategory) {
            complete = false;
        }
        if (this.showItemField && this.required && !this.state.selectedItemId) {
            complete = false;
        }
        return complete;
    }

    createCategorySelectField() {
        if (!this.showCategoryField) return null;

        this.categorySelectField = new SingleSelectField(this.factory, {
            id: `${this.id}-category`,
            name: `${this.name}_category`,
            label: this.categoryLabel,
            placeholder: this.categoryPlaceholder,
            options: this.availableCategories,
            required: this.required,
            row: 'categorySelectField',
            onChange: (value) => this.selectCategory(value)
        });

        if (this.state.selectedCategory) {
            const categoryOption = this.availableCategories.find(s => s.name === this.state.selectedCategory);
            if (categoryOption) {
                this.categorySelectField.setValue(categoryOption.id);
            }
        }

        return this.categorySelectField;
    }

    createItemSelectField() {
        if (!this.showItemField) return null;

        this.itemSelectField = new SingleSelectField(this.factory, {
            id: `${this.id}-item`,
            name: `${this.name}_item`,
            label: this.itemLabel,
            placeholder: this.itemPlaceholder,
            options: this.filteredItems,
            required: this.required,
            row: 'itemSelectField',
            onChange: (value) => this.selectItem(value)
        });

        if (this.state.selectedItemId) {
            this.itemSelectField.setValue(this.state.selectedItemId);
        }

        return this.itemSelectField;
    }

    showItemSelection() {
        const itemContainer = this.element?.querySelector('.item-select-container');
        if (itemContainer) {
            itemContainer.style.display = 'block';
            itemContainer.style.opacity = '0';
            itemContainer.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                itemContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                itemContainer.style.opacity = '1';
                itemContainer.style.transform = 'translateY(0)';
            }, 10);
        }
    }

    updateItemOptions() {
        if (!this.itemSelectField) return;

        const itemContainer = this.element?.querySelector('.item-select-container');
        if (!itemContainer) return;

        const currentValue = this.state.selectedItemId;
        itemContainer.innerHTML = '';

        this.itemSelectField = new SingleSelectField(this.factory, {
            id: `${this.id}-item`,
            name: `${this.name}_item`,
            label: this.itemLabel,
            placeholder: this.itemPlaceholder,
            options: this.filteredItems,
            required: this.required,
            onChange: (value) => this.selectItem(value)
        });

        const newFieldElement = this.itemSelectField.render();
        itemContainer.appendChild(newFieldElement);

        if (currentValue && this.filteredItems.find(p => p.id === currentValue)) {
            this.itemSelectField.setValue(currentValue);
        }
    }

    getText(key) {
        const translations = {
            en: {
                selectCategory: "Select a category",
                selectCategoryPlaceholder: "-- Select a category --",
                selectItem: "Select an item",
                selectItemPlaceholder: "-- Select an item --",
                pleaseSelectCategory: "Please select a category",
                pleaseSelectItem: "Please select an item"
            },
            fr: {
                selectCategory: "Sélectionner une catégorie",
                selectCategoryPlaceholder: "-- Sélectionner une catégorie --",
                selectItem: "Sélectionner un élément",
                selectItemPlaceholder: "-- Sélectionner un élément --",
                pleaseSelectCategory: "Veuillez sélectionner une catégorie",
                pleaseSelectItem: "Veuillez sélectionner un élément"
            }
        };
        return translations[this.language]?.[key] || key;
    }

    async validate() {
        if (!this.required) return true;

        const errors = [];
        
        if (this.showCategoryField && !this.state.selectedCategory) {
            errors.push(this.getText('pleaseSelectCategory'));
        }
        
        if (this.showItemField && !this.state.selectedItemId) {
            errors.push(this.getText('pleaseSelectItem'));
        }

        const isValid = errors.length === 0;
        
        if (!isValid) {
            this.showError(errors[0]);
        } else {
            this.hideError();
        }

        this.setState({ isValid });
        return isValid;
    }

    render() {
        const container = this.createContainer();
        container.className += ' category-item-filter';

        // Add styles
        this.injectStyles();

        if (this.showCategoryField) {
            this.createCategorySelectField();
            const categoryFieldElement = this.categorySelectField.render();
            categoryFieldElement.classList.add('category-select-container');
            container.appendChild(categoryFieldElement);
        }

        if (this.showItemField) {
            this.createItemSelectField();
            const itemFieldElement = this.itemSelectField.render();
            itemFieldElement.classList.add('item-select-container');
            
            if (!this.state.selectedCategory) {
                itemFieldElement.style.display = 'none';
            }
            container.appendChild(itemFieldElement);
        }

        const filterContainer = document.createElement('div');
        filterContainer.className = 'category-item-filter-wrapper';
        
        while (container.firstChild) {
            filterContainer.appendChild(container.firstChild);
        }
        
        container.appendChild(filterContainer);
        container.appendChild(this.createErrorElement());

        this.container = container;
        this.element = container;

        return container;
    }

    injectStyles() {
        const styles = `
            <style>
                .category-item-filter {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .category-item-filter .category-select-container {
                    margin-bottom: 0;
                }
                .category-item-filter .item-select-container {
                    margin-top: 0;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }
            </style>
        `;
        
        if (!document.querySelector('#category-item-filter-styles')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'category-item-filter-styles';
            styleElement.innerHTML = styles;
            document.head.appendChild(styleElement.firstElementChild);
        }
    }

    // ============================================================================
    // ENHANCED getValue WITH BETTER OBJECT HANDLING
    // ============================================================================

    getValue() {
        const value = {
            category: this.state.selectedCategory || '',
            item: this.state.selectedItem?.displayName || '',
            _separateFields: true,
            _fieldLabels: {
                category: this.categoryLabel || 'Category',
                item: this.itemLabel || 'Item'
            },
            toString: function () {
                const parts = [];
                if (this.category && String(this.category).trim() !== '') {
                    parts.push(String(this.category));
                }
                if (this.item && String(this.item).trim() !== '') {
                    parts.push(String(this.item));
                }
                return parts.length > 0 ? parts.join(' - ') : '';
            },
            get displayText() {
                return this.toString();
            },
            getSummaryDisplay: function () {
                const parts = [];
                if (this.category && String(this.category).trim() !== '') {
                    parts.push(`${this._fieldLabels.category}: ${this.category}`);
                }
                if (this.item && String(this.item).trim() !== '') {
                    parts.push(`${this._fieldLabels.item}: ${this.item}`);
                }
                return parts.join('\n');
            },
            hasContent: function () {
                return !!(this.category || this.item);
            },
            getSimpleString: function () {
                return this.toString();
            }
        };

        // Ensure the toString method is properly bound
        Object.defineProperty(value, 'toString', {
            value: value.toString.bind(value),
            writable: false,
            enumerable: false,
            configurable: false
        });

        return value;
    }

    getProcessedValue() {
        return {
            selectedCategory: this.state.selectedCategory || '',
            selectedCategoryId: this.state.selectedCategory ? this.slugify(this.state.selectedCategory) : '',
            selectedItemId: this.state.selectedItemId || '',
            selectedItem: this.state.selectedItem ? {
                id: this.state.selectedItem.id,
                name: this.state.selectedItem.name,
                displayName: this.state.selectedItem.displayName
            } : null,
            displayText: this.getDisplayText(),
            isComplete: this.isSelectionComplete()
        };
    }

    getDisplayText() {
        const parts = [];
        if (this.state.selectedCategory && String(this.state.selectedCategory).trim() !== '') {
            parts.push(String(this.state.selectedCategory));
        }
        if (this.state.selectedItem && this.state.selectedItem.displayName && String(this.state.selectedItem.displayName).trim() !== '') {
            parts.push(String(this.state.selectedItem.displayName));
        }
        return parts.length > 0 ? parts.join(' - ') : '';
    }

    getSummaryFields() {
        const fields = [];
        if (this.state.selectedCategory && String(this.state.selectedCategory).trim() !== '') {
            fields.push({
                label: this.categoryLabel || 'Category',
                value: this.state.selectedCategory,
                key: 'category'
            });
        }
        if (this.state.selectedItem?.displayName && String(this.state.selectedItem.displayName).trim() !== '') {
            fields.push({
                label: this.itemLabel || 'Item',
                value: this.state.selectedItem.displayName,
                key: 'item'
            });
        }
        return fields;
    }

    setValue(value, options = {}) {
        // Reset first
        this.setState({
            selectedCategory: '',
            selectedItemId: '',
            selectedItem: null
        });

        if (value && typeof value === 'object') {
            // Handle processed value format
            if (value.selectedCategory && this.showCategoryField) {
                const categoryOption = this.availableCategories.find(s => s.name === value.selectedCategory);
                if (categoryOption) {
                    this.selectCategory(categoryOption.id);
                    if (this.categorySelectField) {
                        this.categorySelectField.setValue(categoryOption.id);
                    }
                }
            }
            
            // Handle category field from getValue format
            if (value.category && this.showCategoryField && !value.selectedCategory) {
                const categoryOption = this.availableCategories.find(s => s.name === value.category);
                if (categoryOption) {
                    this.selectCategory(categoryOption.id);
                    if (this.categorySelectField) {
                        this.categorySelectField.setValue(categoryOption.id);
                    }
                }
            }
            
            if (value.selectedItemId && this.showItemField) {
                this.selectItem(value.selectedItemId);
                if (this.itemSelectField) {
                    this.itemSelectField.setValue(value.selectedItemId);
                }
            }
        } else if (typeof value === 'string') {
            console.log('CategoryItemFilterField: String value set:', value);
        }

        if (!options.silent) {
            this.eventBus?.emit('field:valueChange', {
                fieldId: this.id,
                value: value,
                field: this
            });
        }
    }

    reset() {
        this.setState({
            selectedCategory: '',
            selectedItemId: '',
            selectedItem: null
        });
        
        this.filteredItems = this.allItems;

        if (this.categorySelectField) {
            this.categorySelectField.setValue('');
        }
        
        if (this.itemSelectField) {
            this.itemSelectField.setValue('');
            this.updateItemOptions();
        }

        const itemContainer = this.element?.querySelector('.item-select-container');
        if (itemContainer) {
            itemContainer.style.display = 'none';
        }

        this.handleChange();
    }

    cleanup() {
        if (this.categorySelectField && typeof this.categorySelectField.cleanup === 'function') {
            this.categorySelectField.cleanup();
        }
        if (this.itemSelectField && typeof this.itemSelectField.cleanup === 'function') {
            this.itemSelectField.cleanup();
        }
        super.cleanup();
    }
}

// ============================================================================
// ENHANCED IMAGE GALLERY FIELD
// ============================================================================

class ImageGalleryField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        this.images = config.images || [];
        this.autoPlay = config.autoPlay || false;
        this.autoPlayInterval = config.autoPlayInterval || 3000;
        this.showThumbnails = config.showThumbnails || false;
        this.allowFullscreen = config.allowFullscreen !== false;
        this.enableKeyboardNavigation = config.enableKeyboardNavigation !== false;
        this.language = config.language || 'en';
        
        // Enhanced state management
        this.setState({
            currentIndex: 0,
            isFullscreen: false,
            isPlaying: this.autoPlay,
            isLoading: false,
            loadedImages: new Set()
        });
        
        // Timer management
        this.autoPlayTimer = null;
        this.keyboardHandler = null;
        
        // DOM elements
        this.galleryContainer = null;
        this.mainImage = null;
        this.imageCounter = null;
        this.prevButton = null;
        this.nextButton = null;
        this.fullscreenButton = null;
        this.thumbnailContainer = null;

        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.eventBus?.on('field:stateChange', (data) => {
            if (data.fieldId === this.id) {
                if ('currentIndex' in data.newState) {
                    this.updateDisplay();
                }
                if ('isPlaying' in data.newState) {
                    this.handlePlayStateChange();
                }
                if ('isFullscreen' in data.newState) {
                    this.updateFullscreenButton();
                }
            }
        });

        // Handle fullscreen events
        if (typeof document !== 'undefined') {
            const fullscreenHandler = () => {
                this.setState({ isFullscreen: !!document.fullscreenElement });
            };
            
            document.addEventListener('fullscreenchange', fullscreenHandler);
            this.eventListeners.push({ element: document, event: 'fullscreenchange', handler: fullscreenHandler });
        }
    }

    handlePlayStateChange() {
        if (this.state.isPlaying) {
            this.startAutoPlay();
        } else {
            this.stopAutoPlay();
        }
    }

    render() {
        const container = this.createContainer();
        container.className += ' image-gallery-field';

        if (this.label) {
            container.appendChild(this.createLabel());
        }

        this.createGalleryStructure();
        container.appendChild(this.galleryContainer);
        
        this.setupEventListeners();
        this.updateDisplay();
        
        if (this.autoPlay) {
            this.startAutoPlay();
        }

        this.container = container;
        this.element = this.galleryContainer;

        return container;
    }

    createGalleryStructure() {
        this.galleryContainer = document.createElement('div');
        this.galleryContainer.className = 'image-gallery-container';
        this.galleryContainer.setAttribute('data-images', this.images.length);

        if (this.images.length === 1) {
            this.galleryContainer.classList.add('single-image');
        }

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'gallery-content-wrapper';

        if (this.showThumbnails && this.images.length > 1) {
            this.createThumbnailNavigation();
            contentWrapper.appendChild(this.thumbnailContainer);
        }

        const imageContainer = document.createElement('div');
        imageContainer.className = 'gallery-image-container';

        this.mainImage = document.createElement('img');
        this.mainImage.className = 'gallery-image';
        this.mainImage.alt = 'Gallery image';
        
        const loadHandler = () => this.handleImageLoad();
        const errorHandler = () => this.handleImageError();
        
        this.mainImage.addEventListener('load', loadHandler);
        this.mainImage.addEventListener('error', errorHandler);
        
        this.eventListeners.push(
            { element: this.mainImage, event: 'load', handler: loadHandler },
            { element: this.mainImage, event: 'error', handler: errorHandler }
        );

        imageContainer.appendChild(this.mainImage);

        // Navigation buttons
        if (this.images.length > 1) {
            this.createNavigationButtons(imageContainer);
        }

        // Image counter
        this.imageCounter = document.createElement('div');
        this.imageCounter.className = 'image-counter';
        imageContainer.appendChild(this.imageCounter);

        // Fullscreen button
        if (this.allowFullscreen) {
            this.createFullscreenButton(imageContainer);
        }

        contentWrapper.appendChild(imageContainer);
        this.galleryContainer.appendChild(contentWrapper);
    }

    createNavigationButtons(imageContainer) {
        this.prevButton = document.createElement('button');
        this.prevButton.type = 'button';
        this.prevButton.className = 'nav-btn prev-btn';
        this.prevButton.innerHTML = SVGIcons.get('CHEVRON');
        this.prevButton.setAttribute('aria-label', this.getTranslatedText('imageGallery.previous'));

        this.nextButton = document.createElement('button');
        this.nextButton.type = 'button';
        this.nextButton.className = 'nav-btn next-btn';
        this.nextButton.innerHTML = SVGIcons.get('CHEVRON');
        this.nextButton.setAttribute('aria-label', this.getTranslatedText('imageGallery.next'));

        const prevHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.previousImage();
        };
        
        const nextHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.nextImage();
        };

        this.prevButton.addEventListener('click', prevHandler);
        this.nextButton.addEventListener('click', nextHandler);
        
        this.eventListeners.push(
            { element: this.prevButton, event: 'click', handler: prevHandler },
            { element: this.nextButton, event: 'click', handler: nextHandler }
        );

        imageContainer.appendChild(this.prevButton);
        imageContainer.appendChild(this.nextButton);
    }

    createFullscreenButton(imageContainer) {
        this.fullscreenButton = document.createElement('button');
        this.fullscreenButton.type = 'button';
        this.fullscreenButton.className = 'fullscreen-btn';
        this.fullscreenButton.innerHTML = '⛶';
        this.fullscreenButton.setAttribute('aria-label', this.getTranslatedText('imageGallery.fullscreen'));

        const fullscreenHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleFullscreen();
        };

        this.fullscreenButton.addEventListener('click', fullscreenHandler);
        this.eventListeners.push({ element: this.fullscreenButton, event: 'click', handler: fullscreenHandler });

        imageContainer.appendChild(this.fullscreenButton);
    }

    createThumbnailNavigation() {
        this.thumbnailContainer = document.createElement('div');
        this.thumbnailContainer.className = 'thumbnail-container';

        this.images.forEach((imageUrl, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.className = 'thumbnail';
            thumbnail.src = imageUrl;
            thumbnail.alt = `Thumbnail ${index + 1}`;

            const clickHandler = (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.goToImage(index);
            };
            
            const errorHandler = () => {
                thumbnail.style.display = 'none';
            };

            thumbnail.addEventListener('click', clickHandler);
            thumbnail.addEventListener('error', errorHandler);
            
            this.eventListeners.push(
                { element: thumbnail, event: 'click', handler: clickHandler },
                { element: thumbnail, event: 'error', handler: errorHandler }
            );

            this.thumbnailContainer.appendChild(thumbnail);
        });
    }

    setupEventListeners() {
        if (this.enableKeyboardNavigation) {
            this.keyboardHandler = (event) => {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    this.previousImage();
                } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    this.nextImage();
                } else if (event.key === 'Escape' && this.state.isFullscreen) {
                    event.preventDefault();
                    this.exitFullscreen();
                }
            };

            this.container.addEventListener('keydown', this.keyboardHandler);
            this.eventListeners.push({ element: this.container, event: 'keydown', handler: this.keyboardHandler });
        }
    }

    updateDisplay() {
        if (this.images.length === 0) return;

        if (this.mainImage) {
            this.mainImage.src = this.images[this.state.currentIndex];
        }

        if (this.imageCounter) {
            this.imageCounter.textContent = `${this.state.currentIndex + 1} / ${this.images.length}`;
        }

        if (this.thumbnailContainer) {
            const thumbnails = this.thumbnailContainer.querySelectorAll('.thumbnail');
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === this.state.currentIndex);
            });
        }

        if (this.prevButton) {
            this.prevButton.disabled = false;
        }

        if (this.nextButton) {
            this.nextButton.disabled = false;
        }

        this.eventBus?.emit('imageGallery:imageChanged', {
            fieldId: this.id,
            currentIndex: this.state.currentIndex,
            imageUrl: this.images[this.state.currentIndex],
            field: this
        });
    }

    nextImage() {
        const newIndex = this.state.currentIndex < this.images.length - 1 ?
            this.state.currentIndex + 1 : 0;
        
        this.setState({ currentIndex: newIndex });
        this.resetAutoPlay();
    }

    previousImage() {
        const newIndex = this.state.currentIndex > 0 ?
            this.state.currentIndex - 1 : this.images.length - 1;
        
        this.setState({ currentIndex: newIndex });
        this.resetAutoPlay();
    }

    goToImage(index) {
        if (index >= 0 && index < this.images.length) {
            this.setState({ currentIndex: index });
            this.resetAutoPlay();
        }
    }

    startAutoPlay() {
        if (this.images.length <= 1) return;

        this.autoPlayTimer = setInterval(() => {
            if (this.state.isPlaying) {
                this.nextImage();
            }
        }, this.autoPlayInterval);
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }

    resetAutoPlay() {
        if (this.autoPlay && this.state.isPlaying) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }

    toggleFullscreen() {
        if (this.state.isFullscreen) {
            this.exitFullscreen();
        } else {
            this.enterFullscreen();
        }
    }

    enterFullscreen() {
        if (this.galleryContainer.requestFullscreen) {
            this.galleryContainer.requestFullscreen();
        }
    }

    exitFullscreen() {
        if (typeof document !== 'undefined' && document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    updateFullscreenButton() {
        if (this.fullscreenButton) {
            this.fullscreenButton.innerHTML = this.state.isFullscreen ? '⛷' : '⛶';
            this.fullscreenButton.setAttribute('aria-label',
                this.getTranslatedText(this.state.isFullscreen ? 'imageGallery.exitFullscreen' : 'imageGallery.fullscreen')
            );
        }
        
        if (this.galleryContainer) {
            this.galleryContainer.classList.toggle('fullscreen', this.state.isFullscreen);
        }
    }

    handleImageError() {
        console.error('🖼️ ImageGallery: Failed to load image:', this.images[this.state.currentIndex]);
        
        this.eventBus?.emit('imageGallery:imageError', {
            fieldId: this.id,
            currentIndex: this.state.currentIndex,
            imageUrl: this.images[this.state.currentIndex],
            field: this
        });
    }

    handleImageLoad() {
        const currentIndex = this.state.currentIndex;
        const loadedImages = new Set(this.state.loadedImages);
        loadedImages.add(currentIndex);
        
        this.setState({ loadedImages });
        
        this.eventBus?.emit('imageGallery:imageLoaded', {
            fieldId: this.id,
            currentIndex: currentIndex,
            imageUrl: this.images[currentIndex],
            field: this
        });
    }

    getTranslatedText(path) {
        try {
            const keys = path.split('.');
            let value = this.factory.creatFormInstance?.formData?.translations?.[this.language];
            for (const key of keys) {
                value = value?.[key];
            }
            return value || path;
        } catch (error) {
            return path;
        }
    }

    getValue() {
        return {
            currentIndex: this.state.currentIndex,
            currentImage: this.images[this.state.currentIndex],
            totalImages: this.images.length,
            images: this.images,
            isPlaying: this.state.isPlaying,
            isFullscreen: this.state.isFullscreen
        };
    }

    setValue(value, options = {}) {
        if (typeof value === 'number' && value >= 0 && value < this.images.length) {
            this.goToImage(value);
        } else if (typeof value === 'object' && value.currentIndex !== undefined) {
            this.setState({
                currentIndex: value.currentIndex,
                isPlaying: value.isPlaying !== undefined ? value.isPlaying : this.state.isPlaying
            });
        }
        
        if (!options.silent) {
            this.eventBus?.emit('field:valueChange', {
                fieldId: this.id,
                value: value,
                field: this
            });
        }
    }

    cleanup() {
        this.stopAutoPlay();
        
        if (this.state.isFullscreen) {
            this.exitFullscreen();
        }
        
        super.cleanup();
    }
}

// ============================================================================
// ENHANCED FILE UPLOAD FIELD
// ============================================================================

class ServiceRequestFileUploadField extends BaseField {
    constructor(factory, config) {
        super(factory, config);
        
        this.accept = config.accept || 'image/*';
        this.language = config.language || 'fr';
        this.maxFileSize = config.maxFileSize || 10 * 1024 * 1024; // 10MB default
        this.allowMultiple = config.allowMultiple || false;
        
        // Enhanced state management
        this.setState({
            files: [],
            isDragOver: false,
            isUploading: false,
            uploadProgress: 0,
            errors: []
        });

        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.eventBus?.on('field:stateChange', (data) => {
            if (data.fieldId === this.id) {
                if ('files' in data.newState) {
                    this.updateFileDisplay();
                }
                if ('isDragOver' in data.newState) {
                    this.updateDragState();
                }
                if ('isUploading' in data.newState || 'uploadProgress' in data.newState) {
                    this.updateUploadState();
                }
            }
        });
    }

    async validate() {
        // File upload is typically optional unless explicitly required
        if (this.required && this.state.files.length === 0) {
            this.showError(this.getFieldErrorMessage('required'));
            return false;
        }
        
        // Validate file sizes and types
        const errors = [];
        this.state.files.forEach(file => {
            if (file.size > this.maxFileSize) {
                errors.push(`File ${file.name} is too large. Maximum size is ${this.formatFileSize(this.maxFileSize)}.`);
            }
            
            if (this.accept && !this.isFileTypeAccepted(file)) {
                errors.push(`File ${file.name} is not an accepted file type.`);
            }
        });
        
        if (errors.length > 0) {
            this.showError(errors[0]);
            this.setState({ errors });
            return false;
        }
        
        this.hideError();
        this.setState({ errors: [] });
        return true;
    }

    render() {
        const container = this.createContainer();
        container.className += ' file-upload-field';

        if (this.label) {
            container.appendChild(this.createLabel());
        }

        const fileUploadContainer = document.createElement('div');
        fileUploadContainer.className = 'file-upload-container';

        const uploadArea = this.createUploadArea();
        fileUploadContainer.appendChild(uploadArea);

        const fileList = this.createFileList();
        fileUploadContainer.appendChild(fileList);

        container.appendChild(fileUploadContainer);
        container.appendChild(this.createErrorElement());

        this.container = container;
        this.element = fileUploadContainer;

        return container;
    }

    createUploadArea() {
        const uploadArea = document.createElement('div');
        uploadArea.className = 'file-upload-area';

        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'file';
        hiddenInput.className = 'file-upload-input';
        hiddenInput.id = this.id;
        hiddenInput.name = this.name;
        hiddenInput.accept = this.accept;
        hiddenInput.multiple = this.allowMultiple;
        hiddenInput.style.display = 'none';

        const uploadText = document.createElement('div');
        uploadText.className = 'file-upload-text';
        uploadText.textContent = this.language === 'fr' ? 
            'Glissez et déposez une image ou cliquez pour parcourir' : 
            'Drag and drop an image or click to browse';

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'file-upload-buttons';

        const uploadBtn = this.createUploadButton();
        const cameraBtn = this.createCameraButton();

        buttonContainer.appendChild(uploadBtn);
        buttonContainer.appendChild(cameraBtn);

        uploadArea.appendChild(hiddenInput);
        uploadArea.appendChild(uploadText);
        uploadArea.appendChild(buttonContainer);

        this.setupUploadAreaEvents(uploadArea, hiddenInput, uploadBtn, cameraBtn);

        return uploadArea;
    }

    createUploadButton() {
        const uploadBtn = document.createElement('button');
        uploadBtn.type = 'button';
        uploadBtn.className = 'file-upload-btn upload-btn';
        uploadBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
            </svg>
            <span>${this.language === 'fr' ? 'Choisir un fichier' : 'Choose file'}</span>
        `;
        return uploadBtn;
    }

    createCameraButton() {
        const cameraBtn = document.createElement('button');
        cameraBtn.type = 'button';
        cameraBtn.className = 'file-upload-btn camera-btn';
        cameraBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
            </svg>
            <span>${this.language === 'fr' ? 'Prendre une photo' : 'Take a photo'}</span>
        `;
        return cameraBtn;
    }

    createFileList() {
        const fileList = document.createElement('div');
        fileList.className = 'file-list';
        fileList.style.display = 'none';
        return fileList;
    }

    setupUploadAreaEvents(uploadArea, hiddenInput, uploadBtn, cameraBtn) {
        // File input change handler
        const changeHandler = () => {
            if (hiddenInput.files && hiddenInput.files.length > 0) {
                this.handleFileSelection(Array.from(hiddenInput.files));
            }
        };

        hiddenInput.addEventListener('change', changeHandler);
        this.eventListeners.push({ element: hiddenInput, event: 'change', handler: changeHandler });

        // Upload button handler
        const uploadHandler = () => {
            hiddenInput.click();
        };

        uploadBtn.addEventListener('click', uploadHandler);
        this.eventListeners.push({ element: uploadBtn, event: 'click', handler: uploadHandler });

        // Camera button handler
        const cameraHandler = () => {
            hiddenInput.setAttribute('capture', 'environment');
            hiddenInput.click();
        };

        cameraBtn.addEventListener('click', cameraHandler);
        this.eventListeners.push({ element: cameraBtn, event: 'click', handler: cameraHandler });

        // Drag and drop handlers
        const dragOverHandler = (e) => {
            e.preventDefault();
            this.setState({ isDragOver: true });
        };

        const dragLeaveHandler = (e) => {
            e.preventDefault();
            this.setState({ isDragOver: false });
        };

        const dropHandler = (e) => {
            e.preventDefault();
            this.setState({ isDragOver: false });
            
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                this.handleFileSelection(Array.from(e.dataTransfer.files));
            }
        };

        uploadArea.addEventListener('dragover', dragOverHandler);
        uploadArea.addEventListener('dragleave', dragLeaveHandler);
        uploadArea.addEventListener('drop', dropHandler);
        
        this.eventListeners.push(
            { element: uploadArea, event: 'dragover', handler: dragOverHandler },
            { element: uploadArea, event: 'dragleave', handler: dragLeaveHandler },
            { element: uploadArea, event: 'drop', handler: dropHandler }
        );
    }

    handleFileSelection(newFiles) {
        let files = this.allowMultiple ? [...this.state.files, ...newFiles] : [newFiles[0]];
        
        // Filter out duplicates and invalid files
        files = files.filter((file, index, arr) => {
            return arr.findIndex(f => f.name === file.name && f.size === file.size) === index;
        });

        this.setState({ files });
        this.handleChange();
        
        this.eventBus?.emit('fileUpload:filesSelected', {
            fieldId: this.id,
            files: files,
            field: this
        });
    }

    updateFileDisplay() {
        const fileList = this.container.querySelector('.file-list');
        if (!fileList) return;

        if (this.state.files.length === 0) {
            fileList.style.display = 'none';
            fileList.innerHTML = '';
            return;
        }

        fileList.style.display = 'block';
        fileList.innerHTML = '';

        this.state.files.forEach((file, index) => {
            const fileItem = this.createFileItem(file, index);
            fileList.appendChild(fileItem);
        });
    }

    createFileItem(file, index) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';

        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${this.formatFileSize(file.size)}</div>
            </div>
            <button type="button" class="remove-file-btn" data-index="${index}">
                ${SVGIcons.get('CLOSE')}
            </button>
        `;

        const removeBtn = fileItem.querySelector('.remove-file-btn');
        const removeHandler = () => {
            this.removeFile(index);
        };

        removeBtn.addEventListener('click', removeHandler);
        this.eventListeners.push({ element: removeBtn, event: 'click', handler: removeHandler });

        return fileItem;
    }

    removeFile(index) {
        const files = [...this.state.files];
        files.splice(index, 1);
        this.setState({ files });
        this.handleChange();
        
        this.eventBus?.emit('fileUpload:fileRemoved', {
            fieldId: this.id,
            removedIndex: index,
            remainingFiles: files,
            field: this
        });
    }

    updateDragState() {
        const uploadArea = this.container.querySelector('.file-upload-area');
        if (uploadArea) {
            uploadArea.classList.toggle('drag-over', this.state.isDragOver);
        }
    }

    updateUploadState() {
        const uploadArea = this.container.querySelector('.file-upload-area');
        if (uploadArea) {
            uploadArea.classList.toggle('uploading', this.state.isUploading);
        }
        
        // Update progress if needed
        if (this.state.isUploading && this.state.uploadProgress > 0) {
            // Could add progress bar here
        }
    }

    isFileTypeAccepted(file) {
        if (!this.accept) return true;
        
        const acceptedTypes = this.accept.split(',').map(type => type.trim());
        return acceptedTypes.some(acceptedType => {
            if (acceptedType.endsWith('/*')) {
                const baseType = acceptedType.slice(0, -2);
                return file.type.startsWith(baseType);
            }
            return file.type === acceptedType || file.name.toLowerCase().endsWith(acceptedType);
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getValue() {
        return this.allowMultiple ? this.state.files : (this.state.files[0] || null);
    }

    setValue(value, options = {}) {
        if (!value) {
            this.setState({ files: [] });
        } else if (Array.isArray(value)) {
            this.setState({ files: value });
        } else {
            this.setState({ files: [value] });
        }
        
        if (!options.silent) {
            this.eventBus?.emit('field:valueChange', {
                fieldId: this.id,
                value: value,
                field: this
            });
        }
    }

    reset() {
        this.setState({
            files: [],
            isDragOver: false,
            isUploading: false,
            uploadProgress: 0,
            errors: []
        });
        
        const hiddenInput = this.container.querySelector('.file-upload-input');
        if (hiddenInput) {
            hiddenInput.value = '';
        }
        
        this.handleChange();
    }

    cleanup() {
        // Clean up any file URLs if created
        this.state.files.forEach(file => {
            if (file.url && file.url.startsWith('blob:')) {
                URL.revokeObjectURL(file.url);
            }
        });
        
        super.cleanup();
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ServiceContainer,
        EventBus,
        ValidationEngine,
        StateManager,
        RendererService,
        FormatterService,
        SVGIcons,
        CreatForm,
        FormFieldFactory,
        MultiStepForm,
        FormStep,
        ProgressBar,
        NavigationButtons,
        BaseField,
        TabManager,
        FormDataProcessor,
        FieldValueFormatter,
        BaseDataTransformer,
        // Field implementations
        TextField,
        EmailField,
        NumberField,
        PhoneField,
        UrlField,
        TextAreaField,
        PercentageField,
        OptionsStepperField,
        YesNoField,
		
        OptionsStepperField,
        CustomField,
        ServiceCardField,
        CategoryItemFilterField,
        ImageGalleryField,
        ServiceRequestFileUploadField,
        BaseCarouselField,
        CarouselField,
        FilteredCarouselField,
        CalendarField,
        ServiceRequestCalendarField,
        ServiceProviderCalendarField,
        CategoryAndItemCalendarField,
        ItemCalendarField,
        CurrentAppointmentCardField,
        BookingCancellationCardField,
        SlidingWindowRangeField,
        DualRangeField,
        OptionsSliderField,
        SliderField,
        SlidingWindowSliderField,
        YesNoField,
        YesNoWithOptionsField,
        SingleSelectField,
        MultiSelectField,
        SingleSelectSubsectionsField,
        MultiSelectSubsectionsField,
        SingleSelectWithOtherField,
        MultiSelectWithOtherField
    };
} else {
    // Browser environment
    window.ServiceContainer = ServiceContainer;
    window.EventBus = EventBus;
    window.ValidationEngine = ValidationEngine;
    window.StateManager = StateManager;
    window.RendererService = RendererService;
    window.FormatterService = FormatterService;
    window.SVGIcons = SVGIcons;
    window.CreatForm = CreatForm;
    window.FormFieldFactory = FormFieldFactory;
    window.MultiStepForm = MultiStepForm;
    window.FormStep = FormStep;
    window.ProgressBar = ProgressBar;
    window.NavigationButtons = NavigationButtons;
    window.BaseField = BaseField;
    window.TabManager = TabManager;
    window.FormDataProcessor = FormDataProcessor;
    window.FieldValueFormatter = FieldValueFormatter;
    window.BaseDataTransformer = BaseDataTransformer;
    window.OptionsStepperField = OptionsStepperField;
    window.CustomField = CustomField;
    window.ServiceCardField = ServiceCardField;
    window.CategoryItemFilterField = CategoryItemFilterField;
    window.ImageGalleryField = ImageGalleryField;
    window.ServiceRequestFileUploadField = ServiceRequestFileUploadField;
    window.BaseCarouselField = BaseCarouselField;
    window.CarouselField = CarouselField;
    window.FilteredCarouselField = FilteredCarouselField;
    window.CalendarField = CalendarField;
    window.ServiceRequestCalendarField = ServiceRequestCalendarField;
    window.ServiceProviderCalendarField = ServiceProviderCalendarField;
    window.CategoryAndItemCalendarField = CategoryAndItemCalendarField;
    window.ItemCalendarField = ItemCalendarField;
    window.CurrentAppointmentCardField = CurrentAppointmentCardField;
    window.BookingCancellationCardField = BookingCancellationCardField;
    window.SlidingWindowRangeField = SlidingWindowRangeField;
    window.DualRangeField = DualRangeField;
    window.OptionsSliderField = OptionsSliderField;
    window.SliderField = SliderField;
    window.SlidingWindowSliderField = SlidingWindowSliderField;
    window.YesNoField = YesNoField;
    window.YesNoWithOptionsField = YesNoWithOptionsField;
    window.SingleSelectField = SingleSelectField;
    window.MultiSelectField = MultiSelectField;
    window.SingleSelectSubsectionsField = SingleSelectSubsectionsField;
    window.MultiSelectSubsectionsField = MultiSelectSubsectionsField;
    window.SingleSelectWithOtherField = SingleSelectWithOtherField;
    window.MultiSelectWithOtherField = MultiSelectWithOtherField;
}
