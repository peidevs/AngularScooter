'use strict';

/**
 * Wouldn't this be better as a directive?
 * <tabContainer>
 *  <tab name='First Tab' template='views/partial/_sometemplate' active />
 *  <tab name='Second Tab' template='views/partial_someOtherTemplate />
 * </tabContainer>
 *
 * is markup like this possible?
 */
scooter.controller("TabController", function () {
    this.tabs = [
        {'name': 'General', 'template': 'views/partial/_generalConfig.html'},
        {'name': 'Edit Players', 'template': 'views/partial/_playerMaintenance.html'},
        {'name': 'Meetup Integration', 'template': 'views/partial/_meetupIntegration.html'}
    ];

    this.tabContent = this.tabs[0].template;

    this.navigate = function (template) {
        this.tabContent = template;
    };
});