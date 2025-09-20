import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Role = "cong-nhan" | "sinh-vien" | "nong-dan" | "tri-thuc" | null;
export type Choice = "dau-tranh" | "im-lang" | null;

export interface GameState {
  role: Role;
  choices: Record<number, Choice>;
  spirit: number; // tinh thần đấu tranh
  fear: number;   // mức độ sợ hãi
}

interface GameContextValue extends GameState {
  setRole: (role: Exclude<Role, null>) => void;
  setChoice: (id: number, choice: Exclude<Choice, null>) => void;
  reset: () => void;
}


const STORAGE_KEY = "marx_game_state_v1";

const defaultState: GameState = { role: null, choices: {}, spirit: 0, fear: 0 };

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(defaultState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as GameState;
        setState({ role: parsed.role ?? null, choices: parsed.choices ?? {}, spirit: parsed.spirit ?? 0, fear: parsed.fear ?? 0 });
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

  const recomputeScores = (choices: Record<number, Choice>) => {
    let spirit = 0;
    let fear = 0;
    Object.values(choices).forEach((c) => {
      if (c === "dau-tranh") spirit += 1;
      if (c === "im-lang") fear += 1;
    });
    return { spirit, fear };
  };

  const setChoice = useCallback((id: number, choice: Exclude<Choice, null>) => {
    setState(prev => {
      const nextChoices = { ...prev.choices, [id]: choice };
      const { spirit, fear } = recomputeScores(nextChoices);
      return { ...prev, choices: nextChoices, spirit, fear };
    });
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
