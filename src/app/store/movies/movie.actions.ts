export class LoadMovies {
    static readonly type = '[Movies] Load';
  }
  
  export class SetMovies {
    static readonly type = '[Movies] Set';
    constructor(public movies: any[]) {}
  }
  