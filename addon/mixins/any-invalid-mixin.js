import Ember from 'ember';

/*
 * Allows isInvalid status to be aggregated to disable form submission.
 *
 * Sample usage:
 * 		{{paper-input
 *      value=model.someProperty
 *      required=true
 *      onChange=(action (mut model.someProperty))
 *      onInvalid=(action "updateInvalid" "someProperty")
 *    }}
 *
 *   	{{paper-button
 *    	onClick=(action "someAction")
 *    	disabled=anyInvalid
 *    	label="Save"
 *    }}
 */
export default Ember.Mixin.create({

  isInvalid: null,

  init() {
    this._super(...arguments);
    this.set('isInvalid', {});
  },

  anyInvalid: Ember.computed('isInvalid', function() {
    let isInvalid = this.get('isInvalid');
    for (let key in isInvalid) {
      if (isInvalid[key]) {
        return true;
      }
    }
    return false;
  }),

  actions: {

    updateInvalid(key, invalidState) {
      let isInvalid = this.get('isInvalid');
      isInvalid[key] = invalidState !== false;
      this.notifyPropertyChange('isInvalid');
    }

  }
});
