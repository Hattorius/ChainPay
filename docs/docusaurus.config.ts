import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ChainPay - docs',
  tagline: 'On chain payments on the BNB chain',
  url: 'https://docs.chainpay.dev',
  baseUrl: '/',
  organizationName: 'Hattorius',
  projectName: 'ChainPay',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/Hattorius/ChainPay/tree/main/docs/',
          breadcrumbs: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },
    navbar: {
      title: 'ChainPay',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'ideaSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/Hattorius/ChainPay',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} ChainPay, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  headTags: [
    {
      tagName: 'script',
      attributes: {
        defer: 'defer',
        src: 'https://hi.xlogic.sh/script.js',
        'data-website-id': '99ba53d4-19d3-4fe2-a7a2-2e8c99865b91'
      }
    }
  ]
};

export default config;
