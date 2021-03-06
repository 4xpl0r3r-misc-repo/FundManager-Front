<template>
  <el-card class="box-card">
    <el-form action="submit">
      <h2>登录</h2>
      <!-- user -->
      <el-form-item>
        <el-input v-model="loginform.username" prefix-icon="el-icon-info" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item>
        <el-input
          type="password"
          v-model="loginform.password"
          prefix-icon="el-icon-warning"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
      <el-form-item>
        <a href="#">没有账号，去注册</a>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- LoginBox end -->
</template>


<script>
export default {
  data() {
    return {
      loginform: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    // getData() {
    //   this.$axios
    //     .get("http://localhost:8888/")
    //     .then((res) => {
    //       this.data = res.data.url;
    //     })
    //     .catch((error) => console.log(error));
    // },
    login() {
      let param = { username: "java", password: "java" };
      this.$http
        .post("/login", param)
        .then((res) => {
          // if (res.data.code === 200) {
          //   this.$router.replace({ path: "/index" });
          // }
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
.box-card {
  width: 400px;
  padding: 35px;
  color: #eee;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -250px;
  background: rgba(22, 32, 41, 0.75);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.box-card h2 {
  text-align: center;
  height: 20px;
  font: "microsoft yahei", Helvetica, Tahoma, Arial, "Microsoft jhengHei",
    sans-serif;
  color: #fff;
  line-height: 20px;
  padding: 0 0 35px 0;
}
</style>