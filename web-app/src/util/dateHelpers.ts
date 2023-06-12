import moment from 'moment';

export const formatDate = (date: Date | string, format: string) =>
  moment(date).format(format);
