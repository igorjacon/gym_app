import {Component} from '@angular/core';
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

  ionViewWillEnter() {
    this.members = this.gymService.getMembers();
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      this.members = this.gymService.getMembers();
      event.target.complete();
    }, 2000);
  };
}
