class Transaction {
  //Classe que Adiciona Transação em entidade
  constructor(id, text, amount, date = null) {
    this.id = id;
    this.text = text;
    this.amount = amount;
    this.date = date;
  }
}

export default Transaction;