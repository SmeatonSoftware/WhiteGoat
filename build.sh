#! /bin/bash

rm app -r -f

echo "Building API..."

dotnet restore "webapi/webapi.csproj"
dotnet build "webapi/webapi.csproj" -c Release -o ./app/api -r linux-x64 --self-contained

echo "Building React APP..."

cd reactapp

npm install
npm run-script build

mv ./build/ ../app/site/

echo "Build Completed, Ready To Run!"

read