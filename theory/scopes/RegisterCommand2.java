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

















