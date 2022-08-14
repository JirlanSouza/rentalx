import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const utcStartDate = this.convertToUTC(startDate);
    const utcEndDate = this.convertToUTC(endDate);

    return dayjs(utcEndDate).diff(utcStartDate, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().format();
  }

  addHour(amount: number, date?: Date | string): Date {
    return dayjs(date).add(amount, "hours").toDate();
  }
}
