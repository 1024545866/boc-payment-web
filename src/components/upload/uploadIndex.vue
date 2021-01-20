<template>
     <div  class="">
        <!-- <el-input  :disabled="disabled" readonly="readonly" v-model="treeNodeNameShow">

            <el-button slot="append"  id="filebutton" onclick="file.click()" :disabled="disabled"></el-button>
        </el-input>
        image/jpeg,image/x-png
         -->
            <form id="fileUploadForm" enctype="multipart/form-data" class="hidden">
                <input :id="file" type="file" :accept="accept" name="选择文件"  @change="onchange()"/>
              </form>
              <el-input type="text" id="filepath"  readonly="readonly" placeholder="请上传小于5M的文件！" v-model="fileUrl" :disabled="true">
                    <el-button  slot="append" icon="el-icon-upload" id="filebutton" @click="onclick()" :disabled="!disabled">
                    </el-button>
                </el-input> 
    </div>
</template>
<script>
import { upload } from "./common/uploadIndex";
    export default {
        name : "uploadImgIndex",
        created(){
            this.getValue();
        },
        data(){
            return {
                url:'/zuul/api/admin/sys/file/sysFile/upload',//默认上传路径
                accept:"image/jpeg,image/x-png",//接受的文件类型
                file:Math.round(Math.random()*1000000),
            };
        },
        props:['fileUrl','disabled','acceptTypes','uploadUrl'],
        //props:['treeurl','fileUrl','treeParentId','treeParentIds','treeNodeNameShow','disabled',"selectParent"],
        components :{
        },
        methods : {
            onclick(){
               $("#"+this.file).click();
            },
            getValue(){
                if(this.uploadUrl!="" && this.uploadUrl!=undefined){
                    this.url = this.uploadUrl;
                }
                if(this.acceptTypes!="" && this.acceptTypes!=undefined){
                    let data = this.acceptTypes;
                    let dataArry = data.split(",");
                    let acceptLet = "";
                    for(let i =0;i<dataArry.length;i++){
                        if(dataArry[i] == "jpg"){
                            acceptLet+="image/jpeg,";
                        }else if(dataArry[i] == "png"){
                            acceptLet+="image/x-png,";
                        }else if(dataArry[i] == "excel"){
                            acceptLet +="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,";
                        }else if(dataArry[i] == "word"){
                            acceptLet +="application/msword";
                        }
                    }
                    this.accept = acceptLet.substring(0,acceptLet.length-1);
                }
            },
            onchange(){
                var fileVar = $("#"+this.file).val();
                this.$emit("update:fileUrl",fileVar);
                var formData = new FormData();
                formData.append('file', document.getElementById(this.file).files[0]);
                upload(formData,this.url).then(response=>{
                if(response.code=="200"){
                    var form = response.data;
                    this.$notify({ title: "成功", message: "上传图片成功",type: "success" });
                    this.$emit("update:fileUrl",form.path);
                }else{
                    this.$notify({ title: "失败", message: "上传图片失败",type: "error" });
                }
                });
            }
        }
    }
</script>
 
<style scoped>

</style>


   


