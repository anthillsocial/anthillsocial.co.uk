+++
image = "/img/uncertainSubstance/main.jpg"
showonlyimage = false
description="A speech recognition algorithm searches radio waves for conversations about money."
draft = false
date = "2012-09-05T19:53:42+05:30"
mydate = "2012"
title = "Uncertain substance: The Viterbi Algorithm"
sidebartext="<h4><a href=\"/fragments/softwaredefinedradio/\">Create software defined radio for the RaspberryPi</a></h4><img src=\"/img/uncertainSubstance/screen.jpg\" /><img src=\"/img/uncertainSubstance/conversation.jpg\" />"
project = ["key", "archive"]
+++  

![Porters office installation](/img/uncertainSubstance/main.jpg)
{{< load-photoswipe >}}

A speech recognition algorithm searches radio waves for conversations about money. As an ongoing investigation of the Viterbi algorithm, this project seeks to understand the agency of a mathematical entity that operates as structural thread within the fabric of contemporary society.

I created a speech recognition server based on the open source project CMUsphinx. I also created a software defined radio server based around a hacked £10 USB TV tuner that automatically tuned into analog radio stations. The speech recognition server listened to the audio output of the software defined radio. If the system detected a conversation about money on the radio then it would stay on that radio station for a while. The system searched for keywords such as Money, Credit, Debt, Thousand, Billion, Trillion etc. If the system didn't find any words within 20 seconds then it would search for another radio station.

Installed in the 'Janitors office', Goldsmith University of London 6th -8th July 2012. Mobile version performed at <a href="http://www.movingforest.net/">Moving Forest</a> July 2012. An interview, by Regine Debatty of *We Make Money Not Art*, which provides <a href="http://www.we-make-money-not-art.com/archives/2012/08/uncertain-substance-the-viterb.php#.UCPQpR1wYco]">further description</a> of the project.

{{< gallery dir="/img/uncertainSubstance/gallery" />}}


#### The Viterbi algorithm
Conceived in 1966 the Viterbi was originally used for digital signal processing where it detects and corrects errors in digital codes. Its use has subsequently extended through the technologies of speech recognition, DNA analysis, video encryption, deep space, and wireless communications systems. Physical manifestations of this algorithm exists as microchips installed in billions of mobile devices worldwide, enabling communications networks to permeate every conceivable space, blurring distinction between home, work and social environments.

Used to identify patterns and trends of human behaviour, the Viterbi plays a role in automated systems that interpret, record and report on human activity. These systems increasingly make economic decisions, govern response to crime, disaster, and health. The Viterbi operates at a deep social level as it constructs new sets of social relations and radically shapes the development of our cities.

#### Installation: The porters office
![Porters office installation](/img/uncertainSubstance/reception.jpg)

One version of the system was installed in an old porters office in Goldsmiths University. The office displayed two very dull looking computers and monitors. One monitor displayed the software defined radio. The second monitor displayed the output from the speech recognition system as it attemted to convert audio into text.

As I prepared the porters office for the installation I discovered a pretty depressing history. There were old letters of redundancy, a broken pair of spectacles, betting slips, a small screen marked "payroll". I incorporated these elements in the space as a subtle way of illustrating the entanglement of algorithms into everyday lives and other media systems.

#### Installation: The shopping trolley
![The shopping trolly](/img/uncertainSubstance/trolly.jpg)
A second version of the system was built into a shopping trolley which I tested at an event titled 'Moving Forrest' held at Chelsea College of Art. The trolley rabdomly broadcast radio stations and a digital voice that stated "I found money" each time a keyword was discovered in the radio output.

#### The Build
Radio Server, Speech recognition server, Shopping trolley, CCTV Observation screen, Receipt printer, Speaker, Antenna, Notes, Betting slips, Spectacles. For the speech recognition server I utilised the FLOSS project <a href="http://cmusphinx.sourceforge.net/">CMUSphinx</a> and for the radio tuning I created a software defined radio using a cheap £10 USB TV tuner which I hacked to create a simple <a href="http://hackaday.com/2012/06/11/balint-is-starting-a-software-defined-radio-tutorial-series/">software defined radio</a>.

#### Code
Uses <a href="https://github.com/csete/gqrx" >GQRX</a> (C++), <a href="http://cmusphinx.sourceforge.net/">CMU SPhinx</a> (C with a Python wrapper) and Python servers to communicate between components situated on multiple machines. The install process is not for the faint hearted! Follow instructions of reach of the software packages then use the scripts below to connect them all together.

    # Startup script
    cd /script/root/dir
    nohup gqrx-build-desktop-Desktop_Qt_4_8_1_for_GCC__Qt_SDK__Release/gqrx &
    sleep 5
    nohup python espeakserver.py &
    nohup python keyserver.py &
    python voice.py


    # Python voice recognition code using CMU Sphinx

    #!/usr/bin/env python
    # Tom Keene
    # Script evolved from: Carnegie Mellon University.
    # You may modify and redistribute this file under the same terms as
    # the CMU Sphinx system.  See
    # http://cmusphinx.sourceforge.net/html/LICENSE for more information.
    # =======TODO=========
    # - Check / set current audio model.
    # - Create audio model.
    # - Auto soundcard swap.
    # - Keep limited text
    # ====================
    import threading
    import re
    import time
    import socket
    import sys
    import errno
    import pygtk
    pygtk.require('2.0')
    import gtk
    import gobject
    import pygst
    pygst.require('0.10')
    gobject.threads_init()
    import gst

    class DemoApp(object):

        """GStreamer/PocketSphinx Demo Application"""
        def __init__(self):
            """Initialize a DemoApp object"""
            self.init_gui()
            self.init_gst()
            self.init_keywords()
            self.init_timer()
            self.init_client()

        def init_client(self):
            """KeyserverToChangeFrequency"""
            self.TCP_IP = '127.0.0.1'
            self.TCP_PORT = 50000
            """Found Money Server"""
            self.TCP_IP2 = '127.0.0.1'
            self.TCP_PORT2 = 50001
            """Shared Vars"""
            self.BUFFER_SIZE = 1024
            self.MESSAGE="Change Frequency"

        def client_connection(self):
            """KeyserverToChangeFrequency"""
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect((self.TCP_IP, self.TCP_PORT))
            s.send(self.MESSAGE)
            data = s.recv(self.BUFFER_SIZE)
            s.close()
            # print "Received:", data

        def init_timer(self):
            self.starttimer()
            self.myshed = threading.Timer(5.0, self.checkbordem)  
            self.myshed.start()

        def checkbordem(self):
            mytimer = self.checktimer()
            if(mytimer>=15):
                self.starttimer()
                self.client_connection()
                print "Don't understand || Bad recieption"
                print "Changing Frequency"
            self.myshed = threading.Timer(2.0, self.checkbordem).start()

        def checktimer(self):
            return time.time()-self.timer

        def starttimer(self):
            self.timer = time.time()

        def init_keywords(self):
            """Load External File With Keyword List"""
            keywords = open("keywords.txt").read()
            keywords = keywords.replace("\n", '')
            keywords = keywords.replace(' ', '')
            keywords = keywords.upper()
            keywords = keywords.split(',')
            print "KEYWORDS:"
            print keywords
            self.keywords = keywords

        def init_gui(self):
            """Initialize the GUI components"""
            # Setup the window
            self.window = gtk.Window()
            self.screen = self.window.get_screen()
            w = self.screen.get_width();
    	h = self.screen.get_height()/3;
            self.window.connect("delete-event", gtk.main_quit)
            self.window.set_default_size(w, h)
            self.window.set_usize(w, h) # make window fixed size
            self.window.set_position(gtk.WIN_POS_CENTER)
            self.window.set_border_width(3)
            self.window.set_keep_above(0)
            self.window.set_title("<!-----Searching Conversation-----!>")
            self.window.move(0,0)
            vbox = gtk.VBox()  

            # Manage the textarea
            self.textbuf = gtk.TextBuffer()
            self.text = gtk.TextView(self.textbuf)
            self.text.set_wrap_mode(gtk.WRAP_WORD)
            self.text.set_justification(gtk.JUSTIFY_CENTER)
            vbox.pack_start(self.text)

            # Setup the button
            #self.button = gtk.ToggleButton("Report")
            #self.button.connect('clicked', self.button_clicked)
            #vbox.pack_start(self.button, False, False, 2) # refernce expand, fill, padding

            self.window.add(vbox)
            self.window.show_all()

        def init_gst(self):
            """Initialize the speech components"""
            # Set audio source to gconfaudiosrc OR  alsasrc OR pulseaudiosrc OR jacksrc
            self.pipeline = gst.parse_launch('alsasrc ! audioconvert ! audioresample '
                                             + '! vader name=vad auto-threshold=true '
                                             + '! pocketsphinx name=asr ! fakesink')

            asr = self.pipeline.get_by_name('asr')
            asr.connect('partial_result', self.asr_partial_result)
            asr.connect('result', self.asr_result)
            asr.set_property('configured', True)

            bus = self.pipeline.get_bus()
            bus.add_signal_watch()
            bus.connect('message::application', self.application_message)

            #self.pipeline.set_state(gst.STATE_PAUSED)
            self.pipeline.set_state(gst.STATE_PLAYING)

        def asr_partial_result(self, asr, text, uttid):
            """Forward partial result signals on the bus to the main thread."""
            struct = gst.Structure('partial_result')
            struct.set_value('hyp', text)
            struct.set_value('uttid', uttid)
            asr.post_message(gst.message_new_application(asr, struct))

        def asr_result(self, asr, text, uttid):
            """Forward result signals on the bus to the main thread."""
            struct = gst.Structure('result')
            struct.set_value('hyp', text)
            struct.set_value('uttid', uttid)
            asr.post_message(gst.message_new_application(asr, struct))

        def application_message(self, bus, msg):
            """Receive application messages from the bus."""

            msgtype = msg.structure.get_name()
            self.partial = 0;
            if msgtype == 'partial_result':
                self.partial_result(msg.structure['hyp'], msg.structure['uttid'])
                if(self.partial==0):
                  #print "Viterbi: Defining most probable sequence"
                  self.partial = 1

            elif msgtype == 'result':
                # Print complete message to text box
                hyp = msg.structure['hyp']
                self.final_result(hyp, msg.structure['uttid'])
                self.partial = 0
                searchtext = hyp
                nums = len(hyp.split(" "))
                if(nums>=3):
                   print "Interesting conversation: "+str(nums)+" words"
                   print "Continue search on this frequency"
                   self.starttimer()

                # Perform keyword search
                for item in self.keywords:
                    if searchtext.find(item) > -1:
                        print "!!!!Matched Keyword:"+item
                        self.starttimer()
                        """Found Money Server"""
                        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                        s.connect((self.TCP_IP2, self.TCP_PORT2))
                        s.send("Found - "+item)
                        data = s.recv(self.BUFFER_SIZE)
                        s.close()

                # Create a new paragraph /  ivider
                self.textbuf.insert_at_cursor(" | ")               
                if(self.textbuf.get_char_count()>1800):
                    self.textbuf.set_text("TEXT BUFFER: ")

        def partial_result(self, hyp, uttid):
            """Delete any previous selection, insert text and select it."""
            # All this stuff appears as one single action
            self.textbuf.begin_user_action()
            self.textbuf.delete_selection(True, self.text.get_editable())
            self.textbuf.insert_at_cursor(hyp)
            ins = self.textbuf.get_insert()
            iter = self.textbuf.get_iter_at_mark(ins)
            iter.backward_chars(len(hyp))
            self.textbuf.move_mark(ins, iter)
            self.textbuf.end_user_action()
            nums = len(hyp.split(" "))
            if(nums>=5):
                self.starttimer()

        def final_result(self, hyp, uttid):
            """Insert the final result."""
            # All this stuff appears as one single action
            self.textbuf.begin_user_action()
            self.textbuf.delete_selection(True, self.text.get_editable())
            #self.textbuf.delete()
            print " "
            print "Viterbi matched most likely text:"
            print hyp
            print " "
            self.textbuf.insert_at_cursor(hyp)
            self.textbuf.end_user_action()

        #def button_clicked(self, button):
        #    """Handle button presses."""
        #    if button.get_active():
        #        button.set_label("Report")
        #        #self.pipeline.set_state(gst.STATE_PLAYING)
        #    else:
        #        button.set_label("Report:2")
        #       # self.pipeline.set_state(gst.STATE_PAUSED)
        #        #vader = self.pipeline.get_by_name('vad')
        #        #vader.set_property('silent', True)

    app = DemoApp()
    gtk.main()



#### Keywords to search for in Keywords.txt

    account,add,asset,bank, balance,billion,borrow,broke,buy,cash,cheque,check,cheap,cleared,coin,
    commission,consume,contract,credit,debt,dollar,dosh,eight,eleven,fifty,fifth,five,four,funds,
    hundred,invest,market,minus,million,money,note,nine,one,owed,plus,pound,rate,
    record,rate,share,stock,six,seven,secure,sale,shop,tax,term,two,three,dollar,
    trillion,ten,twelve,thirteen,fifteen,twenty,thirty,thousand


#### Quick hack to get GQRX to change radio channels by using key commands

    #!/usr/bin/env python
    from socket import *     
    import os

    # Grab name of GQRX window
    p = os.popen("xwininfo -root -all | grep ezcap |  awk '{print $1}'")
    WINDOWREF = p.readline()
    WINDOWREF = WINDOWREF.replace("\n", '')
    p.close()
    wincommand = 'xvkbd -window '+str(WINDOWREF)+' -text "f"'
    if(WINDOWREF==''):
       print "No windo0w refernece"
       wincommand = 'xvkbd -text "No available window"'

    ##let's set up some constants
    HOST = ''    #we are the host
    PORT = 50000    #arbitrary port not currently in use
    ADDR = (HOST,PORT)    #we need a tuple for the address
    BUFSIZE = 4096    #reasonably sized buffer for data

    # If the port is already open then kill the process
    #while True:
    command = 'kill -9 $( lsof -i:'+str(PORT)+' -t )'
    os.system(command)

    ## now we create a new socket object (serv)
    ## see the python docs for more information on the socket types/flags
    serv = socket( AF_INET,SOCK_STREAM)    
    serv.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)

    ##bind our socket to the address
    serv.bind((ADDR))    #the double parens are to create a tuple with one element
    serv.listen(5)    #5 is the maximum number of queued connections we'll allow

    print 'listening...'

    while True:
       conn,addr = serv.accept() #accept the connection
       print '...connected!'
       os.system(wincommand)
       print "COMMAND:"+wincommand
       conn.send('tuning')

    conn.close()


#### Python server to receive "Found Money" Notifications

    from socket import *
    from datetime import datetime
    import os

    ##let's set up some constants
    HOST = ''    #we are the host
    PORT = 50001    #arbitrary port not currently in use
    ADDR = (HOST,PORT)    #we need a tuple for the address
    BUFSIZE = 4096    #reasonably sized buffer for data

    # If the port is already open then kill the process
    #while True:
    command = 'kill -9 $( lsof -i:'+str(PORT)+' -t )'
    os.system(command)

    ## now we create a new socket object (serv)
    ## see the python docs for more information on the socket types/flags
    serv = socket( AF_INET,SOCK_STREAM)

    ##bind our socket to the address
    serv.bind((ADDR))    #the double parens are to create a tuple with one element
    serv.listen(5)    #5 is the maximum number of queued connections we'll allow

    serv = socket( AF_INET,SOCK_STREAM)

    ##bind our socket to the address
    serv.bind((ADDR))    #the double parens are to create a tuple with one element
    serv.listen(5)    #5 is the maximum number of queued connections we'll allow
    print 'listening...'

    o = 1
    while(o):
       conn,addr = serv.accept() #accept the connection
       data = conn.recv(1024) # receive up to 1K bytes
       mytime = str(datetime.now())
       print "          Found Money: "+mytime
       os.system('espeak "'+data+'" ')
       conn.send('Got message')

    conn.close()
