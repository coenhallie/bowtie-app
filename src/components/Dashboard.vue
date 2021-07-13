<template>
  <div>
    <div class="grid grid-cols-3 gap-4">
      <div id="link">
        <threat-card
          v-for="(threat, index) in threats"
          :key="index"
          :threat="threat"
        />
      </div>
      <main-hazard />
      <div>
        <threat-card
          v-for="(threat, index) in threats"
          :key="index"
          :threat="threat"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import Panzoom from '@panzoom/panzoom'
import axios from 'axios'
import ThreatCard from '@/components/threats/ThreatCard'
import MainHazard from '@/components/MainHazard'

export default {
  name: 'Dashboard',
  async setup() {
    let { data: threats } = await axios.get('http://localhost:3000/threats')

    return {
      threats,
    }
  },
  components: {
    ThreatCard,
    MainHazard,
  },
  // mounted() {
  //   const elem = this.$refs.parent
  //   const instance = Panzoom(elem, {
  //     canvas: true,
  //     exclude: [document.getElementById('link')],
  //   })

  //   elem.parentElement.addEventListener('wheel', function (event) {
  //     instance.zoomWithWheel(event)
  //   })
  // },
}
</script>
