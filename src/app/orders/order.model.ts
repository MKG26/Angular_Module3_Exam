export class Order {
  constructor(
    public user: string,
    public name: string,
    public date: Date,
    public price: number,
    public quantity: number,
    public status: 'Placed' | 'Processing' | 'On the way' | 'Delivered'
  ) {}
}
