# ---- Base Node ----
FROM node:8.11.1-alpine AS base
ENV WORK_DIR=/usr/src/app
WORKDIR $WORK_DIR
# Copying the JSON file and installing dependencies before copying over
# the rest of the source code allows us to take advantage of Docker’s cache layers.
COPY package.json .

# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm install --only=production 
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install
COPY . .
RUN npm run build:node \
    && npm run build:webpack

# ---- Test ----
# run tests
FROM base AS test
# Run test suite
RUN npm run test


# ---- Release ---- 
# create a leaner image to deploy
FROM base AS release
# copy production node_modules
COPY --from=dependencies $WORK_DIR/prod_node_modules ./node_modules
# copy app sources into the release Docker image
# (only the JS files transpiled by Babel and the webpack output)
COPY --from=dependencies $WORK_DIR/build ./build
COPY --from=dependencies $WORK_DIR/dist ./dist
# expose dev and prod ports
EXPOSE 8080
# define command to kick off the container
CMD ["npm", "start"]
