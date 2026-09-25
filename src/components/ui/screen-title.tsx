import { AppText } from './app-text';

export function ScreenTitle({ children }: { children: string }) {
  return (
    <AppText size="6xl" weight="bold" style={{ letterSpacing: -0.4 }} accessibilityRole="header">
      {children}
    </AppText>
  );
}
