import axios from 'axios';
import { Album } from '../../types';
import { baseUrl } from '../constants/Url';

const getAll = async (): Promise<Album[]> => {
  const response = await axios.get(`${baseUrl}/albums/all`);
  return response.data;
};

const getById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/album/${id}`);
  return response.data;
};

const create = async (newObject: Omit<Album, '_id'>) => {
  const response = await axios.post(`${baseUrl}/album`, newObject);
  return response.data;
};

const createMany = async (newObject: Omit<Album, '_id'>[]) => {
  const response = await axios.post(`${baseUrl}/album`, newObject);
  return response.data;
};

const update = async (id: string, objectToUpdate: Album) => {
  const response = await axios.put(`${baseUrl}/album/${id}`, objectToUpdate);
  return response.data;
};

const remove = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/album/${id}`);
  return response.data;
};

export default { getAll, getById, create, createMany, update, remove };
