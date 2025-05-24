---
title: Frequently Asked Questions
---

## Is Upptime free and open-source software (FOSS)?

Yes, Upptime is 100% free and open-source, with all components licensed under the permissive MIT License.

## My status website is broken (CSS is not loading)

You are probably running the website on a non-root domain, for example at https://user.github.io/repo/, where `user` is your GitHub username and `repo` is the repository name. You should add the `baseUrl` configuration:

```yaml title=".upptimerc.yml"
status-website:
  baseUrl: /repo # "repo" is your repository name
```

## My status website doesn't work with my private repository.

By default, Upptime only supports publishing status websites from public repositories, since the GitHub API is used to fetch data. However, you can set up a proxy API (for example, using a personal access token with readonly access to your private repository) and set that as the `apiBaseUrl` configuration key under `status-website`. See [#54](https://github.com/upptime/upptime/issues/54) and the [Configuration for `apiBaseUrl`](https://upptime.js.org/docs/configuration#custom-api-base-url) to learn how to set up a status website from your private repository.

## How do I remove the "Powered by Upptime" in the footer of my website?

You can add an internationalization object that overwrites some keys, see [Internationalization](/docs/configuration#internationalization):

```yaml title=".upptimerc.yml"
i18n:
  footer: This page is [open source]($REPO), powered by [Upptime](https://upptime.js.org)
```

## I'm getting a 404 error in Setup CI

Make sure you've changed the `owner` and `repo` in the [Configuration](/docs/configuration/).

## I'm hitting the Globalping limit 

It's possible your test is running on the same cloud server as another user's, effectively sharing the limit due to the having the same IP address.

To avoid this, you can consider switching to a self-hosted runner.

Or you can authenticate using a token and a higher limit of 500 tests per hour. See [Globalping Authentication](/docs/configuration#globalping-authentication).
