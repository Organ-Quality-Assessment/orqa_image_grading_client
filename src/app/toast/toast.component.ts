import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [    
    trigger('toastTrigger', [ // This refers to the @trigger we created in the template      
      state('open', style({ transform: 'translateY(0%)' })), // This is how the 'open' state is styled      
      state('close', style({ transform: 'translateY(-200%)' })), // This is how the 'close' state is styled      
      transition('open <=> close', [ // This is how they're expected to transition from one to the other         
        animate('300ms ease-in-out')
      ])    
    ])  
  ]
})
export class ToastComponent implements OnInit {
  toastMessage = 'This is a toast'; 
  showsToast = false; 

  constructor() { }  

  ngOnInit(): void { 
    setTimeout(() => {      
      this.showsToast = true;    
    }, 1000);  
   }
}
