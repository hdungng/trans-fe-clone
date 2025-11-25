@echo off
title React Build Script
echo ============================
echo === Bat build React App ====
echo ============================

REM Chạy build React (sẽ đợi build xong rồi mới chạy tiếp)
call npm run build

REM Nếu build cũ ở C:\deploy tồn tại thì xóa
if exist "C:\deploy\build" (
    echo Xóa build cũ ở C:\deploy...
    rmdir /s /q "C:\deploy\build"
)

REM Copy dist sang C:\deploy
echo Copy dist mới sang C:\deploy...
xcopy "dist" "C:\deploy\build" /E /H /C /I

echo ============================
echo === Hoàn tất! ==============
echo ============================
pause
