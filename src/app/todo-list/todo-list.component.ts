import { Component, OnInit, ChangeDetectionStrategy, IterableDiffers } from '@angular/core';
import {TodoItem, TodoList, TodolistService} from '../todolist.service';
import {Observable} from 'rxjs';

type FctFilter = (item: TodoItem) => boolean;
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  filterFct!: FctFilter;

  constructor(private TDLS: TodolistService) {
    this.filterFct = this.filterAll;
  }

  ngOnInit(): void {
  }

  get obsTodoList(): Observable<TodoList> {
    return this.TDLS.observable;
  }

  append(label: string): void {
    this.TDLS.append(label);
  }
  updateItem(item: TodoItem, u: Partial<TodoItem>): void {
    this.TDLS.update(u, item);
  }

  delete(item: TodoItem): void {
    this.TDLS.remove(item);
  }

  deleteIsDone(item: TodoItem): void{
    if(item.isDone)
      this.TDLS.remove(item);
  }

  countNDone(list: TodoList): number{
    let a = 0;
    list.items.forEach(item => {
      if(!item.isDone)
        a+=1
    })
    return a
  }

  undo(): void {
    this.TDLS.undo();
  }

  redo(): void {
    this.TDLS.redo();
  }

  filterAll: FctFilter = (item): boolean => {
    return !!item; // retourne true si il est diférent de indefine
  }

  filterDone: FctFilter = (item): boolean => {
    return item.isDone; // retourne true si il est diférent de indefine
  }

  filterNDone: FctFilter = (item): boolean => {
    return !item.isDone; // retourne true si il est diférent de indefine
  }

}
