pipeline {
    agent { label "docker" }
    stages {
        stage('Initialize') {
            steps {
                cleanWs()
            }
        }
        stage('Get SCM') {
            steps {
                git branch: 'develop', url: 'https://github.com/ranazrad/simple-webapp-nodejs.git'
            }
        }
        stage('Build') {
            steps {
                nodejs('nodejs') {
                    sh "npm install"
                }
            }
        }
        stage('Test') {
            steps {
                nodejs('nodejs') {
                    sh 'npm run test'
                }
            }
        }
        stage("Deploy") {
            steps {
                sshagent(['ec2-user']) {
                    sh "ssh -o StrictHostKeyChecking=no ec2-user@34.220.147.36 rm -rf deployment"
                    sh "ssh -o StrictHostKeyChecking=no ec2-user@34.220.147.36 mkdir deployment"
                    sh "scp -o StrictHostKeyChecking=no -r * ec2-user@34.220.147.36:deployment"
                    sh "ssh -o StrictHostKeyChecking=no ec2-user@34.220.147.36 sh deployment/execute_webapp.sh &"
                }
            }
        }
        stage("Finished") {
            steps {
                sleep(60)
            }
        }
    }
}
