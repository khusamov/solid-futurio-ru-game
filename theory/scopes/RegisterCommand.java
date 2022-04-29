package com.hwdtech.ioc

import com.hwdtech.common.command.Command
import com.hwdtech.common.command.CommandException

class RegisterCommand(
    private val scope: DependenciesScope,
    private val key: String,
    private val strategy: ResolveDependencyStrategy
) : Command {

    override fun invoke() {
        try {
            scope[key] = strategy
        } catch (ex: ResolveDependencyException) {
            throw CommandException("unable to register $key dependency", ex)
        } catch (ex: Throwable) {
            throw CommandException("registration failed", ex)
        }
    }
}

package com.hwdtech.ioc

import com.hwdtech.ioc.scopes.DependenciesScopeImpl
import com.hwdtech.resolve
import java.io.Closeable
import kotlin.concurrent.getOrSet

/**
 * Управляет скоупами зависисмостей DependencyScope, в том числе отвечает за инициализацию механизма разрешения зависмостей в приложении.
 * По умолчанию инициализирует следующие виды зависимостей:
 * - IoC.Register - получ ить команду, с помощью которой можно зарегистрировать новую зависимость в текущем DependencyScope.
 * - Scopes.New - получить новый скоуп
 * - Scopes.executeInScope - выполнить код в новом скоуп. Код должен выполняться внутри лямбда функции, передаваемй в функцию расширение use.
 * - Scopes.executeInNewScope - выполнить код в укзанном скоуп. Код должен выполняться внутри лямбда функции, передаваемй в функцию расширение use.'
 * - Scopes.Root - Корневой скоуп для приложения.
 * - Scopes.Default - Скоуп, который будет установлен в качестве текущего, в случае, если будет запрошен текущий скоуп, но такой не был еще установлен.
 */
object Scopes {

    internal val scopes = ThreadLocal<DependenciesScope>()

    init {
        val rootScope = DependenciesScopeImpl {
            throw ResolveDependencyException("Dependency $it was not found.")
        }

        rootScope["IoC.Register"] = { args: Array<out Any> ->
            RegisterCommand(
                current,
                args[0] as String,
                args[1] as ResolveDependencyStrategy
            )
        }

        rootScope["Scopes.New"] = {
            if (it.size > 0 && it[0] is DependenciesScope) {
                val parent = it[0] as DependenciesScope
                DependenciesScopeImpl({ key: String -> parent[key] })
            } else {
                val parent = current
                DependenciesScopeImpl({ key: String -> parent[key] })
            }
        }

        rootScope["Scopes.executeInScope"] = {
            if (it.size > 0 && it[0] is DependenciesScope) {
                ScopeGuard(it[0] as DependenciesScope)
            } else {
                throw ResolveDependencyException("you should pass DependenciesScope instance as second argment")
            }
        }

        rootScope["Scopes.executeInNewScope"] = {
            val scope = resolve<DependenciesScope>("Scopes.New")
            resolve<Closeable>("Scopes.executeInScope", scope)
        }

        rootScope["Scopes.Root"] = {
            rootScope
        }

        val defaultScope =
            DependenciesScopeImpl({ key: String -> rootScope[key] })

        rootScope["Scopes.Default"] = {
            defaultScope
        }

        scopes.set(rootScope)
    }

    var current: DependenciesScope
        get() {
            return scopes.getOrSet { resolve<DependenciesScope>("Scopes.Default") }
        }
        set(value) {
            scopes.set(value)
        }
}