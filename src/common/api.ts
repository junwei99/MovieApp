import axios, { AxiosInstance } from 'axios';

class Api {
  private static axiosInstance: AxiosInstance;

  static init() {
    this.axiosInstance = axios.create({
      baseURL: 'http://api.themoviedb.org',
    });
  }

  static async get<ResponseType>(url: string) {
    return await Api.axiosInstance.get<ResponseType>(url);
  }

  static async post<ResponseType, DataType>(url: string, data?: DataType) {
    return await Api.axiosInstance.post<ResponseType, DataType>(url, data);
  }
}

export default Api;
