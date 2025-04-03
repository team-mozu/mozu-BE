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
                    <a href="index.html" data-type="index-link">mozu-BE documentation</a>
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
                            </li>
                            <li class="link">
                                <a href="modules/ArticleApplicationModule.html" data-type="entity-link" >ArticleApplicationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ArticleDomainModule.html" data-type="entity-link" >ArticleDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ArticleDomainModule-0ddb8f2eaa3525042fd82a376c581346a098fa33faa86e164b047fe14ad71b557dfa453347c9af0f0325ba53e88aa43f32ff0aecb73f496b4565e7f5c56f9712"' : 'data-bs-target="#xs-injectables-links-module-ArticleDomainModule-0ddb8f2eaa3525042fd82a376c581346a098fa33faa86e164b047fe14ad71b557dfa453347c9af0f0325ba53e88aa43f32ff0aecb73f496b4565e7f5c56f9712"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ArticleDomainModule-0ddb8f2eaa3525042fd82a376c581346a098fa33faa86e164b047fe14ad71b557dfa453347c9af0f0325ba53e88aa43f32ff0aecb73f496b4565e7f5c56f9712"' :
                                        'id="xs-injectables-links-module-ArticleDomainModule-0ddb8f2eaa3525042fd82a376c581346a098fa33faa86e164b047fe14ad71b557dfa453347c9af0f0325ba53e88aa43f32ff0aecb73f496b4565e7f5c56f9712"' }>
                                        <li class="link">
                                            <a href="injectables/ArticleDomainMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticleDomainMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/S3Adapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >S3Adapter</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ArticleModule.html" data-type="entity-link" >ArticleModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ArticlePresentationModule.html" data-type="entity-link" >ArticlePresentationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ClassApplicationModule.html" data-type="entity-link" >ClassApplicationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ClassDomainModule.html" data-type="entity-link" >ClassDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClassDomainModule-4f21e0b524c4d909c5c7a4bb70017146bff0c8d51f3bf8e860f99268daa19a07ae7cffd5b6ad6d89d8415d71c33ad0391b5a4f1140eb268ef99c5f0551c36740"' : 'data-bs-target="#xs-injectables-links-module-ClassDomainModule-4f21e0b524c4d909c5c7a4bb70017146bff0c8d51f3bf8e860f99268daa19a07ae7cffd5b6ad6d89d8415d71c33ad0391b5a4f1140eb268ef99c5f0551c36740"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClassDomainModule-4f21e0b524c4d909c5c7a4bb70017146bff0c8d51f3bf8e860f99268daa19a07ae7cffd5b6ad6d89d8415d71c33ad0391b5a4f1140eb268ef99c5f0551c36740"' :
                                        'id="xs-injectables-links-module-ClassDomainModule-4f21e0b524c4d909c5c7a4bb70017146bff0c8d51f3bf8e860f99268daa19a07ae7cffd5b6ad6d89d8415d71c33ad0391b5a4f1140eb268ef99c5f0551c36740"' }>
                                        <li class="link">
                                            <a href="injectables/ClassDomainMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClassDomainMapper</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClassModule.html" data-type="entity-link" >ClassModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ClassPresentationModule.html" data-type="entity-link" >ClassPresentationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GlobalConfigModule.html" data-type="entity-link" >GlobalConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GlobalJwtModule.html" data-type="entity-link" >GlobalJwtModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-67cf7cc0b7c3a75e32ceedc873da1969c48dc9b04acd6d33b03aa034f7c51849a77060bf1ddc4af0142a5d63db69d55ea6748a9f37d862739b496fa5bf2b1e27"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-67cf7cc0b7c3a75e32ceedc873da1969c48dc9b04acd6d33b03aa034f7c51849a77060bf1ddc4af0142a5d63db69d55ea6748a9f37d862739b496fa5bf2b1e27"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-67cf7cc0b7c3a75e32ceedc873da1969c48dc9b04acd6d33b03aa034f7c51849a77060bf1ddc4af0142a5d63db69d55ea6748a9f37d862739b496fa5bf2b1e27"' :
                                            'id="xs-controllers-links-module-HealthModule-67cf7cc0b7c3a75e32ceedc873da1969c48dc9b04acd6d33b03aa034f7c51849a77060bf1ddc4af0142a5d63db69d55ea6748a9f37d862739b496fa5bf2b1e27"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ItemApplicationModule.html" data-type="entity-link" >ItemApplicationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ItemDomainModule.html" data-type="entity-link" >ItemDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ItemDomainModule-5cf954a733a25aa5cd28a160dee83ee0b4dba77d6564ce066ebbb35ec6d253842f46183f6d89acca14a1f54f5362cc3b93b6ebbb3d82b66b39606523beb0a40a"' : 'data-bs-target="#xs-injectables-links-module-ItemDomainModule-5cf954a733a25aa5cd28a160dee83ee0b4dba77d6564ce066ebbb35ec6d253842f46183f6d89acca14a1f54f5362cc3b93b6ebbb3d82b66b39606523beb0a40a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ItemDomainModule-5cf954a733a25aa5cd28a160dee83ee0b4dba77d6564ce066ebbb35ec6d253842f46183f6d89acca14a1f54f5362cc3b93b6ebbb3d82b66b39606523beb0a40a"' :
                                        'id="xs-injectables-links-module-ItemDomainModule-5cf954a733a25aa5cd28a160dee83ee0b4dba77d6564ce066ebbb35ec6d253842f46183f6d89acca14a1f54f5362cc3b93b6ebbb3d82b66b39606523beb0a40a"' }>
                                        <li class="link">
                                            <a href="injectables/ItemDomainMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemDomainMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/S3Adapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >S3Adapter</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ItemModule.html" data-type="entity-link" >ItemModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ItemPresentationModule.html" data-type="entity-link" >ItemPresentationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MozuLoggerModule.html" data-type="entity-link" >MozuLoggerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrganApplicationModule.html" data-type="entity-link" >OrganApplicationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrganDomainModule.html" data-type="entity-link" >OrganDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrganDomainModule-0d24775a9aa4ddcef977c28e42ebb0c26b2229c6395b71b4534d69b889d95286f5d6776e6986ad68df7612aefed3fb609204e592f65768fe82e8fe487b84f6be"' : 'data-bs-target="#xs-injectables-links-module-OrganDomainModule-0d24775a9aa4ddcef977c28e42ebb0c26b2229c6395b71b4534d69b889d95286f5d6776e6986ad68df7612aefed3fb609204e592f65768fe82e8fe487b84f6be"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrganDomainModule-0d24775a9aa4ddcef977c28e42ebb0c26b2229c6395b71b4534d69b889d95286f5d6776e6986ad68df7612aefed3fb609204e592f65768fe82e8fe487b84f6be"' :
                                        'id="xs-injectables-links-module-OrganDomainModule-0d24775a9aa4ddcef977c28e42ebb0c26b2229c6395b71b4534d69b889d95286f5d6776e6986ad68df7612aefed3fb609204e592f65768fe82e8fe487b84f6be"' }>
                                        <li class="link">
                                            <a href="injectables/OrganDomainMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganDomainMapper</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganModule.html" data-type="entity-link" >OrganModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrganPresentationModule.html" data-type="entity-link" >OrganPresentationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SseModule.html" data-type="entity-link" >SseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SseModule-2d7be40bd945898a6d039f8077dd78c4e0c57fd44738f936fd7344a83443ac8ef842812d077605c279ee924206943f7eb644aaee920a757a31851fccf9bf11b0"' : 'data-bs-target="#xs-injectables-links-module-SseModule-2d7be40bd945898a6d039f8077dd78c4e0c57fd44738f936fd7344a83443ac8ef842812d077605c279ee924206943f7eb644aaee920a757a31851fccf9bf11b0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SseModule-2d7be40bd945898a6d039f8077dd78c4e0c57fd44738f936fd7344a83443ac8ef842812d077605c279ee924206943f7eb644aaee920a757a31851fccf9bf11b0"' :
                                        'id="xs-injectables-links-module-SseModule-2d7be40bd945898a6d039f8077dd78c4e0c57fd44738f936fd7344a83443ac8ef842812d077605c279ee924206943f7eb644aaee920a757a31851fccf9bf11b0"' }>
                                        <li class="link">
                                            <a href="injectables/SseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeamApplicationModule.html" data-type="entity-link" >TeamApplicationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TeamDomainModule.html" data-type="entity-link" >TeamDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TeamDomainModule-a5d66d9de2871d62e2a940f23e1af932d86d4d420b85f7d9662fec354bcb044cdc88072eacd3c523a244ef3898b9062c9f39a069d334925c823c678852000a3a"' : 'data-bs-target="#xs-injectables-links-module-TeamDomainModule-a5d66d9de2871d62e2a940f23e1af932d86d4d420b85f7d9662fec354bcb044cdc88072eacd3c523a244ef3898b9062c9f39a069d334925c823c678852000a3a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TeamDomainModule-a5d66d9de2871d62e2a940f23e1af932d86d4d420b85f7d9662fec354bcb044cdc88072eacd3c523a244ef3898b9062c9f39a069d334925c823c678852000a3a"' :
                                        'id="xs-injectables-links-module-TeamDomainModule-a5d66d9de2871d62e2a940f23e1af932d86d4d420b85f7d9662fec354bcb044cdc88072eacd3c523a244ef3898b9062c9f39a069d334925c823c678852000a3a"' }>
                                        <li class="link">
                                            <a href="injectables/TeamDomainMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamDomainMapper</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeamModule.html" data-type="entity-link" >TeamModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TeamPresentationModule.html" data-type="entity-link" >TeamPresentationModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/ArticleEntity.html" data-type="entity-link" >ArticleEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ClassArticleEntity.html" data-type="entity-link" >ClassArticleEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ClassEntity.html" data-type="entity-link" >ClassEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ClassItemEntity.html" data-type="entity-link" >ClassItemEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/HoldItemEntity.html" data-type="entity-link" >HoldItemEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ItemEntity.html" data-type="entity-link" >ItemEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/OrganEntity.html" data-type="entity-link" >OrganEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TeamEntity.html" data-type="entity-link" >TeamEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TeamOrderEntity.html" data-type="entity-link" >TeamOrderEntity</a>
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
                                <a href="classes/ArticleDTO.html" data-type="entity-link" >ArticleDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ArticleDTO-1.html" data-type="entity-link" >ArticleDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClassArticle.html" data-type="entity-link" >ClassArticle</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClassArticleDTO.html" data-type="entity-link" >ClassArticleDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClassDTO.html" data-type="entity-link" >ClassDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClassItem.html" data-type="entity-link" >ClassItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClassItemDTO.html" data-type="entity-link" >ClassItemDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventClassNextInvStartForm.html" data-type="entity-link" >EventClassNextInvStartForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventTeamInvEndForm.html" data-type="entity-link" >EventTeamInvEndForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventTeamPartInForm.html" data-type="entity-link" >EventTeamPartInForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/HoldItemDTO.html" data-type="entity-link" >HoldItemDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ItemDTO.html" data-type="entity-link" >ItemDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ItemDTO-1.html" data-type="entity-link" >ItemDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/MozuLogger.html" data-type="entity-link" >MozuLogger</a>
                            </li>
                            <li class="link">
                                <a href="classes/NoBadWordsConstraint.html" data-type="entity-link" >NoBadWordsConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganDTO.html" data-type="entity-link" >OrganDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReponseClassArticleForm.html" data-type="entity-link" >ReponseClassArticleForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestArticleForm.html" data-type="entity-link" >RequestArticleForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestArticleFormMapper.html" data-type="entity-link" >RequestArticleFormMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestClassForm.html" data-type="entity-link" >RequestClassForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestClassFormMapper.html" data-type="entity-link" >RequestClassFormMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestItemForm.html" data-type="entity-link" >RequestItemForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestItemFormMapper.html" data-type="entity-link" >RequestItemFormMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestLoginForm.html" data-type="entity-link" >RequestLoginForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestOrganForm.html" data-type="entity-link" >RequestOrganForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestOrganFormMapper.html" data-type="entity-link" >RequestOrganFormMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestTeamForm.html" data-type="entity-link" >RequestTeamForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestTeamFormMapper.html" data-type="entity-link" >RequestTeamFormMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestTeamOrderForm.html" data-type="entity-link" >RequestTeamOrderForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseArticle.html" data-type="entity-link" >ResponseArticle</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseArticle-1.html" data-type="entity-link" >ResponseArticle</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseArticleForm.html" data-type="entity-link" >ResponseArticleForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseClass.html" data-type="entity-link" >ResponseClass</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseClassArticle.html" data-type="entity-link" >ResponseClassArticle</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseClassCodeForm.html" data-type="entity-link" >ResponseClassCodeForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseClassForm.html" data-type="entity-link" >ResponseClassForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseClassItem.html" data-type="entity-link" >ResponseClassItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseClassItemsForm.html" data-type="entity-link" >ResponseClassItemsForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseDetailClass.html" data-type="entity-link" >ResponseDetailClass</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseItem.html" data-type="entity-link" >ResponseItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseItemForm.html" data-type="entity-link" >ResponseItemForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseLoginForm.html" data-type="entity-link" >ResponseLoginForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseReissueForm.html" data-type="entity-link" >ResponseReissueForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseTeamClassArticleForm.html" data-type="entity-link" >ResponseTeamClassArticleForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseTeamClassItemDetailForm.html" data-type="entity-link" >ResponseTeamClassItemDetailForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseTeamClassItemForm.html" data-type="entity-link" >ResponseTeamClassItemForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseTeamForm.html" data-type="entity-link" >ResponseTeamForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseTeamRankForm.html" data-type="entity-link" >ResponseTeamRankForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseTeamResultForm.html" data-type="entity-link" >ResponseTeamResultForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseTeamTokenForm.html" data-type="entity-link" >ResponseTeamTokenForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamDTO.html" data-type="entity-link" >TeamDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamOrderDTO.html" data-type="entity-link" >TeamOrderDTO</a>
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
                                    <a href="injectables/ArticleReadServiceImpl.html" data-type="entity-link" >ArticleReadServiceImpl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ArticleRepository.html" data-type="entity-link" >ArticleRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ArticleWriteServiceImpl.html" data-type="entity-link" >ArticleWriteServiceImpl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClassReadServiceImpl.html" data-type="entity-link" >ClassReadServiceImpl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClassRepository.html" data-type="entity-link" >ClassRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClassWriteServiceImpl.html" data-type="entity-link" >ClassWriteServiceImpl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemReadServiceImpl.html" data-type="entity-link" >ItemReadServiceImpl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemRepository.html" data-type="entity-link" >ItemRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemWrtieServiceImpl.html" data-type="entity-link" >ItemWrtieServiceImpl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganReadServiceImpl.html" data-type="entity-link" >OrganReadServiceImpl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganRepository.html" data-type="entity-link" >OrganRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganWriteServiceImpl.html" data-type="entity-link" >OrganWriteServiceImpl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/S3Adapter.html" data-type="entity-link" >S3Adapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamReadServiceImpl.html" data-type="entity-link" >TeamReadServiceImpl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamRepository.html" data-type="entity-link" >TeamRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamWriteServiceImpl.html" data-type="entity-link" >TeamWriteServiceImpl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TypeOrmConfigService.html" data-type="entity-link" >TypeOrmConfigService</a>
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
                                <a href="guards/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
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
                                <a href="interfaces/ArticleDomainReader.html" data-type="entity-link" >ArticleDomainReader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ArticleDomainWriter.html" data-type="entity-link" >ArticleDomainWriter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ArticleReadService.html" data-type="entity-link" >ArticleReadService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ArticleWriteService.html" data-type="entity-link" >ArticleWriteService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassDomainReader.html" data-type="entity-link" >ClassDomainReader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassDomainWrtier.html" data-type="entity-link" >ClassDomainWrtier</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassReadService.html" data-type="entity-link" >ClassReadService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassWrtieService.html" data-type="entity-link" >ClassWrtieService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemDomainReader.html" data-type="entity-link" >ItemDomainReader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemDomainWriter.html" data-type="entity-link" >ItemDomainWriter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemReadService.html" data-type="entity-link" >ItemReadService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemWrtieService.html" data-type="entity-link" >ItemWrtieService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganDomainReader.html" data-type="entity-link" >OrganDomainReader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganDomainWriter.html" data-type="entity-link" >OrganDomainWriter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganReadService.html" data-type="entity-link" >OrganReadService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganWrtieService.html" data-type="entity-link" >OrganWrtieService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TeamDomainReader.html" data-type="entity-link" >TeamDomainReader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TeamDomainWrtier.html" data-type="entity-link" >TeamDomainWrtier</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TeamReadService.html" data-type="entity-link" >TeamReadService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TeamWriteService.html" data-type="entity-link" >TeamWriteService</a>
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