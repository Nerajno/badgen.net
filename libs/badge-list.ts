import path from 'path'
import staticBadges from '../api/badge'

const rel = (...args) => path.resolve(__dirname, ...args)

// sort live badge manually
export const liveBadgeList = [
  // source control
  'github',
  'gitlab',
  // release registries
  'npm',
  'david',
  'packagephobia',
  'bundlephobia',
  'crates',
  'docker',
  'homebrew',
  'chrome-web-store',
  'amo',
  'pypi',
  'nuget',
  'packagist',
  'rubygems',
  'apm',
  'hackage',
  'vs-marketplace',
  'melpa',
  'maven',
  'cocoapods',
  'haxelib',
  'opam',
  'cpan',
  'cran',
  'ctan',
  'dub',
  'elm-package',
  'scoop',
  'winget',
  'f-droid',
  'pub',
  'shards',
  'wapm',
  // CI
  'travis',
  'circleci',
  'appveyor',
  'codecov',
  'codacy',
  'coveralls',
  'codeclimate',
  'azure-pipelines',
  // quality & metrics
  'snyk',
  'lgtm',
  'deepscan',
  'uptime-robot',
  'xo',
  'badgesize',
  'jsdelivr',
  // social
  'devrant',
  'peertube',
  // utilities
  'opencollective',
  'keybase',
  'twitter',
  'mastodon',
  'tidelift',
  'jenkins',
  'liberapay',
  'runkit',
  'https',
]

export async function loadBadgeMeta () {
  const liveBadgeExamples = await Promise.all(liveBadgeList.map(async id => {
    const mod = await import(rel('../api', id))
    const { title, examples, handlers } = mod.default.meta

    return {
      id,
      title,
      examples,
      routes: Object.keys(handlers),
    }
  }))

  const statics = {
    title: staticBadges.meta.title,
    examples: staticBadges.meta.examples,
    routes: Object.keys(staticBadges.meta.handlers)
  }

  return {
    live: liveBadgeExamples,
    static: [statics]
  }
}
