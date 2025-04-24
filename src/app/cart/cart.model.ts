export class Cart {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public rating: number,
    public quantity: number,
    public price: number,
    public imageUrl: string
  ) {}
}
