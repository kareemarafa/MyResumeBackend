pipeline {
    agent any
    options {
        buildDiscarder logRotator(daysToKeepStr: '5', numToKeepStr: '6')
    }

    stages {
        stage("Deploy to Production") {
            when {
                branch 'master'
            }
            steps {
                sh 'rm -rf ./node_modules ./package-lock.json ./dist'
                sh 'scp -o stricthostkeychecking=no -r ./* karafa@kareemarafa.com:/var/www/api.kareemarafa.com/'
                sh 'ssh -o stricthostkeychecking=no karafa@kareemarafa.com "cd /var/www/api.kareemarafa.com && npm install && npm run build"'
            }
        }
    }

}
