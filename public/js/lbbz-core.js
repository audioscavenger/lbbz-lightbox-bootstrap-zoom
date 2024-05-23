// lightbox modal ///////////////////////////////////////////////

function isHrefImg(src) {
    let extensions = ["png", "jpg", "jpeg", "webp", "avif", "gif"];
	return extensions.some(ext => src.split('.').pop() == ext);
}

//window.addEventListener("load", function(){
jQuery(document).ready(function( $ ){
	
	// https://dev.to/stackfindover/zoom-image-point-with-mouse-wheel-11n3
	// this html addnon has moved into the php function that alters images
	// document.body.insertAdjacentHTML("beforeend", lightboxModalHtml);
	
	// https://getbootstrap.com/docs/5.3/components/modal/#methods
	// php will only add the modal if there is at least 1 image in post
	const lightboxModal = document.getElementById('lbbz')
	if (lightboxModal) {
		// we cannot uselbbz-body because we want to scroll wheel outside the img as well
		//lightbox_zoom = document.getElementById('lbbz-body');
		var lightbox_zoom = document.getElementById('lbbz-content');
		var modalBody = document.getElementById('lbbz-body');
		var modalImg = document.querySelector('.modal-body img');
		var prev = document.getElementById('lbbz-prev-btn');
		var next = document.getElementById('lbbz-next-btn');
		var spinner = document.getElementById('spinner');
		var scale, minScale,
			scale_ratio = 1.1,
			clickhold = false,
			pointX = 0, pointY = 0,
			start = { x: 0, y: 0 }, moved = false,
			rect, boundW, boundH, boundPortrait,
			imgRect, imgW, imgH, naturalW, naturalH, imgPortrait,
			pixelated = false,
			rel = null, related=[], index = 0;
    // var spinnerClass = 'lds-dual-ring';
    var spinnerClass = 'lds-hourglass';

		function resetSizes() {
			clickhold = false
			pointX = 0
			pointY = 0
			start = { x: 0, y: 0 }
			scale = 1
			modalBody.removeAttribute("style")
		}

		function detectDimensions(event) {
			//modalImg.classList.remove(spinnerClass);

			//console.log('event',event)
			// naturalW naturalH = actual size of the image, we don;t care about those values since all is relative to the computed starting size
			naturalW = modalImg.naturalWidth
			naturalH = modalImg.naturalHeight

			//console.log(`img w,h = ${naturalW}x${naturalH}`)

			// getBoundingClientRect(): computed x,y,right,bottom: start/end from top-left and actual width/height
			// boundW boundH = computed size of the modal-content
			rect = modalBody.getBoundingClientRect();
			//console.log('modalBody rect',rect)
			boundW = rect.width
			boundH = rect.height
			boundPortrait = (boundW > boundH) ? false : true;

			// getBoundingClientRect(): computed x,y,right,bottom: start/end from top-left and actual width/height
			//imgW imgH = computed size of the image onload starting at scale = 1
			imgRect = modalImg.getBoundingClientRect();
			imgW = imgRect.width;
			imgH = imgRect.height;
			imgPortrait = (imgRect.width > imgRect.height) ? false : true;

			//scale = imgRect.width / naturalW	// nope
			//scale = boundW / naturalW			// nope
			minScale = ((boundW / imgW) < (boundH / imgH)) ? boundW / imgW : boundH / imgH;

			// add pixelated class in Image CSS Class to force no sampling: pixelated
			// otherwise, it only gets pixelated above scale=2
			if (modalImg.classList.contains('pixelated')) { pixelated = true }

			resetSizes()
			//console.log(`boundWxH=${boundW}x${boundH} imgWxH=${imgW}x${imgH} scale=${scale}=1 minScale=${minScale}`);
		}

		// event delegation but all img should have: data-bs-toggle="modal" data-bs-target="#lbbz"
		// this has to be added with a PHP snippet unfortunately...
		// we could do it here as well...
		document.getElementsByTagName("article")[0].addEventListener('click', function(event) {
			if (event.target.tagName === 'IMG') {
				event.preventDefault();
				// Handle the click event for the <img> tag
				// console.log('Image clicked:', event.target.src);
				
				// https://getbootstrap.com/docs/5.3/components/modal/#via-javascript
				// we cannot just call the modal here because lightboxModal will not receive event.relatedTarget, and we cannot pass anything to the modal
				// const myModal = new bootstrap.Modal(lightboxModal, {src: event.target.src})
				// console.log('myModal', myModal);
				// myModal.toggle()
			}
		});

		lightboxModal.addEventListener('show.bs.modal', event => {
			//console.log('event',event); // element that triggered the modal
			//console.log('event.classList',event.relatedTarget.classList);

			
			// exit immediately if this is a gallery. Usually handled by other scripts like magnificPopup
			if (event.relatedTarget.closest('.gallery')) {
				// example: MagnificPopup gallery
				return event.preventDefault();

				// https://dimsemenov.com/plugins/magnific-popup/documentation.html#options

				// MagnificPopup has this structure:
				//	<div class="mfp-wrap mfp-gallery mfp-close-btn-in mfp-auto-cursor mfp-ready" tabindex="-1" style="overflow: hidden auto;">
				//		<div class="mfp-container mfp-image-holder mfp-s-ready">
				//			<div class="mfp-content">
				//				<div class="mfp-figure" style="visibility: visible;">
				//					<button title="Close (Esc)" type="button" class="mfp-close">×</button>
				//					<figure><img class="mfp-img" alt="alt" src="src" style="max-height: 588px;">
			}
			
			let parent = event.relatedTarget.parentNode	// parent should be a link if we clicked on an image that links to its full size

			//console.log('event.srcElement,type',event.srcElement,event.type);
			//console.log('modalImg:', modalImg);
			
			// extract target img if exist, if not, close modal
			if (parent.hasAttribute("href")) {
				let parentHref = parent.href;
				if (isHrefImg(parentHref)) {
					// console.log('parentHref img:', parentHref);
					
					// Extract rel for galleries
					// gallery: img parent = <a rel="rel"> and we shall cycle through them
					if (parent.hasAttribute("rel")) {
						rel = parent.getAttribute("rel");
						//console.log('rel:', rel);
						related = document.querySelectorAll('[rel="'+rel+'"]');
						//console.log('related:', related);
						related.forEach(function (currentValue, currentIndex, listObj) {
						  //console.log(`currentValue=${currentValue}, currentIndex=${currentIndex}, href=${currentValue.href}`);
						  if (parentHref == currentValue.href) index = currentIndex;
						});
					} else {
						rel = null;
						related = [];
					}
					
					// reset transform style from the parent
					//modalImg.parentNode.removeAttribute("style")
					modalBody.removeAttribute("style")
				
					// load img only if needed
					if (!modalImg.hasAttribute("src")) {
						// first time load
						//console.log('first')
						modalImg.src = parentHref
					} else if (modalImg.src != parentHref) {
						// load new image
						//console.log('new')
						modalImg.src = parentHref
					} else {
						// reset dimensions anyway
						//console.log('reset')
						//detectDimensions(event);
						//scale = boundW / naturalW		// nope
						resetSizes()
					}

				} // isHrefImg(parentHref)
			} else {
				// interrupt modal, there is no link, nothing to zoom on
				// https://stackoverflow.com/questions/67513467/bootstrap-suppress-modal-from-within-show-bs-modal-event
				return event.preventDefault();
			} // parent.hasAttribute("href")


			// async Update the modal's img with full size img onload
			modalImg.onload = function(e) {
				detectDimensions(e);
				spinner.classList.remove(spinnerClass);
				modalImg.classList.remove('opacity-25');
			}
			
  			prev.onclick = function(e) {
				if (related.length > 1) {
					spinner.classList.add(spinnerClass);
					modalImg.classList.add('opacity-25');
					index = (index == 0 && related.length > 1) ? related.length - 1 : --index;
					//console.log(`index=${index} href=${related[index]} related=`,related)
					modalImg.src = related[index]
					//resetSizes()
				}
			}

  			next.onclick = function(e) {
				if (related.length > 1) {
					spinner.classList.add(spinnerClass);
					modalImg.classList.add('opacity-25');
					index = (index == related.length - 1 && related.length > 1) ? 0 : ++index;
					//console.log(`index=${index} href=${related[index]} related=`,related)
					modalImg.src = related[index]
					//resetSizes()
				}
			}

  			modalImg.onclick = function(e) {
				if (moved) return;
				if (related.length > 1) {
					spinner.classList.add(spinnerClass);
					modalImg.classList.add('opacity-25');
					index = (index == related.length - 1 && related.length > 1) ? 0 : ++index;
					//console.log(`index=${index} href=${related[index]} related=`,related)
					modalImg.src = related[index]
					//resetSizes()
				}
			}

			// lightbox zoom ///////////////////////////////////////////////
			function setTransform(e) {
				//console.log(`pointX/Y=${pointX}/${pointY} scale=${scale} mouseX/Y=${e.x}/${e.y}`);

				// release mouse when dragging outside the modal.
				// If we don't do that, the image sticks to it and when back in modal a click is needed to release. Inconvenient.
				//console.log('rect',rect);
				if (e.x < rect.left || e.x > rect.right || e.y < rect.top || e.y > rect.bottom) {
					var evt = document.createEvent("MouseEvents"); evt.initEvent("mouseup", true, true); lightbox_zoom.dispatchEvent(evt);
				}
				// pointX and pointY are the exact position of the image from the top-left corner of modal-content
				// scale IS RELATIVE TO THE MODAL SIZE - that means larger images downsized to fit have scale = 1
				// it makes no fucking sense but that's how this whole shit works
				modalBody.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";

				//detectDimensions(e);
			}

			lightbox_zoom.onmousedown = function (e) {
				e.preventDefault();
				//modalBody.classList.add('notransition');
				// e.clientX/Y = e.x/y = cursor position from top-left corner
				start = { x: e.x - pointX, y: e.y - pointY };
				moved = false;
				//console.log('e',e);
				//console.log('e.x, e.y',e.x,e.y);
				//console.log('pointX, pointY',pointX,pointY);
				//console.log('startX, startY',start.x, start.y);
				clickhold = true;
			}

			lightbox_zoom.onmouseup = function (e) {
				clickhold = false;
			}

			lightbox_zoom.onmousemove = function (e) {
				e.preventDefault();
				if (!clickhold) {
					return;
				}
				pointX = (e.x - start.x);
				pointY = (e.y - start.y);
				moved = true;	// drag detected
				setTransform(e);
			}

			lightbox_zoom.onwheel = function (e) {
			  // e.x = e.clientX = where you click relative to top-left corner of the view screen
			  // pointX and pointY are the exact position of the image from the top-left corner of modal-content
			  e.preventDefault();
			  if (!rect) {
				  rect = modalBody.getBoundingClientRect();	// in certain cases, the margin will prevent rect detection when scrolling close to it
				  //console.log('rect was null',rect)
			  }
			  let xs = Math.round((e.clientX - pointX - modalImg.x ) / scale),
				  ys = Math.round((e.clientY - pointY - modalImg.y ) / scale),
				  delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY),
				  previous_scale = scale;
				// we rely on modalImg.x/y because only an img can give us its x/y position
				//console.log(`xs = Math.round((${e.clientX} - ${pointX} - ${modalImg.x} ) / ${scale})`);
				(delta > 0) ? (scale *= scale_ratio) : (scale /= scale_ratio);

				// Constrain zoom to rect modal dimensions by adjusting scale
				//if ((scale < 1) && (naturalW*scale <= boundW) && (naturalH*scale <= boundH)) { // nope that's real_scale which we don't care about
				if ((scale <= 1) && (imgW*scale <= boundW) && (imgH*scale <= boundH)) {
					//console.log(`if (${scale} < 1) && (${imgW*scale} <= ${boundW}) && (${imgH*scale} <= ${boundH}))`)
					// force adjust smallest scale that fits when both W and H are smaller then box boundaries
					scale = minScale;
					
					if (!boundPortrait) { pointY = 0 } else pointX = 0;
					pointX = (pointX < 0) ? 0 : pointX;	// make sure we stay inbound left
					pointX = ((pointX + imgW*scale) > boundW) ? (boundW - imgW*scale) : pointX; // make sure we stay inbound right
					pointY = (pointY < 0) ? 0 : pointY; // make sure we stay top
					pointY = ((pointY + imgH*scale) > boundH) ? (boundH - imgH*scale) : pointY; // make sure we stay inbound bottom

				} else {
					pointX = Math.round(e.clientX - xs * scale) - modalImg.x;
					pointY = Math.round(e.clientY - ys * scale) - modalImg.y;
					//console.log(`pointX = ${pointX} = Math.round(${e.clientX} - ${xs} * ${scale}) - ${modalImg.x}`);
				}

				if (!pixelated) { // always pixelated
					if ((previous_scale <= 2) && (scale > 2)) {	// pixelated from scale=2
						//console.log(`previous_scale ${previous_scale} <=1 scale=${scale}`)
						modalImg.classList.toggle('pixelated');	// we zoom for a reason: see the details
					} else if ((previous_scale > 2) && (scale <= 2)) {
						//console.log(`previous_scale ${previous_scale} <=1 scale=${scale}`)
						modalImg.classList.toggle('pixelated');	// we dezoom and want sampling applied
					}
				}
				
				setTransform(e);

			} // onwheel
			// lightbox zoom ///////////////////////////////////////////////
			

		}); //addEventListener
	
	} // if (lightboxModal)

}); // on load


