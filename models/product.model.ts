export class Product {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  constructor(Id: number, Name: string, Description: string, Price: number) {
    this.Id = Id;
    this.Name = Name;
    this.Description = Description;
    this.Price = Price;
  }
}
