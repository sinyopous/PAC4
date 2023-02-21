<script setup>
import SimpleCardLucky from '../components/SimpleCard.vue'
import GetRandomPoke from '../components/GetRandomPoke.vue'
import pokeApi from '../services/apiServices';
import { ref, onMounted } from 'vue';
import { arrayPokes } from '../utilities/utilities'
const props = defineProps(['pokesData'])


const dittoFront = ref('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png')
const fetchedPokes = ref([]);

//----------------NECESITO: ARRAY TO FETCH DESDE GETRANDOMPOKE------------------------------

//console.log(arrayDePokesAFetchear);


let arrayToShow = ref([]);

const logdata = () => console.log(arrayToShow.value);


console.log(props)




</script>

//V-FOR DE ALLPOKESDATA KE REBO DE APP


<template>
    <section v-on:click="logdata">
        <SimpleCardLucky v-for="pokemon in pokemoninfoarray" v-bind:key="pokemon.id" :info="pokemon" />
        <GetRandomPoke v-on:emitArray="(array) => arrayToShow = array" />
           <p>as {{ props.pokesData }}</p> 
</section>
</template>

<style scoped>
section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
</style>