const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementById('main')
let trainerData

// GET AND RENDER TRAINERS
function getTrainers() {
  fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(data => {
      trainerData = data
      renderCards(data)
    })
}

// ADD POKEMON
function addPokemon(id) {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "trainer_id": id
    })
  })
  .then(res => res.json())
  .then(
    pokemon => {
      rerender()
    }
  )
}

// DELETE POKEMON
function deletePokemon(id) {
  fetch(POKEMONS_URL + '/' + id, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then( res => {
    rerender()
  })
}

function rerender() {
  // Delete cards
  while (main.firstChild)
    main.firstChild.remove()

  // Render cards with updated data
  getTrainers()
}

function createPokemon(pokemon) {
  li = document.createElement('li')
  li.textContent = `${pokemon.nickname} (${pokemon.species})`

  button = document.createElement('button')
  button.textContent = 'Release'
  button.classList.add('release')
  button.addEventListener('click', () => {
    deletePokemon(pokemon.id)
  })

  li.appendChild(button)
  return li
}

function renderCards(data) {
  data.forEach(trainer => {
    main.appendChild(createTrainer(trainer))
  })
}

function createTrainer(trainer) {
  card = document.createElement('div')
  card.classList.add("card")
  card.setAttribute('data-id', trainer.id)

  add = document.createElement('button')
  add.textContent = 'Add Pokemon'
  add.setAttribute('data-trainer-id', trainer.id)
  add.addEventListener('click', () => {
    addPokemon(trainer.id)
  })
  
  p = document.createElement('p')
  p.textContent = trainer.name

  ul = document.createElement('ul')

  trainer.pokemons.forEach(pokemon => {
    ul.appendChild(createPokemon(pokemon))
  })

  card.appendChild(p)
  card.appendChild(add)
  card.appendChild(ul)

  return card
}

getTrainers()

