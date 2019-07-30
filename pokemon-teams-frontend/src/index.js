const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(response => response.json())
.then(trainers => trainers.forEach( function(trainer) {
  makeTrainerCard(trainer)
}))

function makeTrainerCard(json) {

  // get main document
  let main = document.getElementById("main")

  // create card element
  let div = document.createElement("div")
  div.className = "card "
  div.setAttribute("data-id", json.id)

  // create p element for trainer name
  let p = document.createElement("p")
  p.textContent = json.name
  div.appendChild(p)

  // create button to add pokemon
  let button = document.createElement("button")
  button.textContent = "Add Pokemon"
  button.setAttribute("data-trainer-id", json.id)
  button.addEventListener('click', ()=> {
    // console.log("add pokemon button clicked")
    if (getTrainerPokeCount(json.id) <= 6) {
      //add pokemon
      fetchPokemon(json.id)
    }
    else {
      // alert that trainer cannot have more than 6 pokemons
      alert(`Trainer ${json.name} cannot have more than 6 pokemons`)
    }
  })
  div.appendChild(button)
  // create pokemon list
  let list = createPokemonList(json)

  div.appendChild(list)
  main.appendChild(div)
}

function getTrainerPokeCount(id) {
  let card = document.querySelector(`[data-id='${id}']`)
  return card.children[2].childElementCount
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
  // console.log(pokedeets)
  let li = document.createElement("li")
  li.textContent = pokedeets.nickname + ' (' + pokedeets.species + ')'
  let button = document.createElement("button")
  button.textContent = "Release"
  button.className = "release"
  button.hasAttribute = "data-pokemon-id"
  button.setAttribute("data-pokemon-id", pokedeets.id)
  button.addEventListener("click", () => {
    removePokemon(pokedeets.trainer_id, pokedeets.id)
  })
  li.appendChild(button)
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
  .then(li => addLiToList(li, id))
}

function addLiToList(li, id) {
  let card = document.querySelector(`[data-id='${id}']`)
  let list = card.children[2]
  list.appendChild(li)
  return card
}

function removePokemon(trainerId, pokeId) {
  let card = document.querySelector(`[data-id='${trainerId}']`)
  document.querySelector(`[data-pokemon-id='${pokeId}']`).parentNode.remove()
  fetch(`${POKEMONS_URL}/${pokeId}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  return card
}
