pipeline {
     
      agent any
      
      environment {
      
       IMAGE_TAG= "second:latest"
       CONTAINER_NAME= "second-container"
       }

    stages {
 
   stage('build') {

         steps {
     
          sh "docker build -t $IMAGE_TAG . "
          
            } }
  stage('build') {

         steps {

          sh "docker stop $CONTAINER_NAME || true"
          sh "docker rm $CONTAINER_NAME || true"
          sh "docker run -d -t --name $CONTAINER_NAME -p 5001:5000 $IMAGE_TAG"
               }  }
         }

       
   }
