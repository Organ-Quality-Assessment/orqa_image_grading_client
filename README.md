# OrQA Image Grading Client
Angular client for grading training data for the OrQA project. 

## About

Transplantation is the best treatment for patients with organ failure irrespective of the organ required. Currently over 6,000
patients are waiting in the United Kingdom. Focusing on kidney transplantation the figures are stark with a patient living twice
as long with a transplant, when compared with dialysis, and over ten years a kidney transplant saves the NHS £420,000 per
patient.    

Organs donated for transplantation are sometimes not used because of concerns about infections or cancer, but most
commonly because of worries that they won’t function adequately in the recipient and might lead directly to the patient dying. At
the moment assessing organs for transplantation is subjective and depends on the skills of the surgical team. In the United
Kingdom the rate of use of organs varies widely between centres, from 70% to 30%. This device aims to support all surgeons
to use the achievable 70% of donated organs.

This project will involve training machine learning models to score the quality of organs being considered for transplantation.

### Project Team
Colin Wilson, Newcastle upon Tyne Hospitals NHS Foundation Trust  ([colin.wilson6@nhs.net](mailto:colin.wilson6@nhs.net))    
Hassan Ugail, University of Bradford

### RSE Contact
Kate Court
RSE Team  
Newcastle University  
([kate.court@newcastle.ac.uk](mailto:kate.court@newcastle.ac.uk)) 

## Built With

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Getting Started

### Prerequisites

Install Angular: `npm install -g @angular/cli`. This application relies on an running the Strapi application, [orqa-image-grading-strapi](https://github.com/Organ-Quality-Assessment/orqa-image-grading-strapi) and a MySQL database. 

### Installation
`npm install`
or
`yarn install`

### Running Locally

Run `ng serve` or `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng cypress:run` to execute the end-to-end tests. 

## Deployment

### Production

#### Pushing to an Oracle Cloud Container Instance

1. Generate an [auth token](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsgenerateauthtokens.htm) 

2. Log into docker `docker login lhr.ocir.io` and provide your [Oracle credentials](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionslogintoocir.htm). Your username is in this format `<tenancy-namespace>/<username>`, e.g. `lrrho0j0b1ox/oracleidentitycloudservice/<email>`. The password is the auth token you generated.

3. Create a container regsistry in Oracle and note the name.
4. Build docker image using tag format required for the container registry, and using the appropriate Dockerfile for production or development compartments. For the development `docker build -f Dockerfile.staging -t lhr.ocir.io/lrrho0j0b1ox/orqa-client:latest .` and for production `docker build -f Dockerfile.production -t lhr.ocir.io/lrrho0j0b1ox/orqa-client-production:latest .`

4. Push to registry: `docker push lhr.ocir.io/lrrho0j0b1ox/orqa-client:latest` or `docker push lhr.ocir.io/lrrho0j0b1ox/orqa-client-production:latest`
  
If you already have a container instance set up based on the container registry you pushed, then you will need to restart that container. If you do not, see below instructions for creating one.
Longer term, look at putting in a github action, this might help: https://github.com/oracle-actions/login-ocir 

#### Creating a Container Instance

In the Oracle Cloud web interface select Container Instances, check that you are in the correct compartment (i.e. production or development) and then click create. Ensure you are in the correct VCN and in the public subnet. 
When you get to selecting a container image, the images you have pushed to the container registry should show up. If they do not then check they are in the correct compartment. If you have issues with permissions then the container registery can be changed from private (default) to public. There are no environment variables needed for this client. 

To ensure that your container instance is working, you can view logs by navgating to the container instance page, then in the left hand menu under 'Resources' select containers, and click on the container you have just created. Under 'more actions' you can select to 'view logs'.

The container will have a public IP address associated with it. Go to the IP in your browser to view the client.

## Usage

Staging: http://132.145.25.173/ or http://transplant-dev.orqa.uk
Production: http://132.145.25.210/ or http://transplant.orqa.uk 

## Roadmap

- [x] Initial Research  
- [x] Minimum viable product 
- [ ] Alpha Release  
- [ ] Feature-Complete Release  

## Contributing

### Main Branch
Protected and can only be pushed to via pull requests. Should be considered stable and a representation of production code.

### Dev Branch
Should be considered fragile, code should compile and run but features may be prone to errors.

### Feature Branches
A branch per feature being worked on.

https://nvie.com/posts/a-successful-git-branching-model/

## License

## Citiation

Please cite the associated papers for this work if you use this code:

```
@article{xxx2021paper,
  title={Title},
  author={Author},
  journal={arXiv},
  year={2021}
}
```


## Acknowledgements
This work was funded by a grant from the UK Research Councils, EPSRC grant ref. EP/L012345/1, “Example project title, please update”.







