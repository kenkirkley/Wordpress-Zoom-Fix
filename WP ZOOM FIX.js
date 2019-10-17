(async () => {
  var thumbnails;
  var flexViewport;

  async function init() {
    // Waits for the thumbnails to load in
    while (document.querySelector(".flex-control-thumbs") === null) {
      await new Promise(r => setTimeout(r, 500));
    }
    thumbnails = document.querySelector(".flex-control-thumbs");
    var thumbnailWidth = thumbnails.firstChild.firstChild.offsetWidth;
    var thumbnailHeight;
    // Waits for thumbnails to render fully so correct height can be referenced
    while (thumbnails.firstChild.firstChild.offsetHeight <= 10) {
      await new Promise(r => setTimeout(r, 500));
    }
    thumbnailHeight = thumbnails.firstChild.firstChild.offsetHeight;
    thumbnails.lastChild.insertAdjacentHTML(
      "afterend",
      `<li class="video-thumbnail"><iframe class="mini-player" width='${thumbnailWidth}' height='${thumbnailHeight}' src='https://www.youtube.com/embed/pCuZdRN2XpM' style='border-style: solid;
      border-width: 5px 5px 5px 5px;
      border-color: #723ba5;
      border-radius: 25px 25px 25px 25px;' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></li>`
    );

    thumbnails.lastChild.lastChild.insertAdjacentHTML(
      "beforebegin",
      `<div class="video-click" style="position: absolute; opacity: 0; z-index: 10; width: ${thumbnailWidth}px; height: ${thumbnailHeight}px"></div>`
    );
  }

  function resizeThumbnail() {
    var videoThumbnail = document.querySelector(".mini-player");
    var videoClick = document.querySelector(".video-click");

    videoThumbnail.height = thumbnails.firstChild.firstChild.offsetHeight;
    videoThumbnail.width = thumbnails.firstChild.firstChild.offsetWidth;
    videoClick.height = thumbnails.firstChild.firstChild.offsetHeight;
    videoClick.width = thumbnails.firstChild.firstChild.offsetWidth;
  }

  // Activated when the thumbnail is clicked.
  // Adds video to gallery in front of current slide, making the video the slide shown.
  function toggleVideo(event) {
    videoGallery = document.querySelector(".video-gallery");
    if (!videoGallery) {
      document.querySelector(
        ".flex-control-thumbs"
      ).lastChild.style.opacity = 1;
      document.querySelector(".flex-active").style.opacity = 0.5;
      videoIndex = thumbnails.childNodes.length - 1;
      productImages = document.querySelectorAll(
        ".woocommerce-product-gallery__image"
      );
      // needs to be in front of current slide
      document
        .querySelector(".flex-active-slide")
        .insertAdjacentHTML(
          "beforebegin",
          '<div class="video-gallery" style="width: 530px; margin-right: 0px; float: left; display: block; position: relative; overflow: hidden;"> <iframe width="530" height="315" src="https://www.youtube.com/embed/pCuZdRN2XpM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> </div>'
        );

      if (flexViewport === undefined) {
        flexViewport = document.querySelector(".flex-viewport");
      }
      flexViewport.classList.add("flex-transition");
      flexViewport.classList.add("video-viewport");
      // productImages.forEach(e => {
      //   e.classList.remove("flex-active-slide");
      // });

      // need to change back to first slide, then create video in front of first slide
    }
  }

  // Removes video from gallery, changing back to normal images
  async function removeVideo() {
    videoGallery = document.querySelector(".video-gallery");
    if (videoGallery) {
      // await new Promise(r => setTimeout(r, 500));

      thumbnails.lastChild.style.opacity = 0.5;
      document.querySelector(".flex-active").style.opacity = "";
      flexViewport.classList.toggle("video-viewport");
      videoGallery.parentNode.removeChild(videoGallery);
      flexViewport.classList.remove("flex-transition");
    }
  }
  await init();
  productThumbnails = thumbnails.childNodes;
  productThumbnails.forEach((el, index) => {
    if (!(index === productThumbnails.length - 1)) {
      ["click", "touchstart"].forEach(evt =>
        el.addEventListener(evt, removeVideo)
      );
    }
  });
  document
    .querySelector(".video-thumbnail")
    .addEventListener("click", toggleVideo);

  window.addEventListener("resize", resizeThumbnail);
})();
