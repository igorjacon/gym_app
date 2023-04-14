import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Storage} from "@ionic/storage-angular";
import {GymMember, GymService} from "../gym.service";

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
  standalone: true,
  providers: [GymService],
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class ReadPage {
  param : string = "";
  memberObj : GymMember = <GymMember>{};

  public alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {}
    },
    {
      text: 'Yes',
      role: 'confirm',
      handler: () => {
        this.gymService.deleteMember(this.param);
        this.router.navigateByUrl('/tabs/tab2')
      }
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

}
