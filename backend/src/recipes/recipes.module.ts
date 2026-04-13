import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, FirebaseService],
})
export class RecipesModule {}