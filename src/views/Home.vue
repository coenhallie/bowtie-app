<template>
  <div class="zoom-area" ref="parent">
    <Suspense>
      <template #default>
        <Dashboard />
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script>
import Dashboard from '@/components/Dashboard'
import Panzoom from '@panzoom/panzoom';

export default {
  name: "Home",
  components: {
    Dashboard,
  },
  mounted() {
    const elem = this.$refs.parent;
    const instance = Panzoom(elem, { canvas: true });

    elem.parentElement.addEventListener("wheel", function (event) {
      instance.zoomWithWheel(event);
    });
  }
};
</script>

<style scoped>
.zoom-area {
  height: 1000px;
  width: 1000px;
}
</style>
