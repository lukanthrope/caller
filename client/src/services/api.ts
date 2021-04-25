import axios from 'axios';

class ApiService {
  private readonly baseUrl = 'http://localhost:5000/'

  setToken = (token: string) => {
    axios.defaults.headers.common.authorization = `Bearer ${token}`
  }

  dropToken = () => {
    axios.defaults.headers.common.authorization = ''
  }

  get = async (url: string) => axios.get(`${this.baseUrl}${url}`)

  post = async (url: string, data = {}) => axios.post(`${this.baseUrl}${url}`, data)

  put = async (url: string, data: any) => axios.put(`${this.baseUrl}${url}`, data)

  delete = async (url: string, data: string) => axios.delete(`${this.baseUrl}${url}/${data}`)
}

export default new ApiService();
