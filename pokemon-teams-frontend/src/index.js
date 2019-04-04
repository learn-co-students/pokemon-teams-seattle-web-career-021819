const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


fetch(TRAINERS_URL)
.then(response => response.json())
.then(json => renderTrainers(json) )

function renderTrainers (trainers) {
    let main=document.querySelector('main')
    trainers.forEach(trainer => {
        let d=document.createElement('div')
        d.classList.add('card')
        let p=document.createElement('p')
        p.textContent=trainer.name;
        d.appendChild(p)
        d.appendChild(addGreenButton(trainer.id))
        let list=renderPokemon(trainer.pokemons)
        list.id=trainer.id
        d.appendChild(list)
        main.appendChild(d)
    })
}

function renderPokemon(pokemon) {
    let list=document.createElement('ul')
    pokemon.forEach(pokemon => {
        let li=document.createElement('li')
        li.textContent= pokemon.nickname+ " (" + pokemon.species + ")"
        li.appendChild(addRedButton(pokemon.id))
        list.appendChild(li)
    })
    return list;
}

function renderNewPokemon(pokemon) {
    let list= document.getElementById(pokemon.trainer_id)
    let li=document.createElement('li')
    li.textContent= pokemon.nickname + " (" + pokemon.species + ")"
    li.appendChild(addRedButton(pokemon.id))
    list.appendChild(li)
    
}

function addGreenButton (id){
    let button=document.createElement('button')
    button.textContent='Add Pokemon'

    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"trainer_id": id})
    }

    button.addEventListener('click', ()=>{
        fetch(POKEMONS_URL, config)
        .then(resp=>resp.json())
        .then(data => {
            renderNewPokemon(data)
        })

    })

    return button;

}

function addRedButton(id){
    let config = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"pokemon_id": id})
    }
    let button=document.createElement('button')
    button.textContent='release'
    button.classList.add('release')

    button.addEventListener('click', ()=>{
        fetch(POKEMONS_URL+'/'+id, config)
        .then(resp=>resp.json())
        .then(data => {
            console.log(data)
        })
        button.parentNode.remove()

    })

    return button;
}
