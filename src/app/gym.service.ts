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

  addMember(key: string, value: GymMember) {
    this._storage?.set(key, value);
  }

  getMember(key : string) {
    return this._storage?.get(key);
  }
  deleteMember(id : string) {
    this.storage.remove(id.toString());
  }

  getMembers() {
    let members : GymMember[] = [];
    this.storage.forEach((member) => {
      members.push(member);
    });
    return members;
  }

}
