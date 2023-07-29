const express = require("express")
const app = express()
const Io = require("./utils/io")
const readOrWrite = new Io("./database/posts.json")
const Model = require("./models/suyak")
app.use(express.json())

app.get('/viewall',async(req, res) => {
    const post = await readOrWrite.read()
    res.json({post})
})


app.get("/viewall/:id", async (req, res) =>{
    const {id} = req.params
    const post = await readOrWrite.read()
    const findID = post.find((a)=> a.id == id)
    findID.view+=1
    await readOrWrite.write(findID)
    if (!findID){
        return res.status(404).json({message: '404 NOT FOUND POST'})
    }
    res.json({findID})
})

app.post('/new',async(req,res)=>{
    const {title,text } = req.body
    
    const post = await readOrWrite.read()
    const id = (post[post.length - 1]?.id || 0) + 1;  
    const view = 0     
    const newPost = new Model(id, title, text, view);
    const result = post.length ? [...post, newPost] : [newPost];    
    await readOrWrite.write(result)
    res.json({message: "create your post"})
})


app.put("/change/:id", async (req, res) =>{
    const {id} = req.params
    console.log(id);
    const {title,text} = req.body

    const post = await readOrWrite.read()
    const findId = post.find((a)=> a.id == id)
    console.log(title);
    if (!findId){
        return res.status(404).json({message: '404 NOT FOUND POST'})
    }
    findId.title = title ? title : findId.title
    findId.text = text ? text : findId.text
    await readOrWrite.write(post)
    res.json({message: "created your post"})
})

app.delete('/remove/:id', async (req, res) =>{
    const {id} = req.params
    const post = await readOrWrite.read()

    const findId = post.find((a)=> a.id == id)

    if (!findId){
        return res.status(404).json({message: '404 NOT FOUND POST'})
    }

    const filterID = post.filter((post)=> post.id != id)
    
    await readOrWrite.write(filterID)

    res.json({message: "Post has bee deleted"})

    
})


app.listen(4000, ()=>
{
    console.log('Server is running on port 4000');
});


//keladigan so'rovni id sini olib id ga teng bo'lganini ko'rishlar sonini bittaga oshirib qo'yish kerak