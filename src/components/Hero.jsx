import AdvancedStatistics from "./AdvancedStatistics";
import BackgroundCard from "./backgroundCard";
import SearchCard from "./searchcard"
import WelcomeCard from "./WelcomCard";
function Hero() {
    return(
       <section className="relative flex flex-col bg-white items-center justify-between gap-6 md:px-15  dark:bg-gray-900">
       <WelcomeCard/>
        <div className=" bg-white-700 h-3/4 ">
        <SearchCard/>
     <AdvancedStatistics/>
     <BackgroundCard/>
 </div>
        </section>

    )
}
export default Hero;