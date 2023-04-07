const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const targetRepoName = core.getInput('repo-name');
const ghToken = core.getInput('org-admin-token');
const targetOrgName = github.context.payload.repository.owner.login;
const targetRepoDescription = core.getInput('repo-description');
const templateName = core.getInput('template-name')

var createRepoData = JSON.stringify(
  {
    "owner":targetOrgName,
    "name":targetRepoName,
    "description":targetRepoDescription,
    "private":true,
    "include_all_branches": false
  }
);

var config = {
  method: 'post',
  url: 'https://api.github.com/repos/'+targetOrgName+'/'+templateName+'/generate',
  headers: { 
    'Accept': 'application/vnd.github.v3+json', 
    'Authorization': 'token '+ghToken, 
    'Content-Type': 'application/json'
  },
  data : createRepoData
};

axios(config)
.then(function (response) {
  console.log("Repo "+targetRepoName+' created successfully!');
  core.setOutput("repo-url", "https://github.com/"+targetOrgName+"/"+targetRepoName);
})
.catch(function (error) {
  core.setOutput("repo-url", "");
  core.setFailed(error.message);
});