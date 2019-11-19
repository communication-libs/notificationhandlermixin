function createComplaintHandlerJob (lib, mylib) {
  'use strict';

  var CommunicationNotificationHandlerJob = mylib.CommunicationNotificationHandlerJob;

  function ComplaintHandlerJob (notifier, url, req, res, defer) {
    CommunicationNotificationHandlerJob.call(this, notifier, url, req, res, defer);
  }
  lib.inherit(ComplaintHandlerJob, CommunicationNotificationHandlerJob);
  ComplaintHandlerJob.prototype.processParams = function () {
    var ps;
    try {
      ps = this.destroyable.paramsFromComplaintNotification(this.params);
      this.checkParamsFromDriver(ps, 'paramsFromComplaintNotification', 'INVALID_PARAMS_FROM_COMPLAINT_NOTIFICATION');
    } catch (e) {
      console.error(e);
      this.reject(e);
      return;
    }
    ps.sendingsystemcode = this.destroyable.sendingsystemcode;
    lib.qlib.promise2defer(this.destroyable.doCommunicationComplaint(ps), this);
  };

  mylib.ComplaintHandlerJob = ComplaintHandlerJob;
}
module.exports = createComplaintHandlerJob;
