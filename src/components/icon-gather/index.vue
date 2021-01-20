<template>
  <div id="icons">
     
      <el-input type="text"   readonly="readonly" v-model="iconData" @focus="showIcon=true">
            <el-button slot="append" icon="el-icon-upload2" @click="showIcon=true"></el-button>
      </el-input>

      <!-- 图标选择弹窗 -->
     <div id="icon-pop-up">
        <el-dialog title="请选择图标" :visible.sync="showIcon">
            <div>
                <icon></icon>
            </div>
            <span slot="footer">
                <el-button @click="showIcon = !showIcon">取 消</el-button>
                <el-button type="primary" @click="SubmitData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import icon from './icon';
export default {
  name:'iconTemplate',
  components:{
      icon
  },
  data() {
      return{
        showIcon:false,
        iconAttrClass:''
      }
  },
  props:{
      iconData:{
          type:String
      }
  },
   mounted() {
     var _this = this;
      $(function() {
            $("#icons").on('click','#icon-pop-up i',(e)=>{
                $(e.target).addClass('select-icon');
                $(e.target).parent().siblings().find('i').removeClass('select-icon');
                $(e.target).parents('.el-row').siblings().find('i').removeClass('select-icon');
                var attrClass = $(e.target).attr("class").split(" ")[1];
                _this.iconAttrClass = attrClass;
            }) 
         }) 
      },
      
    methods:{
        SubmitData() {
            this.showIcon = false;
            this.$emit('update:iconData',this.iconAttrClass);
        }
    }
}
</script>

