'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ctu-task-management documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-7cf6ab55c620053871f90eb26c9ec12c445d39ea5836deb5241195e4fd24ba7dcb382fa6c17cec26ecc7b19d47458ef93ddd5bb2bce80f8f3d966dd01fd86c33"' : 'data-bs-target="#xs-components-links-module-AppModule-7cf6ab55c620053871f90eb26c9ec12c445d39ea5836deb5241195e4fd24ba7dcb382fa6c17cec26ecc7b19d47458ef93ddd5bb2bce80f8f3d966dd01fd86c33"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7cf6ab55c620053871f90eb26c9ec12c445d39ea5836deb5241195e4fd24ba7dcb382fa6c17cec26ecc7b19d47458ef93ddd5bb2bce80f8f3d966dd01fd86c33"' :
                                            'id="xs-components-links-module-AppModule-7cf6ab55c620053871f90eb26c9ec12c445d39ea5836deb5241195e4fd24ba7dcb382fa6c17cec26ecc7b19d47458ef93ddd5bb2bce80f8f3d966dd01fd86c33"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectModule.html" data-type="entity-link" >ProjectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProjectModule-d83045399cf709d4750babaf2c107b08e1d3e126204c8124a0894625bbf5b5161919f4dbba6cfb7430efb69bab062aa182cf7367389ca4d0f555e5a457d3166e"' : 'data-bs-target="#xs-components-links-module-ProjectModule-d83045399cf709d4750babaf2c107b08e1d3e126204c8124a0894625bbf5b5161919f4dbba6cfb7430efb69bab062aa182cf7367389ca4d0f555e5a457d3166e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProjectModule-d83045399cf709d4750babaf2c107b08e1d3e126204c8124a0894625bbf5b5161919f4dbba6cfb7430efb69bab062aa182cf7367389ca4d0f555e5a457d3166e"' :
                                            'id="xs-components-links-module-ProjectModule-d83045399cf709d4750babaf2c107b08e1d3e126204c8124a0894625bbf5b5161919f4dbba6cfb7430efb69bab062aa182cf7367389ca4d0f555e5a457d3166e"' }>
                                            <li class="link">
                                                <a href="components/ProjectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TranslocoRootModule.html" data-type="entity-link" >TranslocoRootModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AuthConfirmationRequiredComponent.html" data-type="entity-link" >AuthConfirmationRequiredComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthForgotPasswordComponent.html" data-type="entity-link" >AuthForgotPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthResetPasswordComponent.html" data-type="entity-link" >AuthResetPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthSignInComponent.html" data-type="entity-link" >AuthSignInComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthSignOutComponent.html" data-type="entity-link" >AuthSignOutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthSignUpComponent.html" data-type="entity-link" >AuthSignUpComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthUnlockSessionComponent.html" data-type="entity-link" >AuthUnlockSessionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CenteredLayoutComponent.html" data-type="entity-link" >CenteredLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ClassicLayoutComponent.html" data-type="entity-link" >ClassicLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ClassyLayoutComponent.html" data-type="entity-link" >ClassyLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CompactLayoutComponent.html" data-type="entity-link" >CompactLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DenseLayoutComponent.html" data-type="entity-link" >DenseLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmptyLayoutComponent.html" data-type="entity-link" >EmptyLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EnterpriseLayoutComponent.html" data-type="entity-link" >EnterpriseLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Error404Component.html" data-type="entity-link" >Error404Component</a>
                            </li>
                            <li class="link">
                                <a href="components/Error500Component.html" data-type="entity-link" >Error500Component</a>
                            </li>
                            <li class="link">
                                <a href="components/ExampleComponent.html" data-type="entity-link" >ExampleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseAlertComponent.html" data-type="entity-link" >FuseAlertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseCardComponent.html" data-type="entity-link" >FuseCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseConfirmationDialogComponent.html" data-type="entity-link" >FuseConfirmationDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseDrawerComponent.html" data-type="entity-link" >FuseDrawerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseFullscreenComponent.html" data-type="entity-link" >FuseFullscreenComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseHighlightComponent.html" data-type="entity-link" >FuseHighlightComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseHorizontalNavigationBasicItemComponent.html" data-type="entity-link" >FuseHorizontalNavigationBasicItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseHorizontalNavigationBranchItemComponent.html" data-type="entity-link" >FuseHorizontalNavigationBranchItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseHorizontalNavigationComponent.html" data-type="entity-link" >FuseHorizontalNavigationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseHorizontalNavigationDividerItemComponent.html" data-type="entity-link" >FuseHorizontalNavigationDividerItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseHorizontalNavigationSpacerItemComponent.html" data-type="entity-link" >FuseHorizontalNavigationSpacerItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseLoadingBarComponent.html" data-type="entity-link" >FuseLoadingBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseMasonryComponent.html" data-type="entity-link" >FuseMasonryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseVerticalNavigationAsideItemComponent.html" data-type="entity-link" >FuseVerticalNavigationAsideItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseVerticalNavigationBasicItemComponent.html" data-type="entity-link" >FuseVerticalNavigationBasicItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseVerticalNavigationCollapsableItemComponent.html" data-type="entity-link" >FuseVerticalNavigationCollapsableItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseVerticalNavigationComponent.html" data-type="entity-link" >FuseVerticalNavigationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseVerticalNavigationDividerItemComponent.html" data-type="entity-link" >FuseVerticalNavigationDividerItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseVerticalNavigationGroupItemComponent.html" data-type="entity-link" >FuseVerticalNavigationGroupItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuseVerticalNavigationSpacerItemComponent.html" data-type="entity-link" >FuseVerticalNavigationSpacerItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FuturisticLayoutComponent.html" data-type="entity-link" >FuturisticLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingHomeComponent.html" data-type="entity-link" >LandingHomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LanguagesComponent.html" data-type="entity-link" >LanguagesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutComponent.html" data-type="entity-link" >LayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MaterialLayoutComponent.html" data-type="entity-link" >MaterialLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MessagesComponent.html" data-type="entity-link" >MessagesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModernLayoutComponent.html" data-type="entity-link" >ModernLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationsComponent.html" data-type="entity-link" >NotificationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/QuickChatComponent.html" data-type="entity-link" >QuickChatComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SearchComponent.html" data-type="entity-link" >SearchComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SettingsAccountComponent.html" data-type="entity-link" >SettingsAccountComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SettingsComponent.html" data-type="entity-link" >SettingsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SettingsComponent-1.html" data-type="entity-link" >SettingsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SettingsNotificationsComponent.html" data-type="entity-link" >SettingsNotificationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SettingsPlanBillingComponent.html" data-type="entity-link" >SettingsPlanBillingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SettingsSecurityComponent.html" data-type="entity-link" >SettingsSecurityComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SettingsTeamComponent.html" data-type="entity-link" >SettingsTeamComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ShortcutsComponent.html" data-type="entity-link" >ShortcutsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ThinLayoutComponent.html" data-type="entity-link" >ThinLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserComponent.html" data-type="entity-link" >UserComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/FuseScrollbarDirective.html" data-type="entity-link" >FuseScrollbarDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/FuseScrollResetDirective.html" data-type="entity-link" >FuseScrollResetDirective</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthUtils.html" data-type="entity-link" >AuthUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/FuseAnimationCurves.html" data-type="entity-link" >FuseAnimationCurves</a>
                            </li>
                            <li class="link">
                                <a href="classes/FuseAnimationDurations.html" data-type="entity-link" >FuseAnimationDurations</a>
                            </li>
                            <li class="link">
                                <a href="classes/FuseMockApiHandler.html" data-type="entity-link" >FuseMockApiHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/FuseMockApiUtils.html" data-type="entity-link" >FuseMockApiUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/FuseValidators.html" data-type="entity-link" >FuseValidators</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScrollbarGeometry.html" data-type="entity-link" >ScrollbarGeometry</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScrollbarPosition.html" data-type="entity-link" >ScrollbarPosition</a>
                            </li>
                            <li class="link">
                                <a href="classes/Version.html" data-type="entity-link" >Version</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AcademyMockApi.html" data-type="entity-link" >AcademyMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActivitiesMockApi.html" data-type="entity-link" >ActivitiesMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnalyticsMockApi.html" data-type="entity-link" >AnalyticsMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthMockApi.html" data-type="entity-link" >AuthMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatMockApi.html" data-type="entity-link" >ChatMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContactsMockApi.html" data-type="entity-link" >ContactsMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CryptoMockApi.html" data-type="entity-link" >CryptoMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ECommerceInventoryMockApi.html" data-type="entity-link" >ECommerceInventoryMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileManagerMockApi.html" data-type="entity-link" >FileManagerMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FinanceMockApi.html" data-type="entity-link" >FinanceMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuseAlertService.html" data-type="entity-link" >FuseAlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuseConfigService.html" data-type="entity-link" >FuseConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuseConfirmationService.html" data-type="entity-link" >FuseConfirmationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuseDrawerService.html" data-type="entity-link" >FuseDrawerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuseHighlightService.html" data-type="entity-link" >FuseHighlightService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuseLoadingService.html" data-type="entity-link" >FuseLoadingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuseMediaWatcherService.html" data-type="entity-link" >FuseMediaWatcherService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuseMockApiService.html" data-type="entity-link" >FuseMockApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuseNavigationService.html" data-type="entity-link" >FuseNavigationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FusePlatformService.html" data-type="entity-link" >FusePlatformService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuseSplashScreenService.html" data-type="entity-link" >FuseSplashScreenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuseUtilsService.html" data-type="entity-link" >FuseUtilsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HelpCenterMockApi.html" data-type="entity-link" >HelpCenterMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconsMockApi.html" data-type="entity-link" >IconsMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconsService.html" data-type="entity-link" >IconsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailboxMockApi.html" data-type="entity-link" >MailboxMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessagesMockApi.html" data-type="entity-link" >MessagesMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessagesService.html" data-type="entity-link" >MessagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavigationMockApi.html" data-type="entity-link" >NavigationMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavigationService.html" data-type="entity-link" >NavigationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotesMockApi.html" data-type="entity-link" >NotesMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsMockApi.html" data-type="entity-link" >NotificationsMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsService.html" data-type="entity-link" >NotificationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectMockApi.html" data-type="entity-link" >ProjectMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectService.html" data-type="entity-link" >ProjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuickChatService.html" data-type="entity-link" >QuickChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScrumboardMockApi.html" data-type="entity-link" >ScrumboardMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchMockApi.html" data-type="entity-link" >SearchMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SettingsService.html" data-type="entity-link" >SettingsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShortcutsMockApi.html" data-type="entity-link" >ShortcutsMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShortcutsService.html" data-type="entity-link" >ShortcutsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TasksMockApi.html" data-type="entity-link" >TasksMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslocoHttpLoader.html" data-type="entity-link" >TranslocoHttpLoader</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslocoHttpLoader-1.html" data-type="entity-link" >TranslocoHttpLoader</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserMockApi.html" data-type="entity-link" >UserMockApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Chat.html" data-type="entity-link" >Chat</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Contact.html" data-type="entity-link" >Contact</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FSDocument.html" data-type="entity-link" >FSDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FSDocumentElement.html" data-type="entity-link" >FSDocumentElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FuseConfig.html" data-type="entity-link" >FuseConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FuseConfirmationConfig.html" data-type="entity-link" >FuseConfirmationConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FuseNavigationItem.html" data-type="entity-link" >FuseNavigationItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Navigation.html" data-type="entity-link" >Navigation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notification.html" data-type="entity-link" >Notification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Setting.html" data-type="entity-link" >Setting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Shortcut.html" data-type="entity-link" >Shortcut</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/FuseFindByKeyPipe.html" data-type="entity-link" >FuseFindByKeyPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});