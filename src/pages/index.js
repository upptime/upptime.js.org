import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "All your life data",
    imageUrl: "img/DancingDoodle.svg",
    description: (
      <>
        Connect your lifestyle services, from music (Spotify, Last.fm) and
        podcasts (Pocket Casts), to reading (Goodreads) and time tracking
        (RescueTime, Wakatime, Clockify).
      </>
    ),
  },
  {
    title: "All your health data",
    imageUrl: "img/RollerSkatingDoodle.svg",
    description: (
      <>
        Connect your Apple Watch or Android/iOS smartphone's health tracking
        using Google Fit, or connect your Oura Ring to accurately track your
        health data.
      </>
    ),
  },
  {
    title: "Always up to date",
    imageUrl: "img/UnboxingDoodle.svg",
    description: (
      <>
        Using GitHub Actions and open source code, always keep your data up to
        datEa (updates every day or hour) and access it using simple-to-use
        RESTful APIs.
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
              to={useBaseUrl("docs/")}
            >
              Read upptime docs &rarr;
            </Link>
          </div>
        </div>
      </header>
      <main>
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
