import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LivroService } from '../../../Servicos/livros.service';
import { Livro } from '../../../models/livros';

@Component({
  selector: 'app-excluir-livro',
  standalone: false,
  templateUrl: './excluir-livro.component.html',
  styleUrls: ['./excluir-livro.component.scss']
})
export class ExcluirLivroComponent implements OnInit {
  @Input() livroSelecionado: Livro | null = null;
  @Output() livroExcluido = new EventEmitter<number>(); // emite o id do livro

  livros: Livro[] = [];
  errorMessage: string = '';

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {

    this.livroService.getLivros().subscribe({
      next: (livros) => {
        this.livros = livros;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar livros';
        console.error(err);
      }
    });
  }
  excluirLivro(): void {

    if (this.livroSelecionado && this.livroSelecionado.id) {

      this.livroService.deleteLivro(this.livroSelecionado.id).subscribe({
        next: () => {
          this.livroExcluido.emit(this.livroSelecionado!.id);
        },
        error: (err) => {
          console.error('Erro ao excluir livro', err);
          this.errorMessage = 'Não foi possível excluir o livro.';
        }
      });
    } else {
      // Caso livroSelecionado seja nulo ou id inválido
      console.error('Livro não selecionado ou ID inválido');
      this.errorMessage = 'Livro não selecionado ou ID inválido';
    }
  }




}