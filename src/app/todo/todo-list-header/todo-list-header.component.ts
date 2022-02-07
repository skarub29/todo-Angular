import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.scss']
})
export class TodoListHeaderComponent implements OnInit{
  @Output() mainArray:EventEmitter<any>=new EventEmitter<any>();
  ngOnInit() {
  }

  tasks:any=[];
  inputValue: string='';

 addTask():void{
     const task=this.inputValue;
     this.inputValue=''
     this.tasks.push({completed:false,content: task})
     this.mainArray.emit(this.tasks);
  }


  @Output() selectValue:EventEmitter<any>=new EventEmitter<any>();
  filterValue:string=''
  setValueSelect(event:any){
    const target=event.target
    this.filterValue=target.value
    this.selectValue.emit(this.filterValue);
  }


}



