<template>
  <div class="app-container">
    <div class="form">
      <h1 class="title">登录设置</h1>
      <div class="form-item">
        <span class="form-title">原密码:</span>
        <input type="text" v-model="admin_pwd.ori_pwd">
      </div>
      <div class="form-item">
        <span class="form-title">新密码:</span>
        <input type="text" v-model="admin_pwd.new_pwd">
      </div>
      <div class="form-item">
        <span class="form-title">确认密码:</span>
        <input type="text" v-model="admin_pwd.re_pwd">
      </div>
      <div class="form-tool">
        <button class="btn alter" @click="alter_admin_pwd">修改</button>
      </div>
    </div>
    <input
      type="file"
      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
      multiple="multiple"
      @change="addFileImage($event)"
    >
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import { master } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      admin_pwd: {}
    };
  },
  computed: {
    ...mapGetters(["userID"])
  },
  methods: {
    alter_admin_pwd() {
      this.admin_pwd.user_id = this.userID;
      master(this.admin_pwd).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  .form {
    .title {
      font-size: 26px;
      font-weight: bold;
      border-bottom: 1px dotted #ccc;
      padding: 5px 0 10px;
    }
    .form-item {
      display: flex;
      padding: 10px 0;
      align-items: center;
      justify-content: center;
      word-break: break-all;
      .form-title {
        width: 180px;
        text-align: right;
        padding-right: 20px;
      }
      div {
        border: 1px solid rgb(169, 169, 169);
        height: 150px;
        overflow-x: hidden;
        overflow-y: auto;
        cursor: pointer;
      }
      input,
      div {
        flex: 1;
        resize: none;
        outline: none;
        font-size: 14px;
        line-height: 22px;
        word-break: break-all;
        padding: 0 5px;
      }
    }
    .form-tool {
      text-align: center;
      button {
        font-size: 16px;
        margin-top: 20px;
        width: 150px;
        height: 38px;
      }
    }
  }
}
</style>
