#!/bin/bash

IMAGE_NAME="frontend"

docker build -t ${IMAGE_NAME} \
    .
