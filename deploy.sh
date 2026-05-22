#!/bin/bash
set -e # Exit on error

TAG="supersim:latest"
echo "Building image $TAG"
docker build --platform=linux/amd64 -f Dockerfile.prod -t $TAG .

echo "Saving Image ..."
docker save -o ~/supersim.tar $TAG

echo "Uploading to production ..."
scp ~/supersim.tar www@10.0.5.52:/home/www/docker_images/

# Next step, log into the dev server and run the deploy script.
echo "Done. Don't forgot to deploy from prod-52"
