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
                    <a href="index.html" data-type="index-link">server-ctu-task-management documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
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
                                            'data-bs-target="#controllers-links-module-AppModule-388fcd6f3d51b38f684b96b7ac655dbf75fd78ffd7641ed244d7e0b51651bcf41762532e15e10d816bda44d58de4e741765558bca325556715a46ec8ddd8c940"' : 'data-bs-target="#xs-controllers-links-module-AppModule-388fcd6f3d51b38f684b96b7ac655dbf75fd78ffd7641ed244d7e0b51651bcf41762532e15e10d816bda44d58de4e741765558bca325556715a46ec8ddd8c940"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-388fcd6f3d51b38f684b96b7ac655dbf75fd78ffd7641ed244d7e0b51651bcf41762532e15e10d816bda44d58de4e741765558bca325556715a46ec8ddd8c940"' :
                                            'id="xs-controllers-links-module-AppModule-388fcd6f3d51b38f684b96b7ac655dbf75fd78ffd7641ed244d7e0b51651bcf41762532e15e10d816bda44d58de4e741765558bca325556715a46ec8ddd8c940"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-388fcd6f3d51b38f684b96b7ac655dbf75fd78ffd7641ed244d7e0b51651bcf41762532e15e10d816bda44d58de4e741765558bca325556715a46ec8ddd8c940"' : 'data-bs-target="#xs-injectables-links-module-AppModule-388fcd6f3d51b38f684b96b7ac655dbf75fd78ffd7641ed244d7e0b51651bcf41762532e15e10d816bda44d58de4e741765558bca325556715a46ec8ddd8c940"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-388fcd6f3d51b38f684b96b7ac655dbf75fd78ffd7641ed244d7e0b51651bcf41762532e15e10d816bda44d58de4e741765558bca325556715a46ec8ddd8c940"' :
                                        'id="xs-injectables-links-module-AppModule-388fcd6f3d51b38f684b96b7ac655dbf75fd78ffd7641ed244d7e0b51651bcf41762532e15e10d816bda44d58de4e741765558bca325556715a46ec8ddd8c940"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationModule.html" data-type="entity-link" >AuthenticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthenticationModule-94a736bd21446b193161a65617c64d9a1676c3221eb189a3a2627786a03b0bfef181cd657081af2757bfd9e3785e3f86644c50afa261f2cb7533afe55a40f385"' : 'data-bs-target="#xs-controllers-links-module-AuthenticationModule-94a736bd21446b193161a65617c64d9a1676c3221eb189a3a2627786a03b0bfef181cd657081af2757bfd9e3785e3f86644c50afa261f2cb7533afe55a40f385"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthenticationModule-94a736bd21446b193161a65617c64d9a1676c3221eb189a3a2627786a03b0bfef181cd657081af2757bfd9e3785e3f86644c50afa261f2cb7533afe55a40f385"' :
                                            'id="xs-controllers-links-module-AuthenticationModule-94a736bd21446b193161a65617c64d9a1676c3221eb189a3a2627786a03b0bfef181cd657081af2757bfd9e3785e3f86644c50afa261f2cb7533afe55a40f385"' }>
                                            <li class="link">
                                                <a href="controllers/AuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthenticationModule-94a736bd21446b193161a65617c64d9a1676c3221eb189a3a2627786a03b0bfef181cd657081af2757bfd9e3785e3f86644c50afa261f2cb7533afe55a40f385"' : 'data-bs-target="#xs-injectables-links-module-AuthenticationModule-94a736bd21446b193161a65617c64d9a1676c3221eb189a3a2627786a03b0bfef181cd657081af2757bfd9e3785e3f86644c50afa261f2cb7533afe55a40f385"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthenticationModule-94a736bd21446b193161a65617c64d9a1676c3221eb189a3a2627786a03b0bfef181cd657081af2757bfd9e3785e3f86644c50afa261f2cb7533afe55a40f385"' :
                                        'id="xs-injectables-links-module-AuthenticationModule-94a736bd21446b193161a65617c64d9a1676c3221eb189a3a2627786a03b0bfef181cd657081af2757bfd9e3785e3f86644c50afa261f2cb7533afe55a40f385"' }>
                                        <li class="link">
                                            <a href="injectables/AccessTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessTokenStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CloudService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokenIdsStorage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokenIdsStorage</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TfaAuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TfaAuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthorizationModule.html" data-type="entity-link" >AuthorizationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CloudModule.html" data-type="entity-link" >CloudModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CloudModule-2e0a1e1aab7c7f96f8bf4c893a302e34b3d3fc38f7f467af185d3025d442d35f12891eb2dec104033f1df0b2eef1934b96d947f681cb316f2e79a2d2c59da7ab"' : 'data-bs-target="#xs-controllers-links-module-CloudModule-2e0a1e1aab7c7f96f8bf4c893a302e34b3d3fc38f7f467af185d3025d442d35f12891eb2dec104033f1df0b2eef1934b96d947f681cb316f2e79a2d2c59da7ab"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CloudModule-2e0a1e1aab7c7f96f8bf4c893a302e34b3d3fc38f7f467af185d3025d442d35f12891eb2dec104033f1df0b2eef1934b96d947f681cb316f2e79a2d2c59da7ab"' :
                                            'id="xs-controllers-links-module-CloudModule-2e0a1e1aab7c7f96f8bf4c893a302e34b3d3fc38f7f467af185d3025d442d35f12891eb2dec104033f1df0b2eef1934b96d947f681cb316f2e79a2d2c59da7ab"' }>
                                            <li class="link">
                                                <a href="controllers/CloudController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CloudModule-2e0a1e1aab7c7f96f8bf4c893a302e34b3d3fc38f7f467af185d3025d442d35f12891eb2dec104033f1df0b2eef1934b96d947f681cb316f2e79a2d2c59da7ab"' : 'data-bs-target="#xs-injectables-links-module-CloudModule-2e0a1e1aab7c7f96f8bf4c893a302e34b3d3fc38f7f467af185d3025d442d35f12891eb2dec104033f1df0b2eef1934b96d947f681cb316f2e79a2d2c59da7ab"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CloudModule-2e0a1e1aab7c7f96f8bf4c893a302e34b3d3fc38f7f467af185d3025d442d35f12891eb2dec104033f1df0b2eef1934b96d947f681cb316f2e79a2d2c59da7ab"' :
                                        'id="xs-injectables-links-module-CloudModule-2e0a1e1aab7c7f96f8bf4c893a302e34b3d3fc38f7f467af185d3025d442d35f12891eb2dec104033f1df0b2eef1934b96d947f681cb316f2e79a2d2c59da7ab"' }>
                                        <li class="link">
                                            <a href="injectables/CloudService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/IamModule.html" data-type="entity-link" >IamModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-cebbf72ba237e18ea7cbf02388af46e150dae312e04b998fffa34706849a9ace625ba83b550ddee49dcc1e46845b228d6d60b9899165c1c73a80618b84ae1119"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-cebbf72ba237e18ea7cbf02388af46e150dae312e04b998fffa34706849a9ace625ba83b550ddee49dcc1e46845b228d6d60b9899165c1c73a80618b84ae1119"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-cebbf72ba237e18ea7cbf02388af46e150dae312e04b998fffa34706849a9ace625ba83b550ddee49dcc1e46845b228d6d60b9899165c1c73a80618b84ae1119"' :
                                            'id="xs-controllers-links-module-UsersModule-cebbf72ba237e18ea7cbf02388af46e150dae312e04b998fffa34706849a9ace625ba83b550ddee49dcc1e46845b228d6d60b9899165c1c73a80618b84ae1119"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-cebbf72ba237e18ea7cbf02388af46e150dae312e04b998fffa34706849a9ace625ba83b550ddee49dcc1e46845b228d6d60b9899165c1c73a80618b84ae1119"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-cebbf72ba237e18ea7cbf02388af46e150dae312e04b998fffa34706849a9ace625ba83b550ddee49dcc1e46845b228d6d60b9899165c1c73a80618b84ae1119"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-cebbf72ba237e18ea7cbf02388af46e150dae312e04b998fffa34706849a9ace625ba83b550ddee49dcc1e46845b228d6d60b9899165c1c73a80618b84ae1119"' :
                                        'id="xs-injectables-links-module-UsersModule-cebbf72ba237e18ea7cbf02388af46e150dae312e04b998fffa34706849a9ace625ba83b550ddee49dcc1e46845b228d6d60b9899165c1c73a80618b84ae1119"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/SessionAuthenticationController.html" data-type="entity-link" >SessionAuthenticationController</a>
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
                                <a href="classes/CreateInfoDto.html" data-type="entity-link" >CreateInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/InfoEntity.html" data-type="entity-link" >InfoEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/PositionEntity.html" data-type="entity-link" >PositionEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenIdsStorageError.html" data-type="entity-link" >RefreshTokenIdsStorageError</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleEntity.html" data-type="entity-link" >RoleEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/SettingEntity.html" data-type="entity-link" >SettingEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInWithTokenDto.html" data-type="entity-link" >SignInWithTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpDto.html" data-type="entity-link" >SignUpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/updateInfoDto.html" data-type="entity-link" >updateInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/updateUserDto.html" data-type="entity-link" >updateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEntity.html" data-type="entity-link" >UserEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSerializer.html" data-type="entity-link" >UserSerializer</a>
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
                                    <a href="injectables/BcryptService.html" data-type="entity-link" >BcryptService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingService.html" data-type="entity-link" >HashingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenStrategy.html" data-type="entity-link" >RefreshTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionAuthenticationService.html" data-type="entity-link" >SessionAuthenticationService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/SessionGuard.html" data-type="entity-link" >SessionGuard</a>
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
                                <a href="interfaces/ActiveUserData.html" data-type="entity-link" >ActiveUserData</a>
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
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
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