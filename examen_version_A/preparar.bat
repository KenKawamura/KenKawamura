@echo off
cd /d %~dp0
echo Instalando TypeScript (requiere internet)...
call npm install
echo.
echo Probando compilacion de caso1 y caso2...
cd caso1
call npx tsc && rmdir /s /q dist
cd ..\caso2
call npx tsc && rmdir /s /q dist
cd ..
echo.
echo Listo. Copie la carpeta examen completa (con node_modules) a cada computadora.
pause
