import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../services/admin.service';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Tapis} from '../../../models/tapis';
import {Origine} from '../../../models/origine';
import {Motif} from '../../../models/motif';
import {tap} from 'rxjs/operators';
import {HttpEventType, HttpResponse} from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'tapis',
  templateUrl: './tapis.component.html',
  styleUrls: ['./tapis.component.css']
})
export class TapisComponent implements OnInit {
  tapisList: Array<Tapis>;
  dataSource: MatTableDataSource<Tapis> = new MatTableDataSource();
  displayedColumns: string[] = ['numero', 'nom', 'couleur','taille', 'action'];
  selectedTapis: Tapis = new Tapis();
  errorMessage: string;
  infoMessage: string;
  origineList: Origine[];
  motifList: Motif[];
  selectedOrigines = [];
  selectedMotifs = [];
  selectedFile;

  tapis: Tapis = new Tapis();
  isValid: boolean = true;
  selectedFiles: FileList;
  currentFileUpload: File;
  loaded = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllTapis();
    this.adminService.findAllOrigines().subscribe(res => (this.origineList = res as Origine[]));
    this.adminService.findAllMotifs().subscribe(res => (this.motifList = res as Motif[]));
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  findAllTapis(){
    this.adminService.findAllTapis().subscribe(data => {
      this.tapisList = data;
      this.dataSource.data = data;
    });
  }

  createNewTapisRequest(){
    this.selectedTapis = new Tapis();
    $('#tapisModal').modal('show');
  }

  saveTapis(){
    if(!this.selectedTapis.id){
      this.createTapis();
    }else{
      this.editTapis();
    }
  }

  createTapis(){
    this.adminService.createTapis(this.selectedTapis).subscribe(data => {
      console.log("***************Create Client*****************");
      console.log(this.selectedTapis);
      this.tapisList.push(data);
      this.dataSource = new MatTableDataSource(this.tapisList);
      this.infoMessage = "Traitement effectué avec succès";
      $('#tapisModal').modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }

  editTapisRequest(Tapis: Tapis) {
    this.selectedTapis = Tapis;
    $("#tapisModal").modal('show');
  }

  editTapis(){

    this.selectedOrigines.forEach(val=>{
      let  tapisOrigine ={
        tapis: this.tapis,
        origine: val
      }
      this.adminService.tapisOrigines.push(tapisOrigine)

    })

    this.selectedMotifs.forEach(val=>{

      let  tapisMotif ={
        tapis: this.tapis,
        motif: val
      }
      this.adminService.tapisMotifs.push(tapisMotif);

    })
    this.upload();
    this.adminService.createTapis(this.selectedTapis).subscribe(data => {
      let itemIndex = this.tapisList.findIndex(item => item.id == this.selectedTapis.id);
      this.tapisList[itemIndex] = this.selectedTapis;
      this.dataSource = new MatTableDataSource(this.tapisList);
      this.infoMessage = "Mission is completed.";
      $("#tapisModal").modal('hide');
    },err => {
      if(err.status === 409){
        this.errorMessage = "login doit être unique.";
      }else{
        this.errorMessage = "Erreur inattendue.";
      }
    });
  }

  deleteTapisRequest(Tapis: Tapis) {
    this.selectedTapis = Tapis;
    $("#deleteModal").modal('show');
  }

  deleteTapis(){
    this.adminService.deleteTapis(this.selectedTapis).subscribe(data => {
      let itemIndex = this.tapisList.findIndex(item => item.id == this.selectedTapis.id);
      if(itemIndex !== -1){
        this.tapisList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.tapisList);
      this.infoMessage = "Traitement effectué avec succès.";
      $("#deleteModal").modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  // Uploads the file to backend server.
  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.adminService.uploadSingleFile(this.currentFileUpload)
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
