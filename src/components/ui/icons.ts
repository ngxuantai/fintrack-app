// The only place lucide-react-native is imported. Each icon comes from its own module
// (`lucide-react-native/icons/<name>`) so the bundle only contains the icons listed here.
// Browse names at https://lucide.dev/icons; add an import + a map entry to use a new one.
import type { LucideIcon } from 'lucide-react-native';
import Activity from 'lucide-react-native/icons/activity';
import ArrowDownLeft from 'lucide-react-native/icons/arrow-down-left';
import ArrowUpRight from 'lucide-react-native/icons/arrow-up-right';
import Bell from 'lucide-react-native/icons/bell';
import Book from 'lucide-react-native/icons/book';
import Briefcase from 'lucide-react-native/icons/briefcase';
import Calendar from 'lucide-react-native/icons/calendar';
import Camera from 'lucide-react-native/icons/camera';
import Car from 'lucide-react-native/icons/car';
import ChartPie from 'lucide-react-native/icons/chart-pie';
import Check from 'lucide-react-native/icons/check';
import ChevronDown from 'lucide-react-native/icons/chevron-down';
import ChevronRight from 'lucide-react-native/icons/chevron-right';
import ChevronUp from 'lucide-react-native/icons/chevron-up';
import CircleAlert from 'lucide-react-native/icons/circle-alert';
import Ellipsis from 'lucide-react-native/icons/ellipsis';
import Eye from 'lucide-react-native/icons/eye';
import EyeOff from 'lucide-react-native/icons/eye-off';
import Gamepad2 from 'lucide-react-native/icons/gamepad-2';
import Gift from 'lucide-react-native/icons/gift';
import Heart from 'lucide-react-native/icons/heart';
import House from 'lucide-react-native/icons/house';
import Laptop from 'lucide-react-native/icons/laptop';
import List from 'lucide-react-native/icons/list';
import ListFilter from 'lucide-react-native/icons/list-filter';
import PencilLine from 'lucide-react-native/icons/pencil-line';
import Plus from 'lucide-react-native/icons/plus';
import Receipt from 'lucide-react-native/icons/receipt';
import RotateCcw from 'lucide-react-native/icons/rotate-ccw';
import Search from 'lucide-react-native/icons/search';
import ShoppingBag from 'lucide-react-native/icons/shopping-bag';
import Tag from 'lucide-react-native/icons/tag';
import Trash from 'lucide-react-native/icons/trash';
import TrendingUp from 'lucide-react-native/icons/trending-up';
import User from 'lucide-react-native/icons/user';
import Utensils from 'lucide-react-native/icons/utensils';
import Wallet from 'lucide-react-native/icons/wallet';
import X from 'lucide-react-native/icons/x';

export type { LucideIcon };

/** UI icons, used through `<Icon name="…" />`. */
export const icons = {
  home: House,
  list: List,
  pie: ChartPie,
  user: User,
  bell: Bell,
  eye: Eye,
  eyeOff: EyeOff,
  arrowDownLeft: ArrowDownLeft,
  arrowUpRight: ArrowUpRight,
  search: Search,
  filter: ListFilter,
  calendar: Calendar,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronRight: ChevronRight,
  plus: Plus,
  close: X,
  edit: PencilLine,
  trash: Trash,
  wallet: Wallet,
  camera: Camera,
  check: Check,
  alertCircle: CircleAlert,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

/**
 * Icons a category can use. Firestore stores the key, so never rename a key —
 * swap the icon it points to instead.
 */
export const categoryIcons = {
  food: Utensils,
  move: Car,
  shop: ShoppingBag,
  bill: Receipt,
  fun: Gamepad2,
  health: Activity,
  edu: Book,
  dots: Ellipsis,
  salary: Briefcase,
  bonus: Gift,
  invest: TrendingUp,
  sell: Tag,
  gift: Heart,
  side: Laptop,
  refund: RotateCcw,
} satisfies Record<string, LucideIcon>;

export type CategoryIconKey = keyof typeof categoryIcons;
