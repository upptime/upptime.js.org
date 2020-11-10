---
title: Configuration
---

The `.upptimerc.yml` file is used as the central configuration for Upptime, with this syntax:

```yaml
owner: koj-co # GitHub username
repo: upptime # GitHub repository name
user-agent: koj-co
sites: # List of endpoints to track
  - name: Google
    url: https://www.google.com
assignees: # Users to assign downtime issues (optional)
  - AnandChowdhary
status-website: # Status website (optional)
  cname: upptime.js.org # Custom domain CNAME
  # baseUrl: /repo
  name: Upptime # Status website title
```

## Configuration options

### Repository

A GitHub repository is used as the "source of truth" for your uptime logs, and the static site uses the GitHub API and fetches data from this repository.

After you've created a new repository using this template (see [Creating a repository from a template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)), specify the username and repository name in the configuration:

```yaml
owner: koj-co
repo: upptime
```

### Endpoints

You can track as many websites as you like. Add the names and URLs of your endpoints in the sites key:

```yaml
sites:
  - name: Google
    url: https://www.google.com
  - name: DuckDuckGo
    url: https://duckduckgo.com
To make POST requests (or any other HTTP verb), you can add the method key:
```

```yaml
sites:
  - name: POST to Google
    url: https://www.google.com
    method: POST
  - name: DELETE Example
    url: https://example.com
    method: DELETE
```

If you don't want to show a URL publicly, you can use repository secrets (see [Creating and storing encrypted secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets)). Instead of the plain text URL, add the name of the secret prefixed with a $ character:

```yaml
- name: Secret Site
  url: $SECRET_SITE
```

In the above example, a secret named SECRET_SITE (without the $) is stored in the repository. You can add up to 10 additional secret sites, like `$SECRET_SITE_1`, `$SECRET_SITE_2`, `$SECRET_SITE_3`, etc.

You can also use these secrets as part of the URL, for example:

```yaml
- name: API endpoint
  url: https://example.com/get-user/3?api_key=$SECRET_SITE_2
```

Similarly, you can set headers in a request like so:

```yaml
- name: API endpoint
  url: https://example.com/get-user/3
  headers:
    - "Authorization: Bearer $SECRET_SITE_2"
    - "Content-Type: application/json"
```

### User agent

Requests made to the GitHub API must include a valid User-Agent header (see User Agent required). It is recommended to use your GitHub username here:

```yaml
user-agent: your-github-username
```

### Notifications

You can add services to send downtime notifications to. Currently, only Slack and Discord notifications are supported. For more information about notifications, visit the [Notifications docs](/docs/notifications) page:

```yaml
notifications:
  - type: slack
    channel: C01XQ3U9M9P
```

### Assignees

You can add members of your team to be assigned to every downtime issue:

```yaml
assignees:
  - AnandChowdhary
  - CarloBadini
```

If you want particular users to be assigned per-site, you can add assignees under each entry in sites:

```yaml
sites:
  - name: Google
    url: https://www.google.com
    assignees:
      - AnandChowdhary
```

### Branding

A static website with PWA is also generated, and you can customize the logo and name in the navbar:

```yaml
status-website:
  name: Upptime
  logoUrl: https://example.com/image.jpg
```

### Custom domain

If you want to add a custom domain, you can add the cname key:

```yaml
status-website:
  name: Upptime
  logoUrl: https://example.com/image.jpg
  cname: upptime.js.org # Custom CNAME
```

If you're not using a custom domain, you should add the base URL to support the default GitHub Pages URL.

```yaml
status-website:
  baseUrl: /repo # where "repo" is your repository name
  name: Your Status Website
```

Then, your status page may be hosted on https://user.github.io/repo/, where `user` is your GitHub username and `repo` is your repository name.

### Navbar links

You can customize the navbar by adding or removing top-level navigation links.

```yaml
status-website:
  navbar:
    - title: Status
      href: /
    - title: GitHub
      href: https://github.com/$OWNER/$REPO
```

### Intro text

Optionally, you can add some introductory text to the website. You can use Markdown:

```yaml
status-website:
  introTitle: "**Upptime** is the open-source uptime monitor and status page, powered entirely by GitHub."
  introMessage: This is a sample status page which uses **real-time** data from our [Github repository](https://github.com/koj-co/upptime). No server required — just GitHub Actions, Issues, and Pages.
```

### Site deployment

Because GitHub Pages does not support the default `GITHUB_TOKEN` available to workflows, you'll have to set a secret GH_PAT with a Personal Access Token. For more info, see: https://github.com/maxheld83/ghpages#secrets.

### Internationalization

Though our status page is in English, you can use any language with Upptime by supplying the required strings. The list of all required strings is available in site/i18n.yml, and you can add them under the i18n key in the configuration file:

```yaml
i18n:
  activeIncidents: Incidentes activos
  allSystemsOperational: Todos los sistemas están operativos
  # ...
```

### Repository metadata

If you've just set up your new repository and don't have repository metadata (like description, topics, and homepage), Upptime will update that for you. It will update the metadata as follows:

- **Description:** "📈 Uptime monitor and status page for $TITLE, powered by @upptime", where $TITLE is the name of your GitHub organization or user
- **Topics:** "uptime-monitor", "status-page", "upptime"
- **Homepage:** Link to your status website

You can add these configuration properties if you don't want these updates to occur:

```yaml
skipDescriptionUpdate: true
skipTopicsUpdate: true
skipHomepageUpdate: true
```

### Git commit options

Upptime commits to git history to keep a track of response times, and also commits graphs and README updates. You can change the commit messages for each of these actions:

```yaml
commitMessages:
  readmeContent: ":pencil: Update summary in README [skip ci] [upptime]"
  summaryJson: ":card_file_box: Update status summary [skip ci] [upptime]"
  statusChange: "$EMOJI $SITE_NAME is $STATUS ($RESPONSE_CODE in $RESPONSE_TIME ms) [skip ci] [upptime]"
  graphsUpdate: ":bento: Update graphs [skip ci] [upptime]"
```

By default, these commits are done by [Upptime Bot](https://github.com/upptime-bot), but you can overwrite these commits to use your bot instead.

```yaml
commitMessages:
  commitAuthorName: "Upptime Bot"
  commitAuthorEmail: "upptime@koj.co"
```
