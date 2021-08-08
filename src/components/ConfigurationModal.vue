<template>
  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
    <footer>
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ConfigurationModal',
}
</script>
