import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}


describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: any
 let routerSpy;

const authRequiredUrls = ['comparison', 'questions', 'grading']
const dummyRoute = {} as ActivatedRouteSnapshot;

  beforeEach(() => {
    
  

  })
// https://dev.to/this-is-angular/testing-angular-route-guards-with-the-routertestingmodule-45c9

// ----- USER IS LOGGED IN
  describe('when user is logged in', () => {
    beforeEach(() => {
      const authServiceSpy = jasmine.createSpyObj('AuthService', {
        isLoggedIn: true,
        setRedirectPage: true,
        getRedirectPage: 'grading'
      })
    
      

TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [{provide: AuthService, useValue: authServiceSpy}] 
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // user is logged in so should proceed
  authRequiredUrls.forEach((url) => {
     it('grants route access for auth required urls', () => {
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState(url)); 

    expect(canActivate).toBeTrue(); 
  });
  })


 
  })

  // ----- USER IS LOGGED IN
  describe('when user is not logged in', () => {
    beforeEach(() => {
      const authServiceSpy = jasmine.createSpyObj('AuthService', {
        isLoggedIn: false,
        setRedirectPage: true,
        getRedirectPage: 'grading'
      })
      const routerSpy = jasmine.createSpyObj('Router', {
       navigate: true
      })

      TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterTestingModule],
            providers: [{provide: AuthService, useValue: authServiceSpy}] 
          });
          guard = new AuthGuard(authServiceSpy as AuthService, routerSpy)
    
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // user is not logged in so should not proceed
  authRequiredUrls.forEach((url) => {
    it('grants route access', () => {
   const canActivate = guard.canActivate(dummyRoute, fakeRouterState(url)); 

   expect(canActivate).toBeFalse(); 
 });
 })

 
  })

  
});
