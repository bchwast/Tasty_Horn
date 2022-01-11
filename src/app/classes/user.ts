export class User {
  public constructor(
    public key: string,
    public nick: string,
    public email: string,
    public type: number,
    public history: Array<{id: number, name: string, quantity: number, rated: boolean, rating: number}>,
    public banned: boolean
  ) {
  }
}

// 0 - mortal
// 1 - manager
// 2 - god
