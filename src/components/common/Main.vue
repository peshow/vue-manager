<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-side></v-side>
    <div class="contain">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import vHead from './Header.vue'
  import vSide from './Sidebar.vue'
  export default {
    components: {
      vHead, vSide
    }
  }
</script>

<style scoped>
  .contain {
    display: block;
    position: absolute;
    top: 70px;
    left: 250px;
    padding: 20px;
    bottom: 0;
    overflow-y: hidden;
  }
</style>
