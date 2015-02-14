
Class("obsjs.callbacks.changeCallback", function () {
        
    var changeCallback = objjs.object.extend(function changeCallback(evaluateOnEachChange) {
        this._super();
        
        this.evaluateOnEachChange = evaluateOnEachChange;
    });
    
    changeCallback.dispose = {};
    
    changeCallback.prototype.activate = function (activatingChange) {
        if (this._activated || this._activatingChange)
            throw "This callback has been activated";
        
        this._activatingChange = activatingChange;
    };
    
    changeCallback.prototype.deactivate = function (deactivatingChange) {
        if (this._deactivatingChange)
            throw "This callback has a deactivate pending";
        
        if (arguments.length)
            this._deactivatingChange = deactivatingChange;
        else 
            this._activated = false;
    };

    changeCallback.prototype.evaluateSingle = function (changes, changeIndex) {
        
        if (!this.evaluateOnEachChange) return;

        if (this._activated === false || this._deactivatingChange === changes[changeIndex]) {            
            this._activated = false;
            return changeCallback.dispose;
        }

        if (!this.hasOwnProperty("activated")) {
            if (this._activatingChange === changes[changeIndex]) {
                this._activated = true;
                delete this._activatingChange;
            } else
                return;
        }
        
        this._evaluateSingle(changes, changeIndex);
    };
    
    changeCallback.prototype._evaluateSingle = function (changes, changeIndex) {
        throw "Abstract methods must be implemented";
    };

    changeCallback.prototype.evaluateMultiple = function (changes) {
        if (this.evaluateOnEachChange || !changes.length) return;

        if (this._activated === false) return changeCallback.dispose;
        
        var beginAt = 0, endAt = changes.length, output = undefined;
        if (!this.hasOwnProperty("activated")) {
            beginAt = changes.indexOf(this._activatingChange);
            if (beginAt !== -1) {            
                this._activated = true;
                delete this._activatingChange;
            }
            
            // if == -1 case later on
        }

        if (this._deactivatingChange) {
            endAt = changes.indexOf(this._deactivatingChange);
            if (endAt === -1) {
                endAt = changes.length;                
            } else {
                output = changeCallback.dispose;
                this._activated = false;
                delete this._deactivatingChange;
            }
        }
                
        if (beginAt !== -1 && beginAt < endAt) {
            this._evaluateMultiple(changes, beginAt, endAt);
        }
        
        return output;
    };
    
    changeCallback.prototype._evaluateMultiple = function (changes) {
        throw "Abstract methods must be implemented";
    };
    
    return changeCallback;
});