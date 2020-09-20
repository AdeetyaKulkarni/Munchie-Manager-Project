# MunchieManager
Senior Capstone Project

#### Prereqs to download and install -


-Install VSCode - https://code.visualstudio.com/download  
-Install Eclipse/Netbeans/... - For Java IDE and Java  
-Install NodeJS & npm - https://www.npmjs.com/get-npm  
-Install Angular CLI - https://cli.angular.io/  
-Install PostgreSQL - https://www.postgresql.org/download/  
-Install Git Bash - https://git-scm.com/downloads  


#### To set up the project - 

###### For setting the project environment 
- Create a folder on your local computer
- In the folder open git bash and run the commands
```
git clone 'https://github.com/AdeetyaKulkarni/MunchieManager.git'
cd MunchieManager
```

###### To run/host angular locally 
-Run this command and entry point will be served on http://localhost:4200/
```
cd MunchieManagerFE
ng serve
```

###### To run/host Spring-Tomcat locally
-Open the folder proj in a IDE  
-Run the project  
-After successfull execution it should be available on - http://localhost:8080/  


***

### Working with Angular

To create a new component 
```
ng g c Component_Name
```

To create a new service
```
ng g service Service_Name
```

##### Component
- Create the component using ng g c  
- Add the component path in app-routing.module.ts
- Each file has 3 components  
1) HTML  
2) CSS  
3) TS  

##### Service
- Create the service using ng g service  
- We use service to call the api we build in the backend  
- In the service we define the api-call  
- In the module we call the service-function  


***


### Working with Spring Boot



