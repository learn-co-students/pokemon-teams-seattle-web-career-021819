const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(response => response.json())
.then(trainers => trainers.forEach( function(trainer) {
  makeTrainerCard(trainer)
}))

function makeTrainerCard(json) {

  // add
  let main = document.getElementById("main")
  let div = document.createElement("div")
  div.className = "card"
  let p = document.createElement("p")
  p.textContent = json.name
  div.appendChild(p)
  let button = document.createElement("button")
  button.textContent = "Add Pokemon"
  button.hasAttribute = "data-trainer-id"
  button.setAttribute("data-trainer-id", json.id)
  button.addEventListener('click', ()=> {
    if (json.pokemons.length <= 6) {
      // add pokemon
      fetchPokemon(json.id)
    }
    else {
      // alert that trainer cannot have more than 6 pokemons
      alert(`Trainer ${json.name} cannot have more than 6 pokeon`)
    }
  })
  div.appendChild(button)
  // create pokemon list
  let list = createPokemonList(json)

  div.appendChild(list)
  main.appendChild(div)
}

function createPokemonList(json) {
  let ul = document.createElement("ul")
  json.pokemons.forEach(function(poke) {
    let li = createPokemon(poke)
    ul.appendChild(li)
  })
  return ul
}

function createPokemon(pokedeets) {
  let li = document.createElement("li")
  li.textContent = pokedeets.nickname + ' (' + pokedeets.species + ')'
  let button = document.createElement("button")
  button.textContent = "Release"
  button.className = "release"
  button.hasAttribute = "data-pokemon-id"
  button.setAttribute("data-pokemon-id", pokedeets.id)
  li.appendChild(button)
  let ul = li.getElementsByTagName('ul')
  console.log(ul)
  return li
}

function fetchPokemon(id) {

  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({trainer_id: id})
  }

  fetch(POKEMONS_URL, config)
  .then(response => response.json())
  .then(pokemon => createPokemon(pokemon))
}
