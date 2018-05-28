import { Observable } from "rxjs";
import { DocumentChangeAction } from "angularfire2/firestore";
import { map } from "rxjs/operators";

export class FireStoreUtils {
    public static unwrapCollectionSnapshot(collectionSnapshot: Observable<DocumentChangeAction<any>[]>): Observable<any[]> {
        return collectionSnapshot.pipe(
            map((actions) => {
                return actions.map(action => {
                    return { id: action.payload.doc.id, ...action.payload.doc.data() };
                })
            })
        )
    }

}