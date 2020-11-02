**The University of Melbourne**
# COMP30022 – IT Project



## Documents:

Users Stories: [link](docs/UserStory.pdf)  
Motivational model: [link](docs/MotivationalModel.pdf)  
Personas: [link](docs/UseCases.pdf)  
Test cases: [link](tests/TestCases.pdf)  

## Description of key algorithms:

- Uploading algorithm:  
  There are two main steps in uploading algorithm: Stored the all files in uploading area into ours cache collection of databse and then move the submitted files from the cache to the User collection of database.
  
<p>
  <image src="image/cache.png" width="450" height="300" hspace="30" alt="Uploading area">
  <image src="image/cacheCollection.jpg" width="450" height="300" alt="Cache collection">
<p>                                                                                        

<p>
  <image src="image/submit.png" width="450" height="300" hspace="30" alt="Submitting">
  <image src="image/userSubmitted.png" width="470" height="200" alt="User collection">
<p> 

- Encoding algorithm:  
  Ours group used md5 encryption technology to encrypt user’s password and uploaded files. The md5 (Message digest 5) is an encryption function that allows you to generate 128 bits to "hash" any string as input.The reason that we used md5 encryption is that the encryption function is irreversible, you cannot get the original password only from the hash. For the encryption of uploaded files, we also use a “salt” to make hask more difficult to crack. We used md5 to encrypt the name of file and combine the hash with the bytes of the file.

    
- Search algorithm:  
  We used regular expression to make the search results more accurate. Administer can search User's information by any relatively letters of their email, student id, part name , usename and full name.

## Description of key classes and the application’s layers:

The following image sample shows the main function of our product.

- Register:  
<p align="center">
  <image src="image/register.png">
<p>


- Login:  
<p align="center">
  <image src="image/log in.png">
<p>
  
  
- User interface:  
  After logining successfully, the user interface will be as shown in the following image. 
<p align="center">
  <image src="image/user interface.png">
<p>
  
  
- Edit profile:  
  The user could edit their profile optionally like uploading avatar or adding self introduction. 
<p align="center">
  <image src="image/Upload avatar.png">
<p>  

- Upload artifact:  
  After filling the information needed to upload the artifact and clicking "submit", the user could add the artifact to any category they want.
<p align="center">
  <image src="image/upload artifact.png">
<p>  
  
- Category/Artifact management:  
  The user could manage category/artifact (adding or deleting). Besides, the user could also view or download artifacts which they uploaded before.
<p align="center">
  <image src="image/regulate category.png">
<p> 
  
- Sharable link:  
  The user could share the link of their homepage with anyone they like. After clicking the sharable link, the user's homepage will be as shown in the following image.
<p align="center">
  <image src="image/sharable link.png">
<p> 

- Administrator interface:  
<p align="center">
  <image src="image/administrator interface.png">
<p> 
  
- Search function:  
  The administrator could search for users by their email, student id, part name and full name. The corresponding results will be shown in the green box.
<p align="center">
  <image src="image/search function.png">
<p>
 
- Search result:  
  After clicking the result of search, the admistrator could visit the homepage of that user.
<p align="center">
  <image src="image/search Result.png">
<p>
  




## Description of the database structure:
The following file is the reference for database structure.  
related file: [link](image/LogicalView.pdf) 



## Developing Environment:
- JRE 11
- SpringBoot v 2.3.3
- npm/yarn
- MongoDB Atlas
- Heroku



