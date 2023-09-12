const Joi = require("joi");

const groupsValidation = async (payload) => {
  const schema = Joi.object({
    groupName: Joi.string().required(),
    description: Joi.string().required()
  });
  
  const {error} = schema.validate(payload);

  if (error) {
    return error;
  }else {
    return false;
  };
};

module.exports=groupsValidation;
