/**
 * We proxy the svelte config from ui here, in order for the vscode
 * svelte plugin to understand our specific needs. The vscode plugin would
 * otherwise break when you try to use the reusable scss that is available under
 * the namespace 'ui'.
 */
module.exports = require('@wetransfer/wallpaper-ui/svelte.config.js');
