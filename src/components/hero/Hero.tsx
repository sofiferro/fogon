import { HeroText } from "./HeroText";
import { SearchBar } from "./SearchBar";
import { FilterRow } from "./FilterRow";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-8 pt-[129px] pb-16 px-6">
      <HeroText />
      <SearchBar />
      <FilterRow />
    </section>
  );
}
