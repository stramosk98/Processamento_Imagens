const fs = require("fs")
const { ProcessImage } = require("./src/ProcessImage")
const { getFormatedImage } = require("./src/FormateImage")

fs.writeFile("./imgs/Atividade1/p1_400.pbm", ProcessImage.getImage("P1", 400, 400, 1), (err) => {getError(err)})

fs.writeFile("./imgs/Atividade1/p2_400.pgm", ProcessImage.getImage("P2", 400, 400, 16), (err) => {getError(err)})

fs.writeFile("./imgs/Atividade2/p3_400.ppm", ProcessImage.getImage("P3", 400, 400, 15), (err) => {getError(err)})

fs.writeFile("./imgs/Atividade2/p3_1000.ppm", ProcessImage.getImage("P3", 1000, 1000, 15), (err) => {getError(err)})

function getError(err){
    if (err) {
        console.error(err)
    } else {
        console.log("Created File!")
    }
}

async function createFile(action, color = 'R_min') {
    try {
        let imageContent = {}
        let path = "./imgs/EntradaEscalaCinza.pgm"
        switch(action){
            case "10xSmaller":
                imageContent = await getFormatedImage("P2", 80, 80, 255, path, action);
                fs.writeFile("./imgs/Atividade3/p2_80.pgm", imageContent, (err) => {getError(err)})
                break
            case "ConvertTo5Bits":
                imageContent = await getFormatedImage("P2", 800, 800, 31, path, action);
                fs.writeFile("./imgs/Atividade4/p2_5bits.pgm", imageContent, (err) => {getError(err)})
                break
            case "20PercBrightness":
                imageContent = await getFormatedImage("P2", 800, 800, 31, "./imgs/Atividade4/p2_5bits.pgm", action);
                fs.writeFile("./imgs/Atividade5/p2_20percBrightness.pgm", imageContent, (err) => {getError(err)})
                break
            case "ConvertInBinary": 
                imageContent = await getFormatedImage("P1", 800, 800, 255, path, action);
                fs.writeFile("./imgs/Atividade6/p1_bin.pbm", imageContent, (err) => {getError(err)})
                break
            case "ConvertP3ToP2": 
                imageContent = await getFormatedImage("P2", 481, 321, 255, "./imgs/Fig4.ppm", action);
                fs.writeFile("./imgs/Atividade7/p2_convert.pgm", imageContent, (err) => {getError(err)})

                imageContent = await getFormatedImage("P3", 481, 321, 255, "./imgs/Fig4.ppm", action);
                fs.writeFile("./imgs/Atividade7/p3_convert.ppm", imageContent, (err) => {getError(err)})
                break
            case "SeparateColors":
                imageContent = await getFormatedImage("P3", 481, 321, 255, "./imgs/Fig4.ppm", action, color);
                fs.writeFile(`./imgs/Atividade8/p3_${color}.ppm`, imageContent, (err) => {getError(err)})
                break
            case "RealceImage":
                imageContent = await getFormatedImage("P2", 800, 800, 255, "./imgs/EntradaEscalaCinza.pgm", action);
                fs.writeFile(`./imgs/Atividade10/realce_image.pgm`, imageContent, (err) => {getError(err)})

                imageContent = await getFormatedImage("P3", 800, 800, 255, "./imgs/EntradaEscalaRGB.ppm", action);
                fs.writeFile(`./imgs/Atividade10/realce_image.ppm`, imageContent, (err) => {getError(err)})
                break
            default:
                console.log("invalid parameter")
        }
    } catch (err) {
        console.error(err);
    }

}

createFile("RealceImage")