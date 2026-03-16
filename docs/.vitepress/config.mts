import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Copse',
  description: 'Git worktree manager — create worktrees and open editors for parallel development',

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'GitHub', link: 'https://github.com/aidanhibbard/copse' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Commands', link: '/guide/commands' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aidanhibbard/copse' },
    ],

    footer: {
      message: 'Released under the MIT License.',
    },
  },
})
