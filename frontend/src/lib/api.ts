import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Recipe {
  id?: string;
  title: string;
  difficulty: 'Easy' | 'Hard';
  ingredients: Ingredient[];
  createdAt?: string;
}

export const recipeApi = {
  getAll: async (): Promise<Recipe[]> => {
    const { data } = await api.get('/recipes');
    return data;
  },

  getOne: async (id: string): Promise<Recipe> => {
    const { data } = await api.get(`/recipes/${id}`);
    return data;
  },

  create: async (recipe: Omit<Recipe, 'id' | 'createdAt'>): Promise<Recipe> => {
    const { data } = await api.post('/recipes', recipe);
    return data;
  },

  update: async (id: string, recipe: Partial<Recipe>): Promise<Recipe> => {
    const { data } = await api.put(`/recipes/${id}`, recipe);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/recipes/${id}`);
  },
};