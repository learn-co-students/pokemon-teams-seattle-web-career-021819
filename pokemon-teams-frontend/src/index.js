const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(data => {
  renderTrainers(data)
})

function renderTrainers(trainers) {
const main = document.querySelector("main")

  trainers.forEach(trainer => {
    let div = document.createElement("div")
    div.classList.add("card")
    div.id = trainer.id

    let p = document.createElement("p")
    p.textContent = trainer.name;

    let ul = renderPokemon(trainer.pokemons)

    main.appendChild(div)
    div.appendChild(p)
    div.appendChild(addGreenButton(trainer.id))
    div.appendChild(ul)
  })
}

function renderPokemon(pokemons){
  let ul = document.createElement("ul")
  pokemons.forEach(pokemon => {
    let li = document.createElement('li')
    li.textContent = `${pokemon.nickname} (${pokemon.species})`
    li.appendChild(addRedButton(pokemon.id))
    ul.appendChild(li)
  })
  return ul
}

function addRedButton(id) {
  let button = document.createElement("button")
  button.classList.add("release")
  button.textContent = "Release"

  let config = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({'pokemon_id': id})
  }

  let url = POKEMONS_URL + '/' + id;

  button.addEventListener("click", () => {
    fetch(url, config)
    .then(res => res.json())
    .then(data => console.log(data))
    button.parentNode.remove()
  })

  return button
}

function addGreenButton(id) {
  let button = document.createElement("button");
  button.textContent = "Add Pokemon";

  let config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({'trainer_id': id})
  }

  button.addEventListener("click", () => {
    fetch(POKEMONS_URL, config)
    .then(res => res.json())
    .then(data => {
      renderNewPokemon(data)
    })

  })
  return button;
}

function renderNewPokemon(pokemon){
  let div = document.getElementById(pokemon.trainer_id)
  let ul = div.querySelector('ul')
  let li = document.createElement('li')
  ul.appendChild(li)
  li.textContent = `${pokemon.nickname} (${pokemon.species})`
  li.appendChild(addRedButton(pokemon.id))
}
