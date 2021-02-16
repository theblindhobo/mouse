const mouseSpecs = require('./mouse-specs.json');

const findMouse = (handLength, handWidth) => {

  let miceToUse = [];

  for (let i = 0; i < mouseSpecs.length; i++) {

    let mouseLength = mouseSpecs[i].dimensions.length * 10;
    let mouseWidth = mouseSpecs[i].dimensions.width * 10;
    let mouseHeight = mouseSpecs[i].dimensions.height * 10;


    let ratio = ((handLength * handWidth) / ((0.5 * mouseLength) * mouseWidth));
    let optimalHeight = handLength / (Math.sqrt(Math.pow(0.5 * mouseLength, 2) + Math.pow(mouseHeight, 2)));
    let optimalWidth = handWidth / mouseWidth;

    // check sweet spots
    let sweetRatio = (ratio >= 1.8 && ratio <= 2.15);
    let sweetOptimalHeight = (optimalHeight >= 1.2 && optimalHeight <= 1.6);
    let sweetOptimalWidth = (optimalWidth >= 1.2 && optimalWidth <= 1.6);

    if(sweetRatio && sweetOptimalHeight && sweetOptimalWidth) {
      let closestToRatio = Math.abs(2.0 - ratio);
      let closestToHeight = Math.abs(1.4 - optimalHeight);
      let closestToWidth = Math.abs(1.4 - optimalWidth);
      miceToUse.push({
        "mouse": mouseSpecs[i].mouse,
        "abs": {
          "ratio": closestToRatio,
          "height": closestToHeight,
          "width": closestToWidth,
          "avg": (closestToRatio + closestToHeight + closestToWidth) / 3
        }
      });

    }

  }

  if(miceToUse.length === 0) {
    console.log('None of these mice fit your hand size.');
  }

  else if(miceToUse.length > 0) {

    // Sorts avg values
    miceToUse.sort(function (a, b) {
      return (a.abs.avg - b.abs.avg);
    });

    // Displays top 3 mice
    for(let i = 0; i < 3; i++) {
      console.log(miceToUse[i]);
    }

  }

}


findMouse(95, 80);
