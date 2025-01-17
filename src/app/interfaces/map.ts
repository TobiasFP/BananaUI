export interface AmrMap {
  ID: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: any;
  mapId?: string;
  mapVersion: string;
  mapStatus: string;
  mapDescription: string;
  MapData?: AmrMapData;
}

export interface AmrMapData {
  Data: Blob;
}
