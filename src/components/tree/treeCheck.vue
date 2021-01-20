<template>
    <el-row v-loading="loading">
      <el-col :span="24">  
        <div class="ztreeOutline">  
          <el-autocomplete
            class="inline-input"
            placeholder="请输入内容"
          size="small"></el-autocomplete>  

            <!-- 展开和搜索按钮  -->
          <el-button-group class="up-down">
            <el-button size="mini" icon="el-icon-arrow-up" @click="openTreeNode(false)"></el-button>
            <el-button size="mini" icon="el-icon-arrow-down" @click="openTreeNode(true)"></el-button>
         </el-button-group>

          <el-collapse-transition>
            <div :id="zTreeId" class="ztree" ></div>
          </el-collapse-transition>
        </div>   
      </el-col>
    </el-row>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { getTreeDataByUrl,getSelectedData } from "./common/treeSelect_title";
    export default {
        name:'treeCheck',
        data() {
            return {
                selectedData : Object,
                treeData : Object,
                zTreeObj : Object,
                upDownNodesAll:true,
                upDownNodes:true,
                loading:false,
                treeObj:Object,
            };
        },
        created(){
            this.getSelectData();
            this.getSelected();
        },
        props:['treeurl','zTreeId',"clickRowId","show"],
        watch:{
            show:function(val){
                if(val==true){
                    this.getSelectData();
                    this.getSelected();
                }
            }
        },
        computed: {
        
        },
        methods: {

            //展开或收缩树节点
            openTreeNode(val){
                this.zTreeObj.expandAll(val);
            },
            //获取树的数据
            getSelectData(){
                getTreeDataByUrl(this.treeurl).then(response=>{
                    if(response.code=="200"){
                        this.treeData = response.data;
                    }else{
                        this.treeData = {};
                    }
                });
            },
            getSelected(){
                getSelectedData(this.clickRowId).then(response=>{
                    if(response.code=="200"){
                        this.selectedData = response.data;
                    }else{
                        this.selectedData = {};
                    }
                    this.loading = true;
                    setTimeout(() => {
                        this.z_dataLoading();
                    }, 1200);
                    
                });
            },
            //树表的加载
            z_dataLoading () {
                var that = this;
                var to = function (index) {
                $('#myTab'+'li:eq(' + index + ') a').tab('show');
                $('#message').html();
                }
                let token = this.token;
                var setting = {
                    check:{
                        enable: true,nocheckInherit:true,chkboxType:{"Y":"ps","N":"ps"},
                    },
                    view: {
                        dblClickExpand: false
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "pId",
                            rootPId: '0',
                        },
                    },
                };
                that.zTreeObj = $.fn.zTree.init($("#"+that.zTreeId), setting, that.treeData);
                this.selectCheck();
                // var nodes = that.zTreeObj.getNodes();
                // for (var i = 0; i < nodes.length; i++) {
                //     var node = nodes[i];
                //     node.nocheck = false;
                //     node.checked  = true;
                //     that.zTreeObj.expandNode(node, that.upDownNodes, that.upDownNodesAll, true); //设置节点展开
                //     that.zTreeObj.updateNode(node);
                // }
            },
            selectCheck(){
                    var that = this;
                    this.treeObj = $.fn.zTree.getZTreeObj(that.zTreeId);
                   // this.treeObj.checkAllNodes(true); //设置全部勾选
                    var selectedStr = this.selectedData;
                    var node1 = this.treeObj.getNodeByParam("id", 0, null);
                    that.zTreeObj.expandNode(node1, that.upDownNodes, that.upDownNodesAll, true); //设置节点展开
                    that.zTreeObj.updateNode(node1);
                    this.treeObj.checkNode(node1, true, false);
                    for (let index = 0; index < selectedStr.length; index++) {
                        var node = this.treeObj.getNodeByParam("id", selectedStr[index].id, null);                   
                        // if(selectedStr[index].parent.id!=0){
                            that.zTreeObj.expandNode(node, that.upDownNodes, that.upDownNodesAll, true); //设置节点展开
                            that.zTreeObj.updateNode(node);
                            this.treeObj.checkNode(node, true, false);
                        // }

                }
                this.loading = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "src/styles/index.scss";
  .ztreeOutline{
    overflow: hidden;
    border: 1px solid #e4eaec;
    width: 170px;
    padding: 10px;
    border-radius: 5px;
    .ztree{
        overflow: auto;
    }
  }
  .showSubStyle{
    margin: 0 auto;
    border: none;
    padding: 0px;
    height: 60vh;
  }
  // tree
.el-dialog{
  width: 180px !important;
  height: 400px;
  overflow: hidden;
}

.el-dialog__body{
  height: 290px;
  overflow: hidden;
}

</style>
