export interface TokenPayload {
    typ: string;
    alg: string;
    roles: string[];
    username: string;
    nom: string;
    prenom: string;
    id: number;
}
