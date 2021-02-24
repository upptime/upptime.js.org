---
title: Scheduled maintenance
---

Upptime helps you set up scheduled maintenance times by opening issues manually. To create a new scheduled maintenance, create a new issue in your Upptime repository and add the label `maintenance` to it. The issue body should include an HTML comment, like so:

```html
<!--
start: 2021-02-24T13:00:00.220Z
end: 2021-02-24T14:00:00.220Z
expectedDown: google, hacker-news
-->
```

The `start` and `end` keys are mandatory and should contain an ISO datetime with the start and ending time for the scheduled maintenance respectively.

If you expect that an endpoint will go down during this time, you can add it to `expectedDown` and Upptime will not open an issue if it goes down within this time period. Similarly, you can add `expectedDegraded` if you expect degraded performance. Both these keys should have comma-separated list of slugs.

Upptime will automatically close the issue when the `end` time happens, and it shows both currently ongoing and past scheduled maintenance events on the static website.
