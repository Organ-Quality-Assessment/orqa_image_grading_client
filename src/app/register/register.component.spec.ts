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
    const authServiceSpy = jasmine.createSpyObj('AuthService', {
      register:  { pipe: () => { return of(successResponse)} } ,
      login:  { pipe: () => { return of(successResponse)} },
      setSession:  { subscribe: () => { return successResponse} }
    })
    // authServiceSpy.register.and.returnValue(of(successResponse))
    // authServiceSpy.login.and.returnValue(of(successResponse))

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

  it('email field validity when not compted correctly', () => {
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

it('should navigate to grading page when submit completed form with liver and kidney checked', () => { 
  component.registerForm.patchValue({password: 'password'})
    component.registerForm.patchValue({email: 'email@test.com'})
    component.registerForm.patchValue({name: 'testing'})
    component.registerForm.patchValue({institution: 'testing'})
    component.registerForm.patchValue({job: 'testing'})
    component.registerForm.patchValue({experience: 'testing'})
    component.registerForm.patchValue({task: 'testing'})
    component.registerForm.patchValue({liver: true})
    component.registerForm.patchValue({kidney: true})
   
    const routerSpy = spyOn(router, 'navigate')
    
   
    fixture.detectChanges()
  component.onSubmit()
  
  expect(routerSpy).toHaveBeenCalledWith(['grading'], {queryParams: {organs: 'liver,kidney'}})
  })
  


  it('should navigate to grading page when submit completed form with liver checked and kidney not checked', () => { 
    component.registerForm.patchValue({password: 'password'})
      component.registerForm.patchValue({email: 'email@test.com'})
      component.registerForm.patchValue({name: 'testing'})
      component.registerForm.patchValue({institution: 'testing'})
      component.registerForm.patchValue({job: 'testing'})
      component.registerForm.patchValue({experience: 'testing'})
      component.registerForm.patchValue({task: 'testing'})
      component.registerForm.patchValue({liver: true})
      component.registerForm.patchValue({kidney: false})
     
      const routerSpy = spyOn(router, 'navigate')
      
     
      fixture.detectChanges()
    component.onSubmit()
    
    expect(routerSpy).toHaveBeenCalledWith(['grading'], {queryParams: {organs: 'liver'}})
    })
  

    it('should navigate to grading page when submit completed form with kidney checked and liver not checked', () => { 
      component.registerForm.patchValue({password: 'password'})
        component.registerForm.patchValue({email: 'email@test.com'})
        component.registerForm.patchValue({name: 'testing'})
        component.registerForm.patchValue({institution: 'testing'})
        component.registerForm.patchValue({job: 'testing'})
        component.registerForm.patchValue({experience: 'testing'})
        component.registerForm.patchValue({task: 'testing'})
        component.registerForm.patchValue({liver: false})
        component.registerForm.patchValue({kidney: true})
       
        const routerSpy = spyOn(router, 'navigate')
        
       
        fixture.detectChanges()
      component.onSubmit()
      
      expect(routerSpy).toHaveBeenCalledWith(['grading'], {queryParams: {organs: 'kidney'}})
      })

      it('should navigate to comparison page when submit completed form with currently offered organs not checked', () => { 
        component.registerForm.patchValue({password: 'password'})
          component.registerForm.patchValue({email: 'email@test.com'})
          component.registerForm.patchValue({name: 'testing'})
          component.registerForm.patchValue({institution: 'testing'})
          component.registerForm.patchValue({job: 'testing'})
          component.registerForm.patchValue({experience: 'testing'})
          component.registerForm.patchValue({task: 'testing'})
          component.registerForm.patchValue({liver: false})
          component.registerForm.patchValue({kidney: false})
         
          const routerSpy = spyOn(router, 'navigate')
          
         
          fixture.detectChanges()
        component.onSubmit()
        
        expect(routerSpy).toHaveBeenCalledWith(['comparison'])
        })
it('should create error message field if form fields are missing', () => {
  expect(component.errorMessage).toEqual(undefined)
  component.onSubmit()
  expect(component.errorMessage).toEqual('Please complete all fields')
})

it('should return false if form fields are missing when check', () => {
  expect(component.checkAllFieldsValid()).toBe(false)
})

it('should return true if form fields are present other than username', () => {
  component.registerForm.patchValue({password: 'password'})
  component.registerForm.patchValue({email: 'email@test.com'})
  component.registerForm.patchValue({name: 'testing'})
  component.registerForm.patchValue({institution: 'testing'})
  component.registerForm.patchValue({job: 'testing'})
  component.registerForm.patchValue({experience: 'testing'})
  component.registerForm.patchValue({task: 'testing'})
  component.registerForm.patchValue({liver: false})
  component.registerForm.patchValue({kidney: false})

  expect(component.checkAllFieldsValid()).toBe(true)
})

it('should correct convert experience to enum when less than a year', () => {
  component.registerForm.patchValue({experience: 'less than 1 year'})

  expect(component.convertExperienceToEnum(component.registerForm.get('experience').value)).toBe('less than one')
})

it('should correct convert experience to enum when 1-5 years', () => {
  component.registerForm.patchValue({experience: '1-5 years'})

  expect(component.convertExperienceToEnum(component.registerForm.get('experience').value)).toBe('one-five years')
})

it('should correct convert experience to enum when more than five', () => {
  component.registerForm.patchValue({experience: 'five years or more'})

  expect(component.convertExperienceToEnum(component.registerForm.get('experience').value)).toBe('five years or more')
})

it('should remove alert when submit form called', () => {
  component.message = 'Error message'
  component.showAlert = true
  component.onSubmit()

  expect(component.showAlert).toBeFalsy()
  expect(component.message).toBe('')

})

it('should correctly build organ string for liver and kidney', () => {
  component.registerForm.patchValue({liver: true})
  component.registerForm.patchValue({kidney: true})

  expect(component.buildStringFromCheckedOrgansCurrentlyGrading()).toBe('liver,kidney')
})


  // todo testing with getting errors back from auth service

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
