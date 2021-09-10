<template>
  <div class="mainhazard flex">
    <div class="px-2 py-4 h-44 w-100 max-w-sm m-auto bg-white border border-gray-500 rounded shadow-md items-center">
      <div class="text-xl font-medium text-black">Being unable to do business</div>
      <div class="grid grid-flow-col grid-cols-2 gap-4">
        <div>
          <button class="p-2 m-2 bg-green-500 text-white rounded" @click="emit('openAddThreatModal')">
            Add Threat
          </button>
        </div>
        <div>
          <button class="p-2 m-2 bg-green-500 text-white rounded" @click="emit('openAddConsequenseModal')">
            Add Consequense
          </button>
        </div>
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

<style scoped>
.mainhazard:before {
  content: '';
  position: absolute;
  left: 97%;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  clear: both;
  transform: rotate(270deg);
}
</style>
