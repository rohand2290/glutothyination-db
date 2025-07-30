// 2019 data format
export interface PaperEntry2019 {
  "Accession Number": string;
  "First cysteine index": string;
  "Peptide sequence": string;
  "Peptide start index": string;
  "Peptide stop index": string;
  "Protein name": string;
}

// 2020 data format
export interface PaperEntry2020 {
  "Accession #": string;
  "Gene ": string;
  "Peptide": string;
  "Protein Name": string;
}

// 2021 data format
export interface PaperEntry2021 {
  "Accession #": string;
  "Gene ": string;
  "Peptide": string;
  "Protein Name": string;
}

// 2023 data format
export interface PaperEntry2023 {
  "Accession Number": string;
  "End Position": number;
  "First cysteine index": number;
  "Peptide": string;
  "Protein Name": string;
  "Start Position": number;
} 


