# OrQA Image Grading Client
Angular client for grading training data for the OrQA project. 

## About

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin ante at eleifend eleifend. Sed non vestibulum nisi. Aliquam vel condimentum quam. Donec fringilla et purus at auctor. Praesent euismod vitae metus non consectetur. Sed interdum aliquet nisl at efficitur. Nulla urna quam, gravida eget elementum eget, mattis nec tortor. Fusce ut neque tellus. Integer at magna feugiat lacus porta posuere eget vitae metus.

Curabitur a tempus arcu. Maecenas blandit risus quam, quis convallis justo pretium in. Suspendisse rutrum, elit at venenatis cursus, dolor ligula iaculis dui, ut dignissim enim justo at ligula. Donec interdum dignissim egestas. Nullam nec ultrices enim. Nam quis arcu tincidunt, auctor purus sit amet, aliquam libero. Fusce rhoncus lectus ac imperdiet varius. Sed gravida urna eros, ac luctus justo condimentum nec. Integer ultrices nibh in neque sagittis, at pretium erat pretium. Praesent feugiat purus id iaculis laoreet. Proin in tellus tristique, congue ante in, sodales quam. Sed imperdiet est tortor, eget vestibulum tortor pulvinar volutpat. In et pretium nisl.

### Project Team
Colin Wilson, Newcastle upon Tyne Hospitals NHS Foundation Trust  ([lcolin.wilson6@nhs.net](mailto:lcolin.wilson6@nhs.net))    

### RSE Contact
Kate Court
RSE Team  
Newcastle University  
([kate.court@newcastle.ac.uk](mailto:kate.court@newcastle.ac.uk)) 

## Built With

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Getting Started

### Prerequisites

Install Angular: `npm install -g @angular/cli`.


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

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Deployment

### Local

Deploying to a production style setup but on the local system. Examples of this would include `venv`, `anaconda`, `Docker` or `minikube`. 

### Production

#### Pushing a container instance to Oracle Cloud


1. Generate an auth token
https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsgenerateauthtokens.htm 

2. Log into docker with oracle creds:
https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionslogintoocir.htm

`docker login lhr.ocir.io`

username in this format lrrho0j0b1ox/oracleidentitycloudservice/kate.court@ncl.ac.uk
password is from the auth token you generated

3. build docker image using tag format required br container registry

`docker build -t lhr.ocir.io/lrrho0j0b1ox/orqa-containers/orqa-client:latest .`

4. push to registry

`docker push lhr.ocir.io/lrrho0j0b1ox/orqa-containers/orqa-client:latest`

NB: We then had to move to the development compartment as this appeared in root
- check on the Oracle cloud whether the container has been pushed to the correct
  compartment. It is easily moved using the UI if not.
  
If you already have a container instance set up based on the container registry you pushed, then you will need to restart that container. If you do not, see below instructions for creating one.
Longer term, look at putting in a github action, this might help: https://github.com/oracle-actions/login-ocir 

#### Creating a Container Instance

In the Oracle Cloud web interface select Container Instances, check that you are in the correct compartment (i.e. production or development) and then click create. Ensure you are in the correct VCN and in the public subnet. 
When you get to selecting a container image, the images you have pushed to the container registry should show up. If they do not then check they are in the correct compartment. If you have issues with permissions then the container registery can be changed from private (default) to public. There are no environment variables needed for this client. 

To ensure that your container instance is working, you can view logs by navgating to the container instance page, then in the left hand menu under 'Resources' select containers, and click on the container you have just created. Under 'more actions' you can select to 'view logs'.

The container will have a public IP address associated with it. Go to the IP in your browser to view the client.

## Usage

Any links to production environment, video demos and screenshots.

## Roadmap

- [x] Initial Research  
- [ ] Minimum viable product <-- You are Here  
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







