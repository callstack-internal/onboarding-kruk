import {enumKeys, enumValues} from './enumUtilities';

enum TestEnum {
  firstKey = 'value 1',
  secondKey = 'value 2',
}
enum TestNumberEnum {
  firstKey = 1,
  secondKey = 3,
}
describe('Enum utilities', () => {
  describe('enumKeys', () => {
    it('should return only keys in enum', () => {
      expect(enumKeys(TestEnum)).toStrictEqual(['firstKey', 'secondKey']);
    });
    it('should return only keys in enum with numeric values', () => {
      expect(enumKeys(TestNumberEnum)).toStrictEqual(['firstKey', 'secondKey']);
    });
  });

  describe('enumValues', () => {
    it('should return only values in enum', () => {
      expect(enumValues(TestEnum)).toStrictEqual(['value 1', 'value 2']);
    });
    it('should return only numeric values in enum', () => {
      expect(enumValues(TestNumberEnum)).toStrictEqual([1, 3]);
    });
  });
});
