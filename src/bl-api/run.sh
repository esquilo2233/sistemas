#!/bin/bash

npm install;


npx prisma generate;



# node clean.ts;



if [ "$USE_DEV_MODE" = "true" ];
  then npm run start:dev;
  else npm run start;
fi