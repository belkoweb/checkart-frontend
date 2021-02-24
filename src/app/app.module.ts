import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { UnathorizedComponent } from './components/error/unathorized/unathorized.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import {
  MatButtonModule, MatCardModule,
  MatInputModule, MatListModule,
  MatToolbarModule, MatSelectModule,
  MatFormFieldModule, MatTableModule,
  MatPaginatorModule, MatSortModule,
  MatProgressBarModule, MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";
import { TapisComponent } from './components/admin/tapis/tapis.component';
import { OrigineComponent } from './components/admin/origine/origine.component';
import { MotifComponent } from './components/admin/motif/motif.component';
import { CaracteristiqueComponent } from './components/admin/caracteristique/caracteristique.component';
import { FavorisComponent } from './components/admin/favoris/favoris.component';
import { ImageComponent } from './components/admin/image/image.component';
import { AddtapisComponent } from './components/admin/tapis/addtapis/addtapis.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UserListComponent,
    AdminTemplateComponent,
    NotFoundComponent,
    UnathorizedComponent,
    TapisComponent,
    OrigineComponent,
    MotifComponent,
    CaracteristiqueComponent,
    FavorisComponent,
    ImageComponent,
    AddtapisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
     NgxSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

