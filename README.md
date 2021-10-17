# minesweeper
A simple minesweeper game

### Prerequisite
1. Npm v7.24.0+ (or yarn v1.22.10+)
2. Node v16.9.0+

### Develop steps
1. `yarn install`
2. `yarn build` For generate production files
3. `yarn start` For development
4. Open browser and link to localhost:3000

### Other operations
1. `yarn clean` Clean all production files
2. `yarn clean:all` Clean all production & node_module files
3. `yarn lint` Examine coding style and output log file
4. `yarn lint:fix` Standardize the coding style and output log file

### Run with Docker
1. `docker build -t react-minesweeper .` Build the docker image locally
2. `docker run -p 3000:3000 -itd react-minesweeper` Start the container, and map the port to 3000
3. Open browser and link to localhost:3000 

### Screenshot
<img width="401" alt="Screenshot 2021-10-15 at 5 16 46 AM" src="https://user-images.githubusercontent.com/7455359/137396861-ca515362-328f-466b-937b-e2088b2955e6.png">

### Introduction
- The game includes 3 level: Easy, Medium, Hard
- A user can explore a grid by clicking the grid
- A user can put a flag on a grid by right-click, or long-press when playing with mobile
- If a user clicks the map, the timer starts
- If a user clicks a blank grid, show a number or mine or blank
- When the clicked grid adjacent to mines, show numbers
- When the clicked grid is a mine, game over
- When the clicked grid is empty, recursively visit its neighbour grids
- When all mine grids are placed flags, then the user wins

### TODO
- Modal component to display the result