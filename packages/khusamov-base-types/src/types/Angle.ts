export default class Angle {
	/**
	 * Конвертация угла из радиан в градусы.
	 * @param value
	 */
	public static toDegree(value: number) {
		return value / Math.PI * 180
	}

	/**
	 * Конвертация угла из градусов в радианы.
	 * @param value
	 */
	public static toRadian(value: number) {
		return value * Math.PI / 180
	}
}