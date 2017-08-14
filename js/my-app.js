// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
 

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
        
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}
var content="";
var currentQuestion="";
var currentAnswer=true;
var questionIndex=0;
var points = 0;
var anim = false;
var currentTemp=0;
var currentWeather = {};
var currentHumidity = 0;
var currentWind = 0;
var currentSunrise = 0;
var currentSunset=0;
var currentForecast = "";

var PUBLIC_KEY= "4441b3caa0024a8e9d523a502722e7eb";
var BASE_URL = '//api.giphy.com/v1/gifs/';
var ENDPOINT = 'search';
var LIMIT = 50;
var RATING = 'r';
var search = "";
var xhr;
var jokeDB;

var lat = 0;
var long = 0;

var randomJoke = "";
var dataStore;

//google maps
var locations = [];
var input="";
var markers=[];
var numberOfRest = 5;

var starter = 0;
var category=9;
var amount = 10;

//when this is not commented out, none of the js works properly and it says that filetransfer is not defined??


/*var fileTransfer = new FileTransfer();
var uri = encodeURI(""+currentIMG);
 

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(FileTransfer);
}

fileTransfer.download(
    uri,
    fileURL,
    function(entry) {
        console.log("download complete: " + entry.toURL());
    },
    function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("download error code" + error.code);
    },
    false,
    {
        headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
        }
    }
);

*/


$(document).ready(monsterIsLoaded);
$(document).ready(function(){
    //fade in
});


//getting trivia data
function initialize(){
    console.log("APP: Initializing app...");
    var url = "https://opentdb.com/api.php?amount="+amount+"&category="+category+"&type=boolean";
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        data: {
          "$limit" : 5000,
          "$$app_token" : "HvRQSgGdDrSLioMnmuqmGkwi7"
        }
    }).done(function(data) {
        console.log ("APP: AJAX JSON retrieval complete...");
        activeDataSet = data;
        surveyData=data;
        dataSubjectNoun = "youth";
        //getRandomNumber()
        questionIndex = 0;
        getQuestion(questionIndex);
        $("#btn-true").show();
        $("#btn-false").show();
        
        //FADE OUT
        hideQuizSettings();
        //initialize();
        //caller(true);
        
        
    });
}


function initializeSwiper(){
   var mySwiper = myApp.swiper('.swiper-container', {
    pagination:'.swiper-pagination',
       speed: 600
  });  
    console.log("SWIPER:swiper initialized...");
}

function monsterIsLoaded(){
    console.log("ready!");
    $("#l-panel").html("my name is erin");
    //getRandomNumber(); 
    $("#mouth").css({animation: "agape 1s infinite"});
    $("#mouth").css({ "-webkit-animation-play-state": "paused" });
    $("#r-eye").css({animation: "agape 3s infinite"});
    $("#l-eye").css({animation: "agape 4s infinite"});
    $("#top-eye").css({animation: "agape 3.5s infinite"});
    //buttons
    $("#mouth").on("click", agape);
    $("#btn-true").on("click", checkAnswerT);
    $("#btn-false").on("click", checkAnswerF);
    $("#btn-getGif").on("click", getGif);
    navigator.geolocation.getCurrentPosition(function(position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;
       //maps?
        //initAutocomplete();
        getWeather(position.coords.latitude+','+position.coords.longitude); 

  });
    $("#btn-get-weather").on("click", function(){
        navigator.geolocation.getCurrentPosition(function(position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        });
        getWeather(lat+","+long);
    });
    //on "enter" click, lookup Gif
    $("#search-term").keyup(function (e) {
    if (e.keyCode === 13) {
        //console.log("gettin gif with search term...");
       getGif();
    }
 });
    $("#pac-input").keyup(function (e) {
    if (e.keyCode === 13) {
       //console.log("new map search term...");
    }
 });
    $("#btn-jokes").on("click",getJoke);
    getJoke();
    //initializeSwiper();
    initializeKinvey();
    
    //$("#btn-showLoc").on("click", function(){$('#map_canvas').trigger('show', '1');});
    $('#view-5').on('show', function(){
        initializeSwiper();
        //$(document).find('.swiper-container')[0].swiper.update()
    });
    $("#view-3").on("show", categoryPickerInit);
    $("#btn-generate-quiz").on("click", initialize);
    $("#arrow").on("click", hideQuizSettings);
    //$("#btn-saveGIF").on("click", );
    $('#btn-saveGIF').click(saveImageAs());
        //function(e) {
    //e.preventDefault();  //stop the browser from following
    //window.location.href = currentIMG;
//});

    //initialize();
    
}
function saveImageAs () {
    console.log (currentIMG);
    fileTransfer.download();
      //$("#poop").html("<a href='/images/myw3schoolsimage.jpg download></a>");
    //$("btn-saveGIF").attr("href",currentIMG);
}

function hideQuizSettings() {
    console.log("arrow clicked");
    if ($(".generator").hasClass("fadeout")){
            $(".generator").removeClass("fadeout");
            $(".generator").animate({ 
        opacity: "1",
      }, 1000 ).addClass("fadein");
        $("#quiz-content").animate({ top: "+=350"}, 1000 );
        $("#arrow").css("transform","rotate(90deg)");
        //$(".generator").show();
        console.log( "fade it...");
    }
        else {
            $(".generator").removeClass("fadein");
            //$("#quiz-content").css({top: 200, position:'absolute'});
            $(".generator").animate({ 
        opacity: "0",
      }, 1000 ).addClass("fadeout");
            $("#quiz-content").animate({ top: "-=350"}, 1000 );
            $("#arrow").css("transform","rotate(0deg)");
            //$(".generator").hide();
        console.log ("fade out....");}
}

function getJoke(){
    console.log("APP: Initializing jokes...");
    $.ajax({
        url: "https://icanhazdadjoke.com/",
        type: "GET",
        contentType:"text/plain",
        dataType:"json",
    }).done(function(data) {
        console.log ("JOKE: AJAX joke retrieval complete...");
        jokeDB = data;

        var str = jokeDB.joke;
        var n = str.indexOf("?");
        if (n> str.length-2){
            n=-1;
        }
        var m = str.indexOf(".");
        if (m> str.length-2){
            m=-1;
        }
        
        //if there is a period in the joke...
        if (m != -1 && n==-1) {
            var pos = str.indexOf(".")+1;
            var answer = str.slice(pos);
            console.log("answer: "+answer);
            var question = str.substr(0, pos);
            console.log("question: "+question);
            var listHTML = '<div class="swiper-slide"><span> <div id="demo2"></div></span></div><div class="swiper-slide"><span> <div id="demo"></div></span></div>';
            $(".swiper-wrapper").html(listHTML);
            document.getElementById("demo").innerHTML = answer;
        }
        //if there is a ? in a joke...
        else if (n !=-1 && m==-1) {
            var pos = str.indexOf("?")+1;
            var answer = str.slice(pos);
            var question = str.substr(0, pos);
            var listHTML = '<div class="swiper-slide"><span> <div id="demo2"></div></span></div><div class="swiper-slide"><span> <div id="demo"></div></span></div>';
            $(".swiper-wrapper").html(listHTML);
            console.log ("question mark found..", str);
            document.getElementById("demo").innerHTML = answer;
        }
        else {
            var question = str;
            var answer = "";
            var listHTML = '<div class="swiper-slide"><span> <div id="demo2"></div></span></div>';
            $(".swiper-wrapper").html(listHTML);
            console.log ("no punctuation found...", str);
        }
        var color = changeColor();
        var color2 = changeColor();
        
        $("#joke-container").css({"color": color, "background-color":color2});
        
        document.getElementById("demo2").innerHTML = question;
      //$('#joke-container').html(jokeDB.joke);
      //console.log("JOKE: data successfully retrieved...", data);
    });
}



function alert() {
    myApp.alert("something has fired!");
}

function getThings() {
    //var api = ${BASE_URL}${ENDPOINT}?q=${this.text}&limit=${LIMIT}&rating=${RATING}&offset=${this.offset}&api_key=${PUBLIC_KEY};
    var searchTerm = document.getElementsByName("search-term")[0].value;
    console.log("http:"+BASE_URL+""+ENDPOINT+"?q="+searchTerm+"&limit="+LIMIT+"&rating="+RATING+"&api_key="+PUBLIC_KEY+"");
}

var gifIndex = 0;
var currentIMG = "";
//get random gif with search term
function getGif(){
    //var gifIndex = Math.floor(Math.random() * LIMIT-1) + 1;
    console.log("gif index: "+ gifIndex);
    var searchTerm = document.getElementsByName("search-term")[0].value;
    findIfExistingKeyword(searchTerm);
    if (searchTerm != ""){
        xhr = $.get("http:"+BASE_URL+""+ENDPOINT+"?q="+searchTerm+"&limit="+LIMIT+"&rating="+RATING+"&api_key="+PUBLIC_KEY+"");
        xhr.done(function(data) {
            currentIMG = data.data[gifIndex].images.fixed_height_downsampled.url;
          //$('#gif-container').css('background-image', 'url(' + data.data[gifIndex].images.fixed_height_downsampled.url + ')');
            $("#gif-container").html('<img width="100%" height="100%" src="'+currentIMG+'"/>');
            console.log("success got data", data);
            if (gifIndex<LIMIT-1){
                gifIndex++;
            }
            else {
                gifIndex = 0;
            }
        
    });
    }
    else {
        $("#gif-container").html ("ERROR: Please enter a valid search term");
    }
}

//animation function
function agape(){
    if (anim==true) {
        $("#mouth").css({ "-webkit-animation-play-state": "paused" });
        console.log("ANIMATION: paused");
        anim=false;
    }
    else {
        $("#mouth").css({"-webkit-animation-play-state": "running"});
        console.log("ANIMATION: playing");
        anim=true;
    }
    
}

//Trivia Functions
function getRandomNumber(){
    var length = surveyData.results.length;
    questionIndex = Math.floor(Math.random() * length-1) + 1;
    getQuestion(questionIndex);
}

function updatePoints(hm){
    if (hm=="right"){
        points++;
        $("#results").html("You got it!");
    }
    else {
        $("#results").html("WRONG! Maybe next time you'll get it, dummy.");
    }
    $("#points").html("Points: "+points+"/"+amount);
    getQuestion(questionIndex);
    //getRandomNumber();
}
function checkAnswerT(){
    questionIndex++;
    if (currentAnswer=="True") {
        console.log("you got it!");
        updatePoints("right");
    }
    else {
        //$("#results").html("WRONG! Try again.");
        updatePoints("wrong");
        //getQuestion(questionIndex);
        //getRandomNumber();
    }
    
    console.log("question indes: "+questionIndex);
}
function checkAnswerF(){
    questionIndex++;
    if (currentAnswer=="False") {
        console.log("you got it!");
        updatePoints("right");
    }
    else {
        updatePoints("wrong");
        //getQuestion(questionIndex);
        //getRandomNumber();
    }
    
    console.log("question indes: "+questionIndex);
}


function getQuestion(){
    if (questionIndex<(amount)){
    $("#points").show();
    content=surveyData.results[questionIndex].question;
    //console.log(content);
    //questionIndex=x;
    $("#question-block").html("</br>"+content); 
    getAnswer();
}
    else {
        $("#question-block").html("<p></p><p></p>Final Score: "+points+"/"+amount);
        $("#btn-true").hide();
        $("#btn-false").hide();
        $("#results").html("");
        console.log ("QUIZ: you finsihed the quiz");
        $(".generator").removeClass("fadeout");
        $(".generator").animate({ 
        opacity: "1",
      }, 1000 ).addClass("fadein");
        $("#quiz-content").animate({ top: "+=350"}, 1000 );
        $("#arrow").css("transform","rotate(90deg)");
        $("#points").html("")
        $("#points").hide();
        points = 0;
        console.log("Points: "+points+"/"+amount);
        //hideQuizSettings();
    }
}

function getAnswer(){
    currentAnswer=surveyData.results[questionIndex].correct_answer;
    console.log(currentAnswer);
    //return currentAnswer;
}

function categoryPickerInit(){
    var pickerDevice = myApp.picker({
    input: '#picker-device',
        onClose:function(p){
            console.log(""+pickerDevice.value);
        //setQuizCategory(""+pickerDevice.value); 
            amtPickerInit();
        },
    cols: [
        {
            textAlign: 'center',
            values: ['General Knowledge', 'Film', 'Music', 'Musicals and Theater', 'TV', 'Science and Nature', 'Sports', 'Animals', 'Celebrities']
        }
    ]
});
}
function amtPickerInit(){
    var pickerDevice = myApp.picker({
    input: '#picker-device2',
        onClose:function(p){
            //console.log(""+pickerDevice.value);
        setQuizAmt(pickerDevice.value); },
    cols: [
        {
            textAlign: 'center',
            values: ['5', '10', '15', '20', '25', '30', '35', '40']
        }
    ]
});
}

function setQuizAmt(num){
    amount = num;
}
function setQuizCategory(cat){
    //console.log("input: "+ cat);
    switch ( cat ) {

        case 'General Knowledge':
            category = 9;
            break;
        case 'Film': 
            category = 11;
            console.log('TRIVIA: category: '+category);
            break;
        case 'Music': 
            category = 12;
            break;
        case 'Musicals and Theater': 
            category = 13;
            break;
        case 'TV': 
            category = 14;
            break;
        case 'Science and Nature': 
            category = 17;
            break;
        case 'Sports': 
            category = 21;
            break;
        case 'Animals': 
            category = 27;
            break;
        case 'Celebrities': 
            category = 26;
            break;
        default :
          console.log('TRIVIA: no category found');
            
  }
        //initialize();
    
}
//weather functions
function getWeather(location, woeid) {
   $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
        currentWeather = weather;
        currentTemp=weather.temp;
        currentWind=weather.wind.speed;
        currentHumidity=weather.humidity;
        currentSunrise = weather.sunrise;
        currentSunset=weather.sunset;
        currentForecast = weather.text;
        console.log("WEATHER: getWeather() called");
        //myApp.alert("weather retrieved");
        willItRain();
    },
    error: function(error) {
      console.log("WEATHER: getWeather Error");
    }
  });
  }

function willItRain() {
    // Handle the weather codes
  $("#weatherStatus2").html("It is "+currentWeather.currently + " today.");
    $("#weatherStatus3").html(""+currentWeather.title + ".");
    
  switch ( currentWeather.code ) {

    case '0': // tornado
    case '1': // tropical storm
    case '2': // hurricane
    case '3': // severe thunderstorms
    case '4': // thunderstorms
    case '37': // Isolated thunderstorms
    case '38': // Scattered thunderstorms
    case '39': // scattered thunderstorms
    case '45': // thundershowers
    case '47': // isolated thundershowers
      //console.log("rainy");
          $("#weather-image-container").css("background-image","img/rain.png");
          $("#weatherStatus").html("YOU NEED AN UMBRELLA!");
      break;

    case '5': // mixed rain and snow
    case '6': // mixed rain and sleet
    case '7': // mixed snow and sleet
    case '35': // mixed rain and hail
    case '25': // cold
      //console.log("wintry mix");
          $("#weather-image-container").css("background-image","img/snow.png");
          $("#weatherStatus").html("YOU NEED AN COAT!");
      break;
    case '8': // freezing drizzle
    case '9': // drizzle
    case '10': // freezing rain
    case '11': // showers
    case '12': // showers
    case '40': // scattered showers
      //console.log("rainy");
          $("#weather-image-container").css("background-image","img/rain.png");
          $("#weatherStatus").html("YOU NEED AN UMBRELLA!");
      break;
    case '13': // snow flurries
    case '14': // light snow showers
    case '15': // blowing snow
    case '16': // snow
    case '17': // hail
    case '18': // sleet
    case '41': // heavy snow
    case '42': // scattered snow showers
    case '43': // heavy snow
    case '46': // snow showers
      //console.log("snowy");
          $("#weather-image-container").css("background-image","img/snow.png");
          $("#weatherStatus").html("YOU NEED AN UMBRELLA OR A COAT!");
      break;
    case '19': // dust
    case '20': // foggy
    case '21': // haze
    case '22': // smoky
    case '31': // clear (night)
    case '32': // sunny
    case '33': // fair (night)
    case '34': // fair (day)
    case '36': // hot
      //console.log("hazy sun");
          $("#weather-image-container").css("background-image","url(img/sun.png)");
          $("#weatherStatus").html("YOU DO NOT NEED AN UMBRELLA!");
      break;
    case '23': // blustery
    case '24': // windy
    case '26': // cloudy
    case '27': // mostly cloudy (night)
    case '28': // mostly cloudy (day)
    case '29': // partly cloudy (night)
    case '30': // partly cloudy (day)
    case '44': // partly cloudy
      //console.log("sunny");
          $("#weather-image-container").css("background-image","url(img/clouds.png)");
          $("#weatherStatus").html("YOU DO NOT NEED AN UMBRELLA!");
      break;
          

    default :
      console.log('WEATHER: no match');
  }
}
function initializeKinvey(){
    Kinvey.initialize({
        appKey: 'kid_Syi7u85Pb',
        appSecret: 'a638174cf89c4dc5a7383b37551c3a1d'
    }).then(function(activeUser) {
        // ...
        console.log("KINVEY: kinvey initialized...");
        
        
        var activeUser = Kinvey.User.getActiveUser();
        var promise = Promise.resolve(activeUser);
        if (activeUser == null) {
          autoLogin();
        }else{
            console.log("KINVEY: Already logged in...");
            console.log(activeUser);
        }
        

    }).catch(function(error) {
        // ...
        console.log("KINVEY: kinvey is a dumdum");
})
}

function autoLogin(){
    var promise = Kinvey.User.login({
        username: 'default',
        password: 'default'
    })
      .then(function(user) {
        // ...
          console.log("KINVEY: Auto login success..");
      })
      .catch(function(error) {
        // ...
          console.log("KINVEY: Auto login failed..");
          console.log(error);
      });
}

function saveToKinvey(){
    //console.log(dataStore);
    var dataStore2 = Kinvey.DataStore.collection('Search-Terms');
    var promise = dataStore2.save({
        searchTerm: document.getElementsByName("search-term")[0].value
    }).then(function onSuccess(entity) {
    // ...
        console.log("KINVEY: save to kinvey success");
    }).catch(function onError(error) {
    // ...
        console.log("KINVEY: save to kinvey failure");
        console.log(error);
    });
}


function findIfExistingKeyword(keyword){
    var saveToDB = false;
    
    dataStore = Kinvey.DataStore.collection('Search-Terms', Kinvey.DataStoreType.Network);
    var query = new Kinvey.Query();
    query.equalTo('searchTerm', keyword );
    var stream = dataStore.find(query);
    
    stream.subscribe(function onNext(entities) {
      // ...
        //console.log("ONNEXT!");
        //console.log(entities);
        //console.log(saveToDB);
        
        if(entities.length == 0){
            console.log("KINVEY: keyword is new!");
            //savetoKinvey();
            saveToDB = true;
        }
        else {
            console.log("KINVEY: keyword already exists! NOT saving.");
        }
        
    }, function onError(error) {
      // ...
        console.log("KINVEY: ERROR FINDING KEYWORDS");
    }, function onComplete() {
      // ...
        //console.log("ONCOMPLETE");
        //console.log(saveToDB);
        if(saveToDB == true){
            saveToKinvey();
            console.log("KINVEY: keyword saved to database");
        }
    });
}


function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng: long},
          zoom: 18,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        input = document.getElementById('pac-input');
    console.log("input: "+ input.value);
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
            //printmarkers();
            console.log(markers);
        });
      }



function printmarkers(){
    for (i=0; i<numberOfRest; i++){
                console.log(markers[i].title);
                console.log("lat: "+markers[i].getPosition().toJSON().lat);
                console.log("lon: "+markers[i].getPosition().toJSON().lng);
                locations[i] = markers[i].title+","+ markers[i].getPosition().toJSON().lat+","+ markers[i].getPosition().toJSON().lng;
            }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeColor(){
//var element = document.getElementById(id);
    //generate random red, green and blue intensity
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
    //element.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    
    return "rgb(" + r + "," + g + "," + b + ")";
}
