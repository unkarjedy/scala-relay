/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule formatGeneratedModule
 * @flow
 * @format
 */

'use strict';

import type {FormatModule} from './writeRelayScalaFile';

const formatGeneratedModule: FormatModule = ({
  moduleName,
  documentType,
  docText,
  concreteText,
  flowText,
  hash,
  devTextGenerator,
  relayRuntimeModule,
  packageName,
  flowAltText,
}) => {
  const objectName = documentType === 'ConcreteBatch' ? 'batch' : 'fragment';
  const docTextComment = docText ? '\n/*\n' + docText.trim() + '\n*/\n' : '';
  const hashText = hash ? `\n * ${hash}` : '';
  const devOnlyText = devTextGenerator ? devTextGenerator(objectName) : '';
  return `/**
 * scala ${hashText}
 * Generated, DON'T MANUALLY EDIT.
 */
package ${packageName}
/*

objName:      ${objectName}
docType:      ${documentType}
*/

import _root_.scala.scalajs.js
import _root_.scala.scalajs.js.|

${flowText || ''}

${docTextComment}
object ${moduleName} extends _root_.relay.graphql.GenericGraphQLTaggedNode {

  ${flowAltText || ''}

  val query: _root_.relay.graphql.${documentType} = _root_.scala.scalajs.js.JSON.parse("""${concreteText}""").asInstanceOf[_root_.relay.graphql.${documentType}]
  val devText: String = """${devOnlyText}"""
}

`;
};

module.exports = formatGeneratedModule;