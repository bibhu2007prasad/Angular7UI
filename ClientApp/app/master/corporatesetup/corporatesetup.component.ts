import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-corporatesetup',
  templateUrl: './corporatesetup.component.html',
  styleUrls: ['./corporatesetup.component.css']
})
export class CorporatesetupComponent implements OnInit {
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
