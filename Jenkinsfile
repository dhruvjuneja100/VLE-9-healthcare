
pipeline {
    agent any

    tools {
        // SonarScanner is already installed on the EC2 machine.
    }

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
                        sonar-scanner
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
