// obsJs v0.1.0
// (c) Shane Connon 2015
// http://www.opensource.org/licenses/mit-license.php
// objJs v0.1.0
// (c) Shane Connon 2015
// http://www.opensource.org/licenses/mit-license.php
!function(){window.objjs={};var a=objjs.object=function(){},b={parents:[],children:[]};a.clearVirtualCache=function(a){if(!a)return b.parents.length=0,void(b.children.length=0);for(var c=0,d=b.children.length;d>c;c++)(b.children[c]===a||b.parents[c]===a)&&(b.children.splice(c,1),b.parents.splice(c,1))},a.useVirtualCache=!0,a.prototype._super=function(){var c=arguments.callee.caller,d=null;if(a.useVirtualCache){var e=b.children.indexOf(c);-1!==e&&(d=b.parents[e])}if(!d){for(var f=[],g=this.constructor.prototype;g;)f.push(g),g=Object.getPrototypeOf(g);f.reverse();for(var h=0,i=f.length;i>h;h++){if(f[h]===c.prototype)d=f[h-1].constructor;else for(var j in f[h]){if(f[h][j]===c)for(var k=h-1;k>=0;k--)if(f[k][j]!==c){d=f[k][j];break}if(d)break}if(d){a.useVirtualCache&&(b.children.push(c),b.parents.push(d));break}}if(!d)throw"Could not find method in parent class"}return d.apply(this,arguments)};a.extend=function(b){if(b.constructor===Function){var c=b;b={constructor:c,statics:{}};for(var d in b.constructor)b.statics[g]=b.constructor[g];for(var d in b.constructor.prototype)b[g]=b.constructor.prototype[g]}else if(b.constructor===Object)b.constructor=function(){this._super.apply(this,arguments)};else if(!b.constructor||b.constructor.constructor!==Function)throw'the property "constructor" must be a function';for(var e in this)this.hasOwnProperty(e)&&this[e]&&this[e].constructor===Function&&this[e]!==a.clearVirtualCache&&void 0===b.constructor[e]&&(b.constructor[e]=this[e]);var f=function(){this.constructor=b.constructor};f.prototype=this.prototype,b.constructor.prototype=new f;for(var g in b)if("constructor"!==g)if("statics"!==g)b.constructor.prototype[g]=b[g];else for(var h in b[g])b.constructor[h]=b[g][h];return b.constructor},a.getInheritanceChain=function(a){for(var b=[];a;)b.push(a),a=Object.getPrototypeOf(a.prototype),a&&(a=a.constructor);return b}}();

!function(){window.objjs={};var a=objjs.object=function(){},b={parents:[],children:[]};a.clearVirtualCache=function(a){if(!a)return b.parents.length=0,void(b.children.length=0);for(var c=0,d=b.children.length;d>c;c++)(b.children[c]===a||b.parents[c]===a)&&(b.children.splice(c,1),b.parents.splice(c,1))},a.useVirtualCache=!0,a.prototype._super=function(){var c=arguments.callee.caller,d=null;if(a.useVirtualCache){var e=b.children.indexOf(c);-1!==e&&(d=b.parents[e])}if(!d){for(var f=[],g=this.constructor.prototype;g;)f.push(g),g=Object.getPrototypeOf(g);f.reverse();for(var h=0,i=f.length;i>h;h++){if(f[h]===c.prototype)d=f[h-1].constructor;else for(var j in f[h]){if(f[h][j]===c)for(var k=h-1;k>=0;k--)if(f[k][j]!==c){d=f[k][j];break}if(d)break}if(d){a.useVirtualCache&&(b.children.push(c),b.parents.push(d));break}}if(!d)throw"Could not find method in parent class"}return d.apply(this,arguments)};a.extend=function(b){if(b.constructor===Function){var c=b;b={constructor:c,statics:{}};for(var d in b.constructor)b.statics[g]=b.constructor[g];for(var d in b.constructor.prototype)b[g]=b.constructor.prototype[g]}else if(b.constructor===Object)b.constructor=function(){this._super.apply(this,arguments)};else if(!b.constructor||b.constructor.constructor!==Function)throw'the property "constructor" must be a function';for(var e in this)this.hasOwnProperty(e)&&this[e]&&this[e].constructor===Function&&this[e]!==a.clearVirtualCache&&void 0===b.constructor[e]&&(b.constructor[e]=this[e]);var f=function(){this.constructor=b.constructor};f.prototype=this.prototype,b.constructor.prototype=new f;for(var g in b)if("constructor"!==g)if("statics"!==g)b.constructor.prototype[g]=b[g];else for(var h in b[g])b.constructor[h]=b[g][h];return b.constructor},a.getInheritanceChain=function(a){for(var b=[];a;)b.push(a),a=Object.getPrototypeOf(a.prototype),a&&(a=a.constructor);return b}}(),function(){window.obsjs={};var a=obsjs.useObjectObserve=Object.observe&&(!window.hasOwnProperty("useObjectObserve")||window.useObjectObserve),b=function(a,b,c){if(a){c=c||window;for(var d=0,e=a.length;e>d;d++)b.call(c,a[d],d)}},c=function(a,b,c){if(a&&(c=c||window,null!=a))for(var d in a)b.call(c,a[d],d)},d=function(a,b){a=a.split(".");var c=a.splice(0,a.length-1),d={};return d[a[a.length-1]]=b(),e(c.join("."),d),d[a[a.length-1]]},e=function(a,d){if(a=a.split("."),"obsjs"!==a[0])throw'Root must be "obsjs".';a.splice(0,1);var e=obsjs;b(a,function(a){e=e[a]||(e[a]={})}),d&&d instanceof Function&&(d=d()),c(d,function(a,b){e[b]=a})},f=/^\s+|\s+$/g,g=function(a){return a?a.replace(f,""):a};d("obsjs.utils.obj",function(){function a(a,b){b||(b=window);for(var c=0,d=a.length;d>c;c++)if(b=b[a[c]],null==b)return null;return b}var d=/\[\s*\d\s*\]$/g,e=function(a){a=a.split(".");for(var b,c=0;c<a.length;c++){a[c]=obsjs.utils.obj.trim(a[c]);var e=a[c].match(d);if(e&&e.length){(b=obsjs.utils.obj.trim(a[c].replace(d,"")))?a[c]=obsjs.utils.obj.trim(a[c].replace(d,"")):(a.splice(c,1),c--);for(var f=0,g=e.length;g>f;f++)a.splice(++c,0,parseInt(e[f].match(/\d/)[0]))}}return a},f=function(a){var c=[];return b(a,function(a){c.push(isNaN(a)?0===c.length?a:"."+a:"["+a+"]")}),c.join("")},h=function(b,c){return a(e(b),c)},i=function(b,c,d){b=e(b),b.length>1&&(c=a(b.splice(0,b.length-1),c)),c[b[0]]=d},j=function(){};return j.trim=g,j.enumerateArr=b,j.enumerateObj=c,j.getObject=h,j.setObject=i,j.splitPropertyName=e,j.joinPropertyName=f,j}),d("obsjs.disposable",function(){var a=objjs.object.extend(function(a){this._super(),this.$disposables={},a&&(a instanceof Function?this.registerDisposeCallback(a):this.registerDispose(a))});return a.prototype.disposeOf=function(a){this.$disposables[a]&&(this.$disposables[a](),delete this.$disposables[a])},a.prototype.disposeOfAll=function(){for(var a in this.$disposables)this.disposeOf(a)},a.prototype.registerDisposeCallback=function(){var a=0;return function(b){if(!b||b.constructor!==Function)throw"The dispose function must be a Function";var c=(++a).toString();return this.$disposables[c]=b,c}}(),a.prototype.registerDisposable=function(a){if(!a)throw"Invalid disposeable object";if(a.constructor!==Function||a.dispose||(a=a.call(this)),!(a&&a.dispose instanceof Function))throw"The disposable object must have a dispose(...) function";return this.registerDisposeCallback(a.dispose.bind(a))},a.prototype.dispose=function(){this.disposeOfAll()},a}),d("obsjs.observableBase",function(){var a=obsjs.disposable.extend(function(a){this._super(),this.$changeBatch=[],this.$forObject=a,this.$callbacks={}});return a.prototype.registerChangeBatch=function(a){this.$changeBatch.length||setTimeout(this.processChangeBatch.bind(this)),this.$changeBatch.push.apply(this.$changeBatch,a)},a.prototype.processChangeBatch=function(){var d={};b(this.$changeBatch,function(a){d[a.name]||(d[a.name]=[]),d[a.name].push(a)}),this.$changeBatch.length=0,obsjs.utils.observeCycleHandler.instance.before(this.$forObject||this);var e=[];c(d,function(b,c){this.$callbacks[c]&&e.push.apply(e,a.processChanges(this.$callbacks[c],b))},this),b(e,function(a){a()}),obsjs.utils.observeCycleHandler.instance.after(this.$forObject||this)},a.processChanges=function(a,c){var d=[],e=[];b(a,function(a,b){if(a.evaluateOnEachChange)for(var b=0,f=c.length;f>b;b++)a.evaluateSingle(c,b)&&d.push(b);else e.push(function(){a.evaluateMultiple(c)&&d.push(b)})}),d.sort(function(a,b){return b>a});for(var f=0,g=d.length;g>f;f++)a.splice(d[f],1);return e},a.prototype.onNextPropertyChange=function(){throw"Abstract methods must be overridden"},a.prototype.captureChanges=function(){throw"Abstract methods must be overridden"},a.prototype.observeArray=function(a,b,c,d){var e,f,g=this.observe(a,function(a,f){e&&(this.disposeOf(e),e=null);var g={object:f||[],index:0,addedCount:f instanceof Array?f.length:0,removed:a instanceof Array?a:[],type:"splice"};if(d)b.call(c,g);else{var h=new obsjs.utils.compiledArrayChange([g],0,1);b.call(c,h.getRemoved(),h.getAdded(),h.getIndexes())}f instanceof obsjs.array&&(e=this.registerDisposable(f.observe(b,c,d)))},this);return(f=obsjs.utils.obj.getObject(a,this.$forObject||this))&&(e=this.registerDisposable(f.observe(b,c,d))),new obsjs.disposable(function(){e&&(this.disposeOf(e),e=null),g&&(g.dispose(),g=null)})},a.prototype.observe=function(a,b,c,d,e){if(/[\.\[]/.test(a)){var f=new obsjs.observeTypes.pathObserver(this.$forObject||this,a,b,c,d,e);return this.registerDisposable(f),f}this._init(a);var g=new obsjs.callbacks.propertyCallback(b,c,d,e);this.$callbacks[a]||(this.$callbacks[a]=[]),this.$callbacks[a].push(g),this.onNextPropertyChange(a,function(a){g.activate(a)});var h={dispose:function(b){h&&(h=null,b?this.onNextPropertyChange(a,function(a){g.deactivate(a)}):g.deactivate())}.bind(this)};return this.registerDisposable(h),h},a.prototype._init=function(){throw"Abstract methods must be implemented"},a.prototype.dispose=function(){this._super(),delete this.$forObject;for(var a in this.$callbacks)delete this.$callbacks[a]},a.prototype.computed=function(a,b,c){var d=new obsjs.observeTypes.computed(b,this,c);return d.bind(this.$forObject||this,a),this.registerDisposable(d),d},a.prototype.del=function(a){delete(this.$forObject||this)[a]},a._captureChanges=function(a,b,c,d){d.observe(a,c),b(),d.unobserve(a,c)},a.captureArrayChanges=function(a,b,c){if(!(a instanceof obsjs.array))throw"Only obsjs.array objects can have changes captured";return a.captureArrayChanges(b,c)},a.captureChanges=function(b,c,d){a.makeObservable(b);var e=b instanceof a?b:b.$observer;return e.captureChanges(c,d)},a.newObservable=function(){return a.makeObservable({})},a.makeObservable=function(b){if(a.canObserve(b))return b;if(b.$observer)throw"The $observer property is reserved";return Object.defineProperty(b,"$observer",{enumerable:!1,configurable:!1,value:new obsjs.observable(b),writable:!1}),b},a.observe=function(b,c,d,e,f,g){return a.makeObservable(b),a.tryObserve(b,c,d,e,f,g)},a.tryObserve=function(b,c,d,e,f,g){if(b instanceof obsjs.array&&c instanceof Function)return b.observe(arguments[1],arguments[2],arguments[3]);var h=b instanceof a?b:b.$observer instanceof a?b.$observer:null;return h?h.observe(c,d,e,f,g):!1},a.observeArray=function(b,c,d,e,f){return a.makeObservable(b),a.tryObserveArray(b,c,d,e,f)},a.tryObserveArray=function(b,c,d,e,f){var g=b instanceof a?b:b.$observer instanceof a?b.$observer:null;return g?g.observeArray(c,d,e,f):!1},a.canObserve=function(b){return b instanceof a||b&&b.$observer instanceof a},a.del=function(b,c){var d=b instanceof a?b:b.$observer instanceof a?b.$observer:null;return d?d.del(c):void 0},a.dispose=function(b){return b instanceof a?b.dispose():b.$observer instanceof a?b.$observer.dispose():void 0},a.afterObserveCycle=function(a){return obsjs.utils.observeCycleHandler.instance.afterObserveCycle(a)},a.beforeObserveCycle=function(a){return obsjs.utils.observeCycleHandler.instance.beforeObserveCycle(a)},a.afterNextObserveCycle=function(a,b){if(0===obsjs.utils.observeCycleHandler.instance.length&&!b)return void a();var c=obsjs.utils.observeCycleHandler.instance.afterObserveCycle(function(){c.dispose(),a()});return c},a.beforeNextObserveCycle=function(a){var b=obsjs.utils.observeCycleHandler.instance.beforeObserveCycle(function(){b.dispose(),a()});return b},a}),d("obsjs.callbacks.changeCallback",function(){var a=objjs.object.extend(function(a){this._super(),this.evaluateOnEachChange=a});return a.dispose={},a.prototype.activate=function(a){if(this._activated||this._activatingChange)throw"This callback has been activated";this._activatingChange=a},a.prototype.deactivate=function(a){if(this._deactivatingChange)throw"This callback has a deactivate pending";arguments.length?this._deactivatingChange=a:this._activated=!1},a.prototype.evaluateSingle=function(b,c){if(this.evaluateOnEachChange){if(this._activated===!1||this.hasOwnProperty("_deactivatingChange")&&this._deactivatingChange===b[c])return this._activated=!1,a.dispose;if(!this.hasOwnProperty("_activated")){if(!this.hasOwnProperty("_activatingChange")||this._activatingChange!==b[c])return;this._activated=!0,delete this._activatingChange}this._evaluateSingle(b,c)}},a.prototype._evaluateSingle=function(){throw"Abstract methods must be implemented"},a.prototype.evaluateMultiple=function(b){if(!this.evaluateOnEachChange&&b.length){if(this._activated===!1)return a.dispose;var c=0,d=b.length,e=void 0;return this.hasOwnProperty("_activated")||(c=b.indexOf(this._activatingChange),-1!==c&&(this._activated=!0,delete this._activatingChange)),this._deactivatingChange&&(d=b.indexOf(this._deactivatingChange),-1===d?d=b.length:(e=a.dispose,this._activated=!1,delete this._deactivatingChange)),-1!==c&&d>c&&this._evaluateMultiple(b,c,d),e}},a.prototype._evaluateMultiple=function(){throw"Abstract methods must be implemented"},a}),d("obsjs.callbacks.arrayCallbackBase",function(){var a=obsjs.callbacks.changeCallback.extend(function(a){this._super(a)});return a.prototype._evaluateMultiple=function(a,b,c){a.compiled||(a.compiled=[]);for(var d,e=0,f=a.compiled.length;f>e;e++)if(a.compiled[e].areEqual(b,c)){d=a.compiled[e];break}d||a.compiled.push(d=new obsjs.utils.compiledArrayChange(a,b,c)),this._evaluateArrayMultiple(d)},a.prototype._evaluateArrayMultiple=function(){throw"Abstract methods must be implemented"},a}),d("obsjs.arrayBase",function(){function a(){this.__keyArray=[],this.__valueArray=[]}function c(a){return"number"==typeof a&&a%1===0?a:null===a?0:a instanceof Boolean?a?1:0:"string"!=typeof a||isNaN(a=parseFloat(a))||a%1!==0?void 0:a}a.prototype.add=function(a,b){var c=this.__keyArray.indexOf(a);return-1===c?(this.__keyArray.push(a),this.__valueArray.push(b)):this.__valueArray[c]=b,b},a.prototype.clear=function(){this.__keyArray.length=0,this.__valueArray.length=0},a.prototype.remove=function(a){var b=this.__keyArray.indexOf(a);return-1!==b?(this.__keyArray.splice(b,0),this.__valueArray.splice(b,0),!0):!1},a.prototype.value=function(a){return this.__valueArray[this.__keyArray.indexOf(a)]};var d=objjs.object.extend.call(Array,function(b){if(Array.call(this),arguments.length&&!(arguments[0]instanceof Array))throw"The initial values must be an array";if(this.$disposables=[],this.$boundArrays=new a,this.$callbacks=[],this.$changeBatch=[],this.$length=b?b.length:0,b)for(var c=0,d=b.length;d>c;c++)this[c]=b[c]});return d.prototype._super=objjs.object.prototype._super,d.extend=objjs.object.extend,d.isValidArrayChange=function(a){return"splice"===a.type||!isNaN(parseInt(a.name))},d.prototype.captureChanges=function(){throw"Abstract methods must be overridden"},d.prototype.onNextArrayChange=function(){throw"Abstract methods must be implemented"},d.prototype.processChangeBatch=function(){var a=this.$changeBatch.slice();this.$changeBatch.length=0,obsjs.utils.observeCycleHandler.instance.before(this),b(obsjs.observableBase.processChanges(this.$callbacks,a),function(a){a()}),obsjs.utils.observeCycleHandler.instance.after(this)},d.prototype.registerChangeBatch=function(a){for(var b=a.length-1;b>=0;b--)d.isValidArrayChange(a[b])||a.splice(b,1);return obsjs.observableBase.prototype.registerChangeBatch.call(this,a)},Object.defineProperty(d.prototype,"length",{set:function(a){if(a=c(a),void 0===a)throw RangeError("Invalid array length");if(a!==this.$length){if(!this.__alteringLength)if(a>this.$length){var b=new Array(a-this.length+2);b[0]=this.length,b[1]=0,this.splice.apply(this,b)}else a<this.$length&&this.splice(a,this.length-a);{this.$length}this.$length=a}},get:function(){return this.$length}}),d.prototype._init=function(){throw"Abstract methods must be implemented"},d.prototype.observe=function(a,b,c){if("string"==typeof arguments[0]){var d=Array.prototype.slice.call(arguments);return d.splice(0,0,this),obsjs.observable.observe.apply(null,d)}this._init();var e=new obsjs.callbacks.arrayCallback(a,b,c);this.$callbacks.push(e),this.onNextArrayChange(function(a){e.activate(a)});var f={dispose:function(a){f&&(f=null,a?this.onNextArrayChange(function(a){e.deactivate(a)}):e.deactivate())}.bind(this)};return this.$disposables.push(f),f},d.prototype.alteringLength=function(a){if(this.__alteringLength)return a.call(this);try{return this.__alteringLength=!0,a.call(this)}finally{this.__alteringLength=!1}},d.copyAll=function(a,c,d){var e;d?(e=[],b(a,function(a){e.push(d(a))})):e=a.slice(),e.splice(0,0,0,c.length),c.splice.apply(c,e)},d.prototype.bind=function(a){if(this._init(),!this.$boundArrays.value(a)){a instanceof obsjs.array&&a.$boundArrays.value(this)||d.copyAll(this,a),this.$boundArrays.add(a,{});var b=new obsjs.callbacks.boundArrayCallback(this,a);this.$callbacks.push(b),this.onNextArrayChange(function(a){b.activate(a)});var c={dispose:function(a){c&&(c=null,a?this.onNextArrayChange(function(a){b.deactivate(a)}):b.deactivate())}.bind(this)};return this.$disposables.push(c),c}},d.prototype.dispose=function(){b(this.$disposeables,function(a){a.dispose()}),this.$disposeables.length=0,this.$boundArrays.clear(),this.$callbacks.length=0},d}),a?d("obsjs.array",function(){var a=obsjs.arrayBase.extend(function(){this._super.apply(this,arguments)});return a.prototype.onNextArrayChange=function(a){var b=function(c){if(b)for(var d=0,e=c.length;e>d;d++)if(obsjs.arrayBase.isValidArrayChange(c[d]))return Array.unobserve(this,b),b=null,void a(c[d])}.bind(this);Array.observe(this,b)},a.prototype.captureArrayChanges=function(a,b){var c=function(a){a=a.slice();for(var c=a.length-1;c>=0;c--)obsjs.arrayBase.isValidArrayChange(a[c])||a.splice(c,1);b(a)};Array.observe(this,c),a(),Array.unobserve(this,c)},a.prototype._init=function(){this.__subscription||(this.__subscription=this.registerChangeBatch.bind(this),Array.observe(this,this.__subscription))},a.prototype.dispose=function(){this._super(),this.__subscription&&(Array.unobserve(this,this.__subscription),delete this.__subscription)},a}):d("obsjs.array",function(){function a(){return"id-"+ ++d}var c=obsjs.arrayBase.extend(function(){this._super.apply(this,arguments),this.$onNextArrayChanges=[],this.$captureCallbacks=[]}),d=0;return c.prototype.captureArrayChanges=function(a,b){var c=function(a){a=a.slice();for(var c=a.length-1;c>=0;c--)obsjs.arrayBase.isValidArrayChange(a[c])||a.splice(c,1);b(a)};this.$captureCallbacks.push(c),a(),this.$captureCallbacks.splice(this.$captureCallbacks.indexOf(c),1)},c.prototype.registerChangeBatch=function(c){for(var d=0,e=c.length;e>d;d++)if(obsjs.arrayBase.isValidArrayChange(c[d])){b(this.$onNextArrayChanges.splice(0,this.$onNextArrayChanges.length),function(a){a(c[d])});break}return b(this.$captureCallbacks,function(a){a(c)}),b(c,function(b){b.xxx=a()}),this._super(c)},c.prototype.onNextArrayChange=function(a){this.$onNextArrayChanges.push(a)},c.prototype._init=function(){},c}),function(){var b=obsjs.array;b.prototype.replace=function(a,b){return this.splice(a,a>=this.length?0:1,b),b},b.prototype.pop=function(){return a||this.length&&this.registerChangeBatch([{addedCount:0,index:this.length-1,object:this,removed:[this[this.length-1]],type:"splice"}]),this.alteringLength(function(){return Array.prototype.pop.call(this)})},b.prototype.shift=function(){return a||this.length&&this.registerChangeBatch([{addedCount:0,index:0,object:this,removed:[this[0]],type:"splice"}]),this.alteringLength(function(){return Array.prototype.shift.call(this)})},b.prototype.remove=function(a){var b;-1!==(b=this.indexOf(a))&&this.splice(b,1)},b.prototype.push=function(b){return a||this.registerChangeBatch([{addedCount:1,index:this.length,object:this,removed:[],type:"splice"}]),this.alteringLength(function(){return Array.prototype.push.call(this,b)})},b.prototype.reverse=function(){if(!a){var b=this.length/2;b=b%1===0?-1:b-.5;for(var c=0,d=this.length;d>c;c++)c!==b&&this.registerChangeBatch([{name:c.toString(),object:this,oldValue:this[c],type:"update"}])}return this.alteringLength(function(){return Array.prototype.reverse.call(this)})},b.prototype.splice=function(b,c){if(!a){for(var d=[],e=b,f=c+b>this.length?this.length:c+b;f>e;e++)d.push(this[e]);this.registerChangeBatch([{addedCount:arguments.length-2,index:b,object:this,removed:d,type:"splice"}])}var g=arguments;return this.alteringLength(function(){return Array.prototype.splice.apply(this,g)})}}(),d("obsjs.callbacks.arrayCallback",function(){var a=obsjs.callbacks.arrayCallbackBase.extend(function(a,b,c){this._super(c),this.callback=a,this.context=b});return a.prototype._evaluateSingle=function(a,b){this.callback.call(this.context,a[b])},a.prototype._evaluateArrayMultiple=function(a){this.callback.call(this.context,a.getRemoved(),a.getAdded(),a.getIndexes())},a}),d("obsjs.callbacks.boundArrayCallback",function(){function a(a,b){this.fromArray=a,this.toArray=b}var d=obsjs.callbacks.arrayCallbackBase.extend(function(a,b){if(this._super(!1),!(a instanceof obsjs.array))throw'The from array must be an "obsjs.array"';if(!(b instanceof Array))throw'The to array must be an "Array"';this.fromArray=a,this.toArray=b});d.prototype._evaluateSingle=function(a,b){return this._evaluateMultiple(a,b,b+1)},d.prototype._evaluateArrayMultiple=function(b){var c,d=new a(this.fromArray,this.toArray);this.toArray instanceof obsjs.array&&(c=this.toArray.$boundArrays.value(this.fromArray))?d.executeAndCapture(b.changes,c):d.execute(b.changes)};var e=function(){var a=0;return function(){return"id-"+ ++a}}();return a.prototype.executeAndCapture=function(a,b){obsjs.observable.captureArrayChanges(this.toArray,function(){this.execute(a)}.bind(this),function(a){var c=e();b[c]=a,setTimeout(function(){delete b[c]},100)})},a.prototype.execute=function(a){var d,e=[];this.toArray instanceof obsjs.array&&(d=this.fromArray.$boundArrays.value(this.toArray))&&c(d,function(a){e.push.apply(e,a)}),b(a,function(a){if(-1===e.indexOf(a.change)){var b=a.added.slice();b.splice(0,0,a.index,a.removed.length),this.toArray.splice.apply(this.toArray,b)}},this)},d}),d("obsjs.callbacks.propertyCallback",function(){var a=obsjs.callbacks.changeCallback.extend(function(a,b,c,d){this._super(c),this.callback=a,this.context=b,this.evaluateIfValueHasNotChanged=d});return a.prototype._evaluateSingle=function(a,b){var c=a[b],d=a[b+1],e=d?d.oldValue:c.object[c.name];(this.evaluateIfValueHasNotChanged||e!==c.oldValue)&&this.callback.call(this.context,c.oldValue,e)},a.prototype._evaluateMultiple=function(a,b,c){var d=a[c]?a[c].oldValue:a[0].object[a[0].name];(this.evaluateIfValueHasNotChanged||d!==a[b].oldValue)&&this.callback.call(this.context,a[b].oldValue,d)},a});a?d("obsjs.observable",function(){var a=obsjs.observableBase.extend(function(a){this._super(a)});return a.prototype.onNextPropertyChange=function(a,b){var c=function(d){if(c)for(var e=0,f=d.length;f>e;e++)if(d[e].name===a){var g=c;return Object.unobserve(this.$forObject||this,g),c=null,void b(d[e])}}.bind(this);Object.observe(this.$forObject||this,c)},a.prototype.captureChanges=function(a,b){var c=function(){b.apply(this,arguments)};Object.observe(this.$forObject||this,c),a(),Object.unobserve(this.$forObject||this,c)},a.prototype._init=function(){this.__subscribeCallback||(this.__subscribeCallback=this.registerChangeBatch.bind(this),Object.observe(this.$forObject||this,this.__subscribeCallback))},a.prototype.dispose=function(){this._super(),this.__subscribeCallback&&(Object.unobserve(this.$forObject||this,this.__subscribeCallback),delete this.__subscribeCallback)},a}):d("obsjs.observable",function(){var a=obsjs.observableBase.extend(function(a){this._super(a),this.$observed={},this.$onNextPropertyChanges={},this.$captureCallbacks=[]});return a.prototype.onNextPropertyChange=function(a,b){(this.$onNextPropertyChanges[a]||(this.$onNextPropertyChanges[a]=[])).push(b)},a.prototype.captureChanges=function(a,b){var c=function(){b.apply(this,arguments)};this.$captureCallbacks.push(c),a(),this.$captureCallbacks.splice(this.$captureCallbacks.indexOf(c),1)},a.prototype._init=function(a){function c(a){return a.$observer||a}this.$observed.hasOwnProperty(a)||((this.$forObject||this).hasOwnProperty(a)&&(this.$observed[a]=(this.$forObject||this)[a]),Object.defineProperty(this.$forObject||this,a,{get:function(){return c(this).$observed[a]},set:function(d){var e=c(this),f={type:e.$observed.hasOwnProperty(a)?"update":"add",name:a,object:this,oldValue:e.$observed[a]};if(e.$observed[a]=d,e.$onNextPropertyChanges[a]){var g=e.$onNextPropertyChanges[a];delete e.$onNextPropertyChanges[a],setTimeout(function(){b(g,function(a){a(f)})})}e.addChange(f)},enumerable:!0,configurable:!0}))},a.prototype.addChange=function(a){this.__changeToken||(this.__changeToken=[],setTimeout(function(){var a=this.__changeToken;delete this.__changeToken,this.registerChangeBatch(a)}.bind(this))),this.__changeToken.push(a),b(this.$captureCallbacks,function(b){b([a])})},a.prototype.del=function(a){(this.$forObject||this)[a]=void 0,this._super(a)},a.prototype.dispose=function(){this._super();for(var a in this.$onNextPropertyChanges)delete this.$onNextPropertyChanges[a]},a});d("obsjs.observeTypes.computed",function(){var a=/\s*with\s*\(/g,c=/([^\s,]+)/g,d=/\/\/.*$/gm,e=/\/\*[\s\S]*?\*\//gm,f="((\\s*\\.\\s*([\\w\\$]*))|(\\[\\s*\\d\\s*\\]))+",h=obsjs.observable.extend(function j(a,d,e,f,g){if(this._super(),this.arguments=[],this.callbackString=j.stripFunction(f||a),this.callbackFunction=a,this.context=d,!g&&j.testForWith(this.callbackString))throw'You cannot use the "with" keyword in computed functions by default. To allow "with", use the allowWith argument on the constructor, however, properties of the variable within the "with" statement cannot be monitored for change.';var h=this.callbackString.slice(this.callbackString.indexOf("(")+1,this.callbackString.indexOf(")")).match(c)||[],i={};if(e&&h.length){var k;for(var l in e)-1!==(k=h.indexOf(l))&&(this.arguments[k]=e[l],h[k]=i)}if(b(h,function(a){if(a!==i)throw'Argument "'+a+'" must be added as a watch variable.'}),this.execute(),this.watchVariable("this",d),e)for(var l in e)this.watchVariable(l,e[l])});h.testForWith=function(b){for(a.lastIndex=0;a.exec(b);)if(!/[\.\w\$]/.test(b[a.lastIndex-1]))return!0;return!1},h.prototype.execute=function(){this.val=this.callbackFunction.apply(this.context,this.arguments)},h.createBindFunction=function(a,b,c){var d,e=function(f,g){c&&(g=c(g));var i=obsjs.utils.obj.getObject(b,a);g!==i&&(e.dispose(),h.isArray(g)&&h.isArray(i)?g instanceof obsjs.array?d=g.bind(i):obsjs.array.copyAll(g,a[b]):obsjs.utils.obj.setObject(b,a,g))};return e.dispose=function(){d&&(d.dispose(),d=null)},e},h.prototype.bind=function(a,b){var c=h.createBindFunction(a,b),d=this.observe("val",c);c(null,this.val);var e=new obsjs.disposable;return e.registerDisposable(d),e.registerDisposable(c),e},h.prototype.onValueChanged=function(a,b){return b&&a(void 0,this.val),this.observe("val",a)},h.stripFunction=function(a){a=a.toString().replace(d,"").replace(e,"");for(var b=/["']/g;b.exec(a);){var c="'"===a[b.lastIndex-1]?/'/g:/"/g;for(c.lastIndex=b.lastIndex;c.exec(a);){for(var f=0,g=c.lastIndex-2;"\\"===a[g];g--)f++;if(f%2===0){a=a.substr(0,b.lastIndex-1)+"#"+a.substr(c.lastIndex);break}}}return a},h.prototype.watchVariable=function(a,c){for(var d,e,h=[],i=new RegExp(a+f,"g"),j=[];null!==(d=i.exec(this.callbackString));)-1===j.indexOf(e=g(d[0]))&&(j.push(e),h.push({value:d[0],index:i.lastIndex-d[0].length}));b(h,function(a){if(a.index>0){if(-1!==this.callbackString[a.index-1].search(/[\w\$]/))return;for(var b=a.index-1;b>=0;b--){if("."===this.callbackString[b])return;if(0!==this.callbackString[b].search(/\s/))break}}j=obsjs.utils.obj.splitPropertyName(a.value);var d=new obsjs.observeTypes.pathObserver(c,obsjs.utils.obj.joinPropertyName(j.slice(1)),this.throttleExecution,this);this.registerDisposable(d);var e,f=this.throttleExecution.bind(this);d.onValueChanged(function(a,b){e&&(e.dispose(),e=null),b instanceof obsjs.array&&(e=b.observe(f))},!0)},this)},h.prototype.throttleExecution=function(){this.__executePending||(this.__executePending=!0,setTimeout(function(){this.__executePending=!1,this.execute()}.bind(this)))};var i=[];return h.isArray=function(a){if(a instanceof Array){for(var b=0,c=i.length;c>b;b++)if(a instanceof i[b])return!1;return!0}return!1},h.nonArrayType=function(a){if(!(a instanceof Function))throw"The type argument must be a function or constructor";-1===i.indexOf(a)&&i.push(a)},h}),d("obsjs.observeTypes.pathObserver",function(){var a=obsjs.observable,b=a.extend(function(a,b,c,d,e,f){this._super(),this.forObject=a,this.property=b,this.callback=c,this.context=d,this.evaluateOnEachChange=e,this.evaluateIfValueHasNotChanged=f,this.path=obsjs.utils.obj.splitPropertyName(b),this.disposables=new Array(this.path.length),this.val=obsjs.utils.obj.getObject(b,a),this.buildObservableChain(),this.init=!0,this.observe("val",c,d||a,e,f)});return b.prototype.onValueChanged=function(a,b){var c=this.observe("val",a);return this.registerDisposable(c),b&&a(void 0,this.val),c},b.prototype.execute=function(){var a=this.forObject;for(i=0,ii=this.path.length;null!=a&&i<ii;i++)a=a[this.path[i]];return a},b.prototype.buildObservableChain=function(b){b=b||0;for(var c=b;c<this.path.length;c++)this.disposables[c]&&(this.disposables[c].dispose(),this.disposables[c]=null);var d=this.forObject,e=this;for(c=0;d&&b>c;c++)d=d[this.path[c]];for(;d&&c<this.path.length-1;c++){if((a.canObserve(d)||d instanceof obsjs.array)&&d[this.path[c]]&&c>=b){var f=[d,function(a){return function(){e.buildObservableChain(a),e.val=obsjs.utils.obj.getObject(e.property,e.forObject)}}(c)];isNaN(this.path[c])&&f.splice(1,0,this.path[c]),this.disposables[c]=a.tryObserve.apply(null,f)}d=d[this.path[c]]}a.canObserve(d)&&(this.disposables[c]=a.tryObserve(d,this.path[c],function(a,b){this.val=b},this))},b.prototype.dispose=function(){this._super();for(var a=0,b=this.disposables.length;b>a&&this.disposables[a];a++)this.disposables[a]&&(this.disposables[a].dispose(),this.disposables[a]=null);this.disposables.length=0},b}),d("obsjs.utils.compiledArrayChange",function(){function a(a,b,c){this.beginAt=b,this.endAt=c,this.changes=[],this.build(a)}return a.prototype.buildIndexes=function(){if(!this.indexes){var a,c,d=[],e=[],f=[],g=[],h=[],i=[],j=this.added.slice();b(this.finalArray,function(b,c){(c>=this.beginArray.length||b!==this.beginArray[c])&&(-1!==(a=j.indexOf(b))?(g.push({value:b,index:c}),j.splice(a,1)):f[c]=b)},this);var k=this.removed.slice();b(this.beginArray,function(b,c){(c>=this.finalArray.length||b!==this.finalArray[c])&&(-1!==(a=k.indexOf(b))?(h.push({value:b,index:c}),k.splice(a,1)):(d.push(b),e.push(c)))},this);for(var l={};d.length;)a=d.shift(),c=f.indexOf(a),f[c]=l,i.push({value:a,from:e.shift(),to:c});this.indexes={moved:i,added:g,removed:h}}},a.prototype.build=function(a){if(this.removed=[],this.added=[],!a.length||this.beginAt>=this.endAt)return void(this.indexes={added:[],removed:[],moved:[]});for(var c,d,e,f,g=a[0].object.slice(),h=a.length-1;h>=this.beginAt;h--)c="splice"===a[h].type?a[h]:{addedCount:1,index:parseInt(a[h].name),removed:[a[h].oldValue]},h<this.endAt&&(this.finalArray||(this.finalArray=g.slice()),f=0,b(c.removed,function(a){-1===(e=this.added.indexOf(a))?(this.removed.splice(f,0,a),f++):this.added.splice(e,1)},this),f=0,b(g.slice(c.index,c.index+c.addedCount),function(a){-1===(e=this.removed.indexOf(a))?(this.added.splice(f,0,a),f++):this.removed.splice(e,1)},this),this.changes.splice(0,0,{index:c.index,added:g.slice(c.index,c.index+c.addedCount),removed:c.removed,change:a[h]})),d=c.removed.slice(),d.splice(0,0,c.index,c.addedCount),g.splice.apply(g,d);this.beginArray=g.slice()},a.prototype.areEqual=function(a,b){return this.beginAt===a&&this.endAt===b},a.prototype.getRemoved=function(){return this.removed.slice()},a.prototype.getAdded=function(){return this.added.slice()},a.prototype.getIndexes=function(){return this.indexes||this.buildIndexes(),{added:this.indexes.added.slice(),removed:this.indexes.removed.slice(),moved:this.indexes.moved.slice()}},a}),d("obsjs.utils.observeCycleHandler",function(){function a(a){a()}function c(a,b){a.push(b);var c=new obsjs.disposable(function(){c&&(c=null,b=a.indexOf(b),-1!==b&&a.splice(b,1))});return c}var d=obsjs.observable.extend(function(){this._super(),this.$afterObserveCycles=[],this.$beforeObserveCycles=[],this.length=0,this.observe("length",function(c,d){0===d&&b(this.$afterObserveCycles.slice(),a)},this,!1,!0)});return d.prototype.before=function(c){c!==this&&(0===this.length&&b(this.$beforeObserveCycles.slice(),a),this.length++)},d.prototype.clear=function(){this.length>0&&(this.length=0)},d.prototype.after=function(a){a===this||this.length<=0||this.length--},d.prototype.afterObserveCycle=function(a){return c(this.$afterObserveCycles,a)},d.prototype.befreObserveCycle=function(a){return c(this.$beforeObserveCycles,a)},d.instance=new d,d})}();