import type { ResultadoTriagem, SintomasTriagem } from './Triagem';

export type RegistroTriagem = {
  id: string;
  petId: number;
  petNome: string;
  usuario: string;
  criadoEm: string;
  sintomas: SintomasTriagem;
  resultado: ResultadoTriagem;
};

export type NovoRegistroTriagem = Omit<RegistroTriagem, 'id' | 'criadoEm'>;
