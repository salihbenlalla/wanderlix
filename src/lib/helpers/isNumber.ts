export default function isNumber(input: string) {
    const digitRegExp = /^\d+$/;
    return digitRegExp.test(input);
  }