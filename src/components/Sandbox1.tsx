import React, {useEffect, useRef} from 'react'
import './sandbox1.css';
import * as d3 from 'd3';

const Sandbox1 = () => {
  const canvas = useRef(null);
  console.log(canvas);
  
  useEffect(() => {
     showCanvas();
   })


   const showCanvas = () => {
     const width = 600;
     const height = 400;

     const svg = d3.select(canvas.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserverAspectRatio", "xminYmin")
      .style("background-color", "green")
      // .attr("width", `${width}`)
      // .attr("height", `${height}`)
   }


  return (
    <div className='sandbox1'>
      <div className="canvas" ref={canvas}></div>
    </div>
  )
}
export default Sandbox1;