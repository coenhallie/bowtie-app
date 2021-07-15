<template>
  <div class="flex">
    <div class="h-40 w-100 p-6 m-6 max-w-sm m-auto bg-gray-200 rounded-xl shadow-md flex-col items-center space-x-4">
      <div class="text-xl font-medium text-black">Fall from Height</div>
      <button class="rounded-full py-3 px-6 bg-gray-200 bg-opacity-75 text-white" @click="openThreatModal()">Add threat</button>
    </div>
  </div>
  <add-threat-modal @mainHazard="mainHazard" v-if="openModal" @closeModal="openModal = false" />
</template>

<script>
import { ref } from 'vue'
import AddThreatModal from '@/components/threats/AddThreatModal'
export default {
  name: 'MainHazard',
  setup() {
    const openModal = ref(false)
    function openThreatModal() {
      openModal.value = true
    }

    return {
      openModal,
      openThreatModal,
    }
  },
  components: {
    AddThreatModal,
  },
}
</script>
