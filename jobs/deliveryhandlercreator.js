function createDeliveryHandlerJob (lib, mylib) {
  'use strict';

  var CommunicationNotificationHandlerJob = mylib.CommunicationNotificationHandlerJob;

  function DeliveryHandlerJob (notifier, url, req, res, defer) {
    CommunicationNotificationHandlerJob.call(this, notifier, url, req, res, defer);
  }
  lib.inherit(DeliveryHandlerJob, CommunicationNotificationHandlerJob);
  DeliveryHandlerJob.prototype.processParams = function () {
    if (!this.okToProceed()) {
      return;
    }
    var ps = this.destroyable.paramsFromDeliveryNotification(this.params);
    try {
      this.checkParamsFromDriver(ps, 'paramsFromDeliveryNotification', 'INVALID_PARAMS_FROM_DELIVERY_NOTIFICATION');
    } catch (e) {
      this.reject(e);
      return;
    }
    this.destroyable.doCommunicationDelivery(this.destroyable.sendingsystemcode, ps.sendingsystemid, ps.sendingsystemnotified).then(
      this.resolve.bind(this),
      this.reject.bind(this)
    );
  };

  mylib.DeliveryHandlerJob = DeliveryHandlerJob;
}
module.exports = createDeliveryHandlerJob;
