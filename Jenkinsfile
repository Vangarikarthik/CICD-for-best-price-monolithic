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
                    retry(5) {
                        sh 'kubectl apply -f deploy.yaml'
                        sh 'kubectl apply -f service.yaml'
                        
                        def serviceStatus = sh(script: 'kubectl get svc best-price-service', returnStdout: true).trim()
                        if (serviceStatus.contains('pending')) {
                            echo 'Service is still pending. Retrying in 30 seconds...'
                            sleep 30
                            error 'Service not available yet'
                        }
                    }
                }
            }
        }
        
        stage('Open URL') {
            steps {
                script {
                    def serviceIP = sh(script: 'minikube service best-price-service --url', returnStdout: true).trim()
                    echo "Service URL: ${serviceIP}"
                   
                }
            }
        }
    }
}
