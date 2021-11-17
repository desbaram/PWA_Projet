import { Component, OnInit, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import {TodoItem, TodoList, TodolistService} from '../todolist.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input() data!: TodoItem;
  constructor() { }

  ngOnInit(): void {
  }

  delete(item: TodoItem): void {
    ;
  }

}
