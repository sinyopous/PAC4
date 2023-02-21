<script setup>
import NumSelector from './NumSelector.vue'
import { ref } from 'vue'
import { getRandomNumArray, totalNumOfPokemon } from '../utilities/utilities'
const emit = defineEmits(['emitArray'])
const props = defineProps(['theTheme'])


//-------------------GENERAR ARRAY DE POKEINDEX SEGONS INPUT I ENVIARLA CAP AL PARENT-------------------

const numOfPokesToSearch = ref(6);



let arrayToFetch = ref([]); //-----------ARRAT TO EMIT


const getArrayToFetch = () => {
    arrayToFetch.value = getRandomNumArray(numOfPokesToSearch.value, totalNumOfPokemon)
    console.dir(arrayToFetch.value)
}

const numPlusPokes = () => {
    if (numOfPokesToSearch.value < totalNumOfPokemon) { numOfPokesToSearch.value++ };
}
const numMinusPokes = () => {
    if (numOfPokesToSearch.value > 1) {
        numOfPokesToSearch.value--
    };
}



//-------------------------------------------SHOW ALL BUTTON------------------------------------------
const notShowAll = ref(false);
const showPokes = ref('not show all')
const savedNumOfPokes = ref()

const showToggle = () => {
    if (notShowAll.value) {
        showPokes.value = 'show all'
        savedNumOfPokes.value = numOfPokesToSearch.value
        numOfPokesToSearch.value = 1279
        

    } else if (!notShowAll.value) {
        showPokes.value = 'not show all'
        numOfPokesToSearch.value = savedNumOfPokes.value
    }
    console.log(notShowAll.value)
}

</script>

<template>
    <section >
        <div>
            <p 
            :class="props.theTheme">or get</p>
        </div>
        <NumSelector id="numSelector" v-on:numPlus="numPlusPokes" v-on:numMinus="numMinusPokes" v-show="!notShowAll"/>
        <div>
            <p
            :class="props.theTheme">&nbsp;random pokemon</p>
        </div>
        <div v-on:click="$emit('emitArray', arrayToFetch)">
            <p 
            :class="props.theTheme"
            id="luckyButton"  v-on:click="getArrayToFetch" class="routerLink" to="/getLucky">get lucky!</p>
        </div>
        <div>
            <label
            :class="props.theTheme"
             for="order">&nbsp; {{ showPokes }}</label>
            <input v-on:change="showToggle" v-model="notShowAll" type="checkbox" name="order" id="order">
        </div>
</section>
</template>

<style scoped>
p {
    color: var(--GBCtext);
}

section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 5px;
    margin: 20px 0 10px 0;
}

#numSelector {
    position: relative;
    top: -25px;
}

#luckyButton {
    font-size: 18px;
    position: relative;
    left: 10px;
    color: var(--GBCboldText);
    cursor: pointer;
}

#luckyButton:hover {
    color: var(--GBCboldText);
    text-shadow: 0 0 2px rgb(52, 53, 48);
}

label {
    color: var(--GBCtext);
}

label:hover {
    text-shadow: 0 0 2px rgb(52, 53, 48);
}

input {
    display: none;
}

.brick {
    color: var(--GBBtext);
}

#luckyButton.brick {
    color: var(--GBBboldText);
}

@media only screen and (max-width: 380px) {
    p, label{
        font-size: 12px;
    }
    #luckyButton {
        font-size: 12px;
    }

    section{
        margin: 10px;
    }
}
</style>