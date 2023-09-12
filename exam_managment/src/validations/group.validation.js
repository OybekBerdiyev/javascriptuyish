const Joi = require("joi");

const groupValidation = async (payload) => {
  const schema = Joi.object({
    group_id: Joi.string().required(),
    student_id: Joi.string().required()
  });
  
  const {error} = schema.validate(payload);

  if (error) {
    return error;
  }else {
    return false;
  };
};

module.exports=groupValidation;
