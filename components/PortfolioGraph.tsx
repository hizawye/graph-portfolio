
import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { portfolioData, NODE_COLORS } from '../constants';
import { PortfolioNode, PortfolioNodeObject, PortfolioLink } from '../types';
import Modal from './Modal';
import { useWindowSize } from '../hooks/useWindowSize';

const PortfolioGraph: React.FC = () => {
  const fgRef = useRef<any>(null);
  const [selectedNode, setSelectedNode] = useState<PortfolioNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<PortfolioNodeObject | null>(null);
  const { width, height } = useWindowSize();
  const mousePos = useRef({ x: 0, y: 0 });

  // Create a persistent random offset for each node for the floating text effect
  const nodeOffsets = useMemo(() => {
    const offsets = new Map<string, { x: number; y: number }>();
    portfolioData.nodes.forEach(node => {
      offsets.set(node.id, { x: Math.random() * 2 * Math.PI, y: Math.random() * 2 * Math.PI });
    });
    return offsets;
  }, []);

  useEffect(() => {
    if (fgRef.current) {
        // Increase repulsive force and link distance to spread nodes out
        fgRef.current.d3Force('charge').strength(-600);
        fgRef.current.d3Force('link').distance(120);

        // Magnetic cursor force - enhanced strength and radius
        const magneticForce = (alpha: number) => {
            for (const node of portfolioData.nodes as PortfolioNodeObject[]) {
                if (!node.x || !node.y) continue;
                const dx = node.x - mousePos.current.x;
                const dy = node.y - mousePos.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const pullRadius = 200; // Increased radius

                if (distance < pullRadius) {
                    const force = 1 - distance / pullRadius;
                    // Significantly increased force strength
                    node.vx! -= (dx / distance) * force * 0.3 * alpha;
                    node.vy! -= (dy / distance) * force * 0.3 * alpha;
                }
            }
        };
        fgRef.current.d3Force('magnetic', magneticForce);
    }
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (fgRef.current) {
        const { x, y } = fgRef.current.screen2GraphCoords(event.clientX, event.clientY);
        mousePos.current = { x, y };
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const { highlightNodes, highlightLinks } = useMemo(() => {
    const highlightNodes = new Set<string>();
    const highlightLinks = new Set<PortfolioLink>();

    if (hoveredNode) {
      highlightNodes.add(hoveredNode.id);
      portfolioData.links.forEach(link => {
        const source = link.source as unknown as (PortfolioNodeObject | string);
        const target = link.target as unknown as (PortfolioNodeObject | string);
        const sourceId = typeof source === 'object' ? source.id : source;
        const targetId = typeof target === 'object' ? target.id : target;

        if (sourceId === hoveredNode.id || targetId === hoveredNode.id) {
          highlightLinks.add(link);
          highlightNodes.add(sourceId);
          highlightNodes.add(targetId);
        }
      });
    }
    return { highlightNodes, highlightLinks };
  }, [hoveredNode]);

  const handleNodeClick = useCallback((node: PortfolioNodeObject) => {
    if (fgRef.current && node.x && node.y) {
        fgRef.current.centerAt(node.x, node.y, 800);
        fgRef.current.zoom(3, 800);
    }
    setSelectedNode(node);
  }, []);

  const handleNodeHover = (node: PortfolioNodeObject | null) => {
    setHoveredNode(node);
    if(typeof window !== 'undefined') {
      document.body.style.cursor = node ? 'pointer' : 'grab';
    }
  };
  
  const handleBackgroundClick = useCallback(() => {
      setSelectedNode(null);
      if (fgRef.current) {
          fgRef.current.zoomToFit(400, 80);
      }
  }, []);

  const nodeCanvasObject = useCallback((node: PortfolioNodeObject, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name;
    const isHovered = hoveredNode && node.id === hoveredNode.id;
    const isSelected = selectedNode && node.id === selectedNode.id;
    const isHighlighted = highlightNodes.has(node.id);

    const nodeColor = NODE_COLORS[node.type as keyof typeof NODE_COLORS] || 'grey';
    const radius = (node.val || 1) * 1.4;
    
    ctx.shadowBlur = isHovered || isSelected ? 40 : (isHighlighted ? 25 : 15);
    ctx.shadowColor = nodeColor;

    ctx.beginPath();
    ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = nodeColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(node.x!, node.y!, radius * 0.4, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(255, 255, 255, ${isHovered || isSelected ? 0.7 : 0.5})`;
    ctx.fill();

    ctx.shadowBlur = 0;

    if(isSelected) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3 / globalScale;
        ctx.stroke();
    }

    if (globalScale > 0.3) {
      const fontSize = 16 / globalScale;
      ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
      ctx.textAlign = 'center';
      
      // Floating text effect
      const time = performance.now();
      const offset = nodeOffsets.get(node.id) || { x: 0, y: 0 };
      const floatAmount = 1.5 / globalScale;
      const floatX = Math.sin(time * 0.001 + offset.x) * floatAmount;
      const floatY = Math.cos(time * 0.001 + offset.y) * floatAmount;

      // Position text above the node
      const textY = node.y! - radius - (8 / globalScale);

      // Draw white text with a shadow for readability
      ctx.shadowColor = 'rgba(0,0,0,0.7)';
      ctx.shadowBlur = 4;
      ctx.fillStyle = '#fff';
      ctx.fillText(label, node.x! + floatX, textY + floatY);
      ctx.shadowBlur = 0; // Reset for next node
    }

  }, [hoveredNode, selectedNode, highlightNodes, nodeOffsets]);

  return (
    <>
      <ForceGraph2D
        ref={fgRef}
        graphData={portfolioData}
        width={width}
        height={height}
        nodeLabel=""
        nodeVal="val"
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.2}
        backgroundColor="rgba(0,0,0,0)"
        linkColor={(link) => highlightLinks.has(link) ? '#64ffda' : 'rgba(136, 146, 176, 0.3)'}
        linkWidth={(link) => (highlightLinks.has(link) ? 2.5 : 1)}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={3}
        linkDirectionalParticleColor={() => '#64ffda'}
        linkDirectionalParticleSpeed={() => Math.random() * 0.004 + 0.005}
        nodeCanvasObject={nodeCanvasObject}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onBackgroundClick={handleBackgroundClick}
        cooldownTicks={200}
        onEngineStop={() => fgRef.current && fgRef.current.zoomToFit(400, 80)}
      />
      <Modal node={selectedNode} onClose={() => setSelectedNode(null)} />
    </>
  );
};

export default PortfolioGraph;