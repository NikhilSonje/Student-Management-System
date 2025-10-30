const Joi = require("joi");

const addStudentSchema = Joi.object({
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).required(),
    mobile_no: Joi.string().max(13).required(),
    city: Joi.string().max(50).optional(),
    email_id: Joi.string().max(50).email().required(),
    dob: Joi.string().optional()
});

const updateStudentSchema = Joi.object({
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).required(),
    mobile_no: Joi.string().max(13).required(),
    city: Joi.string().max(50).optional(),
    email_id: Joi.string().max(50).email().required(),
    dob: Joi.string().optional()
});

const addStudentMarksSchema = Joi.object({
    math: Joi.number().integer().required(),
    science: Joi.number().integer().required(),
    gk: Joi.number().integer().required(),
    marathi: Joi.number().integer().required(),
    english: Joi.number().integer().required(),
    hindi: Joi.number().integer().required()
});

module.exports = { addStudentSchema, updateStudentSchema, addStudentMarksSchema };