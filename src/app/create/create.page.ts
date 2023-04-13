import {Component, NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {genders, GymMember, GymService, membershipTypes} from "../gym.service";
import {RouterLink} from "@angular/router";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  providers: [GymService],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ]
})

export class CreatePage {
  memberId : number = 1;
  fullName : string;
  dob : string;
  gender : string;
  membership : string;
  startDay : string;
  contactNumber : number;
  email : string;
  address : string;
  emergencyNumber : number;
  medicalCondition : string = "";
  isTrial : boolean = false;
  genders = genders;
  membershipTypes = membershipTypes;
  dismissToast = [
    {
      text: 'Dismiss',
      role: 'cancel'
    }
  ];
  idCounter : number = 0;
  valid: boolean = false;
  uniqueIdError = "";

  constructor(private gymService : GymService, private storage: Storage) {
    // Initialize member object with default values
    this.fullName = "Igor Jacon";
    this.dob = '1990-12-16';
    this.gender = "Male";
    this.membership = "Student";
    this.startDay = '2023-01-01';
    this.contactNumber = +61475759955;
    this.email = 'igor@example.com';
    this.address = '171 Old Burleigh Road';
    this.emergencyNumber = +61475759955;
  }

  // Apply validation for form fields validations
  public myForm = new FormGroup({
    memberId: new FormControl('', [Validators.required]),
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

  async ionViewDidEnter() {
    this.idCounter = await this.storage.length()+1;
    this.memberId = this.idCounter;
  }

  async addMember() {
    let toast = await document.querySelector('ion-toast');

    // Check if ID is unique
    let savedMembers = await this.storage.keys();
    if (savedMembers.includes(this.memberId.toString())) {
        if (toast) {
          toast.setAttribute('color', 'danger');
          toast.setAttribute('message', "Please fix the errors.");
        }
        this.uniqueIdError = "The ID must be unique"
        this.valid = false;
        return;
    }
    if (this.myForm.invalid) {
      if (toast) {
        toast.setAttribute('color', 'danger');
        toast.setAttribute('message', "Please fix the errors.");
      }
      this.valid = false;
      return;
    }

    let member : GymMember = {
      id: this.memberId,
      fullName: this.fullName,
      dob : this.dob,
      gender : this.gender,
      membership : this.membership,
      startDay : this.startDay,
      contactNumber : this.contactNumber,
      email : this.email,
      address : this.address,
      emergencyNumber : this.emergencyNumber,
      medicalCondition : this.medicalCondition,
      isTrial : this.isTrial
    }

    // Add Gym member to local storage
    await this.storage.set(this.memberId.toString(), member);
    if (toast) {
      toast.setAttribute('color', 'success');
      toast.setAttribute('message', 'New member added successfully');
    }

    // Reset form
    this.myForm.reset();
    // Automatically update member ID field
    this.memberId = await this.storage.length() + 1;
    // Clear form validation
    this.valid = true;
  }
}
