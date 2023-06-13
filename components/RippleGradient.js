import React, { useRef } from "react";
import Sketch from "react-p5";

const RippleGradient = () => {
  const phase = useRef(0);
  let colors = [
    [255, 255, 255], // white
  ];

  // interpolate some percentage between the two colors
  // percentage ex 0.75
  // color1 ex [255, 0, 0]
  function interpolate(percentage, color1, color2) {
    let r = color1[0] + (color2[0] - color1[0]) * percentage;
    let g = color1[1] + (color2[1] - color1[1]) * percentage;
    let b = color1[2] + (color2[2] - color1[2]) * percentage;

    return [r, g, b];
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    fetch("/api/weather", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        // [1] get the two colors from temperature
        // get temperature from json.main.temp
        let temperature = json.main.temp;
        let color1 = [0, 0, 255]; // blue is cold
        let color2 = [255, 0, 0]; // red is hot

        let maxtemp = 110;
        let mintemp = 20;
        let percentage = (temperature - mintemp) / (maxtemp - mintemp);
        console.log("temperature percentage", percentage);

        let color = interpolate(percentage, color1, color2);
        console.log("color", color);

        // accennt color is a copy of color
        let accentColor = [...color];
        accentColor[1] = color[1] + 60;
        colors = [color, accentColor, color, accentColor];
      });
  };
  const draw = (p5) => {
    let freq = 0.0005;
    let nColors = colors.length;
    p5.background(220);

    for (let y = 0; y < p5.height; y++) {
      let t = (y / p5.height + phase.current) % 1;
      let colorIdx = Math.floor(t * nColors);
      let nextColorIdx = (colorIdx + 1) % nColors;

      let amt = t * nColors - colorIdx;
      amt = p5.constrain(amt, 0, 1);

      let c = p5.lerpColor(
        p5.color(...colors[colorIdx]),
        p5.color(...colors[nextColorIdx]),
        amt
      );
      p5.stroke(c);
      p5.line(0, y, p5.width, y);
    }

    phase.current += freq;
    if (phase.current >= 1) phase.current -= 1;
  };

  const styles = {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return <Sketch style={styles} setup={setup} draw={draw} />;
};

export default RippleGradient;
