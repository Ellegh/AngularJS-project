import $ from 'jquery';
import jQuery from 'jquery';
// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angularjs-datepicker';
//import ngStorage from 'ngStorage';

// css
import '../static/css/app.scss';

// components
import mainApp from './app.component';
import taskOne from './components/taskOne/task-one.component';
import taskTwo from './components/taskTwo/task-two.component';

// services
import appService from './app.service';

// routing
import routing from './app.route';

// directives
import fileReaderDirective from './components/taskOne/task-one.directive';

// constants
const MODULE_NAME = 'app';
require('../index.html');

angular.module(MODULE_NAME, [uiRouter, ngSanitize, ngAnimate, uiBootstrap, '720kb.datepicker'])
    // components
    .component('myApp', mainApp)
    .component('taskOne', taskOne)
    .component('taskTwo', taskTwo)
    .service('appService', appService)
    .directive('fileReader', fileReaderDirective)
    .config(routing)

export default MODULE_NAME;

