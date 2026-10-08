import { icons, type IconName, type LucideIcon } from './icons';

export type { IconName };

type IconProps = {
  /** A named UI icon, or pass any icon component from `icons.ts` (e.g. a category icon) instead. */
  name?: IconName;
  icon?: LucideIcon;
  size?: number;
  color: string;
  strokeWidth?: number;
};

export function Icon({ name, icon, size = 24, color, strokeWidth = 1.8 }: IconProps) {
  const Component = icon ?? (name ? icons[name] : null);
  if (!Component) return null;
  return <Component size={size} color={color} strokeWidth={strokeWidth} />;
}
