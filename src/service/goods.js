import axios from 'axios'

export function getDetail(id) {
  return axios.get(`/goods?id=${id}`);
}

export function getCategory() {
  return axios.get('/categories');
}

export function search(params) {
  return axios.get('/search', { params });
}

export function getGoodsByUser(uid) {
  return axios.get('/goods/seller', { params: { uid } });
}