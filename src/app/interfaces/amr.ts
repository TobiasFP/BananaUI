import { AmrMap } from './map';

export enum errorLevel {
  WARNING = 'WARNING',
  FATAL = 'FATAL',
}
export interface stateError {
  errorType: string;
  errorLevel: errorLevel;
  errorReferences: string;
  errorDescription: string;
  errorHint: string;
}

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
  errors: stateError;
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

export enum operatingMode {
  AUTOMATIC = 'AUTOMATIC',
  SEMIAUTOMATIC = 'SEMIAUTOMATIC',
  MANUAL = 'MANUAL',
  SERVICE = 'SERVICE',
  TEACHIN = 'TEACHIN',
}

// Returns red if no connection or in estop
// Returns yellow if other problems, or if we have not heard from the robot
// in 1 minute or more
export function getAmrState(amr: State): string {
  // Look for the timestamps
  // YYYY-MM-DDTHH:mm:ss.ffZ
  // from topic "connection": https://github.com/VDA5050/VDA5050/blob/main/VDA5050_EN.md
  const lastMessageReceivedTimestamp = Date.parse(amr.timestamp);
  const now = Date.now();
  if (lastMessageReceivedTimestamp + 60000 < now) {
    return 'danger';
  } else if (lastMessageReceivedTimestamp + 30000 < now) {
    return 'warning';
  }

  if (
    amr.safetyState.eStop !== '' ||
    amr.errors?.errorLevel === errorLevel.FATAL
  ) {
    // Look at the logs and data
    return 'danger';
  }

  if (
    amr.operatingMode === operatingMode.MANUAL ||
    amr.operatingMode === operatingMode.SEMIAUTOMATIC ||
    amr.operatingMode === operatingMode.SERVICE ||
    amr.operatingMode === operatingMode.TEACHIN ||
    amr.errors?.errorLevel === errorLevel.WARNING
  ) {
    return 'warning';
  }
  return '';
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
