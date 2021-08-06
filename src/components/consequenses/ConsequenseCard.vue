<template>
  <div class="flex float-left">
    <div @click="emit('openConsequenseConfigurationModal', consequense)" class="h-40 w-80 cursor-pointer group hover:bg-green-300 hover:shadow-lg hover:border-transparent transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 p-6 m-6 max-w-sm mx-auto bg-green-200 rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <div class="text-xl font-medium text-black">
          {{ consequense.consequenseName }}
        </div>
        <p class="text-gray-500">{{ consequense.consequenseDescription }}</p>
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
