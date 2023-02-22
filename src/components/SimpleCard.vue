<script setup>
import { arrayPokes } from '../utilities/utilities'
const props = defineProps(['info', 'theTheme'])
// const dittoFront = ref('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png')
// console.log
// console.log(props)
// console.log(props.info)
// console.log(props.info.name)
// console.log(arrayPokes)
</script>

<template>
    <section v-on:click="$router.push({ name: 'single', params: { pokeIndex: props.info.id } })">
        <div>
            <img :class="theTheme" v-bind:src="props.info.front || dittoFront">
            <h2 :class="theTheme">{{ props.info.name }}</h2>
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

img.brick {
    filter: sepia(1) blur(0.3px) contrast(80%);
}

h2 {
    color: var(--GBCtext);
    font-size: 20px;
    text-align: center;
}

h2.brick {
    color: var(--GBBtext);
}

@media only screen and (max-width: 1350px) {
    div {
        width: 210px;
    }

    h2 {
        font-size: 18px;
    }
}

@media only screen and (max-width: 1150px) {
    div {
        width: 180px;
    }
    h2 {
        font-size: 16px;
    }
}


@media only screen and (max-width: 1000px) {
    div {
        width: 160px
    }

    h2 {
        font-size: 14px;
    }
}

@media only screen and (max-width: 500px) {
    div {
        width: 150px;
    }
}
</style>