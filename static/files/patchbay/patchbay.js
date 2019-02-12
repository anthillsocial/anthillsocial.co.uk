(function($){  
	
    $.fn.extend({   
        patchbay: function(o) { 
				
            // Set the default values, use comma to separate the settings
            var defaults = { 
				patch: '',
			    onSetPatch : function(){},
				highlighton: '#000',
				highlightoff: '#000',
				highlightbg: "#D3FF50",
				linkedbg: "#97B638",
				lineColour: '#0a87d6',
				linehilight: '#FF0600',
				fillColour: '#fff',
				circleFill: '#fff',
				circle:10,
				leftColX: 5,
				rightColX: 85,
            }  
            
			// Setup core variables available to all functions
			var o =  $.extend(defaults, o);  	// patchbay variables	
    		var ptch = $(this); 				// patchbay object
			var ptchID = '#'+ptch.attr('id'); 	// patchbay objectID
			var ptchSVG = ptchID+' .patching';  // patchbay svg area
			var routeArray = [];				// Store patch routing 
			var current = [];					// current selected input
			var canvheight = 0;				    // height of the canvas + li height below
			var liheight = parseInt($(ptchID+" li").css('height').replace(/px/gi,""))+1;
            var settingsStr = '';	
			var settingsArray = new Array();
			
			// Initialise the patchbay object
            return this.each(function() {  
				
				// PREP VARS
				var inputs = $(ptchID+" .inputs li");
				var outputs = $(ptchID+" .outputs li");				
				var newcanvheight = 0;
				
				// PREP HTML
				// Add an area to view current settings & setup patching height
				// Add a refernce ID to each of the list items & set height of canvas
				$(ptchID).append('<div class="settings"></div>');
				$.each(inputs, function(i,v) {
					// Initialise the patchbay array
					patch = $('.patch',v).html();
					$(v).attr("id", ptch.attr('id')+'i'+i);
					$(v).addClass('p'+patch);
					routeArray[i] = [patch, []];
					canvheight = i*liheight;
				});
				
				$.each(outputs, function(i,v) {
					patch = $('.patch',v).html();
					$(v).attr("id", ptch.attr('id')+'o'+i);
					$(v).data('background', 'none');
					$(v).addClass('p'+patch);
					lid = ""+patch;
					settingsArray[lid] = '00-'+patch;
					newcanvheight = i*liheight;
					if(newcanvheight>canvheight) canvheight = newcanvheight+liheight;
				});
				canvheight = canvheight+liheight;
				$(ptchSVG).css('height', canvheight+'px');
								
				// LOAD SETTINGS if they have been defined...
				if(o.patch!=null) loadsettings(o.patch);
				
				// SET INPUT EVENTS
                inputs.mouseover(function() { 
	 				var cls = ptchID+' .inputs .'+$(this).attr('class');
					$(cls).css('color', o.highlighton);
					$(cls+' .label').css('background', o.linkedbg);
                }).mouseout(function() {  
					var cls = ptchID+' .inputs .'+$(this).attr('class');
					$(cls).css('color', o.highlightoff);
					$(cls+' .label').css('background', 'none');
                });
				inputs.click(function() {  setinput(this); 	});
				
				// SET OUTPUT EVENTS
                outputs.mouseover(function() {  
					// if there is no input set, then don't set anything
					if(current[0]!=undefined){
						var cls = ptchID+' .outputs .'+$(this).attr('class');
						$(cls).css('color', o.highlighton);  
						$(cls+' .label').css('background', o.linkedbg);
					}
                }).mouseout(function() {  
					var cls = ptchID+' .outputs .'+$(this).attr('class');
					$(cls).css('color', o.highlightoff);  
					$(cls+' .label').css('background', 'none');
                });
				outputs.click(function(){
					if(current[0]!=undefined){
						setoutput(this); 	
						o.ptchID = ptchID;
						o.str = settingsStr;
						o.onSetPatch.call(o); // Trigger the callback 
					}
				});
				
            });  
			
			// Load saved settings and build the patch array
			function loadsettings(settings){
				var newdata = settings.split(",");
				for (var i in newdata){
					var io = newdata[i].split("-");
					var input = $(ptchID+' .inputs .p'+io[0]).attr('id');
					var output = $(ptchID+' .outputs .p'+io[1]).attr('id');
					if(input!=undefined && output!=undefined){
						var i_li =  input.replace(ptch.attr('id')+'i',"");
						routeArray[i_li][1].push(io[1]);	
					}
				}
				var update = {'add_delete':'display'};
				buildpatches(update);
			}
			
			// Set input
			function setinput(me){
				// set the background of this element
				$(ptchID+" .inputs li").css('background', 'none');
				$(me).css('background', o.highlightbg);
				// set the backgrounds of all the outputs to blank
				$(ptchID+" .outputs li").css('background', 'none');
				// Grab the currently selected input port
				current[0] = $('#'+$(me).attr('id')+" .patch").html();
				current[1] = $(me).attr('id');
				// clear the current output view
				$(ptchID+" .outputs li").css('background', 'none');
				$(ptchID+" .outputs li").data('background','none');
				// Build the new view
				var update = [];
				update['add_delete'] = 'display'; 
				buildpatches(update);
			}
			
			// Set output
			function setoutput(me){
				var update = []; 
				update['li_n'] = current[1].replace(ptch.attr('id')+'i',"");
				update['i'] = current[0];
				update['o'] = $('.'+$(me).attr('class')+" .patch").html();
				if($(me).data('background')=='none'){
					update['add_delete'] = 'add';  // add the item
					$(me).data('background', 'selected');
				}else{
					$(me).data('background', 'none');
					update['add_delete'] = 'delete';  // delete the item
				}
				buildpatches(update);
			}
			
			// build current interface & save the settings
			function buildpatches(update){
				
				// prep vars
				var str = "";
				var c = "";
				var rpl = ptch.attr('id');
				var cshift = o.circle/2;
				var cx = 3;
				var rx = parseInt($(ptchSVG).css('width').replace(/px/gi,""))-o.circle;
				var lx = cx+cshift;
				var rcx = rx-cshift;
				$(ptchSVG).html(""); // clear the canvas
				$(ptchID+" .outputs li").css('background', 'none'); // clear all hightlights
				
				// ALter the settings array
				if(update['add_delete']=='delete' || update['add_delete']=='add'){
					var nnn = update['o']+"";
					if(update['add_delete']=='add'){
						settingsArray[nnn] = update['i']+'-'+update['o'];
					}
					if(update['add_delete']=='delete'){
						settingsArray[nnn] = '00-'+update['o'];
					}
				}
				
				
				// Loop through the routing array: Update the interface, Add/Remove an item, Build the new output string
				for (var i in routeArray){
					var input = routeArray[i][0];
					// CHECK IF WE NEED TO ADD - When we add an item we also need to delete all other references
					if(update['add_delete']=='add'){
						if(update['li_n']==i) routeArray[update['li_n']][1].push(update['o']);
					}
					for (var ii in routeArray[i][1]){
						// SETUP VARS
						var output = routeArray[i][1][ii];
						var remove = false;
						var clas = ptchID+" .outputs .p"+output;
						// CHECK IF WE NEED TO REMOVE AN ITEM
						if(update['add_delete']=='delete' || update['add_delete']=='add'){
							if(output==update['o']){
								if(update['li_n']==i && update['add_delete']=='delete') remove = true;
								if(update['li_n']!=i && update['add_delete']=='add') remove = true;
							}
						} 
							
						// LETS DRAW THINGS
						if(remove==true){
							delete routeArray[i][1][ii];
						//	var nnn = output+"";
						//	settingsArray[nnn] = '00-'+output;
						}else{
							
							// DRAW INTERFACE
							if(input==current[0]){
								$(clas).css('background', o.highlightbg);
								var linecol = o.linehilight;
							}else{
								var linecol = o.lineColour;
							}
							// Check if this is a double link to an output
							var d=0;
							var multiouts = [];
							$.each($(clas), function(mmmm,v) { 
								multiouts[d] = $(v).attr('id').replace(rpl+'o',"");	// save a list of multiple ouputs
								d++;
							});
							// Prep draw variables 
							var n = i.replace(rpl+'i',"");
						    var ly = (n*liheight)+(liheight/2);			
							// Draw the lines
							for (var mm in multiouts){
								var nn = multiouts[mm];
								var ry = (nn*liheight)+(liheight/2);
								// Draw the line
								$(ptchSVG).drawLine(lx, ly, rx, ry, {color: linecol, stroke: 1 });
								// Right circle
								$(ptchSVG).fillEllipse(rcx, ry-cshift, o.circle, o.circle, {color:o.circleFill, stroke: 1, });
								$(ptchSVG).drawEllipse(rcx, ry-cshift, o.circle, o.circle, {color:linecol, stroke: 1, });
							}
							//Left circle
							$(ptchSVG).fillEllipse(cx, ly-cshift, o.circle, o.circle, {color:o.circleFill, stroke: 1, });
							$(ptchSVG).drawEllipse(cx, ly-cshift, o.circle, o.circle, {color:linecol, stroke: 1, });
							
							// Add to the settings array
							var nnn = output+"";
							settingsArray[nnn] = input+'-'+output;
						}
					}
				}
				// Build the new settings string
				var str = '';var c = '';
				for (var i in settingsArray){
					v = settingsArray[i];
					str = str+c+v;
					c = ',';
				}
				settingsStr = str;
			}
		
        
		} 
    });  
})(jQuery);