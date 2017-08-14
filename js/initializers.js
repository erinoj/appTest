var loc1 = "";
var loc2 = "";
var loc3 = "";
var loc4 = "";
var loc5 = "";


var yelpClientID = "5xL6HNAdDmHibBYaEk69sg";
var yelpClientSecret = "IH4SxTrsRu66o0fRMMOgxG9YAIz0IlPXbt2uupR8evSH2KyItqn30BMOvNak2c00";






// Run javascript after DOM is initialized
$(document).ready(function() {

  $('#map_canvas').mapit({
    latitude:    40.773225,
    longitude:   -73.948358,
    zoom:        16,
    type:        'ROADMAP',
    scrollwheel: false,
    marker: {
      latitude:    40.773225,
    longitude:   -73.948358,
      icon:       'img/marker_red.png',
      title:      'Starbucks',
      open:       false,
      center:     true
    },
    //address: '<h2>The Hotel</h2><p>Address 1, Area - County<br />Athens 123 45, Greece</p><p>Tel.: +30 210 123 4567<br />Fax: +30 210 123 4567</p>',
    styles: 'BLUE',
    locations: [
      [40.772467, -73.949817, 'img/marker_blue.png', 'STARBUCKS', 'Panagi Tsaldari 140, Athina, Greece', false, '1'],
      [37.996547, 23.732001, 'img/marker_blue.png', 'Cinema Ilion', 'Τροίας 34, Αθήνα, Greece', false, '2'],
      [37.959408, 23.713982, 'img/marker_blue.png', 'Cinema Calipso', 'Megalou Alexandrou ke Kalipsous, Kallithea, Greece', false, '2'],
      [37.977563, 23.714041, 'img/marker_green.png', 'Technopolis', 'Πειραιώς 100, Αθήνα, Greece', false, '2'],
      [37.971436, 23.736695, 'img/marker_green.png', 'Zappeion', 'Greece', false, '2'],
      [37.975030, 23.747751, 'img/marker_green.png', 'Εθνική Πινακοθήκη Μουσείο Αλεξάνδρου Σούτζου', 'Μιχαλακοπούλου 1, Αθήνα, Greece', false, '2'],
      [37.976104, 23.7141811, 'img/marker_green.png', 'Benaki Museum', 'Koumpari 1, Athens, Greece', false, '2']
    ],
    origins: [
      ['40.773225', '-73.948358']
    ]
  });
});



