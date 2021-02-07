export interface Planet {
  id?: number;
  name: string;
  distance: number;
}

export interface Vehicle {
  id?: number;
  name: string;
  total_no: number;
  max_distance: number;
  speed: number;
  planetDistance?: number;
}
