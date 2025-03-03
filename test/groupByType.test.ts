import { groupByType } from '../src/groupByType';
import { DEFAULT_CONFIG } from '../src/defaultConfig';

describe('Test groupByType', () => {
  it('Groups And Sorts Commits By Type', () => {
    const commits: ChangelogCommit[] = [
      { subject: 'Subject 0', type: 'chore', notes: [] },
      { subject: 'Subject 1', type: 'feat', notes: [] },
      { subject: 'Subject 2', type: 'nonexisting', notes: [] },
      { subject: 'Subject 3', type: 'feat', notes: [] },
      { subject: 'Subject 4', type: 'fix', notes: [] },
      { subject: 'Subject 5', type: 'fix', notes: [] },
      { subject: 'updates workflow', type: 'build', notes: [] },
      { subject: 'resets version', type: 'cd', notes: [], scope: 'version' },
      { subject: 'resets version', type: 'ls', notes: [], scope: 'version' },
    ];

    const expected: ChangelogCommitGroup[] = [
      {
        type: 'feat',
        commits: [
          { subject: 'Subject 1', type: 'feat', notes: [] },
          { subject: 'Subject 3', type: 'feat', notes: [] },
        ],
      },
      {
        type: 'fix',
        commits: [
          { subject: 'Subject 4', type: 'fix', notes: [] },
          { subject: 'Subject 5', type: 'fix', notes: [] },
        ],
      },
      {
        type: 'build',
        commits: [
          { subject: 'updates workflow', type: 'build', notes: [] },
          { subject: 'resets version', type: 'cd', scope: 'version', notes: [] },
        ],
      },
      {
        type: 'chore',
        commits: [{ subject: 'Subject 0', type: 'chore', notes: [] }],
      },
      {
        type: 'nonexisting',
        commits: [{ subject: 'Subject 2', type: 'nonexisting', notes: [] }],
      },
      {
        type: 'ls',
        commits: [{ scope: "version", subject: 'resets version', type: 'ls', notes: [] }],
      },
    ];

    const result = groupByType(commits, DEFAULT_CONFIG.types);
    expect(result).toStrictEqual(expected);
  });

  it('Orders Sorted Groups As Expected', () => {
    const commits = [
      { subject: 'Subject 0', type: 'chore', notes: [] },
      { subject: 'Subject 1', type: 'feat', notes: [] },
    ];

    const notExpected = [
      {
        type: 'chore',
        commits: [{ subject: 'Subject 0', type: 'chore', notes: [] }],
      },
      {
        type: 'feat',
        commits: [{ subject: 'Subject 1', type: 'feat', notes: [] }],
      },
    ];

    const expected = [
      {
        type: 'feat',
        commits: [{ subject: 'Subject 1', type: 'feat', notes: [] }],
      },
      {
        type: 'chore',
        commits: [{ subject: 'Subject 0', type: 'chore', notes: [] }],
      },
    ];

    const result = groupByType(commits, DEFAULT_CONFIG.types);
    expect(result).not.toStrictEqual(notExpected);
    expect(result).toStrictEqual(expected);
  });
});
