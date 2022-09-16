import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import HeroListFilter from "./components/HeroListFilter";
import HeroListSection from "./components/HeroListSection";
import SelectedHero from "./components/SelectedHero";
import SimulatedSlowdownControls from "./components/SimulatedSlowdownControls";
import { selectLoadingState, selectPrimaryAttrFilter, setAllHeroes, setLoadingState } from "./optimizedSlice";
import { getHeroes } from "./services/hero-data.service";

const AdvancedComponent = () => {
  const dispatch = useAppDispatch();
  // Select only the pieces of state that we care about at this level
  const loadingState = useAppSelector(selectLoadingState);
  const primaryFilterAttr = useAppSelector(selectPrimaryAttrFilter);
  let renderCount = useRef(0);
  renderCount.current++;

  useEffect(() => {
    const getAllHeroes = async () => {
      try {
        const heroesResponse = await getHeroes();

        // Simply tell our state management that we got data and want to "setAllHeroes".
        dispatch(setAllHeroes(heroesResponse.data));
      } catch (ex) {
        dispatch(setLoadingState('error'))
      }
    };
    getAllHeroes();
  }, []);


  return (
    <div className="dota">
      <div>
        Arrays and Objects: Unoptimized
      </div>
      <SimulatedSlowdownControls />
      <div className="performance-data-container">
        Has Rendered {renderCount.current} times
      </div>
      <SelectedHero />
      {loadingState === "error" && <div className="error-page">ERROR</div>}
      {loadingState !== "loading" && <HeroListFilter />}
      <div className={`hero-list-section-container ${primaryFilterAttr}`}>
        {/* These sections will never change so we can wrap them in useMemo. Alternatively, we could have exported them wrapped in memo in the HeroListSection file. 
        I like useMemo because it explicitly indicates to the developer that we are attempting to memoize this component and changes to the properties passed to that component could break memoization */}
        {useMemo(() => <HeroListSection attr='str' />, [])}
        {useMemo(() => <HeroListSection attr='agi' />, [])}
        {useMemo(() => <HeroListSection attr='int' />, [])}
      </div>
    </div>
  );
};

export default AdvancedComponent;
