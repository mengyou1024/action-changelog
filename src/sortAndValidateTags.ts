import { compareVersions, validate } from 'compare-versions';

export function sortAndValidate(tags: GitHubTag[]): GitHubTag[] {
  const its = ["release", "release/v", "v"];
  return tags.filter((tag) => {
    var name = "";
    its.forEach((it) => {
      if (tag.name.startsWith(it)) {
        name = tag.name.substring(it.length);
      }
    })
    return validate(name);
  }).sort((a, b) => {
    var tempa = "";
    var tempb = "";
    its.forEach((it) => {
      if (a.name.startsWith(it)) {
        tempa = a.name.substring(it.length)
      }
    })
    its.forEach((it) => {
      if (b.name.startsWith(it)) {
        tempb = b.name.substring(it.length)
      }
    })
    return compareVersions(tempa, tempb);
  }).reverse();
}
