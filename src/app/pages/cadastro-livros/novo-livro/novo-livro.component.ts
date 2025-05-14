import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivroService } from '../../../Servicos/livros.service';
import { Livro } from '../../../models/livros';

@Component({
  selector: 'app-novo-livro',
  standalone: false,
  templateUrl: './novo-livro.component.html',
  styleUrls: ['./novo-livro.component.scss']
})
export class NovoLivroComponent implements OnInit {
  form!: FormGroup;
  titulo: string = '';

  constructor(private fb: FormBuilder, private servicelivro: LivroService) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      autor: ['', Validators.required],
      estoque: [0, [Validators.required, Validators.min(0)]]
    });
  }

  cadastrarLivro() {
    const livro: Livro = {
      nome: this.form.value.nome,
      autor: this.form.value.autor,
      estoque: this.form.value.estoque,
    };

    this.servicelivro.postLivro(livro).subscribe({
      next: (resposta: any) => {
        this.titulo = 'Livro cadastrado com sucesso!';
        this.form.reset();
      },
      error: (erro: any) => {
        this.titulo = 'Erro ao cadastrar o livro.';
        console.error('Erro:', erro);
      }
    });
  }
}
