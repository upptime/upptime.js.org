---
title: Triggers
---

By default, uptime is checked every 5 minutes and response time graphs and endpoints are updated every 24 hours. You can also manually trigger an update, for example after setting up your repository. Manual triggers are powered by workflow triggers on GitHub Actions.

## Available workflows

Upptime has several workflows that are run on different intervals, all of which you can also manually trigger:

### Setup CI

This workflow is triggered after you edit the configuration file, and runs alls steps: checking uptime, tracking response time, updating the README, and generating graphs. If you want to "force" Upptime to run everything once (for example, after you've set up the template or after you've made a configuration change), you can manually trigger Setup CI.

### Uptime CI

This workflow runs once every 5 minutes and checks if your websites are up. If they are down, it creates a new issue in your repository. This same workflow also closes any issues after your websites have come back up. If you want to manually make sure that all your endpoints are currently up, you can trigger this workflow.

### Update Template CI

This workflow runs once a week and updates the internal code of Upptime to make sure you're always on the latest version. This is important because Upptime is still in development and may include new design updates and feature changes including important security updates.

### Static Site CI

This workflow builds and deploys your status page website using GitHub Pages. It reads from your configuration and builds the Svelte/Sapper website, then deploys is to the `gh-pages` branch and triggers a re-build on GitHub Pages. By default, this runs once every week, but you can manually run it, for example after updating your configuration or setting up the template.

### Graphs CI

This workflow runs once every day and generates response time graphs from the recorded data. These PNG images are stored in the `graphs` directory and embedded on the project's README. You can manually run this to regenerate those images.

### Response Time CI

This workflow records the reponse time of each endpoint and commits it to git history, which is why it runs once every day. You can manually trigger it if you want to record the response time manually.

### Summary CI

This workflow also runs once every day and updates the README of your project with a summary of the response times and generated graphs. You can manually trigger it to update your project's README.md file.

## Manual triggers

To manually trigger an update, you can use the GitHub UI or API.

### Using the GitHub UI

First, click on the "Actions" tab of your GitHub repository. You will reach the URL https://github.com/user/repo/actions, where `user` is your GitHub username and `repo` is the name of the repository.

On the left sidebar under "Workflows", click on the workflow you want to trigger, for example "Setup CI":

![Screenshot of Workflows tab](https://user-images.githubusercontent.com/2841780/97270440-2c553300-1855-11eb-9388-4a4d007aad0a.png)

You will see the message "This workflow has a `workflow_dispatch` event trigger.". Click on the "Run workflow" button on the right. Keep the default branch select and click on "Run workflow":

![Screenshot of the dispatch event](https://user-images.githubusercontent.com/2841780/97270513-4e4eb580-1855-11eb-92ef-ad09780af797.png)

### Using the GitHub API

If you want to programmatically trigger updates, you can use the GitHub REST API's repository dispatch events by triggering an event in your repository called `setup`:

```bash
curl \
-X POST \
-H "Accept: application/vnd.github.v3+json" \
-H "Authorization: token {YOUR GITHUB TOKEN}" \
https://api.github.com/repos/{YOUR GITHUB USERNAME}/{YOUR UPPTIME REPO NAME}/dispatches \
-d '{"event_type":"setup"}'                                                                                                                   ```
To get your gitub token, simply go to settings -> Developer settings -> Personal access tokens -> generate new token

Type any note or name you wish, and set Expiration to anything you wish too (*I recommend make it never expire*) and in "Select scopes" select on *workflow* and generate your new token and save it somewhere safe


Or, with JavaScript ([@octokit/core.js](https://github.com/octokit/core.js)):

```js
await octokit.request("POST /repos/{owner}/{repo}/dispatches", {
  owner: "user",
  repo: "repo",
  event_type: "setup",
});
```

For more information, read this article on the GitHub website: [Create a repository dispatch event](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow).
