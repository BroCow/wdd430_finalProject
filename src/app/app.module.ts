import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ClassesComponent } from './classes/classes.component';
import { ClassListComponent } from './classes/class-list/class-list.component';
import { ClassItemComponent } from './classes/class-list/class-item/class-item.component';
import { ClassEditComponent } from './classes/class-edit/class-edit.component';
import { ClassDetailComponent } from './classes/class-detail/class-detail.component';
import { StudentsComponent } from './students/students.component';
import { HeaderComponent } from './header.component';
import { ResultsComponent } from './results/results.component';
import { EditResultComponent } from './results/edit-result/edit-result.component';
import { DeleteResultComponent } from './results/delete-result/delete-result.component';
import { AddResultComponent } from './results/add-result/add-result.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassesComponent,
    ClassListComponent,
    ClassItemComponent,
    ClassEditComponent,
    ClassDetailComponent,
    StudentsComponent,
    HeaderComponent,
    ResultsComponent,
    EditResultComponent,
    DeleteResultComponent,
    AddResultComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
