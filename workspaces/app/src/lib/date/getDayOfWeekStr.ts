const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

export const getDayOfWeekStr = (date: Date) => {
  const dayOfWeek = date.getDay(); // getDay()は0（日曜日）から6（土曜日）の範囲で返します
  const dayStr = days[dayOfWeek];
  return dayStr ?? 'sunday';
};
