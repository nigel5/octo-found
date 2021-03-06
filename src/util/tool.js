export function findKeyByProp1D(prop, value, obj) {
  const m = Object.keys(obj).length;
  let res = [];
  for (let i = 0; i < m; i++) {
    if (!obj[i]) continue;
    if (!obj[i][prop]) continue;
    if (obj[i][prop] === value) res.push(i);
  }
  return res;
}


export function filterObjectByProp1D(prop, value, obj) {
  const m = Object.keys(obj).length;
  let res = [];
  for (let i = 0; i < m; i++) {
    if (!obj[i]) continue;
    if (!obj[i][prop]) continue;
    if (obj[i][prop] !== value) res.push(obj[i]);
  }
  return Object.assign({}, res);
}
