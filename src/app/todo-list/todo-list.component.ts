import { Component, OnInit, ChangeDetectionStrategy, IterableDiffers } from '@angular/core';
import {TodoItem, TodoList, TodolistService} from '../todolist.service';
import {Observable} from 'rxjs';
/* déclaration du type filtre */
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
    this.filterFct = this.filterAll; /* initialisation du filtre de base donc ici on affiche tous */
  }

  ngOnInit(): void {
  }

  get obsTodoList(): Observable<TodoList> {
    return this.TDLS.observable;
  }

  append(label: string): void {
    this.TDLS.append(label);
  } /* ajout de la nouvelle tâche entrée */

  updateItem(item: TodoItem, u: Partial<TodoItem>): void {
    this.TDLS.update(u, item);
  } /* mise à jour de l'item */

  delete(item: TodoItem): void {
    this.TDLS.remove(item);
  } /* suppression de l'item */

  deleteDone(list: TodoList): void{
    list.items.forEach(item => {
      if(item.isDone)
        this.TDLS.remove(item);
    }) /* recherche dans tous les éléments de liste, si l'item est fait (isDone) il le supprime */
  }

  deleteAll(list: TodoList): void{
    list.items.forEach(item => {
      this.TDLS.remove(item);
    }) /* supprime tous les éléments de liste */
  }

  countNDone(list: TodoList): number{
    let a = 0;
    list.items.forEach(item => {
      if(!item.isDone)
        a+=1
    })
    return a
  } /* on déclare une variable a, pour chaque élément de la liste qui n'est pas fait, on incrémente a puis on renvoie la valeur */

  undo(): void {
    this.TDLS.undo();
  } /* utilise la fonction undo de TodolistService pour annuler l'action */

  redo(): void {
    this.TDLS.redo();
  } /* utilise la fonction redo de TodolistServiceS pour rétablir l'action */

  filterAll: FctFilter = (item): boolean => {
    return !!item; // retourne l'item s'il est défini
  }

  filterDone: FctFilter = (item): boolean => {
    return item.isDone; // retourne l'item si isDone = true
  }

  filterNDone: FctFilter = (item): boolean => {
    return !item.isDone; // retourne l'item si isDone = false
  }

  allCheck(list: TodoList): void{
    list.items.forEach(item => {
      if(!item.isDone)
        this.TDLS.update({isDone:true}, item)
    }) /* pour tous les éléments de la liste, s'il n'est pas fait (isDone = false) on update iDone = true */
  }

}
