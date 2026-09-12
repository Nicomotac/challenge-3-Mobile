import * as Yup from 'yup';

export const loginSchema = Yup.object({
  username: Yup.string().required('Informe o usuário.'),
  password: Yup.string().required('Informe a senha.'),
});

export const cadastroSchema = Yup.object({
  nome: Yup.string().required('Informe o nome.'),
  email: Yup.string().email('Informe um e-mail válido.').required('Informe o e-mail.'),
  username: Yup.string().required('Informe o usuário.'),
  password: Yup.string().required('Informe a senha.'),
});

export const tutorSchema = Yup.object({
  nome: Yup.string().required('Informe o nome do tutor.'),
  email: Yup.string().email('Informe um e-mail válido.').required('Informe o e-mail.'),
  celular: Yup.string().required('Informe o celular.'),
  cpf: Yup.string().nullable(),
  dataNascimento: Yup.string().nullable(),
});

export const petSchema = Yup.object({
  nome: Yup.string().required('Informe o nome do pet.'),
  especie: Yup.string().required('Informe a espécie.'),
  sexo: Yup.string().required('Informe o sexo.'),
  responsavelId: Yup.number().positive().required('Selecione um tutor.'),
  raca: Yup.string().nullable(),
  idade: Yup.number().nullable().transform((value, original) => original === '' ? null : value),
  peso: Yup.number().nullable().transform((value, original) => original === '' ? null : value),
  dataNascimento: Yup.string().nullable(),
});

export function primeiraMensagemYup(erro: unknown): string {
  if (erro instanceof Yup.ValidationError) {
    return erro.errors[0] || 'Confira os campos informados.';
  }
  return 'Confira os campos informados.';
}
