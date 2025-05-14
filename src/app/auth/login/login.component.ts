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
  form!: FormGroup;
  errorMessage: string = '';
  modalAberto: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    this.errorMessage = '';


    const dados: { Login: string; Password: string } = {
      Login: this.form.value.login,
      Password: this.form.value.password
    };


    this.authService.login(dados).subscribe({
      next: (response: any) => {
        console.log('Login bem-sucedido:', response);

        if (response?.token) {
          this.authService.salvarToken(response.token);
          this.authService.salvarIdUsuario(response.userId);
          console.log('Token salvo com sucesso');
          this.router.navigate(['/estante-livros']);
        } else {
          console.warn('Nenhum token retornado pela API');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao fazer login:', error);


        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Erro de rede: ${error.error.message}`;
        } else {
          this.errorMessage =
            error.status === 401
              ? 'Credenciais inválidas. Por favor, verifique seus dados.'
              : `Erro inesperado. Código: ${error.status}, Mensagem: ${error.message}`;
        }
      },
    });
  }

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

}
