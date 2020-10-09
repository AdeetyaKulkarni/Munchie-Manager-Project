# MunchieManager
Senior Capstone Project

#### Prereqs to download and install -


- Install VSCode - https://code.visualstudio.com/download  
- Install Eclipse/Netbeans/... - For Java IDE and Java  
- Install NodeJS & npm - https://www.npmjs.com/get-npm  
- Install Angular CLI - https://cli.angular.io/  
- Install PostgreSQL - https://www.postgresql.org/download/  
- Install Git Bash - https://git-scm.com/downloads  


#### To set up the project - 

###### For setting the project environment 
- Create a folder on your local computer
- In the folder open git bash and run the commands
```
git clone 'https://github.com/AdeetyaKulkarni/MunchieManager.git'
cd MunchieManager
```

###### To run/host angular locally 
- Run this command and entry point will be served on http://localhost:4200/
```
cd MunchieManagerFE
ng serve
```

###### To run/host Spring-Tomcat locally
- Open the folder proj in a IDE  
- Run the project  
- After successfull execution it should be available on - http://localhost:8080/  


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

1) Open preferred IDE for Java  
2) Import project/ Import existing maven project  
3) Select folder MunchieManagerBE    
4) The project is divided into 4 parts    
  - com.project.MunchieManagerBE - Main method of the application  
  - com.project.MunchieManagerBE.Controllers  - Contains all the apis    
  - com.project.MunchieManagerBE.Beans - Contains the class/objects  
  - com.project.MunchieManagerBE.DBRepos - Contains sql queries embedded in java methods   
5) Run the project and check if Controller is working by navigating to localhost:8080/test  
6) In postgres create a database called *munchiedb*  
7) Re-run the project  
8) Enter some data manually in the name table in the database.  
9) Navigate to localhost:8080/checkdb  
10) If you see the entered data everything is fine.  
***


### Working with postgreSQL database (local)

##### Importing a prefilled database:
- create a database munchiedb in psql (CREATE DATABASE munchiedb;)
- run psql -U postgres munchiedb < munchiedb.psql

##### Exporting a database for others to see:
- run pg_dump -U postgres munchiedb > munchiedb.psql
- git add .
- git commit -m "Whatever change has happened mention here"

##### Interacting with the database:
- Make sure PSQL is running
  - Go to terminal/cmd 
  - Enter psql -U postgres
  - password : Enter your password here
  - enter \c munchiedb
  - now you can interact with the DB with SQL commands


##### GIT PROTOCOL
- git checkout dev (Switches branch to dev)  
- Simple changes (Not working updates)  
git add .  
git commit -m "Still remaining xyz"  

- Final changes (Everything working and ready to push to remote)
git add .  
git commit -m "XYZ WORKING"  
git push origin dev  

- Merging
Compare all the differences   
git checkout master  
git merge dev  







