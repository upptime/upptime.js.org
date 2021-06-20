---
title: Getting started
---

To use Upptime as an uptime monitor and status website generator, you start by creating a repository using the template on GitHub.

## Create a repository from the template

You can click on the following link to generate a repository using the template: [**Create a new repository**](https://github.com/upptime/upptime/generate) from `upptime/upptime`. Alternatively, you can visit the [Upptime repository on GitHub](https://github.com/upptime/upptime) and click on the "Use this template" button on the top-right. 

In both cases, the next steps are:

1. Enter a name for your new repository.
1. Important: Check "Include all branches".
1. Click on "Create repository from template".

For more details on how to create repositories using template, read the article on the GitHub website: [Creating a repository from a template](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

**Billing note:** Upptime uses thousands of build minutes every month (approximately 3,000 minutes in the default setting). If you use a public repository, GitHub offers unlimited free build minutes, but if you use a private repository, you'll have to pay for this time.

## After creating your repository

The following steps apply to your new repository, not the upptime/upptime template repository.

### Enable publishing

To get a static status website, you have to enable GitHub Pages on your new repository.

1. Go to your repository settings page
1. Go to the "Pages" sub-section on the left
1. Under "Source", change "None" to `gh-pages`
1. In the folder dropdown, select `/(root)`
1. Skip the "Theme Chooser" option 
1. Click on "Save"

After saving, you will see confirmation text "Your site is ready to be published at...". For more information on enabling GitHub Pages, see the article on the GitHub website: [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

If you don't want to have a publicly-available status website, you don't have to enable publishing. If that is the case, you can also choose to keep your repository private. It is **not** possible to publish a status website from a private repository without using an API proxy with authentication. See [#54](https://github.com/upptime/upptime/issues/54) and the [Configuration for `apiBaseUrl`](https://upptime.js.org/docs/configuration#custom-api-base-url) to learn how to set up a status website from your private repository.

### Add repository secrets

All sensitive information required, such as API keys, are provided as environment variables. These are stored as GitHub repository secrets (see [Creating and storing encrypted secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets)).

To make commits and publish your website, Upptime requires a personal access token (PAT) with the `repo` and `workflow` scope, stored as a repository secret `GH_PAT`. You can create a personal access token by following these steps:

1. Click on your profile picture on the top-right corner and select "Settings"
2. In the left sidebar, select "Developer settings"
3. In the left sidebar, click "Personal access tokens"
4. Click "Generate new token"
5. Select the "repo" and "workflow" scopes
6. Click "Generate token"

After generating your token, copy it (you will not see it again). Then, add it as a repository secret:

1. In your Upptime repository, select "Settings"
2. In the left sidebar, click "Secrets"
3. Press the button "New repository secret"
4. Enter the name of the secret as `GH_PAT`
5. Paste your personal access token into the Value field
6. Be sure there are no spaces before or after the token and/or linebreaks after your token
7. Save your PAT by selecting "Add secret"

For more information on PATs, read article on the GitHub website: [Creating a personal access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token).

### Update configuration

The `.upptimerc.yml` file is used as the central configuration store. In that file, you can specify which endpoints you want to monitor and configure your status website. For more information, visit [Configuration](/docs/configuration).

You can start by adding your endpoints under `sites`:

```yaml title=".upptimerc.yml"
owner: koj-co # GitHub username
repo: upptime # GitHub repository name
sites: # List of endpoints to track
  - name: Google
    url: https://www.google.com
assignees: # Users to assign downtime issues (optional)
  - AnandChowdhary
status-website: # Status website (optional)
  cname: upptime.js.org # Custom domain CNAME
  name: Upptime # Status website title
```

If you're not using a custom domain, you can remove the line starting with `cname:` and instead add the GitHub repository name:

```yaml
status-website:
  baseUrl: /repo # where "repo" is your repository name
  name: Your Status Website
```

Then, your status page may be hosted on https://user.github.io/repo/, where `user` is your GitHub username and `repo` is your repository name.

### Viewing GitHub Actions workflows

After updating the configuration file, Upptime should run workflows using GitHub Actions to update your `README.md` and generate API endpoints and graphs. To view the status, click on the "Actions" tab in your repository. You should see pending or complete workflows. If you don't, you can manually trigger the "Setup CI" using the [Triggers](/docs/triggers) article.

If you've forked the Upptime repository or have rules to disable Actions by default, you'll have to manually enable GitHub Actions, but this should probably not be your case.

### Best practices

Now that you have your Upptime instance fully set up, you should follow these best practices when adding details to outage incidents.

- Upptime will automatically open a new issue when an outage occurs
- If you haven't identified the cause of this outage, you can add a comment like: "**Investigating**: We're currently investigating the cause of this outage, and we'll update the details here shortly."
- Then, you can add some comments with the details of the outage, and change the name of the issue with the details of the outage
- The issue will be automatically closed when the site comes back up, so you can add a last comment with a postmortem of the outage
