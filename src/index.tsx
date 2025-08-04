// Include Telegram UI styles first to allow our code override the package CSS.
import "@telegram-apps/telegram-ui/dist/styles.css";

import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

import { Root } from "@/components/Root.tsx";
import { BooksServiceProvider } from "@/services/BookService/Context.tsx";
import { mockBooksDataProvider } from "@/services/BookService/impl/Mock.ts";
import { apiBooksDataProvider } from "@/services/BookService/impl/Remote.ts";
import { EnvUnsupported } from "@/components/EnvUnsupported.tsx";
import { init } from "@/init.ts";
import "react-material-symbols/rounded";

import "./index.css";

// Mock the environment in case, we are outside Telegram.
import "./mockEnv.ts";

const root = ReactDOM.createRoot(document.getElementById("root")!);

try {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform: platform } = launchParams;
  const debug =
    (launchParams.tgWebAppStartParam || "").includes("platformer_debug") ||
    import.meta.env.DEV;

  // Configure all application dependencies.
  await init({
    debug,
    eruda: debug && ["ios", "android"].includes(platform),
    mockForMacOS: platform === "macos",
  }).then(() => {
    root.render(
      <StrictMode>
        <BooksServiceProvider
          provider={
            import.meta.env.DEV ? mockBooksDataProvider : apiBooksDataProvider
          }
        >
          <Root />
        </BooksServiceProvider>
      </StrictMode>,
    );
  });
} catch (e) {
  console.error("Failed to initialize the application:", e);
  // If we are unable to initialize the app, render an unsupported environment message.
  // This is useful for debugging and development purposes.
  root.render(<EnvUnsupported />);
}
