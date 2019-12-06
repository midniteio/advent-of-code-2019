class PlanetNode {
  constructor(value, parent) {
    this.value = value;
    this.parent = parent;
    this.children = [];
  }
}

class OrbitTree {
  constructor(root) {
    this.root = root;
  }

  findNode(value) { 
    const queue = [];
    queue.push(this.root);
    while (queue.length) {
      const currentNode = queue.shift();
      if (currentNode.value === value) {
        return currentNode;
      } else {
        queue.push(...currentNode.children)
      }
    }
  }

  findOrbitJumps(p1, p2) {
    let planet1Node = this.findNode(p1);
    let planet2Node = this.findNode(p2);
    let p1Path = this.listOrbitPath(planet1Node);
    let p2Path = this.listOrbitPath(planet2Node);

    let commonPlanets = p1Path.filter(x => p2Path.includes(x))
    let firstCommonPlanet = commonPlanets.shift();

    let jump1 = p1Path.slice(1, p1Path.indexOf(firstCommonPlanet));
    let jump2 = p2Path.slice(1, p2Path.indexOf(firstCommonPlanet));
    return jump1.length + jump2.length;
  }

  listOrbitPath (planetNode) {
    let planetList = [];
    while (planetNode.parent) {
      planetList.push(planetNode.value)
      planetNode = planetNode.parent;
    }
    return planetList;
  }

  countOrbits(planet) {
    let planetNode = this.findNode(planet);
    let orbits = 0;
    while (planetNode.parent) {
      orbits++;
      planetNode = planetNode.parent;
    }
    return orbits;
  }
}

function mapChildren(planetName) {
  const childOrbits = orbitData.filter((orbit) => orbit.indexOf(planetName + ')') === 0);
  childOrbits.forEach(orbit => {
    let [parentPlanet, child] = orbit.split(')');
    const parentNode = Orbits.findNode(parentPlanet);
    const newPlanet = new PlanetNode(child, parentNode);
    if (parentNode) parentNode.children.push(newPlanet);
    mapChildren(child);
  });
}

// ------------------------------------------------------------------------------------

const orbitData = require('fs').readFileSync('inputs7.txt', 'utf-8').split(/\r?\n/);
const parentPlanets = [], childPlanets = [];

orbitData.forEach((orbit) => {
  let [parent, child] = orbit.split(')');
  parentPlanets.push(parent)
  childPlanets.push(child)
});

const rootPlanet = parentPlanets.filter(planet => !childPlanets.includes(planet));
const Orbits = new OrbitTree(new PlanetNode(rootPlanet[0]));
mapChildren(rootPlanet);

// Part 1
let totalOrbits = 0;
childPlanets.forEach(planet => totalOrbits += Orbits.countOrbits(planet));
console.log(totalOrbits);

// Part 2
console.log(Orbits.findOrbitJumps('YOU', 'SAN'));
