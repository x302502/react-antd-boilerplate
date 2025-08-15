import { create } from 'zustand';

/**
 * Initial state of the application
 */
const initialState = {
  /**
   * Whether the global spinning animation is shown
   */
  globalSpin: false,
};

type GlobalState = typeof initialState;

interface GlobalAction {
  openGlobalSpin: () => void;
  closeGlobalSpin: () => void;
}

export const useGlobalStore = create<GlobalState & GlobalAction>(set => ({
  ...initialState,

  openGlobalSpin: () => {
    return set({
      globalSpin: true,
    });
  },

  closeGlobalSpin: () => {
    return set({
      globalSpin: false,
    });
  },
}));
