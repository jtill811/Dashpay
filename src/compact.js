import pkg from 'crypto-js';
const { AES, enc } = pkg;

export default {
    __string: (s=String)=>{
        try {
            if(typeof s != 'string'){
                if(s == 'object'){return(JSON.stringify(s))}else{return(String(s));}
            }else{
                return(s)
            }
        } catch (err) {
            console.error(err);
        }
    },
    encryptToAES: function(x,y="xMlhQlhs9"){
        try{
            return AES.encrypt(this.__string(x),y).toString();
        }catch(err){
            console.error(err)
        }
    },
    decryptToAES: function(x,y="xMlhQlhs9"){
        try {
            let data = AES.decrypt(this.__string(x).toString(),y);
            return data.toString(enc.Utf8)
        } catch (err) {
            console.error(err);
        }
    }
}