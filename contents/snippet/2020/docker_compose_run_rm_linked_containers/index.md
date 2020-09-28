---
canonical_url: ./
title: 'スニペット: docker-compose run --rm終了時に他のコンテナも削除するシェルスクリプト'
# og_image:
# twitter_card: summary_large_image
og_description: 'docker-compose run --rm終了時に他のコンテナも削除するシェルスクリプト'
date: '2020-09-28 10:10:00'
draft: false
category: スニペット
tags:
  - Docker
  - Docker Compose
---
# スニペット: docker-compose run --rm終了時に他のコンテナも削除するシェルスクリプト

- [docker-compose run <container> --rm does not rm links · Issue #2791 · docker/compose](https://github.com/docker/compose/issues/2791 "docker-compose run <container> --rm does not rm links · Issue #2791 · docker/compose")

```
#!/bin/bash

docker-compose run --rm "$@"
EXIT_CODE=$?
docker-compose down
exit $EXIT_CODE
```
