<script setup>
import { ref, inject } from 'vue'
// import  initialPokes  from '../components/SimpleCard.vue'
//-------------------PROPS DEFINIDES-----------------------
//const props = defineProps(['stats'])
const props = defineProps(['initials'])
const pokeName = ref('tontosaur')
const id = ref(3)
const type = ref('grass')
const attack = ref(34)
const defense = ref(65)
const front = ref('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png')
const back = ref('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png')
const frontShiny = ref('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png')
const backShiny = ref('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/3.png')
//---------------------LOG DELS PROPS, SURT UNDEFINED------------------
console.log(props);
console.log(props.initials)
// console.log(initialPokes);

const pokesInfo = inject('allPokes');
console.log(pokesInfo)
</script>

<template>
    <section>
        <div id="portraitsBox">
            <img v-bind:src="front">
            <img v-bind:src="back">
            <img v-bind:src="frontShiny">
            <img v-bind:src="backShiny">
        </div>
        <div id="statsBox">
            <p>name: <span><br>{{ pokeName }}</span></p>
            <p>id:<span><br>#{{ id }}</span></p>
            <p>type: <span><br>{{ type }}</span></p>
            <p>attack <span><br>{{ attack }}</span></p>
            <p>defense <span><br>{{ defense }}</span></p>
        </div>
    </section>
</template>

<style scoped>
section {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr;
    height: 600px;
    width: 1000px;
    border: 8px double rgb(104, 107, 96);
    padding: 20px;
}

#portraitsBox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}

img {
    align-self: center;
    justify-self: center;
    width: 300px;
    height: auto;
    filter: grayscale(70%);
    opacity: 80%;
}

#statsBox {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
}

p {
    font-size: 24px;
    color: var(--GBCtext);
}

span {
    color: var(--GBCboldText);
}
</style>
