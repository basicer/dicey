import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import * as state from "./state";
import { useSetRecoilState, RecoilRoot } from "recoil";

function Root() {
  const setShowReload = useSetRecoilState(state.showReload);
  const setWaitingWorker = useSetRecoilState(state.waitingWorker);

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: (registration) => {
        setShowReload(true);
        setWaitingWorker(registration.waiting);
      }
    });
  }, [setShowReload, setWaitingWorker]);

  return (
      <App />
  );

}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot><Root /></RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
