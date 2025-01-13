export interface Order {
  headerId: number;
  timestamp: string;
  version: string;
  manufacturer: string;
  serialNumber: string;
  orderId: string;
  orderUpdateId: number;
  nodes: Node[];
  edges: Edge[];
  zoneSetId: string;
}

export interface OrderTemplateDetails {
  name: string;
  order: Order;
  nodeIds: string[];
}

export interface NodeMeta {
  node: Node;
  icon: string;
}

export interface Node {
  nodeId: string;
  sequenceId: number;
  released: boolean;
  actions: Action[];
  nodeDescription: string;
  nodePosition: NodePosition;
}

export interface Action {
  actionId: string;
  actionType: string;
  blockingType: string;
  actionDescription: string;
  actionParameters: ActionParameter[];
}

export interface ActionParameter {
  key: string;
  value: any;
}

export interface NodePosition {
  x: number;
  y: number;
  mapId: string;
  theta: number;
  allowedDeviationXY: number;
  allowedDeviationTheta: number;
  mapDescription: string;
}

export interface Edge {
  edgeId: string;
  sequenceId: number;
  released: boolean;
  startNodeId: string;
  endNodeId: string;
  actions: Action[];
  edgeDescription: string;
  maxSpeed: number;
  maxHeight: number;
  minHeight: number;
  orientation: number;
  orientationType: string;
  direction: string;
  rotationAllowed: boolean;
  maxRotationSpeed: number;
  length: number;
  trajectory: Trajectory;
  corridor: Corridor;
}

export interface Trajectory {
  degree: number;
  knotVector: number[];
  controlPoints: ControlPoint[];
}

export interface ControlPoint {
  x: number;
  y: number;
  weight: number;
}

export interface Corridor {
  leftWidth: number;
  rightWidth: number;
  corridorRefPoint: string;
}
