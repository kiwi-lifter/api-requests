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
        cityStr + '&sort=newest&api-key=d785b92816364c388bda7f12d75af739';
         $.getJSON(timesURL, function(data){

             $nytHeaderElem.text('New York Times Articles about ' + cityStr);

             articles = data.response.docs;
 
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
			
		var wikipediaURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + encodeURIComponent(cityStr) +'&format=json';
		
		var wikiRequestTimeout = setTimeout(function(){
			$wikiElem.text("Failed to get wikipedia resources");
		}, 8000);
		
		$.ajax({
			url: wikipediaURL,
			dataType: "jsonp",
			success: function(data) {
				console.log(data[0]);
				console.log(data);
				
				var articleList = data[3];
					for (var i = 0; i < articleList.length; i++) {
						articleStr = articleList[i];
						var url = articleStr;
						$wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
					};
					
					clearTimeout(wikiRequestTimeout);
			}
			
		});	
};

$('#form-container').submit(loadData);
