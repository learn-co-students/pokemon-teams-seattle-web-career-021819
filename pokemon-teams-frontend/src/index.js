const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL).then(resp => resp.json()).then(data =>
{
  renderTrainers(data)
})

function renderTrainers(trainers){
  let main = document.querySelector('main');
  trainers.forEach(trainer => {
    let div = document.createElement('div');
    div.classList.add("card");
    div.setAttribute("data-id", trainer.id);
    let p = document.createElement('p');
    p.textContent = trainer.name;
    let ul = renderPokemon(trainer.pokemons);
    ul.id=trainer.id;
    div.appendChild(p);
    div.appendChild(addGreenButton(trainer.id));
    div.appendChild(ul);
    main.appendChild(div);
  })
}

function renderPokemon(pokemons){
  let ul = document.createElement('ul');
  pokemons.forEach(pokemon => {
    let li = document.createElement('li');
    li.textContent = `${pokemon.nickname} (${pokemon.species})`
    li.appendChild(addRedButton(pokemon.id))
    ul.appendChild(li);
  })
  return ul
}

function renderNewPokemon(pokemon){
  let list = document.getElementById(pokemon.trainer_id)
  let li = document.createElement('li');
  li.textContent = `${pokemon.nickname} (${pokemon.species})`
  li.appendChild(addRedButton(pokemon.id))
  list.appendChild(li);
}



function addRedButton(id){
  let button = document.createElement('button');
  button.classList.add("release");
  button.textContent = 'Release';

  let config = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"pokemon_id": id})
  }

  let url = POKEMONS_URL + '/' + id
  button.addEventListener('click', () => {
    fetch(url, config).then(res => res.json()).then(data => console.log(data))
    button.parentNode.remove()
  })

  return button
}


function addGreenButton(id) {
  let button = document.createElement('button');
  button.textContent = 'Add Pokemon';

  let config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"trainer_id": id})
  }

  button.addEventListener('click', () => {
  fetch(POKEMONS_URL, config).then(res => res.json()).then(data => renderNewPokemon(data))
  })
  return button;
}
