pipeline {
     
      agent any
  
    stages {
 
   stage('build') {

         steps {
     
          sh 'docker build -t second:latest . '
          sh 'docker run -it second'
            }
}
}
}
