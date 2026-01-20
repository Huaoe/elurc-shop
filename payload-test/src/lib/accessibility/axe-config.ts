import type { RunOptions, Spec } from 'axe-core'

export const axeConfig: RunOptions = {
  rules: {
    'color-contrast': { enabled: true },
    'valid-aria-attr': { enabled: true },
    'aria-roles': { enabled: true },
    'button-name': { enabled: true },
    'image-alt': { enabled: true },
    'label': { enabled: true },
    'link-name': { enabled: true },
    'list': { enabled: true },
    'listitem': { enabled: true },
    'meta-viewport': { enabled: true },
    'region': { enabled: true },
    'tabindex': { enabled: true },
    'landmark-one-main': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'bypass': { enabled: true },
  },
  resultTypes: ['violations', 'incomplete'],
}

export const wcagTags: RunOptions = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
  },
}
