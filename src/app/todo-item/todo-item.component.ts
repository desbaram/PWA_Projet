import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import {TodoItem, TodoList, TodolistService} from '../todolist.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input() data!: TodoItem;
  @Output() update = new EventEmitter<Partial<TodoItem>>();
  @Output() remove = new EventEmitter<TodoItem>();
  @ViewChild('newTextInput') newTextInput!: ElementRef<HTMLInputElement>;
  
  editing = false;
  newData!:string;
  constructor() { }


  ngOnInit(): void {
  }

  get Editing():boolean {
    return this.editing;
  }

  isEditing() {
    this.editing = !this.editing;
    if (this.editing) {
      requestAnimationFrame(
        () => this.newTextInput.nativeElement.focus()
      );
    }
  }

  updateItem(): void{
    if (this.newData !== undefined && this.newData !== ''){
      this.update.emit({label: this.newData});
    }
    this.isEditing();
  } /* fonction update qui modifie le label de l'élément en prenant la nouvelle valeur */
  
  updateIsDone(e: boolean): void{
    this.update.emit({isDone: e});
  } /* fonction update qui modifie l'état isDone de l'élément */

}
