---
title: Notifications
---

Using notifications, you can alert your team when an endpoint goes down. To add notifications, you have to add items under the `notifications` key in the configuration file `.upptimerc.yml`.

Every time an endpoint goes down, a notification with the following text is sent:

> 🟥 Example Site (https://example.koj.co) is **down**: https://github.com/upptime/upptime/issues/4

When it comes back up, another notification is sent:

> 🟩 Example Site is back up.

Each notification type requires one or more environment variables. You can use GitHub repository secrets to add them.

## Slack

Use `slack` as the type and provide a Slack channel ID as channel in the configuration.

```yaml
notifications:
  - type: slack
    channel: C01XQ3U9M9P
```

A Slack App has to be registered and installed prior to usage, with the scope chat:write (see [chat.postMessage docs](https://api.slack.com/methods/chat.postMessage)), and the environment variable `SLACK_APP_ACCESS_TOKEN` should be set with the Slack Bot User OAuth Access Token.

## Discord

Use `discord` as the type and create an environment variable `DISCORD_WEBHOOK_URL` with the Discord webhook URL. To create a Discord webhook URL, see the article [Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) on the Discord Support website.

```yaml
notifications:
  - type: discord
```
