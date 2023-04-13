// Service for managing gym members
import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage-angular';

export const genders = ["Male", "Female", "Unspecified"]
export const membershipTypes = ["Basic", "Premium", "Corporate", "Student", "Day Pass"]
export interface GymMember {
  id : number;
  fullName : string;
  dob : string;
  gender : string;
  membership : string;
  startDay : string;
  contactNumber : number;
  email : string;
  address : string;
  emergencyNumber : number;
  medicalCondition ?: string;
  isTrial : boolean;
}

@Injectable({providedIn: 'root'})
export class GymService {
  private _storage: Storage | null = null;
  // private members : GymMember[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addMember(key: string, value: GymMember) {
    await this._storage?.set(key, value);
  }

  // public addMember(member : GymMember): void {
  //   this.members.push(member)
  // }

  // public getMembers() : GymMember[] {
  //   return this.members;
  // }
  // getMember = (id : number): GymMember|null => {
  //   for (let memberKey in this.members) {
  //     if (this.members[memberKey].id == id) {
  //       return this.members[memberKey];
  //     }
  //   }
  //   // return null if no member is found
  //   return null;
  // }
  // public deleteMember = (id : number): void => {
  //   for (let memberKey in this.members) {
  //     if (this.members[memberKey].id == id) {
  //       this.members.splice(parseInt(memberKey), 1)
  //     }
  //   }
  // }
}
