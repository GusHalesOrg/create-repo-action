# Create Repo Action
This is a fork of https://github.com/repo-ctrl/create-repo-action, main difference is that this creates a repo from a template

This action will create a repository in the namespace of the calling workflow. 

For example, if this action is called from `DemoOrg` , the repo will be created in `DemoOrg`.
If a GitHub user calls this from a personal repository, the repo will be created in the users workspace.

## Inputs:

`repo-name`: Name of the repository

`repo-description`: Description of the repository

`template-name`: Template that will be used for repo creation

`org-admin-token`: Org admin token with `repo` and `admin:org` scope

## Outputs:

`repo-url`: URL of the newly created repo. Blank if error.

## Demo Workflow:

### Secrets needed:

Create a Personal Access Token with relevant scopes and save it as a Repo Secret - `ORG_ADMIN_TOKEN`

```
name: Create Repo
on: 
  workflow_dispatch:
    inputs:
      repo-name: 
        description: 'Name of the repository to be created'
        required: true
        default: ''
      repo-description:
        description: 'Description of the repository to be created'
        required: false
        default: ''
      template-name:
        description: 'Name of the template to use for the repository creation'
        required: true
        default: ''

jobs:
  create-repository:
    runs-on: ubuntu-latest
    name: Creating Organization Repository
    steps:
      - name: Use Node.js
        uses: actions/setup-node@v2
      - name: Creating GitHub Organization Repository
        uses: GusHalesOrg/create-repo-action@main 
        id: create-repo
        with:
          repo-name: '${{ github.event.inputs.repo-name }}'
          repo-description: '${{ github.event.inputs.repo-description }}'
          template-name: '${{ github.event.inputs.template-name }}'
          org-admin-token: '${{ secrets.ORG_ADMIN_TOKEN }}'
      - name: Log URL to the repo
        run: echo "The new repo is ${{ steps.create-repo.outputs.repo-url }}" >> $GITHUB_OUTPUT
```
