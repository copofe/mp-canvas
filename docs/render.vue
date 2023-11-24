<script setup lang="ts">
import { onMounted } from 'vue'
const props = defineProps<{
  objects: any[]
  width: number
  height: number
}>()

onMounted(() => {
  import('./index.mjs').then(async ({ Rubbing }) => {
    const rubbing = new Rubbing({
      selector: '#canvas',
      background: '#fff',
      width: props.width,
      height: props.height,
    })
    await rubbing.init()
    rubbing.loadFrom({
      objects: [
        {
          type: 'circle',
          left: 50,
          top: 50,
          radius: 100,
          fill: '#7c3aed',
        },
      ],
    })
  })
})
</script>

<template>
  <canvas id="canvas"></canvas>
</template>