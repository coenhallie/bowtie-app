<template>
  <risk-card v-for="(risk, index) in risks" :key="index" :risk="risk" />
</template>

<script>
import axios from 'axios'
import RiskCard from "@/components/RiskCard"

export default {
  name: "Dashboard",
  async setup() {
    let { data: risks } = await axios.get("http://localhost:3000/risks");
    return {
      risks,
    }
  },
  components: {
    RiskCard,
  },
};
</script>
