$(document).ready(function(){
	
	var thisEp = 12,
			playerState = false,
			nextep = {};

			nextep.exist = false;

	initThisEp();
	initPlayerState();

	$('.newep-btn').click(function(){
		setEp( $('.newep-input').val() );
	})

	$(".play").click(function(){

		play();

	})


	$(".player-state").click(function(){

		if(playerState) {
			playerState = false
			$(".player-state").text('off');
			chrome.storage.local.set({"playerState":false}, function(){})
		}else{
			playerState = true;
			$(".player-state").text('on');
			chrome.storage.local.set({"playerState":true}, function(){})
		}

	})


	function play(){
		chrome.tabs.update({
			url: "http://www.mavanimes.com/bleach-"+thisEp+"-vostfr/"
		})
	}

	function setEp(ep){
		thisEp = ep;
		$(".thisep-show").text(ep);

		chrome.storage.local.set({ "bleachep": thisEp}, function(){
		});
	}

	function initThisEp(){

		chrome.storage.local.get('bleachep', function(items){

			if(items.bleachep){

				setEp(items.bleachep)

			}else{

				setEp(55);

			}

		})

		chrome.storage.local.get('nextep', function(nextepStorage){
			
			if(nextepStorage.nextep){
				nextep = nextepStorage.nextep;
				nextep.exist = true;
	
				console.log({nextepexist:nextep});

				$(".nextep span").text(nextep.number);
				$(".nextep").click(function(){
					setEp(nextep.number);
					play();
				})

			}else{
				console.log('no nextep founded');
				nextep = {}
				nextep.exist = false;
			}
		})
	}

	function initPlayerState(){
		chrome.storage.local.get('playerState', function(pstate){
			if(pstate.playerState){
				playerState = false
				$(".player-state").text('off');
				chrome.storage.local.set({"playerState":false}, function(){})
			}else{
				playerState = true;
				$(".player-state").text('on');
				chrome.storage.local.set({"playerState":true}, function(){})
			}
		})
	}

})
