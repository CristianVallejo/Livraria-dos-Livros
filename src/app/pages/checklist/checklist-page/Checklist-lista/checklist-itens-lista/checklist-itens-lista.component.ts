import { Component, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Checklist, ChecklistItem } from '../../../../../models/checklist';

@Component({
  selector: 'app-checklist-itens-lista',
  standalone: false,
  templateUrl: './checklist-itens-lista.component.html',
  styleUrl: './checklist-itens-lista.component.scss',
})
export class ChecklistItensComponent implements OnInit {
  @Input() checklist!: Checklist;
  form!: FormGroup;
  itens: ChecklistItem[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.carregarItens(this.checklist);
  }

  carregarItens(checklist: Checklist) {
    this.itens = checklist.itens || [];
  }
}
