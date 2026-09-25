import { useState } from 'react';
import { Pressable } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { Icon } from '@/src/components/ui/icon';
import { formatDayMonthYear, formatRelativeDay, fromISODate, WEEKDAY_NAMES } from '@/src/lib/date';
import { colors } from '@/src/theme';

import { FormRow } from './form-row';
import { MonthCalendar } from './month-calendar';

function dateLabel(iso: string) {
  const date = fromISODate(iso);
  const relative = formatRelativeDay(iso);
  const prefix = relative.includes('/') ? WEEKDAY_NAMES[date.getDay()] : relative;
  return `${prefix}, ${formatDayMonthYear(date)}`;
}

type DateFieldProps = { value: string; onChange: (date: string) => void };

export function DateField({ value, onChange }: DateFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((o) => !o)}>
        <FormRow
          icon="calendar"
          label="Ngày"
          trailing={<Icon name={open ? 'chevronUp' : 'chevronRight'} size={18} color={colors.textSubtle} strokeWidth={2} />}>
          <AppText size="lg" weight="medium">
            {dateLabel(value)}
          </AppText>
        </FormRow>
      </Pressable>
      {open ? (
        <MonthCalendar
          value={value}
          onChange={(date) => {
            onChange(date);
            setOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
