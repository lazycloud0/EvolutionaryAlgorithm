let TARGET = "To be or not to be.";
let GENERATIONS = 100;
let MUTATION_RATE = 0.01;
let POPULATION_SIZE = 100;
let GENE_POOL_CUTOFF = 25;
let GENOME_SIZE = TARGET.length;
let TIMEOUT = 100;
let STOP_EVOLUTION = false;
const MIN_CHAR_CODE = 32;
const MAX_CHAR_CODE = 122;


function newCharacter() {
  let character = Math.floor(
    Math.random() * (MAX_CHAR_CODE - MIN_CHAR_CODE + 1) + MIN_CHAR_CODE
  );
  return String.fromCharCode(character);
}

function generateRandomSequence(length) {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(newCharacter());
  }
  return result;
}

function createIndividual(length) {
  return generateRandomSequence(length);
}

function createPopulation(size) {
  return Array.from({ length: size }, () => {
    return createIndividual(GENOME_SIZE);
  });
}

function calculateFitness(individual) {
  let score = 0;
  for (let i = 0; i < individual.length; i++) {
    if (individual[i] === TARGET[i]) {
      score++;
    }
  }
  return score / TARGET.length;
}

function mutate(individual) {
  return individual.map((gene) => {
    if (Math.random() < MUTATION_RATE) {
      return newCharacter();
    }
    return gene;
  });
}

function crossover(parentA, parentB) {
  const child = [];
  for (let i = 0; i < parentA.length; i++) {
    child.push(Math.random() < 0.5 ? parentA[i] : parentB[i]);
  }
  return child;
}

function evolve(population) {
  // Select parents for reproduction
  const parents = selectParents(population);

  // Create offspring through crossover and mutation
  const offspring = [];
  for (let j = 0; j < POPULATION_SIZE; j++) {
    const parent1 = parents[Math.floor(Math.random() * parents.length)];
    const parent2 = parents[Math.floor(Math.random() * parents.length)];
    let child = crossover(parent1, parent2);
    child = mutate(child);
    offspring.push(child);
  }

  return { offspring, previous: population };
}

function selectParents(population) {
  const sortedParents = [...population].sort(
    (a, b) => calculateFitness(b) - calculateFitness(a)
  );
  return sortedParents.slice(0, GENE_POOL_CUTOFF);
}

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startEvolution);

function startEvolution() {
  TARGET = document.getElementById("target").value;
  GENERATIONS = parseInt(document.getElementById("generations").value);
  MUTATION_RATE = parseFloat(document.getElementById("mutationRate").value);
  POPULATION_SIZE = parseInt(document.getElementById("populationSize").value);
  GENE_POOL_CUTOFF = parseInt(document.getElementById("genePoolCutoff").value);
  TIMEOUT = parseInt(document.getElementById("timeout").value);
  GENOME_SIZE = TARGET.length;
  STOP_EVOLUTION = false;

  evolution();
}

async function evolution() {
  let population = createPopulation(POPULATION_SIZE);
  const targetElement = document.getElementById("target");
  const generationElement = document.getElementById("generation");
  const bestFitnessElement = document.getElementById("bestFitness");
  const averageFitnessElement = document.getElementById("averageFitness");
  const bestIndividualElement = document.getElementById("bestIndividual");
  const populationElement = document.getElementById("population");

  targetElement.textContent = TARGET;

  for (let i = 0; i < GENERATIONS; i++) {
    // Evaluate fitness of individuals
    const fitness = population.map((individual) => {
      const score = calculateFitness(individual);
      return score;
    });

    const bestFitness = Math.max(...fitness);
    const averageFitness = fitness.reduce((a, b) => a + b, 0) / fitness.length;
    const bestIndividual = population[fitness.indexOf(bestFitness)].join("");

    generationElement.textContent = i + 1;
    bestFitnessElement.textContent = bestFitness.toFixed(2);
    averageFitnessElement.textContent = averageFitness.toFixed(2);
    bestIndividualElement.textContent = bestIndividual;

    // Display the population
    populationElement.innerHTML = "";
    population.forEach((individual) => {
      const individualElement = document.createElement("li");
      individualElement.textContent = individual.join("");
      populationElement.appendChild(individualElement);
    });

    if (fitness.indexOf(1) > -1) {
      console.log("Solution found!", population[fitness.indexOf(1)]);
      break;
    }

    let { offspring } = evolve(population);
    population = offspring;
    // Delay between each generation
    await new Promise((resolve) => setTimeout(resolve, TIMEOUT));

    if (STOP_EVOLUTION) {
      break;
    }
  }
}

const stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", cancelEvolution);

function cancelEvolution() {
  STOP_EVOLUTION = true;
}
