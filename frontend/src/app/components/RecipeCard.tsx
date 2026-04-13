'use client';

import { useState } from 'react';
import { Recipe } from '../../lib/api';
import RecipeForm from './RecipeForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { recipeApi } from '../../lib/api';

interface Props {
  recipe: Recipe;
  onDelete: () => void;
}

export default function RecipeCard({ recipe, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Recipe>) => recipeApi.update(recipe.id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      setIsEditing(false);
    },
  });

  if (isEditing) return (
    <RecipeForm
      initialData={recipe}
      onSubmit={(data) => updateMutation.mutate(data)}
      onCancel={() => setIsEditing(false)}
      isLoading={updateMutation.isPending}
    />
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{recipe.title}</h2>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            recipe.difficulty === 'Easy'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {recipe.difficulty}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-indigo-500 hover:text-indigo-700 text-sm"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        {isExpanded ? '▲ Hide' : '▼ Show'} {recipe.ingredients.length} ingredients
      </button>

      {isExpanded && (
        <ul className="mt-3 space-y-1">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-1">
              <span>{ing.name}</span>
              <span className="text-gray-400">{ing.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}