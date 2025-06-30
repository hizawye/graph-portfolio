
export interface PortfolioNode {
  id: string;
  name: string;
  type: 'project' | 'skill' | 'experience';
  details: string;
  val: number; 
}

export interface PortfolioLink {
  source: string;
  target: string;
}

// This represents the node object after being processed by the force-graph library
export interface PortfolioNodeObject extends PortfolioNode {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}
