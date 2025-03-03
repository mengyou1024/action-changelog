export function groupByType(commits: ChangelogCommit[], typeConfig: ChangelogLabelMap[]): ChangelogCommitGroup[] {
  // First, group all the commits by their types.
  // We end up with a dictionary where the key is the type, and the values is an array of commits.
  const byType: { [key: string]: ChangelogCommit[] } = {};
  commits.forEach((commit) => {
    const entry = typeConfig.find(map => map.types.includes(commit.type))
    const commonType = entry?.types.at(0) ?? commit.type;
    byType[commonType] = byType[commonType] ?? [];
    byType[commonType].push(commit);
  });

  // Turn that dictionary into an array of objects,
  // where the key is the type, and the values is an array of commits.
  const byTypeArray: ChangelogCommitGroup[] = [];
  Object.keys(byType).forEach((key) => {
    byTypeArray.push({
      type: key,
      commits: byType[key],
    });
  });

  // And now we sort that array using the TYPES object.
  byTypeArray.sort((a, b) => {
    let aOrder = typeConfig.findIndex((t) => t.types.includes(a.type));
    if (aOrder === -1) {
      aOrder = Infinity;
    }
    let bOrder = typeConfig.findIndex((t) => t.types.includes(b.type));
    if (bOrder === -1) {
      bOrder = Infinity;
    }
    return aOrder - bOrder;
  });

  return byTypeArray;
}
