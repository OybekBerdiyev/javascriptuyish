class Feedback {
    constructor(id,name,who,description,photo) {
        this.id = id
        this.name = name
        this.who = who
        this.description = description
        this.photo = photo
        this.isActive = true
    }
}

module.exports = Feedback