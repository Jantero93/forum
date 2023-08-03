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
  const moment1 = typeof date === 'number' ? moment.unix(date) : moment(date);
  const moment2 =
    typeof dateToBeBefore === 'number'
      ? moment.unix(dateToBeBefore)
      : moment(dateToBeBefore);

  return moment(moment1).isBefore(moment2);
};

export const timeDifferenceLessThanHourFromPresent = (dateToCompare: Date) => {
  const dateNow = moment();
  const diffDate = moment(dateToCompare);

  const oneHour = 1;

  return oneHour > dateNow.diff(diffDate, 'hours');
};
