import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist-page',
  standalone: false,
  templateUrl: './checklist-page.component.html',
  styleUrl: './checklist-page.component.scss'
})
export class ChecklistPageComponent implements OnInit {
  ModalCadastroAberto: boolean = false

  ngOnInit(): void {

  }

  abrirModalCadastro() {
    this.ModalCadastroAberto = true
  }

  fechaModalCadatro() {
    this.ModalCadastroAberto = false;
  }



}
