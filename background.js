console.log('Thats me nigga');
console.log({wl:window.location})


chrome.storage.local.get('playerState', function(pstate){
	if(pstate.playerState){

		var lookForRutube = setInterval(function(){

			if( window.location.host == "www.mavanimes.com"){

				$(".thecontent .su-tabs-panes .su-tabs-pane").each(function(el){
					
					var src = $(this).find('iframe').attr('src')

					if(src.indexOf('rutube.ru')>-1){

						clearInterval(lookForRutube);
						window.location.href = src
					}

				})

				console.log('Rutube wasn\'t found');

			}

		}, 3000);





		function lunch(){

			document.getElementById("rutubeNegga").click();
			lookForRutube;

		}


		if( window.location.host == "www.mavanimes.com"){

			$(".thecontent .su-tabs-nav span").each(function(){

				var str = $(this).text(),
						$rutube;

				if( $(this).text().indexOf('rutube') >= 0 ){
					
					$(this).attr('id','rutubeNegga');

					saveNextEpLink()
					lunch();

				}

			});

		}


		if( window.location.host == "rutube.ru"){

			var video = document.getElementsByTagName("video")[0],
					startTime = 165,
					endTime = 2670;

			$('<button id="nextvideo">next</button>').appendTo('body');

			$("#nextvideo").css({
				"z-index": "500000",
		    "position": "fixed",
		    "top": "10px",
		    "right" : "10px"
			})

			$("#nextvideo").click(function(){
				nextVideo();
			})

			video.ontimeupdate = function(){
				VideoTimeUpdate();
			}

			video.currentTime = 180
			video.play();	


			video.addEventListener('ended', function(){
				console.log('vide ofinie');
				nextVideo();
			})

			function VideoTimeUpdate(){

				if(video.currentTime < startTime ){
					video.currentTime = startTime;
				}else if( video.currentTime > endTime){
					nextVideo();
				}
			}

		}

	}
})

function nextVideo(){

	chrome.storage.local.get('bleachep', function(item){
		var thisEp = item.bleachep;	
				thisEp++;

		setEp(thisEp);

		window.location.href = "http://www.mavanimes.com/bleach-"+thisEp+"-vostfr/";
	})


}


function setEp(ep){
	thisEp = ep;
	chrome.storage.local.set({ "bleachep": thisEp}, function(){
	});
}


function saveNextEpLink(){

	var saveEpInt = setInterval(function(){
		
		var $nextEpLink = $(".thecontent .wp-post-navigation-next a"),
				nextEp = {
					link: $nextEpLink.attr('href'),
					number: $nextEpLink.text().split('Bleach ')[1].split(' vostfr')[0]
				};

		clearInterval(saveEpInt);


		chrome.storage.local.set({'nextep': nextEp}, function(){
			console.log('nextep saved');
		});


	}, 2000)
}