const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementById('main')

function fetchTrainers(url) {
  fetch(url)
  .then(res => res.json())
  .then(json => renderTrainers(json))
}

function renderTrainers(data){
  data.forEach(trainer => {
    let div = document.createElement('div')
    let p = document.createElement('p')
    let addPokemonButton = document.createElement('button')
    let ul = document.createElement('ul')

    div.classList.add("card")
    div.hasAttribute("id")
    div.setAttribute("id", trainer.id)
    p.textContent = trainer.name

    addPokemonButton.addEventListener('click', () => {
      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({trainer_id: trainer.id})
      }).then(res => res.json()).then(pokemon => addPokemon(trainer, pokemon))
    })

    addPokemonButton.textContent = "Add Pokemon"
    main.appendChild(div)
    div.appendChild(p)
    div.appendChild(addPokemonButton)
    div.appendChild(ul)
    addPokemons(trainer)
  })

function addPokemon(trainer, pokemon){
  console.log(pokemon)
  if (pokemon.id instanceof Number ){

  }else{
  let div = document.getElementById(`${trainer.id}`)
  let ul = div.getElementsByTagName('ul')
  let li = document.createElement('li')
  let button = document.createElement('button')
    button.textContent = "Release"
    button.classList.add("delete-button")
    button.addEventListener('click', () => {
    fetch(POKEMONS_URL + `/${pokemon.id}`, {
      method: 'DELETE'
      })
      li.classList.add("hidden")
    })
    li.textContent = `${pokemon.nickname}`+ " " + `(${pokemon.species})`
    li.hasAttribute("pokemon-id")
    li.setAttribute("pokemon-id", pokemon.id)
    li.appendChild(button)
    ul[0].appendChild(li)
  }}

function addPokemons(trainer){
  trainer.pokemons.forEach(pokemon => {
    let div = document.getElementById(`${trainer.id}`)
    let ul = div.getElementsByTagName('ul')
    let li = document.createElement('li')
    let button = document.createElement('button')
      button.textContent = "Release"
      button.classList.add("delete-button")
      button.addEventListener('click', () => {
      fetch(POKEMONS_URL + `/${pokemon.id}`, {
        method: 'DELETE'
        })
        li.classList.add("hidden")
      })

      li.textContent = `${pokemon.nickname}`+ " " + `(${pokemon.species})`
      li.hasAttribute("pokemon-id")
      li.setAttribute("pokemon-id", pokemon.id)
      li.appendChild(button)
      ul[0].appendChild(li)
    })
  }
}

fetchTrainers(TRAINERS_URL)
