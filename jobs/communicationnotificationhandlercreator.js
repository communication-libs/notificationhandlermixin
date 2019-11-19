function createCommunicationNotificationHandlerJob (lib, mylib) {
  'use strict';

  var AnonymousOnNotifierJob = mylib.AnonymousOnNotifierJob;

  function CommunicationNotificationHandlerJob (notifier, url, req, res, defer) {
    AnonymousOnNotifierJob.call(this, notifier, url, req, res, defer);
    this.sendingsystemid = null;
    this.sendingsystemnotified = null;
  }
  lib.inherit(CommunicationNotificationHandlerJob, AnonymousOnNotifierJob);
  CommunicationNotificationHandlerJob.prototype.destroy = function () {
    this.sendingsystemnotified = null;
    this.sendingsystemid = null;
    AnonymousOnNotifierJob.prototype.destroy.call(this);
  };
  CommunicationNotificationHandlerJob.prototype.checkParamsFromDriver = function (ps, driverfuncname, code) {
    if (!(ps && ps.sendingsystemid && ps.sendingsystemnotified)) {
      throw new lib.Error('INVALID_PARAMS_FROM_DELIVERY_NOTIFICATION', driverfuncname+' has to return an Object with the following properties: "sendingsystemid" and "sendingsystemnotified"');
    }
  };

  mylib.CommunicationNotificationHandlerJob = CommunicationNotificationHandlerJob;
}
module.exports = createCommunicationNotificationHandlerJob;
