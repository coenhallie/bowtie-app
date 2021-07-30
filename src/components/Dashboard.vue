<template>
  <div>
    <div ref="parent" class="grid grid-cols-3 gap-4">
      <div id="link">
        <transition-group name="fade">
          <threat-card v-for="(threat, index) in threats" :key="index" :threat="threat" @openThreatConfigurationModal="configureThreatModal(threat)" />
        </transition-group>
      </div>
      <main-hazard @openAddThreatModal="newThreatModal" @openAddConsequenseModal="newConsequenseModal" />
      <div>
        <consequense-card v-for="(consequense, index) in consequenses" :key="index" :consequense="consequense" />
      </div>
    </div>
  </div>
  <add-threat-modal v-if="openAddNewThreatModal" @closeModal="openAddNewThreatModal = false" />
  <add-consequense-modal v-if="openAddNewConsequenseModal" @closeModal="openAddNewConsequenseModal = false" />
  <threat-configuration-modal v-model:threatName="threatName" v-model:threatDescription="threatDescription" v-if="openThreatConfigurationModal" @removeThreat="removeThreat(selectedThreat)" :selectedThreat="selectedThreat" @closeModal="openThreatConfigurationModal = false" />
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
import ThreatConfigurationModal from '@/components/threats/ThreatConfigurationModal'

export default {
  name: 'Dashboard',
  async setup() {
    const state = reactive({
      threats: [],
      selectedThreat: {},
      consequenses: [],
      openAddNewThreatModal: false,
      openAddNewConsequenseModal: false,
      openThreatConfigurationModal: false,
    })

    const threatDetails = reactive({
      threatName: '',
      threatDescription: '',
    })

    // const supabaseUrl = 'https://bziwylywiblkrqzcdpgd.supabase.co'
    // const supabaseKey = process.env.SUPABASE_KEY
    // const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzE2NTA2NywiZXhwIjoxOTQyNzQxMDY3fQ.pWlhjDMRbXbopftW7vko7U4iWAOg157YQJXQ3KNhjJ4')

    const fetchThreats = () => {
      return axios.get('http://localhost:3000/threats').then((response) => {
        state.threats = response.data
      })
    }

    const newThreatModal = () => {
      state.openAddNewThreatModal = true
    }

    const newConsequenseModal = () => {
      state.openAddNewConsequenseModal = true
    }

    const configureThreatModal = (threat) => {
      state.openThreatConfigurationModal = true
      state.selectedThreat = threat
    }

  //   let { data: threat, error } = await supabase
  // .from('threat')
  // .select('*')

  // console.log('daata', threat)

    const fetchConsequenses = () => {
      return axios
        .get('http://localhost:3000/consequenses')
        .then((response) => {
          state.consequenses = response.data
        })
    }

    const removeThreat = (threat) => {
      axios.delete('http://localhost:3000/threats/' + threat.id).then(() => {
        const threatId = state.threats.indexOf(threat)
        state.threats.splice(threatId, 1)
        state.openThreatConfigurationModal = false
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
      configureThreatModal,
      fetchThreats,
      fetchConsequenses,
      newThreatModal,
      removeThreat,
      newConsequenseModal,
    }
  },
  components: {
    ThreatCard,
    ConsequenseCard,
    MainHazard,
    AddThreatModal,
    AddConsequenseModal,
    ThreatConfigurationModal,
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
