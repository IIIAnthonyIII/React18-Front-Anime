import apiClient from "./AxiosAPI";

const getTypes = async () => {
  try {
    const response = await apiClient.get('type?sort=-name');
    return response;
  } catch (error) {
    return error;
  }
};

const createType = async (typeData) => {
  try {
    const response = await apiClient.post('type', typeData);
    return response;
  }catch (error){
    return error;
  }
}

const editType = async (id, typeData) => {
  try {
    const response = await apiClient.put(`type/${id}`, typeData);
    return response;
  } catch (error) {
    return error;
  }
};

const deleteType = async (id, typeData) => {
  try {
    const response = await apiClient.post(`type/${id}`, typeData);
    return response;
  } catch (error) {
    return error;
  }
};

const activeType = async (id) => {
  try {
    const response = await apiClient.put(`type/activar/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  getTypes,
  createType,
  editType,
  deleteType,
  activeType
};