<template>
  <div class="overflow-hidden">
    <div id="dashboardparent" ref="parent" class="grid grid-cols-3 gap-4">
      <div class="threat">
        <transition-group name="fade">
          <threat-card id="threat-card" v-for="(threat, index) in threats" :key="index" :threat="threat" @openThreatConfigurationModal="configureThreatModal(threat)" @emitSelectedBarrier="configureBarrierModal" />
        </transition-group>
      </div>
      <main-hazard id="main-hazard-card" @openAddThreatModal="newThreatModal" @openAddConsequenseModal="newConsequenseModal" />
      <div class="consequense">
        <consequense-card v-for="(consequense, index) in consequenses" :key="index" :consequense="consequense" @openConsequenseConfigurationModal="configureConsequenseModal(consequense)" />
      </div>
    </div>
  </div>
  <transition name="fade">
    <add-threat-modal v-if="openAddNewThreatModal" @closeModal="openAddNewThreatModal = false" @newThreatAdded="fetchThreats()" />
  </transition>
  <transition name="fade">
    <add-consequense-modal v-if="openAddNewConsequenseModal" @closeModal="openAddNewConsequenseModal = false" @newConsequenseAdded="fetchConsequenses()" />
  </transition>
  <transition name="fade">
    <add-barrier-modal :selectedThreat="selectedThreat" v-if="openAddNewBarrierModal" @closeModal="openAddNewBarrierModal = false" @newBarrierAdded="fetchThreats()" />
  </transition>
  <transition name="fade">
    <threat-configuration-modal @cancelThreatChange="cancelThreatChange" @changeThreatData="changeThreatData(selectedThreat.id)" @openAddBarrierModal="newBarrierModal" v-model:threatActor="selectedThreat.threatActor" v-model:threatDescription="selectedThreat.threatDescription" v-model:threatLevel="selectedThreat.threatLevel" v-if="openThreatConfigurationModal" @removeThreat="removeThreat(selectedThreat)" :selectedThreat="selectedThreat" @closeModal="openThreatConfigurationModal = false" />
  </transition>
  <transition name="fade">
    <barrier-configuration-modal @changeBarrierData="changeBarrierData(selectedBarrier.id)" v-model:barrierName="barrierName" v-model:barrierDescription="barrierDescription" v-model:riskNumber="riskNumber" v-if="openBarrierConfigurationModal" @removeBarrier="removeBarrier(selectedBarrier)" :selectedBarrier="selectedBarrier" @closeModal="openBarrierConfigurationModal = false" />
  </transition>
  <transition name="fade">
    <consequense-configuration-modal :consequense="consequense" @changeConsequenseData="changeConsequenseData(selectedConsequense.id)" v-model:consequenseName="consequenseName" v-model:consequenseDescription="consequenseDescription" v-if="openConsequenseConfigurationModal" @removeConsequense="removeConsequense(selectedConsequense)" :selectedConsequense="selectedConsequense" @closeModal="openConsequenseConfigurationModal = false" />
  </transition>
</template>

<script>
import Panzoom from 'panzoom'
import axios from 'axios'
import ThreatCard from '@/components/threats/ThreatCard'
import ConsequenseCard from '@/components/consequenses/ConsequenseCard'
import MainHazard from '@/components/MainHazard'
import { toRefs, onMounted, reactive } from 'vue'
// import { createClient } from '@supabase/supabase-js'
import AddThreatModal from '@/components/threats/AddThreatModal'
import AddConsequenseModal from '@/components/consequenses/AddConsequenseModal'
import AddBarrierModal from '@/components/barriers/AddBarrierModal'
import ThreatConfigurationModal from '@/components/threats/ThreatConfigurationModal'
import BarrierConfigurationModal from '@/components/barriers/BarrierConfigurationModal'
import ConsequenseConfigurationModal from '@/components/consequenses/ConsequenseConfigurationModal'

export default {
  name: 'Dashboard',
  props: ['selectProject'],
  async setup() {
    const state = reactive({
      threats: [],
      selectedThreat: {},
      selectedBarrier: {},
      selectedConsequense: {},
      consequenses: [],
      openAddNewThreatModal: false,
      openAddNewBarrierModal: false,
      openAddNewConsequenseModal: false,
      openThreatConfigurationModal: false,
      openBarrierConfigurationModal: false,
      openConsequenseConfigurationModal: false,
    })

    const barrierDetails = reactive({
      barrierName: '',
      barrierDescription: '',
      riskNumber: 0,
    })

    const threatDetails = reactive({
      threatActor: '',
      threatDescription: '',
      threatLevel: '',
    })

    const consequenseDetails = reactive({
      consequenseName: '',
      consequenseDescription: '',
    })

    // const supabaseUrl = 'https://bziwylywiblkrqzcdpgd.supabase.co'
    // const supabaseKey = process.env.SUPABASE_KEY
    // const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzE2NTA2NywiZXhwIjoxOTQyNzQxMDY3fQ.pWlhjDMRbXbopftW7vko7U4iWAOg157YQJXQ3KNhjJ4')

    const fetchThreats = () => {
      return axios.get('http://localhost:3000/project2/').then((response) => {
        state.threats = response.data.threats
      })
    }

    const cancelThreatChange = () => {
      let clone = { ...state.selectedThreat }
      state.selectedThreat = clone
      state.openThreatConfigurationModal = false
      fetchThreats()
    }
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

    const removeThreat = (threat) => {
      axios.delete('http://localhost:3000/threats/' + threat.id).then(() => {
        const threatId = state.threats.indexOf(threat)
        state.threats.splice(threatId, 1)
        state.openThreatConfigurationModal = false
      })
    }

    const changeBarrierData = (id) => {
      const foundIndex = state.threats.findIndex((element) => element.id === id)
      let newArray = [...state.threats]
      newArray[foundIndex] = { ...newArray[foundIndex], ...state.selectedBarrier }
      state.threats = newArray
      axios.post('http://localhost:3000/threats', + id, {
        ...state.selectedBarrier,
      })
      fetchThreats()
      state.openBarrierConfigurationModal = false
    }

    const changeConsequenseData = (id) => {
      const foundIndex = state.consequenses.findIndex((element) => element.id === id)
      let newConsequenseArray = [...state.consequenses]
      newConsequenseArray[foundIndex] = { ...newConsequenseArray[foundIndex], ...consequenseDetails }
      state.consequenses = newConsequenseArray
      axios
        .put('http://localhost:3000/threats/consequenses/' + id, {
          id: id,
          consequenseName: consequenseDetails.consequenseName,
          consequenseDescription: consequenseDetails.consequenseDescription,
        })
        .then(() => {
          console.log('yay new state')
        })
      state.openConsequenseConfigurationModal = false
    }

    const newThreatModal = () => {
      state.openAddNewThreatModal = true
    }

    const newBarrierModal = () => {
      state.openThreatConfigurationModal = false
      state.openAddNewBarrierModal = true
    }

    const newConsequenseModal = () => {
      state.openAddNewConsequenseModal = true
    }

    const configureThreatModal = (threat) => {
      state.openThreatConfigurationModal = true
      state.selectedThreat = threat
    }

    const configureBarrierModal = (value) => {
      state.openBarrierConfigurationModal = true
      state.selectedBarrier = value
    }

    const configureConsequenseModal = (consequense) => {
      state.openConsequenseConfigurationModal = true
      state.selectedConsequense = consequense
    }

  // let { data: threat, error } = await supabase
  // .from('threat')
  // .select('*')

  // console.log('daata', threat)

    const fetchConsequenses = () => {
      return axios
        .get('http://localhost:3000/project1')
        .then((response) => {
          state.consequenses = response.data.consequenses
        })
    }

    const removeConsequense = (consequense) => {
      axios.delete('http://localhost:3000/consequenses/' + consequense.id).then(() => {
        const consequenseId = state.consequenses.indexOf(consequense)
        state.consequenses.splice(consequenseId, 1)
        state.openConsequenseConfigurationModal = false
      })
    }

    // const addBarrier = (threat) => {
    //   axios.put('http://localhost:3000/threats/threats/barriers' + threat.id).then(() => {
    //     const threatId = threats.value.indexOf(threat)
    //     threats.value.splice(threatId, 1)
    //   })
    // }

    onMounted(() => {
      fetchThreats()
      fetchConsequenses()
    })

    return {
      ...toRefs(state),
      ...toRefs(threatDetails),
      ...toRefs(barrierDetails),
      ...toRefs(consequenseDetails),
      configureThreatModal,
      fetchThreats,
      fetchConsequenses,
      newThreatModal,
      removeThreat,
      removeConsequense,
      newBarrierModal,
      newConsequenseModal,
      changeThreatData,
      cancelThreatChange,
      changeBarrierData,
      changeConsequenseData,
      configureBarrierModal,
      configureConsequenseModal,
    }
  },
  components: {
    ThreatCard,
    ConsequenseCard,
    MainHazard,
    AddThreatModal,
    AddConsequenseModal,
    AddBarrierModal,
    ThreatConfigurationModal,
    BarrierConfigurationModal,
    ConsequenseConfigurationModal,
  },
  mounted() {
    const element = this.$refs.parent
    Panzoom(element)
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
