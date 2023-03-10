import axios, {AxiosResponse, AxiosError} from "axios";
import {toast} from "react-toastify";
import { history } from "../..";

const sleep = () => new Promise(resolve => setTimeout(resolve, 50));


axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
   await sleep();
   return response
}, (error: AxiosError) => {
    console.log('caught by interceptor');
    const {data, status} = error.response! as{data: any, status:number};
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for(const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat(); //returne gidemez!!
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push({ // history from index (../..)
                pathname:'/server-error'
            },{error: data});
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url:string, body:{}) => axios.post(url,body).then(responseBody),
    put: (url:string, body:{}) => axios.put(url,body).then(responseBody),
    delete: (url:string) => axios.delete(url).then(responseBody)
}
const Catalog = {
    list: () => requests.get('products'),
    details: (id:number) => requests.get(`products/${id}`)
}
const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/notFound'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error')
}
const Basket = {
    get: () => requests.get('basket'),                                //   POST REQUEST needs BODY empty or not , {}
    addItem: (productId:number,quantity=1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId:number,quantity=1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}
export default agent;