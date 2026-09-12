export interface Pet {
  id: number;
  nome: string;
  idade: number | null;
  especie: string;
  raca: string | null;
  sexo: string;
  dataNascimento: string | null;
  peso: number | null;
  responsavelId: number;
  responsavelNome: string;
}

export interface PetPayload {
  nome: string;
  idade: number | null;
  especie: string;
  raca: string | null;
  sexo: string;
  dataNascimento: string | null;
  peso: number | null;
  responsavelId: number;
}
