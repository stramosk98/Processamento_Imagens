import cv2
import matplotlib.pyplot as plt

imagem = cv2.imread('./imgs/Atividade10/realce_image.pgm', cv2.IMREAD_GRAYSCALE)

hist = cv2.calcHist([imagem], [0], None, [256], [0, 256])

plt.figure()
plt.hist(hist.flatten(), bins=256, range=[0, 256], color='gray')
plt.xlabel('Pixel value')
plt.ylabel('Frequency')
plt.title('Histogram Gray scale')
plt.show()
