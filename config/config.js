var config = {
    "economy": {
        aka: "经济政治",
        websites: [
            {
                website: "http://www.forbeschina.com/",
                id: "forbeschina",
                icon: "http://www.google.com/s2/favicons?domain=www.forbeschina.com",
                aka: "福布斯中文网",
                updateInterval: 10, //by minutes
                selector: [
                    {
                        textSelector: "#qie_img .title_panel a"
                    },
                    {
                        textSelector: "#jhdd .news a.title"
                    }                
                ]
            },
            {
                website: "http://www.infzm.com/",
                id: "infzm",
                icon: "http://www.google.com/s2/favicons?domain=www.infzm.com",
                aka: "南方周末",
                updateInterval: 10, //by minutes
                selector: [
                    {
                        textSelector: "#left_container .info h3 a"
                    }             
                ]
            }            
        ]
    },
    "tech": {
        aka: "科技",
        websites: [
            {
                website: "http://www.huxiu.com",
                id: "huxiu",
                icon: "http://www.google.com/s2/favicons?domain=www.huxiu.com",
                aka: "虎嗅",
                updateInterval: 10, //by minutes
                selector: [
                    {
                        textSelector: ".toutiao.idx-toutiao h2 a",
                        hrefSelector: ""
                    },
                    {
                        textSelector: ".article-list.idx-list .article-box-ctt h4 a",
                        hrefSelector: ""
                    }                
                ]
            },
            {
                website: "http://tech2ipo.com",
                id: "tech2ipo",
                icon: "http://www.google.com/s2/favicons?domain=tech2ipo.com",
                aka: "tech2ipo",
                updateInterval: 10, //by minutes
                selector: [
                    {
                        textSelector: ".hot-news .title-info h3 a[id]" // 本来可以使用:first伪选择器，但cheerio不支持
                    },
                    {
                        textSelector: ".point-view.common-top h3 a[id]"
                    },
                    {
                        textSelector: ".point-view.common-top .view-other li a[id]"
                    },
                    {
                        textSelector: ".post-list .post h4 a[id]"
                    }
                ]                
            }        
        ]
    },
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
    }
}

module.exports = config;