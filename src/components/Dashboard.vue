<template>
  <div>
    <div ref="parent" class="grid grid-cols-3 gap-4">
      <div id="link">
        <transition-group name="fade">
          <threat-card v-for="(threat, index) in threats" :key="index" :threat="threat" @threat="selectedThreat" />
        </transition-group>
      </div>
      <main-hazard @openAddThreatModal="newThreatModal" @openAddConsequenseModal="newConsequenseModal" />
      <div>
        <consequense-card v-for="(consequense, index) in consequenses" :key="index" :consequense="consequense" />
      </div>
    </div>
  </div>
  <add-threat-modal v-if="openaddNewThreatModal" @closeModal="openaddNewThreatModal = false" />
  <add-consequense-modal v-if="openAddNewConsequenseModal" @closeModal="openAddNewConsequenseModal = false" />
</template>

<script>
import Panzoom from 'panzoom'
import axios from 'axios'
import ThreatCard from '@/components/threats/ThreatCard'
import ConsequenseCard from '@/components/consequenses/ConsequenseCard'
import MainHazard from '@/components/MainHazard'
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import AddThreatModal from '@/components/threats/AddThreatModal'
import AddConsequenseModal from '@/components/consequenses/AddConsequenseModal'

export default {
  name: 'Dashboard',
  async setup() {
    const threats = ref([])
    const consequenses = ref([])
    const openaddNewThreatModal = ref(false)
    const openAddNewConsequenseModal = ref(false)

    const supabaseUrl = 'https://bziwylywiblkrqzcdpgd.supabase.co'
    const supabaseKey = process.env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzE2NTA2NywiZXhwIjoxOTQyNzQxMDY3fQ.pWlhjDMRbXbopftW7vko7U4iWAOg157YQJXQ3KNhjJ4')

    const fetchThreats = () => {
      return axios.get('http://localhost:3000/threats').then((response) => {
        threats.value = response.data
      })
    }

    const newThreatModal = () => {
      openaddNewThreatModal.value = true
    }

    const newConsequenseModal = () => {
      openAddNewConsequenseModal.value = true
    }

  //   let { data: threat, error } = await supabase
  // .from('threat')
  // .select('*')

  // console.log('daata', threat)

    const fetchConsequenses = () => {
      return axios
        .get('http://localhost:3000/consequenses')
        .then((response) => {
          consequenses.value = response.data
        })
    }

    const selectedThreat = (threat) => {
      axios.delete('http://localhost:3000/threats/' + threat.id).then(() => {
        const threatId = threats.value.indexOf(threat)
        threats.value.splice(threatId, 1)
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
      threats,
      consequenses,
      selectedThreat,
      fetchThreats,
      fetchConsequenses,
      newThreatModal,
      newConsequenseModal,
      openaddNewThreatModal,
      openAddNewConsequenseModal,
    }
  },
  components: {
    ThreatCard,
    ConsequenseCard,
    MainHazard,
    AddThreatModal,
    AddConsequenseModal,
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
