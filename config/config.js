var config = {

    "游戏": [
        {
            website: "http://www.gamersky.com/",
            aka: "游民星空",
            updateInterval: 10, //by minutes
            selector: [
                {
                    textSelector: ".center1 .mid12_1 ul a",
                    hrefSelector: ""
                },
                {
                    textSelector: ".center1 .hmhz_big a",
                    hrefSelector: ""
                }                
            ]
        }
    ]
}

module.exports = config;