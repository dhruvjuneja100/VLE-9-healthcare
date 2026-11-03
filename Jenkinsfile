
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
                sh 'npm ci'
            }
        }

        stage('Automated Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Code Coverage') {
            steps {
                sh 'npm run test:coverage'
            }
        }

        stage('SAST - SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '/usr/local/bin/sonar-scanner'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t healthcare-app:v2 .'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                sh '''
                    trivy image \
                    --scanners vuln,misconfig,secret \
                    --severity HIGH,CRITICAL \
                    --exit-code 1 \
                    healthcare-app:v2
                '''
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

