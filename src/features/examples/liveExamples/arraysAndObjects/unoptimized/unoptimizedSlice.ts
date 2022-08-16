import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

type HeroRole = 'Carry' | 'Escape' | 'Nuker' | 'Disabler' | 'Support' | 'Initiator' | 'Durable' | 'Jungler' | 'Pusher';

export type HeroData = {
    id: string;
    name: string;
    localized_name: string;
    primary_attr: 'agi' | 'str' | 'int';
    attack_type: 'Melee' | 'Ranged';
    roles: HeroRole[];
    legs: number;
}

type HeroListState = {
    stage: 'loading' | 'refreshing' | 'done';
    heroes: HeroData[]
}

const initialState: HeroListState = {
    stage: 'loading',
    heroes: []
};

export const dotaHeroListSlice = createSlice({
    name: "unoptimizedDotaHeroes",
    initialState,
    reducers: {
        setStage: (state, action: PayloadAction<'loading' | 'refreshing' | 'done'>) => {
            state.stage = action.payload;
        },
        setAllHeroes: (state, action: PayloadAction<HeroData[]>) => {
            state.stage = 'done';
            state.heroes = action.payload;
        },
    },
});

export const { setStage, setAllHeroes } = dotaHeroListSlice.actions;

export const selectStage = (state: RootState) => state.unoptimizedDotaHeroes.stage;
export const selectAllHeroes = (state: RootState) => state.unoptimizedDotaHeroes.heroes;

export default dotaHeroListSlice.reducer;