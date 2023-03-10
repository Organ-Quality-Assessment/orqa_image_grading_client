import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ComparisonService } from '../comparison.service';

import { ComparisonComponent } from './comparison.component';

describe('ComparisonComponent', () => {
  let component: ComparisonComponent;
  let fixture: ComponentFixture<ComparisonComponent>;
  let serviceSpy;
  let authSpy;
  let router: Router

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
    // mock service response
    serviceSpy = jasmine.createSpyObj('ComparisonService',  {
      getRealAndArtificialImages: new Promise((resolve, reject) => { resolve(imagesToGrade)}),
      
    })

  authSpy = jasmine.createSpyObj('AuthService', ['logout'])

    await TestBed.configureTestingModule({
      declarations: [ ComparisonComponent ],
      imports: [HttpClientModule],
      providers: [{provide: ComparisonService, useValue: serviceSpy},
        {provide: AuthService, useValue: authSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonComponent);
    router = TestBed.inject(Router)
    component = fixture.componentInstance;

    // mock component functions
    const firstImage = imagesToGrade[0]
    spyOn(component, 'getImageUrl').and.callFake((firstImage) => {
      return new Promise((resolve, reject) => {
        resolve(firstImage.filename)
      });
  });
  

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  it('should create images to vote on and related fields', () => {

    expect(component.images).toEqual(imagesToGrade);
    expect(component.numberToShow).toEqual(5);
    
  });

  it('should change fields when next image called when there are more images', () => {
    component.nextImage()

    expect(component.guessing).toEqual(true);
    expect(component.currentImage).toEqual(1);

    // todo check current Image URl has changed
    
  });

  it('should guessing flag when there is no more images', () => {
    component.currentImage = 4
    component.nextImage()

    expect(component.guessing).toEqual(false);
  });


  it('should nav correctly when finished comparison called', () => {
    const routerSpy = spyOn(router, 'navigate')
    component.finishedComparison()

    expect(routerSpy).toHaveBeenCalledWith(['questions'])
  });

  it('should increase score if correct', () => {
    component.checkIfAnswerIsCorrect('real')

    expect(component.correctGuesses).toEqual(1)
  });

  it('should not increase score if incorrect', () => {
    component.checkIfAnswerIsCorrect('artificial')

    expect(component.correctGuesses).toEqual(0)
  });

  it('should not increase score if they have picked unsure', () => {
    component.checkIfAnswerIsCorrect('unsure')

    expect(component.correctGuesses).toEqual(0)
  });


  it('should nav correctly when skip to questions called', () => {
    const routerSpy = spyOn(router, 'navigate')
    component.finishedComparison()

    expect(routerSpy).toHaveBeenCalledWith(['questions'])
  });


  it('should call logout function in service when logout called', () => {  
    component.logout()

    expect(authSpy.logout).toHaveBeenCalled()
  });

// it('should successfully get a value for first image URL on page load', async () => {
// fixture.detectChanges()
//   console.log(component.getImageUrl('test'))
//   expect(component.currentImageUrl).toHaveBeenCalled()
// });

});

 


