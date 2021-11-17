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
     /* Ajoutez un paramètre de type TodolistService au constructeur */
  }

  get obsTodoList(): Observable<TodoList>{
    return this.TDLS.observable;
  }

  append(label: string): void {
    this.TDLS.append(label);
  }

  remove(items: TodoItem): void {
    this.TDLS.remove(items);
  }

  updateValue(item: TodoItem, u: Partial<TodoItem>):void{
    this.TDLS.update(u,item);
  }

}
