import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  private recipes: Recipe[] = [
    new Recipe("A Test Recipe", "this is a simple", "https://realfood.tesco.com/media/images/RFO-1400x919--d723b77b-8b5a-4803-8f9e-62d363bc69f9-0-1400x919.jpg",[
      new Ingredient("Meat",1),
      new Ingredient("French Fries",20)
    ]),
    new Recipe("A New Recipe", "this is a easy", "https://realfood.tesco.com/media/images/RFO-1400x919--d723b77b-8b5a-4803-8f9e-62d363bc69f9-0-1400x919.jpg",
    [
      new Ingredient("Buns",2),
      new Ingredient("Meat",1)
    ]),
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientToCart(ingredients: Ingredient[]){
      this.shoppingListService.addIngredients(ingredients);
  }

}
