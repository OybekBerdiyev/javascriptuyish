const Io  = require("../utils/Io")
const Feedbacks = new Io("./database/feedbacks.json")
const Feedback = require("../models/feedback.model");
const Joi = require("joi")


const addFeedback = async(req,res)=>{
    try {
        const photo = req.imageName; 
        const {name,who,description} = req.body
        
        const schema = Joi.object({
            name: Joi.string().max(256).required(),
            who: Joi.string().max(256).required(),
            description: Joi.string().min(64).max(1024).required(),
            photo: Joi.required()
        });
        const {error} = schema.validate({name,who,description,photo});
        if (error) return res.status(400).json({message: error.message});

        const feedbacks = await Feedbacks.read()
        const id = (feedbacks[feedbacks.length - 1]?.id || 0) + 1;

        const newFeedback = new Feedback(id,name,who,description,photo);
      
          const data = feedbacks.length ? [...feedbacks, newFeedback] : [newFeedback];
      
          await Feedbacks.write(data); 
          res.status(201).json({message: "Created"})   

    } catch (error) {
        res.status(500).json({message: "Inernal Server Error"})
    }
}

const onefeedback = async(req,res)=>{
try {
    const {id} = req.params
    const feedbacks = await Feedbacks.read()   
    const findFeedback = feedbacks.find((a)=> a.id == id)
    if (findFeedback.isActive == true) {
        return res.json({data: findFeedback})
    }
    return res.status(400).json({message: "Feedback not found"})
} catch (error) {
    res.status(500).json({message: "Inernal Server Error"})   
}
}

const allFeedback = async(req,res)=>{
try {
    const feedbacks = await Feedbacks.read()   
    const filter = feedbacks.filter((a) => a.isActive == true);
    res.json({data: filter})
} catch (error) {
    res.status(500).json({message: "Inernal Server Error"})
}
}

const deleteFeedback = async(req,res)=>{
try {
    const {id} = req.params;
    const feedbacks = await Feedbacks.read()   
    const findFeedback = feedbacks.find((a)=> a.id == id)
    findFeedback.isActive = false
    await Feedbacks.write(feedbacks);
    res.json({message: "Deleted"});
} catch (error) {
    res.status(500).json({message: "Inernal Server Error"})
}
}

const updateFeedback = async(req,res)=>{
try {
    const {id} = req.params;
    const photo = req.imageName; 
    const {name,description} = req.body
    const feedbacks = await Feedbacks.read() 
    const findFeedback = feedbacks.find((a)=> a.id == id)
    if (findFeedback.isActive==false) {
        res.status(400).json({message: "Feedback not found"})
    }
    findFeedback.name = name || findFeedback.name
    findFeedback.description = description || findFeedback.description
    findFeedback.photo = photo || findFeedback.photo
    findFeedback.isActive = true || findFeedback.isActive
    await Feedbacks.write(feedbacks);
    res.json({message: "Updated"});
} catch (error) {
    res.status(500).json({message: "Inernal Server Error"})
}

}


module.exports = {
    allFeedback,
    onefeedback,
    addFeedback,
    deleteFeedback,
    updateFeedback
}