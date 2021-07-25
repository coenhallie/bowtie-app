<template>
  <div class="flex">
    <div class="h-40 w-100 p-6 m-6 max-w-sm m-auto bg-gray-200 rounded-xl shadow-md items-center">
      <div class="text-xl font-medium text-black">Fall from Height</div>
      <div>
        <button @click="emit('openAddThreatModal')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            viewBox="0 0 20 20"
            fill="gray"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
          </svg>
        </button>
        <button @click="emit('openAddConsequenseModal')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            viewBox="0 0 20 20"
            fill="gray"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
          </svg>
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
