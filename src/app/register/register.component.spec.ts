import { JsonpClientBackend } from '@angular/common/http';
import { ComponentFixture, ComponentFixtureNoNgZone, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { AuthService } from '../auth.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router
  let registerSubject: any
  // let authServiceStub: any
  let authServiceSpy: jasmine.SpyObj<AuthService>

// todo update with new fields

const emailTakenError = {
      "data": null,
      "error": {
          "status": 400,
          "name": "ApplicationError",
          "message": "Email or Username are already taken",
          "details": {}
      }
  }

  const successResponse = {
    "jwt": "lN39sS5iDQTVFa2a1cXRPp9l_578",
    "user": {
        "id": 5,
        "username": " test3",
        "email": "test3@test.com",
        "provider": "local",
        "confirmed": true,
        "blocked": false,
        "createdAt": "2023-01-19T15:51:24.686Z",
        "updatedAt": "2023-01-19T15:51:24.686Z"
    }
}

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('authService', [
      'register'
    ])
    authServiceSpy.register.and.returnValue(of(successResponse))

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [FormsModule, ReactiveFormsModule], 
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    router = TestBed.inject(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('email field validity when empty', () => {
    let field = component.registerForm.controls['email']; 
    expect(field.valid).toBeFalsy(); 
  });

  it('email field validity when incorrectly formed', () => {
    component.registerForm.email = 'testing.testing@test'
    let field = component.registerForm.controls['email']; 
    expect(field.valid).toBeFalsy(); 
  });

  it('email field validity when not compelted correctly', () => {
    component.registerForm.patchValue({email: 'email.com'})
      let field = component.registerForm.controls['email']; 
      expect(field.valid).toBeFalsy(); 
    });

  it('username field validity when empty', () => {
    let field = component.registerForm.controls['username']; 
    expect(field.valid).toBeFalsy(); 
  });

  it('password field validity when empty', () => {
    let field = component.registerForm.controls['password']; 
    expect(field.valid).toBeFalsy(); 
  });

  it('password field validity when empty', () => {
    let field = component.registerForm.controls['password']; 
    expect(field.valid).toBeFalsy(); 
  });


it('password field validity when completed', () => {
  component.registerForm.patchValue({password: 'password'})
    let field = component.registerForm.controls['password']; 
    expect(field.valid).toBeTruthy(); 
  });

it('username field validity when completed', () => {
    component.registerForm.patchValue({username: 'username'})
      let field = component.registerForm.controls['username']; 
      expect(field.valid).toBeTruthy(); 
    });

    it('email field validity when completed', () => {
      component.registerForm.patchValue({email: 'email@email.com'})
        let field = component.registerForm.controls['email']; 
        expect(field.valid).toBeTruthy(); 
        
      });

it('should navigate to grading page when submit completed form', () => {
  
  
  component.registerForm.patchValue({password: 'password'})
    component.registerForm.patchValue({email: 'email@test.com'})
    component.registerForm.patchValue({username: 'testing'})
     
    const routerSpy = spyOn(router, 'navigate')
   
    fixture.detectChanges()
  component.onSubmit()
  console.error(component.message)
  
  expect(routerSpy).toHaveBeenCalledWith(['grading'])
  })

  // it('should not navigate and show error when service returns error', () => {
  //   authServiceStub = {
  //     register() {
  //       return of(emailTakenError)
  //     }
  //   }  
    
  //   component.registerForm.patchValue({password: 'password'})
  //     component.registerForm.patchValue({email: 'email@test.com'})
  //     component.registerForm.patchValue({username: 'testing'})
  
  //     const routerSpy = spyOn(router, 'navigate')
  
  //     fixture.detectChanges()
  //   component.onSubmit()
  //   console.error(component.message)
    
  //   expect(routerSpy).not.toHaveBeenCalled()
  //   })

  
});
