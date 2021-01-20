<template>
    <el-row>
      <el-col :span="24">  
        <div class="ztreeOutline">  
          <!-- <span>{{upDownNodes}}</span><span>{{upDownNodesAll}}</span> -->
          <el-autocomplete
            class="inline-input"
            v-model="state2"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
          size="small" v-show="showSub"></el-autocomplete>  
          <el-collapse-transition>
            <div :id="zTreeId" class="ztree"></div>
          </el-collapse-transition>
        </div>   
      </el-col>
    </el-row>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name:'treeSelect',
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: '',
        ztreeIdData:this.ztreeId, //用于接收保存ztreeId传来的id
      };
    },
    props:{
      treeData:{
        type : Array
      },
      zTreeId:{
        type : String
      },
      showSub :{
        type : Boolean,
        default : true
      },
      upDownNodes :{
        type :Boolean,
        default : true
      },
      upDownNodesAll :{
        type :Boolean,
        default : false
      }
    },
    watch:{
      showSub : function(val){
        if(!val){
          this.showSub = true;
        }
      },
      treeData:function(val, oldVal){
        // 监控从父组件传回的树结构的数据
        this.z_dataLoading();
      },
    },
    components:{},
    computed: {
      ...mapGetters([
        'token'
      ])
    },

    mounted(){

    },
    methods: {

      getTreeId(){

      },

      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
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
            onClick: function (event, treeId, treeNode) {
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
              that.$emit("tree-name",p);  //获得节点名称
              that.$emit("tree-pids",ids);
              that.$emit("tree-id",treeNode.id);
              that.$emit("tree-pid",n);
            }
          }
        };
        var zTreeObj = $.fn.zTree.init($("#"+that.zTreeId), setting, that.treeData);
        var nodes = zTreeObj.getNodes();
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          node.nocheck = false;
          zTreeObj.expandNode(node, that.upDownNodes, that.upDownNodesAll, true); //设置节点展开
          zTreeObj.updateNode(node);
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
