import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TableService } from './table.service';
import { VitalParameters } from '../models/vital-parameters.model';
import { Sort } from '@angular/material/sort';
import { ToastService } from './toast-service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  tableData: any = [];
  headerTitles: string[];
  showEditTable: boolean = false;
  editRowID: any = '';
  selectedValue = null;
  idAdd: number;
  sortedData: VitalParameters[];
  constoptions;

  constructor(private _tableService: TableService, public toastService: ToastService) {
    this.tableData = this._tableService.getData();
    this.headerTitles = this._tableService.getHeaderTitles();
    this.sortedData = this.tableData.slice();
  }

  hr = [
    null,
    "Regelmatig",
    "Onregelmatig"
  ]

  af = [
    null,
    5,
    10,
    15,
    20
  ]
  
  hf = [
    null,
    0,
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45
  ]

  ah = [
    null,
    "Diep",
    "Oppervlakkig",
    "Paradoxale"
  ]

  sat = [
    null,
    55,
    65,
    75,
    80,
  ]

  bps= [
    null,
    110,
    115,
    120,
    145,
  ]

  bpd= [
    null,
    80,
    85,
    85,
    105,
  ]

  temp = [
    null,
    37,
    38,
  ]

  gluc = [
    null,
    70,
    81,
    82,
    83,
  ]

  verwijderen(data){
    this._tableService.deleteVitalParameter(data);
    this.tableData = this._tableService.getData();
    this.sortedData = this.tableData.slice();
    this.toastService.show('Verwijderd!', { classname: 'bg-success text-light', delay: 5000 });
    this.constoptions = { positionClass:'toast-custom' };
    console.log(this.tableData);
    
  }

  add(){
    let now = new Date();
    this.idAdd = this.tableData[this.tableData.length - 1].id + 1;
    let vitalParameters = new VitalParameters(this.idAdd, now, null, null, null, null, null, null, null, null, null, null, null);
    this._tableService.addVitalParameter(vitalParameters);
    this.tableData = this._tableService.getData();
    this.sortedData = this.tableData.slice();
    this.edit(this.idAdd);
  }

  edit(val){
    this.editRowID = val;
  }

  sortData(sort: Sort) {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Tijd': return compare(a.tijd, b.tijd, isAsc);
        case 'AF': return compare(a.af, b.af, isAsc);
        case 'HF': return compare(a.hf, b.hf, isAsc);
        case 'HR': return compare(a.hr, b.hr, isAsc);
        case 'AH': return compare(a.ah, b.ah, isAsc);
        case 'Sat': return compare(a.sat, b.sat, isAsc);
        case 'BPS': return compare(a.bps, b.bps, isAsc);
        case 'BPD': return compare(a.bpd, b.bpd, isAsc);
        case 'TEMP': return compare(a.temp, b.temp, isAsc);
        case 'GLUC': return compare(a.gluc, b.gluc, isAsc);
        case 'Gebruiker': return compare(a.gebruiker, b.gebruiker, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}