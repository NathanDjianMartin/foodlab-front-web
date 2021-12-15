export class Recipe {
  public id: number;
  public title: string;
  public duration: number;
  public nbOfGuest: number;

  public constructor(id: number, title: string, duration: number, nbOfGuest: number) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.nbOfGuest = nbOfGuest;
  }
}
