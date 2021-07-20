import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm | undefined;
  subscription: Subscription | undefined;
  editMode = false;
  editItemIndex: number | undefined;
  editItem: Ingredient | undefined;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing
    .subscribe(
      (index: number)=>{
        this.editItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.slForm?.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      }
    );
  }
  onAddItem(form: NgForm){
    const value=form.value;
      const newIngredient = new Ingredient(value.name, value.amount);
      if(this.editMode){
        this.shoppingListService.updateIngredient(this.editItemIndex!, newIngredient);
      }
      else{
      this.shoppingListService.addIngredient(newIngredient);
      }
      this.editMode=false;
      form.reset();
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
  onClearItems()
  {
    this.slForm?.reset();
    this.editMode =false;
  }

  onDeleteItem(){
    this.shoppingListService.deleteIngredient(this.editItemIndex!);
    this.onClearItems();
  }
}
