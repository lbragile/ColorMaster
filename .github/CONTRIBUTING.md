# 🙌 ColorMaster Contribution Policy

## 😍 Contributing

When contributing to this repository, please first discuss the change you wish to make via an issue, email (lbragile.masc@gmail.com),
or direct GitHub message before making a change. This will ensure that your changes have a high likely hood of being approved.
You can find a list of features that need to be integrated into ColorMaster at [Projects > Todo](https://github.com/lbragile/ColorMaster/projects/2).
This list is great for anyone who wants to contribute features from minor (low priority) to major (high priority) that ColorMaster users indicated they would like to see in future iterations.

## 🧨 Reporting Issues

See the provided [bug](./ISSUE_TEMPLATE/bug_report.md) or [feature](./ISSUE_TEMPLATE/feature_request.md) templates.

## 🔃 Pull Requests

A list of existing pull requests can be found [here](https://github.com/lbragile/ColorMaster/pulls).

### 🆕 First Time?

If this is your first time contributing to a project, please see the following step by step [guide](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/).

#### In general

1. Fork the repository by clicking the **Fork** button at the top right of the GitHub repository page

2. If you already have the repository locally, make sure you are on the **master** branch (`git checkout master`) and pull remote changes to be up-to-date: `git pull origin master`

3. Create a branch corresponding to the issue `git checkout -b issue-xx-title-separated-by-dashes

4. Make changes, stage (`git add .`), commit (`git commit -m "description of changes"`)

5. Repeat step 4. until you are ready to push to remote.

6. Push to remote with `git push -u origin head` (-u flag connects the remote to your local branch, so next time you can just do `git push` and `git pull`).

7. Go to the [remote repository](https://www.github.com/lbragile/ColorMaster) and use the prompts to [create a pull request](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

### 📋 Process

1. Update the [README.md](../README.md) file with details of changes you've made. Be as detailed as possible. Further explanation of reasoning/logic that does not fit in the README file, should go as a comment in the Pull Request.
2. Adjust the version number in `manifest.json` using the [SemVer](https://semver.org/) versioning scheme.
3. Continuous Integration (CI) is added to automate the PR process. Make sure you have tested your added functionality to ensure code coverage thresholds are met. Otherwise, your PR will be automatically rejected.
4. Once your PR passes the CI check and is reviewed, the reviewer will either accept it as is (and merge it in) or ask you to make corrections.
