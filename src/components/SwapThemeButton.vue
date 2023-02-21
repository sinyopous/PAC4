<script setup>
import { ref, computed, watch } from 'vue'
const emit = defineEmits(['emitTheme'])


const theme = ref('color')

const brickLavelClass = computed(() => {
    if (theme.value === 'brick') {
        return 'checked brick'
    } else {
        return ''
    }
    
})

const colorLavelClass = computed(() => {
    if (theme.value === 'color') {
        return 'checked'
    } else if (theme.value === 'brick') {
        return 'brick'
    }
})



//-------------------------SAVE THEME ON LOCAL STORAGE------------------------------

theme.value =  window.localStorage.getItem('theme')
watch(theme,()=>window.localStorage.setItem('theme',theme.value))



</script>

<template>
    <section>
        <label :class="colorLavelClass" for="radioColor">color</label>

        <input id="radioColor" type="radio" name="theme" value="color" checked v-model="theme" :class="colorClass"
        @change="$emit('emitTheme',theme)">

        <label :class="brickLavelClass" for="radioBrick">brick</label>

        <input id="radioBrick" type="radio" name="theme" value="brick" v-model="theme"
        @change="$emit('emitTheme',theme)">
        

    </section>
</template>

<style scoped>
section {
    display: flex;
    gap: 10px;
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 1;
}

label {
    color: var(--GBCtext);
}

.brick {
    color: var(--GBBtext);
}

label:hover {
    cursor: pointer;
    text-shadow: 0 0 2px rgb(52, 53, 48);
}

.checked {
    color: var(--GBCboldText);
}

.checked.brick {
    color: var(--GBBboldText);
}

input {
    display: none;
}


@media only screen and (max-width: 380px) {
    label {
        font-size: 12px;
    }

    input {
        font-size: 12px;
    }
}
</style>