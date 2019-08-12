<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>

          <div id="loginform" name="loginform" class="login-box">
            <div class="input-box">
              <input
                v-model="username"
                id="txtUserName"
                name="txtUserName"
                type="text"
                placeholder="用户名/手机/邮箱"
                maxlength="50"
              />
            </div>
            <div class="input-box">
              <input
                v-model="password"
                id="txtPassword"
                name="txtPassword"
                type="password"
                placeholder="输入登录密码"
                maxlength="16"
              />
            </div>
            <div class="btn-box">
              <input id="btnSubmit" name="btnSubmit" type="submit" value="立即登录" @click="toLogin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: "",
      username: ""
    };
  },
  methods: {
    toLogin() {
      if (this.username == "") {
        this.$message.warning("请输入账号!");
        return;
      }
      if (this.password == "") {
        this.$message.warning("请输入密码!");
        return;
      }

      //发请求
      this.$axios
        .post("site/account/login", {
          user_name: this.username,
          password: this.password
        })
        .then(res => {
          if (res.data.status == 0) {
            this.$message.success(res.data.message);
            //跳转到首页
            this.$router.push("/index");
          } else {
            this.$message.error(res.data.message);
          }
        });
    }
  }
};
</script>
<style>
</style>