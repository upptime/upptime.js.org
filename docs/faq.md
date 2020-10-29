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

## How do I remove the "Powered by Upptime" in the footer of my website?

You can add an internationalization object that overwrites some keys, see [Internationalization](/docs/configuration#internationalization):

```yaml title=".upptimerc.yml"
i18n:
  footer: This page is [open source]($REPO), powered by [Upptime](https://upptime.js.org)
```

## I'm getting a 404 error in Setup CI

Make sure you've changed the `owner` and `repo` in the [Configuration](/docs/configuration/).
