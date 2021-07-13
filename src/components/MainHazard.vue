<template>
  <div class="flex h-screen">
    <div class="p-6 m-6 max-w-sm m-auto bg-gray-200 rounded-xl shadow-md flex-col items-center space-x-4">
      <div class="text-xl font-medium text-black">Main Hazard</div>
      <p class="text-gray-500">Tis is the main hazard</p>
      <button class="rounded-full py-3 px-6 bg-purple-600 bg-opacity-75 text-white" @click="openThreatModal()">Add threat</button>
    </div>
  </div>
  <add-threat-modal v-if="openModal === true" @closeModal="closeModal" />
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
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
  methods: {
    AddThreat() {
      axios.post('http://localhost:3000/threats', {
        'id': 99,
        'threatName': 'Newly added threat',
        'body': 'Our staff is not trained to deal with unknown emails',
        'threatLevel': 'Low'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>
