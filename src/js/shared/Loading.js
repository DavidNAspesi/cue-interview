import React from "react";

export default class Loading extends React.Component {
  constructor() {
    super();
    this.circles = [];
  }

  componentDidMount() {
    for (var i = 1; i < 10; i++) {
      this.circles.push($(`#c${i}`));
    }
    this.triggerFill(this.circles);
  }

  triggerFill(circles) {
    let tl = new TimelineMax({repeat:-1});
    tl.staggerTo(circles, 1, {
      fill: "#326295",
      ease: Expo.easeOut,
      opacity: 1,
    }, .2, "+=0")
    this.fadeInConnector(tl);
  }

  fadeInConnector(tl) {
    tl.to($("#connector-line"), 1, {
      ease: Expo.easeOut,
      opacity: 1,
    }, 1, "-=3")
  }

  render() {
    const circleStyle = {
      fill: "none",
      opacity: 0
    }

    const lineStyle = {
      fill: "none",
      stroke: "#326295",
      strokeWidth: "6px",
      opacity: 0
    }

    return (
      <div class="loading-pane">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 531.12 530.99">
          <title>CUE Marketplace Loading</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <circle id="c1" cx="40.32" cy="40.56" r="37.32" style={circleStyle}/>
              <circle id="c4" cx="40.32" cy="265.61" r="37.32" style={circleStyle}/>
              <circle id="c7" cx="40.32" cy="490.68" r="37.32" style={circleStyle}/>
              <circle id="c5" cx="265.47" cy="265.61" r="37.32" style={circleStyle}/>
              <circle id="c6" cx="490.8" cy="265.61" r="37.32" style={circleStyle}/>
              <circle id="c2" cx="265.47" cy="40.32" r="37.32" style={circleStyle}/>
              <circle id="c3" cx="490.8" cy="40.32" r="37.32" style={circleStyle}/>
              <circle id="c8" cx="265.47" cy="490.68" r="37.32" style={circleStyle}/>
              <circle id="c9" cx="490.8" cy="490.68" r="37.32" style={circleStyle}/>
              <polyline id="connector-line" points="490.8 265.61 265.46 265.61 40.32 40.56 40.32 265.61 265.46 265.61 40.32 490.68 40.32 265.61" style={lineStyle}/>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}
