+++
image = "/img/fragments/radio.png"
showonlyimage = false
description="Software defined radio with the RaspberryPi"
draft = false
date = "2014-09-05T19:53:42+05:30"
mydate = "2014"
title = "RaspberryPi radio"
project = ["fragment"]
sidebartext = "<img src=\"/img/fragments/radio.png\" /><h4><a href=\"/archive/uncertainsubstance/\">Used in Uncertain Substance project...</a></h4>"
+++



Instructions to get a raspberry Pi up and running with a low cost TV tuner and software defined radio.

#### RESOURCES
Describes light weight usage of rtl-sdr: http://kmkeen.com/rtl-demod-guide/index.html

And the main documentation here: http://sdr.osmocom.org/trac/wiki/rtl-sdr

Network managment:  https://sites.google.com/site/embrtlsdr

Nice intro to sdr radio inc some gui's: http://jeffskinnerbox.wordpress.com/2013/05/

#### INSTALL ARCH LINUX ON A RASPBERRY PI
First burn a new archlinux SD card, then:       

1. pacman -Syy
2. pacman -S sudo
3. pacman -S alsa-utils
4. pacman -S alsa-plugins
5. pacman -S rtl-sdr
6. pacman -S sox
7. modprobe snd_bcm2835
8. amixer cset numid=3 1
9. useradd -m -g users -G audio -s /bin/bash newuser

#### LOGIN TO YOUR PI OVER A NETWORK

1. Find its IP address:

    sudo nmap -sP 192.168.1.0/24 | awk '/^Nmap/ { printf $5" " } /MAC/ { print }' - | grep Raspberry

2. Then ssh: root@192.168.1.?

#### PLAY SOME RADIO    

1. Put speaker volume right up using: alsamixer
2. Check audio output: speaker-test -c 2
3. Plug in your TV tuner
4. Test its working: rtl_test -t  
5. Tune into a frequency:

    rtl_fm -W -f 89.1M | play -r 32k -t raw -e signed-integer -b 16 -c 1 -V1 -

#### SPEECH RECOGNITION     

Follow these instructions:
https://sites.google.com/site/observing/Home/speech-recognition-with-the-raspberry-pi and test output:

    src/programs/pocketsphinx_continuous -samprate 48000 -nfft 2048
