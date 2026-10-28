import type { Pet } from '../model/Pet';
import type { RegistroTriagem } from '../model/RegistroTriagem';

export function orientarSobrePet(
  pergunta: string,
  pet: Pet,
  triagens: RegistroTriagem[],
): string {
  const texto = pergunta.trim().toLocaleLowerCase('pt-BR');
  const ultima = triagens
    .filter((registro) => registro.petId === pet.id)
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm))[0];
  const idade = pet.idade == null ? 'não informada' : `${pet.idade} anos`;
  const peso = pet.peso == null ? 'não informado' : `${pet.peso} kg`;

  if (/triagem|sintoma|risco|hist[oó]rico|resultado/.test(texto)) {
    if (!ultima) {
      return [
        `Ainda não há triagens registradas para ${pet.nome} neste aparelho.`,
        'Você pode realizar uma avaliação na tela Triagem de Risco.',
      ].join(' ');
    }
    return [
      `A última triagem de ${pet.nome}, em ${new Date(ultima.criadoEm).toLocaleDateString('pt-BR')},`,
      `apontou risco ${ultima.resultado.nivel}.`,
      ultima.resultado.mensagem,
    ].join(' ');
  }
  if (/peso|alimenta|ra[cç][aã]o|comida|dieta/.test(texto)) {
    return [
      `${pet.nome} é da espécie ${pet.especie}, tem idade ${idade} e peso ${peso}.`,
      'Uma orientação alimentar específica exige avaliação veterinária,',
      'especialmente se houver mudanças de apetite ou peso.',
    ].join(' ');
  }
  if (/vacina|verm[ií]fugo|consulta|retorno|preventiv/.test(texto)) {
    return [
      `Para ${pet.nome}, mantenha as consultas e a vacinação acompanhadas por um veterinário.`,
      'O Clyvo não possui datas de vacinas cadastradas para confirmar o calendário individual.',
    ].join(' ');
  }
  if (/tutor|respons[aá]vel|contato/.test(texto)) {
    return [
      `O responsável registrado para ${pet.nome} é ${pet.responsavelNome}.`,
      'Consulte a tela Tutores para os dados completos de contato.',
    ].join(' ');
  }
  return [
    `${pet.nome}: espécie ${pet.especie}, idade ${idade}, peso ${peso}, tutor ${pet.responsavelNome}.`,
    'Pergunte sobre peso e alimentação, vacinas, tutor ou triagem',
    'para consultar as informações disponíveis.',
  ].join(' ');
}
