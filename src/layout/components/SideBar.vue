<template>
  <div class="sidebar">
    <div class="avatar">
      <router-link to="/">
        <img src="../../assets/img/logo.png" alt="avatar">
      </router-link>
    </div>
    <ul class="nav">
      <li v-for="(item, index) in navRoute" :key="index">
        <router-link :to="item.path" :class="[item.path === currentPath ? 'current': '']">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import constantRouterMap from "@/router/router";
import { mapGetters } from 'vuex';
export default {
  data(){
    let nav = constantRouterMap.filter(route => !route.hidden);
    if(nav.length === 1) {
      nav = nav[0].children
    }
    return{
      navRoute:nav
    }
  },
  computed:{
    ...mapGetters(['currentPath'])
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
  height: 100%;
  border-right: 1px solid #e4e4e4;
  .avatar {
    padding-top: 10px;
    height: 100px;
    img {
      position: absolute;
      width: 100px;
      height: 100px;
      margin-left: -50px;
      left: 50%;
      border-radius: 50%;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .nav {
    padding: 0;
    li {
      margin: 10px 0;
      text-align: center;
      list-style: none;
    }
    a {
      color: inherit;
      text-decoration: none;
      font-size: 18px;
      transition: color 0.4s;
      &:hover {
        color: rgb(28, 146, 214);
      }
    }
    .current{
      color: rgb(28, 146, 214);
    }
    .router-link-exact-active {
      color: rgb(28, 146, 214);
    }
  }
}
</style>

