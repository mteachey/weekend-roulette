var bgImageArray = ["mountainbike-tire2.jpg","hike-girl-boots.jpg", "cheers.jpg", "hike-sun-stand-boots.jpg","hike-sun-boots2.jpg","restaurant-sun.jpg", "hike-view.jpg", "hike-sedona.jpg", "mtnbike-sun2.jpg","hike-sun-boots3.jpg", "bike-view.jpg"],
base = "_images/",
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
backgroundSequence();

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
