---
title: GitHub Actions workflow not triggering at scheduled time
author: Anand Chowdhary
author_title: Upptime creator, Koj cofounder/CTO
author_url: https://github.com/AnandChowdhary
author_image_url: https://avatars.githubusercontent.com/u/2841780
tags: [uptime-monitor, github-actions]
hide_table_of_contents: false
---

We've seen many reports of GitHub Actions workflows not triggering at the scheduled time. In fact, in the official [upptime/upptume](https://github.com/upptime/upptume) repository, workflows scheduled for every five minutes run as slower as once every hour. This blog post is a quick summary of what we know, and what you can do.

<!--truncate-->

The first time we saw this was when [@rouilj](https://github.com/rouilj) pointed it out in [#112](https://github.com/upptime/upptime/discussions/112):

> If I look at the GitHub Actions listing and select the "Uptime CI", I don't see it being executed every 5 minutes; it looks more like it's running every 18 minutes or so.

And my reply:

> Hi @rouilj, unfortunately this is out of our control. We request GitHub to run the Uptime CI workflow every 5 minutes. It's added to a queue and run whenever GitHub has a machine available, sometimes this is every 7 minutes, sometimes every 15 minutes. There's really not much we can do, with the exception of manually triggering the workflow using an external scheduler.

When you set up a GitHub Actions workflow with a schedule, say for once every 10 minutes, you're essneially requesting GitHub to schedule that workflow for you. **There is no guarantee that the workflow will run every 10 minutes.** In a discussion in the GitHub Support Community ([No assurance on scheduled jobs?](https://github.community/t/no-assurance-on-scheduled-jobs/133753)), Github partner [@brightran](https://github.com/brightran) said that many a times, there may be a delay when triggering the scheduled workflow:

> Generally, the delay time is about 3 to 10 minutes. Sometimes, it may be more, even dozens of minutes, or more than one hour.

He also said that if the delay time is too long, the scheduled workflow may be not triggered at that day. Therefore, it's not recommended to use GitHub Actions scheduled workflows for production tasks that require execution guarantee.

So, what can you do to guarantee your GitHub Actions scheduled workflow will run? In [#42](https://github.com/upptime/upptime/issues/42), [@belhyun](https://github.com/belhyun) proposed triggering it manually:

> In order to execute correctly every 5 minutes, I ran a build job with jenkins and executed a `POST` request.

GitHub Actions supports the `workflow_dispatch` trigger (see [Events that trigger workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows) on GitHub Docs), so if you manually trigger a workflow, it will be queued to run soon-ish. This means that you can use a third-party cron scheduling service like IFTTT, Google Cloud Scheduler, Jenkins, Cronhub, etc., to make a request to the GitHub API to trigger the workflow.
