import axios, { AxiosResponse } from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { HeroData, selectAllHeroes, selectStage, setAllHeroes } from "./unoptimizedSlice";


const AdvancedComponent = () => {
    const dispatch = useAppDispatch();
    const heroes = useAppSelector(selectAllHeroes);
    const stage = useAppSelector(selectStage);
    useEffect(() => {
        const getAllHeroes = async () => {
            try {
                const heroes = await axios.get('https://api.opendota.com/api/heroes') as AxiosResponse<HeroData[]>;
                dispatch(setAllHeroes(heroes.data));
            } catch (ex) {

            }
        }
        getAllHeroes();
    }, [])
    return (
        <>
            Arrays and Objects: Unoptimized
            {stage === 'error' && <div className="error-page">ERROR</div>}
            {stage !== 'loading' && <div className="hero-filters">

            </div>}
            <div className="hero-list">
                {stage === "loading" && <div className="loading-icon"><RotateRightIcon /></div>}
                {stage !== "loading" && heroes.map((hero) => <div className="hero-link">
                    <Link to={`${hero.name.replace('npc_dota_hero_', '')}`}>
                        <img src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name.replace('npc_dota_hero_', '')}.png`} />
                    </Link>
                </div>)}
            </div>
        </>
    )
}

export default AdvancedComponent;