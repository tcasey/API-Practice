var $form = $('#search-term');
var $searchQuery = $('#query');

$form.submit(function(el){
	el.preventDefault();
	var searchQuery = $searchQuery.val();
	getRequest(searchQuery);
});

var getRequest = (function(){
	var params = {
		part: 'snippet',
		chart: 'mostPopular',
		maxResults: 25,
		key: "AIzaSyDCooRqqtey39pIAW73WZTu5H8TfxcTfYY"
	};
	var url = "https://www.googleapis.com/youtube/v3/search";

	return function getRequest(userInput){
		params.q = userInput;
		$.getJSON(url, params, function(data){
			var thumbnailData = data.items;
			appendThumbnails(thumbnailData);	
			$searchQuery.val('');
		});		
	};

})();

var appendThumbnails = (function(){
	var $thumbnailList = $('#search-results');

	return function(items){
		var elements = [];
		for(var i = 0; i < items.length; i++){
			$thumbnailList.empty();
			var $title = $('<h3>').append(items[i].snippet.title);
			var $img = $('<img>').attr('src', items[i].snippet.thumbnails.medium.url);			
			var youtubeVideoId = items[i].id.videoId;
			var videoUrl = 'https://www.youtube.com/watch?v=' + youtubeVideoId;
			var $youtubeLink = $("<a target='_blank'>").attr("href", videoUrl).append($img);			
			var $div = $('<div>').append($title, $youtubeLink);
			elements.push($div);
		}
		$thumbnailList.append(elements);
	};

})();
