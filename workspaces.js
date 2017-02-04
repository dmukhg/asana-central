var lodash = require('lodash');

exports = module.exports = {};

var lookupWorkspace = exports.lookupWorkspace = function (client, wsIdentifier) {
  return client.users.me()
  .then(function (user) {
    var workspaces = user.workspaces;
    var ws = lodash.find(workspaces, function (wsObj) {
      return wsObj.id === wsIdentifier || wsObj.name === wsIdentifier;
    });

    if (ws) {
      return ws.id;
    } else {
      throw Error('Workspace not found')
    }
  })
}

exports.list = function (client) {
  return client.users.me()
  .then(function (user) {
    return user.workspaces
  })
}

exports.formatter = function (workspaces) {
  var table = require('text-table');

  var t = table(lodash.map(workspaces, function (ws) {
    return [ws.id, ws.name];
  }), {align: ['r', 'l']});

  console.log(t);
}