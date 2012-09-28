/**
 * named_slices.fw.js
 * 
 * This script takes a comma-separated list of names and generates a 
 * series of slices using these names. This saves time when you need to 
 * create tens or hundreds of slices.
 *
 * USAGE:
 *
 * Adjust the 'data' string and the slice height/widths as desired, then 
 * copy and paste into the console.
 *
 * Any "empty" string (i.e. two commas without any string ,,) will result 
 * in an empty space the same size as a normal slice. This can be useful 
 * for visual grouping.
 *
 * Script intended for use with the Fireworks console extension found here: 
 * http://johndunning.com/fireworks/about/FWConsole
 *
 * Future improvements: Provide UI and build this into a full extension
 */

/* MOST USEFUL USER CONFIG */ 
var data = "slice_name_1,slice_name_2,slice_name_3,etc";
var height = 100; /* Height of each slice */
var width = 100; /* Height of each slice */
var margin = 20; /* Space left between each slice */ 

/* FURTHER CONFIG */
var padding_left = 100; /* Space left on the left of the first slice */
var padding_top = 100; /* Space left at the top of all slices */

/* MAIN SCRIPT */
var y = padding_top;
var names = data.split(",");
var used_names = [];
var counter = 0;

forEach(names, function(name) {
    var x = padding_left + counter * (width + margin);

    console.log(name);
    console.log(x);
    
    if (name !== "") {
        fw.getDocumentDOM().addNewHotspot("slice", "rectangle", {left:x, top:y, right: x+width, bottom: y + height});
        used_names.push(name);
    }

    counter++;
});

counter = used_names.length;
forEach(fw.getDocumentDOM().layers, function(layer) {
    if (layer.layerType == "web") {
        forEach(layer.elems, function(slice) {
        
            counter--;

            slice.baseName = used_names[counter];
        });
    }
});
