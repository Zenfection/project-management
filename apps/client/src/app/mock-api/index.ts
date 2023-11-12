import { AcademyMockApi } from '../mock-api/apps/academy/api';
import { ChatMockApi } from '../mock-api/apps/chat/api';
import { ContactsMockApi } from '../mock-api/apps/contacts/api';
import { ECommerceInventoryMockApi } from '../mock-api/apps/ecommerce/inventory/api';
import { FileManagerMockApi } from '../mock-api/apps/file-manager/api';
import { HelpCenterMockApi } from '../mock-api/apps/help-center/api';
import { MailboxMockApi } from '../mock-api/apps/mailbox/api';
import { NotesMockApi } from '../mock-api/apps/notes/api';
import { ScrumboardMockApi } from '../mock-api/apps/scrumboard/api';
import { TasksMockApi } from '../mock-api/apps/tasks/api';
import { AuthMockApi } from '../mock-api/common/auth/api';
import { MessagesMockApi } from '../mock-api/common/messages/api';
import { NavigationMockApi } from '../mock-api/common/navigation/api';
import { NotificationsMockApi } from '../mock-api/common/notifications/api';
import { SearchMockApi } from '../mock-api/common/search/api';
import { ShortcutsMockApi } from '../mock-api/common/shortcuts/api';
import { UserMockApi } from '../mock-api/common/user/api';
import { AnalyticsMockApi } from '../mock-api/dashboards/analytics/api';
import { CryptoMockApi } from '../mock-api/dashboards/crypto/api';
import { FinanceMockApi } from '../mock-api/dashboards/finance/api';
import { ProjectMockApi } from '../mock-api/dashboards/project/api';
import { ActivitiesMockApi } from '../mock-api/pages/activities/api';
import { IconsMockApi } from '../mock-api/ui/icons/api';

export const mockApiServices = [
    AcademyMockApi,
    ActivitiesMockApi,
    AnalyticsMockApi,
    AuthMockApi,
    ChatMockApi,
    ContactsMockApi,
    CryptoMockApi,
    ECommerceInventoryMockApi,
    FileManagerMockApi,
    FinanceMockApi,
    HelpCenterMockApi,
    IconsMockApi,
    MailboxMockApi,
    MessagesMockApi,
    NavigationMockApi,
    NotesMockApi,
    NotificationsMockApi,
    ProjectMockApi,
    SearchMockApi,
    ScrumboardMockApi,
    ShortcutsMockApi,
    TasksMockApi,
    UserMockApi,
];
