import { Component, EventEmitter, OnInit, output, Output } from '@angular/core';
import { Checklist, ChecklistItem } from '../../../../models/checklist';
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
  itensLista: ChecklistItem[] = [];
  @Output() item = new EventEmitter<ChecklistItem>();
  @Output() fecharModal = new EventEmitter<boolean>();

  constructor(private checklistService: ChecklistService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      Nome: ['', Validators.required],
      IdUsuario: Number(localStorage.getItem('idUsuario')),
      Item: [[null], Validators.required]
    });
  }

  cadastrarCheckList() {

    if (this.itensLista.length > 0) {
      const checklist: Checklist = {
        nome: this.form.value.Nome,
        idUsuario: Number(localStorage.getItem('idUsuario')),
        itens: this.itensLista
      };

      this.checklistService.create(checklist).subscribe({
        next: (retorno: any) => {
          this.mensagem = `Cadastro realizado com sucesso: ${retorno}`;
        },
        error: (err: any) => {
          this.mensagem = `Erro ao cadastrar: ${err.mensagem}`;

        }
      });
    } else if (this.itensLista.length === 0) {
      this.mensagem = "Adicione pelo menos um item";
    } else {
      this.mensagem = "O formulário está inválido";
    }
  }

  cadastrarItem() {
    const itemDescricao = this.form.value.Item;

    if (itemDescricao) {
      const Item: ChecklistItem = {
        idChecklist: null,
        descricao: itemDescricao,
      };
      this.itensLista.push(Item);
      this.item.emit(Item);
      this.form.get('Item')?.reset()
    };

  }

  cancelarChecklist() {
    this.fecharModal.emit();
  }

}



