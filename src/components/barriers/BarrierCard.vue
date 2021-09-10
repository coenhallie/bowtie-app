<template>
  <div class="min-w-full min-h-full">
    <div class="p-3 text-left">
      <div class="p-3 text-xl font-bold">
        <p>{{ barrier.barrierName }}</p>
      </div>
      <div class="p-3 text-gray-500">
        <p>{{ barrier.barrierDescription }}</p>
      </div>
    </div>
    <div class="grid grid-flow-col grid-cols-2 gap-4 p-2 items-center justify-between bg-gray-50 bg-opacity-50 absolute inset-x-0 bottom-0 border-t border-purple-300 border-opacity-40">
      <div>
        <p class="text-sm text-gray-600 font-medium">Impact</p>
        <b>{{ barrier.riskNumber }}</b>
      </div>
      <div>
        <p class="text-sm text-gray-600 font-medium">Completion</p>
        <b>{{ barrier.completionPercentage }} %</b>
      </div>
    </div>
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
  },
}
</script>
