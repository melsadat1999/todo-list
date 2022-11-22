import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'todoList',
    loadChildren: () =>
      import('./modules/todo-list/todo-list.module').then(
        (m) => m.TodoListModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'todoList' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
