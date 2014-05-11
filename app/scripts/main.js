'use strict';

$(document).ready(function(){
	var movie={};
	var config;
	var addWord = function(title){

		//logic to change word here
		if (title.indexOf('The') === 0){
			title = "Mom's " + title.substring(4,title.length);
		}
		else{
			title = "Mom's" + ' ' +  title;
		}

		$('#title').append(title);
	};

	var addBackground = function(base_url, imageUrl){
		$('#poster').attr('src',base_url + imageUrl);
	};

	var addDate = function(releaseDate){
		$('#date').append('Release Date: ' +releaseDate);

	};
	var movieApp = {
		api_key: 'ed68b87c3d69c256a7f70b7e9cb008e2',
		test : undefined,
		init: function(){
			$.ajax({
				url: 'http://api.themoviedb.org/3/configuration',
				type: 'GET',
				data: {api_key: movieApp.api_key},
				dataType: 'jsonp',
				success: function(response) {
					console.log(response);
					config = response;
				}
			});

		},

		getMovies: function(pageNumber, titleIndex){
			$.ajax({
				url: 'http://api.themoviedb.org/3/movie/popular',
				type: 'GET',
				data: {api_key: movieApp.api_key, page: pageNumber},
				dataType: 'jsonp',
				success: function(response) {
					console.log(response.results[titleIndex]);
					movie.title=response.results[titleIndex].original_title;
					movie.imageUrl= response.results[titleIndex].backdrop_path;
					movie.releaseDate = response.results[titleIndex].release_date;
					addWord(movie.title);
					addDate(movie.releaseDate);
					addBackground('http://image.tmdb.org/t/p/w500', movie.imageUrl);
				}
			});
		}
	};

	var reset = function(){
		pageNumber= (Math.floor( Math.random() * 150)+1);
		titleIndex = (Math.floor( Math.random() * 20)+1);

		$('#title').empty();
		$('#date').empty();

		movieApp.getMovies(pageNumber, titleIndex);
	};

	var pageNumber= (Math.floor( Math.random() * 150)+1);
	var titleIndex = (Math.floor( Math.random() * 20)+1);

	movieApp.init();
	movieApp.getMovies(pageNumber, titleIndex);
	console.log('movieApp: ' + movieApp);

	$('#button').on('click',function(){
		reset();

	});

		//reset();


});
