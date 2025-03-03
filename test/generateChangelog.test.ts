import { generateChangelog } from '../src/generateChangelog';
import { DEFAULT_CONFIG } from '../src/defaultConfig';

describe('Test generateChangelog', () => {
  it('Creates A Changelog', () => {
    const dateString = new Date().toISOString().substring(0, 10);
    const commitObjects = [
      { subject: 'Subject 1', type: 'fix', notes: [] },
      { subject: 'Subject 2', type: 'feat', notes: [] },
      { subject: 'Subject 3', type: 'feat', notes: [] },
      { subject: 'Subject 4', type: 'fix', notes: [] },
      { subject: 'Subject 5', type: 'feat', notes: [] },
      { subject: 'Subject 6', type: 'chore', notes: [] },
    ];
    const expectedChanges = `## 🎉 新特性
- Subject 2
- Subject 3
- Subject 5

## 🐛 问题修复
- Subject 1
- Subject 4`;
    const expectedChangelog = `# 0.0.1 - ${dateString}

## 🎉 新特性
- Subject 2
- Subject 3
- Subject 5

## 🐛 问题修复
- Subject 1
- Subject 4

`;
    const config: ChangelogConfig = { ...DEFAULT_CONFIG, excludeTypes: ['chore'] };
    const result = generateChangelog('0.0.1', commitObjects, config);

    expect(result.changes).toStrictEqual(expectedChanges);
    expect(result.changelog).toStrictEqual(expectedChangelog);
  });

  it('Creates A Changelog With Breaking Changes', () => {
    const commitObjects = [
      {
        subject: 'Fix',
        type: 'fix',
        notes: [{ title: 'BREAKING CHANGE', text: 'This is a breaking change!' }],
        sha: 'bcb8767bc22bc7d4ab47a4fffd4ef435de581054',
        url: 'https://github.com/loopwerk/tag-changelog/commit/bcb8767bc22bc7d4ab47a4fffd4ef435de581054',
      },
      {
        subject: 'Feature',
        type: 'feat',
        notes: [{ title: 'BREAKING CHANGE', text: 'This is anchore breaking change!' }],
        sha: 'bcb8767bc22bc7d4ab47a4fffd4ef435de581054',
        url: 'https://github.com/loopwerk/tag-changelog/commit/bcb8767bc22bc7d4ab47a4fffd4ef435de581054',
      },
    ];
    const expectedChanges = `## 🎉 新特性
- Feature

## 🐛 问题修复
- Fix

## BREAKING CHANGES
- due to [bcb876](https://github.com/loopwerk/tag-changelog/commit/bcb8767bc22bc7d4ab47a4fffd4ef435de581054): Feature

This is anchore breaking change!

- due to [bcb876](https://github.com/loopwerk/tag-changelog/commit/bcb8767bc22bc7d4ab47a4fffd4ef435de581054): Fix

This is a breaking change!`;
    const result = generateChangelog('0.0.1', commitObjects, DEFAULT_CONFIG);

    expect(result.changes).toStrictEqual(expectedChanges);
  });

  it('Create A Changelog With Scopes', () => {
    const commitObjects = [
      { subject: 'Subject 1', type: 'fix', notes: [], scope: 'scope' },
      { subject: 'Subject 2', type: 'feat', notes: [], scope: 'scope' },
      { subject: 'Subject 3', type: 'feat', notes: [] },
      { subject: 'Subject 4', type: 'fix', notes: [] },
      { subject: 'Subject 5', type: 'feat', notes: [], scope: 'scope' },
    ];
    const expectedChanges = `## 🎉 新特性
- **scope:** Subject 2
- Subject 3
- **scope:** Subject 5

## 🐛 问题修复
- **scope:** Subject 1
- Subject 4`;
    const result = generateChangelog('0.0.1', commitObjects, DEFAULT_CONFIG);

    expect(result.changes).toStrictEqual(expectedChanges);
  });
});
