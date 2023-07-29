const axios = require('axios');

const bootstrap = async ()=>{
    for (let i = 0; i < 100000; i++) {
        const data = await axios.default.get("https://20maktab.uz/maktab-tarixi/")        
    }
}
bootstrap();