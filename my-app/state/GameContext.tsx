import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Role = "cong-nhan" | "sinh-vien" | "nong-dan" | "tri-thuc" | null;
export type Choice = "dau-tranh" | "im-lang" | null;

export interface GameState {
  role: Role;
  choices: Record<number, Choice>;
}

interface GameContextValue extends GameState {
  setRole: (role: Exclude<Role, null>) => void;
  setChoice: (id: number, choice: Exclude<Choice, null>) => void;
  reset: () => void;
}

const STORAGE_KEY = "marx_game_state_v1";

const defaultState: GameState = { role: null, choices: {} };

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(defaultState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as GameState;
        setState({ role: parsed.role ?? null, choices: parsed.choices ?? {} });
      }
    } catch {}
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch {}
  }, [state]);

  const setRole = useCallback((role: Exclude<Role, null>) => {
    setState(prev => ({ ...prev, role }));
  }, []);

  const setChoice = useCallback((id: number, choice: Exclude<Choice, null>) => {
    setState(prev => ({ ...prev, choices: { ...prev.choices, [id]: choice } }));
  }, []);

  const reset = useCallback(() => setState(defaultState), []);

  const value = useMemo<GameContextValue>(() => ({ ...state, setRole, setChoice, reset }), [state, setRole, setChoice, reset]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextValue => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};
