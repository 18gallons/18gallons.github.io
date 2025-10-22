// here you can change things and add entries fo things lmao


var config = {
    "bg video": "ZN6MnEeNYO8",  // youtube video ID for the main background video,
    "bg photo": "assets/thumbnails/finalfinal5.png",    // photo bg for mobile

    "portfolio media": [       // put le images
        {
            "src": "ZN6MnEeNYO8",               // for videos, just paste the youtube video ID
            "thumbnail": "assets/thumbnails/finalfinal5.png",   // url to thumbnail
            "type": 2                           // type 1 = photo, type 2 = video
        },
        {
            "src": "assets/style_city.png",
            "type": 1   // type 1 = photo, type 2 = video
        },
        {
            "src": "assets/style_containership.png",
            "type": 1   // type 1 = photo, type 2 = video
        },
        {
            "src": "assets/style_tacomanport.png",
            "type": 1   // type 1 = photo, type 2 = video
        },
        {
            "src": "assets/tiltshift01.png",
            "type": 1   // type 1 = photo, type 2 = video
        },
        {
            "src": "assets/KeatingE_WPC_Pattern.png",
            "type": 1   // type 1 = photo, type 2 = video
        },
        {
            "src": "assets/KeatingE_WPC_Curves.png",
            "type": 1   // type 1 = photo, type 2 = video
        },
        {
            "src": "assets/KeatingE_04_01.png",
            "type": 1   // type 1 = photo, type 2 = video
        },
        {
            "src": "assets/KeatingE_04_05.png",
            "type": 1   // type 1 = photo, type 2 = video
        },
        {
            "src": "assets/wes anderson lookin shot.png",
            "type": 1   // type 1 = photo, type 2 = video
        },
        {
            "src": "EwGQfp5wpxQ",               // for videos, just paste the youtube video ID
            "thumbnail": "assets/thumbnails/passreelthumbnail.jpg",   // url to thumbnail
            "type": 2                           // type 1 = photo, type 2 = video
        },
    ],
    "packages": [   // list of all of your base packages (tm)
        {
            "name": "Aerial Photography",
            "description": "Simplest package",
            "features": [   // bullet list of stuff included
            "Up to 1 hour of flight time",
            "High-resolution photos",
            "Basic photo editing and color correction",
            ],
            "price": [200, 300]    // if a single price, only have the one price. if it's a price range, list lowest price first.
        },
        {
            "name": "Aerial Videography",
            "description": "Aerial photo and video combo",
            "features": [
            "Up to 1.5 hours of flight time",
            "1-2 minutes of edited video footage",
            "Basic video editing, including music overlay",
            "High-resolution photos",
            ],
            "price": [300, 500]
        },
        {
            "name": "Aerial Cinematography",
            "description": "Higher-quality editing and more video",
            "features": [
            "Up to 2 hours of flight time",
            "2-3 minutes of professionally edited cinematic video footage",
            "Advanced video editing with color grading and effects",
            "Customized music selection",
            "High-resolution photos",
            ],
            "price": [500, 700]
        },
        {
            "name": "FPV Aerial Videography",
            "description": "A more maneuverable drone, suited to action scenes",
            "features": [
                "Up to 1.5 hours of flight time",
                "Up-close, action-packed viewpoint",
                "1-2 minutes of edited video footage",
                "Basic video editing, including music overlay",
                "No photography",
            ],
            "price": [350, 550]
        },
        {
            "name": "FPV Aerial Cinematography",
            "description": "Action Cinematography",
            "features": [
                "Up to 2 hours of flight time",
                "Up-close, action-packed viewpoint",
                "2-3 minutes of professionally edited cinematic video footage",
                "Advanced video editing with color grading and effects",
                "Customized music selection",
                "No photography",
            ],
            "price": [550, 750]
        },
        {
            "name": "Real Estate Deal",
            "description": "A special package catered to realtors",
            "features": [
                "Up to 1.5 hours of flight time",
                "High-resolution photos",
                "Short property flyaround video",
                "FPV interior flythrough video",
                "Photo and video editing and color correction",
                "Building exterior 3D model"
            ],
            "price": [300, 550]
        },


        // MAKE SURE THIS ENTRY STAYS AT THE BOTTOM !!!
        {
            "name": "Commercial Package (Custom Quote)",
            "description": "A customized quote",
            "features": [
                "Tailored to the specific needs of commercial clients",
                "In-depth consultation and planning",
                "Extended flight time as needed",
                "Professional editing, including branding integration",
                "Customized delivery format (RAW files, specific resolutions, etc.)",
                "Note: Prices are subject to change based on project complexity and location."
            ],
            "price": ["custom"]
        },

    ],
    "fees": [
        {   // keep the base price at the top
            "name": "Base Price",
            "price": [50, 100],
        },
        {
            "name": "Location fee",
            "price": [100]
        }
        
    ],
    "quote options": [
        // custom quote options

        {
            "name": "extra funny",
            "description": "add extra funny",
            "price": [10, 20],
            "min": 0,
            "max": 10,   // max quantity of the thing
            "placeholder": "Quantity"   // ex: quantity, minutes, hours, etc.
        },
        {
            "name": "NO funny.",
            "description": "for those who HATE the funny.",
            "price": [10, 20],
            "min": 0,
            "max": 1,
            "placeholder": "Quantity"
        },
        {
            "name": "ALL funny!!!",
            "description": "for those who LOVE!! the funny.",
            "price": [499.99],
            "min": 0,
            "max": 100,
            "placeholder": "Funnies"
        },
        {
            "name": "ALL funny!!!",
            "description": "for those who LOVE!! the funny.",
            "price": [499.99],
            "min": 0,
            "max": 100,
            "placeholder": "Funnies"
        },
    ]
}