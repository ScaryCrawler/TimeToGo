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


/**
 * @param data the json data with all states info
 * @param questionnaire object of Questionnaire class
 */
function calculateSuitabilityCoeffForAllStales(data, questionnaire) {
  data.forEach(function(state) {
    let religion = 0
    if (questionnaire.religionOpinion == 1) {
      religion = 1 - state.religion[questionnaire.religion] / 100;
    } else if (questionnaire.religionOpinion == -1) {
      religion = state.religion[questionnaire.religion] / 100;
    }

    let race = 0;
    if (questionnaire.raceOpinion == 1) {
      race = 1 - state.races[questionnaire.race] / 100;
    } else if (questionnaire.raceOpinion == -1) {
      race = state.races[questionnaire.race] / 100;
    }

    state.coeff = state.median_income_norm_val * questionnaire.incomeOpinion +
      state.population_norm_val * questionnaire.populationOpinion + religion + race + state.all_crime_norm_val;
  });

  var maxValue = d3.max(data, function(d) {
    return d.coeff
  });

  data.forEach(function(state) {
    state.coeff /= maxValue;
  });
}


function normalizeData(allStateData) {

  allStateData.forEach(function(state) {
    state.all_crime = 0;
    crimes = Object.keys(state.crime)
    crimes.forEach(function(current_crime) {
      state.all_crime += parseFloat(state.crime[current_crime]);
    })
  });

  keys = ["median_income", "population", "all_crime"];
  keys.forEach(function(key) {
    var maxValue = d3.max(allStateData, function(d) {
      return d[key]
    });

    allStateData.forEach(function(state) {
      state[key + "_norm_val"] = state[key] / maxValue;
    });
  });
}
