var lodash = require('lodash');

exports = module.exports = {}

exports.list = function (client, wsIdentifier) {
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
  .then(function (wsId) {
    return client.projects.findByWorkspace(wsId);
  });
}

exports.formatter = function (response) {
  lodash.each(response.data, function (project) {
    console.log(project.name);
  });
}