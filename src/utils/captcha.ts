import 'isomorpic-fetch';
import {} from '../config/config';

export const verifyCaptcha= async (token:string){
    var headers= new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');

    var urlencoded = new URLSearchParams();
    urlencoded.append('response',token);
    urlencoded.append('secret',)

}
