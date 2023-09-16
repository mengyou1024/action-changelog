import { compareVersions, validate } from 'compare-versions';

export function sortAndValidate(tags: GitHubTag[]): GitHubTag[] {
  const its = ["release", "release/v", "v"];
  const latest_tag = ["nightly", "weekly"];
  return tags.filter((tag) => {
    for(var i=0;i<latest_tag.length;i++) {
      if (tag.name == latest_tag[i]) {
        return true;
      }
    }
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
    for(var i = 0; i<latest_tag.length; i++) {
      if (a.name == latest_tag[i]) {
        return 1;
      }
      if (b.name == latest_tag[i]) {
        return -1;
      }
    }
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
