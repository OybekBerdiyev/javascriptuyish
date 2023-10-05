import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const start = async()=> {
  try{
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT
    await app.listen(PORT, ()=> {
      console.log(PORT);
      
    })
  }catch(error){
    console.log(error)
  }
}
 
start()