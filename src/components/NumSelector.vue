<script setup>
import { ref, watch } from 'vue';
const totalNumOfPokemon = 1279;
const number = ref(6);
const emit = defineEmits(['numplus', 'numMinus'])


const numPlus = () => {
    if (number.value < totalNumOfPokemon) { number.value++ };
    emit('numPlus')
}

const numMinus = () => {
    if (number.value > 1) {
        number.value--
    };
    emit('numMinus')
}

//-----------------------------MOUSE  HOLD------------------------------------

let holdingMouseUp;
const holdPlus = () => holdingMouseUp = setInterval(numPlus, 100)
const unHoldPlus = () => clearInterval(holdingMouseUp)

let holdingMouseDown;
const holdMinus = () => holdingMouseDown = setInterval(numMinus, 100)
const unHoldMinus = () => clearInterval(holdingMouseDown)




</script>

<template>
    <div>
        <img v-on:click="numPlus" @drag="numPlus" @mousedown="holdPlus" @mouseup="unHoldPlus" @mouseout="unHoldPlus"
            src="../assets/expandLess.svg" />
        <p>{{ number }}</p>
        <img v-on:click="numMinus" @drag="numMinus" @mousedown="holdMinus" @mouseup="unHoldMinus" @mouseout="unHoldMinus" src="../assets/expandMore.svg" />
    </div>
</template>

<style scoped>
img {
    cursor: pointer
}

div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    margin: 20px 0 -30px 0;
}

p {
    color: var(--GBCboldtext);
    position: relative;
    left: 3px;
}
</style>