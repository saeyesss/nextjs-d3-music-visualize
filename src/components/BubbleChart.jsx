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
    function handleWindowResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .call(
        d3
          .zoom()
          .scaleExtent([0.5, 5])
          .on('zoom', (e) => {
            svg.attr('transform', e.transform);
          })
      );
    const bubbleData = data.map((item, index) => ({
      ...item,
      id: index,
      r: Math.sqrt(item.playcount) * 2,
      img: item.image.find((img) => img.size === 'large')?.['#text'],
      x: width / 2,
      y: height / 2,
    }));

    const simulation = d3
      .forceSimulation(bubbleData)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'charge',
        d3.forceManyBody().strength((d) => 2 * Math.log10(d.r))
      )
      .force(
        'collision',
        d3.forceCollide().radius((d) => d.r + 1)
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

    function handleMouseOver(event, d) {
      const [mx, my] = d3.pointer(event);

      nodes
        .selectAll('image')
        .transition()
        .duration(300)
        .attr('width', (node) => {
          const distance = Math.sqrt((node.x - mx) ** 2 + (node.y - my) ** 2);
          const scale = 1 - Math.min(distance / width, 0.5);
          return node.id === d.id ? node.r * 4 : node.r * 2 * scale;
        })
        .attr('height', (node) => {
          const distance = Math.sqrt((node.x - mx) ** 2 + (node.y - my) ** 2);
          const scale = 1 - Math.min(distance / width, 0.5);
          return node.id === d.id ? node.r * 4 : node.r * 2 * scale;
        })
        .attr('x', (node) => {
          const distance = Math.sqrt((node.x - mx) ** 2 + (node.y - my) ** 2);
          const scale = 1 - Math.min(distance / width, 0.5);
          return node.id === d.id ? -node.r * 2 : -node.r * scale;
        })
        .attr('y', (node) => {
          const distance = Math.sqrt((node.x - mx) ** 2 + (node.y - my) ** 2);
          const scale = 1 - Math.min(distance / width, 0.5);
          return node.id === d.id ? -node.r * 2 : -node.r * scale;
        });

      nodes
        .select('clipPath')
        .select('circle')
        .transition()
        .duration(300)
        .attr('r', (node) => {
          const distance = Math.sqrt((node.x - mx) ** 2 + (node.y - my) ** 2);
          const scale = 1 - Math.min(distance / width, 0.5);
          return node.id === d.id ? d.r * 2 : node.r * scale;
        });

      simulation
        .force(
          'collision',
          d3.forceCollide().radius((node) => {
            if (node.id === d.id) return d.r * 2 + 2;
            const distance = Math.sqrt((node.x - mx) ** 2 + (node.y - my) ** 2);
            const scale = 1 - Math.min(distance / width, 0.5);
            return node.r * scale + 2;
          })
        )
        .alpha(0.7)
        .restart();
    }

    function handleMouseOut(event, d) {
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

      // nodes
      //   .filter((node) => node.id === d.id)
      //   .transition()
      //   .duration(300)
      //   .ease(d3.easeBounceOut)
      //   .attr('transform', 'rotate(0)');

      simulation
        .force(
          'collision',
          d3.forceCollide().radius((node) => node.r + 2)
        )
        .alpha(0.5)
        .restart();
    }
    function handleBubbleClick(event, d) {
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
