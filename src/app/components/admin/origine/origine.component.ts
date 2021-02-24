import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AdminService} from '../../../services/admin.service';
import {Origine} from '../../../models/origine';
declare var $: any;

@Component({
  selector: 'origines',
  templateUrl: './origine.component.html',
  styleUrls: ['./origine.component.css']
})
export class OrigineComponent implements OnInit {


  origineList: Array<Origine>;
  dataSource: MatTableDataSource<Origine> = new MatTableDataSource();
  displayedColumns: string[] = ['numero', 'region', 'action'];
  selectedOrigine: Origine = new Origine();
  errorMessage: string;
  infoMessage: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllOrigines();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  findAllOrigines(){
    this.adminService.findAllOrigines().subscribe(data => {
      this.origineList = data;
      this.dataSource.data = data;
    });
  }

  createNewOrigineRequest(){
    this.selectedOrigine = new Origine();
    $('#userModal').modal('show');
  }

  saveOrigine(){
    if(!this.selectedOrigine.id){
      this.createOrigine();
    }else{
      this.editOrigine();
    }
  }

  createOrigine(){
    this.adminService.createOrigine(this.selectedOrigine).subscribe(data => {
      console.log("***************Create Client*****************");
      console.log(this.selectedOrigine);
      this.origineList.push(data);
      this.dataSource = new MatTableDataSource(this.origineList);
      this.infoMessage = "Traitement effectué avec succès";
      $('#userModal').modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }

  editOrigineRequest(origine: Origine) {
    this.selectedOrigine = origine;
    $("#userModal").modal('show');
  }

  editOrigine(){
    this.adminService.updateOrigine(this.selectedOrigine).subscribe(data => {
      let itemIndex = this.origineList.findIndex(item => item.id == this.selectedOrigine.id);
      this.origineList[itemIndex] = this.selectedOrigine;
      this.dataSource = new MatTableDataSource(this.origineList);
      this.infoMessage = "Mission is completed.";
      $("#userModal").modal('hide');
    },err => {
      if(err.status === 409){
        this.errorMessage = "login doit être unique.";
      }else{
        this.errorMessage = "Erreur inattendue.";
      }
    });
  }

  deleteOrigineRequest(origine: Origine) {
    this.selectedOrigine = origine;
    $("#deleteModal").modal('show');
  }

  deleteOrigine(){
    this.adminService.deleteOrigine(this.selectedOrigine).subscribe(data => {
      let itemIndex = this.origineList.findIndex(item => item.id == this.selectedOrigine.id);
      if(itemIndex !== -1){
        this.origineList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.origineList);
      this.infoMessage = "Traitement effectué avec succès.";
      $("#deleteModal").modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }
}
