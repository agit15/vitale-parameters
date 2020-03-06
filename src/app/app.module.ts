import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TableComponent } from './table/table.component';
import { TableService } from './table/table.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './table/toast-container.component';
import { ToastService } from './table/toast-service';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ToastsContainer
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSortModule,
    ReactiveFormsModule,
    NgbModule,
    MatSelectModule
  ],
  providers: [TableService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
