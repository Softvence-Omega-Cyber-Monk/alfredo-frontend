import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Toaster } from "sonner";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";
const savedLanguage = localStorage.getItem("i18nextLng");
if (savedLanguage) {
  i18n.changeLanguage(savedLanguage);
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={routes} />
          <Toaster
            toastOptions={{
              style: {
                background: "#153661f1",
                border: "#2C68B8",
                color: "white",
              },
            }}
            position="top-right"
          />
        </Suspense>
      </I18nextProvider>
    </Provider>
  </StrictMode>
);
