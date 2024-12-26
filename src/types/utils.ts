export interface BooleanState {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}
