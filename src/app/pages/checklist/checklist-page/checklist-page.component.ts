import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Checklist, ChecklistItem } from '../../../models/checklist';

@Component({
  selector: 'app-checklist-page',
  standalone: false,
  templateUrl: './checklist-page.component.html',
  styleUrl: './checklist-page.component.scss'
})
export class ChecklistPageComponent implements OnInit, OnChanges {
  ModalCadastroAberto: boolean = false
  RetornoListaItens: ChecklistItem[] = [];
  retornoListaChecklista: boolean | null = null;
  retornoChecklistEditar: Checklist | null = null;

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['retornoChecklistEditar']) {
      this.abrirModalCadastro();
    }
  }



  ngOnInit(): void {

  }

  recebeItem(item: ChecklistItem) {
    this.RetornoListaItens.push(item);
  }

  recarregarListaChecklists(retorno: boolean) {
    this.retornoListaChecklista = retorno
  }

  abrirModalCadastro() {
    this.ModalCadastroAberto = true
  }

  fechaModalCadatro() {
    this.ModalCadastroAberto = false;
  }

  receberChecklistEditar(checklist: Checklist) {
    this.retornoChecklistEditar = checklist;
    console.log(this.retornoChecklistEditar);
    this.abrirModalCadastro();
  }



}
