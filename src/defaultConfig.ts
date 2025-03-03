export const DEFAULT_CONFIG: ChangelogConfig = {
  types: [
    { label: '🎉 新特性', types: ['feat', 'feature'] },
    { label: '🐛 问题修复', types: ['fix', 'bugfix', 'bug'] },
    { label: '🚀 性能优化', types: ['improvements', 'enhancement', 'impro', 'enhance', 'perf'] },
    { label: '📚 文档变更', types: ['doc', 'docs'] },
    { label: '🧪 测试', types: ['test', 'tests', 'quality'] },
    { label: '🔨 构建系统', types: ['build', 'ci', 'cd', 'workflow', 'cicd'] },
    { label: '🪚 重构', types: ['refactor', 'refac', 'refact', 'ref'] },
    { label: '👚 代码风格', types: ['style', 'format'] },
    { label: '🧹 其他', types: ['chore', 'other'] },
  ],

  excludeTypes: [],

  renderTypeSection: (label, commits) => {
    return `\n## ${label}\n${commits
      .map((c) => {
        return `- ${c.scope ? `**${c.scope}:** ` : ''}${c.subject}`;
      })
      .join('\n')}\n`;
  },

  renderNotes: (notes) => {
    return `\n## BREAKING CHANGES\n${notes
      .map((n) => {
        return `- due to [${n.commit.sha.substring(0, 6)}](${n.commit.url}): ${n.commit.subject}\n\n${n.text}\n\n`;
      })
      .join('')}`;
  },

  renderChangelog: (release, changes) => {
    return `# ${release} - ${new Date().toISOString().substring(0, 10)}\n\n` + changes + '\n\n';
  },
};
