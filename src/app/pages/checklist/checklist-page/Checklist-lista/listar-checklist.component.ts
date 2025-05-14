import { Component, OnInit } from '@angular/core';
import { Checklist } from '../../../../models/checklist';
import { ChecklistService } from '../../../../Servicos/checklist.service';
import { HttpErrorResponse } from '@angular/common/http';  // Importando para tratar o erro

@Component({
  selector: 'app-listar-checklist',
  standalone: false,
  templateUrl: './listar-checklist.component.html',
  styleUrls: ['./listar-checklist.component.scss']
})
export class ListarChecklistComponent implements OnInit {
  mensagem: string = '';
  checklists: Checklist[] | null = null;

  constructor(private checklistService: ChecklistService) { }

  ngOnInit(): void {
    this.carregarChecklists();
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
}
