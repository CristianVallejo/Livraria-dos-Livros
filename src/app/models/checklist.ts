export interface Checklist {
  id?: number;
  nome: string;
  idUsuario: number;
  dataCriacao?: Date;
  itens?: ChecklistItem[];
}

export interface ChecklistItem {
  id?: number;
  idChecklist: number | null;
  descricao: string;
}

