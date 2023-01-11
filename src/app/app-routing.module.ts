import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { GradeComponent } from './grade/grade.component';

const routes: Routes = [
  {path: '', component: TestComponent},
  {path: 'grade', component: GradeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
