import axios from 'axios';

class ApiService {
  private readonly baseUrl = 'http://localhost:5000/'

  setToken = (token: string) => {
    axios.defaults.headers.common.authorization = `Bearer ${token}`
  }

  dropToken = () => {
    axios.defaults.headers.common.authorization = ''
  }

  get = async (url: string, data?: any) => axios.get(`${this.baseUrl}${url}`, data)

  post = async (url: string, data = {}, params?: any) => axios.post(`${this.baseUrl}${url}`, data, params)

  put = async (url: string, data: any) => axios.put(`${this.baseUrl}${url}`, data)

  delete = async (url: string, data: string) => axios.delete(`${this.baseUrl}${url}/${data}`)
}

export default new ApiService();
