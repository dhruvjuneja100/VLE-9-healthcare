pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Healthcare Application'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies'
                sh 'npm ci'
            }
        }

        stage('Automated Tests') {
            steps {
                echo 'Running automated API tests'
                sh 'npm test'
            }
        }

        stage('Code Coverage') {
            steps {
                echo 'Generating code coverage report'
                sh 'npm run test:coverage'
            }
        }

        stage('SAST - SonarQube Analysis') {
            steps {
                echo 'Starting SonarQube security analysis'

                withSonarQubeEnv('SonarQube') {
                    sh '/usr/local/bin/sonar-scanner'
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
