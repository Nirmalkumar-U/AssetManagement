import { Subject } from "rxjs";

export class LoaderEmitter extends Subject<boolean>{
    constructor() {
        super();
      }
      emit(value: any) {
        super.next(value);
      }
}
