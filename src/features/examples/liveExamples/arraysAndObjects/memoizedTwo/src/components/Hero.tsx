// Include "memo" to memoize the component
import { memo, useRef } from "react";
import { HeroData } from "../MemoizedComponent";

interface HeroProps {
    hero: HeroData;
    onClick: (str: string) => void;
    useSimulatedSlowdown: boolean;
}

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
    return now;
}

// Instead of using "hero", we could reference the properties that we want to use on the hero object. 
// We don't need to in this situation but it much easier to memoize components based on properties that are not objects / functions / arrays.
const HeroImage = ({ hero, onClick, useSimulatedSlowdown }: HeroProps) => {
    let renderCount = useRef(0);
    renderCount.current++;

    if (useSimulatedSlowdown) {
        wait(15);
    }

    return (
        // Update the onclick to account for the change from the HeroListSection
        <div onClick={() => onClick(hero.localized_name)} className={`hero-link`}>
            <div className="render-count">Render Count: {renderCount.current}</div>
            <div className="hero-link-name">
                <div>
                    {hero.localized_name}
                </div>
            </div>
            <img alt={hero.localized_name} src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name.replace("npc_dota_hero_", "")}.png`} />
        </div>
    )
}

// Wrap the export in "memo". This will try to memoize the component based on the properties that are passed to it.
export default memo(HeroImage);