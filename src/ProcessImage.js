class ProcessImage {
    static getImage(type, height, width, nivel, path = ''){
        const list = []
            list.push(`${type}\n${height} ${width}`)
            for(let i  = 0; i < height; i++){
                for (let j = 0; j < width; j++){
                    list.push(Math.round(Math.random() * nivel))
                }
            }
        return list.join("\n")
    }
}

module.exports = {ProcessImage}

