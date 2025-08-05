import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const RocketLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <DotLottieReact
        src="https://lottie.host/f6f216f3-724f-4e7f-b0b3-e1a257824200/9Jz0Ktrb27.lottie"
        loop
        autoplay
        style={{ width: 300, height: 150 }}
      />
    </div>
  );
};

export default RocketLoader;
