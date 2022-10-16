#! /bin/bash

ENV=$1
SERVER=""
APP_PATH="apps/genocide-admin-${ENV}"

release(){
  echo "Creating new release directory..."
  scp -r ./deployment/* deployer@${SERVER}:${APP_PATH}/shared
  ssh deployer@${SERVER} chmod 755 ${APP_PATH}/shared/release.sh
  ssh deployer@${SERVER} chmod 755 ${APP_PATH}/shared/extract.sh
  ssh deployer@${SERVER} chmod 755 ${APP_PATH}/shared/clean-release.sh
  ssh deployer@${SERVER} ". ${APP_PATH}/shared/release.sh ${ENV} ${APP_PATH}"
}

deploy(){
  yarn install
  echo "Removing files from old build directory of local ..."
  rm -rf ./dist/
  echo "Running build local ..."
  REACT_APP_ENV=${ENV} yarn build
  echo "Uploading files to Misfit Employee Management${ENV} directory ..."
  echo "Archiving build.tar.gz..."
  tar -czvf dist.tar.gz ./dist/

  echo "Executing clean-release.sh to server..."
  ssh deployer@${SERVER} ". ${APP_PATH}/shared/clean-release.sh ${ENV} ${APP_PATH}"

  echo "Running command scp build.tar.gz deployer@${SERVER}:${APP_PATH} ..."
  scp dist.tar.gz deployer@${SERVER}:${APP_PATH}/current

  echo "Executing extract.sh to server to unpack build.tar.gz ..."
  ssh deployer@${SERVER} ". ${APP_PATH}/shared/extract.sh ${ENV} ${APP_PATH}"
  rm dist.tar.gz
}

if [[ "production" = $ENV ]];then
  printf "\n\n\n"
  SERVER="18.142.145.141"
	echo "Misfit Employee Management deploying to production server : ${SERVER} ..."
  release
  deploy
elif [[ "pre_prod" = $ENV ]]; then
  printf "\n\n\n"
  SERVER="18.142.145.141"
  echo "Misfit Employee Management deploying to pre_prod server : ${SERVER} ..."
  release
  deploy
elif [[ "staging" = $ENV ]]; then
  printf "\n\n\n"
  SERVER="stage-admin.genocidemuseum.org.bd"
	echo "Genocide admin deploying to staging server : ${SERVER} ..."
  release
  deploy
else
	echo "Please specify environment as argument!"
fi