+++
image = "/img/WiFungi/Wifungi1.jpg"
showonlyimage = false
description="A soundscape generated by plant sensors and wirelessley transmitted to Wifungi speakers."
draft = false
date = "2013-11-05T19:53:42+05:30"
mydate ="2013"
title = "Wifungi"
project = ["key", "archive"]
+++  

A project by Tom Keene &amp; Caryl Mann, commissioned by the <a href="http://uplondon.net">Urban Prototyping Festival</a> April 8th - June 26th 2013, presented at the UP London showcase at the V&amp;A 21st &amp; 22nd May 2013. Also exhibted as part of the Herne Hill urban green roof project in 2013.

<div style="margin-bottom:5px;">![Wifungi speaker](/img/WiFungi/Wifungi1.jpg)</div>
{{< gallery dir="/img/WiFungi/gallery1" />}}
{{< load-photoswipe >}}

We aim to give a voice to inaccessible or hidden green spaces such as green roofs or the tops of trees.A soundscape generated by sensors attached to plants and played through solar powered speakers (Wi-Fun-Gi) will playfully introduce people to the existence and value of these green spaces, and their role in the broader urban ecology.

The value of these spaces and their place in urban planning is not widely understood.  Urban greening is essential to help London and cities worldwide adapt to climate change. There is a growing recognition that green spaces (public, private, accessible, inaccessible) are a vital way of improving the environment in which we live. They make a significant difference to local air quality, help combat rises in temperature, absorb storm water ‘run-off’, reduce flooding, and provide places for wildlife such as bees, butterflies and beetles to live, feed and nest.   

In this context the term ‘soundscape’ refers to a composition that uses recorded and live sounds, vibration and emissions of the green spaces and local acoustic environment. The installation of DIY sensors will collect and transmit sound and data, and  reveal the hidden interactions, movements, vibrations, and electromagnetic emissions of the broader local environment.  This includes the complex intersection of plants, buildings, weather, water, wildlife, transport systems and people.  

### The build

#### The 'Fungi' speakers

![Wifungi speaker](/img/WiFungi/speakerinside.jpg)

The speaker enclosures were made with layers of cardboard covered with a mix of plaster, PVA glue and acrylic paint (see image below), and allowed to dry for 24 hours. A central space was then cut out using a scalpel to allow space for a speaker and small amplifier. We had intended for the smartphone and battery to be contained within the enclosure, but for this prototype there wasn't quite enough room so we places the phone and battery in a small tupperware container which we attached to the solar panel.  We then cut a ring of thin plywood on which to mount the speaker, amplifier, volume control, line input and power connector. The ply was then screwed directly into the cardboard/PVA enclosure.

#### The electronics

<div style="margin-bottom:5px;">![Wifungi speaker](/img/WiFungi/01diagram.jpg)</div>
{{< gallery dir="/img/WiFungi/gallery2" />}}

We experimented with flex sensors, light sensors, vibration sensors (piezo elements), attaching each of them to IOIO board which allowed data to be recorded by the Galaxy smart phones we were using.

#### The transmitter/receiver software
![Wifungi speaker](/img/WiFungi/wiFungiScreen.jpg)

We wrote a custom android application that managed distribution of data and audio recordings. The application identifies a pair of mobile phones as one receiver and one transmitter. A central PHP server manages distribution of audio files. All prototype code for this project can be downloaded via <a href="https://github.com/anthillsocial/WiFungi" title="https://github.com/anthillsocial/WiFungi">www.github.com</a>

**Transmitter mode:** 1) Records audio through the mic input. 2) Records sensor data via the IOIO device. 3) Posts that data to a central server. 4) A PHP script on the server saves the data. **Receiver mode:** 1) Checks the server for any new data. 2) Downloads data. 3) Plays back any new audio recordings. 4) Generates a soundscape based on sensor data.

### Parts list

SPEAKERS: PVA Glue, Cardboard, 7w Velleman mono audio Amplifier, 47k Logarithmic potentiometer, female RCA (phono) connector, 9mm power socket, 4 pin 3.5mm mini jack to 3 x rca composite av cable (stereo audio cables were soldered together to make a mono output), Galaxy S2 smartphone.

SENSORS: IOIOgt Board, 4 pin 3.5mm mini jack to 3 x rca composite av cable (used to connect an external contact mic), piezo element (the external mic), Galaxy S2 smartphone, 3x 1k resistors, flex sensor, Light dependent resistor, 2*8 way green screw headers 2.54mm, 2*2 gang green screw headers 2.54mm (From RS).

{{< gallery dir="/img/WiFungi/gallery3" />}}
