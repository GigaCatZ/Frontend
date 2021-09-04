#!/bin/bash

IMAGE_NAME="frontend"

docker run --detach \
       --name frontend \
       ${IMAGE_NAME}
