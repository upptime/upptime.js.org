---
title: Packages
---

Upptime consists of several packages written in TypeScript and Svelte/Sapper, which are consumed by the template repository.

## `@upptime/uptime-monitor`

[![npm version](https://img.shields.io/npm/v/@upptime/uptime-monitor)](https://www.npmjs.com/package/@upptime/uptime-monitor) [![npm](https://img.shields.io/npm/dw/@upptime/uptime-monitor)](https://www.npmjs.com/package/@upptime/uptime-monitor) [![GitHub Repo stars](https://img.shields.io/github/stars/upptime/uptime-monitor)](https://github.com/upptime/uptime-monitor)

This package includes the uptime monitor that sends network requests to ensure that your endpoints are online. It also includes all features, including notifications, interactions with the GitHub API, and generating the status website and `README.md` files. It's written in TypeScript.

## `@upptime/status-page`

[![npm version](https://img.shields.io/npm/v/@upptime/status-page)](https://www.npmjs.com/package/@upptime/status-page) [![npm](https://img.shields.io/npm/dw/@upptime/status-page)](https://www.npmjs.com/package/@upptime/status-page) [![GitHub Repo stars](https://img.shields.io/github/stars/upptime/status-page)](https://github.com/upptime/status-page)

This package contains the source code of the status website written in Svelte using Sapper. Users don't directly interact with this package, rather the `@upptime/uptime-monitor` fetches the source code of the static site from here.

## `@upptime/graphs`

[![npm version](https://img.shields.io/npm/v/@upptime/graphs)](https://www.npmjs.com/package/@upptime/graphs) [![npm](https://img.shields.io/npm/dw/@upptime/graphs)](https://www.npmjs.com/package/@upptime/graphs) [![GitHub Repo stars](https://img.shields.io/github/stars/upptime/graphs)](https://github.com/upptime/graphs)

This package includes the response time graph generator using Chart.js. This is a separate package because it has several dependencies, and it's only installed when graphs are actually being generated (by default, once per day), and not in other workflows. It's written in TypeScript.
