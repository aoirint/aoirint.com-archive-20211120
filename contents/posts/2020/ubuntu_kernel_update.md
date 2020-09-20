---
canonical_url: ./
title: UbuntuのKernelをアップデートした
# og_image:
# twitter_card: summary_large_image
og_description: UbuntuのKernelをアップデートしたメモ
date: '2020-09-20 20:00:00'
draft: true
category: 技術
tags:
  - Ubuntu
  - Linux Kernel
  - e1000e
---
# UbuntuのKernelをアップデートした
環境の整理を兼ねて、UbuntuのKernelのアップデートをしたので、そのときのメモ。

## バージョンの履歴について
`/lib/modules`を見る限りインストール時のバージョンは`4.10.0-28-generic`で、
`/usr/src`を見る限り`4.15.0-115`をしばらく使ったあと、
`4.16.18-041618`に更新していた。

バージョン`4.10.x`はおそらくUbuntu 16.04をクリーンインストールしたときのもので、
バージョン`4.15.x`は`dist-upgrade`でUbuntu 18.04にアップデートしたときに変更されたと思われる。
その後ソフトウェア導入のためのバージョン合わせかなにかで`4.16.x`にして、そのまま使っていた。

## e1000eについて
4.15.x, 4.16.xではIntel NICのドライバe1000eが入っていないので、
少し荒っぽい方法で自動ビルドするようにしていたのだが、
現在のUbuntu 18.04のメインストリームらしい5.4.xでは
今回の作業中に気づいたのだがe1000eがデフォルトで入っているようだ
（`/lib/modules/5.4.*-generic/kernel/drivers/net/ethernet/intel/e1000e/e1000e.ko`）。

今回は4.15から4.16にアップデートするときに使ったUKUU（Ubuntu Kernel Update Utility）で5.4にアップデートした。
そのとき参考にしたサイト： [Upgrade Kernel on Ubuntu 18.04 – Linux Hint](https://linuxhint.com/upgrade-kernel-ubuntu-1804/ "Upgrade Kernel on Ubuntu 18.04 – Linux Hint")

## e1000eのビルドについて
4.15, 4.16ではe1000eを手動でビルドしていたので、
今回もそうかと思って新しいe1000eのソースコードをダウンロードしたのだが、
結局不要だった。

[ダウンロード Linux * での PCIe * Intel®ギガビット・イーサネット・ネットワーク接続向けインテル®ネットワーク・アダプター・ドライバー](https://downloadcenter.intel.com/ja/download/15817 "ダウンロード Linux * での PCIe * Intel®ギガビット・イーサネット・ネットワーク接続向けインテル®ネットワーク・アダプター・ドライバー")

## カーネルバージョンとe1000eのビルドについて
e1000eのソースコードを読む限り、
カーネルバージョンの後ろに付いているハイフン以降の数字はUbuntu Release ABIというらしいのだが、
UKUUを使ってカーネルをインストールするとバージョン番号（ハイフンの前）を6ケタの数字に直したようなものになるので、
これはABIとは違いそうだ（ABIは0から255までの範囲のように思われる）。
ABIのドキュメントらしきものがあったので、機会があれば読みたい：[KernelTeam/BuildSystem/ABI - Ubuntu Wiki](https://wiki.ubuntu.com/KernelTeam/BuildSystem/ABI "KernelTeam/BuildSystem/ABI - Ubuntu Wiki")

e1000eのソースコード（`kcompat.h`）の一部を引用するが、以下のようにABIのチェックが行われていて、
4.16.xのカーネルをUKUUで導入した際はこのバージョンチェックをコメントアウトする必要があった。

```c
/* Ubuntu Release ABI is the 4th digit of their kernel version. You can find
 * it in /usr/src/linux/$(uname -r)/include/generated/utsrelease.h for new
 * enough versions of Ubuntu. Otherwise you can simply see it in the output of
 * uname as the 4th digit of the kernel. The UTS_UBUNTU_RELEASE_ABI is not in
 * the linux-source package, but in the linux-headers package. It begins to
 * appear in later releases of 14.04 and 14.10.
 *
 * Ex:
 * <Ubuntu 14.04.1>
 *  $uname -r
 *  3.13.0-45-generic
 * ABI is 45
 *
 * <Ubuntu 14.10>
 *  $uname -r
 *  3.16.0-23-generic
 * ABI is 23
 */

(略)

#if UTS_UBUNTU_RELEASE_ABI > 255
#error UTS_UBUNTU_RELEASE_ABI is too large...
#endif /* UTS_UBUNTU_RELEASE_ABI > 255 */
```

```sh
# ABIチェックのスキップ
sed -i "s/#error UTS_UBUNTU_RELEASE_ABI is too large.../\/\/#error UTS_UBUNTU_RELEASE_ABI is too large.../" kcompat.h
```

また、これは通常のカーネルでも起こるが
e1000eがチェックサム検証に失敗して（`The NVM Checksum Is Not Valid` by `netdev.c`）
モジュールを起動できないので、これもスキップする必要があった。

```sh
# チェックサム検証のスキップ
sed -i "/s32 e1000e_validate_nvm_checksum_generic(struct e1000_hw \*hw)/N;s/\n{/\n{return 0;/" nvm.c
```

他にe1000e以外で注意が必要かもしれない点として、
おそらくメジャーバージョンが1ケタであるせいで、この数字の始まりが0からになっているため、
これを直接Cコードに埋め込んだりすると8進数扱いされて（さらに数字に8以上が含まれていて）ビルドが通らないということがあった（どのソフトウェアか覚えていないが）。

## これまでのe1000e自動ビルドについて
Linuxにはカーネルバージョンをアップデートしたときにドライバなどのモジュールを再ビルドするための
DKMS（Dynamic Kernel Module Support）というソフトウェアがあるのだが、
導入当時はこれを使うキャパシティがなかったので、当時でもなんとなく使い方のわかっていたsystemdを使って
起動時に毎回e1000eを自動ビルド・再インストールするという荒い方法で継続的に動作させていた。

/etc/systemd/system/uscript-e1000e.service
```systemd
[Unit]
Description=Make Install e1000e

[Service]
Type=oneshot
ExecStart=/etc/uscript/e1000e

TimeoutSec=0
StandardOutput=tty
RemainAfterExit=yes
SysVStartPriority=99

[Install]
WantedBy=multi-user.target
```

/etc/uscript/e1000e
```
#!/bin/bash

modprobe -r e1000e
make clean -C /etc/uscript/e1000e-latest/src
make install -C /etc/uscript/e1000e-latest/src
modprobe e1000e
```

カーネルバージョンを更新するにあたって、これは不要になったので削除した。

```sh
$ sudo systemctl stop uscript-e1000e.service
$ sudo systemctl disable uscript-e1000e.service
Removed /etc/systemd/system/multi-user.target.wants/uscript-e1000e.service.
$ sudo rm /etc/systemd/system/uscript-e1000e.service
$ sudo rm /etc/uscript/e1000e

$ sudo modprobe -r e1000e
$ sudo make uninstall -C /etc/uscript/e1000e-latest/src
$ sudo rm -r /etc/uscript/e1000e-latest
````

## DKMSを使ったe1000e自動ビルドについて
[Ubuntu 16.04でRTL8189FTV （RTL8188FU）ドライバのDKMS化 (r271-635)](https://netlog.jpn.org/r271-635/2019/06/ubuntu_rtl8189ftv_dkms.html "Ubuntu 16.04でRTL8189FTV （RTL8188FU）ドライバのDKMS化 (r271-635)")

これを参考にカーネルアップデート時に自動でリビルドするDKMSに対応させる作業をしていた。
しかし、5.4.xにe1000eが標準で含まれているらしいことがわかり、結局無駄になってしまった（この作業は不要であるので、DKMSを使うときのメモとして）。

```sh
sudo apt install dkms
```

ここで気づくのだが、5.4.xには標準でe1000eのドライバが入っているらしい。

```sh
$ find /lib/modules/5.4.42-050442-generic -name e1000e*
/lib/modules/5.4.42-050442-generic/kernel/drivers/net/ethernet/intel/e1000e
/lib/modules/5.4.42-050442-generic/kernel/drivers/net/ethernet/intel/e1000e/e1000e.ko
```

ともあれ、まずは`/usr/src`以下にソースディレクトリをコピーする。
今回の場合、`e1000e-3.8.4.tar.gz`を解凍した`e1000e-3.8.4`ディレクトリを`/usr/src/e1000e-3.8.4`としてコピーする。
そして`/usr/src/e1000e-3.8.4/dkms.conf`を作成する。

dkms.confの細かい説明：[Ubuntu Manpage: dkms - Dynamic Kernel Module Support](https://manpages.ubuntu.com/manpages/bionic/man8/dkms.8.html#dkms.conf "Ubuntu Manpage: dkms - Dynamic Kernel Module Support")

ディレクトリ構造
```
| /usr/src/e1000e-3.8.4/
|-- README
|-- dkms.conf  <-- New!
|-- ...
|-- src/
|----- Makefile
|----- e1000.h
|----- ...
```

dkms.conf
```dkms
PACKAGE_NAME="e1000e"
PACKAGE_VERSION="3.8.4"
CLEAN="cd src; make clean"
BUILD_MODULE_NAME[0]="e1000e"
BUILT_MODULE_LOCATION[0]="src/"
DEST_MODULE_NAME[0]="e1000e-dkms"
MAKE[0]="cd src; make -j$(nproc)"
DEST_MODULE_LOCATION[0]="/updates/dkms"
AUTOINSTALL="yes"
```

これだけでDKMSに登録する準備が完了した。次はDKMSにこのソースディレクトリを登録する。
DKMSはデフォルトで`/usr/src`以下のディレクトリを見に行くように思われる。

```sh
$ sudo dkms add e1000e/3.8.4

Creating symlink /var/lib/dkms/e1000e/3.8.4/source ->
                 /usr/src/e1000e-3.8.4

DKMS: add completed.
```

`/var/lib/dkms/e1000e/3.8.4/source`からのシンボリックリンクが張られ、DKMSに登録された。DKMSから削除するには：

```sh
$ sudo dkms remove e1000e/3.8.4 --all

------------------------------
Deleting module version: 3.8.4
completely from the DKMS tree.
------------------------------
Done.
```

次はビルドしてみる。

```sh
$ sudo dkms build e1000e/3.8.4

Kernel preparation unnecessary for this kernel.  Skipping...

Building module:
cleaning build area...
cd src; make -j8...
Signing module:
 - /var/lib/dkms/e1000e/3.8.4/5.4.42-050442-generic/x86_64/module/e1000e-dkms.ko
Secure Boot not enabled on this system.
cleaning build area...

DKMS: build completed.
```

そしてインストール。

```sh
sudo dkms install e1000e/3.8.4

e1000e-dkms:
Running module version sanity check.
 - Original module
   - No original module exists within this kernel
 - Installation
   - Installing to /lib/modules/5.4.42-050442-generic/updates/dkms/

depmod...

DKMS: install completed.
```

自動でモジュールが読み込まれないと思われるので、modprobeを使って手動で読み込む。

```sh
sudo modprobe e1000e-dkms
```

## セキュリティアップデートについて
