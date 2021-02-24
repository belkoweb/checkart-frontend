import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AdminService} from '../../../services/admin.service';
declare var $: any;

@Component({
  selector: 'images',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  userList: Array<User>;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['numero', 'desc', 'uri','nom', 'action'];
  selectedUser: User = new User();
  errorMessage: string;
  infoMessage: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllUsers();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  findAllUsers(){
    this.adminService.findAllUsers().subscribe(data => {
      this.userList = data;
      this.dataSource.data = data;
    });
  }

  createNewUserRequest(){
    this.selectedUser = new User();
    $('#userModal').modal('show');
  }

  saveUser(){
    if(!this.selectedUser.id){
      this.createUser();
    }else{
      this.editUser();
    }
  }

  createUser(){
    this.adminService.createUser(this.selectedUser).subscribe(data => {
      console.log("***************Create Client*****************");
      console.log(this.selectedUser);
      this.userList.push(data);
      this.dataSource = new MatTableDataSource(this.userList);
      this.infoMessage = "Traitement effectué avec succès";
      $('#userModal').modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }

  editUserRequest(user: User) {
    this.selectedUser = user;
    $("#userModal").modal('show');
  }

  editUser(){
    this.adminService.updateUser(this.selectedUser).subscribe(data => {
      let itemIndex = this.userList.findIndex(item => item.id == this.selectedUser.id);
      this.userList[itemIndex] = this.selectedUser;
      this.dataSource = new MatTableDataSource(this.userList);
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

  deleteUserRequest(user: User) {
    this.selectedUser = user;
    $("#deleteModal").modal('show');
  }

  deleteUser(){
    this.adminService.deleteUser(this.selectedUser).subscribe(data => {
      let itemIndex = this.userList.findIndex(item => item.id == this.selectedUser.id);
      if(itemIndex !== -1){
        this.userList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.userList);
      this.infoMessage = "Traitement effectué avec succès.";
      $("#deleteModal").modal('hide');
    },err => {
      this.errorMessage = "Erreur inattendue.";
    });
  }



}
