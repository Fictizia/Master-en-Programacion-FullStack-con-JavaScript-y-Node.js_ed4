#! /usr/bin/bash

#Comprobar si el usuario es root o no:
if  [ $(id -u) == 0 ];
then 
    echo "Eres usuario root!" 
else
    echo "No eres usuario root"
fi

echo "************************************************************"
echo "COMPROBACIÓN DE PROCESOS:"

#Sacando la lista de procesos por PID y PPID
ps -f

#Para seleccionar los procesos de un PID concreto se debería ejecutar por ejemplo [ps -p 1653] 

echo "************************************************************"
#Sacando la lista de procesos funcionando en la maquina Windows
ps -W

echo "************************************************************"

#Sacando la lista de procesos funcionando en la maquina Windows, en formato árbol(tree)
ps -W tree

echo "************************************************************"
echo "UPTIME:"

#Mostrando cuanto tiempo lleva mi maquina funcionando. (el uptime o el lastbootuptime). En windows7: 
#el formato es año-mes-dia-milisegundos

wmic os get lastbootuptime

echo "************************************************************"

#Otra opcion que lo muestra mas claro es usando net statistics:
net statistics workstation


echo "************************************************************"
echo "VARIABLES DE ENTORNO:"

#imprimiendo por patalla todas las variables de entorno en el equipo:
printenv


echo "************************************************************"
echo "ahora se IMPRIME toda esta información EN UN NUEVO ARCHIVO  llamado: env_data.log "
#imprimiendo en un archivo (env_data.log) todas las variables de entorno en el equipo
touch env_data.log
printenv >> "env_data.log"


