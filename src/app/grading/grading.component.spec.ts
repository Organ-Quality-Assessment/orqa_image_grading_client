import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { GradingService } from '../services/grading.service';


import { GradingComponent } from './grading.component';

describe('GradingComponent', () => {
  let component: GradingComponent;
  let fixture: ComponentFixture<GradingComponent>;
  let routeStub;
  let router: Router
  let serviceSpy;
  let spy;
  let gradingService: GradingService

  const mockQueryParams = {
    organs: 'liver,kidney'
  }

  const imagesToGrade = [
    {
      filename: 'real/cold_kidney_20.jpg',
      id: 5,
      organ: {
        id: 2,
        organ_type: 'kidney'
      },
      real: true
    },
    {
      filename: 'real/cold_kidney_3.jpg',
      id: 8,
      organ: {
        id: 2,
        organ_type: 'kidney'
      },
      real: false
    },
    {
      filename: 'real/image470.jpg',
      id: 9,
      organ: {
        id: 1,
        organ_type: 'liver'
      },
      real: false
    },
    {
      filename: 'real/image471.jpg',
      id: 10,
      organ: {
        id: 1,
        organ_type: 'liver'
      },
      real: true
    },
    {
      filename: 'real/image472.jpg',
      id: 11,
      organ: {
        id: 1,
        organ_type: 'liver'
      },
      real: false
    }
  ]

  beforeEach(async () => {
routeStub = null;


// todo ideally work out how to change these values to test different return values
serviceSpy = jasmine.createSpyObj('GradingService', {
  getImagesToGrade: new Promise((resolve, reject) => { resolve(imagesToGrade)}),
  submitScore: { subscribe: () => {} }
})

    await TestBed.configureTestingModule({
      declarations: [ GradingComponent ],
      imports: [HttpClientModule, 
      RouterTestingModule.withRoutes([])],
      providers: [
        {provide: ActivatedRoute, useValue: { queryParams: of({
       mockQueryParams
      })
    }
    },
    {provide: GradingService, useValue: serviceSpy}]
    })
    .compileComponents();
   


    fixture = TestBed.createComponent(GradingComponent);
    router = TestBed.inject(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create organs string from query params', () => {
  //   // routeStub = {
  //   //   queryParams: of({
  //   //     organs: 'liver,kidney'
  //   //   })
  //   // }
  //   fixture.detectChanges();
  //   expect(component.organsToGradeString).toBe('liver,kidney');
 
  // });

  it('should create images to score and related fields', () => {

    expect(component.imagesToGrade).toEqual(imagesToGrade);
    expect(component.numberImages).toEqual(5);
    expect(component.organType).toEqual('kidney');
  });


  it('should change fields when next image called when there are more images', () => {
    spyOn(component, 'getImageUrl')
    component.nextImage()
    
    expect(component.currentImage).toEqual(1);

    // todo check current Image URl has changed
    
  });

  it('should navigate when at the end of images', () => {
    const routerSpy = spyOn(router, 'navigate')
    component.currentImage = 4
    component.nextImage()

    expect(routerSpy).toHaveBeenCalled();
  });

  it('should reset form fields when reset form is called', () => {
    // set some values to then reset
    component.form.patchValue({steatosis: 2.5})
    component.form.patchValue({perfusion: 2.5})
    component.form.patchValue({transplantable: true})

    component.resetForm()

    expect(component.form.get('steatosis').value).toEqual(2.5);
    expect(component.form.get('perfusion').value).toEqual(2.5);
    expect(component.form.get('transplantable').value).toBeNull();
  });

  it('should reset form fields to null other than skip and submit when skip called', () => {
    
    // set some values to then reset
    component.form.patchValue({steatosis: 2.5})
    component.form.patchValue({perfusion: 2.5})
    component.form.patchValue({transplantable: true})

    component.skip()

    expect(component.form.get('steatosis').value).toBeNull();
    expect(component.form.get('perfusion').value).toBeNull();
    expect(component.form.get('transplantable').value).toBeNull();
  });

  it('should set skip field to null when submitting', () => {
    
    // set some values to then reset
    component.form.patchValue({skip: 2})

    component.submit()

    expect(component.form.get('skip').value).toBeNull();
  });

  it('should submit liver score if all fields are valid', () => {
component.organType = 'liver'
component.form.patchValue({steatosis: 2.5})
    component.form.patchValue({perfusion: 2.5})
    component.form.patchValue({transplantable: true})

    component.submit()
 
    spyOn(component, 'displayError')
   
    expect(component.displayError).not.toHaveBeenCalled()
    expect(serviceSpy.submitScore).toHaveBeenCalled()
  });

  it('should not submit liver score if fields are invalid', () => {
    component.organType = 'liver'
    component.form.patchValue({steatosis: null})
        component.form.patchValue({perfusion: null})
        component.form.patchValue({transplantable: true})
    
        component.submit()
       
        expect(serviceSpy.submitScore).not.toHaveBeenCalled()
      });


  it('should submit pancreas score if required fields are valid', () => {
    component.organType = 'pancreas'
    component.form.patchValue({steatosis: 2.5})
        component.form.patchValue({perfusion: null})
        component.form.patchValue({transplantable: true})
    
        component.submit()
     
        spyOn(component, 'displayError')
  
       
        expect(component.displayError).not.toHaveBeenCalled()
        expect(serviceSpy.submitScore).toHaveBeenCalled()
      });

      it('should not submit pancreas score if fields are invalid', () => {
        component.organType = 'pancreas'
        component.form.patchValue({steatosis: null})
            component.form.patchValue({perfusion: null})
            component.form.patchValue({transplantable: null})
        
            component.submit()
           
            expect(serviceSpy.submitScore).not.toHaveBeenCalled()
          });
    

  it('should submit kidney score if required fields are valid', () => {
    component.organType = 'kidney'
    component.form.patchValue({steatosis: null})
        component.form.patchValue({perfusion: 2.5})
        component.form.patchValue({transplantable: true})
    
        component.submit()
     
        spyOn(component, 'displayError')
  
       
        expect(component.displayError).not.toHaveBeenCalled()
        expect(serviceSpy.submitScore).toHaveBeenCalled()
      });

      it('should not submit kidney score if fields are invalid', () => {
        component.organType = 'kidney'
        component.form.patchValue({steatosis: null})
            component.form.patchValue({perfusion: null})
            component.form.patchValue({transplantable: null})
        
            component.submit()
           
            expect(serviceSpy.submitScore).not.toHaveBeenCalled()
          });
    

});
