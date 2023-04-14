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

  async ionViewWillEnter() {
    this.param = this.route.snapshot.params['id'];
    this.memberObj = await this.storage.get(this.param);
  }

  // Apply validation for form fields validations
    public myForm = new FormGroup({
      fullName: new FormControl(this.memberObj.fullName, [Validators.required]),
      dob: new FormControl(this.memberObj.dob, [Validators.required]),
      gender: new FormControl(this.memberObj.gender, [Validators.required]),
      membership: new FormControl(this.memberObj.membership, [Validators.required]),
      startDate: new FormControl(this.memberObj.startDay, [Validators.required]),
      contact: new FormControl(this.memberObj.contactNumber, [Validators.required]),
      email: new FormControl(this.memberObj.email, [Validators.required, Validators.email]),
      address: new FormControl(this.memberObj.address, [Validators.required]),
      emergencyNumber: new FormControl(this.memberObj.emergencyNumber, [Validators.required]),
      medicalCondition: new FormControl(this.memberObj.medicalCondition, []),
      isTrial: new FormControl(this.memberObj.isTrial, []),
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

    await this.storage.set(this.param, this.memberObj);
    // Add Gym member to local storage
    if (toast) {
      toast.setAttribute('color', 'success');
    }
    // Clear form validation
    this.valid = true;
  }
}
