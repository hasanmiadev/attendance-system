const express = require('express');
const app = express();


app.get('/', (_req, res)=>{

   const obj = {
    name:'MD HASAN MIA',
    email:'hasanmiaweb@gmail.com',
   }

   res.json(obj)
})

app.listen(5050, ()=>{
    console.log("listening on port 5050");
})
