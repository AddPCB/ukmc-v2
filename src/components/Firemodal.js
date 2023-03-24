import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  firebaseClient as firebase,
  GoogleAuthProvider,
  EmailAuthProvider,
  getIdToken,
} from "../firebaseClient";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

const Firemodal = ({ setCurrentUser, setError }) => {
  const uiRef = useRef();
  const [uiInstance, setUiInstance] = useState(null);

  const uiConfig = useMemo(() => {
    const sendTokenToBackend = async (idToken) => {
      try {
        const response = await fetch("/io/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to log in");
        }

        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        setError(error.message);
      }
    };

    return {
      callbacks: {
        signInSuccessWithAuthResult: async (authResult, redirectUrl) => {
          const idToken = await getIdToken(authResult.user);
          await sendTokenToBackend(idToken);
          return false;
        },
        signInFailure: (error) => {
          setError(error.message);
        },
      },
      signInFlow: 'popup',
      signInSuccessUrl: "/",
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
      ],
    };
  }, [setCurrentUser, setError]);

  useEffect(() => {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    setUiInstance(ui);
    return () => {
      ui.reset();
    };
  }, []);

  useEffect(() => {
    if (uiInstance) {
      uiInstance.start(uiRef.current, uiConfig);
    }
  }, [uiConfig, uiInstance]);

  return <div ref={uiRef} />;
};

export default Firemodal;