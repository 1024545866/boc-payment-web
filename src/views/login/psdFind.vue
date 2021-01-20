<template>
  <div class="psdFind">
    <el-row class="element-space">
      <el-col>
        <i class="ace-icon fa fa-coffee green"></i>
        <span class="title">找回密码</span>
      </el-col>
    </el-row>
    <el-form autoComplete="on" :model="psdForm" :rules="psdRules" ref=" psdForm" label-position="left" label-width="0px" class="card-box login-form">
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item prop="phoneFind">
            <el-input name="phone" type="text" v-model=" psdForm.phoneFind" autoComplete="on" placeholder="请输入手机号码">
              <template slot="prepend">手机号：</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">发送</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row  class="back-entry">
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
    name: 'psdFind',
    props:[''],
    data() {
      var validatePhone = (rule, value, callback) => {
          var reg = /^1[0-9]{10}$/;
          if (!reg.test(value)) {
            callback(new Error('请输入正确的手机号码'));
          } else {
            callback();
          }
        };
      return {
        psdForm: {
          phoneFind: ''
        },
        psdRules:{
          phoneFind:[{
            required:true,
            message:'请输入号码',
            trigger:'blur'
          },{
            required: true,
            trigger: 'blur',
            validator: validatePhone
          }]
            }
      }
    },
    methods: {
      //返回登录页
      reversalEntry(){
        this.$emit('reversalPage','entry');
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .psdFind{
    position: absolute;
    right: 0px;
    width: 400px;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 15px;
    background: #fffef7;
    .element-space{
      margin-bottom: 20px;
    }
    //表单
    .login-form{
      margin-bottom: 20px;
    }
    .back-entry{
      text-align:center;
      span{
        cursor: pointer;
        &:hover{
          color: #0092DD;
        }
      }
    }
  }
</style>
