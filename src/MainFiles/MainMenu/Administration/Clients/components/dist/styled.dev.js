"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flex = exports.TwoGridContainer = exports.StyledForm = exports.Input = exports.StyledNewDataContainer = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    display: grid;\n    grid-template-columns: 30% 70%;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    position: absolute;\n    width: 10%;\n    z-index: 2;\n    top: ", "px;\n    left: ", "px;\n    display: grid;\n    grid-template-columns: 1fr;\n    padding: 10px;\n    background-color: white;\n    border-radius: 2px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    padding: 10px;\n    margin: 5px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    background-color: #1266d4;\n    padding: 30px;\n    max-width: 100%;\n    border: 3px solid white;\n    border-radius: 10px;\n    text-align: center;\n    color: white;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledNewDataContainer = _styledComponents["default"].div(_templateObject());

exports.StyledNewDataContainer = StyledNewDataContainer;

var Input = _styledComponents["default"].input(_templateObject2());

exports.Input = Input;

var StyledForm = _styledComponents["default"].form(_templateObject3(), function (props) {
  return props.y;
}, function (props) {
  return props.x;
});

exports.StyledForm = StyledForm;

var TwoGridContainer = _styledComponents["default"].div(_templateObject4());

exports.TwoGridContainer = TwoGridContainer;

var Flex = _styledComponents["default"].div(_templateObject5());

exports.Flex = Flex;