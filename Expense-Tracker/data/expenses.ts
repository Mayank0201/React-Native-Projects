export class Expense {
  constructor(
    public id: string,
    public description: string,
    public amount: number,
    public date: Date
  ) {}
}
//just like a data class
