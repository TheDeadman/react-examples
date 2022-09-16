import { useEffect, useRef, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import HeroListFilter from "./components/HeroListFilter";
import HeroListSection from "./components/HeroListSection";
import SelectedHero from "./components/SelectedHero";
import { getHeroes } from "./services/hero-data.service";
import heroData from './hardcoded-data.json';

export type Filter = { attr: string; complexity: number; text: string };

type HeroRole = 'Carry' | 'Escape' | 'Nuker' | 'Disabler' | 'Support' | 'Initiator' | 'Durable' | 'Jungler' | 'Pusher';

export type HeroData = {
  id: string;
  name: string;
  localized_name: string;
  primary_attr: 'agi' | 'str' | 'int';
  attack_type: 'Melee' | 'Ranged';
  roles: HeroRole[];
  legs: number;
  complexity?: number;
}

const UnoptimizedComponent = () => {
  let renderCount = useRef(0);
  renderCount.current++;
  const [useSimulatedSlowdown, setUseSimulatedSlowDown] = useState(false);
  const [loadingState, setLoadingState] = useState('loading');
  const [heroes, setHeroes] = useState<HeroData[]>([]);
  const [selectedHero, setSelectedHero] = useState('');
  const [filter, setFilter] = useState<Filter>({ attr: '', complexity: 0, text: '' });

  useEffect(() => {
    // create a new async function and call it because the function direclty used in "useEffect" cannot be async. 
    // Alternatively, we could use the promise .then / .catch syntax if we didn't want to create an async function and call it.
    const getAllHeroes = async () => {
      try {
        const heroesResponse = await getHeroes();

        setHeroes(heroesResponse.data);
        setLoadingState('done');
      } catch (ex) {
        setLoadingState('error');
      }
    };
    getAllHeroes();
  }, []);

  const handleFilterClick = (attr: string) => {
    if (attr === filter.attr) {
      setFilter({ ...filter, attr: '' });
    } else {
      setFilter({ ...filter, attr: attr });
    }
  }

  const handleComplexityFilterClick = (complexity: number) => {
    if (complexity === filter.complexity) {
      setFilter({ ...filter, complexity: 0 });
    } else {
      setFilter({ ...filter, complexity: complexity });
    }
  }

  const handleFilterTextChange = (text: string) => {
    setFilter({ ...filter, text: text });
  }

  const handleHeroClick = (hero: string) => {
    setSelectedHero(hero);
  }

  // This is sub-optimal. We are remapping this array each time this component has to re-render when this mapping does not need to happen multiple times.
  const mappedHeroes = heroes.map(hero => {
    let complexity = heroData.find(hero2 => hero2.id === parseInt(hero.id))?.complexity;
    if (complexity) {
      hero.complexity = complexity;
    }
    return hero;
  });


  return (
    <div className="dota">
      <div>
        Arrays and Objects: Unoptimized
      </div>
      <FormControlLabel control={<Checkbox checked={useSimulatedSlowdown} onChange={(e) => setUseSimulatedSlowDown(e.target.checked)} />} label="Use Simulated Slowdown" />
      <div className="performance-data-container">
        Has Rendered {renderCount.current} times
      </div>
      <SelectedHero selectedHero={selectedHero} />
      {loadingState === "error" && <div className="error-page">ERROR</div>}
      {loadingState !== "loading" && <HeroListFilter filter={filter} handleComplexityFilterClick={handleComplexityFilterClick} handleFilterTextChange={handleFilterTextChange} handleFilterClick={handleFilterClick} />}
      <div className={`hero-list-section-container ${filter.attr}`}>
        <HeroListSection useSimulatedSlowdown={useSimulatedSlowdown} filter={filter} attr='str' heroes={mappedHeroes} loadingState={loadingState} handleHeroClick={handleHeroClick} />
        <HeroListSection useSimulatedSlowdown={useSimulatedSlowdown} filter={filter} attr='agi' heroes={mappedHeroes} loadingState={loadingState} handleHeroClick={handleHeroClick} />
        <HeroListSection useSimulatedSlowdown={useSimulatedSlowdown} filter={filter} attr='int' heroes={mappedHeroes} loadingState={loadingState} handleHeroClick={handleHeroClick} />
      </div>
    </div>
  );
};

export default UnoptimizedComponent;
