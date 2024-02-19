export class CreateNewPointHistoryDto {
  public member_id: string;
  public transaction_id: string;
  public loyalty_program_id?: string;
  public earned_point: number;
  public redeemed_point: number;
  public existing_point: number;
  public balance_point: number;
}
