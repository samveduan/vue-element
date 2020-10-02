<template>
  <div id="login-container">
    <div id="login">
      <form id="login-form" class="form-horizontal" action="">
        <div id="login-name">
          <div id="login-logo">React 管理系统</div>
        </div>

        <div class="form-group login-input-container" id="login-user-name-container">
          <span class="input-group-addon login-icon" style="color: #555555;">
            <i class="glyphicon glyphicon-user" aria-hidden="true" style="padding-top: 2px;"></i>
          </span>
          <div class="col-lg-12 col-md-12 col-sm-12" style="height: 34px;">
            <input
              type="text"
              class="form-control login-input"
              id="login-user-name"
              name="loginUserName"
              autocomplete="off"
              placeholder="用户名"
            />
            <div class="login-input-below bg-white" id="login-user-name-tips"></div>
          </div>
        </div>

        <div class="form-group login-input-container" id="login-password-container">
          <span class="input-group-addon login-icon" style="color: #555555;">
            <i class="glyphicon glyphicon-lock" aria-hidden="true" style="padding-top: 2px;"></i>
          </span>

          <div class="col-lg-12 col-md-12 col-sm-12" style="height: 34px;">
            <input
              type="password"
              class="form-control login-input"
              id="login-password"
              name="loginPassword"
              autocomplete="new-password"
              placeholder="密码"
            />
            <div class="login-input-below bg-white" id="login-password-tips"></div>
          </div>
        </div>

        <button
          class="btn btn-success"
          id="login-submit"
          type="submit"
          style
        >登&nbsp;&nbsp;&nbsp;&nbsp;录</button>

        <div id="copyright"></div>
      </form>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {},
  mounted() {
    let _this = this;
    $("#login-form")
      .bootstrapValidator({
        message: "This value is not valid",
        feedbackIcons: {
          valid: "glyphicon glyphicon-ok",
          invalid: "glyphicon glyphicon-remove",
          validating: "glyphicon glyphicon-refresh"
        },
        fields: {
          loginUserName: {
            message: "用户名无效",
            validators: {
              notEmpty: {
                message: "用户名不能为空"
              },
              regexp: {
                regexp: /^[a-zA-Z0-9_()（）\u4e00-\u9fa5]{1,32}$/,
                message:
                  "用户名为1至32位汉字、字母、数字、下划线或中英文括号，为了能在路径中尽可能多的显示文件夹，请尽量减小名称长度！"
              }
            }
          },
          loginPassword: {
            message: "密码无效",
            validators: {
              notEmpty: {
                message: "密码不能为空"
              },
              regexp: {
                regexp: /^[a-zA-Z0-9_()（）\u4e00-\u9fa5]{1,32}$/,
                message:
                  "密码为1至32位汉字、字母、数字、下划线或中英文括号，为了能在路径中尽可能多的显示文件夹，请尽量减小名称长度！"
              }
            }
          }
        }
      })
      .on("success.form.bv", function(e) {
        e.preventDefault();
        console.log("test!");

        let param = new URLSearchParams();
        param.append("username", $("#login-user-name").val());
        param.append("password", $("#login-password").val());

        _this.$axios({
          method: "POST",
          url: "/api/blog/check_login_status/",
          data: param
        })
          .then(res => {
            if (res.data.ret) {
              localStorage.setItem("islogin", 1);
              _this.$router.push({ path: "/radio" });
            } else {
              _this.$message("用户名或密码错误！");
              return false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
  }
};
</script>
 
<style scoped>
body {
  margin: 0;
}

#login {
  top: 38%;
  position: fixed;
  width: 420px;
  left: 50%;
  margin-left: -210px;
  margin-top: -187px;
  height: 374px;
  /*background: #ffffff;*/
  border: 0 solid #d8d8d8;
  padding-top: 40px;
  padding-bottom: 30px;
  padding-left: 54px;
  padding-right: 54px;
  font-family: "微软雅黑";
}

#login-name {
  position: relative;
  height: 60px;
  line-height: 60px;
  font-size: 36px;
  text-align: center;
  margin-bottom: 24px;
  color: #002a8d;
  font-family: "微软雅黑";
  font-weight: bold;
  color: #ffffff;
  text-shadow: rgb(51, 51, 51) 1px 1px 1px;
}
#login-logo {
  position: absolute;
  width: 434px;
  text-align: center;
  height: 60px;
  line-height: 60px;
  position: absolute;
  left: -61px;
  top: -15px;
}
.login-icon {
  position: absolute;
  left: 16px;
  top: 1px;
  width: 40px;
  height: 32px;
  z-index: 1;
  background: #f0f0f0;
  border-top: 0 solid #e4eaec;
  border-left: 0 solid #e4eaec;
  border-bottom: 0 solid #e4eaec;
}

.login-input-container {
  position: relative;
  margin-bottom: 25px;
  height: 34px;
  clear: both;
}

.login-input {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 15px;
  width: 312px;
  height: 34px;
  background: transparent;
  padding-left: 50px;
  z-index: 2;
}

.login-input-below {
  margin-left: 20px;
  margin-right: -20px;
  padding-left: 50px;
  color: #999999;
  position: absolute;
  left: 0;
  top: 0;
  width: 308px;
  height: 34px;
  line-height: 34px;
  z-index: 0;
  border: 0 solid #000000;
}

#login-setting {
  position: absolute;
  right: -30px;
  top: 0;
  width: 40px;
  height: 32px;
  line-height: 32px;
}

#certificate-setting-button {
  color: #ffffff;
  text-shadow: 1px 1px 1px #666666;
}

#login-submit {
  width: 100%;
  color: #ffffff;
  font-size: 18px;
  margin-left: 0;
  margin-bottom: 15px;
}

#copyright {
  position: absolute;
  width: 100%;
  height: 50px;
  line-height: 50px;
  bottom: -10px;
  left: 0;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  text-shadow: 1px 1px 1px #666666;
}

.bg-white {
  background: #ffffff;
}

.help-block {
    display: block;
    margin-top: 38px !important;
    margin-bottom: 10px;
    color: #737373;
}
</style>