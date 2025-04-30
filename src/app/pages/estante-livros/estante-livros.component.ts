import { Component, OnInit } from '@angular/core';
import { Livro } from '../../models/livros';
import { LivroService } from '../../Servicos/livros.service';
import { NgModel } from '@angular/forms';


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
  livroSelecionadoParaEdicao: Livro | undefined;
  modalAberto: boolean | undefined;


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


  onLivroExcluido(idExcluido: number): void {
    this.livros = this.livros.filter(l => l.id !== idExcluido);
  }

  editarlivro(livro: Livro): void {
    this.livroSelecionadoParaEdicao = livro;
    this.modalAberto = true;
  }

  cancelarEdicao() {
    this.modalAberto = false;
  }


  onLivroEditado(livro: Livro): void {
    console.log('Livro editado:', livro);
    this.modalAberto = false;
  }



}
