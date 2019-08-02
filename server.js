const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));


app.get('/pokemon', (req,res)=>{
  res.send('Welcome to the pokemon Api    ϞϞ(๑⚈ ․̫ ⚈๑)∩')
})


const PORT = 8000;
app.listen(PORT, ()=> {
  console.log(`Server is listening to PORT ${PORT}`);
})