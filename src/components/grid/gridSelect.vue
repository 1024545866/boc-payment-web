<template>
     <div>
        <el-input :disabled="disabled"  @focus="showGridSelect=!showGridSelect" readonly="readonly" v-model="gridNodeNameShow">
        <el-button  :disabled="disabled" slot="append" icon="el-icon-search" @click="showGridSelect=!showGridSelect"></el-button>
        </el-input>
        <!-- 表单树表弹窗 -->
        <div id="table-pop-up">
            <el-dialog title="请选择" :visible.sync="showGridSelect" width="40%">
                <grid-select :gridId="gridId" :showGridSelect.sync = "showGridSelect" :rowData.sync = "rowData"></grid-select>
                <span slot="footer">
                    <el-button @click="showGridSelect = false">取 消</el-button>
                    <el-button type="primary" @click="SubmitData">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import gridSelect from "./gridSelectContent";
    export default {
        name : "treeButton",
        data(){
            return {
                rowData:{},//选中的行的数据
                showGridSelect : false,
                treeNodeName : "",
                treeNodeIdBtn : "",
                treeParentIdBtn : "",
                treeParentIdsBtn : ""
            };
        },
        props:['gridId','gridNodeNameShow',"labelName","labelVaule","gridNodeValue",'disabled'],
        watch:{
            gridNodeValue:function(val){
                if(val==undefined){
                this.$emit("update:gridNodeNameShow",null);
                }
            },
        },
        components :{
            gridSelect
        },
        methods : {
            SubmitData(){
                this.showGridSelect = false;
                var labelNameStr = this.labelName;
                var gridNodeValueStr = this.labelVaule
                this.$emit('update:gridNodeNameShow',this.rowData[labelNameStr]);
                this.$emit('update:gridNodeValue', this.rowData[gridNodeValueStr]);
            }
        }
    }
</script>
 
<style scoped lang="scss">
  
</style>


   


