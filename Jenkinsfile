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
                git 'https://github.com/ranazrad/simple-webapp-nodejs.git'
            }
        }
        stage('Install') {
            steps {
                nodejs('node8') {
                    script {
                        if (isUnix()) {
                            sh "npm install"
                        }
                        else {
                            bat "npm install"
                        }
                    }
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
        stage('Deploy-Test-Env') {
            steps {
                nodejs('node8') {
                    //sh "npm run start"
                    //sleep(60)
                    sh "echo hello world!"
                }
                //sh "cat README.md"
            }
        }
    }
}
