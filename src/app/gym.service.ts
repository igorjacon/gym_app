// Service for managing gym members
import {Injectable} from "@angular/core";

const gender = ["Male", "Female", "Unspecified"]
const membershipType = ["Basic", "Premium", "Corporate", "Student", "Day Pass"]
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
  medicalCondition : string;
}

@Injectable()
export class GymService {
  private members : GymMember[] = [];

  public addMember(member : GymMember): void {
    this.members.push(member);
  }
  public getMembers = (): GymMember[] => {
    return this.members;
  }
  getMember = (id : number): GymMember|null => {
    for (let memberKey in this.members) {
      if (this.members[memberKey].id == id) {
        return this.members[memberKey];
      }
    }
    // return null if no member is found
    return null;
  }
  public deleteMember = (id : number): void => {
    for (let memberKey in this.members) {
      if (this.members[memberKey].id == id) {
        this.members.splice(parseInt(memberKey), 1)
      }
    }
  }
}
