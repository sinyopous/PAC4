<script setup>
import GetRandomPoke from '../components/GetRandomPoke.vue'
import SimpleCard from '../components/SimpleCard.vue'
import { arrayPokes } from '../utilities/utilities'


</script>

<template>
  <div class="box">
    <section>
      <SimpleCard />
    </section>
    <GetRandomPoke />
  </div>
</template>

<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
</style>

