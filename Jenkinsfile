podTemplate(
    label: label, 
    containers: [
        containerTemplate(
            name: 'node',
            image: 'node:18.16.1-bullseye-slim',
            ttyEnabled: true,
            command: 'cat'
        )
    ]
  )

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

        // stage('Build') {
        //     steps {
        //         container('node8') {
        //             sh "docker build . -f Dockerfile -t sample-webapp-nodejs:$(git rev-parse --short HEAD)"
        //         }
        //     }     
        // }

        stage('Test') {
            steps {
                container('node') {
                    sh "npm install"
                    sh "npm run test"
                }
            }
        }

        // stage('Push Artifacts'){
        //     stage('Build') {
        //         sh "docker push sample-webapp-nodejs:$(git rev-parse --short HEAD)"
        //     }
        // }
    }
}
