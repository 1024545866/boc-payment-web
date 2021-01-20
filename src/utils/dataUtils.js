import store from 'store/index'

export function  spliceData(object,index){ 
    var obj =object;
    for(var i=0;i<obj.length;i++){
        if(index == obj[i].index){
            obj.splice(i,1);
            break;
        }   
    }
    return obj;  
} 
export function mergeArray(arr1,arr2){
    var arr = arr1.concat();  
    for(var i=0;i<arr2.length;i++){  
        arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;  
    }  
    return arr;
}


export function getTableList(row,tableList){
    var rowVar  = row;
    for (let index = 0; index < rowVar.length; index++) {
        var data = rowVar[index];
        for(var p in tableList){//遍历json对象的每个key/value对,p为key
            if(data[p]==undefined){
                if(typeof(tableList[p]) != 'object') {
                    data[p]=tableList[p];
                }
                else{
                    var myNewObj = new Object(); 
                    for(var f in tableList[p]){
                        myNewObj[f]=tableList[f];
                    } 
                    data[p] =  myNewObj;
                }
            }
        }
    }
    return rowVar;
} 
export function getFormList(form,formList){
    var reg = /^[0-9]+.?[0-9]*$/;
    var data = form;
    for(var p in formList){//遍历json对象的每个key/value对,p为key
        if(data[p]==undefined){
          if(typeof(formList[p])=='object'){
            var myNewObj = new Object(); 
            var formListP = formList[p];
            for(var f in formListP){
                myNewObj[f]=formListP[f];
            } 
            data[p] =  myNewObj;
          }else{
            data[p]=formList[p];
          }
      }else if(reg.test(data[p])&&!(typeof(formList[p])=='number')){
        data[p] = data[p]+"";
    }
    if(reg.test(data[p])&&(typeof(formList[p])=='number')){ 
            data[p] = parseFloat(data[p]);
        }
    }
    return data;
} 
export function copyObj(obj){ 
    if(typeof(obj) != 'object') {
        return obj; 
    }
    if(obj == null) {
        return obj;
    } 
    var myNewObj = new Object(); 
    for(var i in obj){
        myNewObj[i] = copyObj(obj[i]); 
    } 
    return myNewObj
} 
export function  sorting(object){ 
    var obj =object;
    for(var i=0;i<obj.length-1;i++){  
        for(var j=i+1;j<obj.length;j++){  
            var index = obj[i].index;
            var index1 = obj[j].index;
            if(index>index1){//如果前面的数据比后面的大就交换  
                var temp=obj[i];  
                obj[i]=obj[j];  
                obj[j]=temp;  
            }  
        }  
    }
    return obj;  
} 

export function  sortingBySort(object){ 
    var obj =object;
    for(var i=0;i<obj.length-1;i++){  
        for(var j=i+1;j<obj.length;j++){  
            var index = obj[i].sort;
            var index1 = obj[j].sort;
            if(index>index1){//如果前面的数据比后面的大就交换  
                var temp=obj[i];  
                obj[i]=obj[j];  
                obj[j]=temp;  
            }  
        }  
    }
    return obj;  
} 



export function  mergeQuery(tableParams,queryForm){ 
    var obj ={};
    for(var p in tableParams){  
        obj[p]=tableParams[p];
    }
    for(var i in queryForm){  
        if(typeof(queryForm[i])=='object'){
            var myNewObj = new Object(); 
            var formListP = queryForm[i]
            for(var f in formListP){
                if(formListP[f]!=undefined){
                    myNewObj[f]=formListP[f];
                }
            } 
            obj[i] =  myNewObj;
        }else{
            obj[i]=queryForm[i];
        }
    }
    return obj;  
} 

export function  appendQueryParams(queryForm){ 
    var queryString ="";
    for(var p in queryForm){
        if(queryForm[p]!=undefined){
            queryString +="&"+p+"="+queryForm[p];
        }
    }
    return queryString;  
} 
export function  getDictLableName(type,val){ 
    if(val==""||val==undefined||val==null){
        return "";
    }
    if(type==""||type==undefined||type==null){
        return val;
    }
    let dictData =store.getters.dictData;
    if(dictData==undefined){
        return val;
    }
    var dict=dictData[type];
    if(dict==undefined){
        return val;
    }
    var value=dict[val];
    return value;
} 
export function  checkPassword(password){ 
    if(password.length<7||password.length>15){//限制长度为8-15位
        return false;
    }
    var symbol = new RegExp(/^(?=.*?[!@#$%^&*()-=.]).*$/);
    if(symbol.test(password)){
        return false;
    }
    var reg = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*$/);
    if(!reg.test(password)){
        return false;
    }else{
        return true;
    }
    
} 
export function  createUUId(){ 
    var s = []; 
    var hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; 
    for (var i = 0; i < 32; i++) { 
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1); 
    } 
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010 
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01  
    
    var uuid = s.join(""); 
    return uuid; 
} 
export function  checkBankNo(value){ 
        var bankNo = value+"";
        var leng = bankNo.substring(0, 2);
        if(bankNo.length < 16 || bankNo.length > 19) {
            return false;
          }
           var num = /^\d*$/; //全数字
           if(!num.exec(bankNo)) {
             return false;
           }
           //开头6位
           var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
           if(strBin.indexOf(leng) == -1) {
             return false
           }
            return true;
} 
//校验重复的数据
export function  checkChildTableRepetition(tableData,checkField){ //tableData 检查的子表  checkField  检查的字段
        var copyData = tableData.concat();//复制一个子表数据
        var checkFieldvar =  checkField;
        var map = new Map();
        var length = copyData.length;
        if(checkFieldvar.lastIndexOf(".")>0){ //判断是否检查一个object类型的对象
            var firstStr = checkFieldvar.substring(0,checkFieldvar.lastIndexOf("."));
            var lastStr = checkFieldvar.substring(checkFieldvar.lastIndexOf(".")+1,checkFieldvar.length);
            for(let p in copyData){
                let dataOne = copyData[p];
                let obj = dataOne[firstStr];
                let checkData = obj[lastStr];
                let num = 0;
                for(let t in tableData){
                    let dataTwo = tableData[t];
                    let childObj = dataTwo[firstStr];
                    if(checkData == childObj[lastStr]){
                        map.set(checkData,checkData);
                    }
                }
            }
        }else{ //非检查object对象的
            for(let o in copyData){
                let data = copyData[o];
                for(let i in tableData){
                    let tData = tableData[i];
                    let number = 0;
                    if(tData[checkField]==data[checkField]){ 
                        map.set(tData,tData);
                    }
                }
            }
        }
        if(map.size!=length){
            return false;
        }
        return true;
} 