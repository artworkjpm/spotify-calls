import g2019 from "./Glastonbury2019.json";
import read2019 from "./read2019.json";
import primaverasoundbarcelona2019 from "./primaverasoundbarcelona2019.json";

const AllFestivals = [
  {
    SearchName: "Glastonbury 2019",
    name: g2019,
    Country: "UK",
    start: "2019-06-28 11:00",
    end: "2019-06-30 23:30",
    attendance: 175000
  },
  {
    SearchName: "Reading 2019",
    name: read2019,
    start: "2019-08-28 11:45",
    end: "2019-06-30 12:45",
    Country: "UK",
    attendance: 90000
  },
  {
    SearchName: "Primavera Sound Barcelona 2019",
    name: primaverasoundbarcelona2019,
    start: "2019-05-27 20:00",
    end: "2019-06-03 05:00",
    Country: "Spain",
    attendance: 64500
  }
];

export default AllFestivals;
