# minesweeper
A simple minesweeper game

Prerequisite
1. Npm v7.24.0+ (or yarn v1.22.10+)
2. Node v16.9.0+

Develop steps
1. `yarn install`
2. `yarn build` For generate production files
3. `yarn start` For development
4. Open browser and link to localhost:3000

Other operations
1. `yarn clean` Clean all production files
2. `yarn clean:all` Clean all production & node_module files
3. `yarn lint` Examine coding style and output log
4. `yarn lint:fix` Standardize the coding style

Run with Docker
1. `docker build -t react-template .` Build the docker image locally
2. `docker run -p 3000:3000 -itd react-template` Start the container, and map the port to 3000
3. Open browser and link to localhost:3000 
