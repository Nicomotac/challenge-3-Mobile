export interface SintomasTriagem {
  vomito: boolean;
  diarreia: boolean;
  apatia: boolean;
  dificuldadeRespirar: boolean;
  observacoes: string;
}

export interface ResultadoTriagem {
  nivel: 'BAIXO' | 'MÉDIO' | 'ALTO' | 'EMERGÊNCIA';
  mensagem: string;
}
