---
title: Atom + LaTeX in Docker
date: '2019-09-17 08:35:00'
category: 技術
tags:
  - Atom
  - LaTeX
  - TeXLive
  - Docker
---
## 概要
LaTeXをホストにインストールせず、Docker内で動かしつつ、
Atomからこれを利用できるようにする。

## Requirements
- Ubuntu 18.04
- Docker
- Atom
- Atom Packages
    - [latex](https://atom.io/packages/latex)

## Atom Packages
[latex](https://atom.io/packages/latex)を入れれば最低限ビルドはできる。

- [latex](https://atom.io/packages/latex)
- シンタックスハイライト
    - [language-latex](https://atom.io/packages/language-latex)
- アウトライン表示
    - [document-outline](https://atom.io/packages/document-outline)
- PDFプレビュー
    - [pdf-view]()（メモリリーク? Atomを一度閉じれば解消する）
    - または [pdf-view-plus]()（メモリリーク対策版らしい。`latex`との連携はないので注意）


## Dockerイメージ
[paperist/alpine-texlive-ja](https://hub.docker.com/r/paperist/alpine-texlive-ja/)を使う。

```shell
sudo docker pull paperist/alpine-texlive-ja
```

## non-root Docker
`sudo`なしでDockerを実行できるようにする。AtomからDockerコンテナを作るのに必要。

ユーザをdockerグループに追加したあと再ログインする。新しくdockerグループが作られた直後は`newgrp docker`しなければならないことがあり、シェルごとにこれを実行する必要があるようなのでAtomに反映されず、この場合OSの再起動が必要。

```shell
sudo groupadd docker
sudo adduser $USER docker
```

## latexmkスクリプトを作る

`/usr/texbin/latexmk`（手動で`latex`の`TeX Path`を設定するか、デフォルトでPATHの通っている場所ならどこでもいい）に以下のシェルスクリプトを作成し、`chmod +x /usr/texbin/latexmk`しておく。

`${HOME}/.atom/packages/latex/resources`のマウントは`latex`の`Extended Build Mode`が有効のときに`${HOME}/.atom/packages/latex/resources/latexmkrc`が読み出されるため設定している（このパスはホストのAtomから渡されるのでマウント先パスもホストと同じ）。この機能を無効にしていれば不要。

```shell
#!/bin/sh
docker run --rm \
  -v "${PWD}:/workdir" \
  -v "${HOME}/.atom/packages/latex/resources:${HOME}/.atom/packages/latex/resources" \
  paperist/alpine-texlive-ja \
  latexmk "$@"
```

## 注意点
カレントディレクトリ以下をマウントするため、外部においた`.sty`などは読み込めないので注意（デフォルトでロードされるディレクトリがあれば追加のマウントをすればOKと思われる）。

## おまけ
### stderrにコマンドを吐き出してエラー終了するスクリプト

```shell
#!/bin/sh
echo $0 $@ >&2
exit 1;
```
