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
  - name: Bing
    url: https://www.bing.com
    type: globalping # Use the Globalping platform to run the check
    location: california # Location to run the check from. Default is "World"
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
```

#### HTTP verbs

To make POST requests (or any other HTTP verb), you can add the method key:

```yaml
sites:
  - name: POST to Google
    url: https://www.google.com
    method: POST
  - name: DELETE Example
    url: https://example.com
    method: DELETE
```

#### TCP Port Enpoints

To make a TCP ping to any port, you can add the check key "tcp-ping":

```yaml
sites:
  - name: Google DNS 1
    check: "tcp-ping"
    url: 8.8.4.4
    port: 53
  - name: Google DNS 2
    check: "tcp-ping"
    url: 8.8.8.8
    port: 53
```

You can also use hostnames with "tcp-ping":

```yaml
sites:
  - name: Google DNS
    check: "tcp-ping"
    url: dns.google
    port: 53
```

If you want to test only IPv6 for specific hostnames (e.g. use only the AAAA DNS records), then set the `ipv6` flag to `true`:

```yaml
sites:
  - name: Google DNS
    check: "tcp-ping"
    url: dns.google
    port: 53
    ipv6: true
```

#### Secret URLs

If you don't want to show a URL publicly, you can use repository secrets (see [Creating and storing encrypted secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets)). Instead of the plain text URL, add the name of the secret prefixed with a $ character:

```yaml
- name: Secret Site
  url: $SECRET_SITE
```

In the above example, a secret named `SECRET_SITE` (without the $) is stored in the repository. You can add as many secrets as you like, and use them in URLs by adding the `$`prefix. For example, if your environment variable is called`API_URL`, the site URL can be `$API_URL`.

You can also use these secrets as part of the URL, for example using a secret called `MY_API_KEY`:

```yaml
- name: API endpoint
  url: https://example.com/get-user/3?api_key=$MY_API_KEY
```

#### Request headers

Similarly, you can set headers in a request like so:

```yaml
- name: API endpoint
  url: https://example.com/get-user/3
  headers:
    - "Authorization: Bearer $SECRET_SITE_2"
    - "Content-Type: application/json"
```

#### Request body

If you want to send data alongside the headers, you can use the `body` key:

```yaml
- name: API endpoint with data
  method: POST
  url: https://example.com/login
  headers:
    - "Content-Type: application/json"
  body: '{ "password": "hello" }'
```

You can add any string to the `body` parameter, but make sure that you supply the relevant content-type header too.

#### Custom icons

Each API endpoint has an icon visible on the README.md file and the status website. By default, we use the GitHub Favicon Service to fetch the favicon for the domain of your endpoint (with a fallback to a generic globe icon), but you can also provide a custom icon URL, preferably a transparent square PNG:

```yaml
sites:
  - name: Google
    url: https://www.google.com
    icon: https://www.google.com/favicon.ico
```

#### Status codes

If you, for example, expect a `404` response (which is traditionally an error response), you can set it as `expectedStatusCodes` to mark your site as up. By default, all 20x and 30x responses are as `expectedStatusCodes`:

```yaml
sites:
  - name: Google
    url: https://www.google.com
    expectedStatusCodes:
      - 200
      - 201
      - 404
```

#### Maximum response time

Upptime endpoints can be up, down, or degraded. By default, if an endpoint takes more than 30 seconds to respond, its performance is tracked as "degraded". You can customize the maximum response time:

```yaml
- name: Slow endpoint
  url: https://example.com
  maxResponseTime: 5000
```

In the above example, this endpoint will be measured as degraded if it takes more than 5 seconds to respond.

#### Self-signed SSL certificates

If you're using a self-signed SSL certificate, you can set the `__dangerous__disable_verify_peer` option to `true` to skip verifying the certificate:

```yaml
- name: API endpoint
  url: https://example.com/get-user/3
  __dangerous__disable_verify_peer: true
```

If you don't want to check for certificate name mismatches, you can set the `__dangerous__disable_verify_host` option to `true` to skip verifying the certificate:

```yaml
- name: API endpoint
  url: https://example.com/get-user/3
  __dangerous__disable_verify_host: true
```

Alternately, you can disable both of the above settings using `__dangerous__insecure`:

```yaml
- name: API endpoint
  url: https://example.com/get-user/3
  __dangerous__insecure: true
```

#### Custom status detection

In some cases, your endpoint may return a 200 response but you show the user an error message. This is not a recommended approach, but you can add custom strings to check for.

```yaml
sites:
  - name: Custom down
    url: https://example.com
    __dangerous__body_down: "File not found"
```

In the above example, if the body HTML response includes the string "File not found", the site will be marked as "down". Similarly, you can use `__dangerous__body_degraded` to mark the site as "degraded" instead.

In other cases your endpoint may return a 200 response with a success message in the body. You might want to check for a specific success message in the body:

```yaml
sites:
  - name: Custom up
    url: https://example.com/api/system/status
    __dangerous__body_down_if_text_missing: '"status":"UP"'
```

In the above example, if the body HTML response does **not** include "status":"UP", the site will be marked as "down". Similarly, you can use `__dangerous__body_degraded_if_text_missing` to mark the site as "degraded" instead.

#### Custom slug

Slugs are used to identify sites across the whole repository, so they should be unique. Upptime will automatically generate a slug for your endpoint from its name, but sometimes it may not be ideal. In that case, you can use `slug` option to specify a custom string for your site:

```yaml
sites:
  - name: Custom site with custom slug
    url: https://example.com
    slug: custom-site
```

In the above example, the site will use `custom-site` as its slug. The history file name, the graph file name and its subpath in status page (if available) will also be this.

### Globalping

Instead of running checks from the GitHub Actions runner, cloud or self-hosted, you can use the [Globalping](https://globalping.io) platform to run checks from any location around the world.

To enable Globalping, add the `type: globalping` option to the site configuration and specify the location to run the check from:

```yaml
sites:
  - name: Google
    url: https://www.google.com
    type: globalping
    location: california # Location to run the check from. Optional. Default is "World"
  - name: Wikipedia
    url: wikipedia.org
    type: globalping
    check: icmp-ping
    location: Berlin
  - name: Bing
    url: bing.com
    type: globalping
    check: tcp-ping
    location: Singapore
    ipv6: true
```

The  `location` option can accept the following: continents, countries, regions, cities, ASNs, ISPs and cloud region names.
You can additionally pinpoint a location by combining filters using the `+` operator. For example, `amazon+germany` or `comcast+california`.  [Full location input documentation](https://github.com/jsdelivr/globalping?tab=readme-ov-file#test-with-magic-)

If you host your own probes you can also target them using your username or tags you create, e.g. this is a valid location `jimaek`.

Note: Globalping supports both PING and HTTP tests, but no POST requests.


This is a native integration and all Upptime features will work as expected.

#### Globalping Limits

By default you can run 250 tests per hour per IP address if unauthenticated. But note that cloud runners share their IPs among users, so you could hit your limit sooner than expected.

Instead, we recommend authenticating using a token to get a higher limit of 500 tests per hour.


#### Globalping Authentication

Simply register an account at [Globalping](https://dash.globalping.io) and get a token by going to the "Tokens" side-menu. 

Then add the token to your repository secrets as `GLOBALPING_TOKEN`.

### Check Delay

You can specify an optional `delay` (in milliseconds) that will occur between checking each configured endpoint. By default, there is no delay.

```yaml
delay: 2000 # 2 seconds
```

### Notifications

You can add services to send downtime notifications to, such as SMS, Slack, or email. For more information about notifications, visit the [Notifications docs](/docs/notifications) page. You can directly configure the notifications in repository secrets (environment variables).

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

### Skip delete issues
Issues are automatically closed once they are resolved, however if they are open for less than 15 minutes they are deleted instead.

You can disable this behaviour by setting the `skipDeleteIssues` key to `true` in your configuration file:

```yaml
skipDeleteIssues: true
```

If issues are deleted, they won't show up in the incident history.

### Status website

#### Theme

You can select one of many themes available to customize your status website:

```yaml
status-website:
  theme: light
```

Available themes are `light`, `dark`, `night` or `ocean`.

You can also write your own custom theme by creating a CSS file in the `assets/` directory of your Upptime repository. For example, if you create a file `assets/my-custom-theme.css`, you can use CSS variables to style your theme. To see a list of all available variables, see the [`dark.css` theme](https://github.com/upptime/status-page/blob/HEAD/static/themes/dark.css):

```css
:root {
  --body-background-color: #001716;
  --body-text-color: #f0ffff;
  --card-background-color: #002b29;
  --nav-background-color: #002b29;
  --nav-border-bottom-color: #015450;
}
/* . . . */
```

Then, this file will be available at https://example.com/my-custom-theme.css. All files from the `assets` directory are served as-is, so you can use this URL to specify your new theme using `themeUrl`:

```yaml
status-website:
  themeUrl: https://example.com/my-custom-theme.css
```

#### Branding

A static website with PWA is also generated, and you can customize the logo and name in the navbar:

```yaml
status-website:
  name: Upptime
  logoUrl: https://example.com/image.jpg
```

#### Custom domain

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

#### Navbar links

You can customize the navbar by adding or removing top-level navigation links.

```yaml
status-website:
  navbar:
    - title: Status
      href: /
    - title: GitHub
      href: https://github.com/$OWNER/$REPO
```

#### Intro text

Optionally, you can add some introductory text to the website. You can use Markdown:

```yaml
status-website:
  introTitle: "**Upptime** is the open-source uptime monitor and status page, powered entirely by GitHub."
  introMessage: This is a sample status page which uses **real-time** data from our [Github repository](https://github.com/koj-co/upptime). No server required — just GitHub Actions, Issues, and Pages.
```

#### Custom favicons

You can add a custom favicon in both SVG and PNG formats:

```yaml
status-website:
  favicon: https://example.com/favicon.png
  faviconSvg: https://example.com/logo.svg
```

#### Custom HTML

To add any custom HTML (unsanitized), you can use `customHeadHtml`, `customBodyHtml` and `customFootHtml`:

```yaml
status-website:
  customHeadHtml: "<!-- Custom HTML to add in the <head> tag -->"
  customBodyHtml: "<!-- Custom HTML to add at the beginning of <body> -->"
  customFootHtml: "<!-- Custom HTML to add at the end of <body> -->"
```

#### Custom JavaScript

You can add custom scripts:

```yaml
status-website:
  scripts:
    - src: https://example.com/script.js
    - src: https://example.com/script-2.js
      async: true
```

Or, directly add inline JS:

```yaml
status-website:
  js: "window.onload = function() { alert('Hello!') }"
```

#### Custom CSS

You can add custom stylesheets:

```yaml
status-website:
  links:
    - rel: stylesheet
      href: https://example.com/custom-styles.css
```

Or, directly add inline CSS:

```yaml
status-website:
  css: "body { opacity: 0.5 }"
```

#### Custom meta tags

To add any custom meta tags, you can use a syntax similar to the `links`:

```yaml
status-website:
  metaTags:
    - name: "color-scheme"
      content: "dark light"
    - name: "robots"
      content: "noindex"
```

#### Custom robots.txt files

You might want to have custom search engine indexing rules:

```yaml
status-website:
  robotsText: "User-agent: * \n Disallow: /"
```

#### Custom API base URL

By default, Upptime uses the official GitHub API to fetch data for your status page website. If you have a proxy API (perhaps using a personal access token with readonly access to your private repository), you can set the `apiBaseUrl` key under `status-website`:

```yaml
status-website:
  apiBaseUrl: https://api.github.com
```

#### Custom raw content URL 

By default, Upptime uses https://raw.githubusercontent.com to fetch raw content from GitHub repositories. If you are using a proxy or another content delivery URL, you can replace the default user content base URL.

```yaml
status-website:
  userContentBaseUrl: https://raw.githubusercontent.com
```


### Internationalization

Though our status page is in English, you can use any language with Upptime by supplying the required strings. The list of all required strings is available in [`upptime/status-page/i18n.yml`](https://github.com/upptime/status-page/blob/master/i18n.yml), and you can add them under the i18n key in the configuration file:

```yaml
i18n:
  activeIncidents: Incidentes activos
  allSystemsOperational: Todos los sistemas están operativos
  # ...
```

You can, for example, change the footer copyright text by changing the internationalization key for `footer`. These i18n keys are also used for your README.md file.

Similarly, you can also localize the `README.md` file by adding these to the same `i18n.yml` file: [List of README.md strings](https://github.com/upptime/upptime/discussions/161#discussioncomment-256389).

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

### CI schedule

You can customize the schedule when Uptime workflows run by adding the `workflowSchedule` key in your configuration file. The syntax followed is that of [`cron`](https://en.wikipedia.org/wiki/cron). The default values are like so:

Keep in mind that a scheduled GitHub Action cannot run faster than every 5 minutes.

```yaml
workflowSchedule:
  graphs: "0 0 * * *"
  responseTime: "0 23 * * *"
  staticSite: "0 1 * * *"
  summary: "0 0 * * *"
  updateTemplate: "0 0 * * *"
  updates: "0 3 * * *"
  uptime: "*/5 * * * *"
```

### Self-hosted runners

> As of now, the workflows CANNOT run on windows runner.

You may want to use a self-hosted runner instead of the publicly available GitHub runners in your project for more accurate uptime monitoring (ensuring scheduled workflows run on time) or to save build minutes. You can specify your self-hosted runner like so:

```yaml
runner: "[self-hosted, linux, ARM64]"
```

### User agent

Requests made to the GitHub API must include a valid User-Agent header (see [User Agent required](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#user-agent-required)). It is recommended to use your GitHub username here:

```yaml
user-agent: your-github-username
```
