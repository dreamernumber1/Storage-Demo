// 创建xhr对象
window.xhrfactory = function(){
    this.init.apply(this,arguments);
}
window.xhrfactory.prototype = {
    init:function(){
        this.xhr = this.create();
    },
    create:function(){
        var xhr = null;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }else if(window.ActiveXObject){
            xhr = new ActiveXObject('Msml2.Xmlhttp');
        }else{
            xhr = new ActiveXObject('Microsoft.Xmlhttp');
        }
        return xhr;//不要忘记return
    },
    readystate:function(callback){
        this.xhr.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                callback(this.responseText);
            }
        }
    },
    para:function(data){
        var datastr = '';
        if(data && Object.prototype.toString.call(data)==="[object object]"){
            for(var i in data){
                for(var i=0; i<length; i++){
                    datastr += i + '=' + data[i] + '&';
                }
            }
        }
    },
    get:function(){
        this.readystate(callback);
        var newurl = url;
        var datastr = this.para(data);
        newurl = url + '?' +datastr;
        this.xhr.open('get',newurl,true);
        this.xhr.send(null);
    }
}
// 后台程序的模板变量传递过来，此变量不属于前台
var localStorageSign = 'on'//为了容错的，担心之前没有清楚垃圾
// 其实版本控制也是从后台程序中传递过来的
window.mLocalSdk = {
    resourceVersion : '19900725123',
    resourceJavascriptList:[
        {
            id:'1234561',
            url:'first1',
            type:'javascript'
        },
        {
            id:'2234562',
            url:'second2',
            type:'javascript'
        },
        {
            id:'3234563',
            url:'third3',
            type:'javascript'
        }
    ],
    // resourceVersion此时还没定义resourceVersion,resourceVersion不是window全局下面的，此时window.mLocalSdk还是为undefined，改为this，在json中进行赋值，如果引用了某些json中的值，但是这个json值还没有被初始化时，可以用this代替。json第一次在解析的过程中还没有执行，创建了物理地址，但是为undefined
    needUpdate:(function(){
        return localStorage.getItem('resourceVersion') === this.resourceVersion;
    })(),

    isIE:(function(){
        var v = 1;
        var div = document.createElement('div');
        var all = div.getElementsByTagName('i');
        // console.log(v)
        while(//能力判断
            div.innerHTML = '<!--[if gt IE'+(++v)+']<i></i>![endif]-->', !all[0])
            { console.log(v+v)
                if(v>11)return false;}
        return v>3&&v<11 ? v:false;
    })(),
    checkHedge:function(){
        var localStorageLength = localStorage.length;
        var localStorageSize = 0;
        for(var i=0 ; i<localStorageLength;i++){
            var key = localStorage.key(i);
            localStorageSize+=localStorage.getItem(key).length;
        }
        return localStorageSize;
    },
    startup:function(){
        var _self = this;//如果需要在(function(){})()局部函数作用域中使用外部this，因为函数作用域中的this是函数本身，所以在函数外使用_self = this，则可以调用_self。
        if(localStorageSign === 'on' && !this.isIE && window.localStorage){
            if(this.needUpdate === true){
                // 为true是不需要更新
                // 返回函数，调用的时候，需要加上（），如果不想加（），则在函数后面直接加（）变成自执行方法
                return function(){
                    for(var i = 0;i<this.resourceJavascriptList.length;i++){
                        // 获取本地缓存列表，输入到html上
                        var id = this.resourceJavascriptList[i]['id']; 
                        // 把获取的值，渲染到页面
                    }
                }
            }else{
                // save localStorage
                this.saveSdk()
                // 把从网络中获取的值，渲染到页面
            }
        }else{
            // 从网络中加载
            // 把从网络中获取的值，渲染到页面
        }
    },
    // 写入本地localstorage
    saveSdk:function(){
        try{
            localStorage.setItem('resourceVersion',window.mLocalSdk.resourceVersion);         
        }catch(e){
            if(e.name == 'QuotaExceededError'){
                localStorage.clear();
                localStorage.setItem('resourceVersion',window.mLocalSdk.resourceVersion); 
            }
        }
        for(var i = 0;i<this.resourceJavascriptList.length;i++){
            var id = this.resourceJavascriptList[i]['id'];
            var data = this.resourceJavascriptList[i]['url'];
            var xhr = new xhrfactory();
            // i没取到跟，this的作用域有关系，所以还是得var _self = this;
            // var _self = this;
            // (function(i){
                // var id = _self.resourceJavascriptList[i]['id'];
                // var xhr = new xhrfactory();
                // xhr.get(_self.resourceJavascriptList[i]['url'],null,function(data){
                    // try{
                    //     localStorage.setItem(id,data); 
                    // }catch(e){
                    //     if(e.name == 'QuotaExceededError'){
                    //         localStorage.clear();
                    //         localStorage.setItem(id,data); 
                    //     }
                    // }
                // });
            // })(i)
            
             try{
                    localStorage.setItem(id,data);  
                }catch(e){
                    if(e.name == 'QuotaExceededError'){
                        localStorage.clear();
                        localStorage.setItem(id,data); 
                    }
                }
            // 加载到页面
        }
    }
}

window.mDomUtils = {
    renderHtml:function(id){
        
    },
    // 内联方式加载JavaScript
    addJavasriptByInline:function(id){
        var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.is = id;
        var heads = document.getElementsByTagName('head');
        if(heads.length){
            heads[0].appendChild(script);
        }else{
            document.documentElement.appendChild(script);
        }
        script.innerHTML = localStorage.getItem(id);
    },
    // 外链方式加载JavaScript
    addJavasriptBylink:function(id,url){
        var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.setAttribute('src',url);
        script.is = id;
        var heads = document.getElementsByTagName('head');
        if(heads.length){
            heads[0].appendChild(script);
        }else{
            document.documentElement.appendChild(script);
        }
        script.innerHTML = localStorage.getItem(id);
    },
    // 内联方式加载CSS
    addCssByInLink:function(url){
        var link = document.createElement('link');
        link.setAttribute('type','text/css');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('href',url);
        var heads = document.getElementsByTagName('head');
        if(heads.length){
            heads[0].appendChild(link);
        }else{
            document.documentElement.appendChild(link);
        }
    },
    // 外链方式加载CSS
    addCssByLink:function(cssString){
        var link = document.createElement('link');
        link.setAttribute('type','text/css');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('href',url);
        if(link.stylesheet){
            // IE支持
            link.stylesheet.cssText = cssString;
        }else{
            var cssText = document.createTextNode(cssString);
            link.appendChild(cssString);
        }
        var heads = document.getElementsByTagName('head');
        if(heads.length){
            heads[0].appendChild(link);
        }else{
            document.documentElement.appendChild(link);
        }
    }
}