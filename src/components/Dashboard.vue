<template>
  <div ref="parent">
    <div class="grid grid-cols-3 gap-4">
      <div id="link">
        <transition-group name="fade">
          <threat-card
            v-for="(threat, index) in threats"
            :key="index"
            :threat="threat"
            @threat="selectedThreat"
          />
        </transition-group>
      </div>
      <main-hazard @mainHazard="addMainHazard" />
      <div>
        <consequense-card
          v-for="(consequense, index) in consequenses"
          :key="index"
          :consequense="consequense"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Panzoom from 'panzoom'
import axios from 'axios'
import ThreatCard from '@/components/threats/ThreatCard'
import ConsequenseCard from '@/components/consequenses/ConsequenseCard'
import MainHazard from '@/components/MainHazard'
import { ref, onMounted } from 'vue'

export default {
  name: 'Dashboard',
  async setup(props, { attrs }) {
    const threats = ref([])
    const consequenses = ref([])

    const fetchThreats = () => {
      return axios.get('http://localhost:3000/threats').then((response) => {
        threats.value = response.data
      })
    }

    const addMainHazard = () => {
      console.log('etststse')
    }

    console.log('attrs?', attrs)

    const fetchConsequenses = () => {
      return axios.get('http://localhost:3000/consequenses').then((response) => {
        consequenses.value = response.data
      })
    }

    function selectedThreat(threat) {
      axios.delete('http://localhost:3000/threats/' + threat.id).then(() => {
        const threatId = threats.value.indexOf(threat)
        threats.value.splice(threatId, 1)
      })
    }

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
      addMainHazard,
    }
  },
  components: {
    ThreatCard,
    ConsequenseCard,
    MainHazard,
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