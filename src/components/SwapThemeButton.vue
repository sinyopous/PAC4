<script setup>
import { ref, computed } from 'vue'
const emit = defineEmits(['emitTheme'])


const theme = ref('color')

const brickLavelClass = computed(() => {
    if (theme.value === 'brick') {
        return 'checked'
    } else {
        return ''
    }
})

const colorLavelClass = computed(() => {
    if (theme.value === 'color') {
        return 'checked'
    } else {
        return ''
    }
})



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

label:hover {
    cursor: pointer;
    text-shadow: 0 0 2px rgb(52, 53, 48);
}

.checked {
    color: var(--GBCboldText)
}

input {
    display: none;
}
</style>