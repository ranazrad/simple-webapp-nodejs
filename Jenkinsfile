pipeline {
    agent {
        kubernetes {
            defaultContainer 'kaniko'
            yaml '''
kind: Pod
spec:
  containers:
  - name: node
    image: node:18.16.1-bullseye-slim
    imagePullPolicy: Always
    command:
    - sleep
    args:
    - 99d
  - name: kubectl
    image: portainer/kubectl-shell:latest-v1.21.1-amd64
    imagePullPolicy: Always
    command:
    - sleep
    args:
    - 99d 
    volumeMounts:
    - name: kubeconfig
      mountPath: /.kube
    env:
    - name: "KUBECONFIG"
      value: "/.kube/config"
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    imagePullPolicy: Always
    command:
    - sleep
    args:
    - 99d
    volumeMounts:
    - name: docker-registry-config
      mountPath: /kaniko/.docker
  volumes:
    - name: docker-registry-config
      secret:
        secretName: docker-registry-config
        optional: true 
        items:
          - key: .dockerconfigjson
            path: config.json
    - name: kubeconfig
      secret:
        secretName: kubeconfig
        optional: true 
        items:
          - key: config
            path: config
    '''
    }
}
    stages {
        stage('SCM Checkout') {
            steps {
                checkout scmGit(branches: [[name: '**']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/4m3ndy/simple-webapp-nodejs']])
            }
        }

        stage('Test') {
            steps {
                container('node') {
                    sh "npm install"
                    sh "npm run test"
                }
            }
        }

        stage('Build'){
          steps {
            container('kaniko') {
                sh "/kaniko/executor -c `pwd` --dockerfile=Dockerfile --no-push --cache=true --destination=4m3ndy/sample-webapp-nodejs:${GIT_COMMIT[0..7]}"
            }
          }
        }

        stage('Push'){
          when {
            branch 'master'
          }
          steps {
            container('kaniko') {
                sh "/kaniko/executor -c `pwd` --dockerfile=Dockerfile --cache=true --destination=4m3ndy/sample-webapp-nodejs:${GIT_COMMIT[0..7]}"
            }
          }
        }

        stage('Deploy'){
          when {
            branch 'master'
          }
          steps {
            container('kubectl') {
                sh "kubectl apply -R -f ./kubernetes"
            }
          }
        }
    }
}
