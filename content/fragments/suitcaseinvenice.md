+++
image = "/img/SuitcaseInVenice/cuckooatGranCanal.jpg"
showonlyimage = false
description="A suitcase built for the artist Kypros Kyprianou"
draft = false
date = "2015-09-05T19:53:42+05:30"
mydate = "2015"
title = "Venice suitcase"
project = ["fragment"]
sidebarpage=""
+++  

I built a ticking suitcase that opens when the sound of a clock chimes. This was commissioned by the artist <a href="http://www.electronicsunset.org/node/2530">Kypros Kyprianou</a>. Kypros took the suitcase to the Swiss consulate during the preview week of the Venice Biennale.

<video width="100%" height="auto" controls>
 <source src="/img/SuitcaseInVenice/SuitcaseVid.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

#### The build

A stepper motor (forward, reverse, stop) is controlled by audio frequency using a Raspberry Pi. The system allowed Kyrpos to create an audio file with  frequencies on one channel that controlled a stepper motor, and clock sounds on the other channel that played when the suitcase opened. The following hardware was used:

- Raspbery Pi 2
- Getbot Rpi stepper motor controller board.
- 12V, 1.7A, 667oz-in NEMA-17 Bipolar Stepper Motor
- 8mm Set Screw Hub

#### <a href="https://github.com/anthillsocial/suitcase">Download code from github</a>
