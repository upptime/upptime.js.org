module.exports = {
  title: "Upptime",
  tagline: "GitHub-powered open-source uptime monitor and status page",
  url: "https://upptime.js.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "/img/icon.svg",
  organizationName: "upptime",
  projectName: "upptime.js.org",
  themeConfig: {
    navbar: {
      title: "Upptime",
      logo: {
        alt: "",
        src: "/img/icon.svg",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          to: "docs/get-started",
          label: "Getting started",
          position: "left",
        },
        {
          href: "https://github.com/upptime/upptime",
          label: "Example website",
          position: "left",
        },
        {
          href: "https://github.com/upptime/upptime",
          label: "GitHub template",
          position: "left",
        },
        {
          href: "https://github.com/upptime",
          label: "@upptime on GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Upptime",
          items: [
            {
              label: "Documentation",
              to: "docs/",
            },
            {
              label: "Getting started",
              to: "docs/get-started",
            },
            {
              label: "Example website",
              to: "https://upptime.js.org",
            },
            {
              label: "GitHub organization",
              href: "https://github.com/upptime",
            },
          ],
        },
        {
          title: "Support",
          items: [
            {
              label: "Open an issue",
              to: "https://github.com/upptime/upptime/issues",
            },
            {
              label: "Stack Overflow",
              to: "https://stackoverflow.com/questions/tagged/upptime",
            },
            {
              label: "Feedback",
              to: "mailto:upptime@koj.co",
            },
            {
              label: "Contributing",
              to: "/docs/contributing",
            },
          ],
        },
        {
          title: "Packages",
          items: [
            {
              label: "GitHub template",
              to: "https://github.com/upptime/upptime",
            },
            {
              label: "Uptime monitor",
              to: "https://github.com/upptime/uptime-monitor",
            },
            {
              label: "Status page",
              to: "https://github.com/upptime/status-page",
            },
            {
              label: "Graphs generator",
              to: "https://github.com/upptime/graphs",
            },
          ],
        },
        {
          title: "Koj open source",
          items: [
            {
              label: "@koj-co on GitHub",
              to: "https://github.com/koj-co",
            },
            {
              label: "Koj Engineering Blog",
              to: "https://koj.co/engineering",
            },
            {
              label: "Work with Koj",
              to: "https://koj.co/careers",
            },
          ],
        },
      ],
      copyright: `<img alt="Koj" src="https://kojcdn.com/v1593890003/website-v2/logo-white_rrauqe.svg" style="width: 50px; margin: 2.5rem 0"><p>Upptime is an open-source project by <a href="https://koj.co/?utm_source=upptime&utm_medium=footer&utm_campaign=docs">Koj</a>.<br><a href="https://koj.co/?utm_source=upptime&utm_medium=footer&utm_campaign=docs">Furnish your home in style, for as low as CHF175/month →</a></p>`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/upptime/upptime.js.org/blob/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
