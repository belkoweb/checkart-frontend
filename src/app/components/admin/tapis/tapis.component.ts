import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../services/admin.service';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Tapis} from '../../../models/tapis';
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


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllTapis();
  }

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
    this.adminService.updateTapis(this.selectedTapis).subscribe(data => {
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

}
