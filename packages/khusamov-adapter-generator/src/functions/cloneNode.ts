import {
	factory, isIdentifier, isPrivateIdentifier,
	isSourceFile, NodeFlags, setOriginalNode, Node
} from 'typescript'

type Mutable<T> = { -readonly [K in keyof T]: T[K]; };

interface IWithTransformFlags {
	transformFlags: NodeFlags
}

/**
 * Этот метод клонирования не работает как нужно((
 * @link https://github.com/microsoft/TypeScript/blob/main/src/compiler/factory/nodeFactory.ts#L5522
 * @param node
 */
export default function cloneNode<T extends Node | undefined>(node: T): T;
export default function cloneNode<T extends Node>(node: T) {
	if (node === undefined) {
		return node;
	}

	const clone = (
		isSourceFile(node) ? factory.createSourceFile([], node.endOfFileToken, node.flags) as unknown as T :
			isIdentifier(node) ? factory.createIdentifier(node.text) as unknown as T :
				isPrivateIdentifier(node) ? factory.createPrivateIdentifier(node.text) as unknown as T :
					factory.createIdentifier('') as unknown as T
	);

	(clone as Mutable<T>).flags |= (node.flags & ~NodeFlags.Synthesized);
	(clone as unknown as IWithTransformFlags).transformFlags = (node as unknown as IWithTransformFlags).transformFlags;
	setOriginalNode(clone, node);

	for (const key in node) {
		if (!node.hasOwnProperty(key) || clone.hasOwnProperty(key)) {
			continue;
		}

		clone[key] = node[key];
	}

	return clone;
}