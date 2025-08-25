import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

type Feature = {
    title: string;
    description: string;
    link: string;
};

const features: Feature[] = [
    {
        title: 'Easy to Use',
        description: 'Connect to your Satisfactory Dedicated Server in minutes with minimal setup.',
        link: '/docs/guides/getting-started',
    },
    {
        title: 'Full Server Control',
        description: 'Manage server options, game sessions, advanced settings, and more from your code.',
        link: '/docs/api/classes/SatisfactoryApi',
    },
    {
        title: 'TypeScript & JS Support',
        description: 'Fully typed SDK for TypeScript or JavaScript usage, autocomplete supported.',
        link: '/docs/api/',
    },
];

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">{siteConfig.title}</Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/guides/getting-started">
                        Get Started - 5min ⏱️
                    </Link>
                    <Link
                        className="button button--primary button--lg margin-left--md"
                        to="/docs/api/">
                        API Reference
                    </Link>
                </div>
            </div>
        </header>
    );
}

function FeatureSection() {
    return (
        <section className={styles.featuresSection}>
            <div className="container">
                <div className="row">
                    {features.map((feature) => (
                        <div key={feature.title} className="col col--4">
                            <div className={styles.featureCard}>
                                <Heading as="h3">{feature.title}</Heading>
                                <p>{feature.description}</p>
                                <Link to={feature.link}>Learn more →</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function QuickLinksSection() {
    return (
        <section className={styles.quickLinks}>
            <div className="container text--center">
                <Heading as="h2">Quick Access</Heading>
                <div className="row">
                    <div className="col col--3">
                        <Link className="button button--outline button--lg" to="/docs/guides/getting-started">
                            Getting Started
                        </Link>
                    </div>
                    <div className="col col--3">
                        <Link className="button button--outline button--lg" to="/docs/api/">
                            API Reference
                        </Link>
                    </div>
                    <div className="col col--3">
                        <Link className="button button--outline button--lg" to="/docs/guides/error-handling">
                            Error Handling
                        </Link>
                    </div>
                    <div className="col col--3">
                        <Link className="button button--outline button--lg" to="/docs/examples/">
                            Code Examples - wip
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Home(): ReactNode {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="TypeScript/JavaScript SDK for Satisfactory Dedicated Server">
            <HomepageHeader />
            <main>
                <FeatureSection />
                <QuickLinksSection />
            </main>
        </Layout>
    );
}
