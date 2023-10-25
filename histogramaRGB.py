import cv2
import matplotlib.pyplot as plt

imagem = cv2.imread('./imgs/Atividade10/realce_image.ppm')

(canal_b, canal_g, canal_r) = cv2.split(imagem)

hist_b = cv2.calcHist([canal_b], [0], None, [256], [0, 256])
hist_g = cv2.calcHist([canal_g], [0], None, [256], [0, 256])
hist_r = cv2.calcHist([canal_r], [0], None, [256], [0, 256])

plt.figure(figsize=(8, 6))

plt.subplot(311)
plt.plot(hist_b, color='blue')
plt.title('Histogram Blue')
plt.xlabel('Pixel value')
plt.ylabel('Frequency')

plt.subplot(312)
plt.plot(hist_g, color='green')
plt.title('Histogram Green')
plt.xlabel('Pixel value')
plt.ylabel('Frequency')

plt.subplot(313)
plt.plot(hist_r, color='red')
plt.title('Histogram Red')
plt.xlabel('Pixel value')
plt.ylabel('Frequency')

plt.tight_layout()
plt.show()
