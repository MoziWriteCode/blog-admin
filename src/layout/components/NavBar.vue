<template>
  <div class="navbar">
    <div class="right-menu">
      <div>
        <span>用户名:</span>
        <span>{{ userName }}</span>
      </div>
      <div></div>
      <div>
        <span style="cursor: pointer;" @click="logout">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";

export default {
  computed: {
    ...mapGetters(["userName"]),
    loginTime: () => {
      return getToken("logintime");
    }
  },
  methods: {
    logout() {
      if (confirm("确认退出登录吗？")) {
        this.$store.dispatch("LogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  top: 0;
  height: 46px;
  line-height: 46px;
  border-radius: 0px !important;
  border-bottom: 1px solid #e4e4e4;
  position: fixed;
  left: 180px;
  right: 0;
  z-index: 8;
  background-color: #fff;
  .right-menu {
    float: right;
    height: 100%;
    font-size: 13px;
    div {
      color: #6f7275;
      display: inline;
      padding: 10px;
    }
    div:nth-child(2) {
      padding: 0px;
    }
  }
}
</style>
