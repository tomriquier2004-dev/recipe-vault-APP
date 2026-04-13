'use client';

import { useState } from 'react';
import { Recipe, Ingredient } from '../../lib/api';

interface Props {
  initialData?: Recipe;
  onSubmit: (data: Omit<Recipe, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function RecipeForm({ initialData, onSubmit, onCancel, isLoading }: Props) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Hard'>(initialData?.difficulty || 'Easy');
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialData?.ingredients || [{ name: '', quantity: '' }]
  );

  const addIngredient = () => setIngredients([...ingredients, { name: '', quantity: '' }]);

  const removeIngredient = (index: number) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title, difficulty, ingredients: ingredients.filter(i => i.name.trim()) });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{initialData ? 'Edit Recipe' : 'New Recipe'}</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe title..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Hard')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="Easy">Easy</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
        <div className="space-y-2">
          {ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={ing.name}
                onChange={(e) => updateIngredient(i, 'name', e.target.value)}
                placeholder="Name"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                value={ing.quantity}
                onChange={(e) => updateIngredient(i, 'quantity', e.target.value)}
                placeholder="Quantity"
                className="w-28 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {ingredients.length > 1 && (
                <button
                  onClick={() => removeIngredient(i)}
                  className="text-red-400 hover:text-red-600 px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={addIngredient}
          className="mt-2 text-sm text-indigo-500 hover:text-indigo-700"
        >
          + Add ingredient
        </button>
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Recipe'}
        </button>
      </div>
    </div>
  );
}