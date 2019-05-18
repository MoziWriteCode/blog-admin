<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <side-bar></side-bar>
    </div>
    <div class="main-container">
      <nav-bar></nav-bar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SideBar, NavBar ,AppMain} from "./components";
export default {
  computed: {
    ...mapGetters(["userName"])
  },
  components: {
    SideBar,
    NavBar,
    AppMain
  }
};
</script>

 
<style lang="scss">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .sidebar-container {
    transition: width 0.28s;
    width: 180px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    bottom: 0;
    left: 0;
    z-index: 8;
    overflow: hidden;
  }
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: 180px;
    position: relative;
    height: calc(100vh - 60px);
  }
}
</style>
 