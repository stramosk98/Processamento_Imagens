const fs = require("fs")

async function getFormatedImage(type, height, width, intensity, path, action, color) {
    var list = []
    try {
        const content = await fs.promises.readFile(path)
        const contentString = content.toString()
        const lines = contentString.split('\n')
        const pixelValues = lines.slice(3).map(line => line.split(' ')
            .map(val => val === '' ? null : Number(val))).flat()

        const imageInfo = {type, height, width, intensity, path, list, pixelValues, color}

        switch(action){
            case "10xSmaller":
                get10xSmaller(imageInfo)
                break
            case "ConvertTo5Bits":
                getConvertTo5Bits(imageInfo)
                break
            case "20PercBrightness":
                get20PercBrightness(imageInfo)
                break
            case "ConvertInBinary": 
                getConvertInBinary(imageInfo)
                break
            case "ConvertP3ToP2":
                getConvertP3ToP2(imageInfo)
                break
            case "SeparateColors":
                getSeparateColors(imageInfo)
                break
            default:
                console.log("error parameter")
        }
    } catch (err) {
        console.error(err)
    }
    return list.join("\n")
}

function get10xSmaller(imageInfo){
    imageInfo.list.push(`${imageInfo.type}\n${imageInfo.height} ${imageInfo.width}\n${imageInfo.intensity}`);

    for (let i = 0; i < imageInfo.pixelValues.length; i+= 10) {
        imageInfo.list.push(imageInfo.pixelValues[i])
    }
}

function getConvertTo5Bits(imageInfo){
    imageInfo.list.push(`${imageInfo.type}\n${imageInfo.height} ${imageInfo.width}\n${imageInfo.intensity}`);

    for (let i = 0; i < imageInfo.pixelValues.length; i++) {
        let value = 255 / imageInfo.pixelValues[i]
        imageInfo.list.push(Math.round(imageInfo.intensity / value));
    }
}

function get20PercBrightness(imageInfo){
    imageInfo.list.push(`${imageInfo.type}\n${imageInfo.height} ${imageInfo.width}\n${imageInfo.intensity}`);

    for (let i = 0; i < imageInfo.pixelValues.length; i++) {
        imageInfo.list.push(Math.round(imageInfo.pixelValues[i] * 1.2))
    }
} 

function getConvertInBinary(imageInfo){
    if(imageInfo.type == 'P1'){
        imageInfo.list.push(`${imageInfo.type}\n${imageInfo.height} ${imageInfo.width}`);
    } else {
        imageInfo.list.push(`${imageInfo.type}\n${imageInfo.height} ${imageInfo.width}\n${imageInfo.intensity}`);
    }
    for (let i = 0; i < imageInfo.pixelValues.length; i++) {
        if(imageInfo.pixelValues[i] <= 128){
            imageInfo.type == 'P1' ? imageInfo.list.push(0) : imageInfo.list.push(255)
        } else {
            imageInfo.type == 'P1' ? imageInfo.list.push(1) : imageInfo.list.push(254)
        }
    }
}

function getConvertP3ToP2(imageInfo){
    imageInfo.list.push(`${imageInfo.type}\n${imageInfo.height} ${imageInfo.width}\n${imageInfo.intensity}`);
    let newList = []
    for (let i = 0; i < imageInfo.pixelValues.length; i++) {
        if(imageInfo.pixelValues[i] !== null){
            newList.push(imageInfo.pixelValues[i])
            if(newList.length == 3){
                let sumPixel = 
                    (newList[0] * 0.299) + (newList[1] * 0.587) + (newList[2] * 0.114)
                imageInfo.list.push(Math.ceil(sumPixel))
                newList = []
           }
        }
    }
}

function getSeparateColors(imageInfo){
    imageInfo.list.push(`${imageInfo.type}\n${imageInfo.height} ${imageInfo.width}\n${imageInfo.intensity}`);
    let newList   = []
    let colorList = imageInfo.color.split("_", 2);
    let value     = colorList[1] == "min" ? 0 : 255
    for (let i = 0; i < imageInfo.pixelValues.length; i++) {
        if(imageInfo.pixelValues[i] !== null){
            newList.push(imageInfo.pixelValues[i])
            if(newList.length == 3){
                switch(colorList[0]){
                    case "R":
                        imageInfo.list.push(newList[0], value, value)
                    break
                    case "G":
                        imageInfo.list.push(value, newList[1], value)
                    break
                    case "B":
                        imageInfo.list.push(value, value, newList[2])
                    break
                    default:
                        console.log("Error")
                }
                newList = []
           }
        }
    }
}

exports.getFormatedImage = getFormatedImage