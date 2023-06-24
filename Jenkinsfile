pipeline {
    agent any
    stages {
        stage('Initialize') {
            steps {
                cleanWs()
            }
        }
        stage('SCM Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/4m3ndy/simple-webapp-nodejs']])
            }
        }

        stage('Build') {
            steps {
                docker('node8') {
                    sh "docker build . -f Dockerfile -t sample-webapp-nodejs:"
                }
            }     
        }
        stage('Test') {
            steps {
                nodejs('node8') {
                    sh "npm run test"
                }
            }
        }
    }
}
