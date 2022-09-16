import { useCallback, useEffect, useMemo, useState, useRef } from "react";
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
  // Added hidden property to do determine if we want to show the hero or not.
  hidden: boolean;
}

const AdvancedComponent = () => {
  let renderCount = useRef(0);
  renderCount.current++;
  const [useSimulatedSlowdown, setUseSimulatedSlowDown] = useState(false);
  const [loadingState, setLoadingState] = useState('loading');
  const [heroes, setHeroes] = useState<HeroData[]>([]);
  const [selectedHero, setSelectedHero] = useState('');
  const [filter, setFilter] = useState<Filter>({ attr: '', complexity: 0, text: '' });

  useEffect(() => {
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

  // Utilise useCallback to memoize this function so that it is not a "new value" for child components each time this renders.
  const handleHeroClick = useCallback((hero: string) => {
    setSelectedHero(hero);
  }, [setSelectedHero]);

  // Utilize useMemo in order to only run this loop when the "heroes" array changes.
  const memoizedHeroes = useMemo(() => heroes.map(hero => {
    let complexity = heroData.find(hero2 => hero2.id === parseInt(hero.id))?.complexity;
    if (complexity) {
      hero.complexity = complexity;
    }
    hero.hidden = false;
    return hero;
  }), [heroes]);

  // Create a memoized version of the hero "filtering". Instead of actually removing the heroes with ".filter", we are setting the "hidden" property for each hero.
  const filteredHeroes = useMemo(() => memoizedHeroes.map(hero => {
    if ((filter.complexity !== 0 && hero.complexity !== filter.complexity) || (hero.localized_name.indexOf(filter.text) === -1)) {
      hero.hidden = true;
    } else {
      hero.hidden = false;
    }
    return hero;
  }), [memoizedHeroes, filter])


  const strengthHeroes = useMemo(() => filteredHeroes
    .filter((hero) => hero.primary_attr === 'str'), [filteredHeroes]);

  const agilityHeroes = useMemo(() => filteredHeroes
    .filter((hero) => hero.primary_attr === 'agi'), [filteredHeroes]);

  const intelligenceHeroes = useMemo(() => filteredHeroes
    .filter((hero) => hero.primary_attr === 'int'), [filteredHeroes]);

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
        {useMemo(() => <HeroListSection useSimulatedSlowdown={useSimulatedSlowdown} attr='str' heroes={strengthHeroes} loadingState={loadingState} handleHeroClick={handleHeroClick} />, [loadingState, strengthHeroes, handleHeroClick, useSimulatedSlowdown])}

        {useMemo(() => <HeroListSection useSimulatedSlowdown={useSimulatedSlowdown} attr='agi' heroes={agilityHeroes} loadingState={loadingState} handleHeroClick={handleHeroClick} />, [loadingState, agilityHeroes, handleHeroClick, useSimulatedSlowdown])}

        {useMemo(() => <HeroListSection useSimulatedSlowdown={useSimulatedSlowdown} attr='int' heroes={intelligenceHeroes} loadingState={loadingState} handleHeroClick={handleHeroClick} />, [loadingState, intelligenceHeroes, handleHeroClick, useSimulatedSlowdown])}
      </div>
    </div>
  );
};

export default AdvancedComponent;
