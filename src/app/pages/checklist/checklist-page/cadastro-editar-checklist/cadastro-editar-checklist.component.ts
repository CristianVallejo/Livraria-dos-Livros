import { Component, OnInit } from '@angular/core';
import { Checklist } from '../../../../models/checklist';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistService } from '../../../../Servicos/checklist.service';

@Component({
  selector: 'app-cadastro-editar-checklist',
  standalone: false,
  templateUrl: './cadastro-editar-checklist.component.html',
  styleUrl: './cadastro-editar-checklist.component.scss'
})
export class CadastroEditarChecklistComponent implements OnInit {
  form!: FormGroup;
  mensagem!: string;

  constructor(private checklistService: ChecklistService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      Nome: ['', Validators.required],
      IdUsuario: [null, Validators.required],
      Itens: [[null]]
    });
  }

  cadastrarCheckList() {
    const checklist: Checklist = {
      nome: this.form.value.Nome,
      idUsuario: this.form.value.IdUsuario,
      itens: this.form.value.Itens || []
    };

    this.checklistService.create(checklist).subscribe({
      next: (retorno: any) => {
        this.mensagem = `Cadastro realizado com sucesso: ${retorno}`;
      },
      error: (err: any) => {
        this.mensagem = `Erro ao cadastrar: ${err.error}`;
      }
    });
  }












}
