'use client';
import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import Bubble from './Bubble';

const sampleData = [
  { id: 1, name: 'Album 1', r: 116 },
  { id: 2, name: 'Album 2', r: 116 },
  { id: 3, name: 'Album 3', r: 37 },
  { id: 4, name: 'Album 4', r: 93 },
  { id: 5, name: 'Album 5', r: 81 },
  { id: 6, name: 'Album 6', r: 30 },
  { id: 7, name: 'Album 7', r: 119 },
  { id: 8, name: 'Album 8', r: 115 },
  { id: 9, name: 'Album 9', r: 20 },
  { id: 10, name: 'Album 10', r: 94 },
  { id: 11, name: 'Album 11', r: 44 },
  { id: 12, name: 'Album 12', r: 100 },
  { id: 13, name: 'Album 13', r: 36 },
  { id: 14, name: 'Album 14', r: 108 },
  { id: 15, name: 'Album 15', r: 55 },
  { id: 16, name: 'Album 16', r: 57 },
  { id: 17, name: 'Album 17', r: 90 },
  { id: 18, name: 'Album 18', r: 44 },
  { id: 19, name: 'Album 19', r: 36 },
  { id: 20, name: 'Album 20', r: 61 },
  { id: 21, name: 'Album 21', r: 108 },
  { id: 22, name: 'Album 22', r: 30 },
  { id: 23, name: 'Album 23', r: 28 },
  { id: 24, name: 'Album 24', r: 75 },
  { id: 25, name: 'Album 25', r: 88 },
  { id: 26, name: 'Album 26', r: 30 },
  { id: 27, name: 'Album 27', r: 109 },
  { id: 28, name: 'Album 28', r: 39 },
  { id: 29, name: 'Album 29', r: 119 },
  { id: 30, name: 'Album 30', r: 98 },
  { id: 31, name: 'Album 31', r: 72 },
  { id: 32, name: 'Album 32', r: 29 },
  { id: 33, name: 'Album 33', r: 101 },
  { id: 34, name: 'Album 34', r: 87 },
  { id: 35, name: 'Album 35', r: 103 },
  { id: 36, name: 'Album 36', r: 20 },
  { id: 37, name: 'Album 37', r: 44 },
  { id: 38, name: 'Album 38', r: 119 },
  { id: 39, name: 'Album 39', r: 98 },
  { id: 40, name: 'Album 40', r: 75 },
  { id: 41, name: 'Album 41', r: 105 },
  { id: 42, name: 'Album 42', r: 30 },
  { id: 43, name: 'Album 43', r: 112 },
  { id: 44, name: 'Album 44', r: 43 },
  { id: 45, name: 'Album 45', r: 39 },
  { id: 46, name: 'Album 46', r: 32 },
  { id: 47, name: 'Album 47', r: 23 },
  { id: 48, name: 'Album 48', r: 65 },
  { id: 49, name: 'Album 49', r: 37 },
  { id: 50, name: 'Album 50', r: 28 },
  { id: 51, name: 'Album 51', r: 99 },
  { id: 52, name: 'Album 52', r: 57 },
  { id: 53, name: 'Album 53', r: 47 },
  { id: 54, name: 'Album 54', r: 82 },
  { id: 55, name: 'Album 55', r: 61 },
  { id: 56, name: 'Album 56', r: 79 },
  { id: 57, name: 'Album 57', r: 32 },
  { id: 58, name: 'Album 58', r: 68 },
  { id: 59, name: 'Album 59', r: 61 },
  { id: 60, name: 'Album 60', r: 82 },
  { id: 61, name: 'Album 61', r: 88 },
  { id: 62, name: 'Album 62', r: 35 },
  { id: 63, name: 'Album 63', r: 32 },
  { id: 64, name: 'Album 64', r: 49 },
  { id: 65, name: 'Album 65', r: 60 },
  { id: 66, name: 'Album 66', r: 75 },
  { id: 67, name: 'Album 67', r: 118 },
  { id: 68, name: 'Album 68', r: 96 },
  { id: 69, name: 'Album 69', r: 38 },
  { id: 70, name: 'Album 70', r: 105 },
  { id: 71, name: 'Album 71', r: 48 },
  { id: 72, name: 'Album 72', r: 92 },
  { id: 73, name: 'Album 73', r: 20 },
  { id: 74, name: 'Album 74', r: 77 },
  { id: 75, name: 'Album 75', r: 91 },
  { id: 76, name: 'Album 76', r: 89 },
  { id: 77, name: 'Album 77', r: 47 },
  { id: 78, name: 'Album 78', r: 33 },
  { id: 79, name: 'Album 79', r: 103 },
  { id: 80, name: 'Album 80', r: 96 },
  { id: 81, name: 'Album 81', r: 63 },
  { id: 82, name: 'Album 82', r: 30 },
  { id: 83, name: 'Album 83', r: 54 },
  { id: 84, name: 'Album 84', r: 75 },
  { id: 85, name: 'Album 85', r: 35 },
  { id: 86, name: 'Album 86', r: 27 },
  { id: 87, name: 'Album 87', r: 27 },
  { id: 88, name: 'Album 88', r: 97 },
  { id: 89, name: 'Album 89', r: 110 },
  { id: 90, name: 'Album 90', r: 101 },
  { id: 91, name: 'Album 91', r: 51 },
  { id: 92, name: 'Album 92', r: 79 },
  { id: 93, name: 'Album 93', r: 90 },
  { id: 94, name: 'Album 94', r: 21 },
  { id: 95, name: 'Album 95', r: 112 },
  { id: 96, name: 'Album 96', r: 70 },
  { id: 97, name: 'Album 97', r: 79 },
  { id: 98, name: 'Album 98', r: 69 },
  { id: 99, name: 'Album 99', r: 33 },
  { id: 100, name: 'Album 100', r: 43 },
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
      .force('x', d3.forceX(width / 2).strength(0.01))
      .force('y', d3.forceY(height / 2).strength(0.05))
      .force(
        'collide',
        d3.forceCollide((d) => d.r + 1)
      )
      .on('tick', () => {
        svg
          .selectAll('circle')
          .data(bubbles)
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y);
      });

    const handleMousemove = (e) => {
      const [mx, my] = d3.pointer(e);

      svg.selectAll('circle').attr('transform', (d) => {
        const dx = mx - width / 2;
        const dy = my - height / 2;
        const theta = Math.atan2(dy, dx);
        return `translate(${d.x}, ${d.y}) rotate(${theta * (180 / Math.PI)})`;
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
      <svg ref={svgRef} className='absolute inset-0 w-full h-full'>
        <g>
          {bubbles.map((item) => (
            <circle key={item.id} r={item.r} fill='gray' />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default BubbleContainer;
