$(function() {
    	$('#search-term').submit(function (event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        getRequest(searchTerm);
    	});
	});

	function getRequest(searchTerm) {
	    var params = {
	        part: 'snippet',
	        key: 'AIzaSyDCooRqqtey39pIAW73WZTu5H8TfxcTfYY',
	        q: searchTerm
	    };
	    var url = 'https://www.googleapis.com/youtube/v3/search';

	    $.getJSON(url, params, function (data) {
	        showResults(data.items);
	    });
	}

	function showResults(results){
	  	var html = "";

	  	$.each(results, function(index, value){
	  		$('<img>').attr("src", value.snippet.thumbnails.medium.url).appendTo('body');
	    	console.log(value.snippet.thumbnails.medium.url);
	 	});
	}