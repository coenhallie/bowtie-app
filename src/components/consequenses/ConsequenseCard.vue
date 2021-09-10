<template>
  <div class="flex float-left">
    <div @click="emit('openConsequenseConfigurationModal', consequense)" class="border border-gray-500 border-opacity-50 z-10 m-6 h-60 w-96 cursor-pointer group hover:bg-white hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-white rounded shadow-md flex items-center">
      <div class="min-w-full min-h-full">
        <div class="p-3 text-left">
          <div class="text-xl font-medium text-black">
            {{ consequense.consequenseName }}
          </div>
          <p class="text-gray-500">{{ consequense.consequenseDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsequenseCard',
  props: {
    consequense: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    return {
      emit,
    }
  }
}
</script>
