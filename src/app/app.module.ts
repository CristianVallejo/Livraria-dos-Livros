import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { InscricaoComponent } from './pages/inscricao/inscricao.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EstanteLivrosComponent } from './pages/estante-livros/estante-livros.component';
import { NovoLivroComponent } from './pages/cadastro-livros/novo-livro/novo-livro.component';
import { EditarLivroComponent } from './pages/cadastro-livros/editar-livro/editar-livro.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import 'primeflex/primeflex.css';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ConfiConexaoComponent } from './auth/confiConexao/confi-conexao.component';
import { ChecklistPageComponent } from './pages/checklist/checklist-page/checklist-page.component';
import { ChecklistItensComponent } from './pages/checklist/checklist-page/Checklist-lista/checklist-itens-lista/checklist-itens-lista.component';
import { ListarChecklistComponent } from './pages/checklist/checklist-page/Checklist-lista/listar-checklist.component';
import { CadastroEditarChecklistComponent } from './pages/checklist/checklist-page/cadastro-editar-checklist/cadastro-editar-checklist.component';
import { CadastroEditarChecklistListaComponent } from './pages/checklist/checklist-page/cadastro-editar-checklist/cadastro-editar-checklist-lista/cadastro-editar-checklist-lista.component';

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
    ConfiConexaoComponent,
    ChecklistPageComponent,
    ChecklistItensComponent,
    ListarChecklistComponent,
    CadastroEditarChecklistComponent,
    CadastroEditarChecklistListaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    HttpClientModule,
    DialogModule,
    CardModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
