import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {GymMember, GymService} from "../gym.service";
import {Storage} from "@ionic/storage-angular";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule, RouterLink],
})
export class Tab3Page {
  public data : GymMember[] = [];
  public results = [...this.data];
  constructor(private gymService : GymService, private storage: Storage) {}

  ionViewWillEnter() {
    this.data = this.gymService.getMembers();
    this.results = this.gymService.getMembers();
  }
  searchMembers(event : any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter(d => d.fullName.toLowerCase().indexOf(query) > -1);
  }
}
