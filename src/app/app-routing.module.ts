import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ComparisonComponent } from './comparison/comparison.component';
import { GradingComponent } from './grading/grading.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path: 'test', component: TestComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'comparison', component: ComparisonComponent, canActivate: [AuthGuard]},
  {path:'questions', component: QuestionsComponent, canActivate: [AuthGuard]},
  {path:'grading', component: GradingComponent, canActivate: [AuthGuard]},
  {path:'', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
