<template>
  <div>
    <div class="text-xl font-medium text-black">{{ barrier.barrierName }}</div>
    <p class="text-gray-500">{{ barrier.body }}</p>
  </div>
</template>

<script>
export default {
  name: 'BarrierCard',
  props: {
    barrier: {
      type: Object,
      required: true,
    },
  }
}
</script>
