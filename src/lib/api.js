import axios from "axios";

const axiosAPI = axios.create({
    baseURL : "http://localhost:5000/"
});

const apiRequest = (method, url, request) => {
    const headers = {
        // authorization: ""
    };
    //using the axios instance to perform the request that received from each http method
    return axiosAPI({
        method,
        url,
        data: request,
        headers
      }).then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
};

// function to execute the http get request
const get = (url, request) => apiRequest("get",url,request);

const API ={
    get
};
export default API;
  