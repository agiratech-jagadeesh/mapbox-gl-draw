var Feature = require('./feature');

var LineString = function(ctx, geojson) {
  Feature.call(this, ctx, geojson);
};

LineString.prototype = Object.create(Feature.prototype);

LineString.prototype.isValid = function() {
  return this.coordinates.length > 1;
};

LineString.prototype.addCoordinate = function(path, lng, lat) {
  this.selectedCoords = {};
  var id = parseInt(path, 10);
  this.coordinates.splice(id, 0, [lng, lat]);
};

LineString.prototype.getCoordinate = function(path) {
  var id = parseInt(path, 10);
  return JSON.parse(JSON.stringify(this.coordinates[id]));
};

LineString.prototype.removeCoordinate = function(path) {
  this.coordinates.splice(parseInt(path, 10), 1);
};

LineString.prototype.updateCoordinate = function(path, lng, lat) {
  var id = parseInt(path, 10);
  this.coordinates[id] = [lng, lat];
};

module.exports = LineString;

