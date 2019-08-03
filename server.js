const express = require('express');
const morgan = require('morgan');

const app = express();
const pokeDataBase = require('./database/pokemon-database');
const allPokemon = pokeDataBase.pokemon;
app.use(morgan('dev'));

//---------------------------------callback functions
function handlePokeName(req,res){
  const name = req.query.name;
  const filteredPoke = allPokemon.filter(poke=> poke.name.toLowerCase().includes(name.toLowerCase()))
  if(!filteredPoke.length){
    return res.status(400).send(`👎🏻 looks like "${name}" does not match any letters in our pokemons' names 🤷🏻‍ `)
  }
  res.status(200).json(filteredPoke);
}

function handlePokeType(req,res){
  const type = req.query.type
  const filteredPoke = allPokemon.filter(poke => poke.type.includes(type));
  console.log(filteredPoke.length);
  if(!filteredPoke.length){
    return (
      res.status(400).send(`👎🏻 looks like "${type}" does not match any pokemon 🤷🏻‍ `)
    )
  } 
  else {
    res.status(200).json(filteredPoke);

  }

}
//-----------------------------------callback functions

app.get('/pokemon', (req,res)=>{

  if(req.query.name){
    handlePokeName(req,res);
  }
  else if(req.query.type){
    handlePokeType(req,res)
  }
  else if(!req.query.name || ! req.query.type){
    res.status(200).send(`Welcome to the pokemon Api    ϞϞ(๑⚈ ․̫ ⚈๑)∩

              Search pokemon by name or by type. 
              Valid types are: 'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychich', 'Rock', 'Steel', 'Water'` 
              );
  }


  

})

app.get('/pokemon/database',(req, res)=>{
  res.status(200).json(allPokemon);
})


const PORT = 8000;
app.listen(PORT, ()=> {
  console.log(`Server is listening to PORT ${PORT}`);
})