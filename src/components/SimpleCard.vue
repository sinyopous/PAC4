<script setup>
import { arrayPokes } from '../utilities/utilities'
const props = defineProps(['info'])
// const dittoFront = ref('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png')
// console.log
// console.log(props)
// console.log(props.info)
// console.log(props.info.name)
// console.log(arrayPokes)
</script>
v-if="arrayPokes.some(x => x === props.info.index)"
<template>
    <section  v-on:click="$router.push({ name: 'single', params: { pokeIndex: props.info.id } })">
        <div 
           >
            <img v-bind:src="props.info.front || dittoFront">
            <h2>{{ props.info.name }}</h2>
        </div>
    </section>
</template> 

<style scoped>
div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0px;
    width: 250px;
    cursor: pointer;
    margin: 10px;
}

img {
    align-self: center;
    justify-self: center;
    width: 95%;
    height: 95%;
    filter: grayscale(70%);
    opacity: 80%;
}

h2 {
    color: var(--GBCtext);
    font-size: 20px;
    text-align: center;
}

</style>