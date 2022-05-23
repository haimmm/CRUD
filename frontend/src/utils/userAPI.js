import axios from "axios";

const baseUrl = "http://localhost:4000"

const API = {
  //AUTH CALLS

  login: async loginInfo => {
    try {
      return await axios.post(`${baseUrl}/auth/login`, loginInfo);
    } catch (error) {
      throw new Error(error);
    }
  },

  //USER CALLS

  addUser: async user => {
    try {
      return await axios.post(`${baseUrl}/user/create`, user);
    } catch (error) {
      throw new Error(error);
    }
  },

  getAllUsers: async () => {
    try {
      return await axios.get(`${baseUrl}/user`);
    } catch (error) {
      throw new Error(error);
    }
  },

  getUserById: async id => {
    try {
      return await axios.get(`${baseUrl}/user/${id}`);
    } catch (error) {
      throw new Error(error);
    }
  },

  updateUser: async (id, updates) => {
    try {
      return await axios.put(`${baseUrl}/user/update/${id}`, updates);
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteUser: async (id) => {
    try {
      return await axios.put(`${baseUrl}/user/delete/${id}`);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default API;