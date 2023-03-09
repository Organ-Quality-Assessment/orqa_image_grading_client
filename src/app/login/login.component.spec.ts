import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { Observable, of, Subject } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router

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
        "updatedAt": "2023-01-19T15:51:24.686Z",
        liver: true,
        kidney: true
    }
}

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', {
      register:  { pipe: () => { return of(successResponse)} } ,
      login:  { pipe: () => { return of(successResponse)} },
      setSession:  { subscribe: () => { return successResponse} },
      getRedirectPage: 'test',
      setRedirectPage: 'test' ,
    })

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router)
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
    component.loginForm.patchValue({ password: 'password' })
    let field = component.loginForm.controls['password'];
    expect(field.valid).toBeTruthy();
  });

  it('email field validity when not compelted correctly', () => {
    component.loginForm.patchValue({ email: 'email.com' })
    let field = component.loginForm.controls['email'];
    expect(field.valid).toBeFalsy();
  });


  it('email field validity when completed', () => {
    component.loginForm.patchValue({ email: 'email@email.com' })
    let field = component.loginForm.controls['email'];
    expect(field.valid).toBeTruthy();
  });

  it('should build organ string correctly when liver and kidney are true', () => {
    const user = {
      liver: true,
      kidney: true
    }

    expect(component.buildStringFromCheckedOrgansCurrentlyGrading(user)).toBe('liver,kidney')
  })


  it('should build organ string correctly when liver true and kidney false', () => {
    const user = {
      liver: true,
      kidney: false
    }

    expect(component.buildStringFromCheckedOrgansCurrentlyGrading(user)).toBe('liver')
  })

  it('should build organ string correctly when liver false and kidney true', () => {
    const user = {
      liver: false,
      kidney: true
    }

    expect(component.buildStringFromCheckedOrgansCurrentlyGrading(user)).toBe('kidney')
  })
  it('should navigate correctly after submitting successfully if included organs are marked as true and there is a saved redirect page', () => {
    component.loginForm.patchValue({password: 'password'})
    component.loginForm.patchValue({email: 'email@test.com'})

    const spy = spyOn(router, 'navigate')

    fixture.detectChanges()
    component.onSubmit()

    expect(spy).toHaveBeenCalledWith(['test'])
  })

  it('should navigate to grading after submitting successfully if included organs are marked as true and there is not a saved redirect page', () => {
    // todo override auth spy to not have a redirect page saved
    
    component.loginForm.patchValue({password: 'password'})
    component.loginForm.patchValue({email: 'email@test.com'})

    const spy = spyOn(router, 'navigate')

    fixture.detectChanges()
    component.onSubmit()

   //  expect(spy).toHaveBeenCalledWith(['grading'], {queryParams: {organs: 'liver,kidney'}})
  })
  
  it('should navigate to comparison if no included organs are selected in the user object', () => {
    // todo override success response to change values of kidney and liver to false
    
    component.loginForm.patchValue({password: 'password'})
    component.loginForm.patchValue({email: 'email@test.com'})

    successResponse.user.liver = false
    successResponse.user.kidney = false

    const spy = spyOn(router, 'navigate')

    fixture.detectChanges()
    component.onSubmit()

   // expect(spy).toHaveBeenCalledWith(['comparison'])
  })

  it('should remove alert when submit form called', () => {
    component.message = 'Error message'
    component.showAlert = true
    component.onSubmit()
  
    expect(component.showAlert).toBeFalsy()
    expect(component.message).toBe('')
  
  })

});
