export interface IDateProvider {
  dateNow(): Date;
  compareInHours(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  addHour(amount: number, date?: Date | string): Date;
}
