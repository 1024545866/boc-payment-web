<template>
     <div>
        <el-input :disabled="disabled"   readonly="readonly" v-model="showModel">
        <el-button  :disabled="disabled" slot="append" icon="el-icon-search" @click="showGridSelect=!showGridSelect"></el-button>
        </el-input>
        <!-- 表单树表弹窗 -->
        <div id="table-pop-up">
            <el-dialog title="请选择" :visible.sync="showGridSelect" width="40%">
                <grid-select :gridId="gridId" :showGridSelect.sync = "showGridSelect" :rowData.sync="rowData" :callGrid.sync="callGrid"></grid-select>
                <span slot="footer">
                    <el-button @click="showGridSelect = false">取 消</el-button>
                    <el-button type="primary" @click="callGrid = true">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import gridSelect from "./gridTagContent";
    import { mergeArray} from "utils/dataUtils";
    export default {
        name : "treeButton",
        data(){
            return {
                rowData:[],//选中的行的数据
                callGrid:false,
                showGridSelect : false,
                showModel:"",
            };
        },
        props:{gridId:{type:String},gridNodeNameShow:{type:Array},labelName:{default:undefined},labelVaule:{default:undefined},gridNodeValue:{type:Array},disabled:{type:Boolean}},
        watch:{
            gridNodeValue:function(val){
                if(val.length==0){
                this.$emit("update:gridNodeNameShow",[]);
                }
            },
            rowData:function(val){
                var data = val;
                if(data.length>0){
                    this.SubmitData(data);
                }
            },
            gridNodeNameShow:function(val){
                var data = val;
                var show ="";
                for(var i=0;i<data.length;i++){
                    show += data[i].showName+", ";
                }
                this.showModel = show;
            }
        },
        components :{
            gridSelect
        },
        methods : {
            SubmitData(val){
                var labelNameStr = this.labelName;
                var gridNodeValueStr = this.labelVaule
                let data = val;
                var showData = [];
                for(var i=0;i<data.length;i++){
                    var oneData = data[i];
                    var show = "";
                    var length =  labelNameStr.lastIndexOf('|');
                    if(length>0){
                        var one = labelNameStr.substring(0, length);
                        var tow = labelNameStr.substring(length+1,labelNameStr.length);
                        show = oneData[one]+" && "+oneData[tow];
                    }
                    else{
                        show = data[labelNameStr];
                    }
                    oneData.showName = show;
                    showData.push(oneData);
                }
                showData = mergeArray(showData,this.gridNodeValue);
                this.callGrid =false;
                this.showGridSelect = false;
                this.$emit('update:gridNodeNameShow',showData);
                this.$emit('update:gridNodeValue', showData);
            }
        }
    }
</script>
 
<style scoped lang="scss">
  
</style>


   


