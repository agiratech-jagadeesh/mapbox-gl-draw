var {isEnterKey, isEscapeKey} = require('../lib/common_selectors');
var Point = require('../feature_types/point');
const types = require('../lib/types');

module.exports = function(ctx) {

  var feature = new Point(ctx, {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'Point',
      'coordinates': []
    }
  });

  var stopDrawingAndRemove = function() {
    ctx.events.changeMode('simple_select');
    ctx.store.delete([feature.id]);
  };

  var onMouseMove = function(e) {
    feature.updateCoordinate('', e.lngLat.lng, e.lngLat.lat);
  };

  var done = false;
  var onClick = function(e) {
    done = true;
    feature.updateCoordinate('', e.lngLat.lng, e.lngLat.lat);
    ctx.events.changeMode('simple_select');
  };

  return {
    start: function() {
      ctx.ui.setButtonActive(types.POINT);
      ctx.ui.setClass('mapbox-gl-draw_mouse-add');
      this.on('mousemove', () => true, onMouseMove);
      this.on('click', () => true, onClick);
      this.on('keyup', isEscapeKey, stopDrawingAndRemove);
      this.on('keyup', isEnterKey, stopDrawingAndRemove);
      this.on('trash', () => true, stopDrawingAndRemove);
    },
    stop: function() {
      ctx.ui.setButtonInactive(types.POINT);
      ctx.ui.clearClass();
      if (done === false) {
        ctx.store.delete([feature.id]);
      }
    },
    render: function(geojson, push) {
      geojson.properties.active = geojson.properties.id === feature.id ? 'true' : 'false';
      if (geojson.properties.active === 'false') {
        push(geojson);
      }
    }
  };
};
