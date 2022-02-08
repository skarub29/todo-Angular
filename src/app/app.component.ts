import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  filterValue:string='';
  getValueSelect(event:any):void{
    this.filterValue=event;
  }

   userName:string='';
  flipContainer(event:any):void{
    event.target.parentElement.style.marginTop="-100vh";
   this.userName=(event.target.previousSibling.firstChild.lastChild.value);

  }
}
