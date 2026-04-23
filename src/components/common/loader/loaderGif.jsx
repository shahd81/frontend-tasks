import loaderGif from "../../../assets/loader.gif";
import styles from "./loaderGif.module.scss"
 function Loader() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-white dark:bg-black">
      <img  className={styles.img} src={loaderGif} alt="Loading..." />
    </div>
  );
}
export default Loader;