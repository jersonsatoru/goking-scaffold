node {
  def app
  def app_name = "starbem-api"
  def git_url = "starbem-api.git"
  def port = 3000

  node('homolog-starbem') {
    stage('Git Clone Repository') {
      git branch: 'homolog',
      credentialsId: 'jenkins',
      url: "git@github.com:gok-dev/${git_url}"
    }

    stage('Build in Homolog') {
      app = docker.build("${app_name}")
    }

    stage('Deploy in Homolog') {
      sh "docker rm -f ${app_name}_homolog"
      sh "docker run --env-file ../.env --restart=always -itd -p ${port}:3000 --name ${app_name}_homolog ${app_name}"
    }
  }

  stage('Promote to Prod') {
    userInput = input(id: 'Proceed1', message: 'Promote to production?', parameters: [])
  }

  node('production-starbem') {
    stage('Git Clone Repository') {
      git branch: 'master',
      credentialsId: 'jenkins',
      url: "git@github.com:gok-dev/${git_url}"
    }

    stage('Build in Prod') {
      app = docker.build("${app_name}")
    }

    stage('Deploy in Prod') {
      sh "docker rm -f ${app_name}_production"
      sh "docker run --env-file ../.env --restart=always -itd -p ${port}:3000 --name ${app_name}_production ${app_name}"
    }
  }


}
