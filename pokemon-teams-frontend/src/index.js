const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers() {
  fetch (TRAINERS_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      getTrainers(data)
    })
}

function getTrainers(data) {
  data.forEach(function(trainer) {
    console.log(trainer);
    createCards(trainer);
  })
}

function createCards(trainer) {
  // declare variables
  const main = document.getElementsByTagName('main')[0]
  const {name, pokemons} = trainer;
  const trainerId = trainer.id;


  // create card
  let card = document.createElement('div')
  card.classList.add('card')
  card.dataset.id = trainerId
  main.appendChild(card)


  // add trainer name
  let p = document.createElement('p')
  p.innerText = name
  card.appendChild(p)


  // add "Add Pokemon" button
  let addButton = document.createElement('button')
  addButton.dataset.trainerId = trainerId
  addButton.innerText = "Add Pokemon"

  let config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"trainer_id": trainerId})
  }

  addButton.addEventListener('click', () => {
    fetch(POKEMONS_URL, config)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // need an if - check # of pokemon
        console.log('data.error is:', data.error)
        if (data.error != "Party is Full!") {addPokemonLi(data, trainerId)}
      })
  })

  card.appendChild(addButton)


  // create ul ()
  let ul = document.createElement('ul')
  ul.dataset.listTrainerId = trainerId
  card.appendChild(ul)


  // create a new li for a pokemon
  function addPokemonLi(pokemon, trainerId) {
    console.log('trainer id:', trainerId)

    let {id, nickname, species} = pokemon
    // let cardId = trainerId
    let li = document.createElement('li')
    li.innerText = `${nickname} (${species}) `

    // add release button to li
    let releaseButton = document.createElement('button')
    releaseButton.classList.add('release')
    releaseButton.dataset.pokemonId = id
    releaseButton.innerText = "Release"
    releaseButton.addEventListener('click', () => {
      li.parentNode.removeChild(li)
      fetch(POKEMONS_URL + `/${id}`, {method: 'DELETE'})
        .then(res => res.json())
        .then(data => {
          console.log("deleted pokemon:", data)
        })
    })
    li.appendChild(releaseButton)

    let ul = document.querySelector(`[data-list-trainer-id='${trainerId}']`)
    ul.appendChild(li)
  }

  // upon page loading, add new li's for each of trainer's current pokemon
  pokemons.forEach( (pokemon) => { addPokemonLi(pokemon, trainerId) } );

}


fetchTrainers()
