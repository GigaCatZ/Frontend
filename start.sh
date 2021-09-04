#!/bin/bash

docker run -d --name frontend -v $(pwd)/dist:/usr/share/nginx/html:ro -p 80:80 nginx:1.21
