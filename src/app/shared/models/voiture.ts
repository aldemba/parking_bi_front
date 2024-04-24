export interface Voiture {
    nom: string
    modele: string
    categorie: string
    marque: string
    matricule: string
    parkings: Parkings
    visite: Visite
    assurance: Assurance
    image: Blob
  }
  
  export interface Parkings {
    id: number
  }
  
  export interface Visite {
    date_fin_visite: string
  }
  
  export interface Assurance {
    date_fin: string
  }
  