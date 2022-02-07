import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tasks:any=[];
  getArray(event:any):void{
    this.tasks=event;
  }
  filterValue:string='';
  getValueSelect(event:any):void{
    this.filterValue=event;
  }
}
