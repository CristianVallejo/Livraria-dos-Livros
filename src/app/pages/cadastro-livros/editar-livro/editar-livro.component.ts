import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  form!: FormGroup;
  livroRetornado: Livro | undefined;

  constructor(private fb: FormBuilder, private livroService: LivroService) { }

  ngOnInit(): void {
    this.carregaLivro();
  }

  carregaLivro() {
    if (this.livroSelecionado?.id !== undefined) {
      this.livroService.getLivroById(this.livroSelecionado.id).subscribe({
        next: (livro) => {
          this.livroRetornado = livro;
  
          this.form = this.fb.group({
            id: [livro.id],
            nome: [livro.nome || '', Validators.required],
            autor: [livro.autor || '', Validators.required],
            estoque: [livro.estoque || '', [Validators.required, Validators.min(0)]]
          });
        },
        error: (err) => {
          console.error('Erro ao carregar o livro:', err);
        }
      });
    } else {
      console.error('ID do livro é indefinido');
    }
  }

  editarLivro(): void {
    if (this.form.valid) {
      const livroEditado: Livro = this.form.value;
      this.livroEditado.emit(livroEditado);
    } else {
      console.log('Formulário inválido');
    }
  }


}
