var config = {
    "game": {
        aka: "游戏",
        websites: [
            {
                website: "http://www.gamersky.com/",
                id: "gamersky",
                icon: "http://www.google.com/s2/favicons?domain=www.gamersky.com",
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
    },
    "video": {
        aka: "视频节目",
        websites: [
        ]
    }
}

module.exports = config;