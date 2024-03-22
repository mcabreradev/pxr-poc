module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'chore',
        'style',
        'refactor',
        'ref',
        'ci',
        'test',
        'perf',
        'revert',
        'wip',
        'cleanup',
        'build',
        'story',
        'release',
      ],
    ],
  },
};
