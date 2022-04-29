interface DependenciesScope {

    operator fun set(key: String, strategy: ResolveDependencyStrategy)

    operator fun get(key: String): ResolveDependencyStrategy
}