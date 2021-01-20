import { getDictSelectUrl } from 'api/authority';
const dictDataCtr = {
    state:{
        dictData:[]
    },
    mutations:{
        SET_DICT_DATA : (state,dictData) =>{
            state.dictData = dictData;
        }
    },
    actions : {
        GetDictData({commit,
            state}){
            return new Promise((resolve,reject)=>{
                getDictSelectUrl(state.token).then(response=>{
                    const dictData = response.data;
                    commit("SET_DICT_DATA",dictData);
               });
            })
        }
    }
    
};

export default dictDataCtr;