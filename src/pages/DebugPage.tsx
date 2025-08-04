import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { Cell, Section, List } from "@telegram-apps/telegram-ui";
import { type FC } from "react";
import {
  initDataRaw as _initDataRaw,
  useSignal,
} from "@telegram-apps/sdk-react";
import { Page } from "@/components/Page.tsx";

export const DebugPage: FC = () => {
  const initDataRaw = useSignal(_initDataRaw);
  const lp = retrieveLaunchParams();

  return (
    <Page>
      <List>
        <Section header="Launch Params">
          <Cell subhead="tgWebAppPlatform">{lp.tgWebAppPlatform}</Cell>
          <Cell subhead="tgWebAppShowSettings">{lp.tgWebAppShowSettings}</Cell>
          <Cell subhead="tgWebAppVersion">{lp.tgWebAppVersion}</Cell>
          <Cell subhead="tgWebAppBotInline">{lp.tgWebAppBotInline}</Cell>
          <Cell subhead="tgWebAppStartParam">{lp.tgWebAppStartParam}</Cell>
        </Section>
        <Section header="Init Data">
          <Cell subhead="tgWebAppPlatform">{initDataRaw}</Cell>
          <Cell subhead="tgWebAppShowSettings">{lp.tgWebAppShowSettings}</Cell>
          <Cell subhead="tgWebAppVersion">{lp.tgWebAppVersion}</Cell>
          <Cell subhead="tgWebAppBotInline">{lp.tgWebAppBotInline}</Cell>
          <Cell subhead="tgWebAppStartParam">{lp.tgWebAppStartParam}</Cell>
        </Section>
      </List>
    </Page>
  );
};
