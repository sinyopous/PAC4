<script setup>

const props =  defineProps(['theTheme'])




</script>



<template>
    <p 
        :class="props.theTheme"
    >return</p>
</template>

<style scoped>
p {
    color: var(--GBCtext);
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    text-decoration: none;
    z-index: 1;
}

p:hover {
    text-shadow: 0 0 2px rgb(52, 53, 48);
    z-index: 1;
}

p.brick {
    color: var(--GBBtext);
}

@media only screen and (max-width: 380px) {
    p{
        font-size: 12px;
    }

}
</style>