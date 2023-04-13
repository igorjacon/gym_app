import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {genders, GymMember, GymService, membershipTypes} from "../gym.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class UpdatePage {
  param : string = "";
  memberObj : GymMember = <GymMember>{};
  fullName : string = "";
  dob : string = "";
  gender : string = "";
  membership : string = "";
  startDay : string = "";
  contactNumber : number = 0;
  email : string = "";
  address : string = "";
  emergencyNumber : number = 0;
  medicalCondition ?: string = "";
  isTrial : boolean = false;
  genders = genders;
  membershipTypes = membershipTypes;
  valid: boolean = false;
  dismissToast = [
    {
      text: 'Dismiss',
      role: 'cancel'
    }
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private gymService : GymService,
              private storage : Storage) {}

  async ionViewDidEnter() {
    this.param = this.route.snapshot.params['id'];
    this.memberObj = await this.storage.get(this.param);
    this.fullName = this.memberObj.fullName;
    this.dob = this.memberObj.dob;
    this.gender = this.memberObj.gender;
    this.membership = this.memberObj.membership;
    this.startDay = this.memberObj.startDay;
    this.contactNumber = this.memberObj.contactNumber
    this.email = this.memberObj.email;
    this.address = this.memberObj.address;
    this.emergencyNumber = this.memberObj.emergencyNumber
    this.medicalCondition = this.memberObj.medicalCondition;
    this.isTrial = this.memberObj.isTrial;
  }

  // Apply validation for form fields validations
    public myForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      membership: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      emergencyNumber: new FormControl('', [Validators.required]),
      medicalCondition: new FormControl('', []),
      isTrial: new FormControl('', []),
    });

  async updateMember() {
    let toast = await document.querySelector('ion-toast');
    if (this.myForm.invalid) {
      if (toast) {
        toast.setAttribute('color', 'danger');
        toast.setAttribute('message', "Please fix the errors.");
      }
      this.valid = false;
      return;
    }

    // Modify just that property
    this.memberObj.fullName= this.fullName
    this.memberObj.dob = this.dob
    this.memberObj.gender = this.gender
    this.memberObj.membership = this.membership
    this.memberObj.startDay = this.startDay
    this.memberObj.contactNumber = this.contactNumber
    this.memberObj.email = this.email
    this.memberObj.address = this.address
    this.memberObj.emergencyNumber = this.emergencyNumber
    this.memberObj.medicalCondition = this.medicalCondition
    this.memberObj.isTrial = this.isTrial;
    await this.storage.set(this.param, this.memberObj);
    // Add Gym member to local storage
    if (toast) {
      toast.setAttribute('color', 'success');
    }
    // Clear form validation
    this.valid = true;
  }
}
