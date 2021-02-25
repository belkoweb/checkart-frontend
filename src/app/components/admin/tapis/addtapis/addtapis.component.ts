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
import {tap} from 'rxjs/operators';
import {HttpEventType, HttpResponse} from '@angular/common/http';

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
  errorMessage:string;

  tapis: Tapis = new Tapis();
  isValid: boolean = true;
  selectedFiles: FileList;
  currentFileUpload: File;
  loaded = 0;
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
      this.upload();
     console.log(this.tapis);
    this.service.createTapis(this.tapis).subscribe(data=>{
               console.log(data);
      this.router.navigate(['/tapis']);

    }, error => {
      console.log(error);
    });

    } else {
      this.toastr.warning("Erreur inattendue.", "Corriger !");
    }

  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  // Uploads the file to backend server.
  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.service.uploadSingleFile(this.currentFileUpload)
      .pipe(tap(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.loaded = Math.round(100 * event.loaded / event.total);
        }
      })).subscribe(event => {
      if (event instanceof HttpResponse) {
        console.log('hello');
      }
    });
  }
}
