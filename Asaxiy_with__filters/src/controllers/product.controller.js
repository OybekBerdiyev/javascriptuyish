const Product = require("../models/product")

const createProduct = async(req,res)=> {
    try {
        const photo = req.imageName;
        const {name,description,price,category,count,model,is_sale,sale_price} = req.body;

        if(is_sale==='true' && sale_price.trim() == '') return res.status(403).json({message:"sale price is required"});
        const newTodo = new Product({name,description,price,category,photo,count,model,is_sale,sale_price});
        await newTodo.save();
        res.status(201).json({message: "Success", newTodo});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal server error"})
    }
}
const getAllProduct = async(req,res)=> {
    try {
        const data = await Todos.find();
        res.json({message: "Success", data});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal server error"})
    }
}
const getOneProduct = async(req,res)=> {
    try {
        const {id} = req.params;
        const data = await Product.findById(id);
        res.json({message: "Success", data});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal server error"})
    }
}
const updateProduct = async(req,res)=> {
    try {
        const {id} = req.params;
        const {name,description,price,category,count,model,is_sale,sale_price} = req.body;
        if(is_sale==='true' && sale_price.trim() == '') return res.status(403).json({message:"sale price is required"});
        const data = await Product.findByIdAndUpdate(id, {
            name,description,price,category,count,model,is_sale,sale_price
        });
    
        res.json({message: "Success", data});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal server error"})
    }
}
const deleteProduct = async(req,res)=> {
    try {
        const {id} = req.params;

        await Product.findByIdAndDelete(id);
    
        res.json({message: "Product deleted succesfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal server error"})
    }
};

const filterProduct = async (req, res) => {
    try {
        const { name, from_price, to_price, model, is_sale, date, limit, page } = req.query;
        let filter = {};

        if (name) {
            filter.name = name;
        }
        if (from_price && to_price) {
            filter.price = { $gte: from_price, $lte: to_price };
        } else if (from_price) {
            filter.price = { $gte: from_price };
        } else if (to_price) {
            filter.price = { $lte: to_price };
        }
        if (model) {
            filter.model = model;
        }
        if (is_sale) {
            filter.is_sale = true;
        }
        if (date) {
            const now = new Date();
            now.setDate(now.getDate() - 10); 
            filter.createdAt = { $gte: now.toISOString() };
        }

        const skip = (page - 1) * limit;
        const filteredAndPaginatedData = await Product.find(filter)
            .skip(skip)
            .limit(Number(limit));

        res.json({ message: "Success", data: filteredAndPaginatedData });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
};


module.exports = {
    createProduct,
    getAllProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
    filterProduct
}