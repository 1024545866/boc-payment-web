<template>
	<div id="formSubmitStyle">
		<el-row >
			<el-col :span="14" class="top-row">
				<el-button-group id="el_buttonStyle">
					<el-button type="primary"  v-if="showButton.save"   v-show="stateBtnSubmit" size="small" title="确定" @click="save">确定</el-button>
					<el-button type="primary"  v-if="showButton.cancel" v-show="stateBtnSubmit" size="small" title="取消" @click="reset('form')">取消</el-button>
					<el-button type="primary"  v-if="showButton.addCard" v-show="!stateBtnSubmit" size="small" title="添加" @click="add">添加</el-button>
					<el-button type="primary"  v-if="showButton.edit" v-show="!stateBtnSubmit" size="small" title="编辑" @click="edit">编辑</el-button>
					<el-button type="primary"  v-if="showButton.refreshcard" v-show="!stateBtnSubmit&&primaryId!=null&&primaryId!=undefined" size="small" title="刷新" @click="refresh">刷新</el-button>
					<el-button type="primary"  v-if="showButton.return"  v-show="!stateBtnSubmit" size="small" title="删除" @click="goBack">返回</el-button>
				</el-button-group>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-form :model="form" :inline="true" :show-message="false" ref="form" label-width="100px" class="demo-ruleForm">
					<el-input v-model="form.id" type="hidden" prop="id" class="hidden"></el-input>
					<el-row>
						<el-col :span="7">
							<el-form-item label="渠道类型：" prop="mchType"
							:rules="[{required: true,trigger: 'blur' }]"
							>
								<drop-select dataKey="payment_qdlx" :dataValue.sync="form.mchType" :disabled="!stateBtnSubmit"></drop-select>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="商户代码：" prop="mchCode"
							:rules="[{required: true,trigger: 'blur' }]"
							>
								<el-input v-model="form.mchCode" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="商户名称：" prop="mchName"
							:rules="[{required: true,trigger: 'blur' }]"
							>
								<el-input v-model="form.mchName" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="7">
							<el-form-item label="商户状态：" prop="mchStatus"
							:rules="[{required: true,trigger: 'blur' }]"
							>
								<drop-select dataKey="payment_sfqy" :dataValue.sync="form.mchStatus" :disabled="!stateBtnSubmit"></drop-select>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="所属公司：" prop="corpId"
							:rules="[{trigger: 'blur' }]"
							>
								<el-input v-model="form.corpId" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="商户IP：" prop="mchIp"
							:rules="[{trigger: 'blur' }]"
							>
								<el-input v-model="form.mchIp" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="textarea">
						<el-col :span="21">
							<el-form-item label="商户地址：" prop="mchUrl" class="textarea"
							:rules="[{trigger: 'blur' }]"
							>
								<div class="textarea-border">
									<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.mchUrl" :disabled="!stateBtnSubmit"></el-input>
								</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="7">
							<el-form-item label="访问协议：" prop="protocol"
							:rules="[{trigger: 'blur' }]"
							>
								<el-input v-model="form.protocol" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="证书ID：" prop="certId"
							:rules="[{trigger: 'blur' }]"
							>
								<el-input v-model="form.certId" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="签名方法：" prop="signMethod"
							:rules="[{required: true,trigger: 'blur' }]"
							>
								<el-input v-model="form.signMethod" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="7">
							<el-form-item label="签名密钥：" prop="secureKey"
							:rules="[{trigger: 'blur' }]"
							>
								<el-input v-model="form.secureKey" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="签名证书路径：" prop="signCertPath"
							:rules="[{required: true,trigger: 'blur' }]"
							>
								<el-input v-model="form.signCertPath" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="签名证书密码：" prop="signCertPwd"
							:rules="[{required: true,trigger: 'blur' }]"
							>
								<el-input v-model="form.signCertPwd" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="7">
							<el-form-item label="敏感信息加密证书路径：" prop="encryptCertPath"
							:rules="[{required: true,trigger: 'blur' }]"
							>
								<el-input v-model="form.encryptCertPath" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="验签根证书路径：" prop="rootCertPath"
							:rules="[{required: true,trigger: 'blur' }]"
							>
								<el-input v-model="form.rootCertPath" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="7">
							<el-form-item label="验签中级证书路径：" prop="middleCertPath"
							:rules="[{required: true,trigger: 'blur' }]"
							>
								<el-input v-model="form.middleCertPath" :disabled="!stateBtnSubmit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="textarea">
						<el-col :span="21">
							<el-form-item label="备注：" prop="memo" class="textarea"
							:rules="[{trigger: 'blur' }]"
							>
								<div class="textarea-border">
									<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.memo" :disabled="!stateBtnSubmit"></el-input>
								</div>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { addPayMerchant,getPayMerchant,putPayMerchant} from "views/modules/basic/common/api/merchant/payMerchantIndex";
import { getFormList} from "utils/dataUtils";
import treeSelect from "components/tree/treeSelect";
import gridSelect from "components/grid/gridSelect";
import dropSelect from "components/select/dropSelect";
export default {
  name:'payMerchantForm',
  computed: {
    ...mapGetters(["token","showButton"])
  },
  components: {
     treeSelect,
     gridSelect,
     dropSelect
  },
  data() {
    return {
      stateBtnSubmit:false,
      form: {middleCertPath:undefined,protocol:undefined,operateTime:undefined,memo:undefined,rootCertPath:undefined,signCertPath:undefined,operateId:{id:undefined,name:undefined},secureKey:undefined,mchUrl:undefined,signCertPwd:undefined,mchStatus:undefined,id:undefined,signMethod:undefined,mchCode:undefined,certId:undefined,encryptCertPath:undefined,modifyId:{id:undefined,name:undefined},mchType:undefined,modifyTime:undefined,mchIp:undefined,mchName:undefined,corpId:undefined}
    };
  },
  props: {
    primaryId: { type: String, default: undefined },
    stateBtn: { type: Boolean, default: true }
  },
  watch: {
    primaryId: function() {
      this.$refs["form"].resetFields();
      if (this.primaryId != null&&this.primaryId!=undefined) {
        this.getFormData();
      }
    },
    stateBtn:function(val){
      this.stateBtnSubmit = val;
    }
  },
  methods: {
    add(){//添加按钮
      this.$refs["form"].resetFields();
      this.stateBtnSubmit = !this.stateBtnSubmit;
      this.$emit("update:primaryId",null)
    },
    edit(){//编辑按钮 设置表单为编辑模式
      this.stateBtnSubmit = !this.stateBtnSubmit;
    },
    reset() {
      this.stateBtnSubmit = !this.stateBtnSubmit;
      //取消按钮  取消对当前表单的操作
      if(this.primaryId!=null&&this.primaryId!=undefined){
          this.getFormData();
      }else{
          this.$refs["form"].resetFields();
      }
    },
    save() {
      //保存
      this.$refs["form"].validate((valid) => {
        if(valid){
          if (this.primaryId == null) {
            addPayMerchant(this.form).then(response => {
              if (response.code == 200) {
                this.stateBtnSubmit = !this.stateBtnSubmit;
                this.$notify({ title: "成功", message: "保存信息成功!", type: "success" });
                this.$refs["form"].resetFields();
              } else {
                this.$notify({ title: "错误", message: "保存信息失败!", type: "error" });
              }
            });
          } else {
            putPayMerchant(this.primaryId, this.form).then(response => {
              if (response.code == 200) {
                this.$notify({ title: "成功", message: "更新信息成功!", type: "success" });
                this.stateBtnSubmit =!this.stateBtnSubmit;
            	this.getFormData();
              } else {
                this.$notify({ title: "警告", message: "更新信息失败!", type: "warning" });
              }
            });
          }
        }
        else{
           this.$notify({ title: "错误提示", message: "输入错误!请检查并更正", type: "error" });
        }
      });
    },
    refresh(){
      this.getFormData();
    },
    getFormData() {
      //组装数据
      getPayMerchant(this.primaryId).then(response => {
	    if(response.code =="200"){
		   this.form = getFormList(response.data,this.form);
		}
		else{
		   this.$notify({ title: "错误", message: "加载数据失败!", type: "error" });
		}
      });
    },
    goBack() {
      this.$emit("is-show", true);
      this.$emit("update:stateBtn",false);
      //重置form表单
      this.$refs["form"].resetFields();
    },
  }
};
</script>

<style rel="stylesheet">
</style>