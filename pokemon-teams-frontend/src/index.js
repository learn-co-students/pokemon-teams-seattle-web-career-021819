const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementById('main')
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(json => {getTrainers(json)})

  const getTrainers = (trainers) => {
    trainers.forEach(trainer => {

      const p = document.createElement('p')
      const div = document.createElement('div')
      const ul = document.createElement('ul')
      const button = document.createElement('button')


      let name = trainer.name
      let id = trainer.id
      ul.setAttribute('id', id)

      button.innerText = 'Add Pokemon'
      button.addEventListener('click', (ev) => {
        ev.preventDefault();
        fetchPokemon(id);
      })
      div.classList.add('card')

      p.textContent = name

      main.appendChild(div)
      div.appendChild(p)
      div.appendChild(button)
      div.appendChild(ul)

      let pokemons = trainer.pokemons

      pokemons.forEach(pokemon => {
        renderPokemon(pokemon)
      })

    })
  }

function renderPokemon(pokemon){
  const deleteB = document.createElement('button')
  const name = pokemon.nickname;
  const species = pokemon.species;
  const trainerId = pokemon.trainer_id
  const parent = document.getElementById(`${pokemon.trainer_id}`)
  const li = document.createElement('li');
  const pokeId = pokemon.id
  li.textContent = `${name} (${species})`
  parent.appendChild(li)
  li.appendChild(deleteB)
  li.id = pokeId
  deleteB.classList.add('release')
  deleteB.innerText = 'Release'
  deleteB.addEventListener('click', (ev) => {
    ev.preventDefault;
    deletePokemon(pokeId);
  })
}

function fetchPokemon(trainerId){
  fetch (POKEMONS_URL, buildConfig(trainerId))
    .then(response => response.json())
    .then(data => renderPokemon(data))
}

function deletePokemon(id) {
  fetch(POKEMONS_URL + '/' + id, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(
    pokemon => {
      removePokemonLi(pokemon)
    }
  )
}

function removePokemonLi(pokemon) {
  let liPoke = document.getElementById(`${pokemon.id}`)
  liPoke.remove()
}
function buildConfig(trainerId){
  let config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({"trainer_id": trainerId})
     }
  return config
}
