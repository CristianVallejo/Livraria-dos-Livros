import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'; // Importando o Router

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup; // FormGroup deve ser inicializado no ngOnInit
  errorMessage: string = ''; // Propriedade para armazenar mensagens de erro

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router // Injetando o Router aqui
  ) {}

  ngOnInit(): void {
    // Inicializando o formulário reativo com validadores
    this.form = this.fb.group({
      login: ['', [Validators.required]], // Validação de campo obrigatório
      password: ['', [Validators.required]] // Validação de campo obrigatório
    });
  }

  login(): void {
    this.errorMessage = ''; // Limpa mensagens de erro anteriores

    // Definindo tipo para os dados enviados no login
    const dados: { Login: string; Password: string } = {
      Login: this.form.value.login,
      Password: this.form.value.password
    };

    // Chamando o serviço de autenticação
    this.authService.login(dados).subscribe({
      next: (response: any) => {
        console.log('Login bem-sucedido:', response);

        if (response?.token) {
          this.authService.salvarToken(response.token);
          console.log('Token salvo com sucesso');
          this.router.navigate(['/estante-livros']); // Navegando após o login
        } else {
          console.warn('Nenhum token retornado pela API');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao fazer login:', error);

        // Verificando o tipo de erro para gerar a mensagem adequada
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Erro de rede: ${error.error.message}`;
        } else {
          this.errorMessage =
            error.status === 401
              ? 'Credenciais inválidas. Por favor, verifique seus dados.'
              : `Erro inesperado. Código: ${error.status}, Mensagem: ${error.message}`;
        }
      },
    }); // <-- Aqui estava faltando o fechamento do parêntese
  }
}
