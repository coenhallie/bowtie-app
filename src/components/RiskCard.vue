<template>
  <div class="p-6 m-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div>
    <div class="text-xl font-medium text-black">{{ risk.riskName }}</div>
    <p class="text-gray-500">{{ risk.body }}</p>
    <p class="text-gray-500">{{ risk.riskLevel }}</p>
  </div>
</div>
</template>

<script>

export default {
  name: 'riskCard',
  props: {
    risk: {
      type: Object,
      required: true
    }
  }
}
</script>
