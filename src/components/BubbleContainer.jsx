'use client';
import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import Bubble from './Bubble';

const sampleData = [
  { id: 1, name: 'Album 1', r: 10 },
  { id: 2, name: 'Album 2', r: 10 },
  { id: 3, name: 'Album 3', r: 10 },
  { id: 4, name: 'Album 4', r: 10 },
  { id: 5, name: 'Album 5', r: 10 },
  { id: 6, name: 'Album 6', r: 10 },
  { id: 7, name: 'Album 7', r: 10 },
  { id: 8, name: 'Album 8', r: 10 },
  { id: 9, name: 'Album 9', r: 10 },
  { id: 10, name: 'Album 10', r: 10 },
  { id: 11, name: 'Album 11', r: 10 },
  { id: 12, name: 'Album 12', r: 10 },
  { id: 13, name: 'Album 13', r: 10 },
  { id: 14, name: 'Album 14', r: 10 },
  { id: 15, name: 'Album 15', r: 10 },
  { id: 16, name: 'Album 16', r: 10 },
  { id: 17, name: 'Album 17', r: 10 },
  { id: 18, name: 'Album 18', r: 10 },
];
const BubbleContainer = () => {
  const svgRef = useRef(null);
  const [bubbles, setBubbles] = useState(sampleData);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = windowDimensions.width;
    const height = windowDimensions.height;

    const simulation = d3
      .forceSimulation(bubbles)
      .force('x', d3.forceX(width / 2).strength(0.03))
      .force('y', d3.forceY(height / 2).strength(0.03))
      .force(
        'collide',
        d3.forceCollide((d) => d.r + 1)
      )
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        svg
          .selectAll('circle')
          .data(bubbles)
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y);
      });

    const handleMousemove = (e) => {
      const [mx, my] = d3.pointer(e);
      const xx = d3.mean(bubbles, (d) => d.x);
      const xy = d3.mean(bubbles, (d) => d.y);

      const offsetX = (width / 2 - xx) * 0.5;
      const offsetY = (height / 2 - xy) * 0.5;

      svg.attr('transform', `translate(${offsetX}, ${offsetY})`);

      svg.selectAll('circle').attr('transform', (d) => {
        const dx = mx - width / 2;
        const dy = my - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scale = (1 / Math.log10(Math.max(distance / 10, 1))) * 10;
        console.log(scale);
        const offsetX = dx * (1 - scale) * 0.2;
        const offsetY = dy * (1 - scale) * 0.2;

        return `translate(${offsetX}, ${offsetY}) scale(${Math.min(
          scale,
          50
        )})`;
      });
    };

    d3.select(window).on('mousemove', handleMousemove);

    return () => {
      d3.select(window).on('mousemove', null);
      simulation.stop();
    };
  }, [bubbles, windowDimensions]);

  return (
    <div className='relative w-full h-screen p-8'>
      <svg ref={svgRef} className='bg-red-900 absolute inset-0 w-full h-full'>
        <g>
          {bubbles.map((item) => (
            <circle
              key={item.id}
              r={item.r}
              fill='gray'
              style={{ transformOrigin: 'center center' }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default BubbleContainer;
