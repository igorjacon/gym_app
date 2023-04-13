import {Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {RouterLink} from "@angular/router";
import {GymMember, GymService} from "../gym.service";
import {CommonModule} from "@angular/common";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  providers: [GymService],
  imports: [IonicModule, ExploreContainerComponent, RouterLink, CommonModule]
})

// List members
export class Tab2Page {
  members : GymMember[] = [];
  constructor(private gymService : GymService, private storage: Storage) {}
  async ionViewDidEnter() {
    this.members = [];
    // await this.storage.clear();
    await this.storage.forEach((member) => {
      this.members.push(member);
    });
  }
}
