import Joi from 'joi';

export const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Name must contain only alphabets',
        'string.min': 'Name must be at least 3 characters'
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email'
      }),
    phone: Joi.string()
      .pattern(/^\d{10,15}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone must be 10-15 digits'
      }),
    password: Joi.string()
      .min(6)
      .pattern(/^(?=.*[0-9])/)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one number',
        'string.min': 'Password must be at least 6 characters'
      }),
    address: Joi.string()
      .max(150)
      .allow(''),
    state: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    pincode: Joi.string()
      .pattern(/^\d{4,10}$/)
      .required()
      .messages({
        'string.pattern.base': 'Pincode must be 4-10 digits'
      })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  next();
};

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    identifier: Joi.string().required().messages({
      'string.empty': 'Email or phone is required'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required'
    })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  next();
};

export const validateUpdate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .pattern(/^[A-Za-z\s]+$/),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\d{10,15}$/),
    address: Joi.string().max(150).allow(''),
    state: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    pincode: Joi.string().pattern(/^\d{4,10}$/),
    role: Joi.string().valid('user', 'admin')
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  next();
};
