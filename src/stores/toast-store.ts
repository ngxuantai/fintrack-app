import { createStore } from '@/src/lib/create-store';

type Toast = {
  id: number;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

const TOAST_DURATION_MS = 3000;

const store = createStore<{ toast: Toast | null }>({ toast: null });
let timer: ReturnType<typeof setTimeout> | undefined;

export function showToast(message: string, action?: { label: string; onPress: () => void }) {
  clearTimeout(timer);
  store.setState({
    toast: { id: Date.now(), message, actionLabel: action?.label, onAction: action?.onPress },
  });
  timer = setTimeout(hideToast, TOAST_DURATION_MS);
}

export function hideToast() {
  clearTimeout(timer);
  store.setState({ toast: null });
}

export const useToast = () => store.useStore((s) => s.toast);
