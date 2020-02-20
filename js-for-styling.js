//var bgImageArray = ["mtnbike-bike.jpg","hike-boots-girl.jpg", "restaurant-cheers.jpg", "hike-boots-view.jpg","mtnbike-bike-view.jpg","restaurant-sunlight.jpg"],
//base = "https://paintedskycreative.com/_images/weekend-roulette/",
secs = 4;
bgImageArray.forEach(function(img){
    new Image().src = base + img; 
    // caches images, avoiding white flash between background replacements
});

function backgroundSequence() {
	window.clearTimeout();
	var k = 0;
	for (i = 0; i < bgImageArray.length; i++) {
		setTimeout(function(){ 
			document.documentElement.style.background = "url(" + base + bgImageArray[k] + ") no-repeat center center fixed";
			document.documentElement.style.backgroundSize ="cover";
		if ((k + 1) === bgImageArray.length) { setTimeout(function() { backgroundSequence() }, (secs * 1000))} else { k++; }			
		}, (secs * 1000) * i)	
	}
}
//backgroundSequence();

// Wrap every letter in a span
var textWrapper = document.querySelector('.title .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.title .letter',
    rotateY: [-90, 0],
    duration: 2600,
    delay: (el, i) => 45 * i
  }).add({
    targets: '.ml10',
    opacity: 0,
    duration: 2000,
    easing: "easeOutExpo",
    delay: 1000
  });
