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
  
  export interface CreateRecipeDto {
    title: string;
    difficulty: 'Easy' | 'Hard';
    ingredients: Ingredient[];
  }
  
  export interface UpdateRecipeDto {
    title?: string;
    difficulty?: 'Easy' | 'Hard';
    ingredients?: Ingredient[];
  }