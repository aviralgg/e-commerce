pipeline {

    agent any

    environment {
        PORT = "8000"
        CORS_ORIGIN = "*"
        ACCESS_TOKEN_EXPIRY = "1d"
        REFRESH_TOKEN_EXPIRY = "10d"

        MONGODB_URI = credentials('MONGODB_URI')
        ACCESS_TOKEN_SECRET = credentials('ACCESS_TOKEN_SECRET')
        REFRESH_TOKEN_SECRET = credentials('REFRESH_TOKEN_SECRET')
        CLOUDINARY_CLOUD_NAME = credentials('CLOUDINARY_CLOUD_NAME')
        CLOUDINARY_API_KEY = credentials('CLOUDINARY_API_KEY')
        CLOUDINARY_API_SECRET = credentials('CLOUDINARY_API_SECRET')
    }

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
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t e-commerce .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop ecommerce || true
                docker rm ecommerce || true
                docker run -d \
                --name ecommerce \
                -p 8000:8000 \
                e-commerce:latest
                '''
            }
        }

    }

}