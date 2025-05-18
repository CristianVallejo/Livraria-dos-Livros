import { Component, Input, OnInit, OnChanges, SimpleChanges, output, Output, EventEmitter } from '@angular/core';
import { Checklist } from '../../../../models/checklist';
import { ChecklistService } from '../../../../Servicos/checklist.service';
import { HttpErrorResponse } from '@angular/common/http';  // Importando para tratar o erro

@Component({
  selector: 'app-listar-checklist',
  standalone: false,
  templateUrl: './listar-checklist.component.html',
  styleUrls: ['./listar-checklist.component.scss']
})
export class ListarChecklistComponent implements OnInit, OnChanges {
  mensagem: string = '';
  checklists: Checklist[] | null = null;

  @Input() recarregarLista: boolean | null = null;
  @Output() checklistParaEdicao = new EventEmitter<Checklist>();

  constructor(private checklistService: ChecklistService) { }

  ngOnInit(): void {
    this.carregarChecklists();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recarregarLista'] && changes['recarregarLista'].currentValue === true) {
      this.carregarChecklists();
    }
  }

  carregarChecklists() {
    this.checklistService.get().subscribe({
      next: (retorno: Checklist[]) => {
        this.checklists = retorno;
      },
      error: (err: HttpErrorResponse) => {
        this.mensagem = err.error;
      },
    });
  }

  excluirChecklist(id: number) {
    this.checklistService.delete(id).subscribe({
      next: (retorno: any) => {
        this.mensagem = `Excluído com sucesso + ${retorno}`;
        this.carregarChecklists();
      },
      error: (erro) => {
        this.mensagem = "Erro ao excluir: " + erro.message;
      }
    });
  }
  
  editarChecklist(checklist: Checklist) {
    this.checklistParaEdicao.emit(checklist);
  }
}
