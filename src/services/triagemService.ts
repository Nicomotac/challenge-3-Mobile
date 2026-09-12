import { ResultadoTriagem, SintomasTriagem } from '../model/Triagem';

export function analisarTriagem(sintomas: SintomasTriagem): ResultadoTriagem {
  if (sintomas.dificuldadeRespirar) {
    return { nivel: 'EMERGÊNCIA', mensagem: 'Procure atendimento veterinário imediatamente.' };
  }
  if ((sintomas.vomito && sintomas.apatia) || (sintomas.diarreia && sintomas.apatia)) {
    return { nivel: 'ALTO', mensagem: 'Recomenda-se contato com a clínica ainda hoje.' };
  }
  if (sintomas.vomito || sintomas.diarreia || sintomas.apatia) {
    return { nivel: 'MÉDIO', mensagem: 'Observe o pet e procure atendimento se os sintomas persistirem.' };
  }
  return { nivel: 'BAIXO', mensagem: 'Sem sinais de maior risco na triagem informada.' };
}
