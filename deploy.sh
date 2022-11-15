#!/bin/sh

#git commit -m "cdk aws serverless change"
BASE_STRING=`cat VERSION`
BASE_LIST=(`echo $BASE_STRING | tr '.' ' '`)
V_MAJOR=${BASE_LIST[0]}
V_MINOR=${BASE_LIST[1]}
V_PATCH=${BASE_LIST[2]}
echo "Current version : $BASE_STRING"
V_PATCH=$((V_PATCH + 1))
SUGGESTED_VERSION="$V_MAJOR.$V_MINOR.$V_PATCH"
read -p "Enter a version number [$SUGGESTED_VERSION]: " INPUT_STRING
if [ "$INPUT_STRING" = "" ]; then
    INPUT_STRING=$SUGGESTED_VERSION
fi
echo "Will set new version to be $INPUT_STRING"
echo $INPUT_STRING > VERSION
echo "Version $INPUT_STRING:" > tmpfile

git add .
git commit -m "cdk aws serverless change"
git push

RELEASE_VERSION=$INPUT_STRING cdk diff --all
cdk deploy --outputs-file ./cdk-outputs.json
