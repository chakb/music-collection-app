import axios from 'axios';
import { Artist } from '../../types';
import { baseUrl } from '../constants/Url';

const getAll = async (): Promise<Artist[]> => {
  const response = await axios.get(`${baseUrl}/artists/all`);
  return response.data;
};

const getById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/artist/${id}`);
  return response.data;
};

const create = async (newObject: Omit<Artist, '_id'>) => {
  const response = await axios.post(`${baseUrl}/artist`, newObject);
  return response.data;
};

const createMany = async (newObject: Omit<Artist, '_id'>[]) => {
  const response = await axios.post(`${baseUrl}/artist`, newObject);
  return response.data;
};

const update = async (id: string, objectToUpdate: Artist) => {
  const response = await axios.put(`${baseUrl}/artist/${id}`, objectToUpdate);
  return response.data;
};

const remove = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/artist/${id}`);
  return response.data;
};

export default { getAll, getById, create, createMany, update, remove };
