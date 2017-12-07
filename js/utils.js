// File for common functions (e.g. custom sorter functor, data aggregation, etc.)

function getStateInfoById(stateId, allStateData) {
  let i = 0;
  let isNeededStateFound = false
  while (!isNeededStateFound) {
    if (allStateData[i].id === stateId) {
      isNeededStateFound = true;
    } else {
      i++;
    }
  }
  return allStateData[i];
}
