import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ScrumboardService } from './scrumboard.service';
import { Board } from './scrumboard.models';
import { ScrumboardBoardsComponent } from './boards/boards.component';
import { ScrumboardBoardComponent } from './board/board.component';
import { ScrumboardCardComponent } from './card/card.component';
import { ScrumboardComponent } from './scrumboard.component';

/**
 * Board resolver
 *
 * @param route
 * @param state
 */
const boardResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Board> => {
  const scrumboardService = inject(ScrumboardService);
  const router = inject(Router);

  return scrumboardService.getBoard(route.paramMap.get('boardId')).pipe(
    // Error here means the requested board is not available
    catchError(error => {
      // Log the error
      console.error(error);

      // Get the parent url
      const parentUrl = state.url.split('/').slice(0, -1).join('/');

      // Navigate to there
      router.navigateByUrl(parentUrl);

      // Throw an error
      return throwError(() => new Error(error));
    })
  );
};

/**
 * Card resolver
 *
 * @param route
 * @param state
 */
const cardResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const scrumboardService = inject(ScrumboardService);
  const router = inject(Router);

  return scrumboardService.getCard(route.paramMap.get('cardId')).pipe(
    // Error here means the requested card is not available
    catchError(error => {
      // Log the error
      console.error(error);

      // Get the parent url
      const parentUrl = state.url.split('/').slice(0, -1).join('/');

      // Navigate to there
      router.navigateByUrl(parentUrl);

      // Throw an error
      return throwError(() => new Error(error));
    })
  );
};

const routes = [
  {
    path: '',
    component: ScrumboardBoardsComponent,
    resolve: {
      boards: () => inject(ScrumboardService).getBoards(),
    },
  },
  {
    path: ':boardId',
    component: ScrumboardBoardComponent,
    resolve: {
      board: boardResolver,
    },
    children: [
      {
        path: 'card/:cardId',
        component: ScrumboardCardComponent,
        resolve: {
          card: cardResolver,
        },
      },
    ],
  },
] as Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [ScrumboardComponent],
  exports: [ScrumboardComponent],
})
export class ScrumBoardModule {
  constructor() {}
}
