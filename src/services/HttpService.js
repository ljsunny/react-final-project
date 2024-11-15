import http from "../http-common";

class HttpService{
    get(fileName,path=""){
        return http.get(`${path}/${fileName}`);
    }
}

export default new HttpService();