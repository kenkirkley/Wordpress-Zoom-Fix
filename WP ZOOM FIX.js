// RECONCILIATION OF WP-ZOOM AND WOOLENTOR PRODUCT VIDEOS

/*
    STEPS:
    1. Match main zoom container to the size of the image shown
    2. Change zoom content to image selected
    3. Remove zoom from thumbnails

    PROGRAM FLOW:
    1. UPON PAGE LOAD: Remove zoom from thumbnails
    2. When a thumbnail is clicked:
        a. Match main zoom container to the size of the image shown
        b. Change zoom content to image selected
*/

// FIX ZOOM FUNCTIONALITY
// zoomFix:

// zoomFix uses closures to be able to use a callback function with a parameter, in this case, the index of the image that needs to appear in the zoomWindow.
function zoomFix(adjustedIndex, thumbnail) {
  return function() {
    if (thumbnail.classList[0] === "wlvideothumb") {
      document.querySelector(".zoomContainer").style.display = "none";
      console.log("zoom container removed");
    } else {
      document.querySelector(".zoomContainer").style.display = "block";
    }
    var imageSrc;
    // Select elements to be manipulated(image, main zoomContainer and zoomContainer with the image zoom content)
    imageSrc = document.getElementById(`wlvideo-${adjustedIndex}`).childNodes[1]
      .src;
    if (imageSrc !== undefined) {
      document.querySelector(
        ".zoomWindow"
      ).style.backgroundImage = `url("${imageSrc}")`;
    }
    // 2. Resize zoomContainer to image
    // 3. Resize zoomWindow to image
  };
}

// REMOVES ZOOM FROM THUMBNAILS
async function zoomRemove() {
  while (document.querySelector(".zoomContainer") == null) {
    await new Promise(r => setTimeout(r, 500));
  }
  zoomContainers = document.querySelectorAll(".zoomContainer");
  // This loop skips over the first zoomContainer, which is the main container that shows the product image.
  for (var i = 1; i < zoomContainers.length; i++) {
    zoomContainers[i].style.display = "none";
  }
}

(function() {
  if (document.querySelector(".video-cus-tab-pane") != null) {
    zoomRemove();
    var imageIndex = 1;
    document
      .querySelector(".woolentor-product-video-tabs")
      .childNodes.forEach((thumbnail, thumbnailIndex) => {
        if (thumbnailIndex % 2 == 1) {
          thumbnail.addEventListener("click", zoomFix(imageIndex, thumbnail));
          console.log(thumbnail);
          imageIndex++;
        }
      });
    // Event: zoomFix.
  }
})();
