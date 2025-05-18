import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Checklist, ChecklistItem } from '../../../../models/checklist';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistService } from '../../../../Servicos/checklist.service';

@Component({
  selector: 'app-cadastro-editar-checklist',
  standalone: false,
  templateUrl: './cadastro-editar-checklist.component.html',
  styleUrl: './cadastro-editar-checklist.component.scss'
})
export class CadastroEditarChecklistComponent implements OnInit, OnChanges {
  form!: FormGroup;
  mensagem!: string;
  itensLista: ChecklistItem[] = [];
  @Output() item = new EventEmitter<ChecklistItem>();
  @Output() fecharModal = new EventEmitter<boolean>();
  @Output() recarregarLista = new EventEmitter<boolean>();
  @Input() checkListParaEdicao: Checklist | null = null;

  constructor(private checklistService: ChecklistService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      Id: [],
      Nome: ['', Validators.required],
      IdUsuario: Number(localStorage.getItem('idUsuario')),
      Item: [[null], Validators.required],
      Data: ['']
    });
    this.itensLista = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkListParaEdicao']) {
      this.carregarChecklist(this.checkListParaEdicao!);
    }
  }

  cadastrarCheckList() {

    if (this.itensLista.length > 0) {
      const checklist: Checklist = {
        nome: this.form.value.Nome,
        idUsuario: Number(localStorage.getItem('idUsuario')),
        itens: this.itensLista
      };

      console.log('Checklist enviado para o backend:', JSON.stringify(checklist, null, 2));

      this.checklistService.create(checklist).subscribe({
        next: (retorno: any) => {
          this.mensagem = `Cadastro realizado com sucesso: ${retorno}`;
          this.recarregarLista.emit(true);
          this.fecharModal.emit();
        },
        error: (err: any) => {
          this.mensagem = `Erro ao cadastrar: ${err.error}`;
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
        descricao: itemDescricao,
        resposta: 4
      };
      this.itensLista.push(Item);
      this.item.emit(Item);
      this.form.get('Item')?.reset()
    };

  }

  cancelarChecklist() {
    this.fecharModal.emit();
  }

  carregarChecklist(checklist: Checklist) {

    this.form.patchValue({
      Id: checklist.id,
      Nome: checklist.nome,
      IdUsuario: checklist.idUsuario,
      Data: checklist.dataCriacao,
      Item: [[null]]
    });
    this.itensLista = [];
    checklist.itens?.forEach(item => {
      this.itensLista.push(item);
      this.item.emit(item);
    });

    if (!this.form.pristine) {
      this.editarChecklist();
    }

  }

  editarChecklist() {
    if (this.checkListParaEdicao?.id) {
      const checklistEditado: Checklist = {
        nome: this.form.value.Nome,
        idUsuario: this.form.value.IdUsuario,
        itens: this.itensLista
      };

      this.checklistService.update(this.checkListParaEdicao.id, checklistEditado).subscribe({
        next: (retorno: any) => {
          this.mensagem = `Sucesso, checklist editado: ${JSON.stringify(retorno)}`;
          this.recarregarLista.emit(true);
          this.fecharModal.emit();
        },
        error: (err: any) => {
          this.mensagem = `Erro ao editar: ${err.error}`;
        }
      });
    }
  }

  novoOuAlterarChecklist() {
    if (this.checkListParaEdicao) {
      this.carregarChecklist(this.checkListParaEdicao);
    } else {
      this.cadastrarCheckList();
    }


  }


}





