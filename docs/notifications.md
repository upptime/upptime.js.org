---
title: Notifications
---

Using notifications, you can alert your team when an endpoint goes down or experiences degraded performance. To add notifications, you have to add environment variables as **GitHub repository secrets** (*Settings* -> *Secrets* -> *Actions*) and add *Environment variable* as your *Secret name* and *Value* in environment variable as *value* in secret. DO NOT select `Variables` select **Secret**(see [Creating and storing encrypted secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets)).

![Secrets](https://user-images.githubusercontent.com/22931360/232315630-59689bdd-6c88-4454-9fd8-8eb64844f968.png)


Every time an endpoint goes down, a notification with the following text is sent:

> 🟥 Example Site (https://example.koj.co) is **down**: https://github.com/upptime/upptime/issues/4

If it experiences degraded performance, a notification with the following text is sent:

> 🟨 Example Site (https://example.koj.co) has **degraded performance**: https://github.com/upptime/upptime/issues/4

When it comes back up, another notification is sent:

> 🟩 Example Site is back up.

## Strategy

If you have more than one configurations of each provider (say multiple email configurations, both SMTP and SES), you can choose the strategy. For each notification provider (Slack, email, etc.), you can specify the strategy using the `NOTIFICATION_{PROVIDER}_STRATEGY` environment variable, where `{PROVIDER}` is the constant-case service name, for example `NOTIFICATION_SLACK_STRATEGY`. The strategy can be any one of:

| Value                  | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `fallback`             | If one provider returns an error, try the next |
| `roundrobin` (default) | Use every provider in turns                    |
| `no-fallback`          | Deactivates fallback strategy                  |

More information is available on the [Multi-provider strategies](https://github.com/notifme/notifme-sdk#multi-provider-strategies) page in the documentation.

## Providers

For each notification type (Slack, email, etc.), you need to first enable it by setting the `NOTIFICATION_{PROVIDER}` to `true`, where `{PROVIDER}` is the constant-case service name, for example `NOTIFICATION_SLACK`. Each notification type also requires additional environment variables. See the examples below.

### Slack

| Environment variable             | Value             |
| -------------------------------- | ----------------- |
| `NOTIFICATION_SLACK`             | Set to `true`     |
| `NOTIFICATION_SLACK_WEBHOOK`     | Set to `true`     |
| `NOTIFICATION_SLACK_WEBHOOK_URL` | Slack webhook URL |

To create a Slack webhook URL, see the article [Incoming webhooks for Slack](https://slack.com/intl/en-in/help/articles/115005265063-Incoming-webhooks-for-Slack) on the Slack website.

### Telegram

| Environment variable               | Value               |
| ---------------------------------- | ------------------- |
| `NOTIFICATION_TELEGRAM`            | Set to `true`       |
| `NOTIFICATION_TELEGRAM_BOT_KEY`    | Your bot key        |
| `NOTIFICATION_TELEGRAM_CHAT_ID`    | Your chat ID        |

To create a Telegram bot key, see the documentation for [Botfather](https://core.telegram.org/bots#6-botfather) on the Telegram Support website.

### Discord

| Environment variable               | Value               |
| ---------------------------------- | ------------------- |
| `NOTIFICATION_DISCORD`             | Set to `true`       |
| `NOTIFICATION_DISCORD_WEBHOOK`     | Set to `true`       |
| `NOTIFICATION_DISCORD_WEBHOOK_URL` | Discord webhook URL |

To create a Discord webhook URL, see the article [Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) on the Discord Support website.

### Zulip

| Environment variable               | Value                    |
| ---------------------------------- | -------------------      |
| `NOTIFICATION_ZULIP_MESSAGE_URL`   | Zulip Message API URL    |
| `NOTIFICATION_ZULIP_API_EMAIL`     | Email of the Zulip bot   |
| `NOTIFICATION_ZULIP_API_KEY`       | API Key of the Zulip bot |


To create a Zulip Incoming Webhook bot, see the article [Add a bot or integration](https://zulip.com/help/add-a-bot-or-integration) in the Zulip docs. 
The `NOTIFICATION_ZULIP_MESSAGE_URL` should include the `type`, `to` and `topic` query params and would look something like this:
`https://domain.zulipchat.com/api/v1/messages?type=stream&to=general&topic=Upptime%20notifications`.

### Microsoft Teams

| Environment variable             | Value               |
| -------------------------------- | ------------------- |
| `NOTIFICATION_TEAMS`             | Set to `true`       |
| `NOTIFICATION_TEAMS_WEBHOOK_URL` | Teams webhook URL   |

To create a Microsoft Teams webhook URL, see the article [Create Incoming Webhooks](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) on the Microsoft Learn website.

### Gotify

| Environment variable             | Value                                                |
| -------------------------------- | ---------------------------------------------------- |
| `NOTIFICATION_GOTIFY`            | Set to `true`                                        |
| `NOTIFICATION_GOTIFY_URL`        | Gotify URL                                           |
| `NOTIFICATION_GOTIFY_TOKEN`      | Gotify application token                             |
| `NOTIFICATION_GOTIFY_TITLE`      | Notification title. Defaults to `Upptime` if not set |
| `NOTIFICATION_GOTIFY_PRIORITY`   | Notification priority. Defaults to `5` if not set    |

To create a Gotify server, see the official [documentation](https://gotify.net/docs/index) of the [Gotify](https://gotify.net) project.
The `NOTIFICATION_GOTIFY_URL` should not include `/` at the end of server URL.

### Custom webhook

Tip: You can use [webhook.site](https://webhook.site) to test the webhook.

| Environment variable             | Value               |
| -------------------------------- | ------------------- |
| `NOTIFICATION_CUSTOM_WEBHOOK`    | Set to `true`       |
| `NOTIFICATION_CUSTOM_WEBHOOK_URL`| custom webhook URL  |

### Email

To send an email, you can use SMTP or a hosted service such as AWS SES, Sendgrid, Sparkpost, or Mailgun.

All services require you to specify the email address from and to:

| Environment variable      | Value                |
| ------------------------- | -------------------- |
| `NOTIFICATION_EMAIL`      | Set to `true`        |
| `NOTIFICATION_EMAIL_FROM` | "From" email address |
| `NOTIFICATION_EMAIL_TO`   | "To" email address   |

#### Sendgrid

| Environment variable                  | Value            |
| ------------------------------------- | ---------------- |
| `NOTIFICATION_EMAIL_SENDGRID`         | Set to `true`    |
| `NOTIFICATION_EMAIL_SENDGRID_API_KEY` | Sendgrid API key |

#### AWS SES

| Environment variable                       | Value                 |
| ------------------------------------------ | --------------------- |
| `NOTIFICATION_EMAIL_SES`                   | Set to `true`         |
| `NOTIFICATION_EMAIL_SES_REGION`            | AWS region            |
| `NOTIFICATION_EMAIL_SES_ACCESS_KEY_ID`     | AWS access key ID     |
| `NOTIFICATION_EMAIL_SES_SECRET_ACCESS_KEY` | AWS secret access key |
| `NOTIFICATION_EMAIL_SES_SESSION_TOKEN`     | AWS session token     |

#### Sparkpost

| Environment variable                   | Value             |
| -------------------------------------- | ----------------- |
| `NOTIFICATION_EMAIL_SPARKPOST`         | Set to `true`     |
| `NOTIFICATION_EMAIL_SPARKPOST_API_KEY` | Sparkpost API key |

#### Mailgun

| Environment variable                     | Value               |
| ---------------------------------------- | ------------------- |
| `NOTIFICATION_EMAIL_MAILGUN`             | Set to `true`       |
| `NOTIFICATION_EMAIL_MAILGUN_API_KEY`     | Mailgun API key     |
| `NOTIFICATION_EMAIL_MAILGUN_DOMAIN_NAME` | Mailgun domain name |

#### SMTP

| Environment variable               | Value         |
| ---------------------------------- | ------------- |
| `NOTIFICATION_EMAIL_SMTP`          | Set to `true` |
| `NOTIFICATION_EMAIL_SMTP_PORT`     | SMTP Port     |
| `NOTIFICATION_EMAIL_SMTP_HOST`     | SMTP Host     |
| `NOTIFICATION_EMAIL_SMTP_USERNAME` | SMTP Username |
| `NOTIFICATION_EMAIL_SMTP_PASSWORD` | SMTP Password |

### SMS

To send a text message, you can any one of several services: Callr, Clickatell, Infobip, Nexmo, OVH, Plivo, Twilio, or 46elks. You'll have to create an account at the service of your choice and provide authentication information as specified below.

All services require you to specify the phone number from and to:

| Environment variable    | Value               |
| ----------------------- | ------------------- |
| `NOTIFICATION_SMS_FROM` | "From" phone number |
| `NOTIFICATION_SMS_TO`   | "To" phone number   |

#### 46elks

| Environment variable                   | Value           |
| -------------------------------------- | --------------- |
| `NOTIFICATION_SMS_46ELKS`              | Set to `true`   |
| `NOTIFICATION_SMS_46ELKS_API_USERNAME` | 46elks username |
| `NOTIFICATION_SMS_46ELKS_API_PASSWORD` | 46elks password |

#### Callr

| Environment variable              | Value          |
| --------------------------------- | -------------- |
| `NOTIFICATION_SMS_CALLR`          | Set to `true`  |
| `NOTIFICATION_SMS_CALLR_LOGIN`    | Callr login    |
| `NOTIFICATION_SMS_CALLR_PASSWORD` | Callr password |

#### Clickatell

| Environment variable                  | Value              |
| ------------------------------------- | ------------------ |
| `NOTIFICATION_SMS_CLICKATELL`         | Set to `true`      |
| `NOTIFICATION_SMS_CLICKATELL_API_KEY` | Clickatell API key |

#### Infobip

| Environment variable                | Value            |
| ----------------------------------- | ---------------- |
| `NOTIFICATION_SMS_INFOBIP`          | Set to `true`    |
| `NOTIFICATION_SMS_INFOBIP_USERNAME` | Infobip username |
| `NOTIFICATION_SMS_INFOBIP_PASSWORD` | Infobip password |

#### Nexmo

| Environment variable                | Value            |
| ----------------------------------- | ---------------- |
| `NOTIFICATION_SMS_NEXMO`            | Set to `true`    |
| `NOTIFICATION_SMS_NEXMO_API_KEY`    | Nexmo API key    |
| `NOTIFICATION_SMS_NEXMO_API_SECRET` | Nexmo API secret |

#### OVH

| Environment variable                | Value            |
| ----------------------------------- | ---------------- |
| `NOTIFICATION_SMS_OVH`              | Set to `true`    |
| `NOTIFICATION_SMS_OVH_APP_KEY`      | OVH app key      |
| `NOTIFICATION_SMS_OVH_APP_SECRET`   | OVH app secret   |
| `NOTIFICATION_SMS_OVH_CONSUMER_KEY` | OVH consumer key |
| `NOTIFICATION_SMS_OVH_ACCOUNT`      | OVH account      |
| `NOTIFICATION_SMS_OVH_HOST`         | OVH host         |

#### Plivo

| Environment variable                | Value            |
| ----------------------------------- | ---------------- |
| `NOTIFICATION_SMS_PLIVO`            | Set to `true`    |
| `NOTIFICATION_SMS_PLIVO_AUTH_ID`    | Plivo auth ID    |
| `NOTIFICATION_SMS_PLIVO_AUTH_TOKEN` | Plivo auth token |

#### Twilio

| Environment variable                  | Value              |
| ------------------------------------- | ------------------ |
| `NOTIFICATION_SMS_TWILIO`             | Set to `true`      |
| `NOTIFICATION_SMS_TWILIO_ACCOUNT_SID` | Twilio account SID |
| `NOTIFICATION_SMS_TWILIO_AUTH_TOKEN`  | Twilio auth token  |

## Custom Notifications

Both the up and down/degraded performance notifications can be customized with your preferred message, configured as an environment variable.
Multiple variables are available to use within the message, relating to the site and status.

### Environment Variables

| Value                        | Description                       |
| ---------------------------- | --------------------------------- |
| `NOTIFICATIONS_DOWN_MESSAGE` | Down/degraded performance message |
| `NOTIFICATIONS_UP_MESSAGE`   | Up message                        |

### Message Variables

| Value                                  | Example                                                                                                                               |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `$SITE_NAME`                           | Example Site                                                                                                                          |
| `$SITE_URL`                            | (https://example.koj.co)                                                                                                              |
| `$ISSUE_URL` _(down message only)_     | https://github.com/upptime/upptime/issues/4                                                                                           |
| `$RESPONSE_CODE` _(down message only)_ | 500                                                                                                                                   |
| `$STATUS`                              | <ul><li>**down**</li><li>experiencing **degraded performance**</li><li>is back up</li><li>performance has improved</li></ul>          |
| `$EMOJI`                               | <ul><li>🟥</li><li>🟨</li><li>🟩</li></ul>                                                                                           |
