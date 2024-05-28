This sample demonstrates "Avatar" functionality of Banuba SDK.

Refer [parent directory](../) for build instructions.

Avatar effect will be loaded from
[app assets](src/main/assets/bnb-resources/effects/Avatar_effect). It will use
the config provided in `setState` call
[from here](src/main/assets/bnb-resources/effects/Avatar_effect/config.js#L97),
you may modify it right there or during runtime.
Available option are documented
[here](src/main/assets/bnb-resources/effects/Avatar_effect/Readme.md)
In order to remove hint, add call to `delTap()` at the end of
[`config.js`](src/main/assets/bnb-resources/effects/Avatar_effect/config.js#L223)

This is how you can interact with the Avatar effect during runtime:

    effect?.evalJs("""
        setState({
            "Hair": {
                "shape": "first",
                "color": "0 0 0"
            }
        })
    """, null)