import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { InscricaoComponent } from './pages/inscricao/inscricao.component';
import { AuthGuard } from './auth/auth.guard';
import { EstanteLivrosComponent } from './pages/estante-livros/estante-livros.component';
import { NovoLivroComponent } from './pages/cadastro-livros/novo-livro/novo-livro.component';
import { EditarLivroComponent } from './pages/cadastro-livros/editar-livro/editar-livro.component';
import { ChecklistPageComponent } from './pages/checklist/checklist-page/checklist-page.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inscricao', component: InscricaoComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'estante-livros', component: EstanteLivrosComponent },
      { path: 'cadastro-livros', component: NovoLivroComponent },
      { path: 'editar-livro/:id', component: EditarLivroComponent },
      { path: 'checklists-page', component: ChecklistPageComponent }, 
      { path: '', redirectTo: '/estante-livros', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
