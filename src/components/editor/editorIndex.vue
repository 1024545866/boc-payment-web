<template>
  <div>
    <script :id="id" type="text/plain" ></script>
  </div>
</template>
<script>
import '../../../static/uEditor/ueditor.config'
import '../../../static/uEditor/ueditor.all'
import '../../../static/uEditor/lang/zh-cn/zh-cn'
export default {
    name: "UEditor",
    props: {
      id: {
          type: String
      },
      content:{type:String,default:""}
    },
    watch:{
      content:function(val){
          this.editor.setContent(val);
      }
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      //初始化UE
      const _this = this;
      this.editor = UE.getEditor(this.id);
    },
    methods:{
      getUEContent: function(){
            this.editor.getContent();
            this.editor.ready(function() {
              this.editor.setContent(this.content);
            });
      }
    }
  }
</script>
