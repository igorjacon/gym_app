import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {GymMember, GymService} from "../gym.service";
import {Storage} from "@ionic/storage-angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class Tab4Page {
  trialMembers : GymMember[] = [];
  constructor(private gymService : GymService, private storage: Storage) {}

  async ionViewWillEnter() {
    let members : GymMember[] = [];
    await this.storage.forEach((member) => {
      if (member.isTrial) {
        members.push(member);
      }
    });
    this.trialMembers = members;
  }
}
