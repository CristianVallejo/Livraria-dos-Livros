import 'tslib';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { InscricaoComponent } from './pages/inscricao/inscricao.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { EstanteLivrosComponent } from './pages/estante-livros/estante-livros.component';
import { NovoLivroComponent } from './pages/cadastro-livros/novo-livro/novo-livro.component';
import { EditarLivroComponent } from './pages/cadastro-livros/editar-livro/editar-livro.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InscricaoComponent,
    HeaderComponent,
    FooterComponent,
    EstanteLivrosComponent,
    NovoLivroComponent,
    EditarLivroComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    HttpClientModule,


  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
