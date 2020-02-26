import React from "react";
import { BallSpinFadeLoader } from "react-pure-loaders";

export default function Loading(): JSX.Element {
  return (
    <div className="loading">
      <BallSpinFadeLoader color={"#8B008B"} loading={true} />
    </div>
  );
}
