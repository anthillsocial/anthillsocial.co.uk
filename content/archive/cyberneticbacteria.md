+++
image = "/img/CyberneticBacteria/gallery/orac.jpg"
showonlyimage = false
description="The chemical communication of bacteria and the live data streams of our digital networks combine to generate a new artificial life form."
draft = false
date = "2009-09-05T19:53:42+05:30"
mydate = "2009"
title = "Cybernetic bacteria"
project = ["key", "archive"]
sidebarpage="/archive/cyberneticbacteria-sidebar.md"
+++

{{< load-photoswipe >}} 

**Exhibited 17th April to 17th July 2009:** Exhibited as part of <a href="www.sciencegallery.com/Infectious">INFECTIOUS: STAY AWAY</a>,
Commissioned by the Dublin Science Gallery. Authors are Anna Dumitriu, Tom Keene, Lorenzo Grespan, Dr. Simon Park, Dr Blay Whitby.        
<a href="http://www.buzzfeed.com/infectiousnews">Press: Buzzfeed</a>, <a href="http:/www.buzzfeed.com/sophiav/deadly-anthrax-virus-stolen-from-dublin-gallery-aub">Press: Deadly anthrax virus stolen from gallery</a>.   
**Exhibited Sept 2010:** <a href="http://watermans.lastexitlondon.com/exhibitions/exhibitions/unleashed-devices.aspx">Unleashed Devices: Watermans </a> An exhibition of DIY, hacking and open source projects by artists who explore technologies critically and creatively.    

In Cybernetic Bacteria 2.0, the chemical communication of bacteria and the live data streams of our own digital networks (the wireless / bluetooth / RFID activity taking place in and around the gallery) are combined in real time to generate a brand new artificial life form. This installation (visited by over 45,000 people, dublin science Gallery, 2009) explores the layers of complexity in both digital and organic communications networks and investigates the relationship of bacteria to artificial life. A collaboration between; Anna Dumitriu, Dr. Simon Park, Dr Blay Whitby, Tom Keene and Lorenzo Grespan.

"The scientist, unconcerned with the ethical implications of his experiment and also unaware of the artist’s intentions, never anticipated that the fusion of the Earth’s global bacterial communications network, with that of human origin would lead to the evolution of a novel and chimeric life form. A new kind of pathogen mutated by the Bluetooth, RFID and Packet Data surveilled in the gallery. Dublin became the centre of the epidemic, and the origin of a new life form able to subvert both biology and technology. What followed was inevitable. What else would a creature with access to: humanity’s entire digital knowledge; the genetic toolbox that drives evolution; the sophistication of the pathogen; and intimate awareness of our vulnerabilities do?"

#### Technical Description
The device has acquired the nickname "Orac" (the supercomputer from the TV series Blake 7). It consists of a network of micro-controllers, each searching for electronic devices in the immediate environment. Each time a device is discovered, its unique ID is recorded and sent to an artificial life form based on bacterial communication systems. Each circular flash of pixels is a new device detected; white are the tags worn by visitors, blue are bluetooth devices and red are RFID touch cards.

A bluetooth device (near the hacked mobile phone) scans the area for mobile phones or laptops with bluetooth enabled. The white tag (marked sputnik) detects the tags worn by visitors to the exhibition and the green pad to the right responds to the white cards attached to the plinth. Every 2 seconds each of the three devices are 'asked' by a mini webserver if they have new data, which is sent via the red ethernet cable to the artificial lifeform.

#### The artificial lifeform

The artificial lifeform follows Conways Game of Life:
<ul>
<li>Any live cell with fewer than two live neighbours dies, as if caused by underpopulation</li>
<li>Any live cell with more than three live neighbours dies, as if by overcrowding.</li>
<li>Any live cell with two or three live neighbours lives on to the next generation.</li>
<li>Any dead cell with exactly three live neighbours becomes a live cell.</li>
</ul>
There are 2 simple additions (modelled on the communication structure of genetically modified bacteria) to the basic game:
<ul>
	<li>If a white cell has a blue cell next to it, it will become blue</li>
	<li>Every time a cell goes 'on', it will count the number of neighbours of the same colour and become that colour</li>
</ul>

#### Video

<object width="536" height="333"><param name="movie" value="http://www.youtube.com/v/XQTdvvVH-kk?fs=1&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/XQTdvvVH-kk?fs=1&amp;hl=en_US" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="536" height="333"></embed></object>

<strong>Genetically modified bacteria</strong>
The bacteria depicted in the video are:
Chromobacterium violaceum = purple
Serratia Marcasens = red
CV026 = white
Where Purple communicates to white.
White can't communicate, only listen. We know it listens because it turns purple.
Red talks, but has no receiver.

<strong>Bluetooth reader (mobile phone)</strong>
Bluetooth protocol allows for the exchange of data over short distances from fixed and mobile devices.

<strong>Open beacon "sputnik" tag (http://tinyurl.com/dhj6q5)</strong>
An active RFID device which operates in the 2.4GHz band. It detects tags worn by individuals in near proximity, both broadcasting its presence and recording interaction with other similar tags.

<strong>RFID Card reader (http://en.wikipedia.org/wiki/RFID)</strong>
A passive device operating in the 13.56 MHz frequency range. Uses for this touch based technology include payment in transport systems, library systems, and passport control.
