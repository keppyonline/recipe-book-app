import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients : Ingredient [] =  [new Ingredient("Apples", 5), new Ingredient("Oranges", 10)];
  ingredientChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();
  constructor() { }
  getIngredient(index: number){
    return this.ingredients[index];
  }
  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);// push not supported collection hence spreading(...) and passing
    this.ingredientChanged.next(this.ingredients.slice())
;  }
    updateIngredient(index: number, newIngredient: Ingredient){
      this.ingredients[index] = newIngredient;
      this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
      this.ingredients.splice(index,1);
      this.ingredientChanged.next(this.ingredients.slice());
    }
}
