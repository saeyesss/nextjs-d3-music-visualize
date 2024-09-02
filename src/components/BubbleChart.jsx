'use client';

import * as d3 from 'd3';
import { useState, useRef, useEffect } from 'react';

const BubbleChart = ({ data }) => {
  const svgRef = useRef(null);
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
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const bubbleData = data.map((item, index) => ({
      ...item,
      id: index,
      r: Math.sqrt(item.playcount) * 1.5,
      img: item.image.find((img) => img.size === 'large')?.['#text'],
      x: width / 2,
      y: height / 2,
    }));

    const simulation = d3
      .forceSimulation(bubbleData)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'charge',
        d3.forceManyBody().strength((d) => -d.r * 0.5)
      )
      .force(
        'collision',
        d3.forceCollide().radius((d) => d.r + 2)
      )
      .on('tick', () => {
        nodes.attr('transform', (d) => `translate(${d.x},${d.y})`);
      });
    const nodes = svg
      .selectAll('g')
      .data(bubbleData)
      .enter()
      .append('g')
      .attr('class', 'node')
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
      .on('click', handleBubbleClick);

    nodes
      .append('circle') // for collision detection
      .attr('r', (d) => d.r)
      .attr('fill', '#fff')
      .attr('opacity', 0);
    nodes
      .append('clipPath') // circular mask
      .attr('id', (d) => `clip-${d.id}`)
      .append('circle')
      .attr('r', (d) => d.r);

    nodes // images
      .append('image')
      .attr('xlink:href', (d) => d.img)
      .attr('width', (d) => d.r * 2)
      .attr('height', (d) => d.r * 2)
      .attr('x', (d) => -d.r)
      .attr('y', (d) => -d.r)
      .attr('clip-path', (d) => `url(#clip-${d.id})`)
      .attr('cursor', 'pointer');

    function handleMouseOver(e, d) {
        
        const [mx, my] = d3.pointer(event);
        
      // make hovered image big
      d3.select(this)
        .select('image')
        .transition()
        .duration(300)
        .attr('width', d.r * 4)
        .attr('height', d.r * 4)
        .attr('x', -d.r * 2)
        .attr('y', -d.r * 2);
      // make hovered mask big
      d3.select(this)
        .select('clipPath')
        .select('circle')
        .transition()
        .duration(300)
        .attr('r', d.r * 2);

      // make other images small
      nodes
        .filter((node) => node.id !== d.id)
        .select('image')
        .transition()
        .duration(300)
        .attr('width', (node) => node.r)
        .attr('height', (node) => node.r)
        .attr('x', (node) => -node.r / 2)
        .attr('y', (node) => -node.r / 2);
      // make other mask small

      nodes
        .filter((node) => node.id !== d.id)
        .select('clipPath')
        .select('circle')
        .transition()
        .duration(300)
        .attr('r', (node) => node.r / 2);

      // Adjust collision radius
      simulation
        .force(
          'collision',
          d3.forceCollide().radius((node) => {
            if (node.id === d.id) return d.r * 2 + 2;
            return node.r / 2 + 2;
          })
        )
        .alpha(0.7)
        .restart();
    }

    function handleMouseOut(e, d) {
      // Reset all bubbles to original size
      nodes
        .select('image')
        .transition()
        .duration(300)
        .attr('width', (node) => node.r * 2)
        .attr('height', (node) => node.r * 2)
        .attr('x', (node) => -node.r)
        .attr('y', (node) => -node.r);

      nodes
        .select('clipPath')
        .select('circle')
        .transition()
        .duration(300)
        .attr('r', (node) => node.r);

      // Reset collision radius
      simulation
        .force(
          'collision',
          d3.forceCollide().radius((node) => node.r + 2)
        )
        .alpha(0.5)
        .restart();
    }

    // Click handler
    function handleBubbleClick(event, d) {
      // Implement click behavior (e.g., open modal with more info)
      alert(`Clicked on ${d.name} by ${d.artist.name}`);
    }

    return () => {
      simulation.stop();
      svg.selectAll('*').remove();
    };
  }, [data, windowDimensions]);

  return (
    <div className='flex'>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BubbleChart;
