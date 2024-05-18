export interface Reservation {
    id:number
    nom_complet: string
    adresse: string
    telephone: string
    images?: Blob
    voiture: Voiture
    date_debut_reservation: string
    date_fin_reservation: string
}

export interface Voiture {
    id: number
  }
  