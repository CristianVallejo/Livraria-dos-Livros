import { Component, OnInit } from '@angular/core';
import { ChecklistItem } from '../../../models/checklist';

@Component({
  selector: 'app-checklist-page',
  standalone: false,
  templateUrl: './checklist-page.component.html',
  styleUrl: './checklist-page.component.scss'
})
export class ChecklistPageComponent implements OnInit {
  ModalCadastroAberto: boolean = false
  RetornoListaItens: ChecklistItem[] = [];

  ngOnInit(): void {

  }

  recebeItem(item: ChecklistItem) {
    this.RetornoListaItens.push(item);
  }

  abrirModalCadastro() {
    this.ModalCadastroAberto = true
  }

  fechaModalCadatro() {
    this.ModalCadastroAberto = false;
  }



}
