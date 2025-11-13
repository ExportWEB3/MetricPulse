import { ValidationSchema } from './typedeclaration.js';

export const validatorSchemaFunc = (
  data: any,
  schema: ValidationSchema
): string | null => {
  if (!data || typeof data !== 'object') {
    return 'Invalid input data';
  }

  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key];

    // Check required fields
    if (rules.required && (value === undefined || value === null || value === '')) {
      return `${key} is required`;
    }

    // Skip validation if field is not required and not provided
    if (!rules.required && (value === undefined || value === null)) {
      continue;
    }

    // Type validation
    if (value !== undefined && value !== null && rules.type) {
      if (typeof value !== rules.type) {
        return `${key} must be of type ${rules.type}`;
      }
    }

    // Pattern validation (for strings)
    if (rules.pattern && typeof value === 'string') {
      if (!rules.pattern.test(value)) {
        return `${key} format is invalid`;
      }
    }

    // Min length validation
    if (rules.minLength && typeof value === 'string') {
      if (value.length < rules.minLength) {
        return `${key} must be at least ${rules.minLength} characters`;
      }
    }

    // Max length validation
    if (rules.maxLength && typeof value === 'string') {
      if (value.length > rules.maxLength) {
        return `${key} must not exceed ${rules.maxLength} characters`;
      }
    }

    // Custom validation
    if (rules.custom) {
      const result = rules.custom(value);
      if (result !== true) {
        return typeof result === 'string' ? result : `${key} validation failed`;
      }
    }
  }

  return null;
};

// Auth schemas
export const CreateUserSchemaValidator = {
  schema: {
    email: {
      type: 'string',
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },
  },
};

export const LoginSchemaValidator = {
  schema: {
    email: {
      type: 'string',
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: 'string',
      required: true,
    },
  },
};

export const CreateUserSchemaAdminValidator = {
  schema: {
    email: {
      type: 'string',
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },
    firstName: {
      type: 'string',
      required: false,
    },
    lastName: {
      type: 'string',
      required: false,
    },
  },
};

export const UserUpdateSchemaValidator = {
  schema: {
    firstName: {
      type: 'string',
      required: false,
    },
    lastName: {
      type: 'string',
      required: false,
    },
    email: {
      type: 'string',
      required: false,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
};
