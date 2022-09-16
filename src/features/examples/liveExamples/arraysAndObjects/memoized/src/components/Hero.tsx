import { useRef } from "react";
import { HeroData } from "../MemoizedComponent";

interface HeroProps {
    hero: HeroData;
    onClick: () => void;
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

const HeroImage = ({ hero, onClick, useSimulatedSlowdown }: HeroProps) => {
    let renderCount = useRef(0);
    renderCount.current++;

    if (useSimulatedSlowdown) {
        wait(15);
    }

    return (
        <div onClick={onClick} className={`hero-link`}>
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

export default HeroImage;