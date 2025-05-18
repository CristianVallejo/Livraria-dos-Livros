import { Component, Input, OnInit } from '@angular/core';
import { ChecklistItem } from '../../../../../models/checklist';

@Component({
  selector: 'app-cadastro-editar-checklist-lista',
  standalone: false,
  templateUrl: './cadastro-editar-checklist-lista.component.html',
  styleUrl: './cadastro-editar-checklist-lista.component.scss'
})
export class CadastroEditarChecklistListaComponent implements OnInit {
  @Input() itensChecklist: ChecklistItem[] = [];



  ngOnInit(): void {

  }














}
