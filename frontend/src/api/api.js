import axios from 'axios';

export const url = "http://localhost:4000/api/v1";

export default function getallproducts(page) {
    return axios.get(`${url}/products?page=${page}`);
}

export function getrateproducts(page) {
    return axios.get(`${url}/products?ratings=4&page=${page}`);
}

export function getcateproducts(category, page) {
    return axios.get(`${url}/products?category=${category}&page=${page}`);
}

export function getsingleproduct(id) {
    return axios.get(`${url}/product/${id}`);
}

export function logout() {
    return axios.get(`${url}/logout`);
}

export function register(item) {
    return axios.post(`${url}/register`, item);
}
