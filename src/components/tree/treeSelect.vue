<template>
     <div  class="">
        <el-input  :disabled="disabled" @focus="showDislog=!showDislog" readonly="readonly" v-model="treeNodeNameShow">
            <el-button slot="append" icon="el-icon-search" @click="showDislog=!showDislog"  :disabled="disabled"></el-button>
        </el-input>

        <!-- 表单树表弹窗 -->
        <div class="tree-pop-up">
            <el-dialog title="请选择树节点" :visible.sync="showDislog" width="320px">
                <tree-test :treeurl="treeurl" :zTreeId="zTreeId" :treeNodeId.sync="treeNodeIdBtn" :treeNodeName.sync="treeNodeName" 
                    :treeParentId.sync="treeParentIdBtn" :treeParentIds.sync="treeParentIdsBtn" :showDislog="showDislog"></tree-test>
                <span slot="footer">
                    <el-button @click="showDislog = false">取 消</el-button>
                    <el-button type="primary" @click="SubmitData">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import treeTest from "./treeTest";
    export default {
        name : "treeSelect",
        data(){
            return {
                zTreeId:Math.round(Math.random()*1000000),
                showDislog : false,
                treeNodeName : "",
                treeNodeIdBtn : "",
                treeParentIdBtn : "",
                treeParentIdsBtn : ""
            };
        },
        props:['treeurl','treeNodeId','treeParentId','treeParentIds','treeNodeNameShow','disabled',"selectParent"],
        components :{
            treeTest
        },

        watch:{
            treeNodeId:function(val){
                if(val==undefined){
                    this.$emit("update:treeNodeNameShow",undefined);
                    this.$emit("update:treeParentIds",undefined);
                    this.$emit("update:treeParentId",undefined);
                }
            }
        },
        methods : {
            SubmitData(){
                if(this.selectParent=="false"&&this.treeParentIdBtn==0){
                    alert("不能选择父节点");
                }else{
                    this.showDislog = false;
                    this.$emit('update:treeNodeNameShow',this.treeNodeName);
                    this.$emit('update:treeNodeId', this.treeNodeIdBtn);
                    this.$emit('update:treeParentId', this.treeParentIdBtn);
                    this.$emit('update:treeParentIds', this.treeParentIdsBtn);
                }
            }
        }
    }
</script>
 
<style scoped>

</style>


   


