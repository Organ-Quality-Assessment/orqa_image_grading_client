import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity when incorrectly formed', () => {
    component.loginForm.email = 'testing.testing@test'
    let field = component.loginForm.controls['email']; 
    expect(field.valid).toBeFalsy(); 
  });

  it('password field validity when empty', () => {
    let field = component.loginForm.controls['password']; 
    expect(field.valid).toBeFalsy(); 
  });

  it('password field validity when completed', () => {
    component.loginForm.patchValue({password: 'password'})
      let field = component.loginForm.controls['password']; 
      expect(field.valid).toBeTruthy(); 
    });

  it('email field validity when not compelted correctly', () => {
      component.loginForm.patchValue({email: 'email.com'})
        let field = component.loginForm.controls['email']; 
        expect(field.valid).toBeFalsy(); 
      });
  
  
  it('email field validity when completed', () => {
        component.loginForm.patchValue({email: 'email@email.com'})
          let field = component.loginForm.controls['email']; 
          expect(field.valid).toBeTruthy(); 
        });
});
