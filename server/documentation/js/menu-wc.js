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
                    <a href="index.html" data-type="index-link">server documentation</a>
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
                                            'data-bs-target="#controllers-links-module-AppModule-581bd52a04ab268089c8b5707cfb610d8d30acdc71b76a2b087396c6f4cb89dc718ac90782fb2fac198124d0412bc4c1d8b0dbc7ba8c9fe7d106dc6861f73833"' : 'data-bs-target="#xs-controllers-links-module-AppModule-581bd52a04ab268089c8b5707cfb610d8d30acdc71b76a2b087396c6f4cb89dc718ac90782fb2fac198124d0412bc4c1d8b0dbc7ba8c9fe7d106dc6861f73833"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-581bd52a04ab268089c8b5707cfb610d8d30acdc71b76a2b087396c6f4cb89dc718ac90782fb2fac198124d0412bc4c1d8b0dbc7ba8c9fe7d106dc6861f73833"' :
                                            'id="xs-controllers-links-module-AppModule-581bd52a04ab268089c8b5707cfb610d8d30acdc71b76a2b087396c6f4cb89dc718ac90782fb2fac198124d0412bc4c1d8b0dbc7ba8c9fe7d106dc6861f73833"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-581bd52a04ab268089c8b5707cfb610d8d30acdc71b76a2b087396c6f4cb89dc718ac90782fb2fac198124d0412bc4c1d8b0dbc7ba8c9fe7d106dc6861f73833"' : 'data-bs-target="#xs-injectables-links-module-AppModule-581bd52a04ab268089c8b5707cfb610d8d30acdc71b76a2b087396c6f4cb89dc718ac90782fb2fac198124d0412bc4c1d8b0dbc7ba8c9fe7d106dc6861f73833"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-581bd52a04ab268089c8b5707cfb610d8d30acdc71b76a2b087396c6f4cb89dc718ac90782fb2fac198124d0412bc4c1d8b0dbc7ba8c9fe7d106dc6861f73833"' :
                                        'id="xs-injectables-links-module-AppModule-581bd52a04ab268089c8b5707cfb610d8d30acdc71b76a2b087396c6f4cb89dc718ac90782fb2fac198124d0412bc4c1d8b0dbc7ba8c9fe7d106dc6861f73833"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthenticationModule-581bc653f5045b9aff5ae2e52facc9365d97fa79ac0c13fcd2f2a3de09360ab30fcaafaced4434f2a0d8aaf9f904ffa5c2e7e2b6dee5c9534f58bfb56252ad50"' : 'data-bs-target="#xs-controllers-links-module-AuthenticationModule-581bc653f5045b9aff5ae2e52facc9365d97fa79ac0c13fcd2f2a3de09360ab30fcaafaced4434f2a0d8aaf9f904ffa5c2e7e2b6dee5c9534f58bfb56252ad50"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthenticationModule-581bc653f5045b9aff5ae2e52facc9365d97fa79ac0c13fcd2f2a3de09360ab30fcaafaced4434f2a0d8aaf9f904ffa5c2e7e2b6dee5c9534f58bfb56252ad50"' :
                                            'id="xs-controllers-links-module-AuthenticationModule-581bc653f5045b9aff5ae2e52facc9365d97fa79ac0c13fcd2f2a3de09360ab30fcaafaced4434f2a0d8aaf9f904ffa5c2e7e2b6dee5c9534f58bfb56252ad50"' }>
                                            <li class="link">
                                                <a href="controllers/AuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthenticationModule-581bc653f5045b9aff5ae2e52facc9365d97fa79ac0c13fcd2f2a3de09360ab30fcaafaced4434f2a0d8aaf9f904ffa5c2e7e2b6dee5c9534f58bfb56252ad50"' : 'data-bs-target="#xs-injectables-links-module-AuthenticationModule-581bc653f5045b9aff5ae2e52facc9365d97fa79ac0c13fcd2f2a3de09360ab30fcaafaced4434f2a0d8aaf9f904ffa5c2e7e2b6dee5c9534f58bfb56252ad50"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthenticationModule-581bc653f5045b9aff5ae2e52facc9365d97fa79ac0c13fcd2f2a3de09360ab30fcaafaced4434f2a0d8aaf9f904ffa5c2e7e2b6dee5c9534f58bfb56252ad50"' :
                                        'id="xs-injectables-links-module-AuthenticationModule-581bc653f5045b9aff5ae2e52facc9365d97fa79ac0c13fcd2f2a3de09360ab30fcaafaced4434f2a0d8aaf9f904ffa5c2e7e2b6dee5c9534f58bfb56252ad50"' }>
                                        <li class="link">
                                            <a href="injectables/AccessTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessTokenStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationService</a>
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
                                            'data-bs-target="#controllers-links-module-UsersModule-2e6428412445410176c7fd56fb5125e3bb5fe9d2b2952fac1a9fdd123beb418fe376d36952ac287e4f3f33b0fa239fab4203c661e564cdd34c1fac198bab4444"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-2e6428412445410176c7fd56fb5125e3bb5fe9d2b2952fac1a9fdd123beb418fe376d36952ac287e4f3f33b0fa239fab4203c661e564cdd34c1fac198bab4444"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-2e6428412445410176c7fd56fb5125e3bb5fe9d2b2952fac1a9fdd123beb418fe376d36952ac287e4f3f33b0fa239fab4203c661e564cdd34c1fac198bab4444"' :
                                            'id="xs-controllers-links-module-UsersModule-2e6428412445410176c7fd56fb5125e3bb5fe9d2b2952fac1a9fdd123beb418fe376d36952ac287e4f3f33b0fa239fab4203c661e564cdd34c1fac198bab4444"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-2e6428412445410176c7fd56fb5125e3bb5fe9d2b2952fac1a9fdd123beb418fe376d36952ac287e4f3f33b0fa239fab4203c661e564cdd34c1fac198bab4444"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-2e6428412445410176c7fd56fb5125e3bb5fe9d2b2952fac1a9fdd123beb418fe376d36952ac287e4f3f33b0fa239fab4203c661e564cdd34c1fac198bab4444"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-2e6428412445410176c7fd56fb5125e3bb5fe9d2b2952fac1a9fdd123beb418fe376d36952ac287e4f3f33b0fa239fab4203c661e564cdd34c1fac198bab4444"' :
                                        'id="xs-injectables-links-module-UsersModule-2e6428412445410176c7fd56fb5125e3bb5fe9d2b2952fac1a9fdd123beb418fe376d36952ac287e4f3f33b0fa239fab4203c661e564cdd34c1fac198bab4444"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
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
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpDto.html" data-type="entity-link" >SignUpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEntity.html" data-type="entity-link" >UserEntity</a>
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