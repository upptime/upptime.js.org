import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "Monitor uptime every 5 minutes",
    imageUrl: "img/DancingDoodle.svg",
    description: (
      <>
        Using GitHub Actions, monitor unlimited webpages every 5 minutes, and
        store version-controlled response time stats.
      </>
    ),
  },
  {
    title: "Modern status page website",
    imageUrl: "img/RollerSkatingDoodle.svg",
    description: (
      <>
        Get a sleek and beautiful status page powered by a modern Svelte static
        site with outage history and long-term trend charts.
      </>
    ),
  },
  {
    title: "Get notified where you work",
    imageUrl: "img/UnboxingDoodle.svg",
    description: (
      <>
        Find out the moment any website goes down, with built-in notification
        support for Slack, Telegram, custom webhooks, and more.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout>
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <img alt="" class="logo" src="/img/icon.svg" />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx("button button--lg", styles.getStarted)}
              href="https://status.koj.co"
            >
              View sample site
            </Link>
            <Link
              className={clsx("button button--lg ml", styles.getStarted)}
              to={useBaseUrl("docs/")}
            >
              Read docs &rarr;
            </Link>
          </div>
          <p class="real">This is a real status website &darr;</p>
        </div>
      </header>
      <main>
        <div className="container">
          <iframe
            className={styles.exampleFrame}
            src="https://status.koj.co"
          ></iframe>
        </div>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
