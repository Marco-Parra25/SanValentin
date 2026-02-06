export enum AppStage {
  INITIAL = 'INITIAL',
  OPENING = 'OPENING',
  READING = 'READING',
  ASKING = 'ASKING',
  ACCEPTED = 'ACCEPTED'
}

export interface FloatingHeart {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
}