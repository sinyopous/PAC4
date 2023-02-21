const getRandomNum = (num) => Math.floor(Math.random() * num);

export const getRandomNumArray = (arrayLength, maxNum) => {
  let array = [];
  while (array.length < arrayLength) {
    let randomNum = getRandomNum(maxNum);
    if (array.every((x) => x !== randomNum)) {
      array.push(randomNum);
    }
  }
  return array;
};

export const totalNumOfPokemon = 1279;
const pokemonsToShow = 10;
const array = getRandomNumArray(pokemonsToShow, totalNumOfPokemon);
export const arrayPokes = array;

const getOrderedNumArray = (start, end) => {
  let resultsArray = [];
  for (let index = start; index <= end; index++) {
    resultsArray.push(index);
  }
  return resultsArray;
};

const allPokesArray = getOrderedNumArray(1, totalNumOfPokemon);
export const allPokesIndex = allPokesArray;




