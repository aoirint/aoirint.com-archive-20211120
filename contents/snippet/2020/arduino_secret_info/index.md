---
canonical_url: ./
title: ソース公開するArduinoプログラムに秘密情報を埋め込む
# og_image:
# twitter_card: summary_large_image
og_description: ソース公開するArduinoプログラムに秘密情報を埋め込む
date: '2020-11-09 07:00:00'
draft: true
category: スニペット
tags:
  - Arduino
---

# ソース公開するArduinoプログラムに秘密情報を埋め込む

ソース公開するArduinoプログラム（`.ino`）に
APIキーやWiFiパスワードなどの秘密情報を埋め込む。

Arduino IDEの主要機能を持つCLIソフトウェア`arduino-cli`を使う。
