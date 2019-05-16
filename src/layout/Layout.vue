<template>
  <div class="layout">
    <div class="left">
      <div class="avatar">
        <img src="../assets/logo.png" alt="avatar">
      </div>
      <div class="logo">
        <span title="点击退出登录" @click="logout">{{userName}}</span>
      </div>
      <ul class="nav">
        <li>
          <router-link to="/admin/article">文章管理</router-link>
        </li>
        <li>
          <router-link to="/admin/tags">标签管理</router-link>
        </li>
        <li>
          <router-link to="/admin/works">作品管理</router-link>
        </li>
        <li>
          <router-link to="/admin/uploadimg" target="_blank">图片上传</router-link>
        </li>
        <li>
          <router-link to="/admin/setting">全局设置</router-link>
        </li>
        <li>
          <router-link to="/admin/addArticle">写文章</router-link>
        </li>
      </ul>
    </div>
    <div class="right">
      <router-view class="views"></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userName"])
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

 
<style lang="scss">
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  .left {
    min-width: 200px;
    width: 200px;
    text-align: center;
    box-shadow: 0 0 2px #ccc;
    background-color: #23292f;
    color: #ccc;
    .logo {
      margin: 10px auto;
      font-size: 32px;
      border-bottom: 1px solid #ccc;
      padding: 5px;
      cursor: pointer;
    }
    .avatar {
      padding-top: 10px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    .nav {
      padding: 0;
      li {
        margin: 10px 0;
        list-style:none;  
      }
      a {
        color: inherit;
        text-decoration: none;
        font-size: 18px;
        transition: color 0.4s;
        &:hover {
          color: #666;
        }
      }
      .router-link-exact-active {
        color: #666;
      }
    }
  }
  .right {
    flex: 1;
    overflow: auto;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    .btn {
      font-size: 12px;
      padding: 5px 10px;
      margin: 0 5px;
      border: none;
      color: #fff;
      cursor: pointer;
      background-color: #23292f;
      outline: none;
      &:active {
        opacity: 0.6;
      }
    }
    .del {
      background-color: #ea4747;
    }
    .alter {
      background-color: #409eff;
    }
    .look {
      background-color: #67c23a;
    }
    .table_th {
      font-weight: bold;
      color: #23292f;
    }
    .views {
      min-width: 1200px;
    }
    a {
      text-decoration: none;
      color: inherit;
      transition: color 0.3s;
      &:hover {
        color: #62be93;
      }
    }
    .tool {
      padding-bottom: 10px;
      border-bottom: 1px dotted #ccc;
      margin-bottom: 10px;
    }
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      word-break: break-all;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      li {
        list-style: none;
        padding: 0 5px;
      }
    }
  }
}
</style>
 