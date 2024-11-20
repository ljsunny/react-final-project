import http from "../http-common";

class HttpService{
    get(fileName,path=`react-final-project`){
        return http.get(`${path}/${fileName}`);
    }
}

export default new HttpService();