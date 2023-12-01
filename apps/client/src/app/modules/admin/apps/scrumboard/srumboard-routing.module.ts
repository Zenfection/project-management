import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { planDetailsResolver } from '../plan/resolvers/plan-details.resolver';
import { planListResolver } from '../plan/resolvers/plan-list.resolver';
import { ScrumboardBoardComponent } from './board/board.component';
import { ScrumboardBoardsComponent } from './boards/boards.component';
import { ScrumboardCardComponent } from './card/card.component';

/**
 * Board resolver
 *
 * @param route
 * @param state
 */
// const boardResolver = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot,
// ): Observable<Board> => {
//   const scrumboardService = inject(ScrumboardService);
//   const router = inject(Router);

//   return scrumboardService.getBoard(route.paramMap.get('boardId')).pipe(
//     // Error here means the requested board is not available
//     catchError((error) => {
//       // Log the error
//       console.error(error);

//       // Get the parent url
//       const parentUrl = state.url.split('/').slice(0, -1).join('/');

//       // Navigate to there
//       router.navigateByUrl(parentUrl);

//       // Throw an error
//       return throwError(() => new Error(error));
//     }),
//   );
// };

/**
 * Card resolver
 *
 * @param route
 * @param state
 */
// const cardResolver = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot,
// ) => {
//   const scrumboardService = inject(ScrumboardService);
//   const router = inject(Router);

//   return scrumboardService.getCard(route.paramMap.get('cardId')).pipe(
//     // Error here means the requested card is not available
//     catchError((error) => {
//       // Log the error
//       console.error(error);

//       // Get the parent url
//       const parentUrl = state.url.split('/').slice(0, -1).join('/');

//       // Navigate to there
//       router.navigateByUrl(parentUrl);

//       // Throw an error
//       return throwError(() => new Error(error));
//     }),
//   );
// };

const routes: Routes = [
  {
    path: '',
    component: ScrumboardBoardsComponent,
    resolve: {
      plans: planListResolver,
    },
  },
  {
    path: ':id',
    component: ScrumboardBoardComponent,
    resolve: {
      plan: planDetailsResolver,
    },
    children: [
      {
        path: 'card/:cardId',
        component: ScrumboardCardComponent,
        resolve: {},
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ScrumboardRoutingModule {}
