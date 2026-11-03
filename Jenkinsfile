
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Healthcare Application'
                checkout scm
            }
        }

        stage('SAST - SonarQube Analysis') {
            steps {
                echo 'Starting SonarQube security analysis'

                withSonarQubeEnv('SonarQube') {
                    sh '''
                        /usr/local/bin/sonar-scanner
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Healthcare DevSecOps pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Please check the console output.'
        }
    }
}
