import { AmrMap } from "./map";

export interface State {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  headerId: number;
  timestamp: string;
  version: string;
  manufacturer: string;
  serialNumber: string;
  orderId: string;
  orderUpdateId: number;
  lastNodeId: string;
  lastNodeSequenceId: number;
  nodeStates: any;
  edgeStates: any;
  driving: boolean;
  actionStates: any;
  batteryState: BatteryState;
  operatingMode: string;
  errors: any;
  safetyState: SafetyState;
  maps: AmrMap;
  zoneSetId: string;
  paused: boolean;
  newBaseRequest: boolean;
  distanceSinceLastNode: number;
  agvPosition: AgvPosition;
  velocity: Velocity;
  loads: any;
  information: any;
}

export interface BatteryState {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  batteryCharge: number;
  charging: boolean;
  batteryVoltage: number;
  batteryHealth: number;
  reach: number;
}

export interface SafetyState {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  eStop: string;
  fieldViolation: boolean;
}

export interface AgvPosition {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  x: number;
  y: number;
  theta: number;
  mapId: string;
  positionInitialized: boolean;
  mapDescription: string;
  localizationScore: number;
  deviationRange: number;
}

export interface Velocity {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  vx: number;
  vy: number;
  omega: number;
}
