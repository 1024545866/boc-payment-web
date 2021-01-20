<template>
     <div  class="">
        <el-select v-model="showValue" placeholder="请选择" :disabled="disabled" class="select-width" @change="getValue()">
            <el-option v-for="items in selectData " :key="items.id" :label="items.name" :value="items.id"></el-option>
        </el-select>
    </div>
</template>
<script>
import {getDictSelectData} from './common/dropDownSelect' 
import store from '../../store/index'
    export default {
        name : "dropDownSelect",
        data(){
            return {
                showValue:undefined,
                dictData:{},
                selectData:[],
                treeNodeName : "",
                treeNodeIdBtn : "",
                treeParentIdBtn : "",
                treeParentIdsBtn : ""
            };
        },
        //dataKey  获取数据的key   dataValue
        props:{dataKey:{type:String,default:undefined},dataValue:{type:String},disabled:{type:Boolean,default:false}},
        created(){
            this.initSelect();
        },
        watch:{
            dataValue:function(val){
                this.showValue=val
            },
            
        },
        methods : {
            getValue(){
                this.$emit("update:dataValue",this.showValue);
            },
            initSelect(){
                this.dictData = store.getters.dictData;
                var dict = this.dictData[this.dataKey];
                for(var p in dict){
                    var data = {};
                    data.id=p;
                    data.name=dict[p];
                    this.selectData.push(data);
                }
            }
         }
    }
</script>