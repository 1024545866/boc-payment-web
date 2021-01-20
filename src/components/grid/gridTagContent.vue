<template>
<div id="queyTable">
    <el-row class="tab-telInput">
        <el-col :span="24">
            <div class="el-input">
                <input  autocomplete="off" v-model="tableParams.gridSearchValue" placeholder="请输入搜索内容" type="text" rows="2" validateevent="true" class="el-input__inner columnName">
            </div>
             <el-button-group id="el_buttonStyle">
                <el-button type="primary"  size="small" title="查询" @click="getGridTableData">查询</el-button>
                <el-button type="primary"  size="small" title="取消" @click="removeQuery">取消</el-button>
            </el-button-group> 
        </el-col>   
    </el-row>
    <div class="tableOrPageSort">
        <el-row>  
            <el-col :span="24">
                <el-table ref="gridTabel"   element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" 
                    element-loading-background="#fff" :data="gridTableData"  border  id="gridTabel"
                    size="medium" style="width:100%"  @row-click="rowClickThis" :row-class-name="tableRowClassName"> 
                    <el-table-column prop="checked"  width="45">
                      <template slot-scope="scope">
                          <el-checkbox v-model="scope.row.checked"></el-checkbox>
                      </template>
                    </el-table-column>
                    <el-table-column  type="index" prop="index"  label="序号" width="60"></el-table-column>
                    <el-table-column  v-for="column in gridTabel" :key="column.pkSysReferItem" :prop="column.fieldkey" :label="column.fieldlabel"  show-overflow-tooltip sortable>
                      <template slot-scope="scope">
                          <span>{{getDictLable(column.dictType,scope.row[column.fieldkey])}}</span>
                      </template>
                    </el-table-column>                  
                </el-table>
            </el-col>
        </el-row>
          <!-- 分页及页数选择 -->
        <el-row  class="sort-page">
            <el-col :span="24">
                <el-pagination
                background
                small
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[ 10, 20,50, 100]"
                :page-size="pageSizes"
                layout="total, sizes, next, pager, prev, jumper"
                :total="tableTotal">
            </el-pagination>
        </el-col>
        </el-row>
    </div>                          
 </div>                       
</template>

<script>
import Vue from 'vue';
import {
  getGridTabelById,
  getGridTableByUrl
} from "./common/gridSelect/gridSelect";
import store from 'store';
import { getDictLableName,spliceData } from "utils/dataUtils";
export default {
  data() {
    return {
      selectionData:[],//存放勾选的对象
      tableTotal: 100, //总长度
      currentPage: 1, //当前页数
      pageSizes: 10, //分页数量
      gridTableData: [],
      gridTabel: [],
      dictArray:[],
      input: "",
      urlStr: undefined, //获取数据的url
      //查询table数据的请求参数
      tableParams: {
        parentId:"0",
        pageNo: "1",
        pageSize: "10",
        reqCode: "1",
        orderBy: "",
        gridSearchValue:""
      }
    };
  },
  created() {
    this.getSetGridData();
  },
   mounted() {
    $(function() {
      $('#gridTabel').on('click','thead .el-checkbox__inner', function(e) {
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
  props: {
    gridId: { type: String },
    showGridSelect: { type: Boolean },
    rowData: { type: Array },
    callGrid:{type:Boolean}
  },
  watch: {
    showGridSelect: function(val) {
      if (val == true) {
        this.selectionData=[];
        this.getSetGridData();
      }
    },
    callGrid:function(val){
      if(val == true){
        this.$emit("update:rowData", this.selectionData);
        this.$emit("update:callGrid", false);
        this.$emit("update:showGridSelect", false);
      }
    }
  },
  methods: {
    getDictLable(type,val) {
      return getDictLableName(type,val);
    },
    //修改每页展示数据
    handleSizeChange(val) {
      this.pageSizes = val;
      this.tableParams.pageSize = this.pageSizes;
      this.getGridTableData(this.tableParams);
    },
    //修改页码
    handleCurrentChange(val) {
      this.tableParams.pageNo = val;
      this.currentPage = val;
      this.tableParams.pageSize = this.pageSizes;
      this.getGridTableData(this.tableParams);
    },
    removeQuery() {
      this.tableParams.gridSearchValue="";
      this.getSetGridData();
      $('.el-table__row').removeClass("select-row");
    },
    getSetGridData() {
      getGridTabelById(this.gridId).then(response => {
        if (response.code == "200") {
          this.gridTabel = response.data.sysReferItemList;
          this.urlStr = response.data.url;
          this.getGridTableData(this.tableParams);
        }
      });
    }, 
    getGridTableData(queyParams) {
      getGridTableByUrl(this.urlStr, queyParams).then(
        response => {
          if ((response.code = "200")) {
            this.gridTableData = response.data.rows;
            this.tableTotal = response.data.total;
          }
        }
      );
    $('.el-table__row').removeClass("select-row");
    },
    //鼠标左键单击
    rowClickThis(row, event, column) {
       event.preventDefault();
       let state = this.selectionData.indexOf(row) === -1 ? true : false; 
       if(state == true){
          row.checked = true;
          this.selectionData.push(row);
          $(event.target).parents('tr').toggleClass('select-row');
       }else{
          var index = row.index;
          row.checked = false;
          $(event.target).parents('tr').removeClass('select-row');
          this.selectionData = spliceData(this.selectionData,index);
          console.table(this.selectionData);
       }
    },   
    tableRowClassName({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = (this.currentPage-1)*this.pageSizes+rowIndex;
      for(var p in this.selectionData){
            var selected = this.selectionData[p].href==row.href ? true : false;
            var method = this.selectionData[p].method==row.method ? true : false;
            if(selected == true && method == true){
              row.checked = true;
            }
      }
    },    
  }
};
</script>

<style lang="scss" scoped>

</style>
