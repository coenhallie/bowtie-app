<template>
  <div class="flex">
    <div class="px-20 py-4 h-40 w-100 max-w-sm m-auto bg-gray-200 rounded-xl shadow-md items-center">
      <div class="text-xl font-medium text-black">Fall from Height</div>
      <div class="flex flex-col justify-center items-center">
        <button class="p-2 m-2 bg-green-500 text-white rounded" @click="emit('openAddThreatModal')">
          Add Threat
        </button>
        <button class="p-2 m-2 bg-green-500 text-white rounded" @click="emit('openAddConsequenseModal')">
          Add Consequense
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHazard',
  setup(props, { emit }) {
    return {
      emit,
    }
  },
}
</script>
