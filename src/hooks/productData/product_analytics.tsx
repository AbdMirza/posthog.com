import React from 'react'
import {
    IconGraph,
    IconFunnels,
    IconTrends,
    IconLifecycle,
    IconUserPaths,
    IconCorrelationAnalysis,
    IconRetention,
    IconStickiness,
} from '@posthog/icons'
import { FIFTY_MILLION, MAX_PRODUCT_ANALYTICS, MILLION, TEN_MILLION } from 'components/Pricing/pricingLogic'

export const productAnalytics = {
    Icon: IconGraph,
    name: 'Product Analytics',
    slug: 'product-analytics',
    handle: 'product_analytics',
    type: 'product_analytics',
    color: 'blue',
    colorSecondary: 'sky-blue',
    category: 'analytics',
    seo: {
        title: 'Product analytics - PostHog',
        description:
            'PostHog is the only product analytics platform built to natively work with session replay, feature flags, experiments, and surveys.',
    },
    overview: {
        title: 'Product analytics with autocapture',
        description:
            'PostHog is the only product analytics platform built to natively work with session replay, feature flags, experiments, and surveys.',
        textColor: 'text-white', // tw
    },
    screenshots: [
        {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-product-analytics.png',
            alt: 'Product analytics screenshot',
            classes: '',
        },
    ],
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
        alt: 'A hedgehog presenting some shocking findings',
        classes: 'absolute bottom-0 right-4 max-w-lg',
    },
    slider: {
        marks: [0, MILLION, TEN_MILLION, FIFTY_MILLION, MAX_PRODUCT_ANALYTICS],
        min: 0,
        max: MAX_PRODUCT_ANALYTICS,
    },
    volume: 1000000,
    worksWith: ['session_replay', 'feature_flags', 'surveys'],
    customers: {
        ycombinator: {
            headline: 'gathers 30% more data than with Google Analytics',
            description: 'We could autocapture... events using the JS snippet and... configure custom events.',
        },
        hasura: {
            headline: 'improved conversion rates by 10-20%',
            description: 'we observed drop-offs at very particular stages of our onboarding flow.',
        },
        contra: {
            headline: 'increased registrations by 30%',
            description: 'From [funnels], we could easily jump to session replays to see the drop-off point.',
        },
        speakeasy: {
            headline: 'manages features and developer relations',
            description: '...top-to-bottom view of conversion rates and user paths, without... extra setup time.',
        },
    },
    features: [
        {
            title: 'Funnels',
            headline: 'Find drop-off across a series of actions',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-basic.png',
                    alt: 'Basic funnel visualization',
                },
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-grouped.png',
                    alt: 'Grouped funnel visualization',
                },
            ],
            features: [
                {
                    title: 'Filtering',
                    description:
                        'Set filters for individual steps – or the entire funnel – by person property, group or cohort, or event property',
                },
                {
                    title: 'Graph types',
                    description:
                        "Track user progression between steps, conversion time between each step, and how a funnel's conversion rate changes over time",
                },
                {
                    title: 'Step ordering',
                    description:
                        'Choose between a sequential series of steps, a strict order, or any order of steps that lead to conversion',
                },
                {
                    title: 'Granular controls',
                    description:
                        'Set conversion window limit, add exclusionary steps, set attribution type, and see the relative conversion rate between each step',
                },
            ],
            icon: <IconFunnels />,
            color: 'blue',
        },
        {
            title: 'Graph & trends',
            headline: 'Visualize user data with graphs, tables, charts, maps, and more',
            icon: <IconTrends />,
            color: 'yellow',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-bar.png',
                    alt: 'Trend bar visualization',
                },
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-multiple-sparklines.png',
                    alt: 'Multiple sparklines visualization',
                },
            ],
            features: [
                {
                    title: 'Trends',
                    description:
                        'Plot any event over time, such as a feature being used. You can even do math and multiple series.',
                },
                {
                    title: 'Advanced filtering',
                    description:
                        'Apply however many filters you need to or breakdown by any event, user or group property with advanced logic.',
                },
                {
                    title: 'Breakout tables',
                    description: 'Break out your trends by any event property.',
                },
                {
                    title: 'Sampling',
                    description: 'Speed up long running queries across large datasets in one click.',
                },
            ],
        },
        {
            title: 'Lifecycle',
            headline: 'Track user engagement over time',
            description:
                'Analyze active users break down, highlighting those who have recently stopped being active or those who have just become active for the first time.',
            icon: <IconLifecycle />,
            color: 'purple',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-lifecycle.png',
                    alt: 'Lifecycle visualization',
                },
            ],
            features: [
                {
                    title: 'User categories',
                    description:
                        'Track new, returning, resurrecting, and dormant users to understand engagement patterns',
                },
                {
                    title: 'Time-based analysis',
                    description:
                        "Configure intervals (hour, day, week, month) to match your product's natural usage patterns",
                },
                {
                    title: 'Detailed breakdowns',
                    description:
                        'View individual users in each category and analyze their behavior through session recordings',
                },
                {
                    title: 'Integration',
                    description:
                        'Works with cohorts, feature flags, and other Product OS features and tools for comprehensive analysis',
                },
            ],
        },
        {
            title: 'User Paths',
            headline: 'Understand user navigation patterns',
            description:
                "Track how users navigate through your product, identify where they get stuck, and discover why they aren't finding new features.",
            icon: <IconUserPaths />,
            color: 'green',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/user-guides/paths/example-light-mode.png',
                    alt: 'User paths visualization',
                },
            ],
            features: [
                {
                    title: 'Path visualization',
                    description: 'See the most common paths users take through your product',
                },
                {
                    title: 'Drop-off analysis',
                    description: 'Identify where users are getting stuck or abandoning their journey',
                },
                {
                    title: 'Session recordings',
                    description: 'View recordings of user sessions to understand their behavior',
                },
                {
                    title: 'Cohort creation',
                    description: 'Create cohorts of users who follow specific paths for further analysis',
                },
            ],
        },
        {
            title: 'Correlation Analysis',
            headline: 'Discover factors affecting conversion',
            description: 'Automatically identify significant factors that impact user behavior and conversion rates.',
            icon: <IconCorrelationAnalysis />,
            color: 'red',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716387676/posthog.com/contents/Screenshot_2024-05-22_at_3.20.17_PM.png',
                    alt: 'Correlation analysis visualization',
                },
            ],
            features: [
                {
                    title: 'Automatic detection',
                    description: 'Automatically highlight significant factors affecting conversion',
                },
                {
                    title: 'Property analysis',
                    description: 'Analyze how different user properties impact behavior',
                },
                {
                    title: 'Event correlation',
                    description: 'Discover which events are most strongly correlated with success',
                },
                {
                    title: 'Cohort creation',
                    description: 'Create cohorts based on correlation analysis results',
                },
            ],
        },
        {
            title: 'Retention',
            headline: 'Track user return rates',
            description:
                'Measure how many users come back to your product over time and compare retention between different user segments.',
            icon: <IconRetention />,
            color: 'blue',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/retention_light_805120c74c.png',
                    alt: 'Retention visualization',
                },
            ],
            features: [
                {
                    title: 'Cohort analysis',
                    description: 'Compare retention rates between different user cohorts',
                },
                {
                    title: 'Time-based tracking',
                    description: 'Track retention over hours, days, weeks, or months',
                },
                {
                    title: 'First-time vs recurring',
                    description: 'Analyze both first-time and recurring user retention',
                },
                {
                    title: 'Detailed breakdowns',
                    description: 'Break down retention by user properties and segments',
                },
            ],
        },
        {
            title: 'Stickiness',
            headline: 'Measure user engagement depth',
            description: 'Track how frequently users engage with your product and identify your most engaged users.',
            icon: <IconStickiness />,
            color: 'yellow',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716289464/posthog.com/contents/stickiness-light.png',
                    alt: 'Stickiness visualization',
                },
            ],
            features: [
                {
                    title: 'Engagement frequency',
                    description: 'Track how many times users perform specific actions',
                },
                {
                    title: 'User segmentation',
                    description: 'Identify your most engaged users and their characteristics',
                },
                {
                    title: 'Feature analysis',
                    description: 'Determine which features drive the most engagement',
                },
                {
                    title: 'Time-based analysis',
                    description: 'Analyze engagement patterns over different time periods',
                },
            ],
        },
        {
            title: 'Powerful tools & features',
            headline: 'Everything you need for comprehensive analytics',
            description:
                'From automatic data capture to custom SQL queries, get all the tools for modern product analytics.',
            features: [
                {
                    title: 'Dashboards',
                    description: 'Create custom dashboards to monitor key metrics and share insights',
                },
                {
                    title: 'HogQL',
                    description: 'Write SQL queries to analyze data in ways beyond standard insights',
                },
                {
                    title: 'Autocapture',
                    description:
                        'Automatically capture clicks, pageviews, and form submissions without manual tracking',
                },
                {
                    title: 'LLM insights',
                    description: 'Track costs, latency, and usage patterns for AI/LLM applications',
                },
                {
                    title: 'Privacy controls',
                    description: 'Limit data capture with sensitive info blocking and EU cloud options',
                },
                {
                    title: 'Sharing & embedding',
                    description: 'Share insights publicly or embed dashboards in your app',
                },
                {
                    title: 'Subscriptions',
                    description: 'Send regular reports via email or Slack on custom schedules',
                },
                {
                    title: 'Alerts',
                    description: 'Get notified when metrics exceed thresholds or change significantly',
                },
                {
                    title: 'Sampling',
                    description: 'Speed up complex queries on large datasets while maintaining accuracy',
                },
                {
                    title: 'Group analytics',
                    description: 'Analyze data at company or team level for B2B products',
                },
            ],
        },
    ],
    questions: [
        {
            question: 'How do I calculate new vs returning users?',
            url: '/tutorials/track-new-returning-users',
        },
        {
            question: "What's my churn rate? / How can I reduce churn?",
            url: '/tutorials/churn-rate',
        },
        {
            question: 'What features have the highest churn?',
            url: '/tutorials/churn-rate#lifecycle-charts',
        },
        {
            question: 'Which of my features increase user retention?',
            url: '/tutorials/feature-retention',
        },
        {
            question: 'How do I track ad conversion?',
            url: '/tutorials/performance-marketing#tracking-conversion-from-traffic-to-signups',
        },
        {
            question: 'How can I find my power users? / What are my power users doing differently?',
            url: '/tutorials/power-users#identifying-your-power-user',
        },
        {
            question: 'Where do my users spend the most time on?',
            url: '/tutorials/session-metrics',
        },
        {
            question: 'How do I get insights about my data using regex?',
            url: '/tutorials/regex-basics',
        },
        {
            question: 'How are changes improving my activation flow?',
            url: '/tutorials/explore-insights-session-recordings#watching-users-through-funnels',
        },
        {
            question: 'How do far are my users scrolling down my app?',
            url: '/tutorials/scroll-depth',
        },
        {
            question: 'How to I track performance marketing?',
            url: '/tutorials/performance-marketing',
        },
        {
            question: 'How many users return to use my product each day?',
            url: '/tutorials/track-new-returning-users#calculating-returning-users',
        },
        {
            question: 'How many users return to use my product each week?',
            url: '/tutorials/track-new-returning-users',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'Time-based analysis for web analytics (e.g. time on page)',
                    subtitle: "We're working on this!",
                    subtitleUrl: 'https://posthog.com/teams/web-analytics',
                },
                {
                    title: 'Predictive analytics for extrapolating events into the future',
                },
                {
                    title: 'Alerting for when events move beyond set thresholds',
                    subtitle: "We're working on this!",
                },
            ],
            us: [
                {
                    title: 'Linking between analytics and other features, so you can jump from a graph to a relevant recording',
                },
                {
                    title: 'Wide range of insight types for analyzing data',
                },
                {
                    title: 'Formula mode and SQL access to enable deeper analysis',
                },
                {
                    title: 'Automatic correlation analysis to find significant events',
                },
                {
                    title: 'Group analytics for teams with B2B customers',
                },
            ],
        },
        features: [
            {
                feature: 'Insights',
                type: 'header',
                companies: {
                    Amplitude: '',
                    Mixpanel: '',
                    Heap: '',
                    Pendo: '',
                    PostHog: '',
                },
            },
            {
                feature: 'Ready-made insight types',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'SQL mode',
                companies: {
                    Amplitude: 'Exports only',
                    Mixpanel: 'JQL only',
                    Heap: 'Exports only',
                    Pendo: 'Exports only',
                    PostHog: true,
                },
            },
            {
                feature: 'Funnels',
                type: 'header',
                companies: {
                    Amplitude: '',
                    Mixpanel: '',
                    Heap: '',
                    Pendo: '',
                    PostHog: '',
                },
            },
            {
                feature: 'Conversion funnels',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Historical trends',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Time to convert insights',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Sequential step order',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Strict step order',
                companies: {
                    Amplitude: true,
                    Mixpanel: false,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Any step order',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Exclusion events',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Conversion windows',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Reveal user paths between steps',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Anomaly detection',
                companies: {
                    Amplitude: true,
                    Mixpanel: false,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Filter internal and test users',
                companies: {
                    Amplitude: false,
                    Mixpanel: false,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Filter by cohort',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Filter by person property',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Breakdown by person property',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Correlation analysis',
                companies: {
                    Amplitude: true,
                    Mixpanel: false,
                    Heap: true,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Path analysis',
                type: 'header',
                companies: {
                    Amplitude: '',
                    Mixpanel: '',
                    Heap: '',
                    Pendo: '',
                    PostHog: '',
                },
            },
            {
                feature: 'Reveal paths from a start point',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Reveal paths from an end point',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Reveal paths between points',
                companies: {
                    Amplitude: false,
                    Mixpanel: true,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Reveal paths within funnels',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Zoom in/out',
                companies: {
                    Amplitude: true,
                    Mixpanel: false,
                    Heap: false,
                    Pendo: false,
                    PostHog: false,
                },
            },
            {
                feature: 'Define number of users on path',
                companies: {
                    Amplitude: false,
                    Mixpanel: false,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Track pageviews',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Track custom events',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Filter internal and test users',
                companies: {
                    Amplitude: false,
                    Mixpanel: false,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Filter by cohort',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Filter by events or person property',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Include and exclude Wildcards',
                companies: {
                    Amplitude: false,
                    Mixpanel: false,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Exclusion events',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Hide repeating steps',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: false,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Regex for path cleaning',
                companies: {
                    Amplitude: false,
                    Mixpanel: false,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Max number of steps',
                companies: {
                    Amplitude: '50',
                    Mixpanel: '120+',
                    Heap: '10',
                    Pendo: '20',
                    PostHog: '20',
                },
            },
            {
                feature: 'Dashboards',
                type: 'header',
                companies: {
                    Amplitude: '',
                    Mixpanel: '',
                    Heap: '',
                    Pendo: '',
                    PostHog: '',
                },
            },
            {
                feature: 'User-level permissions',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Project-level permissions',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Dashboard-level permissions',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Share dashboards externally',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Embed dashboards anywhere',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Subscribe to dashboards',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Pinned dashboards',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Dashboard & insight tags',
                companies: {
                    Amplitude: false,
                    Mixpanel: false,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },

            {
                feature: 'Annotations',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: false,
                    Pendo: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Private insights',
                companies: {
                    Amplitude: true,
                    Mixpanel: true,
                    Heap: true,
                    Pendo: true,
                    PostHog: false,
                },
            },
        ],
    },
    pairsWith: [
        {
            slug: 'session-replay',
            description:
                'Jump into a playlist of session recordings directly from any point in a graph, or segment of a funnel',
        },
        {
            slug: 'feature-flags',
            description: "See which feature flags are enabled for a user's session",
        },
        {
            slug: 'experiments',
            description:
                'Generate a playlist of recordings limited to an A/B test or specific group within a multivariate experiment.',
        },
    ],
}
