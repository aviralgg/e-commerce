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
                withCredentials([
                    string(credentialsId: 'PORT', variable: 'PORT'),
                    string(credentialsId: 'MONGODB_URI', variable: 'MONGODB_URI'),
                    string(credentialsId: 'CORS_ORIGIN', variable: 'CORS_ORIGIN'),
                    string(credentialsId: 'ACCESS_TOKEN_SECRET', variable: 'ACCESS_TOKEN_SECRET'),
                    string(credentialsId: 'ACCESS_TOKEN_EXPIRY', variable: 'ACCESS_TOKEN_EXPIRY'),
                    string(credentialsId: 'REFRESH_TOKEN_SECRET', variable: 'REFRESH_TOKEN_SECRET'),
                    string(credentialsId: 'REFRESH_TOKEN_EXPIRY', variable: 'REFRESH_TOKEN_EXPIRY'),
                    string(credentialsId: 'CLOUDINARY_CLOUD_NAME', variable: 'CLOUDINARY_CLOUD_NAME'),
                    string(credentialsId: 'CLOUDINARY_API_KEY', variable: 'CLOUDINARY_API_KEY'),
                    string(credentialsId: 'CLOUDINARY_API_SECRET', variable: 'CLOUDINARY_API_SECRET')
                ]) {
                    sh 'npm start'
                }
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