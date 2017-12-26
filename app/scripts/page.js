var dataId = document.getElementById('dataId')
var data = dataId.innerHTML;
console.log(data)

function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        var currentdate = year + seperator1 + month;
        return currentdate;
    }

        var actionType = 'edit';
    var pageId = '';
    var domId = 'content-left-inner';
    var dataRules = {
        'lists': 'array',
        'items': 'item',
        'type': 'readonly',
        'theme': ['default', 'luxury', 'myFT', 'technology', 'lifestyle', 'ebook'],
        'side': ['none', 'HomeRightRail','TagRightRail', 'MostPopular', 'HotVideos', 'MarketsData', 'videos', 'MostCommented'],
        'sideAlign': ['right', 'left'],
        'float': ['none', 'left', 'right', 'oneline', 'SideBySide', 'myFT', 'IconTitle', 'Card', 'eBook', 'Headshot', 'ScoreBoard'],
        'showTag': ['no', 'yes'],
        'showTimeStamp': ['no', 'new stories', 'all'],
        'showSoundButton': ['no', 'yes'],
        'iphone': ['no', 'yes'],
        'android': ['no', 'yes'],
        'ipad': ['no', 'yes'],
        'from': ['', 'MarketsData', 'SpecialReports', 'Columns', 'Channels', 'Events', 'MyTopics', 'Discover', 'Marketing', 'findpassword'],
        'fromSide': ['PartnerActivity'],
        'sideOption': ['headlineOnly', 'leadOnly', 'imageAndText', 'textOverImage'],
        'preferLead': ['longName', 'shortname', 'none'],
        'feedType': ['all','story','video','interactive','photo','job', 'myFT', 'fav', 'ftc_columns', 'ft_columns'],
        'feedItems': 'number',

        'feedStart': 'number',
        'feedImage': ['optional','necessary','hide'],
        'language': ['', 'en', 'ce'],
        'fit': ['', 'standard', 'highimpact', 'legacy'],
        'sponsorMobile': ['no', 'yes'],
        'durationInSeconds': ['default','15','30','60','90']
    };
    var dataRulesTitle = {
        'theme': 'Luxury是指乐尚街的配色风格，主要特点是Title和分割线为金色',
        'side': '采用事先写好的模版',
        'name': '仅供编辑内部沟通，不会被读者看见，尽量采用英文的name',
        'title': 'list的title会被读者看见，请使用中文',
        'url': '可以填写标签，或者url，程序会自动识别并产生正确的链接',
        'sideAlign': ' 这个Block的侧边栏放在右边还是左边',
        'float': '如果某个list有文章没有配图，可以采用float到左边的方式来展示这个List，同时其余的list自动float到右边；如果想要某个list，如cover占据全部宽度，则设定其为oneline；如果想要像myFT那样一行一条内容，则选择myFT；想要强制设定这个List所有内容都采用同样的展现形式，则选择Card',
        'showTag': '程序会抓取tag字段中第一个tag做为primary tag来显示',
        'showTimeStamp': 'new stories代表只在文章发布的一个小时内显示时间，all代表在所有情况下都显示时间',
        'from': '选取事先写好的模版',
        'sideOption': 'headlineOnly表示只显示标题；leadOnly表示只显示lead，这个功能可以用来展示联系方式一类的文字信息；imageAndText显示方式类似微信公众号的图文信息，第一条出大图',
        'preferLead': '优先显示的lead类型',
        'feedType': '自动抓取的内容类型，如果选择all则四种类型都抓取，最新的先显示',
        'feedImage': 'Optional代表不要求抓出来的内容必须有配图，Necessary则要求内容必须有配图',
        'feedItems': '自动抓取内容的条数上限，如果这个list中有手动拖入的内容，则不显示自动抓取的内容',
        'feedStart': '自动抓取内容的条数开始的Index，从0开始数',
        'feedTag': '自动抓取内容依据的标签，如果抓取条件复杂，也可以请技术帮助你输入mysql的查询语句',
        'language': '中文、英文或者中英文对照，只适用于story',
        'dates': '输入生效的日期，格式为YYYYMMDD，半角逗号分隔'
    };
    var toolkits = {
        'section': {
            'block': ['title', 'name', 'side', 'sideAlign'],
            'include': ['from', 'side', 'sideAlign'],
            'header': [],
            'banner': ['position', 'image', 'highImpactImage', 'url', 'fit'],
            'footer': [],
            'creative': ['title', 'fileName', 'click', 'impression_1', 'impression_2', 'impression_3', 'iphone', 'android', 'ipad', 'dates', 'showSoundButton', 'landscapeFileName', 'backupImage', 'backgroundColor', 'durationInSeconds', 'note']
        },
        'list': {
            'list': ['name', 'title', 'url', 'language', 'description', 'style', 'float', 'showTag', 'showTimeStamp', 'preferLead', 'sponsorAdId', 'sponsorLogoUrl', 'sponsorLink', 'sponsorNote', 'feedStart', 'feedItems', 'feedTag', 'feedType', 'feedImage', 'moreLink'],
            'SideMPU': ['name', 'image', 'url'],
            'SideWithItems':['name', 'title', 'url', 'sideOption', 'feedItems', 'feedTag', 'feedType'],
            'SideRanking': ['name', 'title', 'url', 'feedItems', 'feedTag', 'feedType'],
            'SideInclude': ['name', 'title', 'url', 'fromSide'],
            'SideIframe': ['name', 'title', 'url', 'width', 'height']
        }
    };
    var devices = [
        {'name': 'PC or Mac', 'width': '', 'height': ''},
        {'name': 'iPhone 5', 'width': 320, 'height': 580},
        {'name': 'iPhone 6', 'width': 375, 'height': 627},
        {'name': 'iPhone 6 Plus', 'width': 414, 'height': 736},
        {'name': 'iPad LandScape', 'width': 1024, 'height': 748},
        {'name': 'iPad Portrait', 'width': 768, 'height': 1024},
        {'name': 'Huawei Mate 8', 'width': 540, 'height': 960},
        {'name': 'Google Nexus 7', 'width': 600, 'height': 960},
        {'name': 'Email', 'width': '', 'height': '', 'view': 'innotree_email'}
    ];
    var thisday = new Date();
    var thenow = thisday.getHours() * 10000 + thisday.getMinutes() * 100 + thisday.getSeconds();
    var todaydate = thisday.getFullYear() + '-' + (thisday.getMonth() + 1) + '-' + thisday.getDate();
    var pagemakerAPIRoot = '/falcon.php/pagemaker/';
    var storyAPIRoot = '/falcon.php/homepage/getstoryapi/';
    var innotreeAPIRoot = '/falcon.php/homepage/innotreeSearch/';