function createCommunicationNotificationHandlerServiceMixin (execlib) {
  'use strict';

  var lib = execlib.lib,
    qlib = lib.qlib,
    jobs = require('./jobs')(execlib);

  function CommunicationNotificationHandlerServiceMixin (prophash) {
    this.allowAnonymous = true;
    this.mailingNotificationJobs = new qlib.JobCollection();
  }
  CommunicationNotificationHandlerServiceMixin.prototype.destroy = function () {
    if (this.mailingNotificationJobs) {
      this.mailingNotificationJobs.destroy();
    }
    this.allowAnonymous = null;
  };

  CommunicationNotificationHandlerServiceMixin.prototype.handleBounces = function (url, req, res) {
    this.mailingNotificationJobs.run('.', new jobs.BounceHandlerJob(this, url, req, res));
  };
  CommunicationNotificationHandlerServiceMixin.prototype.handleComplaints = function (url, req, res) {
    this.mailingNotificationJobs.run('.', new jobs.ComplaintHandlerJob(this, url, req, res));
  };
  CommunicationNotificationHandlerServiceMixin.prototype.handleDeliveries = function (url, req, res) {
    this.mailingNotificationJobs.run('.', new jobs.DeliveryHandlerJob(this, url, req, res));
  };

  CommunicationNotificationHandlerServiceMixin.addMethods = function (klass) {
    lib.inheritMethods(klass, CommunicationNotificationHandlerServiceMixin
      ,'handleBounces'
      ,'handleComplaints'
      ,'handleDeliveries'
    );
    klass.prototype.anonymousMethods = ['handleBounces','handleComplaints','handleDeliveries'];
  };

  return CommunicationNotificationHandlerServiceMixin;
}
module.exports = createCommunicationNotificationHandlerServiceMixin;
