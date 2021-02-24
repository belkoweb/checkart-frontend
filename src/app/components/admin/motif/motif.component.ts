import {Component, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AdminService} from '../../../services/admin.service';
import {Motif} from '../../../models/motif';
declare var $: any;

// @ts-ignore
@Component({
  selector: 'motifs',
  templateUrl: './motif.component.html',
  styleUrls: ['./motif.component.css']
})
export class MotifComponent implements OnInit {

  motifList: Array<Motif>;
  dataSource: MatTableDataSource<Motif> = new MatTableDataSource();
  displayedColumns: string[] = ['numero', 'symbole', 'signification', 'action'];
  selectedMotif: Motif = new Motif();
  errorMessage: string;
  infoMessage: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllMotifs();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  findAllMotifs(){
    this.adminService.findAllMotifs().subscribe(data => {
      this.motifList = data;
      this.dataSource.data = data;
    });
  }

  createNewMotifRequest(){
    this.selectedMotif = new Motif();
    $('#motifModal').modal('show');
  }

  saveMotif(){
    if(!this.selectedMotif.id){
      this.createMotif();
    }else{
      this.editMotif();
    }
  }

  createMotif(){
    this.adminService.createMotif(this.selectedMotif).subscribe(data => {
      console.log("***************Create Client*****************");
      console.log(this.selectedMotif);
      this.motifList.push(data);
      this.dataSource = new MatTableDataSource(this.motifList);
      this.infoMessage = "Traitement effectué avec succès";
      $('#motifModal').modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }

  editMotifRequest(Motif: Motif) {
    this.selectedMotif = Motif;
    $("#motifModal").modal('show');
  }

  editMotif(){
    this.adminService.updateMotif(this.selectedMotif).subscribe(data => {
      let itemIndex = this.motifList.findIndex(item => item.id == this.selectedMotif.id);
      this.motifList[itemIndex] = this.selectedMotif;
      this.dataSource = new MatTableDataSource(this.motifList);
      this.infoMessage = "Mission is completed.";
      $("#motifModal").modal('hide');
    },err => {
      if(err.status === 409){
        this.errorMessage = "login doit être unique.";
      }else{
        this.errorMessage = "Erreur inattendue.";
      }
    });
  }

  deleteMotifRequest(Motif: Motif) {
    this.selectedMotif = Motif;
    $("#deleteModal").modal('show');
  }

  deleteMotif(){
    this.adminService.deleteMotif(this.selectedMotif).subscribe(data => {
      let itemIndex = this.motifList.findIndex(item => item.id == this.selectedMotif.id);
      if(itemIndex !== -1){
        this.motifList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.motifList);
      this.infoMessage = "Traitement effectué avec succès.";
      $("#deleteModal").modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }


}
