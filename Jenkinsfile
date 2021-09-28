pipeline {
    agent any
    options {
        buildDiscarder logRotator(daysToKeepStr: '5', numToKeepStr: '6')
    }

    stages {
        stage("Production") {
            when {
                branch 'production'
            }
            steps {
                echo 'Building the application...'
                sh 'rm -rf ./node_modules ./package-lock.json ./dist'
                sh 'scp -o stricthostkeychecking=no -r ./* deployer@kareemarafa.com:/var/www/api.kareemarafa.com/'
                sh 'ssh -o stricthostkeychecking=no deployer@kareemarafa.com "cd /var/www/api.kareemarafa.com && npm install && npm run build && pm2 restart production"'
            }
        }
    }

}
