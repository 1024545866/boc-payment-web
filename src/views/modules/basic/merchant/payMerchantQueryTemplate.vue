<template>
	<div id="queryTemplate">
		<el-row>
			<el-col :span="24">
				<el-form :model="queryform" :status-icon="true" :show-message="false" :inline="true" ref="queryform" label-width="100px" class="demo-ruleForm">
					<el-input v-model="queryform.id" type="hidden" prop="id" class="hidden"></el-input>
					<el-row>
						<el-col :span="11">
							<el-form-item label="渠道类型：" prop="mchType">
								<drop-select dataKey="payment_qdlx" :dataValue.sync="queryform.mchType"></drop-select>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item label="商户代码：" prop="mchCode">
								<el-input v-model="queryform.mchCode"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="11">
							<el-form-item label="商户名称：" prop="mchName">
								<el-input v-model="queryform.mchName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item label="商户状态：" prop="mchStatus">
								<drop-select dataKey="payment_sfqy" :dataValue.sync="queryform.mchStatus"></drop-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="11">
							<el-form-item label="所属公司：" prop="corpId">
								<el-input v-model="queryform.corpId"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import treeSelect from "components/tree/treeSelect";
import gridSelect from "components/grid/gridSelect";
import dropSelect from "components/select/dropSelect";
export default {
  name:'payMerchantQueryTemplate',
  components: {
     treeSelect,
     gridSelect,
     dropSelect
  },
  data() {
    return {
      queryform: {mchCode:undefined,mchType:undefined,mchStatus:undefined,corpId:undefined,mchName:undefined}
    };
  },
  props: {
    submitSearch:{type:String,}
  },
  watch: {
    submitSearch: function(val) {
      if (val == "true") {
        this.$emit("query-data",this.queryform);
      }else if(val=="false"){
        this.$refs["queryform"].resetFields();
        setTimeout(()=>{
            this.$emit("refresh-quey-data",this.queryform);
            },200)
      };
      setTimeout(()=>{
        this.$emit("update:submitSearch","0");
      },200)
    },
  }
};
</script>

<style rel="stylesheet" lang="scss" scoped>

</style>