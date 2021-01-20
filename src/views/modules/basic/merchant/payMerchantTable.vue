<template>
    <div>
      <div v-show="isShow" id="tableRow">
        <!-- 顶部标签按钮组件-->
        <el-row class="top-row">
          <el-col :span="14">
             <el-button-group id="el_buttonStyle">
                <el-button v-if="showButton.add" type="primary" size="small" title="添加" @click="add">添加</el-button>
                <el-button v-if="showButton.edit" type="primary" size="small" title="修改" @click="update">修改</el-button>
                <el-button v-if="showButton.delete" type="primary" size="small" title="删除" @click="del">删除</el-button>
                <el-button v-if="showButton.query" type="primary" size="small" title="详情" @click="detail">详情</el-button>
                <!-- <el-button v-if="showButton.importall" type="primary" size="small" title="导入" @click="upload">导入</el-button> -->
                <!-- <el-button v-if="showButton.exportall" type="primary" size="small" title="导出" @click="download">导出</el-button> -->
                <el-button v-if="showButton.refresh" type="primary" size="small" title="刷新" @click="refresh(true)">刷新</el-button>
             </el-button-group> 
            </el-col>
            <el-col :span="10"  class="query">
              <div  class="el-input el-input--small el-input-group el-input-group--append">
                <input v-model="tableParams.searchValue" autocomplete="off" placeholder="请输入内容" size="small" type="text" rows="2" validateevent="true" class="el-input__inner">
                <div class="el-input-group__append" @click="search">
                  <i  class="el-icon-search"></i>
                </div>
              </div>
              <el-button type="primary" title="高级查询" size="small"  @click="queDialogVisible = true" v-if="showButton.highquery">高级查询</el-button>
            </el-col>
        </el-row>

        <!-- 渲染table数据-->
        <div class="tableOrPageSort">
        <el-row>  
          <el-col :span="24" class="singleTableStyle">
            <el-table ref="payMerchantTable" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" 
             element-loading-background="#fff" :data="payMerchantTable" :default-sort = "{prop: 'date', order: 'descending'}"  border id="payMerchantTable"  size="medium" style="width:100%"
             @row-click="rowClickThis" :row-class-name="tableRowClassName">
              <el-table-column  type="selection" prop="id" width="31" ></el-table-column>
              <el-table-column  type="index" :index="indexMethod" label="序号" width="45"></el-table-column>
              
	          <el-table-column  prop="mchType" label="渠道类型" width="255" sortable show-overflow-tooltip>
	            <template slot-scope="scope">
                   <span>{{getDictLable("payment_qdlx",scope.row.mchType)}}</span>
                </template>
	          </el-table-column>
	          <el-table-column  prop="mchCode" label="商户代码" width="255" sortable show-overflow-tooltip></el-table-column>
	          <el-table-column  prop="mchName" label="商户名称" width="255" sortable show-overflow-tooltip></el-table-column>
	          <el-table-column  prop="mchStatus" label="商户状态" width="255" sortable show-overflow-tooltip>
	            <template slot-scope="scope">
                   <span>{{getDictLable("payment_sfqy",scope.row.mchStatus)}}</span>
                </template>
	          </el-table-column>
	          <el-table-column  prop="corpId" label="所属公司" width="255" sortable show-overflow-tooltip></el-table-column>
	          <el-table-column  prop="mchIp" label="商户IP" width="255" sortable show-overflow-tooltip></el-table-column>
	          <el-table-column  prop="mchUrl" label="商户地址" width="255" sortable show-overflow-tooltip></el-table-column>
	          <el-table-column  prop="protocol" label="访问协议" width="255" sortable show-overflow-tooltip></el-table-column>
              <el-table-column  label="操作" width="100">
                <template slot-scope="scope">
                  <button class="btn-editor" title="修改" v-if="showButton.edit"  @click.stop="updateRow(scope.row)">修改</button>	
              	  <button class="btn-delete" title="删除" v-if="showButton.delete" @click.stop="delRow(scope.row)">删除</button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
    
        <!-- 分页及页数选择 -->
        <el-row v-show="isShow" class="sort-page">
          <el-col :span="24" >
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[ 10, 20, 50, 100]"
              :page-size="pageSizes"
              size="5"
              layout="total, sizes, next, pager, prev, jumper"
              :total="tableTotal">
            </el-pagination>
          </el-col>
        </el-row>
       </div>
      </div>
      <!-- 渲染表单页面 -->
      <el-row v-show="!isShow">
        <el-col :span="24">
          <pay-merchant-form  @is-show="show" :primaryId.sync="primaryId" :stateBtn.sync="stateBtn"></pay-merchant-form>
        </el-col>
      </el-row>
      <!--弹出窗-->
      <div class="delete-pop-up">
          <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" @close="$emit('update:show', false)">
            <div v-if="dialogType === 1">
              <span>{{dialogMessage}}</span>
            </div>
            <div v-if="dialogType === 2" class="uploadFile">
              <form id="fileUploadForm" enctype="multipart/form-data">
                <input id="file" type="file" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" name="选择文件"  onchange='filepath.value=this.value'/>
                <el-input type="text" id="filepath"  readonly="readonly" placeholder="请上传小于5M“xls”/“xlsx”格式的文件！">
                    <el-button slot="append" icon="el-icon-upload" id="filebutton" onclick="file.click()">
                      	点我上传
                    </el-button>
                </el-input> 
              </form>
            </div> 
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" v-show="downloadState" @click="downloadTemplate">下载模板</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitDialog">确 定</el-button>
            </span>
          </el-dialog>
      </div>
      <!--查询提示弹出窗-->
      <div class="query-pop-up">
        <el-dialog  title="请输入要查询的字段"  :visible.sync="queDialogVisible" width="30%" @close="$emit('update:show', false)">
         <!-- 查询模板组件 -->
          <query-template @query-data="getQueryData" @refresh-quey-data="refreshQueyData" :submitSearch.sync="submitSearch"></query-template>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitSearchBtn('false')">清空条件</el-button>
            <el-button @click="queDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitSearchBtn('true')">搜索</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>


<script>
import Vue from 'vue';
import { mapGetters } from "vuex";
import payMerchantForm from "./payMerchantForm";
import { mergeQuery,appendQueryParams,getDictLableName } from "utils/dataUtils";
import queryTemplate from './payMerchantQueryTemplate';
import { getPayMerchantTable ,deleteAllPayMerchant,putPayMerchantExcel,getPayMerchant} from "views/modules/basic/common/api/merchant/payMerchantIndex";
export default {
  name:'payMerchantTable',
  computed: {
     ...mapGetters(["token","showButton"])
  },
  components: {
    payMerchantForm,queryTemplate
  },
  created() {
    this.getTableData(this.tableParams);
  },
  mounted() {
    $(function() {
      $('#payMerchantTable').on('click','thead .el-checkbox__inner', function(e) {
          const selectAllTr = $(e.target).parents('.el-table__header-wrapper').next().find('tr');
          const selectAll = $(e.target).next()[0].checked;
          if(selectAll === false) {
            selectAllTr.addClass("select-row");
          }else {
            selectAllTr.removeClass("select-row");
          };
      });
    });
  },
  data() {
    return {
      submitSearch:undefined,//true 提交搜索，false 清空搜索条件
      queDialogVisible:false,//高级查询弹出窗口
      downloadState:false,//导入弹出框设置。
      dialogTitle:undefined,//弹出框标题
      //查询table数据的请求参数
      tableParams: {
        parentId: "1",
        pageNo : "1",
        pageSize : "10",
        reqCode : "1",
        orderBy : "",
        searchValue:""
      },
      queryForm:{},
      tableTotal : 100, //总长度
      currentPage : 1, //当前页数
      pageSizes : 10, //分页数量
      payMerchantTable: [],
      isShow : true,
      primaryId :undefined,//修改，详情所用的id
      stateBtn :false, //控制表单中的保存，重置按钮是否隐藏 详情时为true ，修改，添加为true
      dialogMessage :undefined, //弹窗内容
      dialogType : undefined, //弹窗类型 1-删除
      dialogVisible:false,  //弹出框
      ids:{
        id : ''
      },
      //加载遮罩层显示
      loading:true
    };
  },
  methods: {
    getDictLable(type,val) {
      return getDictLableName(type,val);
    },
    refreshQueyData(parms){//清空搜索内容
      this.queryForm = parms;
    },
    submitSearchBtn(parms){
      this.submitSearch = parms;
    },
    search(){
      this.currentPage=1;
      this.submitSearch = "false";
      this.tableParams.pageNo="1";
      this.tableParams.pageSize="10";
      this.tableParams.reqCode="-1";
      this.getTableData(this.tableParams);
    },
    getQueryData(parms){//获得高级搜索条件
      this.currentPage=1;
      this.queryForm = parms;
      this.tableParams.searchValue="";
      this.queDialogVisible = false;
      this.tableParams.pageNo="1";
      this.tableParams.pageSize="10";
      this.tableParams.reqCode="-1";
      var queryParamsVar = mergeQuery(this.tableParams,parms);
      this.getTableData(queryParamsVar);
    },
    download(){ //导出
      var download="";
      if(this.tableParams.searchValue!=""){
          download="&searchValue="+this.tableParams.searchValue;
      }
      else{
        download = appendQueryParams(this.queryForm);
      }
      let link = document.createElement('a');
      link.href = "/api/admin/basic/merchant/payMerchant/excel?token="+this.token+download;
      link.download = "商户档案表数据导出数据.xlsx";
      link.click();
    },
    downloadTemplate(){//下载导入模板
      this.dialogVisible = false;
      this.downloadState = false;
      let link = document.createElement('a');
      link.href = "/api/admin/basic/merchant/payMerchant/excel/template?token="+this.token;
      link.download = "商户档案表数据导入模板.xlsx";
      link.click();
    },
    upload(){//导入
      this.dialogType =2;
      this.dialogTitle="导入文件";
      this.dialogVisible = true;
      this.downloadState = true;
    },
    getTableData(queryParams) {
      getPayMerchantTable(queryParams).then(response => {
        if(response.code==200){
          this.payMerchantTable = response.data.rows;
          this.tableTotal =  response.data.total;
          this.loading = false;
        }else{
          this.payMerchantTable=[];
          this.tableTotal = 0;
          this.loading = true;
          setTimeout(()=>{
            this.loading = false;
          },500)
        }
      });
    },
    show(parms){
       //清空用户选择
      this.submitSearch="false";
      // this.tableParams.searchValue="";
      this.primaryId = undefined;
      this.clearChoose();
      this.getTableData(this.tableParams);
      //关闭表单页面
      this.isShow = parms;
    },
    add(){
     this.isShow = !this.isShow;
      this.stateBtn  = true;
    },
    update(){ 
      var checkData = this.$refs.payMerchantTable.selection;
      if(checkData.length==0) {
          this.$notify({ title: "警告", message: "您没有选择任何内容!",type: "warning" });
      }
      else if(checkData.length>1){
          this.$notify({ title: "警告", message: "仅能勾选一个",type: "warning" });
      }
      else if(checkData.length==1){
          this.primaryId = checkData[0].id;
          this.stateBtn  = true;
          this.isShow = !this.isShow;
      }
    },
    del(){ 
      var checkData = this.$refs.payMerchantTable.selection;
      if(checkData.length==0) {
        this.$notify({ title: "警告", message: "您没有选择任何内容!",type: "warning" });
      }
      else{
        this.downloadState = false;//隐藏下载模板按钮
        var str = '';
        for(var i=0;i<checkData.length;i++){
          str+=checkData[i].id+",";
        }
        str = str.substring(0,str.length-1);
        this.ids.id = str;
        this.dialogTitle="确认删除";
        this.dialogVisible = true;
        this.dialogType = 1;
        this.dialogMessage = "确认删除所选中的信息？";
      }
    },
    submitDialog(){  //确定删除
      let token = token;
      if(this.dialogType==1){
        deleteAllPayMerchant(this.ids.id,token).then(response => {
          if(response.code==200){
              this.$notify({ title: "成功", message: "删除信息成功",type: "success" });
              this.$refs.payMerchantTable.clearSelection();
          }else{
              this.$notify({ title: "失败", message: "删除信息失败",type: "error" });
          }
          this.refresh();
        });     
      }else if(this.dialogType==2){
        var formData = new FormData();
        formData.append('file', document.getElementById("file").files[0]);
        putPayMerchantExcel(formData).then(response=>{
          if(response.code=="200"){
             this.currentPage=1;
            this.$refs.payMerchantTable.clearSelection();
            this.tableParams.pageNo="1";
            this.tableParams.pageSize="10";
            this.tableParams.reqCode="-1";
            this.submitSearch="false";
            this.$notify({ title: "成功", message: "导入信息成功",type: "success" });
            this.getTableData(this.tableParams);
          }else{
            this.$notify({ title: "失败", message: "导入信息失败",type: "error" });
          }
        });
      }
      this.dialogVisible = false;
    },
    detail(){ 
      var checkData = this.$refs.payMerchantTable.selection; 
      if(checkData.length==0) {
          this.$notify({ title: "警告", message: "您没有选择任何内容!",type: "warning" });
      }
      else if(checkData.length>1){
          this.$notify({ title: "警告", message: "请不要勾选多个",type: "warning" });
      }
      else if(checkData.length==1){
          this.primaryId = checkData[0].id;
          this.stateBtn  = false;
          this.isShow = !this.isShow;
      }
    },
    updateRow(row){
      this.primaryId = row.id;
      this.stateBtn  = true;
      this.isShow = !this.isShow;
    },
    delRow(row){
      this.dialogTitle="确认删除";
      this.ids.id=row.id,
      this.dialogVisible = true;
      this.dialogType = 1;
      this.dialogMessage = "确认删除此信息？";
    },
    refresh(val){ 
       var checkData = this.$refs.payMerchantTable.selection; 
      if(checkData.length>1){
        this.$notify({ title: "警告", message: "请不要勾选多个",type: "warning" });
      }
      else if(checkData.length==1){
        var indexNum = checkData[0].index;
        getPayMerchant(checkData[0].id).then(response=>{
          if(response.code =="200"){
            var data = response.data;
            data.index = indexNum;
            Vue.set(this.payMerchantTable,indexNum,data);
            this.$refs.payMerchantTable.toggleRowSelection(data);
            this.$notify({ title: "成功", message: "刷新勾选数据成功",type: "success" });
          }
          else{
            this.$notify({ title: "错误", message: "刷新失败",type: "error" });
          }
        });
      }
      else{
        if($('.el-table__row').hasClass('select-row')) {
          $('.el-table__row').removeClass("select-row");
        }
        this.submitSearch = "false";
        this.getTableData(this.tableParams);
        if(val==true){
          this.$notify({ title: "成功", message: "刷新成功",type: "success" });
        }
      }
    },
    //修改每页展示数据
    handleSizeChange(val) {
      this.pageSizes = val;
      this.tableParams.pageSize = this.pageSizes;
      var queryParamsVar = mergeQuery(this.tableParams,this.queryForm);
      this.getTableData(queryParamsVar);
    },
    //修改页码
    handleCurrentChange(val) {
      this.clearChoose();
      this.tableParams.pageNo = val 
      this.currentPage = val;
      this.tableParams.pageSize = this.pageSizes;
      var queryParamsVar = mergeQuery(this.tableParams,this.queryForm);
      this.getTableData(queryParamsVar);
    },
    indexMethod(index) { //计算table的序号
      var returnNum = (this.currentPage-1)*this.pageSizes+index+1;
      return returnNum;
    },
    //点击行checkbox选中,添加背景色
    rowClickThis(row, event, column) {
       event.preventDefault();
       this.$refs.payMerchantTable.toggleRowSelection(row);
       $(event.target).parents('tr').toggleClass('select-row');
    },
    tableRowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
     //去除背景色，去除勾选
    clearChoose() {
      this.$refs.payMerchantTable.clearSelection();
      $('.el-table__row').removeClass("select-row");
    }
  }
};
</script>

<style lang="scss" scoped>

</style>