"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { store, persistor } from "@/store/store"; // Import both store and persistor

interface ReduxProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      {/* Wait for Redux Persist to rehydrate the state */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

// "use client";

// import { Provider } from "react-redux";
// import { store } from "@/store/store";

// interface ReduxProviderProps {
//   children: React.ReactNode;
// }

// export default function ReduxProvider({ children }: ReduxProviderProps) {
//   return <Provider store={store}>{children}</Provider>;
// }
