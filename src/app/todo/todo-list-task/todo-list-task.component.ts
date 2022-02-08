import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {stringify} from "@angular/compiler/src/util";
import {formatNumber} from "@angular/common";
import {elementAt} from "rxjs";
import {TasksService} from "../services/tasks.service";
import {Tasks} from "../models/tasks.model";

@Component({
  selector: 'app-todo-list-task',
  templateUrl: './todo-list-task.component.html',
  styleUrls: ['./todo-list-task.component.scss']
})
export class TodoListTaskComponent   implements OnChanges,OnInit{

 tasks:Tasks[]=[]
  @Input() filterValue:string=''

  constructor(
    private tasksService:TasksService
  ) {
  }

  ngOnInit():void{
    this.tasks=this.tasksService.initTasks()
}
  conditionEdit:boolean=false;
  condition:boolean=false;





  task:any = document.getElementsByClassName("task");
  ngOnChanges() {
    //FILTERRRRRRR
    for (let item of this.task) {
      switch (this.filterValue){
        case'all':
          item.style.display='flex'
        break;
        case'completed':
          if(item.classList.contains('true')){
            item.style.display='flex'
          }else{
            item.style.display='none'
          }
          break;
        case 'uncompleted':
          if(item.classList.contains('true')){
            item.style.display='none'
          } else {
            item.style.display='flex'
          }
      }
    }

  }


  indexOfTask:number=0;
  searchIndexOfTask(i:number):void{
    this.indexOfTask=i;
  }







  toggleCheckbox(i:any){
    this.tasks.forEach((value:any,index:any)=>{
      if(i===index) {
       value.completed = !value.completed
        if (value.completed === true) {
          console.log(this.tasks[i])
          this.tasksService.removeTask(i)
          let taskText=value.content
          this.tasksService.addTask({completed:value.completed,content: taskText})
        } if (value.completed===false){
          this.tasksService.removeTask(i)
          this.tasksService.addTask({content: value.content, completed:value.completed})
        }
      }
    });
  }





  cancelEdit(event:any):void{
    const target=event.target;
    target.parentElement.style.display="none"
    target.previousSibling.previousSibling.value='';
  }
  editTaskText(event:any):void {
    const target = event.target
    this.tasks.forEach((value: any, index: number) => {  //EDIT BLOCk==============
      if(index==this.indexOfTask){
        if(target.previousSibling.value==''){
          return
        }
        value.content=`${target.previousSibling.value}`
        target.previousSibling.value='';
        target.parentElement.style.display="none"
      }

    });
  }

  editTask(event:any):void{
    const target = event.target
    this.conditionEdit = !this.conditionEdit
    const editBlock = target.parentElement.lastChild.firstChild;
    const textarea = editBlock.firstChild.nextSibling;
    textarea.style.width = '90%';
    textarea.style.height = '50px';

    if (this.conditionEdit === true) {
      editBlock.style.display="block"
    } if(this.conditionEdit===false) {
      editBlock.style.display="block"

    }

  }








  disabled='';
removeTask(event:any){
  const target=event.target;
   this.condition=!this.condition;
   target.nextSibling.lastChild.style.display='block';  //REMOVE BLOCK============
  this.tasks.forEach((value:any,index:number)=> {
    if(this.indexOfTask!=index){
      this.disabled='disabled';
    } else{
      this.disabled='disabled';
    }
      });
}
deleteTaskFinish(value:string,event:any):void{
  const target=event.target
  if(value==='yes'){
  //  this.tasks.splice(this.indexOfTask,1)
    this.tasksService.removeTask(this.indexOfTask);
    this.condition=false
    target.parentElement.style.display='none'
    this.disabled='';
  } if(value==='no'){
    this.disabled='';
    target.parentElement.style.display='none'
    this.condition=false
  }

}






//ARRROWS===========================
changePriority(event:any) {
  const index=event.target.parentElement.firstChild.nextSibling.innerText-1;
  const indexPrevious=index-1;
  const indexNext=index+1;
  const check=event.target.parentElement.parentElement.classList.contains("true");
 if(check){
   return;
 }else{
    if(event.target.id=="up"){
      if(indexPrevious==-1){
        return;
      }else{
        [this.tasks[index],this.tasks[indexPrevious]]=[this.tasks[indexPrevious],this.tasks[index]];
      }


    } if(event.target.id=="down"){
      if (indexNext === this.tasks.length) {
        return;
      } else {
        [this.tasks[index], this.tasks[indexNext]] = [this.tasks[indexNext], this.tasks[index]];
      }
    }

  }


}



}
