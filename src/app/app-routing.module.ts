import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {UserListComponent} from './components/admin/user-list/user-list.component';
import {UnathorizedComponent} from './components/error/unathorized/unathorized.component';
import {NotFoundComponent} from './components/error/not-found/not-found.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './models/role';
import {OrigineComponent} from './components/admin/origine/origine.component';
import {MotifComponent} from './components/admin/motif/motif.component';
import {CaracteristiqueComponent} from './components/admin/caracteristique/caracteristique.component';
import {FavorisComponent} from './components/admin/favoris/favoris.component';
import {ImageComponent} from './components/admin/image/image.component';
import {TapisComponent} from './components/admin/tapis/tapis.component';
import {AddtapisComponent} from './components/admin/tapis/addtapis/addtapis.component';


const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },

  {path: 'utilisateurs',
  component: UserListComponent,
 canActivate: [AuthGuard],
 data: {roles: [Role.ADMIN]}
  },

   {path: 'origines',
  component: OrigineComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
  },



  {path: 'motifs',
  component: MotifComponent,
  canActivate: [AuthGuard],
 data: {roles: [Role.ADMIN]}
 },

  {path: 'caracteristiques',
    component: CaracteristiqueComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },

  {path: 'favoris',
    component: FavorisComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },


  { path: "images", component: AddtapisComponent,
   canActivate: [AuthGuard],
 data: {roles: [Role.ADMIN]}
 },
  {
    path: "addtapis",
    children: [
      { path: "", component: AddtapisComponent },
      { path: "edit/:id", component: AddtapisComponent }
    ],
     canActivate: [AuthGuard],
 data: {roles: [Role.ADMIN]}
  },
  { path: "tapis", component: TapisComponent,
   canActivate: [AuthGuard],
   data: {roles: [Role.ADMIN]}
  },

  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnathorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
constructor(private router: Router) {
  this.router.errorHandler = (error: any) => {
    this.router.navigate(['/404']);
  }
}
}
