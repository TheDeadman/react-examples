import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectFilter, setFilterAttribute, setFilterComplexity, setFilterText } from "../optimizedSlice";

const HeroListFilter = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectFilter);

    const handleFilterClick = (attr: string) => {
        dispatch(setFilterAttribute(attr));
    }

    const handleComplexityFilterClick = (complexity: number) => {
        dispatch(setFilterComplexity(complexity));
    }

    const handleFilterTextChange = (text: string) => {
        dispatch(setFilterText(text));
    }

    return (
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
    )
}

export default HeroListFilter;