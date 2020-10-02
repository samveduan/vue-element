<template>
  <el-row style="height: 80px;">
    <el-col :span="5" class="logo">Vue管理系统</el-col>
    <el-col :offset="12" :span="4" style="padding-top: 10px;"></el-col>
    <el-col :span="2" :offset="1">
      <el-dropdown style="float: right;">
        <span class="el-dropdown-link" style="color: #ffffff;">
          user001
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-setting">设置默认密级</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-close" @click.native="loginout()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    };
  },
  methods: {
    loginout(){
      console.log("test");
      localStorage.setItem("islogin", 0);
      this.$router.push({path: "/login"});
    }
  }
};
</script>

<style scoped>
.logo {
  height: 80px;
  line-height: 80px;
  font-size: 32px;
  font-family: "微软雅黑";
  font-weight: bold;
  text-shadow: 0 0 5px #000000;
}
</style>
