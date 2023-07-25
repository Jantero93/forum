import moment from 'moment';

type MomentDateTypes = Date | string | number;

export const formatDate = (date: MomentDateTypes, format: string) => {
  const momentObj = typeof date === 'number' ? moment.unix(date) : moment(date);
  return momentObj.format(format);
};

export const isBefore = (
  date: MomentDateTypes,
  dateToBeBefore: MomentDateTypes
) => {
  moment.suppressDeprecationWarnings = true;
  const moment1 = typeof date === 'number' ? moment.unix(date) : moment(date);
  const moment2 =
    typeof dateToBeBefore === 'number'
      ? moment.unix(dateToBeBefore)
      : moment(dateToBeBefore);

  return moment(moment1).isBefore(moment2);
};
