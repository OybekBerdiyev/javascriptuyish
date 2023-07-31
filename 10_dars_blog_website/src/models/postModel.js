class Post {
    constructor(id,title,text, photo=null, view, owner){
     this.id = id
     this.title = title
     this.text = text
     this.photo = photo
     this.view = view
     this.owner =  owner    
    }
}

module.exports = Post