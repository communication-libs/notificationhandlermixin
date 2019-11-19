function createJobs (execlib) {
  'use strict';

  var lib = execlib.lib,
    ret = {};

  require('./onnotifiercreator')(lib, ret);
  require('./anonymousonnotifiercreator')(lib, ret);
  require('./communicationnotificationhandlercreator')(lib, ret);
  require('./deliveryhandlercreator')(lib, ret);
  require('./bouncehandlercreator')(lib, ret);
  require('./complainthandlercreator')(lib, ret);

  return ret;
}
module.exports = createJobs;
