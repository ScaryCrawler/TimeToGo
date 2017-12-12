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

function getCurrentStateSuitabilityCoeff(stateId, normalizedData, weights){
    //todo: implement coeff calculation
    return Math.random();
}


/**
 * @param allStateData json loaded from all_stat.json with all statistic data
 */
function normalizeData(allStateData) {
  //todo: normalize all data
  let normalizedData = [];
  return normalizedData;
}
