// obsJs v0.0.1
// (c) Shane Connon 2015
// http://www.opensource.org/licenses/mit-license.php
// objJs v0.1.0
// (c) Shane Connon 2015
// http://www.opensource.org/licenses/mit-license.php
!function(){window.objjs={};var a=objjs.object=function(){},b={parents:[],children:[]};a.clearVirtualCache=function(a){if(!a)return b.parents.length=0,void(b.children.length=0);for(var c=0,d=b.children.length;d>c;c++)(b.children[c]===a||b.parents[c]===a)&&(b.children.splice(c,1),b.parents.splice(c,1))},a.useVirtualCache=!0,a.prototype._super=function(){var c=arguments.callee.caller,d=null;if(a.useVirtualCache){var e=b.children.indexOf(c);-1!==e&&(d=b.parents[e])}if(!d){for(var f=[],g=this.constructor.prototype;g;)f.push(g),g=Object.getPrototypeOf(g);f.reverse();for(var h=0,i=f.length;i>h;h++){if(f[h]===c.prototype)d=f[h-1].constructor;else for(var j in f[h]){if(f[h][j]===c)for(var k=h-1;k>=0;k--)if(f[k][j]!==c){d=f[k][j];break}if(d)break}if(d){a.useVirtualCache&&(b.children.push(c),b.parents.push(d));break}}if(!d)throw"Could not find method in parent class"}return d.apply(this,arguments)};a.extend=function(b){if(b.constructor===Function){var c=b;b={constructor:c,statics:{}};for(var d in b.constructor)b.statics[g]=b.constructor[g];for(var d in b.constructor.prototype)b[g]=b.constructor.prototype[g]}else if(b.constructor===Object)b.constructor=function(){this._super.apply(this,arguments)};else if(!b.constructor||b.constructor.constructor!==Function)throw'the property "constructor" must be a function';for(var e in this)this.hasOwnProperty(e)&&this[e]&&this[e].constructor===Function&&this[e]!==a.clearVirtualCache&&void 0===b.constructor[e]&&(b.constructor[e]=this[e]);var f=function(){this.constructor=b.constructor};f.prototype=this.prototype,b.constructor.prototype=new f;for(var g in b)if("constructor"!==g)if("statics"!==g)b.constructor.prototype[g]=b[g];else for(var h in b[g])b.constructor[h]=b[g][h];return b.constructor},a.getInheritanceChain=function(a){for(var b=[];a;)b.push(a),a=Object.getPrototypeOf(a.prototype),a&&(a=a.constructor);return b}}();

!function(){function a(a,b,d,e){return function(f){var g=obsjs.getObserver(a);if(f&&g.$bindingChanges)for(var h in g.$bindingChanges)if(d===g.$bindingChanges[h].fromObject&&f[f.length-1]===g.$bindingChanges[h].change)return;obsjs.captureChanges(d,function(){obsjs.utils.obj.setObject(e,d,obsjs.utils.obj.getObject(b,a))},function(b){obsjs.makeObservable(d);c(b,function(b){var c=obsjs.getObserver(d);if(c){c.$bindingChanges||(c.$bindingChanges={});var e=i();c.$bindingChanges[e]={change:b,fromObject:a},setTimeout(function(){delete c.$bindingChanges[e];for(var a in c.$bindingChanges)return;delete c.$bindingChanges},100)}})})}}window.obsjs={};var b=obsjs.useObjectObserve=Object.observe&&(!window.hasOwnProperty("useObjectObserve")||window.useObjectObserve),c=function(a,b,c){if(a){c=c||window;for(var d=0,e=a.length;e>d;d++)b.call(c,a[d],d)}},d=function(a,b,c){if(a&&(c=c||window,null!=a))for(var d in a)b.call(c,a[d],d)},e=function(a,b){a=a.split(".");var c=a.splice(0,a.length-1),d={};return d[a[a.length-1]]=b(),f(c.join("."),d),d[a[a.length-1]]},f=function(a,b){if(a=a.split("."),"obsjs"!==a[0])throw'Root must be "obsjs".';a.splice(0,1);var e=obsjs;c(a,function(a){e=e[a]||(e[a]={})}),b&&b instanceof Function&&(b=b()),d(b,function(a,b){e[b]=a})},g=/^\s+|\s+$/g,h=function(a){return a?a.replace(g,""):a};e("obsjs.utils.obj",function(){function a(a,b){b||(b=window);for(var c=0,d=a.length;d>c;c++)if(b=b[a[c]],null==b)return c===d-1?b:null;return b}function b(a,b){a.push(b);var c=new obsjs.disposable(function(){c&&(c=null,b=a.indexOf(b),-1!==b&&a.splice(b,1))});return c}function e(a,b,c){var d,e=function(f,g){c&&(g=c(g));var h=obsjs.utils.obj.getObject(b,a);g!==h&&(e.dispose(),obsjs.observeTypes.computed.isArray(h)&&null==g?h.length=0:obsjs.observeTypes.computed.isArray(g)&&obsjs.observeTypes.computed.isArray(h)?g instanceof obsjs.array?d=g.bind(h):obsjs.array.copyAll(g,a[b]):obsjs.utils.obj.setObject(b,a,g))};return e.dispose=function(){d&&(d.dispose(),d=null)},e}var f=/\[\s*\d\s*\]$/g,g=function(a){a=a.split(".");for(var b,c=0;c<a.length;c++){a[c]=obsjs.utils.obj.trim(a[c]);var d=a[c].match(f);if(d&&d.length){(b=obsjs.utils.obj.trim(a[c].replace(f,"")))?a[c]=obsjs.utils.obj.trim(a[c].replace(f,"")):(a.splice(c,1),c--);for(var e=0,g=d.length;g>e;e++)a.splice(++c,0,parseInt(d[e].match(/\d/)[0]))}}return a},i=function(a){var b=[];return c(a,function(a){b.push(isNaN(a)?0===b.length?a:"."+a:"["+a+"]")}),b.join("")},j=function(b,c){return a(g(b),c)},k=function(b,c,d){var e={};return b=g(b),e.remainder=0>=d?b.splice(b.length+d,-1*d):b.splice(d,b.length-d),e.object=a(b,c,d),e},l=function(b,c,d){b=g(b),b.length>1&&(c=a(b.splice(0,b.length-1),c)),c&&(c[b[0]]=d)},m=function(){};return m.trim=h,m.createBindFunction=e,m.addWithDispose=b,m.enumerateArr=c,m.enumerateObj=d,m.getObject=j,m.getPartialObject=k,m.setObject=l,m.splitPropertyName=g,m.joinPropertyName=i,m}),e("obsjs.disposable",function(){function a(a){a.$disposables||(a.$disposables={})}var b=objjs.object.extend(function(a){this._super(),a&&(a instanceof Function?this.registerDisposeCallback(a):this.registerDisposable(a))});return b.prototype.disposeOf=function(a){if(a instanceof Array){var b=!1;return c(a,function(a){b|=this.disposeOf(a)},this),b}return this.$disposables&&this.$disposables[a]?(this.$disposables[a](),delete this.$disposables[a]):!1},b.prototype.disposeOfAll=function(){if(this.$disposables)for(var a in this.$disposables)this.disposeOf(a)},b.prototype.registerDisposeCallback=function(){var b=0;return function(c){if(!c||c.constructor!==Function)throw"The dispose function must be a Function";a(this);var d=(++b).toString();return this.$disposables[d]=c,d}}(),b.prototype.registerDisposable=function(a){if(a){if(a.constructor!==Function||a.dispose||(a=a.call(this)),!(a&&a.dispose instanceof Function))throw"The disposable object must have a dispose(...) function";return this.registerDisposeCallback(a.dispose.bind(a))}},b.prototype.dispose=function(){this.disposeOfAll()},b}),e("obsjs.utils.executeCallbacks",function(){var a=obsjs.disposable.extend(function b(){if(this.constructor===b)throw"You cannot create an instance of an abstract class";this._super(),this.callbacks=[]});return a.prototype.addCallback=function(a){var b=obsjs.utils.obj.addWithDispose(this.callbacks,a);return this.registerDisposable(b),b},a.prototype._execute=function(){throw"Abstract methods must be implemented"},a.prototype.execute=function(){var a=this._execute();a&&!a.cancel&&c(this.callbacks.slice(),function(b){b.apply(null,a.arguments||[])})},a.prototype.dispose=function(){this._super(),this.callbacks.length=0},a}),e("obsjs.observeTypes.observeTypesBase",function(){var a=obsjs.utils.executeCallbacks.extend(function b(){if(this.constructor===b)throw"You cannot create an instance of an abstract class";this._super()});return a.prototype.getValue=function(){throw"Abstract methods must be implemented"},a.prototype._execute=function(){var a=this.val;return this.val=this.getValue(),{cancel:this.val===a,arguments:[a,this.val]}},a}),e("obsjs.observableBase",function(){var a=obsjs.disposable.extend(function(a){this._super(),this.$changeBatch=[],this.$forObject=a,this.$callbacks={}});return a.prototype.registerChangeBatch=function(a){this.$changeBatch.length||setTimeout(this.processChangeBatch.bind(this)),this.$changeBatch.push.apply(this.$changeBatch,a)},a.prototype.processChangeBatch=function(){var b={};c(this.$changeBatch,function(a){b[a.name]||(b[a.name]=[]),b[a.name].push(a)}),this.$changeBatch.length=0,obsjs.utils.observeCycleHandler.instance.execute(this.$forObject||this,function(){var e=[];d(b,function(b,c){this.$callbacks[c]&&e.push.apply(e,a.processChanges(this.$callbacks[c],b))},this),c(e,function(a){a()})}.bind(this))},a.processChanges=function(a,b){var d=[],e=[];c(a,function(a,c){if(a.evaluateOnEachChange)for(var c=0,f=b.length;f>c;c++)a.evaluateSingle(b,c)&&d.push(c);else e.push(function(){a.evaluateMultiple(b)&&d.push(c)})}),d.sort(function(a,b){return b>a});for(var f=0,g=d.length;g>f;f++)a.splice(d[f],1);return e},a.prototype.onNextPropertyChange=function(){throw"Abstract methods must be overridden"},a.prototype.captureChanges=function(a,b,d){if(d&&(d=obsjs.utils.obj.splitPropertyName(d)).length>1)return obsjs.captureChanges(obsjs.utils.obj.getObject(d.slice(0,d.length-1).join("."),this.$forObject||this),a,b,d[d.length-1]);d=d&&d.length?d[0]:void 0;var e=d?function(a){var e=[];c(a,function(a){a.name==d&&e.push(a)}),b(e)}:b.bind(this);return d&&this._init(d),this._captureChanges(a,e)},a.prototype._captureChanges=function(){throw"Abstract methods must be overridden"},a.prototype.bind=function(a,b,c){return obsjs.bind(this,a,b,c)},a.prototype.observeArray=function(a,b,c,d){var e,f,g=this.observe(a,function(a,f){e&&(this.disposeOf(e),e=null);var g={object:f||[],index:0,addedCount:f instanceof Array?f.length:0,removed:a instanceof Array?a:[],type:"splice"};if(d&&d.evaluateOnEachChange)b.call(c,g);else{var h=new obsjs.utils.compiledArrayChange([g],0,1);b.call(c,h.getRemoved(),h.getAdded(),h.getIndexes())}f instanceof obsjs.array&&(e=this.registerDisposable(f.observe(b,c,d)))},this);return(f=obsjs.utils.obj.getObject(a,this.$forObject||this))instanceof obsjs.array&&(e=this.registerDisposable(f.observe(b,c,d))),new obsjs.disposable(function(){e&&(this.disposeOf(e),e=null),g&&(g.dispose(),g=null)})},a.prototype.observe=function(a,b,c,d){if(/[\.\[]/.test(a)){var e=new obsjs.observeTypes.pathObserver(this.$forObject||this,a,b,c);return this.registerDisposable(e),e}this._init(a);var f=new obsjs.callbacks.propertyCallback(b,c,d);this.$callbacks[a]||(this.$callbacks[a]=[]),this.$callbacks[a].push(f),d&&d.activateImmediately?f.activate():this.onNextPropertyChange(a,function(a){f.activate(a)});var g={dispose:function(b){g&&(g=null,b?this.onNextPropertyChange(a,function(a){f.deactivate(a)}):f.deactivate())}.bind(this)};return this.registerDisposable(g),g},a.prototype._init=function(){throw"Abstract methods must be implemented"},a.prototype.dispose=function(){this._super(),delete this.$forObject;for(var a in this.$callbacks)delete this.$callbacks[a]},a.prototype.computed=function(a,b,c){var d=new obsjs.observeTypes.computed(b,this,c);return d.bind(this.$forObject||this,a),this.registerDisposable(d),d},a.prototype.del=function(a){delete(this.$forObject||this)[a]},a.afterObserveCycle=function(a){return obsjs.utils.observeCycleHandler.instance.afterObserveCycle(a)},a.beforeObserveCycle=function(a){return obsjs.utils.observeCycleHandler.instance.beforeObserveCycle(a)},a.afterNextObserveCycle=function(a,b){if(0===obsjs.utils.observeCycleHandler.instance.length&&!b)return void a();var c=obsjs.utils.observeCycleHandler.instance.afterObserveCycle(function(){c.dispose(),a()});return c},a.beforeNextObserveCycle=function(a){var b=obsjs.utils.observeCycleHandler.instance.beforeObserveCycle(function(){b.dispose(),a()});return b},a}),e("obsjs.callbacks.changeCallback",function(){var a=objjs.object.extend(function(a){this._super(),this.evaluateOnEachChange=a});return a.dispose={},a.prototype.activate=function(a){if(this._activated||this._activatingChange)throw"This callback has been activated";arguments.length?this._activatingChange=a:this._activated=!0},a.prototype.deactivate=function(a){if(this._deactivatingChange)throw"This callback has a deactivate pending";arguments.length?this._deactivatingChange=a:this._activated=!1},a.prototype.evaluateSingle=function(b,c){if(this.evaluateOnEachChange){if(this._activated===!1||this.hasOwnProperty("_deactivatingChange")&&this._deactivatingChange===b[c])return this._activated=!1,a.dispose;if(!this.hasOwnProperty("_activated")){if(!this.hasOwnProperty("_activatingChange")||this._activatingChange!==b[c])return;this._activated=!0,delete this._activatingChange}this._evaluateSingle(b,c)}},a.prototype._evaluateSingle=function(){throw"Abstract methods must be implemented"},a.prototype.evaluateMultiple=function(b){if(!this.evaluateOnEachChange&&b.length){if(this._activated===!1)return a.dispose;var c=0,d=b.length,e=void 0;return this.hasOwnProperty("_activated")||(c=b.indexOf(this._activatingChange),-1!==c&&(this._activated=!0,delete this._activatingChange)),this._deactivatingChange&&(d=b.indexOf(this._deactivatingChange),-1===d?d=b.length:(e=a.dispose,this._activated=!1,delete this._deactivatingChange)),-1!==c&&d>c&&this._evaluateMultiple(b,c,d),e}},a.prototype._evaluateMultiple=function(){throw"Abstract methods must be implemented"},a}),e("obsjs.arrayBase",function(){function a(a){return"number"==typeof a&&a%1===0?a:null===a?0:"boolean"==typeof a?a?1:0:"string"!=typeof a||isNaN(a=parseFloat(a))||a%1!==0?void 0:a}var b=objjs.object.extend.call(Array,function(a){if(Array.call(this),arguments.length&&!(arguments[0]instanceof Array))throw"The initial values must be an array";if(this.$disposables=[],this.$boundArrays=[],this.$callbacks=[],this.$changeBatch=[],this.$length=a?a.length:0,a)for(var b=0,c=a.length;c>b;b++)this[b]=a[b]});b.prototype._super=objjs.object.prototype._super,b.extend=objjs.object.extend,b.isValidArrayChange=function(a){return"splice"===a.type||!isNaN(parseInt(a.name))},b.prototype.captureChanges=function(){throw"Abstract methods must be overridden"},b.prototype.onNextArrayChange=function(){throw"Abstract methods must be implemented"},b.prototype.processChangeBatch=function(){var a=this.$changeBatch.slice();this.$changeBatch.length=0,obsjs.utils.observeCycleHandler.instance.execute(this,function(){c(obsjs.observableBase.processChanges(this.$callbacks,a),function(a){a()})}.bind(this))},b.prototype.registerChangeBatch=function(a){for(var c=a.length-1;c>=0;c--)b.isValidArrayChange(a[c])||a.splice(c,1);return obsjs.observableBase.prototype.registerChangeBatch.call(this,a)},Object.defineProperty(b.prototype,"length",{set:function(b){if(void 0===(b=a(b)))throw RangeError("Invalid array length");if(b!==this.$length){if(!this.__alteringArray)if(b>this.$length){var c=new Array(b-this.length+2);c[0]=this.length,c[1]=0,this.splice.apply(this,c)}else b<this.$length&&this.splice(b,this.length-b);this.$length=b}},get:function(){return this.$length}}),b.prototype._init=function(){throw"Abstract methods must be implemented"},b.prototype.observe=function(a,b,c){if("string"==typeof arguments[0]){var d=Array.prototype.slice.call(arguments);return d.splice(0,0,this),obsjs.observe.apply(null,d)}return this.addCallback(new obsjs.callbacks.arrayCallback(a,b,c))},b.prototype.disposableFor=function(a){var b={dispose:function(c){b&&(b=null,c?this.onNextArrayChange(function(b){a.deactivate(b)}):a.deactivate())}.bind(this)};return b};var d="obsjs-do-not-apply-to";return b.prototype.alteringArray=function(a,b){if(this.__alteringArray)throw"Calls to alteringArray must be synchronus and not nested.";try{return this.__alteringArray=!0,c(this.$boundArrays,function(c){if(c[d])throw"Circular reference in array bindings found";this[d]!==c&&(c[d]=this,c[a].apply(c,b))},this),Array.prototype[a].apply(this,b)}finally{this.__alteringArray=!1,c(this.$boundArrays,function(a){delete a[d]})}},b.copyAll=function(a,b,d){var e;d?(e=[],c(a,function(a){e.push(d(a))})):e=a.slice(),e.splice(0,0,0,b.length),b.splice.apply(b,e)},b.prototype.bind=function(a){return a&&-1===this.$boundArrays.indexOf(a)?(this.$boundArrays.push(a),a instanceof obsjs.array&&-1!==a.$boundArrays.indexOf(this)||b.copyAll(this,a),new obsjs.disposable(function(){if(a){var b;-1!==(b=this.$boundArrays.indexOf(a))&&this.$boundArrays.splice(b,1),a=null}}.bind(this))):void 0},b.prototype.addCallback=function(a){this._init(),this.$callbacks.push(a),this.onNextArrayChange(function(b){a.activate(b)});var b=this.disposableFor(a);return this.$disposables.push(b),b},b.prototype.dispose=function(){c(this.$disposables,function(a){a.dispose()}),this.$disposables.length=0,this.$boundArrays.length=0,this.$callbacks.length=0},b}),b?e("obsjs.array",function(){var a=obsjs.arrayBase.extend(function(){this._super.apply(this,arguments)});return a.prototype.onNextArrayChange=function(a){var b=function(c){if(b)for(var d=0,e=c.length;e>d;d++)if(obsjs.arrayBase.isValidArrayChange(c[d]))return Array.unobserve(this,b),b=null,void a(c[d])}.bind(this);Array.observe(this,b)},a.prototype.captureArrayChanges=function(a,b){var c=function(a){a=a.slice();for(var c=a.length-1;c>=0;c--)obsjs.arrayBase.isValidArrayChange(a[c])||a.splice(c,1);b(a)};Array.observe(this,c),a(),Array.unobserve(this,c)},a.prototype._init=function(){this.__subscription||(this.__subscription=this.registerChangeBatch.bind(this),Array.observe(this,this.__subscription))},a.prototype.dispose=function(){this._super(),this.__subscription&&(Array.unobserve(this,this.__subscription),delete this.__subscription)},a}):e("obsjs.array",function(){var a=obsjs.arrayBase.extend(function(){this._super.apply(this,arguments),this.$onNextArrayChanges=[],this.$captureCallbacks=[]});return a.prototype.captureArrayChanges=function(a,b){var c=function(a){a=a.slice();for(var c=a.length-1;c>=0;c--)obsjs.arrayBase.isValidArrayChange(a[c])||a.splice(c,1);b(a)};this.$captureCallbacks.push(c),a(),this.$captureCallbacks.splice(this.$captureCallbacks.indexOf(c),1)},a.prototype.registerChangeBatch=function(a){for(var b=0,d=a.length;d>b;b++)if(obsjs.arrayBase.isValidArrayChange(a[b])){c(this.$onNextArrayChanges.splice(0,this.$onNextArrayChanges.length),function(c){c(a[b])});break}return c(this.$captureCallbacks,function(b){b(a)}),this._super(a)},a.prototype.onNextArrayChange=function(a){this.$onNextArrayChanges.push(a)},a.prototype._init=function(){},a}),function(){var a=obsjs.array;a.prototype.replace=function(a,b){return this.splice(a,a>=this.length?0:1,b),b},a.prototype.pop=function(){return b||this.length&&this.registerChangeBatch([{addedCount:0,index:this.length-1,object:this,removed:[this[this.length-1]],type:"splice"}]),this.alteringArray("pop")},a.prototype.shift=function(){return b||this.length&&this.registerChangeBatch([{addedCount:0,index:0,object:this,removed:[this[0]],type:"splice"}]),this.alteringArray("shift")},a.prototype.remove=function(a){var b;-1!==(b=this.indexOf(a))&&this.splice(b,1)},a.prototype.push=function(){return b||this.registerChangeBatch([{addedCount:arguments.length,index:this.length,object:this,removed:[],type:"splice"}]),this.alteringArray("push",arguments)},a.prototype.reverse=function(){var a=this.length;if(!(2>a)){if(!b){for(var c,d=Math.floor(a/2),e=[],f=0;d>f;f++)e.push({name:f.toString(),object:this,oldValue:this[f],type:"update"}),c=a-f-1,e.push({name:c.toString(),object:this,oldValue:this[c],type:"update"});this.registerChangeBatch(e)}return this.alteringArray("reverse")}},a.prototype.sort=function(){if(!b){for(var a=this.slice(),c=[],d=this.alteringArray("sort",arguments),e=0,f=a.length;f>e;e++)a[e]!==this[e]&&c.push({name:e.toString(),object:this,oldValue:a[e],type:"update"});return this.registerChangeBatch(c),d}return this.alteringArray("sort",arguments)},a.prototype.splice=function(a,c){if(!b){for(var d=[],e=a,f=c+a>this.length?this.length:c+a;f>e;e++)d.push(this[e]);this.registerChangeBatch([{addedCount:arguments.length-2,index:a,object:this,removed:d,type:"splice"}])}return this.alteringArray("splice",arguments)}}(),e("obsjs.callbacks.arrayCallback",function(){var a=obsjs.callbacks.changeCallback.extend(function(a,b,c){this._super(c&&c.evaluateOnEachChange),this.useRawChanges=c&&c.useRawChanges,this.callback=a,this.context=b});return a.prototype._evaluateSingle=function(a,b){this.callback.call(this.context,a[b])},a.prototype._evaluateMultiple=function(a,b,c){if(this.useRawChanges)return void this.callback.call(this.context,a.slice(b,c));a.compiled||(a.compiled=[]);for(var d,e=0,f=a.compiled.length;f>e;e++)if(a.compiled[e].areEqual(b,c)){d=a.compiled[e];break}d||a.compiled.push(d=new obsjs.utils.compiledArrayChange(a,b,c)),this._evaluateArrayMultiple(d)},a.prototype._evaluateArrayMultiple=function(a){this.callback.call(this.context,a.getRemoved(),a.getAdded(),a.getIndexes())},a}),e("obsjs.callbacks.propertyCallback",function(){var a=obsjs.callbacks.changeCallback.extend(function(a,b,c){this._super(c&&c.evaluateOnEachChange),this.callback=a,this.context=b,this.evaluateIfValueHasNotChanged=c&&c.evaluateIfValueHasNotChanged,this.useRawChanges=c&&c.useRawChanges});return a.prototype._evaluateSingle=function(a,b){var c=a[b],d=a[b+1],e=d?d.oldValue:c.object[c.name];this.useRawChanges?this.callback.call(this.context,c):(this.evaluateIfValueHasNotChanged||e!==c.oldValue)&&this.callback.call(this.context,c.oldValue,e)},a.prototype._evaluateMultiple=function(a,b,c){var d=a[c]?a[c].oldValue:a[0].object[a[0].name];this.useRawChanges?this.callback.call(this.context,a.slice(b,c)):(this.evaluateIfValueHasNotChanged||d!==a[b].oldValue)&&this.callback.call(this.context,a[b].oldValue,d)},a});b?e("obsjs.observable",function(){var a=obsjs.observableBase.extend(function(a){this._super(a)});return a.prototype.onNextPropertyChange=function(a,b){var c=function(d){if(c)for(var e=0,f=d.length;f>e;e++)if(d[e].name==a){var g=c;return Object.unobserve(this.$forObject||this,g),c=null,void b(d[e])}}.bind(this);Object.observe(this.$forObject||this,c)},a.prototype._captureChanges=function(a,b){Object.observe(this.$forObject||this,b),a(),Object.unobserve(this.$forObject||this,b)},a.prototype._init=function(){this.__subscribeCallback||(this.__subscribeCallback=this.registerChangeBatch.bind(this),Object.observe(this.$forObject||this,this.__subscribeCallback))},a.prototype.dispose=function(){this._super(),this.__subscribeCallback&&(Object.unobserve(this.$forObject||this,this.__subscribeCallback),delete this.__subscribeCallback)},a}):e("obsjs.observable",function(){function a(a){return a.$observer||a}var b=obsjs.observableBase.extend(function(a){this._super(a),this.$observed={},this.$onNextPropertyChanges={},this.$captureCallbacks=[]});return b.prototype.onNextPropertyChange=function(a,b){(this.$onNextPropertyChanges[a]||(this.$onNextPropertyChanges[a]=[])).push(b)},b.prototype._captureChanges=function(a,b){this.$captureCallbacks.push(b),a(),this.$captureCallbacks.splice(this.$captureCallbacks.indexOf(b),1)},b.prototype._init=function(b){this.$observed.hasOwnProperty(b)||((this.$forObject||this).hasOwnProperty(b)&&(this.$observed[b]=(this.$forObject||this)[b]),Object.defineProperty(this.$forObject||this,b,{get:function(){return a(this).$observed[b]},set:function(d){var e=a(this),f={type:e.$observed.hasOwnProperty(b)?"update":"add",name:b,object:this,oldValue:e.$observed[b]};if(e.$observed[b]=d,e.$onNextPropertyChanges[b]){var g=e.$onNextPropertyChanges[b];delete e.$onNextPropertyChanges[b],setTimeout(function(){c(g,function(a){a(f)})})}e.addChange(f)},enumerable:!0,configurable:!0}))},b.prototype.addChange=function(a){this.__changeToken||(this.__changeToken=[],setTimeout(function(){var a=this.__changeToken;delete this.__changeToken,this.registerChangeBatch(a)}.bind(this))),this.__changeToken.push(a),c(this.$captureCallbacks,function(b){b([a])})},b.prototype.del=function(a){(this.$forObject||this)[a]=void 0,this._super(a)},b.prototype.dispose=function(){this._super();for(var a in this.$onNextPropertyChanges)delete this.$onNextPropertyChanges[a]},b});e("obsjs.observeTypes.computed",function(){var a=/\s*with\s*\(/g,b=/([^\s,]+)/g,d=/\/\/.*$/gm,e=/\/\*[\s\S]*?\*\//gm,f="((\\s*\\.\\s*([\\w\\$]*))|(\\s*\\[\\s*\\d\\s*\\]))+",g={},i=obsjs.observeTypes.observeTypesBase.extend(function l(a,d,e){if(this._super(),e=e||{},this.arguments=[],e.observeArrayElements&&(this.possibleArrays=[]),this.callbacks=[],this.callbackString=l.stripFunction(a),this.callbackFunction=a,this.context=d,!e.allowWith&&l.testForWith(this.callbackString))throw'You cannot use the "with" keyword in computed functions by default. To allow "with", use the allowWith flag on the options argument of the constructor, however, properties of the variable within the "with" statement cannot be monitored for change.';var f=this.callbackString.slice(this.callbackString.indexOf("(")+1,this.callbackString.indexOf(")")).match(b)||[];if(e.watchVariables&&f.length){var h;for(var i in e.watchVariables)-1!==(h=f.indexOf(i))&&(this.arguments[h]=e.watchVariables[i],f[h]=g)}if(c(f,function(a){if(a!==g)throw'Argument "'+a+'" must be added as a watch variable.'}),this.watchVariable("this",d,e.observeArrayElements),e.watchVariables)for(var i in e.watchVariables)this.watchVariable(i,e.watchVariables[i],e.observeArrayElements);this.execute()});i.testForWith=function(b){for(a.lastIndex=0;a.exec(b);)if(!/[\.\w\$]/.test(b[a.lastIndex-1]))return!0;return!1},i.prototype.rebuildArrays=function(){c(this.possibleArrays,function(a){a.disposeKeys&&a.disposeKeys.length&&(this.disposeOf(a.disposeKeys),a.disposeKeys.length=0);var b=a.path.length?obsjs.utils.obj.getObject(a.path,a.root):a.root;b instanceof Array&&(a.disposeKeys=a.disposeKeys||[],c(b,function(b){c(a.subPaths,function(c){a.disposeKeys.push(this.addPathWatchFor(b,c))},this)},this))},this)},i.prototype.getValue=function(){return this.possibleArrays&&this.rebuildArrays(),this.callbackFunction.apply(this.context,this.arguments)},i.prototype.bind=function(a,b){var c=obsjs.utils.obj.createBindFunction(a,b),d=this.onValueChanged(c,!0);return d.registerDisposable(c),d},i.prototype.onValueChanged=function(a,b){var c=this.addCallback(a);return b&&a(void 0,this.val),c},i.stripFunction=function(a){a=a.toString().replace(d,"").replace(e,"");for(var b=/["']/g;b.exec(a);){var c="'"===a[b.lastIndex-1]?/'/g:/"/g;for(c.lastIndex=b.lastIndex;c.exec(a);){for(var f=0,g=c.lastIndex-2;"\\"===a[g];g--)f++;if(f%2===0){a=a.substr(0,b.lastIndex-1)+"#"+a.substr(c.lastIndex);break}}}return a},i.prototype.examineVariable=function(a,b){if(a=h(a),!/^[\$\w]+$/.test(a))throw"Invalid variable name. Variable names can only contain 0-9, a-z, A-Z, _ and $";for(var c,d,e,g,i=[],j=a.replace("$","\\$"),k=new RegExp((b?"(":"")+j+f+(b?")|"+j:""),"g"),l=[];null!==(c=k.exec(this.callbackString));)if(e=k.lastIndex-c[0].length,-1===(g=l.indexOf(d=c[0].replace(/\s/g,"")))||b){if(e>0){if(-1!==this.callbackString[e-1].search(/[\w\$]/))continue;for(var m=e-1;m>=0;m--){if("."===this.callbackString[m]){d=null;break}if(0!==this.callbackString[m].search(/\s/))break}}null!==d&&(-1===g&&(l.push(d),g=i.length,i.push({variableName:d,complexResults:[]})),b&&i[g].complexResults.push({name:c[0],index:e}))}return i},i.prototype.watchVariable=function(a,b,d){var e,f,g=this.examineVariable(a,d);c(g,function(a){if(e=obsjs.utils.obj.splitPropertyName(a.variableName),e.length>1&&this.addPathWatchFor(b,obsjs.utils.obj.joinPropertyName(e.slice(1))),d){var g;c(a.complexResults,function(a){(f=this.examineArrayProperties(a.name,a.index))&&(g?g.subPaths.push(f):this.possibleArrays.push(g={root:b,path:obsjs.utils.obj.joinPropertyName(e.slice(1)),subPaths:[f]}))},this)}},this)};var j=new RegExp("^\\s*\\[\\s*[\\w\\$]+\\s*\\]\\s*"+f);i.prototype.examineArrayProperties=function(a,b){var c;return(c=j.exec(this.callbackString.substr(b+a.length)))?(c=c[0].substr(c[0].indexOf("]")+1).replace(/\s/g,""),"."===c[0]?c.substring(1):c):void 0},i.prototype.addPathWatchFor=function(a,b){var c,b=new obsjs.observeTypes.pathObserver(a,b,this.execute,this),d=this.execute.bind(this);return b.onValueChanged(function(a,b){c&&(c.dispose(),c=null),b instanceof obsjs.array&&(c=b.observe(d))},!0),this.registerDisposable(b)};var k=[];return i.isArray=function(a){if(a instanceof Array){for(var b=0,c=k.length;c>b;b++)if(a instanceof k[b])return!1;return!0}return!1},i.nonArrayType=function(a){if(!(a instanceof Function))throw"The type argument must be a function or constructor";-1===k.indexOf(a)&&k.push(a)},i}),e("obsjs.observeTypes.pathObserver",function(){var a=obsjs.observeTypes.observeTypesBase.extend(function(a,b,c,d){this._super(),this.forObject=a,this.property=b,this.path=obsjs.utils.obj.splitPropertyName(b),this.__pathDisposables=new Array(this.path.length),this.execute(),this.buildObservableChain(),this.init=!0,this.callbacks=[],c&&this.onValueChanged(c.bind(d||a),!1)});return a.prototype.onValueChanged=function(a,b){var c=this.addCallback(a);return b&&a(void 0,this.val),c},a.prototype.buildObservableChain=function(a){a=a||0;for(var b=a;b<this.path.length;b++)this.__pathDisposables[b]&&(this.__pathDisposables[b].dispose(),this.__pathDisposables[b]=null);var c=this.forObject,d=this;for(b=0;c&&a>b;b++)c=c[this.path[b]];for(;c&&b<this.path.length-1;b++){if((obsjs.canObserve(c)||c instanceof obsjs.array)&&c[this.path[b]]&&b>=a){var e=[c,function(a){return function(){d.buildObservableChain(a),d.execute()}}(b)];isNaN(this.path[b])&&e.splice(1,0,this.path[b]),this.__pathDisposables[b]=obsjs.tryObserve.apply(null,e)}c=c[this.path[b]]}obsjs.canObserve(c)&&(this.__pathDisposables[b]=obsjs.tryObserve(c,this.path[b],function(){this.execute()},this))},a.prototype.getValue=function(){for(var a=this.forObject,b=0,c=this.path.length;null!=a&&c>b;b++)a=a[this.path[b]];return b===c?a:null},a.prototype.dispose=function(){this._super();for(var a=0,b=this.__pathDisposables.length;b>a&&this.__pathDisposables[a];a++)this.__pathDisposables[a]&&this.__pathDisposables[a].dispose();this.__pathDisposables.length=0},a}),e("obsjs.utils.compiledArrayChange",function(){function a(a,b,c){this.beginAt=b,this.endAt=c,this.changes=[],this.build(a)}return a.prototype.buildIndexes=function(){if(!this.indexes){var a,b,d=[],e=[],f=[],g=[],h=[],i=[],j=this.added.slice();c(this.finalArray,function(b,c){(c>=this.beginArray.length||b!==this.beginArray[c])&&(-1!==(a=j.indexOf(b))?(g.push({value:b,index:c}),j.splice(a,1)):f[c]=b)},this);var k=this.removed.slice();c(this.beginArray,function(b,c){(c>=this.finalArray.length||b!==this.finalArray[c])&&(-1!==(a=k.indexOf(b))?(h.push({value:b,index:c}),k.splice(a,1)):(d.push(b),e.push(c)))},this);for(var l={};d.length;)a=d.shift(),b=f.indexOf(a),f[b]=l,i.push({value:a,from:e.shift(),to:b});this.indexes={moved:i,added:g,removed:h}}},a.prototype.build=function(a){if(this.removed=[],this.added=[],!a.length||this.beginAt>=this.endAt)return void(this.indexes={added:[],removed:[],moved:[]});for(var b,d,e,f,g=a[0].object.slice(),h=a.length-1;h>=this.beginAt;h--)b="splice"===a[h].type?a[h]:{addedCount:1,index:parseInt(a[h].name),removed:[a[h].oldValue]},h<this.endAt&&(this.finalArray||(this.finalArray=g.slice()),f=0,c(b.removed,function(a){-1===(e=this.added.indexOf(a))?(this.removed.splice(f,0,a),f++):this.added.splice(e,1)},this),f=0,c(g.slice(b.index,b.index+b.addedCount),function(a){-1===(e=this.removed.indexOf(a))?(this.added.splice(f,0,a),f++):this.removed.splice(e,1)},this),this.changes.splice(0,0,{index:b.index,added:g.slice(b.index,b.index+b.addedCount),removed:b.removed,change:a[h]})),d=b.removed.slice(),d.splice(0,0,b.index,b.addedCount),g.splice.apply(g,d);this.beginArray=g.slice()},a.prototype.areEqual=function(a,b){return this.beginAt===a&&this.endAt===b},a.prototype.getRemoved=function(){return this.removed.slice()},a.prototype.getAdded=function(){return this.added.slice()},a.prototype.getIndexes=function(){return this.indexes||this.buildIndexes(),{added:this.indexes.added.slice(),removed:this.indexes.removed.slice(),moved:this.indexes.moved.slice()}},a}),e("obsjs.utils.observeCycleHandler",function(){function a(a){a()}var b=obsjs.observable.extend(function(){this._super(),this.$afterObserveCycles=[],this.$beforeObserveCycles=[],this.length=0,this.observe("length",function(b,d){0===d&&c(this.$afterObserveCycles.slice(),a)},this,{evaluateOnEachChange:!1,evaluateIfValueHasNotChanged:!0})});return b.prototype.execute=function(a,b){try{this.before(a),b()}finally{this.after(a)}},b.prototype.before=function(b){b!==this&&(0===this.length&&c(this.$beforeObserveCycles.slice(),a),this.length++)},b.prototype.clear=function(){this.length>0&&(this.length=0)},b.prototype.after=function(a){a===this||this.length<=0||this.length--},b.prototype.afterObserveCycle=function(a){return obsjs.utils.obj.addWithDispose(this.$afterObserveCycles,a)},b.prototype.befreObserveCycle=function(a){return obsjs.utils.obj.addWithDispose(this.$beforeObserveCycles,a)},b.prototype.dispose=function(){this._super(),this.$afterObserveCycles.length=0,this.$beforeObserveCycles.length=0},b.instance=new b,b}),obsjs.getObserver=function(a){return null==a||a instanceof obsjs.observableBase?a:a.$observer instanceof obsjs.observableBase?a.$observer:null},obsjs.captureArrayChanges=function(a,b,c){if(!(a instanceof obsjs.array))throw"Only obsjs.array objects can have changes captured";return a.captureArrayChanges(b,c)},obsjs.captureChanges=function(a,b,c,d){return(a=obsjs.getObserver(a))?a.captureChanges(b,c,d):void b()},obsjs.makeObservable=function(a){if(arguments.length||(a={}),a instanceof obsjs.array){if(obsjs.getObserver(a))return a}else if(obsjs.canObserve(a))return a;if(a.$observer)throw"The $observer property is reserved";return Object.defineProperty(a,"$observer",{enumerable:!1,configurable:!1,value:new obsjs.observable(a),writable:!1}),a},obsjs.observe=function(a,b,c,d,e,f){return obsjs.makeObservable(a),obsjs.tryObserve(a,b,c,d,e,f)},obsjs.tryObserve=function(a,b,c,d,e){if(a instanceof obsjs.array){if(b instanceof Function)return a.observe(arguments[1],arguments[2],arguments[3]);"length"===b&&(b="$length"),obsjs.makeObservable(a)}var f=obsjs.getObserver(a);return f?f.observe(b,c,d,e):!1},obsjs.observeArray=function(a,b,c,d,e){return obsjs.makeObservable(a),obsjs.tryObserveArray(a,b,c,d,e)},obsjs.tryObserveArray=function(a,b,c,d,e){var f=obsjs.getObserver(a);return f?f.observeArray(b,c,d,e):!1},obsjs.tryBindArrays=function(a,b){if(!obsjs.observeTypes.computed.isArray(a)&&null!=a||!obsjs.observeTypes.computed.isArray(b)&&null!=b)throw"You cannot bind a value to an array. Arrays can only be bound to other arrays.";if(null!=a||null!=b)if(null==a)b.length=0;else if(null!=b){if(a instanceof obsjs.array)return a.bind(b);obsjs.array.copyAll(a,b)}};var i=function(){var a=0;return function(){return"ch-"+ ++a}}();obsjs.tryBind=function(b,c,d,e,f,g){function h(){i&&(k.disposseOf(i),disp=null);var f=obsjs.utils.obj.getObject(c,b),h=obsjs.utils.obj.getObject(e,d);obsjs.observeTypes.computed.isArray(f)||obsjs.observeTypes.computed.isArray(h)?i=k.registerDisposable(obsjs.tryBindArrays(f,h)):g?g=void 0:(j||(j=a(b,c,d,e))).apply(this,arguments)
}var i,j,k=new obsjs.disposable;return k.registerDisposable(obsjs.tryObserve(b,c,h,null,{useRawChanges:!0})),h(),f&&k.registerDisposable(obsjs.tryBind(d,e,b,c,!1,!0)),k},obsjs.bind=function(a,b,c,d,e){return obsjs.makeObservable(a),obsjs.makeObservable(c),obsjs.tryBind(a,b,c,d,e)},obsjs.canObserve=function(a){return a instanceof obsjs.array||!!obsjs.getObserver(a)},obsjs.del=function(a,b){var c=obsjs.getObserver(a);return c?c.del(b):void 0},obsjs.dispose=function(a){var b=obsjs.getObserver(a);return b?b.dispose():void 0}}();