#! /bin/bash

echo "Building API..."

cd webapi

dotnet build -c Release -o ./app/api

cd ..

echo "Building React APP..."

cd reactapp

npm install
npm run-script build
mv ./build ../app/site

cp -r -f . /var/www/html

echo "Build Completed, Ready To Run!"