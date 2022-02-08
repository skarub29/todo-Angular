import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Tasks} from "../models/tasks.model";
import {TasksService} from "../services/tasks.service";


@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.scss']
})

export class TodoListHeaderComponent implements OnInit{
  @Input() userName:string='';
  ngOnInit() {
  }

  tasks:Tasks[]=[];
  inputValue: string='';

  constructor(
    public tasksService:TasksService
  ) {
  }

 addTask():void{
     const task=this.inputValue;
     if (task==''){
       return;
     }
   this.tasksService.addTask({completed:false,content: task})
     this.inputValue=''
  }


  @Output() selectValue:EventEmitter<any>=new EventEmitter<any>();
  filterValue:string=''
  setValueSelect(event:any){
    const target=event.target
    this.filterValue=target.value
    this.selectValue.emit(this.filterValue);
  }


}



