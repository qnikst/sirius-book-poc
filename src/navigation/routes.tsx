import type { ComponentType, JSX } from "react";

import { DebugPage } from "@/pages/DebugPage.tsx";
import { FindBookPage } from "@/pages/FindBookPage.tsx";
import { MyBooksPage } from "@/pages/MyBooksPage.tsx";
import { TakeBookPage } from "@/pages/TakeBookPage.tsx";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: "/", Component: FindBookPage, title: "Find book" },
  { path: "/my", Component: MyBooksPage, title: "My books" },
  { path: "/debug", Component: DebugPage, title: "Init Data" },
  { path: "/take", Component: TakeBookPage, title: "QR page" },
];
