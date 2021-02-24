import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user';
import {AdminService} from '../../../../services/admin.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Motif} from '../../../../models/motif';
import {Origine} from '../../../../models/origine';
import {Tapis} from '../../../../models/tapis';
import {TapisOrigine} from '../../../../models/tapis-origine';
import {TapisMotif} from '../../../../models/tapis-motif';

@Component({
  selector: 'addtapis',
  templateUrl: './addtapis.component.html',
  styleUrls: ['./addtapis.component.css']
})
export class AddtapisComponent implements OnInit {
  origineList: Origine[];
  motifList: Motif[];
  selectedOrigines = [];
  selectedMotifs = [];
 selectedFile;
  tapis: Tapis = new Tapis();
  isValid: boolean = true;

  constructor(
    private service: AdminService,
    private dialog: MatDialog,

    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.service.findAllOrigines().subscribe(res => (this.origineList = res as Origine[]));
    this.service.findAllMotifs().subscribe(res => (this.motifList = res as Motif[]));
  }

  resetForm(form?: NgForm) {
    if ((form = null)) form.resetForm();


  }


  handleImages(Event){
    this.selectedFile = Event.target.files[0];
    let formData = new FormData();
    formData.append("file", this.selectedFile);
    console.log(this.selectedFile);
    //this.http.post('http://localhost:8080/upload',formData)
  }

  validateForm() {
    this.isValid = true;
   /*if (this.service.formData.client.id == 0) this.isValid = false;
  //  else if (this.service.orderItems.length == 0) this.isValid = false;*/
    return this.isValid;
  }



  createTapis(){
    if (this.validateForm()){

          this.selectedOrigines.forEach(val=>{
            let  tapisOrigine ={
                 tapis: this.tapis,
                 origine: val
            }
            this.service.tapisOrigines.push(tapisOrigine)

})

      this.selectedMotifs.forEach(val=>{

        let  tapisMotif ={
          tapis: this.tapis,
          motif: val
        }
        this.service.tapisMotifs.push(tapisMotif);

      })

     console.log(this.tapis);
    this.service.createTapis(this.tapis).subscribe(data=>{
               console.log(data);
    }, error => {
      console.log(error);
    });

    } else {
      this.toastr.warning("Erreur inattendue.", "Corriger !");
    }

  }



}
