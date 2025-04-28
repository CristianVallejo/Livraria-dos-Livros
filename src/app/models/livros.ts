export class Livro {
  id?: number; 
  nome: string;
  autor: string;
  estoque: number;
  dtCadastro?: string; 

  constructor(nome: string, autor: string, estoque: number) {
    this.nome = nome;
    this.autor = autor;
    this.estoque = estoque;
  }
}
