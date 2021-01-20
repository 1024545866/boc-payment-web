<template>
  <div class="login-container">
    <el-row class="userLogin">
      <el-col>
        <i class="ace-icon fa fa-coffee green"></i>
        <span class="title">用户登录</span>
      </el-col>
    </el-row>

    <!--表单-->
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <el-form-item prop="username" class="username">
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名">
          <template slot="prepend">账户：</template>
        </el-input>
      </el-form-item>
      <el-row>
        <el-col :span="18">
          <el-form-item prop="password" class="password">
            <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码">
              <template slot="prepend">密码：</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div @click="reversalPsdFind()" class="forgetPsd">
            忘记密码？
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item prop="code" class="password">
            <el-input name="code" type="text" v-model="loginForm.code" autoComplete="on" placeholder="验证码">
              <template slot="prepend">验证码：</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" >
          <div class="forgetPsd" @click="getCaptchaFun()" >
            <img  id="vimg" style="cursor:pointer;width:80px;height:30px;" title="验证码" width="60" height="37"  @click="getCaptchaFun()" z-index="99999" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="17">
          <template>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </template>
        </el-col>
        <el-col :span="7">
          <el-button id="loginBtn" type="primary" size="small" class="login-button" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="quick-login">
      <el-col>
        <span @click="reversalRegister()">
          没有账户？立即注册
        </span>
      </el-col>
    </el-row>
    <!--第三方验证-->
    <el-dialog title="第三方验证" :visible.sync="showDialog">
      邮箱登录成功,请选择第三方验证
      <social-sign></social-sign>
    </el-dialog>
  </div>
</template>

<script>
import store from 'store';
import { createUUId } from "utils/dataUtils";
import { getCaptcha } from "./common/api/login";
  export default {
    name: 'entry',
    created(){
      this.uuid = createUUId();
      // this.getCaptchaFun();
    },
    mounted() {
      $(function() {
        $("#vimg").click();
        $(document).keydown(function(event){
          event = event ? event : window.event;
          if (event.keyCode === 13){
            $("#loginBtn").trigger("click");
          }
        });
      });
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'));
        } else {
          callback();
        }
      };
      return {
        uuid:undefined,
        checked: true,
        loginForm: {
          username: '',
          password: '',
          code:'',
          requestCode:''
        },
        loginRules: {
          username: [{
            required: true,
            message: '账户不能为空',
            trigger: 'blur'
          },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePass
          }],
          code: [{
            required: true,
            trigger: 'blur',
            message: '验证码不能为空',
          }]
        },
        loading: false,
        showDialog: false
      }
    },
    methods: {
      getCaptchaFun(){//获取二维码
            $("#vimg").attr("src", "/api/admin/sys/captcha?requestCode="+this.uuid);
            // getCaptcha(this.uuid).then(request =>{
            //     $("#vimg").attr("src","/api/admin/sys/captcha.do?requestCode="+this.uuid);
            // })
      },
      handleLogin() {
        this.loginForm.requestCode = this.uuid;
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('LoginByEmail', this.loginForm).then(response => {
              this.loading = false;
               const code = response.code!=undefined? response.code:0;
              if(code===60106||code === 60403){
                  this.getCaptchaFun();
              }else{
                  this.$router.push({
                    path: '/'
                  });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //进入注册页
      reversalRegister(){
        this.$emit('reversalPage','register');
        console.log(this.timer);
      },
      //进入忘记密码页
      reversalPsdFind(){
        this.$emit('reversalPage','psdFind');
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
    $mgnB20:20px;

    .login-container {
      position: absolute;
      right: 0px;
      width: 400px;
      border: 1px solid #ddd;
      padding: 20px;
      border-radius: 15px;
      background: #fffef7;
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
        -webkit-text-fill-color: #140c09 !important;
      }
      //用户登录
      .userLogin{
        margin-bottom:$mgnB20;
      }

      //form
      .login-form{
        margin-bottom:$mgnB20;

        .username,.password{
          margin-bottom:$mgnB20;
        }

        .login-button{
          width:100%;
        }
      }

      //忘记密码
      .forgetPsd{
        text-align:right;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
          &:hover{
            color: #0092DD;
          }
      }

      //立即注册
      .quick-login{
        text-align: center;
        span{
          cursor: pointer;
          &:hover{
            color: #0092DD;
          }
        }
      }
    }

</style>
