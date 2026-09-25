import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/ui/app-text';
import { daysInMonth, fromISODate, toISODate, WEEKDAY_SHORT_MON_FIRST } from '@/src/lib/date';
import { colors, spacing } from '@/src/theme';

type MonthCalendarProps = {
  /** Selected "YYYY-MM-DD"; the calendar shows that month. */
  value: string;
  onChange: (date: string) => void;
  today?: Date;
};

const DAY_SIZE = 36;

/** Inline month grid (Monday first). Days after today are disabled. */
export function MonthCalendar({ value, onChange, today = new Date() }: MonthCalendarProps) {
  const selected = fromISODate(value);
  const year = selected.getFullYear();
  const month = selected.getMonth();
  const todayISO = toISODate(today);
  const leading = (new Date(year, month, 1).getDay() + 6) % 7;
  const cells: (number | null)[] = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1),
  ];

  return (
    <View style={styles.container}>
      <AppText size="base" weight="semibold" align="center" style={styles.title}>
        {`Tháng ${month + 1}, ${year}`}
      </AppText>
      <View style={styles.grid}>
        {WEEKDAY_SHORT_MON_FIRST.map((wd) => (
          <View key={wd} style={styles.cell}>
            <AppText size="xs" color={colors.textSubtle}>
              {wd}
            </AppText>
          </View>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <View key={`blank-${i}`} style={styles.cell} />;
          const iso = toISODate(new Date(year, month, day));
          const isSelected = iso === value;
          const isToday = iso === todayISO;
          const disabled = iso > todayISO;
          const color = isSelected ? colors.onPrimary : disabled ? colors.textDisabled : isToday ? colors.primary : colors.text;
          return (
            <View key={iso} style={styles.cell}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected, disabled }}
                disabled={disabled}
                onPress={() => onChange(iso)}
                style={[styles.day, isSelected && styles.daySelected]}>
                <AppText size="base" weight={isSelected || isToday ? 'bold' : 'regular'} color={color}>
                  {String(day)}
                </AppText>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: spacing.xs, paddingBottom: spacing.xl },
  title: { paddingBottom: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: spacing.xs },
  cell: { width: `${100 / 7}%`, alignItems: 'center', justifyContent: 'center' },
  day: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    borderRadius: DAY_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelected: { backgroundColor: colors.primary },
});
