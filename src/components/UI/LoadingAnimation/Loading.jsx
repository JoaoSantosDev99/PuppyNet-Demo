import styles from "./styles.module.css";

const Loading = () => {
  return (
    <div className="bg-[#000000e4] w-full h-screen flex justify-center items-center fixed top-0 bottom-0 right-0 left-0 z-[52]">
      <div className="flex flex-col items-center">
        <div className={styles.loading}></div>
        <h2 className="text-2xl text-[#ffcc40] mt-10">
          Computing Transaction . . .
        </h2>
      </div>
    </div>
  );
};

export default Loading;
