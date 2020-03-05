import { Component, OnInit } from '@angular/core';
import { TableService } from './table/table.service';
import { VitalParameters } from './models/vital-parameters.model';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /*headerTitles = [
        "Tijd",
        "Ademhalingsfrequentie", 
        "Hartfrequentie", 
        "Hartritme", 
        "Ademhaling", 
        "Saturatie", 
        "Bloeddruk Systolisch", 
        "Bloeddruk Diatolisch", 
        "Temperatuur", 
        "Glucose", 
        "Opmerkingen", 
        "Pupillen", 
        "GCS ogen", 
        "GCS motorisch", 
        "GCS verbaal", 
        "Glasgow Comaschaal", 
        "RTS", 
        "cRTS", 
        "Bewustzijn", 
        "Pijn"];*/

  constructor(private _tableService: TableService) {
  }

  /*headerTitles = [
    "Tijd",
    "AF",
    "HF",
    "HR",
    "AH",
    "Sat",
    "BPS",
    "BPD",
    "TEMP",
    "GLUC",
    "Opm.",
    "Pup.",
    "GCSe",
    "GCSm",
    "GSCv",
    "GCS",
    "RTS",
    "cRTS",
    "AVPU",
    "Pijn",
    "Gebruiker"];

  rows = [
    { id: 1, tijd: "14:45", af: 20, hf: 40, hr: "Regelmatig", ah: "Diep", sat: 75, bps: 50, bpd: 50, temp: 40, gluc: 70, opm: "", pup: "Lichtpositief", gcse: "geen reactie", gcsm: "geen reactie", gscv: "geen reactie", gcs: "", rts: "", crts: "", avpu: "alert", pijn: "ja", gebruiker: "Merka" },
    { id: 2, tijd: "15:00", af: 5, hf: 45, hr: "Onregelmatig", ah: "Diep", sat: 75, bps: 55, bpd: 30, temp: 40, gluc: 60, opm: "", pup: "Lichtpositief", gcse: "geen reactie", gcsm: "geen reactie", gscv: "geen reactie", gcs: "", rts: "", crts: "", avpu: "alert", pijn: "nee", gebruiker: "Agit" },
    { id: 3, tijd: "15:15", af: 5, hf: 45, hr: "Onregelmatig", ah: "Diep", sat: 75, bps: 55, bpd: 30, temp: 40, gluc: 60, opm: "", pup: "Lichtpositief", gcse: "geen reactie", gcsm: "geen reactie", gscv: "geen reactie", gcs: "", rts: "", crts: "", avpu: "alert", pijn: "nee", gebruiker: "Arne" },
    { id: 4, tijd: "15:30", af: 5, hf: 45, hr: "Regelmatig", ah: "Diep", sat: 75, bps: 55, bpd: 30, temp: 40, gluc: 60, opm: "", pup: "Lichtpositief", gcse: "geen reactie", gcsm: "geen reactie", gscv: "geen reactie", gcs: "", rts: "", crts: "", avpu: "alert", pijn: "nee", gebruiker: "Dries" },
  ]*/

  title = 'Vital signs';
  mobile: boolean;

  ngOnInit(): void {
    if (window.screen.width <= 480) {
      this.mobile = true;
    }
  }
}