export class CreateNewTransactionItemPayloadDto {
  public transaction_id: string;
  public product_id: string;
  public name: string;
  public price: number;
  public quantity: number;
  public subtotal: number;
}
