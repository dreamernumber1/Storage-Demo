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
