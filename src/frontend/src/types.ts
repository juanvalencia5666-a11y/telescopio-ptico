export interface NarrationSection {
  id: string;
  title: string;
  text: string;
}

export type NarrationSpeed = 0.75 | 1 | 1.5 | 2;

export interface NarrationState {
  isPlaying: boolean;
  currentSectionId: string | null;
  speed: NarrationSpeed;
  currentSectionTitle: string | null;
}
