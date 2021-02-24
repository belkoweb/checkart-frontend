import {Role} from './role';
export class User {
  id: number;
  nom: string="";
  prenom: string="";
  email:string;
  password: string="";
  adresse:  string;
  tel: string="";
  role: Role;
  sexe: string;
  token: string="";


}
