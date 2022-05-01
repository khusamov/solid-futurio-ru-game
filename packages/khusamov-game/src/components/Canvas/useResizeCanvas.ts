import useResizeObserver from 'use-resize-observer';
import {TOnResizeHandler} from './Canvas';
import {RefCallback, useState} from 'react';
import {ISize} from 'khusamov-base-types';

/**
 * Вычисление размером игрового поля.
 * @param onResize
 */
export default function useResizeCanvas<T extends HTMLDivElement>(onResize?: TOnResizeHandler): [RefCallback<T>, ISize] {
	const [size, setSize] = useState<ISize>({width: 0, height: 0})
	// Здесь ref выдается на HTMLDivElement, то есть SVGSVGElement не поддерживается.
	// Заявка на исправление этого недоразумения подана и принята автором:
	// https://github.com/ZeeCoder/use-resize-observer/issues/91
	const {ref} = useResizeObserver<T>({
		onResize({width = 0, height = 0}) {
			if (onResize) {
				onResize({width, height})
				setSize({width, height})
			}
		}
	})
	return [ref, size]
}