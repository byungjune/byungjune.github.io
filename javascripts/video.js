(function() {

    // var canvas = document.getElementById('canvas'),
    // context = canvas.getContext('2d'),
    video = document.getElementById('video'),
    vendorUrl = window.URL || window.webkitURL;

    navigator.getMedia =  navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetuserMedia ||
    navigator.msGetUserMedia;

    navigator.getMedia({
      video: true,
      audio: false
    }, function(stream) {
    //   video.src = window.URL.createObjectURL(stream);
        video.srcObject=stream;
      video.play();
    }, function(error) {
      // an error occurred
    } );

    video.addEventListener('play', function() {
      // draw( this, context, 1024, 768 );
    }, false );
  })();

  // function draw( video, context, width, height ) {
  //   // var image, data, i, r, g, b, brightness;

  //   // context.drawImage( video, 0, 0, width, height );

  //   // image = context.getImageData( 0, 0, width, height );
  //   // data = image.data;

  //   // for( i = 0 ; i < data.length ; i += 4 ) {
  //   //   r = data[i];
  //   //   g = data[i + 1];
  //   //   b = data[i + 2];
  //   //   brightness = ( r + g + b ) / 3;

  //   //   data[i] = data[i + 1] = data[i + 2] = brightness;
  //   // }

  //   // image.data = data;

  //   // context.putImageData( image, 0, 0 );

  //   context.fillRect(25, 25, 100, 100);
  //   context.clearRect(45, 45, 60, 60);
  //   context.strokeRect(50, 50, 50, 50);

  //   // setTimeout( draw, 10, video, context, width, height );
  // }

function draw( context, width, height, x, y, color ) {
  // context.fillRect(x, y, 100, 100);
  // context.clearRect(x, y, 60, 60);
  context.strokeStyle = color || "orange";
  context.lineWidth = 2;
  context.strokeRect(Math.floor(x)-15, Math.floor(y)-15, 30, 30);

  // setTimeout( draw, 10, video, context, width, height );
}

function toTuple({y, x}) {
  return [y, x];
}

function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = 2;
  ctx.strokeStyle = color || 'red';
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  const adjacentKeyPoints =
      posenet.getAdjacentKeyPoints(keypoints, minConfidence);
  const color = 'white';
  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
        toTuple(keypoints[0].position), toTuple(keypoints[1].position), color,
        scale, ctx);
  });
}