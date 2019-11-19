function createBounceHandlerJob (lib, mylib) {
  'use strict';

  var qlib = lib.qlib;

  var CommunicationNotificationHandlerJob = mylib.CommunicationNotificationHandlerJob;

  function BounceHandlerJob (notifier, url, req, res, defer) {
    CommunicationNotificationHandlerJob.call(this, notifier, url, req, res, defer);
  }
  lib.inherit(BounceHandlerJob, CommunicationNotificationHandlerJob);
  BounceHandlerJob.prototype.processParams = function () {
    var ps;
    if (!this.okToProceed()) {
      return;
    }
    try {
      ps = this.destroyable.paramsFromBounceNotification(this.params);
      this.checkParamsFromDriver(ps, 'paramsFromBounceNotification', 'INVALID_PARAMS_FROM_BOUNCE_NOTIFICATION');
    } catch (e) {
      console.error(e);
      this.reject(e);
      return;
    }
    ps.sendingsystemcode = this.destroyable.sendingsystemcode;
    qlib.promise2defer(this.destroyable.doCommunicationBounce(ps), this);
  };

  mylib.BounceHandlerJob = BounceHandlerJob;
}
module.exports = createBounceHandlerJob;
