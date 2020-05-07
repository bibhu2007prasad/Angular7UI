import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submember-bank-setup',
  templateUrl: './submember-bank-setup.component.html',
  styleUrls: ['./submember-bank-setup.component.css']
})
export class SubmemberBankSetupComponent implements OnInit {
    showModal: boolean;
 
    onClick(event) {
        this.showModal = true;
    }
   
    hide() {
        this.showModal = false;
       
    }
  constructor() { }

  ngOnInit() {
  }

}
