'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recipeApi, Recipe } from '../lib/api';
import RecipeCard from './components/RecipeCard';
import RecipeForm from './components/RecipeForm';

export default function Home() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const { data: recipes, isLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: recipeApi.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: recipeApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
  });

  const createMutation = useMutation({
    mutationFn: recipeApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      setShowForm(false);
    },
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading recipes...</p>
    </div>
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">🍳 Recipe Vault</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {showForm ? 'Cancel' : '+ New Recipe'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <RecipeForm
            onSubmit={(data) => createMutation.mutate(data)}
            isLoading={createMutation.isPending}
          />
        </div>
      )}

      {recipes?.length === 0 && (
        <p className="text-center text-gray-400 mt-16">No recipes yet. Create your first one!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes?.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onDelete={() => deleteMutation.mutate(recipe.id!)}
          />
        ))}
      </div>
    </main>
  );
}