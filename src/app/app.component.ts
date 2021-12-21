import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodolistService, TodoList, TodoItem } from './todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private TDLS: TodolistService){
  }

  get obsTodoList(): Observable<TodoList>{
    return this.TDLS.observable;
  }

  append(label: string): void {
    this.TDLS.append(label);
  } /* ajout label du nouvel item */

  remove(items: TodoItem): void {
    this.TDLS.remove(items);
  } /* suppression item */

  updateValue(item: TodoItem, u: Partial<TodoItem>):void{
    this.TDLS.update(u,item);
  } /* mise à jour de l'item */

}
