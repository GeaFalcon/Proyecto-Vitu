import {AbstractControl} from '@angular/forms';

export class passValidation{

    static matchPass(AC:AbstractControl){
        let pass=AC.get('passReg').value;
        let pass2=AC.get('pass2').value;
        if(pass!=pass2){
            console.log("false");
            AC.get('pass2').setErrors({matchPass:true})
        }else{
            console.log("true")
            return null
        }
    }
}