import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Livro } from '../../../models/livros';
import { LivroService } from '../../../Servicos/livros.service';

@Component({
  selector: 'app-editar-livro',
  standalone: false,
  templateUrl: './editar-livro.component.html',
  styleUrls: ['./editar-livro.component.scss']
})
export class EditarLivroComponent implements OnChanges {
  @Input() livroSelecionado: Livro | null = null;
  @Output() livroEditado = new EventEmitter<Livro>();
  @Output() fecharModal = new EventEmitter<boolean>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['livroSelecionado'] && this.livroSelecionado) {
      this.criarFormulario();
    } else {
      console.log("Deus eu te amo")

    }
  }


  criarFormulario(): void {
    this.form = this.fb.group({
      id: [this.livroSelecionado?.id],
      nome: [this.livroSelecionado?.nome, Validators.required],
      autor: [this.livroSelecionado?.autor, Validators.required],
      estoque: [this.livroSelecionado?.estoque, Validators.required],
      dtCadastro: [this.livroSelecionado?.dtCadastro]
    });
  }


  salvarEdicao() {
    if (this.form.valid) {
      this.livroEditado.emit(this.form.value);
    }
  }

  cancelarEdicao() {
    this.fecharModal.emit();
  }
}
