class Questionnaire {

  constructor() {
      this.update();
  };


  update() {
    this.race =  d3.select("#race").property("value");
    this.religion =  d3.select("#religion").property("value");
    this.religionOpinion = d3.select("#religionOpinion").property("value");
    this.raceOpinion =  d3.select("#raceOpinion").property("value");
    this.populationOpinion = d3.select("#population").property("value");
    this.incomeOpinion = d3.select('input[name="income"]:checked').property("value");
    this.married = d3.select('input[name="married"]:checked').property("value");
    this.sex = d3.select('input[name="sex"]:checked').property("value");
    this.age = d3.select('input[name="age"]').property("value");
  }
}
