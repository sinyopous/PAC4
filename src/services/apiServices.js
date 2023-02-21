import axios from "axios";
import { onMounted, ref } from "vue";

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// export const initialPokes = [
//   { name: "bulbasaur" },
//   { name: "charmander" },
//   { name: "squirtel" },
// ];

export default {
  getPokes() {
    return pokeApi.get("/v2/pokemon?limit=2000");
  },
};



// export const fetchedPokes = ref([]);

// pokeApi.getPokes().then((poke) => {
//   let pokeIndex = 1;
//   poke.data.results.forEach((x) => {
//     // console.log(x.url)
//     fetch(x.url).then((y) =>
//       y.json().then((z) => {
//         // console.dir(z);
//         if (z.types[1]) {
//           fetchedPokes.value.push({
//             name: z.name,
//             id: z.id,
//             attack: z.stats[1].base_stat,
//             defense: z.stats[2].base_stat,
//             type1: z.types[0].type.name,
//             type2: z.types[1].type.name,
//             front: z.sprites.front_default,
//             back: z.sprites.back_default,
//             frontShiny: z.sprites.front_shiny,
//             backShiny: z.sprites.back_shiny,
//             index: pokeIndex,
//           });
//         } else {
//           fetchedPokes.value.push({
//             name: z.name,
//             id: z.id,
//             attack: z.stats[1].base_stat,
//             defense: z.stats[2].base_stat,
//             type1: z.types[0].type.name,
//             type2: "",
//             front: z.sprites.front_default,
//             back: z.sprites.back_default,
//             frontShiny: z.sprites.front_shiny,
//             backShiny: z.sprites.back_shiny,
//             index: pokeIndex,
//           });
//         }

//         pokeIndex++;
//       })
//     );
//   });
// });
