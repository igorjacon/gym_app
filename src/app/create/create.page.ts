import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {GymService} from "../gym.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  providers: [GymService],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class CreatePage implements OnInit {
public id : number;
  public fullName : string;
  public dob : Date;
  public gender : string;
  public membership : string;
  public startDay : Date;
  public contactNumber : number;
  public email : string;
  public address : string;
  public emergencyNumber ?: number;
  constructor(private gymService : GymService) {
    this.id = 0;
    this.fullName = "Igor Jacon";
    this.dob = new Date('16/12/1990');
    this.gender = "Male";
    this.membership = "Student";
    this.startDay = new Date('01/01/2023');
    this.contactNumber = parseInt('0475759955');
    this.email = 'igor@example.com';
    this.address = '171 Old Burleigh Road';
  }

  ngOnInit() {
  }

}
