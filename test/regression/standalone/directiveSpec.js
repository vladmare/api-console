'use strict';

var Server     = require('../helpers/server');
var assertions = require('../assertions');

module.exports = function() {
  it('should diplay a RAML', function () {
    // Arrange
    var server = new Server(3001, 'minimum.raml', 'directive.tpl.html');
    var assert = assertions.create('resource');

    // Act
    server.start();
    browser.get('http://localhost:3001');

    // Assert
    assert.ifTitleIsPresent('Example API');
  });

  it('should display error page if RAML is wrong', function () {
    // Arrange
    var server = new Server(3002, 'wrong.raml', 'directive.tpl.html');
    var assert = assertions.create('error');

    // Act
    server.start();
    browser.get('http://localhost:3002');

    // Assert
    assert.ifTitleIsPresent('Error while loading http://localhost:3002/raml/wrong.raml');
    assert.ifErrorMessageIsPresent('unknown property ti tle');
    assert.ifSnippetIsPresent('ti tle: Example API');
    assert.ifRamlIsPresent();
  });
};
