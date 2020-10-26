module.exports = {
  title: "Upptime",
  tagline: "Track, visualize, and embed your health and life data",
  url: "https://upptime.js.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "/img/icon.svg",
  organizationName: "upptime",
  projectName: "upptime.js.org",
  themeConfig: {
    navbar: {
      title: "upptime",
      logo: {
        alt: "upptime Logo",
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
          href: "https://github.com/upptime/upptime",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "upptime",
          items: [
            {
              label: "Get started",
              to: "docs/",
            },
            {
              label: "Integrations",
              to: "docs/integrations/",
            },
            {
              label: "Embed",
              to: "docs/embed/",
            },
            {
              label: "GitHub",
              href: "https://github.com/upptime",
            },
          ],
        },
        {
          title: "Lifestyle integrations",
          items: [
            {
              label: "Spotify",
              to: "docs/integrations/spotify",
            },
            {
              label: "Last.fm",
              to: "docs/integrations/last-fm",
            },
            {
              label: "Pocket Casts",
              to: "docs/integrations/pocket-casts",
            },
            {
              label: "Goodreads",
              to: "docs/integrations/goodreads",
            },
            {
              label: "Twitter",
              to: "docs/integrations/twitter",
            },
          ],
        },
        {
          title: "Time tracking integrations",
          items: [
            {
              label: "RescueTime",
              to: "docs/integrations/rescuetime",
            },
            {
              label: "Wakatime",
              to: "docs/integrations/wakatime",
            },
            {
              label: "Clockify",
              to: "docs/integrations/clockify",
            },
          ],
        },
        {
          title: "Health integrations",
          items: [
            {
              label: "Google Fit",
              to: "docs/integrations/google-fit",
            },
            {
              label: "Oura Ring",
              to: "docs/integrations/oura-ring",
            },
            {
              label: "Apple Health",
              to: "docs/integrations/apple-health",
            },
          ],
        },
      ],
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
