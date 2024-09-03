import apiClient from "./AxiosAPI";

// const getAnimes = async () => {
//   try {
//     const response = await apiClient.get('anime');
//     return response;
//   } catch (error) {
//     return error;
//   }
// };
const getAnimes = async (page, pageSize) => {
    try {
      const response = await apiClient.get(`anime?per_page=${pageSize}&page=${page}`);
      return response;
    } catch (error) {
      return error;
    }
  };

const createAnime = async (animeData) => {
  try {
    const response = await apiClient.post('anime', animeData);
    return response;
  }catch (error){
    return error;
  }
}

const editAnime = async (id, animeData) => {
  try {
    const response = await apiClient.put(`anime/${id}`, animeData);
    return response;
  } catch (error) {
    return error;
  }
};

const deleteAnime = async (id, animeData) => {
  try {
    const response = await apiClient.post(`anime/${id}`, animeData);
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  getAnimes,
  createAnime,
  editAnime,
  deleteAnime,
};