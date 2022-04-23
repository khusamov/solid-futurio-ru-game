import {factory, isLiteralTypeNode, isStringLiteral, TypeNode} from 'typescript'

/**
 * Если просто добавлять узлы с типами в новое AST-дерево, то не работает
 * узел LiteralTypeNode (при печати getText() такого узла ничего не выводит).
 * Возможно это бага, но узнать это пока не представляет возможным. Нужно локализовать эту багу для начала.
 *
 * Пока временное решение делать клонирование. Функция
 * packages/khusamov-adapter-generator/src/functions/cloneNode.ts
 * была создана, так как пакет typescript ее не экспортирует. Но эта функция не работает - та же ошибка.
 *
 * Пришлось временно создать свою клонирующую функцию, которая обрабатывает частные случаи.
 * В будущем ее можно дорабатывать и таким образом поддерживать данный костыль, пока не будет
 * решена вышеописанная бага или не будет найден способ клонирования узлов в общем виде.
 *
 * @param node
 */
export default function cloneTypeNode(node: TypeNode): TypeNode {
	let result = node

	if (isLiteralTypeNode(node)) {
		result = factory.updateLiteralTypeNode(
			node,
			(
				isStringLiteral(node.literal)
					? factory.createStringLiteral(node.literal.text, true)
					: factory.createStringLiteral('STRING-LITERAL', true)
			)
		)
	}

	return result
}