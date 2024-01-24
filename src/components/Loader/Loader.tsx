import styles from "./Loader.module.css";

interface ILoaderProps {
  showText?: boolean;
}

const Loader = ({ showText = false }: ILoaderProps): JSX.Element => {
  return (
    <div className={styles.loader}>
      {showText && <p className="text-center animate-bounce">Loading...</p>}
      <img
        className="w-52 m-auto animate-pulse"
        src="/diamond.png"
        alt="Logo diamond"
      />
    </div>
  );
};

export default Loader;
