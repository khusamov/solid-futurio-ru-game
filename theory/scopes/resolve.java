package com.hwdtech

import com.hwdtech.ioc.ResolveDependencyException
import com.hwdtech.ioc.Scopes

/**
 * Разрешает зависисмость кей в текущем пространстве имен.
 * @arg key Строковое наименование разрешаемой зависисмости.
 * @arg args Параметры, используемые для разрешения зависисмости.
 *
 * @throw ResolveDependencyException выбрасывается, если не удается разрешить требуемую зависимость.
 */
fun <T> resolve(key: String, vararg args: Any): T {
    try {
        @Suppress("UNCHECKED_CAST")
        return Scopes.current[key](args) as T
    } catch (ex: ResolveDependencyException) {
        throw ex
    } catch (ex: Throwable) {
        throw ResolveDependencyException(
            "IoC dependency for $key thrown unexpected exception.",
            ex
        )
    }
}