import { Observable } from 'rxjs';

/**
 * @param type of BaseService.name
 * @return Observable<T>
 * @example
 *  BaseService.getClasses().pipe(
 ofType(AuthService.name)
 ).subscribe(res => {
      console.log(res);
    });
 */
export const ofType = (type: string) => {
  return <T>(source: Observable<T>) => {
    return new Observable<T>(observer => {
      return source.subscribe({
        next(x) {
          if (x.constructor.name === type) {
            observer.next(x);
          }
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        },
      });
    });
  };
};
