/*
 *
 * Copyright 2018 Odysseus Data Services, inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 * Company: Odysseus Data Services, Inc.
 * Product Owner/Architecture: Gregory Klebanov
 * Authors: Alexandr Saltykov, Pavel Grafkin, Vitaly Koulakov, Anton Gackovka
 * Created: March 3, 2017
 *
 */

// polyfills
import './styles/appContainer.scss';
//import 'whatwg-fetch';
import 'es6-promise/auto';
//import 'core-js/fn/object/values';
//import 'core-js/fn/object/assign';
//import 'core-js/fn/array/find';

import * as ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
//import { StartAnalytics } from 'services/Gtagger';

if (!Array.prototype.includes) {
	Array.prototype.includes = function(value){
		return this.indexOf(value) > -1;
	}
}

const rootEl = document.getElementById('app');
bootstrap().then(app => {
	ReactDOM.render(app, rootEl);
	//StartAnalytics();
});