import { inject } from '@angular/core';
import { NavigationService } from '@client/core/navigation';
import { MessagesService } from './layout/common/messages/messages.service';
import { NotificationsService } from './layout/common/notifications/notifications.service';
import { QuickChatService } from './layout/common/quick-chat/quick-chat.service';
import { ShortcutsService } from './layout/common/shortcuts/shortcuts.service';
import { forkJoin } from 'rxjs';

export const initialDataResolver = () => {
  const messagesService = inject(MessagesService);
  const navigationService = inject(NavigationService);
  const notificationsService = inject(NotificationsService);
  const quickChatService = inject(QuickChatService);
  const shortcutsService = inject(ShortcutsService);

  // Fork join multiple API endpoint calls to wait all of them to finish
  return forkJoin([
    navigationService.get(),
    messagesService.getAll(),
    notificationsService.getAll(),
    quickChatService.getChats(),
    shortcutsService.getAll(),
  ]);
};
