export interface Tutor {
  id: number;
  nome: string;
  cpf: string | null;
  dataNascimento: string | null;
  email: string;
  celular: string;
}

export interface TutorPayload {
  nome: string;
  cpf: string | null;
  dataNascimento: string | null;
  email: string;
  celular: string;
}
