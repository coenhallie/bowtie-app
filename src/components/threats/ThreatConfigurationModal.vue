<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <div class="flex justify-between items-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Threat Configuration</h3>
                <b class="p-1 px-4 cursor-pointer rounded-md border border-gray-400 hover:bg-gray-100" @click="emit('openAddBarrierModal')">Add barrier</b>
              </div>
              <div class="mt-2">
                <label class="font-bold" for="threatDescription"> Threat Title:</label>
                <input :placeholder="selectedThreat.threatTitle" :value="selectedThreat.threatTitle" @input="$emit('update:threatTitle', $event.target.value)" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="threatTitle" type="text">
              </div>
              <div class="mt-2">
                <label class="font-bold" for="threatActor"> Threat Actor:</label>
                <listbox @selectedThreatActor="myMethodForTheEvent" v-model="threatActor" ref="selectedThreatActor.name"/>
              </div>
              <div class="mt-2">
                <label class="font-bold" for="threatDescription"> Threat Description:</label>
                <textarea :placeholder="selectedThreat.threatDescription" :value="selectedThreat.threatDescription" @input="$emit('update:threatDescription', $event.target.value)" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="threatDescription" type="text" rows="4"></textarea>
              </div>
              <div class="flex justify-between items-center mt-4">
                <label class="font-bold" for="threatLevel"> Threat Level:</label>
                <div class="flex justify-center rounded text-md" role="group">
                  <button @click="$emit('update:threatLevel', 'Low')" :class="[selectedThreat.threatLevel === 'Low' ? 'bg-yellow-300 text-white' : 'bg-white text-gray-700']" class="hover:bg-yellow-300 hover:text-white border border-r-0 border-gray-400 rounded-l px-4 py-1 outline-none focus:shadow-outline">Low</button>
                  <button @click="$emit('update:threatLevel', 'Medium')" :class="[selectedThreat.threatLevel === 'Medium' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700']" class="bg-white hover:bg-yellow-500 hover:text-white border border-gray-400 px-4 py-1 outline-none focus:shadow-outline">Medium</button>
                  <button @click="$emit('update:threatLevel', 'High')" :class="[selectedThreat.threatLevel === 'High' ? 'bg-red-500 text-white' : 'bg-white text-gray-700']" class="bg-white hover:bg-red-500 hover:text-white border border-l-0 border-gray-400 rounded-r px-4 py-1 outline-none focus:shadow-outline">High</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <configuration-modal>
          <template v-slot:footer>
            <button @click="emit('cancelThreatChange')" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
            <button @click="emit('removeThreat', selectedThreat)" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Remove Threat
            </button>
            <button @click="emit('changeThreatData', selectedThreat.id)" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Confirm changes</button>
          </template>
        </configuration-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ConfigurationModal from '../ConfigurationModal'
import Listbox from '../Listbox'
export default {
  name: 'ThreatConfigurationModal',
  props: {
    selectedThreat: {
      type: Object,
      required: true,
    },
    // threatDescription: {
    //   type: String,
    //   default: '',
    //   required: true,
    // },
    // threatLevel: {
    //   type: String,
    //   default: '',
    //   required: true,
    // },
  },
  components: {
    ConfigurationModal,
    Listbox,
  },
  setup(props, { emit }) {
    const threatActor = ref('')

    // const myMethodForTheEvent = () => {
    //   console.log()
    // }

    return {
      emit,
      ConfigurationModal,
      threatActor,
    }
  },
}
</script>
