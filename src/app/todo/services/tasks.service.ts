import {Injectable} from "@angular/core";
import {Tasks} from "../models/tasks.model";

@Injectable({
  providedIn:'root'
})
export class TasksService{
  constructor() {
  }

  private tasks:Tasks[]=[];

  public initTasks(){
    this.tasks=JSON.parse(localStorage.getItem('tasks') || "[]");
    return this.tasks;
  }
 public addTask(task:Tasks){
    this.tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(this.tasks))
 }

 public removeTask(indexOfTask:number):void{
    this.tasks.splice(indexOfTask,1);
   localStorage.setItem('tasks',JSON.stringify(this.tasks))
 }


}
