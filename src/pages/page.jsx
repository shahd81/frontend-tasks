import { motion as Motion} from "framer-motion";

const pageVariants = {
  initial: { scale: 0.8, opacity: 0 },
  in: { scale: 1, opacity: 1 },
  out: { scale: 0.8, opacity: 0 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

export default function Page({ children }) {
  return (
    <Motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </Motion.div>
  );
}