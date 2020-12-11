---
title: How it works
slug: /
---

Upptime is a free and open-source uptime monitor and status website service. It's very different from other status-page services because it doesn't require a server — it's all powered by GitHub:

1. GitHub Actions is used as an uptime monitor
2. GitHub Issues are used for incident reports
3. GitHub Pages are used for the status website

## Concepts

### GitHub Actions-powered uptime monitor

Using GitHub Actions, users can [schedule](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows#schedule) workflows to automatically run every x-minutes. The shortest interval is 5 minutes. So, every 5 minutes, Upptime visits your websites and makes sure that they're up.

We also record the response time once per day and commit it to git history. This way, we can graph long-term trends in your websites' response times by going through git commit history. We generate these graphs once every day, also using schedulers.

You can see an [example issue #67](https://github.com/upptime/upptime/issues/67).

### GitHub Issues-powered incident reports

When a specified endpoint goes down, Upptime automatically opens a new issue in your GitHub repository. You can use this issue to add more information about the outage, such as whether you are investigating, what caused the downtime, etc. You can also choose to automatically assign certain members from your team to the issue and send notifications to connected services like Slack and Telegram.

To add information about an incident, you can add comments to the issue. By default, issues will be locked, so only your team members are allowed to comment on them. When your website comes back up, the issue will be automatically closed.

You can see [example commit history](https://github.com/upptime/upptime/commits/master/history/wikipedia.yml).

### GitHub Pages-powered status website

Lastly, you get a beautiful, staticly-generated status website. This website will show users your websites' live status, incident history, and response time graphs. The website is always up-to-date as it uses the GitHub API to fetch data in real-time, and is built using Svelte and Sapper. You can customize the logo, copy, and more to make it your own.

You can see the [example status website](https://upptime.js.org).
