import { Component, OnInit, ChangeDetectionStrategy, IterableDiffers } from '@angular/core';
import {TodoItem, TodoList, TodolistService} from '../todolist.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  constructor(private TDLS: TodolistService) { }

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

  updateIsDone(item: TodoItem){
    this.TDLS.update({"isDone":!item.isDone},item);
  }

  undo(): void {
    this.TDLS.undo();
  }

  redo(): void {
    this.TDLS.redo();
  }

}
