define([
	'require',
	'dojo/_base/declare',
	'../../_base/_View'<% if (hasHtml) { %>,
	'dijit/_TemplatedMixin',
	'dojo/text!./templates/<%= componentName %>.html'<% } %>
], function(
	require,
	declare,
	_View<% if (hasHtml) { %>,
	_TemplatedMixin,
	<%= componentName %>Template<% } %>
) {
	return declare([_View, _TemplatedMixin], {
		<% if (hasHtml) { %>baseClass: 'w-<%= componentName %>',
		templateString: <%= componentName %>Template,<% } %>

		// myValue: false,
		// _setMyValueAttr: function(myValue) {
		// 	this._set('myValue', myValue);
		// },

		// postCreate: function() {}
	});
});
