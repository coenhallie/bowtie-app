<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Add Barrier
              </h3>
              <div class="mt-2">
                <label class="font-bold" for="barrierName"> Barrier name:</label>
                <input maxlength="30" v-model="barrierName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="barrierName" type="text" placeholder="Barrier name">
              </div>
              <div class="mt-2">
                <label class="font-bold" for="barrierDescription"> Barrier Descripion:</label>
                <input v-model="barrierDescription" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="barrierDescription" type="text" placeholder="Barrier Description">
              </div>
              <div class="mt-2">
                <label class="font-bold" for="riskNumber"> riskNumber:</label>
                <input v-model="riskNumber" min="0" max="10" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="riskNumber" type="number" placeholder="risk Level">
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button @click="addBarrier" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
            Add Barrier
          </button>
          <button @click="emit('closeModal')" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'AddBarrierModal',
  setup(props, { emit, attrs }) {
    const barrierName = ref('')
    const barrierDescription = ref('')
    const riskNumber = ref(0)

    const addBarrier = () => {
      axios
        .patch('http://localhost:3000/threats/' + attrs.selectedThreat.id, {
          ...attrs.selectedThreat,
          barriers: [
            ...attrs.selectedThreat.barriers,
            {
              id: Math.random(),
              barrierName: barrierName.value,
              barrierDescription: barrierDescription.value,
              riskNumber: parseInt(riskNumber.value),
            },
          ],
        })
        .then(function () {
          emit('closeModal')
          emit('newBarrierAdded')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    return {
      emit,
      attrs,
      barrierName,
      barrierDescription,
      riskNumber,
      addBarrier,
    }
  },
}
</script>
