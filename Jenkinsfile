pipeline {
    agent any
    
    environment {
        IMAGE_TAG = "karthikvangari/second:latest"
        CONTAINER_NAME="second-container"
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
 }
    
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t $IMAGE_TAG .'
            }
        }
        
        
       stage('push'){
              
           steps {

            sh "docker login -u karthikvangari -p Karthik@9666"
            sh "docker push  $IMAGE_TAG"
}

    }
     
            stage('Deploy') {
            steps {
                script {
                    
                        sh 'kubectl apply -f deploy.yaml'
                        sh 'kubectl apply -f service.yaml'
                  
                }
            }
        }
        
        stage('Open URL') {
            steps {
                script {
                    sleep 40
                    def serviceIP = sh(script: 'minikube service best-price-service --url', returnStdout: true).trim()
                    echo "Service URL: ${serviceIP}"
                   
                }
            }
        }
    }
}
