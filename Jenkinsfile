pipeline {
     
      agent any
  
    stages {
 
   stage('build') {

         script {
     
          sh 'docker build -t second:latest . '
          sh 'docker run -it second'
            }
}
}
}
