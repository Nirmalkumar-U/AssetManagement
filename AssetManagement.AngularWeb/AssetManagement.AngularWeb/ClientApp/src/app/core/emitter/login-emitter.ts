import { Subject } from "rxjs";

export class LoginEmitter  extends Subject<boolean>{
    constructor() {
        super();
      }
      emit(value: any) {
        super.next(value);
      }
}
