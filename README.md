# Evolutionary Algorithm

This project implements a simple evolutionary algorithm to evolve a population of strings towards a target string. The algorithm uses selection, crossover, and mutation to evolve the population over a number of generations.

## Table of Contents

- [EvolutionaryAlgorithm](#evolutionaryalgorithm)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Functions](#functions)
  - [License](#license)

## Features

- Evolve a population of strings towards a target string.
- Configurable parameters for generations, mutation rate, population size, and more.
- Real-time display of the best fitness, average fitness, and best individual in each generation.

## Getting Started

### Prerequisites

You need a modern web browser to run this project.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/EvolutionaryAlgorithm.git
    ```
2. Open `index.html` in your web browser.

## Usage

1. Open `index.html` in your web browser.
2. Configure the target string, number of generations, mutation rate, population size, and gene pool cutoff using the input fields.
3. Click the "Start" button to begin the evolution process.
4. Click the "Stop" button to halt the evolution process at any time.

## Configuration

You can configure the following parameters in the UI:

- **Target**: The target string the algorithm will evolve towards.
- **Generations**: The number of generations to run the evolution.
- **Mutation Rate**: The probability of a gene mutating.
- **Population Size**: The number of individuals in the population.
- **Gene Pool Cutoff**: The number of top individuals selected for reproduction.
- **Timeout**: The delay between each generation in milliseconds.

## Functions

### `newCharacter()`

Generates a random character within the specified ASCII range.

### `generateRandomSequence(length)`

Generates a random sequence of characters of the given length.

### `createIndividual(length)`

Creates a new individual with a random sequence of characters.

### `createPopulation(size)`

Creates a population of individuals.

### `calculateFitness(individual)`

Calculates the fitness of an individual based on the target string.

### `mutate(individual)`

Mutates an individual based on the mutation rate.

### `crossover(parentA, parentB)`

Performs crossover between two parents to produce a child.

### `evolve(population)`

Evolves the population by selecting parents, performing crossover, and mutating the offspring.

### `selectParents(population)`

Selects the top individuals from the population for reproduction.

### `startEvolution()`

Starts the evolution process based on the configured parameters.

### `cancelEvolution()`

Stops the evolution process.

## License

This project is licensed under the MIT License.