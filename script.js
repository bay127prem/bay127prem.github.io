/*MORE-IMAGES*/
const IMG_SEP = ',';

function nextImage(icon){
	if(icon.classList.contains('loading')) return;
	
	var image = icon.parentNode.getElementsByTagName('img')[0];
	var length = icon.getAttribute('data-image-count');
	!image.ready ? makeReady(image,icon) : null;
	var newImageSrc =
			'projects/images/'
		+ image.parentNode.id + image.index + '.png'
	
	image.src = newImageSrc;
	image.index+1>length ? image.index=1 : image.index++;
	
	imageChanged(image,icon);
}

function makeReady(image,icon){
	image.onload = function(){
		imageLoaded(image,icon);
	};
	image.index=2;
	image.ready=true;
}

function imageChanged(image,icon){
	icon.classList.add('loading');
	image.classList.add('loading');
}

function imageLoaded(image,icon){
	icon.classList.remove('loading');
	window.setTimeout(function(){
		image.classList.remove('loading');
	}, 50);
}


/*IMAGE-VIEWER*/
var viewer = document.getElementById('image-viewer');
var bigImage = document.getElementById('big-image');

viewer.addEventListener('click', function(e){
	if(e.target!=viewer) return;
	
	self = this;
	self.classList.add('fadeout');
	bigImage.classList.add('shrink');
	
	setTimeout(function(){
		self.classList.add('outoffocus');
	}, 250);
	
	/*document.body.classList.remove('no-scroll');*/
}, false);

var zoomImages = document.querySelectorAll('img.zoom');
for(var i = 0; i < zoomImages.length; i++){
	zoomImages[i].addEventListener('click', function(e){
		if(this.srcset){
			bigImage.srcset = this.srcset;
			bigImage.removeAttribute('src');
		}
		else{
			bigImage.src = this.src;
			bigImage.removeAttribute('srcset');
		}
		viewer.classList.remove('outoffocus');
		viewer.classList.remove('fadeout');
		bigImage.classList.remove('shrink');
		
		/*document.body.classList.add('no-scroll');*/
	}, false);
}
;