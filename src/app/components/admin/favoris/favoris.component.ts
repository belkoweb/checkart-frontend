import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AdminService} from '../../../services/admin.service';
import {Favoris} from '../../../models/favoris';
declare var $: any;

@Component({
  selector: 'favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  favorisList: Array<Favoris>;
  dataSource: MatTableDataSource<Favoris> = new MatTableDataSource();
  displayedColumns: string[] = ['numero', 'nom', 'tapis','desc', 'action'];
  selectedFavoris: Favoris = new Favoris();
  errorMessage: string;
  infoMessage: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllFavoris();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  findAllFavoris(){
    this.adminService.findAllFavoris().subscribe(data => {
      this.favorisList = data;
      this.dataSource.data = data;
    });
  }

  createNewFavorisRequest(){
    this.selectedFavoris = new Favoris();
    $('#favorisModal').modal('show');
  }

  saveFavoris(){
    if(!this.selectedFavoris.id){
      this.createFavoris();
    }else{
      this.editFavoris();
    }
  }

  createFavoris(){
    this.adminService.createFavoris(this.selectedFavoris).subscribe(data => {
      console.log("***************Create Client*****************");
      console.log(this.selectedFavoris);
      this.favorisList.push(data);
      this.dataSource = new MatTableDataSource(this.favorisList);
      this.infoMessage = "Traitement effectué avec succès";
      $('#favorisModal').modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }

  editFavorisRequest(Favoris: Favoris) {
    this.selectedFavoris = Favoris;
    $("#favorisModal").modal('show');
  }

  editFavoris(){
    this.adminService.updateFavoris(this.selectedFavoris).subscribe(data => {
      let itemIndex = this.favorisList.findIndex(item => item.id == this.selectedFavoris.id);
      this.favorisList[itemIndex] = this.selectedFavoris;
      this.dataSource = new MatTableDataSource(this.favorisList);
      this.infoMessage = "Mission is completed.";
      $("#favorisModal").modal('hide');
    },err => {
      if(err.status === 409){
        this.errorMessage = "login doit être unique.";
      }else{
        this.errorMessage = "Erreur inattendue.";
      }
    });
  }

  deleteFavorisRequest(Favoris: Favoris) {
    this.selectedFavoris = Favoris;
    $("#deleteModal").modal('show');
  }

  deleteFavoris(){
    this.adminService.deleteFavoris(this.selectedFavoris).subscribe(data => {
      let itemIndex = this.favorisList.findIndex(item => item.id == this.selectedFavoris.id);
      if(itemIndex !== -1){
        this.favorisList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.favorisList);
      this.infoMessage = "Traitement effectué avec succès.";
      $("#deleteModal").modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }


}
