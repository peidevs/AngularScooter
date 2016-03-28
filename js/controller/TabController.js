scooter.controller("TabController", function () {
    this.tabs = [
        {'name': 'General', 'template': 'generalTemplate.tmpl'},
        {'name': 'Edit Players', 'template': 'playerMaintenance.tmpl'},
        {'name': 'Meetup Integration', 'template': 'meetupIntegration.tmpl'}
    ];

    this.tabContent = this.tabs[0].template;

    this.navigate = function (template) {
        this.tabContent = template;
    };
});