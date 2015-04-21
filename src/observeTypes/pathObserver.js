// name is subject to change

Class("busybody.observeTypes.pathObserver", function () {
        
    var pathObserver = busybody.observeTypes.observeTypesBase.extend(function pathObserver (forObject, property, callback, context) {
        ///<summary>Observe a property for change. Should be "call()"ed with this being a "watched"</summary>
        ///<param name="forObject" type="busybody.observable" optional="false">The object to watch</param>
        ///<param name="property" type="String" optional="false">The property</param>
        ///<param name="callback" type="Function" optional="true">A callback for property change</param>
        ///<param name="context" type="Any" optional="true">The context of the callback</param>
		
        this._super();
        
		///<summary type="busybody.observable">The object to observe<summary>
        this.forObject = forObject;
		
		///<summary type="String">The path to observe<summary>
        this.property = property;
        
		///<summary type="[String]">The path split into parts<summary>
        this.path = busybody.utils.obj.splitPropertyName(property);
        
		///<summary type="[busybody.observable]">The subscriptions<summary>
        this.__pathDisposables = new Array(this.path.length);
        this.execute();
        
        this.buildObservableChain();
		
		if (callback)
			this.onValueChanged(callback.bind(context || forObject), false);
    });
    
    pathObserver.prototype.onValueChanged = function (callback, evaluateImmediately) {
		///<summary>Add a new callback<summary>
		///<param name="callback" type="Function">The callback<param>
		///<param name="evaluateImmediately" type="Boolean" optional="true">If true, execute the callback now<param>
		///<returns type="busybody.disposable">A disposable to remove the callback<param>
              
		var output = this.addCallback(callback);		
        if (evaluateImmediately)
            callback(undefined, this.val);
		
        return output;
    };
    
    pathObserver.prototype.buildObservableChain = function (begin) {
		///<summary>Rebuild the observable chain<summary>
		///<param name="begin" type="Number" optional="true">The first element to rebuild<param>
		
        begin = begin || 0;
        
        // dispose of anything in the path after the change
        for (var i = begin; i < this.path.length; i++) {
            if (this.__pathDisposables[i]) {
                this.__pathDisposables[i].dispose();
                this.__pathDisposables[i] = null;
            }
        }

        var current = this.forObject, _this = this;
        
        // get item at index "begin"
        for (i = 0; current && i < begin; i++) {
            current = current[this.path[i]];
        }
        
        // get the last item in the path subscribing to changes along the way
        for (; current && i < this.path.length - 1; i++) {
            if ((busybody.canObserve(current) || current instanceof busybody.array) && current[this.path[i]] && i >= begin) {
                
                var args = [current, (function (i) {
                    return function(oldVal, newVal) {
                        _this.buildObservableChain(i);
						_this.execute();
                    };
                }(i))];
                
                if (isNaN(this.path[i])) {
                    args.splice(1, 0, this.path[i]);
                }
                
                this.__pathDisposables[i] = busybody.tryObserve.apply(null, args);
            }

            current = current[this.path[i]];
        }
        
        // observe last item in path
        if (busybody.canObserve(current))
            this.__pathDisposables[i] = busybody.tryObserve(current, this.path[i], function (oldVal, newVal) {
                this.execute();
            }, this);
    };
        
    pathObserver.prototype.getValue = function() {
		///<summary>Evaluate the path observer<summary>
		///<returns type="Any">The value. Returns null rather than a TypeError<param>
		
        var current = this.forObject;
        
        // get item at index "begin"
        for (var i = 0, ii = this.path.length; current != null && i < ii; i++) {
            current = current[this.path[i]];
        }
		
		return i === ii ? current : null;
    };
	
    pathObserver.prototype.dispose = function () {
		///<summary>Dispose of this path observer<summary>
		
        this._super();
        
        for (var i = 0, ii = this.__pathDisposables.length; i < ii && this.__pathDisposables[i]; i++)
            if (this.__pathDisposables[i])
                this.__pathDisposables[i].dispose();

        this.__pathDisposables.length = 0;
    };
                                      
    return pathObserver;
});