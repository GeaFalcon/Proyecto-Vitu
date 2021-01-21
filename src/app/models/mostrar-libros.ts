export class MostrarLibros {
  constructor(
    public book_id: Number,
    public author: String,
    public year: Number,
    public editorial: String,
    public type: String,
    public description: String,
    public photo: String,
    public available: String
  ) {}
}
