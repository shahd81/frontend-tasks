import AdvancedStatistics from "./AdvancedStatistics";
import BackgroundCard from "./backgroundCard";
import SearchCard from "./searchcard"
import SearchWithList from "./searchWithList";
import WelcomeCard from "./WelcomCard";
function PricingComp() {
    return(
       <section className="relative 
        bg-white dark:bg-gray-900 items-center justify-between gap-6 md:px-10  ">
       <WelcomeCard/>
        <div className=" bg-white-700 h-3/4 ">
        <SearchWithList/>
 <AdvancedStatistics/>
 <BackgroundCard/>
 </div>
        </section>

    )
}
export default PricingComp;