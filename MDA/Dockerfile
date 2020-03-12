# Imagen de node
FROM node:13
# Metadata de la imagen
LABEL "Desarrollo RNEC"="Mesa de servicio TIGO"
LABEL maintainer="lfprieto@registraduria.gov.co"
LABEL version="1.0"
#crear Directorio de trabajo
RUN mkdir -p /home/docker/MDA
# establecer directorio de trabajo
WORKDIR /home/docker/MDA
# Instala los paquetes del package.json
COPY package*.json ./
RUN npm install --quiet
# Instalar nodemon
RUN npm install nodemon -g --quiet
# copia todos los archivos
COPY . .
# expone el servidor por el puerto 8090
EXPOSE 8090
# Inicia la aplicacion
CMD ["npm","start"]
