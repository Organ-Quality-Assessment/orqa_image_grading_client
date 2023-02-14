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

#### Creating a container instance on Oracle Cloud

NB: we have taken a different route of deploying on oracle for the moment, using
docker on a compute instance (VM) as there is currently no way of assigning a
static IP in advance for a container instance, which means we cannot know what
external url to assign to the environment variables, and unfortunately oracle
also does not allow retrospective altering of environment variables on contianer
instances.
That said, this may prove useful in future when static IPs are implemented for
container instances.

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

Longer term, look at putting in a github action, this might help: https://github.com/oracle-actions/login-ocir 
 
#### Deploying as a docker container in an Oracle Compute instance

Make sure you have VCN set up in advance, which will contain the strapi compute
instance, the database and the angular container instance.

1. Create a compute instance on the Oracle Cloud, ensuring it is inside the correct
compartment, and in the public subnet of the VCN. Generate or add an ssh key as
part of the creation.

2. Once created, select 'Quick Actions' from the left hand menu under the
Resources title, and set up the instance to access the internet.

3. Add the ssh key to your local .ssh folder 

4. Log into the instance from your local command line with `ssh -i
.ssh/ssh-key.key opc@<instance_IP>`

5. Once inside the instance, install git, yarn, node, docker and nvm (using yum,
assuming using an oracle linux base which is closest to CentOS).

6. Pull the strapi repo to the instance.

7. Build the docker container inside the repository directory using `sudo docker build -t orqa-strapi .`

8. Once built, run the docker container using `sudo docker run -p 1337:1337
--detach orq-strapi`

9. Check everything is working as intended by viewing the logs. First check the
instance ID with `sudo docker ps` then use the ID that shows up for the running
container to access the logs: `sudo docker logs -f <container_ID>`

10. You may need to disable the firewall if the web interface is not showing.
Check the firewall status with `sudo systemctl status firewalld`, if it is on
then you can turn it off with sudo `systemctl stop firewalld`.

#### Setting up the mysql database

The strapi instance needs a mysql database to connect to, and when deploying on
the cloud a mysql database will need to be created in the same VCN as the strapi
and angular containers.

1. Create a blank mysql database server using the Oracle Cloud web interface.
Ensure it is created inside the same VCN (private subnet is fine) and note the
admin login details that are created as part of the process. Select the
configuration file that ends with 'strapiauthentication'.

2. Log into the database either using the strapi compute instance or using the
Oracle Cloud Shell (launch from top bar under developer tools). For the compute
instance will first need to install mysqlsh. 
`mysqlsh <admin_username>@<mysql_server_IP>`
The mysql server IP can be found by checking the details of the mysql database
server on the Oracle Cloud web interface.

3. Once logged into the database server, you will then need to create the
database itself. `\sql CREATE DATABASE orqaDB`

4. We also need to create a new admin username that will be authenticated using
the mysql\_native\_password plugin. The strapiauthentication configuration file
will ensure that any new users will use the native plugin by default. To create
the new admin user, use: `\sql CREATE USER '<username>'@'<sql_server_IP>' IDENTIFIED
BY '<password>' DEFAULT ROLE 'administrator'`

5. Update the strapi environment variables to point to the database server IP, database
name and to the new admin username and password.



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







