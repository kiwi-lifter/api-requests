function loadData(e) {
	e.preventDefault();
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
	var streetStr = $('#street').val();
	var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;
	
	$greeting.text('Does ' + address + ' seem like a great holiday destinaition?');
	
	var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
	$body.append('<img class="bgimg" src="' + streetViewUrl + '">');
	
	//NYTimes Ajax request. Pretty please. 
     var timesURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +
        cityStr + '&sort=newest&api-key=d785b92816364c388bda7f12d75af739:8:75159936';
			
        $.getJSON(timesURL, function(data){

             $nytHeaderElem.text('New York Times Articles about ' + cityStr);

             articles = data.response.docs;
           console.log(data);
             for (var i = 0; i < articles.length; i++) {
                 var article = articles[i];
                 $nytElem.append('<li class="article">'+
                     '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                     '<p>' + article.snippet + '</p>' +
                     '</li>');
             }
                 return false;
         }).fail(function(e){
			console.log('error!!!!');
			$nytHeaderElem.text("Error with request.");
			
		});
		
		wikipediaURL = 'https://www.mediawiki.org/w/api.php?action=query&titles=' + cityStr +'&format=json';
		$.ajax()
    //return false;
};

$('#form-container').submit(loadData);
