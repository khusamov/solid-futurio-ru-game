import {Node} from 'typescript';
import getNodes from './getNodes';

export default function filterNodes<S extends Node>(node: Node, predicate: (value: Node, index: number, array: readonly Node[]) => value is S): S[] {
	return getNodes(node).filter(predicate)
}