const Joi = require("joi");

const examValidation = async (payload) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    group_id: Joi.string().required(),
    deadline: Joi.date().iso().required(),
    max_ball: Joi.number().required()
  });
  
  const {error} = schema.validate(payload);

  if (error) {
    return error;
  }else {
    return false;
  };
};

module.exports=examValidation;
