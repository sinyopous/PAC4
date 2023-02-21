<script setup>
import GetRandomPoke from '../components/GetRandomPoke.vue'
import SimpleCard from '../components/SimpleCard.vue'
import { arrayPokes, allPokesIndex } from '../utilities/utilities'
import pokeApi from '../services/apiServices';
import { ref } from 'vue'


//--------------------------INITIAL FETCH AND PRINT OF 10 RANDOM POKES-----------------------------

const fetchedPokes = ref([]);

pokeApi.getPokes().then(poke => {
  let pokeList = poke.data.results
  // console.dir(pokeList);
  arrayPokes.forEach(pokeIndex => {
    fetch(pokeList[pokeIndex - 1].url)
      .then(y => y.json().then(z => {
        // console.dir(z);
        if (z.types[1]) {
          fetchedPokes.value.push(
            {
              name: z.name,
              id: z.id,
              attack: z.stats[1].base_stat,
              defense: z.stats[2].base_stat,
              type1: z.types[0].type.name,
              type2: z.types[1].type.name,
              front: z.sprites.front_default,
              back: z.sprites.back_default,
              frontShiny: z.sprites.front_shiny,
              backShiny: z.sprites.back_shiny,
              index: pokeIndex
            }
          )
        } else {
          fetchedPokes.value.push(
            {
              name: z.name,
              id: z.id,
              attack: z.stats[1].base_stat,
              defense: z.stats[2].base_stat,
              type1: z.types[0].type.name,
              type2: '',
              front: z.sprites.front_default,
              back: z.sprites.back_default,
              frontShiny: z.sprites.front_shiny,
              backShiny: z.sprites.back_shiny,
              index: pokeIndex
            }
          )
        }
      }))
  })
})

//----------SECOND FETCH (0.4 SEC BEFORE LOAD) OF ALL POKES (TO HAVE THEM IN MEMORY)----------------

const allPokesData = ref([])

const FetchAllPokes = (() => {
  pokeApi.getPokes().then(poke => {

    let pokeList = poke.data.results
    console.dir(pokeList);

    allPokesIndex.forEach(pokeIndex => {
      fetch(pokeList[pokeIndex - 1].url)
        .then(y => y.json().then(z => {
          // console.dir(z);
          if (z.types[1]) {
            allPokesData.value.push(
              {
                name: z.name,
                id: z.id,
                attack: z.stats[1].base_stat,
                defense: z.stats[2].base_stat,
                type1: z.types[0].type.name,
                type2: z.types[1].type.name,
                front: z.sprites.front_default,
                back: z.sprites.back_default,
                frontShiny: z.sprites.front_shiny,
                backShiny: z.sprites.back_shiny,
                index: pokeIndex
              }
            )
          } else {
            allPokesData.value.push(
              {
                name: z.name,
                id: z.id,
                attack: z.stats[1].base_stat,
                defense: z.stats[2].base_stat,
                type1: z.types[0].type.name,
                type2: '',
                front: z.sprites.front_default,
                back: z.sprites.back_default,
                frontShiny: z.sprites.front_shiny,
                backShiny: z.sprites.back_shiny,
                index: pokeIndex
              }
            )
          }
        }))
    })
  })

})

setTimeout(FetchAllPokes, 400);

//------------------------------GET LUCKY FUNCTIONS------------------------------------------
let arrayToShow = ref([]);

const logdata = () => console.log(arrayToShow.value);



</script>

<template>
  <div class="box">
    <section>
      <SimpleCard v-for="pokemon in fetchedPokes" v-bind:key="pokemon.id" :info="pokemon" />
    </section>
    <div v-on:click="logdata">
      <GetRandomPoke v-on:emitArray="(array) => arrayToShow = array" />
    </div>
</div>
</template>

<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
</style>

