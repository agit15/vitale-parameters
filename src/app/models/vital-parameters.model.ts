export class VitalParameters {
    constructor(
        public id: number, 
        public tijd: Date, 
        public af: number, 
        public hf: number, 
        public hr: string,
        public ah: string,
        public sat: number,
        public bps: number,
        public bpd: number,
        public temp: number,
        public gluc: number,
        public opm: string,
        public gebruiker: string) {
    }
}
