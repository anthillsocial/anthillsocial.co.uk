+++
image = "/img/Nullerror/window.jpg"
showonlyimage = false
description="..."
draft = false
date = "2013-09-05T19:53:42+05:30"
mydate = "2013"
title = "Null error"
project = ["fragment"]
+++  

I incorporated some simple error checking code as I wrote a perl script that communicated with an Arduino board. I found that the arduino hardware generated unexpected characted as it passed data to my laptop.  I found that the process of writing code raised questions about the reliability of computational machines. Code cannot be written that error checks for all eventualities, things burn, get dropped, or stop working. Yet for some reason, computers impart a belief system that errors can be ironed out and machines can be trusted, are reliable, and dependable - machines don't make errors, humans do.

![Error check](/img/Nullerror/window.jpg)

    #!/usr/bin/perl
    # SERIAL ERROR CHECK
    # Tom Keene - www.theanthillsocial.co.uk - 2011
    # This script uses the SerialPort module for perl.
    # - Install using this comandline: cpan Device::SerialPort
    # List serial port device names on the terminal with: dmesg | grep tty
    # On linux, device names seem to be called: /dev/ttyUSB0 OR /dev/ttyUSB1 ect
    # Corresponding arduino code is provided at the bottom of this script

    use warnings;
    use strict;

    # Connect to a serial port, specifying the device to connect to
    my $port = &connectme("/dev/ttyUSB0");

    # continually write a message to the serial port and wait for a response
    my $msg = 1;
    while(1){
      &callresponse($port, $msg, 300);
      $msg++;
      sleep(1);
    }

    # SERIAL CONNECTION
    sub connectme(){
      # Sample Perl script to transmit number
      # to Arduino then listen for the Arduino
      # to echo it back
      use Device::SerialPort;
      # Set up the serial port
      # 19200, 81N on the USB ftdi driver
      my $PortName = $_[0];
      my $port = Device::SerialPort->new($PortName) || die "ERROR WITH SERIAL PORT NAME: \"$PortName\" \n$!\n\n";
      $port->databits(8);
      $port->baudrate(19200);
      $port->parity("none");
      $port->stopbits(1);
      return $port;
    }

    # WRITE TO THE SERIAL PORT AND WAIT FOR A RESPONSE
    sub callresponse(){
      my $port = $_[0];
      my $msg = $_[1];
      my $trys = $_[2];
      my $char;
      sleep(1);
      $port->write("$msg\n");
      print "Sent: $msg ";
      while($trys>=0){
          $char = $port->lookfor();
          if($char){
             print "Recieved: " . $char . " \n";
             $trys=-1;
          }
          $trys=$trys-1;
      }
      if($char ne $msg){
        print "Failed: recieved weirdness \"$char\" \n";
      }
      return $char;
    }

    #================ARDUINO-CODE====================================
    char incomingByte;              // for incoming serial data
    char str1[50];
    int count = 0;

    void setup ()
    {
      Serial.begin(19200);
      digitalWrite (13, HIGH);      //turn on debugging LED
    }


    //  MAIN CODE
    void loop ()
    {
      // send data only when you receive data:
      if (Serial.available () > 0)
        {
          // read the incoming byte:
          incomingByte = Serial.read ();

          // Store it in a character array
          str1[count] = incomingByte;
          count++;

          // check if we have over 49 characaters or we recieve a return or line feed
          if (count > 49 || incomingByte == 10 || incomingByte == 13)
            {
              // Send the string back
              Serial.print (str1);
              count = 0;
            }
        }
    }
