import {TapisMotif} from './tapis-motif';
import {TapisOrigine} from './tapis-origine';


export class Tapis {
  id: number;
  nom: string;
  couleur:string;
  desc:string;
  tapis_motifs:TapisMotif[];
  tapis_origines:TapisOrigine[];
  taille: string;
  image:string;
}
