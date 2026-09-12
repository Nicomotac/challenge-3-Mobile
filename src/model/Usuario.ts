export interface Usuario {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
  nome: string;
  email: string;
}

export interface Credenciais {
  username: string;
  password: string;
}

export interface CadastroUsuario {
  nome: string;
  email: string;
  username: string;
  password: string;
}
