class foods {
    constructor(food) {
    this.food = food
    }

    ingredients(food){
        if (food=="osh") {
            return ["sabzi","guruch","go'sht","tuz","yog'","ziravolar","no'xat","piyoz"]
        }
        else if (food=="sho'rva") {
            return ["sabzi","kartoshka","go'sht","tuz","yog'","ziravolar","no'xat","piyoz"]
        }
        else if (food=="somsa") {
            return ["xamir","piyoz","go'sht","tuz","yog'","ziravolar"]
        }
        else if (food=="makaron") {
            return ["makaron","tuz","yog'","ziravolar","suv"]
        }else {
            return "Bizda bunday mahsultot topilmadi"
        }

    }
    
}

module.exports = foods