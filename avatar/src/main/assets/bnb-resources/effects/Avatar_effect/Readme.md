## Avatar usage

All effect usage based on setState() function with json parameter. After setState() call all effect state clears, before applying new state.

## Json example

{
    "FaceColor":{
        "color": "white"
    },
    "FaceShape":{
        "round": 0.0,
        "square": 0.0,
        "triangle": 0.0,
        "diamond": 0.0,
        "heart": 0.0,
        "pear": 0.0,
        "rectangular": 0.0,
        "oblong": 0.0,
    },
    "NoseShape":{
        "length": 0.0,
        "width": 0.0,
        "size": 0.0,
    },
    "EyesShape":{
        "round": 0.0,
        "downturned": 0.0,
        "upterned": 0.0,
        "mono": 0.0,
        "wideset": 0.0,
        "closeset": 0.0,
    },
    "BrowsShape":{
        "thick": 0.0,
        "classic": 0.0,
        "angular": 0.0,
        "rounded": 0.0,
    },
    "Hair":{
        "color": "0.310, 0.176, 0.173",
        "shape": "second"
    },
    "Lights":{
        "radiance":[
            "0.1, 0.1, 0.1, 3.0",
            "0.1, 0.1, 0.1, 3.0",
            "0.1, 0.1, 0.1, 2.0",
            "0.1, 0.1, 0.1, 3.0"
        ],
        "lights":[
            "110.0, 0.0, 300.0",
            "-110.0, 0.0, 300.0",
            "0.0, -110.0, 300.0",
            "0.0, 150.0, 300.0",
        ]
    },
    "Lut":{
        "texture": "images/lut_magical.png",
        "strength": 1.0
    },
    "Transformation":{
        "position": "0., -100.",
        "scale": 0.8
    },
    "Background":{
        "texture": "images/BG_christmas.jpg",
        "aspect": "fill",
        "rotation": 0.
    },
    "Foreground":{
        "texture": "images/FG_christmas.png",
        "blending": "alpha", 
        "aspect": "fill",
        "rotation": 0.
    }
}

# Parameters

- "FaceColor":{
    "color": color
} 

    color could be "white", "afro", "asian", "indian", "latino"

- "FaceShape":{
        "round": 0.0,
        "square": 0.0,
        "triangle": 0.0,
        "diamond": 0.0,
        "heart": 0.0,
        "pear": 0.0,
        "rectangular": 0.0,
        "oblong": 0.0,
}
    all parameters from 0.0 to 1.0

- "NoseShape":{
        "length": 0.0,
        "width": 0.0,
        "size": 0.0,
    }

    all parameters from 0.0 to 1.0

- "EyesShape":{
        "round": 0.0,
        "downturned": 0.0,
        "upterned": 0.0,
        "mono": 0.0,
        "wideset": 0.0,
        "closeset": 0.0,
    }

    all parameters from 0.0 to 1.0

- "BrowsShape":{
        "thick": 0.0,
        "classic": 0.0,
        "angular": 0.0,
        "rounded": 0.0,
    },

    all parameters from 0.0 to 1.0

- "Hair":{
        "color": rgb_color,
        "shape": shape
    },

    rgb_color should be an rgb color string, such as "0.310, 0.176, 0.173"

    shape could be "first", "second". Default state is bold head.

- "Lights":{
        "radiance":[
            "0.1, 0.1, 0.1, 3.0",
            "0.1, 0.1, 0.1, 3.0",
            "0.1, 0.1, 0.1, 2.0",
            "0.1, 0.1, 0.1, 3.0"
        ],
        "lights":[
            "110.0, 0.0, 300.0",
            "-110.0, 0.0, 300.0",
            "0.0, -110.0, 300.0",
            "0.0, 150.0, 300.0",
        ]
    },

    settings of lights points, "radiance" is rgb light color and strength,
    lights - position of ligths points.

-  "Lut":{
        "texture": texture,
        "strength": 1.0
    },

    texture should be path to lut image
    strength from 0.0 to 1.0

-  "Transformation":{
        "position": position,
        "scale": 1.0
    },
    
    position is an "x,y" float string, such as "0., -100."
    scale - float scale parameter, defauld 1.0



