import http from "../http-common";

class HttpService{
    get(fileName,path="data/"){
        return http.get(`${path}/${fileName}`);
    }
}

export default new HttpService();