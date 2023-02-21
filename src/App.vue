<script setup>
import { RouterView } from 'vue-router'
import Return from './components/ReturnButton.vue'
import GetRandomPoke from './components/GetRandomPoke.vue'
import SimpleCard from './components/SimpleCard.vue'
import { arrayPokes, allPokesIndex } from './utilities/utilities'
import pokeApi from './services/apiServices';
import { ref, watch } from 'vue'
import SimpleCardLucky from './components/SimpleCardLucky.vue'
import router from './router'
import ThemeButton from './components/SwapThemeButton.vue'

const dittoFront = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"

//--------------------------INITIAL FETCH AND PRINT OF 10 RANDOM POKES-----------------------------



const fetchedPokes = ref([]);

pokeApi.getPokes().then(poke => {
  let pokeList = poke.data.results
  // console.dir(pokeList);
  arrayPokes.forEach(pokeIndex => {
    fetch(pokeList[pokeIndex - 1].url)
      .then(y => y.json().then(z => {
        // console.dir(z);

        fetchedPokes.value.push(
          {
            name: z.name,
            front: z.sprites.front_default || dittoFront,
            index: pokeIndex,
            id: z.id
          }
        )
      }))
  })
})

//----------SECOND FETCH (0.4 SEC BEFORE LOAD) OF ALL POKES (TO HAVE THEM IN MEMORY)----------------

const allPokesData = ref([])

const fetchAllPokes = (() => {
  pokeApi.getPokes().then(poke => {

    let pokeList = poke.data.results
    console.dir(pokeList);

    allPokesIndex.forEach(pokeIndex => {
      fetch(pokeList[pokeIndex - 1].url)
        .then(y => y.json().then(z => {
          // console.dir(z);

          allPokesData.value.push(
            {
              name: z.name,
              front: z.sprites.front_default || dittoFront,
              index: pokeIndex,
              id: z.id
            }
          )

          if (pokeIndex === 1279) {

            allPokesFetched.value = true;
            console.log('ALL POKES FETCHED! :D')

          }
        }))
    })

  })


})




// setTimeout(fetchAllPokes, 400);
fetchAllPokes();





//-------------------------------SCREEN WHERE I AM-------------------------------------------
const tenPokeScreen = ref(true);
const luckyScreen = ref(false);
const detailsScreen = ref(false);
const searchScreen = ref(false);
const deepnes = ref(0);
//------------------------------GET LUCKY FUNCTIONS------------------------------------------
let arrayToShow = ref([]);



//-----------------------------RETURN BUTTON FUNCIONALITIES----------------------------------
const returnClick = () => {

  if (detailsScreen.value) {
    router.go(-1);
  }

  if (deepnes.value === 1) {
    detailsScreen.value = false;
    tenPokeScreen.value = true;
    luckyScreen.value = false;
    searchScreen.value = false;
  }

  if (deepnes.value === 2) {
    detailsScreen.value = false;
    tenPokeScreen.value = false;
    luckyScreen.value = true;
    searchScreen.value = false;

  }

  if (deepnes.value === 3) {
    detailsScreen.value = false;
    tenPokeScreen.value = true;
    luckyScreen.value = false;
    searchScreen.value = false;
    deepnes.value--;
    deepnes.value--;
    pokeToSearch.value = '';
  }

  if (deepnes.value === 4) {
    detailsScreen.value = false;
    tenPokeScreen.value = false;
    luckyScreen.value = false;
    searchScreen.value = true;
  }

  if (deepnes.value > 0) {
    deepnes.value--;
  }

  console.log(deepnes.value)
  console.log(detailsScreen.value)
  console.log(scrollPosition)
  setTimeout(returnToSavedPosition, 100)

  if (deepnes.value === 0) {
    setTimeout(centerScroll, 200);
  }

}


//-----------------------------CLICK ON POKEMON---------------------------------------------
const pokeClick = () => {
  detailsScreen.value = true;
  luckyScreen.value = false;
  tenPokeScreen.value = false;
  searchScreen.value = false;
  if (deepnes.value <= 3) {
    deepnes.value++;
  }
  console.log(deepnes.value)
  console.log(detailsScreen.value)

  scrollPosition = window.scrollY
  console.log(scrollPosition)
  centerScroll();
}

//---------------------------CLICK ON GET LUCKY(GET RANDOM POKE)-----------------------------

const luckyClick = () => {
  luckyScreen.value = true;
  tenPokeScreen.value = false;
  if (deepnes.value < 1) {
    deepnes.value++;
  }
  console.log(deepnes.value)
}

//---------------------------------POKESEARCHBAR---------------------------------------------

const pokeToSearch = ref('')
const searchInput = () => {

  centerScroll();
  pokeToSearch.value = pokeToSearch.value.toLowerCase()
  if (pokeToSearch.value) {
    luckyScreen.value = false;
    tenPokeScreen.value = false;
    searchScreen.value = true;
    deepnes.value = 3;
  } else {
    luckyScreen.value = false;
    tenPokeScreen.value = true;
    searchScreen.value = false;
    deepnes.value = 0;
  }
  console.log(deepnes.value)

}

//----------------------------------SCROLL SAVE--------------------------------------------

let scrollPosition = 0;
const centerScroll = () => {
  window.scrollTo(0, 106);
}

const returnToSavedPosition = () => {
  window.scrollTo(0, scrollPosition);
}

setTimeout(centerScroll, 100)

//--------------------------------LOADING SCREEN--------------------------------------------
const allPokesFetched = ref(false);
const sortPokes = () => {
  allPokesData.value.sort((a, b) => a.id - b.id)
  console.log('all pokes sorted')
}
watch(allPokesFetched, sortPokes)




const catchEmAll = ref("catching'em all")
let numberOfDots = 0;
const loadingAnimation = () => {

  if (numberOfDots < 3) {
    numberOfDots++;

    catchEmAll.value += '.'
  } else {
    catchEmAll.value = "catching'em all"
    numberOfDots = 0;
  }
  console.log(numberOfDots)
}
const stopAnimation = () => {
  clearInterval(runAnimation)
}

const runAnimation = setInterval(loadingAnimation, 1000)
watch(allPokesFetched, stopAnimation)

//------------------------------------THEME SWAP-------------------------------------------

const theme = ref('color')
const printTheme = ()=> console.log(theme.value)




</script>




<template>
  <section id="gameboyBody" :class="theme">
    <section id="gameboyScreenBorder" :class="theme">
      <img id="redDot" src="./assets/redDot.png" alt="">
      <div id="gameboyScreen" :class="theme">

        <ThemeButton v-if="allPokesFetched"
        @emitTheme="(theTheme) => {theme = theTheme; printTheme()}"/>

        <Return v-on:click="returnClick" v-if="allPokesFetched" />

        <h1 v-if="!allPokesFetched">{{ catchEmAll }}</h1>

        <div v-show="allPokesFetched" id="loadedContent">



          <div v-show="tenPokeScreen" class="box">
            <section id="simpleCardBox">
              <SimpleCard v-for="pokemon in fetchedPokes" v-bind:key="pokemon.id" :info="pokemon"
                v-on:click="pokeClick" />
            </section>
          </div>


          <div v-show="tenPokeScreen || searchScreen" id="pokeSearchBar">
            <label for="pokeInput">pokesearch </label>
            <input id="pokeInput" type="text" placeholder="&nbsp;pokachu?" v-model="pokeToSearch"
              v-on:input="searchInput">
          </div>


          <div v-show="tenPokeScreen || luckyScreen">
            <GetRandomPoke v-on:emitArray="(array) => { arrayToShow = array; luckyClick() }" />
          </div>


          <div v-show="luckyScreen || searchScreen" id="luckyBox">
            <SimpleCardLucky v-for="pokemon in allPokesData" v-bind:key="pokemon.id" :info="pokemon"
              :pokeArray="arrayToShow" v-on:click="pokeClick" :pokeToSearch="pokeToSearch" :luckyScreen="luckyScreen"
              :searchScreen="searchScreen" />
          </div>


          <RouterView v-show="detailsScreen" />

        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
#gameboyBody {
  background-color: var(--GBCbody);
  padding: 8px;
}

#gameboyBody.brick {
  background-color: var(--GBBbody);
}

#gameboyScreenBorder {
  background-color: var(--GBCborder);
  border: solid 3px var(--GBCborderShadow);
  border-radius: 30px;
  padding: 20px 0;
  filter: blur(0.8px);
}

#gameboyScreenBorder.brick {
  background-color: var(--GBBborder);
  border: solid 3px var(--GBBborderShadow);
}

#redDot {
  height: 60px;
  position: absolute;
  top: 320px;
  left: 30px;
}

#gameboyScreen {
  position: relative;
  background-color: var(--GBCscreen);
  max-width: 1550px;
  min-height: 850px;
  margin: 100px auto;
  border-radius: 5px;
  border: 5px var(--GBCscreenShadow) solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* padding: 50px 0; */
}

#gameboyScreen.brick {
  background-color: var(--GBBscreen);
  border: 5px var(--GBBscreenShadow) solid;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

#simpleCardBox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

#luckyBox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

#pokeSearchBar {
  margin-top: 100px;
  color: var(--GBCtext)
}

::placeholder {
  color: rgb(197, 202, 186);
}

#pokeInput {
  background-color: rgb(232, 233, 226);
  border: 1px solid rgb(144, 145, 116);
  color: var(--GBCtext);
}

#pokeInput:active {
  border: 1px solid rgb(144, 145, 116);
}

h1 {
  color: var(--GBCtext);
}

#loadedContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 50px 0;
}
</style>
