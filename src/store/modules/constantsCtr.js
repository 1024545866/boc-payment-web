
const constantsCtr = {
    state:{
        showButton : []
    },
    mutations:{
        SET_SHOW_BUTTON : (state,showButton) =>{
            state.showButton = showButton;
        }
    },
    actions : {
        GetShowButton({
            commit,
            state
        },obj){
            return new Promise((resolve,reject)=>{
                var showButton = [];
                // showButton["add"] = true;
                // showButton["delete"] = true;
                // showButton["update"] = true;
                // showButton["refresh"] = true;
                // showButton["detail"] = true;
                // showButton["importall"] = true;
                // showButton["exportall"] = true;
                // showButton["importbill"] = true;
                // showButton["exportBill"] = true;
                // showButton["query"] = true;
                // showButton["highquery"] = true;

                // showButton["save"] = true;
                // showButton["cancel"] = true;
                // showButton["return"] = true;
                // showButton["edit"] = true;
                // showButton["addCard"] = true;
                // showButton["refreshcard"] = true;
                // showButton["exportcard"] = true;
                // showButton["uploadcard"] = true;

                // showButton["addline"] = true;
                // showButton["delline"] = true;
                // showButton["copyline"] = true;
                // showButton["pasteline"] = true;
                // showButton["insline"] = true;
                // showButton["impline"] = true;
                // showButton["expline"] = true;
                // showButton["uploadline"] = true;
                // showButton["delallline"] = true;

                var elements = obj.elements;
                var code = obj.code;
                var showButton = [];
                for(let key in elements){
                    if(key.indexOf(code)>=0){
                        var codeName = key.split(":")[key.split(":").length-1];
                        showButton[codeName] = true;
                    }
                }

                commit("SET_SHOW_BUTTON",showButton);
            })
        }
    }
    
};

export default constantsCtr;