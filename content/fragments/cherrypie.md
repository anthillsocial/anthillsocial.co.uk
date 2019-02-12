+++
image = "/img/cherrypy/cherrypy.png"
showonlyimage = false
description="Serve web pages from with python"
draft = false
date = "2014-09-05T19:53:42+05:30"
mydate = "2014"
title = "Python3+CherrPy+Jinja "
project = ["fragment"]
sidebartext = ""
+++

A working python3 example of the CherryPy web framwork used with Python3 and the jinja templating engine. CherryPy's documentation was out of date so this is a working example which which develops from cherryPy's ajax demo. You need to create the following directory structure and code:

##### Directory structure
    ajax.py
    /templates/index.html
    /public/css/style.css


##### ajax.py

    import os, os.path
    import random
    import string
    import cherrypy
    from jinja2 import Environment, PackageLoader
    env = Environment(loader=PackageLoader('ajax', 'templates'))

    class StringGenerator(object):
        @cherrypy.expose
        def index(self):
            template = env.get_template('index.html')
            return template.render(the='variables', go='here')

    class StringGeneratorWebService(object):
        exposed = True

        @cherrypy.tools.accept(media='text/plain')
        def GET(self):
            return cherrypy.session['mystring']

        def POST(self, length=8):
            some_string = ''.join(random.sample(string.hexdigits, int(length)))
            cherrypy.session['mystring'] = some_string
            return some_string

        def PUT(self, another_string):
            cherrypy.session['mystring'] = another_string

        def DELETE(self):
            cherrypy.session.pop('mystring', None)

    if __name__ == '__main__':
        conf = {
            '/': {
                'tools.sessions.on': True,
                'tools.staticdir.root': os.path.abspath(os.getcwd())
            },
            '/generator': {
                'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
                'tools.response_headers.on': True,
                'tools.response_headers.headers': [('Content-Type', 'text/plain')],
            },
            '/static': {
                'tools.staticdir.on': True,
                'tools.staticdir.dir': './public'
            }
        }
        webapp = StringGenerator()
        webapp.generator = StringGeneratorWebService()
        cherrypy.quickstart(webapp, '/', conf)



##### public/css/style.css

      background-color: blue;
    }

    #the-string {
        display: none;
    }


##### templates/index.html

    <html>
       <head>
         <link href="/static/css/style.css" rel="stylesheet">
         <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
         <script type="text/javascript">
           $(document).ready(function() {

             $("#generate-string").click(function(e) {
               $.post("/generator", {"length": $("input[name='length']").val()})
                .done(function(string) {
                   $("#the-string").show();
                   $("#the-string input").val(string);
                });
               e.preventDefault();
             });

             $("#replace-string").click(function(e) {
               $.ajax({
                  type: "PUT",
                  url: "/generator",
                  data: {"another_string": $("#the-string").val()}
               })
               .done(function() {
                  alert("Replaced!");
               });
               e.preventDefault();
             });

             $("#delete-string").click(function(e) {
               $.ajax({
                  type: "DELETE",
                  url: "/generator"
               })
               .done(function() {
                  $("#the-string").hide();
               });
               e.preventDefault();
             });

           });
         </script>
       </head>
       <body>
         <input type="text" value="8" name="length" />
         <button id="generate-string">Give it now!</button>
         <div id="the-string">
             <input type="text" />
             <button id="replace-string">Replace</button>
             <button id="delete-string">Delete it</button>
         </div>
       </body>
    </html>
