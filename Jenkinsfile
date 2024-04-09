pipeline {
     
      agent any
      
      environment {
      
       IMAGE_TAG= "second:latest"
       CONTAINER_NAME= "second-container"
       KUBECONFIG = '/var/lib/jenkins/.kube/config'
       }

    stages {
 
   stage('build') {

         steps {
     
          sh "docker build -t $IMAGE_TAG . "
          sh "docker push $IMAGE_TAG"
            } }
  stage('deploy') {

         steps {

                 sh "kubectl apply -f "deploy.yaml"
                 sh "kubectl apply -f "service.yaml"
                 
          
               }  }
   stage('start app') {
            steps {
                script {
                   
                    retry(3) {
                        try {
                            sh "minikube service first-app-service"
                        } catch (Exception e) {
                            echo "Command failed. Retrying in 30 seconds..."
                            sleep 30
                            throw e
                        }
                    }
                }
            }
        }    

         }

     }
