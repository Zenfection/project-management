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
                                            'data-bs-target="#controllers-links-module-AuthenticationModule-80347bb669471ca406f999218a2f61178ade0dbb74c9c5e569a643806544f92748033b95be419fc0ba268ff5cd51f3ce8bc7ffb6d8f9f4e554b7cad5e001da91"' : 'data-bs-target="#xs-controllers-links-module-AuthenticationModule-80347bb669471ca406f999218a2f61178ade0dbb74c9c5e569a643806544f92748033b95be419fc0ba268ff5cd51f3ce8bc7ffb6d8f9f4e554b7cad5e001da91"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthenticationModule-80347bb669471ca406f999218a2f61178ade0dbb74c9c5e569a643806544f92748033b95be419fc0ba268ff5cd51f3ce8bc7ffb6d8f9f4e554b7cad5e001da91"' :
                                            'id="xs-controllers-links-module-AuthenticationModule-80347bb669471ca406f999218a2f61178ade0dbb74c9c5e569a643806544f92748033b95be419fc0ba268ff5cd51f3ce8bc7ffb6d8f9f4e554b7cad5e001da91"' }>
                                            <li class="link">
                                                <a href="controllers/AuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthenticationModule-80347bb669471ca406f999218a2f61178ade0dbb74c9c5e569a643806544f92748033b95be419fc0ba268ff5cd51f3ce8bc7ffb6d8f9f4e554b7cad5e001da91"' : 'data-bs-target="#xs-injectables-links-module-AuthenticationModule-80347bb669471ca406f999218a2f61178ade0dbb74c9c5e569a643806544f92748033b95be419fc0ba268ff5cd51f3ce8bc7ffb6d8f9f4e554b7cad5e001da91"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthenticationModule-80347bb669471ca406f999218a2f61178ade0dbb74c9c5e569a643806544f92748033b95be419fc0ba268ff5cd51f3ce8bc7ffb6d8f9f4e554b7cad5e001da91"' :
                                        'id="xs-injectables-links-module-AuthenticationModule-80347bb669471ca406f999218a2f61178ade0dbb74c9c5e569a643806544f92748033b95be419fc0ba268ff5cd51f3ce8bc7ffb6d8f9f4e554b7cad5e001da91"' }>
                                        <li class="link">
                                            <a href="injectables/AccessTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessTokenStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationService</a>
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
                                <a href="modules/IamModule.html" data-type="entity-link" >IamModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-c6969b3c236642bc166a4967671066fc2526e6b6f6796723453aebf89567847c8c21fbd2d5ef79b1b3548782a901be598cb9b474e47551a82f15ecae9c68c31c"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-c6969b3c236642bc166a4967671066fc2526e6b6f6796723453aebf89567847c8c21fbd2d5ef79b1b3548782a901be598cb9b474e47551a82f15ecae9c68c31c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-c6969b3c236642bc166a4967671066fc2526e6b6f6796723453aebf89567847c8c21fbd2d5ef79b1b3548782a901be598cb9b474e47551a82f15ecae9c68c31c"' :
                                            'id="xs-controllers-links-module-UsersModule-c6969b3c236642bc166a4967671066fc2526e6b6f6796723453aebf89567847c8c21fbd2d5ef79b1b3548782a901be598cb9b474e47551a82f15ecae9c68c31c"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-c6969b3c236642bc166a4967671066fc2526e6b6f6796723453aebf89567847c8c21fbd2d5ef79b1b3548782a901be598cb9b474e47551a82f15ecae9c68c31c"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-c6969b3c236642bc166a4967671066fc2526e6b6f6796723453aebf89567847c8c21fbd2d5ef79b1b3548782a901be598cb9b474e47551a82f15ecae9c68c31c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-c6969b3c236642bc166a4967671066fc2526e6b6f6796723453aebf89567847c8c21fbd2d5ef79b1b3548782a901be598cb9b474e47551a82f15ecae9c68c31c"' :
                                        'id="xs-injectables-links-module-UsersModule-c6969b3c236642bc166a4967671066fc2526e6b6f6796723453aebf89567847c8c21fbd2d5ef79b1b3548782a901be598cb9b474e47551a82f15ecae9c68c31c"' }>
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
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenIdsStorageError.html" data-type="entity-link" >RefreshTokenIdsStorageError</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpDto.html" data-type="entity-link" >SignUpDto</a>
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