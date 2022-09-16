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

  // This will create a new function each time this component renders. Child components will see this as an updated value and cannot be memoized.
  const handleHeroClick = useCallback((hero: string) => {
    setSelectedHero(hero);
  }, [setSelectedHero]);

  // Utilize useMemo in order to only run this loop when the "heroes" array changes.
  const memoizedHeroes = useMemo(() => heroes.map(hero => {
    let complexity = heroData.find(hero2 => hero2.id === parseInt(hero.id))?.complexity;
    if (complexity) {
      hero.complexity = complexity;
    }
    return hero;
  }), [heroes]);

  // Just filter the strength heroes normally. Results in a new array each time this component renders.
  const strengthHeroes = useMemo(() => memoizedHeroes
    .filter((hero) => hero.primary_attr === 'str')
    .filter((hero) => filter.complexity === 0 || hero.complexity === filter.complexity)
    .filter((hero) => hero.localized_name.indexOf(filter.text) !== -1), [memoizedHeroes, filter]);

  // Memoize the filtered agi heroes so that this only runs when the memoizedHeroes or filter is updated.
  const agilityHeroes = useMemo(() => memoizedHeroes
    .filter((hero) => hero.primary_attr === 'agi')
    .filter((hero) => filter.complexity === 0 || hero.complexity === filter.complexity)
    .filter((hero) => hero.localized_name.indexOf(filter.text) !== -1), [memoizedHeroes, filter]);

  // Memoize the filtered int heroes so that this only runs when the memoizedHeroes or filter is updated.
  const intelligenceHeroes = useMemo(() => memoizedHeroes
    .filter((hero) => hero.primary_attr === 'int')
    .filter((hero) => filter.complexity === 0 || hero.complexity === filter.complexity)
    .filter((hero) => hero.localized_name.indexOf(filter.text) !== -1), [memoizedHeroes, filter]);

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
        {/* Trying to memoized the component based on the mappedHeroes array will never work. Many array operations (.map in this case) will create a new array instance and the memoize function will always see the input data as having changed even if the array is identical to the previous array. */}
        {useMemo(() => <HeroListSection useSimulatedSlowdown={useSimulatedSlowdown} attr='str' heroes={strengthHeroes} loadingState={loadingState} handleHeroClick={handleHeroClick} />, [loadingState, strengthHeroes, handleHeroClick, useSimulatedSlowdown])}

        {/* Trying to just use the memoized array will not work because a component will always render down the react tree. In this case, we are passing the same instance of the heroesArray but the component still re-renders. */}
        {useMemo(() => <HeroListSection useSimulatedSlowdown={useSimulatedSlowdown} attr='agi' heroes={agilityHeroes} loadingState={loadingState} handleHeroClick={handleHeroClick} />, [loadingState, agilityHeroes, handleHeroClick, useSimulatedSlowdown])}

        {/*  Using the memoized array with useMemo for the component does work because the objects in the dependency array are unchanged when this component re-renders (assuming one of the objects are not intentionally being changed) */}
        {useMemo(() => <HeroListSection useSimulatedSlowdown={useSimulatedSlowdown} attr='int' heroes={intelligenceHeroes} loadingState={loadingState} handleHeroClick={handleHeroClick} />, [loadingState, intelligenceHeroes, handleHeroClick, useSimulatedSlowdown])}
      </div>
    </div>
  );
};

export default AdvancedComponent;
