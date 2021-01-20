<template>
    <el-row>
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
            <div :id="zTreeId" class="ztree"></div>
          </el-collapse-transition>
        </div>   
      </el-col>
    </el-row>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { getTreeDataByUrl } from "./common/treeSelect_title";
    export default {
        name:'treeTest',
        data() {
            return {
                zTreeObj : Object,
                treeData : Object,
                upDownNodesAll:false,
                upDownNodes:true,
            };
        },
        //'treeNodeId' 当前节点Id,'treeNodeName' 节点名称集合,'treeParentId'父节点Id,'treeParentIds'父节点Id集合
        props:['treeurl','zTreeId','treeNodeId','treeNodeName','treeParentId','treeParentIds','showDislog'],
        created(){
            this.getSetectData();
        },
        watch:{
            showDislog:function(val){
                if(val==true){
                    this.getSetectData();
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
            getSetectData(){
                getTreeDataByUrl(this.treeurl).then(response=>{
                    if(response.code=="200"){
                        this.treeData = response.data;
                    }
                    else{
                        this.treeData ={};
                    }
                    this.z_dataLoading();
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
                        enable: false,//控制是否显示多选框（false不显示）
                        nocheckInherit: false
                    },
                    view: {
                        dblClickExpand: false
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "pId",
                            rootPId: '0'
                        }
                    },
                    callback: {
                        onClick: function (event, zTreeId, treeNode) {
                            var zTree = $.fn.zTree.getZTreeObj(that.zTreeId);
                            var nodes = zTree.getSelectedNodes(),n ="",p="",ids="";	
                            for (var i=0, l=nodes.length; i<l; i++) {
                                n += nodes[i].id + ",";//获取id值
                                var pathNodes=nodes[i].getPath();
                                for(var y=0;y<pathNodes.length;y++){
                                p+=pathNodes[y].name+" > ";//获取path/name值
                                ids+=pathNodes[y].pId+","
                                }
                            }
                            if (n.length > 0 ) n = n.substring(0, n.length-1);
                            if (p.length > 0 ) p = p.substring(0, p.length-3);
                            if(ids.length>0) ids = ids.substring(0,ids.length-1);
                            that.$emit('update:treeNodeId', treeNode.id);
                            that.$emit('update:treeNodeName', p);
                            that.$emit('update:treeParentId', n);
                            that.$emit('update:treeParentIds', ids);
                        }
                    }
                };
                that.zTreeObj = $.fn.zTree.init($("#"+that.zTreeId), setting, that.treeData);
                var nodes = that.zTreeObj.getNodes();
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    node.nocheck = false;
                    that.zTreeObj.expandNode(node, that.upDownNodes, that.upDownNodesAll, true); //设置节点展开
                    that.zTreeObj.updateNode(node);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
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
