Ext.define('Starter.Application', {
	extend: 'Ext.app.Application',
	requires: [ 'Ext.plugin.Viewport', 'Starter.*', 'Ext.direct.*', 'Ext.window.Toast', 'Ext.form.action.DirectSubmit', 'Ext.form.action.DirectLoad', 'Ext.container.Container' ],
	name: 'Starter',

	controllers: [ 'Root' ],

	stores: [ 'Companies', 'Departments' ],

	models: [ 'PageHit', 'User' ],

	constructor: function() {
		// <debug>
		Ext.Ajax.on('beforerequest', function(conn, options, eOpts) {
			options.withCredentials = true;
		}, this);
		// </debug>

		var chartDataPoller = new Ext.direct.PollingProvider({
			id: 'chartDataPoller',
			type: 'polling',
			interval: 5 * 1000, // 5 seconds
			url: serverUrl + POLLING_URLS.chart
		});

		REMOTING_API.url = serverUrl + REMOTING_API.url;
		Ext.direct.Manager.addProvider(REMOTING_API, chartDataPoller);
		Ext.direct.Manager.getProvider('chartDataPoller').disconnect();

		this.callParent(arguments);
	},

	launch: function() {
		Ext.fly('loading_container').destroy();
	},

	onAppUpdate: function() {
		window.location.reload();
	}
});
