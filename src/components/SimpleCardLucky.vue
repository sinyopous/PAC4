<script setup>
import { ref } from 'vue'
const props = defineProps(['info','pokeArray','pokeToSearch','luckyScreen', 'searchScreen', 'theTheme'])
const dittoFront = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
// console.log
// console.log(props)
// console.log(props.info)
// console.log(props.info.name)
// console.log(arrayPokes)





const falsearray = ref([10, 34, 43, 6]);

</script>
v-if="arrayPokes.some(x => x === props.info.index)"
<template>
    <section v-show="props.luckyScreen? (props.pokeArray.some( x => x === props.info.index )): (props.info.name.startsWith(props.pokeToSearch))"  
        v-on:click="$router.push({ name: 'single', params: { pokeIndex: props.info.id } })">
        <div 
           >
            <img 
            :class="props.theTheme"
            v-bind:src="props.info.front || dittoFront">
            <h2
            :class="props.theTheme"
            >{{ props.info.name }}</h2>
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

img.brick {
    filter: sepia(1) blur(0.3px) contrast(80%);
}
h2.brick {
    color: var(--GBBtext);
}

</style>