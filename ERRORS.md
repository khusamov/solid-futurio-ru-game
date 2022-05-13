Найденные ошибки
================

No transformers found for SpaceshipImage.jsx with pipeline: 'jsx'
-----------------------------------------------------------------

Текст ошибки:

```
@parcel/core: No transformers found for 
packages/khusamov-game/src/components/Spaceship/SpaceshipImage.jsx 
with pipeline: 'jsx'.
```

На эту ошибку есть заявка:
https://github.com/parcel-bundler/parcel/issues/7587

Обходной путь прописать в файле `.parcelrc` пустышку:

```json
{
	"extends": "@parcel/config-default",
	"transformers": {
		"jsx:*.svg": ["...", "@parcel/transformer-svg-react"],
		"jsx:*": ["..."]
	}
}
```

Uncaught ReferenceError: LΦ_0 is not defined
--------------------------------------------

Автор исправляет ошибку:  
ttps://github.com/typescript-rtti/typescript-rtti/issues/56

```
Uncaught ReferenceError: LΦ_0 is not defined
    at Object.LΦ (index.es.js:1597:36)
    at Object.a (index.es.js:1592:23)
    at new StopCommand (index.es.js:1617:136)
    at stopCommandResolver (index.es.js:1704:12)
    at IoC.resolve (index.es.js:1987:16)
    at Function.resolve (index.es.js:1977:42)
    at resolve (index.es.js:2193:16)
    at convertAgentMessage (index.es.js:1919:12)
    at AgentMessageInterpretCommand.execute (index.es.js:1935:34)
    at MacroCommand.execute (index.es.js:1338:21)
```