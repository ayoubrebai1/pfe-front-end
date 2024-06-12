export class ChatMessageDto {
  id?: number;
  sender: string;
  reciver: string;
  contenue: string;
  date: number;
  constructor(
    id: number,
    sender: string,
    reciver: string,
    contenue: string,
    date: number
  ) {
    this.id = id;
    this.sender = sender;
    this.reciver = reciver;
    this.contenue = contenue;
    this.date = date;
  }
}
