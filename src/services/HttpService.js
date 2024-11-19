import http from "../http-common";

class HttpService{
    get(fileName,path=`${process.env.PUBLIC_URL}`){
        return http.get(`${path}/${fileName}`);
    }
}

export default new HttpService();