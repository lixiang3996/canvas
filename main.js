var canvas = document.getElementById('a');
var ctx = canvas.getContext('2d');
var useing = false
var position = { "x": undefined, "y": undefined }
var useEraser = false



aotoSetCanvas(canvas)

// 笔和橡皮檫
pen.onclick = function () {
    useEraser = false
    pen.classList.add("active")
    eraser.classList.remove("active")
}
eraser.onclick = function () {
    useEraser = true
    eraser.classList.add("active")
    pen.classList.remove("active")
}



// 清屏幕
clear.onclick = function () {
    aotoSetCanvas(canvas)
    ctx.lineWidth = 3
}

//下载图片
download.onclick = function () {
    var url = canvas.toDataURL()
    var a = document.createElement("a")
    document.body.appendChild(a)
    a.href = url
    a.download = "图片"
    a.click()
}

//笔的颜色切换
colors.onchange = function (x) {
    console.log(this.value)
    ctx.strokeStyle = this.value
}

// 笔的粗细
px3.onclick = function () {
    ctx.lineWidth = 3
    px3.classList.add("active")
    px5.classList.remove("active")
    px10.classList.remove("active")
    
}
px5.onclick = function () {
    ctx.lineWidth = 5
    px3.classList.remove("active")
    px5.classList.add("active")
    px10.classList.remove("active")
    
}
px10.onclick = function () {
    ctx.lineWidth = 10
    px3.classList.remove("active")
    px5.classList.remove("active")
    px10.classList.add("active")
}

//判断设备
if (document.body.ontouchstart !== undefined) {
    //触控设备
    canvas.ontouchstart = function (a) {
        var x = a.touches[0].clientX
        var y = a.touches[0].clientY
        useing = true
        if (useEraser) {
            ctx.clearRect(x - 10, y - 10, 20, 20)
        } else {
            position = { "x": x, "y": y }
        }
    }
    canvas.ontouchmove = function (a) {
        var x = a.touches[0].clientX
        var y = a.touches[0].clientY
        if (useing) {
            if (useEraser) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPosition = { "x": x, "y": y }
                setDrwa(position.x, position.y, newPosition.x, newPosition.y)
                position = newPosition
            }
        }
    }
    canvas.ontouchend = function () {
        useing = false
    }
} else {
    //pc设备
    drawMouse(canvas)
}

// 设置canvas
function aotoSetCanvas(canvas) {
        Width = document.documentElement.clientWidth
        Height = document.documentElement.clientHeight
        canvas.width = Width
        canvas.height = Height
}



// 画笔点击和移动
function drawMouse(canvas) {
    canvas.onmousedown = function (a) {
        var x = a.clientX
        var y = a.clientY
        useing = true
        if (useEraser) {
            ctx.clearRect(x - 5, y - 5, 10, 10)
        } else {
            position = { "x": x, "y": y }
        }

    }
    canvas.onmousemove = function (a) {
        var x = a.clientX
        var y = a.clientY
        if (useing) {
            if (useEraser) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPosition = { "x": x, "y": y }
                setDrwa(position.x, position.y, newPosition.x, newPosition.y)
                position = newPosition

            }
        }
    }
    canvas.onmouseup = function () {
        useing = false

    }
}


// canvas属性
function setDrwa(x1, y1, x2, y2) {
    ctx.beginPath();            //开始          //笔的粗细
    ctx.moveTo(x1, y1);         //起点
    ctx.lineTo(x2, y2);         //终点
    ctx.stroke();               //结束
}

