import { Component, OnInit } from '@angular/core';
import { Livro } from '../../models/livros';
import { LivroService } from '../../Servicos/livros.service';
import { NgModel } from '@angular/forms';
import { Checklist } from '../../models/checklist';
import { ChecklistService } from '../../Servicos/checklist.service';


@Component({
  standalone: false,
  selector: 'app-estante-livros',
  templateUrl: './estante-livros.component.html',
  styleUrls: ['./estante-livros.component.scss']
})
export class EstanteLivrosComponent implements OnInit {
  livros: Livro[] = [];
  errorMessage: string = '';
  router: any;
  livroSelecionadoParaEdicao: Livro | null = null;
  modalAberto: boolean = false;
  livroSelecionado: any;



  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros() {
    this.livroService.getLivros().subscribe({
      next: (dados: Livro[]) => {
        this.livros = dados;
      },
      error: (err: { message: string; }) => {
        this.errorMessage = 'Erro ao buscar livros: ' + err.message;
      }
    })
  }

  excluirLivro(livro: Livro): void {
    if (livro.id !== undefined) {
      this.livroService.deleteLivro(livro.id).subscribe(
        (response) => {
          console.log('Livro excluído com sucesso!');
          this.carregarLivros();
        },
        (error) => {
          console.error('Erro ao excluir livro:', error);
        }
      );
    } else {
      console.error('Erro: ID do livro não encontrado');
    }
  }


  editarlivro(livro: Livro): void {
    this.livroSelecionadoParaEdicao = livro;
    this.modalAberto = true;
  }

  cancelarEdicao() {
    this.modalAberto = false;
  }


  onLivroEditado(livroEditado: Livro): void {
    this.modalAberto = false;
    this.carregarLivros();
  }

 


}
