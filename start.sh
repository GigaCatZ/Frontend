#!/bin/bash

docker run -d --name frontend -v $(pwd)/dist:/usr/share/nginx/html:ro nginx:1.21
