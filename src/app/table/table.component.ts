import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TableService } from './table.service';
import { VitalParameters } from '../models/vital-parameters.model';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from './toast-service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageEvent } from '@angular/material/paginator';

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
  selectedValue: any;
  idAdd: number;
  sortedData: VitalParameters[];
  constoptions: any;
  closeResult: string;
  deleteParam: any;
  addParam = new VitalParameters(null, null, null, null, null, null, null, null, null, null, null, null, null);
  dataSource = new MatTableDataSource(this.sortedData);
  public keypressed;
  page = 1;
  pageSize = 12;
  mobile: any;
  innerWidth: any;
  openFilter: any;
  clicked = false;
  weergevenValue = "gebruiker";
  gebruiker = "Agit";
  searchText: any;

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

  bps = [
    null,
    110,
    115,
    120,
    145,
  ]

  bpd = [
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

  constructor(private _tableService: TableService, public toastService: ToastService, private modalService: NgbModal) {
    this.tableData = this._tableService.getData();
    this.headerTitles = this._tableService.getHeaderTitles();
    this.sortedData = this.tableData.slice();
  }

  verwijderen() {
    this._tableService.deleteVitalParameter(this.selectedValue);
    this.tableData = this._tableService.getData();
    this.sortedData = this.tableData.slice();
    this.toastService.show('Verwijderd!', { classname: 'bg-danger text-light', delay: 5000 });
    this.constoptions = { positionClass: 'toast-custom' };
    this.deleteParam = null;
    this.editRowID = null;
    this.clicked = false;
  }

  add() {
    let now = new Date();
    this.idAdd = this.tableData[this.tableData.length - 1].id + 1;
    let vitalParameters = new VitalParameters(this.idAdd, now, null, null, null, null, null, null, null, null, null, null, null);
    this._tableService.addVitalParameter(vitalParameters);
    this.tableData = this._tableService.getData();
    this.sortedData = this.tableData.slice();
    this.edit(this.idAdd);
  }

  hfSelected(waarde, param) {
    this.selectedValue[param] = waarde;
  }

  add2() {
    let now = new Date();
    this.idAdd = this.tableData[this.tableData.length - 1].id + 1;
    this.addParam.id = this.idAdd;
    this.addParam.tijd = now;
    this.addParam.gebruiker = "Agit";
    this._tableService.addVitalParameter(this.addParam);
    this.tableData = this._tableService.getData();
    this.sortedData = this.tableData.slice();
    this.addParam = new VitalParameters(null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.toastService.show('Toegevoegd!', { classname: 'bg-success text-light', delay: 5000 });
  }

  toast() {
    this.toastService.show('Opgeslagen!', { classname: 'bg-success text-light', delay: 2000 });
  }

  edit(data) {
    if (data.gebruiker == this.gebruiker) {
      this.editRowID = data.id;
      this.selectedValue = data;
    }

  }

  onSelect(data): void {
    this.selectedValue = data;
    console.log(this.selectedValue)
    this.clicked = true;
  }

  weergeven(headerTitle) {
    console.log(headerTitle.toLowerCase());
    //this.selectedValue[headerTitle.toLowerCase()];
    this.weergevenValue = headerTitle.toLowerCase();
    
  }

  update() {
    this.editRowID = null;
    this.toast();
    this.clicked = false;
  }

  toggleFilter() {
    if (this.openFilter == true) {
      this.openFilter = false;
    } else {
      this.openFilter = true;
    }
  }

  sortData(sort: Sort) {
    console.log(sort.active);
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = true;
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
        case 'Opm.': return compare(a.opm, b.opm, isAsc);
        case 'Gebruiker': return compare(a.gebruiker, b.gebruiker, isAsc);
        default: return 0;
      }
    });
  }

  open(content) {
    console.log(this.editRowID);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.addParam = new VitalParameters(null, null, null, null, null, null, null, null, null, null, null, null, null);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (innerWidth <= 425) { // 768px portrait
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  ngOnInit() {
    if (innerWidth <= 425) { // 768px portrait
      this.mobile = true;
    }
  }

  terug() {
    this.clicked = false;
    this.selectedValue = null;
  }

  // MatPaginator Inputs
  length = 100;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}