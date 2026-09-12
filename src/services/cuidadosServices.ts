import { Pet } from '../model/Pet';

export function recomendacaoDeCuidados(pet: Pet): string {
  if ((pet.idade ?? 0) >= 8) {
    return `${pet.nome} está em uma faixa de idade que merece acompanhamento periódico e atenção a mudanças de peso e comportamento.`;
  }
  return `Mantenha vacinas, consultas e peso de ${pet.nome} atualizados e siga as orientações do veterinário responsável.`;
}
