# Manual-Text-Annotation
Inspired by https://github.com/chakki-works/doccano, this app is an attempt to build a useful tool that supports human annotation for sentiment analytics in the MERN (Mongodb-Express-Reactjs-Nodejs) stack way.It is also my internship's project from which i learned a lot not just absorbing languages but also paying attention to the program's structure and keeping my code as clean as possible.Here is all my knowledge i gained from this experience including materials, personal notes, futher reading and all sort of prolem you might encounter.I decided to share it as a way to revise myself and hopefully, you find it helpful.

## Table of contents
* [The CLEAN Architecture](the-clean-architecture) 
## 1. The CLEAN Architecture 
Here is an overview of the CLEAN architecture from the author website: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html 
![Clean Architecture overview](./images/CleanArchitecture.jpg)

I strongly recommend you to read more details in Uncle Bob's website in order to get the whole picture.However, I'm going to give your some of my personal experiences through practicing it below: 
* First, Brief introduction about each layer: 
	* Entities (or Domain): Bussiness objects.
	* Usecase             : Relationships between entities
	* Interfaces (or deliveries) : A bridge bettween Technologies and Business rules
	* Infrastructure: Technologies details that you use. for example: what framework, what database,what UI,...    
* Second, you may notice the arrows pointing inwards towards the middle of every circle.It represents for something called `Dependency rules`.Basically, the rule tells us that changes in the outer layer do not affect the inner layer at any cost or the outer layer depends on the inner layer and not in return.
