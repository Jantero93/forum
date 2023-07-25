import moment from 'moment';

type MomentDateTypes = Date | string | number;

export const formatDate = (date: MomentDateTypes, format: string) => {
  const momentObj = typeof date === 'number' ? moment.unix(date) : moment(date);
  return momentObj.format(format);
};

export const formatDateFromIsoString = (date: string, format: string) =>
  moment(date, moment.ISO_8601).format(format);

export const isBefore = (
  date: MomentDateTypes,
  dateToBeBefore: MomentDateTypes
) => {
  const moment1 = typeof date === 'number' ? moment.unix(date) : moment(date);
  const moment2 =
    typeof dateToBeBefore === 'number'
      ? moment.unix(dateToBeBefore)
      : moment(dateToBeBefore);

  return moment(moment1).isBefore(moment2);
};
