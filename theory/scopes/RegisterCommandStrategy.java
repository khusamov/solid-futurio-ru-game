import com.hwdtech.common.command.Command

object RegisterCommandStrategy : ResolveDependencyStrategy {

    override fun invoke(vararg args: Any): Command {
        try {
            return RegisterCommand(
                Scopes.current,
                args[0] as String,
                args[1] as ResolveDependencyStrategy
            )
        } catch (ex: ClassCastException) {
            throw ResolveDependencyException("Agrs[0] must have type String, arg[1] must have ResolveDepenedencyStartagy<*>")
        }
    }
}