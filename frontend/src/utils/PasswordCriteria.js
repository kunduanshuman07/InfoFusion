export const verifyPasswordCriteria = (password) =>{
    if(password.length<8){
        return false;
    }
    let u=false;
    let l=false;
    let n=false;
    let s=true;
    for (let i=0;i<password.length;i++){
        if(password[i]>='A' && password[i]<='Z'){
            u=true;
        }
        if(password[i]>='a' && password[i]<='z'){
            l=true;
        }
        if(password[i]>='0'&& password[i]<=9){
            n=true;
        }
        else {
            s=true;
        }
    }
    if(u===false){
        return false;
    }
    if(l===false){
        return false;
    }
    if(n===false){
        return false;
    }
    if(s===false){
        return false;
    }
    return true;
}