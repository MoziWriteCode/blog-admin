<template>
  <div class="login">
    <div class="login_form">
      <p class="login_title">用户登录</p>
      <div class="login_item">
        <p class="form_title">账号</p>
        <input type="text" v-model="userInfo.user_id" />
      </div>
      <div class="login_item">
        <p class="form_title">密码</p>
        <input type="password" v-model="userInfo.user_pwd" />
      </div>
      <div class="login_item">
        <p class="form_title">验证码</p>
        <input type="text" v-model="userInfo.code" @keyup.enter="login" />
        <img
          :src="check_code_img"
          alt="验证码"
          class="ver-code"
          @click="verifyCode"
        />
      </div>
      <div class="login_item">
        <button @click="login">登录</button>
        <button @click="register">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { register, verifyCode } from "@/api/login";
export default {
  data() {
    return {
      userInfo: {
        user_id: "",
        user_name: "admin",
        user_pwd: "",
        code: ""
      },
      check_code_img: "",
      check_code_token: ""
    };
  },
  created() {
    this.$nextTick(() => {
      this.verifyCode();
    });
  },
  methods: {
    login() {
      if (
        this.userInfo.user_id == "" ||
        this.userInfo.user_pwd == "" ||
        this.userInfo.code == ""
      ) {
        alert("请填写完，登录信息！！");
        return;
      }
      this.userInfo.token = this.check_code_token;
      this.$store
        .dispatch("Login", this.userInfo)
        .then(() => {
          this.loading = false;
          this.$router.push({ path: this.redirect || "/" });
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    register() {
      register(this.userInfo).then(res => {
        console.log(res);
      });
    },
    verifyCode() {
      verifyCode().then(res => {
        this.check_code_img = res.img;
        this.check_code_token = res.token;
      });
    }
  }
};
</script>

<style lang="scss">
.login {
  $color: #92acc3;
  background-size: cover;
  width: 100%;
  height: 100vh;
  .login_form {
    border: 1px solid $color;
    width: 400px;
    margin: 0 auto;
    position: relative;
    top: 200px;
    padding-bottom: 10px;
    transition: box-shadow 0.3s;
    &:hover {
      box-shadow: 0 0 20px $color;
    }
    .login_title {
      height: 40px;
      line-height: 40px;
      font-size: 26px;
      padding: 10px 0;
      text-align: center;
      border-bottom: 1px solid $color;
      color: $color;
      font-weight: bold;
    }
    .login_item {
      position: relative;
      display: flex;
      height: 25px;
      line-height: 25px;
      padding: 10px;
      margin: 10px 0;
      .form_title {
        width: 80px;
        text-align: right;
        margin-right: 20px;
        color: $color;
        font-size: 16px;
      }
      input {
        flex: 1;
        margin-right: 20px;
        border: none;
        background-color: transparent;
        border-bottom: 1px dotted $color;
        outline: none;
        box-sizing: border-box;
        padding-left: 5px;
        font-size: 16px;
        color: $color;
        transition: border 0.6s;
        &:focus {
          border-bottom-color: red;
        }
      }
      img {
        position: absolute;
        right: 30px;
        top: 0;
      }
      button {
        width: 180px;
        height: 40px;
        display: block;
        margin: 5px auto;
        cursor: pointer;
        background: transparent;
        border: 1px solid $color;
        color: $color;
        outline: none;
        font-size: 16px;
        letter-spacing: 4px;
        &:active {
          background: $color;
          color: #666;
        }
      }
    }
  }
}
</style>
