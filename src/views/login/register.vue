<template>
  <div class="register-container">
      <el-row class="userRegister">
        <el-col>
          <i class="ace-icon fa fa-coffee green"></i>
          <span class="title">用户注册</span>
        </el-col>
      </el-row>
      <el-form :model="ruleForm" status-icon :rules="registerRules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="registerPhone" class="registerPhone">
          <el-input name="registerPhone" type="text" v-model="ruleForm.registerPhone" autoComplete="on" placeholder="请输入手机号码">
            <template slot="prepend">手机号：</template>
          </el-input>
        </el-form-item>

        <!--验证码-->
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item prop="verify" class="verify">
              <el-input name="verify" type="text" v-model="ruleForm.verify" autoComplete="on" placeholder="验证码">
                <template slot="prepend">验证码：</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type ="primary" @click.native.prevent="handleLogin">
              获取验证码
            </el-button>
          </el-col>
        </el-row>

        <!--用户名-->
        <el-form-item prop="registerUsername" class="registerUsername">
          <el-input name="username" type="text" v-model="ruleForm.registerUsername" autoComplete="on" placeholder="用户名">
            <template slot="prepend">用户名：</template>
          </el-input>
        </el-form-item>

        <!--密码-->
        <el-form-item prop="registerPsd" style="margin-bottom: 20px;">
          <el-input name="registerPsd" type="password" v-model="ruleForm.registerPsd" autoComplete="on" placeholder="密码">
            <template slot="prepend">密码：</template>
          </el-input>
        </el-form-item>

        <!--重复密码-->
        <el-form-item prop="repeatPsd" class="repeatPsd">
          <el-input name="repeatPsd" type="password" v-model="ruleForm.repeatPsd" autoComplete="on" placeholder="再次输入密码">
            <template slot="prepend">重复密码：</template>
          </el-input>
        </el-form-item>


        <!--注册协议-->
        <el-row class="protocol">
          <el-col>
            <template>
              <el-checkbox v-model="checked"> 我接受</el-checkbox>
              <a href="#">《FUP用户注册协议》</a>
            </template>
            <div class="el-form-item__error"  :class="{hidden:!checked}">
              必须接受用户协议
            </div>
          </el-col>
        </el-row>

        <!--重置与注册-->
          <el-row class="reset">
            <el-col :span="12">
              <el-button @click="resetForm('ruleForm')" class="resetButton">重置</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
            </el-col>
          </el-row>
      </el-form>

      <!--返回登陆-->
      <el-row class="back-entry">
        <el-col>
          <span @click="reversalEntry()">
            返回登陆
          </span>

        </el-col>
      </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      // // 密码验证
      // var validatePsd = (rule, value, callback) =>{
      //   var reg = /^[A-Za-z0-9]{6,20}$/;
      //   if(value === ''){
      //     return callback(new Error('请输入密码'))
      //   }else if(!reg.test(value)){
      //     return callback(new Error('密码为6-20为字母数字组合'))
      //   }else if(this.ruleForm.registerPsd !==''){
      //     this.$refs.ruleForm.validateField('registerPsd')
      //   }else{
      //     callback();
      //   }
      // };
      // var validateRpsd = (rule, value, callback) =>{
      //   if(value ===''){
      //     return callback(new Error('请再次输入密码'))
      //   }else if (value !== this.ruleForm.registerPsd) {
      //     callback(new Error('两次输入密码不一致!'));
      //   } else {
      //     callback();
      //   }
      // };
      // // // 手机号码验证
      // // var validatePhone = (rule, value, callback) => {
      // //   var reg = /^1[0-9]{10}$/;
      // //   if (!reg.test(value)) {
      // //     callback(new Error('请输入正确的手机号码'));
      // //   } else {
      // //     callback();
      // //   }
      // // };
      return{
        ruleForm:{
          registerPhone:'',
          verify: '',
          registerUsername:'',
          registerPsd:'',
          repeatPsd:''
        },
        checked:false,
        registerRules:{
          registerUsername: [{
            required: true,
            message: '账户不能为空',
            trigger: 'blur'
          }],
          registerPhone:[{
            required:true,
            message:'请输入号码',
            trigger:'blur'
          }
          // ,
          //   {
          //   required: true,
          //   trigger: 'blur',
          //   validator: validatePhone
          // }
          ],
          verify:[{
            required:true,
            message:'请输入验证码',
            trigger:'blur'
          }],
          // registerPsd:[{
          //  validator: validatePsd,
          //  trigger: 'blur'
          // }],
          // repeatPsd:[{
          //   validator: validateRpsd,
          //   trigger: 'blur'
          // }]
        },
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid && this.checked===true) {
            alert('表单提交成功')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      reversalEntry(){
        this.$emit('reversalPage','entry');
      }
    }
  }

</script>

<style  lang="scss" scoped>
  $mgnB20:20px;
  .register-container{
    position: absolute;
    right: 0px;
    width: 400px;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 15px;
    background: #fffef7;
    .userRegister{
     margin-bottom:$mgnB20;
    }

    //表单部分
    .registerPhone, .verify,.registerUsername,
    .repeatPsd,.protocol,.reset{
      margin-bottom: $mgnB20;
    }

    .reset{
      .el-col:first-child{
        text-align: center;
        .resetButton{
            padding:12px 40px;
          }
      }
      .el-col:last-child{
        text-align: right;
      }
    }

    .back-entry{
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
