const Joi = require("joi");

const  resultValidation = async (payload) => {
  const schema = Joi.object({
    exam_id: Joi.string().required(),
    student_id: Joi.string().required(),
    answer: Joi.string().required(),
  });
  
  const {error} = schema.validate(payload);

  if (error) {
    return error;
  }else {
    return false;
  };
};

module.exports= resultValidation;
