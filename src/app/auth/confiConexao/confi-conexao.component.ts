import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConexaoService } from '../../Servicos/conexao.service';
import { conexao } from '../../models/conexaoBanco';

@Component({
  selector: 'app-confi-conexao',
  standalone: false,
  templateUrl: './confi-conexao.component.html',
  styleUrl: './confi-conexao.component.scss'
})
export class ConfiConexaoComponent implements OnInit {
  form!: FormGroup;
  senhaVisivel: boolean = false;
  @Output() modalFechar = new EventEmitter<boolean>();
  mensagem: string | null = null;
  mensagemErro!: boolean;


  constructor(private fb: FormBuilder, private conexao_service: ConexaoService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      IpBanco: [''],
      NomeBanco: [''],
      UsuarioBanco: [''],
      SenhaBanco: ['']
    });

    this.obterConexao();
  }

  fecharModal() {
    this.modalFechar.emit();
    this.mensagem = null;
  }

  alternarVisibilidadeSenha() {
    this.senhaVisivel = !this.senhaVisivel;
  }

  obterConexao() {
    this.form.reset;
    this.conexao_service.obterConexao().subscribe({
      next: (Response: conexao) => {
        this.form.patchValue({
          IpBanco: Response.ipBanco,
          NomeBanco: Response.nomeBanco,
          UsuarioBanco: Response.usuarioBanco,
          SenhaBanco: Response.senhaBanco
        });
      }
    });
  }

  ConfigurarConexaoNova() {
    if (this.form.dirty) {
      const _conexao: conexao = {
        ipBanco: this.form.value.IpBanco,
        nomeBanco: this.form.value.NomeBanco,
        usuarioBanco: this.form.value.UsuarioBanco,
        senhaBanco: this.form.value.SenhaBanco
      };

      this.conexao_service.configurarConexao(_conexao).subscribe({
        next: (resposta) => {
          this.mensagem = resposta.mensagem;
          this.mensagemErro = false;
          setTimeout(() => {
            this.fecharModal();
          }, 1000);
        },
        error: (erro) => {
          this.mensagem = erro.error;
          this.mensagemErro = true;
        }
      });
    }
  }



}
