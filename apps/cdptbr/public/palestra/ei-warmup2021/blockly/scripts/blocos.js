/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    "type": "avancar",
    "message0": "avançar",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 355,
  }
]);

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    "type": "esquerda",
    "message0": "virar à esquerda",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 355,
  }
]);

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    "type": "direita",
    "message0": "virar à direita",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 355,
  }
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "repetir",
    "message0": "repetir %1 vezes",
    "args0": [
      {"type": "field_number",
      "name": "NAME",
      "value": 0,
      "min": 1,
      "max": 10
    }
    ],
    "message1": "faça %1",
    "args1": [
      {"type": "input_statement", "name": "DO"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120
  }
]);


Blockly.JavaScript['avancar'] = function(block) {
  let value = '\'' + block.getFieldValue('VALUE') + '\'';
  return 'MusicMaker.queueSound(' + value + ');\n';
};