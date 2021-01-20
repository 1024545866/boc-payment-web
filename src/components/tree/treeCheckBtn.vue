<template>
     <div>
        <el-input :disabled="disabled" @focus="showDislog=!showDislog" readonly="readonly" >
            <el-button slot="append" icon="el-icon-search" @click="showDislog=!showDislog" :disabled="disabled"></el-button>
        </el-input>
        <!-- 表单树表弹窗 -->
        <div class="tree-pop-up">
            <el-dialog title="请选择" :visible.sync="showDislog" width="320px">
                <tree-check :treeurl="treeurl" :zTreeId="zTreeId"></tree-check>
                <span slot="footer">
                    <el-button @click="showDislog = false">取 消</el-button>
                    <el-button type="primary" @click="getAllTree">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import treeCheck from "./treeCheck";
    export default {
        name : "treeCheckBtn",
        data(){
            return {
                showDislog : false,
                treeNodeName : "",
            };
        },
        props:['treeurl','zTreeId','treeNodeIds','isSaveCheck','disabled'],
        components :{
            treeCheck
        },
        methods : {
            getAllTree(){
                this.showDislog = false;
                var zTree = $.fn.zTree.getZTreeObj(this.zTreeId),
                nodes = zTree.getCheckedNodes(),aus ="";
                for (var i=0, l=nodes.length; i<l; i++) {
                    aus += nodes[i].id + ",";
                }
                if (aus.length > 0 ) aus = aus.substring(0, aus.length-1);
                // this.treeNodeIds = aus;
                this.$emit('update:treeNodeIds', aus);
                //取消勾选
                zTree.checkAllNodes(this.isSaveCheck);
                 
            }
        }
    }
</script>
 
<style scoped>

</style>


   


