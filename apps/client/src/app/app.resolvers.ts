import { inject } from '@angular/core';
import { NavigationService } from '@client/core/navigation';
import { MessagesService } from './layout/common/messages/messages.service';
import { NotificationsService } from './layout/common/notifications/notifications.service';
import { QuickChatService } from './layout/common/quick-chat/quick-chat.service';
import { ShortcutsService } from './layout/common/shortcuts/shortcuts.service';
import { forkJoin, map } from 'rxjs';
import { UserFacade } from '@client/core-state';

export const initialDataResolver = () => {
  const messagesService = inject(MessagesService);
  const navigationService = inject(NavigationService);
  const notificationsService = inject(NotificationsService);
  const quickChatService = inject(QuickChatService);
  const shortcutsService = inject(ShortcutsService);

  const userFacade = inject(UserFacade);
  userFacade.isAdmin$.subscribe((isAdmin) => {
    if (!isAdmin) {
      // remove dashboard navigation item
      navigationService.navigation$.subscribe((navigation) => {
        removeDashboardFromNavigationMenu(navigation.compact);
        removeDashboardFromNavigationMenu(navigation.default);
        removeDashboardFromNavigationMenu(navigation.futuristic);
        removeDashboardFromNavigationMenu(navigation.horizontal);
      });
    }
  });

  // Fork join multiple API endpoint calls to wait all of them to finish
  return forkJoin([
    navigationService.get(),
    messagesService.getAll(),
    notificationsService.getAll(),
    quickChatService.getChats(),
    shortcutsService.getAll(),
  ]);
};

function removeDashboardFromNavigationMenu(navigationMenu) {
  const dashboardItem = navigationMenu.find((item) => item.id === 'dashboard');
  if (dashboardItem) {
    navigationMenu.splice(navigationMenu.indexOf(dashboardItem), 1);
  }
}
