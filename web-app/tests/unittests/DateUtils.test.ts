import { describe, test, expect } from 'vitest';

import { isBefore, formatDate } from '~/util/dateHelpers';

const getJSDateCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, 0, 1);
};

describe('Date utilities tests', () => {
  describe('isBefore function test', () => {
    test('is Before JS date objs, should be true', () => {
      const currentYear = getJSDateCurrentYear();
      const plusOneYear = new Date(currentYear.getFullYear() + 1, 0, 1);

      expect(isBefore(currentYear, plusOneYear)).toBeTruthy();
    });

    test('is Before JS date objs, should be false', () => {
      const currentYear = getJSDateCurrentYear();
      const plusOneYear = new Date(currentYear.getFullYear() + 1, 0, 1);

      expect(isBefore(plusOneYear, currentYear)).toBeFalsy();
    });

    test('is Before epoch unix timestamp, should be true', () => {
      const before = 1627160400; // 2021-07-25
      const after = 1627246800; // 2021-07-26

      expect(isBefore(before, after)).toBeTruthy();
    });

    test('is Before epoch unix timestamp, should be false', () => {
      const before = 1627160400; // 2021-07-25
      const after = 1627246800; // 2021-07-26

      expect(isBefore(after, before)).toBeFalsy();
    });
  });

  describe('formatDate function tests', () => {
    test('Format date JS date objs', () => {
      const currentYear = getJSDateCurrentYear();

      const dateString = formatDate(currentYear, 'YYYY-MM-DD');

      expect(dateString).toEqual(
        `${currentYear.getFullYear().toString()}-01-01`
      );
    });

    test('Format date ISO string', () => {
      const isoString = '2022-10-31T10:00:00.000Z';
      const formatString = formatDate(isoString, 'YYYY/MM/DD');

      expect(formatString).toEqual('2022/10/31');
    });
  });
});
