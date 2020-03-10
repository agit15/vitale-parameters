import { Injectable } from '@angular/core';
import { VitalParameters } from '../models/vital-parameters.model';

@Injectable()
export class TableService {

  constructor() { }
  

  getHeaderTitles(): string[] {
    let headerTitles: string[] = [
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
      "Opm",
      "Gebruiker"]

    return headerTitles;
  }

  date1: Date = new Date("March 3, 2020 10:13:00");
  date2: Date = new Date("March 3, 2020 10:45:00");
  date3: Date = new Date("March 3, 2020 11:14:00");
  date4: Date = new Date("March 3, 2020 14:55:00");

  rows = [
    { id: 1, tijd: this.date3, af: 20, hf: 40, hr: "Regelmatig", ah: "Diep", sat: 75, bps: 120, bpd: 80, temp: 37, gluc: 81, opm: "", gebruiker: "Merka" },
    { id: 2, tijd: this.date4, af: 5, hf: 45, hr: "Onregelmatig", ah: "Oppervlakkig", sat: 80, bps: 115, bpd: 85, temp: 37, gluc: 70, opm:"niet stabiel", gebruiker: "Agit" },
    { id: 3, tijd: this.date1, af: 5, hf: 45, hr: "Onregelmatig", ah: "Paradoxale", sat: 55, bps: 110, bpd: 85, temp: 38, gluc: 82, opm: "", gebruiker: "Arne" },
    { id: 4, tijd: this.date2, af: 5, hf: 45, hr: "Regelmatig", ah: "Diep", sat: 65, bps: 145, bpd: 105, temp: 37, gluc: 83, opm: "", gebruiker: "Dries" },
  ]

  getData(): VitalParameters[] {
    return this.rows;
  }

  addVitalParameter(vitalParameters: VitalParameters){
    this.rows.push(vitalParameters);
  }

  deleteVitalParameter(vitalParameters: VitalParameters){
    var index = this.rows.indexOf(vitalParameters);
    this.rows.splice(index, 1);
    console.log(vitalParameters);
  }
}
