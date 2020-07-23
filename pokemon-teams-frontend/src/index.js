const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(data => {
    renderTrainers(data)
  })

  function renderTrainers(trainers){
    let main = document.querySelector('main')
    trainers.forEach(trainer => {
      let div = document.createElement('div')
      let p = document.createElement('p')
      p.textContent = trainer.name
      div.appendChild(p)
      div.appendChild(addPokemonButton(trainer.id))
      let list = renderPokemon(trainer.pokemons)
      list.id = trainer.id
      div.appendChild(list)
      div.classList = 'card'
      main.appendChild(div)
    })
  }

  function renderPokemon(pokemons){
    let ul = document.createElement('ul')
    pokemons.forEach(pokemon => {
      let li = document.createElement('li')
      li.textContent = `${pokemon.nickname} (${pokemon.species})`
      li.appendChild(releasePokemonButton(pokemon.id))
      ul.appendChild(li)
    })
    return ul
  }

  function releasePokemonButton(id){
    let button = document.createElement('button')
    button.classList = 'release'
    button.textContent = "release"

    let config = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"pokemon_id": id})
    }
    let url = POKEMONS_URL + '/' + id
    button.addEventListener('click', () => {
      fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
      })
      button.parentNode.remove()
    })
    return button
  }

  function addPokemonButton(id){
    let button = document.createElement('button')
    button.textContent = 'Add Pokemon'

    let config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"trainer_id": id})
    }
    button.addEventListener('click', () => {
      fetch(POKEMONS_URL, config)
      .then(resp => resp.json())
      .then(data => {
        renderNewPokemon(data)
      })
    })
    return button
  }

  function renderNewPokemon(data){
    let list = document.getElementById(data.trainer_id)
    let li = document.createElement('li')
    li.textContent = `${data.nickname} (${data.species})`
    li.appendChild(releasePokemonButton())
    list.appendChild(li)

  }
