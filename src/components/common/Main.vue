<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-side></v-side>
    <div class="content">
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
  .content {
    position: absolute;
    top: 70px;
    left: 250px;
    right: 0;
    padding: 40px;
    bottom: 0;
    box-sizing: border-box;
    overflow-y: scroll;
    font-family: Helvetica Neue,Helvetica,microsoft yahei,arial,STHeiTi,sans-serif;
  }
</style>
