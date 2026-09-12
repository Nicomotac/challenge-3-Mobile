import { Pet } from '../model/Pet';

export function respostaIASimulada(pergunta: string, pet: Pet | null): string {
  const texto = pergunta.toLowerCase();
  const nome = pet?.nome || 'seu pet';

  if (texto.includes('vacina')) {
    return `Para ${nome}, mantenha a carteira de vacinação atualizada e confirme o calendário com o veterinário.`;
  }
  if (texto.includes('aliment') || texto.includes('ração')) {
    return `A alimentação de ${nome} deve considerar espécie, idade, peso e rotina. Mudanças importantes devem ser acompanhadas pelo veterinário.`;
  }
  if (texto.includes('consulta') || texto.includes('retorno')) {
    return `Acompanhar consultas e retornos de ${nome} ajuda a manter o cuidado contínuo e preventivo.`;
  } 
  if (texto.includes('sintoma') || texto.includes('vômit') || texto.includes('dor') || texto.includes('apat')) {
    return `Se ${nome} apresentar sintomas persistentes ou piora, procure atendimento veterinário. Esta resposta é uma simulação acadêmica.`;
  }
  return `Com base no perfil de ${nome}, o Clyvo poderá usar IA para sugerir lembretes e cuidados personalizados. Nesta Sprint a conversa é simulada.`;
}
