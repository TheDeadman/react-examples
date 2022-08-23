import axios, { AxiosResponse } from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  HeroData,
  selectAllHeroes,
  selectStage,
  setAllHeroes,
} from "./unoptimizedSlice";

import heroData from './hardcoded-data.json';

const AdvancedComponent = () => {
  const dispatch = useAppDispatch();
  const heroes = useAppSelector(selectAllHeroes);
  const stage = useAppSelector(selectStage);
  const [filter, setFilter] = useState({attr: '', complexity: 0, text: ''})
  useEffect(() => {
    const getAllHeroes = async () => {
      try {
        const heroes = (await axios.get(
          "https://api.opendota.com/api/heroes"
        )) as AxiosResponse<HeroData[]>;

        const dataWithComplexityProp = heroes.data.map(hero => {
            let complexity = heroData.find(hero2 => hero2.id === parseInt(hero.id))?.complexity;
            if (complexity) {
                hero.complexity = complexity;
            }
        })
        dispatch(setAllHeroes(heroes.data));
      } catch (ex) {}
    };
    getAllHeroes();
  }, []);

  const handleFilterClick = (attr: string) => {
    if (attr === filter.attr) {
        setFilter({...filter, attr: ''});
    } else {
        setFilter({...filter, attr: attr});
    }
  }

  const handleComplexityFilterClick = (complexity: number) => {

    if (complexity === filter.complexity) {
        setFilter({...filter, complexity: 0});
    } else {
        setFilter({...filter, complexity: complexity});
    }
  }

  const handleFilterTextChange = (text: string) => {
        setFilter({...filter, text: text});
  }
  return (
    <div className="dota">
      Arrays and Objects: Unoptimized
      {stage === "error" && <div className="error-page">ERROR</div>}
      {stage !== "loading" && (
        <div className="hero-filters-container">
          <div className="hero-filters">
              <div className="herogridpage_FilterLabel">
                Filter Heroes
              </div>
              <div className="herogridpage_SpecificFilterContainer">
                <div className="herogridpage_SelectorLabel">
                  Attribute
                </div>
                <div className={`herogridpage_Filter str ${filter.attr === 'str' ? 'selected' : ''}`} onClick={() => handleFilterClick('str')}></div>
                <div className={`herogridpage_Filter agi ${filter.attr === 'agi' ? 'selected' : ''}`} onClick={() => handleFilterClick('agi')}></div>
                <div className={`herogridpage_Filter int ${filter.attr === 'int' ? 'selected' : ''}`} onClick={() => handleFilterClick('int')}></div>
              </div>
              <div className="herogridpage_SpecificFilterContainer">
                <div className="herogridpage_SelectorLabel">
                  Complexity
                </div>
                <div className={`herogridpage_Filter complexity ${filter.complexity >= 1 ? 'selected' : ''}`} onClick={() => handleComplexityFilterClick(1)}></div>
                <div className={`herogridpage_Filter complexity ${filter.complexity >= 2 ? 'selected' : ''}`} onClick={() => handleComplexityFilterClick(2)}></div>
                <div className={`herogridpage_Filter complexity ${filter.complexity >= 3 ? 'selected' : ''}`} onClick={() => handleComplexityFilterClick(3)}></div>
              </div>
              <div className="herogridpage_SearchBarContainer">
                <div className="herogridpage_SearchBar">
                  <div className="herogridpage_MagnifyingGlass"></div>
                  <form>
                    <input type="text" value={filter.text} onChange={(e) => handleFilterTextChange(e.target.value)} />
                  </form>
                </div>
              </div>
          </div>
        </div>
      )}
      <div className={`hero-list-section-container ${filter.attr}`}>
        <div className="hero-list-section str">
          <h3>Strength</h3>
          <div className="hero-list">
            {stage === "loading" && (
              <div className="loading-icon">
                <RotateRightIcon />
              </div>
            )}
            {stage !== "loading" &&
              heroes
                .filter((hero) => hero.primary_attr === "str")
                .filter((hero) => filter.complexity === 0 || hero.complexity === filter.complexity)
                .filter((hero) => hero.name.indexOf(filter.text) !== -1)
                .map((hero) => (
                  <div className={`hero-link`}>
                    <Link to={`${hero.name.replace("npc_dota_hero_", "")}`}>
                      <img
                        src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name.replace(
                          "npc_dota_hero_",
                          ""
                        )}.png`}
                      />
                    </Link>
                  </div>
                ))}
          </div>
        </div>
        <div className="hero-list-section agi">
          <h3>Agility</h3>
          <div className="hero-list">
            {stage === "loading" && (
              <div className="loading-icon">
                <RotateRightIcon />
              </div>
            )}
            {stage !== "loading" &&
              heroes
                .filter((hero) => hero.primary_attr === "agi")
                .filter((hero) => filter.complexity === 0 || hero.complexity === filter.complexity)
                .filter((hero) => hero.name.indexOf(filter.text) !== -1)
                .map((hero) => (
                  <div className="hero-link">
                    <Link to={`${hero.name.replace("npc_dota_hero_", "")}`}>
                      <img
                        src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name.replace(
                          "npc_dota_hero_",
                          ""
                        )}.png`}
                      />
                    </Link>
                  </div>
                ))}
          </div>
        </div>
        <div className="hero-list-section int">
          <h3>Intellect</h3>
          <div className="hero-list">
            {stage === "loading" && (
              <div className="loading-icon">
                <RotateRightIcon />
              </div>
            )}
            {stage !== "loading" &&
              heroes
                .filter((hero) => hero.primary_attr === "int")
                .filter((hero) => filter.complexity === 0 || hero.complexity === filter.complexity)
                .filter((hero) => hero.name.indexOf(filter.text) !== -1)
                .map((hero) => (
                  <div className="hero-link">
                    <Link to={`${hero.name.replace("npc_dota_hero_", "")}`}>
                      <img
                        src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name.replace(
                          "npc_dota_hero_",
                          ""
                        )}.png`}
                      />
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedComponent;
