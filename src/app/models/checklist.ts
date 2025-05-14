export interface Checklist {
  id?: number;
  nome: string;
  idUsuario: number;
  dataCriacao?: Date;
  itens: ChecklistItem[];
}

export interface ChecklistItem {
  id?: number;
  idChecklist: number;
  descricao: string;
  resposta: RespostaChecklist;
}

export enum RespostaChecklist {
  Atende = 1,
  NaoAtende = 2,
  NaoSeAplica = 3
}