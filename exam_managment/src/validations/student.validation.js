const Joi = require("joi");

const studentValidation = async (payload) => {
  const schema = Joi.object({
    studentName: Joi.string().required(),
    phone: Joi.string().max(13).required()
  });
  
  const {error} = schema.validate(payload);

  if (error) {
    return error;
  }else {
    return false;
  };
};

module.exports=studentValidation;
