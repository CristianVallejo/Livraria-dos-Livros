import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Livro } from '../../../models/livros';
import { LivroService } from '../../../Servicos/livros.service';

@Component({
  selector: 'app-editar-livro',
  standalone: false,
  templateUrl: './editar-livro.component.html',
  styleUrls: ['./editar-livro.component.scss']
})
export class EditarLivroComponent implements OnInit {
  @Input() livroSelecionado: Livro | null = null;
  @Output() livroEditado = new EventEmitter<Livro>();
  @Output() fecharModal = new EventEmitter<boolean>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.livroSelecionado?.id],
      nome: [this.livroSelecionado?.nome, Validators.required],
      autor: [this.livroSelecionado?.autor, Validators.required],
      estoque: [this.livroSelecionado?.estoque, [Validators.required, Validators.min(0)]],
      dtCadastro: [this.livroSelecionado?.dtCadastro],
    });
  }

  salvarEdicao() {
    if (this.form.valid && this.form.dirty) {
      const livro: Livro = {
        id: this.form.value.id,
        nome: this.form.value.nome,
        autor: this.form.value.autor,
        estoque: this.form.value.estoque,
        dtCadastro: this.form.value.dtCadastro
      };

      this.livroService.putLivro(livro).subscribe({
        next: (resposta: any) => {
          if (resposta == true) {
            this.livroEditado.emit(livro);
          }
        },
        error: (erro: any) => {
          console.error('Erro ao editar livro:', erro);
        }
      });
    } else {
      console.log('Nenhuma alteração foi feita ou formulário inválido.');
    }
  }


  cancelarEdicao() {
    this.fecharModal.emit();
  }
}
