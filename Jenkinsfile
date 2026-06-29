pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Check Env') {
            steps {
                sh '''
                pwd
                ls -la
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm start'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t e-commerce .'
            }
        }

    }

}