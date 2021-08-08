import { toRefs, reactive } from 'vue'
import axios from 'axios'

export default function useThreats() {
  const state = reactive({
    threats: [],
    selectedThreat: {},
    openAddNewThreatModal: false,
    openThreatConfigurationModal: false,
  })

  const threatDetails = reactive({
    threatName: state.selectedThreat.threatName,
    threatDescription: state.selectedThreat.threatDescription,
    threatLevel: state.selectedThreat.threatLevel,
  })

  const changeThreatData = (id) => {
    const foundIndex = state.threats.findIndex((element) => element.id === id)
    let newArray = [...state.threats]
    newArray[foundIndex] = { ...newArray[foundIndex], ...state.selectedThreat }
    state.threats = newArray
    axios
      .put('http://localhost:3000/threats/' + id, {
        id: id,
        ...state.selectedThreat,
        barriers: [...state.selectedThreat.barriers],
      })
      .then(() => {
        console.log('yay new state')
      })
    state.openThreatConfigurationModal = false
  }

  return {
    ...toRefs(state),
    changeThreatData,
    threatDetails
  };
}