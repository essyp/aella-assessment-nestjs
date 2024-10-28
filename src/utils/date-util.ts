export class DateUtil {
  static convertDateToMysqlDate(date: Date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }
  static subtractYearFromCurrentYear(numberOfYear: number): Date {
    const d = new Date();
    d.setFullYear(d.getFullYear() - numberOfYear);
    return d;
  }

  static addYearToCurrentYear(numberOfYear: number) {
    const d = new Date();
    d.setFullYear(d.getFullYear() + numberOfYear);
    return d;
  }

  static addDaysToToday(numberOfDays: number) {
    const d = new Date();
    d.setFullYear(d.getDay() + numberOfDays);
    return d;
  }
  static subtractDaysToToday(numberOfDays: number) {
    const d = new Date();
    d.setFullYear(d.getDay() - numberOfDays);
    return d;
  }
}
