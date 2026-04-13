import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import type { Recipe, CreateRecipeDto, UpdateRecipeDto } from '../types';
@Injectable()
export class RecipesService {
  private collection = 'recipes';

  constructor(private readonly firebase: FirebaseService) {}

  async findAll(): Promise<Recipe[]> {
    const snapshot = await this.firebase.getDb()
      .collection(this.collection)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Recipe[];
  }

  async findOne(id: string): Promise<Recipe> {
    const doc = await this.firebase.getDb()
      .collection(this.collection)
      .doc(id)
      .get();

    if (!doc.exists) throw new Error('Recipe not found');

    return { id: doc.id, ...doc.data() } as Recipe;
  }

  async create(dto: CreateRecipeDto): Promise<Recipe> {
    const data = {
      ...dto,
      createdAt: new Date().toISOString(),
    };

    const ref = await this.firebase.getDb()
      .collection(this.collection)
      .add(data);

    return { id: ref.id, ...data };
  }

  async update(id: string, dto: UpdateRecipeDto): Promise<Recipe> {
    await this.firebase.getDb()
      .collection(this.collection)
      .doc(id)
      .update({ ...dto });

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.firebase.getDb()
      .collection(this.collection)
      .doc(id)
      .delete();
  }
}