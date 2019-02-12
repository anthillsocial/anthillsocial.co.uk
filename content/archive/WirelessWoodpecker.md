+++
image = "/img/wirelesswoodpecker/woodpecker.jpg"
showonlyimage = false
description="An electronic woodpecker that taps the presence of wireless signals"
draft = false
date = "2012-11-05T19:53:42+05:30"
mydate ="2012"
title = "Wireless Woodpecker"
project = ["key", "archive"]
+++  

![Woodpecker](/img/wirelesswoodpecker/woodpecker.jpg)

A wireless sniffer application and electronic woodpecker that responds to wireless signals found in the landscape. The woodpecker taps out the number of wireless signals in the area, serving to communicating wireless presence.

Routers left on their default setting serve as a advert for a corporate Internet Service Providers. Text signals promise freedom with names such as *BTopen* or *SKY+*. Signals are encrypted, and hundreds of signals are marked as 'hidden'. The odd home router broadcasts personal names such as *paul* or *Steves Router*. The language of routers patterns our everyday actions and experience.

The device was built using an old doorbell I found in a skip. The solenoid from the doorbell was controlled using an Arduino board attached to a WiShield  (no longer manufactured) purchased from ebay. A Perl script on a laptop searched for wireless devices in the area then trigger the Woodpecker if a strong signal was found.
