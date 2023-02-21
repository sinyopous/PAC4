<script setup>
import pokeApi from '../services/apiServices';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const props = defineProps(['theTheme'])

const fetchedPokes = ref([]);

const route = useRoute()

const pokeIndex = route.params.pokeIndex

const dittoFront = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
const dittoFrontShiny = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png"
const dittoBack = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png"
const dittoBackShiny = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/132.png"

onMounted(() => {
    pokeApi.getPokes().then(poke => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeIndex}/`).then(y => y.json().then(z => {
            // console.dir(z);

            fetchedPokes.value.push(
                {
                    name: z.name,
                    id: z.id,
                    attack: z.stats[1].base_stat,
                    defense: z.stats[2].base_stat,
                    type1: z.types[0].type.name,
                    type2: '',
                    front: z.sprites.front_default || dittoFront,
                    back: z.sprites.back_default || dittoBack,
                    frontShiny: z.sprites.front_shiny || dittoFrontShiny,
                    backShiny: z.sprites.back_shiny || dittoBackShiny
                }
            )
            if (z.types[1]) {
                fetchedPokes.value[0].type2 = z.types[1].type.name
            }
        }))
    })
});

// console.log(fetchedPokes.value)


</script>

<template>
    <section 
    :class="props.theTheme"
     v-for="pokemon in fetchedPokes" v-bind:key="pokemon.id">
        <div id="portraitsBox">
            <img :class="props.theTheme" v-bind:src="pokemon.front">
            <img :class="props.theTheme" v-bind:src="pokemon.back">
            <img :class="props.theTheme" v-bind:src="pokemon.frontShiny">
            <img :class="theTheme" v-bind:src="pokemon.backShiny">
        </div>
        <div id="statsBox">
            <p :class="props.theTheme">name: <span :class="props.theTheme"><br>{{ pokemon.name }}</span></p>
            <p :class="props.theTheme">id:<span :class="props.theTheme"><br>#{{ pokemon.id }}</span></p>
            <p :class="props.theTheme">type: <span :class="props.theTheme"><br>{{ pokemon.type1 }}</span><span v-if="pokemon.type2"><br>{{ pokemon.type2 }}</span></p>
            <p :class="props.theTheme">attack <span :class="props.theTheme"><br>{{ pokemon.attack }}</span></p>
            <p :class="props.theTheme">defense <span :class="props.theTheme"><br>{{ pokemon.defense }}</span></p>
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

section.brick {
    border: 8px double rgb(94, 102, 73);
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

img.brick {
    filter: sepia(1) blur(0.3px) contrast(80%);
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

p.brick {
    color: var(--GBBtext)
}

span {
    color: var(--GBCboldText);
}

span.brick {
    color: var(--GBBboldText);
}
</style>
